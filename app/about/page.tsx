import type { Metadata } from "next";
import Link from "next/link";
import { cta } from "@/lib/site-data";

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
          <h2 className="text-2xl">How I got here</h2>
          <div className="mt-4 space-y-4 text-sm text-body">
            <p>
              Massage therapy found me the way it finds a lot of therapists —
              I was on the receiving end of a lot of bodywork myself before I
              ever thought about doing it for a living, and I noticed how
              differently I felt after a session where the therapist actually
              slowed down and paid attention versus one where I felt like a
              name on a schedule. I wanted to be the first kind.
            </p>
            <p>
              I trained and got licensed, worked in a few different settings
              to figure out what I didn&apos;t want to do — I didn&apos;t want
              a packed schedule, I didn&apos;t want to be pushed toward
              upsells, and I didn&apos;t want to lose the actual craft in the
              business of it. So I built PeaceFlow around the opposite of all
              that.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="text-2xl">Who I work with</h2>
        <div className="mt-4 space-y-4 text-sm text-body">
          <p>
            A lot of my regulars are gym-goers — people dealing with tight
            hips, sore shoulders, and the kind of soreness that doesn&apos;t
            go away on its own between training blocks. Deep tissue is my
            signature modality for exactly that reason: it&apos;s not sports
            medicine and it isn&apos;t a spa day, it&apos;s focused work on
            the areas holding tension.
          </p>
          <p>
            I also see people who just want a really good therapeutic massage
            — full-body, versatile, tailored to whatever you tell me you need
            that day — and I work with expecting moms through prenatal
            massage, adapted to wherever they are in pregnancy. Whoever you
            are, we&apos;ll talk through what you want out of the session
            before we start.
          </p>
        </div>
      </section>

      <section className="border-t border-border-soft bg-linen/40">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h2 className="text-2xl">What to expect</h2>
          <div className="mt-4 space-y-3 text-sm text-body">
            <p>
              Every session starts with a quick conversation — what&apos;s
              feeling tight, what you&apos;re training for, what you want more
              or less of. From there it&apos;s hands-on work, tailored in the
              room, not a fixed routine run on autopilot.
            </p>
            <p>
              Booking is open up to two months out, and I hold my calendar to
              three sessions a day so I&apos;m never rushing to the next
              client. If something comes up, just give me as much notice as
              you can — life happens, and I&apos;d rather you reschedule than
              push through and not get what you need out of it.
            </p>
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
