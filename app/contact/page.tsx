import type { Metadata } from "next";
import { business, hours } from "@/lib/site-data";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Contact | PeaceFlow Massage",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <span className="text-xs font-semibold tracking-widest text-accent uppercase">
        Contact
      </span>
      <h1 className="mt-2 text-4xl">Let&apos;s get you scheduled</h1>

      <div className="mt-10 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-xl text-heading">Reach me directly</h2>
          <p className="mt-2 text-sm text-body">
            {business.address.line1}
            <br />
            {business.address.city}, {business.address.state} {business.address.zip}
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
        </div>

        <div>
          <InquiryForm type="contact" />
        </div>
      </div>
    </div>
  );
}
