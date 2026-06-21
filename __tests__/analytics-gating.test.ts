/**
 * Analytics environment gating (lib/constants).
 *
 * GA, Google Ads, and Hotjar must only report from the real production
 * environment. On Vercel, preview deployments also build with
 * NODE_ENV === 'production', so the gate keys off NEXT_PUBLIC_VERCEL_ENV and
 * falls back to NODE_ENV only when that signal is absent (off-platform builds
 * and the local test runner).
 */

type ConstantsModule = typeof import('@/lib/constants')

const ORIGINAL_ENV = process.env

async function loadConstants(env: {
  NODE_ENV?: string
  NEXT_PUBLIC_VERCEL_ENV?: string
}): Promise<ConstantsModule> {
  jest.resetModules()
  process.env = { ...ORIGINAL_ENV }

  const mutableEnv = process.env as Record<string, string | undefined>
  mutableEnv.NODE_ENV = env.NODE_ENV ?? 'production'

  if (env.NEXT_PUBLIC_VERCEL_ENV === undefined) {
    delete mutableEnv.NEXT_PUBLIC_VERCEL_ENV
  } else {
    mutableEnv.NEXT_PUBLIC_VERCEL_ENV = env.NEXT_PUBLIC_VERCEL_ENV
  }

  return import('@/lib/constants')
}

afterAll(() => {
  process.env = ORIGINAL_ENV
})

describe('analytics environment gating', () => {
  it('enables analytics on the Vercel production environment', async () => {
    const { IS_PRODUCTION_ENV, IS_ANALYTICS_ENABLED } = await loadConstants({
      NODE_ENV: 'production',
      NEXT_PUBLIC_VERCEL_ENV: 'production',
    })
    expect(IS_PRODUCTION_ENV).toBe(true)
    expect(IS_ANALYTICS_ENABLED).toBe(true)
  })

  it('disables analytics on Vercel preview deployments', async () => {
    const { IS_PRODUCTION_ENV, IS_ANALYTICS_ENABLED } = await loadConstants({
      NODE_ENV: 'production',
      NEXT_PUBLIC_VERCEL_ENV: 'preview',
    })
    expect(IS_PRODUCTION_ENV).toBe(false)
    expect(IS_ANALYTICS_ENABLED).toBe(false)
  })

  it('disables analytics on the Vercel development environment', async () => {
    const { IS_ANALYTICS_ENABLED } = await loadConstants({
      NODE_ENV: 'production',
      NEXT_PUBLIC_VERCEL_ENV: 'development',
    })
    expect(IS_ANALYTICS_ENABLED).toBe(false)
  })

  it('falls back to NODE_ENV when NEXT_PUBLIC_VERCEL_ENV is absent (off Vercel)', async () => {
    const { IS_PRODUCTION_ENV, IS_ANALYTICS_ENABLED } = await loadConstants({
      NODE_ENV: 'production',
    })
    expect(IS_PRODUCTION_ENV).toBe(true)
    expect(IS_ANALYTICS_ENABLED).toBe(true)
  })

  it('keeps analytics disabled in local development', async () => {
    const { IS_ANALYTICS_ENABLED } = await loadConstants({
      NODE_ENV: 'development',
    })
    expect(IS_ANALYTICS_ENABLED).toBe(false)
  })

  it('always resolves a measurement id via the fallback', async () => {
    const { GA_MEASUREMENT_ID } = await loadConstants({ NODE_ENV: 'production' })
    expect(GA_MEASUREMENT_ID).toMatch(/^G-/)
  })
})
