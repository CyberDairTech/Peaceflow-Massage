import Link from "next/link";
import { business, hours, membership, gymPartners, services, cta } from "@/lib/site-data";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold tracking-widest text-accent uppercase">
              {business.address.city}, {business.address.state}
            </span>
            <h1 className="mt-3 text-5xl leading-[1.05]">
              Come as you are.
              <br />
              Leave a little lighter.
            </h1>
            <p className="mt-6 max-w-md text-lg text-body">
              I&apos;m Maranda — a licensed massage therapist focused on deep
              tissue work for people who train hard and need real recovery,
              not a spa gimmick.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/services"
                className="rounded-sm bg-accent px-6 py-3 font-semibold text-surface hover:opacity-90"
              >
                {cta}
              </Link>
              <a href={`tel:${business.phone}`} className="text-sm font-semibold text-heading hover:text-accent">
                {business.phone}
              </a>
            </div>
          </div>
          <div className="aspect-square rounded-sm border border-border bg-linen" />
        </div>
      </section>

      {/* Signature modality */}
      <section className="border-t border-border-soft bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <h2 className="text-2xl">Deep tissue, done right</h2>
              <p className="mt-3 text-sm text-body">
                Every session is built around deep tissue technique — the
                modality that actually moves the needle for gym-goers dealing
                with tight hips, sore shoulders, and everything in between.
                Not sports medicine, not a spa day. Just focused, effective
                recovery work.
              </p>
            </div>
            <div>
              <h2 className="text-2xl">A small practice, on purpose</h2>
              <p className="mt-3 text-sm text-body">
                I keep my schedule to a max of three bookings a day so every
                session gets my full, unhurried attention. No rushing, no
                assembly line.
              </p>
            </div>
            <div>
              <h2 className="text-2xl">Partnered with your gym</h2>
              <p className="mt-3 text-sm text-body">
                {gymPartners.map((g) => g.name).join(" & ")} members get{" "}
                {gymPartners[0].discount.toLowerCase()} — just mention it when
                you book.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services teaser */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl">Sessions &amp; pricing</h2>
          <Link href="/services" className="text-sm font-semibold text-accent hover:underline">
            See all services →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.slug} className="rounded-sm border border-border bg-surface p-6">
              <h3 className="text-xl">{s.name}</h3>
              <p className="mt-2 text-sm text-body">{s.description}</p>
              <p className="mt-4 font-semibold text-heading">${s.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Membership */}
      <section className="border-t border-border-soft bg-linen/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="text-xs font-semibold tracking-widest text-gold uppercase">
                Membership
              </span>
              <h2 className="mt-2 text-3xl">${membership.price}/{membership.cadence}</h2>
              <p className="mt-3 max-w-md text-sm text-body">{membership.description}</p>
            </div>
            <div>
              <Link
                href="/contact"
                className="inline-block rounded-sm bg-heading px-6 py-3 font-semibold text-surface hover:opacity-90"
              >
                Ask about membership
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hours + CTA */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl">Hours</h2>
            <ul className="mt-4 space-y-2 text-sm text-body">
              {hours.map((h) => (
                <li key={h.days} className="flex justify-between border-b border-border-soft pb-2">
                  <span>{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start justify-center gap-4 rounded-sm border border-border bg-surface p-8">
            <h2 className="text-2xl">Ready when you are</h2>
            <p className="text-sm text-body">
              Booking opens up to two months out, so grab the time that works
              for you.
            </p>
            <Link
              href="/services"
              className="rounded-sm bg-accent px-6 py-3 font-semibold text-surface hover:opacity-90"
            >
              {cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
