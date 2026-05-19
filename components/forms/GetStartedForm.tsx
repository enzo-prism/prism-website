'use client'

import type { FocusEvent, FormEvent, KeyboardEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormValidation } from '@/hooks/use-form-validation'
import {
  extractDashboardClaimUrl,
  storeApplyDashboardClaimUrl,
} from '@/lib/dashboard-claim'
import { cn } from '@/lib/utils'
import {
  trackCTAClick,
  storePendingApplyLeadContext,
  trackEvent,
} from '@/utils/analytics'

import styles from '@/components/get-started/get-started-page.module.css'

const FORM_ACTION =
  process.env.NEXT_PUBLIC_DASHBOARD_INTAKE_ENDPOINT ||
  process.env.NEXT_PUBLIC_APPLY_FORM_ENDPOINT ||
  process.env.NEXT_PUBLIC_GET_STARTED_FORM_ENDPOINT ||
  'https://formspree.io/f/mreroojo'
const DEFAULT_REDIRECT = 'https://www.design-prism.com/thank-you?source=apply'
const APPLY_FORM_NAME = 'growth_application'
const APPLY_FORM_LOCATION = 'apply_page'

const SERVICE_OPTIONS = [
  { label: 'Dental website', value: 'Dental website' },
  { label: 'Google Maps / SEO', value: 'Google Maps / SEO' },
  { label: 'Reviews', value: 'Reviews' },
  { label: 'Ads', value: 'Ads' },
  { label: 'Tracking', value: 'Tracking' },
  { label: 'AI search', value: 'AI search' },
  { label: 'Not sure', value: 'Not sure yet' },
] as const

const WEBSITE_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
] as const

const PRIORITY_OPTIONS = [
  { label: 'More patient calls', value: 'I need more patient calls' },
  {
    label: 'Better Google visibility',
    value: 'I need better Google visibility',
  },
  { label: 'Modern website', value: 'I need a modern dental website' },
  {
    label: 'More trust',
    value: 'I need stronger reviews and patient trust',
  },
  { label: 'Clearer tracking', value: 'I need to know what is working' },
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

const FORM_STEPS = [
  'services',
  'website',
  'link',
  'priority',
  'budget',
  'timeline',
  'company',
  'contact',
  'notes',
  'review',
] as const

const QUESTION_STEP_COUNT = FORM_STEPS.length - 1
const STEP_FORWARD_KEYS = new Set(['ArrowRight', 'ArrowDown'])
const STEP_BACK_KEYS = new Set(['ArrowLeft', 'ArrowUp'])
const NON_TEXT_INPUT_TYPES = new Set([
  'button',
  'checkbox',
  'color',
  'file',
  'hidden',
  'image',
  'radio',
  'range',
  'reset',
  'submit',
])

type FormStepId = (typeof FORM_STEPS)[number]
type ErrorMap = Record<string, string>
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

function isTextEditingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  if (target.isContentEditable) return true
  if (target instanceof HTMLTextAreaElement) return true
  if (target instanceof HTMLSelectElement) return true

  return (
    target instanceof HTMLInputElement &&
    !NON_TEXT_INPUT_TYPES.has(target.type)
  )
}

function shouldKeepNativeArrowBehavior(target: EventTarget | null) {
  if (isTextEditingTarget(target)) return true

  return target instanceof HTMLInputElement && target.type === 'radio'
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

function getOptionLabel(
  options: readonly { label: string; value: string }[],
  value: string,
) {
  return options.find((option) => option.value === value)?.label || value
}

function getStepFields(stepId: FormStepId): readonly string[] {
  switch (stepId) {
    case 'services':
      return ['service_focus']
    case 'website':
      return ['has_website']
    case 'link':
      return ['review_link']
    case 'priority':
      return ['primary_goal']
    case 'budget':
      return ['budget']
    case 'timeline':
      return ['timeline']
    case 'company':
      return ['company']
    case 'contact':
      return ['full_name', 'email']
    default:
      return []
  }
}

function getLegacyAnalyticsStep(stepIndex: number) {
  return stepIndex <= FORM_STEPS.indexOf('priority') ? 1 : 2
}

function getValidationErrorType(field?: ValidFieldElement) {
  if (!field) return 'required'
  if (field.validity.valueMissing) return 'required'
  if (field.validity.tooLong) return 'too_long'
  if (field.validity.typeMismatch || field.validity.patternMismatch) {
    return 'invalid_format'
  }
  if (field.validity.customError) return 'custom'
  return 'invalid'
}

export default function GetStartedForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const servicesValidationRef = useRef<HTMLInputElement>(null)
  const viewedStepsRef = useRef<Set<FormStepId>>(new Set())
  const startedAtRef = useRef<number>(Date.now())
  const currentStepIndexRef = useRef(0)
  const selectedServicesCountRef = useRef(0)
  const hasInteractedRef = useRef(false)
  const hasTrackedFormStartRef = useRef(false)
  const hasTrackedAbandonRef = useRef(false)
  const hasSubmittedSuccessfullyRef = useRef(false)
  const shouldFocusStepRef = useRef(false)

  const [stepIndex, setStepIndex] = useState(0)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [hasWebsite, setHasWebsite] = useState('')
  const [reviewLink, setReviewLink] = useState('')
  const [primaryGoal, setPrimaryGoal] = useState('')
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [company, setCompany] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [additionalContext, setAdditionalContext] = useState('')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [redirectUrl, setRedirectUrl] = useState(DEFAULT_REDIRECT)
  const [manualErrors, setManualErrors] = useState<ErrorMap>({})

  const currentStep = FORM_STEPS[stepIndex]
  const isReviewStep = currentStep === 'review'
  const progressStep = Math.min(stepIndex + 1, QUESTION_STEP_COUNT)
  const progressWidth = isReviewStep
    ? 100
    : Math.round((progressStep / QUESTION_STEP_COUNT) * 100)

  const { getError, handleBlur, handleSubmit, isSubmitting, validateFields } =
    useFormValidation({
      onValidSubmit: async (form) => {
        setSubmitError(null)

        const elapsedSeconds = Math.max(
          1,
          Math.round((Date.now() - startedAtRef.current) / 1000),
        )
        const submitAnalyticsParams = {
          form_name: APPLY_FORM_NAME,
          form_location: APPLY_FORM_LOCATION,
          budget,
          timeline,
          service_count: selectedServices.length,
          elapsed_seconds: elapsedSeconds,
          step: 2,
          step_id: 'review',
          funnel_step: FORM_STEPS.indexOf('review') + 1,
          question_count: QUESTION_STEP_COUNT,
        }

        trackEvent('apply_submit_attempt', submitAnalyticsParams)

        let dashboardClaimUrl: string | null = null

        try {
          const formData = new FormData(form)
          const response = await fetch(form.action, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: formData,
          })

          if (!response.ok) {
            trackEvent('apply_error', {
              form_name: APPLY_FORM_NAME,
              form_location: APPLY_FORM_LOCATION,
              reason: 'non_ok_response',
              status: response.status,
              step: 2,
              step_id: 'review',
            })
            setSubmitError("We couldn't submit right now. Try again?")
            return
          }

          dashboardClaimUrl = extractDashboardClaimUrl(
            await readJsonResponse(response),
          )
        } catch (error) {
          console.error('apply form submission failed:', error)
          trackEvent('apply_error', {
            form_name: APPLY_FORM_NAME,
            form_location: APPLY_FORM_LOCATION,
            reason: 'network_failure',
            step: 2,
            step_id: 'review',
          })
          setSubmitError("We couldn't submit right now. Try again?")
          return
        }

        storeApplyDashboardClaimUrl(dashboardClaimUrl)
        hasSubmittedSuccessfullyRef.current = true
        trackEvent('apply_step_2_complete', submitAnalyticsParams)
        trackEvent('apply_submit', submitAnalyticsParams)
        trackEvent('apply_submit_success', submitAnalyticsParams)
        storePendingApplyLeadContext({
          form_name: APPLY_FORM_NAME,
          form_location: APPLY_FORM_LOCATION,
          lead_type: APPLY_FORM_NAME,
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
    currentStepIndexRef.current = stepIndex
  }, [stepIndex])

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
      form_name: APPLY_FORM_NAME,
      form_location: APPLY_FORM_LOCATION,
    })
  }, [])

  useEffect(() => {
    if (viewedStepsRef.current.has(currentStep)) return

    viewedStepsRef.current.add(currentStep)
    const step = Math.min(stepIndex + 1, QUESTION_STEP_COUNT)
    const eventName = isReviewStep ? 'apply_review_view' : 'apply_question_view'

    trackEvent(eventName, {
      form_name: APPLY_FORM_NAME,
      form_location: APPLY_FORM_LOCATION,
      step,
      step_id: currentStep,
      question_count: QUESTION_STEP_COUNT,
      service_count: selectedServices.length,
    })
  }, [currentStep, isReviewStep, selectedServices.length, stepIndex])

  const markInteracted = useCallback(() => {
    hasInteractedRef.current = true

    if (hasTrackedFormStartRef.current) return

    hasTrackedFormStartRef.current = true
    trackEvent('apply_form_start', {
      form_name: APPLY_FORM_NAME,
      form_location: APPLY_FORM_LOCATION,
      step: currentStepIndexRef.current + 1,
      step_id: FORM_STEPS[currentStepIndexRef.current],
      question_count: QUESTION_STEP_COUNT,
    })
  }, [])

  const clearManualErrors = useCallback((names: readonly string[]) => {
    setManualErrors((current) => {
      const next = { ...current }
      names.forEach((name) => {
        delete next[name]
      })
      return next
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
        input.setCustomValidity('Choose at least one area')
        return
      }

      if (selected.length > 3) {
        input.setCustomValidity('Choose up to three')
        return
      }

      input.setCustomValidity('')
    },
    [selectedServices],
  )

  const commitTextField = useCallback((field: ValidFieldElement) => {
    if (field.name === 'review_link') setReviewLink(field.value)
    if (field.name === 'company') setCompany(field.value)
    if (field.name === 'full_name') setFullName(field.value)
    if (field.name === 'email') setEmail(field.value)
  }, [])

  const syncTextFieldValidity = useCallback(
    (field: ValidFieldElement) => {
      const value = field.value.trim()
      let message = ''

      if (field.name === 'review_link') {
        if (!value) {
          message = 'Add a link we can review'
        } else {
          const normalized = normalizeReviewLink(value)
          if (normalized !== field.value) {
            field.value = normalized
          }

          if (!isValidReviewLink(field.value)) {
            message = 'Add a valid link'
          }
        }
      }

      if (field.name === 'company') {
        if (!value) message = 'Enter your practice name'
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
      commitTextField(field)
    },
    [commitTextField],
  )

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

  const focusFirstStepControl = useCallback(() => {
    const focusTarget = formRef.current?.querySelector<HTMLElement>(
      '[data-step-autofocus="true"]',
    )

    focusTarget?.focus({ preventScroll: true })
  }, [])

  const focusNamedField = useCallback(
    (name: string) => {
      if (name === 'service_focus') {
        formRef.current
          ?.querySelector<HTMLElement>('[data-service-option="true"]')
          ?.focus({ preventScroll: true })
        return
      }

      const field = getNamedFields([name]).find(
        (candidate) => candidate.type !== 'hidden' && candidate.tabIndex !== -1,
      )

      field?.focus({ preventScroll: true })
    },
    [getNamedFields],
  )

  const syncValidationForStep = useCallback(
    (stepId: FormStepId) => {
      if (stepId === 'services') {
        syncServiceValidity()
      }

      if (stepId === 'website') {
        syncRadioGroupValidity(
          'has_website',
          'Let us know if you have a website',
        )
      }

      if (stepId === 'priority') {
        syncRadioGroupValidity('primary_goal', 'Choose what matters most')
      }

      if (stepId === 'budget') {
        syncRadioGroupValidity('budget', 'Choose a budget')
      }

      if (stepId === 'timeline') {
        syncRadioGroupValidity('timeline', 'Choose a start time')
      }

      getNamedFields(getStepFields(stepId)).forEach((field) => {
        syncTextFieldValidity(field)
      })
    },
    [
      getNamedFields,
      syncRadioGroupValidity,
      syncServiceValidity,
      syncTextFieldValidity,
    ],
  )

  useEffect(() => {
    syncServiceValidity()
  }, [selectedServices, syncServiceValidity])

  useEffect(() => {
    syncRadioGroupValidity('has_website', 'Let us know if you have a website')
  }, [hasWebsite, syncRadioGroupValidity])

  useEffect(() => {
    syncRadioGroupValidity('primary_goal', 'Choose what matters most')
  }, [primaryGoal, syncRadioGroupValidity])

  useEffect(() => {
    syncRadioGroupValidity('budget', 'Choose a budget')
  }, [budget, syncRadioGroupValidity])

  useEffect(() => {
    syncRadioGroupValidity('timeline', 'Choose a start time')
  }, [timeline, syncRadioGroupValidity])

  useEffect(() => {
    if (!shouldFocusStepRef.current) return

    shouldFocusStepRef.current = false

    if (typeof window.requestAnimationFrame === 'function') {
      const frame = window.requestAnimationFrame(focusFirstStepControl)
      return () => window.cancelAnimationFrame(frame)
    }

    const timeout = window.setTimeout(focusFirstStepControl, 0)
    return () => window.clearTimeout(timeout)
  }, [focusFirstStepControl, stepIndex])

  useEffect(() => {
    const trackAbandon = () => {
      if (hasTrackedAbandonRef.current) return
      if (hasSubmittedSuccessfullyRef.current) return
      if (!hasInteractedRef.current) return

      hasTrackedAbandonRef.current = true

      const stepIndexAtExit = currentStepIndexRef.current
      const abandonStep = getLegacyAnalyticsStep(stepIndexAtExit)
      trackEvent(
        abandonStep === 1 ? 'apply_abandon_step_1' : 'apply_abandon_step_2',
        {
          form_name: APPLY_FORM_NAME,
          form_location: APPLY_FORM_LOCATION,
          step: abandonStep,
          funnel_step: stepIndexAtExit + 1,
          funnel_step_id: FORM_STEPS[stepIndexAtExit],
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

  const getFieldError = (name: string) => manualErrors[name] || getError(name)

  const renderError = (name: string) => (
    <FieldError error={getFieldError(name)} id={`${name}-error`} />
  )

  const getDescribedBy = (name: string) =>
    getFieldError(name) ? `${name}-error` : undefined

  const fieldClassName =
    'min-h-14 border-white/12 bg-black/40 px-4 text-[1rem] text-[#F5F5F2] placeholder:text-[#6E6E68] focus-visible:border-[#9EFF2E]/65 focus-visible:ring-[#9EFF2E]/35 focus-visible:ring-offset-0'

  const choiceCardClassName =
    'flex min-h-[64px] w-full items-center gap-3 border border-white/10 bg-black/30 px-4 py-4 text-left transition-[border-color,background-color,color,box-shadow] duration-200 hover:border-white/20 hover:text-[#F5F5F2] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#9EFF2E]/35 focus-visible:ring-offset-0'

  const goToStep = (nextIndex: number) => {
    currentStepIndexRef.current = nextIndex
    shouldFocusStepRef.current = true
    setStepIndex(nextIndex)
    formRef.current?.scrollIntoView?.({ block: 'start', behavior: 'smooth' })
  }

  const handleValidatedBlur = (event: FocusEvent<ValidFieldElement>) => {
    markInteracted()
    syncTextFieldValidity(event.currentTarget)
    handleBlur(event)
  }

  const handleServiceToggle = (service: string) => {
    markInteracted()

    const isSelected = selectedServices.includes(service)
    const nextSelection = isSelected
      ? selectedServices.filter((item) => item !== service)
      : selectedServices.length < 3
        ? [...selectedServices, service]
        : selectedServices

    if (!isSelected && selectedServices.length >= 3) {
      const input = servicesValidationRef.current
      input?.setCustomValidity('Choose up to three')
      if (input) {
        validateFields([input])
      }
      trackEvent('apply_validation_error', {
        form_name: APPLY_FORM_NAME,
        form_location: APPLY_FORM_LOCATION,
        step: 1,
        step_id: 'services',
        field_name: 'service_focus',
        error_type: 'limit',
        service_count: selectedServices.length,
        question_count: QUESTION_STEP_COUNT,
      })
      queueMicrotask(() => focusNamedField('service_focus'))
      return
    }

    setSelectedServices(nextSelection)
    trackEvent('apply_service_selected', {
      service,
      selected: !isSelected,
      form_name: APPLY_FORM_NAME,
      form_location: APPLY_FORM_LOCATION,
    })

    if (nextSelection.length > 0) {
      clearManualErrors(['service_focus'])
    }

    queueMicrotask(() => {
      syncServiceValidity(nextSelection)
      if (getError('service_focus') && servicesValidationRef.current) {
        validateFields([servicesValidationRef.current])
      }
    })
  }

  const getManualStepError = () => {
    if (currentStep === 'services' && selectedServices.length === 0) {
      return {
        name: 'service_focus',
        message: 'Choose at least one area',
      }
    }

    if (currentStep === 'website' && !hasWebsite) {
      return {
        name: 'has_website',
        message: 'Let us know if you have a website',
      }
    }

    if (currentStep === 'priority' && !primaryGoal) {
      return {
        name: 'primary_goal',
        message: 'Choose what matters most',
      }
    }

    if (currentStep === 'budget' && !budget) {
      return {
        name: 'budget',
        message: 'Choose a budget',
      }
    }

    if (currentStep === 'timeline' && !timeline) {
      return {
        name: 'timeline',
        message: 'Choose a start time',
      }
    }

    return null
  }

  const handleNext = () => {
    markInteracted()
    setSubmitError(null)
    const manualError = getManualStepError()

    if (manualError) {
      setManualErrors((current) => ({
        ...current,
        [manualError.name]: manualError.message,
      }))
      trackEvent('apply_validation_error', {
        form_name: APPLY_FORM_NAME,
        form_location: APPLY_FORM_LOCATION,
        step: stepIndex + 1,
        step_id: currentStep,
        field_name: manualError.name,
        error_type: 'required',
        service_count: selectedServices.length,
        question_count: QUESTION_STEP_COUNT,
      })
      queueMicrotask(() => focusNamedField(manualError.name))
      return
    }

    clearManualErrors(getStepFields(currentStep))
    syncValidationForStep(currentStep)

    const fields = getNamedFields(getStepFields(currentStep))
    if (!validateFields(fields)) {
      const invalidField = fields.find((field) => !field.validity.valid)
      trackEvent('apply_validation_error', {
        form_name: APPLY_FORM_NAME,
        form_location: APPLY_FORM_LOCATION,
        step: stepIndex + 1,
        step_id: currentStep,
        field_name:
          invalidField?.name || getStepFields(currentStep)[0] || 'unknown',
        error_type: getValidationErrorType(invalidField),
        service_count: selectedServices.length,
        question_count: QUESTION_STEP_COUNT,
      })
      queueMicrotask(() =>
        focusNamedField(
          invalidField?.name || getStepFields(currentStep)[0] || 'unknown',
        ),
      )
      return
    }

    trackEvent('apply_question_complete', {
      form_name: APPLY_FORM_NAME,
      form_location: APPLY_FORM_LOCATION,
      step: stepIndex + 1,
      step_id: currentStep,
      service_count: selectedServices.length,
      question_count: QUESTION_STEP_COUNT,
    })

    if (currentStep === 'priority') {
      trackCTAClick('continue application', 'apply form step 1')
      trackEvent('apply_step_1_complete', {
        form_name: APPLY_FORM_NAME,
        form_location: APPLY_FORM_LOCATION,
        step: 1,
        step_id: currentStep,
        service_count: selectedServices.length,
        question_count: QUESTION_STEP_COUNT,
      })
    }

    goToStep(Math.min(stepIndex + 1, FORM_STEPS.length - 1))
  }

  const handleBack = () => {
    setSubmitError(null)
    goToStep(Math.max(stepIndex - 1, 0))
  }

  const handleStepKeyboardNavigation = (
    event: KeyboardEvent<HTMLFormElement>,
  ) => {
    if (event.defaultPrevented || isSubmitting) return
    if (event.nativeEvent.isComposing) return
    if (event.altKey || event.ctrlKey || event.metaKey) return

    if (event.key === 'Enter' && !isReviewStep) {
      if (event.shiftKey && event.target instanceof HTMLTextAreaElement) {
        return
      }

      event.preventDefault()
      handleNext()
      return
    }

    if (STEP_FORWARD_KEYS.has(event.key)) {
      if (isReviewStep || shouldKeepNativeArrowBehavior(event.target)) return

      event.preventDefault()
      handleNext()
      return
    }

    if (STEP_BACK_KEYS.has(event.key)) {
      if (stepIndex === 0 || shouldKeepNativeArrowBehavior(event.target)) {
        return
      }

      event.preventDefault()
      handleBack()
    }
  }

  const handleBudgetSelect = (value: string) => {
    markInteracted()
    setBudget(value)
    trackEvent('apply_budget_selected', {
      form_name: APPLY_FORM_NAME,
      form_location: APPLY_FORM_LOCATION,
      budget: value,
    })
  }

  const handleFinalSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (!isReviewStep) {
      event.preventDefault()
      handleNext()
      return
    }

    await handleSubmit(event)
  }

  const renderChoiceOption = ({
    name,
    value,
    checked,
    label,
    onSelect,
    shouldFocusOnStepEntry,
  }: {
    name: string
    value: string
    checked: boolean
    label: string
    onSelect: (value: string) => void
    shouldFocusOnStepEntry: boolean
  }) => (
    <label key={value} className="block">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        data-step-autofocus={shouldFocusOnStepEntry ? 'true' : undefined}
        onChange={(event) => {
          markInteracted()
          onSelect(event.currentTarget.value)
          clearManualErrors([name])
        }}
        onBlur={(event) => {
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
          {label}
        </span>
      </span>
    </label>
  )

  const renderStepBody = () => {
    switch (currentStep) {
      case 'services':
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            {SERVICE_OPTIONS.map((service) => {
              const isSelected = selectedServices.includes(service.value)

              return (
                <button
                  key={service.value}
                  type="button"
                  role="checkbox"
                  aria-checked={isSelected}
                  data-service-option="true"
                  data-step-autofocus={
                    service.value === SERVICE_OPTIONS[0].value
                      ? 'true'
                      : undefined
                  }
                  onClick={() => handleServiceToggle(service.value)}
                  className={cn(
                    choiceCardClassName,
                    isSelected
                      ? 'border-[#9EFF2E]/60 bg-[#9EFF2E]/10 text-[#F5F5F2] shadow-[0_0_0_1px_rgba(158,255,46,0.14)]'
                      : 'text-[#D6D6CF]',
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex h-5 w-5 shrink-0 items-center justify-center border text-[0.72rem] font-medium transition-colors',
                      isSelected
                        ? 'border-[#9EFF2E]/70 bg-[#9EFF2E]/18 text-[#9EFF2E]'
                        : 'border-white/16 text-transparent',
                    )}
                    aria-hidden="true"
                  >
                    +
                  </span>
                  <span className="font-mono text-[0.9rem] uppercase tracking-[0.12em]">
                    {service.label}
                  </span>
                </button>
              )
            })}
          </div>
        )

      case 'website':
        return (
          <fieldset className="space-y-3">
            <legend className="sr-only">Do you have a website?</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {WEBSITE_OPTIONS.map((option) =>
                renderChoiceOption({
                  name: 'has_website',
                  value: option.value,
                  checked: hasWebsite === option.value,
                  label: option.label,
                  onSelect: setHasWebsite,
                  shouldFocusOnStepEntry:
                    option.value === (hasWebsite || WEBSITE_OPTIONS[0].value),
                }),
              )}
            </div>
            {renderError('has_website')}
          </fieldset>
        )

      case 'link':
        return (
          <div className="space-y-3">
            <Label htmlFor="apply-review-link" className="sr-only">
              What should we review?
            </Label>
            <Input
              id="apply-review-link"
              name="review_link"
              type="url"
              required
              autoComplete="url"
              inputMode="url"
              value={reviewLink}
              placeholder={
                hasWebsite === 'yes'
                  ? 'yourpractice.com'
                  : 'maps.google.com/your-practice'
              }
              className={fieldClassName}
              data-step-autofocus="true"
              aria-invalid={Boolean(getError('review_link'))}
              aria-describedby={getDescribedBy('review_link')}
              onChange={(event) => {
                markInteracted()
                setReviewLink(event.currentTarget.value)
              }}
              onBlur={handleValidatedBlur}
            />
            {renderError('review_link')}
          </div>
        )

      case 'priority':
        return (
          <fieldset className="space-y-3">
            <legend className="sr-only">What matters most?</legend>
            <div className="grid gap-3">
              {PRIORITY_OPTIONS.map((option) =>
                renderChoiceOption({
                  name: 'primary_goal',
                  value: option.value,
                  checked: primaryGoal === option.value,
                  label: option.label,
                  onSelect: setPrimaryGoal,
                  shouldFocusOnStepEntry:
                    option.value ===
                    (primaryGoal || PRIORITY_OPTIONS[0].value),
                }),
              )}
            </div>
            {renderError('primary_goal')}
          </fieldset>
        )

      case 'budget':
        return (
          <fieldset className="space-y-3">
            <legend className="sr-only">Monthly budget?</legend>
            <div className="grid gap-3">
              {BUDGET_OPTIONS.map((option) =>
                renderChoiceOption({
                  name: 'budget',
                  value: option,
                  checked: budget === option,
                  label: option,
                  onSelect: handleBudgetSelect,
                  shouldFocusOnStepEntry:
                    option === (budget || BUDGET_OPTIONS[0]),
                }),
              )}
            </div>
            {renderError('budget')}
          </fieldset>
        )

      case 'timeline':
        return (
          <fieldset className="space-y-3">
            <legend className="sr-only">When do you want to start?</legend>
            <div className="grid gap-3">
              {TIMELINE_OPTIONS.map((option) =>
                renderChoiceOption({
                  name: 'timeline',
                  value: option,
                  checked: timeline === option,
                  label: option,
                  onSelect: setTimeline,
                  shouldFocusOnStepEntry:
                    option === (timeline || TIMELINE_OPTIONS[0]),
                }),
              )}
            </div>
            {renderError('timeline')}
          </fieldset>
        )

      case 'company':
        return (
          <div className="space-y-3">
            <Label htmlFor="apply-company" className="sr-only">
              Practice name
            </Label>
            <Input
              id="apply-company"
              name="company"
              required
              autoComplete="organization"
              value={company}
              placeholder="Practice name"
              className={fieldClassName}
              data-step-autofocus="true"
              aria-invalid={Boolean(getError('company'))}
              aria-describedby={getDescribedBy('company')}
              onChange={(event) => {
                markInteracted()
                setCompany(event.currentTarget.value)
              }}
              onBlur={handleValidatedBlur}
            />
            {renderError('company')}
          </div>
        )

      case 'contact':
        return (
          <div className="grid gap-4">
            <div className="space-y-3">
              <Label htmlFor="apply-full-name" className="sr-only">
                Full name
              </Label>
              <Input
                id="apply-full-name"
                name="full_name"
                required
                autoComplete="name"
                value={fullName}
                placeholder="Full name"
                className={fieldClassName}
                data-step-autofocus="true"
                aria-invalid={Boolean(getError('full_name'))}
                aria-describedby={getDescribedBy('full_name')}
                onChange={(event) => {
                  markInteracted()
                  setFullName(event.currentTarget.value)
                }}
                onBlur={handleValidatedBlur}
              />
              {renderError('full_name')}
            </div>

            <div className="space-y-3">
              <Label htmlFor="apply-email" className="sr-only">
                Email
              </Label>
              <Input
                id="apply-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                placeholder="you@practice.com"
                className={fieldClassName}
                aria-invalid={Boolean(getError('email'))}
                aria-describedby={getDescribedBy('email')}
                onChange={(event) => {
                  markInteracted()
                  setEmail(event.currentTarget.value)
                }}
                onBlur={handleValidatedBlur}
              />
              {renderError('email')}
            </div>
          </div>
        )

      case 'notes':
        return (
          <div className="space-y-3">
            <Label htmlFor="apply-notes" className="sr-only">
              Anything important?
            </Label>
            <Textarea
              id="apply-notes"
              name="additional_context"
              maxLength={600}
              value={additionalContext}
              placeholder="Optional"
              className="min-h-[150px] border-white/12 bg-black/40 px-4 py-3 text-[1rem] leading-7 text-[#F5F5F2] placeholder:text-[#6E6E68] focus-visible:border-[#9EFF2E]/65 focus-visible:ring-[#9EFF2E]/35 focus-visible:ring-offset-0"
              data-step-autofocus="true"
              onChange={(event) => {
                markInteracted()
                setAdditionalContext(event.currentTarget.value)
              }}
            />
          </div>
        )

      case 'review':
        return (
          <div className="space-y-3">
            <div className="grid gap-3 rounded-none border border-white/10 bg-black/30 p-4">
              <ReviewRow
                label="Audit"
                value={selectedServices
                  .map((service) => getOptionLabel(SERVICE_OPTIONS, service))
                  .join(', ')}
              />
              <ReviewRow
                label="Website"
                value={hasWebsite === 'yes' ? 'Yes' : 'No'}
              />
              <ReviewRow label="Link" value={reviewLink} />
              <ReviewRow
                label="Goal"
                value={getOptionLabel(PRIORITY_OPTIONS, primaryGoal)}
              />
              <ReviewRow label="Budget" value={budget} />
              <ReviewRow label="Timing" value={timeline} />
              <ReviewRow label="Practice" value={company} />
              <ReviewRow label="Contact" value={`${fullName} / ${email}`} />
              {additionalContext ? (
                <ReviewRow label="Note" value={additionalContext} />
              ) : null}
            </div>
          </div>
        )
    }
  }

  const heading =
    currentStep === 'services'
      ? 'What should we review?'
      : currentStep === 'website'
        ? 'Does the practice have a website?'
        : currentStep === 'link'
          ? 'Where should we look first?'
          : currentStep === 'priority'
            ? 'What matters most?'
            : currentStep === 'budget'
              ? 'Monthly budget?'
              : currentStep === 'timeline'
                ? 'When do you want to start?'
                : currentStep === 'company'
                  ? 'Practice name'
                  : currentStep === 'contact'
                    ? 'Where should we send the audit?'
                    : currentStep === 'notes'
                      ? 'Anything we should know?'
                      : 'Review and submit.'

  const helper =
    currentStep === 'services'
      ? 'Pick up to 3.'
      : currentStep === 'link'
        ? 'Website, Google Business Profile, booking page, or social profile.'
        : currentStep === 'notes'
          ? 'Optional.'
          : ''

  return (
    <form
      ref={formRef}
      id="growth_application"
      name="growth_application"
      className={cn(
        styles.formFrame,
        styles.scanlines,
        'mx-auto min-h-[min(720px,calc(100vh-8rem))] max-w-[760px] border border-white/10 bg-[#080808] p-5 sm:p-8',
      )}
      action={FORM_ACTION}
      method="POST"
      noValidate
      onSubmit={handleFinalSubmit}
      onKeyDown={handleStepKeyboardNavigation}
    >
      <div className={styles.noiseField} aria-hidden="true" />
      <span className={styles.corner} data-corner="tl" aria-hidden="true" />
      <span className={styles.corner} data-corner="tr" aria-hidden="true" />
      <span className={styles.corner} data-corner="bl" aria-hidden="true" />
      <span className={styles.corner} data-corner="br" aria-hidden="true" />

      <input
        type="hidden"
        name="_subject"
        value="New Prism practice audit request"
      />
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

      {isReviewStep ? (
        <>
          <input type="hidden" name="has_website" value={hasWebsite} />
          <input type="hidden" name="review_link" value={reviewLink} />
          <input type="hidden" name="primary_goal" value={primaryGoal} />
          <input type="hidden" name="budget" value={budget} />
          <input type="hidden" name="timeline" value={timeline} />
          <input type="hidden" name="company" value={company} />
          <input type="hidden" name="full_name" value={fullName} />
          <input type="hidden" name="email" value={email} />
          <input
            type="hidden"
            name="additional_context"
            value={additionalContext}
          />
        </>
      ) : null}

      <div className="relative z-10 flex min-h-[inherit] flex-col">
        <div className="space-y-4 border-b border-white/10 pb-5">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[#9EFF2E]">
              {isReviewStep
                ? 'Review'
                : `${progressStep} of ${QUESTION_STEP_COUNT}`}
            </p>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[#767670]">
              Practice audit
            </p>
          </div>
          <div className="h-px w-full overflow-hidden bg-white/10">
            <div
              className="h-full bg-[#9EFF2E] transition-[width] duration-300"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center py-12 sm:py-16">
          <div className="space-y-7">
            <div className="space-y-3">
              <h1 className="max-w-[12ch] text-balance font-sans text-[clamp(2.25rem,8vw,4.8rem)] font-medium leading-[0.95] tracking-[-0.06em] text-[#F5F5F2]">
                {heading}
              </h1>
              {helper ? (
                <p className="font-mono text-[0.88rem] leading-6 text-[#8C8C85]">
                  {helper}
                </p>
              ) : null}
            </div>

            <div className="space-y-4">
              {renderStepBody()}
              {currentStep === 'services' ? renderError('service_focus') : null}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5">
          <div className="flex items-center gap-3">
            {stepIndex > 0 ? (
              <Button
                type="button"
                variant="outline"
                className="min-h-12 border-white/14 bg-transparent px-5 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-[#D0D0C8] hover:border-white/28 hover:bg-white/5 hover:text-[#F5F5F2]"
                onClick={handleBack}
              >
                Back
              </Button>
            ) : null}

            {isReviewStep ? (
              <Button
                type="submit"
                className="min-h-12 flex-1 border-[#9EFF2E]/55 bg-[#9EFF2E]/8 px-6 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-[#9EFF2E] shadow-[0_0_0_1px_rgba(158,255,46,0.14)] hover:bg-[#9EFF2E]/16 hover:text-[#D4FF94] focus-visible:ring-[#9EFF2E]/45"
                disabled={isSubmitting}
                data-step-autofocus="true"
                onClick={() =>
                  trackCTAClick('submit practice audit', 'apply form review')
                }
              >
                {isSubmitting ? 'Submitting...' : 'Submit audit request'}
              </Button>
            ) : (
              <Button
                type="button"
                className="min-h-12 flex-1 border-[#9EFF2E]/55 bg-[#9EFF2E]/8 px-6 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-[#9EFF2E] shadow-[0_0_0_1px_rgba(158,255,46,0.14)] hover:bg-[#9EFF2E]/16 hover:text-[#D4FF94] focus-visible:ring-[#9EFF2E]/45"
                onClick={(event) => {
                  event.preventDefault()
                  handleNext()
                }}
              >
                {currentStep === 'notes' ? 'Review' : 'Continue'}
              </Button>
            )}
          </div>

          {submitError ? (
            <Alert className="mt-4 border-[#FF2BEA]/26 bg-[#FF2BEA]/10 text-[#F5F5F2]">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          ) : null}
        </div>
      </div>
    </form>
  )
}

async function readJsonResponse(response: Response) {
  if (!response.headers.get('content-type')?.includes('application/json')) {
    return null
  }

  try {
    return await response.json()
  } catch {
    return null
  }
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-white/10 pb-3 last:border-b-0 last:pb-0 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[#767670]">
        {label}
      </span>
      <span className="break-words font-mono text-[0.86rem] leading-6 text-[#D6D6CF]">
        {value}
      </span>
    </div>
  )
}
