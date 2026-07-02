import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import WebsiteOrderForm from '@/components/forms/WebsiteOrderForm'
import { paymentLink } from '@/lib/payment-links'

const trackEvent = jest.fn()

jest.mock('@/utils/analytics', () => ({
  trackEvent: (...args: Array<unknown>) => trackEvent(...args),
}))

type MockResponseOverrides = {
  ok?: boolean
  status?: number
}

function createMockResponse(overrides: MockResponseOverrides = {}): Response {
  const ok = overrides.ok ?? true
  const status = overrides.status ?? (ok ? 200 : 500)

  return {
    ok,
    status,
    headers: new Headers({ 'content-type': 'application/json' }),
    json: jest.fn().mockResolvedValue({}),
    text: jest.fn().mockResolvedValue(''),
  } as unknown as Response
}

function openOverlay() {
  fireEvent.click(screen.getByRole('button', { name: /start your website/i }))
  return screen.getByRole('dialog')
}

function continueStep() {
  fireEvent.click(screen.getByRole('button', { name: /^continue$/i }))
}

function walkToReview() {
  // Step 1: brand (required)
  fireEvent.change(screen.getByLabelText(/brand or business name/i), {
    target: { value: 'Prism Studio' },
  })
  continueStep()

  // Step 2: audience + goal (optional) — skip
  continueStep()

  // Step 3: brief (required)
  fireEvent.change(screen.getByLabelText(/describe your website/i), {
    target: {
      value: 'A clean five-page site for a dental practice, minimal and warm.',
    },
  })
  continueStep()

  // Step 4: references + timeline (optional) — skip
  continueStep()

  // Step 5: contact (required)
  fireEvent.change(screen.getByLabelText(/your name/i), {
    target: { value: 'Jordan Ramirez' },
  })
  fireEvent.change(screen.getByLabelText(/^email$/i), {
    target: { value: 'jordan@example.com' },
  })
  continueStep()
}

describe('WebsiteOrderForm', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockReset()
    window.sessionStorage.clear()
    window.history.replaceState(null, '', '/websites')
  })

  it('renders a static flat $300 launcher with no dynamic or estimated price', () => {
    render(<WebsiteOrderForm />)

    // Flat, static price treatment is present before the flow even opens...
    expect(screen.getByText('$300')).toBeInTheDocument()
    expect(screen.getByText(/flat · one-time/i)).toBeInTheDocument()

    // ...and there is no estimate / changing price range anywhere.
    expect(screen.queryByText(/estimat/i)).not.toBeInTheDocument()
    expect(
      screen.queryByText(/\$\d[\d,]*\s*[-–—]\s*\$?\d/),
    ).not.toBeInTheDocument()

    // The fullscreen flow stays closed until the visitor starts it, and the
    // Stripe payment link is not exposed anywhere in the launcher.
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /pay \$300 to start building/i }),
    ).not.toBeInTheDocument()
  })

  it('opens the fullscreen flow with the Formspree order form wired up', () => {
    const { baseElement } = render(<WebsiteOrderForm />)

    const dialog = openOverlay()
    expect(dialog).toHaveAttribute('aria-modal', 'true')

    const form = baseElement.querySelector('form')
    expect(form).toHaveAttribute('id', 'website_order')
    expect(form).toHaveAttribute('action', 'https://formspree.io/f/xpqebnbz')

    // Formspree ops metadata + hidden fixed order value are wired up.
    expect(
      screen.getByDisplayValue('New website order — $300'),
    ).toHaveAttribute('name', '_subject')
    expect(baseElement.querySelector('input[name="form_key"]')).toHaveValue(
      'website-order',
    )
    expect(baseElement.querySelector('input[name="order_value"]')).toHaveValue(
      '300',
    )
    expect(baseElement.querySelector('input[name="_gotcha"]')).toBeTruthy()

    // One question at a time: the first step is visible, later steps hidden.
    expect(
      screen.getByRole('heading', { name: /what's your brand called\?/i }),
    ).toBeVisible()
    expect(
      baseElement.querySelector('[data-order-step="contact"]'),
    ).not.toBeVisible()
  })

  it('blocks advancing past a required step and shows the inline error', () => {
    render(<WebsiteOrderForm />)
    openOverlay()

    continueStep()

    expect(
      screen.getByText(/enter your brand or business name/i),
    ).toBeInTheDocument()
    // Still on step 1.
    expect(
      screen.getByRole('heading', { name: /what's your brand called\?/i }),
    ).toBeVisible()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('walks the steps, shows the review manifest, submits, and reveals the Stripe pay link', async () => {
    fetchSpy.mockImplementation(() => Promise.resolve(createMockResponse()))

    render(<WebsiteOrderForm />)
    openOverlay()
    walkToReview()

    // Review shows the collected order and the fixed flat terms.
    expect(
      screen.getByRole('heading', { name: /review your order/i }),
    ).toBeVisible()
    expect(screen.getAllByText('Prism Studio').length).toBeGreaterThanOrEqual(1)
    expect(
      screen.getAllByText(/jordan ramirez · jordan@example\.com/i).length,
    ).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/\$300 flat/i).length).toBeGreaterThanOrEqual(1)

    fireEvent.click(screen.getByRole('button', { name: /place my order/i }))

    const heading = await screen.findByRole('heading', {
      name: /request received/i,
    })
    expect(heading).toBeInTheDocument()
    expect(
      screen.getByText(/we've got your vision for prism studio's website/i),
    ).toBeInTheDocument()

    // The submission posted the full brief to Formspree.
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://formspree.io/f/xpqebnbz',
      expect.objectContaining({
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: expect.any(FormData),
      }),
    )
    const body = fetchSpy.mock.calls[0]?.[1]?.body as FormData
    expect(body.get('brand_name')).toBe('Prism Studio')
    expect(body.get('project_brief')).toContain('five-page site')
    expect(body.get('full_name')).toBe('Jordan Ramirez')
    expect(body.get('email')).toBe('jordan@example.com')
    expect(body.get('audience')).toBe('')

    expect(trackEvent).toHaveBeenCalledWith(
      'website_order_submitted',
      expect.objectContaining({ value: 300, currency: 'USD' }),
    )

    // The Stripe link only appears after a successful submission (overlay
    // success panel + the launcher behind it), always in a new tab.
    const payLinks = screen.getAllByRole('link', {
      name: /pay \$300 to start building/i,
    })
    expect(payLinks.length).toBeGreaterThanOrEqual(1)
    for (const link of payLinks) {
      expect(link).toHaveAttribute('href', paymentLink('website'))
      expect(link).toHaveAttribute('target', '_blank')
    }

    fireEvent.click(payLinks[0])
    expect(trackEvent).toHaveBeenCalledWith(
      'website_order_begin_checkout',
      expect.objectContaining({ value: 300 }),
    )
  })

  it('keeps the user on review with an inline error when submission fails', async () => {
    fetchSpy.mockImplementation(() =>
      Promise.resolve(createMockResponse({ ok: false })),
    )

    render(<WebsiteOrderForm />)
    openOverlay()
    walkToReview()

    fireEvent.click(screen.getByRole('button', { name: /place my order/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/we couldn't place your order right now/i),
      ).toBeInTheDocument()
    })

    // Still on the review step, ready to retry.
    expect(
      screen.getByRole('heading', { name: /review your order/i }),
    ).toBeVisible()
    expect(
      screen.getByRole('button', { name: /place my order/i }),
    ).toBeEnabled()
  })

  it('preserves a draft across close and reopen', () => {
    render(<WebsiteOrderForm />)
    openOverlay()

    fireEvent.change(screen.getByLabelText(/brand or business name/i), {
      target: { value: 'Saved Draft Co' },
    })
    continueStep()

    fireEvent.click(screen.getByRole('button', { name: /close order form/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // The launcher acknowledges the saved draft...
    fireEvent.click(screen.getByRole('button', { name: /resume your order/i }))

    // ...and the flow resumes past step 1 with the value intact.
    expect(screen.getByLabelText(/brand or business name/i)).toHaveValue(
      'Saved Draft Co',
    )
    expect(
      screen.getByRole('heading', {
        name: /who's it for, and what's the goal\?/i,
      }),
    ).toBeVisible()
  })

  it('lets the review edit links jump back to a step and return to review', () => {
    render(<WebsiteOrderForm />)
    openOverlay()
    walkToReview()

    fireEvent.click(screen.getByRole('button', { name: /edit site for/i }))
    expect(
      screen.getByRole('heading', { name: /what's your brand called\?/i }),
    ).toBeVisible()

    fireEvent.change(screen.getByLabelText(/brand or business name/i), {
      target: { value: 'Renamed Studio' },
    })
    continueStep()

    expect(
      screen.getByRole('heading', { name: /review your order/i }),
    ).toBeVisible()
    expect(screen.getAllByText('Renamed Studio').length).toBeGreaterThanOrEqual(1)
  })
})
