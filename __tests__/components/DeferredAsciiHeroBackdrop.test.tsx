import { render, screen } from '@testing-library/react'

import DeferredAsciiHeroBackdrop from '@/components/home/DeferredAsciiHeroBackdrop'

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

describe('DeferredAsciiHeroBackdrop poster fallback', () => {
  it('renders the static poster for reduced-motion visitors', () => {
    const restore = mockMatchMedia(true)
    try {
      const { container } = render(
        <DeferredAsciiHeroBackdrop
          animationName="wizard"
          frameCount={91}
          quality="medium"
          posterSrc="/animations/wizard/poster.svg"
        />,
      )

      const poster = screen.getByRole('presentation', { hidden: true })
      expect(poster).toHaveAttribute('src', '/animations/wizard/poster.svg')
      expect(poster).toHaveAttribute('aria-hidden', 'true')
      expect(
        container.querySelector('[data-testid="ascii-animation"]'),
      ).toBeNull()
      // The still carries the live scrim stack so reduced-motion visitors see
      // the same treatment as the loop, not a louder unscrimmed frame.
      const scrims = container.querySelectorAll(
        '[class*="bg-gradient-to-b"], [class*="radial-gradient"]',
      )
      expect(scrims.length).toBe(2)
    } finally {
      restore()
    }
  })

  it('uses explicit scrims on the poster and skips an emptied focus layer', () => {
    const restore = mockMatchMedia(true)
    try {
      const { container } = render(
        <DeferredAsciiHeroBackdrop
          animationName="mail"
          frameCount={56}
          quality="medium"
          posterSrc="/animations/mail/poster.svg"
          scrimClassName="custom-poster-scrim"
          focusScrimClassName=""
        />,
      )

      expect(
        container.querySelector('.custom-poster-scrim'),
      ).not.toBeNull()
      expect(
        container.querySelector('[class*="radial-gradient"]'),
      ).toBeNull()
    } finally {
      restore()
    }
  })

  it('renders nothing without a poster when the backdrop is gated', () => {
    const restore = mockMatchMedia(true)
    try {
      const { container } = render(
        <DeferredAsciiHeroBackdrop
          animationName="wizard"
          frameCount={91}
          quality="medium"
        />,
      )

      expect(container).toBeEmptyDOMElement()
    } finally {
      restore()
    }
  })
})
