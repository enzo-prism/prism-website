# Image Configuration Guide

This document tracks the image hosts and configuration that are actually supported by the current Prism site.

## Next.js image configuration

Image optimization is configured in `next.config.mjs`.

Current remote hosts:

- `res.cloudinary.com` - Prism media, hero loops, case-study media, and shared marketing assets.
- `wholesale.azdentall.com` - dental equipment/reference images.
- `dentiphoto.com` - dental photography/equipment reference images.
- `dentalaccessories.org` - dental photography/equipment reference images.

Current image settings:

- Formats: WebP and AVIF.
- Qualities: `75` and `90`.
- Long cache TTL for optimized assets.
- SVG is allowed because some legacy/source assets depend on it.

When adding a new remote image source, add a `remotePatterns` entry in `next.config.mjs` and run a local page check where the image renders.

## Component choices

- Use `next/image` directly for simple, route-local media.
- Use `CoreImage` when the surface needs fallback behavior, loading placeholders, or image-failure analytics.
- Avoid introducing another wrapper unless it replaces real duplicated complexity.

See `docs/image-best-practices.md` and `docs/migration-guide.md` before starting image cleanup work.

## Verification

For a normal image/content change:

1. Run `pnpm typecheck`.
2. Run the nearest route/component test if one exists.
3. Open the affected route locally and check desktop + mobile widths.

For config changes:

1. Run `pnpm build`.
2. Verify the affected remote image loads in a production preview (`pnpm start -p <port>`).
3. If the route is screenshot-locked, run the matching visual test.
