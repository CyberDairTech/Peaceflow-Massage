import type { Metadata } from "next";
import Link from "next/link";
import { business, cta } from "@/lib/site-data";
import PriceMenu from "@/components/PriceMenu";
import SignatureTreatments from "@/components/SignatureTreatments";
import MembershipBanner from "@/components/MembershipBanner";

export const metadata: Metadata = {
  title: {
    absolute: "PeaceFlow Massage | Grand Junction, CO",
  },
  description:
    "One-on-one deep tissue, therapeutic, and prenatal massage in Grand Junction, CO with licensed massage therapist Maranda Jones. Book online, up to two months out.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "PeaceFlow Massage | Grand Junction, CO",
    description:
      "One-on-one deep tissue, therapeutic, and prenatal massage in Grand Junction, CO with licensed massage therapist Maranda Jones.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "PeaceFlow Massage | Grand Junction, CO",
    description:
      "One-on-one deep tissue, therapeutic, and prenatal massage in Grand Junction, CO with licensed massage therapist Maranda Jones.",
  },
};

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
            One-on-one massage therapy with Maranda Jones — real time set
            aside, on a table that's only ever seeing one client at a time.
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

      {/* Signature treatments */}
      <section className="border-t border-border-soft bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">What I Offer</span>
              <h2 className="mt-3 text-3xl sm:text-4xl">Signature Treatments</h2>
            </div>
            <p className="max-w-[34ch] text-sm text-body">
              Three ways to spend an hour — all of them one-on-one, all of
              them paced to you.
            </p>
          </div>
          <SignatureTreatments />
        </div>
      </section>

      {/* About teaser */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="about-grid">
            <div className="about-visual texture" />
            <div>
              <span className="eyebrow">About Maranda</span>
              <h2 className="mt-3 text-3xl sm:text-4xl">A slower kind of care</h2>
              <p className="mt-4 max-w-[52ch] text-body">
                I&apos;ve been a licensed massage therapist for three years,
                and I still build my schedule the same way I did on day one —
                one person at a time, with real space in between appointments.
              </p>
              <p className="mt-4 max-w-[52ch] text-body">
                Nothing here gets rushed to make room for the next booking. If
                you want quiet, we&apos;re quiet. If you&apos;d rather talk
                through what&apos;s been sore, we talk. Either way, the hour
                is yours.
              </p>
              <blockquote>
                &ldquo;I never wanted PeaceFlow to feel like a spa menu. I
                wanted it to feel like someone actually thought about
                you.&rdquo;
                <cite>Maranda Jones, LMT</cite>
              </blockquote>
              <ul className="value-list">
                <li>Licensed &amp; insured, three years in practice</li>
                <li>One client at a time — no double-booking</li>
                <li>Based in downtown Grand Junction</li>
              </ul>
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
          <MembershipBanner />
        </div>
      </section>

      {/* Your first visit */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-[52ch]">
            <span className="eyebrow">New Here?</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">Your first visit</h2>
          </div>
          <div className="expect-grid">
            <div className="expect-item">
              <span className="expect-num">01</span>
              <h3>Before you arrive</h3>
              <p>
                Fill out a short health form online, so we&apos;re not
                spending your session on paperwork.
              </p>
            </div>
            <div className="expect-item">
              <span className="expect-num">02</span>
              <h3>During your session</h3>
              <p>
                Tell me what&apos;s going on — sore spots, stress, an old
                injury — and I&apos;ll build the hour around it.
              </p>
            </div>
            <div className="expect-item">
              <span className="expect-num">03</span>
              <h3>Before you go</h3>
              <p>
                Water, a stretch or two to take home, and a note on what to
                expect over the next day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="trust">
        <div className="trust-item">
          <span className="num">3+</span>
          <span className="label">Years in Practice</span>
        </div>
        <div className="trust-item">
          <span className="num">Licensed</span>
          <span className="label">&amp; Insured</span>
        </div>
        <div className="trust-item">
          <span className="num">Downtown</span>
          <span className="label">Grand Junction</span>
        </div>
      </div>

      {/* Closing CTA */}
      <section className="closer texture">
        <div className="mx-auto max-w-2xl px-6">
          <p className="wordmark mb-4 text-3xl" style={{ color: "var(--on-dark)" }}>
            peaceflow
          </p>
          <h2>Ready when you are.</h2>
          <p>
            No account needed to look around — just pick a time that works,
            and I&apos;ll take care of the rest.
          </p>
          <Link href="/services" className="btn btn-on-dark">
            {cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
