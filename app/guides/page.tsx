import type { Metadata } from "next";
import Link from "next/link";
import { getGuideMetas, GUIDE_CATEGORIES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Practical, opinionated walkthroughs for everyday privacy and security — from a starter kit to threat modeling to common myths.",
};

export default function GuidesPage() {
  const metas = getGuideMetas();

  // Group by category, preserving category order.
  const grouped = Object.entries(GUIDE_CATEGORIES).map(([id, cat]) => ({
    id,
    ...cat,
    guides: metas.filter((g) => g.category === id),
  })).filter((g) => g.guides.length > 0);

  return (
    <div className="py-10">
      <header className="mb-8">
        <p className="font-mono text-sm text-accent-strong uppercase tracking-wider">learn by doing</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Guides</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Practical, honest walkthroughs for everyday privacy and security. Start with the starter
          kit.
        </p>
      </header>

      <div className="space-y-12">
        {grouped.map((cat) => (
          <section key={cat.id}>
            <div className="mb-4">
              <h2 className="font-display text-2xl font-bold">{cat.label}</h2>
              <p className="text-sm text-muted">{cat.tagline}</p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.guides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    className="block h-full rounded-lg border border-line bg-raise p-5 hover:border-accent hover:bg-raise"
                  >
                    <div
                      className="mb-3 flex h-28 items-center justify-center rounded-md border border-dashed border-line bg-accent-soft/40 text-xs text-muted"
                      aria-hidden="true"
                    >
                      image: {g.title}
                    </div>
                    <h3 className="font-semibold text-ink leading-snug">{g.title}</h3>
                    <p className="mt-2 text-sm text-muted line-clamp-3">{g.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {grouped.length === 0 && (
          <p className="text-muted">Guides are being written. The snail is slow but thorough.</p>
        )}
      </div>
    </div>
  );
}
