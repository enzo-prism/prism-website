import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import HomeElevenLabsAgentSection from '@/components/home/HomeElevenLabsAgentSection'

const elevenLabsWidgetMock = jest.fn()
const elevenLabsWidgetScriptMock = jest.fn()
const isHomeElevenLabsEmbedEnabledMock = jest.fn()
const isPublicElevenLabsWidgetEnabledMock = jest.fn()
const useViewportEligibilityMock = jest.fn()
const useWebGLEligibilityMock = jest.fn()

jest.mock('@/components/elevenlabs/ElevenLabsWidget', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    elevenLabsWidgetMock(props)
    return <div data-testid={String(props.testId)} />
  },
  ElevenLabsWidgetScript: () => {
    elevenLabsWidgetScriptMock()
    return <script data-testid="home-elevenlabs-script" />
  },
}))

jest.mock('@/hooks/use-public-elevenlabs-widget-viewport', () => ({
  usePublicElevenLabsWidgetViewportEligibility: () =>
    useViewportEligibilityMock(),
}))

jest.mock('@/hooks/use-public-elevenlabs-widget-webgl', () => ({
  usePublicElevenLabsWidgetWebGLEligibility: (enabled: boolean) =>
    useWebGLEligibilityMock(enabled),
}))

jest.mock('@/lib/elevenlabs-widget', () => ({
  isHomeElevenLabsEmbedEnabled: () => isHomeElevenLabsEmbedEnabledMock(),
  isPublicElevenLabsWidgetEnabled: () => isPublicElevenLabsWidgetEnabledMock(),
}))

type IntersectionObserverCallbackForTest = (
  entries: Array<Pick<IntersectionObserverEntry, 'isIntersecting'>>,
) => void

let intersectionCallback: IntersectionObserverCallbackForTest | null = null

class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallbackForTest) {
    intersectionCallback = callback
  }

  disconnect = jest.fn()
  observe = jest.fn()
  unobserve = jest.fn()
  takeRecords = jest.fn(() => [])
  root = null
  rootMargin = '400px 0px'
  thresholds = [0]
}

describe('HomeElevenLabsAgentSection', () => {
  const originalIntersectionObserver = global.IntersectionObserver

  beforeEach(() => {
    intersectionCallback = null
    elevenLabsWidgetMock.mockReset()
    elevenLabsWidgetScriptMock.mockReset()
    isHomeElevenLabsEmbedEnabledMock.mockReturnValue(true)
    isPublicElevenLabsWidgetEnabledMock.mockReturnValue(true)
    useViewportEligibilityMock.mockReturnValue(true)
    useWebGLEligibilityMock.mockImplementation((enabled: boolean) =>
      enabled ? true : null,
    )
    global.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver
  })

  afterAll(() => {
    global.IntersectionObserver = originalIntersectionObserver
  })

  it('requires consent before lazy-mounting one bounded expanded widget and its script', async () => {
    render(<HomeElevenLabsAgentSection />)

    expect(
      screen.queryByTestId('home-elevenlabs-widget'),
    ).not.toBeInTheDocument()
    expect(
      screen.getByText('Start with a free Growth Audit.'),
    ).toBeInTheDocument()

    act(() => {
      intersectionCallback?.([{ isIntersecting: true }])
    })

    expect(
      screen.getByRole('button', { name: 'Agree & open guide' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('home-elevenlabs-script'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('home-elevenlabs-widget'),
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Agree & open guide' }))

    await waitFor(() => {
      expect(screen.getByTestId('home-elevenlabs-widget')).toBeInTheDocument()
    })

    expect(screen.getAllByTestId('home-elevenlabs-script')).toHaveLength(1)
    expect(elevenLabsWidgetMock).toHaveBeenCalledTimes(1)
    expect(elevenLabsWidgetMock).toHaveBeenCalledWith(
      expect.objectContaining({
        dismissible: false,
        variant: 'expanded',
      }),
    )
  })

  it('shows the required AI and processing disclosure before consent', () => {
    render(<HomeElevenLabsAgentSection />)

    act(() => {
      intersectionCallback?.([{ isIntersecting: true }])
    })

    expect(
      screen.getByText(/The Prism Guide is an AI assistant/),
    ).toHaveTextContent(
      'Voice and text conversations may be recorded, transcribed, and processed by Prism, ElevenLabs, and their model and service providers.',
    )
    expect(
      screen.getByRole('link', { name: 'Privacy Policy' }),
    ).toHaveAttribute('href', '/privacy-policy')
    expect(screen.getByRole('link', { name: 'Terms' })).toHaveAttribute(
      'href',
      '/terms-of-service',
    )
    expect(elevenLabsWidgetScriptMock).not.toHaveBeenCalled()
  })

  it('keeps the get-started fallback on mobile without checking WebGL', () => {
    useViewportEligibilityMock.mockReturnValue(false)

    render(<HomeElevenLabsAgentSection />)

    expect(screen.getByRole('link', { name: 'Get started' })).toHaveAttribute(
      'href',
      '/get-started',
    )
    expect(elevenLabsWidgetMock).not.toHaveBeenCalled()
    expect(useWebGLEligibilityMock).toHaveBeenLastCalledWith(false)
  })

  it.each([
    ['the homepage rollout flag is off', false, true],
    ['the public kill switch is active', true, false],
  ])('keeps the fallback when %s', (_scenario, homeEnabled, publicEnabled) => {
    isHomeElevenLabsEmbedEnabledMock.mockReturnValue(homeEnabled)
    isPublicElevenLabsWidgetEnabledMock.mockReturnValue(publicEnabled)

    render(<HomeElevenLabsAgentSection />)

    expect(
      screen.getByRole('link', { name: 'Get started' }),
    ).toBeInTheDocument()
    expect(elevenLabsWidgetScriptMock).not.toHaveBeenCalled()
    expect(elevenLabsWidgetMock).not.toHaveBeenCalled()
  })

  it('keeps the fallback when WebGL is unavailable', () => {
    useWebGLEligibilityMock.mockImplementation((enabled: boolean) =>
      enabled ? false : null,
    )

    render(<HomeElevenLabsAgentSection />)

    act(() => {
      intersectionCallback?.([{ isIntersecting: true }])
    })

    expect(
      screen.getByRole('link', { name: 'Get started' }),
    ).toBeInTheDocument()
    expect(elevenLabsWidgetMock).not.toHaveBeenCalled()
  })
})
