import { normalizeVercelAnalyticsUrl, sanitizeVercelAnalyticsEvent } from "@/lib/vercel-analytics"

describe("Vercel analytics URL normalization", () => {
  it("strips query params and hashes from absolute URLs", () => {
    expect(
      normalizeVercelAnalyticsUrl(
        "https://www.design-prism.com/get-started?utm_source=google&gclid=abc123#book-call",
      ),
    ).toBe("https://www.design-prism.com/get-started")
  })

  it("normalizes relative URLs against the canonical origin", () => {
    expect(normalizeVercelAnalyticsUrl("/pricing?ref=campaign")).toBe("https://www.design-prism.com/pricing")
  })

  it("returns a sanitized event payload without changing the event type", () => {
    expect(
      sanitizeVercelAnalyticsEvent({
        type: "pageview",
        url: "https://www.design-prism.com/blog?utm_medium=email",
      }),
    ).toEqual({
      type: "pageview",
      url: "https://www.design-prism.com/blog",
    })
  })
})
