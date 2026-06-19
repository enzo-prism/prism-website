export type SearchVisibility = "index" | "noindex"

export const INDEXABLE_STATIC_ROUTES = [
  "/",
  "/about",
  "/pricing",
  "/contact",
  "/faq",
  "/get-started",
  "/apply",
  "/free-analysis",
  "/services",
  "/websites",
  "/founder-os",
  "/ads",
  "/local-listings",
  "/seo",
  "/seo/audit",
  "/ai-seo-services",
  "/aeo",
  "/proof",
  "/wall-of-love",
  "/case-studies",
  "/blog",
  "/privacy-policy",
  "/terms-of-service",
  "/why-dental-practices-love-prism",
  "/dental-website",
  "/dental-practice-seo-expert",
  "/custom-email-for-dental-practices",
  "/dental-photography",
  "/dental-photography/before-after",
  "/dental-photography/office-team",
  "/book-a-shoot",
  "/google/dental-ads",
  "/google/dental-patient-forms",
  "/facebook-ads-for-dentists",
  "/tiktok-ads-for-dentists",
  "/ai-agents/dental",
] as const

export const NOINDEX_ROUTES = [
  "/analysis-thank-you",
  "/aeo-thank-you",
  "/ai",
  "/ai-agents",
  "/ai-website-launch",
  "/apps",
  "/book-a-shoot/thank-you",
  "/google",
  "/growth",
  "/hottest-content",
  "/ig",
  "/local-seo-agency",
  "/local-seo-services",
  "/models",
  "/one-time-fee",
  "/pricing-dental",
  "/pricing/thank-you",
  "/prism-flywheel",
  "/refer",
  "/replit",
  "/scholarship",
  "/seo/off-page",
  "/seo/on-page",
  "/smb",
  "/software",
  "/story",
  "/thank-you",
  "/thanks",
  "/thanks-call",
  "/tiktok",
  "/why-consulting-companies-love-prism",
  "/why-local-shop-owners-love-prism",
  "/why-nonprofits-love-prism",
  "/why-online-community-founders-love-prism",
  "/youtube",
] as const

export const NOINDEX_PREFIXES = [
  "/careers",
  "/checkout",
  "/designs",
  "/library",
  "/offers",
  "/openai",
  "/podcast",
] as const

export const INDEXABLE_BLOG_SLUGS = [
  "ai-effortlessly-welcome-more-patients-dental-practice",
  "ai-rip-eyes-out-dental-software",
  "ai-search-for-dental-practice",
  "business-visibility-chatgpt",
  "claude-opus-4-8-what-it-means-for-small-business-owners",
  "content-that-converts-give-away-secrets-sell-implementation",
  "dental-practice-1-3m-swamp",
  "dental-practice-rank-higher-google-search",
  "dental-seo-guide",
  "dental-website-cost-guide-2026",
  "dentist-website-design-checklist",
  "facebook-ads-for-dentists-playbook",
  "from-6-impressions-to-hundreds-seo-journey",
  "from-broken-to-beautiful-dental-website-transformation",
  "from-one-video-to-seo-flywheel",
  "future-of-seo-ai-search",
  "generate-thousands-leads-without-more-ads",
  "google-ads-ai-smb-acquisition-playbook",
  "google-ads-destination-not-working",
  "google-ads-health-personalized-warning",
  "google-ai-search-revolution-small-business",
  "google-io-2026-ai-search-small-business-playbook",
  "google-maps-visibility-playbook-2025",
  "gpt-5-1-codex-test-dentist-website",
  "gpt-5-2-vs-gpt-5-1-codex-max-dentist-website",
  "how-i-ranked-1-google-24-hours-claude-code",
  "how-to-choose-local-seo-agency",
  "how-to-choose-seo-consultant-for-dentists",
  "how-to-rank-1-chatgpt",
  "impossible-seo-bug-claude-code",
  "modern-reviews-strategy-2025",
  "new-rules-of-visibility-ai-seo",
  "prism-approach-small-business-growth",
  "prism-flywheel-skyrocket-brick-and-mortar-growth",
  "riding-the-ai-wave",
  "seo-mystery-beverly-hills-dentist-traffic-from-china",
  "turning-your-website-into-an-ai-powered-seo-flywheel",
  "who-prism-is-for",
  "winning-ai-search-game",
] as const

const INDEXABLE_STATIC_ROUTE_SET = new Set<string>(INDEXABLE_STATIC_ROUTES)
const NOINDEX_ROUTE_SET = new Set<string>(NOINDEX_ROUTES)
const INDEXABLE_BLOG_SLUG_SET = new Set<string>(INDEXABLE_BLOG_SLUGS)

function normalizePathname(pathOrUrl: string): string {
  try {
    const url = new URL(pathOrUrl, "https://www.design-prism.com")
    const normalized = url.pathname.replace(/\/+$/, "")
    return normalized || "/"
  } catch {
    const [withoutQuery] = pathOrUrl.split(/[?#]/, 1)
    const normalized = withoutQuery.replace(/\/+$/, "")
    return normalized.startsWith("/") ? normalized || "/" : `/${normalized}`
  }
}

function hasPrefix(pathname: string, prefixes: readonly string[]): boolean {
  return prefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

export function isRouteIndexable(pathOrUrl: string): boolean {
  const pathname = normalizePathname(pathOrUrl)

  if (NOINDEX_ROUTE_SET.has(pathname)) return false
  if (hasPrefix(pathname, NOINDEX_PREFIXES)) return false

  if (pathname.startsWith("/case-studies/")) return true

  return INDEXABLE_STATIC_ROUTE_SET.has(pathname)
}

export function getRouteSearchVisibility(pathOrUrl: string): SearchVisibility {
  return isRouteIndexable(pathOrUrl) ? "index" : "noindex"
}

export function getBlogSearchVisibility(
  slug: string,
  frontmatterVisibility?: unknown,
): SearchVisibility {
  if (frontmatterVisibility === "index") return "index"
  if (frontmatterVisibility === "noindex") return "noindex"
  return INDEXABLE_BLOG_SLUG_SET.has(slug) ? "index" : "noindex"
}

export function isBlogPostIndexable(
  slug: string,
  frontmatterVisibility?: unknown,
): boolean {
  return getBlogSearchVisibility(slug, frontmatterVisibility) === "index"
}
