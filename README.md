# Prism website design

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/enzo-design-prisms-projects/v0-prism-website-design)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/8xmj81uf3fc)

Next.js App Router project that powers Prism's business growth systems website: marketing pages, proof, specialty service funnels, blog, forms, and legacy direct-visitor surfaces. The codebase stays in sync with [v0.dev](https://v0.dev) chats and ships to production through GitHub Actions + Vercel source deploys.

---

## Quick start

1. **Install prerequisites** – Node.js 22.x LTS (Vercel’s current runtime), [pnpm](https://pnpm.io/), and git.
2. **Install dependencies** – `pnpm install`.
3. **Set up environment variables** – `cp .env.example .env.local` and fill in the values listed in [`docs/environment-setup.md`](./docs/environment-setup.md).
   - `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` is optional for the shared floating widget on `/pricing` and `/contact`; otherwise the stock Prism Sales agent id is used.
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
- **Canonical pricing policy** – `lib/pricing-model.ts` is the single source of truth and models Prism's four productized offers: **Website** (`$300` flat, one-time, optional `$100/month` care) at `/websites`; **Content OS** (`$5,000` to implement over 3 months, then `$1,000/month`) at `/content-os`; **Dental OS** (custom-priced, "book a call") at `/dental-os`; and **Prism Infinity** (`$2,000/month`, unlimited services) at `/prism-infinity`. `/pricing` compares all four. The old five-tier ladder (free Growth Dashboard, Light Audit, `$500` Deep Growth Audit, `$3,500` Growth Sprint, `$1,500/month` Growth Partner) is retired — **except** `/get-started`, kept as a free on-ramp (free Growth Dashboard + request a free deep audit) and surfaced in nav, footer, and a homepage callout. Always spell `/month` (never `/mo`). `pnpm verify:pricing-consistency` gates deploys. Payments use Stripe Payment Links via `lib/payment-links.ts` (the `$300` Website link is live; care/Content OS/Infinity links still need creating). The retired `/founder-os` route now 301-redirects to `/content-os`; other legacy pricing routes still redirect to `/pricing`. Known remaining cleanup: `/ads`, `/seo`, and `/local-listings` still cite the retired `$3,500` Growth Sprint in copy/schema.
- **Search visibility policy** – Prism's public search/LLM footprint is growth-first with dental as a strong specialty proof cluster. `lib/seo/search-visibility.ts` controls static route indexability and the curated blog allowlist used by sitemap, RSS/latest-post APIs, SEO inventory, and tests. New routes/posts should remain noindex unless they support growth systems, pricing, proof, legal, the Growth Dashboard funnel, or a deliberate specialty cluster.
- **Deploy mode policy** – GitHub Actions is the only production publisher. `main` source deploys through `.github/workflows/deploy.yml`, while Vercel Git auto-deploy for `main` is disabled in `vercel.json` to avoid duplicate production releases. The locked-route screenshot job still runs in CI, but it is temporarily non-blocking while visual baselines stabilize.
- **Documentation** – When you add a new flow or change behavior, edit the relevant file under `/docs` (or this README/AGENTS if the rule is global). Do _not_ add new top-level docs without approval; prefer updating existing guides.
- **Environment variables** – Required vars are limited to those listed in [docs/environment-setup.md](./docs/environment-setup.md) and `.env.example` (GA overrides, Formspree-compatible endpoints, ElevenLabs public config, optional site URLs). Do not list vars that aren’t part of the supported setup.
- **Assistant surface** – `/get-started` no longer mounts the custom `SalesChat` UI or the stock ElevenLabs launcher. The public ElevenLabs floating widget from `components/global-elevenlabs-widget.tsx` is limited to non-mobile `/pricing` and `/contact`; mobile viewports and every other public route stay widget-free so focused flows stay clean.

### Assistant and funnel architecture

- `app/get-started/page.tsx` is the free Growth Dashboard entry page, and `app/apply/page.tsx` is the focused question-by-question intake route that starts the Light Audit path.
- `components/forms/GetStartedForm.tsx` powers the `/apply` form and redirects successful submissions to `/thank-you?source=apply` so the thank-you screen can stay honest about review vs. selective strategy follow-up.
- `NEXT_PUBLIC_DASHBOARD_INTAKE_ENDPOINT` is the preferred `/apply` endpoint when the private dashboard app should receive the intake directly; otherwise `/apply` falls back to `NEXT_PUBLIC_APPLY_FORM_ENDPOINT`, then the legacy get-started endpoint name, then Formspree.
- `app/websites/page.tsx` is the `$300` flat one-time website offer. The buyer describes the website they want, submits (captured via Formspree at `NEXT_PUBLIC_WEBSITE_BUILD_FORM_ENDPOINT` / `https://formspree.io/f/xpqebnbz`), sees an in-page success screen, then pays `$300` via the Stripe Payment Link (opens in a new tab) to kick off the build. Delivered in ~7 days with infinite iterations; the finished site is 100% theirs, with an optional `$100/month` care plan afterward. `components/forms/WebsiteOrderForm.tsx` powers the describe → success → pay flow (it replaces the retired `WebsiteBuildEstimatorForm.tsx` dynamic estimator). The page no longer collects no card / reviews-before-payment; that selective model is retired.
- `app/content-os/page.tsx` is the **Content OS** offer (`$5,000` to implement over 3 months, then `$1,000/month`): AI agents that scale content and ads across platforms and the site. It replaced the retired Founder OS — `/founder-os` and `/founder-os/apply` now 301-redirect to `/content-os` in `next.config.mjs`. `app/dental-os/page.tsx` (the full Prism growth system packaged for dental practices, custom-priced) and `app/prism-infinity/page.tsx` (`$2,000/month` unlimited services) complete the four productized offers. The Founder OS page/form files (`app/founder-os/*`, `components/forms/FounderOsApplicationForm.tsx`) remain only as archival code behind the redirect.
- `components/runtime-client-shell.tsx` now keeps route-surface setup on the critical path and defers analytics, monitors, Vercel Analytics, toaster wiring, and the stock ElevenLabs embed/widget into `components/runtime-deferred-features.tsx` during browser idle time. The deferred widget script only loads when the current route and viewport are eligible.
- `components/global-elevenlabs-widget.tsx` is now the single public widget surface. It mounts only on non-mobile `/pricing` and `/contact`; it defaults to collapsed when there is no saved user preference and persists later manual expand/collapse choices in browser storage.
- `lib/elevenlabs-widget.ts` is the canonical source for live public widget config (route allowlist, agent id, allowed markdown-link hosts, public kill switch).
- `components/elevenlabs/ElevenLabsWidget.tsx` stays intentionally thin and uses only documented stock-widget attributes. It also re-applies approved host-level styles after the custom element upgrades, because the vendor runtime overwrites host positioning. Use that path only for safe host concerns like homepage section scoping or inner-page z-index elevation; do not patch the widget Shadow DOM.
- `types/elevenlabs-widget.d.ts` provides JSX typing for the `<elevenlabs-convai>` custom element. Keep it in sync if ElevenLabs introduces new documented attributes we adopt.
- Public widget invariant: when eligible on non-mobile `/pricing` or `/contact`, the host should stay fixed with a top-most z-index so nav, skip links, charts, and other sticky/fixed page chrome never render above the visible widget surface. Mobile viewports and non-eligible routes should not mount the widget or its third-party embed script on first load.

### Image architecture

- Prefer `next/image` for simple route-local imagery and `CoreImage` (`components/core-image.tsx`) when the surface needs Prism's fallback, loading, and analytics behavior.
- `components/image.tsx`, `components/optimized-image.tsx`, and `components/enhanced-image.tsx` are still present for existing/legacy call sites. Do not start a blanket migration unless the image docs and tests are updated in the same pass.
- Remote image domains must be added to `next.config.mjs` before use; see `docs/image-configuration.md` and `docs/image-best-practices.md`.

## Quality & diagnosis scripts

| Command                           | Purpose                                                                                                                                                                                                                                                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pnpm lint`                       | ESLint + Tailwind conventions.                                                                                                                                                                                                                                                                                                 |
| `pnpm typecheck`                  | TypeScript project-wide type safety.                                                                                                                                                                                                                                                                                           |
| `pnpm test`                       | Jest + Testing Library suite.                                                                                                                                                                                                                                                                                                  |
| `pnpm test:visual:locked`         | Playwright visual checks for locked routes (`/`, `/about`, `/pricing`, `/get-started`); runs in the deploy workflow, is currently non-blocking in CI while baselines stabilize, intentionally suppresses the live ElevenLabs widget, and runs against an isolated `next start` server on port `3300` so page-lock screenshots stay deterministic. |
| `pnpm test:home-scroll:mobile`    | Codex-fast mobile Playwright guard for the homepage “See How It Works” CTA. Builds once, starts production Next on port `3310`, and verifies direct hash loads plus fresh/same-hash CTA clicks land `#how-it-works` exactly below the fixed header across compact, baseline, and large phone viewports in Chromium and WebKit. |
| `pnpm test:visual:animations`     | Focused cross-browser loop verification for the homepage hero, `/case-studies`, and `/wall-of-love`, covering Chromium, Firefox, WebKit, and mobile emulation.                                                                                                                                                                 |
| `pnpm test:performance:smoke`     | Cross-browser performance smoke for `/`, `/about`, `/pricing`, and `/get-started` against a running production preview (`PERF_BASE_URL`, defaults to `http://127.0.0.1:3301`).                                                                                                                                                 |
| `pnpm design:lint`                | Validates the root `DESIGN.md` contract with the pinned `@google/design.md` toolchain.                                                                                                                                                                                                                                         |
| `pnpm design:sync`                | Exports `DESIGN.md` into `/generated/tailwind.theme.json` and `/generated/tokens.json`.                                                                                                                                                                                                                                        |
| `pnpm design:check`               | Runs the full design-contract verification flow (`design:lint` + `design:sync`).                                                                                                                                                                                                                                               |
| `pnpm build`                      | Production Next.js build (use before Vercel deploys).                                                                                                                                                                                                                                                                          |
| `pnpm verify:deploy`              | Runs `scripts/verify-deployment.ts` to ensure required env vars and image config exist.                                                                                                                                                                                                                                        |
| `pnpm verify:pricing-consistency` | Blocks deploys when retired pricing policy language reappears on pricing-sensitive surfaces. Contextual non-core dollar values are only allowed on explicitly labeled pages (referral/equipment/ad-fee examples).                                                                                                           |

### ElevenLabs widget verification

- For route-awareness, default-state, attribute changes, or layering fixes, run:
  - `pnpm exec jest __tests__/components/GlobalElevenLabsWidget.test.tsx __tests__/components/ElevenLabsWidget.test.tsx --runInBand`
  - `pnpm exec jest __tests__/lib/elevenlabs.test.ts --runInBand`
  - `pnpm test:visual:widget`
- For visual/runtime bugs, prefer `pnpm build` followed by `pnpm start -p <port>` over `pnpm dev`. The stock ElevenLabs custom element can behave differently after the production bundle and its host styles may look "ignored" if you forget to rebuild before `next start`.
- Expected runtime invariants:
  - On non-mobile `/pricing` and `/contact`, the widget host should resolve to `position: fixed` with the elevated global z-index and remain the topmost element in the widget’s visible region after scrolling.
  - On mobile `/pricing` and `/contact`, the widget and ElevenLabs embed script should stay unmounted.
  - On all other public routes, including `/`, `/about`, `/get-started`, `/apply`, `/ig`, `/tiktok`, and blog posts, the widget and ElevenLabs embed script should stay unmounted on first load.
  - Without a saved preference, the stock launcher should mount collapsed by default on first load.
- The stock widget is not a documented full-screen modal scrim. Do not fake that by reaching into shadow internals; if product wants a true bespoke modal layer, migrate to ElevenLabs’ official SDK/UI path instead of stretching the stock embed past its intended surface.

## Project structure

- `app/` – Next.js App Router routes (marketing pages, blog, forms, API routes).
- `components/` – Reusable UI primitives plus blog-specific elements.
- `content/` – MDX blog posts consumed by `lib/mdx.tsx`.
- `lib/` – Business logic (constants, analytics helpers, MDX helpers, SEO utilities).
- `scripts/` – Diagnostics (deployment verifier, MCP helpers, SEO/site checks).
- `docs/` – Workflow guides (blog architecture, development, forms, etc.).
- `public/llms.txt` – Curated machine-readable map of canonical growth, proof, and specialty pages for LLMs and agents.

## Documentation map

- [`docs/project-overview.md`](./docs/project-overview.md) – Current architecture, source-of-truth map, search policy, and change playbooks.
- [`docs/development-guide.md`](./docs/development-guide.md) – Local workflow, assistant/widget testing, analytics, and debugging checklist.
- [`docs/blog-content-architecture.md`](./docs/blog-content-architecture.md) – MDX taxonomy and RSS/OG behavior.
- [`docs/blog-styling-guide.md`](./docs/blog-styling-guide.md) – Typography and casing expectations for articles.
- [`docs/blog-performance-optimization.md`](./docs/blog-performance-optimization.md) – GPU/layout advice for heavy sections.
- [`docs/forms.md`](./docs/forms.md) – Shared Formspree hooks and thank-you routing.
- [`docs/pages-overview.md`](./docs/pages-overview.md) – Where to edit pricing, contact, free-analysis flows.
- [`docs/build-and-deploy-guide.md`](./docs/build-and-deploy-guide.md) – Build tooling expectations plus the local/CI checklist.
- [`docs/environment-setup.md`](./docs/environment-setup.md) – Environment variable reference for the supported site config.
- [`docs/codex-workflow.md`](./docs/codex-workflow.md) – Codex operator playbook for safe project changes, widget work, dental photography, and mobile-safe media.
- [`docs/image-best-practices.md`](./docs/image-best-practices.md) – Current image component choices and performance rules.
- [`docs/image-configuration.md`](./docs/image-configuration.md) – Current remote image host allowlist and verification notes.

## CLI workflows (GitHub + Vercel)

- `gh auth login` then `gh auth setup-git` to authenticate GitHub CLI and map credentials into git.
- `gh repo clone enzo-prism/prism-website` for first-time checkout, or `git pull --ff-only origin main` for an existing local checkout.
- `gh pr status` to check PR/state before deciding between local work and merge-then-preview flow.
- `gh run list -R enzo-prism/prism-website --limit 10` to inspect latest CI jobs; use `gh run view <run_id> --log` for failing logs.

- `pnpm add -g vercel` or `pnpm dlx vercel` for CLI access.
- `vercel login` then `vercel link` (first time in repo) to target the project.
- `vercel pull --yes --environment=production` to sync remote env vars for parity checks.
- `vercel deploy --prod --yes` for manual production deploys (source deploy; matches CI behavior and should be used only for intentional overrides or rollback recovery).
- `vercel deploy --yes` for preview deployments. Prism preview links should remain publicly reviewable; verify a new preview with `curl -I -L <preview-url>` and confirm it returns `HTTP 200` without Vercel SSO markers.
- `vercel ls` for deployment history, `vercel inspect <deployment-url>` for metadata, and `vercel logs <deployment-url> --follow` for runtime debugging.
- `vercel rollback <deployment-url>` when rollback is needed.

## Deployment

- Merges to `main` trigger the GitHub `Deploy to Vercel` workflow, which runs the visual check plus blocking build/deploy checks and then publishes with `vercel deploy --prod --yes`.
- Deploy workflow runs in order: `UI Lock Screenshots` (`pnpm test:visual:locked`, currently non-blocking) -> `Build and Deploy`.
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

- Analytics defaults to GA4 property `G-P9VY77PRC0` unless `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. GA, Google Ads, and Hotjar load only in the real production environment (gated by `IS_PRODUCTION_ENV` via `NEXT_PUBLIC_VERCEL_ENV`, with a `NODE_ENV` fallback), so Vercel preview deployments do not pollute the live property or fire conversions.
- Vercel Web Analytics is mounted globally through the runtime client shell via `components/vercel-analytics.tsx`; it auto-tracks page views on Vercel, keeps `utm_*` parameters for campaign filtering, and strips non-marketing query params / hash fragments before events are sent.
- The `/apply` capture can post directly to the Prism dashboard intake API through `NEXT_PUBLIC_DASHBOARD_INTAKE_ENDPOINT`; if unset, it falls back to the existing Formspree-backed client submission path.
- The `/websites` order form posts the buyer's website description to Formspree, shows an in-page success screen, then opens the Stripe `$300` Payment Link in a new tab to start the build. `lib/payment-links.ts` (`hasPaymentLink()` / `paymentLink()`) gates whether the pay button opens a live link or falls back to `/contact`.
- Blog OG images are generated dynamically via `/api/og/blog/[slug]`; add new slugs to `lib/mdx-edge.ts` when introducing MDX posts.

Happy shipping! Keep docs updated when new flows (forms, env vars, integrations) are introduced so the next person can get productive quickly.
