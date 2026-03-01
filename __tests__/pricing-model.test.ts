import {
  CANONICAL_PRICING_OFFERS,
  FREE_AUDIT_PRICE,
  FREE_AUDIT_PRICE_LABEL,
  GROWTH_PARTNERSHIP_MONTHLY_PRICE,
  GROWTH_PARTNERSHIP_PRICE_LABEL,
  WEBSITE_OVERHAUL_PRICE,
  WEBSITE_OVERHAUL_PRICE_LABEL,
} from "@/lib/pricing-model"

describe("pricing model", () => {
  it("exports canonical numeric prices", () => {
    expect(WEBSITE_OVERHAUL_PRICE).toBe(1000)
    expect(GROWTH_PARTNERSHIP_MONTHLY_PRICE).toBe(2000)
    expect(FREE_AUDIT_PRICE).toBe(0)
  })

  it("exports canonical display labels", () => {
    expect(WEBSITE_OVERHAUL_PRICE_LABEL).toBe("$1,000 one-time")
    expect(GROWTH_PARTNERSHIP_PRICE_LABEL).toBe("$2,000/month")
    expect(FREE_AUDIT_PRICE_LABEL).toBe("$0")
  })

  it("keeps canonical offers aligned with constants", () => {
    expect(CANONICAL_PRICING_OFFERS.website_overhaul.price).toBe(WEBSITE_OVERHAUL_PRICE)
    expect(CANONICAL_PRICING_OFFERS.growth_partnership.price).toBe(GROWTH_PARTNERSHIP_MONTHLY_PRICE)
    expect(CANONICAL_PRICING_OFFERS.free_audit.price).toBe(FREE_AUDIT_PRICE)
  })
})
