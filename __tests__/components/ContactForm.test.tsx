import { fireEvent, render, screen, waitFor } from '@testing-library/react'

const pushMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}))

jest.mock('@vercel/analytics', () => ({
  track: jest.fn(),
}))

jest.mock('@/lib/constants', () => ({
  GOOGLE_ADS_LEAD_CONVERSION_SEND_TO: 'AW-TEST/lead',
  GOOGLE_ADS_PURCHASE_CONVERSION_SEND_TO: 'AW-TEST/purchase',
  IS_ANALYTICS_ENABLED: true,
  isAnalyticsReportingHost: (host?: string) =>
    jest.requireActual('@/lib/constants').isAnalyticsReportingHost(host),
}))

jest.mock('@/lib/marketing-attribution', () => ({
  getAttributionContext: () => ({
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'contact-fix',
    landing_path: '/contact',
    first_touch_source: 'google',
    first_touch_medium: 'cpc',
    first_touch_campaign: 'contact-fix',
  }),
}))

jest.mock('@/utils/sentry-helpers', () => ({
  addBreadcrumb: jest.fn(),
  captureErrorWithContext: jest.fn(),
  isSentryInitialized: () => false,
}))

import ContactForm from '@/components/forms/ContactForm'
import { consumePendingLeadConversion } from '@/utils/analytics'

function createMockResponse(ok = true): Response {
  return {
    ok,
    status: ok ? 200 : 500,
    json: jest.fn().mockResolvedValue({}),
    text: jest.fn().mockResolvedValue(''),
  } as unknown as Response
}

function gtagCallsNamed(eventName: string) {
  return (window.gtag as jest.Mock).mock.calls.filter(
    ([, name]) => name === eventName,
  )
}

describe('ContactForm lead conversion', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockReset()
    window.sessionStorage.clear()
    window.dataLayer = []
    window.gtag = jest.fn()
    window.history.replaceState({}, '', '/contact')
    document.title = 'Contact | Prism'
  })

  it('does not emit generate_lead on render or form_start', () => {
    render(<ContactForm />)

    expect(gtagCallsNamed('generate_lead')).toHaveLength(0)
    expect(gtagCallsNamed('form_start')).toHaveLength(0)
    expect(gtagCallsNamed('form_submit_success')).toHaveLength(0)
    expect(consumePendingLeadConversion()).toBeNull()
  })

  it('emits generate_lead once after a successful submit and does not queue a thank-you conversion', async () => {
    fetchSpy.mockResolvedValue(createMockResponse(true))
    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText(/^name$/i), {
      target: { value: 'Jordan Ramirez' },
    })
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'jordan@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/^message$/i), {
      target: { value: 'Need a website rebuild for a local practice.' },
    })
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(gtagCallsNamed('generate_lead')).toHaveLength(1)
    })

    expect(gtagCallsNamed('form_submit_success')).toHaveLength(1)
    expect(gtagCallsNamed('generate_lead')[0][2]).toEqual(
      expect.objectContaining({
        form_name: 'contact',
        form_location: 'contact_form',
        lead_type: 'contact',
        page_path: '/contact',
        value: 60,
      }),
    )
    expect(consumePendingLeadConversion()).toBeNull()
    expect(pushMock).toHaveBeenCalledWith('/thank-you')
  })
})
