# 🐌 ParanoidSnail

> **We move slowly and we leave no trail.**

A security & privacy resource site that entertains while it educates. ParanoidSnail is an
independent, personal project — no venture funding, no tracking, no accounts. Just honest,
practical guidance (with a warmly paranoid snail who's extremely aware of everything).

## What's here

- **Tools** — a categorized directory of privacy/security tools (clearnet + a reputable/legal
  darknet category), filterable with or without JavaScript.
- **Guides** — practical, categorized, do-it-yourself privacy/security walkthroughs.
- **Blog** — long-form editorials, including an honest review of The Hidden Wiki (the site).
- **FAQ** — common questions answered with humor and accuracy.
- **About** — who the snail is and what we stand for.

## Contact
Open a [GitHub Issue](https://github.com/rusano-knn/paranoidsnail/issues/new) — the snail reads
every message.

## Stack

- [Next.js](https://nextjs.org) (React) — currently Next 16 (see `AGENTS.md` for breaking-change
  note)
- TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- MDX for guide/blog content (server-rendered, no-JS friendly)
- Vercel for hosting (deploy on `main` merge), GitHub Actions for CI

## License

Licensed under the **GNU General Public License v3.0** (see [`LICENSE`](LICENSE)).

Our own generated assets (SVG illustrations, the mascot) are GPLv3. Third-party dependencies
(Next.js, React, Tailwind, lucide) are permissive and GPLv3-compatible — see
[`THIRD-PARTY-NOTICES.md`](THIRD-PARTY-NOTICES.md).

## Getting started

See [`docs/SETUP.md`](docs/SETUP.md) for environments, secrets (`.env`), CI, and the PR workflow.

```bash
pnpm install
pnpm dev
```

## Contributing / workflow

This repo uses a strict **PR-only** workflow — never commit directly to `main`. See
[`docs/SETUP.md`](docs/SETUP.md) §1.
