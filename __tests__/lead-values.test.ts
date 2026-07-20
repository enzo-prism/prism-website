import {
  DEFAULT_LEAD_VALUE_USD,
  LEAD_VALUE_USD_BY_TYPE,
  resolveLeadValue,
} from '@/lib/lead-values'

describe('lead values', () => {
  it('resolves a known lead type to its configured weighting', () => {
    expect(resolveLeadValue('website_order')).toBe(300)
    expect(resolveLeadValue('newsletter_signup')).toBe(10)
  })

  it('only weights lead types the site actually emits', () => {
    // Regression: the map originally keyed on offer names (content_os,
    // dental_os, prism_infinity) that no form ever sends as `lead_type`, so
    // every one of those entries was dead and the real leads silently took
    // the fallback. Keys must match the `lead_type` values in components/.
    const emittedLeadTypes = new Set([
      'website_order',
      'growth_application',
      'founder_os_application',
      'checkout_inquiry',
      'referral',
      'prism_ai_website_request',
      'shoot_request',
      'contact',
      'ai_website_launch',
      'scaling_roadmap_homepage',
      'free_analysis',
      'aeo_assessment',
      'model_application',
      'scholarship_application',
      'newsletter_signup',
    ])

    for (const leadType of Object.keys(LEAD_VALUE_USD_BY_TYPE)) {
      expect(emittedLeadTypes.has(leadType)).toBe(true)
    }
  })

  it('ranks free/no-commitment captures below the unclassified default', () => {
    // Regression: free-audit style leads had no entry and inherited the
    // default of 50, weighting them ABOVE explicitly low-intent types like
    // scholarship (25) — inverting the premise this map exists to serve.
    for (const leadType of ['free_analysis', 'aeo_assessment']) {
      expect(resolveLeadValue(leadType)).toBeLessThan(DEFAULT_LEAD_VALUE_USD)
      expect(resolveLeadValue(leadType)).toBeLessThan(
        resolveLeadValue('website_order'),
      )
    }
  })

  it('falls back to the default for unknown or missing lead types', () => {
    expect(resolveLeadValue('something_new')).toBe(DEFAULT_LEAD_VALUE_USD)
    expect(resolveLeadValue(undefined)).toBe(DEFAULT_LEAD_VALUE_USD)
    expect(resolveLeadValue('')).toBe(DEFAULT_LEAD_VALUE_USD)
  })

  it('keeps every weighting a positive finite number', () => {
    // A zero, negative, or NaN value would silently corrupt Smart Bidding
    // rather than fail loudly.
    for (const [leadType, value] of Object.entries(LEAD_VALUE_USD_BY_TYPE)) {
      expect(Number.isFinite(value)).toBe(true)
      expect(value).toBeGreaterThan(0)
      expect(leadType).toMatch(/^[a-z][a-z0-9_]*$/)
    }
    expect(DEFAULT_LEAD_VALUE_USD).toBeGreaterThan(0)
  })

  it('ranks the self-serve order above the unclassified default', () => {
    // The entire point of the map: a $300 purchase intent must outweigh a
    // generic inbound lead, or Ads optimizes them identically.
    expect(resolveLeadValue('website_order')).toBeGreaterThan(
      DEFAULT_LEAD_VALUE_USD,
    )
  })

  it('does not inherit values from Object.prototype', () => {
    expect(resolveLeadValue('toString')).toBe(DEFAULT_LEAD_VALUE_USD)
    expect(resolveLeadValue('constructor')).toBe(DEFAULT_LEAD_VALUE_USD)
  })
})
