import { defineConfig, devices } from "@playwright/test"

const port = process.env.PLAYWRIGHT_PORT ? Number(process.env.PLAYWRIGHT_PORT) : 3000
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${port}`

export default defineConfig({
  testDir: "__tests__/visual",
  fullyParallel: true,
  timeout: 60_000,
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
    command: [
      "SALES_CHAT_ENABLED=true",
      "SALES_CHAT_BOOKING_URL=https://cal.com/prism/demo",
      "SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL=https://checkout.example.com/website",
      "SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL=https://checkout.example.com/growth",
      "SALES_CHAT_LEADS_WEBHOOK_URL=https://hooks.example.com/sales",
      "SALES_CHAT_LEADS_WEBHOOK_SECRET=test-secret",
      `pnpm start -p ${port}`,
    ].join(" "),
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
