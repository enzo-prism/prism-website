# Prism website design

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/enzo-design-prisms-projects/v0-prism-website-design)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/8xmj81uf3fc)

Next.js App Router project that powers the Prism marketing site, blog, and landing page experiments. The codebase stays in sync with [v0.dev](https://v0.dev) chats and ships automatically via Vercel.

---

## Quick start

1. **Install prerequisites** – Node.js 22.x LTS (Vercel’s current runtime), [pnpm](https://pnpm.io/), and git.
2. **Install dependencies** – `pnpm install`.
3. **Set up environment variables** – `cp .env.example .env.local` and fill in the values listed in [`docs/environment-setup.md`](./docs/environment-setup.md).
   - Include `SALES_CHAT_BOOKING_URL`, `SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL`, `SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL`, and `SALES_CHAT_LEADS_WEBHOOK_URL` for deterministic `/get-started` sales chat.
   - `SALES_CHAT_LEADS_WEBHOOK_SECRET` is required for custom webhooks and optional when the lead webhook URL is a Formspree endpoint.
4. **Run the dev server** – `pnpm dev` (defaults to `http://localhost:3000`).
5. **Optional quality gates** – `pnpm lint && pnpm typecheck && pnpm test` before opening a PR.

> **Canonical instructions**  
> README.md and AGENTS.md are the single source of truth for technical guidance. Any conflicting direction elsewhere (including CLAUDE.md, legacy playbooks, or scripts) is deprecated until updated to match these files.

The repo assumes pnpm; npm/yarn installs will fall out of sync.

### Stack guardrails

- **Runtime** – Node 22.x LTS. Vercel now requires 22, so pin local dev here to avoid deploy failures.
- **Package manager** – pnpm 10.x via `corepack enable`. All commands should use `pnpm`; references to `npm run …` are outdated.
- **Architecture** – Marketing forms post to Formspree using the shared `useFormValidation` hook (HTML5 validation + client-side `fetch` + thank-you redirect). We do **not** use React Hook Form, Zod, or server actions/mechanical Supabase inserts for these flows today. If this changes, update this section immediately.
- **Canonical pricing policy** – Core offer pricing is fixed site-wide: `Website Overhaul = $1,000 one-time`, `Growth Partnership = $2,000/month`, `Free Expert Audit = $0`. `/pricing` is the only canonical pricing URL. Legacy pricing routes permanently redirect to `/pricing`.
- **Documentation** – When you add a new flow or change behavior, edit the relevant file under `/docs` (or this README/AGENTS if the rule is global). Do *not* add new top-level docs without approval; prefer updating existing guides.
- **Environment variables** – Required vars are limited to those listed in [docs/environment-setup.md](./docs/environment-setup.md) and `.env.example` (GA overrides, Supabase credentials, Resend key, optional site URLs). Do not list vars that aren’t implemented in code.
- **Sales Chat (Spec v1)** – `/get-started` mounts a deterministic `SalesChat` client + server state machine for intents A–G (free audit, website overhaul, growth partnership, FAQ/objections/guardrails). Chat UI is availability-gated and only renders when `SALES_CHAT_ENABLED` and required CTA links are configured.

### Sales chat architecture (at a glance)

- `app/get-started/page.tsx` computes runtime availability via `getSalesChatRuntimeConfig(process.env)` and mounts `SalesChat` only when `uiAvailable`.
- `app/api/chat/route.ts` is deterministic v2 (state-machine JSON contract) and returns `x-sales-chat-route` on every response plus `x-request-id` on success.
- `/api/chat` success responses now include lead dispatch observability hints (`leadDispatchStatus`, `leadDispatchCode`) so clients can distinguish attempted/succeeded/failed lead fan-out.
- `app/api/sales-chat/events/route.ts` ingests lifecycle and telemetry events.
- `app/api/sales-chat/leads/route.ts` validates and forwards typed lead payloads for backfill/manual dispatch.
- `lib/sales-chat/spec-v1-*` contains canonical copy, routing, validation, and state transitions.
- `utils/analytics.ts` emits deep GA4 sales-chat funnel events (`sales_chat_quick_reply_clicked`, `sales_chat_spec_node_entered`, `sales_chat_offer_recommended`, and lead dispatch outcome events).

## Quality & diagnosis scripts

| Command | Purpose |
| --- | --- |
| `pnpm lint` | ESLint + Tailwind conventions. |
| `pnpm typecheck` | TypeScript project-wide type safety. |
| `pnpm test` | Jest + Testing Library suite. |
| `pnpm test:visual:locked` | Playwright visual checks for locked routes (`/`, `/about`, `/pricing`); matches deploy workflow gate. |
| `pnpm test:sales-chat:core` | Deterministic sales-chat reliability matrix (API/component/page/runtime/copy/engine/payload analytics tests). |
| `pnpm test:sales-chat:e2e` | Playwright checks for `/get-started` with chat enabled and disabled. |
| `pnpm test:sales-chat:stress` | Consecutive-run stress loop (default 20 runs) for flake detection. |
| `pnpm smoke:sales-chat:local` | Fast localhost smoke for `/api/chat` deterministic init + free-audit terminal lead dispatch (run while `pnpm dev` is active). |
| `pnpm build` | Production Next.js build (use before Vercel deploys). |
| `pnpm verify:deploy` | Runs `scripts/verify-deployment.ts` to ensure required env vars and image config exist. |
| `pnpm verify:sales-chat-config` | Validates `.vercel/.env.production.local` after `vercel pull`; fails when chat is enabled without required deterministic chat keys (CTA URLs + lead webhook URL). `SALES_CHAT_LEADS_WEBHOOK_SECRET` is required only for non-Formspree lead backends. `AI_GATEWAY_*` is required only when AI response mode is enabled (`SALES_CHAT_AI_FALLBACK_ENABLED=true` and `SALES_CHAT_AI_RESPONSE_MODE!=off`). |
| `pnpm verify:pricing-consistency` | Blocks deploys when legacy conflicting pricing reappears on pricing-sensitive surfaces. Contextual non-core dollar values are only allowed on explicitly labeled pages (referral/equipment/ad-fee examples). |
| `pnpm diag:supabase` | Confirms Supabase URL + service key are available. |

## Project structure

- `app/` – Next.js App Router routes (marketing pages, blog, forms, API routes).
- `components/` – Reusable UI primitives plus blog-specific elements.
- `content/` – MDX blog posts consumed by `lib/mdx.tsx`.
- `lib/` – Business logic (Supabase client, constants, MDX helpers, email util).
- `scripts/` – Diagnostics (deployment verifier, Supabase checks, MCP helpers).
- `docs/` – Workflow guides (blog architecture, development, forms, etc.).

## Documentation map

- [`docs/development-guide.md`](./docs/development-guide.md) – Local workflow, sales chat request/response contract, analytics, and debugging checklist.
- [`docs/blog-content-architecture.md`](./docs/blog-content-architecture.md) – MDX taxonomy and RSS/OG behavior.
- [`docs/blog-styling-guide.md`](./docs/blog-styling-guide.md) – Typography and casing expectations for articles.
- [`docs/blog-performance-optimization.md`](./docs/blog-performance-optimization.md) – GPU/layout advice for heavy sections.
- [`docs/forms.md`](./docs/forms.md) – Shared Formspree hooks and thank-you routing.
- [`docs/pages-overview.md`](./docs/pages-overview.md) – Where to edit pricing, contact, free-analysis flows.
- [`docs/build-and-deploy-guide.md`](./docs/build-and-deploy-guide.md) – Build tooling expectations plus the local/CI checklist.
- [`docs/environment-setup.md`](./docs/environment-setup.md) – Environment variable reference, including deterministic sales-chat contract, lead webhook payload rules, and optional AI orchestration config.
- [`docs/codex-workflow.md`](./docs/codex-workflow.md) – Codex-specific playbook for editing the dental-photography surfaces and booking form.

## CLI workflows (GitHub + Vercel)

- `gh auth login` then `gh auth setup-git` to authenticate GitHub CLI and map credentials into git.
- `gh repo clone enzo/prism-website` for first-time checkout, or `git pull --ff-only origin main` for an existing local checkout.
- `gh pr status` to check PR/state before deciding between local work and merge-then-preview flow.
- `gh run list -R enzo/prism-website --limit 10` to inspect latest CI jobs; use `gh run view <run_id> --log` for failing logs.

- `pnpm add -g vercel` or `pnpm dlx vercel` for CLI access.
- `vercel login` then `vercel link` (first time in repo) to target the project.
- `vercel pull --yes --environment=production` to sync remote env vars for parity checks.
- `vercel deploy --prod --yes` for manual production deploys (source deploy; matches CI behavior).
- `vercel deploy --yes` for preview deployments.
- `vercel ls` for deployment history, `vercel inspect <deployment-url>` for metadata, and `vercel logs <deployment-url> --follow` for runtime debugging.
- `vercel rollback <deployment-url>` when rollback is needed.

## Deployment

- Merges to `main` auto-deploy through Vercel (`https://vercel.com/enzo-design-prisms-projects/v0-prism-website-design`).
- Deploy workflow gates run in order: `UI Lock Screenshots` (`pnpm test:visual:locked`) -> `Sales Chat E2E` (`pnpm test:sales-chat:e2e`) -> `Build and Deploy`.
- v0.dev remains the design/control plane; updates published from v0 sync back into this repo.
- For preview builds open a PR—Vercel posts a preview URL for QA.

## Canonicalization rules

Production canonical origin is `https://www.design-prism.com`.

- **Host + protocol** – Any request to `design-prism.com` (http or https) or `http://www.design-prism.com` 301s to the same path on `https://www.design-prism.com`.
- **Trailing slashes** – The site uses **no trailing slash** URLs. Requests like `/services/` redirect to `/services` (root `/` is unchanged).
- **Canonical tags** – Every indexable page sets a self‑referencing `<link rel="canonical">` via `metadata.alternates.canonical`.
- **Internal links** – Absolute internal URLs in code and MDX should use the canonical origin and no trailing slash.

**How to test**

1. Start the dev server: `pnpm dev`.
2. Check redirects + canonicals:
   - Production (default): `pnpm canonical:check`
   - Local: `pnpm canonical:check -- --origin http://localhost:3000`

The checker prints each URL’s redirect chain, final URL, and canonical tag value. Host/protocol redirects are only enforced on `design-prism.com`/`www.design-prism.com` so local development on `localhost` works normally.

## Need-to-knows

- Analytics defaults to GA4 property `G-P9VY77PRC0` unless `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.
- `/api/prism-leads` writes to Supabase and optionally triggers Resend emails; without those env vars it logs a warning and no-ops.
- Blog OG images are generated dynamically via `/api/og/blog/[slug]`; add new slugs to `lib/mdx-edge.ts` when introducing MDX posts.

Happy shipping! Keep docs updated when new flows (forms, env vars, integrations) are introduced so the next person can get productive quickly.
