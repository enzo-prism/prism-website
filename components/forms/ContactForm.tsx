"use client"

import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"

import { useFormValidation } from "@/hooks/use-form-validation"

export default function ContactForm() {
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
        console.error("contact form submission failed:", error)
        setSubmitError("We couldn't submit right now. Try again?")
        return
      }
      router.push("/thank-you")
    },
  })
  const [redirectUrl, setRedirectUrl] = useState("https://www.design-prism.com/thank-you")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRedirectUrl(`${window.location.origin}/thank-you`)
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

  const describedBy = (name: string) => (getError(name) ? `${name}-error` : undefined)

  return (
    <form
      className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
      action="https://formspree.io/f/xjkjbpdb"
      method="POST"
      noValidate
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="_subject" value="New submission from Prism" />
      <input type="hidden" name="_redirect" value={redirectUrl} />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />

      <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        <label htmlFor="contact-name">Name (optional)</label>
        <Input
          id="contact-name"
          name="name"
          placeholder="Jordan Ramirez"
          autoComplete="name"
          aria-invalid={Boolean(getError("name"))}
          aria-describedby={describedBy("name")}
          onBlur={handleBlur}
          onInput={handleInput}
        />
        {renderError("name")}
      </div>

      <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        <label htmlFor="contact-email">Your Email</label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          autoComplete="email"
          aria-invalid={Boolean(getError("email"))}
          aria-describedby={describedBy("email")}
          onBlur={handleBlur}
          onInput={handleInput}
        />
        {renderError("email")}
      </div>

      <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        <label htmlFor="contact-message">Your Message</label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Share context, timelines, and what success looks like."
          aria-invalid={Boolean(getError("message"))}
          aria-describedby={describedBy("message")}
          onBlur={handleBlur}
          onInput={handleInput}
        />
        {renderError("message")}
      </div>

      <div className="space-y-3 pt-2">
        <Button
          type="submit"
          className="w-full rounded-2xl bg-slate-900 py-6 text-base font-semibold text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message →"}
        </Button>
        {submitError ? (
          <Alert variant="destructive" className="rounded-2xl">
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        ) : null}
        <p className="text-xs text-slate-500">We reply within one business day and never share your details.</p>
      </div>
    </form>
  )
}
