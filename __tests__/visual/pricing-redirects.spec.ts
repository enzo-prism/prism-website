import { expect, test } from "@playwright/test"

const legacyPricingRoutes = [
  "/pricing-dental",
  "/ai-website-launch",
  "/one-time-fee",
  "/offers",
  "/offers/summer-website-makeover",
  "/growth",
  "/checkout/launch",
  "/checkout/grow",
  "/checkout/scale",
] as const

test.describe("legacy pricing redirects", () => {
  for (const route of legacyPricingRoutes) {
    test(`${route} permanently redirects to /pricing`, async ({ request }) => {
      const response = await request.fetch(route, { maxRedirects: 0 })
      expect([301, 308]).toContain(response.status())
      const location = response.headers()["location"] ?? ""
      expect(location).toContain("/pricing")
    })
  }
})

// 2026-10-12: Prism offers three services (Websites, Content, Ads). The two
// retired packaged offers redirect permanently to their closest live page.
const retiredOfferRedirects = [
  { route: "/dental-os", destination: "/dental-website" },
  { route: "/prism-infinity", destination: "/content" },
] as const

test.describe("retired offer redirects", () => {
  for (const { route, destination } of retiredOfferRedirects) {
    test(`${route} permanently redirects to ${destination}`, async ({ request }) => {
      const response = await request.fetch(route, { maxRedirects: 0 })
      expect([301, 308]).toContain(response.status())
      const location = response.headers()["location"] ?? ""
      expect(new URL(location, "http://localhost").pathname).toBe(destination)

      const landed = await request.fetch(route)
      expect(landed.status()).toBe(200)
    })
  }
})
