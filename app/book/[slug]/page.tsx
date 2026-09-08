import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import InquiryForm from "@/components/InquiryForm";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return pageMetadata({
      title: "Book with Me",
      description: "Request an appointment with PeaceFlow Massage in Grand Junction, CO.",
      path: `/book/${slug}`,
    });
  }

  return pageMetadata({
    title: `Book ${service.groupName} — ${service.durationMinutes} Min`,
    description: `Book a ${service.durationMinutes}-minute ${service.groupName.toLowerCase()} session ($${service.price}) with PeaceFlow Massage in Grand Junction, CO.`,
    path: `/book/${slug}`,
  });
}

export default async function BookServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

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
