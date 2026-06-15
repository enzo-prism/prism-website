import fs from "node:fs"
import path from "node:path"

const schemaPages = [
  "app/ads/page.tsx",
  "app/seo/page.tsx",
  "app/local-listings/page.tsx",
] as const

describe("pricing schema consistency", () => {
  for (const relativePath of schemaPages) {
    it(`${relativePath} does not publish conflicting price ranges`, () => {
      const content = fs.readFileSync(path.join(process.cwd(), relativePath), "utf8")
      expect(content).not.toContain("priceRange")
      expect(content).toMatch(/url: ["']https:\/\/www\.design-prism\.com\/pricing["']/)
    })
  }

  it("keeps service schemas aligned to the 60-day Growth Sprint starting price", () => {
    for (const relativePath of schemaPages) {
      const content = fs.readFileSync(path.join(process.cwd(), relativePath), "utf8")
      expect(content).toMatch(/name: ["']60-Day Growth Sprint["']/)
      expect(content).toMatch(/price: ["']3500["']/)
      expect(content).not.toContain('price: "1000"')
      expect(content).not.toContain('price: "2000"')
      expect(content).not.toContain('billingPeriod: "P1M"')
    }
  })

  it("allows websites schema to publish the one-time website build offer", () => {
    const content = fs.readFileSync(path.join(process.cwd(), "app/websites/page.tsx"), "utf8")
    expect(content).toContain("One-time website build")
    expect(content).toContain("starting at $300")
    expect(content).toMatch(/price: ["']300["']/)
    expect(content).toMatch(/url: CANONICAL_URL/)
    expect(content).not.toContain("60-Day Growth Sprint")
  })
})
