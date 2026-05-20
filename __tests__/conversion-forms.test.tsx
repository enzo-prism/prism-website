import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'

import BookAShootForm from '@/app/book-a-shoot/BookAShootForm'
import ModelsPageClient from '@/app/models/client-page'
import ScholarshipPageClient from '@/app/scholarship/ScholarshipPageClient'

const pushMock = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => '/',
}))

jest.mock('@/components/navbar', () => ({
  __esModule: true,
  default: () => <nav data-testid="navbar" />,
}))

jest.mock('@/components/footer', () => ({
  __esModule: true,
  default: () => <footer data-testid="footer" />,
}))

const trackFormSubmission = jest.fn()
const trackCTAClick = jest.fn()

jest.mock('@/utils/analytics', () => ({
  trackCTAClick: (...args: Array<unknown>) => trackCTAClick(...args),
  trackFormSubmission: (...args: Array<unknown>) =>
    trackFormSubmission(...args),
}))

jest.mock('@/components/HeroBackgroundLoop', () => ({
  __esModule: true,
  default: () => <div data-testid="hero-background-loop" />,
}))

function createMockResponse(ok = true): Response {
  return {
    ok,
    status: ok ? 200 : 500,
    json: jest.fn().mockResolvedValue({}),
    text: jest.fn().mockResolvedValue(''),
  } as unknown as Response
}

describe('secondary conversion forms', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockReset()
    window.localStorage.clear()
    window.history.replaceState({}, '', '/?utm_source=google&gclid=GCLID-123')
  })

  it('submits book-a-shoot through fetch, stores a pending sales lead, and redirects', async () => {
    fetchSpy.mockResolvedValue(createMockResponse(true))
    const { container } = render(<BookAShootForm />)

    fireEvent.change(screen.getByLabelText(/your email/i), {
      target: { value: 'doctor@example.com' },
    })
    fireEvent.change(container.querySelector('input[name="day_one_date"]')!, {
      target: { value: '2026-06-01' },
    })
    fireEvent.change(container.querySelector('select[name="day_one_time"]')!, {
      target: { value: '09:00' },
    })
    fireEvent.change(container.querySelector('input[name="day_two_date"]')!, {
      target: { value: '2026-06-02' },
    })
    fireEvent.change(container.querySelector('select[name="day_two_time"]')!, {
      target: { value: '10:00' },
    })

    fireEvent.click(screen.getByRole('button', { name: /send request/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(trackFormSubmission).toHaveBeenCalledWith(
        'book_a_shoot',
        'book_a_shoot_form',
        { lead_type: 'shoot_request' },
      )
      expect(pushMock).toHaveBeenCalledWith('/book-a-shoot/thank-you')
    })

    const [, options] = fetchSpy.mock.calls[0] as [
      RequestInfo | URL,
      RequestInit,
    ]
    const formData = options.body as FormData
    expect(options.headers).toMatchObject({ Accept: 'application/json' })
    expect(formData.get('email')).toBe('doctor@example.com')
    expect(formData.get('form_name')).toBe('book_a_shoot')
    expect(formData.get('site')).toBe('prism-site')
    expect(formData.get('form_key')).toBe('book_a_shoot')
    expect(formData.get('_codex_test')).toBe('false')
    expect(formData.get('gclid')).toBe('GCLID-123')
  })

  it('tracks scholarship applications as GA4 leads without Google Ads conversion', async () => {
    fetchSpy.mockResolvedValue(createMockResponse(true))
    render(<ScholarshipPageClient />)

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'Alex' },
    })
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Rivera' },
    })
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'alex@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/how did you first hear/i), {
      target: { value: 'search' },
    })
    fireEvent.change(screen.getByLabelText(/tell us about the website/i), {
      target: {
        value: 'I am building a service business website for local customers.',
      },
    })

    fireEvent.click(screen.getByRole('button', { name: /submit application/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(trackFormSubmission).toHaveBeenCalledWith(
        'scholarship_application',
        'scholarship_form',
        {
          conversionMode: 'immediate',
          lead_type: 'scholarship_application',
          sendGoogleAdsConversion: false,
        },
      )
    })

    const [, options] = fetchSpy.mock.calls[0] as [
      RequestInfo | URL,
      RequestInit,
    ]
    const formData = options.body as FormData
    expect(formData.get('form_name')).toBe('scholarship_application')
    expect(formData.get('site')).toBe('prism-site')
    expect(formData.get('form_key')).toBe('scholarship')
    expect(formData.get('_codex_test')).toBe('false')
    expect(formData.get('gclid')).toBe('GCLID-123')
  })

  it('tracks model applications as GA4 leads without Google Ads conversion', async () => {
    fetchSpy.mockResolvedValue(createMockResponse(true))
    const { container } = render(<ModelsPageClient />)
    const form = container.querySelector('form') as HTMLFormElement

    fireEvent.change(within(form).getByLabelText(/^name$/i), {
      target: { value: 'Jordan Lee' },
    })
    fireEvent.change(within(form).getByLabelText(/city \/ state/i), {
      target: { value: 'Beverly Hills, CA' },
    })
    fireEvent.click(
      form.querySelector(
        'input[name="preferred_contact_method"][value="email"]',
      )!,
    )
    fireEvent.change(within(form).getByLabelText(/email address/i), {
      target: { value: 'jordan@example.com' },
    })

    fireEvent.click(within(form).getByRole('button', { name: /apply now/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(trackFormSubmission).toHaveBeenCalledWith(
        'model_application',
        'models_form',
        {
          conversionMode: 'immediate',
          lead_type: 'model_application',
          sendGoogleAdsConversion: false,
        },
      )
    })

    const [, options] = fetchSpy.mock.calls[0] as [
      RequestInfo | URL,
      RequestInit,
    ]
    const formData = options.body as FormData
    expect(formData.get('form_name')).toBe('model_application')
    expect(formData.get('site')).toBe('prism-site')
    expect(formData.get('form_key')).toBe('models')
    expect(formData.get('_codex_test')).toBe('false')
    expect(formData.get('gclid')).toBe('GCLID-123')
  })
})
