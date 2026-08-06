import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "FAQ" };

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Is this site safe to trust?",
    a: (
      <>
        Skeptical — good, keep that. We&apos;re independent, run no trackers, and hold no accounts or
        personal data to leak. Every claim we make links to primary sources. Trust the references,
        not the pretty snail.
      </>
    ),
  },
  {
    q: "Why no account or login?",
    a: (
      <>
        Because a login is a leash. You don&apos;t need an account to read a guide or check a tool,
        so why would we ask for one? Fewer accounts, fewer trails.
      </>
    ),
  },
  {
    q: "Is the darknet dangerous?",
    a: (
      <>
        It&apos;s a network, not a person — it isn&apos;t inherently &ldquo;good&rdquo; or &ldquo;bad.&rdquo; Your behaviour
        on it is what matters. We only recommend reputable, legal .onion services and put safety
        first. Deal only in what you understand.
      </>
    ),
  },
  {
    q: "Is a VPN enough to make me anonymous?",
    a: (
      <>
        A VPN hides traffic from your ISP and shifts your IP. It does not make you anonymous —
        metadata and your accounts still tell a story. Use it as one layer, not a magic cloak.
      </>
    ),
  },
  {
    q: "Why does this site look like it was made by a snail?",
    a: (
      <>
        Because it was. We move slowly, we leave no trail, and we&apos;re extremely aware of
        everything — including your cursor. There&apos;s no tracking, the cursor thing is a joke.
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <div className="py-10 max-w-3xl">
      <p className="font-mono text-sm text-accent-strong uppercase tracking-wider">questions</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">FAQ</h1>
      <p className="mt-3 text-muted">Honest answers, mild sarcasm. Grouped by topic.</p>

      <div className="mt-8 space-y-3">
        {faqs.map((f, i) => (
          <details key={i} className="group rounded-lg border border-line bg-raise open:pb-4">
            <summary className="list-none cursor-pointer px-5 py-4 font-semibold flex items-center justify-between gap-3">
              {f.q}
              <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-5 text-muted leading-relaxed">{f.a}</div>
          </details>
        ))}
      </div>
    </div>
  );
}
