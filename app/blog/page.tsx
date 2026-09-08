import type { Metadata } from "next";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Blog | PeaceFlow Massage",
};

const pillars = [
  {
    name: "Her Story",
    description:
      "How PeaceFlow came to be, why I practice the way I do, and what's changed as the business has grown.",
  },
  {
    name: "At-Home Care",
    description:
      "Simple things to do between sessions — stretches, heat vs. ice, what actually helps soreness settle.",
  },
  {
    name: "Know Your Massage",
    description:
      "What deep tissue, therapeutic, and prenatal massage each actually do, so you can pick the right one.",
  },
  {
    name: "Life in Grand Junction",
    description:
      "Local spots, gyms, and things going on around town — from someone who works here, not a tourist guide.",
  },
];

export default function BlogIndexPage() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 py-16">
        <span className="eyebrow">Blog</span>
        <h1 className="mt-3 text-4xl sm:text-5xl">Notes from the table</h1>
        <p className="mt-4 max-w-xl text-body">
          I&apos;m building this out with the same philosophy as everything
          else at PeaceFlow — no filler, nothing written just to fill a
          content calendar. First posts are on the way, organized around four
          things I actually want to write about.
        </p>
      </section>

      <section className="border-t border-border-soft bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <div className="grid gap-8 sm:grid-cols-2">
            {pillars.map((p) => (
              <div key={p.name}>
                <h2 className="text-xl">{p.name}</h2>
                <p className="mt-2 text-sm text-body">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="text-2xl">In the meantime</h2>
        <p className="mt-3 max-w-xl text-sm text-body">
          I post more often on Instagram than I&apos;ll ever post here —
          that&apos;s the best place to follow along until the first
          articles are up.
        </p>
        <a
          href={business.instagramUrl}
          className="btn btn-line mt-6 inline-flex"
        >
          Follow {business.instagram}
        </a>
      </section>
    </div>
  );
}
