'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FormspreeOpsFields } from '@/components/forms/FormspreeOpsFields'
import { useFormValidation } from '@/hooks/use-form-validation'
import { appendAttributionToFormData } from '@/lib/marketing-attribution'
import { trackFormSubmission } from '@/utils/analytics'

const FORM_ACTION = 'https://formspree.io/f/xjkjkggn'
const DEFAULT_REDIRECT = 'https://www.design-prism.com/book-a-shoot/thank-you'

const timeWindowOptions = [
  { value: '08:00', label: '8:00 - 9:00 AM' },
  { value: '09:00', label: '9:00 - 10:00 AM' },
  { value: '10:00', label: '10:00 - 11:00 AM' },
  { value: '11:00', label: '11:00 AM - 12:00 PM' },
  { value: '12:00', label: '12:00 - 1:00 PM' },
  { value: '13:00', label: '1:00 - 2:00 PM' },
  { value: '14:00', label: '2:00 - 3:00 PM' },
  { value: '15:00', label: '3:00 - 4:00 PM' },
]

export default function BookAShootForm() {
  const router = useRouter()
  const [redirectUrl, setRedirectUrl] = useState(DEFAULT_REDIRECT)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { getError, handleBlur, handleInput, handleSubmit, isSubmitting } =
    useFormValidation({
      onValidSubmit: async (form) => {
        setSubmitError(null)
        const formData = appendAttributionToFormData(new FormData(form))

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: formData,
          })

          if (!response.ok) {
            setSubmitError("We couldn't submit right now. Try again?")
            return
          }
        } catch (error) {
          console.error('book-a-shoot form submission failed:', error)
          setSubmitError("We couldn't submit right now. Try again?")
          return
        }

        trackFormSubmission('book_a_shoot', 'book_a_shoot_form', {
          lead_type: 'shoot_request',
        })
        router.push('/book-a-shoot/thank-you')
      },
    })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRedirectUrl(`${window.location.origin}/book-a-shoot/thank-you`)
    }
  }, [])

  const renderError = (name: string) => {
    const error = getError(name)
    if (!error) return null

    return (
      <p
        id={`${name}-error`}
        className="text-sm text-rose-600"
        aria-live="polite"
      >
        {error}
      </p>
    )
  }

  const describedBy = (name: string) =>
    getError(name) ? `${name}-error` : undefined

  return (
    <form
      id="book_a_shoot"
      name="book_a_shoot"
      action={FORM_ACTION}
      method="POST"
      noValidate
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <input
        type="hidden"
        name="_subject"
        value="New Prism photography shoot request"
      />
      <input type="hidden" name="_redirect" value={redirectUrl} />
      <input type="hidden" name="form_name" value="book_a_shoot" />
      <FormspreeOpsFields formKey="book_a_shoot" />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      <div className="space-y-2">
        <Label htmlFor="book-shoot-email" className="text-neutral-800">
          your email
        </Label>
        <Input
          id="book-shoot-email"
          name="email"
          type="email"
          required
          className="w-full rounded-2xl border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-offset-0"
          placeholder="name@practice.com"
          autoComplete="email"
          aria-invalid={Boolean(getError('email'))}
          aria-describedby={describedBy('email')}
          onBlur={handleBlur}
          onInput={handleInput}
        />
        {renderError('email')}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-800">preferred day #1</p>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            type="date"
            name="day_one_date"
            required
            className="rounded-2xl border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-900 focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-offset-0 sm:text-sm"
            aria-invalid={Boolean(getError('day_one_date'))}
            aria-describedby={describedBy('day_one_date')}
            onBlur={handleBlur}
            onInput={handleInput}
          />
          <select
            name="day_one_time"
            required
            className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-900 focus:border-ring focus:outline-hidden focus:ring-1 focus:ring-ring focus:ring-offset-0 sm:text-sm"
            defaultValue=""
            aria-invalid={Boolean(getError('day_one_time'))}
            aria-describedby={describedBy('day_one_time')}
            onBlur={handleBlur}
            onInput={handleInput}
          >
            <option value="">best one-hour window</option>
            {timeWindowOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {renderError('day_one_date')}
        {renderError('day_one_time')}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-800">preferred day #2</p>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            type="date"
            name="day_two_date"
            required
            className="rounded-2xl border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-900 focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-offset-0 sm:text-sm"
            aria-invalid={Boolean(getError('day_two_date'))}
            aria-describedby={describedBy('day_two_date')}
            onBlur={handleBlur}
            onInput={handleInput}
          />
          <select
            name="day_two_time"
            required
            className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-900 focus:border-ring focus:outline-hidden focus:ring-1 focus:ring-ring focus:ring-offset-0 sm:text-sm"
            defaultValue=""
            aria-invalid={Boolean(getError('day_two_time'))}
            aria-describedby={describedBy('day_two_time')}
            onBlur={handleBlur}
            onInput={handleInput}
          >
            <option value="">best one-hour window</option>
            {timeWindowOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {renderError('day_two_date')}
        {renderError('day_two_time')}
      </div>

      <div className="space-y-2">
        <Label htmlFor="book-shoot-notes" className="text-neutral-800">
          anything we should know?
        </Label>
        <Textarea
          id="book-shoot-notes"
          name="notes"
          rows={4}
          className="w-full rounded-2xl border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 shadow-none focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-offset-0"
          placeholder="number of operatories, parking instructions, etc."
          onBlur={handleBlur}
          onInput={handleInput}
        />
      </div>

      <div className="space-y-3">
        <Button
          type="submit"
          className="w-full rounded-2xl bg-neutral-900 py-3 text-base lowercase text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'sending...' : 'send request'}
        </Button>
        {submitError ? (
          <Alert variant="destructive" className="rounded-2xl">
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        ) : null}
        <p className="text-center text-xs text-neutral-500">
          we usually reply within one business day.
        </p>
      </div>
    </form>
  )
}
