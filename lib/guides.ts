import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { sanitizeText } from "@/lib/sanitize";

export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
  date: string;
  tags: string[];
  tlDr?: string;
  relatedTools?: string[];
}

export interface GuideFull {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  tags: string[];
  tlDr?: string;
  relatedTools?: string[];
  content: string;
}

export const GUIDE_CATEGORIES: Record<string, { label: string; tagline: string }> = {
  "getting-started": { label: "Getting Started", tagline: "Begin here. Low effort, high payoff." },
  browsers: { label: "Browsers & Search", tagline: "Leak less on the open web." },
  email: { label: "Email & Messaging", tagline: "Encrypted, boring, safe." },
  network: { label: "Network & VPN", tagline: "Keep your ISP out of your business." },
  passwords: { label: "Passwords & 2FA", tagline: "The boring stuff that saves everything." },
  os: { label: "OS & Hardening", tagline: "Your machine, behaving itself." },
  darknet: { label: "Darknet & Tor", tagline: "Reputable onion services, safety first." },
};

let cache: (GuideMeta & { file: string })[] | null = null;

/**
 * Reads guide/bundle directories. For Guides we read frontmatter only (cheap, lazy)
 * and return metadata; content is loaded per-slug for the article page.
 */
export function getGuideMetas(): (GuideMeta & { file: string })[] {
  if (cache) return cache;
  const dir = join(process.cwd(), "content", "guides");
  const files = readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  cache = files
    .map((f) => {
      const raw = readFileSync(join(dir, f), "utf8");
      const { data } = matter(raw);
      return {
        slug: f.replace(/\.mdx$/, ""),
        file: f,
        title: sanitizeText(data.title ?? f),
        description: sanitizeText(data.description),
        category: sanitizeText(data.category) || "getting-started",
        order: (data.order as number) ?? 999,
        date: data.date ? String(data.date) : "",
        tags: (data.tags as unknown[] ?? []).map((t) => sanitizeText(t)),
        tlDr: data.tlDr ? sanitizeText(data.tlDr) : undefined,
        relatedTools: (data.relatedTools as unknown[] ?? []).map((t) => sanitizeText(t)),
      };
    })
    .sort((a, b) => a.order - b.order);
  return cache;
}

export function getGuideBySlug(slug: string): GuideFull | null {
  const metas = getGuideMetas();
  const meta = metas.find((m) => m.slug === slug);
  if (!meta) return null;
  const raw = readFileSync(join(process.cwd(), "content", "guides", meta.file), "utf8");
  const { content, data } = matter(raw);
  return {
    slug: meta.slug,
    title: sanitizeText(data.title),
    description: sanitizeText(data.description),
    category: sanitizeText(data.category),
    date: data.date ? String(data.date) : "",
    tags: (data.tags as unknown[] ?? []).map((t) => sanitizeText(t)),
    tlDr: data.tlDr ? sanitizeText(data.tlDr) : undefined,
    relatedTools: (data.relatedTools as unknown[] ?? []).map((t) => sanitizeText(t)),
    content,
  };
}

export const GUIDE_SLUGS = () => getGuideMetas().map((g) => g.slug);
