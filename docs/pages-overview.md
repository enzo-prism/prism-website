# Key Marketing Pages

Quick reference for the pages we edit most often.

## Pricing (`app/pricing/client-page.tsx`)
- Hero copy, pricing tiers, “Website Use Cases”, and the handoff section all live here.
- When adding new sections, wrap blocks with `RevealOnScroll` and keep copy short.

## Free Analysis (`app/free-analysis/page.tsx`)
- Minimal layout: hero card + deliverables card + `FreeAnalysisForm`.
- Update copy here when the offer changes.

## Contact (`app/contact/page.tsx`)
- Simple hero, form card, kickoff-call button, and contact info.
- Uses `ContactForm` for all validation/submission logic.

## Thank-you routes
- `app/thank-you/page.tsx`
- `app/analysis-thank-you/page.tsx`

Each uses card-based layouts: confirmation message + kickoff-call CTA + contact details. When adding new forms, reuse one of these routes for consistency.

## AI Website Launch (`app/ai-website-launch/client-page.tsx`)
- High-conversion landing page for ads traffic. Sections include hero, pains, how-it-works, deliverables, clients carousel, comparison table, optional-upgrade CTA, and the Formspree intake.
- The form lives inline on this page (not under `components/forms/`); it posts to Formspree via `fetch`, redirects to `/thank-you`, and tracks CTA clicks/form submissions through `trackCTAClick` / `trackFormSubmission`.
- The “Our Clients” carousel reuses `components/home/ClientsRail.tsx`, so updates to the shared rail automatically propagate here.
- Use this page as the reference when building future paid-traffic landers that need bespoke layout but the shared analytics + form wiring.

## Supporting Components
- `components/reveal-on-scroll.tsx`: lightweight framer-motion wrapper used across marketing sections.
- `components/forms/*`: shared form components noted in [forms.md](./forms.md).

Keeping these files tidy makes copy refreshes and landing-page experiments fast.
