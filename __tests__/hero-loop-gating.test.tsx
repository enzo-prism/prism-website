import { render, screen } from '@testing-library/react'

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

describe('Hero background loops are device-gated on touch', () => {
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

  it('does not render background autoplay video for coarse/touch pointers', () => {
    setMatchMedia({ pointerCoarse: true })

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

  it('does not render HeroLoopingVideo on touch pointers', () => {
    setMatchMedia({ pointerCoarse: true })

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
})
