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

const FORM_ACTION = "https://formspree.io/f/xzdpoyer"
const DEFAULT_REDIRECT = "https://www.design-prism.com/thank-you"

const HOUR_OPTIONS = Array.from({ length: 12 }, (_, index) => String(index + 1))
const MINUTE_OPTIONS = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"]

export default function GetStartedForm() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [redirectUrl, setRedirectUrl] = useState(DEFAULT_REDIRECT)
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    callDate: "",
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

  const handleValueChange =
    (field: keyof typeof formState) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const canSchedule = useMemo(() => {
    return Boolean(
      formState.firstName.trim() && formState.lastName.trim() && formState.phone.trim()
    )
  }, [formState.firstName, formState.lastName, formState.phone])

  const hasDateSelected = Boolean(formState.callDate.trim())

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
            onChange={handleValueChange("callDate")}
          />
          {renderError("call_date")}
        </div>
        <div className="space-y-2">
          <Label>Preferred time</Label>
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
            <div className="space-y-2">
              <Label htmlFor="get-started-time-hour" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Hour
              </Label>
              <select
                id="get-started-time-hour"
                name="call_time_hour"
                required
                disabled={!canSchedule || !hasDateSelected}
                defaultValue=""
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={Boolean(getError("call_time_hour"))}
                aria-describedby={describedBy("call_time_hour")}
                onBlur={handleBlur}
                onChange={handleInput}
              >
                <option value="" disabled>
                  Select hour
                </option>
                {HOUR_OPTIONS.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              {renderError("call_time_hour")}
            </div>
            <div className="space-y-2">
              <Label htmlFor="get-started-time-minute" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Minute
              </Label>
              <select
                id="get-started-time-minute"
                name="call_time_minute"
                required
                disabled={!canSchedule || !hasDateSelected}
                defaultValue=""
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={Boolean(getError("call_time_minute"))}
                aria-describedby={describedBy("call_time_minute")}
                onBlur={handleBlur}
                onChange={handleInput}
              >
                <option value="" disabled>
                  Select minutes
                </option>
                {MINUTE_OPTIONS.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
              {renderError("call_time_minute")}
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                AM/PM
              </Label>
              <div className="flex items-center gap-2">
                <label className="relative">
                  <input
                    type="radio"
                    name="call_time_period"
                    value="AM"
                    required
                    disabled={!canSchedule || !hasDateSelected}
                    className="peer sr-only"
                    onBlur={handleBlur}
                    onChange={handleInput}
                  />
                  <span className="inline-flex h-10 min-w-[3.5rem] items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground transition peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                    AM
                  </span>
                </label>
                <label className="relative">
                  <input
                    type="radio"
                    name="call_time_period"
                    value="PM"
                    disabled={!canSchedule || !hasDateSelected}
                    className="peer sr-only"
                    onBlur={handleBlur}
                    onChange={handleInput}
                  />
                  <span className="inline-flex h-10 min-w-[3.5rem] items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground transition peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                    PM
                  </span>
                </label>
              </div>
              {renderError("call_time_period")}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Calls last 30 minutes. Please reserve 30 minutes for the call.
          </p>
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
