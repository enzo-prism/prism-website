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

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText(/brand or business name/i), {
    target: { value: 'Prism Studio' },
  })
  fireEvent.change(screen.getByLabelText(/describe your website/i), {
    target: {
      value: 'A clean five-page site for a dental practice, minimal and warm.',
    },
  })
  fireEvent.change(screen.getByLabelText(/your name/i), {
    target: { value: 'Jordan Ramirez' },
  })
  fireEvent.change(screen.getByLabelText(/^email$/i), {
    target: { value: 'jordan@example.com' },
  })
}

describe('WebsiteOrderForm', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockReset()
  })

  it('renders a static flat $300 order form with no dynamic or estimated price', () => {
    const { container } = render(<WebsiteOrderForm />)

    const form = container.querySelector('form')
    expect(form).toHaveAttribute('id', 'website_order')
    expect(form).toHaveAttribute('action', 'https://formspree.io/f/xpqebnbz')

    // Flat, static price treatment is present...
    expect(screen.getByText('$300')).toBeInTheDocument()
    expect(screen.getByText(/flat · one-time/i)).toBeInTheDocument()

    // ...and there is no estimate / changing price range anywhere.
    expect(screen.queryByText(/estimat/i)).not.toBeInTheDocument()
    expect(
      screen.queryByText(/\$\d[\d,]*\s*[-–—]\s*\$?\d/),
    ).not.toBeInTheDocument()

    // Formspree ops metadata + hidden fixed order value are wired up.
    expect(
      screen.getByDisplayValue('New website order — $300'),
    ).toHaveAttribute('name', '_subject')
    expect(container.querySelector('input[name="form_key"]')).toHaveValue(
      'website-order',
    )
    expect(container.querySelector('input[name="order_value"]')).toHaveValue(
      '300',
    )
    expect(container.querySelector('input[name="_gotcha"]')).toBeInTheDocument()

    // The Stripe payment link is NOT exposed in the form state.
    expect(
      screen.queryByRole('link', { name: /pay \$300 to start building/i }),
    ).not.toBeInTheDocument()
  })

  it('submits the brief and reveals the success screen with the Stripe pay link', async () => {
    fetchSpy.mockImplementation(() => Promise.resolve(createMockResponse()))
    render(<WebsiteOrderForm />)

    fillRequiredFields()
    fireEvent.click(screen.getByRole('button', { name: /place my order/i }))

    // Success screen renders with the brand-aware recap.
    const heading = await screen.findByRole('heading', {
      name: /request received/i,
    })
    expect(heading).toBeInTheDocument()
    expect(
      screen.getByText(/we've got your vision for prism studio's website/i),
    ).toBeInTheDocument()

    // The form posted the full brief to Formspree as JSON.
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
    expect(body.get('order_value')).toBe('300')

    // The prominent pay CTA is a new-tab link to the configured Stripe link.
    const payLink = screen.getByRole('link', {
      name: /pay \$300 to start building/i,
    })
    expect(payLink).toHaveAttribute('target', '_blank')
    expect(payLink).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(payLink).toHaveAttribute('href', paymentLink('website'))
    expect(payLink.getAttribute('href')).toContain('buy.stripe.com')

    // Lead-style submit event fired with the flat $300 value.
    expect(trackEvent).toHaveBeenCalledWith(
      'website_order_submitted',
      expect.objectContaining({ value: 300, currency: 'USD' }),
    )

    // The begin-checkout event fires when the pay CTA is clicked.
    fireEvent.click(payLink)
    expect(trackEvent).toHaveBeenCalledWith(
      'website_order_begin_checkout',
      expect.objectContaining({ value: 300, currency: 'USD' }),
    )
  })

  it('keeps the user on the form with an inline error when submission fails', async () => {
    fetchSpy.mockImplementation(() =>
      Promise.resolve(createMockResponse({ ok: false, status: 500 })),
    )
    render(<WebsiteOrderForm />)

    fillRequiredFields()
    fireEvent.click(screen.getByRole('button', { name: /place my order/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/we couldn't place your order right now/i),
      ).toBeInTheDocument()
    })

    expect(
      screen.queryByRole('heading', { name: /request received/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /pay \$300 to start building/i }),
    ).not.toBeInTheDocument()
  })

  it('blocks submission and never fetches when required fields are empty', async () => {
    render(<WebsiteOrderForm />)

    fireEvent.click(screen.getByRole('button', { name: /place my order/i }))

    await waitFor(() => {
      expect(document.getElementById('brand_name-error')).toHaveTextContent(
        /enter your brand or business name|constraints not satisfied/i,
      )
    })
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(
      screen.queryByRole('heading', { name: /request received/i }),
    ).not.toBeInTheDocument()
  })
})
