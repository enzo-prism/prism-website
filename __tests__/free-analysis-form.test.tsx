import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import FreeAnalysisForm from '@/components/forms/FreeAnalysisForm'

const pushMock = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}))

const trackFormSubmission = jest.fn()

jest.mock('@/utils/analytics', () => ({
  trackFormSubmission: (...args: Array<unknown>) =>
    trackFormSubmission(...args),
}))

function createMockResponse(ok = true): Response {
  return {
    ok,
    status: ok ? 200 : 500,
  } as Response
}

describe('FreeAnalysisForm', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockReset()
  })

  it('uses a dedicated Free Analysis ops identity instead of AEO metadata', async () => {
    const { container } = render(<FreeAnalysisForm />)

    const form = container.querySelector('form')
    expect(form).toHaveAttribute('action', 'https://formspree.io/f/xldarokj')
    expect(form).toHaveAttribute('id', 'free_analysis')
    expect(form).toHaveAttribute('name', 'free_analysis')
    expect(container.querySelector('input[name="form_name"]')).toHaveValue(
      'free_analysis',
    )

    await waitFor(() => {
      expect(container.querySelector('input[name="form_key"]')).toHaveValue(
        'free_analysis',
      )
    })
    expect(container.querySelector('input[name="form_key"]')).not.toHaveValue(
      'aeo_assessment',
    )
  })

  it('posts the Free Analysis payload and preserves its success route', async () => {
    fetchSpy.mockResolvedValue(createMockResponse())
    render(<FreeAnalysisForm />)

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Jordan Ramirez' },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'jordan@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Website'), {
      target: { value: 'https://example.com' },
    })
    fireEvent.change(screen.getByLabelText('Main Challenge'), {
      target: { value: 'conversion' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: /get my free analysis/i }),
    )

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(pushMock).toHaveBeenCalledWith('/analysis-thank-you')
      expect(trackFormSubmission).toHaveBeenCalledWith(
        'free_analysis',
        'free_analysis_form',
      )
    })

    const [endpoint, options] = fetchSpy.mock.calls[0] as [
      RequestInfo | URL,
      RequestInit,
    ]
    expect(endpoint).toBe('https://formspree.io/f/xldarokj')
    expect(options.method).toBe('POST')

    const formData = options.body as FormData
    expect(formData.get('form_name')).toBe('free_analysis')
    expect(formData.get('form_key')).toBe('free_analysis')
    expect(formData.get('form_key')).not.toBe('aeo_assessment')
  })
})
