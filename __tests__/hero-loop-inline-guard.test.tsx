import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import HeroBackgroundLoop from '@/components/HeroBackgroundLoop'
import HeroLoopingVideo from '@/components/HeroLoopingVideo'
import {
  forceHeroVideoInline,
  isHeroVideoPresentationInline,
  watchHeroVideoInlinePlayback,
} from '@/lib/hero-inline-playback'

const TOUCH_MEDIA_QUERY = '(hover: none), (pointer: coarse)'

function setMatchMedia({ pointerCoarse }: { pointerCoarse: boolean }) {
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

function getHeroVideo(): HTMLVideoElement {
  const video = document.querySelector<HTMLVideoElement>(
    'video[data-hero-loop="true"]',
  )
  expect(video).not.toBeNull()
  return video as HTMLVideoElement
}

describe('Hero loops never escape inline playback', () => {
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
    setMatchMedia({ pointerCoarse: true })
    setViewportWidth(390)
    Object.defineProperty(window.navigator, 'connection', {
      configurable: true,
      value: undefined,
    })
  })

  it('never renders native controls on hero loop videos', () => {
    render(
      <HeroBackgroundLoop
        videoSrc="https://example.com/video.mp4"
        posterSrc="https://example.com/poster.jpg"
        posterAlt="Hero poster"
        videoClassName="hero-video"
      />,
    )

    const video = getHeroVideo()
    expect(video.hasAttribute('controls')).toBe(false)
    expect(video.getAttribute('controlslist')).toContain('nofullscreen')
  })

  it('falls back to the poster when HeroBackgroundLoop enters native fullscreen', async () => {
    const onVideoError = jest.fn()

    render(
      <HeroBackgroundLoop
        videoSrc="https://example.com/video.mp4"
        posterSrc="https://example.com/poster.jpg"
        posterAlt="Hero poster"
        videoClassName="hero-video"
        onVideoError={onVideoError}
      />,
    )

    const video = getHeroVideo()
    fireEvent(video, new Event('webkitbeginfullscreen'))

    await waitFor(() => {
      expect(
        document.querySelector('video[data-hero-loop="true"]'),
      ).not.toBeInTheDocument()
    })
    expect(screen.getByRole('img', { name: 'Hero poster' })).toBeInTheDocument()
    expect(onVideoError).toHaveBeenCalled()
  })

  it('falls back to the poster when HeroLoopingVideo leaves inline presentation', async () => {
    render(
      <HeroLoopingVideo
        videoSrc="https://example.com/video.mp4"
        posterSrc="https://example.com/poster.jpg"
        alt="Hero looping preview"
      />,
    )

    const video = getHeroVideo()
    Object.defineProperty(video, 'webkitPresentationMode', {
      configurable: true,
      value: 'fullscreen',
    })
    fireEvent(video, new Event('webkitpresentationmodechanged'))

    await waitFor(() => {
      expect(
        document.querySelector('video[data-hero-loop="true"]'),
      ).not.toBeInTheDocument()
    })
    expect(
      screen.getByRole('img', { name: 'Hero looping preview' }),
    ).toBeInTheDocument()
  })

  describe('watchHeroVideoInlinePlayback', () => {
    it('exits native fullscreen and reports the violation', () => {
      const video = document.createElement('video')
      const webkitExitFullscreen = jest.fn()
      Object.defineProperty(video, 'webkitDisplayingFullscreen', {
        configurable: true,
        value: true,
      })
      Object.defineProperty(video, 'webkitExitFullscreen', {
        configurable: true,
        value: webkitExitFullscreen,
      })

      const onViolation = jest.fn()
      const detach = watchHeroVideoInlinePlayback(video, onViolation)

      video.dispatchEvent(new Event('webkitbeginfullscreen'))
      expect(onViolation).toHaveBeenCalledTimes(1)
      expect(webkitExitFullscreen).toHaveBeenCalledTimes(1)

      detach()
      video.dispatchEvent(new Event('webkitbeginfullscreen'))
      expect(onViolation).toHaveBeenCalledTimes(1)
    })

    it('reports violations from the document fullscreen API', () => {
      const video = document.createElement('video')
      const onViolation = jest.fn()
      const detach = watchHeroVideoInlinePlayback(video, onViolation)

      Object.defineProperty(document, 'fullscreenElement', {
        configurable: true,
        value: video,
      })
      document.dispatchEvent(new Event('fullscreenchange'))
      expect(onViolation).toHaveBeenCalledTimes(1)

      Object.defineProperty(document, 'fullscreenElement', {
        configurable: true,
        value: null,
      })
      detach()
    })
  })

  describe('isHeroVideoPresentationInline', () => {
    it('treats plain inline videos as inline', () => {
      const video = document.createElement('video')
      expect(isHeroVideoPresentationInline(video)).toBe(true)
    })

    it('flags non-inline presentation modes', () => {
      const video = document.createElement('video')
      Object.defineProperty(video, 'webkitPresentationMode', {
        configurable: true,
        value: 'picture-in-picture',
      })
      expect(isHeroVideoPresentationInline(video)).toBe(false)
    })
  })

  describe('forceHeroVideoInline', () => {
    it('asks WebKit to return to inline presentation', () => {
      const video = document.createElement('video')
      const webkitSetPresentationMode = jest.fn()
      Object.defineProperty(video, 'webkitSetPresentationMode', {
        configurable: true,
        value: webkitSetPresentationMode,
      })

      forceHeroVideoInline(video)
      expect(webkitSetPresentationMode).toHaveBeenCalledWith('inline')
    })
  })
})
