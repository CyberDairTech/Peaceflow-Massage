import Link from "next/link";
import { business, hours, membership, gymPartners, cta } from "@/lib/site-data";
import PriceMenu from "@/components/PriceMenu";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="grid md:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col justify-center gap-6 px-6 py-16 sm:px-10 md:py-24">
          <span className="eyebrow">
            {business.address.city}, {business.address.state}
          </span>
          <h1 className="text-5xl leading-[1.06] font-normal sm:text-6xl">
            Come as you are.
            <br />
            Leave a little lighter.
          </h1>
          <p className="max-w-[34ch] text-lg text-body">
            One-on-one deep tissue massage with Maranda Jones — real time set
            aside for gym-goers who need genuine recovery, not a spa gimmick.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-6">
            <Link href="/services" className="btn btn-solid">
              {cta}
            </Link>
            <a href="#menu" className="sub-link">
              See the menu ↓
            </a>
          </div>
        </div>
        <div className="texture relative min-h-[300px] md:min-h-[420px]">
          <span
            className="mark"
            style={{ fontSize: "9rem", left: "-6%", top: "32%", transform: "rotate(-4deg)" }}
          >
            peaceflow
          </span>
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

      {/* Pricing menu */}
      <section className="border-t border-border-soft bg-linen">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <PriceMenu />
        </div>
      </section>

      {/* Membership */}
      <section className="border-t border-border-soft bg-linen/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid items-center gap-10 border-l-2 border-gold py-1 pl-6 md:grid-cols-2 md:pl-8">
            <div>
              <span className="eyebrow">Membership</span>
              <h2 className="mt-3 text-3xl">
                From ${membership.price}/{membership.cadence}
              </h2>
              <p className="mt-3 max-w-md text-sm text-body">{membership.description}</p>
              <p className="mt-2 max-w-md text-xs text-body/70">
                Plans will eventually be fully build-your-own — pick your
                services and how many sessions a month, and pricing adjusts
                from there.
              </p>
            </div>
            <div>
              <Link href="/contact" className="btn btn-gold">
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
            <Link href="/services" className="btn btn-solid">
              {cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
