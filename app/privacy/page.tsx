import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="py-10 max-w-2xl">
      <p className="font-mono text-sm text-accent-strong uppercase tracking-wider">policy</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Privacy</h1>
      <p className="mt-3 text-muted">
        Shortest privacy policy on the internet, and we&apos;re proud of it.
      </p>

      <div className="mt-8 space-y-6 text-muted leading-relaxed">
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Data we collect</h2>
          <p className="mt-2">Essentially none. We are not collecting or storing over any personal information about you.</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Tracking &amp; analytics</h2>
          <p className="mt-2">
            This site contains no external trackers and no third-party analytics. We do not set
            marketing cookies. Our hosting provider (Vercel) may keep standard, short-lived access
            logs for operational purposes. If we ever add any analytics, it will be self-hosted,
            privacy-respecting, and disclosed here.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Cookies</h2>
          <p className="mt-2">
            Only a local preference (your chosen light/dark theme) may be stored in your browser.
            That stays on your device and is never transmitted to us.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Outbound links</h2>
          <p className="mt-2">
            We link to third-party sites. Their privacy practices are theirs, not ours. When you
            follow an external tool link, assume it may collect data and behave accordingly.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Contact</h2>
          <p className="mt-2">
            Questions about this policy? Open an issue on{" "}
            <a href={site.repoUrl} className="text-accent-strong underline underline-offset-2">GitHub</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
