# Prism Project Overview

This is the current operator map for the Prism website. Use it before making broad changes, adding routes, changing search visibility, touching forms, or shipping to production.

Prism is now a business growth systems website: websites, SEO and AI search, Google Maps, reviews, ads, tracking, content, proof, pricing, and the Growth Dashboard to Light Audit funnel. Dental remains one of Prism's strongest proof verticals, but the public homepage and intake flow should speak to founders, owners, operators, and growth-focused companies more broadly.

## Current Shape

- Framework: Next.js 16 App Router, React 19, TypeScript, Tailwind v4.
- Runtime: Node.js 22.x and pnpm 10.x.
- Production: GitHub Actions publishes to Vercel with source deploys. Vercel Git auto-deploy is disabled for `main`; the locked-route visual job currently runs non-blocking while baselines stabilize.
- Design system: root `DESIGN.md`, generated tokens in `generated/`, shared primitives in `components/core-route/` and `components/ui/`.
- Active positioning: growth-first, dental-proven. Dental proof should stay visible and credible, while non-dental case studies should appear as first-class proof of the broader growth system.
- Current scale from this audit: 113 page routes, 5 route handlers, 88 blog MDX files, 22 case studies (21 of which render through the shared visual minimal template with browser + mobile screenshot heroes), and 25 docs files.

## Source Of Truth Files

| Concern | Start here | Notes |
| --- | --- | --- |
| Global repo rules | `AGENTS.md`, `README.md` | These outrank older playbooks when instructions conflict. |
| Project map | `docs/project-overview.md` | This file is the first stop for future orientation. |
| Development workflow | `docs/development-guide.md` | Local dev, SEO, analytics, UI, form, and widget rules. |
| Release workflow | `docs/build-and-deploy-guide.md` | Local checks, CI order, Vercel deploy, and live verification. |
| Route ownership | `docs/pages-overview.md` | What each major route is for and where to edit it. |
| Blog system | `docs/blog-content-architecture.md` | MDX frontmatter, search curation, related posts, RSS, markdown copy. |
| Forms | `docs/forms.md` | Formspree contracts, field names, thank-you routing, analytics. |
| Environment | `.env.example`, `docs/environment-setup.md` | Keep supported variables limited and current. |
| Search visibility | `lib/seo/search-visibility.ts` | Shared index/noindex and blog allowlist policy. |
| Pricing truth | `lib/pricing-model.ts`, `app/websites/page.tsx` | Canonical pricing follows the free Growth Dashboard, included Light Audit, normally `$500` Deep Growth Audit, `$3,500+` sprint, and `$1,500/month+` ongoing partner path. `/websites` is the dedicated one-time website build exception, starting at `$300` for tiny accepted launches. |
| Shared chrome | `components/navbar.tsx`, `components/footer.tsx`, `lib/constants.ts` | Header nav, logo interaction, footer links, and the single footer funnel CTA. |
| Public assistant | `lib/elevenlabs-widget.ts`, `components/global-elevenlabs-widget.tsx` | Stock ElevenLabs widget route allowlist, mobile suppression, default collapsed state, and public kill switch. |
| Images | `next.config.mjs`, `components/core-image.tsx`, `components/image.tsx`, `docs/image-best-practices.md` | Next/Image remote hosts plus the current legacy/new component split. |
| Case studies | `lib/case-study-data.ts`, `components/case-study-minimal.tsx`, `components/case-studies/CaseStudyVisualHero.tsx`, `scripts/capture-case-study-screenshots.mjs`, `docs/pages-overview.md` | Canonical case study metadata, shared visual template, browser + mobile screenshot frames, and the Playwright capture script that populates `public/case-studies/<slug>-home-{desktop,mobile}.jpg`. |

## Runtime Architecture

- `app/layout.tsx` mounts global metadata, schema, analytics scripts, runtime shell, Sentry context, and shared page chrome.
- `components/runtime-client-shell.tsx` keeps route-surface setup and core analytics on the critical path.
- `components/runtime-deferred-features.tsx` defers heavier browser-only features such as monitors, Vercel Analytics, toaster wiring, and the stock ElevenLabs widget.
- `components/global-elevenlabs-widget.tsx` is the live public floating widget surface on eligible non-mobile `/pricing` and `/contact` only.
- `components/elevenlabs/ElevenLabsWidget.tsx` wraps the documented ElevenLabs custom element and applies host-level positioning only.
- `components/navbar.tsx` and `components/footer.tsx` are the single shared chrome layer. The header logo has a subtle hover/focus treatment; the footer has one primary "Free audit" CTA that routes to `/get-started`.
- `components/forms/GetStartedForm.tsx` is the active Growth Dashboard intake. It prefers `NEXT_PUBLIC_DASHBOARD_INTAKE_ENDPOINT`, then falls back through Formspree-compatible endpoints.
- `components/forms/WebsiteBuildEstimatorForm.tsx` is the active `/websites` one-time build estimator. It posts to Formspree, submits calculated estimate metadata, and redirects to `/thank-you?source=website-build` after review-request submission.
- `app/robots.ts` manages crawl access only. Use page-level robots metadata for noindex decisions.
- `app/sitemap.ts` emits only canonical, indexable static routes, case study detail pages, and curated blog posts.
- `public/llms.txt` is a curated machine-readable map of the growth system, proof, and specialty clusters. Keep it narrower than the full route tree.

## Content And Route Map

- Homepage: `app/page.tsx` delegates to `app/client-page.tsx`, which composes the growth-first homepage from `components/home/*`.
- Homepage client proof: `components/home/HomeDentistWinsSection.tsx` (legacy name) wraps `components/home/HomeClientCoverFlow.tsx`, a restrained 3D Cover Flow deck of broad client proof with **one card per published case study** (kept in sync with `/case-studies` / `CASE_STUDIES`). Card data comes from `HOMEPAGE_CLIENT_WINS` in `components/home/homepage-content.ts`; each slide renders a **real client-website screenshot** (`public/case-studies/<slug>-home-mobile.jpg` via the slide's `image` field), captured leading with the site's clean branded hero (dismiss popups/cookie bars/chat widgets first). The motion is input-led with no autoplay and adapts to touch via `isTouch` (`useMobile('(hover: none), (pointer: coarse)')`): phones get a direct 1:1 swipe (one casual swipe = one card), a tighter fan, fewer mounted covers, and no parallax/tilt/hover. The old abstract-visual carousel (`HomeDentistWinsCarousel`, `data-client-win-abstract`) was retired.
- Core marketing routes: `app/about`, `app/pricing`, `app/get-started`, `app/apply`, `app/services`, `app/websites`, `app/ads`, `app/local-listings`, `app/seo`, `app/ai-seo-services`, `app/aeo`, `app/proof`, and `app/wall-of-love`.
- Dental cluster: `app/dental-website`, `app/dental-practice-seo-expert`, `app/custom-email-for-dental-practices`, `app/dental-photography/*`, `app/google/dental-ads`, `app/google/dental-patient-forms`, `app/facebook-ads-for-dentists`, `app/tiktok-ads-for-dentists`, and `app/ai-agents/dental`.
- Case studies: canonical data lives in `lib/case-study-data.ts`; detail pages render through lightweight shared case study components and should remain indexable.
- Blog: MDX files live in `content/blog`; metadata, post loading, and search curation flow through `lib/mdx-data.ts`, `app/blog/[slug]/page.tsx`, and `lib/seo/search-visibility.ts`.
- Library and podcast: live direct-visitor surfaces, but currently noindex and excluded from sitemap/LLM maps.
- Redirected legacy pricing/offers routes: handled in `next.config.mjs`; preserve redirects to `/pricing`.

## Search Surface Rules

`lib/seo/search-visibility.ts` is the canonical search policy.

- Add a static route to `INDEXABLE_STATIC_ROUTES` only when it supports Prism's growth system, pricing, proof, legal, the Growth Dashboard funnel, or a deliberate specialty cluster.
- Add broad, utility, social, legacy, or off-theme routes to `NOINDEX_ROUTES` or `NOINDEX_PREFIXES`.
- Keep every case study detail page indexable unless there is a specific quality or legal reason to hide one.
- Add blog posts to `INDEXABLE_BLOG_SLUGS` only when they strengthen growth, local visibility, AI search, dental, or another deliberate specialty authority.
- Leave noindex pages crawlable unless the page is private or API-only. Search engines need to see the meta noindex directive.
- Keep `public/llms.txt` aligned with the same curated growth map. It should not become a sitewide route index.

When search visibility changes, run:

```bash
pnpm exec jest __tests__/sitemap.test.ts __tests__/seo-indexability-guards.test.tsx __tests__/llms.test.ts __tests__/blog-canonical.test.ts --runInBand
pnpm seo:inventory
pnpm seo:lint
```

## Form And Lead Flow

- Use native HTML form controls plus `hooks/use-form-validation.ts`.
- Use client-side `fetch` with `Accept: application/json`; do not use server actions, React Hook Form, or Zod for the current marketing flows.
- Add Formspree ops metadata through `components/forms/FormspreeOpsFields.tsx`.
- Use non-campaign `source=...` query params for internal thank-you variants. Do not put `utm_*` on internal redirects.
- Confirmed sales leads should route through a thank-you page that mounts `LeadSuccessTracker`.
- Scholarship, model, community, or other non-sales forms can emit GA4 lead-style events, but must not send Google Ads lead conversions.

## Adding Or Changing Common Things

| Change | Edit | Update docs | Minimum checks |
| --- | --- | --- | --- |
| New indexable route | `app/<route>/page.tsx`, `lib/seo/search-visibility.ts`, internal links | `docs/pages-overview.md`, maybe this file | sitemap/search Jest, `pnpm seo:inventory && pnpm seo:lint` |
| New noindex direct route | Route page and metadata via `buildRouteMetadata` | `docs/pages-overview.md` if it is durable | route metadata test if high-risk |
| New blog post | `content/blog/<slug>.mdx`, maybe `lib/mdx-edge.ts` for OG metadata | `docs/blog-content-architecture.md` only if workflow changes | `pnpm typecheck`, blog/sitemap Jest |
| Search-visible blog post | `INDEXABLE_BLOG_SLUGS` | `docs/blog-content-architecture.md` if policy changes | blog/sitemap/llms Jest, SEO inventory/lint |
| New form | `components/forms/*`, route page, thank-you route if needed | `docs/forms.md`, `.env.example`, `docs/environment-setup.md` if env changes | form Jest, analytics tests if conversion changed |
| Pricing copy | `lib/pricing-model.ts`, pricing route/components, `app/websites/page.tsx` for the dedicated one-time website build exception | README/AGENTS only if policy changes | `pnpm verify:pricing-consistency` |
| Assistant widget route | `lib/elevenlabs-widget.ts`, `components/global-elevenlabs-widget.tsx`, deferred runtime | README/AGENTS/docs only if public policy changes | widget Jest, `pnpm test:visual:widget` |
| Visual or layout work | Route/component files, `DESIGN.md` if contract changes | relevant page/design docs | `pnpm lint`, targeted Jest, visual tests for affected routes |
| New or refreshed case study | `lib/case-study-data.ts` (entry + `websiteUrl`), then `node scripts/capture-case-study-screenshots.mjs <slug>` to populate `public/case-studies/<slug>-home-{desktop,mobile}.jpg` | `docs/pages-overview.md` only if the layout contract or screenshot convention changes | `pnpm typecheck`, sitemap/SEO Jest if the route is new, visit `/case-studies/<slug>` locally to confirm the hero renders |
| Production release | Commit and push `main` | no doc update unless process changed | CI green, live sitemap/robots/critical route smoke |

## Release Truth

Local previews are useful, but production truth is the GitHub Actions run plus live public checks.

1. Keep `main` in sync with `origin/main`.
2. Run scoped local checks with Node 22.
3. Commit only the intended files.
4. Push to `main`.
5. Watch the `Deploy to Vercel` workflow.
6. After success, verify live public routes:
   - `https://www.design-prism.com/sitemap.xml`
   - `https://www.design-prism.com/robots.txt`
   - representative indexable growth and dental routes
   - representative noindex broad routes
   - `https://www.design-prism.com/llms.txt`

Use `docs/build-and-deploy-guide.md` for the full checklist.
