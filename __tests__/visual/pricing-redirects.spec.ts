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

// 2026-10-12: Prism offered three services (Websites, now Website Design,
// Content, Ads); AEO joined as the fourth on 2026-10-18. The two retired
// packaged offers redirect permanently to their closest live page.
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

// 2026-10-18: AEO is a service page again. The AI search shortpaths and the
// retired /ai-seo-services lander land on /aeo in one permanent hop, and /aeo
// itself serves the page.
const aeoRedirectSources = [
  "/ai",
  "/ai-seo-services",
  "/ai-seo",
  "/answer-engine-optimization",
] as const

test.describe("AEO redirects", () => {
  for (const route of aeoRedirectSources) {
    test(`${route} permanently redirects to /aeo`, async ({ request }) => {
      const response = await request.fetch(route, { maxRedirects: 0 })
      expect([301, 308]).toContain(response.status())
      const location = response.headers()["location"] ?? ""
      expect(new URL(location, "http://localhost").pathname).toBe("/aeo")
    })
  }

  test("/aeo serves the service page without redirecting", async ({ request }) => {
    const response = await request.fetch("/aeo", { maxRedirects: 0 })
    expect(response.status()).toBe(200)
  })
})

// 2026-10-19: the website service is Website Design. The old /websites page
// and the web design shortpaths land on /website-design in one permanent hop.
const websiteDesignRedirectSources = [
  "/websites",
  "/website",
  "/web-design",
  "/website-design-services",
] as const

test.describe("Website Design redirects", () => {
  for (const route of websiteDesignRedirectSources) {
    test(`${route} permanently redirects to /website-design`, async ({ request }) => {
      const response = await request.fetch(route, { maxRedirects: 0 })
      expect([301, 308]).toContain(response.status())
      const location = response.headers()["location"] ?? ""
      expect(new URL(location, "http://localhost").pathname).toBe("/website-design")
    })
  }

  test("/website-design serves the service page without redirecting", async ({ request }) => {
    const response = await request.fetch("/website-design", { maxRedirects: 0 })
    expect(response.status()).toBe(200)
  })
})
