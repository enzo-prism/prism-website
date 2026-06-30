import { collectPricingConsistencyViolations } from "@/lib/pricing-consistency"

describe("pricing consistency guard", () => {
  it("flags legacy pricing token on strict surfaces", () => {
    const violations = collectPricingConsistencyViolations(
      "app/pricing/client-page.tsx",
      "Legacy offer at $900/mo.",
    )
    expect(violations.length).toBeGreaterThan(0)
    expect(violations[0]?.label).toContain("$900/mo")
  })

  it("flags retired canonical offer language on strict surfaces", () => {
    const violations = collectPricingConsistencyViolations(
      "app/pricing/client-page.tsx",
      "Website Overhaul at $1,000 one-time.",
    )

    expect(violations.map((violation) => violation.label)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("Website Overhaul"),
        expect.stringContaining("$1,000 one-time"),
      ]),
    )
  })

  it("requires the current productized pricing snippets", () => {
    const violations = collectPricingConsistencyViolations(
      "lib/pricing-model.ts",
      "Order your website — $300. $300 one-time. $5,000 + $1,000/month. $2,000/month.",
    )

    expect(violations).toEqual([])
  })

  it("allows the dedicated one-time website build offer on /websites", () => {
    const violations = collectPricingConsistencyViolations(
      "app/websites/page.tsx",
      "One-time website build. $300 flat. price: '300'",
    )

    expect(violations).toEqual([])
  })

  it("accepts contextual non-core prices when context labels are present", () => {
    const content = [
      "Ad fee examples for local service lines.",
      "These are not Prism core pricing.",
      "Example starter fee: $900/mo.",
    ].join("\n")

    const violations = collectPricingConsistencyViolations(
      "app/google/dental-ads/page.tsx",
      content,
    )

    expect(violations).toEqual([])
  })
})
