import { BOOKING_URL } from './booking'

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
  /** Primary price string shown to buyers, e.g. "Custom, scoped on a call". */
  priceLabel: string
  /** Secondary price line under the primary label. */
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

// POLICY (2026-07-27, revised same day): NO offer shows public exact pricing.
// Every offer — including the PRO Website — is scoped on a 30-minute Zoom
// call booked through BOOK_A_CALL_CTA below. Do not reintroduce public dollar
// amounts anywhere. (Internal analytics values live in lib/lead-values.ts and
// are not public pricing.)
export const WEBSITE_PRICE_LABEL = 'Custom, scoped on a call'
export const CONTENT_OS_PRICE_LABEL = 'Custom, scoped on a call'
export const DENTAL_OS_PRICE_LABEL = 'Built around your practice'
export const PRISM_INFINITY_PRICE_LABEL = 'Custom, scoped on a call'

/**
 * The single booking CTA for every offer that is scoped on a call.
 * BOOKING_URL is Enzo's 30-minute Notion Calendar Zoom link.
 */
export const BOOK_A_CALL_CTA = {
  label: 'Book a Free Demo',
  href: BOOKING_URL,
} as const

/**
 * Website-offer start path. `/websites` remains the indexable marketing page.
 * This CTA always opens the focused four-question intake.
 */
export const WEBSITE_START_CTA = {
  label: 'Start my website',
  href: '/website-intake',
} as const

export const PRICING_PRIMARY_CTA = BOOK_A_CALL_CTA

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
    priceSubLabel: 'The PRO website, scoped to your business',
    description:
      'An ultra-premium PRO website for serious businesses: a bespoke design system, software-grade engineering, analytics wired from day one, and foundations that support Google and AI discovery without guaranteeing placement.',
    primaryCta: BOOK_A_CALL_CTA,
    secondaryCta: {
      label: 'Explore PRO websites',
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
    priceSubLabel: 'Scoped to your business on a 30-min call',
    description:
      'A system that runs your content and ads across every social platform and your website. Implemented over 3 months, then optimized every month.',
    primaryCta: BOOK_A_CALL_CTA,
    secondaryCta: {
      label: 'Explore Content OS',
      href: '/content-os',
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
    priceSubLabel: 'Scoped to your practice',
    description:
      'The full Prism growth system, packaged for dental practices: website, SEO and AI search, Google Maps, reviews, and ads, tuned to how patients choose a practice.',
    primaryCta: BOOK_A_CALL_CTA,
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
    priceSubLabel: 'Unlimited requests. Pause or cancel anytime.',
    description:
      'Unlimited growth deliverables on one monthly subscription: landing pages, ad creative, websites, video, photoshoots, and content. Request as many as you need, delivered one at a time. Pause or cancel anytime.',
    primaryCta: BOOK_A_CALL_CTA,
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
