import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Guides" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer className="border-t border-line mt-16">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <p className="font-display text-lg font-bold text-ink">{site.name}</p>
          <p className="mt-2 text-sm text-muted max-w-xs">{site.tagline}</p>
          <a
            href={site.repoIssueUrl}
            className="mt-3 inline-block text-sm text-muted underline decoration-line underline-offset-4 hover:text-ink"
          >
            Talk to the snail (GitHub Issues)
          </a>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold text-ink">Learn</h2>
          <ul className="mt-2 space-y-1.5">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-muted hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 text-xs text-muted flex flex-wrap items-center justify-between gap-2">
          <p>
            © {new Date().getFullYear()} {site.name}. Licensed under GPLv3.
          </p>
          <p>No trackers, no accounts, no judgment. Just an aware little snail.</p>
        </div>
      </div>
    </footer>
  );
}
