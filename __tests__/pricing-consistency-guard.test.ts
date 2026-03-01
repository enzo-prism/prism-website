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
