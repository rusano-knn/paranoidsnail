import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="py-10 max-w-3xl">
      <p className="font-mono text-sm text-accent-strong uppercase tracking-wider">about</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">About {site.name}</h1>

      <section className="mt-8">
        <h2 className="font-display text-xl font-bold">Our mission</h2>
        <p className="mt-3 leading-relaxed text-muted">
          {site.name} exists to make privacy and security <em>approachable</em>. We cut through the
          fear, the jargon, and the marketing so you can make one well-informed decision at a time.
          No doom. No judgment. Just patient, honest guidance.
        </p>
        <p className="mt-3 leading-relaxed text-muted">
          The project is independent: no venture funding, no investors, no advertising, and no
          tracking. We&apos;re not collecting anything about you, and we think that&apos;s the most
          on-brand thing we could possibly do.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Who&apos;s behind the snail</h2>
        <p className="mt-3 leading-relaxed text-muted">
          The snail is a reformed burner-phone hermit who&apos;s been offline long enough to know
          better. It has watched everyone sprint toward convenience and quietly bury their heads —
          and it&apos;s decided someone should move slowly and remember where the trail leads back.
        </p>
        <p className="mt-3 leading-relaxed text-muted">
          The snail trusts no one, but it&apos;s not unkind. It just wants you to carry your own
          shell and not let anyone peek inside.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">What we stand for</h2>
        <ul className="mt-3 space-y-2 text-muted leading-relaxed list-disc pl-5">
          <li><strong className="text-ink">Independence.</strong> No trackers, no accounts, no data to sell.</li>
          <li><strong className="text-ink">Honesty.</strong> We link sources and flag uncertainty.</li>
          <li><strong className="text-ink">Calm</strong> over fear — but never careless.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Talk to the snail</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Questions, corrections, or a story about a suspicious router? Open an issue —
          the snail reads every message, slowly.
        </p>
        <a
          href={site.repoIssueUrl}
          className="mt-3 inline-block rounded-lg bg-accent px-5 py-2.5 font-semibold text-onaccent hover:opacity-90"
        >
          Open a GitHub issue
        </a>
      </section>
    </div>
  );
}
