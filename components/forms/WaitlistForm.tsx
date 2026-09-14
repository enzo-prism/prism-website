'use client'

import type { FocusEvent, FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormValidation } from '@/hooks/use-form-validation'
import { syncFormAttributionFields } from '@/lib/marketing-attribution'
import {
  WAITLIST_FOCUS_OPTIONS,
  WAITLIST_FORM_ENDPOINT,
  WAITLIST_FORM_NAME,
  WAITLIST_FORM_SUBJECT,
  WAITLIST_THANK_YOU_PATH,
  WAITLIST_TIMING_OPTIONS,
  type WaitlistFocus,
} from '@/lib/waitlist'
import { cn } from '@/lib/utils'
import { trackEvent, trackFormSubmission } from '@/utils/analytics'
import { FormspreeOpsFields } from './FormspreeOpsFields'

const FORM_LOCATION = 'waitlist_page'
const LINK_FIELD_NAMES = ['link_website', 'link_social', 'link_other'] as const
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ValidFieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement

function isFieldElement(element: Element): element is ValidFieldElement {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement
  )
}

function hasAnyLink(form: HTMLFormElement) {
  return LINK_FIELD_NAMES.some((name) => {
    const field = form.elements.namedItem(name)
    return field instanceof HTMLInputElement && field.value.trim().length > 0
  })
}

function FieldError({ error, id }: { error: string; id: string }) {
  if (!error) return null

  return (
    <p
      id={id}
      className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[#d8bc79]"
      aria-live="polite"
    >
      {error}
    </p>
  )
}

const fieldClassName =
  'min-h-14 border-white/12 bg-black/40 px-4 text-[1rem] text-[#f5f0e8] placeholder:text-[#6e6e68] focus-visible:border-[#d8bc79]/65 focus-visible:ring-[#d8bc79]/30 focus-visible:ring-offset-0'
const labelClassName =
  'font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#8f877b]'
const optionalClassName = 'text-[#6e6e68] normal-case tracking-[0.04em]'
const groupHeadingClassName =
  'font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#8f877b]'

type WaitlistFormProps = {
  /** Pre-selected focus from `?focus=` so service pages can hand off intent. */
  initialFocus?: WaitlistFocus[]
}

export default function WaitlistForm({ initialFocus = [] }: WaitlistFormProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const hasStartedRef = useRef(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [selectedFocus, setSelectedFocus] = useState<WaitlistFocus[]>(
    () => initialFocus,
  )

  useEffect(() => {
    trackEvent('waitlist_form_view', {
      form_name: WAITLIST_FORM_NAME,
      form_location: FORM_LOCATION,
      prefilled_focus: initialFocus.length > 0 ? initialFocus.join(',') : 'none',
    })
    // Only the initial view counts; focus prefill is fixed for the page load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { getError, handleBlur, handleSubmit, isSubmitting } =
    useFormValidation({
      onValidSubmit: async (form) => {
        setSubmitError(null)
        trackEvent('waitlist_submit_attempt', {
          form_name: WAITLIST_FORM_NAME,
          form_location: FORM_LOCATION,
        })

        syncFormAttributionFields(form)

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: new FormData(form),
          })

          if (!response.ok) {
            trackEvent('waitlist_submit_error', {
              form_name: WAITLIST_FORM_NAME,
              form_location: FORM_LOCATION,
              reason: 'non_ok_response',
              status: response.status,
            })
            setSubmitError("We couldn't save your spot right now. Try again?")
            return
          }
        } catch (error) {
          console.error('waitlist submission failed:', error)
          trackEvent('waitlist_submit_error', {
            form_name: WAITLIST_FORM_NAME,
            form_location: FORM_LOCATION,
            reason: 'network_failure',
          })
          setSubmitError("We couldn't save your spot right now. Try again?")
          return
        }

        trackEvent('waitlist_submit_success', {
          form_name: WAITLIST_FORM_NAME,
          form_location: FORM_LOCATION,
          focus_count: selectedFocus.length,
        })
        // Pending mode: /waitlist/thank-you mounts LeadSuccessTracker, which
        // consumes this context and fires generate_lead once.
        trackFormSubmission(WAITLIST_FORM_NAME, FORM_LOCATION, {
          lead_type: WAITLIST_FORM_NAME,
        })
        router.push(WAITLIST_THANK_YOU_PATH)
      },
    })

  const syncFieldValidity = (field: ValidFieldElement) => {
    const value = field.value.trim()
    let message = ''

    switch (field.name) {
      case 'first_name':
        if (!value) message = 'Enter your first name'
        break
      case 'last_name':
        if (!value) message = 'Enter your last name'
        break
      case 'email':
        if (!value) {
          message = 'Enter your email so we can reach out'
        } else if (!EMAIL_PATTERN.test(value)) {
          message = 'Enter a valid email'
        }
        break
      case 'link_website':
        if (formRef.current && !hasAnyLink(formRef.current)) {
          message = 'Add at least one link: website, social, or other'
        }
        break
      case 'goals':
        if (!value) message = 'Tell us what you want to achieve'
        break
      case 'start_timing':
        if (!value) message = 'Choose when you want to start'
        break
      default:
        break
    }

    field.setCustomValidity(message)
  }

  const markStarted = () => {
    if (hasStartedRef.current) return
    hasStartedRef.current = true
    trackEvent('waitlist_form_start', {
      form_name: WAITLIST_FORM_NAME,
      form_location: FORM_LOCATION,
    })
  }

  const handleValidatedBlur = (event: FocusEvent<ValidFieldElement>) => {
    syncFieldValidity(event.currentTarget)
    handleBlur(event)
  }

  const handleWaitlistSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const fields = Array.from(event.currentTarget.elements).filter(
      isFieldElement,
    )
    fields.forEach(syncFieldValidity)

    const invalid = fields.filter((field) => field.name && !field.validity.valid)
    if (invalid.length > 0) {
      trackEvent('waitlist_validation_error', {
        form_name: WAITLIST_FORM_NAME,
        form_location: FORM_LOCATION,
        field_name: invalid[0]?.name,
        invalid_count: invalid.length,
      })
    }

    await handleSubmit(event)
  }

  const toggleFocus = (value: WaitlistFocus) => {
    markStarted()
    setSelectedFocus((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    )
  }

  const getDescribedBy = (name: string) =>
    getError(name) ? `waitlist-${name}-error` : undefined

  return (
    <form
      ref={formRef}
      id={WAITLIST_FORM_NAME}
      name={WAITLIST_FORM_NAME}
      action={WAITLIST_FORM_ENDPOINT}
      method="POST"
      noValidate
      onSubmit={handleWaitlistSubmit}
      onFocus={markStarted}
      className="border border-white/10 bg-[#070707] p-6 sm:p-9"
    >
      <input type="hidden" name="_subject" value={WAITLIST_FORM_SUBJECT} />
      <input type="hidden" name="form_name" value={WAITLIST_FORM_NAME} />
      <FormspreeOpsFields formKey={WAITLIST_FORM_NAME} />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      <div className="grid gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <Label htmlFor="waitlist-first-name" className={labelClassName}>
              First name
            </Label>
            <Input
              id="waitlist-first-name"
              name="first_name"
              required
              autoComplete="given-name"
              placeholder="Jordan"
              className={fieldClassName}
              aria-invalid={Boolean(getError('first_name'))}
              aria-describedby={getDescribedBy('first_name')}
              onBlur={handleValidatedBlur}
            />
            <FieldError
              id="waitlist-first_name-error"
              error={getError('first_name')}
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="waitlist-last-name" className={labelClassName}>
              Last name
            </Label>
            <Input
              id="waitlist-last-name"
              name="last_name"
              required
              autoComplete="family-name"
              placeholder="Ramirez"
              className={fieldClassName}
              aria-invalid={Boolean(getError('last_name'))}
              aria-describedby={getDescribedBy('last_name')}
              onBlur={handleValidatedBlur}
            />
            <FieldError
              id="waitlist-last_name-error"
              error={getError('last_name')}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <Label htmlFor="waitlist-email" className={labelClassName}>
              Email
            </Label>
            <Input
              id="waitlist-email"
              name="email"
              type="email"
              inputMode="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className={fieldClassName}
              aria-invalid={Boolean(getError('email'))}
              aria-describedby={getDescribedBy('email')}
              onBlur={handleValidatedBlur}
            />
            <FieldError id="waitlist-email-error" error={getError('email')} />
          </div>
          <div className="space-y-3">
            <Label htmlFor="waitlist-phone" className={labelClassName}>
              Phone <span className={optionalClassName}>(optional)</span>
            </Label>
            <Input
              id="waitlist-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(555) 123-4567"
              className={fieldClassName}
              onBlur={handleBlur}
            />
          </div>
        </div>

        <fieldset className="grid gap-4 border-t border-white/10 pt-6">
          <legend className={cn(groupHeadingClassName, 'mb-4')}>
            Relevant links{' '}
            <span className={optionalClassName}>(at least one)</span>
          </legend>
          <div className="space-y-3">
            <Label htmlFor="waitlist-link-website" className={labelClassName}>
              Company website
            </Label>
            <Input
              id="waitlist-link-website"
              name="link_website"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="https://yourcompany.com"
              className={fieldClassName}
              aria-invalid={Boolean(getError('link_website'))}
              aria-describedby={getDescribedBy('link_website')}
              onBlur={handleValidatedBlur}
            />
            <FieldError
              id="waitlist-link_website-error"
              error={getError('link_website')}
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="waitlist-link-social" className={labelClassName}>
                Social media
              </Label>
              <Input
                id="waitlist-link-social"
                name="link_social"
                type="url"
                inputMode="url"
                placeholder="https://instagram.com/yourbrand"
                className={fieldClassName}
                onBlur={handleValidatedBlur}
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="waitlist-link-other" className={labelClassName}>
                Other links
              </Label>
              <Input
                id="waitlist-link-other"
                name="link_other"
                type="url"
                inputMode="url"
                placeholder="https://"
                className={fieldClassName}
                onBlur={handleValidatedBlur}
              />
            </div>
          </div>
        </fieldset>

        <div className="space-y-3 border-t border-white/10 pt-6">
          <Label htmlFor="waitlist-goals" className={labelClassName}>
            Your goals
          </Label>
          <Textarea
            id="waitlist-goals"
            name="goals"
            required
            rows={4}
            placeholder="What do you want Prism to help your company achieve?"
            className="min-h-[120px] border-white/12 bg-black/40 px-4 py-3 text-[1rem] leading-7 text-[#f5f0e8] placeholder:text-[#6e6e68] focus-visible:border-[#d8bc79]/65 focus-visible:ring-[#d8bc79]/30 focus-visible:ring-offset-0"
            aria-invalid={Boolean(getError('goals'))}
            aria-describedby={getDescribedBy('goals')}
            onBlur={handleValidatedBlur}
          />
          <FieldError id="waitlist-goals-error" error={getError('goals')} />
        </div>

        <div className="space-y-3">
          <Label htmlFor="waitlist-start-timing" className={labelClassName}>
            When are you looking to get started?
          </Label>
          <select
            id="waitlist-start-timing"
            name="start_timing"
            required
            defaultValue=""
            className={cn(
              'flex w-full appearance-none rounded-none border font-mono focus-visible:outline-hidden focus-visible:ring-2',
              fieldClassName,
            )}
            aria-invalid={Boolean(getError('start_timing'))}
            aria-describedby={getDescribedBy('start_timing')}
            onBlur={handleValidatedBlur}
          >
            <option value="" disabled>
              Choose a timeframe
            </option>
            {WAITLIST_TIMING_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError
            id="waitlist-start_timing-error"
            error={getError('start_timing')}
          />
        </div>

        <fieldset className="grid gap-4 border-t border-white/10 pt-6">
          <legend className={cn(groupHeadingClassName, 'mb-4')}>
            What should Prism focus on for you?{' '}
            <span className={optionalClassName}>(pick any)</span>
          </legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {WAITLIST_FOCUS_OPTIONS.map((option) => {
              const checked = selectedFocus.includes(option.value)
              return (
                <label
                  key={option.value}
                  className={cn(
                    'flex min-h-14 cursor-pointer items-center gap-3 border px-4 py-3 font-sans text-[1rem] text-[#f5f0e8] transition-colors duration-200 motion-reduce:transition-none',
                    checked
                      ? 'border-[#d8bc79]/60 bg-[#d8bc79]/10'
                      : 'border-white/12 bg-black/40 hover:border-white/30',
                  )}
                >
                  <input
                    type="checkbox"
                    name="focus[]"
                    value={option.value}
                    checked={checked}
                    onChange={() => toggleFocus(option.value)}
                    className="h-5 w-5 shrink-0 accent-[#d8bc79]"
                  />
                  <span>{option.label}</span>
                </label>
              )
            })}
          </div>
          <div className="space-y-3">
            <Label htmlFor="waitlist-focus-other" className={labelClassName}>
              Anything else <span className={optionalClassName}>(optional)</span>
            </Label>
            <Input
              id="waitlist-focus-other"
              name="focus_other"
              placeholder="Photography, SEO, reviews, something else"
              className={fieldClassName}
              onBlur={handleBlur}
            />
          </div>
        </fieldset>
      </div>

      <div className="mt-7 border-t border-white/10 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-14 w-full items-center justify-center gap-2 border border-[#d8bc79]/60 bg-[#d8bc79]/12 px-6 font-mono text-[0.8rem] uppercase tracking-[0.18em] text-[#f5f0e8] transition-colors duration-200 hover:bg-[#d8bc79]/20 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/40 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
        >
          {isSubmitting ? 'Saving your spot…' : 'Join the waitlist'}
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </button>
        <p className="mt-4 text-center font-mono text-[0.68rem] leading-6 text-[#8f877b]">
          We review applications as capacity opens and reach out by email. No
          spam, no obligation.
        </p>
        {submitError ? (
          <p
            role="alert"
            className="mt-4 border border-[#d8bc79]/30 bg-[#d8bc79]/8 px-4 py-3 text-[0.95rem] text-[#f5f0e8]"
          >
            {submitError}
          </p>
        ) : null}
      </div>
    </form>
  )
}
