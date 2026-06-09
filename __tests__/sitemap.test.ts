jest.mock("server-only", () => ({}), { virtual: true })

import sitemap from "@/app/sitemap"

describe("sitemap", () => {
  it("returns canonical URLs and includes core pages", async () => {
    const entries = await sitemap()
    const urls = entries.map((e) => e.url)

    expect(urls).toEqual(expect.arrayContaining([
      "https://www.design-prism.com",
      "https://www.design-prism.com/services",
      "https://www.design-prism.com/aeo",
      "https://www.design-prism.com/apply",
      "https://www.design-prism.com/websites",
      "https://www.design-prism.com/ads",
      "https://www.design-prism.com/local-listings",
      "https://www.design-prism.com/seo/audit",
      "https://www.design-prism.com/ai-agents/dental",
      "https://www.design-prism.com/pricing",
      "https://www.design-prism.com/case-studies",
      "https://www.design-prism.com/case-studies/roseville-dental-academy",
      "https://www.design-prism.com/blog",
    ]))

    expect(urls.length).toBeGreaterThanOrEqual(85)
    expect(urls.length).toBeLessThanOrEqual(100)

    const seen = new Set<string>()
    for (const url of urls) {
      expect(url.startsWith("https://www.design-prism.com")).toBe(true)
      if (url !== "https://www.design-prism.com") {
        expect(url.endsWith("/")).toBe(false)
      }
      expect(seen.has(url)).toBe(false)
      seen.add(url)
    }

    expect(urls.some((url) => url.includes("/library/"))).toBe(false)
    expect(urls.some((url) => url.startsWith("https://www.design-prism.com/podcast/"))).toBe(false)
    expect(urls.some((url) => url.endsWith("/aeo-thank-you"))).toBe(false)
    expect(urls).not.toEqual(expect.arrayContaining([
      "https://www.design-prism.com/pricing-dental",
      "https://www.design-prism.com/ai-website-launch",
      "https://www.design-prism.com/one-time-fee",
      "https://www.design-prism.com/offers",
      "https://www.design-prism.com/growth",
      "https://www.design-prism.com/checkout/launch",
      "https://www.design-prism.com/checkout/grow",
      "https://www.design-prism.com/checkout/scale",
      "https://www.design-prism.com/apps",
      "https://www.design-prism.com/software",
      "https://www.design-prism.com/openai",
      "https://www.design-prism.com/local-seo-agency",
      "https://www.design-prism.com/local-seo-services",
      "https://www.design-prism.com/seo/on-page",
      "https://www.design-prism.com/seo/off-page",
      "https://www.design-prism.com/library",
      "https://www.design-prism.com/podcast",
      "https://www.design-prism.com/refer",
    ]))

    for (const entry of entries) {
      expect(entry).not.toHaveProperty("priority")
      expect(entry).not.toHaveProperty("changeFrequency")
    }
  })
})
