# Image Best Practices

Use this guide when adding, replacing, or debugging images on the Prism site.

## Default policy

- Prefer `next/image` for straightforward route-local imagery.
- Use `CoreImage` (`components/core-image.tsx`) when a shared marketing surface needs fallback handling, placeholder behavior, or analytics on image failures.
- Do not use raw `<img>` unless the use case genuinely cannot work with `next/image` or an existing wrapper.
- Do not start broad wrapper migrations from old docs. See `docs/migration-guide.md` first.

## Required basics

Every meaningful image needs:

- descriptive `alt` text, or an empty alt only when the image is purely decorative
- stable `width`/`height`, `fill` with a constrained parent, or an explicit aspect ratio
- a `sizes` prop for responsive images that are not fixed-size icons
- `priority` only for true above-the-fold/LCP imagery
- a fallback or graceful empty state when the image is remote and important to the page

## Current component choices

### `next/image`

Use this for page-specific screenshots, client site visuals, route-local photos, icons, and decorative media when the source is stable.

```tsx
import Image from "next/image"

<Image
  src="/example.jpg"
  alt="Dental practice website screenshot"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### `CoreImage`

Use this for reusable marketing components that benefit from built-in fallback and analytics behavior.

```tsx
import CoreImage from "@/components/core-image"

<CoreImage
  src="/prism-logo.jpeg"
  alt="Prism logo"
  width={40}
  height={40}
  fallbackSrc="/prism-logo.jpeg"
  trackingId="navbar_logo"
  priority
/>
```

## Remote images

Remote hosts must be listed in `next.config.mjs`. The current supported hosts are documented in `docs/image-configuration.md`.

Do not add a new remote host just to avoid moving a durable asset into the repo or Cloudinary. Prefer stable, inspectable media sources for important proof, screenshots, and hero content.

## Case study screenshots

- Each case study renders through `components/case-study-minimal.tsx`, which expects a desktop browser screenshot at `public/case-studies/<slug>-home-desktop.jpg` and an overlapping mobile screenshot at `public/case-studies/<slug>-home-mobile.jpg`.
- The template checks for these files with `fs.existsSync` at render time. If a slug is missing one or both, the page degrades cleanly to a text-only hero — do not commit broken placeholder JPEGs to satisfy the check.
- Generate (or refresh) these assets with `node scripts/capture-case-study-screenshots.mjs [slug ...]`. The script uses Playwright + headless Chromium to capture 1440×900 desktop and 390×844 mobile JPEGs from the `websiteUrl` field of each entry in `lib/case-study-data.ts`. It is idempotent — existing files are skipped unless deleted first.
- The frames themselves (`components/case-studies/CaseStudyVisualHero.tsx`) lock aspect ratios with `aspect-[16/10]` for desktop and `aspect-[9/19]` for mobile, so screenshots cropped to those proportions render without layout shift.
- If a client's domain changes, update `websiteUrl` in `lib/case-study-data.ts`, delete the stale JPEGs from `public/case-studies/`, and re-run the script for just that slug.

## Layout safety

- Keep cards, hero media, sliders, and screenshot frames stable with `aspect-ratio`, explicit dimensions, or fixed grid tracks.
- Avoid image-driven layout shifts on mobile. If an image loads after text, the surrounding section should not jump.
- For carousels, keep item dimensions consistent so slide controls and progress indicators do not move.
- For dark Prism pages, confirm the image still reads against black backgrounds and does not become a muddy low-contrast block.

## Verification

For image-heavy changes, run the narrowest useful checks:

- `pnpm typecheck`
- the nearest route/component test
- local browser check at desktop and mobile widths
- `pnpm build` when `next.config.mjs`, remote hosts, or production image behavior changed

Use `pnpm diagnose:images` only when debugging systemic image issues; many ordinary content changes do not need a full image audit.
