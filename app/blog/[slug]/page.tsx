import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostMetas } from "@/lib/blog";

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

  const { content } = await compileMDX<{}>({ source: post.content });

  return (
    <article className="py-10 max-w-3xl">
      <header className="mb-8">
        <nav className="text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/blog" className="text-accent-strong hover:underline">Blog</Link>
        </nav>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold leading-tight">
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

      <div className="prose-guide">{content}</div>

      <div className="mt-10 border-t border-line pt-6">
        <Link href="/blog" className="text-sm text-accent-strong hover:underline">
          ← All posts
        </Link>
      </div>
    </article>
  );
}
