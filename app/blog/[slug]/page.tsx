import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostMetas } from "@/lib/blog";
import { extractToc } from "@/lib/toc";
import { ArticleShell, headingComponents } from "@/components/ArticleShell";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPostMetas().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX<{}>({
    source: post.content,
    components: headingComponents(),
  });
  const toc = extractToc(post.content);
  const otherPosts = getPostMetas().filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <ArticleShell
      toc={toc}
      breadcrumb={<Link href="/blog" className="text-accent-strong hover:underline">Blog</Link>}
      sideLinks={otherPosts.map((p) => ({ href: `/blog/${p.slug}`, label: `Post: ${p.title}` }))}
    >
      <header className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
          {post.title}
        </h1>
        <p className="mt-3 text-muted">{post.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <p className="text-xs text-muted">
            <time dateTime={post.date}>{post.date}</time>
          </p>
          {post.tags.map((t) => (
            <span key={t} className="rounded bg-raise border border-line px-2 py-0.5 text-xs text-muted">
              {t}
            </span>
          ))}
        </div>
      </header>

      <div className="prose-guide [&_h2]:scroll-mt-24">{content}</div>

      <div className="mt-10">
        <Link href="/blog" className="text-sm text-accent-strong hover:underline">
          ← All posts
        </Link>
      </div>
    </ArticleShell>
  );
}
