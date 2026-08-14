import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

process.env.NEXT_PUBLIC_WEBSITE_INTAKE_FORM_ENDPOINT =
  'https://formspree.io/f/websiteintake'

jest.mock('@/components/lord-icon', () => ({
  __esModule: true,
  default: ({ src, active }: { src: string; active?: boolean }) => (
    <span data-testid="lord-icon" data-src={src} data-active={String(active)} />
  ),
}))

const trackEvent = jest.fn()
const trackFormSubmission = jest.fn()
const trackBookCallClick = jest.fn()

jest.mock('@/utils/analytics', () => ({
  trackEvent: (...args: Array<unknown>) => trackEvent(...args),
  trackFormSubmission: (...args: Array<unknown>) =>
    trackFormSubmission(...args),
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

async function advanceFromWhy(label = /more customers/i) {
  fireEvent.click(screen.getByText(label))
  await waitFor(() => {
    expect(
      screen.getByRole('heading', {
        name: /when do you want your new website live/i,
      }),
    ).toBeInTheDocument()
  })
}

async function advanceFromTimeline(label = /next week/i) {
  fireEvent.click(screen.getByText(label))
  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: /do you have a current website/i }),
    ).toBeInTheDocument()
  })
}

describe('WebsiteIntakeForm', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')

  beforeEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
    fetchSpy.mockReset()
    window.sessionStorage.clear()
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
    expect(
      screen.getByRole('group', { name: /why do you want a new website/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('progressbar', { name: /website intake progress/i }),
    ).toHaveAttribute('aria-valuenow', '1')

    const option = screen.getByRole('button', { name: /more customers/i })
    expect(option).toHaveAttribute('aria-pressed', 'false')
    fireEvent.click(option)
    expect(option).toHaveAttribute('aria-pressed', 'true')
  })

  it('shows a visible error instead of silently blocking continue', () => {
    render(<WebsiteIntakeForm />)

    fireEvent.click(screen.getByRole('button', { name: /continue/i }))

    expect(
      screen.getByRole('heading', { name: /why do you want a new website/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/choose what matters most/i)).toBeInTheDocument()
    expect(
      trackEvent.mock.calls.some(
        (call) => call[0] === 'website_intake_validation_error',
      ),
    ).toBe(true)
  })

  it('auto-advances after a single-select answer', async () => {
    render(<WebsiteIntakeForm />)

    fireEvent.click(screen.getByText(/better design/i))

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: /when do you want your new website live/i,
        }),
      ).toBeInTheDocument()
    })
    expect(screen.getByText(/2 of 4/i)).toBeInTheDocument()
  })

  it('walks the full funnel and submits to Formspree', async () => {
    fetchSpy.mockResolvedValue(createMockResponse(true))
    render(<WebsiteIntakeForm />)

    await advanceFromWhy()
    await advanceFromTimeline()

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
    fireEvent.click(screen.getByText(/tiktok/i))
    const honeypot = screen
      .getByTestId('website-intake-form')
      .querySelector<HTMLInputElement>('input[name="_gotcha"]')
    expect(honeypot).not.toBeNull()
    fireEvent.change(honeypot!, { target: { value: 'bot-filled-value' } })
    fireEvent.click(screen.getByRole('button', { name: /start my website/i }))

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
    expect(body.get('heard_about_us')).toBe('TikTok')
    expect(body.get('utm_source')).toBe('tiktok')
    expect(body.get('form_key')).toBe('website_intake')
    expect(body.get('_gotcha')).toBe('bot-filled-value')

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
    expect(trackFormSubmission).toHaveBeenCalledWith(
      'website_intake',
      'website_intake_page',
      expect.objectContaining({
        conversionMode: 'immediate',
        sendGoogleAdsConversion: true,
        lead_type: 'website_intake',
      }),
    )
  })

  it('accepts a social link when the visitor has no website', async () => {
    fetchSpy.mockResolvedValue(createMockResponse(true))
    render(<WebsiteIntakeForm />)

    await advanceFromWhy(/all of the above/i)
    await advanceFromTimeline(/next 30 days/i)

    fireEvent.click(screen.getByText(/no website yet/i))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'instagram.com/mybiz' },
    })
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))

    fireEvent.click(screen.getByText(/text me/i))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '(555) 123-4567' },
    })
    fireEvent.click(screen.getByRole('button', { name: /start my website/i }))

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1))
    const body = fetchSpy.mock.calls[0][1]?.body as FormData
    expect(body.get('has_current_website')).toBe('no')
    expect(body.get('site_link')).toBe('https://instagram.com/mybiz')
    expect(body.get('contact_method')).toBe('text')
    expect(body.get('phone')).toBe('(555) 123-4567')
    expect(body.get('sms_consent')).toBe('yes')
  })

  it('sets bounded contact fields and shows privacy and SMS disclosures', async () => {
    render(<WebsiteIntakeForm />)

    await advanceFromWhy()
    await advanceFromTimeline()
    fireEvent.click(screen.getByText(/yes, i have a website/i))

    const siteInput = screen.getByRole('textbox')
    expect(siteInput).toHaveAttribute('maxlength', '500')
    fireEvent.change(siteInput, { target: { value: 'example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))

    fireEvent.click(screen.getByText(/email me/i))
    expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '254')
    expect(
      screen.getByRole('link', { name: /privacy policy/i }),
    ).toHaveAttribute('href', '/privacy-policy')

    fireEvent.click(screen.getByText(/text me/i))
    expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '30')
    expect(
      screen.getByText(/message and data rates may apply/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/reply stop to opt out/i)).toBeInTheDocument()
  })

  it.each([
    ['current website', /yes, i have a website/i, 'example.com'],
    ['social profile', /no website yet/i, 'instagram.com/mybiz'],
  ])(
    'only accepts HTTP(S) URLs for a %s while normalizing a domain',
    async (_linkKind, optionLabel, ordinaryDomain) => {
      render(<WebsiteIntakeForm />)

      await advanceFromWhy()
      await advanceFromTimeline()

      fireEvent.click(screen.getByText(optionLabel))
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'ftp://example.com' },
      })
      fireEvent.click(screen.getByRole('button', { name: /continue/i }))

      expect(screen.getByText(/add a valid link/i)).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: /do you have a current website/i }),
      ).toBeInTheDocument()

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: ordinaryDomain },
      })
      fireEvent.click(screen.getByRole('button', { name: /continue/i }))

      expect(
        screen.getByRole('heading', {
          name: /how would you like us to reach you/i,
        }),
      ).toBeInTheDocument()
    },
  )

  it('guards against rapid duplicate submissions before React state updates', async () => {
    let resolveFetch: ((response: Response) => void) | undefined
    fetchSpy.mockImplementation(
      () =>
        new Promise<Response>((resolve) => {
          resolveFetch = resolve
        }),
    )
    render(<WebsiteIntakeForm />)

    await advanceFromWhy()
    await advanceFromTimeline()
    fireEvent.click(screen.getByText(/yes, i have a website/i))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    fireEvent.click(screen.getByText(/email me/i))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'owner@example.com' },
    })

    const form = screen.getByTestId('website-intake-form')
    fireEvent.submit(form)
    fireEvent.submit(form)

    expect(fetchSpy).toHaveBeenCalledTimes(1)

    resolveFetch?.(createMockResponse(true))
    await waitFor(() => {
      expect(screen.getByTestId('intake-success')).toBeInTheDocument()
    })
  })

  it('times out a stalled request, categorizes it, and allows a retry', async () => {
    render(<WebsiteIntakeForm />)

    await advanceFromWhy()
    await advanceFromTimeline()
    fireEvent.click(screen.getByText(/yes, i have a website/i))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    fireEvent.click(screen.getByText(/email me/i))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'owner@example.com' },
    })

    fetchSpy.mockImplementationOnce(
      (_url, init) =>
        new Promise<Response>((_resolve, reject) => {
          const signal = init?.signal
          signal?.addEventListener(
            'abort',
            () => reject(new DOMException('Aborted', 'AbortError')),
            { once: true },
          )
        }),
    )

    jest.useFakeTimers()
    const form = screen.getByTestId('website-intake-form')
    fireEvent.submit(form)

    await act(async () => {
      jest.advanceTimersByTime(12_000)
      await Promise.resolve()
    })

    expect(
      screen.getByText(/request took too long.*try again/i),
    ).toBeInTheDocument()
    expect(trackEvent).toHaveBeenCalledWith(
      'website_intake_submit_error',
      expect.objectContaining({ reason: 'timeout' }),
    )

    jest.useRealTimers()
    fetchSpy.mockResolvedValueOnce(createMockResponse(true))
    fireEvent.submit(form)

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(2))
    await waitFor(() => {
      expect(screen.getByTestId('intake-success')).toBeInTheDocument()
    })
  })

  it('distinguishes non-2xx responses from network failures', async () => {
    render(<WebsiteIntakeForm />)

    await advanceFromWhy()
    await advanceFromTimeline()
    fireEvent.click(screen.getByText(/yes, i have a website/i))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    fireEvent.click(screen.getByText(/email me/i))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'owner@example.com' },
    })

    const form = screen.getByTestId('website-intake-form')
    fetchSpy.mockResolvedValueOnce(createMockResponse(false))
    fireEvent.submit(form)

    await waitFor(() => {
      expect(trackEvent).toHaveBeenCalledWith(
        'website_intake_submit_error',
        expect.objectContaining({ reason: 'non_ok_response', status: 500 }),
      )
    })

    fetchSpy.mockRejectedValueOnce(new Error('offline'))
    fireEvent.submit(form)

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(2))
    expect(trackEvent).toHaveBeenCalledWith(
      'website_intake_submit_error',
      expect.objectContaining({ reason: 'network_failure' }),
    )
  })

  it('sanitizes malformed drafts so required steps cannot be bypassed', () => {
    window.sessionStorage.setItem(
      'prism_website_intake_draft_v1',
      JSON.stringify({
        version: 2,
        updatedAt: Date.now(),
        why: true,
        timeline: 'next_week',
        hasWebsite: 'yes',
        siteLink: 'example.com',
        contactMethod: 'email',
        email: 'owner@example.com',
        source: 'made-up-source',
        stepId: 'contact',
      }),
    )

    render(<WebsiteIntakeForm />)

    expect(
      screen.getByRole('heading', { name: /why do you want a new website/i }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', {
        name: /how would you like us to reach you/i,
      }),
    ).not.toBeInTheDocument()
    expect(
      window.sessionStorage.getItem('prism_website_intake_draft_v1'),
    ).toBeNull()
  })

  it('discards expired drafts containing stale contact details', () => {
    window.sessionStorage.setItem(
      'prism_website_intake_draft_v1',
      JSON.stringify({
        version: 2,
        updatedAt: Date.now() - 24 * 60 * 60 * 1000 - 1,
        why: 'more_customers',
        timeline: 'next_week',
        hasWebsite: 'yes',
        siteLink: 'example.com',
        contactMethod: 'email',
        email: 'stale@example.com',
        stepId: 'contact',
      }),
    )

    render(<WebsiteIntakeForm />)

    expect(
      screen.getByRole('heading', { name: /why do you want a new website/i }),
    ).toBeInTheDocument()
    expect(
      window.sessionStorage.getItem('prism_website_intake_draft_v1'),
    ).toBeNull()
  })

  it('rejects an invalid email on the contact step', async () => {
    render(<WebsiteIntakeForm />)

    await advanceFromWhy(/better design/i)
    await advanceFromTimeline(/next 3 months/i)
    fireEvent.click(screen.getByText(/yes, i have a website/i))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))

    fireEvent.click(screen.getByText(/email me/i))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'not-an-email' },
    })
    fireEvent.click(screen.getByRole('button', { name: /start my website/i }))

    expect(fetchSpy).not.toHaveBeenCalled()
    expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /how would you like us to reach you/i,
      }),
    ).toBeInTheDocument()
  })

  it('restores a same-tab draft after the visitor leaves and comes back', async () => {
    const { unmount } = render(<WebsiteIntakeForm />)

    await advanceFromWhy()
    unmount()

    render(<WebsiteIntakeForm />)

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: /when do you want your new website live/i,
        }),
      ).toBeInTheDocument()
    })
  })

  it('lets Enter advance a validated step', async () => {
    render(<WebsiteIntakeForm />)

    fireEvent.click(screen.getByText(/more customers/i))
    const form = screen.getByTestId('website-intake-form')
    fireEvent.keyDown(form, { key: 'Enter' })

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: /when do you want your new website live/i,
        }),
      ).toBeInTheDocument()
    })
  })
})
