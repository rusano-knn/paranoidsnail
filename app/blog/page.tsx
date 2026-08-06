import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <div className="py-10">
      <p className="font-mono text-sm text-accent-strong uppercase tracking-wider">long-form</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Blog</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Editorials and deep dives. The snail&apos;s first essay is in the works.
      </p>
    </div>
  );
}
