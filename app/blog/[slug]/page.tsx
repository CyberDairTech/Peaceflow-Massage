import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, blogPosts } from "@/lib/blogPosts";
import { cta } from "@/lib/site-data";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <span className="eyebrow">{post.pillar}</span>
      <h1 className="mt-3 text-4xl">{post.title}</h1>
      <p className="mt-2 text-sm text-body">
        {new Date(post.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        })}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-sm border border-border bg-linen/40 px-2 py-1 text-xs text-body"
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className="mt-8 flex aspect-video items-center justify-center border border-dashed border-border bg-linen/50"
        aria-hidden="true"
      >
        <span className="text-sm text-body">{post.coverCaption}</span>
      </div>

      <div className="mt-8 space-y-8">
        {post.blocks.map((block, i) =>
          block.type === "image" ? (
            <div
              key={i}
              className="flex aspect-video items-center justify-center border border-dashed border-border bg-linen/50"
              aria-hidden="true"
            >
              <span className="text-sm text-body">{block.caption}</span>
            </div>
          ) : (
            <div key={i}>
              <h2 className="text-xl text-heading">{block.question}</h2>
              <p className="mt-2 text-body">{block.answer}</p>
              {block.sourceUrl && (
                <p className="mt-2 text-xs text-body">
                  Source:{" "}
                  <a
                    href={block.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-text underline hover:text-heading"
                  >
                    {block.sourceName}
                  </a>
                </p>
              )}
            </div>
          ),
        )}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-border-soft pt-8">
        <Link href="/services" className="btn btn-solid">
          {cta}
        </Link>
        <Link href="/blog" className="sub-link">
          ← Back to the blog
        </Link>
      </div>
    </article>
  );
}
