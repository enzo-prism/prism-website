export type PricingOfferId =
  | "growth_dashboard"
  | "light_audit"
  | "deep_growth_audit"
  | "growth_sprint"
  | "ongoing_growth_partner"

export type PricingBillingPeriod = "FREE" | "INCLUDED" | "ONE_TIME" | "P1M"

export type PricingPriceKind =
  | "free"
  | "included"
  | "exact"
  | "starting_at"
  | "common_range"

export type PricingOffer = {
  offerId: PricingOfferId
  name: string
  price: number
  priceCurrency: "USD"
  billingPeriod: PricingBillingPeriod
  priceKind: PricingPriceKind
  priceLabel: string
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

export const GROWTH_DASHBOARD_PRICE = 0
export const LIGHT_AUDIT_PRICE = 0
export const DEEP_GROWTH_AUDIT_PRICE = 500
export const GROWTH_SPRINT_STARTING_PRICE = 3500
export const ONGOING_GROWTH_PARTNER_STARTING_MONTHLY_PRICE = 1500

export const GROWTH_DASHBOARD_PRICE_LABEL = "Free to start"
export const LIGHT_AUDIT_PRICE_LABEL = "Included"
export const DEEP_GROWTH_AUDIT_PRICE_LABEL = "Normally $500"
export const GROWTH_SPRINT_STARTING_PRICE_LABEL = "Starts at $3,500"
export const GROWTH_SPRINT_COMMON_RANGE_LABEL = "$3,500-$7,500+"
export const ONGOING_GROWTH_PARTNER_STARTING_PRICE_LABEL =
  "Starts at $1,500/month"

export const PRICING_PRIMARY_CTA = {
  label: "Create Free Growth Dashboard",
  href: "/get-started",
} as const

export const PRICING_SECONDARY_CTA = {
  label: "See Example Growth Path",
  href: "#growth-path",
} as const

export const CANONICAL_PRICING_OFFERS: Record<PricingOfferId, PricingOffer> = {
  growth_dashboard: {
    offerId: "growth_dashboard",
    name: "Prism Growth Dashboard",
    price: GROWTH_DASHBOARD_PRICE,
    priceCurrency: "USD",
    billingPeriod: "FREE",
    priceKind: "free",
    priceLabel: GROWTH_DASHBOARD_PRICE_LABEL,
    description:
      "A free starting point that gives Prism the context to review your business and prepare a focused Light Audit.",
    primaryCta: PRICING_PRIMARY_CTA,
    secondaryCta: PRICING_SECONDARY_CTA,
  },
  light_audit: {
    offerId: "light_audit",
    name: "Light Audit",
    price: LIGHT_AUDIT_PRICE,
    priceCurrency: "USD",
    billingPeriod: "INCLUDED",
    priceKind: "included",
    priceLabel: LIGHT_AUDIT_PRICE_LABEL,
    description:
      "A focused snapshot of visible growth opportunities across website clarity, Google presence, local visibility, reviews, tracking basics, and the top three opportunities.",
    primaryCta: PRICING_PRIMARY_CTA,
  },
  deep_growth_audit: {
    offerId: "deep_growth_audit",
    name: "Deep Growth Audit",
    price: DEEP_GROWTH_AUDIT_PRICE,
    priceCurrency: "USD",
    billingPeriod: "ONE_TIME",
    priceKind: "exact",
    priceLabel: DEEP_GROWTH_AUDIT_PRICE_LABEL,
    description:
      "A real diagnostic product that gives Prism enough clarity to recommend a focused 60-day sprint when there is a strong fit.",
    primaryCta: PRICING_PRIMARY_CTA,
  },
  growth_sprint: {
    offerId: "growth_sprint",
    name: "60-Day Growth Sprint",
    price: GROWTH_SPRINT_STARTING_PRICE,
    priceCurrency: "USD",
    billingPeriod: "ONE_TIME",
    priceKind: "starting_at",
    priceLabel: GROWTH_SPRINT_STARTING_PRICE_LABEL,
    description:
      "A focused sprint scoped from your audit around the highest-leverage opportunities for qualified growth.",
    primaryCta: PRICING_PRIMARY_CTA,
  },
  ongoing_growth_partner: {
    offerId: "ongoing_growth_partner",
    name: "Ongoing Growth Partner",
    price: ONGOING_GROWTH_PARTNER_STARTING_MONTHLY_PRICE,
    priceCurrency: "USD",
    billingPeriod: "P1M",
    priceKind: "starting_at",
    priceLabel: ONGOING_GROWTH_PARTNER_STARTING_PRICE_LABEL,
    description:
      "Ongoing growth execution, strategy, testing, creative direction, and multi-channel support after the first sprint creates enough signal.",
    primaryCta: PRICING_PRIMARY_CTA,
  },
}
