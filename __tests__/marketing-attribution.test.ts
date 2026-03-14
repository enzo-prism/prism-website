import {
  appendAttributionToFormData,
  getAttributionContext,
  syncFormAttributionFields,
} from "@/lib/marketing-attribution"

describe("marketing attribution helpers", () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.history.replaceState({}, "", "/")
    document.body.innerHTML = ""
  })

  it("stores first-touch attribution from the current URL", () => {
    window.history.replaceState({}, "", "/pricing?utm_source=google&utm_medium=cpc&utm_campaign=spring")

    expect(getAttributionContext()).toMatchObject({
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "spring",
      landing_path: "/pricing",
      first_touch_source: "google",
      first_touch_medium: "cpc",
      first_touch_campaign: "spring",
    })
  })

  it("syncs hidden attribution inputs into forms before submission", () => {
    window.history.replaceState({}, "", "/contact?utm_source=linkedin&utm_campaign=q2-pipeline")

    const form = document.createElement("form")
    document.body.appendChild(form)

    syncFormAttributionFields(form)

    expect(
      form.querySelector<HTMLInputElement>('input[name="utm_source"]')?.value,
    ).toBe("linkedin")
    expect(
      form.querySelector<HTMLInputElement>('input[name="utm_campaign"]')?.value,
    ).toBe("q2-pipeline")
    expect(
      form.querySelector<HTMLInputElement>('input[name="submission_path"]')?.value,
    ).toBe("/contact")
  })

  it("appends attribution fields to FormData payloads", () => {
    window.history.replaceState({}, "", "/get-started?utm_source=google&utm_medium=cpc&gclid=test-click-id")

    const formData = new FormData()
    formData.set("email", "test@example.com")

    appendAttributionToFormData(formData)

    expect(formData.get("utm_source")).toBe("google")
    expect(formData.get("utm_medium")).toBe("cpc")
    expect(formData.get("gclid")).toBe("test-click-id")
    expect(formData.get("submission_path")).toBe("/get-started")
  })
})
