# Image Migration Guide

This file is historical context, not a blanket instruction to rewrite every image import.

## Current rule

Prism currently has three valid image patterns:

- Use `next/image` directly for simple route-local imagery, screenshots, logos, and decorative assets when no custom retry/fallback behavior is needed.
- Use `components/core-image.tsx` (`CoreImage`) for shared marketing surfaces that need Prism's loading placeholder, fallback source, and image-failure analytics.
- Leave existing `components/image.tsx`, `components/optimized-image.tsx`, and `components/enhanced-image.tsx` call sites alone unless you are already touching that surface for a real bug or performance issue.

## Do not do this anymore

Do not run a broad migration that blindly replaces:

```tsx
import CoreImage from "@/components/core-image"
```

with:

```tsx
import Image from "@/components/image"
```

That old advice does not match the current repo. `CoreImage` is still intentionally used by the navbar, case-study cards, blog cards, and older marketing components.

## Before changing image components

1. Check the existing call site and the route's visual requirements.
2. Confirm any remote host is allowed in `next.config.mjs`.
3. Preserve width/height or parent aspect-ratio constraints to avoid layout shift.
4. Keep alt text useful and human-readable.
5. Update `docs/image-best-practices.md` or `docs/image-configuration.md` if the image policy changes.
