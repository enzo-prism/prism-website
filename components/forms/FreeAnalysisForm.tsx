"use client"

import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

import { useFormValidation } from "@/hooks/use-form-validation"

const challengeOptions = [
  { label: "Traffic", value: "traffic" },
  { label: "Design", value: "design" },
  { label: "SEO", value: "seo" },
  { label: "Conversion", value: "conversion" },
]

export default function FreeAnalysisForm() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { getError, handleBlur, handleInput, handleSubmit, isSubmitting } = useFormValidation({
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
        console.error("free analysis form submission failed:", error)
        setSubmitError("We couldn't submit right now. Try again?")
        return
      }
      router.push("/analysis-thank-you")
    },
  })
  const [redirectUrl, setRedirectUrl] = useState("https://www.design-prism.com/analysis-thank-you")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRedirectUrl(`${window.location.origin}/analysis-thank-you`)
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
      className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-xl"
      action="https://formspree.io/f/xldarokj"
      method="POST"
      noValidate
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="_subject" value="New submission from Prism" />
      <input type="hidden" name="_redirect" value={redirectUrl} />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />

        <p className="text-sm text-slate-500">We'll send your analysis within 24 hours.</p>

      <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        <label htmlFor="analysis-name">Name</label>
        <Input
          id="analysis-name"
          name="name"
          required
          placeholder="Jordan Ramirez"
          autoComplete="name"
          aria-invalid={Boolean(getError("name"))}
          aria-describedby={getDescribedBy("name")}
          onBlur={handleBlur}
          onInput={handleInput}
        />
        {renderError("name")}
      </div>

      <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        <label htmlFor="analysis-email">Email</label>
        <Input
          id="analysis-email"
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

      <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        <label htmlFor="analysis-website">Website</label>
        <Input
          id="analysis-website"
          name="website"
          type="url"
          required
          placeholder="https://yourdomain.com"
          autoComplete="url"
          aria-invalid={Boolean(getError("website"))}
          aria-describedby={getDescribedBy("website")}
          onBlur={handleBlur}
          onInput={handleInput}
          inputMode="url"
        />
        {renderError("website")}
      </div>

      <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        <label htmlFor="analysis-challenge">Main Challenge</label>
        <select
          id="analysis-challenge"
          name="challenge"
          required
          defaultValue=""
          className="h-12 rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          aria-invalid={Boolean(getError("challenge"))}
          aria-describedby={getDescribedBy("challenge")}
          onBlur={handleBlur}
          onChange={handleInput}
        >
          <option value="" disabled>
            Choose one
          </option>
          {challengeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {renderError("challenge")}
      </div>

      <div className="space-y-3 pt-2">
        <Button
          type="submit"
          className="w-full rounded-2xl bg-black py-6 text-base font-semibold text-white hover:bg-black/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Get My Free Analysis →"}
        </Button>
        {submitError ? (
          <Alert variant="destructive" className="rounded-2xl">
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        ) : null}
        <p className="text-xs text-slate-500">We only use your info to share the analysis and next steps.</p>
      </div>
    </form>
  )
}
