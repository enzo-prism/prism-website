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

## Supporting Components
- `components/reveal-on-scroll.tsx`: lightweight framer-motion wrapper used across marketing sections.
- `components/forms/*`: shared form components noted in [forms.md](./forms.md).

Keeping these files tidy makes copy refreshes and landing-page experiments fast.
