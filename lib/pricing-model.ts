export type PricingOfferId = "website_overhaul" | "growth_partnership" | "free_audit"

export type PricingOffer = {
  offerId: PricingOfferId
  name: string
  price: number
  priceCurrency: "USD"
  billingPeriod: "ONE_TIME" | "P1M" | "FREE"
  description: string
  primaryCta: {
    label: string
    href: string
  }
  secondaryCta?: {
    label: string
    href: string
  }
}

export const WEBSITE_OVERHAUL_PRICE = 1000
export const GROWTH_PARTNERSHIP_MONTHLY_PRICE = 2000
export const FREE_AUDIT_PRICE = 0

export const WEBSITE_OVERHAUL_PRICE_LABEL = "$1,000 one-time"
export const GROWTH_PARTNERSHIP_PRICE_LABEL = "$2,000/month"
export const FREE_AUDIT_PRICE_LABEL = "$0"

export const CANONICAL_PRICING_OFFERS: Record<PricingOfferId, PricingOffer> = {
  website_overhaul: {
    offerId: "website_overhaul",
    name: "Website Overhaul",
    price: WEBSITE_OVERHAUL_PRICE,
    priceCurrency: "USD",
    billingPeriod: "ONE_TIME",
    description:
      "A complete rebuild with modern design, conversion-first architecture, technical SEO, analytics setup, and launch support.",
    primaryCta: {
      label: "Book a strategy call",
      href: "/get-started#book-call",
    },
    secondaryCta: {
      label: "Start website overhaul",
      href: "/get-started",
    },
  },
  growth_partnership: {
    offerId: "growth_partnership",
    name: "Growth Partnership",
    price: GROWTH_PARTNERSHIP_MONTHLY_PRICE,
    priceCurrency: "USD",
    billingPeriod: "P1M",
    description:
      "Done-for-you website, design, SEO, and ads execution with a dedicated team focused on measurable growth.",
    primaryCta: {
      label: "Book a strategy call",
      href: "/get-started#book-call",
    },
    secondaryCta: {
      label: "Start growth partnership",
      href: "/get-started",
    },
  },
  free_audit: {
    offerId: "free_audit",
    name: "Free Expert Audit",
    price: FREE_AUDIT_PRICE,
    priceCurrency: "USD",
    billingPeriod: "FREE",
    description:
      "A no-cost review of your website, visibility, and messaging with actionable next steps.",
    primaryCta: {
      label: "Get your free audit",
      href: "/free-analysis",
    },
    secondaryCta: {
      label: "Book a strategy call",
      href: "/get-started#book-call",
    },
  },
}
