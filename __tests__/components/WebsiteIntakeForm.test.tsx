import { fireEvent, render, screen, waitFor } from '@testing-library/react'

process.env.NEXT_PUBLIC_WEBSITE_INTAKE_FORM_ENDPOINT =
  'https://formspree.io/f/websiteintake'

jest.mock('@/components/lord-icon', () => ({
  __esModule: true,
  default: ({ src, active }: { src: string; active?: boolean }) => (
    <span data-testid="lord-icon" data-src={src} data-active={String(active)} />
  ),
}))

const trackEvent = jest.fn()
const trackLeadConversion = jest.fn()
const trackBookCallClick = jest.fn()

jest.mock('@/utils/analytics', () => ({
  trackEvent: (...args: Array<unknown>) => trackEvent(...args),
  trackLeadConversion: (...args: Array<unknown>) => trackLeadConversion(...args),
  trackBookCallClick: (...args: Array<unknown>) => trackBookCallClick(...args),
  trackCTAClick: jest.fn(),
}))

jest.mock('@/lib/booking', () => ({
  BOOKING_URL: 'https://calendar.notion.so/meet/enzosison/test',
}))

import WebsiteIntakeForm from '@/components/forms/WebsiteIntakeForm'

function createMockResponse(ok = true): Response {
  return {
    ok,
    status: ok ? 200 : 500,
    json: jest.fn().mockResolvedValue({}),
    text: jest.fn().mockResolvedValue(''),
  } as unknown as Response
}

describe('WebsiteIntakeForm', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockReset()
    window.history.replaceState({}, '', '/website-intake?utm_source=tiktok')
  })

  it('renders the first question with four Lordicon-backed options', () => {
    render(<WebsiteIntakeForm />)

    expect(
      screen.getByRole('heading', { name: /why do you want a new website/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/more customers/i)).toBeInTheDocument()
    expect(screen.getByText(/better design/i)).toBeInTheDocument()
    expect(screen.getByText(/better analytics/i)).toBeInTheDocument()
    expect(screen.getByText(/all of the above/i)).toBeInTheDocument()
    expect(screen.getAllByTestId('lord-icon')).toHaveLength(4)
    expect(screen.getByText(/1 of 4/i)).toBeInTheDocument()
  })

  it('blocks advancing until an option is selected', () => {
    render(<WebsiteIntakeForm />)

    fireEvent.click(screen.getByRole('button', { name: /continue/i }))

    expect(
      screen.getByRole('heading', { name: /why do you want a new website/i }),
    ).toBeInTheDocument()
    expect(
      trackEvent.mock.calls.some(
        (call) => call[0] === 'website_intake_validation_error',
      ),
    ).toBe(true)
  })

  it('walks the full funnel and submits to Formspree', async () => {
    fetchSpy.mockResolvedValue(createMockResponse(true))
    render(<WebsiteIntakeForm />)

    fireEvent.click(screen.getByText(/more customers/i))
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))

    expect(
      screen.getByRole('heading', {
        name: /when do you want your new website live/i,
      }),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByText(/next week/i))
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))

    expect(
      screen.getByRole('heading', { name: /do you have a current website/i }),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByText(/yes, i have a website/i))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))

    expect(
      screen.getByRole('heading', {
        name: /how would you like us to reach you/i,
      }),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByText(/email me/i))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'owner@example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: /get my new website/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1)
    })

    const [url, init] = fetchSpy.mock.calls[0]
    expect(url).toBe('https://formspree.io/f/websiteintake')
    expect(init?.method).toBe('POST')

    const body = init?.body as FormData
    expect(body.get('why_new_website')).toBe('more_customers')
    expect(body.get('timeline')).toBe('next_week')
    expect(body.get('has_current_website')).toBe('yes')
    expect(body.get('site_link')).toBe('https://example.com')
    expect(body.get('contact_method')).toBe('email')
    expect(body.get('email')).toBe('owner@example.com')
    expect(body.get('utm_source')).toBe('tiktok')

    await waitFor(() => {
      expect(screen.getByTestId('intake-success')).toBeInTheDocument()
    })
    expect(
      screen.getByText(/prism will reach out to you within 24 hours/i),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /book a 30 min zoom with prism/i }),
    ).toHaveAttribute(
      'href',
      'https://calendar.notion.so/meet/enzosison/test',
    )
    expect(trackLeadConversion).toHaveBeenCalled()
  })

  it('accepts a social link when the visitor has no website', async () => {
    fetchSpy.mockResolvedValue(createMockResponse(true))
    render(<WebsiteIntakeForm />)

    fireEvent.click(screen.getByText(/all of the above/i))
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    fireEvent.click(screen.getByText(/next 30 days/i))
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))

    fireEvent.click(screen.getByText(/no website yet/i))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'instagram.com/mybiz' },
    })
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))

    fireEvent.click(screen.getByText(/text me/i))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '(555) 123-4567' },
    })
    fireEvent.click(screen.getByRole('button', { name: /get my new website/i }))

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1))
    const body = fetchSpy.mock.calls[0][1]?.body as FormData
    expect(body.get('has_current_website')).toBe('no')
    expect(body.get('site_link')).toBe('https://instagram.com/mybiz')
    expect(body.get('contact_method')).toBe('text')
    expect(body.get('phone')).toBe('(555) 123-4567')
  })

  it('rejects an invalid email on the contact step', () => {
    render(<WebsiteIntakeForm />)

    fireEvent.click(screen.getByText(/better design/i))
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    fireEvent.click(screen.getByText(/next 3 months/i))
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    fireEvent.click(screen.getByText(/yes, i have a website/i))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))

    fireEvent.click(screen.getByText(/email me/i))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'not-an-email' },
    })
    fireEvent.click(screen.getByRole('button', { name: /get my new website/i }))

    expect(fetchSpy).not.toHaveBeenCalled()
    expect(
      screen.getByRole('heading', {
        name: /how would you like us to reach you/i,
      }),
    ).toBeInTheDocument()
  })
})
