import { defineConfig, devices } from "@playwright/test"

const port = process.env.PLAYWRIGHT_PORT ? Number(process.env.PLAYWRIGHT_PORT) : 3300
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${port}`

export default defineConfig({
  testDir: "__tests__/visual",
  testMatch: ["locked-routes.spec.ts"],
  fullyParallel: true,
  timeout: 60_000,
  // Absorb the occasional CI-only mobile navigation timeout without hiding
  // real regressions; local runs stay strict.
  retries: process.env.CI ? 2 : 0,
  snapshotPathTemplate:
    "{snapshotDir}/locked-routes.spec.ts-snapshots/{arg}-{projectName}{ext}",
  expect: {
    toHaveScreenshot: {
      // Allow cross-platform font/rendering drift (macOS vs Linux CI) while still
      // catching meaningful layout regressions on locked routes.
      maxDiffPixelRatio: 0.05,
    },
  },
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop-chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: "mobile-chromium",
      use: {
        ...devices["iPhone 13"],
      },
    },
  ],
  webServer: {
    command: `pnpm start -p ${port}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
