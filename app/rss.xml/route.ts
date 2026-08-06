import { getPostMetas } from "@/lib/blog";
import { site } from "@/lib/site";

export const dynamic = "force-static";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getPostMetas();
  const items = posts
    .map((p) => {
      const pub = p.date ? new Date(p.date).toUTCString() : "";
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${site.url}/blog/${p.slug}</link>
      <guid isPermaLink="true">${site.url}/blog/${p.slug}</guid>
      <pubDate>${pub}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(site.name)} — Blog</title>
    <link>${site.url}/blog</link>
    <description>${esc(site.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
