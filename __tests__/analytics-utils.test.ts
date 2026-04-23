const trackVercel = jest.fn()

jest.mock("@vercel/analytics", () => ({
  track: (...args: Array<unknown>) => trackVercel(...args),
}))

jest.mock("@/lib/constants", () => ({
  IS_ANALYTICS_ENABLED: true,
}))

jest.mock("@/lib/marketing-attribution", () => ({
  getAttributionContext: () => ({
    utm_source: "google",
    utm_medium: "cpc",
  }),
}))

jest.mock("@/utils/sentry-helpers", () => ({
  addBreadcrumb: jest.fn(),
  captureErrorWithContext: jest.fn(),
  isSentryInitialized: () => false,
}))

import {
  consumePendingApplyLeadContext,
  storePendingApplyLeadContext,
  trackPageView,
} from "@/utils/analytics"

describe("analytics utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    window.sessionStorage.clear()
    window.dataLayer = []
    window.gtag = jest.fn()
    delete window.__PRISM_LAST_PAGEVIEW
    document.title = "Apply"
    window.history.replaceState({}, "", "/apply?utm_source=google")
  })

  it("sends a single manual page_view event without issuing a config call", () => {
    trackPageView("/apply", "Apply")

    expect(window.gtag).toHaveBeenCalledWith(
      "event",
      "page_view",
      expect.objectContaining({
        page_path: "/apply",
        page_title: "Apply",
      }),
    )
    expect(
      (window.gtag as jest.Mock).mock.calls.some(([command]) => command === "config"),
    ).toBe(false)
  })

  it("stores and consumes pending apply lead context once", () => {
    storePendingApplyLeadContext({
      form_name: "growth_application",
      budget: "$1.5k to $3k",
      timeline: "Within 30 days",
    })

    expect(consumePendingApplyLeadContext()).toEqual({
      form_name: "growth_application",
      budget: "$1.5k to $3k",
      timeline: "Within 30 days",
    })
    expect(consumePendingApplyLeadContext()).toBeNull()
  })
})
