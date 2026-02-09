"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import RippleHighlight from "@/components/animations/ripple-highlight"
import { Button } from "@/components/ui/button"
import { useFormValidation } from "@/hooks/use-form-validation"
import { trackCTAClick, trackFormSubmission } from "@/utils/analytics"

const FORM_ENDPOINT = "https://formspree.io/f/manawlzn"
const REDIRECT_URL = "https://www.design-prism.com/thank-you?utm_source=google_ads"

interface AiWebsiteLaunchFormProps {
  submitLabel: string
}

export default function AiWebsiteLaunchForm({ submitLabel }: AiWebsiteLaunchFormProps) {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { getError, handleBlur, handleInput, handleSubmit, isSubmitting } = useFormValidation({
    onValidSubmit: async (form) => {
      setSubmitError(null)
      trackFormSubmission("ai_website_launch", "final_cta_form")

      try {
        const formData = new FormData(form)
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        })
        if (!response.ok) {
          setSubmitError("We couldn’t submit right now. Please try again in a moment.")
          return
        }
      } catch (error) {
        console.error("[AI Website Launch] form submission failed", error)
        setSubmitError("We couldn’t submit right now. Please try again in a moment.")
        return
      }

      form.reset()
      router.push("/thank-you?utm_source=google_ads")
    },
  })

  const renderError = (name: string) => {
    const error = getError(name)
    if (!error) return null
    return (
      <p id={`${name}-error`} className="text-sm text-rose-600" aria-live="polite">
        {error}
      </p>
    )
  }

  const describedBy = (name: string) => (getError(name) ? `${name}-error` : undefined)

  return (
    <form
      action={FORM_ENDPOINT}
      method="POST"
      noValidate
      className="space-y-5 rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-200 sm:p-6"
      onSubmit={handleSubmit}
    >
      <input
        type="hidden"
        name="_redirect"
        value={REDIRECT_URL}
      />
      <input type="hidden" name="_subject" value="New AI Website Request" />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
        aria-hidden="true"
      />

      <div className="space-y-2">
        <label htmlFor="launch-name" className="text-sm font-semibold text-slate-700">
          Name
        </label>
        <input
          id="launch-name"
          name="name"
          autoComplete="name"
          required
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-inner focus:border-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-200"
          aria-invalid={Boolean(getError("name"))}
          aria-describedby={describedBy("name")}
          onBlur={handleBlur}
          onInput={handleInput}
        />
        {renderError("name")}
      </div>

      <div className="space-y-2">
        <label htmlFor="launch-email" className="text-sm font-semibold text-slate-700">
          Email
        </label>
        <input
          id="launch-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-inner focus:border-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-200"
          aria-invalid={Boolean(getError("email"))}
          aria-describedby={describedBy("email")}
          onBlur={handleBlur}
          onInput={handleInput}
        />
        {renderError("email")}
      </div>

      <div className="space-y-2">
        <label htmlFor="launch-business" className="text-sm font-semibold text-slate-700">
          Business Name
        </label>
        <input
          id="launch-business"
          name="business"
          autoComplete="organization"
          required
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-inner focus:border-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-200"
          aria-invalid={Boolean(getError("business"))}
          aria-describedby={describedBy("business")}
          onBlur={handleBlur}
          onInput={handleInput}
        />
        {renderError("business")}
      </div>

      <div className="space-y-2">
        <label htmlFor="launch-website" className="text-sm font-semibold text-slate-700">
          Current Website <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <input
          id="launch-website"
          name="website"
          type="url"
          inputMode="url"
          autoComplete="url"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-inner focus:border-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-200"
          aria-invalid={Boolean(getError("website"))}
          aria-describedby={describedBy("website")}
          onBlur={handleBlur}
          onInput={handleInput}
        />
        {renderError("website")}
      </div>

      <div className="space-y-2">
        <label htmlFor="launch-goals" className="text-sm font-semibold text-slate-700">
          Goals
        </label>
        <textarea
          id="launch-goals"
          name="message"
          rows={4}
          placeholder="Describe what you’d like to achieve"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-inner focus:border-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-200"
          aria-invalid={Boolean(getError("message"))}
          aria-describedby={describedBy("message")}
          onBlur={handleBlur}
          onInput={handleInput}
        />
        {renderError("message")}
      </div>

      <RippleHighlight asChild fullWidth>
        <Button
          type="submit"
          size="lg"
          className="w-full text-base"
          onClick={() => trackCTAClick(submitLabel, "final form")}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending…" : submitLabel}
        </Button>
      </RippleHighlight>
      {submitError ? (
        <p className="text-center text-sm text-rose-600" role="alert">
          {submitError}
        </p>
      ) : null}
      <p className="text-center text-xs text-slate-500">
        Form submits securely via Formspree. You’ll hit our thank-you page with next steps instantly.
      </p>
    </form>
  )
}
