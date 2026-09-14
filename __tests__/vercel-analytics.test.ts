import {
  buildVercelCustomEvent,
  normalizeVercelAnalyticsUrl,
  sanitizeVercelAnalyticsEvent,
} from '@/lib/vercel-analytics'

describe('Vercel analytics URL normalization', () => {
  it('keeps UTM params while removing hashes and non-marketing params', () => {
    expect(
      normalizeVercelAnalyticsUrl(
        'https://www.design-prism.com/get-started?utm_source=google&gclid=abc123#book-call',
      ),
    ).toBe('https://www.design-prism.com/get-started?utm_source=google')
  })

  it('normalizes relative URLs against the canonical origin and preserves safe marketing params', () => {
    expect(
      normalizeVercelAnalyticsUrl('/pricing?utm_campaign=spring&ref=campaign'),
    ).toBe('https://www.design-prism.com/pricing?utm_campaign=spring')
  })

  it('returns a sanitized event payload without changing the event type', () => {
    expect(
      sanitizeVercelAnalyticsEvent({
        type: 'pageview',
        url: 'https://www.design-prism.com/blog?utm_medium=email',
      }),
    ).toEqual({
      type: 'pageview',
      url: 'https://www.design-prism.com/blog?utm_medium=email',
    })
  })

  it('builds compact custom CTA events for the Vercel dashboard', () => {
    expect(
      buildVercelCustomEvent('cta_click', {
        cta_text: 'Get started',
        cta_location: 'hero',
        extra_noise: 'ignore me',
      }),
    ).toEqual({
      name: 'CTA Clicked',
      properties: {
        cta_text: 'Get started',
        cta_location: 'hero',
      },
    })
  })

  it('keeps allowlisted social-hub CTA dimensions on Vercel CTA events', () => {
    expect(
      buildVercelCustomEvent('cta_click', {
        cta_text: 'website',
        cta_location: 'instagram landing actions',
        platform: 'instagram',
        service: 'website',
        destination: '/waitlist?focus=website',
        extra_noise: 'ignore me',
      }),
    ).toEqual({
      name: 'CTA Clicked',
      properties: {
        cta_text: 'website',
        cta_location: 'instagram landing actions',
        platform: 'instagram',
        service: 'website',
        destination: '/waitlist?focus=website',
      },
    })
  })

  it('drops unallowlisted social-hub CTA dimensions from Vercel CTA events', () => {
    expect(
      buildVercelCustomEvent('cta_click', {
        cta_text: 'website',
        cta_location: 'instagram landing actions',
        platform: 'threads',
        service: 'infinity',
        destination: '/prism-infinity',
      }),
    ).toEqual({
      name: 'CTA Clicked',
      properties: {
        cta_text: 'website',
        cta_location: 'instagram landing actions',
      },
    })
  })

  it('builds compact external link events without leaking the full destination URL', () => {
    expect(
      buildVercelCustomEvent('external_link_click', {
        destination_host: 'calendar.notion.so',
        link_text: 'Book now',
      }),
    ).toEqual({
      name: 'External Link Clicked',
      properties: {
        destination_host: 'calendar.notion.so',
        link_text: 'Book now',
      },
    })
  })

  it('keeps legacy external destination URL support while preferring sanitized host input', () => {
    expect(
      buildVercelCustomEvent('external_link_click', {
        destination_url:
          'https://calendar.notion.so/meet/enzosison/oj1fm4o2p?foo=bar',
        link_text: 'Book now',
      }),
    ).toEqual({
      name: 'External Link Clicked',
      properties: {
        destination_host: 'calendar.notion.so',
        link_text: 'Book now',
      },
    })
  })

  it('builds compact booking and contact intent events', () => {
    expect(
      buildVercelCustomEvent('book_call_click', {
        destination_host: 'calendar.notion.so',
        booking_location: 'analysis_thank_you',
        link_text: 'Book my call',
      }),
    ).toEqual({
      name: 'Book Call Clicked',
      properties: {
        destination_host: 'calendar.notion.so',
        booking_location: 'analysis_thank_you',
        link_text: 'Book my call',
      },
    })

    expect(
      buildVercelCustomEvent('contact_action_click', {
        contact_method: 'email',
        contact_location: 'contact_page',
      }),
    ).toEqual({
      name: 'Contact Action Clicked',
      properties: {
        contact_method: 'email',
        contact_location: 'contact_page',
      },
    })
  })

  it('builds compact apply-submit events for the Vercel dashboard', () => {
    expect(
      buildVercelCustomEvent('apply_submit', {
        budget: '$3.5k to $5k',
        timeline: 'Within 30 days',
        service_count: 2,
        noisy: 'ignore',
      }),
    ).toEqual({
      name: 'Apply Submitted',
      properties: {
        budget: '$3.5k to $5k',
        timeline: 'Within 30 days',
        service_count: 2,
      },
    })
  })

  it('builds compact apply-submit attempt and success events for the Vercel dashboard', () => {
    expect(
      buildVercelCustomEvent('apply_submit_attempt', {
        budget: '$3.5k to $5k',
        timeline: 'Within 30 days',
        service_count: 2,
        elapsed_seconds: 44,
        noisy: 'ignore',
      }),
    ).toEqual({
      name: 'Apply Submit Attempted',
      properties: {
        budget: '$3.5k to $5k',
        timeline: 'Within 30 days',
        service_count: 2,
      },
    })

    expect(
      buildVercelCustomEvent('apply_submit_success', {
        budget: '$3.5k to $5k',
        timeline: 'Within 30 days',
        service_count: 2,
        noisy: 'ignore',
      }),
    ).toEqual({
      name: 'Apply Submit Succeeded',
      properties: {
        budget: '$3.5k to $5k',
        timeline: 'Within 30 days',
        service_count: 2,
      },
    })
  })

  it('builds compact apply-question events for the Vercel dashboard', () => {
    expect(
      buildVercelCustomEvent('apply_question_view', {
        step: 3,
        step_id: 'link',
        service_count: 1,
        noisy: 'ignore',
      }),
    ).toEqual({
      name: 'Apply Question Viewed',
      properties: {
        step: 3,
        step_id: 'link',
        service_count: 1,
      },
    })

    expect(
      buildVercelCustomEvent('apply_question_complete', {
        step: 3,
        step_id: 'link',
        service_count: 1,
        noisy: 'ignore',
      }),
    ).toEqual({
      name: 'Apply Question Completed',
      properties: {
        step: 3,
        step_id: 'link',
        service_count: 1,
      },
    })
  })

  it('builds compact apply-review and validation events for the Vercel dashboard', () => {
    expect(
      buildVercelCustomEvent('apply_review_view', {
        step: 9,
        step_id: 'review',
        service_count: 1,
      }),
    ).toEqual({
      name: 'Apply Review Viewed',
      properties: {
        step: 9,
        step_id: 'review',
        service_count: 1,
      },
    })

    expect(
      buildVercelCustomEvent('apply_validation_error', {
        step: 2,
        step_id: 'website',
        field_name: 'has_website',
        error_type: 'required',
        noisy: 'ignore',
      }),
    ).toEqual({
      name: 'Apply Validation Error',
      properties: {
        step: 2,
        step_id: 'website',
        field_name: 'has_website',
        error_type: 'required',
      },
    })
  })

  it('maps the renamed form submit success event into the same compact Vercel payload', () => {
    expect(
      buildVercelCustomEvent('form_submit_success', {
        form_name: 'contact',
        form_location: 'contact_form',
      }),
    ).toEqual({
      name: 'Form Submitted',
      properties: {
        form_name: 'contact',
        form_location: 'contact_form',
      },
    })
  })

  it('builds a compact lead-generated event for the confirmed apply success', () => {
    expect(
      buildVercelCustomEvent('generate_lead', {
        form_name: 'growth_application',
        form_location: 'apply_page',
        lead_type: 'growth_application',
        lead_source: 'google',
        budget: '$5k to $7.5k',
        service_count: 2,
        noisy: 'ignore',
      }),
    ).toEqual({
      name: 'Lead Generated',
      properties: {
        form_name: 'growth_application',
        form_location: 'apply_page',
        lead_type: 'growth_application',
        lead_source: 'google',
        budget: '$5k to $7.5k',
        service_count: 2,
      },
    })
  })

  it('ignores non-marketing custom events for Vercel event tracking', () => {
    expect(
      buildVercelCustomEvent('navigation', { destination: '/pricing' }),
    ).toBeNull()
  })

  describe('the waitlist funnel', () => {
    it('maps waitlist form view/start with allowlisted dimensions', () => {
      expect(
        buildVercelCustomEvent('waitlist_form_view', {
          form_name: 'waitlist',
          form_location: 'waitlist_page',
          prefilled_focus: 'website',
        }),
      ).toEqual({
        name: 'Waitlist Form Viewed',
        properties: {
          form_name: 'waitlist',
          form_location: 'waitlist_page',
          prefilled_focus: 'website',
        },
      })
      expect(
        buildVercelCustomEvent('waitlist_form_start', {
          form_name: 'waitlist',
          form_location: 'somewhere_else',
        }),
      ).toEqual({
        name: 'Waitlist Form Started',
        properties: { form_name: 'waitlist' },
      })
    })

    it('maps waitlist validation, attempt, success, and error events', () => {
      expect(
        buildVercelCustomEvent('waitlist_validation_error', {
          form_name: 'waitlist',
          field_name: 'email',
          invalid_count: 2,
        }),
      ).toEqual({
        name: 'Waitlist Validation Error',
        properties: { form_name: 'waitlist', field_name: 'email', invalid_count: 2 },
      })
      expect(
        buildVercelCustomEvent('waitlist_submit_attempt', {
          form_name: 'waitlist',
          form_location: 'waitlist_page',
        }),
      ).toEqual({
        name: 'Waitlist Submit Attempted',
        properties: { form_name: 'waitlist', form_location: 'waitlist_page' },
      })
      expect(
        buildVercelCustomEvent('waitlist_submit_success', {
          form_name: 'waitlist',
          form_location: 'waitlist_page',
          focus_count: 2,
        }),
      ).toEqual({
        name: 'Waitlist Submit Succeeded',
        properties: {
          form_name: 'waitlist',
          form_location: 'waitlist_page',
          focus_count: 2,
        },
      })
      expect(
        buildVercelCustomEvent('waitlist_submit_error', {
          form_name: 'waitlist',
          reason: 'non_ok_response',
          status: 500,
          email: 'leak@example.com',
        }),
      ).toEqual({
        name: 'Waitlist Submit Error',
        properties: { form_name: 'waitlist', reason: 'non_ok_response', status: 500 },
      })
    })

    it('drops unknown waitlist field names and reasons', () => {
      expect(
        buildVercelCustomEvent('waitlist_validation_error', {
          form_name: 'waitlist',
          field_name: 'goals_text_with_pii',
        }),
      ).toEqual({
        name: 'Waitlist Validation Error',
        properties: { form_name: 'waitlist' },
      })
    })

    it('no longer maps the retired intake funnel events', () => {
      expect(
        buildVercelCustomEvent('website_intake_form_view', {
          form_name: 'website_intake',
        }),
      ).toBeNull()
    })
  })

  describe('the flat-$300 website order funnel', () => {
    it('maps the order start', () => {
      expect(
        buildVercelCustomEvent('website_order_started', {
          form_name: 'website_order',
          form_location: 'website_order_form',
          entry_point: 'hero',
          noisy: 'ignore',
        }),
      ).toEqual({
        name: 'Website Order Started',
        properties: {
          form_name: 'website_order',
          form_location: 'website_order_form',
          entry_point: 'hero',
        },
      })
    })

    it('maps step completion', () => {
      expect(
        buildVercelCustomEvent('website_order_step_completed', {
          step: 3,
          step_id: 'brief',
          extra_noise: true,
        }),
      ).toEqual({
        name: 'Website Order Step Completed',
        properties: { step: 3, step_id: 'brief' },
      })
    })

    it('maps the submission', () => {
      expect(
        buildVercelCustomEvent('website_order_submitted', {
          value: 300,
          currency: 'USD',
          form_name: 'website_order',
          form_location: 'website_order_form',
        }),
      ).toEqual({
        name: 'Website Order Submitted',
        properties: {
          value: 300,
          currency: 'USD',
          form_name: 'website_order',
          form_location: 'website_order_form',
        },
      })
    })

    it('maps the checkout hand-off', () => {
      expect(
        buildVercelCustomEvent('website_order_begin_checkout', {
          value: 300,
          currency: 'USD',
          form_location: 'website_order_form',
        }),
      ).toEqual({
        name: 'Website Order Checkout Started',
        properties: {
          value: 300,
          currency: 'USD',
          form_location: 'website_order_form',
        },
      })
    })

    it('maps a completed purchase without leaking the transaction id', () => {
      // The Stripe session id is an opaque payment identifier; it belongs in
      // GA4 for de-duplication, not in the Vercel event property set.
      expect(
        buildVercelCustomEvent('purchase', {
          value: 300,
          currency: 'USD',
          item_name: 'Website by Prism',
          transaction_id: 'cs_live_a1b2c3',
        }),
      ).toEqual({
        name: 'Purchase Completed',
        properties: {
          value: 300,
          currency: 'USD',
          item_name: 'Website by Prism',
        },
      })
    })

    it('no longer maps the retired website build estimator events', () => {
      expect(
        buildVercelCustomEvent('website_build_estimator_start', {
          estimated_total: 1200,
        }),
      ).toBeNull()
      expect(
        buildVercelCustomEvent('website_build_submit_success', {
          estimated_total: 1200,
        }),
      ).toBeNull()
    })
  })
})

describe('marketing URL privacy', () => {
  it.each([
    'person%40example.com',
    'person%2540example.com',
    '%2B1%20916%20555%200142',
  ])('removes encoded personal campaign data: %s', (value) => {
    expect(
      normalizeVercelAnalyticsUrl(
        `https://www.design-prism.com/?utm_source=${value}&utm_medium=email`,
      ),
    ).toBe('https://www.design-prism.com/?utm_medium=email')
  })

  it('removes URL credentials while preserving legitimate campaign names', () => {
    expect(
      normalizeVercelAnalyticsUrl(
        'https://user:secret@www.design-prism.com/?utm_campaign=Fall%20Launch',
      ),
    ).toBe('https://www.design-prism.com/?utm_campaign=Fall+Launch')
  })
})
