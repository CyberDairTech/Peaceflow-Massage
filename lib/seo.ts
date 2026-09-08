import type { Metadata } from "next";

/**
 * Builds consistent per-page metadata: title (through the root layout's
 * "%s | PeaceFlow Massage" template), description, self-referencing
 * canonical, and matching Open Graph / Twitter Card tags.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { card: "summary_large_image", title, description },
  };
}
