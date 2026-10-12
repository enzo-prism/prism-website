# Image Migration Guide

This file is historical context, not a blanket instruction to rewrite every image import.

## Current rule

Prism currently has two valid image patterns:

- Use `next/image` directly for route-local imagery, client screenshots (including `BrowserFrame` / `PhoneFrame`), logos, and decorative assets. This is the default on the redesigned marketing surfaces.
- Use `components/core-image.tsx` (`CoreImage`) where a surface needs Prism's loading placeholder, fallback source, and image-failure analytics (today: `components/scrolling-timeline.tsx` on `/about`).

The old `components/image.tsx` wrapper was deleted in the 2026-10 redesign.

## Do not do this anymore

Do not run a broad migration that blindly swaps image components across the repo. Change an image component only when you are already touching that surface for a real bug or performance issue.

## Before changing image components

1. Check the existing call site and the route's visual requirements.
2. Confirm any remote host is allowed in `next.config.mjs`.
3. Preserve width/height or parent aspect-ratio constraints to avoid layout shift.
4. Keep alt text useful and human-readable.
5. Update `docs/image-best-practices.md` or `docs/image-configuration.md` if the image policy changes.
