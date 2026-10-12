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
- For `/waitlist` changes, run `pnpm exec jest __tests__/components/WaitlistForm.test.tsx __tests__/website-cta-map.test.ts __tests__/pricing-model.test.ts`.
- For pricing-sensitive changes, run:
  - `pnpm verify:pricing-consistency`
- For changes touching shared infrastructure, update and run the nearest smoke tests in the relevant package (`pnpm test`, `pnpm test:visual:locked`, etc.) before merging.
- Run `pnpm test:visual:locked` before merging changes that touch the UI of `/`, `/about`, `/pricing`, or `/waitlist` (screenshot-locked routes).
- `pnpm test:visual:locked` builds and boots an isolated `next start` server on port `3300`. The CI job is a blocking deploy gate (with CI-only retries); run it whenever locked routes are affected.
- For cross-browser route-load smoke checks, run `pnpm build`, start `pnpm start -p 3301` in a second terminal, then run `pnpm test:performance:smoke`. The smoke script covers `/`, `/about`, `/pricing`, and `/waitlist` on Chromium, Firefox, and WebKit using both desktop and mobile profiles.
- Run `pnpm test:visual` when you need broader visual coverage beyond the locked routes.
- Run `pnpm test:visual:animations` when you change homepage motion. `__tests__/visual/animation-loops.spec.ts` verifies that the hero refraction scene animates and the `#clients` logo rail and `#more-work` wall marquees move on Chromium, Firefox, and WebKit across desktop plus mobile emulation (the old ASCII loop checks were removed with the ASCII system).
- Run `pnpm exec playwright test __tests__/visual/blog-copy-markdown.spec.ts --project=desktop-chromium` when changing the blog markdown copy button or `/api/blog/[slug]/markdown`.
- For blog-post content/frontmatter additions, run `pnpm exec jest __tests__/sitemap.test.ts __tests__/blog-canonical.test.ts --runInBand` as a fast regression check.

### Homepage refresh checklist

- The homepage (2026-10-12 Prism Spectrum redesign) is composed in `app/client-page.tsx`; see `docs/pages-overview.md#homepage-appclient-pagetsx` for the section order. Copy lives in `components/home/homepage-content.ts` and follows the prism-writing skill (`prism-brand` pack); never type a number into that file, resolve it from `lib/proof-metrics.ts` or `getCaseStudyMetric`.
- The first viewport is one composition: the transparent fixed navbar, `HomeHero` (status pill, the tagline h1 "impossible is temporary." in `text-hero`, one subhead, waitlist + "See the work" CTAs, compact proof row, client logo rail) and the `components/home/HomeRefraction.tsx` scene (light enters a prism and leaves as labeled bands; `RefractionPointer` turns it toward a fine pointer). Keep the base style the finished frame so reduced-motion runs and screenshots see complete content.
- Real client work is the hero below the fold: `HomeStories` (`#work`) is the sticky deck of five featured client stories with tall browsing captures from `public/case-studies/scroll/`, then `HomeWorkWall` (`#more-work`) is a tilted marquee of the other current-client desktop screenshots from `HOMEPAGE_CLIENT_WINS`. Former clients never appear in either (guarded by `__tests__/former-clients-highlight.test.ts`). New or refreshed home screenshots come from `node scripts/capture-case-study-screenshots.mjs --force <slug>`; when a featured site changes, retake its tall `scroll/` captures (1280px-wide desktop and 600px-wide mobile WebP, top of page down to a clean section boundary) and update `components/home/stories/capture-sizes.ts`.
- `components/runtime-client-shell.tsx` mounts route-surface setup, `AnalyticsProvider`, and Vercel Analytics immediately, then loads `components/runtime-deferred-features.tsx` during browser idle time for monitors, error/scroll tracking, and toaster wiring.
- If you change the homepage h1, waitlist copy, the logo-rail caption, or the numbers, services, or how-to-get-in sections, update `__tests__/visual/locked-routes.spec.ts` (copy guards and section snapshots) and re-run `pnpm test:visual:locked`.
- AI tool logos remain vendored from SVGL into `public/logos/ai-tools/` for any deeper page that needs them; they are not an active homepage requirement.

### Retired website assistant

The homepage guide, floating launcher, and all website assistant runtime/configuration were removed on 2026-10-09. The earlier custom sales-chat stack remains retired.

## Styling Pipeline

- Tailwind v4 runs through the `@tailwindcss/postcss` plugin, with `@import "tailwindcss";` and `@config "../tailwind.config.cjs";` in `app/globals.css`.
- To safelist utilities, use `@source inline(...)` in `app/globals.css` (the `safelist` config option is no longer supported).

## Linting

- ESLint uses the flat config in `eslint.config.js` (Next 16 removed `next lint`).

## Formspree Integration

Live forms live under `components/forms/`: `WaitlistForm` (the only sales form), `ReferralForm`, plus the scholarship, models, and design-vote forms in their routes. The Contact, Free Analysis, Get Started / `/apply`, Website/Content/Ads Intake, AEO, book-a-shoot, and `/ai` forms were deleted on 2026-09-14 (routes 308 to `/waitlist`). The archival AI Website Launch form was deleted in the 2026-10 cleanup.

Key details:

- Forms post to Formspree via `fetch` with `Accept: application/json`. On success the waitlist pushes to `/waitlist/thank-you`; other forms show inline success.
- Use the `_subject` hidden field for inbox filtering and `_gotcha` as the honeypot.
- When adding a new Formspree endpoint, import `useFormValidation({ onValidSubmit })` and only navigate after the request returns `response.ok`.
- Field contracts live in [`docs/forms.md`](forms.md).

## Thank-You Screens

The live confirmation route is `app/waitlist/thank-you/`. `app/thank-you/` remains as a legacy landing target (with its `?source=apply` state) and must stay minimal and truthful. `app/analysis-thank-you/` is deleted.

## SEO Hygiene

- Route-level metadata should use `buildRouteMetadata` from `lib/seo/metadata.ts` so titles, descriptions, canonical URLs, Open Graph, Twitter, and robots directives stay consistent.
- Titles use one `| Prism` suffix unless the title already starts with the brand, such as `Prism Infinity`; descriptions are normalized with shared rules in `lib/seo/rules.ts`.
- Metadata should stay clean, descriptive, and minimal. The shared internal budgets trim page titles to 48 characters and meta descriptions to 155 characters across route, blog, and library pages; these are editorial guardrails, not limits published by Google.
- Authored descriptions that already fit the compact budget are preserved. Longer copy keeps a complete opening sentence when possible; otherwise the helper creates a short title-led overview instead of publishing a clipped fragment.
- Shared normalization preserves common search terms and product nouns (`SEO`, `AI`, `Google Maps`, `ChatGPT`, `TikTok`, etc.) and keeps useful brand descriptors like `Case Study`, `Podcast`, and `Careers` instead of stripping them out.
- Default metadata workflow for static routes:
  - Set a clear `titleStem` + `description` on the page and let `buildRouteMetadata` generate the final title, canonical, OG, Twitter, and robots fields.
  - Write for one clear search intent, then remove filler and repeated keywords. Prefer `Local SEO services` over a stacked list of near-duplicate terms.
  - If `seo/inventory.csv` shows a clipped or vague result, improve the route’s source copy first; do **not** immediately tighten or loosen the global limits.
- Default metadata workflow for blog and library routes:
  - Let the generator fall back to `title` / `description` by default.
  - Keep Library title tags to the post title; speaker names belong in the visible page content and should not crowd the compact metadata budget.
  - Add `seoTitle` / `seoDescription` only when the rendered inventory shows a weak snippet, duplicate title, or low-intent phrasing.
  - Keep blog overrides aligned with the visible article promise; do not write clickbait search titles that diverge from the actual post.
- Use `seo/inventory.csv` as the source of truth for final rendered snippets. Review `final_title` and `meta_description`, not just the source `titleStem` or frontmatter strings.
- `app/sitemap.ts` should emit only canonical, indexable URLs plus verifiable `lastModified` values. Google ignores sitemap `priority` and `changefreq`, so don't spend time tuning or adding them.
- `app/robots.ts` should stay minimal: use it to manage crawl access (for example, keep `/api/blog/` crawlable while blocking the rest of `/api/`), and rely on page-level `noindex` for URLs that should stay out of Search.
- `public/llms.txt` is not a Google ranking input, but it should still mirror canonical search surfaces. Keep it limited to canonical, indexable Prism URLs and avoid noindex routes, redirects, or off-site detours unless there is a deliberate reason.
- Use absolute canonicals (`https://www.design-prism.com/...`) for every indexable route.
- Noindex routes should remain crawlable (meta `robots`), but **must be excluded** from the sitemap via `app/sitemap.ts`.
- Keep the indexable set intentionally narrow and growth-first. `lib/seo/search-visibility.ts` is the source of truth for search visibility; new routes should default to noindex unless they support the growth system story: websites, SEO/AI search, reviews, ads, tracking, content, proof, pricing, the waitlist, or a deliberate specialty cluster.
- Broad Prism surfaces such as apps, software, Replit/OpenAI guides, podcast/library pages, careers, scholarships, unrelated industry pages, and social/community utilities should stay usable for direct visitors but out of the sitemap and public LLM map unless product direction explicitly changes.
- Blog posts are curated for search with `INDEXABLE_BLOG_SLUGS` and optional `searchVisibility` frontmatter. New posts are not indexable by default; add them to the curated growth/local/dental allowlist only when they strengthen Prism's authority.
- `/blog` filter/search views (`/blog?category=...`, `/blog?q=...`) are set to **noindex, follow** via `X-Robots-Tag` in `proxy.ts` so query-param URLs don’t pollute the index.
- If a blog post `image` frontmatter uses an absolute Prism URL (e.g. `https://www.design-prism.com/...`), we normalize it for Next/Image. Prefer relative paths like `/blog/...` for consistency.
- Blog cards and post hero images now validate frontmatter `image` values at read time. If the file is missing, uses an invalid sentinel (`null`/`undefined`/empty), or points to a raster extension whose asset is actually SVG markup, posts now fall back to the shared default featured image (`https://res.cloudinary.com/dhqpqfw6w/image/upload/v1770786137/Prism_rgeypo.png`) instead of rendering a broken image.
- Blog posts can define `seoTitle` and `seoDescription` in frontmatter for manual snippet control; if omitted, metadata falls back to `title`/`description` with shared normalization.
- Prefer the shared JSON-LD helpers in `components/schema-markup.tsx` (`WebPageSchema`, `CollectionPageSchema`, `ItemListSchema`, `ServiceSchema`, `FAQSchema`, etc.).
- Any JSON-LD script, including custom schemas, must pass data through `serializeJsonLd`. Do not inject raw `JSON.stringify(...)` output when values can come from content or external data.
- Every indexable page must render a visible `<h1>` that matches the primary search intent.
- Success criteria for SEO-safe routing:
  - Any route that permanently redirects or exists only for channel attribution / utility flow purposes must export `robots: { index: false, follow: false }`.
  - `WebsiteSchema` must not declare a `SearchAction` unless we have a real, crawlable on-site search endpoint.
  - Run `pnpm exec jest __tests__/sitemap.test.ts __tests__/seo-indexability-guards.test.tsx --runInBand` plus `pnpm seo:inventory && pnpm seo:lint` after changing indexability rules.
- Run `pnpm seo:inventory && pnpm seo:lint` before shipping large metadata changes.

### AI visibility loop (GEO)

- `pnpm seo:ai-report [days]` (default 90) prints AI answer-engine referrals (ChatGPT, Perplexity, Claude, Gemini, Copilot) from the Prism GA4 property plus the Search Console clicks/impressions trend and top queries. It defaults to the verified Prism Website property `508295014` (Prism Alpha); set `GA4_PROPERTY_ID` to override the reporting property. It requires the locally authenticated `gog` CLI and is an operator tool, not CI. Retrieval errors stop the report instead of being reported as zero traffic.
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
- `/ig`, `/tiktok`, and `/youtube` rely on `components/social-link-hub.tsx` for shared CTA/outbound-link tracking. Keep the header profile link on `trackExternalLinkClick`, and keep exactly three internal action cards on `trackCTAClick`: Website, Content, and Ads, each linking `WAITLIST_FOCUS_HREFS[service]` (`/waitlist?focus=…`). Each click must send `platform`, `service`, and `destination` plus location `{platform} landing actions`. Preserve the `{platform} landing header|actions` locations so inbound social traffic keeps a full click trail. Referral and Prism Infinity are intentionally absent from these focused link-in-bio routes. See `docs/pages-overview.md` for the hub's copy and typography rules (sans mixed-case body; mono-caps only for the wordmark and footer).
- Lead conversion tracking is centralized in `utils/analytics.ts`: `trackFormSubmission(...)` stores a pending lead by default, and `components/thank-you/LeadSuccessTracker.tsx` consumes it once on the relevant thank-you route before emitting GA4 `generate_lead` plus the Google Ads lead conversion. The waitlist uses the default pending mode (consumed on `/waitlist/thank-you`). Use `conversionMode: "immediate"` for confirmed success states that stay on-page. Never fire `generate_lead` on page load, form render, or `form_start`. (The retired `/contact` page-view leak runbook is in `docs/analytics.md`.)
- Google Ads conversion sends should remain limited to true sales/business leads. Secondary lead-like forms such as scholarship applications, model applications, and newsletter/community signups can emit GA4 `generate_lead`, but must pass `sendGoogleAdsConversion: false`.
- `book_call_click` measures booking intent on calendar/demo/kickoff links and should not replace `generate_lead`. Treat it as a supporting event unless Prism explicitly marks it as a secondary key event in GA4.
- GA4 enhanced measurement form reporting depends on the real DOM `<form id="...">` / `name="..."` attributes, not just hidden `form_name` inputs. Every marketing form should expose both so GA can populate `form_id` and `form_name` consistently in automatic `form_start` / `form_submit` events.
- The waitlist funnel's event model (`waitlist_*` events, `generate_lead` on `/waitlist/thank-you`) is documented in `docs/forms.md#waitlist` and `docs/analytics.md`. The retired `apply_*` events no longer fire.
- Do not add route-level inline Google Ads conversion `<Script>` snippets for form thank-you pages. Use `LeadSuccessTracker` so direct visits do not falsely count as conversions.
- Thank-you tracking should only emit `generate_lead` when a pending lead context is consumed. A direct or refreshed thank-you page view should remain a normal `page_view`.
- When building a new landing page with a Formspree form, call `trackFormSubmission(...)` only after the Formspree response succeeds, then navigate to a thank-you route that mounts `LeadSuccessTracker`.
- GA4 property follow-up after code changes:
  - Keep Enhanced Measurement enabled for useful automatic events, but turn off the Page views advanced setting for "Page changes based on browser history events" while Prism uses manual SPA pageviews. Leaving both on creates duplicate route-change `page_view` events.
  - Mark `generate_lead` as the primary key event for lead flows.
  - Optionally mark `book_call_click` as a secondary key event if booking intent should be reported separately from completed leads.
  - Register custom dimensions for whichever non-PII lead parameters you want in standard reports, such as `form_name`, `form_location`, `lead_type`, `step`, `step_name`, `field_name`, `reason`, and `destination_host`.
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
- Server HTML and the first client render are always poster-only (`INITIAL_HERO_PLAYBACK_INTENT`): the autoplay `<video>` must never appear before hydration, because pre-hydration playback starts before the inline-presentation guards attach. Fast loops (e.g. the models page hero loop) reliably win that race in hostile webviews. `app/globals.css` additionally suppresses WebKit's shadow-DOM media controls on `video[data-hero-loop='true']`, including the slashed play glyph iOS paints when autoplay is blocked in Low Power Mode.
- Both loop wrappers now retry playback when the page becomes visible again and pause when the hero scrolls out of view, which keeps Safari/WebKit and mobile battery behavior saner without losing the motion on phones.
- Both wrappers attach the inline-presentation guard (`lib/hero-inline-playback.ts`) as soon as the `<video>` mounts. The guard watches `webkitbeginfullscreen` / `webkitpresentationmodechanged` / `enterpictureinpicture` / `fullscreenchange`; if a video ever escapes inline presentation (e.g. in-app WKWebViews that ignore `playsinline` and hoist playing videos into the native fullscreen player), it pauses, forces the video back inline, and the wrapper unmounts the `<video>` in favor of the poster. Decorative loops must never show native player UI or go fullscreen.
- Keep a poster-first UX for reduced-motion, constrained-network, or media load failure states.
- If a page needs a forced fallback, pass `playbackPolicy="forcePoster"` and let the shared policy pick poster-only behavior.
- Add regression guardrails with:
  - `pnpm exec jest __tests__/hero-loop-gating.test.tsx __tests__/hero-media-policy.test.ts __tests__/hero-autoplay-safety.test.ts __tests__/hero-loop-inline-guard.test.tsx`
  - `pnpm test:visual:animations`
- If you introduce any new decorative autoplay video, update this section and run the above tests before merge.

## Hero Media Delivery

- The ASCII animation system (`components/ascii/*`, `DeferredAsciiHeroBackdrop`, `lib/ascii-*`, `public/animations`, `public/ascii`, and the `ascii:*` scripts) was retired in the 2026-10 redesign. Do not reintroduce it; heroes use real work, grids, glows, and the spectrum kit in `components/prism/`.
- Cloudinary media must carry delivery transforms in the URL: `q_auto,vc_auto` (plus a `w_…` cap for oversized sources) on videos, `f_auto,q_auto,w_…` on images that bypass `next/image` (raw posters, CSS backgrounds, `<video poster>`). `buildCloudinaryVideoPoster` strips video transforms when deriving poster frames.

## Pricing Page Content

- Pricing UI is in `app/pricing/client-page.tsx` with the shared dark-system hero in `components/pricing/PricingHero.tsx`.
- Keep canonical pricing copy aligned with `lib/pricing-model.ts`, which models the **four packaged offers on `/pricing`**: the PRO Website, Content OS, Dental OS, and Prism Infinity. No offer shows a public price; every primary CTA is a waitlist CTA (`PRICING_PRIMARY_CTA = WAITLIST_CTA`). The three public services (Website, Content, Ads) come from `lib/services.ts`; the header Services menu also links Dental OS and Prism Infinity (`NAV_SERVICE_ITEMS`). Never reintroduce public dollar amounts (`$300`, `$100/month`, `$5,000`, `$1,000/month`, `$2,000/month` are forbidden tokens). Always spell `/month` (never `/mo`), and run `pnpm verify:pricing-consistency` (`lib/pricing-consistency.ts`) on any pricing copy change.
- Structured data here should emit the four-offer schema and point to `https://www.design-prism.com/pricing`.
- Pricing, about, and the homepage share the marketing kit in `components/prism/` (`Section`, `SectionHeader`, `WaitlistButton`, `FinalCta`) and the shadcn primitives in `components/ui/`. Reuse those before hand-rolling new route-level actions or section headers.
- History: the 2026-07-27 call-first model (`BOOK_A_CALL_CTA`) and the earlier self-serve checkout (`lib/payment-links.ts`) are retired.

## CTA Routing

Every sales CTA points to `/waitlist` (or `/waitlist?focus=website|content|ads` via `WAITLIST_FOCUS_HREFS` when the context is one service). `FREE_AUDIT_CTA_TEXT` in `lib/constants.ts` now reads "Join the waitlist". Do not add links to the retired `/get-started`, `/free-analysis`, `/contact`, or intake routes; they only exist as redirects.

## Typography & Casing

- Headlines are written lowercase in the copy itself and end with a period (house style from the prism-writing skill, `prism-brand` pack); proper nouns keep their capitals. Body copy uses sentence case. Do not apply a global CSS lowercase or uppercase transform.
- Type comes from the Spectrum scale utilities in `app/globals.css` (`text-display`, `text-title`, `text-heading`, `text-lead`, `text-eyebrow`); Geist Sans for reading, Geist Mono for eyebrows and metadata. The Geist Pixel font and `font-pixel` are retired.

## UI Components (shadcn/ui)

The site uses stock shadcn/ui primitives under `components/ui/` (Tailwind + Radix + `cn()` helpers) with the `radix-vega` preset (`components.json`: neutral base, subtle menu accent, lucide icons), themed for the permanently dark canvas; `--font-sans` / `--font-mono` resolve to Geist. The old pixel styling (square corners, pixel font, forced uppercase, green glow) is retired. Marketing composition lives in `components/prism/*` (see `DESIGN.md`). Add new primitives via the CLI so we stay aligned with upstream.

- Add a component: `pnpm dlx shadcn@latest add <component>`
- Common additions: `alert`, `tooltip`, `dropdown-menu`, `popover`, `sheet`, `sonner`
- Toasts: a lazy `<Toaster />` is mounted from `app/layout.tsx` via `components/toaster-lazy.tsx`, so client components can call `toast.success(...)` via `import { toast } from "sonner"`.
- Form submit errors: prefer `<Alert variant="destructive">` for consistent styling, but keep native form controls intact.

Form note: our marketing forms rely on native HTML5 validation via `useFormValidation` (`form.checkValidity()` + real `<input>/<select>/<textarea>`). Avoid swapping native `<select>`/checkbox controls for Radix equivalents unless you also preserve native form semantics and validation.

## Sticky Navigation Offsets

The navbar dynamically sets a CSS variable (`--prism-header-height`) so other sticky UI can position itself below the full header stack (including case study breadcrumbs). The retired case-study chapter menu (`CaseStudySectionNav`, `--prism-case-study-nav-height`) was deleted in the 2026-10 cleanup.

## Navbar And Footer

- `components/navbar.tsx` and `components/footer.tsx` are the canonical site chrome for both the homepage and inner routes. Prefer changing them once instead of introducing route-specific variants unless product direction explicitly splits the chrome again.
- The chrome is the Prism Spectrum header and footer: near-black surfaces, hairline borders, `PrismLogo`, white pill CTAs with the live dot, and restrained hover/focus states that respect reduced motion.
- Header (64px; fixed and transparent at the top of `/`, solid after 8px of scroll; sticky + solid elsewhere): `NAV_ITEMS` in `lib/constants.ts` (Work `/case-studies`, Wall of Love, About, Pricing) and `NAV_SERVICE_ITEMS` (Websites, Content, Ads, Dental OS, Prism Infinity). Desktop renders a shadcn `NavigationMenu`: Work, a "Services" dropdown (five services with icons, "All services" → `/services`, a featured waitlist card), Wall of Love, About, Pricing. A white "Join the waitlist" pill with a live dot (`data-testid="navbar-cta"`) sits beside the menu; on `/waitlist*` it becomes a quiet "<Month> intake" status (`data-testid="navbar-status"`). Case study detail pages add a breadcrumb row (home / work / client). Verify the desktop menu at `lg` (1024px) with `__tests__/visual/products.spec.ts`, the mobile panel with `pnpm test:mobile-navbar`, the locked snapshots, and a representative case-study detail page.
- Mobile panel: portaled full-height panel below the measured header listing the four links, the five services, and a waitlist CTA card. Preserve stable `--prism-header-height`, scroll locking, prior inert state, first-link focus, Escape focus return, close at desktop width, and route-close.
- Footer: `PrismLogo`, the "impossible is temporary" line, a capacity line + `Join the waitlist` pill (`WAITLIST_CTA` via `TrackedLink`, `location="footer"`; hidden with `showWaitlistCta={false}` on `/waitlist` and `/waitlist/thank-you`), Services / Products / Proof / Company columns (Company carries `Refer a friend ($100)` → `/refer`), a legal row, socials, and an oversized "prism" wordmark. Do not add a footer calendar or "Book call" path unless the funnel strategy changes.

## Deployment

Merges to `main` publish through the GitHub `Deploy to Vercel` workflow. Vercel Git auto-deploy is disabled for `main` in `vercel.json` so production has a single source of truth. The "Protect main history" ruleset blocks force-pushes and deletion of `main`. If you need a preview, use `vercel deploy --yes` or open a PR and use the Vercel preview deployment URL. Preview links should be public for review; verify with `curl -I -L <preview-url>` and confirm a direct `HTTP 200` response instead of Vercel SSO.
