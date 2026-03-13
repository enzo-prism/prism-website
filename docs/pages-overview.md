# Key Marketing Pages

Quick reference for the pages we edit most often.

## Case Studies (`app/case-studies/*`)

- Individual case study pages live under `app/case-studies/<slug>/` and render server components with client-only subcomponents for the interactive sections.
- Sticky section navigation is `components/case-studies/CaseStudySectionNav.tsx` (shadcn `ToggleGroup` + `Sheet` + `ScrollArea`); sections must use `data-section="<id>"` or `id="<id>"` so scrolling and active state work.
- Reusable “data note / in progress” callouts are `components/case-studies/CaseStudyCallout.tsx` (shadcn `Alert`).
- The “buy back time / grow customers” interactive graph is `components/case-studies/FounderImpactGraph.tsx` (shadcn `Tabs` + recharts; “with prism” vs “without prism” scenarios).
- The shared curve/data generator lives in `lib/case-study-impact-graph.ts` (bounded 0–100 index with exponential “customers compound” growth + “effort decays to zero”; tune via `curves.*K` if we ever switch to case-specific numbers).
- Minimal case studies use `components/case-study-minimal.tsx`, which automatically includes the graph and now surfaces a top-of-page "visit <client-site>" button whenever a `website` quick fact includes an external `href`.
- The `/case-studies` card grid reads optional `clientLogo` URLs from `lib/case-study-data.ts`; cards render logos when provided and fall back to text-only cards when absent.
- The `/case-studies` list hero uses a looping Cloudinary background in `app/case-studies/client-page.tsx` (`CASE_STUDIES_HERO_VIDEO` + `CASE_STUDIES_HERO_POSTER`) with a readability gradient and current video opacity `40%`.
- Mobile safety: the `/case-studies` hero keeps a poster fallback on touch devices and now uses `components/HeroBackgroundLoop.tsx` with `lib/hero-media-policy.ts` so autoplay `<video>` is never mounted when policy denies inline autoplay.
- Global mobile safety pattern for decorative hero loops: prefer `components/HeroBackgroundLoop.tsx` or `components/HeroLoopingVideo.tsx` and `resolveHeroPlaybackPolicy(...)` so all autoplay decisions remain centralized and debuggable via `onPlaybackStateChange`.
- In legacy direct markup, keep `hero-loop-video` as a safety class, add `data-hero-loop="true"`, and keep non-interactive video attributes (`playsInline`, `webkit-playsinline`, `disablePictureInPicture`, `disableRemotePlayback`).

## Pricing (`app/pricing/client-page.tsx`)

- `/pricing` is the single canonical pricing URL.
- Core pricing policy must stay fixed site-wide: `Website Overhaul = $1,000 one-time`, `Growth Partnership = $2,000/month`, `Free Expert Audit = $0`.
- Main UI sections live in `app/pricing/client-page.tsx`; the hero + fullscreen modal live in `components/pricing/PricingHero.tsx`.
- Structured data on this page should only emit the canonical pricing offers (no legacy tier ranges).

## Checkout (`app/checkout/*/page.tsx`)

- Legacy checkout routes (`/checkout/launch`, `/checkout/grow`, `/checkout/scale`) now permanently redirect to `/pricing`.
- Keep these legacy files as archival only; do not link to these routes from active pages.

## Legacy Pricing Routes (Redirected)

- These routes permanently redirect to `/pricing` and should not be linked from indexable pages:
  - `/pricing-dental`
  - `/ai-website-launch`
  - `/one-time-fee`
  - `/offers` and `/offers/:path*`
  - `/growth`
  - `/checkout/launch`, `/checkout/grow`, `/checkout/scale`
- These legacy routes also export `noindex, nofollow` metadata and are explicitly excluded from `app/sitemap.ts` so Google is not asked to index pages that production immediately redirects away from.
- If you touch these legacy route files, preserve redirect behavior, preserve noindex metadata, and avoid reintroducing discoverability links or machine-readable references (`llms.txt`, structured data, sitemap entries).

## Community + Utility Routes (Noindex)

- The following pages are intentionally crawlable but non-indexable because they serve channel attribution, social proof, or utility-flow purposes rather than broad search intent:
  - `/ig`
  - `/youtube`
  - `/tiktok`
  - `/hottest-content`
  - `/ai`
  - `/models`
- These routes should keep `robots: { index: false, follow: false }` and stay excluded from `app/sitemap.ts`.
- Do not use these as canonical acquisition pages for SEO campaigns. Point search-facing users toward durable commercial surfaces like `/services`, `/websites`, `/ads`, `/local-listings`, `/pricing`, `/ai-seo-services`, and `/seo`.

## Websites (`app/websites/page.tsx`)

- Includes hero, founder VSL, benefits, showcases, vertical playbooks, FAQs, SEO copy, and service schema.
- The VSL near the hero is the canonical marketing video for active pricing-intent funnels.

## Apps (`app/apps/page.tsx`)

- Mobile app portfolio + process overview.
- Uses `ItemList` JSON-LD for the showcased projects; avoid `SoftwareApplication` rich-result schema unless we can supply accurate pricing + reviews/ratings.
- Route metadata now comes from `buildRouteMetadata` (`lib/seo/metadata.ts`) and always normalizes to a single `| Prism` suffix.
- For static pages, set `titleStem` + `description` in the page metadata call and let the helper generate canonical/Open Graph/Twitter/robots fields consistently.
- Prefer search-intent titles over internal page labels. Future metadata work should optimize for what a searcher wants (`website design`, `local SEO`, `Google Maps`, `case studies`, etc.), then confirm the final rendered output in `seo/inventory.csv`.

## Software (`app/software/page.tsx`)

- Growth tools hub listing Prism-built software (currently Density, Hot Content, and Engineering Tracker).
- App card data is shared via `lib/software-apps.ts`; update this list to keep the homepage section and `/software` in sync.
- The homepage + `/software` cards are rendered by `components/software/SoftwareAppCards.tsx`, including the framed icon treatment sized for small pixel icons.
- The hero now uses `components/ascii/AsciiHeroCard.tsx` with the high-quality `wave` ASCII frames in `public/animations/wave/high`.
- ASCII playback uses the shared resilience defaults in `components/ascii/ASCIIAnimation.tsx` (`loadStrategy="batch"`, `batchSize=24`, `maxConcurrentFetches=6`) to avoid full-sequence failure lockups.

## Blog (`app/blog/page.tsx`)

- Blog index layout includes breadcrumbs, the animated hero card, filters, post grid, signup, and the final CTA section.
- The hero now uses `components/ascii/AsciiHeroCard.tsx` with the high-quality `hands` ASCII frames in `public/animations/hands/high`.
- For performance reliability, keep the default batch strategy in place and confirm partial-frame fallback behavior in tests when changing sequence size or source reliability assumptions.

## Podcast (`app/podcast/page.tsx`)

- Podcast hub + recent episode preview cards.
- Uses `PodcastSeriesSchema` plus `PodcastEpisodeSchema` (with nested `VideoObject` metadata). Keep episode publish dates, YouTube URLs, and thumbnails up to date so Video structured data stays valid.
- Individual episode spotlights (for example `app/podcast/michael-njo/page.tsx`) should keep CTA buttons mobile-safe by allowing full-width wrapping on small screens so no horizontal scrolling is introduced in quote/CTA cards.

## Dental Website (`app/dental-website/page.tsx`)

- Dentist-focused website page targeting “dentist website design”.
- Includes `ServiceSchema` plus FAQ structured data (via `FAQSchema`) and cross-links into the dental SEO and ads funnels.
- Aliases in `next.config.mjs` (redirect to `/dental-website`): `/dentist-website-design`, `/dental-website-design`, `/dental-clinic-website-design`.

## Free Analysis (`app/free-analysis/page.tsx`)

- Minimal layout: hero card + deliverables card + `FreeAnalysisForm`.
- Update copy here when the offer changes.

## Get Started (`app/get-started/page.tsx`)

- The hero, VSL, FAQ, and booking sections live directly in `app/get-started/page.tsx`; there is no separate route-specific hero-scene mount in the live page right now.
- `/get-started` is a booking-led server-rendered page; the live assistant surface is the stock ElevenLabs floating widget mounted globally via `components/global-elevenlabs-widget.tsx`.
- The page no longer mounts the custom `SalesChat` client or depends on any legacy route-level assistant gating.
- Booking remains the primary conversion path and is anchored at `#book-call`; keep the hero CTA, FAQ CTA, and footer CTA wired there.
- The old custom sales-chat backend and supporting UI files have been removed from the supported stack. If Prism ever needs a bespoke assistant again, treat that as a fresh implementation rather than an existing route to toggle back on.

## Contact (`app/contact/page.tsx`)

- Simple hero, form card, kickoff-call button, and contact info.
- Uses `ContactForm` for all validation/submission logic.

## Structured data (global)

- `app/layout.tsx` injects `GlobalSchemaGraph` from `components/schema-markup.tsx` (Organization, WebSite, LocalBusiness).
- `components/breadcrumbs.tsx` emits `BreadcrumbList` JSON-LD with canonical URLs.

## Homepage (`app/client-page.tsx`)

- `app/client-page.tsx` now keeps the first viewport intentionally minimal: a solid white full-height stage, the `Prism` wordmark, `impossible is temporary.`, a subtle `founded 2023 in san francisco` line, and the inline ElevenLabs `HomeHeroAgent` widget (`components/home/HomeHeroAgent.tsx`).
- Treat the homepage hero as a product surface, not a busy marketing collage. Avoid reintroducing extra hero CTAs, proof strips, tooltip logos, or decorative widgets into the first viewport unless there is a clear conversion reason.
- `HERO_SECTION_CLASSES` in `app/client-page.tsx` accounts for sticky-header height and safe-area insets. On mobile the hero top-aligns and uses only the padding the widget actually needs, so the first section grows naturally instead of burning vertical space on decorative empty area.
- `HomeHeroAgent` renders the stock expanded ElevenLabs widget, keeps the official widget chrome intact, disables collapsing with the documented `dismissible="false"` attribute, and relies on wrapper sizing plus host-level section scoping instead of homepage-only Shadow DOM overrides.
- The homepage widget should scroll away with the hero. If it starts hovering above later sections again, debug the host positioning first rather than the widget’s shadow internals.
- All non-homepage pages mount the stock floating ElevenLabs launcher via `components/global-elevenlabs-widget.tsx`, initialized from `components/runtime-client-shell.tsx`.
- The global floating widget should always win the layer stack in its visible region. If site chrome starts painting over it, debug the host z-index in `components/global-elevenlabs-widget.tsx` / `components/elevenlabs/ElevenLabsWidget.tsx` before changing page-level layout.
- On mobile, the homepage navbar starts hidden and fades/slides in after the first tap; this is enabled via `mobileRevealOnFirstTap` on `components/navbar.tsx`.
- The section immediately below the hero is the ecosystem explainer rendered by `components/home/PrismEcosystemAnimation.tsx`. Keep this as the first supporting section so the page transitions from conversation entry point into Prism's broader growth-system story.
- Ecosystem section layout is responsive: animation first with supporting copy stacked below on mobile, and a two-column split on desktop (`lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)]`) with text on the right.
- Ecosystem logos are rendered from source SVG assets in `public/home-ecosystem/` (`prism.svg`, `apple.svg`, `gpt.svg`, `google.svg`, `facebook.svg`, `instagram.svg`, `linkedin.svg`) for fidelity consistency with design exports.
- The Apps developed by Prism section (tools cards + outbound links) lives below the ecosystem section and above the training section.
- The impact graph section below the apps area is `components/home/ImpactGraphSection.tsx`, which lazy-mounts `FounderImpactGraph` so Recharts only loads when near the viewport.
- The Wall of Love slider uses `components/home/WallOfLoveCarousel.tsx` and a native scroll-snap rail (no Embla); adjust the quote pool via `pinned` / `heroSpotlight` in `content/wall-of-love-data.tsx`.
- Runtime helpers (`AnalyticsProvider`, `GlobalElevenLabsWidget`, Sentry/monitoring clients, toaster) are initialized in `components/runtime-client-shell.tsx`, mounted from `app/layout.tsx`.

## Wall Of Love (`app/wall-of-love/client-page.tsx`)

- Hero now mirrors the `/case-studies` cinematic style (single rounded container, looping background media, centered foreground copy + CTA).
- Hero media uses `public/ascii/motion/wall-of-love/planet-lite.mp4` with reduced-motion/error fallback poster `public/ascii/static/wall-of-love/planet.png`; current crop/visibility tuning is `object-[center_80%]` with `opacity-100`.
- Route-level policy now passes autoplay decisions to `components/HeroBackgroundLoop.tsx` via policy input instead of branching on route logic.
- Keep CTA tracking on the primary button (`trackCTAClick("wall_of_love_become_client_cta", "/get-started")`) and keep the testimonials feed anchored at `#testimonials-feed`.
- Social proof copy in the hero is intentionally hard-coded as: `Instagram: 39,000+`, `TikTok: 6,000+`, `YouTube: 24,000+`.

## Prism Library (`app/library/page.tsx`)

- Library layout (hero, featured post, and grid) lives in `components/library/LibraryClient.tsx`; the list page intentionally avoids embeds and extra UI chrome.
- Data comes from `lib/library/getLibraryPosts.ts` and merges the `content/library/seed.ts` fallback with `content/library/editorial.ts` curation metadata.
- Detail pages live at `app/library/[slug]/page.tsx` and are intentionally simple: text plus a single Instagram/TikTok embed.
- To curate a post, add an entry in `content/library/editorial.ts` keyed as `${platform}:${id}` with a speaker name and at least one takeaway (that's what marks a post as curated).
- `tags`, `group`, and optional `featuredWeight` still live in the editorial metadata for curation, even though tags are not surfaced in the current UI.
- When API tokens are missing, the Library falls back to `content/library/seed.ts`.

## Thank-you routes

- `app/thank-you/page.tsx`
- `app/analysis-thank-you/page.tsx`

Each uses card-based layouts: confirmation message + kickoff-call CTA + contact details. When adding new forms, reuse one of these routes for consistency.

- These routes are noindex/no-follow and should remain crawlable (don’t block them in `robots.txt`) so search engines can read the meta noindex directive.

## AI Website Launch (`app/ai-website-launch/client-page.tsx`)

- This legacy route now permanently redirects to `/pricing`.
- Keep legacy code only for historical reference; do not route active marketing traffic here.
- If we ever relaunch this as an active offer page, update the canonical pricing policy first and document the rollout.

## Dental Photography surfaces

- `app/dental-photography/page.tsx` – hub hero, overview cards, and CTA stack. Buttons should always point to `/dental-photography/office-team`, `/dental-photography/before-after`, and `/book-a-shoot`.
- `app/dental-photography/office-team/page.tsx` – bookable service page. The recent-shoots slider now lives in `app/dental-photography/office-team/recent-shoots-section.tsx`, which handles the mobile progress bar and optional “visit website” CTA (set via the `website` field on each item). Keep the proof CTA pointing to `/dental-photography/before-after` and the primary buttons to `/book-a-shoot`.
- `app/dental-photography/before-after/page.tsx` – DIY capture guide. Preserve the “jump to the protocol” anchor and the CTA block that links back to `/dental-photography/office-team` so visitors can graduate into the full service.

## Why Dental Practices Love Prism (`app/why-dental-practices-love-prism/page.tsx`)

- Long-form trust page covering The Prism Method, case studies, and embedded interview videos. CTA buttons point to `/get-started` and `/contact`.
- Includes two dedicated dental-photography sections: the dark “On-site storytelling” block (linking to `/dental-photography/office-team` + `/book-a-shoot`, using the `dentalPhotographyHighlights` array) and the light “Before & after mastery” block (linking to `/dental-photography/before-after` + `/dental-photography/office-team`, using `beforeAfterGuideHighlights`). Update the respective highlight arrays when editing those bullets so layout components stay in sync.
- Keep both sections intact so this page keeps funneling visitors toward the photography hub and DIY guide without duplicating copy in multiple files.

## SEO for Dentists (`app/dental-practice-seo-expert/page.tsx`)

- Dentist-focused landing page targeting “dentist seo”, “seo for dentists”, and “dental seo services” queries, linking into the broader `/seo` and dental funnels.
- Aliases in `next.config.mjs` (redirect to `/dental-practice-seo-expert`): `/seo-consultant-for-dentists`, `/seo-for-dentists`, `/dentist-seo`, `/dental-seo`, `/dental-local-seo`, `/dentist-local-seo`, `/local-seo-for-dentists`.
- Includes a dental-focused `ServiceSchema` plus FAQ structured data (via `FAQSection`) to help search engines understand the offer.
- Supporting dentist SEO guides live in `content/blog/` (e.g., `/blog/dental-seo-guide`, `/blog/dental-practice-rank-higher-google-search`, `/blog/ai-search-for-dental-practice`).

## SEO Overview (`app/seo/page.tsx`)

- Core SEO overview page (hero, founder VSL, scoring framework, on/off-page previews, packages, and audit CTA).
- Search Console, keyword tracking, competitor analysis, and toxic backlink audit visuals use the expandable image pattern in `components/seo/seo-expandable-image.tsx` so visitors can zoom into charts.

## SEO Audit Service (`app/seo/audit/page.tsx`)

- SEO audit service landing page targeting “seo audit service” intent.
- Uses `SeoHero` + `SeoSection` blocks with `ServiceSchema`, `HowToSchema`, and FAQ structured data.
- Cross-links into `/seo` and `/free-analysis` to separate the full audit from the free snapshot.

## Local Listings (`app/local-listings/page.tsx`)

- Hero, benefits grid, platform cards, and the founder VSL render before the audience + FAQ sections.
- The video mirrors the copy on `/websites` but points at the local-listings Cloudinary asset—update the `VideoPlayer` block in this file when you need a new transcript or duration.

## Local SEO Services (`app/local-seo-services/page.tsx`)

- Primary landing page targeting “local seo services” and related local SEO service intent.
- Cross-links into `/seo` (methodology) and `/local-listings` (listings subsystem) so internal linking reinforces the topical cluster without duplicating content.
- Includes structured data (`ServiceSchema`, `HowToSchema`, and `FAQSection`) and should be kept human-first (avoid doorway patterns or keyword stuffing).

## Local SEO Agency (`app/local-seo-agency/page.tsx`)

- Primary landing page targeting “local seo agency” (agency intent: selection, proof, process, and reporting).
- Links to `/local-seo-services` for the deliverables breakdown, and to `/seo` + `/local-listings` for supporting context.
- Includes structured data (`ServiceSchema`, `HowToSchema`, and `FAQSection`) and a “what we won’t do” section to keep messaging aligned with Google spam policies.

## Ads (`app/ads/page.tsx`)

- Same layout pattern as Local Listings: hero, benefits, platforms, audience grid, then the ads-focused founder VSL.
- `VideoPlayer` is imported directly in `app/ads/page.tsx`; keep schema metadata up to date (id, upload date, duration) when swapping clips so Google’s video rich results stay accurate.

## Facebook Ads for Dentists (`app/facebook-ads-for-dentists/page.tsx`)

- Dentist-focused paid social landing page targeting “facebook ads for dentists”.
- Includes `ServiceSchema` plus on-page FAQ structured data (via `FAQSection`) and cross-links into `/ads`, `/google/dental-ads`, and `/tiktok-ads-for-dentists`.
- Aliases in `next.config.mjs` (redirect to `/facebook-ads-for-dentists`): `/meta-ads-for-dentists`, `/instagram-ads-for-dentists`.

## TikTok Ads for Dentists (`app/tiktok-ads-for-dentists/page.tsx`)

- Dentist-focused paid social landing page targeting “tiktok ads for dentists”.
- Includes `ServiceSchema` plus on-page FAQ structured data (via `FAQSection`) and cross-links into `/ads` and `/google/dental-ads`.

## Designs (`app/designs/DesignsPageClient.tsx`)

- The hero, quote slider, CTA blocks, and the founder VSL all live inside the client component.
- The video section appears directly after the hero copy so it inherits the same styling as the `/websites` embed.
- Client-specific review hubs live alongside the main page. Example: `/designs/wine-country-root-canal` contains a hero recap, deliverables grid, timeline, checklist, and CTA so Dr. Anderson’s team can review assets async.

## About (`app/about/client-page.tsx`)

- Hero now mirrors the `/case-studies` and `/wall-of-love` treatment using `components/ascii/AsciiHeroCard.tsx` with high-quality `fire-2` frames in `public/animations/fire-2/high`.
- Keep the founder headshot, timeline CTA (`ScrollToTimelineButton`), and external profile CTA in the hero; they are intentionally part of the hero content layer.
- The Olympic journey and timeline sections remain below the hero and should keep their existing CTA flow.

## Supporting Components

- `components/ascii/AsciiHeroCard.tsx`: shared cinematic hero wrapper used by `/about`, `/software`, and `/blog`; mobile readability now intentionally matches `/wall-of-love` via lower small-screen animation opacity plus layered gradient/radial overlays.
- `components/ascii/AsciiAnimation.tsx`: high-quality ASCII frame player (quality fallback, batched resilience loading with partial-failure tolerance, reduced-motion pause, intersection-aware playback).
- `components/ascii/AsciiHeroBackdrop.tsx`: shared background-media layer used by `AsciiHeroCard` to keep hero composition and ASCII defaults consistent.
- `lib/hero-media-policy.ts`: single policy engine used by `HeroBackgroundLoop` and `HeroLoopingVideo` for autoplay, poster fallback, and reduced-motion decisions.
- `components/reveal-on-scroll.tsx`: lightweight framer-motion wrapper used across marketing sections.
- `components/forms/*`: shared form components noted in [forms.md](./forms.md).
- `components/video-player.tsx`: shared CTA/VSL embed with structured-data support. Pass poster + schema props so every marketing video emits valid `VideoObject` JSON-LD.

Keeping these files tidy makes copy refreshes and landing-page experiments fast.

## AEO Assessment Landing Page (`/aeo`)

- Added page route `/aeo` with dedicated lead capture and an outlined AEO framework (`content`, `technical`, `authority`, `measurement`) plus FAQs.
- Form route wiring uses `components/forms/AeoAssessmentForm.tsx` (`email` + `website`, Formspree POST, dedicated `_redirect` target `/aeo-thank-you`).
- Thank-you route is `/aeo-thank-you` and is excluded from sitemap indexing via `app/sitemap.ts` (`NOINDEX_ROUTES`).
- Discoverability touchpoints added:
  - inline link from `/ai-seo-services`
  - inline link from `/seo`
- SEO/schema notes:
  - `buildRouteMetadata` is used for canonical and OG metadata.
  - `ServiceSchema` + `HowToSchema` + `FAQSchema` are present on `/aeo` for structured visibility.
- Maintenance contract (Codex):
  - Files to touch when changing the funnel:
    - `app/aeo/page.tsx` (hero + framework + evidence + FAQ + schema)
    - `components/forms/AeoAssessmentForm.tsx` (form fields, hidden metadata, endpoint, tracking)
    - `app/aeo-thank-you/page.tsx` (conversion messaging + optional Ads conversion snippet)
    - `components/forms/AeoAssessmentForm.tsx` + `app/sitemap.ts` when URL/thank-you behavior changes
  - Keep canonical output stable for `/aeo` (`buildRouteMetadata`) and keep `/aeo-thank-you` noindex.
  - Keep the thank-you route out of the sitemap via `NOINDEX_ROUTES`.
  - Preserve discoverability links (`/ai-seo-services`, `/seo`) so this funnel remains in the AEO/SEO path.
