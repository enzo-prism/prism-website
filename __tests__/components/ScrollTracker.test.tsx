import { render } from '@testing-library/react'
import ScrollTracker from '@/components/scroll-tracker'

let mockPathname = '/'
const mockTrackScrollMilestone = jest.fn()
jest.mock('next/navigation', () => ({ usePathname: () => mockPathname }))
jest.mock('@/utils/analytics', () => ({
  trackScrollMilestone: (...args: unknown[]) => mockTrackScrollMilestone(...args),
}))

describe('ScrollTracker', () => {
  beforeEach(() => {
    mockPathname = '/'
    mockTrackScrollMilestone.mockClear()
    Object.defineProperty(document.body, 'scrollHeight', { configurable: true, value: 2000 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 500 })
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
  })

  it('reports each milestone once per route and resets on client navigation', () => {
    const { rerender, unmount } = render(<ScrollTracker />)
    window.dispatchEvent(new Event('scroll'))
    window.dispatchEvent(new Event('scroll'))
    expect(mockTrackScrollMilestone.mock.calls.map(([depth]) => depth)).toEqual([25])
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 2000 })
    window.dispatchEvent(new Event('scroll'))
    expect(mockTrackScrollMilestone.mock.calls.map(([depth]) => depth)).toEqual([25, 50, 75, 100])
    mockPathname = '/pricing'
    document.title = 'Pricing'
    rerender(<ScrollTracker />)
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
    window.dispatchEvent(new Event('scroll'))
    expect(mockTrackScrollMilestone).toHaveBeenLastCalledWith(25, 'Pricing')
    expect(mockTrackScrollMilestone).toHaveBeenCalledTimes(5)
    unmount()
    window.dispatchEvent(new Event('scroll'))
    expect(mockTrackScrollMilestone).toHaveBeenCalledTimes(5)
  })

  it('ignores zero-height documents and negative overscroll', () => {
    render(<ScrollTracker />)
    Object.defineProperty(document.body, 'scrollHeight', { configurable: true, value: 0 })
    window.dispatchEvent(new Event('scroll'))
    expect(mockTrackScrollMilestone).not.toHaveBeenCalled()
    Object.defineProperty(document.body, 'scrollHeight', { configurable: true, value: 2000 })
    Object.defineProperty(window, 'scrollY', { configurable: true, value: -1000 })
    window.dispatchEvent(new Event('scroll'))
    expect(mockTrackScrollMilestone).not.toHaveBeenCalled()
  })
})
