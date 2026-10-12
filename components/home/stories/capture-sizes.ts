/**
 * Intrinsic pixel sizes of the full-page captures in
 * public/case-studies/scroll/ (read with PIL on 2026-10-12). They size the
 * next/image boxes before load and pace the in-frame browse loop. The loop
 * itself measures the real image (translate -100% + 100cqh), so a re-capture
 * with a different height still scrolls exactly to the bottom.
 */
export type CaptureSize = { width: number; height: number }

const CAPTURE_SIZES: Record<string, CaptureSize> = {
  '/case-studies/scroll/exquisite-dentistry-desktop.webp': {
    width: 1280,
    height: 3626,
  },
  '/case-studies/scroll/exquisite-dentistry-mobile.webp': {
    width: 600,
    height: 7557,
  },
  '/case-studies/scroll/canary-cove-desktop.webp': {
    width: 1280,
    height: 3361,
  },
  '/case-studies/scroll/canary-cove-mobile.webp': { width: 600, height: 7474 },
  '/case-studies/scroll/practice-transitions-institute-desktop.webp': {
    width: 1280,
    height: 3740,
  },
  '/case-studies/scroll/practice-transitions-institute-mobile.webp': {
    width: 600,
    height: 7326,
  },
  '/case-studies/scroll/olympic-bootworks-desktop.webp': {
    width: 1280,
    height: 3143,
  },
  '/case-studies/scroll/olympic-bootworks-mobile.webp': {
    width: 600,
    height: 7717,
  },
  '/case-studies/scroll/roseville-dental-academy-desktop.webp': {
    width: 1280,
    height: 3375,
  },
  '/case-studies/scroll/roseville-dental-academy-mobile.webp': {
    width: 600,
    height: 8026,
  },
}

/** Typical sizes for a capture that is not in the table yet. */
const FALLBACK: Record<'desktop' | 'mobile', CaptureSize> = {
  desktop: { width: 1280, height: 3500 },
  mobile: { width: 600, height: 7500 },
}

export function getCaptureSize(
  src: string,
  kind: 'desktop' | 'mobile',
): CaptureSize {
  return CAPTURE_SIZES[src] ?? FALLBACK[kind]
}

/** Frame viewports (height / width): a 16:10 browser and a 390x844 phone
 * screen less its 44px status bar. */
export const VIEWPORT_RATIO = { desktop: 10 / 16, mobile: 800 / 390 } as const

/**
 * Loop length for a capture: a fixed beat for the holds plus time per screen
 * of travel, so a long page is browsed at the same reading pace as a short
 * one. Desktop and phone use different paces so the two frames drift apart
 * like two people browsing.
 */
export function getBrowseDuration(
  size: CaptureSize,
  kind: 'desktop' | 'mobile',
): number {
  const screens = Math.max(
    0,
    size.height / size.width / VIEWPORT_RATIO[kind] - 1,
  )
  const perScreen = kind === 'desktop' ? 4.4 : 3.1
  const base = kind === 'desktop' ? 7 : 6
  return Math.round((base + screens * perScreen) * 10) / 10
}
