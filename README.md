# Prism website design

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/enzo-design-prisms-projects/v0-prism-website-design)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/8xmj81uf3fc)

Next.js App Router project that powers the Prism marketing site, blog, and landing page experiments. The codebase stays in sync with [v0.dev](https://v0.dev) chats and ships to production through GitHub Actions + Vercel source deploys.

---

## Quick start

1. **Install prerequisites** – Node.js 22.x LTS (Vercel’s current runtime), [pnpm](https://pnpm.io/), and git.
2. **Install dependencies** – `pnpm install`.
3. **Set up environment variables** – `cp .env.example .env.local` and fill in the values listed in [`docs/environment-setup.md`](./docs/environment-setup.md).
   - `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` is optional for the shared floating widget across public pages; otherwise the stock Prism Sales agent id is used.
4. **Run the dev server** – `pnpm dev` (defaults to `http://localhost:3000`).
5. **Optional quality gates** – `pnpm lint && pnpm typecheck && pnpm test` before opening a PR.

> **Canonical instructions**  
> README.md and AGENTS.md are the single source of truth for technical guidance. Any conflicting direction elsewhere (including CLAUDE.md, legacy playbooks, or scripts) is deprecated until updated to match these files.

The repo assumes pnpm; npm/yarn installs will fall out of sync.

### Design contract

- `DESIGN.md` is the code-facing visual contract for Prism. Read it before changing UI, layout, motion, or design tokens.
- `.agents/skills/ui-design-system/SKILL.md` is the repo-local frontend workflow for repeated UI work.
- `/generated/tailwind.theme.json` and `/generated/tokens.json` are exported from `DESIGN.md` and should be preferred over ad hoc values when implementing new UI.

### Stack guardrails

- **Runtime** – Node 22.x LTS. Vercel now requires 22, so pin local dev here to avoid deploy failures.
- **Package manager** – pnpm 10.x via `corepack enable`. All commands should use `pnpm`; references to `npm run …` are outdated.
- **Architecture** – Marketing forms post to Formspree using the shared `useFormValidation` hook (HTML5 validation + client-side `fetch` + thank-you redirect). We do **not** use React Hook Form, Zod, or server actions for these flows today. If this changes, update this section immediately.
- **Canonical pricing policy** – Core offer pricing is fixed site-wide: `Website Overhaul = $1,000 one-time`, `Growth Partnership = $2,000/month`, `Free Expert Audit = $0`. `/pricing` is the only canonical pricing URL. Legacy pricing routes permanently redirect to `/pricing`.
- **Deploy mode policy** – GitHub Actions is the only production publisher. `main` source deploys through `.github/workflows/deploy.yml`, while Vercel Git auto-deploy for `main` is disabled in `vercel.json` to avoid duplicate production releases.
- **Documentation** – When you add a new flow or change behavior, edit the relevant file under `/docs` (or this README/AGENTS if the rule is global). Do _not_ add new top-level docs without approval; prefer updating existing guides.
- **Environment variables** – Required vars are limited to those listed in [docs/environment-setup.md](./docs/environment-setup.md) and `.env.example` (GA overrides, Formspree-compatible endpoints, ElevenLabs public config, optional site URLs). Do not list vars that aren’t part of the supported setup.
- **Get-started assistant surface** – `/get-started` relies on the stock ElevenLabs floating widget on non-mobile viewports through `components/global-elevenlabs-widget.tsx`; mobile viewports, `/apply`, `/ig`, and `/tiktok` intentionally suppress it so active and social credit flows stay focused. The old custom `SalesChat` client is no longer mounted on the live site.

### Assistant architecture (at a glance)

- `app/get-started/page.tsx` is now the overview/qualification entry page for the Prism application flow, and `app/apply/page.tsx` is the focused question-by-question application route.
- `components/forms/GetStartedForm.tsx` powers the `/apply` form and redirects successful submissions to `/thank-you?source=apply` so the thank-you screen can stay honest about review vs. selective strategy follow-up.
- `components/runtime-client-shell.tsx` now keeps route-surface setup on the critical path and defers analytics, monitors, Vercel Analytics, toaster wiring, and the stock ElevenLabs embed/widget into `components/runtime-deferred-features.tsx` during browser idle time. The deferred widget script only loads when the current route and viewport are eligible.
- `components/global-elevenlabs-widget.tsx` is now the single public widget surface. It mounts on non-mobile public inner pages but stays off the homepage, mobile viewports, `/apply`, `/ig`, and `/tiktok`; it defaults to collapsed when there is no saved user preference and persists later manual expand/collapse choices in browser storage.
- `lib/elevenlabs-widget.ts` is the canonical source for live public widget config (agent id, allowed markdown-link hosts, public kill switch).
- `components/elevenlabs/ElevenLabsWidget.tsx` stays intentionally thin and uses only documented stock-widget attributes. It also re-applies approved host-level styles after the custom element upgrades, because the vendor runtime overwrites host positioning. Use that path only for safe host concerns like homepage section scoping or inner-page z-index elevation; do not patch the widget Shadow DOM.
- `types/elevenlabs-widget.d.ts` provides JSX typing for the `<elevenlabs-convai>` custom element. Keep it in sync if ElevenLabs introduces new documented attributes we adopt.
- Public widget invariant: when eligible, the host should stay fixed with a top-most z-index so nav, skip links, charts, and other sticky/fixed page chrome never render above the visible widget surface. Mobile viewports should not mount the widget or its third-party embed script.

## Quality & diagnosis scripts

| Command                           | Purpose                                                                                                                                                                                                                                                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pnpm lint`                       | ESLint + Tailwind conventions.                                                                                                                                                                                                                                                                                                 |
| `pnpm typecheck`                  | TypeScript project-wide type safety.                                                                                                                                                                                                                                                                                           |
| `pnpm test`                       | Jest + Testing Library suite.                                                                                                                                                                                                                                                                                                  |
| `pnpm test:visual:locked`         | Playwright visual checks for locked routes (`/`, `/about`, `/pricing`, `/get-started`); matches deploy workflow gate, intentionally suppresses the live ElevenLabs widget, and runs against an isolated `next start` server on port `3300` so page-lock screenshots stay deterministic.                                        |
| `pnpm test:home-scroll:mobile`    | Codex-fast mobile Playwright guard for the homepage “See How It Works” CTA. Builds once, starts production Next on port `3310`, and verifies direct hash loads plus fresh/same-hash CTA clicks land `#how-it-works` exactly below the fixed header across compact, baseline, and large phone viewports in Chromium and WebKit. |
| `pnpm test:visual:animations`     | Focused cross-browser loop verification for the homepage hero, `/case-studies`, and `/wall-of-love`, covering Chromium, Firefox, WebKit, and mobile emulation.                                                                                                                                                                 |
| `pnpm test:performance:smoke`     | Cross-browser performance smoke for `/`, `/about`, `/pricing`, and `/get-started` against a running production preview (`PERF_BASE_URL`, defaults to `http://127.0.0.1:3301`).                                                                                                                                                 |
| `pnpm design:lint`                | Validates the root `DESIGN.md` contract with the pinned `@google/design.md` toolchain.                                                                                                                                                                                                                                         |
| `pnpm design:sync`                | Exports `DESIGN.md` into `/generated/tailwind.theme.json` and `/generated/tokens.json`.                                                                                                                                                                                                                                        |
| `pnpm design:check`               | Runs the full design-contract verification flow (`design:lint` + `design:sync`).                                                                                                                                                                                                                                               |
| `pnpm build`                      | Production Next.js build (use before Vercel deploys).                                                                                                                                                                                                                                                                          |
| `pnpm verify:deploy`              | Runs `scripts/verify-deployment.ts` to ensure required env vars and image config exist.                                                                                                                                                                                                                                        |
| `pnpm verify:pricing-consistency` | Blocks deploys when legacy conflicting pricing reappears on pricing-sensitive surfaces. Contextual non-core dollar values are only allowed on explicitly labeled pages (referral/equipment/ad-fee examples).                                                                                                                   |

### ElevenLabs widget verification

- For route-awareness, default-state, attribute changes, or layering fixes, run:
  - `pnpm exec jest __tests__/components/GlobalElevenLabsWidget.test.tsx __tests__/components/ElevenLabsWidget.test.tsx --runInBand`
  - `pnpm exec jest __tests__/lib/elevenlabs.test.ts --runInBand`
  - `pnpm test:visual:widget`
- For visual/runtime bugs, prefer `pnpm build` followed by `pnpm start -p <port>` over `pnpm dev`. The stock ElevenLabs custom element can behave differently after the production bundle and its host styles may look "ignored" if you forget to rebuild before `next start`.
- Expected runtime invariants:
  - On non-mobile inner pages, the widget host should resolve to `position: fixed` with the elevated global z-index and remain the topmost element in the widget’s visible region after scrolling.
  - On mobile inner pages, the widget and ElevenLabs embed script should stay unmounted.
  - On `/ig` and `/tiktok`, the widget and ElevenLabs embed script should stay unmounted so the social credit rolls remain minimal.
  - Without a saved preference, the stock launcher should mount collapsed by default on first load.
- The stock widget is not a documented full-screen modal scrim. Do not fake that by reaching into shadow internals; if product wants a true bespoke modal layer, migrate to ElevenLabs’ official SDK/UI path instead of stretching the stock embed past its intended surface.

## Project structure

- `app/` – Next.js App Router routes (marketing pages, blog, forms, API routes).
- `components/` – Reusable UI primitives plus blog-specific elements.
- `content/` – MDX blog posts consumed by `lib/mdx.tsx`.
- `lib/` – Business logic (constants, analytics helpers, MDX helpers, SEO utilities).
- `scripts/` – Diagnostics (deployment verifier, MCP helpers, SEO/site checks).
- `docs/` – Workflow guides (blog architecture, development, forms, etc.).

## Documentation map

- [`docs/development-guide.md`](./docs/development-guide.md) – Local workflow, assistant/widget testing, analytics, and debugging checklist.
- [`docs/blog-content-architecture.md`](./docs/blog-content-architecture.md) – MDX taxonomy and RSS/OG behavior.
- [`docs/blog-styling-guide.md`](./docs/blog-styling-guide.md) – Typography and casing expectations for articles.
- [`docs/blog-performance-optimization.md`](./docs/blog-performance-optimization.md) – GPU/layout advice for heavy sections.
- [`docs/forms.md`](./docs/forms.md) – Shared Formspree hooks and thank-you routing.
- [`docs/pages-overview.md`](./docs/pages-overview.md) – Where to edit pricing, contact, free-analysis flows.
- [`docs/build-and-deploy-guide.md`](./docs/build-and-deploy-guide.md) – Build tooling expectations plus the local/CI checklist.
- [`docs/environment-setup.md`](./docs/environment-setup.md) – Environment variable reference for the supported site config.
- [`docs/codex-workflow.md`](./docs/codex-workflow.md) – Codex-specific playbook for editing the dental-photography surfaces and booking form.

## CLI workflows (GitHub + Vercel)

- `gh auth login` then `gh auth setup-git` to authenticate GitHub CLI and map credentials into git.
- `gh repo clone enzo-prism/prism-website` for first-time checkout, or `git pull --ff-only origin main` for an existing local checkout.
- `gh pr status` to check PR/state before deciding between local work and merge-then-preview flow.
- `gh run list -R enzo-prism/prism-website --limit 10` to inspect latest CI jobs; use `gh run view <run_id> --log` for failing logs.

- `pnpm add -g vercel` or `pnpm dlx vercel` for CLI access.
- `vercel login` then `vercel link` (first time in repo) to target the project.
- `vercel pull --yes --environment=production` to sync remote env vars for parity checks.
- `vercel deploy --prod --yes` for manual production deploys (source deploy; matches CI behavior and should be used only for intentional overrides or rollback recovery).
- `vercel deploy --yes` for preview deployments.
- `vercel ls` for deployment history, `vercel inspect <deployment-url>` for metadata, and `vercel logs <deployment-url> --follow` for runtime debugging.
- `vercel rollback <deployment-url>` when rollback is needed.

## Deployment

- Merges to `main` trigger the GitHub `Deploy to Vercel` workflow, which runs the release gates and then publishes with `vercel deploy --prod --yes`.
- Deploy workflow gates run in order: `UI Lock Screenshots` (`pnpm test:visual:locked`) -> `Build and Deploy`.
- v0.dev remains the design/control plane; updates published from v0 sync back into this repo.
- Vercel Git auto-deploy is disabled only for `main`; preview deployments from PR branches remain available for QA.

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
- Vercel Web Analytics is mounted globally through the runtime client shell via `components/vercel-analytics.tsx`; it auto-tracks page views on Vercel, keeps `utm_*` parameters for campaign filtering, and strips non-marketing query params / hash fragments before events are sent.
- Marketing capture runs directly through Formspree-backed client submissions; there is no custom Prism lead intake route in the supported website stack anymore.
- Blog OG images are generated dynamically via `/api/og/blog/[slug]`; add new slugs to `lib/mdx-edge.ts` when introducing MDX posts.

Happy shipping! Keep docs updated when new flows (forms, env vars, integrations) are introduced so the next person can get productive quickly.
