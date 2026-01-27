# Key Marketing Pages

Quick reference for the pages we edit most often.

## Case Studies (`app/case-studies/*`)
- Individual case study pages live under `app/case-studies/<slug>/` and render server components with client-only subcomponents for the interactive sections.
- Sticky section navigation is `components/case-studies/CaseStudySectionNav.tsx` (shadcn `ToggleGroup` + `Sheet` + `ScrollArea`); sections must use `data-section="<id>"` or `id="<id>"` so scrolling and active state work.
- Reusable “data note / in progress” callouts are `components/case-studies/CaseStudyCallout.tsx` (shadcn `Alert`).
- The “buy back time / grow customers” interactive graph is `components/case-studies/FounderImpactGraph.tsx` (shadcn `Tabs` + recharts; “with prism” vs “without prism” scenarios).
- The shared curve/data generator lives in `lib/case-study-impact-graph.ts` (bounded 0–100 index with exponential “customers compound” growth + “effort decays to zero”; tune via `curves.*K` if we ever switch to case-specific numbers).
- Minimal case studies use `components/case-study-minimal.tsx`, which automatically includes the graph so pages stay consistent.

## Pricing (`app/pricing/client-page.tsx`)
- Core sections (plans grid, founder VSL block, “everything included” features, “Website Use Cases”, smooth handoff section, clients rail, FAQ, and final CTA) live here; the hero + fullscreen modal live in `components/pricing/PricingHero.tsx`.
- The primary “pricing breakdown” CTA and the final CTA link to `#plans`; keep that anchor intact when editing.
- The video directly under the pricing cards uses `VideoPlayer` plus structured data—when swapping the asset, update the Cloudinary `src`, poster, and metadata inside `PricingSection`.
- Clients are rendered via `components/home/ClientsRail.tsx` to keep the same scroller behavior and the “view case studies” link.

## Checkout (`app/checkout/*/page.tsx`)
- Launch, Grow, and Scale checkout pages are intentionally **noindex/no-follow** and excluded from the sitemap.
- Keep canonical URLs set, but avoid adding these routes to marketing navs or sitemap entries.

## Dental Pricing (`app/pricing-dental/client-page.tsx`)
- Plan definitions live in `dentalPlans`; keep prices and product images aligned with what's shown on the page so Merchant listing structured data stays valid.

## Websites (`app/websites/page.tsx`)
- Includes hero, founder VSL, benefits, showcases, vertical playbooks, FAQs, SEO copy, and service schema.
- The VSL near the hero is the canonical marketing video (reused on `/ai-website-launch`); changes here should propagate to any page referencing the same clip.

## Apps (`app/apps/page.tsx`)
- Mobile app portfolio + process overview.
- Uses `ItemList` JSON-LD for the showcased projects; avoid `SoftwareApplication` rich-result schema unless we can supply accurate pricing + reviews/ratings.
- `metadata.title` is combined with the root title template, so keep it free of `| prism` to avoid duplicate “| prism | prism” titles.

## Software (`app/software/page.tsx`)
- Growth tools hub listing Prism-built software (currently Density, Hot Content, and Engineering Tracker).
- App card data is shared via `lib/software-apps.ts` (including Lordicon animation config for the card icons); update this list to keep the homepage section and `/software` in sync.

## Podcast (`app/podcast/page.tsx`)
- Podcast hub + recent episode preview cards.
- Uses `PodcastSeriesSchema` plus `PodcastEpisodeSchema` (with nested `VideoObject` metadata). Keep episode publish dates, YouTube URLs, and thumbnails up to date so Video structured data stays valid.

## Dental Website (`app/dental-website/page.tsx`)
- Dentist-focused website page targeting “dentist website design”.
- Includes `ServiceSchema` plus FAQ structured data (via `FAQSchema`) and cross-links into the dental SEO and ads funnels.
- Aliases in `next.config.mjs` (redirect to `/dental-website`): `/dentist-website-design`, `/dental-website-design`, `/dental-clinic-website-design`.

## Free Analysis (`app/free-analysis/page.tsx`)
- Minimal layout: hero card + deliverables card + `FreeAnalysisForm`.
- Update copy here when the offer changes.

## Contact (`app/contact/page.tsx`)
- Simple hero, form card, kickoff-call button, and contact info.
- Uses `ContactForm` for all validation/submission logic.

## Structured data (global)
- `app/layout.tsx` injects `GlobalSchemaGraph` from `components/schema-markup.tsx` (Organization, WebSite, LocalBusiness).
- `components/breadcrumbs.tsx` emits `BreadcrumbList` JSON-LD with canonical URLs.

## Homepage (`app/client-page.tsx`)
- The hero proof strip uses `HeroReviewSliderCard` (`components/home/HeroReviewSliderCard.tsx`) with two curated quotes and the “250+ more” CTA kept above the fold.
- Hero copy, service strip, and CTAs live in `app/client-page.tsx` with CTA tracking in `components/home/HeroCtas.tsx`.
- The hero client logo circles use click/tap tooltips; keep the label text in `HERO_CLIENT_ICONS` aligned with the logos.
- Hero benefit cards are rendered by `components/home/HeroBenefits.tsx`, including randomized Lordicon variants on each load for the “more customers”, “Higher Customer LTV”, and “spend less time on tech” tiles.
- The hero section uses `HERO_SECTION_CLASSES` in `app/client-page.tsx` to center its content in the viewport while accounting for the sticky header height and safe-area insets.
- Homepage sections use full-screen spacing (`SECTION_SPACING` in `app/client-page.tsx` plus the matching padding in `components/home/WallOfLoveCarousel.tsx`) so each section reads as its own viewport.
- The Search Console snapshots section below the hero uses `components/home/SearchConsoleSnapshotsRail.tsx` (native scroll-snap rail with lightweight arrow controls for desktop); keep it touch-first with subtle progress bars under the rail.
- Mobile hero spacing between the CTA stack and the Search Console slider is controlled by the grid `gap` on the hero container; keep it roomy on sub-640px screens.
- The Apps developed by Prism section (tools cards + outbound links) lives under the hero and above the training section.
- Testimonial copy for the proof strip lives in `content/wall-of-love-data.tsx`; adjust `HERO_PRIORITY_IDS` to control the surfaced quotes.
- The impact graph section below the hero is `components/home/ImpactGraphSection.tsx`, which lazy-mounts `FounderImpactGraph` so Recharts only loads when near the viewport.
- The Wall of Love slider uses `components/home/WallOfLoveCarousel.tsx` and a native scroll-snap rail (no Embla); adjust the quote pool via `pinned` / `heroSpotlight` in `content/wall-of-love-data.tsx`.

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
- High-conversion landing page for ads traffic. Sections include hero, founder VSL, pains, how-it-works, deliverables, clients carousel, comparison table, optional-upgrade CTA, and the Formspree intake.
- The VSL (`VideoPlayer`) lives immediately after the hero; reuse the same video + schema props that `/websites` uses when marketing needs a consistent message.
- The inline intake form lives in `components/ai-website-launch/AiWebsiteLaunchForm.tsx`; it uses `useFormValidation` with Formspree `fetch`, redirects to `/thank-you`, and tracks submissions via `trackFormSubmission`.
- CTA links on the page use `components/tracked-anchor.tsx` so analytics fire without making the page a full client component.
- The “Our Clients” carousel reuses `components/home/ClientsRail.tsx`, so updates to the shared rail automatically propagate here.
- Use this page as the reference when building future paid-traffic landers that need bespoke layout but the shared analytics + form wiring.

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
- Uses `VideoPlayer` for the founder message plus the Olympic journey carousel, mission section, and CTA.
- The video block tracks visibility via `trackVideoInteraction`; keep that instrumentation intact when editing.

## Supporting Components
- `components/reveal-on-scroll.tsx`: lightweight framer-motion wrapper used across marketing sections.
- `components/forms/*`: shared form components noted in [forms.md](./forms.md).
- `components/video-player.tsx`: shared CTA/VSL embed with structured-data support. Pass poster + schema props so every marketing video emits valid `VideoObject` JSON-LD.

Keeping these files tidy makes copy refreshes and landing-page experiments fast.
