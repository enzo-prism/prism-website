import fs from "node:fs"
import path from "node:path"

const schemaPages = [
  "app/websites/page.tsx",
  "app/ads/page.tsx",
  "app/seo/page.tsx",
  "app/local-listings/page.tsx",
] as const

describe("pricing schema consistency", () => {
  for (const relativePath of schemaPages) {
    it(`${relativePath} does not publish conflicting price ranges`, () => {
      const content = fs.readFileSync(path.join(process.cwd(), relativePath), "utf8")
      expect(content).not.toContain("priceRange")
      expect(content).toContain('url: "https://www.design-prism.com/pricing"')
    })
  }

  it("keeps websites schema aligned to website overhaul pricing", () => {
    const content = fs.readFileSync(path.join(process.cwd(), "app/websites/page.tsx"), "utf8")
    expect(content).toContain('price: "1000"')
  })

  it("keeps recurring service schemas aligned to growth partnership pricing", () => {
    for (const relativePath of [
      "app/ads/page.tsx",
      "app/seo/page.tsx",
      "app/local-listings/page.tsx",
    ] as const) {
      const content = fs.readFileSync(path.join(process.cwd(), relativePath), "utf8")
      expect(content).toContain('price: "2000"')
      expect(content).toContain('billingPeriod: "P1M"')
    }
  })
})
