import {
  fallbackRephraseCopy,
  faqCopy,
  intentBPitchCopy,
  intentCPitchCopy,
  intentDPitchCopy,
  welcomeCopy,
} from "@/lib/sales-chat/spec-v1-copy"

describe("spec v1 copy", () => {
  it("includes canonical welcome and starter labels", () => {
    const welcome = welcomeCopy()
    const labels = welcome.quickReplies.map((reply) => reply.label)

    expect(welcome.assistantMessage).toContain("best way to grow your business online")
    expect(labels).toEqual([
      "Get a free audit of my website",
      "I need a new or better website",
      "I want a growth partner ($2K/mo)",
      "Help me figure out what's best",
      "I just have a question about Prism",
    ])
  })

  it("uses normalized pricing anchors from spec", () => {
    expect(intentBPitchCopy().assistantMessage).toMatch(/completely free/i)
    expect(intentCPitchCopy().assistantMessage).toContain("$1,000 one-time")
    expect(intentDPitchCopy().assistantMessage).toMatch(/\$2,000(?:\/month| a month)/)
  })

  it("keeps quick replies capped at five in canonical copy blocks", () => {
    const replies = [
      welcomeCopy().quickReplies,
      intentBPitchCopy().quickReplies,
      intentCPitchCopy().quickReplies,
      intentDPitchCopy().quickReplies,
      faqCopy("pricing").quickReplies,
    ]

    for (const replySet of replies) {
      expect(replySet.length).toBeLessThanOrEqual(5)
      expect(replySet.length).toBeGreaterThan(0)
    }
  })

  it("keeps fallback copy free of banned dead-end phrasing", () => {
    const fallback = fallbackRephraseCopy().assistantMessage.toLowerCase()

    expect(fallback).not.toContain("i'm not sure i caught that")
    expect(fallback).not.toContain("could you rephrase it")
    expect(fallback).not.toContain("connect you with the team directly")
  })
})
