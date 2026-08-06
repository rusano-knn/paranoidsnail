# ClearOnion — Engineering Setup, CI/CD & Secrets (SETUP)

Version: 0.1 (draft for review)
Covers R12–R15: git/PR workflow, CI/CD to Vercel, secrets/.env, and AGENTS/CLAUDE files.

---

## 1. Version control & PR workflow (R12)

- Revert/discard all commits from the prior `clearonion/` scaffold (it is frozen and left as-is;
  the real project starts from a **new empty repo**).
- **Industry-standard PR workflow, enforced.**
  - `main` is the protected/default branch. **No direct commits/pushes to `main`.**
  - Every change goes on a short-lived feature branch (`feat/<scope>`, `fix/<scope>`,
    `docs/<scope>`, `chore/<scope>`), pushed to origin, opened as a **Pull Request**, reviewed,
    then merged (squash merge for a clean `main` history).
  - Recommended branch protection on GitHub (when owner is ready):
    - Require a PR and at least 1 approval before merging to `main`.
    - Require status checks to pass (CI build/lint) and branches up to date.
    - Do not allow bypassing (admin may temporarily — or owner decides).
- **Commit signing:** this machine is configured to auto-sign commits (GPG/SSH). We only write
  commit messages; signing is applied automatically. Do not modify git config or signing setup.
- Commit message convention (concise, imperative, repo-appropriate):
  `feat(tools): add darknet category filtering`
  `fix(theme): correct light-mode contrast on tool badges`
  `docs(setup): add AGENTS instructions`

---

## 2. Initialization on the new repo (steps taken once owner provides it)
1. Owner creates an **empty GitHub repo** (no README/license to avoid conflicts).
2. We `git clone` via **SSH** (`git@github.com:owner/<repo>.git`).
3. Scaffold the app **inside the clone** (Next.js + TS + Tailwind v4 + MDX).
4. Create `main`, set up branches, and proceed PR-by-PR (never commit to `main` directly).
5. First PRs (ordered): scaffold + CI, brand/design tokens, Tools data + index + filters,
   Guides, Blog, FAQ/About/Privacy, Home, footer/privacy, polish + a11y + reduced-motion.

---

## 3. CI/CD — GitHub Actions → Vercel (R13)

### 3.1 Goals
- On **every PR**: run lint + typecheck + build (and ideally `next build`) as a required status
  check. Optionally post a **Vercel Preview deployment** URL for review.
- On **merge to `main`** (successful PR): automatically build & deploy to **Vercel Production**.

### 3.2 GitHub Actions workflow (.github/workflows/ci.yml)
```
name: CI
on:
  pull_request:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm build
```
> Vercel deployment is handled by the **Vercel GitHub App** (GitHub → Vercel integration), which
> natively deploys previews on PRs and production on `main` merges — no custom deploy action needed
> for hosting. The CI job above guarantees a green build gate independent of Vercel.

### 3.3 Required environment/status
- Enable "Require status checks" on `main` (CI build must pass).
- Vercel project connected to the repo; production branch = `main`.
- Optional Slack/e-mail notifications on failure — not required.

---

## 4. Secrets management & environment (R14)

### 4.1 Principles
- **Never commit secrets.** `.env*` is git-ignored (`.env`, `.env.local`, `.env*.local`).
- **Even the domain name lives in `.env`**, not hardcoded in source.
- Public-safe, non-secret build values can be prefixed `NEXT_PUBLIC_` (they're in the client
  bundle by design — use only for non-secret config like `NEXT_PUBLIC_SITE_URL`).

### 4.2 Files
- `.env.example` (committed) — documents which vars exist, with blank/placeholder values and a
  comment. Safe to show members.
  ```
  # Public site URL (used for canonical/sitemap/robots/open-graph). Not secret, but not in source.
  NEXT_PUBLIC_SITE_URL=https://snail.rusano.io.vn
  ```
- `.env.local` (NOT committed) — real local values.
- Vercel project settings: set the same vars as **Environment Variables** for Production &
  Preview (no need to ship `.env` to CI; Vercel injects them at build). CI build job only needs
  `--frozen-lockfile` install, not secrets.

### 4.3 What we must never commit
- Real domain if owner prefers it secret (owner will decide; still keep in env).
- Any API tokens, Vercel tokens, GitHub tokens, or email credentials.

---

## 5. AGENTS.md & CLAUDE.md (R15)

Provide repo-located instructions so any AI assistant (and humans) follow the project's rules.
Placed at repo root by the first PR. Draft content below (identical in both files, or tailored
sections). These get finalized once we're inside the real repo.

### AGENTS.md / CLAUDE.md draft content
```markdown
# ClearOnion — Agent & Contributor Instructions

## Project
Security & privacy resource site (Tools index, Guides, Blog, FAQ, About). Playfully paranoid tone.
Next.js (App Router) + TypeScript + Tailwind v4 + MDX. Static-first. Hosted on Vercel.

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
```

---

## 6. Testing/verification gates before each PR
- `pnpm` + Node versions pinned via `package.json` `engines` and a `.nvmrc`/`.tool-versions` for
  reproducible builds.
- Run locally before pushing a PR: `pnpm lint`, `pnpm typecheck`, `pnpm build`, plus a quick
  no-JS smoke check of nav/content.
- CI runs the same as a required status check (FSD §11).
- `pnpm lint` → 0 errors.
- `pnpm build` → success, all routes prerender.
- Manual: JS-disabled smoke test on Home/Tools/Guides/Blog/FAQ/About/Privacy; light & dark; mobile
  nav; filter submit (no-JS) and live filter (JS).
- Screenshot review of Home + Tools on desktop & mobile.

---

## 7. Definition of Ready (to start building)
- [x] **Brand picked: ParanoidSnail** (snail mascot + tinfoil hat; snail-green accent).
- [x] **Domain picked: `snail.rusano.io.vn`** (env-only).
- [x] **About style: both** (simple+strong, then lighthearted narrator).
- [x] Scope/priority order reviewed in FSD/BRD.
- [ ] Owner creates the empty GitHub repo and shares the SSH clone URL.
- [ ] This SETUP is approved so the first PR can scaffold + CI.
