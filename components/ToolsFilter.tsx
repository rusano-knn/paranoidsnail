"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Tool, Category } from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";

interface Params {
  category?: string;
  q?: string;
  network?: string;
  source?: string;
}

export function ToolsFilter({
  categories,
  tools,
  basePath,
}: {
  categories: Category[];
  tools: Tool[];
  basePath: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "";
  const q = searchParams.get("q") ?? "";
  const network = searchParams.get("network") ?? "";
  const source = searchParams.get("source") ?? "";

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      if (category && !t.categories.includes(category)) return false;
      if (network && t.network !== network) return false;
      if (source === "open" && !t.openSource) return false;
      if (q) {
        const s = q.toLowerCase();
        if (!(`${t.name} ${t.description}`.toLowerCase().includes(s))) return false;
      }
      return true;
    });
  }, [tools, category, q, network, source]);

  // Push state updates to the URL so the state is shareable + works on reload (progressive).
  function update(patch: Partial<Params>) {
    const next = new URLSearchParams(searchParams.toString());
    (Object.keys(patch) as (keyof Params)[]).forEach((k) => {
      const v = patch[k];
      if (v) next.set(k, v);
      else next.delete(k);
    });
    const qs = next.toString();
    router.replace(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
  }

  return (
    <div>
      <form
        method="get"
        action={basePath}
        className="border border-line rounded-xl bg-raise p-4 space-y-4"
      >
        <div className="flex flex-wrap gap-2 items-center">
          <label htmlFor="tools-search" className="sr-only">Search tools</label>
          <input
            id="tools-search"
            name="q"
            defaultValue={q}
            placeholder="Search tools…"
            className="flex-1 min-w-[180px] rounded-md border border-line bg-raise px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-onaccent hover:opacity-90"
          >
            Filter
          </button>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <fieldset className="flex items-center gap-2">
            <legend className="sr-only">Network</legend>
            <button
              type="button"
              aria-pressed={network === ""}
              className="rounded-full border border-line px-3 py-1 hover:bg-raise"
              onClick={() => update({ network: network === "" ? "" : "" })}
            >
              All networks
            </button>
            <button
              type="button"
              aria-pressed={network === "clearnet"}
              className="rounded-full border border-line px-3 py-1 hover:bg-raise"
              onClick={() => update({ network: network === "clearnet" ? "" : "clearnet" })}
            >
              Clearnet
            </button>
            <button
              type="button"
              aria-pressed={network === "darknet"}
              className="rounded-full border border-line px-3 py-1 hover:bg-raise"
              onClick={() => update({ network: network === "darknet" ? "" : "darknet" })}
            >
              .onion
            </button>
          </fieldset>
          <button
            type="button"
            aria-pressed={source === "open"}
            className="rounded-full border border-line px-3 py-1 hover:bg-raise"
            onClick={() => update({ source: source === "open" ? "" : "open" })}
          >
            Open source only
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={category === ""}
            className="rounded-full border border-line px-3 py-1 text-sm hover:bg-raise"
            onClick={() => update({ category: "" })}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={category === c.id}
              className="rounded-full border border-line px-3 py-1 text-sm hover:bg-raise"
              onClick={() => update({ category: category === c.id ? "" : c.id })}
            >
              {c.label}
            </button>
          ))}
        </div>

        <noscript>
          <p className="text-xs text-muted">
            No script? Hit <strong>Filter</strong> above to apply your choices.
          </p>
        </noscript>
      </form>

      <p className="mt-6 text-sm text-muted" role="status">
        Showing {filtered.length} of {tools.length} tools
      </p>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <li key={t.name}>
            <ToolCard tool={t} categories={categories} />
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-6 rounded-lg border border-line p-6 text-center text-muted">
          No tools match. Try clearing the filters — the snail knows it&apos;s lonely down there.
        </p>
      )}
    </div>
  );
}
