import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import WaitlistForm from '@/components/forms/WaitlistForm'

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

function fillRequiredFields(options: { link?: boolean } = { link: true }) {
  fireEvent.change(screen.getByLabelText(/first name/i), {
    target: { value: 'Jordan' },
  })
  fireEvent.change(screen.getByLabelText(/last name/i), {
    target: { value: 'Ramirez' },
  })
  fireEvent.change(screen.getByLabelText(/^email$/i), {
    target: { value: 'jordan@example.com' },
  })
  if (options.link) {
    fireEvent.change(screen.getByLabelText(/company website/i), {
      target: { value: 'https://example.com' },
    })
  }
  fireEvent.change(screen.getByLabelText(/your goals/i), {
    target: { value: 'More qualified inquiries from the website.' },
  })
  fireEvent.change(screen.getByLabelText(/when are you looking to get started/i), {
    target: { value: '1_3_months' },
  })
}

describe('WaitlistForm', () => {
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

  it('renders the waitlist contract: fields, hidden metadata, and a view event', () => {
    const { container } = render(<WaitlistForm initialFocus={['website']} />)

    const form = container.querySelector('form#waitlist')
    expect(form).toHaveAttribute('name', 'waitlist')
    expect(form).toHaveAttribute('action', expect.stringMatching(/^https:\/\/formspree\.io\/f\//))
    expect(container.querySelector('input[name="_subject"]')).toHaveValue(
      'New Prism waitlist application',
    )
    expect(container.querySelector('input[name="form_name"]')).toHaveValue('waitlist')
    expect(container.querySelector('input[name="form_key"]')).toHaveValue('waitlist')
    expect(container.querySelector('input[name="_gotcha"]')).toBeInTheDocument()

    for (const name of [
      'first_name',
      'last_name',
      'email',
      'phone',
      'link_website',
      'link_social',
      'link_other',
      'goals',
      'start_timing',
      'focus_other',
    ]) {
      expect(container.querySelector(`[name="${name}"]`)).toBeInTheDocument()
    }

    expect(screen.getByRole('checkbox', { name: /website/i })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: /content/i })).not.toBeChecked()
    expect(screen.getByRole('checkbox', { name: /ads/i })).not.toBeChecked()

    expect(trackEvent).toHaveBeenCalledWith('waitlist_form_view', {
      form_name: 'waitlist',
      form_location: 'waitlist_page',
      prefilled_focus: 'website',
    })
  })

  it('blocks submission without a link and reports the validation error', async () => {
    render(<WaitlistForm />)
    fillRequiredFields({ link: false })

    fireEvent.submit(screen.getByRole('button', { name: /join the waitlist/i }).closest('form')!)

    expect(
      await screen.findByText(/add at least one link/i),
    ).toBeInTheDocument()
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith(
      'waitlist_validation_error',
      expect.objectContaining({
        form_name: 'waitlist',
        field_name: 'link_website',
      }),
    )
    expect(trackFormSubmission).not.toHaveBeenCalled()
  })

  it('clears a field error as soon as the visitor fixes it, without waiting for blur', async () => {
    render(<WaitlistForm />)

    fireEvent.submit(screen.getByRole('button', { name: /join the waitlist/i }).closest('form')!)
    expect(await screen.findByText(/enter your first name/i)).toBeInTheDocument()
    expect(screen.getByText(/add at least one link/i)).toBeInTheDocument()

    fireEvent.input(screen.getByLabelText(/first name/i), {
      target: { value: 'Jordan' },
    })
    expect(screen.queryByText(/enter your first name/i)).not.toBeInTheDocument()

    // Typing a social link satisfies the shared link rule on the website field.
    fireEvent.input(screen.getByLabelText(/social media/i), {
      target: { value: 'https://instagram.com/example' },
    })
    expect(screen.queryByText(/add at least one link/i)).not.toBeInTheDocument()
  })

  it('accepts a social link as the only link', async () => {
    fetchSpy.mockResolvedValue(createMockResponse(true))
    render(<WaitlistForm />)
    fillRequiredFields({ link: false })
    fireEvent.change(screen.getByLabelText(/social media/i), {
      target: { value: 'https://instagram.com/example' },
    })

    fireEvent.click(screen.getByRole('button', { name: /join the waitlist/i }))

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1))
  })

  it('posts to Formspree with attribution, tracks success, and redirects', async () => {
    fetchSpy.mockResolvedValue(createMockResponse(true))
    render(<WaitlistForm initialFocus={['website']} />)

    fireEvent.focus(screen.getByLabelText(/first name/i))
    fillRequiredFields()
    fireEvent.click(screen.getByRole('checkbox', { name: /ads/i }))
    fireEvent.change(screen.getByLabelText(/anything else/i), {
      target: { value: 'Photography' },
    })

    fireEvent.click(screen.getByRole('button', { name: /join the waitlist/i }))

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
    expect(formData.get('utm_medium')).toBe('social')
    expect(formData.get('landing_path')).toBe('/waitlist')
    expect(formData.get('submission_path')).toBe('/waitlist')

    expect(trackEvent).toHaveBeenCalledWith(
      'waitlist_form_start',
      expect.objectContaining({ form_name: 'waitlist' }),
    )
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

    const startIndex = trackEvent.mock.calls.findIndex(
      ([name]) => name === 'waitlist_form_start',
    )
    expect(startIndex).toBeGreaterThan(-1)
    expect(
      trackEvent.mock.calls.filter(([name]) => name === 'waitlist_form_start'),
    ).toHaveLength(1)
  })

  it('keeps the visitor on the page and reports the error when Formspree fails', async () => {
    fetchSpy.mockResolvedValue(createMockResponse(false))
    render(<WaitlistForm />)
    fillRequiredFields()

    fireEvent.click(screen.getByRole('button', { name: /join the waitlist/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/try again/i)
    expect(pushMock).not.toHaveBeenCalled()
    expect(trackFormSubmission).not.toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith(
      'waitlist_submit_error',
      expect.objectContaining({ reason: 'non_ok_response', status: 500 }),
    )
  })
})
