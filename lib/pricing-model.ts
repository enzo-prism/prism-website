import { WAITLIST_CTA, WAITLIST_FOCUS_HREFS } from './waitlist'

export type PricingOfferId =
  | 'website'
  | 'content_os'
  | 'dental_os'
  | 'prism_infinity'

export type PricingBillingPeriod =
  | 'ONE_TIME'
  | 'P1M'
  | 'ONE_TIME_PLUS_P1M'
  | 'CUSTOM'

export type PricingPriceKind = 'one_time' | 'recurring' | 'hybrid' | 'custom'

export type PricingOffer = {
  offerId: PricingOfferId
  name: string
  /** Headline anchor amount in USD (one-time setup, or monthly). 0 when custom. */
  price: number
  /** Optional recurring amount in USD when the offer also carries a monthly fee. */
  monthlyPrice?: number
  priceCurrency: 'USD'
  billingPeriod: PricingBillingPeriod
  priceKind: PricingPriceKind
  /**
   * The price slot shown to buyers. With no public prices, it carries the
   * engagement shape instead, e.g. "3-month setup, then monthly".
   */
  priceLabel: string
  /** Secondary line under the engagement shape. */
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

// POLICY (2026-07-27, waitlist revision 2026-09-14): NO offer shows public
// exact pricing. Prism is at capacity, so every offer's primary action is the
// waitlist (WAITLIST_CTA in lib/waitlist.ts); scope is agreed together once we
// reach out. Do not reintroduce public dollar amounts anywhere. (Internal
// analytics values live in lib/lead-values.ts and are not public pricing.)
// The price slot shows each offer's engagement shape instead, using only
// facts the offer pages already state.
export const WEBSITE_PRICE_LABEL = 'One project, scoped to you'
export const CONTENT_OS_PRICE_LABEL = '3-month setup, then monthly'
export const DENTAL_OS_PRICE_LABEL = 'Built around your practice'
export const PRISM_INFINITY_PRICE_LABEL = 'Monthly. Pause or cancel anytime.'

/** Service-specific waitlist entry points (prefill the focus checkboxes). */
export const WEBSITE_WAITLIST_CTA = {
  label: WAITLIST_CTA.label,
  href: WAITLIST_FOCUS_HREFS.website,
} as const

export const CONTENT_WAITLIST_CTA = {
  label: WAITLIST_CTA.label,
  href: WAITLIST_FOCUS_HREFS.content,
} as const

export const ADS_WAITLIST_CTA = {
  label: WAITLIST_CTA.label,
  href: WAITLIST_FOCUS_HREFS.ads,
} as const

export const PRICING_PRIMARY_CTA = WAITLIST_CTA

export const PRICING_SECONDARY_CTA = {
  label: 'Compare all offers',
  href: '#offers',
} as const

export const CANONICAL_PRICING_OFFERS: Record<PricingOfferId, PricingOffer> = {
  website: {
    offerId: 'website',
    name: 'Website',
    price: 0,
    priceCurrency: 'USD',
    billingPeriod: 'CUSTOM',
    priceKind: 'custom',
    priceLabel: WEBSITE_PRICE_LABEL,
    priceSubLabel: 'The PRO website, with optional care after launch',
    description:
      'A custom website with clear service pages, mobile-friendly design, inquiry forms, and analytics. Built to help customers understand your business and take the next step.',
    primaryCta: WEBSITE_WAITLIST_CTA,
    secondaryCta: {
      label: 'Explore the PRO website',
      href: '/websites',
    },
  },
  content_os: {
    offerId: 'content_os',
    name: 'Content OS',
    price: 0,
    priceCurrency: 'USD',
    billingPeriod: 'CUSTOM',
    priceKind: 'custom',
    priceLabel: CONTENT_OS_PRICE_LABEL,
    priceSubLabel: 'Month-to-month after the setup',
    description:
      'Video edits, scripts, social posts, and website content, from planning and review to publishing on your agreed channels. Three-month setup, then ongoing production and improvement.',
    primaryCta: CONTENT_WAITLIST_CTA,
    secondaryCta: {
      label: 'Explore Content',
      href: '/content',
    },
  },
  dental_os: {
    offerId: 'dental_os',
    name: 'Dental OS',
    price: 0,
    priceCurrency: 'USD',
    billingPeriod: 'CUSTOM',
    priceKind: 'custom',
    priceLabel: DENTAL_OS_PRICE_LABEL,
    priceSubLabel: 'Scoped to your locations and goals',
    description:
      'Website, search, Google Maps, review support, and ads coordinated for your practice. Help patients understand your care and make it easier to call or request an appointment.',
    primaryCta: WAITLIST_CTA,
    secondaryCta: {
      label: 'Explore Dental OS',
      href: '/dental-os',
    },
  },
  prism_infinity: {
    offerId: 'prism_infinity',
    name: 'Prism Infinity',
    price: 0,
    priceCurrency: 'USD',
    billingPeriod: 'CUSTOM',
    priceKind: 'custom',
    priceLabel: PRISM_INFINITY_PRICE_LABEL,
    priceSubLabel: 'One active request at a time',
    description:
      'One monthly subscription for landing pages, ad creative, websites, video, photoshoots, and content. Add unlimited requests to your queue; we work through them one at a time. Pause or cancel anytime.',
    primaryCta: WAITLIST_CTA,
    secondaryCta: {
      label: 'Explore Prism Infinity',
      href: '/prism-infinity',
    },
  },
}

/** Offers in the order they should appear across pricing surfaces. */
export const PRICING_OFFER_ORDER: PricingOfferId[] = [
  'website',
  'content_os',
  'dental_os',
  'prism_infinity',
]
