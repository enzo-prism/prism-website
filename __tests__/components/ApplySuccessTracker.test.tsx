import { render, waitFor } from "@testing-library/react"

import ApplySuccessTracker from "@/components/thank-you/ApplySuccessTracker"

const consumePendingApplyLeadContext = jest.fn()
const getDefaultLeadSource = jest.fn()
const trackEvent = jest.fn()
const trackLeadConversion = jest.fn()

jest.mock("@/utils/analytics", () => ({
  consumePendingApplyLeadContext: () => consumePendingApplyLeadContext(),
  getDefaultLeadSource: () => getDefaultLeadSource(),
  trackEvent: (...args: Array<unknown>) => trackEvent(...args),
  trackLeadConversion: (...args: Array<unknown>) => trackLeadConversion(...args),
}))

describe("ApplySuccessTracker", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("emits both the internal apply success event and the GA4 generate_lead event", async () => {
    consumePendingApplyLeadContext.mockReturnValue({
      form_name: "growth_application",
      form_location: "apply_page",
      lead_type: "growth_application",
      service_count: 2,
      primary_goal: "I need clearer analytics",
      has_website: "yes",
      budget: "$3k to $5k",
      timeline: "ASAP",
      elapsed_seconds: 84,
    })
    getDefaultLeadSource.mockReturnValue("google")

    render(<ApplySuccessTracker />)

    await waitFor(() => {
      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackLeadConversion).toHaveBeenCalledTimes(1)
    })

    expect(trackEvent).toHaveBeenNthCalledWith(
      1,
      "apply_success",
      expect.objectContaining({
        source: "apply",
        form_name: "growth_application",
        service_count: 2,
      }),
    )
    expect(trackLeadConversion).toHaveBeenCalledWith(
      expect.objectContaining({
        form_name: "growth_application",
        form_location: "apply_page",
        lead_type: "growth_application",
        lead_source: "google",
        budget: "$3k to $5k",
        timeline: "ASAP",
        has_website: "yes",
      }),
    )
  })

  it("does not emit generate_lead when the thank-you page is revisited without a pending success context", async () => {
    consumePendingApplyLeadContext.mockReturnValue(null)
    getDefaultLeadSource.mockReturnValue("google")

    render(<ApplySuccessTracker />)

    await waitFor(() => {
      expect(trackEvent).toHaveBeenCalledTimes(1)
    })

    expect(trackEvent).toHaveBeenCalledWith(
      "apply_success",
      expect.objectContaining({
        source: "apply",
      }),
    )
    expect(trackLeadConversion).not.toHaveBeenCalled()
  })
})
