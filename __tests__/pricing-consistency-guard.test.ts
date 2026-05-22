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

  it("requires the current Growth Dashboard pricing snippets", () => {
    const violations = collectPricingConsistencyViolations(
      "lib/pricing-model.ts",
      "Create Free Growth Dashboard. Normally $500. Starts at $3,500. Starts at $1,500/month.",
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
