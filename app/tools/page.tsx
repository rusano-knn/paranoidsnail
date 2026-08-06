import type { Metadata } from "next";
import { Suspense } from "react";
import { getTools } from "@/lib/tools";
import { RATING_LABELS, NETWORK_LABELS } from "@/lib/tool-labels";
import { ToolsFilter } from "@/components/ToolsFilter";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "A categorized directory of privacy and security tools — browsers, email, messaging, VPN, passwords, OS hardening, and reputable darknet services.",
};

const legend = [
  { rating: 3 as const, label: "Highly trusted", cls: "bg-highly/15 text-highly border-highly/30" },
  { rating: 2 as const, label: "Trusted", cls: "bg-trusted/15 text-trusted border-trusted/30" },
  { rating: 1 as const, label: "Caution", cls: "bg-caution/15 text-caution border-caution/30" },
];

export default function ToolsPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const { categories, tools } = getTools();
  const path = "/tools";

  return (
    <div className="py-10">
      <header className="mb-8">
        <p className="font-mono text-sm text-accent-strong uppercase tracking-wider">the directory</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">Tools</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Trustworthy software, patiently vetted and honestly rated. Filters work with or without
          JavaScript — if a live chip isn&apos;t moving, hit <strong>Filter</strong>.
        </p>
      </header>

      <section className="mb-6 rounded-lg border border-line p-4 text-sm">
        <h2 className="font-semibold">How to read the ratings</h2>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
          {legend.map((l) => (
            <span key={l.rating} className="inline-flex items-center gap-2">
              <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${l.cls}`}>
                {RATING_LABELS[l.rating]}
              </span>
              {l.label}
            </span>
          ))}
          <span className="inline-flex items-center gap-2">
            <span className="rounded-full border border-line px-2 py-0.5 text-xs text-muted">
              {NETWORK_LABELS.clearnet}
            </span>
            Clearnet · available on the open web
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="rounded-full border border-purple-600/40 bg-purple-600/10 px-2 py-0.5 text-xs text-purple-700 dark:text-purple-300">
              {NETWORK_LABELS.darknet}
            </span>
            .onion · only reachable via Tor
          </span>
        </div>
      </section>

      <Suspense fallback={<p className="text-muted">Loading tools…</p>}>
        <ToolsFilter categories={categories} tools={tools} basePath={path} />
      </Suspense>
    </div>
  );
}
