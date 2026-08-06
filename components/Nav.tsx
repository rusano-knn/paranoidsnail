import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Guides" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-ink no-underline hover:opacity-80"
          aria-label={`${site.name} home`}
        >
          <Image
            src="/snail.svg"
            alt=""
            width={30}
            height={30}
            className="shrink-0"
            priority
          />
          <span className="font-display text-lg font-bold tracking-tight leading-none">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 hidden md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-muted hover:text-ink hover:bg-raise"
            >
              {l.label}
            </Link>
          ))}
          <span className="ml-2 pl-1 border-l border-line">
            <ThemeToggle />
          </span>
        </nav>

        <details className="md:hidden group">
          <summary className="list-none cursor-pointer rounded-md px-2 py-2 text-ink hover:bg-raise">
            <span className="sr-only">Menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute left-0 right-0 top-16 border-b border-line bg-bg px-4 py-3 flex flex-col gap-1"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2 text-muted hover:text-ink hover:bg-raise"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 pl-3 pt-2 border-t border-line">
              <ThemeToggle />
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
