import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import type { ReactNode } from 'react'

import ModelsPageClient from '@/app/models/client-page'
import ScholarshipPageClient from '@/app/scholarship/ScholarshipPageClient'
import AiWebsiteLaunchForm from '@/components/ai-website-launch/AiWebsiteLaunchForm'

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

jest.mock('@/components/animations/ripple-highlight', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
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
    expect(formData.get('first_name')).toBe('Alex')
    expect(formData.get('last_name')).toBe('Rivera')
    expect(formData.get('email')).toBe('alex@example.com')
    expect(formData.get('heard_about')).toBe('search')
    expect(formData.get('project_description')).toBe(
      'I am building a service business website for local customers.',
    )
    expect(formData.get('page')).toBe('scholarship')
    expect(formData.get('form_name')).toBe('scholarship_application')
    expect(formData.get('site')).toBe('prism-site')
    expect(formData.get('form_key')).toBe('scholarship')
    expect(formData.get('_codex_test')).toBe('false')
    expect(formData.get('gclid')).toBe('GCLID-123')
  })

  it('blocks incomplete and invalid scholarship applications and focuses the first error', () => {
    render(<ScholarshipPageClient />)

    fireEvent.click(screen.getByRole('button', { name: /submit application/i }))

    const firstName = screen.getByLabelText(/first name/i)
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(firstName).toHaveAttribute('aria-invalid', 'true')
    expect(firstName).toHaveAttribute(
      'aria-describedby',
      'scholarship-firstName-error',
    )
    expect(document.activeElement).toBe(firstName)
    expect(
      document.getElementById('scholarship-firstName-error'),
    ).toHaveAttribute('aria-live', 'polite')

    fireEvent.change(firstName, { target: { value: 'Alex' } })
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Rivera' },
    })
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'not-an-email' },
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

    const email = screen.getByLabelText(/^email$/i)
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(email).toHaveAttribute('aria-invalid', 'true')
    expect(email).toHaveAttribute('aria-describedby', 'scholarship-email-error')
    expect(document.activeElement).toBe(email)
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
    expect(formData.get('name')).toBe('Jordan Lee')
    expect(formData.get('location')).toBe('Beverly Hills, CA')
    expect(formData.get('preferred_contact_method')).toBe('email')
    expect(formData.get('email')).toBe('jordan@example.com')
    expect(formData.get('form_name')).toBe('model_application')
    expect(formData.get('site')).toBe('prism-site')
    expect(formData.get('form_key')).toBe('models')
    expect(formData.get('_codex_test')).toBe('false')
    expect(formData.get('gclid')).toBe('GCLID-123')
  })

  it('blocks incomplete and invalid model applications and focuses the first error', () => {
    const { container } = render(<ModelsPageClient />)
    const form = container.querySelector('form') as HTMLFormElement

    fireEvent.click(within(form).getByRole('button', { name: /apply now/i }))

    const name = within(form).getByLabelText(/^name$/i)
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(name).toHaveAttribute('aria-invalid', 'true')
    expect(name).toHaveAttribute('aria-describedby', 'models-name-error')
    expect(document.activeElement).toBe(name)
    expect(document.getElementById('models-name-error')).toHaveAttribute(
      'aria-live',
      'polite',
    )

    fireEvent.change(name, { target: { value: 'Jordan Lee' } })
    fireEvent.change(within(form).getByLabelText(/city \/ state/i), {
      target: { value: 'Beverly Hills, CA' },
    })
    fireEvent.click(
      form.querySelector(
        'input[name="preferred_contact_method"][value="email"]',
      )!,
    )
    fireEvent.change(within(form).getByLabelText(/email address/i), {
      target: { value: 'not-an-email' },
    })

    fireEvent.click(within(form).getByRole('button', { name: /apply now/i }))

    const email = within(form).getByLabelText(/email address/i)
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(email).toHaveAttribute('aria-invalid', 'true')
    expect(email).toHaveAttribute('aria-describedby', 'models-email-error')
    expect(document.activeElement).toBe(email)
  })

  it('blocks model text applications with an invalid phone number', () => {
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
        'input[name="preferred_contact_method"][value="text"]',
      )!,
    )
    fireEvent.change(within(form).getByLabelText(/mobile number/i), {
      target: { value: '123' },
    })

    fireEvent.click(within(form).getByRole('button', { name: /apply now/i }))

    const phone = within(form).getByLabelText(/mobile number/i)
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(phone).toHaveAttribute('aria-invalid', 'true')
    expect(phone).toHaveAttribute('aria-describedby', 'models-phone-error')
    expect(document.activeElement).toBe(phone)
  })

  it('keeps the AI launch thank-you redirect from polluting GA attribution', async () => {
    fetchSpy.mockResolvedValue(createMockResponse(true))
    render(<AiWebsiteLaunchForm submitLabel="Start my AI launch" />)

    fireEvent.change(screen.getByLabelText(/^name$/i), {
      target: { value: 'Jordan Lee' },
    })
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'jordan@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/business name/i), {
      target: { value: 'Prism Demo Co' },
    })

    fireEvent.click(screen.getByRole('button', { name: /start my ai launch/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(trackFormSubmission).toHaveBeenCalledWith(
        'ai_website_launch',
        'final_cta_form',
      )
      expect(pushMock).toHaveBeenCalledWith(
        '/thank-you?source=ai-website-launch',
      )
    })

    const [, options] = fetchSpy.mock.calls[0] as [
      RequestInfo | URL,
      RequestInit,
    ]
    const formData = options.body as FormData
    expect(formData.get('form_name')).toBe('ai_website_launch')
    expect(formData.get('_redirect')).toBe(
      'https://www.design-prism.com/thank-you?source=ai-website-launch',
    )
    expect(String(formData.get('_redirect'))).not.toContain('utm_')
  })
})
