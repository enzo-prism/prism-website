"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormValidation } from "@/hooks/use-form-validation"
import { trackCTAClick, trackFormSubmission } from "@/utils/analytics"

const FORM_ACTION =
  process.env.NEXT_PUBLIC_AEO_FORM_ENDPOINT || "https://formspree.io/f/xldarokj"
const DEFAULT_REDIRECT = "https://www.design-prism.com/aeo-thank-you"

export default function AeoAssessmentForm() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [redirectUrl, setRedirectUrl] = useState(DEFAULT_REDIRECT)

  const { getError, handleBlur, handleInput, handleSubmit, isSubmitting } = useFormValidation({
    onValidSubmit: async (form) => {
      setSubmitError(null)

      try {
        const formData = new FormData(form)
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
        console.error("AEO assessment form submission failed:", error)
        setSubmitError("We couldn't submit right now. Try again?")
        return
      }

      trackFormSubmission("aeo_assessment", "hero_form")
      router.push("/aeo-thank-you")
    },
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRedirectUrl(`${window.location.origin}/aeo-thank-you`)
    }
  }, [])

  const renderError = (name: string) => {
    const error = getError(name)
    if (!error) return null

    return (
      <p id={`${name}-error`} className="text-sm text-rose-600" aria-live="polite">
        {error}
      </p>
    )
  }

  const getDescribedBy = (name: string) => (getError(name) ? `${name}-error` : undefined)

  return (
    <form
      className="space-y-5 rounded-2xl border border-border/60 bg-card/90 p-6 shadow-xl shadow-black/30"
      action={FORM_ACTION}
      method="POST"
      noValidate
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="_subject" value="New AEO assessment request" />
      <input type="hidden" name="_redirect" value={redirectUrl} />
      <input type="hidden" name="form_name" value="aeo_assessment" />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
        aria-hidden="true"
      />

      <p className="text-sm text-muted-foreground">Get a free AEO assessment with next-step recommendations.</p>

      <div className="space-y-2">
        <Label htmlFor="aeo-email">Email</Label>
        <Input
          id="aeo-email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          autoComplete="email"
          aria-invalid={Boolean(getError("email"))}
          aria-describedby={getDescribedBy("email")}
          onBlur={handleBlur}
          onInput={handleInput}
        />
        {renderError("email")}
      </div>

      <div className="space-y-2">
        <Label htmlFor="aeo-website">Website</Label>
        <Input
          id="aeo-website"
          name="website"
          type="url"
          required
          placeholder="https://www.yourbusiness.com"
          autoComplete="url"
          inputMode="url"
          aria-invalid={Boolean(getError("website"))}
          aria-describedby={getDescribedBy("website")}
          onBlur={handleBlur}
          onInput={handleInput}
        />
        {renderError("website")}
      </div>

      <div className="space-y-3 pt-2">
        <Button
          type="submit"
          variant="inverted"
          className="w-full rounded-md py-6 text-base font-semibold"
          disabled={isSubmitting}
          onClick={() => trackCTAClick("get free aeo assessment", "aeo hero form")}
        >
          {isSubmitting ? "Submitting…" : "Get free AEO assessment →"}
        </Button>

        {submitError ? (
          <Alert variant="destructive" className="rounded-2xl">
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        ) : null}

        <p className="text-xs text-muted-foreground">We only use this information to send your AEO assessment and next-step recommendations.</p>
      </div>
    </form>
  )
}
