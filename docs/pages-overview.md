# Key Marketing Pages

Quick reference for the pages we edit most often.

## Pricing (`app/pricing/client-page.tsx`)
- Hero copy, pricing tiers, the founder VSL block, “Website Use Cases”, the handoff section, and footer CTA all live here.
- The video directly under the pricing cards uses `VideoPlayer` plus structured data—when swapping the asset, update the Cloudinary `src`, poster, and metadata inside `PricingSection`.
- Copy was recently repositioned around “clean, high-performing websites” (no AI phrasing). Keep new sections in that voice and continue wrapping blocks with `RevealOnScroll` for consistency.

## Websites (`app/websites/page.tsx`)
- Includes hero, founder VSL, benefits, showcases, vertical playbooks, FAQs, SEO copy, and service schema.
- The VSL near the hero is the canonical marketing video (reused on `/ai-website-launch`); changes here should propagate to any page referencing the same clip.

## Free Analysis (`app/free-analysis/page.tsx`)
- Minimal layout: hero card + deliverables card + `FreeAnalysisForm`.
- Update copy here when the offer changes.

## Contact (`app/contact/page.tsx`)
- Simple hero, form card, kickoff-call button, and contact info.
- Uses `ContactForm` for all validation/submission logic.

## Homepage (`app/client-page.tsx`)
- Animated hero pairs the background video with `HeroReviewSliderCard` (components/home/HeroReviewSliderCard.tsx). The slider pulls curated quotes from `/wall-of-love`, auto-rotates every ~6s, and pauses when hovered or when `prefers-reduced-motion` is enabled. When editing the hero, keep this component intact so the “read 200+ more” CTA remains above the fold.
- A static `<section id="static-home-hero">` in `app/page.tsx` mirrors the hero content for SSR/JS-disabled visitors. Update both files if you change the copy or CTA labels so bots and users see the same messaging.
- All testimonial copy for the slider now lives in `content/wall-of-love-data.tsx`; update that file (and respect the `heroSpotlight` flag) instead of duplicating data inside `app/client-page.tsx`.

## Thank-you routes
- `app/thank-you/page.tsx`
- `app/analysis-thank-you/page.tsx`

Each uses card-based layouts: confirmation message + kickoff-call CTA + contact details. When adding new forms, reuse one of these routes for consistency.

## AI Website Launch (`app/ai-website-launch/client-page.tsx`)
- High-conversion landing page for ads traffic. Sections include hero, founder VSL, pains, how-it-works, deliverables, clients carousel, comparison table, optional-upgrade CTA, and the Formspree intake.
- The VSL (`VideoPlayer`) lives immediately after the hero; reuse the same video + schema props that `/websites` uses when marketing needs a consistent message.
- The form lives inline on this page (not under `components/forms/`); it posts to Formspree via `fetch`, redirects to `/thank-you`, and tracks CTA clicks/form submissions through `trackCTAClick` / `trackFormSubmission`.
- The “Our Clients” carousel reuses `components/home/ClientsRail.tsx`, so updates to the shared rail automatically propagate here.
- Use this page as the reference when building future paid-traffic landers that need bespoke layout but the shared analytics + form wiring.

## Dental Photography surfaces

- `app/dental-photography/page.tsx` – hub hero, overview cards, and CTA stack. Buttons should always point to `/dental-photography/office-team`, `/dental-photography/before-after`, and `/book-a-shoot`.
- `app/dental-photography/office-team/page.tsx` – bookable service page. The recent-shoots slider now lives in `app/dental-photography/office-team/recent-shoots-section.tsx`, which handles the mobile progress bar and optional “visit website” CTA (set via the `website` field on each item). Keep the proof CTA pointing to `/dental-photography/before-after` and the primary buttons to `/book-a-shoot`.
- `app/dental-photography/before-after/page.tsx` – DIY capture guide. Preserve the “jump to the protocol” anchor and the CTA block that links back to `/dental-photography/office-team` so visitors can graduate into the full service.

## Local Listings (`app/local-listings/page.tsx`)
- Hero, benefits grid, platform cards, and the founder VSL render before the audience + FAQ sections.
- The video mirrors the copy on `/websites` but points at the local-listings Cloudinary asset—update the `VideoPlayer` block in this file when you need a new transcript or duration.

## Ads (`app/ads/page.tsx`)
- Same layout pattern as Local Listings: hero, benefits, platforms, audience grid, then the ads-focused founder VSL.
- `VideoPlayer` is imported directly in `app/ads/page.tsx`; keep schema metadata up to date (id, upload date, duration) when swapping clips so Google’s video rich results stay accurate.

## Designs (`app/designs/DesignsPageClient.tsx`)
- The hero, quote slider, CTA blocks, and the founder VSL all live inside the client component.
- The video section appears directly after the hero copy so it inherits the same styling as the `/websites` embed.

## About (`app/about/client-page.tsx`)
- Uses `VideoPlayer` for the founder message plus the Olympic journey carousel, mission section, and CTA.
- The video block tracks visibility via `trackVideoInteraction`; keep that instrumentation intact when editing.

## Supporting Components
- `components/reveal-on-scroll.tsx`: lightweight framer-motion wrapper used across marketing sections.
- `components/forms/*`: shared form components noted in [forms.md](./forms.md).
- `components/video-player.tsx`: shared CTA/VSL embed with structured-data support. Pass poster + schema props so every marketing video emits valid `VideoObject` JSON-LD.

Keeping these files tidy makes copy refreshes and landing-page experiments fast.
