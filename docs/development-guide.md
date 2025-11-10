# Prism Development Guide

This guide highlights the workflows we lean on most often while iterating on the marketing site. Use it as the quick reference when shipping copy tweaks, adding new landing sections, or wiring forms.

## Local Development
- Install deps with `pnpm install` (repo assumes pnpm).
- Start the Next.js dev server with `pnpm dev`.
- Run `pnpm lint` before committing so the shared Tailwind + ESLint rules stay consistent.

## Formspree Integration
All marketing forms live under `components/forms/` (Contact, Free Analysis, Get Started) and share the `useFormValidation` hook. The new AI Website Launch landing page keeps its form in `app/ai-website-launch/client-page.tsx`, but mirrors the exact same submission pattern (client-side `fetch`, `Accept: application/json`, and redirect to `/thank-you`).

Key details:
- Forms post to Formspree via `fetch` with `Accept: application/json`. On success we push the user to `/thank-you` or `/analysis-thank-you` so our custom screens always render.
- Use the `_subject` hidden field for inbox filtering and `_gotcha` as the honeypot.
- When adding a new Formspree endpoint, import `useFormValidation({ onValidSubmit })` and only navigate after the request returns `response.ok`.

## Thank-You Screens
Custom confirmation routes live in `app/thank-you/` and `app/analysis-thank-you/`. Each page is a simple card layout (hero card, CTA card, contact info). If you add new flows, point them to one of these routes for consistency.

### Analytics & Conversion Tracking
- Global Google Analytics + Google Ads tagging happens in `app/layout.tsx`. Both IDs come from `lib/constants.ts` (`GA_MEASUREMENT_ID` and `GOOGLE_ADS_ID`), so set `NEXT_PUBLIC_GA_MEASUREMENT_ID` if you need to override the fallback GA property.
- Any route-level conversion (e.g., `/thank-you`) should load its own `<Script>` that fires the relevant `gtag('event', 'conversion', { send_to: 'AW-…' })`. See `app/thank-you/page.tsx` for the exact snippet tied to `AW-11373090310/hBMrCMijk70bEIasjq8q`.
- When building a new landing page with a Formspree form, make sure the success handler navigates to `/thank-you` so the Ads conversion snippet runs and the GA pageview records properly.

## Pricing Page Content
- Pricing UI is in `app/pricing/client-page.tsx`.
- Hero copy, tier descriptions, "Website Use Cases", and the new handoff section are all co-located for easy edits.
- When introducing a new section, wrap it with `RevealOnScroll` helpers for consistent motion.

## Free Analysis & Contact Pages
- `/free-analysis` and `/contact` are intentionally minimal (hero, form card, CTA).
- Copy updates happen directly in `app/free-analysis/page.tsx` and `app/contact/page.tsx`.
- Both pages reuse the shared forms mentioned above, so field changes only need to happen once.

## CTA Routing
Any CTA labeled “free analysis” should point to `/free-analysis`. When you add a new CTA, double-check the href so we don’t regress to `/get-started` accidentally.

## Typography & Casing
- The global stylesheet forces the brand’s lowercase aesthetic via `body { text-transform: lowercase !important; }`.
- Pages that need natural capitalization should wrap their content in `.allow-capitalization` (e.g., `<main className="allow-capitalization ...">`) which resets `text-transform` to `none`.
- This override is scoped, so you can mix lowercase-first sections with standard sentences without touching the global rule.

## Deployment
Merges to `main` deploy automatically via Vercel. If you need a preview, open a PR – the CI pipeline will comment with the URL.
