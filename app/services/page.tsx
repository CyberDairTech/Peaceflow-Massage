import type { Metadata } from "next";
import { membership } from "@/lib/site-data";
import PriceMenu from "@/components/PriceMenu";

export const metadata: Metadata = {
  title: "Services & Pricing | PeaceFlow Massage",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <PriceMenu />

      <div className="mt-14 rounded-sm border border-border bg-linen/40 p-6">
        <span className="eyebrow">Membership</span>
        <h2 className="mt-3 text-2xl">
          From ${membership.price}/{membership.cadence}
        </h2>
        <p className="mt-2 text-sm text-body">{membership.description}</p>
      </div>

      <div className="mt-10 rounded-sm border border-dashed border-border p-6 text-sm text-body">
        <p>
          Cancellation &amp; no-show policy: life happens, but repeated
          last-minute cancellations aren&apos;t workable for a small practice.
          A first no-show is understood — a second means we&apos;re no longer
          able to keep booking together. Full terms are included when you
          book.
        </p>
      </div>
    </div>
  );
}
