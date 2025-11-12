# Prism website design

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/enzo-design-prisms-projects/v0-prism-website-design)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/8xmj81uf3fc)

Next.js App Router project that powers the Prism marketing site, blog, and landing page experiments. The codebase stays in sync with [v0.dev](https://v0.dev) chats and ships automatically via Vercel.

---

## Quick start

1. **Install prerequisites** – Node.js 18+, [pnpm](https://pnpm.io/), and git.
2. **Install dependencies** – `pnpm install`.
3. **Set up environment variables** – `cp .env.example .env.local` and fill in the values listed in [`docs/environment-setup.md`](./docs/environment-setup.md).
4. **Run the dev server** – `pnpm dev` (defaults to `http://localhost:3000`).
5. **Optional quality gates** – `pnpm lint && pnpm typecheck && pnpm test` before opening a PR.

The repo assumes pnpm; npm/yarn installs will fall out of sync.

## Quality & diagnosis scripts

| Command | Purpose |
| --- | --- |
| `pnpm lint` | ESLint + Tailwind conventions. |
| `pnpm typecheck` | TypeScript project-wide type safety. |
| `pnpm test` | Jest + Testing Library suite. |
| `pnpm build` | Production Next.js build (use before Vercel deploys). |
| `pnpm verify:deploy` | Runs `scripts/verify-deployment.ts` to ensure required env vars and image config exist. |
| `pnpm diag:supabase` | Confirms Supabase URL + service key are available. |

## Project structure

- `app/` – Next.js App Router routes (marketing pages, blog, forms, API routes).
- `components/` – Reusable UI primitives plus blog-specific elements.
- `content/` – MDX blog posts consumed by `lib/mdx.tsx`.
- `lib/` – Business logic (Supabase client, constants, MDX helpers, email util).
- `scripts/` – Diagnostics (deployment verifier, Supabase checks, MCP helpers).
- `docs/` – Workflow guides (blog architecture, development, forms, etc.).

## Documentation map

- [`docs/development-guide.md`](./docs/development-guide.md) – Local workflow, forms, analytics, CTA routing.
- [`docs/blog-content-architecture.md`](./docs/blog-content-architecture.md) – MDX taxonomy and RSS/OG behavior.
- [`docs/blog-styling-guide.md`](./docs/blog-styling-guide.md) – Typography and casing expectations for articles.
- [`docs/blog-performance-optimization.md`](./docs/blog-performance-optimization.md) – GPU/layout advice for heavy sections.
- [`docs/forms.md`](./docs/forms.md) – Shared Formspree hooks and thank-you routing.
- [`docs/pages-overview.md`](./docs/pages-overview.md) – Where to edit pricing, contact, free-analysis flows.
- [`docs/build-and-deploy-guide.md`](./docs/build-and-deploy-guide.md) – Build tooling expectations plus the local/CI checklist.
- [`docs/environment-setup.md`](./docs/environment-setup.md) – Environment variable reference and verification checklist.
- [`docs/codex-workflow.md`](./docs/codex-workflow.md) – Codex-specific playbook for editing the dental-photography surfaces and booking form.

## Deployment

- Merges to `main` auto-deploy through Vercel (`https://vercel.com/enzo-design-prisms-projects/v0-prism-website-design`).
- v0.dev remains the design/control plane; updates published from v0 sync back into this repo.
- For preview builds open a PR—Vercel posts a preview URL for QA.

## Need-to-knows

- Analytics defaults to GA4 property `G-P9VY77PRC0` unless `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.
- `/api/prism-leads` writes to Supabase and optionally triggers Resend emails; without those env vars it logs a warning and no-ops.
- Blog OG images are generated dynamically via `/api/og/blog/[slug]`; add new slugs to `lib/mdx-edge.ts` when introducing MDX posts.

Happy shipping! Keep docs updated when new flows (forms, env vars, integrations) are introduced so the next person can get productive quickly.
