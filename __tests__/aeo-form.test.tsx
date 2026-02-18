import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import AeoAssessmentForm from "@/components/forms/AeoAssessmentForm"

const pushMock = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}))

const trackCTAClick = jest.fn()
const trackFormSubmission = jest.fn()

jest.mock("@/utils/analytics", () => ({
  trackCTAClick: (...args: Array<unknown>) => trackCTAClick(...args),
  trackFormSubmission: (...args: Array<unknown>) => trackFormSubmission(...args),
}))

type MockResponseOverrides = {
  ok?: boolean
  status?: number
}

function createMockResponse(overrides: MockResponseOverrides = {}): Response {
  const ok = overrides.ok ?? true
  const status = overrides.status ?? (ok ? 200 : 500)

  return ({
    ok,
    status,
    text: jest.fn().mockResolvedValue(""),
  } as unknown) as Response
}

describe("AeoAssessmentForm", () => {
  const fetchSpy = jest.spyOn(global, "fetch")

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockReset()
  })

  it("renders required email + website fields and hidden metadata fields", () => {
    render(<AeoAssessmentForm />)

    const emailInput = screen.getByLabelText("Email") as HTMLInputElement
    const websiteInput = screen.getByLabelText("Website") as HTMLInputElement

    expect(emailInput).toBeRequired()
    expect(emailInput).toHaveAttribute("type", "email")
    expect(websiteInput).toBeRequired()
    expect(websiteInput).toHaveAttribute("type", "url")

    expect(screen.getByDisplayValue("New AEO assessment request")).toHaveAttribute("name", "_subject")
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: "Website" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /get free aeo assessment/i })).toBeInTheDocument()
  })

  it("shows inline validation errors for blank email and malformed URL", async () => {
    fetchSpy.mockImplementation(() => Promise.resolve(createMockResponse({ ok: false })))
    render(<AeoAssessmentForm />)

    const submitButton = screen.getByRole("button", { name: /get free aeo assessment/i })
    const emailInput = screen.getByLabelText("Email") as HTMLInputElement
    const websiteInput = screen.getByLabelText("Website") as HTMLInputElement

    fireEvent.change(emailInput, { target: { value: "" } })
    fireEvent.change(websiteInput, { target: { value: "not-a-valid-url" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(fetchSpy).not.toHaveBeenCalled()
    })

    expect(document.getElementById("website-error")).toBeInTheDocument()
    expect(document.getElementById("email-error")).toBeInTheDocument()
  })

  it("posts payload to Formspree and redirects on success", async () => {
    fetchSpy.mockImplementation(() => Promise.resolve(createMockResponse({ ok: true })))
    render(<AeoAssessmentForm />)

    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } })
    fireEvent.change(screen.getByLabelText("Website"), { target: { value: "https://www.example.com" } })

    fireEvent.click(screen.getByRole("button", { name: /get free aeo assessment/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(pushMock).toHaveBeenCalledWith("/aeo-thank-you")
      expect(trackCTAClick).toHaveBeenCalledWith("get free aeo assessment", "aeo hero form")
      expect(trackFormSubmission).toHaveBeenCalledWith("aeo_assessment", "hero_form")
    })

    const [, options] = fetchSpy.mock.calls[0] as [
      RequestInfo | URL,
      RequestInit
    ]
    expect(options.method).toBe("POST")
    expect(options.headers).toMatchObject({ Accept: "application/json" })

    const formData = options.body as FormData
    expect(formData.get("email")).toBe("test@example.com")
    expect(formData.get("website")).toBe("https://www.example.com")
    expect(formData.get("form_name")).toBe("aeo_assessment")
    expect(formData.get("_subject")).toBe("New AEO assessment request")
  })

  it("keeps user on page with inline error on failed Formspree submission", async () => {
    fetchSpy.mockImplementation(() => Promise.resolve(createMockResponse({ ok: false, status: 500 })))
    render(<AeoAssessmentForm />)

    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } })
    fireEvent.change(screen.getByLabelText("Website"), { target: { value: "https://www.example.com" } })

    fireEvent.click(screen.getByRole("button", { name: /get free aeo assessment/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(trackFormSubmission).not.toHaveBeenCalled()
      expect(pushMock).not.toHaveBeenCalled()
      expect(screen.getByText("We couldn't submit right now. Try again?")).toBeInTheDocument()
    })
  })
})
