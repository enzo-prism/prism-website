"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"

import { useFormValidation } from "@/hooks/use-form-validation"

const goalOptions = [
  { label: "Launch a new site fast", value: "site" },
  { label: "Improve SEO visibility", value: "seo" },
  { label: "Run paid ads that convert", value: "ads" },
  { label: "Automate follow-up workflows", value: "automation" },
]

const industryOptions = [
  "Professional services",
  "Health & wellness",
  "Home services",
  "Retail or e-commerce",
  "Hospitality & travel",
  "Nonprofit",
  "Other",
]

const budgetOptions = [
  { label: "Select a budget", value: "" },
  { label: "< $500", value: "<500" },
  { label: "$500 – $1,000", value: "500-1000" },
  { label: "$1,000+", value: "1000+" },
]

type GetStartedFormProps = {
  defaultBudgetValue?: string
  selectedPlan?: string
}

export default function GetStartedForm({ defaultBudgetValue = "", selectedPlan }: GetStartedFormProps) {
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
        console.error("get-started form submission failed:", error)
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

  const getDescribedBy = (name: string) => {
    return getError(name) ? `${name}-error` : undefined
  }

  return (
    <form
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
      action="https://formspree.io/f/manawlzn"
      method="POST"
      noValidate
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="_subject" value="New submission from Prism" />
      <input type="hidden" name="_redirect" value={redirectUrl} />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />
      {selectedPlan ? <input type="hidden" name="selected_plan" value={selectedPlan} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          <label htmlFor="intake-name">Full Name</label>
          <Input
            id="intake-name"
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
          <label htmlFor="intake-email">Email</label>
          <Input
            id="intake-email"
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
          <label htmlFor="intake-business">Business Name</label>
          <Input
            id="intake-business"
            name="business"
            required
            placeholder="Prism Dental Studio"
            autoComplete="organization"
            aria-invalid={Boolean(getError("business"))}
            aria-describedby={getDescribedBy("business")}
            onBlur={handleBlur}
            onInput={handleInput}
          />
          {renderError("business")}
        </div>
        <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          <label htmlFor="intake-website">Current Website (optional)</label>
          <Input
            id="intake-website"
            name="website"
            type="url"
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
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          <label htmlFor="intake-industry">Industry</label>
          <select
            id="intake-industry"
            name="industry"
            required
            defaultValue=""
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            aria-invalid={Boolean(getError("industry"))}
            aria-describedby={getDescribedBy("industry")}
            onBlur={handleBlur}
            onChange={handleInput}
          >
            <option value="" disabled>
              Select an industry
            </option>
            {industryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {renderError("industry")}
        </div>
        <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          <label htmlFor="intake-budget">Budget</label>
          <select
            id="intake-budget"
            name="budget"
            defaultValue={defaultBudgetValue || ""}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            aria-invalid={Boolean(getError("budget"))}
            aria-describedby={getDescribedBy("budget")}
            onBlur={handleBlur}
            onChange={handleInput}
          >
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {renderError("budget")}
        </div>
      </div>

      <fieldset className="space-y-3 rounded-2xl border border-slate-200 px-4 py-4">
        <legend className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Goals</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {goalOptions.map((goal) => (
            <label
              key={goal.value}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-900"
            >
              <input
                type="checkbox"
                name="goals"
                value={goal.value}
                className="h-4 w-4 rounded border-slate-300 text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              />
              <span>{goal.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        <label htmlFor="intake-notes">Anything else we should know?</label>
        <Textarea
          id="intake-notes"
          name="notes"
          rows={4}
          placeholder="Drop links, timelines, inspiration, or anything specific we should factor into your site plan."
          aria-invalid={Boolean(getError("notes"))}
          aria-describedby={getDescribedBy("notes")}
          onBlur={handleBlur}
          onInput={handleInput}
        />
        {renderError("notes")}
      </div>

      <div className="space-y-3 pt-2">
        <Button
          type="submit"
          className="w-full rounded-2xl bg-slate-900 py-6 text-base font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Craft My Website Plan"}
        </Button>
        {submitError ? <p className="text-sm text-rose-600">{submitError}</p> : null}
        <p className="text-xs text-slate-500">
          By submitting, you agree to receive project updates by email. We respect your inbox.
        </p>
      </div>
    </form>
  )
}
