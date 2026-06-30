export type PricingOfferId =
  | "website"
  | "content_os"
  | "dental_os"
  | "prism_infinity"

export type PricingBillingPeriod =
  | "ONE_TIME"
  | "P1M"
  | "ONE_TIME_PLUS_P1M"
  | "CUSTOM"

export type PricingPriceKind = "one_time" | "recurring" | "hybrid" | "custom"

export type PricingOffer = {
  offerId: PricingOfferId
  name: string
  /** Headline anchor amount in USD (one-time setup, or monthly). 0 when custom. */
  price: number
  /** Optional recurring amount in USD when the offer also carries a monthly fee. */
  monthlyPrice?: number
  priceCurrency: "USD"
  billingPeriod: PricingBillingPeriod
  priceKind: PricingPriceKind
  /** Primary price string shown to buyers, e.g. "$300 one-time". */
  priceLabel: string
  /** Secondary price line, e.g. "+ $100/month optional care". */
  priceSubLabel?: string
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

// Canonical amounts (USD). Keep these as the single source of truth.
export const WEBSITE_PRICE = 300
export const WEBSITE_CARE_MONTHLY_PRICE = 100
export const CONTENT_OS_SETUP_PRICE = 5000
export const CONTENT_OS_MONTHLY_PRICE = 1000
export const PRISM_INFINITY_MONTHLY_PRICE = 2000

// Canonical price strings. NOTE: always spell "/month" (never "/mo") to satisfy
// the pricing-consistency token rules.
export const WEBSITE_PRICE_LABEL = "$300 one-time"
export const WEBSITE_CARE_PRICE_LABEL = "$100/month"
export const CONTENT_OS_PRICE_LABEL = "$5,000 + $1,000/month"
export const CONTENT_OS_SETUP_PRICE_LABEL = "$5,000 to implement"
export const CONTENT_OS_MONTHLY_PRICE_LABEL = "$1,000/month"
export const DENTAL_OS_PRICE_LABEL = "Built around your practice"
export const PRISM_INFINITY_PRICE_LABEL = "$2,000/month"

export const PRICING_PRIMARY_CTA = {
  label: "Order your website — $300",
  href: "/websites",
} as const

export const PRICING_SECONDARY_CTA = {
  label: "Compare all offers",
  href: "#offers",
} as const

export const CANONICAL_PRICING_OFFERS: Record<PricingOfferId, PricingOffer> = {
  website: {
    offerId: "website",
    name: "Website",
    price: WEBSITE_PRICE,
    monthlyPrice: WEBSITE_CARE_MONTHLY_PRICE,
    priceCurrency: "USD",
    billingPeriod: "ONE_TIME",
    priceKind: "one_time",
    priceLabel: WEBSITE_PRICE_LABEL,
    priceSubLabel: "+ $100/month optional care",
    description:
      "Describe the website you want, pay once, and it is live within 7 days. Infinite iterations until you love it. Add ongoing care for $100/month when it is ready.",
    primaryCta: {
      label: "Order now — $300",
      href: "/websites",
    },
    secondaryCta: {
      label: "See recent builds",
      href: "/websites#work",
    },
  },
  content_os: {
    offerId: "content_os",
    name: "Content OS",
    price: CONTENT_OS_SETUP_PRICE,
    monthlyPrice: CONTENT_OS_MONTHLY_PRICE,
    priceCurrency: "USD",
    billingPeriod: "ONE_TIME_PLUS_P1M",
    priceKind: "hybrid",
    priceLabel: CONTENT_OS_PRICE_LABEL,
    priceSubLabel: "$5,000 to implement over 3 months, then $1,000/month",
    description:
      "AI agents that scale your content and ads across every social platform and your website. Implemented over 3 months, then optimized every month.",
    primaryCta: {
      label: "Explore Content OS",
      href: "/content-os",
    },
    secondaryCta: {
      label: "Book a call",
      href: "/contact?topic=content-os",
    },
  },
  dental_os: {
    offerId: "dental_os",
    name: "Dental OS",
    price: 0,
    priceCurrency: "USD",
    billingPeriod: "CUSTOM",
    priceKind: "custom",
    priceLabel: DENTAL_OS_PRICE_LABEL,
    priceSubLabel: "Scoped to your practice",
    description:
      "The full Prism growth system, packaged for dental practices: website, SEO and AI search, Google Maps, reviews, and ads, tuned to how patients choose a practice.",
    primaryCta: {
      label: "Explore Dental OS",
      href: "/dental-os",
    },
    secondaryCta: {
      label: "Book a call",
      href: "/contact?topic=dental-os",
    },
  },
  prism_infinity: {
    offerId: "prism_infinity",
    name: "Prism Infinity",
    price: PRISM_INFINITY_MONTHLY_PRICE,
    monthlyPrice: PRISM_INFINITY_MONTHLY_PRICE,
    priceCurrency: "USD",
    billingPeriod: "P1M",
    priceKind: "recurring",
    priceLabel: PRISM_INFINITY_PRICE_LABEL,
    priceSubLabel: "Unlimited requests. Pause or cancel anytime.",
    description:
      "Unlimited Prism across engineering, design, and marketing: logo and print design, web development, video editing, content, ads, slide decks, in-person photoshoots, and more. One monthly subscription.",
    primaryCta: {
      label: "Explore Prism Infinity",
      href: "/prism-infinity",
    },
    secondaryCta: {
      label: "Book a call",
      href: "/contact?topic=prism-infinity",
    },
  },
}

/** Offers in the order they should appear across pricing surfaces. */
export const PRICING_OFFER_ORDER: PricingOfferId[] = [
  "website",
  "content_os",
  "dental_os",
  "prism_infinity",
]
