import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import GetStartedForm from '@/components/forms/GetStartedForm'

const pushMock = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}))

const trackCTAClick = jest.fn()
const trackEvent = jest.fn()
const trackFormSubmission = jest.fn()
const storePendingApplyLeadContext = jest.fn()

jest.mock('@/utils/analytics', () => ({
  trackCTAClick: (...args: Array<unknown>) => trackCTAClick(...args),
  trackEvent: (...args: Array<unknown>) => trackEvent(...args),
  trackFormSubmission: (...args: Array<unknown>) =>
    trackFormSubmission(...args),
  storePendingApplyLeadContext: (...args: Array<unknown>) =>
    storePendingApplyLeadContext(...args),
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
    text: jest.fn().mockResolvedValue(''),
  } as unknown as Response
}

function completeStepOne() {
  fireEvent.click(screen.getByRole('checkbox', { name: /new website/i }))
  fireEvent.click(screen.getByRole('button', { name: /continue/i }))

  fireEvent.click(screen.getByLabelText(/^yes$/i))
  fireEvent.click(screen.getByRole('button', { name: /continue/i }))

  fireEvent.change(screen.getByLabelText(/what should we review/i), {
    target: { value: 'design-prism.com' },
  })
  fireEvent.click(screen.getByRole('button', { name: /continue/i }))

  fireEvent.click(screen.getByLabelText(/more leads/i))
  fireEvent.click(screen.getByRole('button', { name: /continue/i }))
}

function completeContextQuestions() {
  fireEvent.click(screen.getByLabelText(/\$1\.5k to \$3k/i))
  fireEvent.click(screen.getByRole('button', { name: /continue/i }))

  fireEvent.click(screen.getByLabelText(/within 30 days/i))
  fireEvent.click(screen.getByRole('button', { name: /continue/i }))

  fireEvent.change(screen.getByLabelText(/company name/i), {
    target: { value: 'Prism' },
  })
  fireEvent.click(screen.getByRole('button', { name: /continue/i }))

  fireEvent.change(screen.getByLabelText(/full name/i), {
    target: { value: 'Jordan Ramirez' },
  })
  fireEvent.change(screen.getByLabelText(/^email$/i), {
    target: { value: 'jordan@example.com' },
  })
  fireEvent.click(screen.getByRole('button', { name: /continue/i }))

  fireEvent.change(screen.getByLabelText(/anything important/i), {
    target: {
      value: 'We want a cleaner site and better lead flow before summer.',
    },
  })
  fireEvent.click(screen.getByRole('button', { name: /review/i }))
}

describe('GetStartedForm', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockReset()
  })

  it('renders step 1 with the hidden Formspree metadata', () => {
    const { container } = render(<GetStartedForm />)

    expect(container.querySelector('form')).toHaveAttribute(
      'action',
      'https://formspree.io/f/mreroojo',
    )
    expect(container.querySelector('form')).toHaveAttribute(
      'name',
      'growth_application',
    )
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /what do you need help with/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByDisplayValue('New Prism application')).toHaveAttribute(
      'name',
      '_subject',
    )
    expect(screen.getByDisplayValue('growth_application')).toHaveAttribute(
      'name',
      'form_name',
    )
    expect(
      screen.getByRole('button', { name: /continue/i }),
    ).toBeInTheDocument()
    expect(trackEvent).toHaveBeenCalledWith(
      'apply_question_view',
      expect.objectContaining({
        form_name: 'growth_application',
        form_location: 'apply_page',
        step: 1,
        step_id: 'services',
      }),
    )
  })

  it('blocks progress and shows inline errors when the current answer is missing', async () => {
    render(<GetStartedForm />)

    fireEvent.click(screen.getByRole('button', { name: /continue/i }))

    await waitFor(() => {
      expect(document.getElementById('service_focus-error')).toHaveTextContent(
        /choose at least one area|constraints not satisfied/i,
      )
    })
    expect(trackEvent).toHaveBeenCalledWith(
      'apply_validation_error',
      expect.objectContaining({
        step: 1,
        step_id: 'services',
        field_name: 'service_focus',
        error_type: 'required',
      }),
    )

    fireEvent.click(screen.getByRole('checkbox', { name: /new website/i }))
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))

    await waitFor(() => {
      expect(document.getElementById('has_website-error')).toHaveTextContent(
        /let us know if you have a website/i,
      )
    })
    expect(trackEvent).toHaveBeenCalledWith(
      'apply_validation_error',
      expect.objectContaining({
        step: 2,
        step_id: 'website',
        field_name: 'has_website',
        error_type: 'required',
      }),
    )

    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('tracks the first meaningful interaction as an apply form start only once', () => {
    render(<GetStartedForm />)

    fireEvent.click(screen.getByRole('checkbox', { name: /new website/i }))
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    fireEvent.click(screen.getByLabelText(/^yes$/i))

    const applyFormStartCalls = trackEvent.mock.calls.filter(
      ([eventName]) => eventName === 'apply_form_start',
    )

    expect(applyFormStartCalls).toHaveLength(1)
    expect(applyFormStartCalls[0]).toEqual([
      'apply_form_start',
      expect.objectContaining({
        form_name: 'growth_application',
        form_location: 'apply_page',
        step: 1,
      }),
    ])
  })

  it('advances to budget after the focused fit questions', async () => {
    render(<GetStartedForm />)

    completeStepOne()

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /monthly budget/i,
        }),
      ).toBeInTheDocument()
    })

    expect(trackCTAClick).toHaveBeenCalledWith(
      'continue application',
      'apply form step 1',
    )
    expect(trackEvent).toHaveBeenCalledWith(
      'apply_step_1_complete',
      expect.objectContaining({
        step: 1,
        service_count: 1,
      }),
    )
  })

  it('posts the application payload and redirects to the apply thank-you state', async () => {
    fetchSpy.mockImplementation(() => Promise.resolve(createMockResponse()))
    render(<GetStartedForm />)

    completeStepOne()
    completeContextQuestions()

    expect(fetchSpy).not.toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith(
      'apply_review_view',
      expect.objectContaining({
        form_name: 'growth_application',
        form_location: 'apply_page',
        step_id: 'review',
      }),
    )

    fireEvent.click(screen.getByRole('button', { name: /submit application/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(pushMock).toHaveBeenCalledWith('/thank-you?source=apply')
      expect(storePendingApplyLeadContext).toHaveBeenCalledWith(
        expect.objectContaining({
          form_name: 'growth_application',
          form_location: 'apply_page',
          lead_type: 'growth_application',
          budget: '$1.5k to $3k',
          timeline: 'Within 30 days',
          service_count: 1,
          primary_goal: 'I need more leads/customers online',
          has_website: 'yes',
        }),
      )
    })

    expect(trackEvent).toHaveBeenCalledWith(
      'apply_submit_attempt',
      expect.objectContaining({
        budget: '$1.5k to $3k',
        timeline: 'Within 30 days',
        service_count: 1,
      }),
    )
    expect(trackEvent).toHaveBeenCalledWith(
      'apply_submit',
      expect.objectContaining({
        budget: '$1.5k to $3k',
        timeline: 'Within 30 days',
        service_count: 1,
      }),
    )
    expect(trackEvent).toHaveBeenCalledWith(
      'apply_submit_success',
      expect.objectContaining({
        budget: '$1.5k to $3k',
        timeline: 'Within 30 days',
        service_count: 1,
      }),
    )

    const [, options] = fetchSpy.mock.calls[0] as [
      RequestInfo | URL,
      RequestInit,
    ]

    expect(options.method).toBe('POST')
    expect(options.headers).toMatchObject({ Accept: 'application/json' })

    const formData = options.body as FormData
    expect(formData.get('has_website')).toBe('yes')
    expect(formData.get('review_link')).toBe('https://design-prism.com')
    expect(formData.get('primary_goal')).toBe(
      'I need more leads/customers online',
    )
    expect(formData.get('service_focus')).toBe('New website')
    expect(formData.getAll('service_interest[]')).toEqual(['New website'])
    expect(formData.get('budget')).toBe('$1.5k to $3k')
    expect(formData.get('timeline')).toBe('Within 30 days')
    expect(formData.get('company')).toBe('Prism')
    expect(formData.get('full_name')).toBe('Jordan Ramirez')
    expect(formData.get('email')).toBe('jordan@example.com')
    expect(formData.get('additional_context')).toContain('cleaner site')
    expect(formData.get('_subject')).toBe('New Prism application')
    expect(formData.get('form_name')).toBe('growth_application')
  })

  it('keeps the user on step 2 with inline error state when submission fails', async () => {
    fetchSpy.mockImplementation(() =>
      Promise.resolve(createMockResponse({ ok: false, status: 500 })),
    )
    render(<GetStartedForm />)

    completeStepOne()

    fireEvent.click(screen.getByLabelText(/\$1k to \$1\.5k/i))
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))

    fireEvent.click(screen.getByLabelText(/asap/i))
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))

    fireEvent.change(screen.getByLabelText(/company name/i), {
      target: { value: 'Prism' },
    })
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'Jordan Ramirez' },
    })
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'jordan@example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    fireEvent.click(screen.getByRole('button', { name: /review/i }))

    fireEvent.click(screen.getByRole('button', { name: /submit application/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(pushMock).not.toHaveBeenCalled()
      expect(trackFormSubmission).not.toHaveBeenCalled()
      expect(storePendingApplyLeadContext).not.toHaveBeenCalled()
      expect(
        screen.getAllByText("We couldn't submit right now. Try again?").length,
      ).toBeGreaterThan(0)
    })

    expect(trackEvent).toHaveBeenCalledWith(
      'apply_submit_attempt',
      expect.objectContaining({
        budget: '$1k to $1.5k',
        timeline: 'ASAP',
        service_count: 1,
      }),
    )
    expect(trackEvent).not.toHaveBeenCalledWith(
      'apply_submit_success',
      expect.anything(),
    )
    expect(trackEvent).not.toHaveBeenCalledWith(
      'apply_submit',
      expect.anything(),
    )
    expect(trackEvent).toHaveBeenCalledWith(
      'apply_error',
      expect.objectContaining({
        reason: 'non_ok_response',
        status: 500,
      }),
    )
  })
})
