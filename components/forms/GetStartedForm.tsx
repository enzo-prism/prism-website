'use client'

import type { FocusEvent, FormEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormValidation } from '@/hooks/use-form-validation'
import { cn } from '@/lib/utils'
import {
  trackCTAClick,
  storePendingApplyLeadContext,
  trackEvent,
} from '@/utils/analytics'

import styles from '@/components/get-started/get-started-page.module.css'

const FORM_ACTION =
  process.env.NEXT_PUBLIC_APPLY_FORM_ENDPOINT ||
  process.env.NEXT_PUBLIC_GET_STARTED_FORM_ENDPOINT ||
  'https://formspree.io/f/mreroojo'
const DEFAULT_REDIRECT = 'https://www.design-prism.com/thank-you?source=apply'

const SERVICE_OPTIONS = [
  'New website',
  'Website redesign',
  'Better analytics / tracking',
  'More customers from search',
  'Help with paid ads',
  'AI workflows / automation',
  'Not sure yet',
] as const

const WEBSITE_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
] as const

const PRIORITY_OPTIONS = [
  'I need a site that converts better',
  'I need clearer analytics',
  'I need more leads/customers online',
  'I need help making ads work',
  'I want to use AI to move faster',
] as const

const BUDGET_OPTIONS = [
  'Under $1k',
  '$1k to $1.5k',
  '$1.5k to $3k',
  '$3k to $5k',
  '$5k+',
] as const

const TIMELINE_OPTIONS = [
  'ASAP',
  'Within 30 days',
  'Within 60 to 90 days',
  'Just exploring',
] as const

const STEP_ONE_FIELDS = [
  'service_focus',
  'has_website',
  'review_link',
  'primary_goal',
] as const
const STEP_TWO_FIELDS = [
  'budget',
  'timeline',
  'company',
  'full_name',
  'email',
] as const

type FormStep = 1 | 2
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

function normalizeReviewLink(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (/^[a-zA-Z][a-zA-Z\d+.-]*:\/\//.test(trimmed)) {
    return trimmed
  }
  return `https://${trimmed}`
}

function isValidReviewLink(value: string) {
  try {
    const parsed = new URL(value)
    return Boolean(parsed.hostname)
  } catch {
    return false
  }
}

function FieldError({ error, id }: { error: string; id: string }) {
  if (!error) return null

  return (
    <p
      id={id}
      className="font-mono text-[0.74rem] uppercase tracking-[0.14em] text-[#FF92D5]"
      aria-live="polite"
    >
      {error}
    </p>
  )
}

export default function GetStartedForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const servicesValidationRef = useRef<HTMLInputElement>(null)
  const startedAtRef = useRef<number>(Date.now())
  const currentStepRef = useRef<FormStep>(1)
  const selectedServicesCountRef = useRef(0)
  const hasInteractedRef = useRef(false)
  const hasTrackedFormStartRef = useRef(false)
  const hasTrackedAbandonRef = useRef(false)
  const hasSubmittedSuccessfullyRef = useRef(false)

  const [step, setStep] = useState<FormStep>(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [hasWebsite, setHasWebsite] = useState('')
  const [primaryGoal, setPrimaryGoal] = useState('')
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [reviewLinkSnapshot, setReviewLinkSnapshot] = useState('')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [redirectUrl, setRedirectUrl] = useState(DEFAULT_REDIRECT)
  const [hasAttemptedStepOne, setHasAttemptedStepOne] = useState(false)

  const { getError, handleBlur, handleSubmit, isSubmitting, validateFields } =
    useFormValidation({
      onValidSubmit: async (form) => {
        setSubmitError(null)

        const elapsedSeconds = Math.max(
          1,
          Math.round((Date.now() - startedAtRef.current) / 1000),
        )

        trackEvent('apply_step_2_complete', {
          step: 2,
          budget,
          timeline,
          service_count: selectedServices.length,
          elapsed_seconds: elapsedSeconds,
        })
        trackEvent('apply_submit', {
          budget,
          timeline,
          service_count: selectedServices.length,
          elapsed_seconds: elapsedSeconds,
        })

        try {
          const formData = new FormData(form)
          const response = await fetch(form.action, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: formData,
          })

          if (!response.ok) {
            trackEvent('apply_error', {
              reason: 'non_ok_response',
              status: response.status,
              step: 2,
            })
            setSubmitError("We couldn't submit right now. Try again?")
            return
          }
        } catch (error) {
          console.error('apply form submission failed:', error)
          trackEvent('apply_error', {
            reason: 'network_failure',
            step: 2,
          })
          setSubmitError("We couldn't submit right now. Try again?")
          return
        }

        hasSubmittedSuccessfullyRef.current = true
        storePendingApplyLeadContext({
          form_name: 'growth_application',
          form_location: 'apply_page',
          lead_type: 'growth_application',
          service_count: selectedServices.length,
          primary_goal: primaryGoal,
          has_website: hasWebsite || undefined,
          budget,
          timeline,
          elapsed_seconds: elapsedSeconds,
        })
        router.push('/thank-you?source=apply')
      },
    })

  useEffect(() => {
    currentStepRef.current = step
  }, [step])

  useEffect(() => {
    selectedServicesCountRef.current = selectedServices.length
  }, [selectedServices.length])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRedirectUrl(`${window.location.origin}/thank-you?source=apply`)
    }
  }, [])

  useEffect(() => {
    trackEvent('apply_form_view', {
      form_name: 'growth_application',
      form_location: 'apply_page',
    })
  }, [])

  const markInteracted = useCallback(() => {
    hasInteractedRef.current = true

    if (hasTrackedFormStartRef.current) return

    hasTrackedFormStartRef.current = true
    trackEvent('apply_form_start', {
      form_name: 'growth_application',
      form_location: 'apply_page',
      step: currentStepRef.current,
    })
  }, [])

  const syncRadioGroupValidity = useCallback(
    (name: string, message: string, form = formRef.current) => {
      if (!form) return

      const inputs = Array.from(
        form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`),
      )
      const hasSelection = inputs.some((input) => input.checked)

      inputs.forEach((input) => {
        input.setCustomValidity(hasSelection ? '' : message)
      })
    },
    [],
  )

  const syncServiceValidity = useCallback(
    (selected = selectedServices) => {
      const input = servicesValidationRef.current
      if (!input) return

      if (selected.length === 0) {
        input.setCustomValidity('Choose at least one area you want help with')
        return
      }

      if (selected.length > 3) {
        input.setCustomValidity('Choose up to three areas')
        return
      }

      input.setCustomValidity('')
    },
    [selectedServices],
  )

  const syncTextFieldValidity = useCallback((field: ValidFieldElement) => {
    const value = field.value.trim()
    let message = ''

    if (field.name === 'review_link') {
      if (!value) {
        message = 'Add a website or another link we can review'
      } else {
        const normalized = normalizeReviewLink(value)
        if (normalized !== field.value) {
          field.value = normalized
        }

        if (!isValidReviewLink(field.value)) {
          message = 'Add a website or another link we can review'
        }
      }
    }

    if (field.name === 'company') {
      if (!value) message = 'Enter your company name'
    }

    if (field.name === 'full_name') {
      if (!value) message = 'Enter your full name'
    }

    if (field.name === 'email') {
      if (!value) {
        message = 'Enter your email'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = 'Enter a valid email'
      }
    }

    field.setCustomValidity(message)
  }, [])

  const getNamedFields = useCallback((names: readonly string[]) => {
    const form = formRef.current
    if (!form) return [] as ValidFieldElement[]

    return names.flatMap((name) =>
      Array.from(form.elements).filter(
        (element): element is ValidFieldElement =>
          isFieldElement(element) && element.name === name,
      ),
    )
  }, [])

  const syncAllValidationRules = useCallback(() => {
    syncServiceValidity()
    syncRadioGroupValidity(
      'has_website',
      'Let us know if you already have a website',
    )
    syncRadioGroupValidity('primary_goal', 'Choose what matters most right now')
    syncRadioGroupValidity('budget', 'Choose a budget range')
    syncRadioGroupValidity('timeline', 'Choose a start timeline')

    const textFields = getNamedFields([
      'review_link',
      'company',
      'full_name',
      'email',
    ])
    textFields.forEach((field) => {
      syncTextFieldValidity(field)
    })
  }, [
    getNamedFields,
    syncRadioGroupValidity,
    syncServiceValidity,
    syncTextFieldValidity,
  ])

  useEffect(() => {
    syncServiceValidity()
  }, [selectedServices, syncServiceValidity])

  useEffect(() => {
    syncRadioGroupValidity(
      'has_website',
      'Let us know if you already have a website',
    )
  }, [hasWebsite, syncRadioGroupValidity])

  useEffect(() => {
    syncRadioGroupValidity('primary_goal', 'Choose what matters most right now')
  }, [primaryGoal, syncRadioGroupValidity])

  useEffect(() => {
    syncRadioGroupValidity('budget', 'Choose a budget range')
  }, [budget, syncRadioGroupValidity])

  useEffect(() => {
    syncRadioGroupValidity('timeline', 'Choose a start timeline')
  }, [timeline, syncRadioGroupValidity])

  useEffect(() => {
    const trackAbandon = () => {
      if (hasTrackedAbandonRef.current) return
      if (hasSubmittedSuccessfullyRef.current) return
      if (!hasInteractedRef.current) return

      hasTrackedAbandonRef.current = true

      const abandonStep = currentStepRef.current
      trackEvent(
        abandonStep === 1 ? 'apply_abandon_step_1' : 'apply_abandon_step_2',
        {
          step: abandonStep,
          service_count: selectedServicesCountRef.current,
        },
      )
    }

    window.addEventListener('pagehide', trackAbandon)
    return () => {
      window.removeEventListener('pagehide', trackAbandon)
      trackAbandon()
    }
  }, [])

  const renderError = (name: string) => (
    <FieldError error={getError(name)} id={`${name}-error`} />
  )

  const getDescribedBy = (name: string) =>
    getError(name) ? `${name}-error` : undefined

  const fieldClassName =
    'min-h-14 border-white/12 bg-black/40 px-4 text-[0.98rem] text-[#F5F5F2] placeholder:text-[#6E6E68] focus-visible:border-[#9EFF2E]/65 focus-visible:ring-[#9EFF2E]/35 focus-visible:ring-offset-0'

  const choiceCardClassName =
    'flex min-h-[76px] w-full items-start gap-3 border border-white/10 bg-black/30 px-4 py-4 text-left transition-[border-color,background-color,color,box-shadow] duration-200 hover:border-white/20 hover:text-[#F5F5F2] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#9EFF2E]/35 focus-visible:ring-offset-0'

  const handleValidatedBlur = (event: FocusEvent<ValidFieldElement>) => {
    markInteracted()
    syncTextFieldValidity(event.currentTarget)
    handleBlur(event)
  }

  const handleServiceToggle = (service: string) => {
    markInteracted()

    setSelectedServices((current) => {
      const isSelected = current.includes(service)
      const nextSelection = isSelected
        ? current.filter((item) => item !== service)
        : current.length < 3
          ? [...current, service]
          : current

      if (!isSelected && current.length >= 3) {
        const input = servicesValidationRef.current
        input?.setCustomValidity('Choose up to three areas')
        if (hasAttemptedStepOne && input) {
          validateFields([input])
        }
        return current
      }

      trackEvent('apply_service_selected', {
        service,
        selected: !isSelected,
      })

      queueMicrotask(() => {
        syncServiceValidity(nextSelection)
        if (hasAttemptedStepOne && servicesValidationRef.current) {
          validateFields([servicesValidationRef.current])
        }
      })

      return nextSelection
    })
  }

  const handleContinue = () => {
    markInteracted()
    setHasAttemptedStepOne(true)
    setSubmitError(null)
    syncAllValidationRules()

    const isValid = validateFields(getNamedFields(STEP_ONE_FIELDS))
    if (!isValid) return

    trackCTAClick('continue application', 'apply form step 1')
    trackEvent('apply_step_1_complete', {
      step: 1,
      service_count: selectedServices.length,
    })

    const committedReviewLink = getNamedFields(['review_link'])[0]
    if (committedReviewLink instanceof HTMLInputElement) {
      setReviewLinkSnapshot(committedReviewLink.value)
    }

    currentStepRef.current = 2
    setStep(2)
    formRef.current?.scrollIntoView?.({ block: 'start', behavior: 'smooth' })
  }

  const handleBack = () => {
    setSubmitError(null)
    currentStepRef.current = 1
    setStep(1)
    formRef.current?.scrollIntoView?.({ block: 'start', behavior: 'smooth' })
  }

  const handleBudgetSelect = (value: string) => {
    markInteracted()
    setBudget(value)
    trackEvent('apply_budget_selected', { budget: value })
  }

  const handleFinalSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (step === 1) {
      event.preventDefault()
      handleContinue()
      return
    }

    syncAllValidationRules()
    await handleSubmit(event)
  }

  const reviewLinkLabel =
    hasWebsite === 'yes'
      ? 'Current website'
      : 'Current website or best link to review'

  const reviewLinkHelper =
    hasWebsite === 'yes'
      ? 'Share the main site we should review.'
      : 'If you do not have a site yet, send a social profile, booking page, LinkedIn, or anything useful.'

  return (
    <form
      ref={formRef}
      id="growth_application"
      name="growth_application"
      className={cn(
        styles.formFrame,
        styles.scanlines,
        'border border-white/10 bg-[#080808] p-6 pb-28 sm:p-8 sm:pb-8',
      )}
      action={FORM_ACTION}
      method="POST"
      noValidate
      onSubmit={handleFinalSubmit}
    >
      <div className={styles.noiseField} aria-hidden="true" />
      <span className={styles.corner} data-corner="tl" aria-hidden="true" />
      <span className={styles.corner} data-corner="tr" aria-hidden="true" />
      <span className={styles.corner} data-corner="bl" aria-hidden="true" />
      <span className={styles.corner} data-corner="br" aria-hidden="true" />

      <input type="hidden" name="_subject" value="New Prism application" />
      <input type="hidden" name="_redirect" value={redirectUrl} />
      <input type="hidden" name="form_name" value="growth_application" />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {selectedServices.map((service) => (
        <input
          key={service}
          type="hidden"
          name="service_interest[]"
          value={service}
        />
      ))}

      {step === 2 ? (
        <>
          <input type="hidden" name="has_website" value={hasWebsite} />
          <input type="hidden" name="review_link" value={reviewLinkSnapshot} />
          <input type="hidden" name="primary_goal" value={primaryGoal} />
        </>
      ) : null}

      <input
        ref={servicesValidationRef}
        name="service_focus"
        required
        value={selectedServices.join(', ')}
        onChange={() => undefined}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="-mx-6 -mt-6 mb-8 border-b border-white/10 bg-[#080808]/95 px-6 py-4 backdrop-blur sm:static sm:mx-0 sm:mt-0 sm:mb-10 sm:border sm:border-white/10 sm:bg-black/30 sm:px-5 sm:py-5 md:sticky md:top-[calc(var(--prism-header-height,4rem)+0.75rem)] md:z-20">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[0.76rem] uppercase tracking-[0.36em] text-[#9EFF2E]">
                Step {step} of 2
              </p>
              <p className="mt-2 font-mono text-[0.82rem] uppercase tracking-[0.2em] text-[#7C7C75]">
                Takes about 60 to 90 seconds
              </p>
            </div>
            <p className="font-mono text-[0.76rem] uppercase tracking-[0.28em] text-[#C6C6C0]">
              {step === 1 ? 'Fit' : 'Context'}
            </p>
          </div>

          <div className="mt-4 h-px w-full overflow-hidden bg-white/10">
            <div
              className="h-full bg-[#9EFF2E] transition-[width] duration-300"
              style={{ width: `${step * 50}%` }}
            />
          </div>
        </div>

        {step === 1 ? (
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="font-mono text-[0.74rem] uppercase tracking-[0.32em] text-[#767670]">
                Step 1
              </p>
              <h2 className="max-w-[12ch] font-sans text-[2rem] font-medium leading-[0.95] tracking-[-0.05em] text-[#F5F5F2] sm:text-[2.5rem]">
                What do you need help with?
              </h2>
              <p className="max-w-[40rem] font-mono text-[0.95rem] leading-7 text-[#A0A09A]">
                Choose the problem first. Keep it short.
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-[#D7D7D2]">
                  What do you need help with?
                </Label>
                <p className="font-mono text-[0.8rem] leading-6 text-[#8C8C85]">
                  Choose at least 1, up to 3.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {SERVICE_OPTIONS.map((service) => {
                  const isSelected = selectedServices.includes(service)

                  return (
                    <button
                      key={service}
                      type="button"
                      role="checkbox"
                      aria-checked={isSelected}
                      onClick={() => handleServiceToggle(service)}
                      className={cn(
                        choiceCardClassName,
                        isSelected
                          ? 'border-[#9EFF2E]/60 bg-[#9EFF2E]/10 text-[#F5F5F2] shadow-[0_0_0_1px_rgba(158,255,46,0.14)]'
                          : 'text-[#D6D6CF]',
                      )}
                    >
                      <span
                        className={cn(
                          'mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center border text-[0.72rem] font-medium transition-colors',
                          isSelected
                            ? 'border-[#9EFF2E]/70 bg-[#9EFF2E]/18 text-[#9EFF2E]'
                            : 'border-white/16 text-transparent',
                        )}
                        aria-hidden="true"
                      >
                        +
                      </span>
                      <span className="font-mono text-[0.9rem] leading-6">
                        {service}
                      </span>
                    </button>
                  )
                })}
              </div>

              {renderError('service_focus')}
            </div>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-[#D7D7D2]">
                Do you already have a website?
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {WEBSITE_OPTIONS.map((option) => (
                  <label key={option.value} className="block">
                    <input
                      type="radio"
                      name="has_website"
                      value={option.value}
                      checked={hasWebsite === option.value}
                      onChange={(event) => {
                        markInteracted()
                        setHasWebsite(event.currentTarget.value)
                        syncRadioGroupValidity(
                          'has_website',
                          'Let us know if you already have a website',
                          event.currentTarget.form,
                        )
                        validateFields(getNamedFields(['has_website']))
                      }}
                      onBlur={(event) => {
                        syncRadioGroupValidity(
                          'has_website',
                          'Let us know if you already have a website',
                          event.currentTarget.form,
                        )
                        handleBlur(event)
                      }}
                      className="peer sr-only"
                    />
                    <span
                      className={cn(
                        choiceCardClassName,
                        'items-center justify-between',
                        'peer-checked:border-[#9EFF2E]/60 peer-checked:bg-[#9EFF2E]/10 peer-checked:text-[#F5F5F2] peer-focus-visible:ring-2 peer-focus-visible:ring-[#9EFF2E]/35 peer-focus-visible:ring-offset-0',
                      )}
                    >
                      <span className="font-mono text-[0.9rem] uppercase tracking-[0.14em]">
                        {option.label}
                      </span>
                      <span className="font-mono text-[0.76rem] uppercase tracking-[0.2em] text-[#767670] peer-checked:text-[#C7F98A]">
                        {option.value === 'yes' ? 'site_live' : 'site_not_live'}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
              {renderError('has_website')}
            </fieldset>

            <div className="space-y-2.5">
              <Label htmlFor="apply-review-link" className="text-[#D7D7D2]">
                {reviewLinkLabel}
              </Label>
              <p className="font-mono text-[0.8rem] leading-6 text-[#8C8C85]">
                {reviewLinkHelper}
              </p>
              <Input
                id="apply-review-link"
                name="review_link"
                type="url"
                required
                autoComplete="url"
                inputMode="url"
                placeholder={
                  hasWebsite === 'yes'
                    ? 'design-prism.com'
                    : 'linkedin.com/in/your-company'
                }
                className={fieldClassName}
                aria-invalid={Boolean(getError('review_link'))}
                aria-describedby={getDescribedBy('review_link')}
                onBlur={handleValidatedBlur}
              />
              {renderError('review_link')}
            </div>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-[#D7D7D2]">
                What matters most right now?
              </legend>
              <div className="grid gap-3">
                {PRIORITY_OPTIONS.map((option) => (
                  <label key={option} className="block">
                    <input
                      type="radio"
                      name="primary_goal"
                      value={option}
                      checked={primaryGoal === option}
                      onChange={(event) => {
                        markInteracted()
                        setPrimaryGoal(event.currentTarget.value)
                        syncRadioGroupValidity(
                          'primary_goal',
                          'Choose what matters most right now',
                          event.currentTarget.form,
                        )
                        validateFields(getNamedFields(['primary_goal']))
                      }}
                      onBlur={(event) => {
                        syncRadioGroupValidity(
                          'primary_goal',
                          'Choose what matters most right now',
                          event.currentTarget.form,
                        )
                        handleBlur(event)
                      }}
                      className="peer sr-only"
                    />
                    <span
                      className={cn(
                        choiceCardClassName,
                        'peer-checked:border-[#9EFF2E]/60 peer-checked:bg-[#9EFF2E]/10 peer-checked:text-[#F5F5F2] peer-focus-visible:ring-2 peer-focus-visible:ring-[#9EFF2E]/35 peer-focus-visible:ring-offset-0',
                      )}
                    >
                      <span className="font-mono text-[0.9rem] leading-6">
                        {option}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
              {renderError('primary_goal')}
            </fieldset>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="font-mono text-[0.74rem] uppercase tracking-[0.32em] text-[#767670]">
                Step 2
              </p>
              <h2 className="max-w-[12ch] font-sans text-[2rem] font-medium leading-[0.95] tracking-[-0.05em] text-[#F5F5F2] sm:text-[2.5rem]">
                Tell us about the business.
              </h2>
              <p className="max-w-[42rem] font-mono text-[0.95rem] leading-7 text-[#A0A09A]">
                Enough context to review. No phone. No calendar. No long brief.
              </p>
            </div>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-[#D7D7D2]">
                What is a realistic monthly budget for this?
              </legend>
              <p className="font-mono text-[0.8rem] leading-6 text-[#8C8C85]">
                Most Prism partnerships start between $1k and $3k per month.
              </p>
              <div className="grid gap-3">
                {BUDGET_OPTIONS.map((option) => (
                  <label key={option} className="block">
                    <input
                      type="radio"
                      name="budget"
                      value={option}
                      checked={budget === option}
                      onChange={(event) => {
                        handleBudgetSelect(event.currentTarget.value)
                        syncRadioGroupValidity(
                          'budget',
                          'Choose a budget range',
                          event.currentTarget.form,
                        )
                        validateFields(getNamedFields(['budget']))
                      }}
                      onBlur={(event) => {
                        syncRadioGroupValidity(
                          'budget',
                          'Choose a budget range',
                          event.currentTarget.form,
                        )
                        handleBlur(event)
                      }}
                      className="peer sr-only"
                    />
                    <span
                      className={cn(
                        choiceCardClassName,
                        'peer-checked:border-[#9EFF2E]/60 peer-checked:bg-[#9EFF2E]/10 peer-checked:text-[#F5F5F2] peer-focus-visible:ring-2 peer-focus-visible:ring-[#9EFF2E]/35 peer-focus-visible:ring-offset-0',
                      )}
                    >
                      <span className="font-mono text-[0.9rem] uppercase tracking-[0.12em]">
                        {option}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
              {renderError('budget')}
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-[#D7D7D2]">
                How soon are you looking to start?
              </legend>
              <div className="grid gap-3">
                {TIMELINE_OPTIONS.map((option) => (
                  <label key={option} className="block">
                    <input
                      type="radio"
                      name="timeline"
                      value={option}
                      checked={timeline === option}
                      onChange={(event) => {
                        markInteracted()
                        setTimeline(event.currentTarget.value)
                        syncRadioGroupValidity(
                          'timeline',
                          'Choose a start timeline',
                          event.currentTarget.form,
                        )
                        validateFields(getNamedFields(['timeline']))
                      }}
                      onBlur={(event) => {
                        syncRadioGroupValidity(
                          'timeline',
                          'Choose a start timeline',
                          event.currentTarget.form,
                        )
                        handleBlur(event)
                      }}
                      className="peer sr-only"
                    />
                    <span
                      className={cn(
                        choiceCardClassName,
                        'peer-checked:border-[#9EFF2E]/60 peer-checked:bg-[#9EFF2E]/10 peer-checked:text-[#F5F5F2] peer-focus-visible:ring-2 peer-focus-visible:ring-[#9EFF2E]/35 peer-focus-visible:ring-offset-0',
                      )}
                    >
                      <span className="font-mono text-[0.9rem] uppercase tracking-[0.12em]">
                        {option}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
              {renderError('timeline')}
            </fieldset>

            <div className="grid gap-5">
              <div className="space-y-2.5">
                <Label htmlFor="apply-company" className="text-[#D7D7D2]">
                  Company name
                </Label>
                <Input
                  id="apply-company"
                  name="company"
                  required
                  autoComplete="organization"
                  placeholder="Prism"
                  className={fieldClassName}
                  aria-invalid={Boolean(getError('company'))}
                  aria-describedby={getDescribedBy('company')}
                  onBlur={handleValidatedBlur}
                />
                {renderError('company')}
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="apply-full-name" className="text-[#D7D7D2]">
                  Full name
                </Label>
                <Input
                  id="apply-full-name"
                  name="full_name"
                  required
                  autoComplete="name"
                  placeholder="Jordan Ramirez"
                  className={fieldClassName}
                  aria-invalid={Boolean(getError('full_name'))}
                  aria-describedby={getDescribedBy('full_name')}
                  onBlur={handleValidatedBlur}
                />
                {renderError('full_name')}
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="apply-email" className="text-[#D7D7D2]">
                  Email
                </Label>
                <Input
                  id="apply-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={fieldClassName}
                  aria-invalid={Boolean(getError('email'))}
                  aria-describedby={getDescribedBy('email')}
                  onBlur={handleValidatedBlur}
                />
                {renderError('email')}
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="apply-notes" className="text-[#D7D7D2]">
                  Anything else we should know?
                </Label>
                <p className="font-mono text-[0.8rem] leading-6 text-[#8C8C85]">
                  Optional. Keep it short.
                </p>
                <Textarea
                  id="apply-notes"
                  name="additional_context"
                  maxLength={600}
                  placeholder="Any context that will help us review this faster."
                  className="min-h-[140px] border-white/12 bg-black/40 px-4 py-3 text-[0.98rem] leading-7 text-[#F5F5F2] placeholder:text-[#6E6E68] focus-visible:border-[#9EFF2E]/65 focus-visible:ring-[#9EFF2E]/35 focus-visible:ring-offset-0"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 hidden border-t border-white/10 pt-6 sm:block">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-[34rem] font-mono text-[0.9rem] leading-7 text-[#A0A09A]">
              Every real submission gets reviewed. If there&apos;s a fit,
              we&apos;ll reach out with the right next step.
            </p>

            <div className="flex gap-3">
              {step === 2 ? (
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-12 border-white/14 bg-transparent px-5 font-mono text-[0.8rem] uppercase tracking-[0.2em] text-[#D0D0C8] hover:border-white/28 hover:bg-white/5 hover:text-[#F5F5F2]"
                  onClick={handleBack}
                >
                  Back
                </Button>
              ) : null}

              {step === 1 ? (
                <Button
                  type="button"
                  className="min-h-12 border-[#9EFF2E]/55 bg-[#9EFF2E]/8 px-6 font-mono text-[0.82rem] uppercase tracking-[0.2em] text-[#9EFF2E] shadow-[0_0_0_1px_rgba(158,255,46,0.14)] hover:bg-[#9EFF2E]/16 hover:text-[#D4FF94] focus-visible:ring-[#9EFF2E]/45"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="min-h-12 border-[#9EFF2E]/55 bg-[#9EFF2E]/8 px-6 font-mono text-[0.82rem] uppercase tracking-[0.2em] text-[#9EFF2E] shadow-[0_0_0_1px_rgba(158,255,46,0.14)] hover:bg-[#9EFF2E]/16 hover:text-[#D4FF94] focus-visible:ring-[#9EFF2E]/45"
                  disabled={isSubmitting}
                  onClick={() =>
                    trackCTAClick('submit application', 'apply form step 2')
                  }
                >
                  {isSubmitting ? 'Submitting...' : 'Submit application'}
                </Button>
              )}
            </div>
          </div>

          {submitError ? (
            <Alert className="mt-4 border-[#FF2BEA]/26 bg-[#FF2BEA]/10 text-[#F5F5F2]">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          ) : null}
        </div>

        <div className="sticky bottom-0 left-0 right-0 mt-8 -mx-6 -mb-28 border-t border-white/10 bg-[#080808]/95 px-6 py-4 backdrop-blur sm:hidden">
          <div className="flex items-center gap-3">
            {step === 2 ? (
              <Button
                type="button"
                variant="outline"
                className="min-h-12 flex-1 border-white/14 bg-transparent px-4 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-[#D0D0C8] hover:border-white/28 hover:bg-white/5 hover:text-[#F5F5F2]"
                onClick={handleBack}
              >
                Back
              </Button>
            ) : null}

            {step === 1 ? (
              <Button
                type="button"
                className="min-h-12 flex-1 border-[#9EFF2E]/55 bg-[#9EFF2E]/8 px-4 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-[#9EFF2E] shadow-[0_0_0_1px_rgba(158,255,46,0.14)] hover:bg-[#9EFF2E]/16 hover:text-[#D4FF94] focus-visible:ring-[#9EFF2E]/45"
                onClick={handleContinue}
              >
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                className="min-h-12 flex-1 border-[#9EFF2E]/55 bg-[#9EFF2E]/8 px-4 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-[#9EFF2E] shadow-[0_0_0_1px_rgba(158,255,46,0.14)] hover:bg-[#9EFF2E]/16 hover:text-[#D4FF94] focus-visible:ring-[#9EFF2E]/45"
                disabled={isSubmitting}
                onClick={() =>
                  trackCTAClick(
                    'submit application',
                    'apply form step 2 mobile',
                  )
                }
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            )}
          </div>

          {submitError ? (
            <Alert className="mt-3 border-[#FF2BEA]/26 bg-[#FF2BEA]/10 text-[#F5F5F2]">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          ) : null}
        </div>
      </div>
    </form>
  )
}
