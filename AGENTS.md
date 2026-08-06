# ParanoidSnail — Agent & Contributor Instructions

## Project
Security & privacy resource site (Tools index, Guides, Blog, FAQ, About). Playfully paranoid tone
(the snail: "We move slowly and we leave no trail."). Next.js (App Router) + TypeScript + Tailwind
v4 + MDX. Static-first. Hosted on Vercel.

## Non-negotiable rules
1. PR workflow only. Never commit/push directly to `main`. Work on `feat|fix|docs|chore/<scope>`
   branches, open PRs, get them reviewed, merge via squash.
2. Commits are auto-signed on this machine. Just write a clear, concise message:
   `type(scope): summary` (feat/fix/docs/chore).
3. Secrets in `.env` / `.env.local` only — NEVER hardcode or commit the domain or any token.
   `.env*` is git-ignored. Reference `NEXT_PUBLIC_SITE_URL` from env at build time.
4. The site MUST work without JavaScript for content/navigation. JS is only progressive enhancement
   (theme toggle, live filtering, menu). Keep a no-JS fallback for every JS feature.
5. Support light & dark mode (system default + persisted toggle), desktop & mobile, WCAG AA.
6. Next.js 16 (App Router). This version has breaking changes vs older Next — read the bundled
   docs in `node_modules/next/dist/docs/` before writing App Router code. Heed deprecations.
7. Verify with: `pnpm lint` and `pnpm build` (must be green) before opening a PR.
8. Content tone: honest, humorous-but-competent, never fear-mongering or mean. Darknet section =
   reputable/legal only + safety disclaimers. The Hidden Wiki blog post reviews the *site*, not its
   contest.
9. Self-host assets (fonts/icons); no external trackers or analytics. Only Vercel default logs.
10. Don't add comments unless necessary; follow existing code conventions; write original copy.
11. Every guide/blog entry and Tools category card requires a custom SVG illustration (anti-AI-slop).
    All visuals are our own/GPLv3 — no stock imagery.
12. Fold in SEO/GEO/AEO via server-rendered meta + structured data only; never reader-tracking.
