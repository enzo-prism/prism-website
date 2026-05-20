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
})
