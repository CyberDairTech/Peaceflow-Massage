import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Book with Me | PeaceFlow Massage",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service: serviceSlug } = await searchParams;
  const service = serviceSlug ? await getServiceBySlug(serviceSlug) : null;

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <span className="eyebrow">Book with Me</span>
      <h1 className="mt-3 text-4xl">
        {service ? service.name : "Request an appointment"}
      </h1>
      {service && (
        <p className="mt-2 text-body">
          {service.durationMinutes} minutes · ${service.price}
        </p>
      )}
      <p className="mt-4 text-sm text-body">
        Online self-scheduling with instant payment is coming soon. For now,
        send your preferred time below and I&apos;ll confirm by email or
        phone — booking is available up to two months out.
      </p>

      <div className="mt-8">
        <InquiryForm type="booking_request" service={service ?? undefined} />
      </div>
    </div>
  );
}
