import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getGuideBySlug, getGuideMetas, GUIDE_CATEGORIES } from "@/lib/guides";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getGuideMetas().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.description };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const { content } = await compileMDX<{}>({ source: guide.content });
  const category = GUIDE_CATEGORIES[guide.category];

  return (
    <article className="py-10 max-w-3xl">
      <header className="mb-8">
        <nav className="text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/guides" className="text-accent-strong hover:underline">Guides</Link>
          <span aria-hidden="true"> / </span>
          <span>{category?.label ?? guide.category}</span>
        </nav>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold leading-tight">
          {guide.title}
        </h1>
        {guide.date && (
          <p className="mt-2 text-xs text-muted">
            <time dateTime={guide.date}>{guide.date}</time>
          </p>
        )}
        {guide.description && <p className="mt-3 text-muted">{guide.description}</p>}
        {guide.tlDr && (
          <p className="mt-4 rounded-lg border border-accent/40 bg-accent-soft/50 p-4 text-sm">
            <strong className="font-semibold">TL;DR: </strong>
            {guide.tlDr}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {guide.tags.map((t) => (
            <span key={t} className="rounded bg-raise border border-line px-2 py-0.5 text-xs text-muted">
              {t}
            </span>
          ))}
        </div>
      </header>

      <div className="prose-guide">{content}</div>

      <div className="mt-10 border-t border-line pt-6">
        <Link href="/guides" className="text-sm text-accent-strong hover:underline">
          ← All guides
        </Link>
      </div>
    </article>
  );
}
