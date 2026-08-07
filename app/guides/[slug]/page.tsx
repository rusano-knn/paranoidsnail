import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getGuideBySlug, getGuideMetas, GUIDE_CATEGORIES } from "@/lib/guides";
import { extractToc } from "@/lib/toc";
import { ArticleShell, headingComponents } from "@/components/ArticleShell";
import { getTools } from "@/lib/tools";

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

  const { content } = await compileMDX<{}>({
    source: guide.content,
    components: headingComponents(),
  });
  const category = GUIDE_CATEGORIES[guide.category];
  const toc = extractToc(guide.content);

  const toolsByName = new Map(getTools().tools.map((t) => [t.name.toLowerCase(), t]));
  const sideLinks = (guide.relatedTools ?? [])
    .map((name) => toolsByName.get(name.toLowerCase()))
    .filter(Boolean)
    .map((t) => ({ href: `/tools?q=${encodeURIComponent(t!.name)}`, label: `Tool: ${t!.name}` }));
  const otherGuides = getGuideMetas().filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <ArticleShell
      toc={toc}
      breadcrumb={
        <>
          <Link href="/guides" className="text-accent-strong hover:underline">Guides</Link>
          {" / "}
          {category?.label ?? guide.category}
        </>
      }
      sideLinks={[
        ...sideLinks,
        ...otherGuides.map((g) => ({ href: `/guides/${g.slug}`, label: `Guide: ${g.title}` })),
      ]}
    >
      <header className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight">{guide.title}</h1>
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

      <div className="prose-guide [&_h2]:scroll-mt-24">
        {content}
      </div>

      <div className="mt-10">
        <Link href="/guides" className="text-sm text-accent-strong hover:underline">
          ← All guides
        </Link>
      </div>
    </ArticleShell>
  );
}
