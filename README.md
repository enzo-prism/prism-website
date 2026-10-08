# Prism website design

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/enzo-design-prisms-projects/v0-prism-website-design)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/8xmj81uf3fc)

Next.js 16.3.8 App Router project that powers Prism's business growth systems website: marketing pages for three services (Website, Content, Ads), packaged offers on `/pricing`, the `/waitlist` funnel, Prism Products, proof, blog, and legacy direct-visitor surfaces. The codebase stays in sync with [v0.dev](https://v0.dev) chats and ships to production through GitHub Actions + Vercel source deploys.

---

## Quick start

1. **Install prerequisites** – Node.js 22.x LTS (Vercel’s current runtime), [pnpm](https://pnpm.io/), and git.
2. **Install dependencies** – `pnpm install`.
3. **Set up environment variables** – `cp .env.example .env.local` and fill in the values listed in [`docs/environment-setup.md`](./docs/environment-setup.md).
   - `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` is optional for the floating widget on `/pricing` and the homepage guide; otherwise the stock Prism Sales agent id is used.
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
- **Architecture** – Marketing forms post to Formspree with HTML5/client-side validation and `fetch`, using the shared `useFormValidation` hook or equivalent step validation (the stepped `WaitlistForm`). We do **not** use React Hook Form, Zod, or server actions for these flows today. If this changes, update this section immediately.
- **Business model: waitlist-only (since 2026-09-14)** – Prism is fully booked, so every public sales CTA and every lead form goes to `/waitlist`. This is the one current funnel; anything elsewhere describing booking a call, intake routes, `/get-started`, or self-serve checkout as live is history.
  - `lib/waitlist.ts` owns `WAITLIST_CTA` ("Join the waitlist" → `/waitlist`), `WAITLIST_FOCUS_HREFS` (`/waitlist?focus=website|content|ads`, used by service pages, homepage offer cards, and the `/ig` `/tiktok` `/youtube` hubs), `CAPACITY_MESSAGE` (rendered by `components/waitlist/CapacityNotice.tsx`; the intake month comes from `getWaitlistIntakeMonth()`, never a hard-coded string), and `WAITLIST_FORM_ENDPOINT` (`NEXT_PUBLIC_WAITLIST_FORM_ENDPOINT`, falling back to the dedicated "Prism Waitlist" Formspree form `xvkzkqqp`; it shared the Contact form `xjkjbpdb` until 2026-10-07).
  - `components/forms/WaitlistForm.tsx` is the only live sales form: five steps, Formspree + `fetch`, then `/waitlist/thank-you` (noindex, `LeadSuccessTracker`). Details in [`docs/forms.md`](./docs/forms.md#waitlist).
  - `/contact`, `/contact-us`, `/hours`, `/hello`, `/get-started`, `/apply`, `/free-analysis`, `/book-a-shoot`, `/aeo`, `/ai`, and `/website-intake` / `/content-intake` / `/ads-intake` (with `?focus=`) 308-redirect to `/waitlist` in `next.config.mjs`. Their page and form code is deleted.
  - `BOOK_A_CALL_CTA` and `WEBSITE_START_CTA` no longer exist and `lib/pricing-consistency.ts` forbids them. `lib/booking.ts` `BOOKING_URL` survives only for the invite-gated `/chatgpt-ads` unlock, the legacy `/thanks` page, and the legacy post-payment `/checkout/{launch,grow,scale}/thank-you` pages.
  - `/refer` ($100 referral payout), `/scholarship`, `/models`, and the design-vote form are not sales forms and keep working.
- **Public IA** – Header (`components/navbar.tsx`): Home, a **Services** dropdown from `lib/services.ts` (Website `/websites`, Content `/content`, Ads `/ads`), a **Products** dropdown from `lib/products.ts` (Midas → `https://midas-ai.dev`, zRead → `https://zread.dev`; added 2026-10-04, #197), then Case studies and Wall of love. No header CTA. The mobile sheet has 8 links (home, 3 services, 2 products, 2 proof). The footer leads with `WAITLIST_CTA` and has Services, Products, Proof, and Company columns (Company carries About, Pricing, Dental OS, Prism Infinity, Blog, FAQ, Refer a friend). The homepage renders a `#products` section (`components/home/HomeProductsSection.tsx`) after the offers section. Product links go to the product sites, not the waitlist. `lib/services.ts` must not import `lib/constants` (constants imports services). Canonical Content URL is `/content` (`/content-os` 301s).
- **Pricing policy** – `lib/pricing-model.ts` is the single source of truth for the four packaged offers compared on `/pricing`: **Website** (the PRO website at `/websites`), **Content OS** (`/content`), **Dental OS** (`/dental-os`), and **Prism Infinity** (`/prism-infinity`). No offer shows a public price; every primary CTA is a waitlist CTA (`PRICING_PRIMARY_CTA = WAITLIST_CTA`, plus `WEBSITE_WAITLIST_CTA` / `CONTENT_WAITLIST_CTA` / `ADS_WAITLIST_CTA`). Never reintroduce public dollar amounts: the retired `$300`, `$100/month`, `$5,000`, `$1,000/month`, and `$2,000/month` tokens are forbidden on pricing-sensitive surfaces, and all `Offer` structured data stays price-free. Always spell `/month` (never `/mo`). `pnpm verify:pricing-consistency` gates deploys and `pricing-schema-consistency.test.ts` blocks retired pricing schema. `/founder-os` and `/founder-os/apply` 301 to `/content`; other legacy pricing routes redirect to `/pricing`. The $100 referral payout on `/refer` is not service pricing.
- **Search visibility policy** – Prism's public search/LLM footprint is growth-first with dental as a strong specialty proof cluster. `lib/seo/search-visibility.ts` controls static route indexability and the curated blog allowlist used by sitemap, RSS/latest-post APIs, SEO inventory, and tests. New routes/posts should remain noindex unless they support growth systems, pricing, proof, legal, the waitlist, or a deliberate specialty cluster.
- **Deploy mode policy** – GitHub Actions is the only production publisher. `main` source deploys through `.github/workflows/deploy.yml`, while Vercel Git auto-deploy for `main` is disabled in `vercel.json` to avoid duplicate production releases. The `UI Lock Screenshots` job (locked routes, then the mobile navbar spec) blocks the deploy job. Because the dark theme lets large copy changes hide inside the 5% pixel tolerance, the locked spec also asserts rendered copy: locked routes must keep their waitlist phrases and must never render retired pricing tokens or retired CTAs ("Book a Free Demo", "Start my website", "scoped on a 30-minute call").
- **Repository security** – Secret scanning, push protection, and Dependabot alerts + security updates are enabled on GitHub. The "Protect main history" ruleset blocks force-pushes to and deletion of `main`; direct pushes are still allowed. `next.config.mjs` `headers()` sends baseline security headers on every route (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: SAMEORIGIN`, a CSP limited to `frame-ancestors`/`base-uri`/`object-src`, and a `Permissions-Policy` that keeps the microphone available for ElevenLabs).
- **Documentation** – When you add a new flow or change behavior, edit the relevant file under `/docs` (or this README/AGENTS if the rule is global). Do _not_ add new top-level docs without approval; prefer updating existing guides.
- **Environment variables** – Required vars are limited to those listed in [docs/environment-setup.md](./docs/environment-setup.md) and `.env.example` (GA overrides, Formspree-compatible endpoints, ElevenLabs public config, optional site URLs). Do not list vars that aren’t part of the supported setup.
- **Assistant surface** – Prism has two supported public ElevenLabs surfaces: the floating launcher on non-mobile `/pricing` (the only path in `PUBLIC_ELEVENLABS_WIDGET_ALLOWED_PATHS`), plus the consent-gated inline homepage Prism Guide after `HomeFitSection`. The homepage surface is default-off in code, explicitly enabled in production, and loads vendor code only after near-viewport activation, desktop/WebGL 2 checks, and affirmative consent. `/waitlist` and every other route stay widget-free.

### History (superseded models, newest first)

- 2026-10-07 (#198) – Next 16.3.8; `/api/og` route deleted; security headers added; `DESCRIPTION_MAX_LENGTH` 96 → 155; retired free-audit / 30-minute-call copy replaced with the waitlist; `/contact-us` and `/hours` point straight at `/waitlist`.
- 2026-10-04 (#197) – Products (Midas, zRead) added to nav, footer, and homepage.
- 2026-09-14 – Waitlist-only. Retired the intake routes, `/get-started` + `/apply` (`GetStartedForm`, dashboard intake endpoint), `/contact`, `/free-analysis`, `/aeo`, `/book-a-shoot`, `/ai`, `BOOK_A_CALL_CTA`, and `WEBSITE_START_CTA`.
- 2026-09-06 – Content and Ads got `/content-intake` / `/ads-intake` alongside `/website-intake` (retired 09-14).
- 2026-08-31 – Public IA reframed around three services (Website, Content, Ads).
- 2026-07-27 – All-call-first pricing: every offer scoped on a 30-minute call via `BOOK_A_CALL_CTA`; `/website-intake` started websites; `/get-started` kept as a free Growth Dashboard on-ramp. Self-serve `$300` website checkout (`WebsiteOrderForm`, `MobileOrderBar`, `lib/payment-links.ts`) retired.

### Assistant and funnel architecture

- `app/waitlist/page.tsx` is the single live sales funnel; see the business-model bullet above.
- `app/websites/page.tsx` is the PRO website offer: design systems, software-grade engineering, analytics wired from day one, structured to rank on Google and get cited by AI assistants. No public price, no on-page form, no booking CTA; primary CTAs are `WEBSITE_WAITLIST_CTA`.
- `app/content/page.tsx` is the public **Content** service page (packaged as **Content OS** on `/pricing`). `app/dental-os/page.tsx` and `app/prism-infinity/page.tsx` complete the four packaged offers. All three use waitlist CTAs and the shared `CapacityNotice`.
- `components/runtime-client-shell.tsx` keeps route-surface setup on the critical path and defers analytics, monitors, Vercel Analytics, toaster wiring, and the stock ElevenLabs embed/widget into `components/runtime-deferred-features.tsx` during browser idle time. The deferred widget script only loads when the current route and viewport are eligible.
- `components/global-elevenlabs-widget.tsx` owns the floating launcher on non-mobile `/pricing`; it defaults to collapsed when there is no saved user preference and persists later manual expand/collapse choices in browser storage.
- `components/home/HomeElevenLabsAgentSection.tsx` owns the separately gated inline homepage surface. It keeps the vendor script and custom element unmounted until the visitor accepts the AI/recording notice; mobile and unsupported-WebGL browsers receive a first-party "Join the waitlist" fallback.
- `lib/elevenlabs-widget.ts` is the canonical source for live public widget config (route allowlist, agent id, allowed markdown-link hosts, public kill switch).
- `components/elevenlabs/ElevenLabsWidget.tsx` stays intentionally thin and uses only documented stock-widget attributes. The embed runtime is deliberately pinned to `@elevenlabs/convai-widget-embed@0.14.10`; verify both surfaces before upgrading it. The wrapper also re-applies approved host-level styles after the custom element upgrades, because the vendor runtime overwrites host positioning. Use that path only for safe host concerns like homepage section scoping or inner-page z-index elevation; do not patch the widget Shadow DOM.
- `types/elevenlabs-widget.d.ts` provides JSX typing for the `<elevenlabs-convai>` custom element. Keep it in sync if ElevenLabs introduces new documented attributes we adopt.
- Public widget invariant: when eligible on non-mobile `/pricing`, the host should stay fixed with a top-most z-index so nav, skip links, charts, and other sticky/fixed page chrome never render above the visible widget surface. Mobile viewports and non-eligible routes should not mount the widget or its third-party embed script on first load.

### Image architecture

- Prefer `next/image` for simple route-local imagery and `CoreImage` (`components/core-image.tsx`) when the surface needs Prism's fallback, loading, and analytics behavior. `components/image.tsx` remains for existing call sites. Do not start a blanket migration unless the image docs and tests are updated in the same pass.
- Remote image domains must be added to `next.config.mjs` before use; see `docs/image-configuration.md` and `docs/image-best-practices.md`.

## Quality & diagnosis scripts

| Command                           | Purpose                                                                                                                                                                                                                                                                                                                          |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm lint`                       | ESLint + Tailwind conventions.                                                                                                                                                                                                                                                                                                   |
| `pnpm typecheck`                  | TypeScript project-wide type safety.                                                                                                                                                                                                                                                                                             |
| `pnpm test`                       | Jest + Testing Library suite.                                                                                                                                                                                                                                                                                                    |
| `pnpm test:visual:locked`         | Playwright visual checks for locked routes (`/`, `/about`, `/pricing`, `/waitlist`); runs in the deploy workflow as a blocking gate (with CI-only retries), intentionally suppresses the live ElevenLabs widget, and runs against an isolated `next start` server on port `3300` so page-lock screenshots stay deterministic. Navbar or homepage-offer changes need `pnpm test:visual:locked:update` before `main`. |
| `pnpm test:mobile-navbar`         | Playwright mobile Chromium + WebKit guard for the header sheet (8 links: home, website, content, ads, Midas, zRead, case studies, wall of love). The deploy workflow runs it in the `UI Lock Screenshots` job after locked visuals. |
| `pnpm test:visual:animations`     | Focused cross-browser loop verification for the homepage hero, `/case-studies`, and `/wall-of-love`, covering Chromium, Firefox, WebKit, and mobile emulation.                                                                                                                                                                   |
| `pnpm test:performance:smoke`     | Cross-browser performance smoke for `/`, `/about`, `/pricing`, and `/waitlist` against a running production preview (`PERF_BASE_URL`, defaults to `http://127.0.0.1:3301`). |
| `pnpm design:lint`                | Validates the root `DESIGN.md` contract with the pinned `@google/design.md` toolchain.                                                                                                                                                                                                                                           |
| `pnpm design:sync`                | Exports `DESIGN.md` into `/generated/tailwind.theme.json` and `/generated/tokens.json`.                                                                                                                                                                                                                                          |
| `pnpm design:check`               | Runs the full design-contract verification flow (`design:lint` + `design:sync`).                                                                                                                                                                                                                                                 |
| `pnpm build`                      | Production Next.js build (use before Vercel deploys).                                                                                                                                                                                                                                                                            |
| `pnpm verify:deploy`              | Runs `scripts/verify-deployment.ts` to ensure required env vars and image config exist.                                                                                                                                                                                                                                          |
| `pnpm verify:pricing-consistency` | Blocks deploys when retired pricing policy language reappears on pricing-sensitive surfaces. Contextual non-core dollar values are only allowed on explicitly labeled pages (referral/equipment/ad-fee examples).                                                                                                                |

### ElevenLabs widget verification

- For route-awareness, default-state, attribute changes, or layering fixes, run:
  - `pnpm exec jest __tests__/components/HomeElevenLabsAgentSection.test.tsx __tests__/components/GlobalElevenLabsWidget.test.tsx __tests__/components/ElevenLabsWidget.test.tsx --runInBand`
  - `pnpm exec jest __tests__/lib/elevenlabs.test.ts --runInBand`
  - `pnpm test:visual:widget`
- For visual/runtime bugs, prefer `pnpm build` followed by `pnpm start -p <port>` over `pnpm dev`. The stock ElevenLabs custom element can behave differently after the production bundle and its host styles may look "ignored" if you forget to rebuild before `next start`.
- Expected runtime invariants:
  - On non-mobile `/pricing`, the widget host should resolve to `position: fixed` with the elevated global z-index and remain the topmost element in the widget’s visible region after scrolling.
  - On mobile `/pricing`, the widget and ElevenLabs embed script should stay unmounted.
  - On `/`, one inline guide may appear after the audience-fit section when `NEXT_PUBLIC_ELEVENLABS_HOMEPAGE_ENABLED=true`. The vendor script and widget must remain unloaded until the visitor accepts the AI/recording notice; mobile and unsupported-WebGL browsers get the first-party fallback only.
  - On all other public routes, including `/about`, `/waitlist`, `/ig`, `/tiktok`, and blog posts, the widget and ElevenLabs embed script should stay unmounted on first load.
  - Without a saved preference, the stock launcher should mount collapsed by default on first load.
- The stock widget is not a documented full-screen modal scrim. Do not fake that by reaching into shadow internals; if product wants a true bespoke modal layer, migrate to ElevenLabs’ official SDK/UI path instead of stretching the stock embed past its intended surface.
- Native ElevenLabs Terms are an external agent setting, not a repository env var. The public agent endpoint currently reports `terms_text`, `terms_html`, and `terms_key` as `null`; keep the homepage's first-party consent gate in place and use authenticated dashboard/API access before changing native Terms, domain restrictions, audio saving, or retention.

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
- [`docs/forms.md`](./docs/forms.md) – Waitlist form contract, shared Formspree hook, and thank-you routing.
- [`docs/analytics.md`](./docs/analytics.md) – GA4/Ads/Vercel wiring, lead values, and the admin runbook.
- [`docs/pages-overview.md`](./docs/pages-overview.md) – Where to edit the waitlist, pricing, service, product, and proof pages.
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
- Deploy workflow runs in order: `UI Lock Screenshots` (`pnpm test:visual:locked`, then the mobile navbar spec; blocking) -> `Build and Deploy` (typecheck, lint, test, `vercel pull`, `pnpm verify:pricing-consistency`, deploy).
- `main` accepts direct pushes, but the "Protect main history" ruleset rejects force-pushes and branch deletion.
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
- Legacy `/checkout/website/thank-you` stays noindex for old Stripe Payment Link redirects and no longer mounts a purchase tracker (the old `PurchaseSuccessTracker` component was deleted).
- **Analytics is documented in [`docs/analytics.md`](docs/analytics.md)** — event flow, conversion wiring, lead values, enhanced conversions, and a runbook for the GA4/Google Ads settings that live outside this repo (its Stripe/purchase steps are legacy). Run `pnpm audit:ga4` to check the live GA4 configuration for drift.
- Search metadata is generated through `lib/seo/rules.ts`: titles are capped at 48 characters and descriptions at 155 characters across static routes, blog posts, and library details. Run `pnpm seo:inventory` and `pnpm seo:lint` after metadata changes.
- Every route, including blog posts and library details, uses `public/prism-opengraph.png` for Open Graph and Twitter previews. The dynamic `/api/og` image route was deleted on 2026-10-07. Blog featured images remain available for cards and article heroes.
- `/api/latest-posts` caches the curated blog response for one hour. `/api/store-email` is retired and returns `410 Gone`; active lead capture must use the documented form endpoints instead.
- Structured-data scripts use the shared safe JSON-LD serializer. Prism Library TikTok embeds are constructed from trusted post IDs and never inject third-party oEmbed HTML.

Happy shipping! Keep docs updated when new flows (forms, env vars, integrations) are introduced so the next person can get productive quickly.
