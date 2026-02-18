import {
  resolveHeroPlaybackPolicy,
  resolveViewportClass,
} from '@/lib/hero-media-policy'

describe('hero media playback policy', () => {
  it('forces poster mode for reduced-motion users', () => {
    const intent = resolveHeroPlaybackPolicy({
      reducedMotion: true,
      isTouchCoarse: false,
      viewportWidth: 1024,
      playbackPolicy: 'auto',
    })

    expect(intent.mode).toBe('video-fallback-poster')
    expect(intent.reason).toBe('reduced-motion')
    expect(resolveViewportClass(1024)).toBe("tablet")
  })

  it('falls back on coarse touch environments', () => {
    const intent = resolveHeroPlaybackPolicy({
      reducedMotion: false,
      isTouchCoarse: true,
      viewportWidth: 1024,
      playbackPolicy: 'auto',
    })

    expect(intent.mode).toBe('video-fallback-poster')
  })

  it('allows autoplay for supported desktop contexts', () => {
    const intent = resolveHeroPlaybackPolicy({
      reducedMotion: false,
      isTouchCoarse: false,
      viewportWidth: 1440,
      playbackPolicy: 'auto',
    })

    expect(intent.mode).toBe('video-autoplay')
  })

  it('falls back when autoplay has previously errored', () => {
    const intent = resolveHeroPlaybackPolicy({
      reducedMotion: false,
      isTouchCoarse: false,
      viewportWidth: 1440,
      hasAutoplayError: true,
      playbackPolicy: "auto",
    })

    expect(intent.mode).toBe("video-fallback-poster")
    expect(intent.reason).toBe("autoplay-rejected")
  })

  it('respects explicit forcePoster override', () => {
    const intent = resolveHeroPlaybackPolicy({
      reducedMotion: false,
      isTouchCoarse: false,
      viewportWidth: 1440,
      playbackPolicy: 'forcePoster',
    })

    expect(intent.mode).toBe('poster-only')
    expect(intent.reason).toBe('policy-force-poster')
  })
})
