"use client"

import type { ChangeEvent } from "react"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useFormValidation } from "@/hooks/use-form-validation"

const FORM_ACTION = "https://formspree.io/f/manawlzn"
const DEFAULT_REDIRECT = "https://www.design-prism.com/thank-you"

const TIME_SLOTS = [
  { value: "monday-9am", label: "Monday 9:00 AM PT" },
  { value: "tuesday-11am", label: "Tuesday 11:00 AM PT" },
  { value: "wednesday-2pm", label: "Wednesday 2:00 PM PT" },
  { value: "thursday-4pm", label: "Thursday 4:00 PM PT" },
  { value: "friday-10am", label: "Friday 10:00 AM PT" },
]

export default function GetStartedForm() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [redirectUrl, setRedirectUrl] = useState(DEFAULT_REDIRECT)
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  })

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRedirectUrl(`${window.location.origin}/thank-you`)
    }
  }, [])

  const handleValueChange = (field: keyof typeof formState) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const canSchedule = useMemo(() => {
    return Boolean(formState.firstName.trim() && formState.lastName.trim() && formState.phone.trim())
  }, [formState.firstName, formState.lastName, formState.phone])

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
      className="space-y-6"
      action={FORM_ACTION}
      method="POST"
      noValidate
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="_subject" value="Online presence transformation request" />
      <input type="hidden" name="_redirect" value={redirectUrl} />
      <input type="hidden" name="form_name" value="online_presence_transformation" />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="get-started-first-name">First name</Label>
          <Input
            id="get-started-first-name"
            name="first_name"
            required
            placeholder="Jordan"
            autoComplete="given-name"
            aria-invalid={Boolean(getError("first_name"))}
            aria-describedby={describedBy("first_name")}
            onBlur={handleBlur}
            onInput={handleInput}
            onChange={handleValueChange("firstName")}
          />
          {renderError("first_name")}
        </div>
        <div className="space-y-2">
          <Label htmlFor="get-started-last-name">Last name</Label>
          <Input
            id="get-started-last-name"
            name="last_name"
            required
            placeholder="Ramirez"
            autoComplete="family-name"
            aria-invalid={Boolean(getError("last_name"))}
            aria-describedby={describedBy("last_name")}
            onBlur={handleBlur}
            onInput={handleInput}
            onChange={handleValueChange("lastName")}
          />
          {renderError("last_name")}
        </div>
        <div className="space-y-2">
          <Label htmlFor="get-started-phone">Phone number</Label>
          <Input
            id="get-started-phone"
            name="phone"
            type="tel"
            required
            placeholder="(555) 000-0000"
            autoComplete="tel"
            aria-invalid={Boolean(getError("phone"))}
            aria-describedby={describedBy("phone")}
            onBlur={handleBlur}
            onInput={handleInput}
            onChange={handleValueChange("phone")}
          />
          {renderError("phone")}
        </div>
      </div>

      <div
        className={cn(
          "space-y-4 rounded-2xl border border-border/60 bg-muted/30 p-5",
          !canSchedule && "opacity-60"
        )}
        aria-disabled={!canSchedule}
      >
        <div className="space-y-2">
          <Label htmlFor="get-started-date">Choose a date</Label>
          <Input
            id="get-started-date"
            name="call_date"
            type="date"
            required
            disabled={!canSchedule}
            aria-invalid={Boolean(getError("call_date"))}
            aria-describedby={describedBy("call_date")}
            onBlur={handleBlur}
            onInput={handleInput}
          />
          {renderError("call_date")}
        </div>
        <div className="space-y-2">
          <Label htmlFor="get-started-time">Choose a time slot</Label>
          <select
            id="get-started-time"
            name="call_time"
            required
            disabled={!canSchedule}
            defaultValue=""
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={Boolean(getError("call_time"))}
            aria-describedby={describedBy("call_time")}
            onBlur={handleBlur}
            onChange={handleInput}
          >
            <option value="" disabled>
              Select a time
            </option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot.value} value={slot.label}>
                {slot.label}
              </option>
            ))}
          </select>
          {renderError("call_time")}
        </div>
      </div>

      <div className="space-y-3">
        <Button
          type="submit"
          className="w-full rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "I'm ready to elevate"}
        </Button>
        {submitError ? (
          <Alert variant="destructive">
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        ) : null}
      </div>
    </form>
  )
}
