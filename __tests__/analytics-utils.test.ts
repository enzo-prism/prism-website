const trackVercel = jest.fn()

jest.mock('@vercel/analytics', () => ({
  track: (...args: Array<unknown>) => trackVercel(...args),
}))

jest.mock('@/lib/constants', () => ({
  GOOGLE_ADS_LEAD_CONVERSION_SEND_TO: 'AW-TEST/lead',
  GOOGLE_ADS_PURCHASE_CONVERSION_SEND_TO: 'AW-TEST/purchase',
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

import { createHash } from 'crypto'

import {
  applyStoredEnhancedConversionUserData,
  consumePendingApplyLeadContext,
  consumePendingLeadConversion,
  setEnhancedConversionUserData,
  storePendingApplyLeadContext,
  trackEvent,
  trackExternalLinkClick,
  trackFormSubmission,
  trackLeadConversion,
  trackPageView,
  trackPurchase,
} from '@/utils/analytics'

function sha256Of(value: string) {
  return createHash('sha256').update(value, 'utf8').digest('hex')
}

/**
 * jsdom does not ship WebCrypto's SubtleCrypto, so stand in a real SHA-256.
 * The assertions below check the NORMALIZATION we own, not the digest itself.
 */
function installSubtleCrypto() {
  Object.defineProperty(globalThis, 'crypto', {
    configurable: true,
    writable: true,
    value: {
      ...(globalThis.crypto ?? {}),
      subtle: {
        digest: async (_algorithm: string, data: BufferSource) => {
          const bytes = new Uint8Array(data as ArrayBuffer)
          const digest = createHash('sha256').update(Buffer.from(bytes)).digest()
          return new Uint8Array(digest).buffer
        },
      },
    },
  })
}

function removeSubtleCrypto() {
  Object.defineProperty(globalThis, 'crypto', {
    configurable: true,
    writable: true,
    value: { ...(globalThis.crypto ?? {}), subtle: undefined },
  })
}

describe('analytics utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    window.sessionStorage.clear()
    window.localStorage.clear()
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

  describe('lead conversion values', () => {
    it('weights a $300 website order above a generic lead for Ads bidding', () => {
      trackLeadConversion({
        form_name: 'website_order',
        form_location: 'website_order_form',
      })

      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'conversion',
        expect.objectContaining({ send_to: 'AW-TEST/lead', value: 300 }),
      )
    })

    it('falls back to the default weighting for unclassified lead types', () => {
      trackLeadConversion({
        form_name: 'some_new_form',
        form_location: 'somewhere',
      })

      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'conversion',
        expect.objectContaining({ value: 50 }),
      )
    })

    it('keeps the resolved value when a caller passes value: undefined', () => {
      // Regression: the resolved defaults used to sit BEFORE the context
      // spread, so an explicit `undefined` overwrote them and the param was
      // dropped — sending an Ads conversion with no value at all.
      trackLeadConversion({
        form_name: 'website_order',
        form_location: 'website_order_form',
        value: undefined,
        currency: undefined,
      })

      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'conversion',
        expect.objectContaining({ value: 300, currency: 'USD' }),
      )
    })

    it('passes a transaction id through for Ads de-duplication', () => {
      trackLeadConversion({
        form_name: 'website_order',
        form_location: 'website_order_form',
        transaction_id: 'PRISM-9F2A',
      })

      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'conversion',
        expect.objectContaining({ transaction_id: 'PRISM-9F2A' }),
      )
    })

    it('drops an unvouchable lead transaction id instead of sending it to Ads', () => {
      // The Ads lead conversion is a direct gtag call that never passes
      // through sanitizeAnalyticsParams, so it needs the same guard as
      // trackPurchase or a PII-bearing id would reach Google raw.
      trackLeadConversion({
        form_name: 'contact',
        form_location: 'contact_form',
        transaction_id: 'jane.doe@example.com',
      })

      const conversionCall = (window.gtag as jest.Mock).mock.calls.find(
        ([, eventName]) => eventName === 'conversion',
      )
      expect(conversionCall?.[2]).not.toHaveProperty('transaction_id')
      expect(JSON.stringify((window.gtag as jest.Mock).mock.calls)).not.toContain(
        'jane.doe@example.com',
      )
    })
  })

  describe('trackPurchase', () => {
    it('sends GA4 purchase with items and a Google Ads purchase conversion', () => {
      const recorded = trackPurchase({
        transaction_id: 'cs_live_a1b2c3',
        value: 300,
        item_name: 'Website by Prism',
      })

      expect(recorded).toBe(true)
      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'purchase',
        expect.objectContaining({
          transaction_id: 'cs_live_a1b2c3',
          value: 300,
          currency: 'USD',
          items: [
            {
              item_id: 'website',
              item_name: 'Website by Prism',
              price: 300,
              quantity: 1,
            },
          ],
        }),
      )
      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'conversion',
        expect.objectContaining({
          send_to: 'AW-TEST/purchase',
          value: 300,
          currency: 'USD',
          // Ads gets the id without the fixed `cs_live_` prefix so it fits the
          // 64-character limit; GA4 (above) keeps the full id.
          transaction_id: 'a1b2c3',
        }),
      )
    })

    it('fires at most once per transaction id, so a reload cannot double-count', () => {
      expect(trackPurchase({ transaction_id: 'cs_live_dupe', value: 300 })).toBe(
        true,
      )
      ;(window.gtag as jest.Mock).mockClear()

      expect(trackPurchase({ transaction_id: 'cs_live_dupe', value: 300 })).toBe(
        false,
      )
      expect(window.gtag).not.toHaveBeenCalled()
    })

    it('refuses to fire without a transaction id', () => {
      expect(trackPurchase({ transaction_id: '  ', value: 300 })).toBe(false)
      expect(window.gtag).not.toHaveBeenCalled()
    })

    it('keeps the opaque transaction id intact through the PII sanitizer', () => {
      // A digit-heavy Stripe id must not trip the phone-number heuristic.
      trackPurchase({ transaction_id: 'cs_live_1234567890123', value: 300 })

      const purchaseCall = (window.gtag as jest.Mock).mock.calls.find(
        ([, eventName]) => eventName === 'purchase',
      )
      expect(purchaseCall?.[2]).toEqual(
        expect.objectContaining({ transaction_id: 'cs_live_1234567890123' }),
      )
    })

    it('refuses a transaction id carrying an email rather than leaking it', () => {
      // Regression, two layered bugs: the opaque-id branch bypassed the
      // email/phone heuristics so a crafted ?session_id=someone@example.com
      // reached GA4 as an event param — AND the Google Ads conversion is a
      // direct gtag call that never touches the sanitizer at all, so it leaked
      // even after GA4 was fixed. An unvouchable id is also undedupable, so
      // trackPurchase now refuses it outright.
      expect(
        trackPurchase({ transaction_id: 'jane.doe@gmail.com', value: 300 }),
      ).toBe(false)

      expect(window.gtag).not.toHaveBeenCalled()
      expect(JSON.stringify((window.gtag as jest.Mock).mock.calls)).not.toContain(
        'jane.doe@gmail.com',
      )
    })

    it('shortens the Ads transaction id to fit the 64-character limit', () => {
      // Stripe session ids are 66 chars; Google Ads caps transaction_id at 64
      // and may truncate or reject beyond it, breaking de-duplication.
      const sessionId = `cs_live_${'a1B2c3D4e5'.repeat(5)}xyz12345`
      expect(sessionId.length).toBeGreaterThan(64)

      trackPurchase({ transaction_id: sessionId, value: 300 })

      const adsCall = (window.gtag as jest.Mock).mock.calls.find(
        ([, eventName, params]) =>
          eventName === 'conversion' && params?.send_to === 'AW-TEST/purchase',
      )
      const adsTransactionId = adsCall?.[2]?.transaction_id as string
      expect(adsTransactionId.length).toBeLessThanOrEqual(64)
      expect(sessionId).toContain(adsTransactionId)

      // GA4 keeps the full id — its limit is 100 characters.
      const purchaseCall = (window.gtag as jest.Mock).mock.calls.find(
        ([, eventName]) => eventName === 'purchase',
      )
      expect(purchaseCall?.[2]?.transaction_id).toBe(sessionId)
    })

    it('does not let unsafe item values bypass the sanitizer via items[]', () => {
      // `items` is merged AFTER sanitization, so item fields must be checked
      // at the source or they would pass through untouched.
      trackPurchase({
        transaction_id: 'cs_live_itemcheck1',
        value: 300,
        item_name: 'buyer@example.com',
      })

      expect(JSON.stringify((window.gtag as jest.Mock).mock.calls)).not.toContain(
        'buyer@example.com',
      )
      const purchaseCall = (window.gtag as jest.Mock).mock.calls.find(
        ([, eventName]) => eventName === 'purchase',
      )
      expect(purchaseCall?.[2]?.item_name).toBe('Website by Prism')
    })

    it('mirrors the purchase to Vercel Analytics', () => {
      trackPurchase({ transaction_id: 'cs_live_vercel', value: 300 })

      expect(trackVercel).toHaveBeenCalledWith(
        'Purchase Completed',
        expect.objectContaining({ value: 300, currency: 'USD' }),
      )
    })
  })

  describe('setEnhancedConversionUserData', () => {
    afterEach(() => {
      removeSubtleCrypto()
    })

    it('sends only a SHA-256 digest, never the raw email', async () => {
      installSubtleCrypto()

      await setEnhancedConversionUserData({ email: 'Jordan@Example.com ' })

      expect(window.gtag).toHaveBeenCalledWith('set', 'user_data', {
        sha256_email_address: sha256Of('jordan@example.com'),
      })

      const serialized = JSON.stringify((window.gtag as jest.Mock).mock.calls)
      expect(serialized).not.toContain('Jordan@Example.com')
      expect(serialized).not.toContain('jordan@example.com')
    })

    it('applies Gmail normalization so dots and +suffixes still match', async () => {
      installSubtleCrypto()

      await setEnhancedConversionUserData({ email: 'jor.dan+prism@gmail.com' })

      expect(window.gtag).toHaveBeenCalledWith('set', 'user_data', {
        sha256_email_address: sha256Of('jordan@gmail.com'),
      })
    })

    it('keeps the googlemail.com domain instead of rewriting it to gmail.com', async () => {
      // Regression: rewriting the domain produced a hash Google never matches,
      // silently failing every googlemail.com buyer. Google's own worked
      // example normalizes only the username.
      installSubtleCrypto()

      await setEnhancedConversionUserData({
        email: 'Jane.Doe+Shopping@googlemail.com',
      })

      expect(window.gtag).toHaveBeenCalledWith('set', 'user_data', {
        sha256_email_address: sha256Of('janedoe@googlemail.com'),
      })
    })

    it('normalizes a bare US phone number to E.164 before hashing', async () => {
      installSubtleCrypto()

      await setEnhancedConversionUserData({ phone: '(916) 555-0142' })

      expect(window.gtag).toHaveBeenCalledWith('set', 'user_data', {
        sha256_phone_number: sha256Of('+19165550142'),
      })
    })

    it('skips a phone it cannot confidently normalize', async () => {
      installSubtleCrypto()

      await setEnhancedConversionUserData({ phone: '555-0142' })

      expect(window.gtag).not.toHaveBeenCalled()
    })

    it('degrades silently when SubtleCrypto is unavailable', async () => {
      removeSubtleCrypto()

      await expect(
        setEnhancedConversionUserData({ email: 'jordan@example.com' }),
      ).resolves.toBeUndefined()
      expect(window.gtag).not.toHaveBeenCalled()
    })

    it('re-applies stored hashes on a later page load', async () => {
      // The buyer reaches the Stripe-redirect confirmation page as a fresh
      // document, so the page-scoped user_data from order time is gone. Only
      // digests are persisted — never the raw address.
      installSubtleCrypto()
      await setEnhancedConversionUserData({ email: 'jordan@example.com' })
      expect(window.localStorage.getItem('prism_ec_user_data_v1')).not.toContain(
        'jordan@example.com',
      )
      ;(window.gtag as jest.Mock).mockClear()

      expect(applyStoredEnhancedConversionUserData()).toBe(true)
      expect(window.gtag).toHaveBeenCalledWith('set', 'user_data', {
        sha256_email_address: sha256Of('jordan@example.com'),
      })
    })

    it('ignores stored data that is expired or malformed', () => {
      window.localStorage.setItem(
        'prism_ec_user_data_v1',
        JSON.stringify({
          userData: { sha256_email_address: 'not-a-digest' },
          savedAt: Date.now(),
        }),
      )
      expect(applyStoredEnhancedConversionUserData()).toBe(false)

      window.localStorage.setItem(
        'prism_ec_user_data_v1',
        JSON.stringify({
          userData: { sha256_email_address: sha256Of('a@b.com') },
          savedAt: Date.now() - 7 * 60 * 60 * 1000,
        }),
      )
      expect(applyStoredEnhancedConversionUserData()).toBe(false)
      expect(window.gtag).not.toHaveBeenCalled()
    })
  })
})
