# ClearOnion — Business Requirements Document (BRD)

Version: 0.2 (draft for review)
Authors: Business Analyst (draft); Owner decisions recorded 2026-08-07.
Status: **Brand + domain selected** → awaiting new empty repo to begin build.

---

## 1. Executive Summary

We are building **ParanoidSnail** (`https://snail.rusano.io.vn`), a **security & privacy resource
site** that entertains while it educates. It is a personal, independent project (owned by the user,
hosted on their own domain + Vercel) with three
core functions that reinforce each other:

1. **Tools** — a large, filterable, categorized index of privacy/security software and services for
   both the **clearnet** and the **darknet** (a separate, clearly-labeled category). This is the
   primary utility and the main attraction.
2. **Guides** — categorized, practical how-tos for staying private and safe.
3. **Blog** — long-form posts on privacy/security topics, including a flagship review of **The
   Hidden Wiki** (the site, not its contest).

The site is "playfully paranoid": serious security substance wrapped in a friendly, witty, slightly
cynical-but-hopeful tone. It is not dry, not a corporate brochure, and not a fear-monger.

The immediate tactical motivation is to participate in **The Hidden Wiki's 2026 contest** ($19 BTC
for a public, registration-free, positive reference to their v3 `.onion` link). That post lives in
our Blog. The strategic motivation is to launch a real, useful, long-lived site the owner keeps and
grows.

---

## 2. Goals & Non-Goals

### 2.1 Goals
- G1: Launch an original-branded privacy/security site on a custom domain via Vercel.
- G2: Ship a filterable **Tools** index (clearnet + darknet, multi-category membership).
- G3: Ship categorized **Guides**.
- G4: Ship a **Blog** including the Hidden Wiki review post (reviewing the site, not the contest).
- G5: Enter and (ideally) qualify for the Hidden Wiki 2026 contest via a compliant public post.
- G6: Deliver a fast, mobile-friendly, accessible site that works with **JavaScript disabled** and
      supports **light & dark** themes.
- G7: Establish a professional engineering workflow: PR-based git, CI/CD auto-deploy to Vercel,
      secrets in `.env`, documented AGENTS/CLAUDE instructions.
- G8: Demonstrate a distinctive, non-generic design and brand personality (with humor).

### 2.2 Non-Goals (explicitly out of scope for v1)
- No user accounts, comments, or auth.
- No e-commerce, payments, or advertising as a business model (donations may be noted later).
- No tracking/analytics beyond Vercel's default hosting logs.
- No scraping/duplication of other index sites' full content (we write original blurbs).
- No deep-scraping of the darknet; the darknet category lists **reputable/legal** services only.

---

## 3. Target Audience & Personas

### P1 — The Privacy Beginner ("Curious Casey")
Wants to de-Google but is overwhelmed. Needs hand-holding, plain language, humor to reduce anxiety.
Doesn't know what a VPN really does or why incognito isn't privacy.

### P2 — The Privacy Enthusiast ("Tinfoil Tina")
Knows the basics, wants a good directory to compare tools, appreciates categorization and filters.
Skeptical of marketing, values honesty (paid-vs-free flags, "oversold" caveats).

### P3 — The Deep-Web Tourist ("Lurker Liam")
Curious about the darknet, heard scary stories. Needs clear safety guidance, reputable first stops,
and a sanity check on what is legal/risky.

### P4 — The Dweller ("Hermit Hank") — long-term user
Wants a lightweight, opinionated, recurring resource for new tools and guides. RSS-friendly.

**Primary audience for the contest post:** P1–P3 who might discover the site via the Hidden Wiki
review.

---

## 4. Site Requirements (captured from stakeholder, mapped)

| # | Stakeholder requirement (verbatim intent) | Where it lands |
|---|-------------------------------------------|----------------|
| R1 | Scrap/redo initial scaffold; start fresh from a new empty repo | See §7 & SETUP |
| R2 | Site is security & privacy focused | Mission / content positioning |
| R3 | Top nav: Home, Tools, Guides, Blog, FAQ, About | FSD §Nav |
| R4 | Footer: simple sitemap, branding, copyright, simple privacy policy (only Vercel default logs, no tracking) | FSD §Footer |
| R5 | Research branding, propose unique options, user decides; add humor | DESIGN doc |
| R6 | Design not "AI-slop"; creative, light JS, functional without JS; desktop+mobile; light+dark | FSD §Theme/JS; DESIGN |
| R7 | Redesign Home; Tools & Guides are the focus, then Blog & FAQ | FSD §Home |
| R8 | Tools: many privacy/security tools, multiple categories per tool, clearnet + darknet (darknet separate category), filter by category/name | FSD §Tools |
| R9 | Guides: categorized | FSD §Guides |
| R10 | Blog includes The Hidden Wiki review — reviewing the site, not the contest | FSD §Blog; content note |
| R11 | About: simple, strong, or lighthearted made-up story (owner reviews) | FSD §About |
| R12 | Revert all commits; PR workflow only, no direct commits to main; auto-signed commits | SETUP §git |
| R13 | CI/CD GitHub Action: build & deploy to Vercel on successful main merge | SETUP §ci |
| R14 | Secrets via `.env` (including domain name); never commit | SETUP §secrets |
| R15 | Update AGENTS.md and CLAUDE.md | SETUP §agents |
| R16 | Write BRD, FSD, design docs in workspace (this project) | This document set |

---

## 5. Deliverable Stack (proposed, to confirm at build time)

- **Framework:** Next.js (App Router), TypeScript, Tailwind CSS v4.
- **Content:** MDX for Guides + Blog.
- **Tools data:** structured JSON/TS data files (clearnet + darknet), with category cross-membership.
- **Hosting:** Vercel free tier.
- **CI/CD:** GitHub Actions → Vercel (review/preview on PR, promote on main merge).
- **Secrets:** `.env` (git-ignored) for domain + anything else; never committed.
- **Icons/fonts:** self-cached/self-hosted to minimize upstream calls (privacy-consistent).

---

## 6. Success Metrics (lightweight, no tracking)
- Contest: successfully publish compliant post and (hoped) receive BTC.
- Site health: all routes return 200; build green; Lighthouse perf/accessibility ≥ 90.
- Reach (proxy, since no analytics): organic search presence on a few target queries; engaged
  return visitors; a small set of darknet-directory listings being found useful.
- Engineering hygiene: 100% PR-merged to main, CI green, `.env` never committed.

---

## 7. Migration / Restart Plan
The prior `clearonion/` scaffold is **frozen and left untouched**. It served as a throwaway
prototype to validate feasibility. Nothing from it is copied verbatim (we rewrite content and design
original). We will (pending this review + brand choice + new empty repo) scaffold a brand-new
project via SSH clone and build fresh, PR-by-PR.

---

## 8. Risks & Open Decisions
| Risk/Decision | Owner | Notes |
|---------------|-------|-------|
| Brand name + personality | User | **DECIDED: ParanoidSnail** (DESIGN §3) |
| Domain | User | **DECIDED: `snail.rusano.io.vn`** (env-only) |
| About style | User | **DECIDED: both** (simple+strong then lighthearted narrator) |
| Darknet category scope | User | Confirmed: reputable/legal only, safety-first |
| Contest payment reliability | User | Treated as bonus; no guarantee (documented honestly) |
| Legal exposure of discussing some tools | BA | Keep educational, avoid instructions-for-harm; disclaimers |
| Repo name | User | **DECIDED: `paranoidsnail`** (public, GPLv3) — created 2026-08-07 |
| License | User | **DECIDED: GPLv3** (deps permissive/compatible; FSD §12) |
| SEO/GEO/AEO | User | **DECIDED: adopt as discoverability goals** (FSD §SEO; no-tracking preserved) |
| Images on every page/post | User | **DECIDED: required** (custom SVG, anti-slop; FSD §5/§6) |
| Contact method | User | **OPEN** — need a non-tracking address (Proton recommended) for About/Contact |
