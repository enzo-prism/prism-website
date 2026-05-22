import { chromium, devices, firefox, webkit } from '@playwright/test'

const baseUrl = process.env.PERF_BASE_URL ?? 'http://127.0.0.1:3301'

const routes = [
  { path: '/', heading: /each channel compounds the next\./i },
  { path: '/about', heading: /built by enzo sison\./i },
  {
    path: '/pricing',
    heading: /a clearer way to invest in growth\./i,
  },
  { path: '/get-started', heading: /create your growth dashboard\./i },
]

const targetProfiles = [
  {
    name: 'desktop-chromium',
    browserType: chromium,
    contextOptions: {
      ...devices['Desktop Chrome'],
      viewport: { width: 1280, height: 720 },
    },
    budgets: {
      headingVisibleMs: 5000,
      domContentLoadedMs: 2500,
      loadEventEndMs: 6000,
    },
  },
  {
    name: 'desktop-firefox',
    browserType: firefox,
    contextOptions: {
      viewport: { width: 1280, height: 720 },
      userAgent: devices['Desktop Firefox'].userAgent,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
    },
    budgets: {
      headingVisibleMs: 5500,
      domContentLoadedMs: 3000,
      loadEventEndMs: 6500,
    },
  },
  {
    name: 'desktop-webkit',
    browserType: webkit,
    contextOptions: {
      ...devices['Desktop Safari'],
      viewport: { width: 1280, height: 720 },
    },
    budgets: {
      headingVisibleMs: 5500,
      domContentLoadedMs: 3000,
      loadEventEndMs: 6500,
    },
  },
  {
    name: 'mobile-chromium',
    browserType: chromium,
    contextOptions: {
      ...devices['Pixel 7'],
    },
    budgets: {
      headingVisibleMs: 9000,
      domContentLoadedMs: 5500,
      loadEventEndMs: 11000,
    },
  },
  {
    name: 'mobile-webkit',
    browserType: webkit,
    contextOptions: {
      ...devices['iPhone 13'],
    },
    budgets: {
      headingVisibleMs: 9500,
      domContentLoadedMs: 6000,
      loadEventEndMs: 11500,
    },
  },
]

function formatMetric(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 'n/a'
  }

  return `${Math.round(value)}ms`
}

async function measureRoute(profile, route) {
  const browser = await profile.browserType.launch({ headless: true })
  const context = await browser.newContext(profile.contextOptions)
  const page = await context.newPage()

  let jsRequestCount = 0
  let jsTransferBytes = 0

  page.on('response', async (response) => {
    const url = response.url()
    if (!url.includes('/_next/') || !url.endsWith('.js')) {
      return
    }

    jsRequestCount += 1

    const contentLength = response.headers()['content-length']
    if (!contentLength) {
      return
    }

    const parsed = Number.parseInt(contentLength, 10)
    if (!Number.isNaN(parsed)) {
      jsTransferBytes += parsed
    }
  })

  await page.addInitScript(() => {
    window.__PRISM_DISABLE_ELEVENLABS_WIDGET__ = true
  })

  const navigationStartedAt = Date.now()

  await page.goto(`${baseUrl}${route.path}`, { waitUntil: 'domcontentloaded' })
  await page.getByRole('heading', { level: 1, name: route.heading }).waitFor({
    state: 'visible',
    timeout: 20_000,
  })

  const headingVisibleMs = Date.now() - navigationStartedAt

  try {
    await page.waitForLoadState('load', { timeout: 10_000 })
  } catch {
    // Keep the smoke test focused on visible readiness plus navigation timing.
  }

  const navigationTiming = await page.evaluate(() => {
    const [entry] = performance.getEntriesByType('navigation')
    if (!entry || !('domContentLoadedEventEnd' in entry)) {
      return null
    }

    return {
      domContentLoadedMs: entry.domContentLoadedEventEnd,
      loadEventEndMs: entry.loadEventEnd,
    }
  })

  await context.close()
  await browser.close()

  return {
    profile: profile.name,
    route: route.path,
    headingVisibleMs,
    domContentLoadedMs: navigationTiming?.domContentLoadedMs ?? null,
    loadEventEndMs: navigationTiming?.loadEventEndMs ?? null,
    jsRequestCount,
    jsTransferKb:
      jsTransferBytes > 0 ? Number((jsTransferBytes / 1024).toFixed(1)) : null,
  }
}

function evaluateBudgets(profile, result) {
  const failures = []
  const { budgets } = profile

  if (result.headingVisibleMs > budgets.headingVisibleMs) {
    failures.push(
      `heading visible ${formatMetric(result.headingVisibleMs)} > ${formatMetric(budgets.headingVisibleMs)}`,
    )
  }

  if (
    typeof result.domContentLoadedMs === 'number' &&
    result.domContentLoadedMs > budgets.domContentLoadedMs
  ) {
    failures.push(
      `DOMContentLoaded ${formatMetric(result.domContentLoadedMs)} > ${formatMetric(budgets.domContentLoadedMs)}`,
    )
  }

  if (
    typeof result.loadEventEndMs === 'number' &&
    result.loadEventEndMs > budgets.loadEventEndMs
  ) {
    failures.push(
      `load ${formatMetric(result.loadEventEndMs)} > ${formatMetric(budgets.loadEventEndMs)}`,
    )
  }

  return failures
}

async function main() {
  const results = []
  const failures = []

  for (const profile of targetProfiles) {
    for (const route of routes) {
      const result = await measureRoute(profile, route)
      results.push(result)

      const budgetFailures = evaluateBudgets(profile, result)
      if (budgetFailures.length > 0) {
        failures.push({
          profile: profile.name,
          route: route.path,
          failures: budgetFailures,
        })
      }
    }
  }

  console.table(
    results.map((result) => ({
      profile: result.profile,
      route: result.route,
      heading: formatMetric(result.headingVisibleMs),
      domContentLoaded: formatMetric(result.domContentLoadedMs),
      load: formatMetric(result.loadEventEndMs),
      jsRequests: result.jsRequestCount,
      jsTransferKb:
        typeof result.jsTransferKb === 'number'
          ? `${result.jsTransferKb}KB`
          : 'n/a',
    })),
  )

  if (failures.length > 0) {
    console.error('\nPerformance smoke budgets failed:\n')
    for (const failure of failures) {
      console.error(`${failure.profile} ${failure.route}`)
      for (const item of failure.failures) {
        console.error(`  - ${item}`)
      }
    }
    process.exitCode = 1
    return
  }

  console.log('\nPerformance smoke budgets passed.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
