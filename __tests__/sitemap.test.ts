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
      "https://www.design-prism.com/websites",
      "https://www.design-prism.com/ads",
      "https://www.design-prism.com/local-listings",
      "https://www.design-prism.com/local-seo-services",
      "https://www.design-prism.com/local-seo-agency",
      "https://www.design-prism.com/seo/audit",
      "https://www.design-prism.com/pricing",
      "https://www.design-prism.com/case-studies",
      "https://www.design-prism.com/blog",
      "https://www.design-prism.com/library",
      "https://www.design-prism.com/podcast",
    ]))

    const seen = new Set<string>()
    for (const url of urls) {
      expect(url.startsWith("https://www.design-prism.com")).toBe(true)
      if (url !== "https://www.design-prism.com") {
        expect(url.endsWith("/")).toBe(false)
      }
      expect(seen.has(url)).toBe(false)
      seen.add(url)
    }

    expect(urls.some((url) => url.includes("/library/"))).toBe(true)
    expect(urls.some((url) => url.startsWith("https://www.design-prism.com/podcast/"))).toBe(true)
    expect(urls.some((url) => url.endsWith("/aeo-thank-you"))).toBe(false)
  })
})
