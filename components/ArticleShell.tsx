import type { ReactNode } from "react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { slugify } from "@/lib/toc";

export function headingComponents(): MDXComponents {
  return {
    h2: (props) => <h2 id={slugify(String(props.children ?? ""))} {...props} />,
    h3: (props) => <h3 id={slugify(String(props.children ?? ""))} {...props} />,
  };
}

interface SideLink {
  href: string;
  label: string;
}

export function ArticleShell({
  toc,
  children,
  sideLinks,
  breadcrumb,
}: {
  toc: { id: string; text: string; level: number }[];
  children: ReactNode;
  sideLinks: SideLink[];
  breadcrumb: ReactNode;
}) {
  return (
    <div className="py-10">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-10">
        <div>{children}</div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            {toc.length > 0 && (
              <nav aria-label="In this post">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  In this post
                </h2>
                <ul className="mt-3 space-y-1 border-l border-line pl-3 text-sm">
                  {toc.map((t) => (
                    <li key={t.id} className={t.level === 3 ? "pl-3" : ""}>
                      <a href={`#${t.id}`} className="text-muted hover:text-ink">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {sideLinks.length > 0 && (
              <nav aria-label="Related">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Related
                </h2>
                <ul className="mt-3 space-y-1 text-sm">
                  {sideLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-accent-strong hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className="rounded-lg border border-line p-4">
              <p className="text-sm font-semibold text-ink">Breadcrumb</p>
              <div className="mt-1 text-sm text-muted">{breadcrumb}</div>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile quick-nav for TOC */}
      {toc.length > 0 && (
        <details className="mt-6 rounded-lg border border-line p-4 lg:hidden">
          <summary className="cursor-pointer text-sm font-semibold">In this post</summary>
          <ul className="mt-3 space-y-1 text-sm">
            {toc.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="text-accent-strong hover:underline">
                  {t.text}
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
