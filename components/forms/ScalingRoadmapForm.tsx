"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { useFormValidation } from "@/hooks/use-form-validation"
import { trackFormSubmission } from "@/utils/analytics"

const FORM_ACTION = "https://formspree.io/f/xojarwbg"
const DEFAULT_REDIRECT = "https://www.design-prism.com/thank-you"

export default function ScalingRoadmapForm() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [redirectUrl, setRedirectUrl] = useState(DEFAULT_REDIRECT)

  const { getError, handleBlur, handleInput, handleSubmit, isSubmitting } =
    useFormValidation({
      onValidSubmit: async (form) => {
        setSubmitError(null)
        const formData = new FormData(form)
        try {
          const response = await fetch(form.action, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: formData,
          })
          if (!response.ok) {
            setSubmitError("We couldn't submit right now. Try again?")
            return
          }
        } catch (error) {
          console.error("scaling roadmap submission failed:", error)
          setSubmitError("We couldn't submit right now. Try again?")
          return
        }
        trackFormSubmission("scaling_roadmap_homepage", "homepage_form")
        router.push("/thank-you")
      },
    })

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRedirectUrl(`${window.location.origin}/thank-you`)
    }
  }, [])

  const emailError = getError("email")

  return (
    <form
      id="scaling_roadmap_homepage"
      name="scaling_roadmap_homepage"
      className="space-y-4"
      action={FORM_ACTION}
      method="POST"
      noValidate
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="_subject" value="Scaling roadmap request" />
      <input type="hidden" name="_redirect" value={redirectUrl} />
      <input type="hidden" name="form_name" value="scaling_roadmap_homepage" />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
        aria-hidden="true"
      />

      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="space-y-2">
          <label htmlFor="scaling-roadmap-email" className="sr-only">
            Your email
          </label>
          <Input
            id="scaling-roadmap-email"
            name="email"
            type="email"
            required
            placeholder="Enter your email…"
            autoComplete="email"
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? "scaling-roadmap-email-error" : undefined}
            onBlur={handleBlur}
            onInput={handleInput}
            className="h-12 rounded-full border-black/10 bg-[#fcfcfb] text-[#0a0a0b] placeholder:text-[rgba(15,23,42,0.42)] hover:border-black/20 focus-visible:border-black/20 focus-visible:ring-black/10"
          />
          {emailError ? (
            <p
              id="scaling-roadmap-email-error"
              className="text-sm text-rose-600"
              aria-live="polite"
            >
              {emailError}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 w-full select-none items-center justify-center whitespace-nowrap rounded-full border border-[#0a0a0b] bg-[#0a0a0b] px-6 font-pixel text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_18px_36px_rgba(15,23,42,0.14)] transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#171717] hover:text-white hover:shadow-[0_22px_40px_rgba(15,23,42,0.18)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black/10 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfcfb] active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
        >
          {isSubmitting ? "Sending…" : "Get the roadmap"}
        </button>
      </div>

      {submitError ? (
        <Alert variant="destructive">
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      ) : null}
    </form>
  )
}
