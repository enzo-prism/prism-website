# Key Marketing Pages

Quick reference for the pages we edit most often.

## Growth-First Search Visibility

- `lib/seo/search-visibility.ts` is the source of truth for which routes and blog posts are indexable.
- Prism's public search/LLM footprint should read as business growth systems: websites, SEO/AI search, reviews, ads, tracking, content, proof, pricing, and the Growth Dashboard to Light Audit funnel.
- Broad pages can stay live for direct users, but they should remain noindex and out of `app/sitemap.ts` / `public/llms.txt` unless they become part of the growth-system story or a deliberate specialty cluster.
- All case study detail pages remain indexable because they are unique proof. Dental case studies should stay prominent, but non-dental case studies should also support the broader growth story.

## Case Studies (`app/case-studies/*`)

- Individual case study pages live under `app/case-studies/<slug>/`. Most render through the shared minimal template in `components/case-study-minimal.tsx`; selected high-priority proof pages can ship a custom long-form route when the story materially supports the growth-system search surface.
- `app/case-studies/roseville-dental-academy/page.tsx` is a custom dental-education proof page for the GoDaddy-to-Vercel admissions-system rebuild, covering analytics, Search Console, Hotjar, Formspree, ElevenLabs AI, Meta attribution, Figma, and the Codex-assisted implementation loop. It is the visual reference point for the shared minimal template.
- The shared minimal template composes, in order: a Roseville-style visual hero (`components/case-studies/CaseStudyVisualHero.tsx`, which renders a desktop browser frame plus an overlapping mobile frame), a snapshot stats row (`CaseStudySnapshotStats.tsx`), an optional measured-results band (`CaseStudyResultsBand.tsx`, driven by `structured.results`), an optional explainer video section, an outcomes grid (`CaseStudyOutcomesGrid.tsx`, driven by `structured.outcomes`), `CaseStudyWorkHighlights`, and a final audit CTA.
- Case-study CTAs that route into `/get-started` should use growth-first language from `FREE_AUDIT_CTA_TEXT` or equivalent `Growth Audit` wording. Do not narrow the main funnel to `Practice Audit`, even on dental proof pages.
- `structured.results` metrics are dated and source-attributed (usually the client's Google Search Console) and must stay verifiable — they also feed the case-study schema description and the measured-results band on the `/case-studies` hub. Only publish numbers checked against the named source, and bump `dateModified` when they change.
- Hero screenshots resolve from the slug convention `public/case-studies/<slug>-home-desktop.jpg` and `<slug>-home-mobile.jpg`. The template uses `fs.existsSync` at render time; if either file is missing the page falls back gracefully to a text-only hero so partial coverage never breaks the route.
- Regenerate or refresh screenshots with `node scripts/capture-case-study-screenshots.mjs [slug ...]`. The script is Playwright-based, idempotent (skips existing files), and captures desktop (1440×900) plus mobile (390×844) JPEGs from each `websiteUrl` in `lib/case-study-data.ts`. Pass slugs as args to re-capture a subset; omit them to capture every non-Roseville case study.
- Selected live case studies can render a dedicated explainer-video section before the outcomes grid when `explainerVideo` metadata is present in `lib/case-study-data.ts`; the section UI lives in `components/case-studies/CaseStudyExplainerVideo.tsx`.
- External client site URLs live alongside the case study metadata in `lib/case-study-data.ts`. Keep them accurate — the screenshot script and the live "Open live site" CTA both read directly from that field, so a stale or misspelled domain blocks screenshot capture and breaks the user-visible link.
- `components/case-studies/CaseStudySectionNav.tsx`, `components/case-studies/CaseStudyCallout.tsx`, and `components/case-studies/FounderImpactGraph.tsx` are retained as longer-form building blocks, but they are not mounted on the current live case study detail pages.
- The legacy per-slug `app/case-studies/<slug>/client-page.tsx` files are no longer imported by their `page.tsx` siblings; every non-Roseville detail route renders through the shared minimal template. Treat the client-page files as archival until they are removed in a dedicated cleanup pass.
- The shared curve/data generator remains in `lib/case-study-impact-graph.ts` for any future return of the interactive founder-impact graph.
- The `/case-studies` card grid reads optional `clientLogo` URLs from `lib/case-study-data.ts`; cards render logos when provided and fall back to text-only cards when absent.
- The `/case-studies` list hero uses a looping Cloudinary background in `app/case-studies/client-page.tsx` (`CASE_STUDIES_HERO_VIDEO` + `CASE_STUDIES_HERO_POSTER`) with a readability gradient and current video opacity `40%`.
- Mobile safety: the `/case-studies` hero keeps a poster fallback on touch devices and now uses `components/HeroBackgroundLoop.tsx` with `lib/hero-media-policy.ts` so autoplay `<video>` is never mounted when policy denies inline autoplay.
- Global mobile safety pattern for decorative hero loops: prefer `components/HeroBackgroundLoop.tsx` or `components/HeroLoopingVideo.tsx` and `resolveHeroPlaybackPolicy(...)` so all autoplay decisions remain centralized and debuggable via `onPlaybackStateChange`.
- In legacy direct markup, keep `hero-loop-video` as a safety class, add `data-hero-loop="true"`, and keep non-interactive video attributes (`playsInline`, `webkit-playsinline`, `disablePictureInPicture`, `disableRemotePlayback`).

## Pricing (`app/pricing/client-page.tsx`)

- `/pricing` is the single canonical pricing URL and now compares Prism's **four productized offers**, all sourced from `CANONICAL_PRICING_OFFERS` / `PRICING_OFFER_ORDER` in `lib/pricing-model.ts`:
  - **Website** — `$300` flat, one-time, optional `$100/month` care (`/websites`).
  - **Content OS** — `$5,000` to implement over 3 months, then `$1,000/month` (`/content-os`).
  - **Dental OS** — custom-priced, "book a call" (`/dental-os`).
  - **Prism Infinity** — `$2,000/month`, unlimited services (`/prism-infinity`).
- Main UI sections live in `app/pricing/client-page.tsx`; the hero lives in `components/pricing/PricingHero.tsx` ("A clearer way to invest in growth.").
- `/pricing` uses the shared dark core-route system from `components/core-route/CoreRoutePrimitives.tsx`, so section headings and CTAs stay aligned with the homepage, `/about`, and `/get-started`.
- Section order is intentional: hero, "Four offers. Buy once, or run an ongoing system." snapshot, per-offer cards, the website order steps (the `growthPathSteps` array, repurposed to "Describe your website" steps), ongoing-system levels (the `partnerLevels` array, repurposed to Content OS / Prism Infinity), FAQ (covering the `$300` website, care plan, Content OS, Prism Infinity, and Dental OS), and final CTA. The `growthPathSteps`/`pricingSnapshot`/`partnerLevels` variable names were retained (and are still required by `lib/pricing-consistency.ts`) even though their content is now the four-offer model.
- The primary CTA orders the `$300` website (`PRICING_PRIMARY_CTA`, "Order your website — $300" → `/websites`); higher-ticket offers lead with "Book a call".
- The retired five-tier ladder (free Growth Dashboard pricing, `$500` Deep Growth Audit, `$3,500` Growth Sprint, `$1,500/month` Growth Partner) is no longer shown here; `/get-started` keeps the free Growth Dashboard / free-audit on-ramp.

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
- `/ig` and `/tiktok` are intentionally ultra-minimal social thank-you pages with no global floating assistant. Their shared page (`components/social-thanks-page.tsx`) is a single dark, vertically centered column: a "Thanks for supporting us on {platform}" headline plus exactly four action cards — Prism guides for founders on YouTube, the Marble iOS app on the App Store, the `/wall-of-love` proof page, and a become-a-client handoff into `/get-started`. Keep copy on these pages minimal; do not reintroduce ranked credit lists, product screenshot showcases, or extra sections.
- These social routes should keep explicit CTA tracking on the action cards and the header profile link so inbound social traffic is measurable in GA4/Vercel without adding extra UI chrome.

## Websites (`app/websites/page.tsx`)

- Active offer page for the **Website** product: a custom website for `$300` flat, one-time (not "starting at $300" — it is a flat price). Delivered in ~7 days, infinite iterations until the buyer loves it, and the finished site is 100% theirs. Afterward they can add a `$100/month` care plan or self-host.
- The flow is **describe → submit → success → pay**: the buyer describes the website they want (as much context as they like), submits (captured via Formspree at `NEXT_PUBLIC_WEBSITE_BUILD_FORM_ENDPOINT` / `https://formspree.io/f/xpqebnbz`), sees an in-page success screen, then pays the `$300` Stripe Payment Link (opens in a new tab) to kick off the build. `components/forms/WebsiteOrderForm.tsx` powers this; the pay button resolves through `lib/payment-links.ts` (`hasPaymentLink("website")` / `paymentLink("website")`, live link `buy.stripe.com/8x2dRa3Aid1gasMeQDdZ60N`, with a `/contact` fallback).
- The old model is retired: this is **not** review-first / selective / "no card collected", and there is no dynamic price estimator. `WebsiteBuildEstimatorForm.tsx` (the old estimator) is being removed.
- Keep the page indexable, in `public/llms.txt`, and in the sitemap as Prism's canonical website-order acquisition page.

## Content OS (`app/content-os/page.tsx`)

- The **Content OS** offer: `$5,000` to implement (over 3 months) + `$1,000/month`. AI agents that scale a client's content and ads across every social platform and their website, then optimize every month.
- This route **replaced the retired Founder OS** offer (see the redirect note below). It is indexable, in `public/llms.txt`, and in the sitemap, and carries `ServiceSchema` plus FAQ structured data.
- The headline price is intentional to this offer and is part of the canonical four-offer model in `lib/pricing-model.ts`; keep `/month` spelled out (never `/mo`).

## Dental OS (`app/dental-os/page.tsx`)

- The **Dental OS** offer: the full Prism growth system (website, SEO and AI search, Google Maps, reviews, and ads) packaged for dental practices, **custom-priced** ("book a call").
- Indexable, in `public/llms.txt`, in the sitemap, and carries `ServiceSchema` plus FAQ structured data. Pricing is scoped per practice rather than a fixed number; the offer's primary CTA leads to `/contact?topic=dental-os`.

## Prism Infinity (`app/prism-infinity/page.tsx`)

- The **Prism Infinity** offer: `$2,000/month` for unlimited Prism services across engineering, design, and marketing (logo/print design, web development, video editing, content, ads, slide decks, in-person photoshoots, and more) on one subscription, pausable/cancelable anytime.
- Indexable, in `public/llms.txt`, in the sitemap, and carries `ServiceSchema` plus FAQ structured data. The `$2,000/month` token is intentional here and is allowed by `lib/pricing-consistency.ts`.

## Founder OS (retired → redirects to `/content-os`)

- Founder OS is **retired**. `/founder-os` and `/founder-os/apply` now 301-redirect to `/content-os` (see `next.config.mjs`), and the route is no longer in `lib/seo/search-visibility.ts` / `public/llms.txt`.
- The `app/founder-os/*` page files and `components/forms/FounderOsApplicationForm.tsx` remain only as archival code behind the redirect; do not link to them from active pages or treat Founder OS as a live offer.

## Apps (`app/apps/page.tsx`)

- Mobile app portfolio + process overview.
- Direct-visitor/reference surface only after the growth-first search cleanup. It is noindex and excluded from sitemap/LLM maps unless product direction changes.
- Uses `ItemList` JSON-LD for the showcased projects; avoid `SoftwareApplication` rich-result schema unless we can supply accurate pricing + reviews/ratings.
- Route metadata now comes from `buildRouteMetadata` (`lib/seo/metadata.ts`) and always normalizes to a single `| Prism` suffix.
- For static pages, set `titleStem` + `description` in the page metadata call and let the helper generate canonical/Open Graph/Twitter/robots fields consistently.
- Prefer search-intent titles over internal page labels. Future metadata work should optimize for what a searcher wants (`website design`, `local SEO`, `Google Maps`, `case studies`, etc.), then confirm the final rendered output in `seo/inventory.csv`.

## Software (`app/software/page.tsx`)

- Growth tools hub listing Prism-built software (currently Density, Hot Content, and Engineering Tracker).
- Direct-visitor/reference surface only after the growth-first search cleanup. Keep it live for people who know the URL, but do not link to it as a canonical search target.
- App card data is shared via `lib/software-apps.ts`; update this list to keep the homepage section and `/software` in sync.
- The homepage + `/software` cards are rendered by `components/software/SoftwareAppCards.tsx`, including the framed icon treatment sized for small pixel icons.
- The hero now uses `components/ascii/AsciiHeroCard.tsx` with the high-quality `wave` ASCII frames in `public/animations/wave/high`.
- ASCII playback uses the shared resilience defaults in `components/ascii/ASCIIAnimation.tsx` (`loadStrategy="batch"`, `batchSize=24`, `maxConcurrentFetches=6`) to avoid full-sequence failure lockups.

## Blog (`app/blog/page.tsx`)

- Blog index layout includes breadcrumbs, the animated hero card, filters, post grid, signup, and the final CTA section.
- `getAllPosts()` returns the curated/indexable post set by default, so the visible blog index, RSS, latest-post API, related posts, and sitemap stay dental/local-growth focused.
- Off-theme posts remain live by direct URL with `noindex, follow`; do not assume every file in `content/blog` should appear on the public blog index.
- The hero now uses `components/ascii/AsciiHeroCard.tsx` with the high-quality `hands` ASCII frames in `public/animations/hands/high`.
- For performance reliability, keep the default batch strategy in place and confirm partial-frame fallback behavior in tests when changing sequence size or source reliability assumptions.

## Podcast (`app/podcast/page.tsx`)

- Podcast hub + recent episode preview cards.
- Direct-visitor/reference surface only after the growth-first search cleanup. It is noindex and excluded from sitemap/LLM maps.
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

- `/get-started` is the free Growth Audit entry page for growth-focused businesses, built from `components/get-started/GrowthProcessSection.tsx` plus the in-page handoff panel that points into `/apply`.
- After the repositioning to the four productized offers, `/get-started` is **intentionally kept as the free on-ramp** (free Growth Dashboard + request a free deep audit from the team). It stays surfaced in the nav ("get started"), the footer ("Get started free"), and a callout under the homepage offers section, even though the rest of the pricing ladder it used to anchor is retired.
- The hero is conversion-first: headline, one-line value statement, trust chips (free / ≈1 minute / reviewed by a real person), and the primary "Start my free growth audit" CTA must all land in the first viewport on mobile. The three-step Lordicon row (`Share your business`, `We audit it`, `Get your next move`) sits compact below the CTA — do not let it push the CTA back below the fold.
- User-facing copy on this funnel leads with the free Growth Audit; the Growth Dashboard is positioned as where the audit is delivered. CTA tracking labels intentionally keep the legacy `create free growth dashboard` value for GA continuity.
- It remains the one intentional accent surface within the core route family: same dark shell, shared CTA grammar, and shared section-heading logic, but with terminal framing and neon status accents.
- `/get-started` intentionally does not mount the stock ElevenLabs floating widget; the Growth Dashboard handoff should stay focused and route into `/apply`.
- The page no longer mounts the custom `SalesChat` client or depends on any legacy route-level assistant gating.
- The CTA handoff remains anchored at `#book-call` for compatibility with existing CTA destinations elsewhere in the site, even though the live copy now frames that section as Growth Dashboard handoff rather than a scheduled call.
- Keep the page copy explicit that every real business submission receives a review, while the later Deep Growth Audit or sprint path is selective and not guaranteed.
- The old custom sales-chat backend and supporting UI files have been removed from the supported stack. If Prism ever needs a bespoke assistant again, treat that as a fresh implementation rather than an existing route to toggle back on.

## Apply (`app/apply/page.tsx`)

- `/apply` is the focused question-by-question Growth Dashboard intake and is the real form surface for the Growth Dashboard to Light Audit funnel.
- The page intentionally removes the full navbar, footer, marketing sidebar, and floating ElevenLabs widget so the user sees one decision at a time after they start.
- `components/forms/GetStartedForm.tsx` renders the compressed intake: focus, link, optional fit context (with an explicit "Skip for now" action), business, contact, and review/submit. The step footer is sticky at the viewport bottom on mobile so Back/Skip/Continue stay reachable on long steps.
- `GetStartedForm` posts to Formspree with the growth-application payload (`service_focus`, `service_interest[]`, `focus_labels`, `has_website`, `review_link`, `primary_goal`, `budget`, `timeline`, `company`, `full_name`, `email`, `additional_context`, `_subject`, `_redirect`, `form_name`, `_gotcha`) and redirects to `/thank-you?source=apply` on success.
- The form supports edit actions on review rows, same-tab draft restore via `sessionStorage`, and keyboard-first progression. Enter advances validated non-review steps, arrow shortcuts move forward/back when they do not override text editing or native radio behavior, and desktop focus is restored to the next step's primary control.
- Keep the field names, Formspree endpoint behavior, analytics event names, and redirect behavior unchanged even though the visible copy now says Growth Dashboard, Growth Audit, or review.
- The flow intentionally does not embed a calendar. Review is guaranteed after a real business submission; the strategy session is selective.

## Contact (`app/contact/page.tsx`)

- Simple hero, form card, `What to Expect` panel, and direct contact info.
- Do not add demo-booking or calendar CTAs here; the footer and primary free-audit path should route to `/get-started`.
- Uses `ContactForm` for all validation/submission logic.

## Shared Chrome (`components/navbar.tsx`, `components/footer.tsx`)

- Header nav labels live in `NAV_ITEMS` in `lib/constants.ts`; the current public nav is repositioned around the offers: `order` (`/websites`), `content os`, `dental os`, `prism infinity`, `pricing`, `get started`, and `contact`, plus a persistent "Order now" CTA. The nav was overhauled to be fully responsive, using an `xl` breakpoint with a full-height mobile panel. The footer System column links `Website — $300` and `Content OS` (the old `Founder OS` link became Content OS).
- The top-left logo links to `/`, tracks `trackNavigation('logo', '/')`, and has a small hover/focus treatment on the logo mark and wordmark. Keep it tactile but stable: no text reflow, no new route-specific header variants, and respect reduced-motion utilities for transforms.
- The footer was overhauled to a responsive column grid with monochrome icon socials, and leads with two CTAs: `Order a website` (`/websites`, `label="Order a website"`) and `Get started free` (`/get-started`, `label="Get started free"`), both through `TrackedLink` with `location="footer"`.
- Do not reintroduce a footer "Book call" button or contact-page demo calendar without changing the funnel docs first.

## AI Agents for Dentists (`app/ai-agents/dental/page.tsx`)

- Indexable dental-cluster page for AI phone/lead qualification support.
- Keep it linked as part of the dental specialty cluster and included in `public/llms.txt`.
- The parent `/ai-agents` route is broad and noindex; do not let it compete with the dental child page unless product direction changes.

## Structured data (global)

- `app/layout.tsx` injects `GlobalSchemaGraph` from `components/schema-markup.tsx` (Organization, WebSite, LocalBusiness).
- `components/breadcrumbs.tsx` emits `BreadcrumbList` JSON-LD with canonical URLs.

## Homepage (`app/client-page.tsx`)

- `app/client-page.tsx` is a section composer for the growth homepage. Current order: hero, mixed client Cover Flow deck (proof), buyer-checks problem section, bento system grid, first-90-days band with count-up stats, audience fit cards, short process, compact proof grid, final CTA, and then `HomeOffersSection` ("Four ways to grow with Prism.") as the **last** section.
- The homepage hero is built from `components/home/HomeHeroSection.tsx`; copy comes from `components/home/homepage-content.ts`. The H1 is "Prism" with the subhead "the #1 growth partner for small businesses". The proof block now leads with **attention + traffic, not revenue**: 18,563 new users/month to client sites, 71,000 followers, and 17M+ views across YouTube/Instagram/TikTok (each linking to the profile in a new tab), plus a "100% grown by Prism AI Agents, powered by Content OS" attribution that links to `/content-os`. The old "Get found. Get trusted. Get chosen." / revenue framing is retired.
- The "Four ways to grow with Prism" offers section (`components/home/HomeOffersSection.tsx`) renders the four offers and ends with a free on-ramp callout: "Not ready to buy? Start free..." → `/get-started` ("Get started free").
- Homepage motion runs through small client islands: `components/home/HomeReveal.tsx` (scroll reveal that never hides content for no-JS or reduced-motion visitors), `components/home/HomeCountUp.tsx` (stat count-up in the 90-day band), and `components/home/HomeSystemGrid.tsx` (pointer-tracked spotlight bento cards).
- The homepage is growth-first and dental-proven. Default language should speak to founders, owners, operators, qualified demand, Google/AI visibility, reviews, conversion paths, tracking, and measurable growth opportunities.
- The primary hero CTA is "Order now" (no price) and points to `/websites`; the secondary CTA is "Explore plans" and hash-scrolls to `#offers`.
- Keep homepage copy extremely short: use labels, one-line headings, and compact cards. Move longer explanations to deeper pages.
- The client proof surface under the hero is the `HOMEPAGE_CLIENT_WINS` deck, rendered by `components/home/HomeClientCoverFlow.tsx` (mounted via the legacy-named `HomeDentistWinsSection.tsx` wrapper that keeps the "Great companies use Prism" heading + `N client stories · M markets · Verified case studies` line, auto-computed from the slides where relevant). It is a mixed-client set spanning retail, dental, education, community, consulting, nonprofit, hospitality, B2B services, and specialty healthcare proof.
- There is **one card per published case study** (currently 22) — the deck is kept in sync with the `/case-studies` index and `CASE_STUDIES` in `lib/case-study-data.ts`. When a case study is added/removed there, add/remove the matching slide in `HOMEPAGE_CLIENT_WINS` (slide order is hand-curated to interleave industries, not to mirror the data order). Each slide carries `company` (the brand/business name shown as the prominent card label — **never a person's name**), `location`, `contextLabel`, plus `href` + `image` derived from the slug.
- Cover Flow cards render **real client-website screenshots** — the portrait `public/case-studies/<slug>-home-mobile.jpg` capture referenced by each slide's `image` field. Because the card crops to its top ~62%, a capture must lead with the site's clean branded hero: dismiss cookie/consent banners, newsletter/promo popups, chat widgets (incl. the ElevenLabs `convai` embed), and top announcement bars before shooting, and for a sparse or text-first hero, scroll the branded section to the top. The previous abstract `AbstractClientWinVisual` / `data-client-win-abstract` / no-image contract (and `HomeDentistWinsCarousel`) were retired; the current contract is covered by `__tests__/components/HomeClientCoverFlow.test.tsx`.
- The deck is a restrained 3D Cover Flow / diagonal card fan: one shared camera, a one-time back-to-front entrance fan-open on scroll-in, hover lift + neighbour yield, damped pointer parallax, press feedback, and a single `cubic-bezier(0.22,1,0.36,1)` easing — **no autoplay** (the deck is still at rest, input-led). The active cover is a real `<Link>` to its case study; the caption below shows the active client's **company name** (not a person) with `contextLabel · location` and a dedicated case-study link.
- Touch is gated on input capability, not width: `isTouch = useMobile('(hover: none), (pointer: coarse)')` disables parallax/tilt/hover-lift, swaps to one static low-radius shadow, mounts fewer covers (a tighter fan, `maxVisible` 2 vs 3), drops the on-card CTA pill (it duplicates the caption link and wraps in a narrow card), and uses a direct 1:1 drag where a casual swipe = exactly one card and a genuine flick advances more. `touch-action: pan-y pinch-zoom` keeps page scroll + zoom; `setPointerCapture` makes the drag drop-proof; `pointercancel` aborts without committing.
- Accessibility: `role=group` + `aria-roledescription=carousel`, a polite live region announcing the active client, per-slide `aria-roledescription=slide` with only the active slide exposed to AT (neighbours are decorative pointer-reorder affordances), a labelled dot **button group** (not a dishonest tablist) with 44px-tall hit areas, 44px prev/next arrows as the WCAG-equivalent precise control, roving tabindex (only the active cover is focusable), and a flat scroll-snap fallback under `prefers-reduced-motion`.
- Case studies should appear as compact proof cards with the client name and a tiny outcome label. Include dental proof prominently, but mix in retail, consulting, education, hospitality, nonprofit, and founder-led proof where relevant.
- The homepage intentionally omits the long FAQ and managed-AI logo matrix so the primary offer stays easy to scan. Audience fit is covered by the compact three-card `HomeFitSection` (founders, local/specialty practices, owner-operators) plus a single honest not-a-fit line.
- The homepage, `/about`, `/pricing`, and `/get-started` now share the same minimal black navbar/footer plus the same core-route section heading and CTA language (`components/navbar.tsx`, `components/footer.tsx`, `components/core-route/CoreRoutePrimitives.tsx`) so the primary marketing routes read as one brand system.
- The shared floating ElevenLabs launcher now mounts only on non-mobile `/pricing` and `/contact` via `components/global-elevenlabs-widget.tsx` in `components/runtime-client-shell.tsx`; the homepage, mobile viewports, `/get-started`, the active `/apply` form, `/ig`, `/tiktok`, blog posts, and other public routes intentionally stay widget-free.
- Without a saved user preference, the public widget should stay collapsed by default on eligible pages.
- The global floating widget should always win the layer stack in its visible region when it is mounted. If site chrome starts painting over it, debug the host z-index in `components/global-elevenlabs-widget.tsx` / `components/elevenlabs/ElevenLabsWidget.tsx` before changing page-level layout.
- The compact first-90-days band sits after the system grid as the "what to expect" beat. Keep it to short metrics (with `HomeCountUp` stats) that support the narrative without expanding into a second explanatory ecosystem section.
- Runtime helpers (`AnalyticsProvider`, `GlobalElevenLabsWidget`, Sentry/monitoring clients, toaster) are initialized in `components/runtime-client-shell.tsx`, mounted from `app/layout.tsx`.

## Wall Of Love (`app/wall-of-love/client-page.tsx`)

- Hero now mirrors the `/case-studies` cinematic style (single rounded container, looping background media, centered foreground copy + CTA).
- Hero media uses `public/ascii/motion/wall-of-love/planet-lite.mp4` with reduced-motion/error fallback poster `public/ascii/static/wall-of-love/planet.png`; current crop/visibility tuning is `object-[center_80%]` with `opacity-100`.
- Route-level policy now passes autoplay decisions to `components/HeroBackgroundLoop.tsx` via policy input instead of branching on route logic.
- Keep CTA tracking on the primary button (`trackCTAClick("wall_of_love_become_client_cta", "/get-started")`) and keep the testimonials feed anchored at `#testimonials-feed`.
- Social proof copy in the hero is intentionally hard-coded as: `Instagram: 39,000+`, `TikTok: 6,000+`, `YouTube: 24,000+`.

## Prism Library (`app/library/page.tsx`)

- Library layout (hero, featured post, and grid) lives in `components/library/LibraryClient.tsx`; the list page intentionally avoids embeds and extra UI chrome.
- Direct-visitor/reference surface only after the growth-first search cleanup. Library list/detail routes are noindex and excluded from sitemap/LLM maps.
- Data comes from `lib/library/getLibraryPosts.ts` and merges the `content/library/seed.ts` fallback with `content/library/editorial.ts` curation metadata.
- Detail pages live at `app/library/[slug]/page.tsx` and are intentionally simple: text plus a single Instagram/TikTok embed.
- To curate a post, add an entry in `content/library/editorial.ts` keyed as `${platform}:${id}` with a speaker name and at least one takeaway (that's what marks a post as curated).
- `tags`, `group`, and optional `featuredWeight` still live in the editorial metadata for curation, even though tags are not surfaced in the current UI.
- When API tokens are missing, the Library falls back to `content/library/seed.ts`.

## Thank-you routes

- `app/thank-you/page.tsx`
- `app/analysis-thank-you/page.tsx`

Each uses card-based layouts: confirmation message + CTA + follow-up details. The shared `/thank-you` route now supports an apply-specific state via `?source=apply`, so keep any future branching explicit and truthful to the originating form.

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

- Indexable local SEO service page. It supports the growth-system search cluster with concrete deliverables for Google Business Profile, listings, reviews, local pages, technical hygiene, and reporting tied to calls and leads.
- Cross-links into `/seo` (methodology) and `/local-listings` (listings subsystem) so internal linking reinforces the topical cluster without duplicating content.
- Includes structured data (`ServiceSchema`, `HowToSchema`, and `FAQSection`) and is included in `lib/seo/search-visibility.ts`, `app/sitemap.ts`, and `public/llms.txt`.
- Keep it human-first and avoid doorway patterns or keyword stuffing.

## Local SEO Agency (`app/local-seo-agency/page.tsx`)

- Indexable local SEO agency page. It positions Prism as the execution partner for small businesses that need local search strategy plus implementation.
- Links to `/local-seo-services` for the deliverables breakdown, and to `/seo` + `/local-listings` for supporting context.
- Includes structured data (`ServiceSchema`, `HowToSchema`, and `FAQSection`) and a “what we won’t do” section to keep messaging aligned with Google spam policies.
- Keep it included in `lib/seo/search-visibility.ts`, `app/sitemap.ts`, and `public/llms.txt` unless product direction changes.

## Ads (`app/ads/page.tsx`)

- Same layout pattern as Local Listings: hero, benefits, platforms, audience grid, then the ads-focused founder VSL.
- The hero uses the page-specific `components/animated/AdsHeroIllustration.tsx` instead of the shared `ServiceIllustration` set so the hover motion and geometry can stay tailored to `/ads` without affecting other routes that still use the generic ads icon.
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
- Thank-you route is `/aeo-thank-you` and is excluded from search via the shared policy in `lib/seo/search-visibility.ts`.
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
    - `app/aeo-thank-you/page.tsx` (conversion messaging + `LeadSuccessTracker`)
    - `components/forms/AeoAssessmentForm.tsx` + `app/sitemap.ts` when URL/thank-you behavior changes
  - Keep canonical output stable for `/aeo` (`buildRouteMetadata`) and keep `/aeo-thank-you` noindex.
  - Keep the thank-you route out of the sitemap via `lib/seo/search-visibility.ts`.
  - Preserve discoverability links (`/ai-seo-services`, `/seo`) so this funnel remains in the AEO/SEO path.
