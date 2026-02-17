# Prism Development Guide

This guide highlights the workflows we lean on most often while iterating on the marketing site. Use it as the quick reference when shipping copy tweaks, adding new landing sections, or wiring forms.

## Local Development

- Install deps with `pnpm install` (repo assumes pnpm).
- Start the Next.js dev server with `pnpm dev`.
- Run `pnpm lint` before committing so the shared Tailwind + ESLint rules stay consistent.
- Run `pnpm test:visual` before merging changes that touch the UI of `/`, `/about`, or `/pricing` (screenshot-locked routes).
- Run `pnpm exec playwright test __tests__/visual/blog-copy-markdown.spec.ts --project=desktop-chromium` when changing the blog markdown copy button or `/api/blog/[slug]/markdown`.

## Styling Pipeline

- Tailwind v4 runs through the `@tailwindcss/postcss` plugin, with `@import "tailwindcss";` and `@config "../tailwind.config.cjs";` in `app/globals.css`.
- To safelist utilities, use `@source inline(...)` in `app/globals.css` (the `safelist` config option is no longer supported).

## Linting

- ESLint uses the flat config in `eslint.config.js` (Next 16 removed `next lint`).

## Formspree Integration

All marketing forms live under `components/forms/` (Contact, Free Analysis, Get Started) and share the `useFormValidation` hook. The AI Website Launch form lives in `components/ai-website-launch/AiWebsiteLaunchForm.tsx` (embedded in `app/ai-website-launch/client-page.tsx`) and follows the same submission pattern (client-side `fetch`, `Accept: application/json`, and redirect to `/thank-you`).

Key details:

- Forms post to Formspree via `fetch` with `Accept: application/json`. On success we push the user to `/thank-you` or `/analysis-thank-you` so our custom screens always render.
- Use the `_subject` hidden field for inbox filtering and `_gotcha` as the honeypot.
- When adding a new Formspree endpoint, import `useFormValidation({ onValidSubmit })` and only navigate after the request returns `response.ok`.

## Thank-You Screens

Custom confirmation routes live in `app/thank-you/` and `app/analysis-thank-you/`. Each page is a simple card layout (hero card, CTA card, contact info). If you add new flows, point them to one of these routes for consistency.

## SEO Hygiene

- Route-level metadata should use `buildRouteMetadata` from `lib/seo/metadata.ts` so titles, descriptions, canonical URLs, Open Graph, Twitter, and robots directives stay consistent.
- Titles are normalized to a single `| Prism` suffix (no duplicate suffix chains); descriptions are normalized with shared rules in `lib/seo/rules.ts`.
- Use absolute canonicals (`https://www.design-prism.com/...`) for every indexable route.
- Noindex routes should remain crawlable (meta `robots`), but **must be excluded** from the sitemap via `app/sitemap.ts`.
- `/blog` filter/search views (`/blog?category=...`, `/blog?q=...`) are set to **noindex, follow** via `X-Robots-Tag` in `proxy.ts` so query-param URLs don’t pollute the index.
- If a blog post `image` frontmatter uses an absolute Prism URL (e.g. `https://www.design-prism.com/...`), we normalize it for Next/Image. Prefer relative paths like `/api/og/...` or `/blog/...` for consistency.
- Blog cards and post hero images now validate frontmatter `image` values at read time. If the file is missing, uses an invalid sentinel (`null`/`undefined`/empty), or points to a raster extension whose asset is actually SVG markup, posts now fall back to the shared default featured image (`https://res.cloudinary.com/dhqpqfw6w/image/upload/v1770786137/Prism_rgeypo.png`) instead of rendering a broken image.
- Blog posts can define `seoTitle` and `seoDescription` in frontmatter for manual snippet control; if omitted, metadata falls back to `title`/`description` with shared normalization.
- Keep `/api/og/` **allowed** in `app/robots.ts` if we use OG endpoints in metadata or structured data.
- Prefer the shared JSON-LD helpers in `components/schema-markup.tsx` (`WebPageSchema`, `CollectionPageSchema`, `ItemListSchema`, `ServiceSchema`, `FAQSchema`, etc.).
- Every indexable page must render a visible `<h1>` that matches the primary search intent.
- Run `pnpm seo:inventory && pnpm seo:lint` before shipping large metadata changes.

### Analytics & Conversion Tracking

- Global Google Analytics + Google Ads tagging happens in `app/layout.tsx`. Both IDs come from `lib/constants.ts` (`GA_MEASUREMENT_ID` and `GOOGLE_ADS_ID`), so set `NEXT_PUBLIC_GA_MEASUREMENT_ID` if you need to override the fallback GA property.
- Any route-level conversion (e.g., `/thank-you`) should load its own `<Script>` that fires the relevant `gtag('event', 'conversion', { send_to: 'AW-…' })`. See `app/thank-you/page.tsx` for the exact snippet tied to `AW-11373090310/hBMrCMijk70bEIasjq8q`.
- When building a new landing page with a Formspree form, make sure the success handler navigates to `/thank-you` so the Ads conversion snippet runs and the GA pageview records properly.

## Pricing Page Content

- Pricing UI is in `app/pricing/client-page.tsx` with the hero modal split into `components/pricing/PricingHero.tsx`.
- Hero copy, tier descriptions, "Website Use Cases", and the new handoff section are all co-located for easy edits.
- When introducing a new section, wrap it with `RevealOnScroll` helpers for consistent motion.

## Free Analysis & Contact Pages

- `/free-analysis` and `/contact` are intentionally minimal (hero, form card, CTA).
- Copy updates happen directly in `app/free-analysis/page.tsx` and `app/contact/page.tsx`.
- Both pages reuse the shared forms mentioned above, so field changes only need to happen once.

## CTA Routing

Any CTA labeled “free analysis” should point to `/free-analysis`. When you add a new CTA, double-check the href so we don’t regress to `/get-started` accidentally.

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

The navbar dynamically sets a CSS variable (`--prism-header-height`) so other sticky UI can position itself below the full header stack (including case study breadcrumbs). Case study chapter menus also set `--prism-case-study-nav-height` via `useCaseStudyStickyNavHeight` (see `hooks/use-case-study-sticky-nav.ts`), and jump targets rely on `scroll-margin-top` for correct offsets when scrolling into view. The case study section nav now uses a scrollable pill row plus a mobile "jump to" sheet so all items stay reachable on small screens.

## Navbar Icon Hover Motion

- Navbar icons animate and tint on hover via the `.nav-link` + `.nav-icon` classes in `components/navbar.tsx` and the motion rules in `app/globals.css`.
- Primary nav labels (including `blog`) are defined in `lib/constants.ts` (`NAV_ITEMS`); when you add/remove an item, update `topIconMap` in `components/navbar.tsx` and add/remove the matching `.nav-icon-*` hover rule in `app/globals.css`.
- Keep hover effects transform-only (plus icon color) and subtle so text layout stays stable and reduced-motion preferences remain respected.

## Deployment

Merges to `main` deploy automatically via Vercel. If you need a preview, open a PR – the CI pipeline will comment with the URL.
