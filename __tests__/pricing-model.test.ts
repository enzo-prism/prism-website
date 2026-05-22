import {
  CANONICAL_PRICING_OFFERS,
  DEEP_GROWTH_AUDIT_PRICE,
  DEEP_GROWTH_AUDIT_PRICE_LABEL,
  GROWTH_DASHBOARD_PRICE,
  GROWTH_DASHBOARD_PRICE_LABEL,
  GROWTH_SPRINT_STARTING_PRICE,
  GROWTH_SPRINT_STARTING_PRICE_LABEL,
  LIGHT_AUDIT_PRICE,
  LIGHT_AUDIT_PRICE_LABEL,
  ONGOING_GROWTH_PARTNER_STARTING_MONTHLY_PRICE,
  ONGOING_GROWTH_PARTNER_STARTING_PRICE_LABEL,
  PRICING_PRIMARY_CTA,
} from "@/lib/pricing-model"

describe("pricing model", () => {
  it("exports canonical numeric prices", () => {
    expect(GROWTH_DASHBOARD_PRICE).toBe(0)
    expect(LIGHT_AUDIT_PRICE).toBe(0)
    expect(DEEP_GROWTH_AUDIT_PRICE).toBe(500)
    expect(GROWTH_SPRINT_STARTING_PRICE).toBe(3500)
    expect(ONGOING_GROWTH_PARTNER_STARTING_MONTHLY_PRICE).toBe(1500)
  })

  it("exports canonical display labels", () => {
    expect(GROWTH_DASHBOARD_PRICE_LABEL).toBe("Free to start")
    expect(LIGHT_AUDIT_PRICE_LABEL).toBe("Included")
    expect(DEEP_GROWTH_AUDIT_PRICE_LABEL).toBe("Normally $500")
    expect(GROWTH_SPRINT_STARTING_PRICE_LABEL).toBe("Starts at $3,500")
    expect(ONGOING_GROWTH_PARTNER_STARTING_PRICE_LABEL).toBe(
      "Starts at $1,500/month",
    )
  })

  it("keeps canonical offers aligned with constants and the dashboard CTA", () => {
    expect(CANONICAL_PRICING_OFFERS.growth_dashboard.price).toBe(
      GROWTH_DASHBOARD_PRICE,
    )
    expect(CANONICAL_PRICING_OFFERS.light_audit.price).toBe(LIGHT_AUDIT_PRICE)
    expect(CANONICAL_PRICING_OFFERS.deep_growth_audit.price).toBe(
      DEEP_GROWTH_AUDIT_PRICE,
    )
    expect(CANONICAL_PRICING_OFFERS.growth_sprint.price).toBe(
      GROWTH_SPRINT_STARTING_PRICE,
    )
    expect(CANONICAL_PRICING_OFFERS.ongoing_growth_partner.price).toBe(
      ONGOING_GROWTH_PARTNER_STARTING_MONTHLY_PRICE,
    )
    expect(CANONICAL_PRICING_OFFERS.growth_dashboard.primaryCta).toEqual(
      PRICING_PRIMARY_CTA,
    )
    expect(PRICING_PRIMARY_CTA).toMatchObject({
      label: "Create Free Growth Dashboard",
      href: "/get-started",
    })
  })
})
