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

export const NAV_ITEMS: NavItem[] = [
  { label: "order", href: "/websites" },
  { label: "content os", href: "/content-os" },
  { label: "dental os", href: "/dental-os" },
  { label: "prism infinity", href: "/prism-infinity" },
  { label: "pricing", href: "/pricing" },
  { label: "get started", href: "/get-started" },
  { label: "contact", href: "/contact" },
]
