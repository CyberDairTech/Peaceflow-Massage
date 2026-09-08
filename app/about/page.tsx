import type { Metadata } from "next";
import Link from "next/link";
import { cta } from "@/lib/site-data";
import { treatmentIcons } from "@/components/treatmentIcons";

const whoIWorkWith = [
  {
    name: "Deep Tissue",
    icon: treatmentIcons.deepTissue,
    audience: "Gym-goers & chronic tension",
  },
  {
    name: "Therapeutic",
    icon: treatmentIcons.therapeutic,
    audience: "Anyone wanting full-body relief",
  },
  {
    name: "Prenatal",
    icon: treatmentIcons.prenatal,
    audience: "Expecting moms",
  },
];

export const metadata: Metadata = {
  title: "About | PeaceFlow Massage",
};

const faqs = [
  {
    question: "What should I expect at my first appointment?",
    answer:
      "We'll start with a quick conversation about what's feeling tight, any injuries or areas to avoid, and what you want out of the session. From there it's hands-on work in a private room, tailored to you.",
  },
  {
    question: "How far in advance can I book?",
    answer:
      "Online booking is open up to two months out. I only take three sessions a day, so times do fill up — especially evenings and weekends.",
  },
  {
    question: "What's your cancellation and no-show policy?",
    answer:
      "Life happens, and I get that — just give me as much notice as you can. A first no-show without notice is understood, but a second means you're no longer able to book future sessions with PeaceFlow.",
  },
  {
    question: "Which massage should I get?",
    answer:
      "If you're not sure, send me a message with what's going on and I'll point you the right way. Generally: deep tissue for gym-related tightness and chronic tension, therapeutic for a versatile full-body session, and prenatal if you're expecting.",
  },
  {
    question: "Do you offer memberships or discounts?",
    answer:
      "Yes — the membership includes a monthly session and member pricing on extra visits (details on the Services page). Lifted Gym members also get $15 off any session.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="about-grid">
          <div
            className="about-visual flex items-center justify-center border border-dashed border-border bg-linen/50"
            aria-hidden="true"
          >
            <span className="text-sm text-body">Photo coming soon</span>
          </div>
          <div>
            <span className="eyebrow">About</span>
            <h1 className="mt-3 text-4xl sm:text-5xl">Hi, I&apos;m Maranda.</h1>
            <div className="mt-6 space-y-4 text-body">
              <p>
                I&apos;m a licensed massage therapist, and I opened PeaceFlow
                Massage right here in downtown Grand Junction to do one thing
                well: hands-on, unhurried bodywork that actually helps.
              </p>
              <p>
                I keep my practice small on purpose — a maximum of three
                bookings a day — so every session gets my full attention
                instead of being squeezed into an assembly line. No
                back-to-back rooms, no rushing out the door. Just one table,
                one client, for the whole hour.
              </p>
            </div>

            <blockquote>
              I want every person who gets on my table to feel like I
              actually have time for them — because I do.
              <cite>Maranda Jones, LMT</cite>
            </blockquote>

            <ul className="value-list">
              <li>Licensed &amp; insured, three years in practice</li>
              <li>One client at a time — no double-booking, ever</li>
              <li>Based in downtown Grand Junction</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <span className="eyebrow">Her Story</span>
          <h2 className="mt-3 text-2xl sm:text-3xl">How I got here</h2>
          <div className="mt-4 space-y-4 text-sm text-body">
            <p>
              Massage therapy found me the way it finds a lot of therapists —
              I was on the receiving end of a lot of bodywork myself before I
              ever thought about doing it for a living, and I noticed how
              differently I felt after a session where the therapist actually
              slowed down and paid attention versus one where I felt like a
              name on a schedule. I wanted to be the first kind.
            </p>
          </div>
          <blockquote>
            I didn&apos;t want a packed schedule, I didn&apos;t want to be
            pushed toward upsells, and I didn&apos;t want to lose the actual
            craft in the business of it.
          </blockquote>
          <p className="text-sm text-body">
            So I trained, got licensed, worked in a few different settings to
            figure out exactly what I didn&apos;t want — and built PeaceFlow
            around the opposite of all that.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-6 py-14">
          <span className="eyebrow">Who It&apos;s For</span>
          <h2 className="mt-3 text-2xl sm:text-3xl">Who I work with</h2>
          <p className="mt-4 max-w-[60ch] text-sm text-body">
            A lot of my regulars are gym-goers dealing with tight hips, sore
            shoulders, and the kind of soreness that doesn&apos;t go away on
            its own between training blocks — deep tissue is my signature
            modality for exactly that reason. But whoever you are, we&apos;ll
            talk through what you want out of the session before we start.
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {whoIWorkWith.map((w) => (
              <div key={w.name} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="treat-badge">{w.icon}</div>
                <h3 className="mt-3 text-lg text-heading">{w.name}</h3>
                <p className="mt-1 text-sm text-body">{w.audience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-linen/40">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <span className="eyebrow">How It Works</span>
          <h2 className="mt-3 text-2xl sm:text-3xl">What to expect</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div className="expect-item">
              <span className="expect-num">01</span>
              <h3>In the room</h3>
              <p>
                Every session starts with a quick conversation — what&apos;s
                feeling tight, what you&apos;re training for, what you want
                more or less of. From there it&apos;s hands-on work, tailored
                in the room, not a fixed routine run on autopilot.
              </p>
            </div>
            <div className="expect-item">
              <span className="expect-num">02</span>
              <h3>Booking &amp; rescheduling</h3>
              <p>
                Booking is open up to two months out, and I hold my calendar
                to three sessions a day so I&apos;m never rushing to the next
                client. If something comes up, just give me as much notice as
                you can.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 border-t border-border-soft">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-3 text-2xl sm:text-3xl">Questions I hear a lot</h2>
          <div className="mt-6">
            {faqs.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border-soft bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center">
          <h2 className="text-2xl sm:text-3xl">Ready to book?</h2>
          <Link href="/services" className="btn btn-solid mt-6 inline-flex">
            {cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
