import { PRISM_PRIMARY_LOGO } from "@/lib/logo-assets"

// Google Analytics configuration
const FALLBACK_GA_MEASUREMENT_ID = "G-P9VY77PRC0"

const envMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()

export const GA_MEASUREMENT_ID = envMeasurementId && envMeasurementId.length > 0 ? envMeasurementId : FALLBACK_GA_MEASUREMENT_ID
export const IS_ANALYTICS_ENABLED = process.env.NODE_ENV === "production" && Boolean(GA_MEASUREMENT_ID)
export const GOOGLE_ADS_ID = "AW-11373090310"

// Logo configuration
export const LOGO_CONFIG = {
  src: PRISM_PRIMARY_LOGO.src,
  fallbackSrc: PRISM_PRIMARY_LOGO.fallbackSrc,
  alt: PRISM_PRIMARY_LOGO.alt,
  className: PRISM_PRIMARY_LOGO.className,
}

// Logo sizes for different use cases
export const LOGO_SIZES = {
  navbar: { width: 48, height: 48 },
  footer: { width: 64, height: 64 },
  hero: { width: 96, height: 96 },
  large: { width: 128, height: 128 },
  small: { width: 40, height: 40 },
} as const 

export const FREE_AUDIT_CTA_TEXT = "Get started"

// New primary navigation structure
export type NavChild = { label: string; href: string }
export type NavItem = { label: string; href?: string; children?: NavChild[]; emoji?: string }

// Updated primary navigation to required structure
export const NAV_ITEMS: NavItem[] = [
  { label: "home", href: "/" },
  { label: "our story", href: "/about" },
  { label: "software", href: "/software" },
  { label: "case studies", href: "/case-studies" },
  { label: "wall of love", href: "/wall-of-love" },
  { label: "start", href: "/get-started" },
]
