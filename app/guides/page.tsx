import type { Metadata } from "next";

export const metadata: Metadata = { title: "Guides" };

export default function GuidesPage() {
  return (
    <div className="py-10">
      <p className="font-mono text-sm text-accent-strong uppercase tracking-wider">learn by doing</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Guides</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Practical, opinionated walkthroughs for everyday privacy and security. Coming soon — the
        snail is still polishing its shell.
      </p>
    </div>
  );
}
