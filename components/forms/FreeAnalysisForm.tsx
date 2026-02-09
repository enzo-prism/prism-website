"use client"

import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
      className="space-y-5 rounded-2xl border border-border/60 bg-card/90 p-6 text-foreground shadow-xl shadow-black/30"
      action="https://formspree.io/f/xldarokj"
      method="POST"
      noValidate
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="_subject" value="New submission from Prism" />
      <input type="hidden" name="_redirect" value={redirectUrl} />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />

      <p className="text-sm text-muted-foreground">We'll send your analysis within 24 hours.</p>

      <div className="grid gap-2">
        <Label htmlFor="analysis-name">Name</Label>
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

      <div className="grid gap-2">
        <Label htmlFor="analysis-email">Email</Label>
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

      <div className="grid gap-2">
        <Label htmlFor="analysis-website">Website</Label>
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

      <div className="grid gap-2">
        <Label htmlFor="analysis-challenge">Main Challenge</Label>
        <select
          id="analysis-challenge"
          name="challenge"
          required
          defaultValue=""
          className="h-12 rounded-md border border-border/60 bg-card px-3 text-sm text-foreground outline-hidden transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
          variant="inverted"
          className="w-full rounded-md py-6 text-base font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting…" : "Get My Free Analysis →"}
        </Button>
        {submitError ? (
          <Alert variant="destructive" className="rounded-2xl">
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        ) : null}
        <p className="text-xs text-muted-foreground">We only use your info to share the analysis and next steps.</p>
      </div>
    </form>
  )
}
