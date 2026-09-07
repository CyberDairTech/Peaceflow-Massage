import Link from "next/link";
import type { Metadata } from "next";
import { services, membership, gymPartners, cta } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services & Pricing | PeaceFlow Massage",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <span className="text-xs font-semibold tracking-widest text-accent uppercase">
        Services
      </span>
      <h1 className="mt-2 text-4xl">Deep tissue, sized to your day</h1>
      <p className="mt-4 max-w-xl text-body">
        Every session is deep tissue at its core — the length just determines
        how much ground we cover. Choose what fits your schedule below.
      </p>

      <div className="mt-10 space-y-6">
        {services.map((s) => (
          <div
            key={s.slug}
            className="flex flex-col justify-between gap-4 rounded-sm border border-border bg-surface p-6 sm:flex-row sm:items-center"
          >
            <div>
              <h2 className="text-xl">{s.name}</h2>
              <p className="mt-1 text-sm text-body">{s.description}</p>
            </div>
            <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
              <span className="text-xl font-semibold text-heading">${s.price}</span>
              <Link
                href={`/book?service=${s.slug}`}
                className="rounded-sm bg-accent px-5 py-2 text-sm font-semibold text-surface hover:opacity-90"
              >
                {cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-sm border border-border bg-linen/40 p-6">
        <h2 className="text-2xl">Membership — ${membership.price}/{membership.cadence}</h2>
        <p className="mt-2 text-sm text-body">{membership.description}</p>
      </div>

      <div className="mt-6 rounded-sm border border-border bg-surface p-6">
        <h2 className="text-xl">Gym partner discount</h2>
        <ul className="mt-2 space-y-1 text-sm text-body">
          {gymPartners.map((g) => (
            <li key={g.name}>
              {g.name} members: {g.discount}
            </li>
          ))}
        </ul>
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
