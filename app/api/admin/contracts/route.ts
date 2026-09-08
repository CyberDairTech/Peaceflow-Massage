import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server-auth";
import { getResend } from "@/lib/resend";
import { contractPolicyParagraphs } from "@/lib/contract";

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { bookingId, signerName, signerEmail, initials } = await request.json();
  if (!bookingId || !signerName || !signerEmail || !initials) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("*, services(name), clients(name,email)")
    .eq("id", bookingId)
    .single();

  if (bookingError || !booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const signedAt = new Date().toISOString();

  const { error: contractError } = await supabase.from("contracts").upsert(
    {
      booking_id: bookingId,
      signer_name: signerName,
      signer_email: signerEmail,
      initials,
      signed_at: signedAt,
      uploaded_manually: false,
    },
    { onConflict: "booking_id" },
  );

  if (contractError) {
    return NextResponse.json({ error: contractError.message }, { status: 500 });
  }

  const fromEmail = process.env.EMAIL_FROM;
  const notifyEmail = process.env.NOTIFY_EMAIL;
  const receiptLine =
    booking.amount_paid_cents != null
      ? `Amount paid: $${(booking.amount_paid_cents / 100).toFixed(2)}`
      : "Amount paid: not recorded";

  const emailBody = [
    `Session: ${booking.services?.name}`,
    `Date: ${new Date(booking.start_time).toLocaleString()}`,
    receiptLine,
    "",
    ...contractPolicyParagraphs,
    "",
    `Signed by: ${signerName} (initials: ${initials})`,
    `Signed at: ${new Date(signedAt).toLocaleString()}`,
  ].join("\n");

  if (fromEmail) {
    try {
      const resend = getResend();
      await resend.emails.send({
        from: fromEmail,
        to: signerEmail,
        subject: "Your signed agreement & receipt — PeaceFlow Massage",
        text: emailBody,
      });
      if (notifyEmail) {
        await resend.emails.send({
          from: fromEmail,
          to: notifyEmail,
          subject: `Signed contract on file: ${signerName}`,
          text: emailBody,
        });
      }
    } catch (emailError) {
      console.error("Failed to send contract emails", emailError);
    }
  }

  return NextResponse.json({ ok: true });
}
