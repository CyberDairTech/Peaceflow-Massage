import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server-auth";
import { createServiceClient } from "@/lib/supabase/server";
import { getResend } from "@/lib/resend";
import { generateContractPdf } from "@/lib/generateContractPdf";

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const {
    bookingId,
    signerName,
    signerEmail,
    initials,
    signatureType,
    signatureText,
    signatureImage,
  } = await request.json();

  if (!bookingId || !signerName || !signerEmail || !initials || !signatureType) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (signatureType === "typed" && !signatureText) {
    return NextResponse.json({ error: "Typed signature text is required" }, { status: 400 });
  }
  if (signatureType === "drawn" && !signatureImage) {
    return NextResponse.json({ error: "Drawn signature image is required" }, { status: 400 });
  }

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("*, services(name), clients(name,email)")
    .eq("id", bookingId)
    .single();

  if (bookingError || !booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const signedAt = new Date();
  const receiptLine =
    booking.amount_paid_cents != null
      ? `Amount paid: $${(booking.amount_paid_cents / 100).toFixed(2)}`
      : "Amount paid: not recorded";

  const pdfBytes = await generateContractPdf({
    serviceName: booking.services?.name ?? "Massage session",
    sessionDate: new Date(booking.start_time).toLocaleString(),
    receiptLine,
    clientName: signerName,
    initials,
    signatureType,
    signatureText,
    signatureImageBase64: signatureImage,
    signedAt: signedAt.toLocaleString(),
  });
  const pdfBuffer = Buffer.from(pdfBytes);

  // Storage writes need the service-role client — the session client's
  // "authenticated" role has no storage policy on the private bucket.
  const serviceClient = createServiceClient();
  const storagePath = `${bookingId}.pdf`;
  const { error: uploadError } = await serviceClient.storage
    .from("contracts")
    .upload(storagePath, pdfBuffer, { contentType: "application/pdf", upsert: true });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { error: contractError } = await supabase.from("contracts").upsert(
    {
      booking_id: bookingId,
      signer_name: signerName,
      signer_email: signerEmail,
      initials,
      signed_at: signedAt.toISOString(),
      pdf_url: storagePath,
      uploaded_manually: false,
    },
    { onConflict: "booking_id" },
  );

  if (contractError) {
    return NextResponse.json({ error: contractError.message }, { status: 500 });
  }

  const fromEmail = process.env.EMAIL_FROM;
  const notifyEmail = process.env.NOTIFY_EMAIL;
  const emailBody = [
    `Session: ${booking.services?.name}`,
    `Date: ${new Date(booking.start_time).toLocaleString()}`,
    receiptLine,
    "",
    "Your signed session agreement is attached as a PDF.",
    "",
    `Signed by: ${signerName} (initials: ${initials})`,
    `Signed at: ${signedAt.toLocaleString()}`,
  ].join("\n");

  if (fromEmail) {
    try {
      const resend = getResend();
      const attachments = [
        { filename: "peaceflow-agreement.pdf", content: pdfBuffer },
      ];
      await resend.emails.send({
        from: fromEmail,
        to: signerEmail,
        subject: "Your signed agreement & receipt — PeaceFlow Massage",
        text: emailBody,
        attachments,
      });
      if (notifyEmail) {
        await resend.emails.send({
          from: fromEmail,
          to: notifyEmail,
          subject: `Signed contract on file: ${signerName}`,
          text: emailBody,
          attachments,
        });
      }
    } catch (emailError) {
      console.error("Failed to send contract emails", emailError);
    }
  }

  return NextResponse.json({ ok: true });
}
