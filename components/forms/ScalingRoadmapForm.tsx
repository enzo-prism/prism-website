"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useFormValidation } from "@/hooks/use-form-validation"

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
            placeholder="Enter your email"
            autoComplete="email"
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? "scaling-roadmap-email-error" : undefined}
            onBlur={handleBlur}
            onInput={handleInput}
            className="h-12 rounded-full bg-background"
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
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-full px-6 transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 sm:w-auto"
        >
          {isSubmitting ? "Sending..." : "Get the roadmap"}
        </Button>
      </div>

      {submitError ? (
        <Alert variant="destructive">
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      ) : null}
    </form>
  )
}
