import type { Metadata } from "next";
import Link from "next/link";
import { cta } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About | PeaceFlow Massage",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="eyebrow">About</span>
      <h1 className="mt-3 text-4xl">Hi, I&apos;m Maranda.</h1>
      <div className="mt-6 space-y-4 text-body">
        <p>
          I&apos;ve been a licensed massage therapist for three years, and I
          opened PeaceFlow Massage in Grand Junction to do one thing well:
          deep tissue work that actually helps people who train hard recover.
        </p>
        <p>
          I keep my practice small on purpose — a maximum of three bookings a
          day — so every session gets my full attention instead of being
          squeezed into an assembly line. If you&apos;re a gym-goer dealing
          with tight hips, sore shoulders, or the kind of soreness that
          doesn&apos;t go away on its own, that&apos;s exactly who I built
          this practice for.
        </p>
        <p>
          This isn&apos;t sports medicine and it isn&apos;t a spa day
          — it&apos;s focused, unhurried recovery work, one client at a time.
        </p>
      </div>
      <Link href="/services" className="btn btn-solid mt-10">
        {cta}
      </Link>
    </div>
  );
}
