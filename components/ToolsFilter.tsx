"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Tool, Category } from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";

interface State {
  category: string;
  q: string;
  network: string;
  source: string;
}

export function ToolsFilter({
  categories,
  tools,
  basePath,
  initial,
}: {
  categories: Category[];
  tools: Tool[];
  basePath: string;
  initial: State;
}) {
  const router = useRouter();
  const [state, setState] = useState<State>(initial);

  const filtered = useMemo(
    () =>
      tools.filter((t) => {
        if (state.category && !t.categories.includes(state.category)) return false;
        if (state.network && t.network !== state.network) return false;
        if (state.source === "open" && !t.openSource) return false;
        if (state.q) {
          const s = state.q.toLowerCase();
          if (!`${t.name} ${t.description}`.toLowerCase().includes(s)) return false;
        }
        return true;
      }),
    [tools, state]
  );

  function update(patch: Partial<State>) {
    const next = { ...state, ...patch };
    setState(next);
    const sp = new URLSearchParams();
    if (next.category) sp.set("category", next.category);
    if (next.q) sp.set("q", next.q);
    if (next.network) sp.set("network", next.network);
    if (next.source) sp.set("source", next.source);
    const qs = sp.toString();
    router.replace(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
  }

  const chip = (value: string, active: boolean, onClick: () => void, label: string) => (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm ${
        active ? "border-accent bg-accent text-onaccent" : "border-line hover:bg-raise"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <form method="get" action={basePath} className="border border-line rounded-xl bg-raise p-4 space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          <label htmlFor="tools-search" className="sr-only">Search tools</label>
          <input
            id="tools-search"
            name="q"
            defaultValue={state.q}
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

        {/* Live controls mirror the form's fields so JS users get instant results
            while no-JS users can still submit the GET form above. */}
        <input type="hidden" name="category" value={state.category} />
        <input type="hidden" name="network" value={state.network} />
        <input type="hidden" name="source" value={state.source} />

        <div className="flex flex-wrap gap-3 text-sm">
          <span className="inline-flex flex-wrap gap-2">
            {chip("", state.network === "", () => update({ network: "" }), "All networks")}
            {chip("clearnet", state.network === "clearnet", () => update({ network: "clearnet" }), "Clearnet")}
            {chip("darknet", state.network === "darknet", () => update({ network: "darknet" }), ".onion")}
          </span>
          <span className="inline-flex flex-wrap gap-2">
            {chip("open", state.source === "open", () => update({ source: state.source === "open" ? "" : "open" }), "Open source only")}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {chip("", state.category === "", () => update({ category: "" }), "All")}
          {categories.map((c) => (
            <span key={c.id}>
              {chip(c.id, state.category === c.id, () => update({ category: state.category === c.id ? "" : c.id }), c.label)}
            </span>
          ))}
        </div>

        <noscript>
          <p className="text-xs text-muted">
            No script? Pick your options and hit <strong>Filter</strong> to apply them.
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
