import { buildSalesSystemPrompt } from "@/lib/sales-chat/prompt"

describe("sales chat prompt builder", () => {
  it("includes playbook content and response style contract", () => {
    const prompt = buildSalesSystemPrompt({
      sourcePage: "/get-started",
      playbook: "# Playbook\n- Prism helps growth teams.",
      knownFacts: "1. Prism has case studies.",
      policyDirectives: "Intent policy:\n1) Include one explicit booking CTA in this response.",
      leadProfile: {
        role: "Founder",
        businessType: "Consulting",
      },
      conversationState: {
        fitFlowStarted: true,
        fitFlowCompleted: false,
        turns: 2,
        lastIntent: "sales",
      },
      requestedAction: "fit_check",
    })

    expect(prompt).toContain("Response style contract")
    expect(prompt).toContain("Playbook content")
    expect(prompt).toContain("Founder")
    expect(prompt).toContain("[Book a 30-min demo](#book-call)")
  })

  it("contains anti-hallucination constraints", () => {
    const prompt = buildSalesSystemPrompt({
      sourcePage: "/get-started",
      playbook: "playbook",
      knownFacts: "known-facts",
      policyDirectives: "policy",
      requestedAction: "pricing",
    })

    expect(prompt).toContain("Never invent guarantees")
    expect(prompt).toContain("If unsure")
  })
})
