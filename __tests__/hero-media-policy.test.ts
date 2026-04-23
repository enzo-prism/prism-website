import {
  resolveHeroPlaybackPolicy,
  resolveHeroPlaybackPlatform,
  resolveViewportClass,
} from '@/lib/hero-media-policy'

describe('hero media playback policy', () => {
  it('keeps autoplay enabled on mobile touch devices when motion and network are healthy', () => {
    const intent = resolveHeroPlaybackPolicy({
      reducedMotion: false,
      isTouchCoarse: true,
      viewportWidth: 390,
      hasAutoplayError: false,
      platform: 'ios',
      saveData: false,
      effectiveType: '4g',
    })

    expect(intent.mode).toBe('video-autoplay')
    expect(intent.reason).toBe('autoplay-allowed')
    expect(intent.state.viewportClass).toBe('mobile')
  })

  it('falls back when the user prefers reduced motion', () => {
    const intent = resolveHeroPlaybackPolicy({
      reducedMotion: true,
      isTouchCoarse: false,
      viewportWidth: 1280,
      hasAutoplayError: false,
      platform: 'other',
    })

    expect(intent.mode).toBe('video-fallback-poster')
    expect(intent.reason).toBe('reduced-motion')
  })

  it('falls back when the connection is constrained', () => {
    const intent = resolveHeroPlaybackPolicy({
      reducedMotion: false,
      isTouchCoarse: false,
      viewportWidth: 1280,
      hasAutoplayError: false,
      platform: 'other',
      saveData: true,
      effectiveType: '4g',
    })

    expect(intent.mode).toBe('video-fallback-poster')
    expect(intent.reason).toBe('network-constrained')
  })

  it('keeps autoplay disabled after a rejected play attempt', () => {
    const intent = resolveHeroPlaybackPolicy({
      reducedMotion: false,
      isTouchCoarse: false,
      viewportWidth: 1280,
      hasAutoplayError: true,
      platform: 'other',
    })

    expect(intent.mode).toBe('video-fallback-poster')
    expect(intent.reason).toBe('autoplay-rejected')
  })

  it('resolves viewport classes consistently', () => {
    expect(resolveViewportClass(390)).toBe('mobile')
    expect(resolveViewportClass(900)).toBe('tablet')
    expect(resolveViewportClass(1440)).toBe('desktop')
  })

  it('detects iOS touch devices from user agent strings', () => {
    expect(
      resolveHeroPlaybackPlatform(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)',
      ),
    ).toBe('ios')
  })
})
