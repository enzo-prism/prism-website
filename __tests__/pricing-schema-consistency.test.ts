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

  it("keeps retired pricing out of service schemas", () => {
    for (const relativePath of schemaPages) {
      const content = fs.readFileSync(path.join(process.cwd(), relativePath), "utf8")
      // The five-tier ladder (60-day sprints at $3,500) is retired; service
      // schemas publish price-free offers that point at /pricing instead of
      // claiming amounts that can rot.
      expect(content).not.toMatch(/60-Day Growth Sprint/)
      expect(content).not.toMatch(/price: ["']3500["']/)
      expect(content).not.toContain('price: "1000"')
      expect(content).not.toContain('price: "2000"')
      expect(content).not.toContain('billingPeriod: "P1M"')
    }
  })

  it("allows websites schema to publish the one-time website build offer", () => {
    const content = fs.readFileSync(path.join(process.cwd(), "app/websites/page.tsx"), "utf8")
    expect(content).toContain("One-time website build")
    expect(content).toContain("$300 flat")
    expect(content).toMatch(/price: ["']300["']/)
    expect(content).toMatch(/url: CANONICAL_URL/)
    expect(content).not.toContain("60-Day Growth Sprint")
  })
})
