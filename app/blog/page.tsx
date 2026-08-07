import type { Metadata } from "next";
import Link from "next/link";
import { getPostMetas } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Long-form editorials and deep dives on privacy and security, including an honest review of The Hidden Wiki.",
};

export default function BlogPage() {
  const posts = getPostMetas();

  return (
    <div className="py-10">
      <header className="mb-8">
        <p className="font-mono text-sm text-accent-strong uppercase tracking-wider">long-form</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Blog</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Editorials and deep dives. Written slowly, checked twice, and — you guessed it — leaving
          no trail.
        </p>
        <div className="mt-4">
          <a
            href="/rss.xml"
            className="inline-flex items-center gap-2 rounded-md border border-line bg-raise px-3 py-1.5 text-sm text-ink hover:border-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4 11a9 9 0 0 1 9 9H9a5 5 0 0 0-5-5v-4Zm0-7a16 16 0 0 1 16 16h-4A12 12 0 0 0 4 8V4Zm0 13a2 2 0 1 0 2 2 2 2 0 0 0-2-2Z" />
            </svg>
            RSS feed
          </a>
        </div>
      </header>

      <ul className="grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="flex h-full flex-col rounded-lg border border-line bg-raise p-5 hover:border-accent"
            >
              <div
                className="mb-3 flex h-32 items-center justify-center rounded-md border border-dashed border-line bg-accent-soft/40 text-xs text-muted"
                aria-hidden="true"
              >
                image: {p.title}
              </div>
              <p className="text-xs text-muted">
                <time dateTime={p.date}>{p.date}</time>
              </p>
              <h2 className="mt-2 font-semibold text-ink leading-snug">{p.title}</h2>
              <p className="mt-2 text-sm text-muted line-clamp-3">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded bg-accent-soft px-1.5 py-0.5 text-xs text-accent-strong">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <p className="text-muted">The snail is still composing. Check back slowly.</p>
      )}
    </div>
  );
}
