import type { Tool, Category, Rating } from "@/lib/tools";
import { RATING_LABELS, NETWORK_LABELS } from "@/lib/tool-labels";

const ratingClass: Record<Rating, string> = {
  1: "bg-caution/15 text-caution border-caution/30",
  2: "bg-trusted/15 text-trusted border-trusted/30",
  3: "bg-highly/15 text-highly border-highly/30",
};

export function ToolCard({ tool, categories }: { tool: Tool; categories: Category[] }) {
  const catById = new Map(categories.map((c) => [c.id, c.label]));
  const isDark = tool.network === "darknet";

  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-raise p-4 hover:border-accent">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-ink leading-snug">{tool.name}</h3>
        <div className="flex shrink-0 gap-1.5">
          <span
            className={`rounded-full border px-2 py-0.5 text-xs font-medium ${ratingClass[tool.rating]}`}
            title={`Rating: ${RATING_LABELS[tool.rating]}`}
          >
            {RATING_LABELS[tool.rating]}
          </span>
          <span
            className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
              isDark
                ? "border-purple-600/40 text-purple-700 dark:text-purple-300 bg-purple-600/10"
                : "border-line text-muted"
            }`}
          >
            {NETWORK_LABELS[tool.network]}
          </span>
        </div>
      </div>

      <p className="mt-2 flex-1 text-sm text-muted">{tool.description}</p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {tool.categories.map((c) => (
          <span
            key={c}
            className="rounded bg-accent-soft px-1.5 py-0.5 text-xs text-accent-strong"
          >
            {catById.get(c) ?? c}
          </span>
        ))}
        {tool.openSource && (
          <span className="rounded bg-raise border border-line px-1.5 py-0.5 text-xs text-muted">
            Open source
          </span>
        )}
      </div>

      <a
        href={tool.url}
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-strong hover:underline"
      >
        Visit site <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}
