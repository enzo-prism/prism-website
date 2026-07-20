/**
 * Expected USD value of a lead, keyed by `lead_type`.
 *
 * These numbers exist for ONE purpose: to give Google Ads Smart Bidding a
 * relative weighting so a $300 self-serve website order is not optimized
 * identically to a free-audit request. Before this map existed every
 * conversion was sent with `value: 1`, which told Ads that every lead — a
 * newsletter signup and a paid order alike — was worth exactly the same.
 *
 * They are RELATIVE WEIGHTS, not revenue reporting and not a forecast. The
 * ratios between entries are what matter; the absolute figures are deliberate
 * estimates anchored to the canonical offer prices in `lib/pricing-model.ts`
 * and should be re-tuned as real close-rate data accrues.
 *
 * To add a lead type: use the `lead_type` string the form actually sends
 * (usually its `FORM_NAME`), and note the derivation in a trailing comment so
 * the next person can tell an anchored number from a guess.
 */
export const LEAD_VALUE_USD_BY_TYPE: Record<string, number> = {
  // Self-serve order: the visitor is one click from a real checkout.
  //
  // NOTE this is the LEAD, and the completed payment fires a SEPARATE purchase
  // conversion also worth $300. If both Ads conversion actions are marked
  // Primary, one buyer reports $600 of value. Keep the lead action Secondary
  // (observation-only) in the Ads UI, or lower this to an expected value.
  // See docs/analytics.md.
  website_order: 300, // canonical $300 flat website build

  // Consultative inbound: real intent, but several conversations from revenue.
  growth_application: 150,
  founder_os_application: 150,
  checkout_inquiry: 150, // components/checkout-form.tsx, any plan

  // Referral submissions are a payout obligation, not a sale. Valued for
  // internal reporting only — ReferralForm sends no Ads conversion.
  referral: 100, // canonical $100 referral payout

  // Lower-intent captures: useful signal, but a long way from revenue.
  prism_ai_website_request: 75,
  shoot_request: 75,
  contact: 60, // general inbound question
  ai_website_launch: 60,
  scaling_roadmap_homepage: 40,
  free_analysis: 30, // free audit request — real interest, no commitment yet
  aeo_assessment: 30, // free assessment, same shape as free_analysis
  model_application: 25,
  scholarship_application: 25,
  newsletter_signup: 10,
}

/**
 * Fallback weighting for any lead type not listed above. Deliberately well
 * below the self-serve order value so an unclassified lead can never outbid a
 * real purchase intent signal.
 */
export const DEFAULT_LEAD_VALUE_USD = 50

/** Resolve the Ads bidding weight for a lead type, falling back to the default. */
export function resolveLeadValue(leadType?: string): number {
  if (!leadType) return DEFAULT_LEAD_VALUE_USD

  // hasOwn, not a bare lookup: `lead_type` comes from form config, and a type
  // named e.g. "toString" would otherwise resolve to the inherited
  // Object.prototype method and send a function as the conversion value.
  if (!Object.hasOwn(LEAD_VALUE_USD_BY_TYPE, leadType)) {
    return DEFAULT_LEAD_VALUE_USD
  }

  const value = LEAD_VALUE_USD_BY_TYPE[leadType]
  return typeof value === 'number' && Number.isFinite(value) && value > 0
    ? value
    : DEFAULT_LEAD_VALUE_USD
}
