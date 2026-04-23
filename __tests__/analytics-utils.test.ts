const trackVercel = jest.fn()

jest.mock('@vercel/analytics', () => ({
  track: (...args: Array<unknown>) => trackVercel(...args),
}))

jest.mock('@/lib/constants', () => ({
  GOOGLE_ADS_LEAD_CONVERSION_SEND_TO: 'AW-TEST/lead',
  IS_ANALYTICS_ENABLED: true,
}))

jest.mock('@/lib/marketing-attribution', () => ({
  getAttributionContext: () => ({
    utm_source: 'google',
    utm_medium: 'cpc',
  }),
}))

jest.mock('@/utils/sentry-helpers', () => ({
  addBreadcrumb: jest.fn(),
  captureErrorWithContext: jest.fn(),
  isSentryInitialized: () => false,
}))

import {
  consumePendingApplyLeadContext,
  consumePendingLeadConversion,
  storePendingApplyLeadContext,
  trackEvent,
  trackFormSubmission,
  trackLeadConversion,
  trackPageView,
} from '@/utils/analytics'

describe('analytics utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    window.sessionStorage.clear()
    window.dataLayer = []
    window.gtag = jest.fn()
    delete window.__PRISM_LAST_PAGEVIEW
    document.title = 'Apply'
    window.history.replaceState({}, '', '/apply?utm_source=google')
  })

  it('sends a single manual page_view event without issuing a config call', () => {
    trackPageView('/apply', 'Apply')

    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'page_view',
      expect.objectContaining({
        page_path: '/apply',
        page_title: 'Apply',
      }),
    )
    expect(
      (window.gtag as jest.Mock).mock.calls.some(
        ([command]) => command === 'config',
      ),
    ).toBe(false)
  })

  it('stores and consumes pending apply lead context once', () => {
    storePendingApplyLeadContext({
      form_name: 'growth_application',
      budget: '$1.5k to $3k',
      timeline: 'Within 30 days',
    })

    expect(consumePendingApplyLeadContext()).toEqual({
      form_name: 'growth_application',
      budget: '$1.5k to $3k',
      timeline: 'Within 30 days',
    })
    expect(consumePendingApplyLeadContext()).toBeNull()
  })

  it('keeps custom GA events free of high-cardinality timestamps', () => {
    trackEvent('apply_question_view', {
      form_name: 'growth_application',
      step: 1,
      step_id: 'services',
    })

    const applyQuestionCall = (window.gtag as jest.Mock).mock.calls.find(
      ([, eventName]) => eventName === 'apply_question_view',
    )

    expect(applyQuestionCall?.[2]).toEqual(
      expect.not.objectContaining({
        event_time: expect.any(String),
      }),
    )
  })

  it('stores successful form submissions as pending lead conversions', () => {
    trackFormSubmission('free_analysis', 'free_analysis_form')

    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'form_submit_success',
      expect.objectContaining({
        form_name: 'free_analysis',
        form_location: 'free_analysis_form',
        lead_type: 'free_analysis',
      }),
    )
    expect(
      (window.gtag as jest.Mock).mock.calls.some(
        ([, eventName]) => eventName === 'generate_lead',
      ),
    ).toBe(false)
    expect(consumePendingLeadConversion()).toEqual({
      form_name: 'free_analysis',
      form_location: 'free_analysis_form',
      lead_type: 'free_analysis',
    })
  })

  it('tracks immediate lead conversions with GA4 and Google Ads conversion data', () => {
    trackLeadConversion({
      form_name: 'blog_updates',
      form_location: 'blog_email_signup',
      lead_type: 'newsletter_signup',
      value: 1,
      currency: 'USD',
    })

    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'generate_lead',
      expect.objectContaining({
        form_name: 'blog_updates',
        form_location: 'blog_email_signup',
        lead_type: 'newsletter_signup',
        lead_source: 'google',
        value: 1,
        currency: 'USD',
      }),
    )
    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'conversion',
      expect.objectContaining({
        send_to: 'AW-TEST/lead',
        value: 1,
        currency: 'USD',
      }),
    )
  })
})
