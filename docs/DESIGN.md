# ClearOnion — Design Document (Brand, Visual Direction, Personality)

Version: 0.1 (draft for review)
This doc covers brand research, naming options, personality/humor, and the visual system.

---

## 1. Why "ClearOnion" is being reconsidered
ClearOnion was a working placeholder for the throwaway scaffold. For the real product the owner
wants original, distinctive branding with humor — not a generic "AI-slop" name or template look.
This section is *discarded* design space, kept only for reference.

---

## 2. Branding research — popular privacy/security identities

| Brand | Personality / naming pattern | Visual trait |
|-------|------------------------------|--------------|
| **Mullvad** | "The VPN company you never hear about"; deliberately boring, trust-first | Flat, muted, minimal; no hype |
| **Proton** | Swiss fortress; serious, "secure by default" | Clean blue, confident, institutional |
| **Signal** | Simple, trustworthy, activist-friendly | Flat blue, plain, understated |
| **Tor Project** | Technical, freedom-of-speech; onion motif | Dark, red/green accents, onion glyph |
| **DuckDuckGo** | Friendly, anti-big-brother, quack mascot | Cute mascot, playful |
| **Brave** | Bold, rebel (lion mascot) | Strong accent, mascot-forward |
| **Tails** | Anecdotal, independent, "amnesiac OS" | Sparse, terminal-ish |
| **PrivacyTools.io** | Directory/editorial; trustworthy aggregator | Category-heavy, dense, utilitarian |
| **The Hidden Wiki** | Old-school deep-web directory; archaic, community-run | Dense links, minimal chrome |

### 2.1 Insights for us
- **Mascots / humor** work when they feel earned, not cutesy (DuckDuckGo, Brave).
- **"Boring = trustworthy"** (Mullvad) contrasts humor; a middle path is *dry wit + competence*.
- A **philosophy/editorial voice** (Tor, PrivacyTools) builds durable trust better than hype.
- Naming sweet spot: short, pronounceable, mooning toward either *paranoid-funny* or
  *calm-confident*.

---

## 3. Brand direction (DECIDED: **ParanoidSnail** — 2026-08-07)

Personality anchors (shared by all): **playful paranoia — serious substance, warm wit, faint
conspiracy-theory wink, but 100% honest and competent.** All names are original and not competing
with a dominant existing trademark (owner should do a final domain availability check).

### Option A — **ParanoidSnail**
Mascot/name combo. A tiny, unhurried snail that's *extremely* aware of everything. Wears a light
tinfoil hat. Humor: "we move slowly and leave no trail." Instantly differentiates, memorable,
mascot-friendly, great for 404/loading gags. Risk: whimsical name may undercut "serious security"
for some trust signals. Domain: paranoidsnail(.com/.org/.io) likely open.

### Option B — **OnionPeel**
Puns on the Tor onion and "peeling back layers." Voice: "we peel back the layers of the internet,
and we'll show you what's under your own." Memorable, on-theme, quick witticisms. Slightly more
"director of the deep web" and less paranoid. Risk: close to "onion" language used widely; ensure
uniqueness. Domain: onionpeel(.com/.org).

### Option C — **DataHermit**
A hermit who lives on a mountain of your data, refusing to trade it. Voice: "we don't sell your
data; we guard it like a hermit guards canned beans." Warm, stubborn, human, funny. Strong
personality; good mascot (a hermit). Risk: "hermit" may read a bit anti-social/offline. Domain:
datahermit(.com/.org/.io).

### Option D — **HushPod**
Friendly + privacy ("hush") + a "pod" of tools. Calm, soft, approachable; a cozy bundle of privacy
tools. Voice: "a quiet little pod where your data sleeps soundly." Easy brand extension; less
paranoid, more soothing. Risk: softer mood than "playful paranoia"; name less thematic to deep web.
Domain: hushpod(.com/.io).

### Option E — **GlitchDuck**
Playful "glitch" (anonymize = glitch the trackers) + friendly duck (can quack, or can stay quiet).
Voice: "we glitch the trackers; the duck tells nothing." Humorous mascot, high memorability. Risk:
'glitch' implies errors; ensure not read as buggy. Domain: glitchduck(.com/.org).

> Full recommended pitch: **A (ParanoidSnail) or B (OnionPeel)** — the strongest blend of
> humor + on-theme + mascot potential. B is more "deep web directory", A is more "privacy
> philosophy". Owner decides; all copy below uses the placeholder **[BRAND]** until chosen.

### DECIDED 2026-08-07: **ParanoidSnail**
- Mascot: a small, unhurried snail that is *extremely* aware of everything, wearing a [[tinfoil
  hat]]. Tagline draft: *"We move slowly and we leave no trail."*
- Humor angle: over-prepared, gentle paranoia; trusts no one, but kindly explains why you
  shouldn't either. Motto energy: "carry your own shell; don't let anyone peek inside."
- Accent color: **snail green** (a green that pops in dark theme, darkened for light theme for
  contrast). Neutral base stays tinfoil/slate + warm paper. Comic-style but restrained.
- **Canonical URL: `https://snail.rusano.io.vn`** (owner's domain `rusano.io.vn`, subdomain
  `snail`). Kept in `.env` (`NEXT_PUBLIC_SITE_URL`), never hardcoded.

## 4. Personality & voice guidelines (humor taste — R5)

Our tone: **"competent paranoia + dry humor + a little warmth."**

- **Do:** crack a small joke in a headline, 404, empty filter state, footer, FAQ. Use relatable
  metaphors (burner phone, tinfoil hat, encrypted potato chips). Be honest about tradeoffs; call out
  oversold tools. Use the "you lock your front door without having something to hide" argument to
  reframe privacy, humorously.
- **Don't:** be mean, fear-monger, make light of real victims, use cringe clickbait, or write
  "corporatese." Keep humor about *the industry and ourselves*, never the reader.
- Example empty state: instead of "No results" → **[BRAND]** brand voice: *"Even the deep web has
  its quiet corners. Nothing matched — loosen the filters."*
- Example FAQ: *"Is this site safe to trust?" → "We can't hold a gun to your data, but we take no
  money from advertisers, run no trackers, and our founder has strong opinions about your right to
  a boring life. That's all we've got — which is more than most."*

---

## 5. Visual design system

### 5.1 Goals
Distinctive (not template), readable, fast, accessible, both themes, mobile-first. Avoid the
"generic gradient blob + centered pill buttons" look. Prefer craft: asymmetry, a consistent accent
color, a strong monospaced/display pairing, and a signature motif tied to the brand (e.g.,
ParanoidSnail → snail + tinfoil; OnionPeel → onion layers; HushPod → a pod).

### 5.2 Theme / color
Define via CSS variables in both **light** and **dark**, toggled by `data-theme` (progressive:
default from system, persisted in localStorage).
- **Dark (default vibe):** near-black ink (#0d0f14), warm paper text (#e8eaef), an **accent** that
  pops in both themes. Choose accent per brand: e.g., *OnionPeel* → onion-purple `#9a6bff` or a
  warm onion-gold; *ParanoidSnail* → tinfoil-silver `#c0c6cf` with a green accent.
- **Light:** soft off-white `#fafaf7`, ink `#1a1c22`, same accent darkened for contrast.
- Container `--accent`, `--bg`, `--fg`, `--muted`, `--border`; WCAG AA contrast in both themes.

### 5.3 Typography
- Display/headings: a characterful grotesque or mono for personality (self-hosted, e.g., a
  variable font subset). 
- Body: highly legible UI sans (self-hosted variable font).
- Mono: for `.onion` links, metadata, code, filters/URLs — ties to the "deep-web terminal"
  subtext.
- Keep to 2 families max; subset to latin; self-host via `next/font`.

### 5.4 Signature motif / mascot
- A single playful motif used sparingly: hero accent, 404, favicon, empty states, footer.
- Implemented as **inline SVG** (no runtime image dependency; crisp; zero extra requests).
- Give it a couple of states (awake / "shh" / tinfoil) for delight.

### 5.5 Components
- Buttons: solid accent (primary) + ghost/outline (secondary). Rounded but not pill-everything.
- Tool card: bordered card, hover reveals; category tags as small chips; rating badge
  (`1 Caution · 2 Trusted · 3 Highly trusted`) color-coded; network badge.
- Filter bar: clear controls (category chips + search + network toggle + open-source toggle);
  sticky on desktop when live-filtering.
- FAQ accordion: `<details>`-based with JS smoothness.
- Nav: sticky; mobile = disclosure menu.
- Ratings legend present so badges are meaningful and not decorative.

### 5.6 Layout & motion
- Grid + fluid spacing; generous whitespace; asymmetric hero (text left, motif right).
- Motion: **CSS-only** for most (hover/focus/accordion); tiny JS for theme + filter + menu. Respect
  `prefers-reduced-motion` (disable animations).

### 5.7 Craft details (anti-"AI-slop")
- Real editorial hierarchy (kickers/eyebrows on sections), consistent spacing scale.
- `:focus-visible` rings in accent, both themes.
- Keyboard-tabbable filters with visible active chip states.
- Lengthy copy tuned to the voice; no filler paragraphs.

---

## 6. Content-tone guardrails (legal/ethical)
- Darknet section: reputable/legal only; safety disclaimers; never assist illegal activity.
- Tool reviews: honest about paid/free, audit status, and "oversold" claims.
- The Hidden Wiki review reviews the **site**, not the contest; include the official `.onion` link
  (contest requirement) with verification guidance.
- Every guide ends with "verify things yourself" — consistent with the paranoid-but-honest brand.

---

## 7. Open design decisions for owner
1. Pick a **brand option (A–E)** or request tweaks/domain availability.
2. Approve **accent color + motif** direction.
3. Approve **About** style: plain-but-strong vs. lighthearted made-up narrator story.
4. Confirm **Home layout priority** (Tools → Guides → Blog → FAQ) — per FSD §9.
