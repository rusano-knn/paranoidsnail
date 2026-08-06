import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = ["", "/tools", "/guides", "/blog", "/faq", "/about", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.8,
  }));
}
