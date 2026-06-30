/**
 * Central registry of Stripe Payment Links for Prism's productized offers.
 *
 * The live links are created in Stripe (see scripts/create-stripe-links.sh) and
 * pasted in below, or supplied at build time via NEXT_PUBLIC_STRIPE_LINK_* env
 * vars (preferred for rotating links without a code change).
 *
 * Until a real link is set, the CTA falls back to the consultative /contact
 * route so the site is never broken. Higher-ticket offers (Content OS, Dental
 * OS) intentionally lead with a "Book a call" CTA, so a missing self-serve link
 * there is expected, not an error.
 */

export type PaymentLinkKey =
  | "website"
  | "websiteCare"
  | "contentOs"
  | "contentOsMonthly"
  | "infinity"

/**
 * Hard-coded live Payment Link URLs. Leave empty to fall back to env or /contact.
 * Replace these with the buy.stripe.com URLs printed by scripts/create-stripe-links.sh.
 */
const LIVE_LINKS: Record<PaymentLinkKey, string> = {
  // "Website by Prism" — $300 one-time (plink_1To6KGKoSN7Q6Za2ZEKgDf2p)
  website: "https://buy.stripe.com/8x2dRa3Aid1gasMeQDdZ60N",
  websiteCare: "",
  contentOs: "",
  contentOsMonthly: "",
  infinity: "",
}

// Explicit (non-dynamic) env references so Next.js inlines them at build time.
const ENV_LINKS: Record<PaymentLinkKey, string | undefined> = {
  website: process.env.NEXT_PUBLIC_STRIPE_LINK_WEBSITE,
  websiteCare: process.env.NEXT_PUBLIC_STRIPE_LINK_WEBSITE_CARE,
  contentOs: process.env.NEXT_PUBLIC_STRIPE_LINK_CONTENT_OS,
  contentOsMonthly: process.env.NEXT_PUBLIC_STRIPE_LINK_CONTENT_OS_MONTHLY,
  infinity: process.env.NEXT_PUBLIC_STRIPE_LINK_INFINITY,
}

export const PAYMENT_LINK_FALLBACK = "/contact"

/** Returns the configured Payment Link for an offer, or /contact if none is set yet. */
export function paymentLink(key: PaymentLinkKey): string {
  return LIVE_LINKS[key] || ENV_LINKS[key] || PAYMENT_LINK_FALLBACK
}

/** True when a real Stripe Payment Link is wired for the offer. */
export function hasPaymentLink(key: PaymentLinkKey): boolean {
  return Boolean(LIVE_LINKS[key] || ENV_LINKS[key])
}
