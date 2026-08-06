# ClearOnion — Functional Specification Document (FSD)

Version: 0.1 (draft for review)
Companion to: BRD.md, DESIGN.md, SETUP.md

---

## 1. Global Behavior

### 1.1 Referencing the architecture
- Next.js App Router, static-first (SSG/default static where possible). No server-held state.
- TypeScript. Tailwind CSS v4. MDX for long-form content. Tools data in local structured files.

### 1.2 Progressive enhancement (works without JS)
- **Critical reading/navigation must work with JS disabled.** All pages are server-rendered HTML.
- JavaScript is used only to **enhance**: instant client-side filtering, smooth theme toggle without
  flash, minimal interactivity, subtle motion.
- Every JS feature must have a no-JS fallback:
  - Tools filtering: with JS → instant client filtering; without JS → server-rendered
    per-category views and query-string filters (`?cat=VPN`), via a plain HTML form submitting GET.
  - Theme toggle: without JS → persist via user-website fallback (CSS `prefers-color-scheme`
    applies server default; the toggle is progressive).
- No client-side routing dependency for content pages (native `<a>` links / Next `<Link>`).

### 1.3 Responsive & browser support
- Layouts fluid/grid-based; mobile-first; hamburger nav on small screens (HTML checkbox or JS — must
  remain operable without JS via a native disclosure element).
- Support modern evergreen browsers (last 2 versions) + mobile Safari/Chrome/Firefox.
- Minimum usability width ~320px. No horizontal scroll on default content.

### 1.4 Light & Dark mode
- Both themes, full fidelity. Default follows system (`prefers-color-scheme`) with no-JS support.
- Theme chosen via toggle; persisted in `localStorage` (progressive). Toggle present in header.

### 1.5 Accessibility (a11y) baseline
- Semantic landmarks (`header`, `nav`, `main`, `footer`), single `h1` per page, logical heading order.
- All interactive elements keyboard-focusable with visible focus styles; proper `aria-*` on
  disclosure/filter controls; color contrast ≥ WCAG AA; alt text on images.
- Filter/search inputs labeled. Focus-visible ring that works in both themes.

### 1.6 Performance
- Static export-friendly; images sized/optimized; self-hosted fonts/icons (no external CDN
  calls); minimal (if any) client JS bundles.
- Lighthouse accessibility/best-practices/perf ≥ 90 intended.

---

## 2. Site Structure & Routing

```
/                     Home
/tools                Tools index (all, filterable)
/tools/[slug]         Individual tool detail (optional v1.1 — see §4.6)
/guides               Guides index (categorized)
/guides/[slug]        Individual guide
/blog                 Blog index
/blog/[slug]          Blog post
/faq                  FAQ (accordion, section anchors)
/about                About
/privacy              Privacy policy (simple)
/404                  Not found (humorous)
```

---

## 3. Global Chrome

### 3.1 Header / Navigation (R3)
Top nav links (in priority/services order): **Home, Tools, Guides, Blog, FAQ, About.**
- Sticky header on desktop; compact on mobile with a hamburger.
- Includes brand mark (left) and theme toggle (right). On mobile the nav collapses into a
  disclosure menu that works without JS (e.g., native `<details>`/`<summary>` enhanced by JS) .

### 3.2 Footer (R4)
Multi-column:
- **Brand column** — wordmark + one witty tagline sentence.
- **Simple site map** — same nav links + Privacy.
- **Legal/colophon** — copyright notice (`© YYYY ClearOnion` — brand TBD), and a discreet `Privacy`
  link to `/privacy`.
- A one-line "Last compiled" or version is allowed (keeps it human).
- Footer must not attempt to look corporate or scary; keep it warm and small.

### 3.3 Privacy Policy (R4)
Single page `/privacy`. Simple, honest, human:
- We run no analytics, trackers, cookies-for-profiling, or ad networks.
- The only logging is the hosting platform's (Vercel) default access/function logs, which may
  record IPs and request metadata and are retained per Vercel's own policy.
- We set only a small, non-essential local setting for your theme choice (stored in your browser).
- Third-party outbound links (e.g., tool websites) are the user's responsibility to check.
- No email capture / no forms that store data.
Written in plain language with a touch of the site's humor.

---

## 4. Tools (R8) — primary utility

### 4.1 Purpose
A browsable, filterable catalog of privacy/security tools and services covering **clearnet** and
**darknet**. Darknet is its own top-level category (see §4.3).

### 4.2 Data model (`data/tools.ts` or `data/tools.json`)
```
type Tool = {
  slug: string;                    // url slug, e.g. "mullvad"
  name: string;
  tagline: string;                 // one witty line
  description: string;             // 2–4 sentences, original copy
  url: string;                     // official homepage (clearnet)
  onion?: string;                  // official onion mirror, if any
  categories: CategoryId[];        // MULTI-category membership (R8)
  network: "clearnet" | "darknet"; // primary network classification
  platform: ("web"|"win"|"mac"|"linux"|"android"|"ios"|"cli"|"server")[];
  pricing: "free"|"freemium"|"paid"|"donation";
  openSource: boolean;
  ratingLevel: 1|2|3;              // trust/quality rating (see DESIGN)
  features: string[];              // key keywords for search
  officialOnly: true;              // we only list official sources
}
```
Example category set (flat, taggable, cross-listed):
`browser, search, email, messaging, vpn, dns, password-manager, 2fa, storage, notes,
metadata-tools, os, mobile-os, firewall, ad-block, anonymizing-network, darknet-directory,
tor, i2p, security-keys, bitcoin, encrypted-dns, linux, windows-privacy`

`network: "darknet"` tags mark members of the **darknet category** but a tool may also appear in a
functional category and carry an onion link (e.g., Proton → `email` + `darknet` because it has an
official onion; DuckDuckGo → `search` + `darknet`).

### 4.3 Darknet category (R8) — separate category
- A dedicated category filter labeled **"Darknet"**.
- Content policy: **only reputable/legal services** with official onion mirrors (Tor Project, news
  orgs, Proton, DDG, Brave, i2p/Tor infra). No marketplaces, nothing facilitating illegal activity.
- Each darknet listing shows its official `.onion` address with a prominent verification warning.
- Safety-first framing links to `/guides` safety guides.

### 4.4 Filtering (R8)
- **No-JS path:** an HTML `<form method="get">` with a category `<select>` (or checkboxes) + text
  input for name/keyword. Submitting navigates to `/tools?cat=vpn&q=firefox`, which the server uses
  to render a filtered result page.
- **JS-enhanced path:** the same control surface drives **instant client-side filtering** of an
  already-rendered list (no reload). Unobtrusive; if JS fails, submit still works.
- Controls: category filter, network (clearnet/darknet/all), name/keyword search, optional platform
  filter, optional "open source only" toggle, and pricing (in v1.1+).
- Active-filter chips with the ability to clear each. Empty-state copy should be witty, not "no
  results found".

### 4.5 Tool card (list item)
- Name + tagline, trust rating badge, categories as small tags, network badge (Clearnet/Darknet),
  platform icons, pricing + open-source indicators, one-line description, official-link button.
- Cards are keyboard/screen-reader friendly and link to the tool card itself.

### 4.6 Tool detail page (v1.1, deferred)
- Full description, features, official + onion links, "see also" related tools. Not required for
  v1 MVP; links can point to official sites directly for now.

---

## 5. Guides (R9)

### 5.1 Purpose
Categorized, practical, opinionated articles teaching privacy/security by doing.

### 5.2 Index
- Category grouping (cards or sections): e.g.,
  - **Getting Started** (privacy starter kit, threat modeling)
  - **Browsers & Search**
  - **Email & Messaging**
  - **Network & VPN/DNS**
  - **Passwords & 2FA**
  - **OS & Device Hardening**
  - **Darknet & Tor** (safety, first steps, reputable onion services)
  Each category has a short witty descriptor + its guides.
- **IMAGE REQUIREMENT (anti-AI-slop — R~):** every Guide index card and every Guide article MUST
  have a custom SVG hero/illustration (see DESIGN §5 "Illustration system"). No entry lists without
  an image. All images hand-authored/generated, GPLv3, no stock.

### 5.3 Guide article
- MDX. TOC (progressive: anchor links; JS optional for scroll-spy). "Prereqs", "TL;DR",
  "Step by step", "Which tool", "Good/bad tradeoffs". Keep humor but stay accurate. Cite official
  sources. Ends with related tools (link into `/tools`).

---

## 6. Blog (R10)

### 6.1 Purpose
Long-form editorial. Place for the flagship post and ongoing writing.

### 6.2 The Hidden Wiki review (R10 — critical content correctness)
- **Subject of the review is The Hidden Wiki (the site/onion service), NOT its contest.**
- The review evaluates the wiki itself: what it is (a Tor-based link directory on the deep web),
  its history, its utility, its risks, moderation quality, and how to navigate it safely.
- The contest may be *mentioned* (the post exists to reference the site publicly per contest terms
  and includes the official v3 `.onion` link), but the framing and judgment are about the site.
- Tone: genuinely informative, honest about pros/cons, with the site's humor. Must stay public &
  registration-free to satisfy contest rule; link + screenshot sent separately by the owner.
- Include safety disclaimers and link to Darknet guides + Tools.

### 6.3 Other seed posts (draft list)
- "What the dark web actually is" (rewritten from scratch, not copied)
- "The privacy starter kit" (ties to Tools)
- "Incognito isn't privacy: a 5-minute myth-bust"
- "How to pick a VPN without a headache"

### 6.4 Blog mechanics
- Index sorted newest-first; tags; per-post metadata (title, date, description, slug,tags).
- RSS feed (static XML) — privacy-friendly way for P4 users to follow.
- **IMAGE REQUIREMENT:** every post has a custom SVG hero illustration (anti-slop) + a generated
  OpenGraph/social share image (1200×630) that reuses the same motif. No post without a hero image.

---

## 7. FAQ (R4 nav)

- Single page, accordion (progressive: works as plain sections/anchors without JS; JS smooths).
- Questions grouped by topic (Basics, Tools, Darknet, This Website).
- Include a humorously-answered "Is this site safe to trust?" and "Why no account/login?".
- Each FAQ has a stable anchor `#q-<slug>` for linking.

---

# SEO / GEO / AEO (discoverability goals — added 2026-08-07)

These are **site-discoverability** goals, orthogonal to the "leave no trail" motto (which is about
**visitor** privacy, not the site's own findability). Order of priority:

- **SEO (primary):** sitemap.xml, robots.txt, canonical URLs, per-page `<title>`/meta description,
  OpenGraph + Twitter cards with a share image for every page, semantic HTML + heading structure.
  Not public-tracking: powered by server-rendered meta only.
- **GEO / AEO (secondary):** make pages quotable/authoritative for answer & LLM engines — add
  structured data (`Schema.org` WebSite/Organization/FAQPage/HowTo where relevant), concise
  citable one-line answers at the top of guide/blog posts, and an FAQ that can be extracted.
  Rule: structured data/summary paragraphs only — never reader-tracking to "optimize" (keeps the
  no-tracking promise intact while still being indexable by AI crawlers).

---

## 8. About (R11)

- **Owner chose BOTH** (merge the two styles): open with a **simple, strong, to-the-point mission
  statement** (what we do, why, our independence/no-tracking stance), then a short **lighthearted
  narrator persona** section (the ParanoidSnail character: a reformed burner-phone hermit
  "extremely aware of everything"). Owner reviews and tunes the humor level.
- Sketch: *Mission → "Who's behind the snail" (lighthearted) → "What we stand for" (independence,
  no tracking, honesty) → "Contact/manatee" (humor) + links to Tools/Guides.*
- Link to About in nav/footer.

---

## 9. Home (R7) — redesigned

### 9.1 Priority
**Tools** and **Guides** are the focus; Blog & FAQ secondary.

### 9.2 Home layout (proposed)
1. **Hero** — witty headline + one-liner + primary CTA to Tools and secondary to Guides. No stock
   clutter. Maybe a playful SVG/character accent.
2. **Tools spotlight** — prominent section: quick category chips (top 6–8) + "Browse all tools",
   plus 3 featured tool cards. This is the anchor above the fold after hero.
3. **Guides spotlight** — "Start here" guide cards (3) grouped by category.
4. **Latest from the blog** — compact 3-item list (secondary, below the fold).
5. **FAQ teaser** — 2–3 punchy Q&A teasers linking to `/faq`.
6. **Footer** per §3.2.

---

## 10. 404 (humorous)
- On-brand "Page not found" with wit; search/link back to Tools + Home. Fits brand personality.

---

## 11. Non-functional
- Build `npm run build` clean; `pnpm lint` clean.
- All routes pre-render to static HTML.
- Domain/site URL only read from `.env` (not hardcoded) → build-time `NEXT_PUBLIC_SITE_URL`.
- **404 page** on-brand (snail got lost behind the couch) with helpful links to Tools/Home.
- **Perf budget:** LCP target, no external render-blocking resources (fonts self-hosted),
  responsive+avif/svg images, no CLS from images (dimensions/`aspect-ratio` reserved).
- **CI gate (R13):** run `lint` + `typecheck` + `build` (+ optional `axe` a11y scan on a static
  build) as a required PR status check before merge.

## 12. Licensing (added 2026-08-07)
- Project license: **GPLv3** (LICENSE file already committed).
- Our ship product (code + our own generated SVG images/mascot/fonts-if-OFL) is GPLv3.
- External deps are permissive and GPLv3-compatible: Next.js (MIT), React (MIT), Tailwind (MIT),
  lucide-react (ISC). We self-host any fonts used and pick OFL/MIT-licensed fonts only.
- Include a `THIRD-PARTY-NOTICES.md` crediting bundled third-party assets/licenses.
- Do NOT pull in stock-photo/Unsplash imagery (license ambiguity + AI-slop look); all visuals are
  hand-authored/GPLv3.

## 13. Data maintenance (dead-links on Tools)
- Tool registry stored as structured data (e.g. `data/tools.yml`) rather than hardcoded TSX.
- Each tool entry has a `lastChecked` date; a "last reviewed" note on the Tools page signals
  freshness; periodic review keeps links alive. (Aligns with honesty/trust goal.)
