import { business, hours } from "@/lib/site-data";
import InquiryForm from "@/components/InquiryForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact PeaceFlow Massage in Grand Junction, CO — address, phone, hours, and a message form to ask about booking, membership, or availability.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <span className="eyebrow">Contact</span>
      <h1 className="mt-3 text-4xl">Let&apos;s get you scheduled</h1>
      <p className="mt-4 max-w-2xl text-body">
        Send a message below for booking questions, membership details, or
        anything else — I read these myself and typically get back to you
        within a day. For a specific appointment time, it&apos;s usually
        fastest to book directly from the{" "}
        <a href="/services" className="text-accent-text underline hover:text-heading">
          services page
        </a>
        .
      </p>

      <div className="mt-10 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-xl text-heading">Reach me directly</h2>
          <p className="mt-2 text-sm text-body">
            {business.address.line1}
            <br />
            {business.address.city}, {business.address.state} {business.address.zip}
          </p>
          <p className="mt-2 text-sm text-body">
            Suite 218 is upstairs — look for the building directory near the
            entrance. Street parking is available along Main St.
          </p>
          <p className="mt-2 text-sm">
            <a href={`tel:${business.phone}`} className="font-semibold text-heading hover:text-accent">
              {business.phone}
            </a>
          </p>
          <p className="mt-2 text-sm">
            <a href={business.instagramUrl} className="font-semibold text-heading hover:text-accent">
              {business.instagram}
            </a>
          </p>

          <h2 className="mt-8 text-xl text-heading">Hours</h2>
          <ul className="mt-2 space-y-1 text-sm text-body">
            {hours.map((h) => (
              <li key={h.days}>
                {h.days}: {h.time}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-body">
            A reminder on the cancellation &amp; no-show policy: please give
            as much notice as you can if you need to reschedule. A first
            no-show is understood — a second means you&apos;re no longer able
            to book future sessions with PeaceFlow.
          </p>
        </div>

        <div>
          <InquiryForm type="contact" />
        </div>
      </div>
    </div>
  );
}
