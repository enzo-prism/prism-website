import {
  enforceButtonPolicy,
  hasForwardPath,
  isLikelyWebsiteUrl,
  isValidEmail,
  normalizeWebsiteUrl,
} from "@/lib/sales-chat/spec-v1-validation"

describe("sales chat spec v1 validation", () => {
  it("validates emails and website URLs", () => {
    expect(isValidEmail("owner@example.com")).toBe(true)
    expect(isValidEmail("owner@bad")).toBe(false)

    expect(isLikelyWebsiteUrl("example.com")).toBe(true)
    expect(isLikelyWebsiteUrl("https://example.com/path")).toBe(true)
    expect(isLikelyWebsiteUrl("not a site")).toBe(false)

    expect(normalizeWebsiteUrl("example.com")).toBe("https://example.com")
    expect(normalizeWebsiteUrl("https://example.com")).toBe("https://example.com")
  })

  it("enforces quick reply limit and dead-end prevention checks", () => {
    const capped = enforceButtonPolicy([
      { id: "1", label: "One", actionType: "reply" },
      { id: "2", label: "Two", actionType: "reply" },
      { id: "3", label: "Three", actionType: "reply" },
      { id: "4", label: "Four", actionType: "reply" },
      { id: "5", label: "Five", actionType: "reply" },
      { id: "6", label: "Six", actionType: "reply" },
    ])

    expect(capped).toHaveLength(5)
    expect(hasForwardPath("Want to book a call?", [])).toBe(true)
    expect(hasForwardPath("No signal text", [])).toBe(false)
    expect(hasForwardPath("No question but has options", [{ id: "x", label: "Go", actionType: "reply" }])).toBe(true)
  })
})
