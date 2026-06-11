import { render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'

import AsciiMotionIcon from '@/components/ascii/AsciiMotionIcon'
import HeroBackgroundLoop from '@/components/HeroBackgroundLoop'
import HeroLoopingVideo from '@/components/HeroLoopingVideo'

type MatchMediaConfig = {
  pointerCoarse: boolean
}

const TOUCH_MEDIA_QUERY = '(hover: none), (pointer: coarse)'

function setMatchMedia({ pointerCoarse }: MatchMediaConfig) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: jest.fn().mockImplementation((query: string) => {
      const matches = query === TOUCH_MEDIA_QUERY ? pointerCoarse : false

      return {
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      } as MediaQueryList
    }),
  })
}

function setViewportWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  })
}

function setNavigatorConnection(
  connection: { saveData?: boolean; effectiveType?: string } | undefined,
) {
  Object.defineProperty(window.navigator, 'connection', {
    configurable: true,
    value: connection,
  })
}

describe('Hero background loops are device-gated on touch', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLMediaElement.prototype, 'play', {
      configurable: true,
      writable: true,
      value: jest.fn().mockResolvedValue(undefined),
    })
    Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
      configurable: true,
      writable: true,
      value: jest.fn(),
    })
    setViewportWidth(1280)
    setNavigatorConnection(undefined)
  })

  it('honors explicit forcePoster policy for background loops', () => {
    setMatchMedia({ pointerCoarse: false })

    render(
      <HeroBackgroundLoop
        videoSrc="https://example.com/video.mp4"
        posterSrc="https://example.com/poster.jpg"
        posterAlt="Hero poster"
        videoClassName="hero-video"
        playbackPolicy="forcePoster"
      />,
    )

    expect(screen.getByRole('img', { name: 'Hero poster' })).toBeInTheDocument()
    expect(
      document.querySelector('video[data-hero-loop="true"]'),
    ).not.toBeInTheDocument()
  })

  it('honors explicit forcePoster policy for hero looping video', () => {
    setMatchMedia({ pointerCoarse: false })

    render(
      <HeroLoopingVideo
        videoSrc="https://example.com/video.mp4"
        posterSrc="https://example.com/poster.jpg"
        alt="Hero looping preview"
        playbackPolicy="forcePoster"
      />,
    )

    expect(
      screen.getByRole('img', { name: 'Hero looping preview' }),
    ).toBeInTheDocument()
    expect(
      document.querySelector('video[data-hero-loop="true"]'),
    ).not.toBeInTheDocument()
  })

  it('renders background autoplay video for coarse/touch pointers when autoplay is allowed', () => {
    setMatchMedia({ pointerCoarse: true })
    setViewportWidth(390)

    render(
      <HeroBackgroundLoop
        videoSrc="https://example.com/video.mp4"
        posterSrc="https://example.com/poster.jpg"
        posterAlt="Hero poster"
        videoClassName="hero-video"
      />,
    )

    expect(screen.getByRole('img', { name: 'Hero poster' })).toBeInTheDocument()
    expect(document.querySelector('video[data-hero-loop="true"]')).toBeInTheDocument()
  })

  it('renders background autoplay video for non-touch pointers', () => {
    setMatchMedia({ pointerCoarse: false })

    render(
      <HeroBackgroundLoop
        videoSrc="https://example.com/video.mp4"
        posterSrc="https://example.com/poster.jpg"
        posterAlt="Hero poster"
        videoClassName="hero-video"
      />,
    )

    expect(screen.getByRole('img', { name: 'Hero poster' })).toBeInTheDocument()
    expect(
      document.querySelector('video[data-hero-loop="true"]'),
    ).toBeInTheDocument()
  })

  it('renders HeroLoopingVideo on touch pointers when autoplay is allowed', () => {
    setMatchMedia({ pointerCoarse: true })
    setViewportWidth(390)

    render(
      <HeroLoopingVideo
        videoSrc="https://example.com/video.mp4"
        posterSrc="https://example.com/poster.jpg"
        alt="Hero looping preview"
      />,
    )

    expect(
      screen.getByRole('img', { name: 'Hero looping preview' }),
    ).toBeInTheDocument()
    expect(document.querySelector('video[data-hero-loop="true"]')).toBeInTheDocument()
  })

  it('falls back to posters when the network is constrained', () => {
    setMatchMedia({ pointerCoarse: true })
    setViewportWidth(390)
    setNavigatorConnection({ saveData: true, effectiveType: '4g' })

    render(
      <HeroBackgroundLoop
        videoSrc="https://example.com/video.mp4"
        posterSrc="https://example.com/poster.jpg"
        posterAlt="Hero poster"
        videoClassName="hero-video"
      />,
    )

    expect(screen.getByRole('img', { name: 'Hero poster' })).toBeInTheDocument()
    expect(
      document.querySelector('video[data-hero-loop="true"]'),
    ).not.toBeInTheDocument()
  })

  it('does not render AsciiMotionIcon video on coarse/touch pointers', () => {
    setMatchMedia({ pointerCoarse: true })

    render(
      <AsciiMotionIcon
        videoSrc="https://example.com/icon.mp4"
        posterSrc="https://example.com/icon-poster.png"
        alt="ASCII icon"
      />,
    )

    expect(screen.getByRole('img', { name: 'ASCII icon' })).toBeInTheDocument()
    expect(document.querySelector('video')).not.toBeInTheDocument()
  })

  it('renders AsciiMotionIcon video on non-touch pointers', () => {
    setMatchMedia({ pointerCoarse: false })

    render(
      <AsciiMotionIcon
        videoSrc="https://example.com/icon.mp4"
        posterSrc="https://example.com/icon-poster.png"
        alt="ASCII icon"
      />,
    )

    expect(document.querySelector('video')).toBeInTheDocument()
    expect(
      screen.queryByRole('img', { name: 'ASCII icon' }),
    ).not.toBeInTheDocument()
  })

  it('renders HeroLoopingVideo on non-touch pointers', () => {
    setMatchMedia({ pointerCoarse: false })

    render(
      <HeroLoopingVideo
        videoSrc="https://example.com/video.mp4"
        posterSrc="https://example.com/poster.jpg"
        alt="Hero looping preview"
      />,
    )

    expect(
      screen.getByRole('img', { name: 'Hero looping preview' }),
    ).toBeInTheDocument()
    expect(
      document.querySelector('video[data-hero-loop="true"]'),
    ).toBeInTheDocument()
  })

  it('keeps the autoplay video out of server-rendered HTML', () => {
    // Pre-hydration playback would start before the inline-presentation
    // guards attach, so SSR markup must stay poster-only.
    const backgroundMarkup = renderToString(
      <HeroBackgroundLoop
        videoSrc="https://example.com/video.mp4"
        posterSrc="https://example.com/poster.jpg"
        posterAlt="Hero poster"
        videoClassName="hero-video"
      />,
    )
    const loopingMarkup = renderToString(
      <HeroLoopingVideo
        videoSrc="https://example.com/video.mp4"
        posterSrc="https://example.com/poster.jpg"
        alt="Hero looping preview"
      />,
    )

    expect(backgroundMarkup).not.toContain('<video')
    expect(loopingMarkup).not.toContain('<video')
  })

  it('keeps hero loops poster-only inside embedded webviews', () => {
    setMatchMedia({ pointerCoarse: true })
    setViewportWidth(390)
    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 320.0.0.23.109',
    })

    render(
      <HeroBackgroundLoop
        videoSrc="https://example.com/video.mp4"
        posterSrc="https://example.com/poster.jpg"
        posterAlt="Hero poster"
        videoClassName="hero-video"
      />,
    )

    expect(screen.getByRole('img', { name: 'Hero poster' })).toBeInTheDocument()
    expect(
      document.querySelector('video[data-hero-loop="true"]'),
    ).not.toBeInTheDocument()
  })
})
