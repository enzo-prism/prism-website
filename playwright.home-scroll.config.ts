import { defineConfig, devices } from '@playwright/test'

const port = process.env.PLAYWRIGHT_PORT
  ? Number(process.env.PLAYWRIGHT_PORT)
  : 3310
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${port}`
const elevenLabsWidgetDisabled =
  process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED ?? 'true'

export default defineConfig({
  testDir: '__tests__/visual',
  testMatch: ['home-hash-scroll.spec.ts'],
  fullyParallel: false,
  timeout: 60_000,
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'mobile-chromium',
      use: {
        ...devices['iPhone 13'],
      },
    },
    {
      name: 'mobile-webkit',
      use: {
        ...devices['iPhone 13'],
        browserName: 'webkit',
      },
    },
  ],
  webServer: {
    command: `pnpm start -p ${port}`,
    env: {
      ...process.env,
      NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED: elevenLabsWidgetDisabled,
    },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: baseURL,
  },
})
