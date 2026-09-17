import { act, render, screen } from '@testing-library/react'

import HomeScrollCue from '@/components/home/HomeScrollCue'

type ObserverCallback = (
  entries: Array<{ isIntersecting: boolean }>,
) => void

let observerCallback: ObserverCallback | null = null
let observedTargets: Element[] = []
let disconnectCalls = 0

function mockMatchMedia(matchesReducedMotion: boolean) {
  const original = window.matchMedia
  window.matchMedia = ((query: string) => ({
    matches: matchesReducedMotion && query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia
  return () => {
    window.matchMedia = original
  }
}

function mockAnimationFrame() {
  const originalRaf = window.requestAnimationFrame
  const originalCancel = window.cancelAnimationFrame
  let pending: FrameRequestCallback | null = null
  const cancelled: number[] = []
  let nextId = 0

  window.requestAnimationFrame = ((callback: FrameRequestCallback) => {
    pending = callback
    nextId += 1
    return nextId
  }) as typeof window.requestAnimationFrame
  window.cancelAnimationFrame = ((id: number) => {
    cancelled.push(id)
    pending = null
  }) as typeof window.cancelAnimationFrame

  return {
    flush: () => {
      const callback = pending
      pending = null
      callback?.(0)
    },
    cancelled: () => cancelled,
    restore: () => {
      window.requestAnimationFrame = originalRaf
      window.cancelAnimationFrame = originalCancel
    },
  }
}

function mockIntersectionObserver() {
  const Original = window.IntersectionObserver
  observerCallback = null
  observedTargets = []
  disconnectCalls = 0

  window.IntersectionObserver = class {
    constructor(callback: ObserverCallback) {
      observerCallback = callback
    }
    observe = (target: Element) => {
      observedTargets.push(target)
    }
    unobserve = () => {}
    disconnect = () => {
      disconnectCalls += 1
    }
  } as unknown as typeof IntersectionObserver

  return () => {
    window.IntersectionObserver = Original
  }
}

function setScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    value,
  })
}

function motionNode() {
  return screen.getByTestId('home-scroll-cue').querySelector('span') as HTMLElement
}

describe('HomeScrollCue', () => {
  beforeEach(() => {
    setScrollY(0)
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 800,
    })
  })

  it('renders the scroll link with a hidden chevron icon', () => {
    const restoreMedia = mockMatchMedia(false)
    try {
      render(<HomeScrollCue />)

      const cue = screen.getByRole('link', { name: 'scroll' })
      expect(cue).toHaveAttribute('href', '#homepage-hero')
      expect(cue).toHaveAttribute('data-testid', 'home-scroll-cue')

      const icon = cue.querySelector('svg')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    } finally {
      restoreMedia()
    }
  })

  it('writes the scroll tone through a rAF-throttled listener', () => {
    const restoreMedia = mockMatchMedia(false)
    const frame = mockAnimationFrame()
    const addSpy = jest.spyOn(window, 'addEventListener')
    try {
      render(
        <>
          <section id="home-impossible-hero" />
          <HomeScrollCue />
        </>,
      )

      // Mount writes the resting tone synchronously (scrollY 0).
      expect(motionNode().style.getPropertyValue('--cue-tone')).toBe('0.000')
      expect(addSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        expect.objectContaining({ passive: true }),
      )

      // jsdom reports clientHeight 0, so the cue falls back to innerHeight:
      // 240 / (800 * 0.6) = 0.5.
      setScrollY(240)
      act(() => {
        window.dispatchEvent(new Event('scroll'))
      })
      expect(motionNode().style.getPropertyValue('--cue-tone')).toBe('0.000')
      act(() => {
        frame.flush()
      })
      expect(motionNode().style.getPropertyValue('--cue-tone')).toBe('0.500')
    } finally {
      frame.restore()
      addSpy.mockRestore()
      restoreMedia()
    }
  })

  it('dismisses when the hero leaves view and restores on return', () => {
    const restoreMedia = mockMatchMedia(false)
    const restoreObserver = mockIntersectionObserver()
    try {
      render(
        <>
          <section id="home-impossible-hero" />
          <HomeScrollCue />
        </>,
      )

      expect(observedTargets).toHaveLength(1)
      expect(motionNode()).not.toHaveAttribute('data-cue-dismissed')

      act(() => {
        observerCallback?.([{ isIntersecting: false }])
      })
      expect(motionNode()).toHaveAttribute('data-cue-dismissed', 'true')

      act(() => {
        observerCallback?.([{ isIntersecting: true }])
      })
      expect(motionNode()).not.toHaveAttribute('data-cue-dismissed')
    } finally {
      restoreObserver()
      restoreMedia()
    }
  })

  it('stays static under reduced motion with no listener side effects', () => {
    const restoreMedia = mockMatchMedia(true)
    const addSpy = jest.spyOn(window, 'addEventListener')
    try {
      render(<HomeScrollCue />)

      expect(addSpy).not.toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        expect.anything(),
      )

      setScrollY(400)
      act(() => {
        window.dispatchEvent(new Event('scroll'))
      })
      expect(motionNode().style.getPropertyValue('--cue-tone')).toBe('')
      expect(motionNode()).not.toHaveAttribute('data-cue-dismissed')
    } finally {
      addSpy.mockRestore()
      restoreMedia()
    }
  })

  it('removes listeners and cancels rAF on unmount', () => {
    const restoreMedia = mockMatchMedia(false)
    const restoreObserver = mockIntersectionObserver()
    const frame = mockAnimationFrame()
    const removeSpy = jest.spyOn(window, 'removeEventListener')
    try {
      const { unmount } = render(
        <>
          <section id="home-impossible-hero" />
          <HomeScrollCue />
        </>,
      )

      setScrollY(240)
      act(() => {
        window.dispatchEvent(new Event('scroll'))
      })
      unmount()

      expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
      expect(disconnectCalls).toBe(1)
      expect(frame.cancelled()).toHaveLength(1)
    } finally {
      frame.restore()
      removeSpy.mockRestore()
      restoreObserver()
      restoreMedia()
    }
  })
})
