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
const storeApplyDashboardClaimUrl = jest.fn()

jest.mock('@/utils/analytics', () => ({
  trackCTAClick: (...args: Array<unknown>) => trackCTAClick(...args),
  trackEvent: (...args: Array<unknown>) => trackEvent(...args),
  trackFormSubmission: (...args: Array<unknown>) =>
    trackFormSubmission(...args),
  storePendingApplyLeadContext: (...args: Array<unknown>) =>
    storePendingApplyLeadContext(...args),
}))

jest.mock('@/lib/dashboard-claim', () => ({
  extractDashboardClaimUrl: (payload: unknown) => {
    const dashboard =
      typeof payload === 'object' && payload !== null
        ? (payload as { dashboard?: { claimUrl?: unknown } }).dashboard
        : null

    return typeof dashboard?.claimUrl === 'string' ? dashboard.claimUrl : null
  },
  storeApplyDashboardClaimUrl: (...args: Array<unknown>) =>
    storeApplyDashboardClaimUrl(...args),
}))

type MockResponseOverrides = {
  ok?: boolean
  status?: number
  body?: unknown
}

function createMockResponse(overrides: MockResponseOverrides = {}): Response {
  const ok = overrides.ok ?? true
  const status = overrides.status ?? (ok ? 200 : 500)

  return {
    ok,
    status,
    headers: new Headers({ 'content-type': 'application/json' }),
    json: jest.fn().mockResolvedValue(overrides.body ?? {}),
    text: jest.fn().mockResolvedValue(''),
  } as unknown as Response
}

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

function clickContinue() {
  fireEvent.click(screen.getByRole('button', { name: /continue/i }))
}

function completeFocus() {
  fireEvent.click(screen.getByRole('checkbox', { name: /more qualified leads/i }))
  clickContinue()
}

function completeLink(value = 'design-prism.com') {
  fireEvent.change(screen.getByLabelText(/what should we review/i), {
    target: { value },
  })
  clickContinue()
}

function completeFit() {
  fireEvent.click(screen.getByLabelText(/\$3\.5k to \$5k/i))
  fireEvent.click(screen.getByLabelText(/within 30 days/i))
  clickContinue()
}

function completePractice(value = 'Prism') {
  fireEvent.change(screen.getByLabelText(/business name/i), {
    target: { value },
  })
  clickContinue()
}

function completeContact() {
  fireEvent.change(screen.getByLabelText(/full name/i), {
    target: { value: 'Jordan Ramirez' },
  })
  fireEvent.change(screen.getByLabelText(/^email$/i), {
    target: { value: 'jordan@example.com' },
  })
  clickContinue()
}

function reachReview() {
  completeFocus()
  completeLink()
  completeFit()
  completePractice()
  completeContact()
}

describe('GetStartedForm', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockReset()
    window.sessionStorage.clear()
    mockMatchMedia(false)
  })

  it('renders the compressed first step with hidden Formspree metadata', async () => {
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
        name: /what do you want improved/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByDisplayValue('New Prism Growth Dashboard request'),
    ).toHaveAttribute('name', '_subject')
    expect(screen.getByDisplayValue('growth_application')).toHaveAttribute(
      'name',
      'form_name',
    )
    expect(container.querySelector('input[name="site"]')).toHaveValue(
      'prism-site',
    )
    expect(container.querySelector('input[name="form_key"]')).toHaveValue(
      'apply',
    )
    expect(container.querySelector('input[name="_codex_test"]')).toHaveValue(
      'false',
    )
    expect(
      screen.getByRole('button', { name: /continue/i }),
    ).toBeInTheDocument()
    await waitFor(() => {
      expect(trackEvent).toHaveBeenCalledWith(
        'apply_question_view',
        expect.objectContaining({
          form_name: 'growth_application',
          form_location: 'apply_page',
          step: 1,
          step_id: 'focus',
          question_count: 6,
        }),
      )
    })
  })

  it('blocks progress and shows inline errors when required answers are missing', async () => {
    render(<GetStartedForm />)

    clickContinue()

    await waitFor(() => {
      expect(document.getElementById('service_focus-error')).toHaveTextContent(
        /choose at least one focus|constraints not satisfied/i,
      )
    })
    expect(trackEvent).toHaveBeenCalledWith(
      'apply_validation_error',
      expect.objectContaining({
        step: 1,
        step_id: 'focus',
        field_name: 'service_focus',
        error_type: 'required',
      }),
    )

    fireEvent.click(screen.getByRole('checkbox', { name: /more qualified leads/i }))
    clickContinue()
    clickContinue()

    await waitFor(() => {
      expect(document.getElementById('review_link-error')).toHaveTextContent(
        /add a link we can review/i,
      )
    })
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('tracks the first meaningful interaction as an apply form start only once', () => {
    render(<GetStartedForm />)

    fireEvent.click(screen.getByRole('checkbox', { name: /more qualified leads/i }))
    clickContinue()
    fireEvent.click(screen.getByLabelText(/profile \/ social/i))

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
        step_id: 'focus',
      }),
    ])
  })

  it('advances to fit after the focused intake questions', async () => {
    render(<GetStartedForm />)

    completeFocus()
    completeLink()

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /after the free audit/i,
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
        step_id: 'link',
        service_count: 1,
      }),
    )
  })

  it('allows the optional fit step to be skipped', async () => {
    render(<GetStartedForm />)

    completeFocus()
    completeLink()
    clickContinue()

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /business name/i,
        }),
      ).toBeInTheDocument()
    })
  })

  it('advances answered steps with Enter and forward arrow shortcuts', async () => {
    render(<GetStartedForm />)

    const focus = screen.getByRole('checkbox', { name: /more qualified leads/i })
    fireEvent.click(focus)
    fireEvent.keyDown(focus, { key: 'ArrowRight', code: 'ArrowRight' })

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /where should we look first/i,
        }),
      ).toBeInTheDocument()
    })

    const reviewLinkInput = screen.getByLabelText(/what should we review/i)
    fireEvent.change(reviewLinkInput, {
      target: { value: 'design-prism.com' },
    })
    fireEvent.keyDown(reviewLinkInput, { key: 'Enter', code: 'Enter' })

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /after the free audit/i,
        }),
      ).toBeInTheDocument()
    })
  })

  it('keeps native arrow behavior for text inputs and radio groups', async () => {
    render(<GetStartedForm />)

    completeFocus()

    const reviewLinkInput = screen.getByLabelText(/what should we review/i)
    fireEvent.change(reviewLinkInput, {
      target: { value: 'design-prism.com' },
    })
    fireEvent.keyDown(reviewLinkInput, {
      key: 'ArrowRight',
      code: 'ArrowRight',
    })

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /where should we look first/i,
      }),
    ).toBeInTheDocument()

    fireEvent.keyDown(reviewLinkInput, { key: 'Enter', code: 'Enter' })

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /after the free audit/i,
        }),
      ).toBeInTheDocument()
    })

    const budgetOption = screen.getByLabelText(/\$3\.5k to \$5k/i)
    fireEvent.keyDown(budgetOption, { key: 'ArrowDown', code: 'ArrowDown' })

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /after the free audit/i,
      }),
    ).toBeInTheDocument()
  })

  it('moves back with reverse arrow shortcuts from non-editing controls', async () => {
    render(<GetStartedForm />)

    completeFocus()
    completeLink()

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /after the free audit/i,
        }),
      ).toBeInTheDocument()
    })

    fireEvent.keyDown(screen.getByRole('button', { name: /continue/i }), {
      key: 'ArrowLeft',
      code: 'ArrowLeft',
    })

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /where should we look first/i,
        }),
      ).toBeInTheDocument()
    })
  })

  it('lets review rows jump back for edits and return directly to review', async () => {
    render(<GetStartedForm />)

    reachReview()

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /review and submit/i,
        }),
      ).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /edit business/i }))

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /business name/i,
        }),
      ).toBeInTheDocument()
    })

    fireEvent.change(screen.getByLabelText(/business name/i), {
      target: { value: 'Prism Dental' },
    })
    clickContinue()

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /review and submit/i,
        }),
      ).toBeInTheDocument()
      expect(screen.getByText('Prism Dental')).toBeInTheDocument()
    })
  })

  it('restores a session draft after reload', async () => {
    const { unmount } = render(<GetStartedForm />)

    completeFocus()
    fireEvent.change(screen.getByLabelText(/what should we review/i), {
      target: { value: 'design-prism.com' },
    })

    await waitFor(() => {
      expect(
        window.sessionStorage.getItem('prism_apply_draft_v1'),
      ).toContain('design-prism.com')
    })

    unmount()
    render(<GetStartedForm />)

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /where should we look first/i,
        }),
      ).toBeInTheDocument()
      expect(screen.getByLabelText(/what should we review/i)).toHaveValue(
        'design-prism.com',
      )
    })
  })

  it('skips autofocus on mobile viewports', async () => {
    mockMatchMedia(true)
    const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus')

    render(<GetStartedForm />)

    completeFocus()

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /where should we look first/i,
        }),
      ).toBeInTheDocument()
    })
    expect(focusSpy).not.toHaveBeenCalled()
    focusSpy.mockRestore()
  })

  it('posts the application payload, clears the draft, stores the claim link, and redirects', async () => {
    fetchSpy.mockImplementation(() =>
      Promise.resolve(
        createMockResponse({
          body: {
            ok: true,
            dashboard: {
              slug: 'prism',
              claimUrl: 'https://dashboard.design-prism.com/claim/token_123',
            },
          },
        }),
      ),
    )
    render(<GetStartedForm />)

    reachReview()
    fireEvent.change(screen.getByLabelText(/anything important/i), {
      target: {
        value: 'We want a cleaner site and better lead flow before summer.',
      },
    })

    expect(fetchSpy).not.toHaveBeenCalled()
    await waitFor(() => {
      expect(trackEvent).toHaveBeenCalledWith(
        'apply_review_view',
        expect.objectContaining({
          form_name: 'growth_application',
          form_location: 'apply_page',
          step_id: 'review',
        }),
      )
    })

    fireEvent.click(
      screen.getByRole('button', { name: /create growth dashboard/i }),
    )

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(pushMock).toHaveBeenCalledWith('/thank-you?source=apply')
      expect(storePendingApplyLeadContext).toHaveBeenCalledWith(
        expect.objectContaining({
          form_name: 'growth_application',
          form_location: 'apply_page',
          lead_type: 'growth_application',
          budget: '$3.5k to $5k',
          timeline: 'Within 30 days',
          service_count: 1,
          primary_goal: 'I need more qualified leads',
          has_website: 'yes',
        }),
      )
      expect(storeApplyDashboardClaimUrl).toHaveBeenCalledWith(
        'https://dashboard.design-prism.com/claim/token_123',
      )
      expect(window.sessionStorage.getItem('prism_apply_draft_v1')).toBeNull()
    })

    expect(trackEvent).toHaveBeenCalledWith(
      'apply_submit_attempt',
      expect.objectContaining({
        budget: '$3.5k to $5k',
        timeline: 'Within 30 days',
        service_count: 1,
      }),
    )
    expect(trackEvent).toHaveBeenCalledWith(
      'apply_submit',
      expect.objectContaining({
        budget: '$3.5k to $5k',
        timeline: 'Within 30 days',
        service_count: 1,
      }),
    )
    expect(trackEvent).toHaveBeenCalledWith(
      'apply_submit_success',
      expect.objectContaining({
        budget: '$3.5k to $5k',
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
    expect(formData.get('focus_labels')).toBe('More qualified leads')
    expect(formData.get('has_website')).toBe('yes')
    expect(formData.get('review_link')).toBe('https://design-prism.com')
    expect(formData.get('primary_goal')).toBe('I need more qualified leads')
    expect(formData.get('service_focus')).toBe('Qualified demand')
    expect(formData.getAll('service_interest[]')).toEqual(['Qualified demand'])
    expect(formData.get('budget')).toBe('$3.5k to $5k')
    expect(formData.get('timeline')).toBe('Within 30 days')
    expect(formData.get('company')).toBe('Prism')
    expect(formData.get('full_name')).toBe('Jordan Ramirez')
    expect(formData.get('email')).toBe('jordan@example.com')
    expect(formData.get('additional_context')).toContain('cleaner site')
    expect(formData.get('_subject')).toBe('New Prism Growth Dashboard request')
    expect(formData.get('form_name')).toBe('growth_application')
    expect(formData.get('site')).toBe('prism-site')
    expect(formData.get('form_key')).toBe('apply')
    expect(formData.get('_codex_test')).toBe('false')
  })

  it('keeps the user on review with inline error state when submission fails', async () => {
    fetchSpy.mockImplementation(() =>
      Promise.resolve(createMockResponse({ ok: false, status: 500 })),
    )
    render(<GetStartedForm />)

    reachReview()

    fireEvent.click(
      screen.getByRole('button', { name: /create growth dashboard/i }),
    )

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(pushMock).not.toHaveBeenCalled()
      expect(trackFormSubmission).not.toHaveBeenCalled()
      expect(storePendingApplyLeadContext).not.toHaveBeenCalled()
      expect(storeApplyDashboardClaimUrl).not.toHaveBeenCalled()
      expect(
        screen.getAllByText("We couldn't submit right now. Try again?").length,
      ).toBeGreaterThan(0)
    })

    expect(trackEvent).toHaveBeenCalledWith(
      'apply_submit_attempt',
      expect.objectContaining({
        budget: '$3.5k to $5k',
        timeline: 'Within 30 days',
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
