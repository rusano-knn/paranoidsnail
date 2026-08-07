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
          {site.name} exists to make privacy and security feel less like a chore and less like a
          cult. A lot of the discussion around this stuff is either terrifying — passwords hacked,
          data in every breach, companies knowing more about you than you do — or it&apos;s marketing
          dressed up as education, pushing you to buy something before you understand the problem.
          We try to cut straight through both. Plain language, no jargon you have to untangle, and
          one decision at a time rather than a to-do list that makes you want to give up. No doom,
          no guilt, no judgment about how much or how little you choose to do.
        </p>
        <p className="mt-3 leading-relaxed text-muted">
          The project is independent in the most boring, dependable way: no venture funding, no
          investors, no advertising, and no tracking. There&apos;s nobody paying us to steer you toward
          one product, and there&apos;s no data about you to sell because we never collected any. We
          think that&apos;s the most on-brand thing we could possibly do — a privacy site that respects
          your privacy by default.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Who&apos;s behind the snail</h2>
        <p className="mt-3 leading-relaxed text-muted">
          The snail is a reformed burner-phone hermit who&apos;s been around long enough to remember
          when worrying about your digital footprint was considered a little odd, and then watched
          the world sprint toward convenience and quietly stop asking where all that convenience was
          pointing. Somewhere in there it decided someone ought to move slowly, double-check things,
          and remember where the trail actually leads back to. That someone, apparently, is a snail.
        </p>
        <p className="mt-3 leading-relaxed text-muted">
          It&apos;s also a real person, or a small handful of them — not a faceless company and not an
          automated feed. The tone is playful, the concern is genuine, and the creature trusts no
          one by default. That&apos;s not because it&apos;s unkind; it&apos;s because being friendly and being
          careless are two different things. It just wants you to carry your own shell, keep it in
          good repair, and not let anyone peek inside who doesn&apos;t need to.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">What we stand for</h2>
        <ul className="mt-3 space-y-2 text-muted leading-relaxed list-disc pl-5">
          <li>
            <strong className="text-ink">Independence.</strong> No trackers, no accounts, no data to
            sell, and no sponsor nudging us toward one tool. We say what we actually think.
          </li>
          <li>
            <strong className="text-ink">Honesty.</strong> We link to sources and we flag uncertainty
            instead of pretending we know everything. When a tool has a weakness, we mention it.
          </li>
          <li>
            <strong className="text-ink">Calm over fear.</strong> The point of protecting yourself
            is to live more peacefully, not to constantly worry. We aim for careful, not panicked —
            but never careless.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Talk to the snail</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Questions, corrections, a tool we&apos;ve missed, or a story about a router that seems to be
          listening — we&apos;d genuinely like to hear it. The simplest way to reach us is through the
          project&apos;s GitHub issues, where everything stays public and nothing sits in a private
          inbox. The snail reads every message, slowly, and usually gets back to you.
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
