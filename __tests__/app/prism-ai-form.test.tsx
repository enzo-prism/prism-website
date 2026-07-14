import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import PrismAIClient from '@/app/ai/prism-ai-client'

const trackFormSubmission = jest.fn()

jest.mock('@/utils/analytics', () => ({
  trackFormSubmission: (...args: Array<unknown>) =>
    trackFormSubmission(...args),
}))

function completeFirstTwoSteps() {
  fireEvent.change(screen.getByLabelText(/website name/i), {
    target: { value: 'Prism QA' },
  })
  fireEvent.change(screen.getByLabelText(/website goal/i), {
    target: { value: 'Explain the offer clearly' },
  })
  fireEvent.click(screen.getByRole('button', { name: /next/i }))
  fireEvent.click(screen.getByRole('button', { name: /next/i }))
}

function fillContactStep() {
  fireEvent.change(screen.getByLabelText(/company name/i), {
    target: { value: 'Prism QA' },
  })
  fireEvent.change(screen.getByLabelText(/^email$/i), {
    target: { value: 'qa@example.com' },
  })
  fireEvent.change(screen.getByLabelText(/phone number/i), {
    target: { value: '7075550199' },
  })
}

describe('PrismAIClient', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockReset()
  })

  it('requires explicit text consent before submitting the request', () => {
    render(<PrismAIClient />)
    completeFirstTwoSteps()
    fillContactStep()

    fireEvent.click(screen.getByRole('button', { name: /send my brief/i }))

    expect(
      screen.getByText(/text message consent is required/i),
    ).toBeInTheDocument()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('submits consent and keeps the success promise review-led', async () => {
    fetchSpy.mockResolvedValue({ ok: true } as Response)

    render(<PrismAIClient />)
    completeFirstTwoSteps()
    fillContactStep()
    const consent = screen.getByRole('checkbox', {
      name: /i agree to receive text messages/i,
    })
    fireEvent.click(consent)
    expect(consent).toBeChecked()

    fireEvent.click(screen.getByRole('button', { name: /send my brief/i }))

    await screen.findByRole('heading', { name: /request received/i })
    expect(
      screen.getByText(/review your brief and text you about the next step/i),
    ).toBeInTheDocument()

    const body = fetchSpy.mock.calls[0]?.[1]?.body as FormData
    expect(body.get('phone_number')).toBe('7075550199')
    expect(body.get('sms_consent')).toBe('yes')
    expect(trackFormSubmission).toHaveBeenCalled()
  })
})
