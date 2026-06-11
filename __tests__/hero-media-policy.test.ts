import {
  INITIAL_HERO_PLAYBACK_INTENT,
  isEmbeddedWebViewUserAgent,
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

  it('falls back to posters inside embedded webviews', () => {
    const intent = resolveHeroPlaybackPolicy({
      reducedMotion: false,
      isTouchCoarse: true,
      viewportWidth: 390,
      hasAutoplayError: false,
      platform: 'ios',
      isEmbeddedWebView: true,
    })

    expect(intent.mode).toBe('video-fallback-poster')
    expect(intent.reason).toBe('embedded-webview')
  })

  it('never allows autoplay before client-side evaluation', () => {
    expect(INITIAL_HERO_PLAYBACK_INTENT.mode).not.toBe('video-autoplay')
    expect(INITIAL_HERO_PLAYBACK_INTENT.reason).toBe('pending-evaluation')
  })
})

describe('embedded webview user agent detection', () => {
  it('flags iOS WKWebViews missing the Safari token', () => {
    expect(
      isEmbeddedWebViewUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
      ),
    ).toBe(true)
  })

  it('flags known in-app browsers even with Safari-like UAs', () => {
    expect(
      isEmbeddedWebViewUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 320.0.0.23.109',
      ),
    ).toBe(true)
    expect(
      isEmbeddedWebViewUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1 [FBAN/FBIOS;FBAV/440.0.0.0.0]',
      ),
    ).toBe(true)
  })

  it('flags Android WebViews via the wv token', () => {
    expect(
      isEmbeddedWebViewUserAgent(
        'Mozilla/5.0 (Linux; Android 14; Pixel 8 Build/UQ1A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/124.0.0.0 Mobile Safari/537.36',
      ),
    ).toBe(true)
  })

  it('does not flag real mobile browsers', () => {
    expect(
      isEmbeddedWebViewUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
      ),
    ).toBe(false)
    expect(
      isEmbeddedWebViewUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/124.0.6367.111 Mobile/15E148 Safari/604.1',
      ),
    ).toBe(false)
    expect(
      isEmbeddedWebViewUserAgent(
        'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
      ),
    ).toBe(false)
    expect(isEmbeddedWebViewUserAgent(undefined)).toBe(false)
  })
})
