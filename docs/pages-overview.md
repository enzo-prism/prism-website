# Key Marketing Pages

Quick reference for the pages we edit most often.

## Waitlist (`app/waitlist/page.tsx`) — the funnel while Prism is at capacity (2026-09-14)

- Prism is at capacity. Every public sales CTA (the header pill and Services menu card, the footer, the homepage hero, every `FinalCta`, `/pricing`, `/websites`, `/content`, `/ads`, `/dental-os`, `/prism-infinity`, `/dental-website`, blog CTAs, long-tail SEO/why-* pages via `FREE_AUDIT_CTA_TEXT`, and the `/ig` `/tiktok` `/youtube` hubs) says **Join the waitlist** and lands on `/waitlist`. Service surfaces use `/waitlist?focus=website|content|ads` to pre-check the focus boxes. Constants live in `lib/waitlist.ts` (`WAITLIST_CTA`, `WAITLIST_FOCUS_HREFS`, `CAPACITY_MESSAGE`); `lib/pricing-model.ts` re-exports `WEBSITE_WAITLIST_CTA`, `CONTENT_WAITLIST_CTA`, `ADS_WAITLIST_CTA`, and `PRICING_PRIMARY_CTA = WAITLIST_CTA`.
- The page is indexable (sitemap + `llms.txt`). It uses the shared navbar (which swaps its waitlist pill for a quiet "<Month> intake" status on `/waitlist*`) and `<Footer showWaitlistCta={false} />`. Layout (2026-10-12): a grid backdrop and glow, then two columns from `lg` up. Left: a static `WaitlistStatus` (`asLink={false}`), the H1 "join the waitlist", and the capacity line (`CAPACITY_MESSAGE` + `WaitlistIntakeMonth`), followed by "What happens next" (`components/waitlist/WaitlistNextSteps.tsx`) and `WaitlistProofStrip` ("See why clients love Prism": numbers from `lib/proof-metrics.ts`, a consented client quote, and client-site screenshots in a `Marquee`). Right: the form card (`data-waitlist-form-card`, sticky only on viewports at least 50rem tall) holding the five-step `WaitlistForm` (focus → timing → about → links → goals on shadcn inputs, "Step x of 5" progress, Back/Continue, single submit on the last step; `?focus=` pre-checks a service). The focus step also offers "Not sure yet" (`focus[]=not-sure`, exclusive with the services, never prefilled from the URL), and the links step has an "I don't have a website yet" box (`no_website=yes`) that satisfies the one-link rule; field contract in `docs/forms.md#waitlist`. `/waitlist/thank-you` is noindex, mounts `LeadSuccessTracker`, and shows a check badge, the H1 "you're on the list.", the intake strip (`WaitlistIntakeStrip`: this month fully booked, the next intake highlighted, two upcoming months, no counts), `WaitlistNextSteps layout="cards"`, a "stay close." bento (social channels from `SOCIAL_PROOF`, refer a friend $100 → `/refer`, see the work → `/case-studies`, wall of love → `/wall-of-love`), and one quiet "Back to home" link. Neither route renders `FinalCta`.
- Capacity copy: `CAPACITY_MESSAGE` (`lib/waitlist.ts`) renders through `FinalCta` (its default description), the footer capacity card, `/waitlist`, `/faq`, and the social hubs. Heroes use the `WaitlistStatus` pill (live dot, "Fully booked", "Waitlist open for <Month>"). The month is always the live `<WaitlistIntakeMonth />`. Never paste the capacity copy into a page, and never invent spot counts or deadlines.
- Booking a Zoom call is no longer a public action. `BOOK_A_CALL_CTA` and `WEBSITE_START_CTA` are gone; `BOOKING_URL` remains only for the invite-gated `/chatgpt-ads` partner unlock, the legacy `/thanks` page, and the legacy `/checkout/{launch,grow,scale}/thank-you` pages.
- Retired routes that 308-redirect to `/waitlist`: `/website-intake`, `/content-intake`, `/ads-intake` (keeping `?focus=`), `/get-started`, `/apply`, `/free-analysis`, `/contact`, `/contact-us`, `/hours`, `/hello`, `/aeo`, `/book-a-shoot`, `/ai`. Their page and form files are deleted. Internal links point straight at `/waitlist` (#198); the redirects catch old external links.
- `/refer`, `/scholarship`, `/models`, and the design-vote form are not sales CTAs and keep working.
- Locked visual spec (`__tests__/visual/locked-routes.spec.ts`): `/waitlist` must keep the context line, "See why clients love Prism", "Step 1 of 5", and the first step title. `/` must render the h1 "make your business impossible to ignore.", its subhead, the "Waitlist open for <month>" status, and the `FinalCta` capacity sentences ("Prism is fully booked right now." + "Join the waitlist to work with us in <month>."), which `/pricing` must also keep. Every locked route forbids retired prices, "Book a Free Demo", "Start my website", and "scoped on a 30-minute call".

## Growth-First Search Visibility

- `lib/seo/search-visibility.ts` is the source of truth for which routes and blog posts are indexable.
- The four `/why-*` verticals (consulting, local shops, nonprofits, community founders) plus `/why-dental-practices-love-prism` are indexable because `/ads` and `/local-listings` link them. Keep them in `public/llms.txt` and the sitemap.
- Prism's public search/LLM footprint should read as business growth systems: websites, SEO/AI search, reviews, ads, tracking, content, proof, pricing, and the waitlist.
- Broad pages can stay live for direct users, but they should remain noindex and out of `app/sitemap.ts` / `public/llms.txt` unless they become part of the growth-system story or a deliberate specialty cluster.
- All case study detail pages remain indexable because they are unique proof. Dental case studies should stay prominent, but non-dental case studies should also support the broader growth story.

## Case Studies (`app/case-studies/*`)

- Individual case study pages live under `app/case-studies/<slug>/page.tsx`. Every one except Roseville renders through the shared template in `components/case-study-minimal.tsx`; a high-priority proof page can ship a custom route when the story materially supports the growth-system search surface.
- `app/case-studies/roseville-dental-academy/page.tsx` is the custom dental-education proof page for the GoDaddy-to-Vercel admissions-system rebuild (analytics, Search Console, Hotjar, Formspree, ElevenLabs AI, Meta attribution, Figma, and the Codex-assisted implementation loop). It composes `CaseStudyVisualHero` and `CaseStudySnapshotStats`, three custom `Section`s (before/after shadcn `Card`s, a `SpotlightCard` grid of what Prism rebuilt, a live-surface `BrowserFrame`), then `CaseStudyWorkHighlights`, `CaseStudyMoreWork`, and `FinalCta`.
- `app/case-studies/waikiki-dental/page.tsx` (live site, Roseville CA) and `app/case-studies/sacramento-dental-medicine/page.tsx` (live site, Antelope CA) are minimal-template dental studies with prose-only outcomes: neither project has client-approved measured results yet, so neither ships `structured.results`. Do not backfill numbers without a named, dated source. Both entries sit at the top of `websiteProjects` in `lib/website-projects.ts` and in `CASE_STUDY_NAV_ITEMS` in `lib/case-study-nav-data.ts`; the nav-data sync test fails if either registry drifts.
- The shared template composes, in order: `CaseStudyVisualHero` (desktop `BrowserFrame` plus an overlapping `PhoneFrame`, `Eyebrow`, `WaitlistButton`, badges), `CaseStudySnapshotStats` (the first verified metric, then owner-friendly facts: services delivered in plain words, focus or lead, scope; no tool counts), optional `CaseStudyVoice` (a client interview opened in `VideoDialog` when its YouTube id is in the verified registry in `components/case-studies/case-study-proof.ts`, and a large named-client quote only where `content/wall-of-love-data.tsx` ties it to that business, currently Dr. Tingjen Ji for Grace Dental Santa Rosa), optional `CaseStudyStory` (`structured.story`), optional `CaseStudyExplainerVideo`, optional `CaseStudyOutcomesGrid` (`structured.outcomes`), `CaseStudyWorkHighlights` (`lib/case-study-work-highlights`), `CaseStudyMoreWork` (`WorkCard`s, current clients only), `FinalCta` (title "your business, next."), and `CaseStudySchema`. Honorifics and middle initials in the H1 stay attached to the next word (`whitespace-nowrap` spans) so names never strand "Dr.". The navbar adds a breadcrumb row (home / work / client) on these pages; `CaseStudySchema` emits the `BreadcrumbList`.
- Case-study CTAs route to `/waitlist` (`FREE_AUDIT_CTA_TEXT` now reads "Join the waitlist"). Do not narrow the main funnel to `Practice Audit`, even on dental proof pages.
- `structured.results` metrics are dated and source-attributed (usually the client's Google Search Console) and must stay verifiable. They feed the case-study schema description and `CaseStudySchema`, the snapshot stats (first metric, via `getVerifiedMetric` in `components/case-studies/work-index.ts`), and the wide `WorkCard`s on the hub. Only publish numbers checked against the named source, and bump `dateModified` when they change.
- Screenshots resolve from the slug convention `public/case-studies/<slug>-home-desktop.jpg` and `<slug>-home-mobile.jpg` through `getDesktopShot` / `getMobileShot` in `components/case-studies/work-index.ts`, which check that the file exists; if either is missing the page falls back gracefully so partial coverage never breaks the route.
- Regenerate or refresh screenshots with `node scripts/capture-case-study-screenshots.mjs [slug ...]`. The script is Playwright-based and captures desktop (1440×900) plus mobile (390×844) JPEGs from each `websiteUrl` in `lib/case-study-data.ts`. Existing files are skipped unless you pass `--force`. `--mobile-only` / `--desktop-only` limit the run, and `--out=<dir>` writes to a review folder instead of replacing the published files. Per-site `DESKTOP_RECIPES` can dismiss consent sheets and pause a hero video on a chosen frame (`videoTime`) so captures never land mid-animation. Mobile captures dismiss first-party consent sheets, hide chat widgets (including ElevenLabs), and apply per-site scroll so the branded hero leads the capture (mobile shots feed the case-study `PhoneFrame` and the hub rail; desktop shots feed `BrowserFrame` heroes and the homepage work wall). Pass slugs as args to target a subset; omit them to capture every case study (`--force` includes Roseville; without `--force` Roseville is still skipped because it already has assets).
- Selected live case studies can render a dedicated explainer-video section before the outcomes grid when `explainerVideo` metadata is present in `lib/case-study-data.ts`; the section UI lives in `components/case-studies/CaseStudyExplainerVideo.tsx`.
- External client site URLs live alongside the case study metadata in `lib/case-study-data.ts`. Keep them accurate — the screenshot script and the live "Open live site" CTA both read directly from that field, so a stale or misspelled domain blocks screenshot capture and breaks the user-visible link. Omit `websiteUrl` when the client site is unavailable or cannot be verified; the case study stays published without advertising a broken outbound destination.
- `components/case-studies/FounderImpactGraph.tsx` and `CaseStudyCallout.tsx` are unmounted (only the graph imports the callout). `CaseStudySectionNav` and `CaseStudyResultsBand` were deleted in the 2026-10 redesign.
- The shared curve/data generator remains in `lib/case-study-impact-graph.ts` for any future return of the interactive founder-impact graph.
- The `/case-studies` hub (`app/case-studies/client-page.tsx`, the header's Work link) renders: a hero (`#case-studies-hero`: `WaitlistStatus`, H1, `WaitlistButton` plus an outline link to `#case-studies-list`, a 2x2 count-up stats ledger, and a `Marquee` of `PhoneFrame` mobile screenshots); `Section#case-studies-list` with `CaseStudiesList` (shadcn `Tabs` filters over `WorkCard`s, ending in a waitlist tile; 2-up compact cards below `lg`, and the filter chips scroll sideways with an edge fade on small screens). Former clients are not listed on the hub at all; their archive pages stay reachable by URL and the sitemap. Then `FinalCta` (title "your business could be the next case study.", secondary link to `/wall-of-love`) and the Breadcrumb, CollectionPage, and ItemList schemas. Data comes from `components/case-studies/work-index.ts`, which wraps `lib/case-study-data.ts` and `lib/former-clients.ts`. The 2026-10 redesign retired the "Ledger + orbit well" hero, the planet loop, and the measured-results band.
- Global mobile safety pattern for decorative hero loops: prefer `components/HeroBackgroundLoop.tsx` or `components/HeroLoopingVideo.tsx` and `resolveHeroPlaybackPolicy(...)` so all autoplay decisions remain centralized and debuggable via `onPlaybackStateChange`.
- In legacy direct markup, keep `hero-loop-video` as a safety class, add `data-hero-loop="true"`, and keep non-interactive video attributes (`playsInline`, `webkit-playsinline`, `disablePictureInPicture`, `disableRemotePlayback`).

## Pricing (`app/pricing/client-page.tsx`)

- `/pricing` is the single canonical pricing URL and now compares Prism's **four packaged offers**, all sourced from `CANONICAL_PRICING_OFFERS` / `PRICING_OFFER_ORDER` in `lib/pricing-model.ts`. The three public services are Website, Content, and Ads (`lib/services.ts`); the header Services menu also links Dental OS and Prism Infinity, which are packaged here.
  - **Website** — the ultra-premium PRO website (`/websites`).
  - **Content OS** — implemented over 3 months, then optimized monthly. Public service page: `/content` (`/content-os` 301s there).
  - **Dental OS** — custom-priced per practice (`/dental-os`).
  - **Prism Infinity** — unlimited services on one monthly subscription (`/prism-infinity`).
  - No public prices; scope is agreed after a waitlist application. Each plan's price slot shows how the engagement runs instead (from `lib/pricing-model.ts`): Website "One project, scoped to you", Content OS "3-month setup, then monthly", Dental OS "Built around your practice", Prism Infinity "Monthly. Pause or cancel anytime." Labels must never contain a price or the old "Scoped from the waitlist" placeholder (`__tests__/pricing-model.test.ts`).
- Main UI sections live in `app/pricing/client-page.tsx`; the hero lives in `components/pricing/PricingHero.tsx` (`WaitlistStatus`, the h1 "a clearer way to invest in growth.", `WaitlistButton`, and a link to `#offers`). Plan cards are `components/pricing/PricingPlans.tsx` (`SpotlightCard`s), the comparison table is `PricingComparison.tsx` (no pricing row; a "How it runs" row instead), and `offer-kit.tsx` provides the shared `OfferIconTile` also used by `/services` and `/prism-infinity`.
- `/pricing` uses the shared marketing kit in `components/prism/` (`Section`, `SectionHeader`, `WaitlistButton`, `FinalCta`), so section headings and CTAs stay aligned with the homepage and `/about`.
- Section order is intentional: hero, `#offers` plan cards (the `pricingSnapshot` array), proof (`BrowserFrame` case-study cards with verified metrics from `getCaseStudyMetric`), the comparison table, the engagement steps (`#growth-path`, the `growthPathSteps` array), support after launch (the `partnerLevels` array), FAQ (`FaqList` plus a link to `/faq`), and `FinalCta` (secondary link to `/case-studies`). The `growthPathSteps`/`pricingSnapshot`/`partnerLevels` variable names were retained (and are still required by `lib/pricing-consistency.ts`) even though their content is now the four-offer model. The `partnerLevels` Content OS description is hand-written copy that must stay in the same voice as `CANONICAL_PRICING_OFFERS.content_os.description` ("Video edits, scripts, social posts, and website content…") — the consistency guard checks tokens, not descriptions, so keep them in sync manually.
- Every primary CTA is "Join the waitlist" (`PRICING_PRIMARY_CTA` = `WAITLIST_CTA`; Website and Content OS cards carry `?focus=`); the hero shows the `WaitlistStatus` pill; each offer card keeps an internal explore link as its secondary CTA. The `growthPathSteps` now read join the waitlist → we review and reach out → we build.
- History: the five-tier ladder (free Growth Dashboard, `$500` Deep Growth Audit, `$3,500` Growth Sprint, `$1,500/month` Growth Partner) and the 2026-07-27 call-first model are retired.

## Checkout (`app/checkout/*/page.tsx`)

- Legacy checkout routes (`/checkout/launch`, `/checkout/grow`, `/checkout/scale`) permanently redirect to `/pricing`. Only their noindex `thank-you` children remain (`app/checkout/{launch,grow,scale,website}/thank-you`) for old payment-link redirects; the first three still link `BOOKING_URL`, and `/checkout/website/thank-you` no longer mounts a purchase tracker. Do not link to these routes from active pages.

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
  - `/refer`
  - `/hottest-content`
  - `/models`
  - `/secret-pearl/privacy`
- These routes should keep `robots: { index: false, follow: false }` and stay excluded from `app/sitemap.ts`.
- `/secret-pearl/privacy` is the public App Store privacy policy for Secret Pearl. Keep it factual, accessible without authentication, explicit about local journal storage and optional Apple services, and linked from the shipped app and App Store Connect metadata.
- Do not use these as canonical acquisition pages for SEO campaigns. Point search-facing users toward durable commercial surfaces like `/services`, `/websites`, `/ads`, `/local-listings`, `/pricing`, `/ai-seo-services`, and `/seo`.
- `/ig`, `/tiktok`, and `/youtube` are link-in-bio hubs with a focused waitlist funnel. Their shared page (`components/social-link-hub.tsx`) is a single dark, mobile-first column with deliberately minimal copy: the shared headline "grow your business with Prism.", one supporting line ("We implement the strategies and tactics we post about to level up your business."), a short capacity card (live dot, "Prism is fully booked right now." + a join-the-waitlist sentence + the next intake month, `data-capacity-notice="hub"`), then exactly three service CTAs — **Website**, **Content**, and **Ads** — each opening `/waitlist?focus=<service>` (`WAITLIST_FOCUS_HREFS`). Do not restore Prism Infinity, revenue-band routing questions ("Doing under $1M a year?" / "Doing $1M–$10M a year?"), or "Premium Website Design" on these routes. Keep the area between the supporting line and actions empty: follower, subscriber, view, post, reach, and revenue stats are intentionally absent. Referral is also intentionally absent. Visual system (2026-10-12): Prism Spectrum tokens on the near-black canvas, with `PrismLogo` and a handle pill in the header, a "From <platform>" eyebrow, a `text-gradient` lowercase H1, Geist Sans mixed-case body copy in `text-muted-foreground`, and lucide-icon action cards. Tiny uppercase Geist Mono survives only as the footer "Websites · Content · Ads" label. Do not reintroduce 10px uppercase mono for sentence copy on these pages. Keep the previously retired cards (case studies, Content OS, Start free, platform cross-links, referral, Infinity, and Marble) out of the social funnel. Keep copy minimal; do not reintroduce proof strips, ranked credit lists, product screenshot showcases, gratitude framing, or extra sections.
- These social routes should keep explicit CTA tracking on the action cards and the header profile link so inbound social traffic is measurable in GA4/Vercel without adding extra UI chrome. Action-card `cta_click` events include `platform` (`instagram` / `tiktok` / `youtube`), `service` (`website` / `content` / `ads`), `destination` (the waitlist path; the analytics sanitizer strips the `?focus=` query, so `service` carries the focus), and location strings `{platform} landing actions`. The header uses `{platform} landing header`. Attribution already stored from the hub landing (`landing_path`, UTMs) travels with the client-side waitlist navigation via `lib/marketing-attribution.ts`; do not invent a second UTM-forwarding scheme on the links.

## Websites (`app/websites/page.tsx`)

- Active offer page for the **Website** product: the ultra-premium **PRO website** (a bespoke design system, software-grade engineering, and analytics wired from day one, structured to rank on Google and get cited by AI assistants such as ChatGPT, Gemini, Claude, and Perplexity). No public price, no on-page order form, and no booking CTA; hero and final CTAs are `WEBSITE_WAITLIST_CTA` (`/waitlist?focus=website`). Price-free `ServiceSchema` + `FAQSchema`.
- Structure (2026-10-12) uses the shared service kit in `components/services/*`: `ServiceHero` (`WaitlistStatus`, H1 from the `title` prop with one spectrum accent, the product name leading the subhead, `WaitlistButton`, secondary link to `#work`, `WebsitesHeroVisual`; no eyebrow, and the visual peeks above the 1440x900 fold; `layout="split"` is available), `ServiceBento`, a visibility section with measured Search Console results, `WebsitesWorkRail` (`#work`), `ServiceSteps`, a results band (`ProofMetricCard`s linking the Dr. Wong and Belize Kids case studies), `ServiceFaq` (`FaqList`), `ServiceSiblings`, and `FinalCta` (focus `href`, own `headingId`, title "your site, next."). The "Build log" ASCII hero is retired.
- The old launcher → fullscreen dialog → Stripe pay flow is retired (components deleted); `/checkout/website/thank-you` stays noindex as the legacy Stripe-link landing target.
- The old model is retired: this is **not** review-first / selective / "no card collected", and there is no dynamic price estimator (`WebsiteBuildEstimatorForm.tsx` was removed).
- Keep the page indexable, in `public/llms.txt`, and in the sitemap as Prism's canonical website acquisition page.
- Copy follows the prism-writing skill (`prism-brand` pack): lowercase headlines ending with a period and **no em dashes** anywhere in the page copy.

## Content (`app/content/page.tsx`)

- Public service page for **Content**: a publishing system that plans, produces, and publishes across every social platform and the website, implemented over 3 months, then optimized every month. **No public price**: Prism is at capacity, so every CTA is `CONTENT_WAITLIST_CTA` (`/waitlist?focus=content`) and the hero shows the `WaitlistStatus` pill. Ads is a sibling service at `/ads`, not the hero claim.
- This route replaced `/content-os`. `/content-os`, `/founder-os`, and `/founder-os/apply` 301-redirect here. It is indexable, in `public/llms.txt`, and in the sitemap, and carries `ServiceSchema` plus FAQ structured data (the Offer node is price-free by policy).
- Structure (2026-10-12): `ServiceHero` (H1 "your expertise. catching fire.", copy may change; `ContentHeroVisual`; secondary link to `#proof`), `ServiceBento`, `ServiceSteps`, `#proof` (channel stats with `BrandLogo` marks from `lib/proof-metrics.ts` plus a `CommentsRail` marquee of community comments), `ServiceFaq`, `ServiceSiblings`, `FinalCta`. "The Hearth" ASCII fire hero is retired.

## Ads (`app/ads/page.tsx`)

- Public service page for **Ads**: Google, Meta, TikTok, and Yelp campaigns with tracking, budget guardrails, and weekly optimization. Primary CTA is `ADS_WAITLIST_CTA` (`/waitlist?focus=ads`) with the `WaitlistStatus` pill in the hero; the old `/free-analysis` secondary is gone. Hero copy makes zero metric claims.
- Structure (2026-10-12): `ServiceHero` (`AdsHeroVisual`, secondary link to `#platforms`), `ServiceBento`, `#platforms` (with the cross-link to the invite-only `/chatgpt-ads` program), `ServiceSteps`, a budget section, the founder VSL (`#ads-founder-vsl`, `components/services/FounderVideo.tsx`: a Cloudinary-cropped 680x564 clip with a poster frame that only loads and plays on click), a fit section with links to the Facebook and TikTok dentist landers, `ServiceFaq`, `ServiceSiblings`, and `FinalCta`. The hero "Launch manifest" and the creative bento's ad diagram are tagged "Example" (illustrative, no numbers); the bento also shows a real Prism-built client page (Town Centre Dental). The "Launch rail" hero, the rocket ASCII loop, and `AdsHeroIllustration` are retired.
- Schemas: price-free `ServiceSchema` (Offer URL `/ads`), `VideoSchema`, and `FAQSchema`. Keep the video schema metadata (id, upload date, duration) current when swapping clips so Google's video rich results stay accurate.
- Indexable, in `public/llms.txt`, and in the sitemap.

## Services hub (`app/services/page.tsx`)

- Indexable overview of the growth system, linked as "All services" from the header Services menu and the footer. Structure (2026-10-12): hero (`WaitlistStatus`, H1 "website. content. ads.", `WaitlistButton` plus a "compare offers" link to `/pricing`, and a service index of `OfferIconTile`s), the three core services as `SpotlightCard`s with per-service visuals (`app/services/service-visuals.tsx`, `BrowserFrame`), the packaged offers (from `CANONICAL_PRICING_OFFERS`), capabilities, how it works, proof (link to `/case-studies`), FAQ (`FaqList`), and `FinalCta`. Data: `PRISM_SERVICES` (`lib/services.ts`), `lib/pricing-model.ts`, `lib/waitlist.ts`. Carries `ServiceSchema` + `FAQSchema`. The old light-surface catalog is retired.

## FAQ (`app/faq/page.tsx`)

- Indexable FAQ hub: hero (`WaitlistStatus`, H1 "questions, answered."), one `Section` holding the client `FaqExplorer` (`app/faq/faq-explorer.tsx`: a shadcn `Input` search plus one `FaqList` per topic, anchored `#faq-<topic>` for waitlist, working-with-prism, pricing, websites, and results), then `FinalCta` with its own title. `FAQ_TOPICS` lives in the page and also feeds `FAQSchema`. `FaqList` uses native `<details>`, so every answer stays in the HTML for crawlers.

## Dental OS (`app/dental-os/page.tsx`)

- The **Dental OS** offer: the full Prism growth system (website, SEO and AI search, Google Maps, reviews, and ads) packaged for dental practices, **custom-priced** with no public price.
- Indexable, in `public/llms.txt`, in the sitemap, and carries `ServiceSchema` plus FAQ structured data. Pricing is scoped per practice; primary CTAs use `WAITLIST_CTA` and the hero shows the `WaitlistStatus` pill.
- Structure (2026-10-12): split hero (`WaitlistStatus`, H1 "be the easy yes for new patients." with a `text-refract` accent, `WaitlistButton` plus a link to `#proof`, and `components/dental-os/DentalHeroShowcase.tsx` on the right), what's inside (`DentalBundleBento`), `#proof` (Dr. Wong stats via `getCaseStudyMetric` + `HomeCountUp`, a client roster linking case studies), why dental is different, how it works, FAQ (`FaqList`), and `FinalCta` with a per-page title that includes the live intake month.

## Prism Infinity (`app/prism-infinity/page.tsx`)

- The **Prism Infinity** offer: an infinite queue of growth deliverables owners actually request (landing pages, ad creative, websites, video, photoshoots, content) on one monthly subscription, pausable or cancelable anytime. Brand systems, decks, and print still count, but they are supporting work, not the headline. **No public price**: every CTA is `WAITLIST_CTA` and the hero shows the `WaitlistStatus` pill. Copy lives in `components/prism-infinity/infinity-content.ts`.
- Structure (2026-10-12): hero (`WaitlistStatus`, an H1 with `InfinityRotatingWord`, `WaitlistButton` plus a link to `#deliverables`, the `InfinityQueue` visual), a deliverables `Marquee` (pauses on hover; static under reduced motion), how it works (`OfferIconTile`), `#deliverables` (`SpotlightCard` grid), why owners stay, proof (`HomeCountUp`), FAQ (`FaqList`), and `FinalCta` with its own title. Keep the how-it-works, queue, and deliverable collections as valid semantic lists, and do not revert the included list to an agency catalog (business cards, print, slide decks as peer cards).
- Indexable, in `public/llms.txt`, in the sitemap, and carries `ServiceSchema` plus FAQ structured data (the Offer node is price-free by policy).

## Refer (`app/refer/page.tsx`)

- The `$100` referral program page (noindex, sitemap-excluded; `/referral`, `/referrals`, and `/affiliate` all redirect here). Dark system, one column: "A friend who becomes a client. $100." hero, a 3-step how-it-works, the on-page `components/forms/ReferralForm.tsx` (Formspree `NEXT_PUBLIC_REFERRAL_FORM_ENDPOINT` → `meebpgaj`, required permission-to-share consent, in-page success with a "Refer another friend" reset), a payout FAQ, and fine print ($100 is a referral payout, not service pricing; paid when the referred business becomes a paying client — website, Content OS, Dental OS, or Prism Infinity; self-referrals excluded; no cap).
- The retired program ("earn up to $1,000" + external Typeform) must not come back; active entry points are the footer "Refer a friend ($100)" link, the `/local-listings` referral blurb, and the legacy referral redirects. Do not add referral back to the focused social link hubs.

## Founder OS (retired → redirects to `/content`)

- Founder OS is **retired**. `/founder-os` and `/founder-os/apply` now 301-redirect to `/content` (see `next.config.mjs`), and the route is no longer in `lib/seo/search-visibility.ts` / `public/llms.txt`.
- Founder OS page and form files are gone. Keep the `/founder-os` and `/founder-os/apply` redirects. Do not treat Founder OS as a live offer.

## Apps (`app/apps/page.tsx`)

- Mobile app portfolio + process overview.
- Direct-visitor/reference surface only after the growth-first search cleanup. It is noindex and excluded from sitemap/LLM maps unless product direction changes.
- Uses `ItemList` JSON-LD for the showcased projects; avoid `SoftwareApplication` rich-result schema unless we can supply accurate pricing + reviews/ratings.
- Route metadata comes from `buildRouteMetadata` (`lib/seo/metadata.ts`) and uses one `| Prism` suffix unless the title is already brand-led.
- For static pages, set `titleStem` + `description` in the page metadata call and let the helper generate canonical/Open Graph/Twitter/robots fields consistently.
- Prefer search-intent titles over internal page labels. Future metadata work should optimize for what a searcher wants (`website design`, `local SEO`, `Google Maps`, `case studies`, etc.), then confirm the final rendered output in `seo/inventory.csv`.

## Software (`app/software/page.tsx`)

- Growth tools hub listing Prism-built software (currently Density, Hot Content, and Engineering Tracker).
- Direct-visitor/reference surface only after the growth-first search cleanup. Keep it live for people who know the URL, but do not link to it as a canonical search target.
- App card data lives in `lib/software-apps.ts` and renders only on `/software` through `components/software/SoftwareAppCards.tsx` (`SpotlightCard`s). The cards map the legacy `/pixelish/*.svg` icon paths still stored in `lib/software-apps.ts` to lucide icons; do not render the Pixelish files directly.

## Blog (`app/blog/page.tsx`)

- Index (2026-10-12): hero (`Eyebrow`, H1, an RSS button to `/blog/feed.xml`, and the topic pills from `BlogFilterNavigationServer`), a `BlogFeaturedCard` for the newest post in the current topic, a paginated 12-card `BlogGridCard` grid (`components/blog/blog-post-cards.tsx`, real or generated covers), and `FinalCta` (secondary link to `/case-studies`). `app/blog/layout.tsx` only adds the `blog-reading-surface` wrapper.
- Posts (`app/blog/[slug]/page.tsx` → `components/blog-post-layout.tsx`): scroll progress, a header (category badge, H1, author with a `PrismMark` avatar, `CopyBlogMarkdownButton`), the body styled by `proseClassName` from `components/landing/prose.ts`, an "On this page" table of contents (disclosure on mobile, sidebar on `xl`), an author card, three related posts, `FinalCta`, and the BlogPosting, Breadcrumb, and HowTo schemas. Details in `docs/blog-content-architecture.md` and `docs/blog-styling-guide.md`.
- `getAllPosts()` returns the curated/indexable post set by default, so the visible blog index, RSS, latest-post API, related posts, and sitemap stay dental/local-growth focused.
- Off-theme posts remain live by direct URL with `noindex, follow`; do not assume every file in `content/blog` should appear on the public blog index.

## Podcast (`app/podcast/page.tsx`)

- Podcast hub + recent episode preview cards.
- Direct-visitor/reference surface only after the growth-first search cleanup. It is noindex and excluded from sitemap/LLM maps.
- Uses `PodcastSeriesSchema` plus `PodcastEpisodeSchema` (with nested `VideoObject` metadata). Keep episode publish dates, YouTube URLs, and thumbnails up to date so Video structured data stays valid.
- Individual episode spotlights (for example `app/podcast/michael-njo/page.tsx`) should keep CTA buttons mobile-safe by allowing full-width wrapping on small screens so no horizontal scrolling is introduced in quote/CTA cards.

## Dental Website (`app/dental-website/page.tsx`)

- Dentist-focused website page targeting “dentist website design”.
- Primary CTAs say "Join the waitlist" (`WEBSITE_WAITLIST_CTA` → `/waitlist?focus=website`) and the hero carries a capacity line. No booking CTA. Offer schema is price-free and points at `/pricing`.
- Includes `ServiceSchema` plus FAQ structured data (via `FAQSchema`) and cross-links into the dental SEO and ads funnels.
- 2026-10-12 polish: body copy is sentence case; guarantees and unverifiable capability claims were rewritten as deliverables (no "visibility only improves", no practice-management sync claims, no directory counts). The broken Google Trends embed and the illustrated video carousel are gone; interviews render through `InterviewGrid` + `DENTAL_INTERVIEWS` (`components/landing/dental/interview-grid.tsx`, real YouTube stills, played in `VideoDialog`), shared with `/why-dental-practices-love-prism`. The FAQ uses `FaqList` via `DentalFaq`. `FinalCta` title: "your practice, next."
- Aliases in `next.config.mjs` (redirect to `/dental-website`): `/dentist-website-design`, `/dental-website-design`, `/dental-clinic-website-design`.

## Retired routes (→ `/waitlist`, 2026-09-14)

`/free-analysis`, `/get-started`, `/apply`, `/website-intake` (and Content/Ads intakes), `/contact`, `/aeo`, `/book-a-shoot`, and `/ai` 308-redirect to `/waitlist`; their pages, forms (`FreeAnalysisForm`, `GetStartedForm`, `WebsiteIntakeForm`, `ContactForm`, `AeoAssessmentForm`, `BookAShootForm`), and `components/get-started/*` are deleted. Historical field contracts are summarized in [`forms.md`](./forms.md#retired-flows-308--waitlist); full detail lives in git history.

## Shared Chrome (`components/navbar.tsx`, `components/footer.tsx`)

- Header (2026-10-12; supersedes the 2026-10-09 three-link header): 64px tall, fixed and transparent over the top of `/` and solid (blurred `bg-background/75` with a hairline border) after 8px of scroll; sticky and solid on every other route. Left: `PrismLogo` linking to `/`. From `lg` (1024px): a shadcn `NavigationMenu` labeled "Main" with Work (`/case-studies`), a "Services" trigger, Wall of Love, About, and Pricing (`NAV_ITEMS` in `lib/constants.ts`). The Services dropdown lists `NAV_SERVICE_ITEMS` (Websites, Content, Ads, Dental OS, Prism Infinity, each with a lucide icon and a one-line description), an "All services" link to `/services`, and a featured waitlist card (client screenshot, "Fully booked", the live intake month). Right: the white "Join the waitlist" pill with a live dot (`data-testid="navbar-cta"`, shortened to "Join" on the smallest screens); on `/waitlist*` it is replaced by a quiet "<Month> intake" status (`data-testid="navbar-status"`). Active links set `aria-current="page"`, and the Services trigger reads active on any service route. Every click goes through `trackNavigation`.
- Mobile (below `lg`): a round menu button toggles a full-height panel portaled to `document.body` below the measured header. It lists the four links (56px rows, 44px in short viewports), the five services in a two-column grid, and a waitlist card with the capacity line and a full-width CTA. It locks scroll, marks `main`, `footer`, and other body children `inert` (restoring their prior state), focuses the first link, closes on Escape, route change, or resize to desktop, and restores focus. The header publishes `--prism-header-height` through a `ResizeObserver`; opening the panel must not change it.
- Case study detail pages add a breadcrumb row under the header (home / work / client). It is visual only; each page's `CaseStudySchema` emits the `BreadcrumbList`.
- Tests: `__tests__/visual/products.spec.ts` (desktop link order, keyboard order, geometry, the Services menu, the homepage Products section, and the footer), `pnpm test:mobile-navbar` (the mobile panel on Chromium and WebKit), and `__tests__/components/Navbar.test.tsx`.
- Footer: `PrismLogo`, the "impossible is temporary" line, a one-sentence description, a capacity card (`CAPACITY_MESSAGE` + live month) with the `Join the waitlist` pill (`TrackedLink`, `location="footer"`; `showWaitlistCta={false}` hides it on `/waitlist` and `/waitlist/thank-you`), then Services (Websites, Content, Ads, All services), Products (Midas and zRead from `lib/products.ts`, external), Proof (Work, Wall of Love, Prism Proof), and Company (About, Pricing, Dental OS, Prism Infinity, Blog, FAQ, Refer a friend ($100)) columns, a legal row (privacy, terms, support email), monochrome social icons, and an oversized "prism" wordmark.
- Do not reintroduce a footer "Book call" button or a demo calendar without changing the funnel docs first.

## AI Agents for Dentists (`app/ai-agents/dental/page.tsx`)

- Indexable dental-cluster page for AI phone/lead qualification support.
- Keep it linked as part of the dental specialty cluster and included in `public/llms.txt`.
- The parent `/ai-agents` route is broad and noindex; do not let it compete with the dental child page unless product direction changes.

## Structured data (global)

- `app/layout.tsx` injects `GlobalSchemaGraph` from `components/schema-markup.tsx` (Organization, WebSite, LocalBusiness).
- `components/breadcrumbs.tsx` emits `BreadcrumbList` JSON-LD with canonical URLs.
- Service offer schema stays price-free. `/ads` points its Offer URL at `/ads`. `/seo`, `/local-listings`, `/websites`, `/dental-website`, and `/dental-practice-seo-expert` stay price-free as documented (most point at `/pricing`). Do not reintroduce `60-Day Growth Sprint` or numeric `price` fields.

## Homepage (`app/client-page.tsx`)

- Prism Spectrum redesign (2026-10-12). `app/client-page.tsx` composes, in order: `HomeHero`, `HomeWorkWall` (`#work`), `HomeNumbers`, `HomeServicesBento` (`#services`), `HomeCaseStudies`, `HomeTestimonials`, `HomeFounder`, `HomeProducts` (`#products`), `HomeHowToGetIn` (`#how-it-works`), `HomeFaq` (`#faq`), and `FinalCta` (location `homepage final cta`, secondary "See the work" → `/case-studies`). `HomeHashScrollStabilizer` keeps hash links landing below the fixed header.
- Copy lives in `components/home/homepage-content.ts` and follows the prism-writing skill (`prism-brand` pack): lowercase headlines ending with a period, no em dashes, no guarantees. Never type a number into that file; every figure resolves from `lib/proof-metrics.ts` or `getCaseStudyMetric`. `homepage-content.ts`, `HomeHero.tsx`, and `components/prism/final-cta.tsx` are in the `PRICING_STRICT_FILES` list of `lib/pricing-consistency.ts`.
- `HomeHero` (`#homepage-hero`): the `WaitlistStatus` pill, the h1 "make your business impossible to ignore." (`text-gradient` lead plus a `text-refract` accent), one subhead, `WaitlistButton` plus an outline "See the work" → `#work`, the refraction scene, and a compact proof row (current case-study count, cities, combined followers). `components/home/HomeRefraction.tsx` (+ `HomeRefraction.module.css`, `data-testid="home-refraction"`) is an SVG of light entering a prism and leaving as six labeled bands (website, content, ads, search, ai answers, reviews); it is the only place the full spectrum fan appears, its CSS keyframes run only under `prefers-reduced-motion: no-preference`, and the base style is the finished frame.
- `HomeWorkWall` (`#work`): a tilted, multi-column `Marquee` of current-client desktop screenshots (`public/case-studies/<slug>-home-desktop.jpg`) built from `HOMEPAGE_CLIENT_WINS`, each linking to its case study. Former clients (`lib/former-clients.ts`) never appear.
- `HomeNumbers` ("numbers, not adjectives."): four `[data-home-stat]` count-ups (Dr. Wong and Belize Kids Search impressions year over year via `getCaseStudyMetric`, GA4 new users across connected client sites, lifetime YouTube views) with a dated source note. The current snapshot (`PROOF_METRICS_VERIFIED_AT`, October 4, 2026) is 5,310 GA4 new users across 16 connected client sites in September 2026, 5.8M lifetime YouTube views, and 73K+ combined followers; see `docs/data-verification-2026-10-04.md`. Do not claim cross-site deduplicated people or sum unrelated view periods.
- `HomeServicesBento` (`#services`, "one team. every channel."): six `[data-home-service-card]` `SpotlightCard`s (websites, content, and ads link to their pages; search and AI answers, reviews and proof, and tracking are capability tiles).
- `HomeCaseStudies`: shadcn `Tabs` over four featured studies (Dr. Wong, Belize Kids, Exquisite Dentistry, Olympic Bootworks) with screenshots, scope, and a verified metric when one exists; the Dr. Wong tab plays his interview through `VideoDialog` (YouTube loads only on click).
- `HomeTestimonials`: the 8 consent-safe named client quotes (all from `sm` up, the first three on phones), then a `Marquee` of community comments explicitly labeled as comments on Prism's own posts.
- `HomeFounder` (Enzo, facts, motto), `HomeProducts` (Midas and zRead `SpotlightCard`s linking straight to their sites, not the waitlist), `HomeHowToGetIn` ("fully booked. here’s how to get in.", three `[data-home-step]` steps), and `HomeFaq` (`FaqList` with native `<details>`, so answers stay crawlable).
- Locked spec: `__tests__/visual/locked-routes.spec.ts` guards the h1 and waitlist copy and snapshots the numbers, services, and how-to-get-in sections, and checks that their cards (4, 6, and 3) stay contained at four breakpoints. `__tests__/visual/animation-loops.spec.ts` checks that the refraction scene animates and the `#work` marquee moves. `__tests__/former-clients-highlight.test.ts` keeps former clients off the work wall and case study tabs and requires consented quotes.
- History: the 2026-10 redesign retired the "impossible" hero scene, the "Your growth team." hero section, the client Cover Flow deck, the problem, fit, proof-band, and offers sections, the ASCII hero layer, the old homepage reveal wrapper, and the system grid. Do not reintroduce them.
- `components/runtime-client-shell.tsx`, mounted from `app/layout.tsx`, initializes runtime helpers (`AnalyticsProvider`, Sentry/monitoring clients, toaster).

## Wall Of Love (`app/wall-of-love/client-page.tsx`)

- Structure (2026-10-12): `WallOfLoveHero` (`#wall-of-love-hero`: H1 "wall of love.", `WaitlistButton` with location `wall of love hero`, `HomeCountUp` audience stats from `lib/proof-metrics.ts` with their verified date, and a `Marquee` of comment chips), `ClientNotes` (`#from-clients`, `SpotlightCard` client quotes), `CommunityWall` (`#from-the-community`), and `FinalCta`. Components live in `components/wall-of-love/*`.
- Data comes from `components/wall-of-love/wall-of-love-feed.ts`, which reads `content/wall-of-love-data.tsx`, drops anything flagged `requiresConsent`, and keeps former clients out. Community comments pass the shared curation rules in `lib/community-comments.ts` (also used by `/content`): religious references, other creators' names, shouting, hustle slogans, profanity, reply-only comments, and off-brand handles are excluded; emoji-only and one-word comments only feed the emoji tally; craft comments sort first; quotes are never edited. Counts on the page (hero pill, "Show all N") come from the filtered set. Client notes link a business only when the repo verifies it (Dr. Tingjen Ji → Grace Dental Santa Rosa); everyone else stays "Website client". `FinalCta` title: "be the next note on this wall." Social proof numbers read from `lib/proof-metrics.ts`; do not hard-code a second snapshot here.
- The split editorial hero, the ASCII heart loop, and the retired planet media (`planet-lite.mp4`, `planet-lite-2026.mp4`, `planet.png`, `sales-agent-source.mp4`) are gone; do not reintroduce them.

## Prism Library (`app/library/page.tsx`)

- Library layout (hero, featured post, and grid) lives in `components/library/LibraryClient.tsx`; the list page intentionally avoids embeds and extra UI chrome.
- Direct-visitor/reference surface only after the growth-first search cleanup. Library list/detail routes are noindex and excluded from sitemap/LLM maps.
- Data comes from `lib/library/getLibraryPosts.ts` and merges the `content/library/seed.ts` fallback with `content/library/editorial.ts` curation metadata.
- Detail pages live at `app/library/[slug]/page.tsx` and are intentionally simple: text plus a single Instagram/TikTok embed. TikTok markup is constructed locally from a validated post ID in `lib/library/tiktok.ts`; do not inject third-party oEmbed HTML.
- To curate a post, add an entry in `content/library/editorial.ts` keyed as `${platform}:${id}` with a speaker name and at least one takeaway (that's what marks a post as curated).
- `tags`, `group`, and optional `featuredWeight` still live in the editorial metadata for curation, even though tags are not surfaced in the current UI.
- When API tokens are missing, the Library falls back to `content/library/seed.ts`.

## Thank-you routes

- `app/waitlist/thank-you/page.tsx` (live; `LeadSuccessTracker`, intake strip, "stay close." cards; see the Waitlist section)
- `app/thank-you/page.tsx` (legacy landing target; still supports `?source=apply` via `ApplySuccessTracker` and a leftover `?source=website-build` variant, which must not promise a payment link)
- `app/pricing/thank-you/page.tsx` (noindex leftover; must not mention the retired growth sprint)

`/analysis-thank-you`, `/aeo-thank-you`, and `/book-a-shoot/thank-you` are deleted.

- These routes are noindex/no-follow and should remain crawlable (don’t block them in `robots.txt`) so search engines can read the meta noindex directive.

## AI Website Launch (retired)

- `/ai-website-launch` permanently redirects to `/pricing`; the route directory and its archival `AiWebsiteLaunchForm` are deleted.

## Dental Photography surfaces

- `app/dental-photography/page.tsx` – hub hero, overview cards, and CTA stack. Buttons point to `/dental-photography/office-team`, `/dental-photography/before-after`, and the content waitlist (`WAITLIST_FOCUS_HREFS.content`; `/book-a-shoot` is retired).
- `app/dental-photography/office-team/page.tsx` – bookable service page. The recent-shoots slider now lives in `app/dental-photography/office-team/recent-shoots-section.tsx`, which handles the mobile progress bar and optional “visit website” CTA (set via the `website` field on each item). Keep the proof CTA pointing to `/dental-photography/before-after` and the primary buttons to `WAITLIST_FOCUS_HREFS.content`.
- `app/dental-photography/before-after/page.tsx` – DIY capture guide. Preserve the “jump to the protocol” anchor and the CTA block that links back to `/dental-photography/office-team` so visitors can graduate into the full service.

## Why Dental Practices Love Prism (`app/why-dental-practices-love-prism/page.tsx`)

- Long-form trust page covering The Prism Method, case studies, and interview videos (`InterviewGrid`, shared with `/dental-website`; the former-client interview stays off). CTA buttons point to the waitlist (`WAITLIST_FOCUS_HREFS.content`).
- Includes two dedicated dental-photography sections: an on-site storytelling block (linking to `/dental-photography/office-team`, using the `dentalPhotographyHighlights` array) and a before-and-after block (linking to `/dental-photography/before-after` + `/dental-photography/office-team`, using `beforeAfterGuideHighlights`). Update the respective highlight arrays when editing those bullets so layout components stay in sync.
- Keep both sections intact so this page keeps funneling visitors toward the photography hub and DIY guide without duplicating copy in multiple files.

## SEO for Dentists (`app/dental-practice-seo-expert/page.tsx`)

- Dentist-focused landing page targeting “dentist seo”, “seo for dentists”, and “dental seo services” queries, linking into the broader `/seo` and dental funnels.
- Aliases in `next.config.mjs` (redirect to `/dental-practice-seo-expert`): `/seo-consultant-for-dentists`, `/seo-for-dentists`, `/dentist-seo`, `/dental-seo`, `/dental-local-seo`, `/dentist-local-seo`, `/local-seo-for-dentists`.
- Includes a dental-focused `ServiceSchema` plus FAQ structured data (via `FAQSection`) to help search engines understand the offer.
- Supporting dentist SEO guides live in `content/blog/` (e.g., `/blog/dental-seo-guide`, `/blog/dental-practice-rank-higher-google-search`, `/blog/ai-search-for-dental-practice`).

## SEO Overview (`app/seo/page.tsx`)

- Core SEO overview page (hero, founder VSL, scoring framework, a dark SEO / AEO / GEO diagram in `app/seo/search-modes-diagram.tsx`, on/off-page previews, the three build stages (`buildStages` in `content/seo.ts`; there are no package tiers), verified case-study cards with source and window, `FaqList`, and `FinalCta` "get found next."). Body copy is sentence case and guarantee-free.
- Search Console, keyword tracking, competitor analysis, and toxic backlink audit visuals use the expandable image pattern in `components/seo/seo-expandable-image.tsx` so visitors can zoom into charts.

## SEO Audit Service (`app/seo/audit/page.tsx`)

- SEO audit service landing page targeting “seo audit service” intent.
- Uses `SeoHero` + `SeoSection` blocks with `ServiceSchema`, `HowToSchema`, and FAQ structured data.
- Cross-links into `/seo`; its CTAs go to `/waitlist`.

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

## ChatGPT Ads (`app/chatgpt-ads/page.tsx`)

- Invite-only landing page for Prism’s managed ChatGPT ads program. Public copy follows OpenAI’s published principles (independent answers, private conversations, clearly labeled sponsored placements); booking is gated behind a partner invite code.
- Visual surface is OpenAI-informed (warm off-white, hairline rules, pill CTAs) while the Prism navbar/footer stay black. Built on the shadcn/ui radix-vega grammar via a page-scoped semantic token remap in `components/chatgpt-ads/chatgpt-ads.module.css`. The page alternates an editorial hero, near-black trust band, intent rail, contained process panel, quiet invite frame, and native `<details>` FAQ. Scoped in `DESIGN.md`.
- Access gate: `components/chatgpt-ads/ChatGptAdsAccess.tsx` posts to `/api/chatgpt-ads/unlock`. Valid codes live in `lib/chatgpt-ads-invites.ts` (not the client bundle). Example partner code: `michael` for Dr. Michael Njo.
- After unlock, the page reveals a "Book your setup call" CTA to `BOOKING_URL` (`lib/booking.ts`). This is the only live public booking link.
- Indexable. Keep it in `lib/seo/search-visibility.ts` and `public/llms.txt`. Like every route, it uses the site-wide `public/prism-opengraph.png` social image.
- Not in the main nav or footer. Share the URL, or `/chatgpt-ads?code=michael`.

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

- Structure (2026-10-12, components in `components/about/*`): `AboutHero` (`Eyebrow`, H1 "built by Enzo Sison.", `WaitlistButton`, `ScrollToTimelineButton` → `#timeline`, the external profile link, headshot, `PrismMark`), `AboutManifesto`, `OlympicJourney` (`#olympic-journey`), `Section#timeline` with `components/scrolling-timeline.tsx`, `WhatPrismBuilds` (`lib/services.ts`), and `FinalCta` ("build the next chapter with us."), plus Breadcrumb and Person schemas. Timeline thumbnails share one 4:3 `object-cover` frame; no third-party logos that could imply endorsement (the Olympic Committee logo was replaced with a neutral tile). `/about` is a locked route (h1 guard + screenshot).
- The Olympic journey carousel (`components/pole-vault-carousel.tsx`) uses local Vimeo poster images, deferred SDK loading, accessible playback/retry controls, and pauses offscreen. Autoplay is optional; reduced-motion and data-saving visitors start playback explicitly.
- Scroll reveals use `components/prism/reveal.tsx`, so server-rendered content remains visible without JavaScript or IntersectionObserver.

## Supporting Components

- `components/prism/*`: the marketing kit (`Section`, `SectionHeader`, `Eyebrow`, `SplitTitle`, `Marquee`, `SpotlightCard`, `Reveal`, `WaitlistStatus`, `WaitlistButton`, `FinalCta` with an optional per-page `title`, `BrowserFrame`, `PrismLogo` / `PrismMark`, `FaqList`, `VideoDialog`). Rules live in `DESIGN.md`.
- `components/services/*`: the service-page kit shared by `/websites`, `/content`, and `/ads` (`ServiceHero`, `ServiceBento`, `ServiceSteps`, `ServiceFaq`, `ServiceSiblings`, per-service hero visuals, `WebsitesWorkRail`, `CommentsRail`, `ProofMetricCard`, `PhoneFrame`).
- `components/landing/*`: the lander kit (see "SEO landers" below).
- `components/tech-stack-icons.tsx`: shared `ADS_STAGE_ICONS` (5) + `WEBSITE_SURFACE_ICONS` (7) maps resolving through the `BrandLogo` registry with Lucide fallbacks (Yelp burst with `Store` fallback).
- `components/brand-logo.tsx`: `BrandLogo` attempts the logo file first and renders its `fallback` node on load error. `yelp` (`public/logos/svgl/yelp.svg`, Simple Icons CC0) backs the `Yelp for Business` tech tile in `CaseStudyWorkHighlights`, which falls back to the Lucide `Store` icon.
- `lib/hero-media-policy.ts`: single policy engine used by `HeroBackgroundLoop` and `HeroLoopingVideo` for autoplay, poster fallback, and reduced-motion decisions. These two wrappers are the only allowed homes for decorative autoplay video.
- `components/forms/*`: shared form components noted in [forms.md](./forms.md).
- `components/video-player.tsx`: shared CTA/VSL embed with structured-data support. Pass poster + schema props so every marketing video emits valid `VideoObject` JSON-LD.

## SEO landers (`components/landing/*`)

- `landing-hero.tsx`: the shared lander hero (optional `WaitlistStatus`, eyebrow, display H1, lead, waitlist CTA plus an optional secondary action and visual). Used by about 37 routes (the dental cluster, SEO and local landers, `/proof`, `/google/*`, `/ai-agents/*`, `/library`, `/software`, `/apps`, legal pages, the why-* pages, and others) and by `components/seo/seo-hero.tsx`.
- `prose.ts`: `proseClassName`, the long-form reading styles for blog posts, legal pages, and other long text.
- `dental/primitives.tsx` (check lists, links, step rail, callouts, the dental client rail) for the dental cluster; `seo/*` (bullet lists, link pills, text links) for the SEO and local landers; `why/why-kit.tsx` for the five why-* pages; `misc/app-policy.tsx` for app privacy/support pages; `misc/confirmation.tsx` for thank-you and legacy checkout confirmation pages.
- Many landers end with `FinalCta` and their own `title`. Keep lander CTAs on the waitlist and their copy in the prism-brand voice.

## 404 and errors

- `app/not-found.tsx`: navbar, `Eyebrow` ("Error 404"), H1 "lost in the spectrum.", `WaitlistButton` plus a link to `/case-studies`, quick links, and the footer.
- `app/global-error.tsx`: a client component with its own `<html>`/`<body>`, globals, and Geist fonts; `PrismMark`, an H1, a "Try again" button that calls `reset`, and a Home link. It reports to Sentry. There are no route-level `error.tsx` files.

## September 2026 copy refresh

- Core marketing routes use plain, concrete language about deliverables, customer benefits, the review process, and the next step. (The September homepage lead “Your growth team.” was replaced on 2026-10-12 by “make your business impossible to ignore.”; since then copy follows the prism-writing skill, `prism-brand` pack.)
- Service pages, pricing, FAQs, waitlist messages, case-study introductions, SEO, and local listings follow the same voice. Scope and timing are confirmed before work begins; avoid blanket ranking, turnaround, or automatic-audit promises.
- Preserve dated case-study evidence, testimonials, canonical offer/CTA rules, form payloads, analytics identifiers, and navigation destinations when editing copy.

## Prism Products

`lib/products.ts` is the shared catalog for Midas (https://midas-ai.dev) and zRead (https://zread.dev), free open-source tools originally built for Prism’s internal workflow. Products live in the footer and the homepage, not the header. The homepage `#products` section (`HomeProducts`) sits after `HomeFounder` and before `HomeHowToGetIn`. Product links go directly to their own websites and do not enter the service waitlist.

Midas summarizes AI usage, estimated value, and remaining limits in the Mac menu bar. zRead reads selected text aloud with Mac Voice or the user’s ElevenLabs voices. Public product sites were checked October 4, 2026. Open-source positioning is supplied by the Prism owner; no new version, performance, or pricing claims are inferred.
