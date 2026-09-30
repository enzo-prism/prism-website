import { defineConfig, devices } from '@playwright/test'

const port = process.env.PLAYWRIGHT_PORT
  ? Number(process.env.PLAYWRIGHT_PORT)
  : 3347
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `https://localhost:${port}`

export default defineConfig({
  testDir: '__tests__/visual',
  testMatch: ['scholarships.spec.ts'],
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL,
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: {
        ...devices['Desktop Chrome'],
        extraHTTPHeaders: {
          'x-forwarded-for': 'playwright-desktop-scholarships',
        },
        viewport: { width: 1280, height: 900 },
      },
    },
    {
      name: 'mobile-chromium',
      use: {
        ...devices['iPhone 13'],
        browserName: 'chromium',
        extraHTTPHeaders: {
          'x-forwarded-for': 'playwright-mobile-chromium-scholarships',
        },
      },
    },
    {
      name: 'mobile-webkit',
      use: {
        ...devices['iPhone 13'],
        browserName: 'webkit',
        extraHTTPHeaders: {
          'x-forwarded-for': 'playwright-mobile-webkit-scholarships',
        },
      },
    },
  ],
  webServer: {
    command: `node scripts/start-scholarships-test-server.mjs ${port}`,
    env: {
      ...process.env,
      NODE_ENV: 'production',
      NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED: 'true',
      OFFICE_HOURS_ACCESS_CODE: 'prism-office-hours-test-code',
      OFFICE_HOURS_SESSION_SECRET:
        'test-only-office-hours-secret-at-least-32-characters',
    },
    url: baseURL,
    ignoreHTTPSErrors: true,
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
