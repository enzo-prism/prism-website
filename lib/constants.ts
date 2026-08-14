// Google Analytics configuration
const FALLBACK_GA_MEASUREMENT_ID = "G-P9VY77PRC0"

const envMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()

export const GA_MEASUREMENT_ID = envMeasurementId && envMeasurementId.length > 0 ? envMeasurementId : FALLBACK_GA_MEASUREMENT_ID

// Only the real production environment should report analytics. On Vercel,
// preview deployments also build with NODE_ENV === "production", so gating on
// NODE_ENV alone leaks preview/QA traffic — and real Google Ads lead
// conversions — into the live property. NEXT_PUBLIC_VERCEL_ENV is exposed by
// Vercel as "production" | "preview" | "development"; off Vercel it is unset,
// so we fall back to NODE_ENV (keeps local `next build` and the test suite
// behaving as before).
const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV
export const IS_PRODUCTION_ENV = vercelEnv
  ? vercelEnv === "production"
  : process.env.NODE_ENV === "production"

export const IS_ANALYTICS_ENABLED = IS_PRODUCTION_ENV && Boolean(GA_MEASUREMENT_ID)

/**
 * Hostnames that must never report analytics, checked at runtime in the browser.
 *
 * The NODE_ENV fallback above is true for a local `pnpm build && pnpm start`,
 * which is the normal way to reproduce a production bug. That meant every local
 * production run sent real hits to the live GA4 property and fired real Google
 * Ads page views. It was not theoretical: `localhost` was 30% of pageviews on
 * the Prism Website property and 25% on a client's, which is the kind of noise
 * that quietly distorts every engagement and conversion-rate number.
 *
 * Build-time env alone cannot catch this, because the offending build IS a
 * production build. Only the request's hostname can.
 */
const NON_REPORTING_HOSTNAMES = new Set([
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '::1',
])

export function isAnalyticsReportingHost(hostname?: string): boolean {
  const host = (
    hostname ?? (typeof window === 'undefined' ? '' : window.location.hostname)
  )
    .trim()
    .toLowerCase()

  if (!host) return false
  if (NON_REPORTING_HOSTNAMES.has(host)) return false
  // Private LAN addresses used for device testing (phones hitting the dev box).
  if (/^(10|192\.168|172\.(1[6-9]|2\d|3[01]))\./.test(host)) return false
  if (host.endsWith('.local')) return false
  return true
}
export const GOOGLE_ADS_ID = "AW-11373090310"
export const GOOGLE_ADS_LEAD_CONVERSION_SEND_TO = `${GOOGLE_ADS_ID}/hBMrCMijk70bEIasjq8q`

// A lead and a completed $300 purchase are different business events, so they
// need different Google Ads conversion actions — otherwise Smart Bidding
// cannot tell "asked a question" from "paid". The purchase label has to be
// created in the Google Ads UI (Goals > Conversions > New conversion action >
// Website > Purchase), then set here via env. Until it is set, the GA4
// `purchase` event still fires; only the Ads-side conversion is skipped.
const purchaseConversionLabel =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL?.trim()
export const GOOGLE_ADS_PURCHASE_CONVERSION_SEND_TO =
  purchaseConversionLabel && purchaseConversionLabel.length > 0
    ? `${GOOGLE_ADS_ID}/${purchaseConversionLabel}`
    : ""

// Logo configuration
export const LOGO_CONFIG = {
  src: "/prism-logo.jpeg",
  fallbackSrc: "/prism-logo.jpeg",
  alt: "Prism logo",
  // Consistent corner radius class for all logo instances
  className: "rounded-lg", // This applies an 8px border-radius
}

// Logo sizes for different use cases
export const LOGO_SIZES = {
  navbar: { width: 48, height: 48 },
  footer: { width: 64, height: 64 },
  hero: { width: 96, height: 96 },
  large: { width: 128, height: 128 },
  small: { width: 40, height: 40 },
} as const 

export const FREE_AUDIT_CTA_TEXT = "Get a free growth audit"

export type NavItem = { label: string; href: string }

// Flat nav (2026-07-27 redesign): the four offers, the two proof surfaces,
// and contact — nothing else. No "more" dropdown and no "Order now" CTA
// button; /pricing and /get-started left the top nav (both stay reachable
// via footer, homepage callout, and offer pages).
export const NAV_ITEMS: NavItem[] = [
  { label: "websites", href: "/websites" },
  { label: "content os", href: "/content-os" },
  { label: "dental os", href: "/dental-os" },
  { label: "prism infinity", href: "/prism-infinity" },
  { label: "wall of love", href: "/wall-of-love" },
  { label: "case studies", href: "/case-studies" },
  { label: "contact", href: "/contact" },
]

// Desktop renders three hairline-divided groups: offers | proof | contact.
const PROOF_NAV_HREFS = new Set(["/wall-of-love", "/case-studies"])

export const OFFER_NAV_ITEMS: NavItem[] = NAV_ITEMS.filter(
  (item) => !PROOF_NAV_HREFS.has(item.href) && item.href !== "/contact",
)

export const PROOF_NAV_ITEMS: NavItem[] = NAV_ITEMS.filter((item) =>
  PROOF_NAV_HREFS.has(item.href),
)

export const CONTACT_NAV_ITEM: NavItem = { label: "contact", href: "/contact" }

// Primary lead-capture entry for the Website offer (2026-08-05). The focused
// intake funnel is the site's main conversion push, so it gets a distinct CTA
// button in the navbar rather than a quiet rail link.
export const WEBSITE_INTAKE_PATH = "/website-intake"
export const WEBSITE_INTAKE_NAV_ITEM: NavItem = {
  label: "get a website",
  href: WEBSITE_INTAKE_PATH,
}
