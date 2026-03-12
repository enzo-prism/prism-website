import { defineConfig, devices } from "@playwright/test"

const port = process.env.PLAYWRIGHT_PORT ? Number(process.env.PLAYWRIGHT_PORT) : 3300
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${port}`
const elevenLabsWidgetDisabled =
  process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED ?? "true"

export default defineConfig({
  testDir: "__tests__/visual",
  testMatch: ["locked-routes.spec.ts"],
  fullyParallel: true,
  timeout: 60_000,
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
    env: {
      ...process.env,
      NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED: elevenLabsWidgetDisabled,
    },
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
