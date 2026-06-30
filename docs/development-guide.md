# Prism Development Guide

This guide highlights the workflows we lean on most often while iterating on the marketing site. Use it as the quick reference when shipping copy tweaks, adding new landing sections, or wiring forms.

For a current whole-project map, start with `docs/project-overview.md`. This guide is the day-to-day workflow companion.

## Local Development

- Install deps with `pnpm install` (repo assumes pnpm).
- Start the Next.js dev server with `pnpm dev`.
- If you use `pnpm exec next start` for a production-parity preview, always run `pnpm build` immediately beforehand. `next start` serves the last production bundle on disk, so source edits will appear "ignored" until you rebuild.
- Read `/DESIGN.md` before changing UI, layout, motion, or visual tokens. It is the code-facing design contract for this repo.
- For repeated frontend work, use `.agents/skills/ui-design-system/SKILL.md` alongside `/DESIGN.md`.
- Run `pnpm lint` before committing so the shared Tailwind + ESLint rules stay consistent.
- When you update the design contract itself, run:
  - `pnpm design:lint`
  - `pnpm design:sync`
  - or the combined `pnpm design:check`
- For `/get-started`, `/apply`, or floating-widget assistant-surface changes, run:
  - `pnpm exec jest __tests__/app/get-started.test.tsx __tests__/app/apply.test.tsx __tests__/components/GetStartedForm.test.tsx __tests__/components/GlobalElevenLabsWidget.test.tsx __tests__/components/ElevenLabsWidget.test.tsx __tests__/lib/elevenlabs.test.ts --runInBand`
  - `pnpm test:visual:widget`
- For pricing-sensitive changes, run:
  - `pnpm verify:pricing-consistency`
- For non-chat changes touching shared infrastructure, update and run the nearest smoke tests in the relevant package (`pnpm test`, `pnpm test:visual:locked`, etc.) before merging.
- Run `pnpm test:visual:locked` before merging changes that touch the UI of `/`, `/about`, `/pricing`, or `/get-started` (screenshot-locked routes).
- `pnpm test:visual:locked` now builds with `NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED=true` and boots an isolated `next start` server on port `3300`, so the locked route snapshots stay focused on first-party page chrome instead of the live third-party ElevenLabs overlay or whichever localhost server happens to already be running. The CI job currently runs non-blocking while baselines stabilize; local UI work should still run it when locked routes are affected. `pnpm test:visual:widget` does the inverse: it forces a fresh production build without the kill switch so the real widget behavior check never reuses a stale disabled bundle.
- Run `pnpm test:home-scroll:mobile` when changing homepage hero CTAs, fixed-header sizing, anchor behavior, or the `/` section order. This Codex-optimized guard checks the “See the system” CTA on compact, baseline, and large phone viewports in Chromium and WebKit, then asserts the `#how-it-works` section lands at the exact header-aware offset for direct hash loads, fresh CTA clicks, and same-hash re-clicks.
- For cross-browser route-load smoke checks, run `pnpm build`, start `pnpm start -p 3301` in a second terminal, then run `pnpm test:performance:smoke`. The smoke script covers `/`, `/about`, `/pricing`, and `/get-started` on Chromium, Firefox, and WebKit using both desktop and mobile profiles.
- Run `pnpm test:visual` when you need broader visual coverage beyond the locked routes.
- Run `pnpm test:visual:animations` when you change the looping hero motion on `/`, `/case-studies`, or `/wall-of-love`. It verifies the real loops advance on Chromium, Firefox, and WebKit across desktop plus mobile emulation.
- Run `pnpm exec playwright test __tests__/visual/blog-copy-markdown.spec.ts --project=desktop-chromium` when changing the blog markdown copy button or `/api/blog/[slug]/markdown`.
- Run `pnpm test:visual:widget` when changing the route-aware ElevenLabs launcher behavior.
- For blog-post content/frontmatter additions, run `pnpm exec jest __tests__/sitemap.test.ts __tests__/blog-canonical.test.ts --runInBand` as a fast regression check.

### Homepage refresh checklist

- The homepage first viewport is one integrated dark composition: shared site navbar, copy-led hero card, and a subtle ASCII motion layer behind the text instead of a route-only overlay header treatment.
- The homepage structure is intentionally ultra-minimal: hero, mixed client Cover Flow deck, compact proof band, buyer decision problem, Found/Trusted/Chosen system, service labels, short process, compact proof, and final audit CTA. Avoid reintroducing older apps/training/wall-of-love-carousel sections unless product direction changes.
- `components/home/HomeAiToolsSection.tsx` is no longer part of the homepage story. If AI/tool proof comes back, it should be a tiny supporting proof detail instead of a logo matrix or explanatory section.
- AI tool logos remain vendored from SVGL into `public/logos/ai-tools/` for any future proof detail or deeper page that needs them; they are not an active homepage requirement.
- OpenClaw, Grok, and Cursor use supplied custom SVGs in the same folder and should be treated as local brand assets if that proof returns.
- `components/home/HomeHeroSection.tsx` is the canonical homepage hero surface. Keep the shared `AsciiHeroBackdrop` treatment restrained so motion supports the copy instead of overpowering it.
- Keep the reduced-motion fallback pinned to the static ASCII frame so visual tests remain deterministic, and keep the shared navbar/footer consistent across the homepage and inner routes.
- The client deck directly below the hero is broad business proof, not a dental photo gallery. Its card data lives in `HOMEPAGE_CLIENT_WINS`; the wrapper is still named `HomeDentistWinsSection` for compatibility, but the live component is `components/home/HomeClientCoverFlow.tsx`, a mixed-client 3D Cover Flow.
- Cover Flow cards render **real client-website screenshots** (each slide's `image`, a `public/case-studies/<slug>-home-mobile.jpg` capture). Motion is a restrained, input-led deck: one shared camera, a one-time back-to-front fan-open entrance, hover lift + neighbour yield, damped pointer parallax, a single `cubic-bezier(0.22,1,0.36,1)` easing, and **no autoplay**. Touch (`isTouch = useMobile('(hover: none), (pointer: coarse)')`) drops parallax/tilt/hover, uses one static shadow, mounts fewer covers with a tighter fan, drops the on-card CTA pill, and swipes 1:1 (casual swipe = one card, flick = more). Keep `prefers-reduced-motion` on the flat scroll-snap fallback. The active cover links to the case study; do not reintroduce the retired abstract-visual / `data-client-win-abstract` / color-toggle behavior. New mobile screenshots are captured with `node scripts/capture-case-study-screenshots.mjs <slug>`.
- ElevenLabs renders markdown in agent replies, but external links only become clickable when the host is allowlisted on the widget. Keep `markdown-link-allowed-hosts` in sync with whatever calendar or booking destination the agent is instructed to share, rely on the documented `markdown-link-include-www="true"` behavior instead of duplicating `www` hosts in code, and keep `markdown-link-allow-http="false"` so the public widget never emits insecure links.
- Keep the stock widget aligned with the official docs: wrapper-only layout, documented attributes, and dashboard-level styling.
- Avoid deep geometry overrides inside the widget Shadow DOM. ElevenLabs treats the embed as an opinionated surface; keep customization focused on supported attributes and host-level layering, and move heavier design customization to the official SDK/UI layer if we need a bespoke chat surface later.
- The stock embed runtime forces its own host positioning, so `components/elevenlabs/ElevenLabsWidget.tsx` now re-applies only the host-level styles we actually need after the custom element mounts. Use that path for safe layer fixes like homepage section scoping or inner-page z-index elevation; do not reach into vendor shadow children for layout control.
- The public agent id resolves via `lib/elevenlabs.ts` and can be overridden with `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`.
- `components/global-elevenlabs-widget.tsx` now renders the stock floating widget only on non-mobile `/pricing` and `/contact`; `/get-started`, `/`, mobile viewports, the active `/apply` form, the minimal `/ig` and `/tiktok` social thank-you pages, and all other public routes intentionally stay widget-free. With no saved preference, it should stay closed by default; explicit user expand/collapse choices persist across future eligible mounts.
- The floating host should stay at a top-most z-index so nav, skip links, charts, and other fixed site chrome never render above the expanded widget.
- `components/runtime-client-shell.tsx` now keeps route-surface setup plus the core GA page/form listener layer on the critical path, while `components/runtime-deferred-features.tsx` still defers heavier client-only work like monitors, Vercel Analytics, and the public widget bundle during browser idle time.
- `NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED` exists as a deliberate debug/test seam. When set to a truthy value, the stock embed script and floating widget stay unmounted so deterministic visual builds do not bake live vendor UI into locked snapshots.
- `components/elevenlabs/PrismElevenLabsPanel.tsx` and the richer client-tool helpers in `lib/elevenlabs.ts` remain in the repo as exploratory/legacy paths, but they are not mounted in production right now. Do not swap them back in casually when the product goal is "look and behave like the official widget."
- In dev, the stock widget may log `[ConversationalAI] Cannot fetch config for agent ... signal is aborted without reason` during Fast Refresh or unmount cleanup. The current ElevenLabs bundle aborts its own config fetch on cleanup, so treat that message as harmless if the widget still renders and `pnpm build` + `pnpm start` are clean.
- If you change hero copy/layout or the Signal Convergence SVG timing/geometry, update the locked-route snapshot test and re-run `pnpm test:visual:locked`.
- If you change the homepage or global widget interaction model, re-run `pnpm exec jest __tests__/components/GlobalElevenLabsWidget.test.tsx __tests__/components/ElevenLabsWidget.test.tsx`.
- For z-index, scrolling, or layout bugs involving the stock widget, validate against a fresh production bundle: `pnpm build && pnpm start -p <port>`. `next start` serves the last production build on disk, and the ElevenLabs custom element can behave differently from `pnpm dev` / Fast Refresh.
- The fastest runtime sanity checks are:
  - homepage, `/get-started`, `/apply`, `/ig`, `/tiktok`, blog posts, and other non-assistant routes: no public ElevenLabs script or floating widget should mount on first load
  - non-mobile `/pricing` and `/contact`: widget host should compute to `position: fixed` with the elevated global z-index and remain topmost in the visible widget region after scrolling
  - mobile `/pricing` and `/contact`: no public ElevenLabs script or floating widget should mount
  - default first-load behavior: widget should mount collapsed unless the user has already saved an explicit preference
- The stock widget does not expose a documented "full-screen page-blocking modal" mode. Treat the visible widget surface as the layering boundary we control today; if product wants a true viewport scrim that blocks all underlying content, that is a migration conversation to ElevenLabs' official SDK/UI layer rather than a Shadow DOM styling patch.

### Retired custom sales-chat note

- The old custom `SalesChat` client, `/api/chat`, `/api/sales-chat/*`, and related orchestration helpers are no longer part of the supported Prism website stack.
- The live assistant experience is the stock ElevenLabs floating widget via `components/global-elevenlabs-widget.tsx`.
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
- `/get-started` is now the free Growth Dashboard entry page, while `/apply` is the focused question-by-question dashboard intake form. Keep the copy and thank-you flow explicit that a review follows a real business submission, while the later Deep Growth Audit or sprint path is optional and selective.

### AEO assessment landing regression tests

- The AEO funnel adds a dedicated endpoint and dedicated thank-you route:
  - `/aeo` page form submit target: `"/aeo-thank-you"`
  - `AeoAssessmentForm` payload fields: `email`, `website`, `_subject`, `_redirect`, `form_name`, `_gotcha`
- Run this focused command before merging any AEO landing or form edits:
  - `pnpm exec jest __tests__/aeo-form.test.tsx __tests__/aeo-pages.test.tsx __tests__/aeo-discoverability.test.tsx __tests__/sitemap.test.ts`
- If conversion tracking changed (`trackCTAClick`/`trackFormSubmission` args), also verify with any available analytics smoke test you run locally.

## Thank-You Screens

Custom confirmation routes live in `app/thank-you/` and `app/analysis-thank-you/`. Keep them minimal and truthful to the originating flow. The shared `/thank-you` page now emphasizes receipt + review rather than automatically promising a meeting, and the `/apply` flow uses `?source=apply` so the thank-you screen can render the stricter application-specific expectation setting.

## SEO Hygiene

- Route-level metadata should use `buildRouteMetadata` from `lib/seo/metadata.ts` so titles, descriptions, canonical URLs, Open Graph, Twitter, and robots directives stay consistent.
- Titles are normalized to a single `| Prism` suffix (no duplicate suffix chains); descriptions are normalized with shared rules in `lib/seo/rules.ts`.
- Metadata should stay descriptive and concise, not artificially short: shared rules trim page titles to 60 characters max (including `| Prism`) and meta descriptions to 155 characters max across route, blog, and library pages.
- Shared normalization preserves common search terms and product nouns (`SEO`, `AI`, `Google Maps`, `ChatGPT`, `TikTok`, etc.) and keeps useful brand descriptors like `Case Study`, `Podcast`, and `Careers` instead of stripping them out.
- Default metadata workflow for static routes:
  - Set a clear `titleStem` + `description` on the page and let `buildRouteMetadata` generate the final title, canonical, OG, Twitter, and robots fields.
  - Write for search intent first, brand second. Prefer phrases like `Business growth systems + local SEO` over internal labels like `Why companies love Prism`.
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
- Keep the indexable set intentionally narrow and growth-first. `lib/seo/search-visibility.ts` is the source of truth for search visibility; new routes should default to noindex unless they support the growth system story: websites, SEO/AI search, reviews, ads, tracking, content, proof, pricing, the Growth Dashboard funnel, or a deliberate specialty cluster.
- Broad Prism surfaces such as apps, software, Replit/OpenAI guides, podcast/library pages, careers, scholarships, unrelated industry pages, and social/community utilities should stay usable for direct visitors but out of the sitemap and public LLM map unless product direction explicitly changes.
- Blog posts are curated for search with `INDEXABLE_BLOG_SLUGS` and optional `searchVisibility` frontmatter. New posts are not indexable by default; add them to the curated growth/local/dental allowlist only when they strengthen Prism's authority.
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

### AI visibility loop (GEO)

- `pnpm seo:ai-report [days]` (default 90) prints AI answer-engine referrals (ChatGPT, Perplexity, Claude, Gemini, Copilot) from the Prism GA4 property plus the Search Console clicks/impressions trend and top queries. It requires the locally authenticated `gog` CLI and is an operator tool, not CI.
- Quarterly cadence: run the report, refresh the top indexable pillar posts (update facts, dates, FAQs, and `modifiedTime`), promote any strong noindexed posts into `INDEXABLE_BLOG_SLUGS`, and prune posts that no longer earn impressions.
- Case-study `structured.results` metrics must stay verifiable against the named source (usually each client's Search Console). When refreshing them, bump `dateModified` and keep value/label/detail consistent with what the source shows.
- Keep the canonical one-sentence Prism definition synchronized across `public/llms.txt`, the `GlobalSchemaGraph` Organization `description`, and the about page so engines see one consistent entity.

- Global Google Analytics + Google Ads tagging happens in `app/layout.tsx`. Both IDs come from `lib/constants.ts` (`GA_MEASUREMENT_ID` and `GOOGLE_ADS_ID`), so set `NEXT_PUBLIC_GA_MEASUREMENT_ID` if you need to override the fallback GA property.
- GA now loads with `afterInteractive` so the critical pageview + lead funnel listeners attach earlier. Keep heavier client-only systems deferred, but do not push the core GA page/form listeners behind browser-idle loading again unless we intentionally accept lower analytics fidelity.
- Global mobile viewport policy also lives in `app/layout.tsx` via Next.js `export const viewport`. We currently lock mobile zoom site-wide (`initialScale = minimumScale = maximumScale = 1`, `userScalable = false`), so treat changes there as a product/accessibility decision, not a route-level tweak.
- Vercel Web Analytics is mounted globally through the runtime client shell and `components/vercel-analytics.tsx`. We preserve `utm_*` parameters for campaign filtering while stripping non-marketing query params and hash fragments in `lib/vercel-analytics.ts`.
- SPA pageviews are manually sent through `trackPageView(...)` in `utils/analytics.ts`. Do not reintroduce route-change `gtag('config', ...)` calls for pageview updates; GA4's own docs warn that mixing manual pageviews with extra config-driven pageviews can create duplicates.
- `components/enhanced-analytics.tsx` waits briefly for route metadata to settle before emitting a client-side `page_view`, so page title, URL, and previous URL stay aligned after App Router navigation. Engagement events should keep the page context captured when the engagement period started rather than inheriting the next route's URL.
- High-intent marketing actions also flow into Vercel custom events through `utils/analytics.ts` (`cta_click`, `form_submit_success`, `book_call_click`, `contact_action_click`, downloads, outbound links, video interactions, and `generate_lead`). Keep those event payloads compact and non-PII so they stay useful in the Vercel dashboard across plan tiers.
- Event-level attribution sent to GA4 should stay low-cardinality. Keep campaign context to `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `landing_path`, and first-touch source/medium/campaign; do not push raw click IDs (`gclid`, `fbclid`, `msclkid`), free-text queries, raw URLs, form messages, names, emails, phone numbers, or other one-off identifiers into regular GA4 events.
- GA4 event payloads are sanitized in `utils/analytics.ts`. `page_location` keeps only safe UTM parameters and drops hashes; Formspree submissions still receive full attribution fields from `lib/marketing-attribution.ts` so lead records can retain click IDs without sending them to GA4.
- Marketing attribution is persisted client-side in `lib/marketing-attribution.ts` and injected into form submissions at submit time, so Formspree lead records retain first-touch source context alongside the thank-you page conversion flow. Direct entries should still persist `landing_path`; only set source/medium/campaign fields when real campaign parameters are present.
- Internal thank-you redirects must not add `utm_*` parameters. Use a non-campaign marker such as `source=...` when a thank-you route needs to vary copy or behavior; `utm_*` is reserved for real external campaign traffic.
- `/ig` and `/tiktok` now rely on `components/social-thanks-page.tsx` for shared CTA/outbound-link tracking. Keep the header profile link and the four action cards (YouTube guides and the Marble App Store link via `trackExternalLinkClick`, the `/wall-of-love` and `/get-started` cards via `trackCTAClick`) instrumented there so inbound social traffic keeps a full click trail.
- Lead conversion tracking is centralized in `utils/analytics.ts`: `trackFormSubmission(...)` stores a pending lead by default, and `components/thank-you/LeadSuccessTracker.tsx` consumes it once on the relevant thank-you route before emitting GA4 `generate_lead` plus the Google Ads lead conversion. Use `conversionMode: "immediate"` only for confirmed success states that do not navigate to a thank-you page.
- Google Ads conversion sends should remain limited to true sales/business leads. Secondary lead-like forms such as scholarship applications, model applications, and newsletter/community signups can emit GA4 `generate_lead`, but must pass `sendGoogleAdsConversion: false`.
- `book_call_click` measures booking intent on calendar/demo/kickoff links and should not replace `generate_lead`. Treat it as a supporting event unless Prism explicitly marks it as a secondary key event in GA4.
- GA4 enhanced measurement form reporting depends on the real DOM `<form id="...">` / `name="..."` attributes, not just hidden `form_name` inputs. Every marketing form should expose both so GA can populate `form_id` and `form_name` consistently in automatic `form_start` / `form_submit` events.
- The `/apply` funnel now uses a layered event model:
  - automatic GA4 enhanced measurement: `form_start`, `form_submit`
  - custom funnel detail: `apply_form_view`, `apply_form_start`, `apply_question_view`, `apply_question_complete`, `apply_validation_error`, `apply_review_view`, `apply_submit_attempt`, `apply_step_1_complete`, `apply_step_2_complete`, `apply_submit`, `apply_submit_success`, `apply_error`, `apply_success`
  - canonical lead conversion: `generate_lead` on the `/thank-you?source=apply` success state
- Keep `apply_submit` and `apply_submit_success` success-only. Use `apply_submit_attempt` for clicks that reach the network request, and `apply_error` for failed Formspree responses. This keeps GA funnels from counting failed posts as applications.
- Apply-funnel custom params should stay low-cardinality and non-PII: `form_name`, `form_location`, `step`, `step_id`, `question_count`, `service_count`, `budget`, `timeline`, `primary_goal`, `has_website`, `elapsed_seconds`, `field_name`, and `error_type`. Do not send user-entered names, emails, URLs, free-text notes, or per-event timestamps into GA.
- Do not add route-level inline Google Ads conversion `<Script>` snippets for form thank-you pages. Use `LeadSuccessTracker` so direct visits do not falsely count as conversions.
- Apply thank-you tracking should only emit `apply_success` / `generate_lead` when a pending application context is consumed. A direct or refreshed thank-you page view should remain a normal `page_view`.
- When building a new landing page with a Formspree form, call `trackFormSubmission(...)` only after the Formspree response succeeds, then navigate to a thank-you route that mounts `LeadSuccessTracker`.
- GA4 property follow-up after code changes:
  - Keep Enhanced Measurement enabled for useful automatic events, but turn off the Page views advanced setting for "Page changes based on browser history events" while Prism uses manual SPA pageviews. Leaving both on creates duplicate route-change `page_view` events.
  - Mark `generate_lead` as the primary key event for lead flows.
  - Optionally mark `book_call_click` as a secondary key event if booking intent should be reported separately from completed leads.
  - Register custom dimensions for whichever non-PII lead parameters you want in standard reports, such as `form_name`, `form_location`, `lead_type`, `step_id`, `budget`, `timeline`, `primary_goal`, `has_website`, `service_count`, `field_name`, `error_type`, and `destination_host`.
  - Do not register high-cardinality custom dimensions for URLs, timestamps, user IDs, raw form text, names, emails, phone numbers, or click IDs.
  - Keep GA4 enhanced measurement form interactions enabled so the automatic `form_start` / `form_submit` events continue to complement the custom funnel events.

## Mobile Hero Video Safety

- Decorative autoplaying background videos must not use raw `<video autoPlay ...>` markup directly on touch/coarse devices.
- Use the shared policy in `lib/hero-media-policy.ts` for a single source of truth:
  - `resolveHeroPlaybackPolicy(...)`
  - `HeroPlaybackMode` (`video-autoplay` / `video-fallback-poster` / `poster-only`)
  - optional route override (`playbackPolicy="forcePoster"`)
- Prefer `components/HeroBackgroundLoop.tsx` (for static hero posters + loop background) or `components/HeroLoopingVideo.tsx` (general looping hero card component). Both components now consume policy state and keep `<video>` unmounted unless autoplay is explicitly allowed.
- The current policy intentionally allows muted inline autoplay on mobile when motion preferences and network conditions are healthy. We only fall back to posters for reduced motion, constrained connections (`saveData`, `2g`, `slow-2g`), embedded in-app webviews (detected via `isEmbeddedWebViewUserAgent`; WKWebViews can disallow inline playback and hoist any playing video into the native fullscreen player), explicit `forcePoster`, or real autoplay failure.
- Server HTML and the first client render are always poster-only (`INITIAL_HERO_PLAYBACK_INTENT`): the autoplay `<video>` must never appear before hydration, because pre-hydration playback starts before the inline-presentation guards attach. Fast same-origin loops (e.g. the wall-of-love planet video) reliably win that race in hostile webviews. `app/globals.css` additionally suppresses WebKit's shadow-DOM media controls on `video[data-hero-loop='true']`, including the slashed play glyph iOS paints when autoplay is blocked in Low Power Mode.
- Both loop wrappers now retry playback when the page becomes visible again and pause when the hero scrolls out of view, which keeps Safari/WebKit and mobile battery behavior saner without losing the motion on phones.
- Both wrappers attach the inline-presentation guard (`lib/hero-inline-playback.ts`) as soon as the `<video>` mounts. The guard watches `webkitbeginfullscreen` / `webkitpresentationmodechanged` / `enterpictureinpicture` / `fullscreenchange`; if a video ever escapes inline presentation (e.g. in-app WKWebViews that ignore `playsinline` and hoist playing videos into the native fullscreen player), it pauses, forces the video back inline, and the wrapper unmounts the `<video>` in favor of the poster. Decorative loops must never show native player UI or go fullscreen.
- Keep a poster-first UX for reduced-motion, constrained-network, or media load failure states.
- If a page needs a forced fallback, pass `playbackPolicy="forcePoster"` and let the shared policy pick poster-only behavior.
- Add regression guardrails with:
  - `pnpm exec jest __tests__/hero-loop-gating.test.tsx __tests__/hero-media-policy.test.ts __tests__/hero-autoplay-safety.test.ts __tests__/hero-loop-inline-guard.test.tsx`
  - `pnpm test:visual:animations`
- If you introduce any new decorative autoplay video, update this section and run the above tests before merge.

## Mobile Hero ASCII Resilience

- ASCII animations use preview-first loading plus optional partial-frame batching in `components/ascii/AsciiAnimation.tsx`.
- `components/home/DeferredAsciiHeroBackdrop.tsx` now treats the homepage/about ASCII hero motion as progressive enhancement with adaptive profiles instead of a blanket mobile kill switch. It still waits for idle time, but it can now render on healthy phones/tablets with a lighter FPS + batching profile so the homepage loop actually appears on mobile.
- New props for fault-tolerant loading:
  - `loadStrategy?: "batch" | "all"` (default: `"batch"`)
  - `batchSize?: number` (default: `24`)
  - `maxConcurrentFetches?: number` (default: `6`)
  - `continueOnFrameError?: boolean` (default: `true`)
- The homepage hero now uses `forceAutoplay` for the visible-above-the-fold ASCII layer, while `AsciiAnimation` still pauses itself when the page is hidden or motion should stop.
- Keep the placeholder/preview frame visible while additional chunks stream in so mobile motion starts quickly even when the full set is large.
- Never fail the entire animation because of a single frame request; keep partial sequence playback when at least 2 frames are available.
- If zero frames load, render the deterministic fallback `"No frames loaded"`.
- `AsciiHeroBackdrop` defaults to `bundledFrames`, which fetches a single pre-built `frames.json` per animation folder instead of hundreds of per-frame files (the homepage wave hero used to issue 301 requests). Regenerate bundles with `pnpm ascii:bundle` after adding or editing frames; the loader falls back to per-frame fetching when a bundle is missing.
- `/animations/*` and `/ascii/*` are served with `Cache-Control: immutable` (see `next.config.mjs`). Changed assets must ship under a new filename — never overwrite an existing file in those folders.
- Cloudinary media must carry delivery transforms in the URL: `q_auto,vc_auto` (plus a `w_…` cap for oversized sources) on videos, `f_auto,q_auto,w_…` on images that bypass `next/image` (raw posters, CSS backgrounds, `<video poster>`). `buildCloudinaryVideoPoster` strips video transforms when deriving poster frames.

## Pricing Page Content

- Pricing UI is in `app/pricing/client-page.tsx` with the shared dark-system hero in `components/pricing/PricingHero.tsx`.
- Keep canonical pricing copy aligned with `lib/pricing-model.ts`, which models the **four productized offers**: Website (`$300` flat one-time, optional `$100/month` care), Content OS (`$5,000` to implement + `$1,000/month`), Dental OS (custom-priced), and Prism Infinity (`$2,000/month`). `/pricing` compares all four; `/get-started` keeps the free Growth Dashboard / free-audit on-ramp. The old five-tier ladder (`$500` Deep Growth Audit, `$3,500` Growth Sprint, `$1,500/month` Growth Partner) is retired. Always spell `/month` (never `/mo`), and run `pnpm verify:pricing-consistency` (`lib/pricing-consistency.ts`) on any pricing copy change.
- Structured data here should emit the four-offer schema and point to `https://www.design-prism.com/pricing`.
- Pricing, about, homepage, and `/get-started` now share the core-route typography and CTA system from `components/core-route/CoreRoutePrimitives.tsx`. Reuse those primitives before hand-rolling new route-level actions or section headers.
- The primary pricing CTA orders the `$300` website (`PRICING_PRIMARY_CTA` → `/websites`); higher-ticket offers lead with "Book a call". Payments use Stripe Payment Links via `lib/payment-links.ts`.

## Free Analysis & Contact Pages

- `/free-analysis` and `/contact` are intentionally minimal form routes.
- `/contact` should not include demo-booking or calendar CTAs; keep it to the contact form, expectations, and direct email.
- Copy updates happen directly in `app/free-analysis/page.tsx` and `app/contact/page.tsx`.
- Both pages reuse the shared forms mentioned above, so field changes only need to happen once.

## CTA Routing

Any CTA labeled “free audit” or “free growth audit” should point to `/get-started`. Keep `/free-analysis` links only for surfaces that explicitly need that legacy analysis form.

Any CTA that points to `/get-started` should describe the Growth Audit / Growth Dashboard path, not a demo, booking, strategy call, or practice-only audit. Use `FREE_AUDIT_CTA_TEXT` for general route-level CTAs when possible; compact shared chrome can keep the documented `Free audit` label.

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

The navbar dynamically sets a CSS variable (`--prism-header-height`) so other sticky UI can position itself below the full header stack (including case study breadcrumbs). If a route mounts `CaseStudySectionNav`, it also sets `--prism-case-study-nav-height` via `useCaseStudyStickyNavHeight` (see `hooks/use-case-study-sticky-nav.ts`), and jump targets rely on `scroll-margin-top` for correct offsets when scrolling into view. Current live case study detail pages are simplified and do not render chapter menus, but the offset plumbing stays available for any future long-form routes.

## Navbar And Footer

- `components/navbar.tsx` and `components/footer.tsx` are the canonical site chrome for both the homepage and inner routes. Prefer changing them once instead of introducing route-specific variants unless product direction explicitly splits the chrome again.
- The current chrome language is minimal black surfaces, white/off-white type, and restrained tactile hover/focus states. Subtle transforms/glow are okay on the logo mark when they respect reduced motion and do not change layout width; keep nav text hover states stable and readable.
- Primary nav labels live in `lib/constants.ts` (`NAV_ITEMS`). When you add or remove an item, verify the shared desktop nav, mobile sheet, locked route snapshots, and a representative case study detail page.
- The footer has one primary funnel CTA: `Free audit` via `TrackedLink` to `/get-started`. Do not add a footer calendar or "Book call" path unless the funnel strategy changes.

## Deployment

Merges to `main` publish through the GitHub `Deploy to Vercel` workflow. Vercel Git auto-deploy is disabled for `main` in `vercel.json` so production has a single source of truth. If you need a preview, use `vercel deploy --yes` or open a PR and use the Vercel preview deployment URL. Preview links should be public for review; verify with `curl -I -L <preview-url>` and confirm a direct `HTTP 200` response instead of Vercel SSO.
