import {
  buildVercelCustomEvent,
  normalizeVercelAnalyticsUrl,
  sanitizeVercelAnalyticsEvent,
} from "@/lib/vercel-analytics"

describe("Vercel analytics URL normalization", () => {
  it("keeps UTM params while removing hashes and non-marketing params", () => {
    expect(
      normalizeVercelAnalyticsUrl(
        "https://www.design-prism.com/get-started?utm_source=google&gclid=abc123#book-call",
      ),
    ).toBe("https://www.design-prism.com/get-started?utm_source=google")
  })

  it("normalizes relative URLs against the canonical origin and preserves safe marketing params", () => {
    expect(normalizeVercelAnalyticsUrl("/pricing?utm_campaign=spring&ref=campaign")).toBe(
      "https://www.design-prism.com/pricing?utm_campaign=spring",
    )
  })

  it("returns a sanitized event payload without changing the event type", () => {
    expect(
      sanitizeVercelAnalyticsEvent({
        type: "pageview",
        url: "https://www.design-prism.com/blog?utm_medium=email",
      }),
    ).toEqual({
      type: "pageview",
      url: "https://www.design-prism.com/blog?utm_medium=email",
    })
  })

  it("builds compact custom CTA events for the Vercel dashboard", () => {
    expect(
      buildVercelCustomEvent("cta_click", {
        cta_text: "Get started",
        cta_location: "hero",
        extra_noise: "ignore me",
      }),
    ).toEqual({
      name: "CTA Clicked",
      properties: {
        cta_text: "Get started",
        cta_location: "hero",
      },
    })
  })

  it("builds compact external link events without leaking the full destination URL", () => {
    expect(
      buildVercelCustomEvent("external_link_click", {
        destination_url: "https://calendar.notion.so/meet/enzosison/sfux4ogo?foo=bar",
        link_text: "Book now",
      }),
    ).toEqual({
      name: "External Link Clicked",
      properties: {
        destination_host: "calendar.notion.so",
        link_text: "Book now",
      },
    })
  })

  it("ignores non-marketing custom events for Vercel event tracking", () => {
    expect(buildVercelCustomEvent("navigation", { destination: "/pricing" })).toBeNull()
  })
})
