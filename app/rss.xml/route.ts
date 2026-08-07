import { getPostMetas } from "@/lib/blog";
import { site } from "@/lib/site";
import { escapeXml } from "@/lib/sanitize";

export const dynamic = "force-static";

export function GET() {
  const posts = getPostMetas();
  const items = posts
    .map((p) => {
      const pub = p.date ? new Date(p.date).toUTCString() : "";
      const permalink = `${site.url}/blog/${p.slug}`;
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${escapeXml(permalink)}</link>
      <guid isPermaLink="true">${escapeXml(permalink)}</guid>
      <pubDate>${pub}</pubDate>
      <description>${escapeXml(p.description)}</description>
    </item>`;
    })
    .join("\n");

  const feedUrl = `${site.url}/blog`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.name)} — Blog</title>
    <link>${escapeXml(feedUrl)}</link>
    <description>${escapeXml(site.description)}</description>
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
