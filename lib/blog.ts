import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft?: boolean;
}

export interface PostFull extends PostMeta {
  content: string;
}

export function getPostFiles(): string[] {
  const dir = join(process.cwd(), "content", "blog");
  return readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

export function getPostMetas(): PostMeta[] {
  const dir = join(process.cwd(), "content", "blog");
  return getPostFiles()
    .map((f) => {
      const raw = readFileSync(join(dir, f), "utf8");
      const { data } = matter(raw);
      return {
        slug: f.replace(/\.mdx$/, ""),
        title: String(data.title ?? f),
        description: String(data.description ?? ""),
        date: data.date ? String(data.date) : "",
        tags: (data.tags as string[]) ?? [],
        draft: (data.draft as boolean) ?? false,
      };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): PostFull | null {
  const dir = join(process.cwd(), "content", "blog");
  const file = `${slug}.mdx`;
  try {
    const raw = readFileSync(join(dir, file), "utf8");
    const { content, data } = matter(raw);
    if (data.draft) return null;
    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: data.date ? String(data.date) : "",
      tags: (data.tags as string[]) ?? [],
      content,
    };
  } catch {
    return null;
  }
}

export const POST_SLUGS = () => getPostMetas().map((p) => p.slug);
