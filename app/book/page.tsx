import InquiryForm from "@/components/InquiryForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Book with Me",
  description:
    "Request an appointment with PeaceFlow Massage in Grand Junction, CO — deep tissue, therapeutic, and prenatal massage with Maranda Jones.",
  path: "/book",
});

export default function BookPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <span className="eyebrow">Book with Me</span>
      <h1 className="mt-3 text-4xl">Request an appointment</h1>
      <p className="mt-4 text-sm text-body">
        Not sure which service to pick? Send your preferred time and what
        you're looking for below, or browse{" "}
        <a href="/services" className="text-accent-text underline hover:text-heading">
          services &amp; pricing
        </a>{" "}
        first — booking is available up to two months out.
      </p>

      <div className="mt-8">
        <InquiryForm type="booking_request" />
      </div>
    </div>
  );
}
