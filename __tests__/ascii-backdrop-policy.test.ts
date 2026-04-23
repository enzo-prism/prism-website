import { resolveAsciiBackdropProfile } from '@/lib/ascii-backdrop-policy'

describe('ascii hero backdrop policy', () => {
  const baseInput = {
    fps: 18,
    quality: 'medium' as const,
    loadStrategy: 'batch' as const,
    batchSize: 24,
    maxConcurrentFetches: 6,
    reducedMotion: false,
    viewportWidth: 1280,
  }

  it('keeps the backdrop enabled on desktop defaults', () => {
    const profile = resolveAsciiBackdropProfile(baseInput)

    expect(profile.shouldRender).toBe(true)
    expect(profile.fps).toBe(18)
    expect(profile.batchSize).toBe(24)
  })

  it('uses a lighter profile on mobile while still rendering', () => {
    const profile = resolveAsciiBackdropProfile({
      ...baseInput,
      viewportWidth: 390,
      deviceMemory: 4,
      hardwareConcurrency: 6,
    })

    expect(profile.shouldRender).toBe(true)
    expect(profile.fps).toBeLessThanOrEqual(12)
    expect(profile.batchSize).toBeLessThanOrEqual(16)
    expect(profile.maxConcurrentFetches).toBeLessThanOrEqual(3)
    expect(profile.fit).toBe('contain')
    expect(profile.zoom).toBeLessThan(1)
  })

  it('preserves higher source detail on capable mobile devices when requested', () => {
    const profile = resolveAsciiBackdropProfile({
      ...baseInput,
      quality: 'high',
      viewportWidth: 390,
      deviceMemory: 6,
      hardwareConcurrency: 8,
    })

    expect(profile.shouldRender).toBe(true)
    expect(profile.quality).toBe('high')
    expect(profile.fit).toBe('contain')
  })

  it('disables the backdrop for reduced motion', () => {
    const profile = resolveAsciiBackdropProfile({
      ...baseInput,
      reducedMotion: true,
    })

    expect(profile.shouldRender).toBe(false)
  })

  it('disables the backdrop on severely constrained devices', () => {
    const profile = resolveAsciiBackdropProfile({
      ...baseInput,
      viewportWidth: 390,
      deviceMemory: 2,
      hardwareConcurrency: 2,
    })

    expect(profile.shouldRender).toBe(false)
  })
})
