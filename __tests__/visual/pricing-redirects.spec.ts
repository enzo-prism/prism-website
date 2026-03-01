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
