import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import WebsiteBuildEstimatorForm from '@/components/forms/WebsiteBuildEstimatorForm'

const pushMock = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}))

const trackCTAClick = jest.fn()
const trackEvent = jest.fn()
const trackFormSubmission = jest.fn()

jest.mock('@/utils/analytics', () => ({
  trackCTAClick: (...args: Array<unknown>) => trackCTAClick(...args),
  trackEvent: (...args: Array<unknown>) => trackEvent(...args),
  trackFormSubmission: (...args: Array<unknown>) =>
    trackFormSubmission(...args),
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

function clickContinue() {
  fireEvent.click(screen.getByRole('button', { name: /continue/i }))
}

function chooseType() {
  fireEvent.click(screen.getByRole('button', { name: /business website/i }))
  clickContinue()
}

function reachContactStep() {
  chooseType()
  clickContinue()
  clickContinue()
  clickContinue()
  clickContinue()
  fireEvent.click(screen.getByRole('button', { name: /within 30 days/i }))
  clickContinue()
}

function completeHappyPath() {
  chooseType()
  fireEvent.click(screen.getByRole('button', { name: /increase pages/i }))
  clickContinue()
  fireEvent.click(screen.getByRole('button', { name: /prism copywriting/i }))
  clickContinue()
  fireEvent.change(screen.getByLabelText(/style or reference notes/i), {
    target: { value: 'Premium, minimal, direct.' },
  })
  clickContinue()
  fireEvent.change(screen.getByLabelText(/existing site or profile url/i), {
    target: { value: 'design-prism.com' },
  })
  clickContinue()
  fireEvent.click(screen.getByRole('button', { name: /asap \/ rush review/i }))
  clickContinue()
  fireEvent.change(screen.getByLabelText(/business name/i), {
    target: { value: 'Prism Studio' },
  })
  fireEvent.change(screen.getByLabelText(/full name/i), {
    target: { value: 'Jordan Ramirez' },
  })
  fireEvent.change(screen.getByLabelText(/^email$/i), {
    target: { value: 'jordan@example.com' },
  })
  clickContinue()
}

describe('WebsiteBuildEstimatorForm', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockReset()
  })

  it('renders the starting price, scope controls, metadata, and review caveat', () => {
    const { container } = render(<WebsiteBuildEstimatorForm />)

    const form = container.querySelector('form')
    expect(form).toHaveAttribute('id', 'website_build_request')
    expect(form).toHaveAttribute('name', 'website_build_request')
    expect(form).toHaveAttribute('action', 'https://formspree.io/f/xpqebnbz')
    expect(screen.getAllByText(/\$300-\$600/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/starting at \$300/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /what are we building/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByDisplayValue('New Prism one-time website build request'),
    ).toHaveAttribute('name', '_subject')
    expect(screen.getByDisplayValue('website_build_request')).toHaveAttribute(
      'name',
      'form_name',
    )
    expect(container.querySelector('input[name="form_key"]')).toHaveValue(
      'website_build',
    )
    expect(
      screen.getByText(/review it for fit before any payment link is sent/i),
    ).toBeInTheDocument()
  })

  it('calculates totals for extra pages, add-ons, and rush review', async () => {
    render(<WebsiteBuildEstimatorForm />)

    chooseType()
    fireEvent.click(screen.getByRole('button', { name: /increase pages/i }))
    fireEvent.click(screen.getByRole('button', { name: /increase pages/i }))

    await waitFor(() => {
      expect(screen.getAllByText(/\$600-\$900/i).length).toBeGreaterThan(0)
    })

    clickContinue()
    fireEvent.click(screen.getByRole('button', { name: /prism copywriting/i }))
    fireEvent.click(screen.getByRole('button', { name: /seo launch basics/i }))

    await waitFor(() => {
      expect(screen.getAllByText(/\$1,000-\$1,300/i).length).toBeGreaterThan(0)
    })

    clickContinue()
    clickContinue()
    clickContinue()
    fireEvent.click(screen.getByRole('button', { name: /asap \/ rush review/i }))

    await waitFor(() => {
      expect(screen.getAllByText(/\$1,250-\$1,550/i).length).toBeGreaterThan(0)
    })
    expect(trackEvent).toHaveBeenCalledWith(
      'website_build_estimate_update',
      expect.objectContaining({
        estimated_total: 1250,
        page_count: 3,
        add_on_count: 2,
        rush_review: true,
      }),
    )
  })

  it('blocks contact progress when required fields are missing', async () => {
    render(<WebsiteBuildEstimatorForm />)

    reachContactStep()
    clickContinue()

    await waitFor(() => {
      expect(document.getElementById('business_name-error')).toHaveTextContent(
        /enter your business name|constraints not satisfied/i,
      )
    })
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith(
      'website_build_validation_error',
      expect.objectContaining({
        step_id: 'contact',
        field_name: expect.stringMatching(/business_name|full_name|email/),
      }),
    )
  })

  it('posts the calculated request payload and redirects on success', async () => {
    fetchSpy.mockImplementation(() => Promise.resolve(createMockResponse()))
    render(<WebsiteBuildEstimatorForm />)

    completeHappyPath()

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /review your request/i }),
      ).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /send request/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        'https://formspree.io/f/xpqebnbz',
        expect.objectContaining({
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: expect.any(FormData),
        }),
      )
      expect(pushMock).toHaveBeenCalledWith('/thank-you?source=website-build')
    })

    const body = fetchSpy.mock.calls[0]?.[1]?.body as FormData
    expect(body.get('form_name')).toBe('website_build_request')
    expect(body.get('website_type')).toBe('Business website')
    expect(body.get('page_count')).toBe('2')
    expect(body.get('estimated_total')).toBe('900')
    expect(body.get('estimated_range')).toBe('$900-$1,200')
    expect(body.get('existing_link')).toBe('https://design-prism.com')
    expect(body.get('price_formula_version')).toBe('website_build_v1')
    expect(trackEvent).toHaveBeenCalledWith(
      'website_build_submit_success',
      expect.objectContaining({
        estimated_total: 900,
        page_count: 2,
        add_on_count: 1,
        rush_review: true,
      }),
    )
    expect(trackFormSubmission).toHaveBeenCalledWith(
      'website_build_request',
      'websites_estimator',
      expect.objectContaining({
        lead_type: 'website_build_request',
        value: 900,
        currency: 'USD',
        conversionMode: 'pending',
      }),
    )
  })

  it('shows an inline error and stays on page when submission fails', async () => {
    fetchSpy.mockImplementation(() =>
      Promise.resolve(createMockResponse({ ok: false, status: 500 })),
    )
    render(<WebsiteBuildEstimatorForm />)

    completeHappyPath()
    fireEvent.click(screen.getByRole('button', { name: /send request/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/we couldn't submit right now/i),
      ).toBeInTheDocument()
    })
    expect(pushMock).not.toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith(
      'website_build_submit_error',
      expect.objectContaining({
        reason: 'non_ok_response',
        status: 500,
      }),
    )
  })
})
