# Prism Development Guide

This guide highlights the workflows we lean on most often while iterating on the marketing site. Use it as the quick reference when shipping copy tweaks, adding new landing sections, or wiring forms.

## Local Development

- Install deps with `pnpm install` (repo assumes pnpm).
- Start the Next.js dev server with `pnpm dev`.
- If you use `pnpm exec next start` for a production-parity preview, always run `pnpm build` immediately beforehand. `next start` serves the last production bundle on disk, so source edits will appear "ignored" until you rebuild.
- Run `pnpm lint` before committing so the shared Tailwind + ESLint rules stay consistent.
- For `/get-started` or floating-widget assistant-surface changes, run:
  - `pnpm exec jest __tests__/app/get-started.test.tsx __tests__/components/GlobalElevenLabsWidget.test.tsx __tests__/components/ElevenLabsWidget.test.tsx --runInBand`
  - `pnpm test:visual:widget`
- For pricing-sensitive changes, run:
  - `pnpm verify:pricing-consistency`
- For non-chat changes touching shared infrastructure, update and run the nearest smoke tests in the relevant package (`pnpm test`, `pnpm test:visual:locked`, etc.) before merging.
- Run `pnpm test:visual:locked` before merging changes that touch the UI of `/`, `/about`, or `/pricing` (screenshot-locked routes).
- `pnpm test:visual:locked` now builds with `NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED=true` and boots an isolated `next start` server on port `3300`, so the locked route snapshots stay focused on first-party page chrome instead of the live third-party ElevenLabs overlay or whichever localhost server happens to already be running. `pnpm test:visual:widget` does the inverse: it forces a fresh production build without the kill switch so the real widget behavior check never reuses a stale disabled bundle.
- Run `pnpm test:visual` when you need broader visual coverage beyond the locked routes.
- Run `pnpm exec playwright test __tests__/visual/blog-copy-markdown.spec.ts --project=desktop-chromium` when changing the blog markdown copy button or `/api/blog/[slug]/markdown`.
- Run `pnpm test:visual:widget` when changing the route-aware ElevenLabs launcher outside the homepage hero.
- For blog-post content/frontmatter additions, run `pnpm exec jest __tests__/sitemap.test.ts __tests__/blog-canonical.test.ts --runInBand` as a fast regression check.

### Homepage hero agent checklist

- The homepage hero (`app/client-page.tsx`) now treats the ElevenLabs sales agent as the primary above-the-fold interaction. Keep the page itself server-rendered and isolate the live agent inside `components/home/HomeHeroAgent.tsx`.
- The current hero is intentionally minimal: a solid white stage, the `Prism` wordmark, `impossible is temporary.`, a single subtle `founded 2023 in san francisco` line, and the embedded agent. Avoid reintroducing multi-CTA marketing clutter into this first viewport without a strong reason.
- `HomeHeroAgent` uses the official ElevenLabs widget embed (`https://unpkg.com/@elevenlabs/convai-widget-embed`) and renders the inline `<elevenlabs-convai>` custom element.
- ElevenLabs renders markdown in agent replies, but external links only become clickable when the host is allowlisted on the widget. Keep `markdown-link-allowed-hosts` in sync with whatever calendar or booking destination the agent is instructed to share, rely on the documented `markdown-link-include-www="true"` behavior instead of duplicating `www` hosts in code, and keep `markdown-link-allow-http="false"` so the public widget never emits insecure links.
- Mobile spacing is intentionally biased toward the inline agent: the hero aligns from the top on small screens, the copy stack stays tight, and `HomeHeroAgent` now reserves roughly `35rem` of height on narrow viewports so the widget can use its supported compact layout without clipping the orb or crowding the textarea.
- Keep the stock widget aligned with the official docs: wrapper-only layout, documented attributes, and dashboard-level styling. The homepage hero uses `variant="expanded"` with `dismissible="false"` so the inline product surface stays stable without unsupported Shadow DOM patches.
- Avoid deep compact-mode geometry overrides inside the widget Shadow DOM. ElevenLabs treats the embed as an opinionated surface; keep homepage customization focused on wrapper sizing and supported attributes, and move heavier design customization to the official SDK/UI layer if we need a bespoke chat surface later.
- The stock embed runtime forces its own host positioning, so `components/elevenlabs/ElevenLabsWidget.tsx` now re-applies only the host-level styles we actually need after the custom element mounts. Use that path for safe layer fixes like homepage section scoping or inner-page z-index elevation; do not reach into vendor shadow children for layout control.
- The public agent id resolves via `lib/elevenlabs.ts` and can be overridden with `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`.
- `components/global-elevenlabs-widget.tsx` now renders the stock floating widget on every non-homepage route, including `/get-started`. Keep it out of the way on `/` so the homepage hero remains the primary experience, but do not add route-level suppression on `/get-started` unless the product direction explicitly changes again. The floating widget now treats the first route in the current tab as its default-open signal: homepage-first visits open the inner-page widget by default, direct inner-page landings stay closed, and later user expand/collapse choices persist across future mounts.
- The homepage widget host should stay absolutely scoped to the `.home-hero-agent` container so it scrolls with the hero instead of floating above later sections, while the global floating host should stay at a top-most z-index so nav, skip links, charts, and other fixed site chrome never render above the expanded widget.
- The runtime shell loads the official widget embed script once via `components/elevenlabs/ElevenLabsWidget.tsx`, then both homepage and inner-page widgets reuse that same stock embed path.
- `NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED` exists as a deliberate debug/test seam. When set to a truthy value, the stock embed script, homepage hero widget, and floating widget all stay unmounted so deterministic visual builds do not bake live vendor UI into locked snapshots.
- `components/elevenlabs/PrismElevenLabsPanel.tsx` and the richer client-tool helpers in `lib/elevenlabs.ts` remain in the repo as exploratory/legacy paths, but they are not mounted in production right now. Do not swap them back in casually when the product goal is "look and behave like the official widget."
- In dev, the stock widget may log `[ConversationalAI] Cannot fetch config for agent ... signal is aborted without reason` during Fast Refresh or unmount cleanup. The current ElevenLabs bundle aborts its own config fetch on cleanup, so treat that message as harmless if the widget still renders and `pnpm build` + `pnpm start` are clean.
- If you change hero copy/layout, update the locked-route snapshot test and re-run `pnpm test:visual:locked`.
- If you change the homepage or global widget interaction model, re-run `pnpm exec jest __tests__/components/HomeHeroAgent.test.tsx __tests__/components/GlobalElevenLabsWidget.test.tsx __tests__/components/ElevenLabsWidget.test.tsx`.
- For z-index, scrolling, or layout bugs involving the stock widget, validate against a fresh production bundle: `pnpm build && pnpm start -p <port>`. `next start` serves the last production build on disk, and the ElevenLabs custom element can behave differently from `pnpm dev` / Fast Refresh.
- The fastest runtime sanity checks are:
  - homepage: widget host should compute to `position: absolute`, `inset: 0`, and share the same rect as `.home-hero-agent`
  - inner pages: widget host should compute to `position: fixed` with the elevated global z-index and remain topmost in the visible widget region after scrolling
- The stock widget does not expose a documented "full-screen page-blocking modal" mode. Treat the visible widget surface as the layering boundary we control today; if product wants a true viewport scrim that blocks all underlying content, that is a migration conversation to ElevenLabs' official SDK/UI layer rather than a Shadow DOM styling patch.

### Retired custom sales-chat note

- The old custom `SalesChat` client, `/api/chat`, `/api/sales-chat/*`, and related orchestration helpers are no longer part of the supported Prism website stack.
- The live assistant experience is the stock ElevenLabs widget only:
  - homepage hero via `components/home/HomeHeroAgent.tsx`
  - floating launcher on inner pages via `components/global-elevenlabs-widget.tsx`
- If product ever needs a custom assistant again, treat it as a fresh implementation with new docs, tests, and contracts instead of assuming the pre-2026 deterministic chat backend still exists.

## Styling Pipeline

- Tailwind v4 runs through the `@tailwindcss/postcss` plugin, with `@import "tailwindcss";` and `@config "../tailwind.config.cjs";` in `app/globals.css`.
- To safelist utilities, use `@source inline(...)` in `app/globals.css` (the `safelist` config option is no longer supported).

## Linting

- ESLint uses the flat config in `eslint.config.js` (Next 16 removed `next lint`).

## Formspree Integration

All marketing forms live under `components/forms/` (Contact, Free Analysis, Get Started, AEO) and share the `useFormValidation` hook. The noindex `/ai` utility form in `app/ai/prism-ai-client.tsx` also submits directly to Formspree using the same client-side `fetch` pattern. Legacy AI Website Launch form code remains in `components/ai-website-launch/AiWebsiteLaunchForm.tsx` for archival/reference; active pricing-intent traffic is now routed to `/pricing`.

Key details:

- Forms post to Formspree via `fetch` with `Accept: application/json`. On success we push the user to `/thank-you` or `/analysis-thank-you` so our custom screens always render.
- Use the `_subject` hidden field for inbox filtering and `_gotcha` as the honeypot.
- When adding a new Formspree endpoint, import `useFormValidation({ onValidSubmit })` and only navigate after the request returns `response.ok`.

### AEO assessment landing regression tests

- The AEO funnel adds a dedicated endpoint and dedicated thank-you route:
  - `/aeo` page form submit target: `"/aeo-thank-you"`
  - `AeoAssessmentForm` payload fields: `email`, `website`, `_subject`, `_redirect`, `form_name`, `_gotcha`
- Run this focused command before merging any AEO landing or form edits:
  - `pnpm exec jest __tests__/aeo-form.test.tsx __tests__/aeo-pages.test.tsx __tests__/aeo-discoverability.test.tsx __tests__/sitemap.test.ts`
- If conversion tracking changed (`trackCTAClick`/`trackFormSubmission` args), also verify with any available analytics smoke test you run locally.

## Thank-You Screens

Custom confirmation routes live in `app/thank-you/` and `app/analysis-thank-you/`. Each page is a simple card layout (hero card, CTA card, contact info). If you add new flows, point them to one of these routes for consistency.

## SEO Hygiene

- Route-level metadata should use `buildRouteMetadata` from `lib/seo/metadata.ts` so titles, descriptions, canonical URLs, Open Graph, Twitter, and robots directives stay consistent.
- Titles are normalized to a single `| Prism` suffix (no duplicate suffix chains); descriptions are normalized with shared rules in `lib/seo/rules.ts`.
- Metadata should stay descriptive and concise, not artificially short: shared rules trim page titles to 60 characters max (including `| Prism`) and meta descriptions to 155 characters max across route, blog, and library pages.
- Shared normalization preserves common search terms and product nouns (`SEO`, `AI`, `Google Maps`, `ChatGPT`, `TikTok`, etc.) and keeps useful brand descriptors like `Case Study`, `Podcast`, and `Careers` instead of stripping them out.
- Default metadata workflow for static routes:
  - Set a clear `titleStem` + `description` on the page and let `buildRouteMetadata` generate the final title, canonical, OG, Twitter, and robots fields.
  - Write for search intent first, brand second. Prefer phrases like `Dental website design + local SEO` over internal labels like `Why dental practices love Prism`.
  - If `seo/inventory.csv` shows a clipped or vague result, improve the route’s source copy first; do **not** immediately tighten or loosen the global limits.
- Default metadata workflow for blog and library routes:
  - Let the generator fall back to `title` / `description` by default.
  - Add `seoTitle` / `seoDescription` only when the rendered inventory shows a weak snippet, duplicate title, or low-intent phrasing.
  - Keep blog overrides aligned with the visible article promise; do not write clickbait search titles that diverge from the actual post.
- Use `seo/inventory.csv` as the source of truth for final rendered snippets. Review `final_title` and `meta_description`, not just the source `titleStem` or frontmatter strings.
- `app/sitemap.ts` should emit only canonical, indexable URLs plus verifiable `lastModified` values. Google ignores sitemap `priority` and `changefreq`, so don't spend time tuning or adding them.
- `app/robots.ts` should stay minimal: use it to manage crawl access (for example, keep `/api/og/` crawlable while blocking the rest of `/api/`), and rely on page-level `noindex` for URLs that should stay out of Search.
- `public/llms.txt` is not a Google ranking input, but it should still mirror canonical search surfaces. Keep it limited to canonical, indexable Prism URLs and avoid noindex routes, redirects, or off-site detours unless there is a deliberate reason.
- Use absolute canonicals (`https://www.design-prism.com/...`) for every indexable route.
- Noindex routes should remain crawlable (meta `robots`), but **must be excluded** from the sitemap via `app/sitemap.ts`.
- Keep the indexable set intentionally narrow. Community/source pages (`/ig`, `/youtube`, `/tiktok`), embed-heavy utility pages (`/hottest-content`), product-form utility routes (`/ai`, `/models`), and legacy redirected pricing/offer routes (`/offers*`, `/growth`, `/pricing-dental`, `/ai-website-launch`, `/one-time-fee`) should stay `noindex, nofollow` and out of the sitemap.
- `/blog` filter/search views (`/blog?category=...`, `/blog?q=...`) are set to **noindex, follow** via `X-Robots-Tag` in `proxy.ts` so query-param URLs don’t pollute the index.
- If a blog post `image` frontmatter uses an absolute Prism URL (e.g. `https://www.design-prism.com/...`), we normalize it for Next/Image. Prefer relative paths like `/api/og/...` or `/blog/...` for consistency.
- Blog cards and post hero images now validate frontmatter `image` values at read time. If the file is missing, uses an invalid sentinel (`null`/`undefined`/empty), or points to a raster extension whose asset is actually SVG markup, posts now fall back to the shared default featured image (`https://res.cloudinary.com/dhqpqfw6w/image/upload/v1770786137/Prism_rgeypo.png`) instead of rendering a broken image.
- Blog posts can define `seoTitle` and `seoDescription` in frontmatter for manual snippet control; if omitted, metadata falls back to `title`/`description` with shared normalization.
- Keep `/api/og/` **allowed** in `app/robots.ts` if we use OG endpoints in metadata or structured data.
- Prefer the shared JSON-LD helpers in `components/schema-markup.tsx` (`WebPageSchema`, `CollectionPageSchema`, `ItemListSchema`, `ServiceSchema`, `FAQSchema`, etc.).
- Every indexable page must render a visible `<h1>` that matches the primary search intent.
- Success criteria for SEO-safe routing:
  - Any route that permanently redirects or exists only for channel attribution / utility flow purposes must export `robots: { index: false, follow: false }`.
  - `WebsiteSchema` must not declare a `SearchAction` unless we have a real, crawlable on-site search endpoint.
  - Run `pnpm exec jest __tests__/sitemap.test.ts __tests__/seo-indexability-guards.test.tsx --runInBand` plus `pnpm seo:inventory && pnpm seo:lint` after changing indexability rules.
- Run `pnpm seo:inventory && pnpm seo:lint` before shipping large metadata changes.

### Analytics & Conversion Tracking

- Global Google Analytics + Google Ads tagging happens in `app/layout.tsx`. Both IDs come from `lib/constants.ts` (`GA_MEASUREMENT_ID` and `GOOGLE_ADS_ID`), so set `NEXT_PUBLIC_GA_MEASUREMENT_ID` if you need to override the fallback GA property.
- Global mobile viewport policy also lives in `app/layout.tsx` via Next.js `export const viewport`. We currently lock mobile zoom site-wide (`initialScale = minimumScale = maximumScale = 1`, `userScalable = false`), so treat changes there as a product/accessibility decision, not a route-level tweak.
- Vercel Web Analytics is mounted globally in `app/layout.tsx` via `components/vercel-analytics.tsx` using `@vercel/analytics/next`. We preserve `utm_*` parameters for campaign filtering while stripping non-marketing query params and hash fragments in `lib/vercel-analytics.ts`.
- High-intent marketing actions also flow into Vercel custom events through `utils/analytics.ts` (`cta_click`, `form_submit`, downloads, outbound links, and video interactions). Keep those event payloads compact and non-PII so they stay useful in the Vercel dashboard across plan tiers.
- Marketing attribution is persisted client-side in `lib/marketing-attribution.ts` and injected into form submissions at submit time, so Formspree lead records retain first-touch source context alongside the thank-you page conversion flow.
- Any route-level conversion (e.g., `/thank-you`) should load its own `<Script>` that fires the relevant `gtag('event', 'conversion', { send_to: 'AW-…' })`. See `app/thank-you/page.tsx` for the exact snippet tied to `AW-11373090310/hBMrCMijk70bEIasjq8q`.
- When building a new landing page with a Formspree form, make sure the success handler navigates to `/thank-you` so the Ads conversion snippet runs and the GA pageview records properly.

## Mobile Hero Video Safety

- Decorative autoplaying background videos must not use raw `<video autoPlay ...>` markup directly on touch/coarse devices.
- Use the shared policy in `lib/hero-media-policy.ts` for a single source of truth:
  - `resolveHeroPlaybackPolicy(...)`
  - `HeroPlaybackMode` (`video-autoplay` / `video-fallback-poster` / `poster-only`)
  - optional route override (`playbackPolicy="forcePoster"`)
- Prefer `components/HeroBackgroundLoop.tsx` (for static hero posters + loop background) or `components/HeroLoopingVideo.tsx` (general looping hero card component). Both components now consume policy state and keep `<video>` unmounted unless autoplay is explicitly allowed.
- This prevents the iOS Safari fullscreen/autoplay takeover edge case we observed on routes like `/wall-of-love` and similar hero-heavy pages.
- Keep a poster-first UX for reduced-motion, touch, or media load failure states.
- If a page needs a forced fallback, pass `playbackPolicy="forcePoster"` and let the shared policy pick poster-only behavior.
- Add regression guardrails with:
  - `pnpm exec jest __tests__/hero-loop-gating.test.tsx`
  - `pnpm exec jest __tests__/hero-autoplay-safety.test.ts`
- If you introduce any new decorative autoplay video, update this section and run the above tests before merge.

## Mobile Hero ASCII Resilience

- ASCII animations use preview-first loading plus optional partial-frame batching in `components/ascii/AsciiAnimation.tsx`.
- New props for fault-tolerant loading:
  - `loadStrategy?: "batch" | "all"` (default: `"batch"`)
  - `batchSize?: number` (default: `24`)
  - `maxConcurrentFetches?: number` (default: `6`)
  - `continueOnFrameError?: boolean` (default: `true`)
- Keep the placeholder/preview frame visible while additional chunks stream in so mobile motion starts quickly even when the full set is large.
- Never fail the entire animation because of a single frame request; keep partial sequence playback when at least 2 frames are available.
- If zero frames load, render the deterministic fallback `"No frames loaded"`.

## Pricing Page Content

- Pricing UI is in `app/pricing/client-page.tsx` with the hero modal split into `components/pricing/PricingHero.tsx`.
- Keep canonical pricing copy exact on this page: `$1,000 one-time`, `$2,000/month`, and `$0` free audit.
- Structured data here should only emit canonical offers and point to `https://www.design-prism.com/pricing`.
- When introducing a new section, wrap it with `RevealOnScroll` helpers for consistent motion.

## Free Analysis & Contact Pages

- `/free-analysis` and `/contact` are intentionally minimal (hero, form card, CTA).
- Copy updates happen directly in `app/free-analysis/page.tsx` and `app/contact/page.tsx`.
- Both pages reuse the shared forms mentioned above, so field changes only need to happen once.

## CTA Routing

Any CTA labeled “free analysis” should point to `/free-analysis`. When you add a new CTA, double-check the href so we don’t regress to `/get-started` accidentally.

## Typography & Casing

- Do not enforce global lowercase transforms for site copy; preserve natural capitalization for readability.
- Use Tailwind text-transform utilities only when a specific component intentionally needs stylistic casing.

## UI Components (shadcn/ui)

The site uses shadcn/ui primitives under `components/ui/` (Tailwind + Radix + `cn()` helpers) with the `radix-vega` preset (neutral palette + subtle menu accent, Inter as `--font-sans`). Add new primitives via the CLI so we stay aligned with upstream.

- Add a component: `pnpm dlx shadcn@latest add <component>`
- Common additions: `alert`, `tooltip`, `dropdown-menu`, `popover`, `sheet`, `sonner`
- Toasts: a lazy `<Toaster />` is mounted from `app/layout.tsx` via `components/toaster-lazy.tsx`, so client components can call `toast.success(...)` via `import { toast } from "sonner"`.
- Form submit errors: prefer `<Alert variant="destructive">` for consistent styling, but keep native form controls intact.

Form note: our marketing forms rely on native HTML5 validation via `useFormValidation` (`form.checkValidity()` + real `<input>/<select>/<textarea>`). Avoid swapping native `<select>`/checkbox controls for Radix equivalents unless you also preserve native form semantics and validation.

## Sticky Navigation Offsets

The navbar dynamically sets a CSS variable (`--prism-header-height`) so other sticky UI can position itself below the full header stack (including case study breadcrumbs). Case study chapter menus also set `--prism-case-study-nav-height` via `useCaseStudyStickyNavHeight` (see `hooks/use-case-study-sticky-nav.ts`), and jump targets rely on `scroll-margin-top` for correct offsets when scrolling into view. The case study section nav now uses a scrollable pill row plus a mobile "jump to" sheet so all items stay reachable on small screens.

## Navbar Icon Hover Motion

- Navbar icons animate and tint on hover via the `.nav-link` + `.nav-icon` classes in `components/navbar.tsx` and the motion rules in `app/globals.css`.
- Primary nav labels (including `blog`) are defined in `lib/constants.ts` (`NAV_ITEMS`); when you add/remove an item, update `topIconMap` in `components/navbar.tsx` and add/remove the matching `.nav-icon-*` hover rule in `app/globals.css`.
- Keep hover effects transform-only (plus icon color) and subtle so text layout stays stable and reduced-motion preferences remain respected.

## Deployment

Merges to `main` publish through the GitHub `Deploy to Vercel` workflow. Vercel Git auto-deploy is disabled for `main` in `vercel.json` so production has a single source of truth. If you need a preview, open a PR and use the Vercel preview deployment URL.
