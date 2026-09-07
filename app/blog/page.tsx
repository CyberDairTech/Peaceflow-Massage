import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | PeaceFlow Massage",
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="text-xs font-semibold tracking-widest text-accent uppercase">
        Blog
      </span>
      <h1 className="mt-2 text-4xl">Notes from the table</h1>
      <p className="mt-4 text-body">
        First posts are on the way — covering Maranda&apos;s story, at-home
        care between sessions, how to think about different massage
        modalities, and life in Grand Junction.
      </p>
    </div>
  );
}
