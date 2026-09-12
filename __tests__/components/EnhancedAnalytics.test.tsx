import { act, render } from '@testing-library/react'

import EnhancedAnalytics from '@/components/enhanced-analytics'

const mockNavigationState = {
  pathname: '/',
  searchParams: new URLSearchParams(),
}

jest.mock('next/navigation', () => ({
  usePathname: () => mockNavigationState.pathname,
  useSearchParams: () => mockNavigationState.searchParams,
}))

const mockTrackCTAClick = jest.fn()
const mockTrackEvent = jest.fn()
const mockTrackPageView = jest.fn()

jest.mock('@/utils/analytics', () => ({
  trackCTAClick: (...args: Array<unknown>) => mockTrackCTAClick(...args),
  trackEvent: (...args: Array<unknown>) => mockTrackEvent(...args),
  trackPageView: (...args: Array<unknown>) => mockTrackPageView(...args),
}))

function flushAnalyticsDelay() {
  act(() => {
    jest.advanceTimersByTime(50)
  })
}

describe('EnhancedAnalytics', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
    jest.clearAllMocks()
    mockNavigationState.pathname = '/'
    mockNavigationState.searchParams = new URLSearchParams()
    document.title = 'Dental practice growth system | Prism'
    window.history.replaceState({}, '', '/')
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' })
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('uses the settled document title for client-side route pageviews', () => {
    const { rerender } = render(
      <EnhancedAnalytics title="Dental practice growth system | Prism" />,
    )

    flushAnalyticsDelay()

    expect(mockTrackPageView).toHaveBeenCalledWith(
      '/',
      'Dental practice growth system | Prism',
      {
        previousPath: null,
        previousUrl: null,
      },
    )

    mockTrackEvent.mockClear()
    mockTrackPageView.mockClear()

    mockNavigationState.pathname = '/case-studies'
    mockNavigationState.searchParams = new URLSearchParams()
    window.history.pushState({}, '', '/case-studies')
    document.title = 'Dental + local business case | Prism'

    rerender(
      <EnhancedAnalytics title="Dental practice growth system | Prism" />,
    )

    flushAnalyticsDelay()

    expect(mockTrackPageView).toHaveBeenCalledWith(
      '/case-studies',
      'Dental + local business case | Prism',
      {
        previousPath: '/',
        previousUrl: 'https://www.design-prism.com/',
      },
    )
    expect(mockTrackEvent).toHaveBeenCalledWith(
      'navigation',
      expect.objectContaining({
        from_path: '/',
        navigation_type: 'client_side',
        page_location: 'https://www.design-prism.com/case-studies',
        page_path: '/case-studies',
        page_title: 'Dental + local business case | Prism',
        to_path: '/case-studies',
      }),
    )
  })

  it('reports route engagement against the route where engagement happened', () => {
    window.history.replaceState(
      {},
      '',
      '/?utm_source=codex&utm_campaign=ga4_audit',
    )
    mockNavigationState.searchParams = new URLSearchParams(
      'utm_source=codex&utm_campaign=ga4_audit',
    )

    const { rerender } = render(
      <EnhancedAnalytics title="Dental practice growth system | Prism" />,
    )

    flushAnalyticsDelay()
    mockTrackEvent.mockClear()

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown'))
    })
    jest.setSystemTime(new Date('2026-01-01T00:00:11.000Z'))

    mockNavigationState.pathname = '/case-studies'
    mockNavigationState.searchParams = new URLSearchParams()
    window.history.pushState({}, '', '/case-studies')
    document.title = 'Dental + local business case | Prism'

    rerender(
      <EnhancedAnalytics title="Dental practice growth system | Prism" />,
    )

    expect(mockTrackEvent).toHaveBeenCalledWith(
      'page_engagement',
      expect.objectContaining({
        max_scroll_depth_percent: 0,
        page_location:
          'https://www.design-prism.com/?utm_source=codex&utm_campaign=ga4_audit',
        page_path: '/',
        page_title: 'Dental practice growth system | Prism',
        time_on_page_seconds: 11,
      }),
    )
  })

  it('does not emit generate_lead when /contact is viewed', () => {
    mockNavigationState.pathname = '/contact'
    mockNavigationState.searchParams = new URLSearchParams()
    window.history.replaceState({}, '', '/contact')
    document.title = 'Contact | Prism'

    render(<EnhancedAnalytics title="Contact | Prism" />)
    flushAnalyticsDelay()

    expect(mockTrackPageView).toHaveBeenCalledWith(
      '/contact',
      'Contact | Prism',
      {
        previousPath: null,
        previousUrl: null,
      },
    )
    expect(
      mockTrackEvent.mock.calls.some(([eventName]) => eventName === 'generate_lead'),
    ).toBe(false)
  })

  it('keeps search parameter change events on the standard page_path field', () => {
    mockNavigationState.searchParams = new URLSearchParams('utm_source=codex')
    window.history.replaceState({}, '', '/?utm_source=codex')

    const { rerender } = render(
      <EnhancedAnalytics title="Dental practice growth system | Prism" />,
    )

    flushAnalyticsDelay()
    mockTrackEvent.mockClear()

    mockNavigationState.searchParams = new URLSearchParams(
      'utm_source=codex&utm_campaign=ga4_audit',
    )
    window.history.replaceState(
      {},
      '',
      '/?utm_source=codex&utm_campaign=ga4_audit',
    )

    rerender(
      <EnhancedAnalytics title="Dental practice growth system | Prism" />,
    )

    expect(mockTrackEvent).toHaveBeenCalledWith(
      'search_params_change',
      expect.objectContaining({
        page_path: '/',
        utm_campaign: 'ga4_audit',
        utm_source: 'codex',
      }),
    )
  })
  function visibility(state: 'hidden' | 'visible') {
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: state })
    act(() => { document.dispatchEvent(new Event('visibilitychange')) })
  }

  function engagements() {
    return mockTrackEvent.mock.calls.filter(([name]) => name === 'page_engagement')
  }

  it('excludes hidden time, resumes short visits, and reports once across exit signals', () => {
    const { unmount } = render(<EnhancedAnalytics title="Prism" />)
    window.dispatchEvent(new KeyboardEvent('keydown'))
    act(() => { jest.advanceTimersByTime(5000) })
    visibility('hidden')
    expect(engagements()).toHaveLength(0)
    act(() => { jest.advanceTimersByTime(120000) })
    visibility('visible')
    act(() => { jest.advanceTimersByTime(6000) })
    visibility('hidden')
    expect(engagements()).toHaveLength(1)
    expect(engagements()[0][1].time_on_page_seconds).toBe(11)
    window.dispatchEvent(new Event('pagehide'))
    visibility('visible')
    act(() => { jest.advanceTimersByTime(20000) })
    unmount()
    expect(engagements()).toHaveLength(1)
  })

  it('does not split a visit on title-only renders and catches mobile pagehide', () => {
    const { rerender, unmount } = render(<EnhancedAnalytics title="Prism" />)
    window.dispatchEvent(new KeyboardEvent('keydown'))
    act(() => { jest.advanceTimersByTime(6000) })
    rerender(<EnhancedAnalytics title="Settled title" />)
    act(() => { jest.advanceTimersByTime(6000) })
    window.dispatchEvent(new Event('pagehide'))
    expect(engagements()).toHaveLength(1)
    expect(engagements()[0][1].time_on_page_seconds).toBe(12)
    unmount()
    expect(engagements()).toHaveLength(1)
  })

  it('does not count initial background time and resumes after bfcache restoration', () => {
    visibility('hidden')
    const { unmount } = render(<EnhancedAnalytics title="Prism" />)
    act(() => { jest.advanceTimersByTime(60000) })
    visibility('visible')
    window.dispatchEvent(new KeyboardEvent('keydown'))
    act(() => { jest.advanceTimersByTime(4000) })
    window.dispatchEvent(new Event('pagehide'))
    act(() => { jest.advanceTimersByTime(60000) })
    window.dispatchEvent(new Event('pageshow'))
    act(() => { jest.advanceTimersByTime(7000) })
    unmount()
    expect(engagements()[0][1].time_on_page_seconds).toBe(11)
  })

  it('clamps engagement scroll depth despite overscroll', () => {
    Object.defineProperty(document.body, 'scrollHeight', { configurable: true, value: 1000 })
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 2000 })
    const { unmount } = render(<EnhancedAnalytics title="Prism" />)
    window.dispatchEvent(new Event('scroll'))
    unmount()
    expect(engagements()[0][1].max_scroll_depth_percent).toBe(100)
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
  })

})
