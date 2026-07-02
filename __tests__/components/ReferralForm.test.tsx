import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import ReferralForm from '@/components/forms/ReferralForm'

const trackFormSubmission = jest.fn()

jest.mock('@/utils/analytics', () => ({
  trackFormSubmission: (...args: Array<unknown>) => trackFormSubmission(...args),
}))

function createMockResponse(ok = true): Response {
  return {
    ok,
    status: ok ? 200 : 500,
    headers: new Headers({ 'content-type': 'application/json' }),
    json: jest.fn().mockResolvedValue({}),
    text: jest.fn().mockResolvedValue(''),
  } as unknown as Response
}

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText(/^your name$/i), {
    target: { value: 'Alex Rivera' },
  })
  fireEvent.change(screen.getByLabelText(/^your email$/i), {
    target: { value: 'alex@example.com' },
  })
  fireEvent.change(screen.getByLabelText(/friend's name/i), {
    target: { value: 'Jordan Lee' },
  })
  fireEvent.change(screen.getByLabelText(/their email or phone/i), {
    target: { value: 'jordan@leedental.com' },
  })
}

describe('ReferralForm', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockReset()
  })

  it('renders the referral form with ops metadata and honeypot wired up', () => {
    const { container } = render(<ReferralForm />)

    const form = container.querySelector('form')
    expect(form).toHaveAttribute('id', 'referral')
    expect(form).toHaveAttribute('name', 'referral')

    expect(
      screen.getByDisplayValue('New referral — $100 program'),
    ).toHaveAttribute('name', '_subject')
    expect(container.querySelector('input[name="form_key"]')).toHaveValue(
      'referral',
    )
    expect(container.querySelector('input[name="_gotcha"]')).toBeTruthy()

    expect(
      screen.getByRole('button', { name: /send the referral/i }),
    ).toBeEnabled()
  })

  it('blocks submission and never fetches when required fields are empty', () => {
    render(<ReferralForm />)

    fireEvent.click(screen.getByRole('button', { name: /send the referral/i }))

    expect(screen.getByText(/enter your name/i)).toBeInTheDocument()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('submits the referral and shows the success state with a reset action', async () => {
    fetchSpy.mockImplementation(() => Promise.resolve(createMockResponse()))

    render(<ReferralForm />)
    fillRequiredFields()
    fireEvent.click(screen.getByRole('button', { name: /send the referral/i }))

    const heading = await screen.findByRole('heading', {
      name: /we'll take it from here\./i,
    })
    expect(heading).toBeInTheDocument()

    const body = fetchSpy.mock.calls[0]?.[1]?.body as FormData
    expect(body.get('referrer_name')).toBe('Alex Rivera')
    expect(body.get('referrer_email')).toBe('alex@example.com')
    expect(body.get('friend_name')).toBe('Jordan Lee')
    expect(body.get('friend_contact')).toBe('jordan@leedental.com')

    // Referral payouts are not sales leads: no Google Ads conversion.
    expect(trackFormSubmission).toHaveBeenCalledWith(
      'referral',
      'referral_form',
      expect.objectContaining({
        conversionMode: 'immediate',
        sendGoogleAdsConversion: false,
      }),
    )

    // "Refer another friend" resets the friend fields but keeps the referrer.
    fireEvent.click(
      screen.getByRole('button', { name: /refer another friend/i }),
    )
    expect(screen.getByLabelText(/^your name$/i)).toHaveValue('Alex Rivera')
    expect(screen.getByLabelText(/friend's name/i)).toHaveValue('')
  })

  it('keeps the user on the form with an inline error when submission fails', async () => {
    fetchSpy.mockImplementation(() =>
      Promise.resolve(createMockResponse(false)),
    )

    render(<ReferralForm />)
    fillRequiredFields()
    fireEvent.click(screen.getByRole('button', { name: /send the referral/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/we couldn't send your referral right now/i),
      ).toBeInTheDocument()
    })
    expect(
      screen.getByRole('button', { name: /send the referral/i }),
    ).toBeEnabled()
    expect(trackFormSubmission).not.toHaveBeenCalled()
  })
})
