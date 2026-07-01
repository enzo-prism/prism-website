'use client'

import type { FocusEvent, FormEvent, KeyboardEvent } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { FormspreeOpsFields } from './FormspreeOpsFields'

import styles from '@/components/get-started/get-started-page.module.css'

const FORM_ACTION =
  process.env.NEXT_PUBLIC_DASHBOARD_INTAKE_ENDPOINT ||
  process.env.NEXT_PUBLIC_APPLY_FORM_ENDPOINT ||
  process.env.NEXT_PUBLIC_GET_STARTED_FORM_ENDPOINT ||
  'https://formspree.io/f/mreroojo'
const DEFAULT_REDIRECT = 'https://www.design-prism.com/thank-you?source=apply'
const APPLY_FORM_NAME = 'growth_application'
const APPLY_FORM_LOCATION = 'apply_page'
const APPLY_DRAFT_STORAGE_KEY = 'prism_apply_draft_v1'

const FOCUS_OPTIONS = [
  {
    label: 'More qualified leads',
    value: 'leads',
    serviceValue: 'Qualified demand',
    goalValue: 'I need more qualified leads',
  },
  {
    label: 'Search visibility',
    value: 'search',
    serviceValue: 'Search / AI visibility',
    goalValue: 'I need better search visibility',
  },
  {
    label: 'Website or funnel',
    value: 'website',
    serviceValue: 'Website / funnel',
    goalValue: 'I need a stronger website or funnel',
  },
  {
    label: 'Proof & trust',
    value: 'proof',
    serviceValue: 'Proof / reviews',
    goalValue: 'I need stronger proof and trust',
  },
  {
    label: 'Clearer tracking',
    value: 'tracking',
    serviceValue: 'Tracking / analytics',
    goalValue: 'I need to know what is working',
  },
  {
    label: 'Not sure yet',
    value: 'not-sure',
    serviceValue: 'Not sure yet',
    goalValue: 'Not sure yet',
  },
] as const

const PROFILE_OPTIONS = [
  { label: 'Website', value: 'yes' },
  { label: 'Profile / social', value: 'no' },
] as const

const BUDGET_OPTIONS = [
  'Not sure yet',
  'Deep Growth Audit only',
  '$3.5k to $5k',
  '$5k to $7.5k',
  '$7.5k+',
] as const

const TIMELINE_OPTIONS = [
  'ASAP',
  'Within 30 days',
  'Within 60 to 90 days',
  'Just exploring',
] as const

const FORM_STEPS = [
  'focus',
  'link',
  'fit',
  'practice',
  'contact',
  'review',
] as const

const REVIEW_STEP_INDEX = FORM_STEPS.indexOf('review')
const QUESTION_STEP_COUNT = FORM_STEPS.length
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
type FocusValue = (typeof FOCUS_OPTIONS)[number]['value']
type ValidFieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement

type ApplyDraft = {
  selectedFocuses?: string[]
  hasWebsite?: string
  reviewLink?: string
  budget?: string
  timeline?: string
  company?: string
  fullName?: string
  email?: string
  additionalContext?: string
  stepId?: string
}

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
    target instanceof HTMLInputElement && !NON_TEXT_INPUT_TYPES.has(target.type)
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

function isValidReviewLink(value: string, requireDomain = false) {
  if (/\s/.test(value)) return false

  try {
    const parsed = new URL(value)
    if (!parsed.hostname) return false

    if (requireDomain) {
      // Website-URL path: demand a real domain (a dot + a 2+ letter TLD).
      // This rejects bare words like "not a url" or "localhost" that
      // otherwise pass once `https://` is prepended.
      return /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(
        parsed.hostname,
      )
    }

    return true
  } catch {
    return false
  }
}

function canUseSessionStorage() {
  return typeof window !== 'undefined' && Boolean(window.sessionStorage)
}

function readApplyDraft(): ApplyDraft | null {
  if (!canUseSessionStorage()) return null

  try {
    const raw = window.sessionStorage.getItem(APPLY_DRAFT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

function writeApplyDraft(draft: ApplyDraft) {
  if (!canUseSessionStorage()) return

  try {
    window.sessionStorage.setItem(APPLY_DRAFT_STORAGE_KEY, JSON.stringify(draft))
  } catch {
    // no-op
  }
}

function clearApplyDraft() {
  if (!canUseSessionStorage()) return

  try {
    window.sessionStorage.removeItem(APPLY_DRAFT_STORAGE_KEY)
  } catch {
    // no-op
  }
}

function hasDraftContent(draft: ApplyDraft) {
  return Boolean(
    draft.selectedFocuses?.length ||
      draft.reviewLink ||
      draft.budget ||
      draft.timeline ||
      draft.company ||
      draft.fullName ||
      draft.email ||
      draft.additionalContext,
  )
}

function shouldSkipAutoFocus() {
  return Boolean(
    typeof window !== 'undefined' &&
      window.matchMedia?.('(max-width: 767px)').matches,
  )
}

function isFocusValue(value: string): value is FocusValue {
  return FOCUS_OPTIONS.some((option) => option.value === value)
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
    case 'focus':
      return ['service_focus']
    case 'link':
      return ['has_website', 'review_link']
    case 'practice':
      return ['company']
    case 'contact':
      return ['full_name', 'email']
    default:
      return []
  }
}

function getLegacyAnalyticsStep(stepIndex: number) {
  return stepIndex <= FORM_STEPS.indexOf('link') ? 1 : 2
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
  const returnToReviewRef = useRef(false)

  const [stepIndex, setStepIndex] = useState(0)
  const [selectedFocuses, setSelectedFocuses] = useState<string[]>([])
  const [hasWebsite, setHasWebsite] = useState('yes')
  const [reviewLink, setReviewLink] = useState('')
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [company, setCompany] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [additionalContext, setAdditionalContext] = useState('')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [redirectUrl, setRedirectUrl] = useState(DEFAULT_REDIRECT)
  const [manualErrors, setManualErrors] = useState<ErrorMap>({})
  const [draftReady, setDraftReady] = useState(false)

  const selectedFocusOptions = useMemo(
    () =>
      selectedFocuses
        .map((value) =>
          FOCUS_OPTIONS.find((option) => option.value === value),
        )
        .filter(Boolean) as Array<(typeof FOCUS_OPTIONS)[number]>,
    [selectedFocuses],
  )
  const selectedServices = useMemo(
    () =>
      Array.from(
        new Set(selectedFocusOptions.map((option) => option.serviceValue)),
      ),
    [selectedFocusOptions],
  )
  const primaryGoal = selectedFocusOptions[0]?.goalValue || ''
  const focusLabels = selectedFocusOptions
    .map((option) => option.label)
    .join(', ')

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
          funnel_step: REVIEW_STEP_INDEX + 1,
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
        clearApplyDraft()
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
    const draft = readApplyDraft()

    if (draft) {
      const safeFocuses = (draft.selectedFocuses || []).filter(isFocusValue)
      const nextStepIndex = FORM_STEPS.includes(draft.stepId as FormStepId)
        ? FORM_STEPS.indexOf(draft.stepId as FormStepId)
        : 0

      setSelectedFocuses(safeFocuses)
      setHasWebsite(draft.hasWebsite === 'no' ? 'no' : 'yes')
      setReviewLink(draft.reviewLink || '')
      setBudget(draft.budget || '')
      setTimeline(draft.timeline || '')
      setCompany(draft.company || '')
      setFullName(draft.fullName || '')
      setEmail(draft.email || '')
      setAdditionalContext(draft.additionalContext || '')
      setStepIndex(nextStepIndex)
      currentStepIndexRef.current = nextStepIndex
      if (hasDraftContent(draft)) {
        hasInteractedRef.current = true
      }
    }

    setDraftReady(true)
  }, [])

  useEffect(() => {
    if (!draftReady) return

    currentStepIndexRef.current = stepIndex
  }, [draftReady, stepIndex])

  useEffect(() => {
    selectedServicesCountRef.current = selectedServices.length
  }, [selectedServices.length])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRedirectUrl(`${window.location.origin}/thank-you?source=apply`)
    }
  }, [])

  useEffect(() => {
    if (!draftReady) return

    trackEvent('apply_form_view', {
      form_name: APPLY_FORM_NAME,
      form_location: APPLY_FORM_LOCATION,
    })
  }, [draftReady])

  useEffect(() => {
    if (!draftReady) return
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
  }, [
    currentStep,
    draftReady,
    isReviewStep,
    selectedServices.length,
    stepIndex,
  ])

  useEffect(() => {
    if (!draftReady) return
    if (hasSubmittedSuccessfullyRef.current) return

    const draft: ApplyDraft = {
      selectedFocuses,
      hasWebsite,
      reviewLink,
      budget,
      timeline,
      company,
      fullName,
      email,
      additionalContext,
      stepId: currentStep,
    }

    if (!hasDraftContent(draft)) {
      clearApplyDraft()
      return
    }

    writeApplyDraft(draft)
  }, [
    additionalContext,
    budget,
    company,
    currentStep,
    draftReady,
    email,
    fullName,
    hasWebsite,
    reviewLink,
    selectedFocuses,
    timeline,
  ])

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
    (selected = selectedFocuses) => {
      const input = servicesValidationRef.current
      if (!input) return

      if (selected.length === 0) {
        input.setCustomValidity('Choose at least one focus')
        return
      }

      if (selected.length > 3) {
        input.setCustomValidity('Choose up to three')
        return
      }

      input.setCustomValidity('')
    },
    [selectedFocuses],
  )

  const commitTextField = useCallback((field: ValidFieldElement) => {
    if (field.name === 'review_link') setReviewLink(field.value)
    if (field.name === 'company') setCompany(field.value)
    if (field.name === 'full_name') setFullName(field.value)
    if (field.name === 'email') setEmail(field.value)
    if (field.name === 'additional_context') setAdditionalContext(field.value)
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

          // Only the website-URL path requires a real domain; the
          // profile/handle path stays intentionally permissive.
          const requireDomain = hasWebsite === 'yes'
          if (!isValidReviewLink(field.value, requireDomain)) {
            message = 'Add a valid link'
          }
        }
      }

      if (field.name === 'company') {
        if (!value) message = 'Enter your business name'
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
    [commitTextField, hasWebsite],
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
    if (shouldSkipAutoFocus()) return

    const focusTarget = formRef.current?.querySelector<HTMLElement>(
      '[data-step-autofocus="true"]',
    )

    focusTarget?.focus({ preventScroll: true })
  }, [])

  const focusNamedField = useCallback(
    (name: string) => {
      if (shouldSkipAutoFocus()) return

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

  const scrollFieldIntoView = useCallback(
    (name: string) => {
      // Bring the first invalid control (or its error message) into view even
      // on mobile, where auto-focus is skipped and the sticky footer can
      // otherwise occlude inline errors.
      const form = formRef.current
      if (!form) return

      const target =
        form.querySelector<HTMLElement>(`#${name}-error`) ||
        (name === 'service_focus'
          ? form.querySelector<HTMLElement>('[data-service-option="true"]')
          : getNamedFields([name]).find(
              (candidate) =>
                candidate.type !== 'hidden' && candidate.tabIndex !== -1,
            ) || null)

      target?.scrollIntoView?.({ block: 'center', behavior: 'smooth' })
    },
    [getNamedFields],
  )

  const syncValidationForStep = useCallback(
    (stepId: FormStepId) => {
      if (stepId === 'focus') {
        syncServiceValidity()
      }

      if (stepId === 'link') {
        syncRadioGroupValidity('has_website', 'Choose where we should look')
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
  }, [selectedFocuses, syncServiceValidity])

  useEffect(() => {
    syncRadioGroupValidity('has_website', 'Choose where we should look')
  }, [hasWebsite, syncRadioGroupValidity])

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

  const handleFocusToggle = (focus: FocusValue) => {
    markInteracted()

    const isSelected = selectedFocuses.includes(focus)
    const nextSelection = isSelected
      ? selectedFocuses.filter((item) => item !== focus)
      : selectedFocuses.length < 3
        ? [...selectedFocuses, focus]
        : selectedFocuses

    if (!isSelected && selectedFocuses.length >= 3) {
      const input = servicesValidationRef.current
      input?.setCustomValidity('Choose up to three')
      if (input) {
        validateFields([input])
      }
      trackEvent('apply_validation_error', {
        form_name: APPLY_FORM_NAME,
        form_location: APPLY_FORM_LOCATION,
        step: 1,
        step_id: 'focus',
        field_name: 'service_focus',
        error_type: 'limit',
        service_count: selectedServices.length,
        question_count: QUESTION_STEP_COUNT,
      })
      queueMicrotask(() => {
        focusNamedField('service_focus')
        scrollFieldIntoView('service_focus')
      })
      return
    }

    setSelectedFocuses(nextSelection)
    trackEvent('apply_service_selected', {
      service: focus,
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

  const handleBudgetSelect = (value: string) => {
    markInteracted()
    setBudget(value)
    trackEvent('apply_budget_selected', {
      form_name: APPLY_FORM_NAME,
      form_location: APPLY_FORM_LOCATION,
      budget: value,
    })
  }

  const handleSkipFit = () => {
    markInteracted()
    setSubmitError(null)
    setBudget('')
    setTimeline('')
    trackEvent('apply_question_skip', {
      form_name: APPLY_FORM_NAME,
      form_location: APPLY_FORM_LOCATION,
      step: stepIndex + 1,
      step_id: currentStep,
      service_count: selectedServices.length,
      question_count: QUESTION_STEP_COUNT,
    })

    if (returnToReviewRef.current) {
      returnToReviewRef.current = false
      goToStep(REVIEW_STEP_INDEX)
      return
    }

    goToStep(Math.min(stepIndex + 1, REVIEW_STEP_INDEX))
  }

  const getManualStepError = () => {
    if (currentStep === 'focus' && selectedFocuses.length === 0) {
      return {
        name: 'service_focus',
        message: 'Choose at least one focus',
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
      queueMicrotask(() => {
        focusNamedField(manualError.name)
        scrollFieldIntoView(manualError.name)
      })
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
      queueMicrotask(() => {
        const invalidName =
          invalidField?.name || getStepFields(currentStep)[0] || 'unknown'
        focusNamedField(invalidName)
        scrollFieldIntoView(invalidName)
      })
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

    if (currentStep === 'link') {
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

    if (returnToReviewRef.current) {
      returnToReviewRef.current = false
      goToStep(REVIEW_STEP_INDEX)
      return
    }

    goToStep(Math.min(stepIndex + 1, REVIEW_STEP_INDEX))
  }

  const handleBack = () => {
    setSubmitError(null)

    if (returnToReviewRef.current && !isReviewStep) {
      returnToReviewRef.current = false
      goToStep(REVIEW_STEP_INDEX)
      return
    }

    goToStep(Math.max(stepIndex - 1, 0))
  }

  const handleEditStep = (stepId: FormStepId) => {
    setSubmitError(null)
    returnToReviewRef.current = true
    goToStep(FORM_STEPS.indexOf(stepId))
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
    compact = false,
  }: {
    name: string
    value: string
    checked: boolean
    label: string
    onSelect: (value: string) => void
    shouldFocusOnStepEntry: boolean
    compact?: boolean
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
          compact ? 'min-h-[48px] py-2.5' : null,
          'peer-checked:border-[#9EFF2E]/60 peer-checked:bg-[#9EFF2E]/10 peer-checked:text-[#F5F5F2] peer-focus-visible:ring-2 peer-focus-visible:ring-[#9EFF2E]/35 peer-focus-visible:ring-offset-0',
        )}
      >
        <span
          className={cn(
            'font-mono uppercase tracking-[0.12em]',
            compact ? 'text-[0.82rem]' : 'text-[0.9rem]',
          )}
        >
          {label}
        </span>
      </span>
    </label>
  )

  const renderStepBody = () => {
    switch (currentStep) {
      case 'focus':
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            {FOCUS_OPTIONS.map((focus) => {
              const isSelected = selectedFocuses.includes(focus.value)

              return (
                <button
                  key={focus.value}
                  type="button"
                  role="checkbox"
                  aria-label={focus.label}
                  aria-checked={isSelected}
                  data-service-option="true"
                  data-step-autofocus={
                    focus.value === FOCUS_OPTIONS[0].value ? 'true' : undefined
                  }
                  onClick={() => handleFocusToggle(focus.value)}
                  className={cn(
                    choiceCardClassName,
                    isSelected
                      ? 'border-[#9EFF2E]/60 bg-[#9EFF2E]/10 text-[#F5F5F2] shadow-[0_0_0_1px_rgba(158,255,46,0.14)]'
                      : 'text-[#D6D6CF]',
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex h-5 w-5 shrink-0 items-center justify-center border transition-colors',
                      isSelected
                        ? 'border-[#9EFF2E]/70 bg-[#9EFF2E]/18'
                        : 'border-white/16',
                    )}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[0.9rem] uppercase tracking-[0.12em]">
                    {focus.label}
                  </span>
                </button>
              )
            })}
          </div>
        )

      case 'link':
        return (
          <div className="space-y-5">
            <fieldset className="space-y-3">
              <legend className="sr-only">Where should we look?</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {PROFILE_OPTIONS.map((option) =>
                  renderChoiceOption({
                    name: 'has_website',
                    value: option.value,
                    checked: hasWebsite === option.value,
                    label: option.label,
                    onSelect: setHasWebsite,
                    shouldFocusOnStepEntry:
                      option.value === (hasWebsite || PROFILE_OPTIONS[0].value),
                  }),
                )}
              </div>
              {renderError('has_website')}
            </fieldset>

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
                    ? 'yourcompany.com'
                    : 'maps.google.com/your-business'
                }
                className={fieldClassName}
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

            <div className="space-y-2 border-t border-white/10 pt-5">
              <Label
                htmlFor="apply-early-email"
                className="font-mono text-[0.74rem] uppercase tracking-[0.14em] text-[#8C8C85]"
              >
                Want us to save your progress? Add your email (optional)
              </Label>
              <Input
                id="apply-early-email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                value={email}
                placeholder="you@company.com"
                className={fieldClassName}
                onChange={(event) => {
                  markInteracted()
                  setEmail(event.currentTarget.value)
                }}
                onBlur={(event) => {
                  if (event.currentTarget.value.trim()) {
                    trackEvent('apply_early_email_capture', {
                      form_name: APPLY_FORM_NAME,
                      form_location: APPLY_FORM_LOCATION,
                      step: stepIndex + 1,
                      step_id: currentStep,
                    })
                  }
                  handleBlur(event)
                }}
              />
              <p className="font-mono text-[0.74rem] leading-5 text-[#767670]">
                We will only use it to send your free growth audit. Skip it and
                keep going if you prefer.
              </p>
            </div>
          </div>
        )

      case 'fit':
        return (
          <div className="grid gap-5 lg:grid-cols-2">
            <fieldset className="space-y-2.5">
              <legend className="font-mono text-[0.74rem] uppercase tracking-[0.18em] text-[#8C8C85]">
                Budget
              </legend>
              <div className="grid gap-2.5">
                {BUDGET_OPTIONS.map((option) =>
                  renderChoiceOption({
                    name: 'budget',
                    value: option,
                    checked: budget === option,
                    label: option,
                    onSelect: handleBudgetSelect,
                    shouldFocusOnStepEntry:
                      option === (budget || BUDGET_OPTIONS[0]),
                    compact: true,
                  }),
                )}
              </div>
            </fieldset>

            <fieldset className="space-y-2.5">
              <legend className="font-mono text-[0.74rem] uppercase tracking-[0.18em] text-[#8C8C85]">
                Timing
              </legend>
              <div className="grid gap-2.5">
                {TIMELINE_OPTIONS.map((option) =>
                  renderChoiceOption({
                    name: 'timeline',
                    value: option,
                    checked: timeline === option,
                    label: option,
                    onSelect: setTimeline,
                    shouldFocusOnStepEntry:
                      !budget && option === (timeline || TIMELINE_OPTIONS[0]),
                    compact: true,
                  }),
                )}
              </div>
            </fieldset>
          </div>
        )

      case 'practice':
        return (
          <div className="space-y-3">
            <Label htmlFor="apply-company" className="sr-only">
              Business name
            </Label>
            <Input
              id="apply-company"
              name="company"
              required
              autoComplete="organization"
              value={company}
              placeholder="Business name"
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
                spellCheck={false}
                value={email}
                placeholder="you@company.com"
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

      case 'review':
        return (
          <div className="space-y-5">
            <div className="grid gap-3 rounded-none border border-white/10 bg-black/30 p-4">
              <ReviewRow
                label="Focus"
                value={focusLabels}
                onEdit={() => handleEditStep('focus')}
              />
              <ReviewRow
                label="Link"
                value={`${getOptionLabel(PROFILE_OPTIONS, hasWebsite)} / ${reviewLink}`}
                onEdit={() => handleEditStep('link')}
              />
              <ReviewRow
                label="Fit"
                value={`${budget || 'Not shared'} / ${timeline || 'Not shared'}`}
                onEdit={() => handleEditStep('fit')}
              />
              <ReviewRow
                label="Business"
                value={company}
                onEdit={() => handleEditStep('practice')}
              />
              <ReviewRow
                label="Contact"
                value={`${fullName} / ${email}`}
                onEdit={() => handleEditStep('contact')}
              />
            </div>

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
                className="min-h-[120px] border-white/12 bg-black/40 px-4 py-3 text-[1rem] leading-7 text-[#F5F5F2] placeholder:text-[#6E6E68] focus-visible:border-[#9EFF2E]/65 focus-visible:ring-[#9EFF2E]/35 focus-visible:ring-offset-0"
                onChange={(event) => {
                  markInteracted()
                  setAdditionalContext(event.currentTarget.value)
                }}
                onBlur={handleValidatedBlur}
              />
            </div>
          </div>
        )
    }
  }

  const heading =
    currentStep === 'focus'
      ? 'What do you want improved?'
      : currentStep === 'link'
        ? 'Where should we look first?'
        : currentStep === 'fit'
          ? 'Optional: budget & timing'
          : currentStep === 'practice'
            ? 'What is your business called?'
            : currentStep === 'contact'
              ? 'Where should we send it?'
              : 'Review and submit.'

  const helper =
    currentStep === 'focus'
      ? 'Pick up to 3.'
      : currentStep === 'link'
        ? 'Website, Google profile, booking page, or social.'
        : currentStep === 'fit'
          ? 'Only if you might want Prism’s help after the free audit. Skipping changes nothing.'
          : currentStep === 'review'
            ? 'Add a note only if it helps.'
            : ''

  return (
    <form
      ref={formRef}
      id="growth_application"
      name="growth_application"
      className={cn(
        styles.formFrame,
        styles.scanlines,
        'mx-auto min-h-[min(720px,calc(100dvh-8rem))] max-w-[760px] border border-white/10 bg-[#080808] p-5 sm:p-8',
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
        value="New Prism Growth Dashboard request"
      />
      <input type="hidden" name="_redirect" value={redirectUrl} />
      <input type="hidden" name="form_name" value="growth_application" />
      <FormspreeOpsFields formKey="apply" />
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

      <input type="hidden" name="focus_labels" value={focusLabels} />

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
              Free growth audit
            </p>
          </div>
          <div className="h-px w-full overflow-hidden bg-white/10">
            <div
              className="h-full bg-[#9EFF2E] transition-[width] duration-300"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center py-12 pb-24 sm:py-16 sm:pb-16">
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
              {currentStep === 'focus' ? renderError('service_focus') : null}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-20 -mx-5 border-t border-white/10 bg-[#080808] px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-5">
          <div className="flex items-center gap-3">
            {stepIndex > 0 ? (
              <Button
                type="button"
                variant="outline"
                className="min-h-12 shrink-0 border-white/14 bg-transparent px-5 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-[#D0D0C8] hover:border-white/28 hover:bg-white/5 hover:text-[#F5F5F2]"
                onClick={handleBack}
              >
                Back
              </Button>
            ) : null}

            {currentStep === 'fit' ? (
              <Button
                type="button"
                variant="ghost"
                className="min-h-12 shrink-0 border-0 bg-transparent px-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#767670] shadow-none underline-offset-4 hover:bg-transparent hover:text-[#A8A8A1] hover:underline"
                onClick={handleSkipFit}
              >
                Skip for now
              </Button>
            ) : null}

            {isReviewStep ? (
              <Button
                type="submit"
                className="min-h-12 flex-1 border-[#9EFF2E]/55 bg-[#9EFF2E]/8 px-6 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-[#9EFF2E] shadow-[0_0_0_1px_rgba(158,255,46,0.14)] hover:bg-[#9EFF2E]/16 hover:text-[#D4FF94] focus-visible:ring-[#9EFF2E]/45"
                disabled={isSubmitting}
                data-step-autofocus="true"
                onClick={() =>
                  trackCTAClick('submit growth dashboard', 'apply form review')
                }
              >
                {isSubmitting ? 'Submitting…' : 'Get my free growth audit'}
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
                Continue
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

function ReviewRow({
  label,
  value,
  onEdit,
}: {
  label: string
  value: string
  onEdit: () => void
}) {
  return (
    <div className="grid gap-2 border-b border-white/10 pb-3 last:border-b-0 last:pb-0 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4">
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[#767670]">
        {label}
      </span>
      <span className="min-w-0 break-words font-mono text-[0.86rem] leading-6 text-[#D6D6CF]">
        {value}
      </span>
      <button
        type="button"
        className="justify-self-start font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#9EFF2E] transition-colors hover:text-[#D4FF94] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#9EFF2E]/35 sm:justify-self-end"
        aria-label={`Edit ${label}`}
        onClick={onEdit}
      >
        Edit
      </button>
    </div>
  )
}
