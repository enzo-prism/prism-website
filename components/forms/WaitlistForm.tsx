'use client'

import type { FocusEvent, FormEvent, ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CalendarRange,
  Check,
  Compass,
  Globe,
  Hourglass,
  Link2,
  type LucideIcon,
  Megaphone,
  MessageSquare,
  PenLine,
  Target,
  User,
  Zap,
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import WaitlistIntakeMonth from '@/components/waitlist/WaitlistIntakeMonth'
import { useFormValidation } from '@/hooks/use-form-validation'
import { appendAttributionToFormData } from '@/lib/marketing-attribution'
import {
  CAPACITY_MESSAGE,
  WAITLIST_DRAFT_STORAGE_KEY,
  WAITLIST_DRAFT_TTL_MS,
  WAITLIST_FOCUS_OPTIONS,
  WAITLIST_FORM_ENDPOINT,
  WAITLIST_FORM_NAME,
  WAITLIST_FORM_SUBJECT,
  WAITLIST_STEPS,
  WAITLIST_THANK_YOU_PATH,
  WAITLIST_TIMING_OPTIONS,
  isWaitlistFocus,
  type WaitlistFocus,
  type WaitlistStepId,
  type WaitlistTiming,
} from '@/lib/waitlist'
import { cn } from '@/lib/utils'
import { trackEvent, trackFormSubmission } from '@/utils/analytics'
import { FormspreeOpsFields } from './FormspreeOpsFields'
import styles from './WaitlistForm.module.css'

const FORM_LOCATION = 'waitlist_page'
const LINK_FIELD_NAMES = ['link_website', 'link_social', 'link_other'] as const
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TOTAL_STEPS = WAITLIST_STEPS.length

type ValidFieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement

type WaitlistAnswers = {
  focus: WaitlistFocus[]
  start_timing: WaitlistTiming | ''
  first_name: string
  last_name: string
  email: string
  phone: string
  link_website: string
  link_social: string
  link_other: string
  goals: string
}

const EMPTY_ANSWERS: WaitlistAnswers = {
  focus: [],
  start_timing: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  link_website: '',
  link_social: '',
  link_other: '',
  goals: '',
}

const STEP_ICONS: Record<WaitlistStepId, LucideIcon> = {
  focus: Target,
  timing: CalendarDays,
  about: User,
  links: Link2,
  goals: MessageSquare,
}

const FOCUS_ICONS: Record<WaitlistFocus, LucideIcon> = {
  website: Globe,
  content: PenLine,
  ads: Megaphone,
}

const TIMING_ICONS: Record<WaitlistTiming, LucideIcon> = {
  asap: Zap,
  '1_3_months': CalendarDays,
  '3_6_months': CalendarRange,
  '6_plus_months': Hourglass,
  exploring: Compass,
}

type StoredDraft = {
  answers: WaitlistAnswers
  stepIndex: number
  savedAt: number
}

function isFieldElement(element: Element): element is ValidFieldElement {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement
  )
}

function readDraft(): StoredDraft | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(WAITLIST_DRAFT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<StoredDraft>
    if (
      !parsed.savedAt ||
      Date.now() - parsed.savedAt > WAITLIST_DRAFT_TTL_MS ||
      !parsed.answers
    ) {
      window.sessionStorage.removeItem(WAITLIST_DRAFT_STORAGE_KEY)
      return null
    }
    const focus = Array.isArray(parsed.answers.focus)
      ? parsed.answers.focus.filter(isWaitlistFocus)
      : []
    const stepIndex =
      typeof parsed.stepIndex === 'number'
        ? Math.min(Math.max(parsed.stepIndex, 0), TOTAL_STEPS - 1)
        : 0
    return {
      answers: { ...EMPTY_ANSWERS, ...parsed.answers, focus },
      stepIndex,
      savedAt: parsed.savedAt,
    }
  } catch {
    return null
  }
}

function writeDraft(draft: Omit<StoredDraft, 'savedAt'>) {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(
      WAITLIST_DRAFT_STORAGE_KEY,
      JSON.stringify({ ...draft, savedAt: Date.now() }),
    )
  } catch {
    // Storage may be unavailable (private mode); the flow still works in memory.
  }
}

function clearDraft() {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(WAITLIST_DRAFT_STORAGE_KEY)
  } catch {
    // no-op
  }
}

function FieldError({ error, id }: { error: string; id: string }) {
  if (!error) return null
  return (
    <p
      id={id}
      role="alert"
      className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[#d8bc79]"
    >
      {error}
    </p>
  )
}

const fieldClassName =
  'min-h-14 rounded-xl border-white/12 bg-white/[0.03] px-4 font-sans text-[1rem] text-[#f5f0e8] placeholder:text-[#6e6e68] aria-invalid:border-[#d8bc79]/70 focus-visible:border-[#d8bc79]/65 focus-visible:ring-[#d8bc79]/55 focus-visible:ring-offset-0'
const labelClassName =
  'font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#8f877b] sm:tracking-[0.2em]'
const optionalClassName = 'text-[#8f877b] normal-case tracking-[0.04em]'
const optionCardClassName =
  'group flex min-h-14 w-full cursor-pointer items-center gap-4 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-left font-sans text-[1rem] text-[#f5f0e8] transition-[border-color,background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/30 has-[:checked]:border-[#d8bc79]/60 has-[:checked]:bg-[#d8bc79]/10 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#d8bc79]/55 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-black motion-reduce:transition-none'
const optionIconClassName =
  'grid h-10 w-10 shrink-0 place-items-center rounded-[10px] border border-white/12 bg-white/[0.04] text-[#b8afa2] transition-colors duration-300 group-has-[:checked]:border-[#d8bc79]/50 group-has-[:checked]:text-[#f5f0e8] motion-reduce:transition-none'
const primaryButtonClassName =
  'inline-flex min-h-14 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#f5f0e8]/70 bg-[#f5f0e8] px-6 font-sans text-[0.97rem] font-medium tracking-[-0.01em] text-[#050505] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#f5f0e8]/35 focus-visible:ring-offset-4 focus-visible:ring-offset-black active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none sm:w-auto sm:min-w-[11rem]'
const backButtonClassName =
  'inline-flex min-h-12 items-center gap-2 rounded-lg px-3 font-sans text-[0.95rem] text-[#b8afa2] transition-colors hover:text-[#f5f0e8] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black'

type WaitlistFormProps = {
  /** Pre-selected focus from `?focus=` so service pages can hand off intent. */
  initialFocus?: WaitlistFocus[]
}

export default function WaitlistForm({ initialFocus = [] }: WaitlistFormProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const hasStartedRef = useRef(false)
  const hasHydratedDraftRef = useRef(false)
  const [hydrated, setHydrated] = useState(false)
  const viewedStepsRef = useRef<Set<number>>(new Set())
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<WaitlistAnswers>(() => ({
    ...EMPTY_ANSWERS,
    focus: initialFocus,
  }))
  const [stepError, setStepError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const step = WAITLIST_STEPS[stepIndex]
  const stepId: WaitlistStepId = step.id
  const isLastStep = stepIndex === TOTAL_STEPS - 1
  const StepIcon = STEP_ICONS[step.id]

  const trackStep = useCallback(
    (
      eventName: 'waitlist_step_view' | 'waitlist_step_complete',
      index: number,
    ) => {
      trackEvent(eventName, {
        form_name: WAITLIST_FORM_NAME,
        form_location: FORM_LOCATION,
        step: index + 1,
        step_name: WAITLIST_STEPS[index].id,
      })
    },
    [],
  )

  // Restore a same-tab draft once, then report the first view.
  useEffect(() => {
    if (hasHydratedDraftRef.current) return
    hasHydratedDraftRef.current = true
    const draft = readDraft()
    if (draft) {
      setAnswers((current) => ({
        ...draft.answers,
        // A fresh `?focus=` hand-off wins over an older stored selection.
        focus: initialFocus.length > 0 ? initialFocus : draft.answers.focus,
      }))
      setStepIndex(draft.stepIndex)
      hasStartedRef.current = true
    }
    trackEvent('waitlist_form_view', {
      form_name: WAITLIST_FORM_NAME,
      form_location: FORM_LOCATION,
      prefilled_focus: initialFocus.length > 0 ? initialFocus.join(',') : 'none',
      resumed_step: draft ? draft.stepIndex + 1 : undefined,
    })
    setHydrated(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Step view: track once per step, then move focus into the panel. The
  // aria-live announcement below is derived from stepIndex, so it updates on
  // the same render as the step change.
  useEffect(() => {
    // Wait for the draft restore above so a mid-flow refresh reports the step
    // that actually rendered, not a phantom view of step 1.
    if (!hydrated) return
    if (!viewedStepsRef.current.has(stepIndex)) {
      viewedStepsRef.current.add(stepIndex)
      trackStep('waitlist_step_view', stepIndex)
    }
    if (stepIndex === 0 && !hasStartedRef.current) return
    // Keep the step header in view after a transition, then hand focus to
    // the first control so keyboard and screen-reader users land in place.
    const formTop = formRef.current?.getBoundingClientRect().top ?? 0
    if (formTop < 0 || formTop > window.innerHeight * 0.4) {
      const prefersReducedMotion = window.matchMedia?.(
        '(prefers-reduced-motion: reduce)',
      ).matches
      formRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    }
    const target = panelRef.current?.querySelector<HTMLElement>(
      '[data-step-focus]',
    )
    target?.focus({ preventScroll: true })
  }, [hydrated, stepIndex, step.title, trackStep])

  useEffect(() => {
    if (!hydrated) return
    writeDraft({ answers, stepIndex })
  }, [answers, stepIndex, hydrated])

  const markStarted = useCallback(() => {
    if (hasStartedRef.current) return
    hasStartedRef.current = true
    trackEvent('waitlist_form_start', {
      form_name: WAITLIST_FORM_NAME,
      form_location: FORM_LOCATION,
      step: stepIndex + 1,
      step_name: step.id,
    })
  }, [step.id, stepIndex])

  const update = useCallback(
    <K extends keyof WaitlistAnswers>(key: K, value: WaitlistAnswers[K]) => {
      markStarted()
      setStepError(null)
      setAnswers((current) => ({ ...current, [key]: value }))
    },
    [markStarted],
  )

  const toggleFocus = (value: WaitlistFocus) => {
    update(
      'focus',
      answers.focus.includes(value)
        ? answers.focus.filter((item) => item !== value)
        : [...answers.focus, value],
    )
  }

  const {
    getError,
    handleBlur,
    handleInput,
    handleSubmit,
    isSubmitting,
    validateFields,
  } = useFormValidation({
      onValidSubmit: async (form) => {
        setSubmitError(null)
        trackEvent('waitlist_submit_attempt', {
          form_name: WAITLIST_FORM_NAME,
          form_location: FORM_LOCATION,
        })

        const formData = new FormData(form)
        for (const [key, value] of Object.entries(answers)) {
          if (key === 'focus') continue
          formData.set(key, String(value))
        }
        formData.delete('focus[]')
        for (const value of answers.focus) formData.append('focus[]', value)
        appendAttributionToFormData(formData)

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: formData,
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

        trackStep('waitlist_step_complete', stepIndex)
        trackEvent('waitlist_submit_success', {
          form_name: WAITLIST_FORM_NAME,
          form_location: FORM_LOCATION,
          focus_count: answers.focus.length,
        })
        // Pending mode: /waitlist/thank-you mounts LeadSuccessTracker, which
        // consumes this context and fires generate_lead once.
        trackFormSubmission(WAITLIST_FORM_NAME, FORM_LOCATION, {
          lead_type: WAITLIST_FORM_NAME,
        })
        clearDraft()
        router.push(WAITLIST_THANK_YOU_PATH)
      },
    })

  const syncFieldValidity = useCallback(
    (field: ValidFieldElement) => {
      const value = field.value.trim()
      let message = ''
      switch (field.name) {
        case 'first_name':
          if (!value) message = 'Add your first name'
          break
        case 'last_name':
          if (!value) message = 'Add your last name'
          break
        case 'email':
          if (!value) message = 'Add an email so we can reach you'
          else if (!EMAIL_PATTERN.test(value)) message = 'Check the email format'
          break
        case 'link_website': {
          // Read the live inputs: the field being typed into has not landed
          // in state yet when this runs from its own input event.
          const hasLink = LINK_FIELD_NAMES.some((name) => {
            const input = formRef.current?.elements.namedItem(name)
            const liveValue =
              input instanceof HTMLInputElement ? input.value : answers[name]
            return liveValue.trim().length > 0
          })
          if (!hasLink) message = 'Add at least one link'
          break
        }
        case 'goals':
          if (!value) message = 'Tell us what you want to achieve'
          break
        default:
          break
      }
      field.setCustomValidity(message)
    },
    [answers],
  )

  const reportValidationError = (fieldName: string) => {
    trackEvent('waitlist_validation_error', {
      form_name: WAITLIST_FORM_NAME,
      form_location: FORM_LOCATION,
      step: stepIndex + 1,
      step_name: step.id,
      field_name: fieldName,
    })
  }

  const validateCurrentStep = (form: HTMLFormElement) => {
    switch (stepId) {
      case 'focus':
        return true
      case 'timing':
        if (!answers.start_timing) {
          setStepError('Pick the timing that fits best')
          reportValidationError('start_timing')
          panelRef.current
            ?.querySelector<HTMLElement>('input[name="start_timing"]')
            ?.focus({ preventScroll: true })
          return false
        }
        return true
      case 'about':
      case 'links':
      case 'goals': {
        const fields = Array.from(form.elements).filter(isFieldElement).filter(
          (field) => field.type !== 'hidden' && field.name !== '_gotcha',
        )
        fields.forEach(syncFieldValidity)
        const valid = validateFields(fields)
        if (!valid) {
          const firstInvalid = fields.find((field) => !field.validity.valid)
          reportValidationError(firstInvalid?.name ?? step.id)
        }
        return valid
      }
      default: {
        const exhaustive: never = stepId
        return exhaustive
      }
    }
  }

  const goToStep = (nextIndex: number) => {
    setStepError(null)
    setSubmitError(null)
    setStepIndex(Math.min(Math.max(nextIndex, 0), TOTAL_STEPS - 1))
  }

  const handleStepSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    if (!isLastStep) {
      event.preventDefault()
      markStarted()
      if (!validateCurrentStep(form)) return
      trackStep('waitlist_step_complete', stepIndex)
      goToStep(stepIndex + 1)
      return
    }
    Array.from(form.elements).filter(isFieldElement).forEach(syncFieldValidity)
    const goalsField = form.elements.namedItem('goals')
    if (goalsField instanceof HTMLTextAreaElement && !goalsField.validity.valid) {
      reportValidationError('goals')
    }
    await handleSubmit(event)
  }

  const handleValidatedBlur = (event: FocusEvent<ValidFieldElement>) => {
    syncFieldValidity(event.currentTarget)
    handleBlur(event)
  }

  const handleValidatedInput = (event: FormEvent<ValidFieldElement>) => {
    const field = event.currentTarget
    syncFieldValidity(field)
    handleInput(event)
    // The shared "at least one link" rule lives on link_website; typing in
    // either sibling must re-run it so the error clears as soon as any link
    // exists.
    if (
      (LINK_FIELD_NAMES as readonly string[]).includes(field.name) &&
      field.name !== 'link_website'
    ) {
      const websiteField = formRef.current?.elements.namedItem('link_website')
      if (websiteField instanceof HTMLInputElement) {
        syncFieldValidity(websiteField)
        handleInput({
          ...event,
          currentTarget: websiteField,
          target: websiteField,
        } as FormEvent<ValidFieldElement>)
      }
    }
  }

  const describedBy = (name: string) =>
    getError(name) ? `waitlist-${name}-error` : undefined

  const summary = useMemo(() => {
    const focusLabels = WAITLIST_FOCUS_OPTIONS.filter((option) =>
      answers.focus.includes(option.value),
    ).map((option) => option.label)
    const timing = WAITLIST_TIMING_OPTIONS.find(
      (option) => option.value === answers.start_timing,
    )?.label
    return [
      focusLabels.length > 0 ? focusLabels.join(' · ') : null,
      timing ?? null,
      answers.email || null,
    ].filter(Boolean) as string[]
  }, [answers])

  let stepBody: ReactNode
  switch (stepId) {
    case 'focus':
      stepBody = (
        <fieldset className="grid min-w-0 gap-3">
          <legend className="sr-only">{step.title}</legend>
          {WAITLIST_FOCUS_OPTIONS.map((option, index) => {
            const Icon = FOCUS_ICONS[option.value]
            const checked = answers.focus.includes(option.value)
            return (
              <label key={option.value} className={optionCardClassName}>
                <input
                  type="checkbox"
                  name="focus[]"
                  value={option.value}
                  checked={checked}
                  onChange={() => toggleFocus(option.value)}
                  className="sr-only"
                  data-step-focus={index === 0 ? '' : undefined}
                />
                <span className={optionIconClassName} aria-hidden="true">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="flex-1 font-medium">{option.label}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'grid h-6 w-6 place-items-center rounded-full border transition-colors duration-300 motion-reduce:transition-none',
                    checked
                      ? 'border-[#d8bc79] bg-[#d8bc79] text-[#050505]'
                      : 'border-white/20 text-transparent',
                  )}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
              </label>
            )
          })}
        </fieldset>
      )
      break
    case 'timing':
      stepBody = (
        <fieldset
          className="grid min-w-0 gap-3"
          aria-describedby={stepError ? 'waitlist-start_timing-error' : undefined}
        >
          <legend className="sr-only">{step.title}</legend>
          {WAITLIST_TIMING_OPTIONS.map((option, index) => {
            const Icon = TIMING_ICONS[option.value]
            const checked = answers.start_timing === option.value
            return (
              <label key={option.value} className={optionCardClassName}>
                <input
                  type="radio"
                  name="start_timing"
                  value={option.value}
                  checked={checked}
                  onChange={() => update('start_timing', option.value)}
                  className="sr-only"
                  data-step-focus={
                    (answers.start_timing ? checked : index === 0) ? '' : undefined
                  }
                />
                <span className={optionIconClassName} aria-hidden="true">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="flex-1 font-medium">{option.label}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'h-4 w-4 rounded-full border-2 transition-colors duration-300 motion-reduce:transition-none',
                    checked
                      ? 'border-[#d8bc79] bg-[#d8bc79]'
                      : 'border-white/25',
                  )}
                />
              </label>
            )
          })}
          <FieldError id="waitlist-start_timing-error" error={stepError ?? ''} />
        </fieldset>
      )
      break
    case 'about':
      stepBody = (
        <fieldset className="grid min-w-0 gap-5">
          <legend className="sr-only">{step.title}</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="waitlist-first-name" className={labelClassName}>
                First name
              </Label>
              <Input
                id="waitlist-first-name"
                name="first_name"
                required
                autoComplete="given-name"
                value={answers.first_name}
                onChange={(event) => update('first_name', event.target.value)}
                onBlur={handleValidatedBlur}
                onInput={handleValidatedInput}
                aria-invalid={Boolean(getError('first_name'))}
                aria-describedby={describedBy('first_name')}
                className={fieldClassName}
                data-step-focus=""
              />
              <FieldError
                id="waitlist-first_name-error"
                error={getError('first_name')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waitlist-last-name" className={labelClassName}>
                Last name
              </Label>
              <Input
                id="waitlist-last-name"
                name="last_name"
                required
                autoComplete="family-name"
                value={answers.last_name}
                onChange={(event) => update('last_name', event.target.value)}
                onBlur={handleValidatedBlur}
                onInput={handleValidatedInput}
                aria-invalid={Boolean(getError('last_name'))}
                aria-describedby={describedBy('last_name')}
                className={fieldClassName}
              />
              <FieldError
                id="waitlist-last_name-error"
                error={getError('last_name')}
              />
            </div>
          </div>
          <div className="space-y-2">
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
              value={answers.email}
              onChange={(event) => update('email', event.target.value)}
              onBlur={handleValidatedBlur}
              onInput={handleValidatedInput}
              aria-invalid={Boolean(getError('email'))}
              aria-describedby={describedBy('email')}
              placeholder="you@company.com"
              className={fieldClassName}
            />
            <FieldError id="waitlist-email-error" error={getError('email')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="waitlist-phone" className={labelClassName}>
              Phone <span className={optionalClassName}>(optional)</span>
            </Label>
            <Input
              id="waitlist-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={answers.phone}
              onChange={(event) => update('phone', event.target.value)}
              className={fieldClassName}
            />
          </div>
        </fieldset>
      )
      break
    case 'links':
      stepBody = (
        <fieldset className="grid min-w-0 gap-5" aria-describedby="waitlist-links-hint">
          <legend className="sr-only">{step.title}</legend>
          <p
            id="waitlist-links-hint"
            className="text-pretty font-sans text-[0.95rem] leading-6 text-[#b8afa2]"
          >
            One link is enough.
          </p>
          <div className="space-y-2">
            <Label htmlFor="waitlist-link-website" className={labelClassName}>
              Website
            </Label>
            <Input
              id="waitlist-link-website"
              name="link_website"
              type="url"
              inputMode="url"
              autoComplete="url"
              value={answers.link_website}
              onChange={(event) => update('link_website', event.target.value)}
              onBlur={handleValidatedBlur}
              onInput={handleValidatedInput}
              aria-invalid={Boolean(getError('link_website'))}
              aria-describedby={describedBy('link_website') ?? 'waitlist-links-hint'}
              placeholder="https://yourcompany.com"
              className={fieldClassName}
              data-step-focus=""
            />
            <FieldError
              id="waitlist-link_website-error"
              error={getError('link_website')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="waitlist-link-social" className={labelClassName}>
              Social profile
            </Label>
            <Input
              id="waitlist-link-social"
              name="link_social"
              type="url"
              inputMode="url"
              autoComplete="url"
              value={answers.link_social}
              onChange={(event) => update('link_social', event.target.value)}
              onBlur={handleValidatedBlur}
              onInput={handleValidatedInput}
              placeholder="https://instagram.com/yourbrand"
              className={fieldClassName}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="waitlist-link-other" className={labelClassName}>
              Anything else
            </Label>
            <Input
              id="waitlist-link-other"
              name="link_other"
              type="url"
              inputMode="url"
              autoComplete="url"
              value={answers.link_other}
              onChange={(event) => update('link_other', event.target.value)}
              onBlur={handleValidatedBlur}
              onInput={handleValidatedInput}
              placeholder="https://"
              className={fieldClassName}
            />
          </div>
        </fieldset>
      )
      break
    case 'goals':
      stepBody = (
        <fieldset className="grid min-w-0 gap-5">
          <legend className="sr-only">{step.title}</legend>
          <div className="space-y-2">
            <Label htmlFor="waitlist-goals" className={labelClassName}>
              Your goals
            </Label>
            <Textarea
              id="waitlist-goals"
              name="goals"
              required
              rows={4}
              value={answers.goals}
              onChange={(event) => update('goals', event.target.value)}
              onBlur={handleValidatedBlur}
              onInput={handleValidatedInput}
              aria-invalid={Boolean(getError('goals'))}
              aria-describedby={describedBy('goals')}
              placeholder="A sentence or two is plenty."
              className={cn(
                fieldClassName,
                'min-h-[9rem] py-3 leading-7 sm:min-h-[8rem]',
              )}
              data-step-focus=""
            />
            <FieldError id="waitlist-goals-error" error={getError('goals')} />
          </div>
          {summary.length > 0 ? (
            <p className="min-w-0 break-words border-t border-white/10 pt-4 font-sans text-[0.9rem] leading-6 text-[#8f877b]">
              {summary.join(' · ')}{' '}
              <button
                type="button"
                onClick={() => goToStep(0)}
                className="inline-flex min-h-11 items-center rounded-md px-1 align-middle text-[#b8afa2] underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#f5f0e8] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25"
              >
                Edit
              </button>
            </p>
          ) : null}
        </fieldset>
      )
      break
    default: {
      const exhaustive: never = stepId
      stepBody = exhaustive
    }
  }

  return (
    <form
      ref={formRef}
      id={WAITLIST_FORM_NAME}
      name={WAITLIST_FORM_NAME}
      action={WAITLIST_FORM_ENDPOINT}
      method="POST"
      noValidate
      onSubmit={handleStepSubmit}
      className="flex flex-col"
      data-step={step.id}
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

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {`Step ${stepIndex + 1} of ${TOTAL_STEPS}. ${step.title}`}
      </p>

      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#8f877b]">
          Step {stepIndex + 1} of {TOTAL_STEPS}
        </p>
        <ol
          aria-hidden="true"
          className="flex items-center gap-1.5"
        >
          {WAITLIST_STEPS.map((item, index) => (
            <li
              key={item.id}
              className={cn(
                'h-1.5 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none',
                index === stepIndex
                  ? 'w-6 bg-[#d8bc79]'
                  : index < stepIndex
                    ? 'w-1.5 bg-[#f5f0e8]/70'
                    : 'w-1.5 bg-white/20',
              )}
            />
          ))}
        </ol>
      </div>

      <div
        key={step.id}
        ref={panelRef}
        className={cn('mt-6 sm:mt-8', styles.stepEnter)}
      >
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-[10px] border border-white/12 bg-white/[0.04] text-[#d8bc79]"
          >
            <StepIcon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <h2 className="text-balance font-sans text-[clamp(1.5rem,5.5vw,1.9rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[#f5f0e8]">
              {step.title}
            </h2>
            {stepId === 'timing' ? (
              <p className="mt-2 text-pretty font-sans text-[0.95rem] leading-6 text-[#b8afa2]">
                {CAPACITY_MESSAGE.nextIntakeLead} <WaitlistIntakeMonth />.
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-6 sm:mt-8">{stepBody}</div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        {stepIndex > 0 ? (
          <button
            type="button"
            onClick={() => goToStep(stepIndex - 1)}
            className={backButtonClassName}
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          className={primaryButtonClassName}
          disabled={isSubmitting}
        >
          {isLastStep
            ? isSubmitting
              ? 'Saving your spot…'
              : 'Join the waitlist'
            : 'Continue'}
          {isLastStep ? (
            <Check aria-hidden="true" className="h-4 w-4" />
          ) : (
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          )}
        </button>
      </div>

      {submitError ? (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-[#d8bc79]/30 bg-[#d8bc79]/8 px-4 py-3 font-sans text-[0.95rem] text-[#f5f0e8]"
        >
          {submitError}
        </p>
      ) : null}
    </form>
  )
}
