import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import WaitlistForm from '@/components/forms/WaitlistForm'
import { WAITLIST_DRAFT_STORAGE_KEY } from '@/lib/waitlist'

const pushMock = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => '/waitlist',
}))

const trackEvent = jest.fn()
const trackFormSubmission = jest.fn()
jest.mock('@/utils/analytics', () => ({
  trackEvent: (...args: Array<unknown>) => trackEvent(...args),
  trackFormSubmission: (...args: Array<unknown>) =>
    trackFormSubmission(...args),
}))

function createMockResponse(ok = true): Response {
  return {
    ok,
    status: ok ? 200 : 500,
    json: jest.fn().mockResolvedValue({}),
    text: jest.fn().mockResolvedValue(''),
  } as unknown as Response
}

const continueButton = () => screen.getByRole('button', { name: /continue/i })
const submitButton = () =>
  screen.getByRole('button', { name: /join the waitlist/i })

function stepHeading() {
  return screen.getByRole('heading', { level: 2 }).textContent
}

// The progress label and the aria-live announcement both say "Step x of 5".
function expectStep(step: number) {
  expect(screen.getAllByText(new RegExp(`step ${step} of 5`, 'i')).length).toBeGreaterThan(0)
}

async function advance() {
  fireEvent.click(continueButton())
  await waitFor(() => expect(trackEvent).toHaveBeenCalled())
}

async function completeToGoals(options: { link?: boolean } = { link: true }) {
  // 1 focus (optional)
  await advance()
  // 2 timing
  fireEvent.click(screen.getByRole('radio', { name: /in 1–3 months/i }))
  await advance()
  // 3 about
  fireEvent.change(screen.getByLabelText(/first name/i), {
    target: { value: 'Jordan' },
  })
  fireEvent.change(screen.getByLabelText(/last name/i), {
    target: { value: 'Ramirez' },
  })
  fireEvent.change(screen.getByLabelText(/^email$/i), {
    target: { value: 'jordan@example.com' },
  })
  await advance()
  // 4 links
  if (options.link) {
    fireEvent.change(screen.getByLabelText(/^website$/i), {
      target: { value: 'https://example.com' },
    })
  }
  await advance()
}

describe('WaitlistForm (stepped flow)', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockReset()
    window.localStorage.clear()
    window.sessionStorage.clear()
    window.history.replaceState(
      {},
      '',
      '/waitlist?focus=website&utm_source=instagram&utm_medium=social',
    )
  })

  it('opens on the focus step with the ?focus= prefill and reports view events', () => {
    const { container } = render(<WaitlistForm initialFocus={['website']} />)

    const form = container.querySelector('form#waitlist')
    expect(form).toHaveAttribute('name', 'waitlist')
    expect(form).toHaveAttribute('action', expect.stringMatching(/^https:\/\/formspree\.io\/f\//))
    expect(form).toHaveAttribute('data-step', 'focus')
    expectStep(1)
    expect(stepHeading()).toMatch(/what should prism focus on\?/i)

    expect(screen.getByRole('checkbox', { name: /website/i })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: /content/i })).not.toBeChecked()
    expect(screen.getByRole('checkbox', { name: /ads/i })).not.toBeChecked()

    expect(container.querySelector('input[name="_subject"]')).toHaveValue(
      'New Prism waitlist application',
    )
    expect(container.querySelector('input[name="form_key"]')).toHaveValue('waitlist')
    expect(container.querySelector('input[name="_gotcha"]')).toBeInTheDocument()

    expect(trackEvent).toHaveBeenCalledWith(
      'waitlist_form_view',
      expect.objectContaining({ form_name: 'waitlist', prefilled_focus: 'website' }),
    )
    expect(trackEvent).toHaveBeenCalledWith(
      'waitlist_step_view',
      expect.objectContaining({ step: 1, step_name: 'focus' }),
    )
  })

  it('requires a timing choice before leaving step 2 and reports the error', async () => {
    render(<WaitlistForm />)
    await advance()
    expect(stepHeading()).toMatch(/when do you want to start\?/i)

    fireEvent.click(continueButton())

    expect(await screen.findByText(/pick the timing that fits best/i)).toBeInTheDocument()
    expect(stepHeading()).toMatch(/when do you want to start\?/i)
    expect(trackEvent).toHaveBeenCalledWith(
      'waitlist_validation_error',
      expect.objectContaining({ step: 2, step_name: 'timing', field_name: 'start_timing' }),
    )
    expect(trackEvent).not.toHaveBeenCalledWith(
      'waitlist_step_complete',
      expect.objectContaining({ step: 2 }),
    )
  })

  it('validates the contact step inline and clears errors as the visitor types', async () => {
    render(<WaitlistForm />)
    await advance()
    fireEvent.click(screen.getByRole('radio', { name: /as soon as possible/i }))
    await advance()
    expect(stepHeading()).toMatch(/how do we reach you\?/i)

    fireEvent.click(continueButton())
    expect(await screen.findByText(/add your first name/i)).toBeInTheDocument()
    expect(screen.getByText(/add an email so we can reach you/i)).toBeInTheDocument()

    fireEvent.input(screen.getByLabelText(/first name/i), {
      target: { value: 'Jordan' },
    })
    expect(screen.queryByText(/add your first name/i)).not.toBeInTheDocument()
    expect(stepHeading()).toMatch(/how do we reach you\?/i)
  })

  it('requires at least one link but accepts a social profile alone', async () => {
    render(<WaitlistForm />)
    await completeToGoals({ link: false })

    expect(await screen.findByText(/add at least one link/i)).toBeInTheDocument()
    expect(stepHeading()).toMatch(/where can we see your work\?/i)
    expect(fetchSpy).not.toHaveBeenCalled()

    fireEvent.change(screen.getByLabelText(/social profile/i), {
      target: { value: 'https://instagram.com/example' },
    })
    await advance()
    expect(stepHeading()).toMatch(/what do you want to achieve\?/i)
  })

  it('walks Back without losing answers and lets Edit jump to step 1', async () => {
    render(<WaitlistForm />)
    await completeToGoals()
    expectStep(5)

    fireEvent.click(screen.getByRole('button', { name: /^back$/i }))
    expect(stepHeading()).toMatch(/where can we see your work\?/i)
    expect(screen.getByLabelText(/^website$/i)).toHaveValue('https://example.com')

    await advance()
    fireEvent.click(screen.getByRole('button', { name: /^edit$/i }))
    expectStep(1)
  })

  it('submits every answer with attribution once, tracks success, and redirects', async () => {
    fetchSpy.mockResolvedValue(createMockResponse(true))
    render(<WaitlistForm initialFocus={['website']} />)

    fireEvent.click(screen.getByRole('checkbox', { name: /ads/i }))
    fireEvent.change(screen.getByLabelText(/something else/i), {
      target: { value: 'Photography' },
    })
    await completeToGoals()

    fireEvent.change(screen.getByLabelText(/your goals/i), {
      target: { value: 'More qualified inquiries from the website.' },
    })
    fireEvent.click(submitButton())

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(pushMock).toHaveBeenCalledWith('/waitlist/thank-you')
    })

    const [, options] = fetchSpy.mock.calls[0] as [RequestInfo | URL, RequestInit]
    expect(options.method).toBe('POST')
    expect(options.headers).toMatchObject({ Accept: 'application/json' })
    const formData = options.body as FormData
    expect(formData.get('first_name')).toBe('Jordan')
    expect(formData.get('last_name')).toBe('Ramirez')
    expect(formData.get('email')).toBe('jordan@example.com')
    expect(formData.get('link_website')).toBe('https://example.com')
    expect(formData.get('goals')).toMatch(/qualified inquiries/)
    expect(formData.get('start_timing')).toBe('1_3_months')
    expect(formData.getAll('focus[]')).toEqual(['website', 'ads'])
    expect(formData.get('focus_other')).toBe('Photography')
    expect(formData.get('form_name')).toBe('waitlist')
    expect(formData.get('form_key')).toBe('waitlist')
    expect(formData.get('site')).toBe('prism-site')
    expect(formData.get('utm_source')).toBe('instagram')
    expect(formData.get('landing_path')).toBe('/waitlist')
    expect(formData.get('submission_path')).toBe('/waitlist')

    expect(trackEvent).toHaveBeenCalledWith(
      'waitlist_form_start',
      expect.objectContaining({ form_name: 'waitlist', step: 1, step_name: 'focus' }),
    )
    expect(
      trackEvent.mock.calls.filter(([name]) => name === 'waitlist_form_start'),
    ).toHaveLength(1)
    for (const [step, stepName] of [
      [1, 'focus'],
      [2, 'timing'],
      [3, 'about'],
      [4, 'links'],
      [5, 'goals'],
    ] as const) {
      expect(trackEvent).toHaveBeenCalledWith(
        'waitlist_step_view',
        expect.objectContaining({ step, step_name: stepName }),
      )
      expect(trackEvent).toHaveBeenCalledWith(
        'waitlist_step_complete',
        expect.objectContaining({ step, step_name: stepName }),
      )
    }
    expect(trackEvent).toHaveBeenCalledWith(
      'waitlist_submit_attempt',
      expect.objectContaining({ form_name: 'waitlist' }),
    )
    expect(trackEvent).toHaveBeenCalledWith(
      'waitlist_submit_success',
      expect.objectContaining({ form_name: 'waitlist', focus_count: 2 }),
    )
    expect(trackFormSubmission).toHaveBeenCalledWith('waitlist', 'waitlist_page', {
      lead_type: 'waitlist',
    })
    expect(window.sessionStorage.getItem(WAITLIST_DRAFT_STORAGE_KEY)).toBeNull()
  })

  it('keeps the visitor on the last step and reports the error when Formspree fails', async () => {
    fetchSpy.mockResolvedValue(createMockResponse(false))
    render(<WaitlistForm />)
    await completeToGoals()
    fireEvent.change(screen.getByLabelText(/your goals/i), {
      target: { value: 'Grow.' },
    })

    fireEvent.click(submitButton())

    expect(await screen.findByText(/try again/i)).toBeInTheDocument()
    expect(pushMock).not.toHaveBeenCalled()
    expect(trackFormSubmission).not.toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith(
      'waitlist_submit_error',
      expect.objectContaining({ reason: 'non_ok_response', status: 500 }),
    )
  })

  it('restores a same-tab draft on reload', async () => {
    const { unmount } = render(<WaitlistForm />)
    await advance()
    fireEvent.click(screen.getByRole('radio', { name: /just exploring/i }))
    await advance()
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'Jordan' },
    })
    unmount()

    render(<WaitlistForm />)
    expectStep(3)
    expect(screen.getByLabelText(/first name/i)).toHaveValue('Jordan')
    expect(trackEvent).toHaveBeenCalledWith(
      'waitlist_form_view',
      expect.objectContaining({ resumed_step: 3 }),
    )
  })
})
