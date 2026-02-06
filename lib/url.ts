export const CANONICAL_ORIGIN = "https://www.design-prism.com"

/**
 * Convert a relative path (e.g. `/foo`) into an absolute URL on the canonical origin.
 * If `input` is already an absolute URL (including external domains), it is preserved.
 */
export function toAbsoluteUrl(input: string, base: string = CANONICAL_ORIGIN): string {
  try {
    return new URL(input, base).toString()
  } catch {
    // Fallback: best-effort join to the canonical origin.
    const safe = typeof input === "string" ? input : ""
    if (safe.startsWith("/")) return `${CANONICAL_ORIGIN}${safe}`
    return `${CANONICAL_ORIGIN}/${safe}`
  }
}

/**
 * If `input` is an absolute URL on our own domain (`www.design-prism.com` or `design-prism.com`),
 * convert it into a local path (`/path?query#hash`) so Next/Image treats it as a local asset.
 * Otherwise returns `input` unchanged.
 */
export function toLocalPathIfSameOrigin(input: string): string {
  try {
    const url = new URL(input)
    if (url.hostname === "www.design-prism.com" || url.hostname === "design-prism.com") {
      return `${url.pathname}${url.search}${url.hash}`
    }
    return input
  } catch {
    return input
  }
}

