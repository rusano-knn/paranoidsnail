import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getPostMetas } from "@/lib/blog";

const categoryChips = [
  { href: "/tools?category=browser", label: "Browsers" },
  { href: "/tools?category=vpn", label: "VPN & DNS" },
  { href: "/tools?category=password", label: "Passwords" },
  { href: "/tools?category=email", label: "Email" },
  { href: "/tools?category=darknet", label: "Darknet" },
  { href: "/tools?category=os", label: "OS & Hardening" },
];

export default function Home() {
  const posts = getPostMetas().slice(0, 3);
  return (
    <div className="flex flex-col gap-16 py-12">
      <section className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center">
        <div>
          <p className="font-mono text-sm text-accent-strong uppercase tracking-wider">
            a tiny snail · extremely aware
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight">
            You don&apos;t have to hide.
            <br />
            Just don&apos;t leave a trail.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            {site.name} is a security &amp; privacy resource that entertains while it educates —
            honest tools, practical guides, and writing from an extremely aware little snail who
            trusts almost no one (including you, reader. Hi though).
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="rounded-lg bg-accent px-5 py-3 font-semibold text-onaccent hover:opacity-90"
            >
              Browse the tools
            </Link>
            <Link
              href="/guides"
              className="rounded-lg border border-line px-5 py-3 font-semibold text-ink hover:bg-raise"
            >
              Start with guides
            </Link>
          </div>
        </div>
        <div className="hidden md:block justify-self-center">
          <Image src="/snail.svg" alt="" width={260} height={260} className="opacity-90" />
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-display text-2xl font-bold">Browse tools by category</h2>
          <Link href="/tools" className="text-sm text-muted hover:text-ink underline underline-offset-4">
            All tools
          </Link>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categoryChips.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="flex items-center justify-between rounded-lg border border-line px-4 py-3 hover:bg-raise hover:border-accent"
              >
                <span className="font-medium">{c.label}</span>
                <span aria-hidden="true" className="text-muted">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-display text-2xl font-bold">Start here</h2>
          <Link href="/guides" className="text-sm text-muted hover:text-ink underline underline-offset-4">
            All guides
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            { href: "/guides/privacy-starter-kit", title: "The Privacy Starter Kit", desc: "Your first 20 minutes of digital hygiene, patiently explained." },
            { href: "/guides/threat-modeling", title: "Threat modeling for ordinary people", desc: "Figure out who you're protecting from — without the paranoia spiral." },
            { href: "/guides/incognito-myth", title: "Incognito isn't privacy", desc: "A five-minute myth-bust about your browser's 'private' mode." },
          ].map((g) => (
            <li key={g.href}>
              <Link href={g.href} className="block h-full rounded-lg border border-line p-5 hover:border-accent hover:bg-raise">
                <h3 className="font-semibold text-ink leading-snug">{g.title}</h3>
                <p className="mt-2 text-sm text-muted">{g.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-display text-2xl font-bold">Latest from the blog</h2>
          <Link href="/blog" className="text-sm text-muted hover:text-ink underline underline-offset-4">
            All posts
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="block h-full rounded-lg border border-line p-5 hover:border-accent hover:bg-raise">
                <p className="text-xs text-muted">{p.date}</p>
                <h3 className="mt-1 font-semibold text-ink leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm text-muted line-clamp-3">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-line p-6">
        <h2 className="font-display text-xl font-bold">Got a burning question?</h2>
        <p className="mt-2 text-muted">
          The snail fields questions on the FAQ, and reads real ones over on GitHub Issues.
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/faq" className="rounded-lg border border-line px-4 py-2 text-sm font-medium hover:bg-raise">
            Read the FAQ
          </Link>
          <a
            href={site.repoIssueUrl}
            className="rounded-lg border border-line px-4 py-2 text-sm font-medium hover:bg-raise"
          >
            Ask the snail
          </a>
        </div>
      </section>
    </div>
  );
}
