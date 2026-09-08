import type { Metadata } from "next";
import Link from "next/link";
import { gymPartners, cta } from "@/lib/site-data";
import PriceMenu from "@/components/PriceMenu";
import SignatureTreatments from "@/components/SignatureTreatments";
import MembershipBanner from "@/components/MembershipBanner";

export const metadata: Metadata = {
  title: "Services & Pricing | PeaceFlow Massage",
};

export default function ServicesPage() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 py-16">
        <span className="eyebrow">Services</span>
        <h1 className="mt-3 text-4xl sm:text-5xl">Find your session</h1>
        <p className="mt-4 max-w-[52ch] text-body">
          Everything below is one-on-one, in a single room, with a therapist
          who isn&apos;t juggling three other clients at the same time. Pick
          a massage type, then the length that fits your day.
        </p>
      </section>

      <section className="border-t border-border-soft bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10">
            <span className="eyebrow">What I Offer</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">Signature Treatments</h2>
          </div>
          <SignatureTreatments />
        </div>
      </section>

      <section className="border-t border-border-soft bg-linen">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <PriceMenu showHeading={false} />
        </div>
      </section>

      <section className="border-t border-border-soft bg-linen/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <MembershipBanner />
        </div>
      </section>

      <section className="border-t border-border-soft">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl">Good to know</h2>
          <div className="mt-6 space-y-6 text-sm text-body">
            <div>
              <h3 className="font-semibold text-heading">Booking window</h3>
              <p className="mt-1">
                Online booking is open up to two months out, so you can grab
                the time that actually works before it&apos;s gone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-heading">Gym partner discount</h3>
              <p className="mt-1">
                {gymPartners.map((g) => g.name).join(" & ")} members get{" "}
                {gymPartners[0].discount.toLowerCase()} — just mention it when
                you book.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-heading">Cancellation &amp; no-show policy</h3>
              <p className="mt-1">
                Life happens, but repeated last-minute cancellations
                aren&apos;t workable for a small, one-therapist practice. A
                first no-show is understood — a second means you&apos;re no
                longer able to book future sessions with PeaceFlow. Full terms
                are included when you book.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl">Not sure what to pick?</h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-sm text-body">
            Send a message and tell me what&apos;s going on — I&apos;ll point
            you toward the right session.
          </p>
          <Link href="/contact" className="btn btn-solid mt-6 inline-flex">
            {cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
