'use client'

import type { FormEvent, KeyboardEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import LordIcon from '@/components/lord-icon'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BOOKING_URL } from '@/lib/booking'
import { cn } from '@/lib/utils'
import {
  trackBookCallClick,
  trackEvent,
  trackLeadConversion,
} from '@/utils/analytics'
import { appendFormspreeOpsMetadata } from './FormspreeOpsFields'

import styles from './website-intake.module.css'

const FORM_ACTION = process.env.NEXT_PUBLIC_WEBSITE_INTAKE_FORM_ENDPOINT || ''
const FORM_NAME = 'website_intake'
const FORM_LOCATION = 'website_intake_page'
const DRAFT_STORAGE_KEY = 'prism_website_intake_draft_v1'
const AUTO_ADVANCE_MS = 280

const FORM_STEPS = ['why', 'timeline', 'current-site', 'contact'] as const
type FormStepId = (typeof FORM_STEPS)[number]
const QUESTION_STEP_COUNT = FORM_STEPS.length
const AUTO_ADVANCE_STEPS = new Set<FormStepId>(['why', 'timeline'])
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

type WhyOption = {
  value: string
  label: string
  icon: string
}

const WHY_OPTIONS: WhyOption[] = [
  {
    value: 'more_customers',
    label: 'More customers',
    icon: '/lordicon/attract-customers.json',
  },
  {
    value: 'better_design',
    label: 'Better design',
    icon: '/lordicon/web-design.json',
  },
  {
    value: 'better_analytics',
    label: 'Better analytics',
    icon: '/lordicon/line-chart.json',
  },
  {
    value: 'all_of_the_above',
    label: 'All of the above',
    icon: '/lordicon/rocket-space.json',
  },
]

type TimelineOption = {
  value: string
  label: string
  icon: string
}

const TIMELINE_OPTIONS: TimelineOption[] = [
  {
    value: 'next_week',
    label: 'Next week',
    icon: '/lordicon/f1-car.json',
  },
  {
    value: 'next_30_days',
    label: 'Next 30 days',
    icon: '/lordicon/appointment-schedule.json',
  },
  {
    value: 'next_3_months',
    label: 'Next 3 months',
    icon: '/lordicon/mailbox.json',
  },
]

const SOURCE_OPTIONS = [
  'A friend told me',
  'TikTok',
  'Instagram',
  'Google Search',
  'ChatGPT (or another AI Search)',
] as const

type IntakeDraft = {
  why?: string
  timeline?: string
  hasWebsite?: 'yes' | 'no' | ''
  siteLink?: string
  contactMethod?: 'email' | 'text' | ''
  email?: string
  phone?: string
  source?: string
  stepId?: string
}

function normalizeLink(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (/^[a-zA-Z][a-zA-Z\d+.-]*:\/\//.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

function isValidLink(value: string) {
  if (/\s/.test(value)) return false
  try {
    const parsed = new URL(value)
    if (!parsed.hostname) return false
    return /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(
      parsed.hostname,
    )
  } catch {
    return false
  }
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

function canUseSessionStorage() {
  return typeof window !== 'undefined' && Boolean(window.sessionStorage)
}

function readIntakeDraft(): IntakeDraft | null {
  if (!canUseSessionStorage()) return null

  try {
    const raw = window.sessionStorage.getItem(DRAFT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

function writeIntakeDraft(draft: IntakeDraft) {
  if (!canUseSessionStorage()) return

  try {
    window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft))
  } catch {
    // no-op
  }
}

function clearIntakeDraft() {
  if (!canUseSessionStorage()) return

  try {
    window.sessionStorage.removeItem(DRAFT_STORAGE_KEY)
  } catch {
    // no-op
  }
}

function hasDraftContent(draft: IntakeDraft) {
  return Boolean(
    draft.why ||
      draft.timeline ||
      draft.hasWebsite ||
      draft.siteLink ||
      draft.contactMethod ||
      draft.email ||
      draft.phone ||
      draft.source,
  )
}

function shouldSkipAutoFocus() {
  return Boolean(
    typeof window !== 'undefined' &&
      window.matchMedia?.('(max-width: 767px)').matches,
  )
}

function prefersReducedMotion() {
  return Boolean(
    typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
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

export default function WebsiteIntakeForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const startedAtRef = useRef<number>(Date.now())
  const currentStepIndexRef = useRef(0)
  const hasInteractedRef = useRef(false)
  const hasTrackedFormStartRef = useRef(false)
  const hasTrackedAbandonRef = useRef(false)
  const hasSubmittedRef = useRef(false)
  const viewedStepsRef = useRef<Set<string>>(new Set())
  const shouldFocusStepRef = useRef(false)
  const pendingAdvanceRef = useRef(false)
  const [draftReady, setDraftReady] = useState(false)

  const [stepIndex, setStepIndex] = useState(0)
  const [why, setWhy] = useState('')
  const [timeline, setTimeline] = useState('')
  const [hasWebsite, setHasWebsite] = useState<'yes' | 'no' | ''>('')
  const [siteLink, setSiteLink] = useState('')
  const [contactMethod, setContactMethod] = useState<'email' | 'text' | ''>('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [source, setSource] = useState('')
  const [stepError, setStepError] = useState<{
    field: string
    message: string
  } | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

  const currentStep = FORM_STEPS[stepIndex]
  const progressWidth = Math.round(
    ((stepIndex + 1) / QUESTION_STEP_COUNT) * 100,
  )

  const markInteracted = useCallback(() => {
    hasInteractedRef.current = true
    if (hasTrackedFormStartRef.current) return
    hasTrackedFormStartRef.current = true
    trackEvent('website_intake_form_start', {
      form_name: FORM_NAME,
      form_location: FORM_LOCATION,
      step: 1,
      step_id: FORM_STEPS[0],
      question_count: QUESTION_STEP_COUNT,
    })
  }, [])

  const goToStep = useCallback((nextIndex: number) => {
    currentStepIndexRef.current = nextIndex
    shouldFocusStepRef.current = true
    pendingAdvanceRef.current = false
    setStepError(null)
    setSubmitError(null)
    setStepIndex(nextIndex)
    formRef.current?.scrollIntoView?.({ block: 'start', behavior: 'smooth' })
  }, [])

  const getStepError = useCallback((): {
    field: string
    message: string
  } | null => {
    if (currentStep === 'why' && !why) {
      return { field: 'why', message: 'Choose what matters most' }
    }
    if (currentStep === 'timeline' && !timeline) {
      return { field: 'timeline', message: 'Choose a timeline' }
    }
    if (currentStep === 'current-site') {
      if (!hasWebsite) {
        return { field: 'has_website', message: 'Tell us if you have a website' }
      }
      const normalized = normalizeLink(siteLink)
      if (!siteLink.trim()) {
        return {
          field: 'site_link',
          message:
            hasWebsite === 'yes'
              ? 'Add your current website link'
              : 'Add a social profile or Google Maps link',
        }
      }
      if (!isValidLink(normalized)) {
        return { field: 'site_link', message: 'Add a valid link' }
      }
    }
    if (currentStep === 'contact') {
      if (!contactMethod) {
        return {
          field: 'contact_method',
          message: 'Choose how we should reach you',
        }
      }
      if (contactMethod === 'email') {
        if (!email.trim()) return { field: 'email', message: 'Enter your email' }
        if (!isValidEmail(email)) {
          return { field: 'email', message: 'Enter a valid email' }
        }
      }
      if (contactMethod === 'text') {
        if (!phone.trim()) {
          return { field: 'phone', message: 'Enter your phone number' }
        }
        if (!isValidPhone(phone)) {
          return { field: 'phone', message: 'Enter a valid phone number' }
        }
      }
    }
    return null
  }, [contactMethod, currentStep, email, hasWebsite, phone, siteLink, timeline, why])

  useEffect(() => {
    const draft = readIntakeDraft()
    if (draft && hasDraftContent(draft)) {
      setWhy(draft.why ?? '')
      setTimeline(draft.timeline ?? '')
      setHasWebsite(draft.hasWebsite ?? '')
      setSiteLink(draft.siteLink ?? '')
      setContactMethod(draft.contactMethod ?? '')
      setEmail(draft.email ?? '')
      setPhone(draft.phone ?? '')
      setSource(draft.source ?? '')
      const nextStepIndex = FORM_STEPS.includes(draft.stepId as FormStepId)
        ? FORM_STEPS.indexOf(draft.stepId as FormStepId)
        : 0
      currentStepIndexRef.current = nextStepIndex
      setStepIndex(nextStepIndex)
    }
    setDraftReady(true)
  }, [])

  useEffect(() => {
    if (!draftReady) return

    trackEvent('website_intake_form_view', {
      form_name: FORM_NAME,
      form_location: FORM_LOCATION,
    })
  }, [draftReady])

  useEffect(() => {
    if (!draftReady || isSuccess) return
    if (viewedStepsRef.current.has(currentStep)) return
    viewedStepsRef.current.add(currentStep)
    trackEvent('website_intake_step_view', {
      form_name: FORM_NAME,
      form_location: FORM_LOCATION,
      step: stepIndex + 1,
      step_id: currentStep,
      question_count: QUESTION_STEP_COUNT,
    })
  }, [currentStep, draftReady, isSuccess, stepIndex])

  useEffect(() => {
    if (!draftReady || isSuccess) return

    const draft: IntakeDraft = {
      why,
      timeline,
      hasWebsite,
      siteLink,
      contactMethod,
      email,
      phone,
      source,
      stepId: currentStep,
    }

    if (!hasDraftContent(draft)) {
      clearIntakeDraft()
      return
    }

    writeIntakeDraft(draft)
  }, [
    contactMethod,
    currentStep,
    draftReady,
    email,
    hasWebsite,
    isSuccess,
    phone,
    siteLink,
    source,
    timeline,
    why,
  ])

  useEffect(() => {
    currentStepIndexRef.current = stepIndex
  }, [stepIndex])

  const focusFirstStepControl = useCallback(() => {
    if (shouldSkipAutoFocus()) return

    const focusTarget = formRef.current?.querySelector<HTMLElement>(
      '[data-step-autofocus="true"]',
    )
    focusTarget?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    if (!shouldFocusStepRef.current) return
    shouldFocusStepRef.current = false

    if (typeof window.requestAnimationFrame === 'function') {
      const frame = window.requestAnimationFrame(focusFirstStepControl)
      return () => window.cancelAnimationFrame(frame)
    }

    const timeout = window.setTimeout(focusFirstStepControl, 0)
    return () => window.clearTimeout(timeout)
  }, [contactMethod, focusFirstStepControl, hasWebsite, stepIndex])

  useEffect(() => {
    const trackAbandon = () => {
      if (hasTrackedAbandonRef.current) return
      if (hasSubmittedRef.current) return
      if (!hasInteractedRef.current) return
      hasTrackedAbandonRef.current = true
      trackEvent('website_intake_abandon', {
        form_name: FORM_NAME,
        form_location: FORM_LOCATION,
        funnel_step: currentStepIndexRef.current + 1,
        funnel_step_id: FORM_STEPS[currentStepIndexRef.current],
      })
    }
    window.addEventListener('pagehide', trackAbandon)
    return () => {
      window.removeEventListener('pagehide', trackAbandon)
      trackAbandon()
    }
  }, [])

  const completeCurrentStep = useCallback(() => {
    trackEvent('website_intake_step_complete', {
      form_name: FORM_NAME,
      form_location: FORM_LOCATION,
      step: stepIndex + 1,
      step_id: currentStep,
      question_count: QUESTION_STEP_COUNT,
    })
  }, [currentStep, stepIndex])

  const handleSubmit = useCallback(async () => {
    if (!FORM_ACTION) {
      setSubmitError('This form is not configured yet. Please try again soon.')
      return
    }

    const elapsedSeconds = Math.max(
      1,
      Math.round((Date.now() - startedAtRef.current) / 1000),
    )

    trackEvent('website_intake_submit_attempt', {
      form_name: FORM_NAME,
      form_location: FORM_LOCATION,
      elapsed_seconds: elapsedSeconds,
    })

    const formData = new FormData()
    formData.set('_subject', 'New Website Intake Lead')
    formData.set('form_name', FORM_NAME)
    formData.set('why_new_website', why)
    formData.set('timeline', timeline)
    formData.set('has_current_website', hasWebsite)
    formData.set('site_link', normalizeLink(siteLink))
    formData.set('contact_method', contactMethod)
    if (contactMethod === 'email') formData.set('email', email)
    if (contactMethod === 'text') formData.set('phone', phone)
    if (source) formData.set('heard_about_us', source)
    formData.set('elapsed_seconds', String(elapsedSeconds))
    appendFormspreeOpsMetadata(formData, 'website_intake')

    setIsSubmitting(true)
    try {
      const response = await fetch(FORM_ACTION, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })

      if (!response.ok) {
        trackEvent('website_intake_submit_error', {
          form_name: FORM_NAME,
          reason: 'non_ok_response',
          status: response.status,
        })
        setSubmitError("We couldn't submit right now. Try again?")
        return
      }
    } catch {
      trackEvent('website_intake_submit_error', {
        form_name: FORM_NAME,
        reason: 'network_failure',
      })
      setSubmitError("We couldn't submit right now. Try again?")
      return
    } finally {
      setIsSubmitting(false)
    }

    hasSubmittedRef.current = true
    clearIntakeDraft()
    trackEvent('website_intake_submit_success', {
      form_name: FORM_NAME,
      form_location: FORM_LOCATION,
      elapsed_seconds: elapsedSeconds,
    })
    trackLeadConversion(
      {
        form_name: FORM_NAME,
        form_location: FORM_LOCATION,
        lead_type: FORM_NAME,
        timeline,
        elapsed_seconds: elapsedSeconds,
      },
      { sendGoogleAdsConversion: true, conversionMode: 'immediate' },
    )
    setIsSuccess(true)
  }, [contactMethod, email, hasWebsite, phone, siteLink, source, timeline, why])

  const handleNext = useCallback(() => {
    markInteracted()
    pendingAdvanceRef.current = false
    setSubmitError(null)
    const error = getStepError()
    if (error) {
      setStepError(error)
      trackEvent('website_intake_validation_error', {
        form_name: FORM_NAME,
        step: stepIndex + 1,
        step_id: currentStep,
        field_name: error.field,
      })
      const errorNode = formRef.current?.querySelector<HTMLElement>(
        `#${error.field}-error`,
      )
      errorNode?.scrollIntoView?.({ block: 'center', behavior: 'smooth' })
      return
    }

    completeCurrentStep()

    if (stepIndex < QUESTION_STEP_COUNT - 1) {
      goToStep(stepIndex + 1)
      return
    }

    void handleSubmit()
  }, [
    completeCurrentStep,
    currentStep,
    getStepError,
    goToStep,
    handleSubmit,
    markInteracted,
    stepIndex,
  ])

  useEffect(() => {
    if (!pendingAdvanceRef.current) return
    if (!AUTO_ADVANCE_STEPS.has(currentStep)) return
    if (getStepError()) return

    const delay = prefersReducedMotion() ? 0 : AUTO_ADVANCE_MS
    const timeout = window.setTimeout(() => {
      pendingAdvanceRef.current = false
      handleNext()
    }, delay)
    return () => window.clearTimeout(timeout)
  }, [currentStep, getStepError, handleNext, timeline, why])

  const handleBack = () => {
    setStepError(null)
    setSubmitError(null)
    if (stepIndex > 0) goToStep(stepIndex - 1)
  }

  const selectWhy = (value: string) => {
    markInteracted()
    setWhy(value)
    setStepError(null)
    pendingAdvanceRef.current = true
    trackEvent('website_intake_option_select', {
      form_name: FORM_NAME,
      step_id: 'why',
      option: value,
    })
  }

  const selectTimeline = (value: string) => {
    markInteracted()
    setTimeline(value)
    setStepError(null)
    pendingAdvanceRef.current = true
    trackEvent('website_intake_option_select', {
      form_name: FORM_NAME,
      step_id: 'timeline',
      option: value,
    })
  }

  const selectHasWebsite = (value: 'yes' | 'no') => {
    markInteracted()
    setHasWebsite(value)
    setStepError(null)
    shouldFocusStepRef.current = true
    trackEvent('website_intake_option_select', {
      form_name: FORM_NAME,
      step_id: 'current-site',
      option: value,
    })
  }

  const selectContactMethod = (value: 'email' | 'text') => {
    markInteracted()
    setContactMethod(value)
    setStepError(null)
    shouldFocusStepRef.current = true
    trackEvent('website_intake_option_select', {
      form_name: FORM_NAME,
      step_id: 'contact',
      option: value,
    })
  }

  const handleSourceSelect = (value: string) => {
    markInteracted()
    setSource(value)
    trackEvent('website_intake_source_select', {
      form_name: FORM_NAME,
      source: value,
    })
  }

  const handleStepKeyboardNavigation = (
    event: KeyboardEvent<HTMLFormElement>,
  ) => {
    if (event.defaultPrevented || isSubmitting) return
    if (event.nativeEvent.isComposing) return
    if (event.altKey || event.ctrlKey || event.metaKey) return

    if (event.key === 'Enter') {
      event.preventDefault()
      handleNext()
      return
    }

    if (STEP_FORWARD_KEYS.has(event.key)) {
      if (isTextEditingTarget(event.target)) return
      event.preventDefault()
      handleNext()
      return
    }

    if (STEP_BACK_KEYS.has(event.key)) {
      if (stepIndex === 0 || isTextEditingTarget(event.target)) return
      event.preventDefault()
      handleBack()
    }
  }

  const handleFinalSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleNext()
  }

  const handleBookingClick = () => {
    trackEvent('website_intake_booking_click', {
      form_name: FORM_NAME,
      form_location: 'success_screen',
    })
    trackBookCallClick('book a 30 min zoom with prism', 'website intake success')
  }

  const fieldClassName =
    'min-h-14 border-white/12 bg-black/40 px-4 text-[1rem] text-[#F5F0E8] placeholder:text-[#6E6860] focus-visible:border-[#D8BC79]/65 focus-visible:ring-[#D8BC79]/35 focus-visible:ring-offset-0'

  const renderOptionCard = ({
    value,
    label,
    icon,
    selected,
    onSelect,
    stepId,
    delay,
    autofocus,
  }: {
    value: string
    label: string
    icon?: string
    selected: boolean
    onSelect: (value: string) => void
    stepId: string
    delay: number
    autofocus?: boolean
  }) => {
    const optionKey = `${stepId}:${value}`
    const isHovered = hoveredOption === optionKey

    return (
      <button
        key={value}
        type="button"
        data-selected={selected}
        data-testid={`intake-option-${stepId}-${value}`}
        data-step-autofocus={autofocus ? 'true' : undefined}
        onMouseEnter={() => setHoveredOption(optionKey)}
        onMouseLeave={() => setHoveredOption(null)}
        onFocus={() => setHoveredOption(optionKey)}
        onBlur={() => setHoveredOption(null)}
        onClick={() => onSelect(value)}
        className={cn(styles.optionCard)}
        style={{ animationDelay: `${delay}ms` }}
      >
        {icon ? (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center">
            <LordIcon src={icon} size={44} active={isHovered || selected} />
          </span>
        ) : null}
        <span className="text-pretty text-[1.02rem] font-medium leading-snug text-[#F5F0E8]">
          {label}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            'ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
            selected ? 'border-[#F5F0E8]/80 bg-[#F5F0E8]' : 'border-white/20',
          )}
        >
          {selected ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M1.5 5.5L4 8L8.5 2"
                stroke="#0a0a0a"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </span>
      </button>
    )
  }

  const renderStepBody = () => {
    switch (currentStep) {
      case 'why':
        return (
          <div className="grid gap-3">
            {WHY_OPTIONS.map((option, index) =>
              renderOptionCard({
                value: option.value,
                label: option.label,
                icon: option.icon,
                selected: why === option.value,
                onSelect: selectWhy,
                stepId: 'why',
                delay: index * 60,
                autofocus: option.value === (why || WHY_OPTIONS[0].value),
              }),
            )}
            <FieldError error={stepError?.field === 'why' ? stepError.message : ''} id="why-error" />
          </div>
        )

      case 'timeline':
        return (
          <div className="grid gap-3">
            {TIMELINE_OPTIONS.map((option, index) =>
              renderOptionCard({
                value: option.value,
                label: option.label,
                icon: option.icon,
                selected: timeline === option.value,
                onSelect: selectTimeline,
                stepId: 'timeline',
                delay: index * 60,
                autofocus:
                  option.value === (timeline || TIMELINE_OPTIONS[0].value),
              }),
            )}
            <FieldError
              error={stepError?.field === 'timeline' ? stepError.message : ''}
              id="timeline-error"
            />
          </div>
        )

      case 'current-site':
        return (
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {renderOptionCard({
                value: 'yes',
                label: 'Yes, I have a website',
                selected: hasWebsite === 'yes',
                onSelect: () => selectHasWebsite('yes'),
                stepId: 'current-site',
                delay: 0,
                autofocus: !hasWebsite,
              })}
              {renderOptionCard({
                value: 'no',
                label: 'No website yet',
                selected: hasWebsite === 'no',
                onSelect: () => selectHasWebsite('no'),
                stepId: 'current-site',
                delay: 60,
              })}
            </div>
            <FieldError
              error={
                stepError?.field === 'has_website' ? stepError.message : ''
              }
              id="has_website-error"
            />

            {hasWebsite ? (
              <div className="space-y-2">
                <Label htmlFor="intake-site-link" className="sr-only">
                  {hasWebsite === 'yes'
                    ? 'Your current website link'
                    : 'A social media profile, Google Maps listing, or other online link'}
                </Label>
                <Input
                  id="intake-site-link"
                  name="site_link"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  value={siteLink}
                  placeholder={
                    hasWebsite === 'yes'
                      ? 'yourbusiness.com'
                      : 'instagram.com/yourbusiness or maps.google.com/...'
                  }
                  className={fieldClassName}
                  aria-invalid={stepError?.field === 'site_link'}
                  aria-describedby={
                    stepError?.field === 'site_link' ? 'site_link-error' : undefined
                  }
                  data-step-autofocus="true"
                  onChange={(event) => {
                    markInteracted()
                    setSiteLink(event.currentTarget.value)
                    if (stepError?.field === 'site_link') setStepError(null)
                  }}
                />
                <FieldError
                  error={
                    stepError?.field === 'site_link' ? stepError.message : ''
                  }
                  id="site_link-error"
                />
                <p className="font-mono text-[0.72rem] leading-5 text-[#8F877B]">
                  {hasWebsite === 'yes'
                    ? 'We will review it before we reach out.'
                    : 'A social profile, Google Maps listing, or anything online about your business.'}
                </p>
              </div>
            ) : null}
          </div>
        )

      case 'contact':
        return (
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {renderOptionCard({
                value: 'email',
                label: 'Email me',
                selected: contactMethod === 'email',
                onSelect: () => selectContactMethod('email'),
                stepId: 'contact',
                delay: 0,
                autofocus: !contactMethod,
              })}
              {renderOptionCard({
                value: 'text',
                label: 'Text me',
                selected: contactMethod === 'text',
                onSelect: () => selectContactMethod('text'),
                stepId: 'contact',
                delay: 60,
              })}
            </div>
            <FieldError
              error={
                stepError?.field === 'contact_method' ? stepError.message : ''
              }
              id="contact_method-error"
            />

            {contactMethod === 'email' ? (
              <div className="space-y-2">
                <Label htmlFor="intake-email" className="sr-only">
                  Your email address
                </Label>
                <Input
                  id="intake-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  spellCheck={false}
                  value={email}
                  placeholder="you@business.com"
                  className={fieldClassName}
                  aria-invalid={stepError?.field === 'email'}
                  aria-describedby={
                    stepError?.field === 'email' ? 'email-error' : undefined
                  }
                  data-step-autofocus="true"
                  onChange={(event) => {
                    markInteracted()
                    setEmail(event.currentTarget.value)
                    if (stepError?.field === 'email') setStepError(null)
                  }}
                />
                <FieldError
                  error={stepError?.field === 'email' ? stepError.message : ''}
                  id="email-error"
                />
              </div>
            ) : null}

            {contactMethod === 'text' ? (
              <div className="space-y-2">
                <Label htmlFor="intake-phone" className="sr-only">
                  Your phone number
                </Label>
                <Input
                  id="intake-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  placeholder="(555) 123-4567"
                  className={fieldClassName}
                  aria-invalid={stepError?.field === 'phone'}
                  aria-describedby={
                    stepError?.field === 'phone' ? 'phone-error' : undefined
                  }
                  data-step-autofocus="true"
                  onChange={(event) => {
                    markInteracted()
                    setPhone(event.currentTarget.value)
                    if (stepError?.field === 'phone') setStepError(null)
                  }}
                />
                <FieldError
                  error={stepError?.field === 'phone' ? stepError.message : ''}
                  id="phone-error"
                />
              </div>
            ) : null}

            <div className="space-y-3 border-t border-white/10 pt-5">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#8F877B]">
                Optional: how did you hear about us?
              </p>
              <div className="flex flex-wrap gap-2">
                {SOURCE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSourceSelect(option)}
                    data-selected={source === option}
                    className={cn(
                      'rounded-full border px-4 py-2 font-mono text-[0.74rem] uppercase tracking-[0.1em] transition-colors',
                      source === option
                        ? 'border-[#F5F0E8]/70 bg-[#F5F0E8]/10 text-[#F5F0E8]'
                        : 'border-white/14 text-[#B8AFA2] hover:border-white/28 hover:text-[#F5F0E8]',
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
    }
  }

  const heading =
    currentStep === 'why'
      ? 'Why do you want a new website?'
      : currentStep === 'timeline'
        ? 'When do you want your new website live?'
        : currentStep === 'current-site'
          ? 'Do you have a current website?'
          : 'How would you like us to reach you?'

  const helper =
    currentStep === 'why'
      ? 'Tap one. We will move you to the next question.'
      : currentStep === 'timeline'
        ? 'This helps us scope the first build sprint.'
        : currentStep === 'current-site'
          ? 'A link is enough. We will review it before we reply.'
          : 'We reply within 24 hours on the channel you pick.'

  if (isSuccess) {
    return (
      <div
        className={cn(
          styles.frame,
          styles.scanlines,
          'mx-auto min-h-[min(680px,calc(100dvh-8rem))] max-w-[680px] border border-white/10 bg-[#080808] p-6 sm:p-10',
        )}
        data-testid="intake-success"
      >
        <div className={styles.noiseField} aria-hidden="true" />
        <span className={styles.corner} data-corner="tl" aria-hidden="true" />
        <span className={styles.corner} data-corner="tr" aria-hidden="true" />
        <span className={styles.corner} data-corner="bl" aria-hidden="true" />
        <span className={styles.corner} data-corner="br" aria-hidden="true" />

        <div className="relative z-10 flex min-h-[inherit] flex-col justify-center py-10">
          <div className={cn(styles.stepBody, 'space-y-8 text-center')}>
            <div className="space-y-3">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[#D8BC79]">
                Success! Thank you!
              </p>
              <h2 className="text-balance text-[clamp(1.8rem,5vw,2.8rem)] font-medium leading-[1.05] tracking-[-0.04em] text-[#F5F0E8]">
                Prism will reach out to you within 24 hours.
              </h2>
            </div>

            <div
              className={cn(
                styles.bookingCard,
                'space-y-4 border border-[#D8BC79]/28 bg-[#D8BC79]/[0.04] p-6 text-center',
              )}
            >
              <div className="flex justify-center">
                <LordIcon
                  src="/lordicon/appointment-schedule.json"
                  size={56}
                  playOnMount
                />
              </div>
              <p className="text-[1.05rem] font-medium text-[#F5F0E8]">
                In a hurry to start?
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBookingClick}
                className="inline-flex min-h-12 items-center justify-center border border-[#F5F0E8]/70 bg-[#F5F0E8] px-7 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-[#0a0a0a] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-24px_rgba(245,240,232,0.6)]"
              >
                Book a 30 min Zoom with Prism
              </a>
              <p className="mx-auto max-w-sm font-mono text-[0.7rem] leading-5 text-[#8F877B]">
                If you do not book now, we will reach out on your preferred
                channel and share the booking link.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      id={FORM_NAME}
      name={FORM_NAME}
      className={cn(
        styles.frame,
        styles.scanlines,
        'mx-auto min-h-[min(680px,calc(100dvh-8rem))] max-w-[680px] border border-white/10 bg-[#080808] p-6 sm:p-10',
      )}
      action={FORM_ACTION}
      method="POST"
      noValidate
      onSubmit={handleFinalSubmit}
      onKeyDown={handleStepKeyboardNavigation}
      data-testid="website-intake-form"
    >
      <div className={styles.noiseField} aria-hidden="true" />
      <span className={styles.corner} data-corner="tl" aria-hidden="true" />
      <span className={styles.corner} data-corner="tr" aria-hidden="true" />
      <span className={styles.corner} data-corner="bl" aria-hidden="true" />
      <span className={styles.corner} data-corner="br" aria-hidden="true" />

      <input type="hidden" name="_subject" value="New Website Intake Lead" />
      <input type="hidden" name="form_name" value={FORM_NAME} />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[inherit] flex-col">
        <div className="space-y-4 border-b border-white/10 pb-5">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[#D8BC79]">
              {stepIndex + 1} of {QUESTION_STEP_COUNT}
            </p>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[#8F877B]">
              PRO website intake
            </p>
          </div>
          <div className="h-px w-full overflow-hidden bg-white/10">
            <div
              className="h-full bg-[#D8BC79] transition-[width] duration-300"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center py-10 pb-24 sm:py-14 sm:pb-14">
          <div className={cn(styles.stepBody, 'space-y-7')} key={currentStep}>
            <div className="space-y-3">
              <h1 className="max-w-[16ch] text-balance text-[clamp(1.9rem,6vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.05em] text-[#F5F0E8]">
                {heading}
              </h1>
              <p className="max-w-[36ch] text-pretty font-mono text-[0.82rem] leading-6 text-[#8F877B]">
                {helper}
              </p>
            </div>
            <div className="space-y-4">{renderStepBody()}</div>
          </div>
        </div>

        <div className="sticky bottom-0 z-20 -mx-6 border-t border-white/10 bg-[#080808] px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-5">
          <div className="flex items-center gap-3">
            {stepIndex > 0 ? (
              <Button
                type="button"
                variant="outline"
                className="min-h-12 shrink-0 border-white/14 bg-transparent px-5 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-[#B8AFA2] hover:border-white/28 hover:bg-white/5 hover:text-[#F5F0E8]"
                onClick={handleBack}
              >
                Back
              </Button>
            ) : null}

            <Button
              type="submit"
              className="min-h-12 flex-1 border-[#F5F0E8]/60 bg-[#F5F0E8] px-6 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-[#0a0a0a] hover:bg-white focus-visible:ring-[#F5F0E8]/45"
              disabled={isSubmitting}
            >
              {stepIndex === QUESTION_STEP_COUNT - 1
                ? isSubmitting
                  ? 'Submitting…'
                  : 'Get my new website'
                : 'Continue'}
            </Button>
          </div>

          {submitError ? (
            <Alert className="mt-4 border-[#FF2BEA]/26 bg-[#FF2BEA]/10 text-[#F5F0E8]">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          ) : null}
        </div>
      </div>
    </form>
  )
}
