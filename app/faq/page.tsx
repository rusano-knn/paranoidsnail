import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "FAQ" };

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Is this site safe to trust?",
    a: (
      <>
        Good question, and honestly you shouldn&apos;t take anybody&apos;s word for it — including ours.
        The short version: we run no trackers, keep no accounts, and hold no personal data about
        you, so there&apos;s nothing here worth stealing and nothing to leak. Every claim we make
        links back to a primary source, so you can check our work instead of trusting our tone.
        The snail would rather you verify something yourself than believe it because a friendly
        cartoon told you so. Trust the references, not the pretty header.
      </>
    ),
  },
  {
    q: "Why no account or login?",
    a: (
      <>
        Because reading a guide or looking up a tool shouldn&apos;t require you to hand over an email
        and a password first. An account is a thing someone else now has to protect, a record of
        you that exists somewhere, and a reason for you to keep coming back. We don&apos;t need any of
        that to show you a page. Fewer accounts means fewer trails, fewer passwords to lose, and
        fewer datasets that might end up in a breach you read about later.
      </>
    ),
  },
  {
    q: "Is the darknet dangerous?",
    a: (
      <>
        The darknet is a network, not a person — it isn&apos;t good or bad on its own, any more than
        an alley is. What matters is what you do there. There are genuinely useful and perfectly
        legal .onion services, and there are also plenty of places you should never go near. Our
        guides stick to reputable, legal services and say clearly which ones to avoid and why. If
        a deal sounds too easy or a stranger is pushing you toward something you don&apos;t fully
        understand, that&apos;s your cue to close the tab. Stay curious, stay cautious, and only deal
        with things you actually understand.
      </>
    ),
  },
  {
    q: "Is a VPN enough to make me anonymous?",
    a: (
      <>
        No, and it&apos;s worth being blunt about that. A VPN hides your traffic from your internet
        provider and swaps your visible IP address for someone else&apos;s. That&apos;s genuinely useful
        for some things — connecting on an untrusted network, getting around location limits,
        keeping a snooping ISP out of your business. But it doesn&apos;t make you anonymous. The sites
        you visit still see you, your accounts still know who you are, and the trail of metadata —
        when you logged in, from where, how often — still exists. It&apos;s one tool in a bigger kit,
        not a magic cloak. Use it for what it&apos;s good at and don&apos;t expect it to do the rest.
      </>
    ),
  },
  {
    q: "Do I need a VPN at all?",
    a: (
      <>
        It depends on what you&apos;re worried about, and the honest answer is that a lot of people
        don&apos;t really need one for everyday browsing. Your connection to a normal website over
        HTTPS is already encrypted, so the classic fear of someone reading everything you type is
        mostly overblown. Where a VPN earns its keep is on public Wi-Fi you don&apos;t control, when
        you want to hide your browsing from your internet provider, or when you&apos;re in a country
        where certain sites are blocked. If none of that applies, you can skip it and spend that
        money on better passwords instead. The right tool depends on the threat, not on what&apos;s
        advertised.
      </>
    ),
  },
  {
    q: "Does private or incognito mode do what people think?",
    a: (
      <>
        Not really, and this one surprises a lot of people. Private mode stops your browser from
        saving your history, cookies, and search entries on your own machine. That&apos;s it. It does
        not hide your activity from your internet provider, from the sites you visit, from your
        employer if you&apos;re on a work computer, or from anyone on the same network. As far as they
        can tell, you were right there browsing. It&apos;s a handy feature for borrowing a device or
        keeping your own history clean, but it&apos;s not anonymity. If someone told you otherwise,
        they were being generous.
      </>
    ),
  },
  {
    q: "Is this site really not tracking me?",
    a: (
      <>
        We can&apos;t prove a negative, but here&apos;s what we can tell you: there are no tracking
        scripts, no analytics plugins, no advertising tags, and no embedded widgets from outside
        companies on this site. The only thing a host sees is the normal technical request your
        browser makes to load the page, just like any website. The project is self-hosted, the code
        is open, and nothing here waits around to collect information about you. If you want to be
        thorough, you can check the network tab in your browser while this page loads and see for
        yourself. We&apos;d actually encourage that.
      </>
    ),
  },
  {
    q: "How do I know I can trust these recommendations?",
    a: (
      <>
        Check them. Every tool and guide on this site links to the original sources — the official
        site, the documentation, the maintainer who made it. We try to say when a tool has weak
        spots, not just what it&apos;s good at, and we flag uncertainty when we aren&apos;t sure. The
        project doesn&apos;t run ads and doesn&apos;t take money from the tools it reviews, so there&apos;s no
        affiliate pressure nudging us to push one thing over another. That doesn&apos;t make us
        perfect — treat any recommendation as a starting point, do a little research of your own,
        and pick what fits your situation.
      </>
    ),
  },
  {
    q: "Why does this site look like it was made by a snail?",
    a: (
      <>
        Because it was. We move slowly, we leave no trail, and we&apos;re extremely aware of
        everything around us — including, allegedly, your cursor. To be clear, there&apos;s no
        tracking here, and the cursor thing is just a joke. The snail is a bit of self-aware humor
        to remind us, and you, that careful beats fast, and that the point of all this privacy talk
        is to live at a pace that isn&apos;t always in a hurry. It&apos;s part mascot, part reminder.
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
