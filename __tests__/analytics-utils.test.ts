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
    utm_campaign: 'spring-launch',
    landing_path: '/ig',
    first_touch_source: 'instagram',
    first_touch_medium: 'social',
    first_touch_campaign: 'founder-clips',
    gclid: 'GCLID-123',
    fbclid: 'FBCLID-123',
    msclkid: 'MSCLKID-123',
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
  trackExternalLinkClick,
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
    window.history.replaceState(
      {},
      '',
      '/apply?utm_source=google&gclid=GCLID-123#review',
    )

    trackPageView('/apply', 'Apply')

    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'page_view',
      expect.objectContaining({
        page_location: 'https://www.design-prism.com/apply?utm_source=google',
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
      budget: '$3.5k to $5k',
      timeline: 'Within 30 days',
    })

    expect(consumePendingApplyLeadContext()).toEqual({
      form_name: 'growth_application',
      budget: '$3.5k to $5k',
      timeline: 'Within 30 days',
    })
    expect(consumePendingApplyLeadContext()).toBeNull()
  })

  it('keeps custom GA events free of high-cardinality timestamps', () => {
    trackEvent('apply_question_view', {
      form_name: 'growth_application',
      step: 1,
      step_id: 'services',
      email: 'patient@example.com',
      review_link: 'https://example.com/private?email=patient@example.com',
      message: 'This is user-entered form copy that should not go to GA.',
    })

    const applyQuestionCall = (window.gtag as jest.Mock).mock.calls.find(
      ([, eventName]) => eventName === 'apply_question_view',
    )

    expect(applyQuestionCall?.[2]).toEqual(
      expect.not.objectContaining({
        event_time: expect.any(String),
        gclid: expect.any(String),
        fbclid: expect.any(String),
        msclkid: expect.any(String),
        email: expect.any(String),
        review_link: expect.any(String),
        message: expect.any(String),
      }),
    )
    expect(applyQuestionCall?.[2]).toEqual(
      expect.objectContaining({
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'spring-launch',
        landing_path: '/ig',
        first_touch_source: 'instagram',
        first_touch_medium: 'social',
        first_touch_campaign: 'founder-clips',
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

  it('can measure non-sales form leads without sending Google Ads conversion data', () => {
    trackFormSubmission('scholarship_application', 'scholarship_form', {
      conversionMode: 'immediate',
      lead_type: 'scholarship_application',
      sendGoogleAdsConversion: false,
    })

    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'generate_lead',
      expect.objectContaining({
        form_name: 'scholarship_application',
        form_location: 'scholarship_form',
        lead_type: 'scholarship_application',
      }),
    )
    expect(
      (window.gtag as jest.Mock).mock.calls.some(
        ([, eventName]) => eventName === 'conversion',
      ),
    ).toBe(false)
  })

  it('tracks external link clicks without sending the full destination URL', () => {
    trackExternalLinkClick(
      'https://www.tiktok.com/@the_design_prism?utm_source=ig',
      'tiktok',
    )

    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'external_link_click',
      expect.objectContaining({
        destination_host: 'www.tiktok.com',
        link_text: 'tiktok',
      }),
    )

    const externalLinkCall = (window.gtag as jest.Mock).mock.calls.find(
      ([, eventName]) => eventName === 'external_link_click',
    )

    expect(externalLinkCall?.[2]).toEqual(
      expect.not.objectContaining({
        destination_url: expect.any(String),
      }),
    )
  })
})
