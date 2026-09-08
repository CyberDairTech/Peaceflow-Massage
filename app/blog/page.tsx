import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/lib/site-data";
import { blogPosts } from "@/lib/blogPosts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on massage, recovery, and running a small practice in Grand Junction, CO, from licensed massage therapist Maranda Jones.",
  alternates: { canonical: "/blog" },
};

const upcomingPillars = [
  {
    name: "Life in Grand Junction",
    description:
      "Local spots, gyms, and things going on around town — from someone who works here, not a tourist guide.",
  },
];

export default function BlogIndexPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 py-16">
        <span className="eyebrow">Blog</span>
        <h1 className="mt-3 text-4xl sm:text-5xl">Notes from the table</h1>
        <p className="mt-4 max-w-xl text-body">
          Written with the same philosophy as everything else at PeaceFlow —
          no filler, nothing posted just to fill a content calendar.
        </p>
      </section>

      <section className="border-t border-border-soft bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <div className="blog-grid">
            {sortedPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                <div
                  className="mb-3 flex aspect-video items-center justify-center border border-dashed border-border bg-linen/50"
                  aria-hidden="true"
                >
                  <span className="text-xs text-body">{post.coverCaption}</span>
                </div>
                <span className="pillar">{post.pillar}</span>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-sm bg-linen px-1.5 py-0.5 text-[0.68rem] text-body">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="text-2xl">Coming soon</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {upcomingPillars.map((p) => (
            <div key={p.name}>
              <h3 className="text-lg text-heading">{p.name}</h3>
              <p className="mt-1 text-sm text-body">{p.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-xl text-sm text-body">
          I also post more often on Instagram than I&apos;ll ever post here —
          that&apos;s the best place to follow along between articles.
        </p>
        <a href={business.instagramUrl} className="btn btn-line mt-6 inline-flex">
          Follow {business.instagram}
        </a>
      </section>
    </div>
  );
}
