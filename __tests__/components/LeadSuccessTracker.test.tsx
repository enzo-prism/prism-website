import { render, waitFor } from "@testing-library/react"

import LeadSuccessTracker from "@/components/thank-you/LeadSuccessTracker"

const consumePendingLeadConversion = jest.fn()
const trackLeadConversion = jest.fn()

jest.mock("@/utils/analytics", () => ({
  consumePendingLeadConversion: () => consumePendingLeadConversion(),
  trackLeadConversion: (...args: Array<unknown>) => trackLeadConversion(...args),
}))

describe("LeadSuccessTracker", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("emits a lead conversion when a confirmed form submission is pending", async () => {
    consumePendingLeadConversion.mockReturnValue({
      form_name: "free_analysis",
      form_location: "free_analysis_form",
      lead_type: "free_analysis",
    })

    render(<LeadSuccessTracker />)

    await waitFor(() => {
      expect(trackLeadConversion).toHaveBeenCalledWith({
        form_name: "free_analysis",
        form_location: "free_analysis_form",
        lead_type: "free_analysis",
      })
    })
  })

  it("does not emit conversions on direct thank-you page visits", async () => {
    consumePendingLeadConversion.mockReturnValue(null)

    render(<LeadSuccessTracker />)

    await waitFor(() => {
      expect(consumePendingLeadConversion).toHaveBeenCalledTimes(1)
    })
    expect(trackLeadConversion).not.toHaveBeenCalled()
  })
})
