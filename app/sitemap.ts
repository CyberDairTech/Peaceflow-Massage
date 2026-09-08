import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogPosts";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const postPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...postPages];
}
