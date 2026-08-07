export interface TocItem {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export { slugify };

/** Extract ##/### headings from raw markdown/MDX for a "In this post" TOC. */
export function extractToc(content: string): TocItem[] {
  const items: TocItem[] = [];
  for (const line of content.split("\n")) {
    const m = /^(#{2,3})\s+(.*)$/.exec(line.trim());
    if (m) {
      const level = m[1].length;
      const text = m[2].replace(/[*_`]/g, "").trim();
      items.push({ id: slugify(text), text, level });
    }
  }
  return items;
}
