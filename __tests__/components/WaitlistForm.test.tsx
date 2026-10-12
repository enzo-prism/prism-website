import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import WaitlistForm from '@/components/forms/WaitlistForm'
import { PRISM_SERVICES } from '@/lib/services'
import {
  getWaitlistIntakeMonth,
  WAITLIST_DRAFT_STORAGE_KEY,
} from '@/lib/waitlist'

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

const noWebsiteCheckbox = () =>
  screen.getByRole('checkbox', { name: /i don.t have a website yet/i })

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

  it('renders card choices with clean names, the shared service promises, and a spectrum progress bar', async () => {
    const { container } = render(<WaitlistForm initialFocus={['content']} />)

    // Names stay exactly the option label; the service promise is the
    // accessible description, so screen readers and tests get both cleanly.
    for (const service of PRISM_SERVICES) {
      const checkbox = screen.getByRole('checkbox', { name: service.name })
      expect(checkbox).toHaveAccessibleDescription(service.navDescription)
      expect(checkbox.closest('label')).toBeInTheDocument()
    }
    expect(screen.getByRole('checkbox', { name: 'Content' })).toBeChecked()
    // "Not sure yet" sits after the services with its own one-liner.
    const notSure = screen.getByRole('checkbox', { name: 'Not sure yet' })
    expect(notSure).toHaveAttribute('value', 'not-sure')
    expect(notSure).toHaveAccessibleDescription(/where to start/i)
    expect(notSure).not.toBeChecked()

    const segments = container.querySelectorAll('[data-waitlist-progress] > li')
    expect(segments).toHaveLength(5)
    expect(
      Array.from(segments).map((segment) => segment.getAttribute('data-state')),
    ).toEqual(['complete', 'upcoming', 'upcoming', 'upcoming', 'upcoming'])
    expect(container.querySelector('[data-waitlist-progress]')).toHaveAttribute(
      'aria-hidden',
      'true',
    )

    // Step 1 has no Back; pressing Continue never steals focus from a field
    // (a blur error would shift the button out from under the pointer).
    expect(screen.queryByRole('button', { name: /^back$/i })).not.toBeInTheDocument()
    expect(fireEvent.mouseDown(continueButton())).toBe(false)

    await advance()
    expect(
      Array.from(container.querySelectorAll('[data-waitlist-progress] > li')).map(
        (segment) => segment.getAttribute('data-state'),
      ),
    ).toEqual(['complete', 'complete', 'upcoming', 'upcoming', 'upcoming'])
    expect(screen.getByRole('button', { name: /^back$/i })).toHaveAttribute('type', 'button')
    expect(continueButton()).toHaveAttribute('type', 'submit')
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

  it('names the live intake month on the timing step only', async () => {
    render(<WaitlistForm />)
    const intakeMonth = getWaitlistIntakeMonth().month

    expect(
      screen.queryByText(/our next intake starts in/i),
    ).not.toBeInTheDocument()

    await advance()
    expectStep(2)
    expect(stepHeading()).toMatch(/when do you want to start\?/i)
    expect(screen.getByText(/our next intake starts in/i)).toHaveTextContent(
      `Our next intake starts in ${intakeMonth}.`,
    )

    fireEvent.click(screen.getByRole('radio', { name: /as soon as possible/i }))
    await advance()
    expectStep(3)
    expect(
      screen.queryByText(/our next intake starts in/i),
    ).not.toBeInTheDocument()
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
    expect(formData.has('focus_other')).toBe(false)
    expect(formData.has('no_website')).toBe(false)
    expect(screen.queryByLabelText(/something else/i)).not.toBeInTheDocument()
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

  it('restores a same-tab draft on reload and reports exactly one step view, for the restored step', async () => {
    const { unmount } = render(<WaitlistForm />)
    await advance()
    fireEvent.click(screen.getByRole('radio', { name: /just exploring/i }))
    await advance()
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'Jordan' },
    })
    unmount()
    trackEvent.mockClear()

    render(<WaitlistForm />)
    expectStep(3)
    expect(screen.getByLabelText(/first name/i)).toHaveValue('Jordan')
    expect(trackEvent).toHaveBeenCalledWith(
      'waitlist_form_view',
      expect.objectContaining({ resumed_step: 3 }),
    )

    const stepViews = trackEvent.mock.calls.filter(
      ([name]) => name === 'waitlist_step_view',
    )
    expect(stepViews).toHaveLength(1)
    expect(stepViews[0][1]).toMatchObject({ step: 3, step_name: 'about' })
    expect(trackEvent).not.toHaveBeenCalledWith(
      'waitlist_step_view',
      expect.objectContaining({ step: 1 }),
    )
  })

  it('clears the shared link error when a sibling link field is filled', async () => {
    render(<WaitlistForm />)
    await completeToGoals({ link: false })
    expect(await screen.findByText(/add at least one link/i)).toBeInTheDocument()

    fireEvent.input(screen.getByLabelText(/anything else/i), {
      target: { value: 'https://dribbble.com/example' },
    })

    expect(screen.queryByText(/add at least one link/i)).not.toBeInTheDocument()
    expect(screen.getByLabelText(/^website$/i)).not.toHaveAttribute('aria-invalid', 'true')

    await advance()
    expect(stepHeading()).toMatch(/what do you want to achieve\?/i)
  })
  it('treats "Not sure yet" as exclusive with the services and submits it in focus[]', async () => {
    fetchSpy.mockResolvedValue(createMockResponse(true))
    render(<WaitlistForm initialFocus={['website', 'ads']} />)

    const notSure = screen.getByRole('checkbox', { name: 'Not sure yet' })
    fireEvent.click(notSure)
    expect(notSure).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Website' })).not.toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Ads' })).not.toBeChecked()

    // Picking a service again clears "Not sure yet".
    fireEvent.click(screen.getByRole('checkbox', { name: 'Content' }))
    expect(screen.getByRole('checkbox', { name: 'Content' })).toBeChecked()
    expect(notSure).not.toBeChecked()

    fireEvent.click(notSure)
    await completeToGoals()
    expect(screen.getByText(/your answers/i).nextElementSibling).toHaveTextContent(
      /^Not sure yet · In 1–3 months · jordan@example\.com$/,
    )

    fireEvent.change(screen.getByLabelText(/your goals/i), {
      target: { value: 'Help us pick where to start.' },
    })
    fireEvent.click(submitButton())

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/waitlist/thank-you'))
    const [, options] = fetchSpy.mock.calls[0] as [RequestInfo | URL, RequestInit]
    expect((options.body as FormData).getAll('focus[]')).toEqual(['not-sure'])
    // focus_count stays the number of services (0-3), so "not sure" is 0.
    expect(trackEvent).toHaveBeenCalledWith(
      'waitlist_submit_success',
      expect.objectContaining({ form_name: 'waitlist', focus_count: 0 }),
    )
    // The ?focus= hand-off is unchanged.
    expect(trackEvent).toHaveBeenCalledWith(
      'waitlist_form_view',
      expect.objectContaining({ prefilled_focus: 'website,ads' }),
    )
  })

  it('lets an owner with no website pass the links step and submits no_website=yes', async () => {
    fetchSpy.mockResolvedValue(createMockResponse(true))
    render(<WaitlistForm />)
    await completeToGoals({ link: false })

    // Stuck without a link at first, with a pointer to the escape hatch.
    expect(
      await screen.findByText(/add at least one link, or check the box below/i),
    ).toBeInTheDocument()
    expect(noWebsiteCheckbox()).not.toBeChecked()

    fireEvent.click(noWebsiteCheckbox())

    expect(noWebsiteCheckbox()).toBeChecked()
    expect(screen.queryByText(/add at least one link/i)).not.toBeInTheDocument()
    expect(screen.getByLabelText(/^website$/i)).toBeDisabled()
    expect(screen.getByLabelText(/^website$/i)).not.toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText(/that.s what we build/i)).toBeInTheDocument()
    // The other links stay optional and editable.
    expect(screen.getByLabelText(/social profile/i)).toBeEnabled()
    expect(screen.getByLabelText(/anything else/i)).toBeEnabled()

    await advance()
    expect(stepHeading()).toMatch(/what do you want to achieve\?/i)
    expect(trackEvent).toHaveBeenCalledWith(
      'waitlist_step_complete',
      expect.objectContaining({ step: 4, step_name: 'links' }),
    )

    fireEvent.change(screen.getByLabelText(/your goals/i), {
      target: { value: 'A first website.' },
    })
    fireEvent.click(submitButton())

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/waitlist/thank-you'))
    const [, options] = fetchSpy.mock.calls[0] as [RequestInfo | URL, RequestInit]
    const formData = options.body as FormData
    expect(formData.get('no_website')).toBe('yes')
    expect(formData.get('link_website')).toBe('')
    expect(formData.get('link_social')).toBe('')
    expect(formData.get('goals')).toBe('A first website.')
  })

  it('brings the link rule back when the no-website box is unchecked', async () => {
    render(<WaitlistForm />)
    await completeToGoals({ link: false })
    expect(await screen.findByText(/add at least one link/i)).toBeInTheDocument()

    fireEvent.click(noWebsiteCheckbox())
    expect(screen.queryByText(/add at least one link/i)).not.toBeInTheDocument()

    fireEvent.click(noWebsiteCheckbox())
    expect(screen.getByLabelText(/^website$/i)).toBeEnabled()

    fireEvent.click(continueButton())
    expect(await screen.findByText(/add at least one link/i)).toBeInTheDocument()
    expect(stepHeading()).toMatch(/where can we see your work\?/i)
    expect(trackEvent).toHaveBeenCalledWith(
      'waitlist_validation_error',
      expect.objectContaining({ step: 4, step_name: 'links', field_name: 'link_website' }),
    )
  })

  it('restores the no-website answer from a same-tab draft', async () => {
    const { unmount } = render(<WaitlistForm />)
    await completeToGoals({ link: false })
    fireEvent.click(noWebsiteCheckbox())
    unmount()

    render(<WaitlistForm />)
    expectStep(4)
    expect(noWebsiteCheckbox()).toBeChecked()
    expect(screen.getByLabelText(/^website$/i)).toBeDisabled()
  })
})
