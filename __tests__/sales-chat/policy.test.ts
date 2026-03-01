import {
  buildPolicyDirectives,
  detectConversationIntent,
  hasHighIntentSignals,
  shouldIncludeDemoCta,
} from "@/lib/sales-chat/policy"

describe("sales chat policy", () => {
  it("flags high-intent signals in budget/timeline language", () => {
    expect(
      hasHighIntentSignals([
        { role: "user", content: "What budget should I plan if we want to start this month?" },
      ]),
    ).toBe(true)
  })

  it("requires demo CTA when turn threshold is met for sales intent", () => {
    expect(
      shouldIncludeDemoCta({
        turns: 3,
        requestedAction: "faq",
        intent: "sales",
        highIntentSignals: false,
        ctaMinTurns: 3,
        fitFlowCompleted: false,
        nonSalesDeflectionEnabled: true,
      }),
    ).toBe(true)
  })

  it("detects non-sales intent for support/careers style messages", () => {
    const intent = detectConversationIntent([
      { role: "user", content: "I have a login issue and need support." },
    ])
    expect(intent).toBe("not_sales")
  })

  it("returns non-sales deflection directives when intent is not sales", () => {
    const directives = buildPolicyDirectives({
      turns: 1,
      requestedAction: "faq",
      intent: "not_sales",
      highIntentSignals: false,
      ctaMinTurns: 3,
      fitFlowCompleted: false,
      nonSalesDeflectionEnabled: true,
    })

    expect(directives).toContain("non-sales")
    expect(directives).toContain("Do not hard-sell")
  })
})
