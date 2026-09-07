import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getResend } from "@/lib/resend";
import { services } from "@/lib/site-data";

type ContactBody = {
  type: "contact" | "booking_request";
  name: string;
  email: string;
  phone?: string;
  serviceSlug?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactBody>;

  if (!body.name || !body.email || !body.type) {
    return NextResponse.json(
      { error: "Name, email, and type are required." },
      { status: 400 },
    );
  }

  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("inquiries")
    .insert({
      type: body.type,
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
      service_slug: body.serviceSlug ?? null,
      preferred_date: body.preferredDate ?? null,
      preferred_time: body.preferredTime ?? null,
      message: body.message ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to save inquiry", error);
    return NextResponse.json(
      { error: "Something went wrong saving your request." },
      { status: 500 },
    );
  }

  const service = services.find((s) => s.slug === body.serviceSlug);
  const fromEmail = process.env.EMAIL_FROM;
  const notifyEmail = process.env.NOTIFY_EMAIL;

  if (fromEmail && notifyEmail) {
    try {
      const resend = getResend();
      const subject =
        body.type === "booking_request"
          ? `New booking request: ${service?.name ?? "a service"}`
          : "New contact form message";

      await resend.emails.send({
        from: fromEmail,
        to: notifyEmail,
        subject,
        text: [
          `Name: ${body.name}`,
          `Email: ${body.email}`,
          body.phone ? `Phone: ${body.phone}` : null,
          service ? `Service: ${service.name}` : null,
          body.preferredDate ? `Preferred date: ${body.preferredDate}` : null,
          body.preferredTime ? `Preferred time: ${body.preferredTime}` : null,
          body.message ? `Message: ${body.message}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      });

      await resend.emails.send({
        from: fromEmail,
        to: body.email,
        subject: "We got your message — PeaceFlow Massage",
        text: `Hi ${body.name},\n\nThanks for reaching out to PeaceFlow Massage${
          service ? ` about ${service.name}` : ""
        }. Maranda will get back to you shortly to confirm.\n\n— PeaceFlow Massage`,
      });
    } catch (emailError) {
      // The inquiry is already saved in Supabase; don't fail the request over email delivery.
      console.error("Failed to send inquiry emails", emailError);
    }
  }

  return NextResponse.json({ id: data.id });
}
