'use client'

import type {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  MouseEvent,
  ReactNode,
} from 'react'
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CalendarRange,
  Check,
  CircleAlert,
  CircleQuestionMark,
  Compass,
  Globe,
  Hourglass,
  type LucideIcon,
  Megaphone,
  MessageSquareQuote,
  PenLine,
  Zap,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import WaitlistIntakeMonth from '@/components/waitlist/WaitlistIntakeMonth'
import { useFormValidation } from '@/hooks/use-form-validation'
import { appendAttributionToFormData } from '@/lib/marketing-attribution'
import { PRISM_SERVICES } from '@/lib/services'
import {
  CAPACITY_MESSAGE,
  WAITLIST_DRAFT_STORAGE_KEY,
  WAITLIST_DRAFT_TTL_MS,
  WAITLIST_FOCUS_CHOICES,
  WAITLIST_FOCUS_NOT_SURE,
  WAITLIST_FORM_ENDPOINT,
  WAITLIST_FORM_NAME,
  WAITLIST_FORM_SUBJECT,
  WAITLIST_NO_WEBSITE_FIELD,
  WAITLIST_NO_WEBSITE_VALUE,
  WAITLIST_STEPS,
  WAITLIST_THANK_YOU_PATH,
  WAITLIST_TIMING_OPTIONS,
  isWaitlistFocus,
  isWaitlistFocusChoice,
  type WaitlistFocus,
  type WaitlistFocusChoice,
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
  focus: WaitlistFocusChoice[]
  start_timing: WaitlistTiming | ''
  first_name: string
  last_name: string
  email: string
  phone: string
  link_website: string
  link_social: string
  link_other: string
  /** "I don't have a website yet": satisfies the links step on its own. */
  no_website: boolean
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
  no_website: false,
  goals: '',
}

const FOCUS_ICONS: Record<WaitlistFocusChoice, LucideIcon> = {
  website: Globe,
  content: PenLine,
  ads: Megaphone,
  aeo: MessageSquareQuote,
  [WAITLIST_FOCUS_NOT_SURE]: CircleQuestionMark,
}

// One-line service promises from the shared catalog (lib/services.ts), so the
// option cards say exactly what the service pages say. "Not sure yet" is not
// a service, so it carries its own line.
const FOCUS_DESCRIPTIONS: Partial<Record<WaitlistFocusChoice, string>> = {
  ...(Object.fromEntries(
    PRISM_SERVICES.map((service) => [service.id, service.navDescription]),
  ) as Partial<Record<WaitlistFocus, string>>),
  [WAITLIST_FOCUS_NOT_SURE]: 'We suggest where to start.',
}

/**
 * "Not sure yet" is exclusive with the services: choosing it clears them, and
 * choosing a service clears it. Keeps `focus_count` bounded and the answer
 * unambiguous in the inbox.
 */
function normalizeFocus(
  focus: readonly WaitlistFocusChoice[],
): WaitlistFocusChoice[] {
  const services = focus.filter(isWaitlistFocus)
  if (services.length > 0) return Array.from(new Set(services))
  return focus.includes(WAITLIST_FOCUS_NOT_SURE)
    ? [WAITLIST_FOCUS_NOT_SURE]
    : []
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
      ? normalizeFocus(parsed.answers.focus.filter(isWaitlistFocusChoice))
      : []
    const stepIndex =
      typeof parsed.stepIndex === 'number'
        ? Math.min(Math.max(parsed.stepIndex, 0), TOTAL_STEPS - 1)
        : 0
    return {
      answers: {
        ...EMPTY_ANSWERS,
        ...parsed.answers,
        focus,
        no_website: parsed.answers.no_website === true,
      },
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
      className="flex items-center gap-1.5 text-[13px] leading-5 text-destructive"
    >
      <CircleAlert aria-hidden="true" className="size-3.5 shrink-0" />
      {error}
    </p>
  )
}

// 16px on phones so iOS never zooms the page on focus.
const fieldClassName = 'h-12 rounded-xl bg-white/[0.02] px-4 sm:text-[15px]'
const labelClassName = 'text-[13px] text-foreground'
const optionalClassName = 'font-normal text-subtle'

/**
 * shadcn "card choice": the native input stays in the DOM (sr-only) and the
 * label card reflects its state through `has-[:checked]`, so the visual state
 * can never drift from the real form value.
 */
const optionCardClassName =
  'group/option relative flex w-full cursor-pointer items-center gap-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 pr-4 text-left transition-[border-color,background-color,box-shadow] duration-200 hover:border-white/[0.18] hover:bg-white/[0.04] has-[:checked]:border-foreground/50 has-[:checked]:bg-white/[0.06] has-[:checked]:inset-ring-1 has-[:checked]:inset-ring-foreground/20 has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50 motion-reduce:transition-none sm:gap-4 sm:p-3.5 sm:pr-5'
const optionIconClassName =
  'grid size-10 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted-foreground transition-colors duration-200 group-hover/option:text-foreground group-has-[:checked]/option:border-white/20 group-has-[:checked]/option:bg-white/[0.08] group-has-[:checked]/option:text-foreground motion-reduce:transition-none'
const optionTitleClassName =
  'block text-[15px] font-medium leading-6 tracking-[-0.01em] text-foreground'

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

  const toggleFocus = (value: WaitlistFocusChoice) => {
    if (answers.focus.includes(value)) {
      update('focus', answers.focus.filter((item) => item !== value))
      return
    }
    update(
      'focus',
      value === WAITLIST_FOCUS_NOT_SURE
        ? [WAITLIST_FOCUS_NOT_SURE]
        : normalizeFocus([...answers.focus, value]),
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
          if (key === 'focus' || key === WAITLIST_NO_WEBSITE_FIELD) continue
          formData.set(key, String(value))
        }
        formData.delete('focus[]')
        for (const value of answers.focus) formData.append('focus[]', value)
        // Only sent when checked, so existing submissions keep their shape.
        if (answers.no_website) {
          formData.set(WAITLIST_NO_WEBSITE_FIELD, WAITLIST_NO_WEBSITE_VALUE)
        } else {
          formData.delete(WAITLIST_NO_WEBSITE_FIELD)
        }
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
          // Services chosen (0-4); "Not sure yet" counts as none.
          focus_count: answers.focus.filter(isWaitlistFocus).length,
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
          const noWebsiteInput = formRef.current?.elements.namedItem(
            WAITLIST_NO_WEBSITE_FIELD,
          )
          const hasNoWebsite =
            noWebsiteInput instanceof HTMLInputElement
              ? noWebsiteInput.checked
              : answers.no_website
          if (!hasLink && !hasNoWebsite) {
            message = 'Add at least one link, or check the box below'
          }
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

  // The shared "at least one link" rule lives on link_website. A sibling link
  // or the no-website box can satisfy it, so changing either must re-run it
  // and the error clears (or returns) right away.
  const resyncWebsiteRule = (event: FormEvent<ValidFieldElement>) => {
    const websiteField = formRef.current?.elements.namedItem('link_website')
    if (!(websiteField instanceof HTMLInputElement)) return
    syncFieldValidity(websiteField)
    handleInput({
      ...event,
      currentTarget: websiteField,
      target: websiteField,
    } as FormEvent<ValidFieldElement>)
  }

  const handleValidatedInput = (event: FormEvent<ValidFieldElement>) => {
    const field = event.currentTarget
    syncFieldValidity(field)
    handleInput(event)
    if (
      (LINK_FIELD_NAMES as readonly string[]).includes(field.name) &&
      field.name !== 'link_website'
    ) {
      resyncWebsiteRule(event)
    }
  }

  const handleNoWebsiteChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.currentTarget
    markStarted()
    setStepError(null)
    setAnswers((current) => ({
      ...current,
      no_website: checked,
      // Nothing to link yet: drop a half-typed URL so it never ships.
      link_website: checked ? '' : current.link_website,
    }))
    resyncWebsiteRule(event)
  }

  // A blur error grows the step above the footer. If that happened between
  // mousedown and mouseup on Continue/Back, the button would move out from
  // under the pointer and the click would be lost. Keeping focus where it is
  // until the click lands avoids that; submit validates every field anyway.
  const keepFieldFocus = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const describedBy = (name: string) =>
    getError(name) ? `waitlist-${name}-error` : undefined

  const summary = useMemo(() => {
    const focusLabels = WAITLIST_FOCUS_CHOICES.filter((option) =>
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
        <fieldset className="grid min-w-0 gap-2.5">
          <legend className="sr-only">{step.title}</legend>
          {WAITLIST_FOCUS_CHOICES.map((option, index) => {
            const Icon = FOCUS_ICONS[option.value]
            const checked = answers.focus.includes(option.value)
            const labelId = `waitlist-focus-${option.value}-label`
            const description = FOCUS_DESCRIPTIONS[option.value]
            const descriptionId = description
              ? `waitlist-focus-${option.value}-description`
              : undefined
            const isNotSure = option.value === WAITLIST_FOCUS_NOT_SURE
            return (
              <Fragment key={option.value}>
                {isNotSure ? (
                  // Picking "Not sure yet" clears the services (and back), so
                  // set it apart from the multi-select above.
                  <span
                    aria-hidden="true"
                    className="flex items-center gap-3 py-0.5 text-eyebrow text-subtle"
                  >
                    <span className="h-px flex-1 bg-white/[0.08]" />
                    or
                    <span className="h-px flex-1 bg-white/[0.08]" />
                  </span>
                ) : null}
                <label className={optionCardClassName}>
                  <input
                    type="checkbox"
                    name="focus[]"
                    value={option.value}
                    checked={checked}
                    onChange={() => toggleFocus(option.value)}
                    className="sr-only"
                    aria-labelledby={labelId}
                    aria-describedby={descriptionId}
                    data-step-focus={index === 0 ? '' : undefined}
                  />
                  <span className={optionIconClassName} aria-hidden="true">
                    <Icon className="size-[18px]" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span id={labelId} className={optionTitleClassName}>
                      {option.label}
                    </span>
                    {description ? (
                      <span
                        id={descriptionId}
                        className="mt-0.5 block text-[13px] leading-5 text-muted-foreground"
                      >
                        {description}
                      </span>
                    ) : null}
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid size-5 shrink-0 place-items-center rounded-[6px] border border-white/20 bg-white/[0.02] text-transparent transition-colors duration-200 group-has-[:checked]/option:border-primary group-has-[:checked]/option:bg-primary group-has-[:checked]/option:text-primary-foreground motion-reduce:transition-none"
                  >
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                </label>
              </Fragment>
            )
          })}
        </fieldset>
      )
      break
    case 'timing':
      stepBody = (
        <fieldset
          className="grid min-w-0 gap-2.5"
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
                <span className={cn(optionIconClassName, 'size-9')} aria-hidden="true">
                  <Icon className="size-4" strokeWidth={1.75} />
                </span>
                <span className={cn(optionTitleClassName, 'min-w-0 flex-1')}>
                  {option.label}
                </span>
                <span
                  aria-hidden="true"
                  className="grid size-5 shrink-0 place-items-center rounded-full border border-white/20 bg-white/[0.02] transition-colors duration-200 group-has-[:checked]/option:border-primary motion-reduce:transition-none"
                >
                  <span className="size-2.5 scale-0 rounded-full bg-primary transition-transform duration-200 group-has-[:checked]/option:scale-100 motion-reduce:transition-none" />
                </span>
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
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
            <div className="grid content-start gap-2">
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
            <div className="grid content-start gap-2">
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
          <div className="grid content-start gap-2">
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
          <div className="grid content-start gap-2">
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
          <div className="grid content-start gap-2">
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
              disabled={answers.no_website}
              aria-invalid={Boolean(getError('link_website'))}
              aria-describedby={describedBy('link_website') ?? 'waitlist-links-hint'}
              placeholder={
                answers.no_website ? 'No website yet' : 'https://yourcompany.com'
              }
              className={fieldClassName}
              data-step-focus={answers.no_website ? undefined : ''}
            />
            <FieldError
              id="waitlist-link_website-error"
              error={getError('link_website')}
            />
            {/* The escape hatch for owners with no site yet: it satisfies
                the step on its own and ships as no_website=yes. */}
            <label className="group/nosite -ml-1 flex min-h-10 w-fit cursor-pointer items-center gap-2.5 rounded-lg py-1.5 pl-1 pr-2 text-[14px] leading-5 text-muted-foreground transition-colors duration-200 hover:text-foreground has-[:checked]:text-foreground has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50 motion-reduce:transition-none">
              <input
                type="checkbox"
                name={WAITLIST_NO_WEBSITE_FIELD}
                value={WAITLIST_NO_WEBSITE_VALUE}
                checked={answers.no_website}
                onChange={handleNoWebsiteChange}
                className="sr-only"
                data-step-focus={answers.no_website ? '' : undefined}
              />
              <span
                aria-hidden="true"
                className="grid size-5 shrink-0 place-items-center rounded-[6px] border border-white/25 bg-white/[0.02] text-transparent transition-colors duration-200 group-hover/nosite:border-white/40 group-has-[:checked]/nosite:border-primary group-has-[:checked]/nosite:bg-primary group-has-[:checked]/nosite:text-primary-foreground motion-reduce:transition-none"
              >
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              I don&rsquo;t have a website yet
            </label>
          </div>
          <div className="grid content-start gap-2">
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
          <div className="grid content-start gap-2">
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
          <div className="grid content-start gap-2">
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
              className="min-h-[8.5rem] rounded-xl bg-white/[0.02] px-4 py-3 leading-7 sm:text-[15px]"
              data-step-focus=""
            />
            <FieldError id="waitlist-goals-error" error={getError('goals')} />
          </div>
          {summary.length > 0 ? (
            <div className="flex min-w-0 items-start justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] py-3 pl-4 pr-2">
              <div className="min-w-0 pt-0.5">
                <p className="text-eyebrow text-subtle">Your answers</p>
                <p className="mt-2 break-words text-sm leading-6 text-muted-foreground">
                  {summary.join(' · ')}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => goToStep(0)}
                className="shrink-0 text-muted-foreground hover:text-foreground"
              >
                Edit
              </Button>
            </div>
          ) : null}
        </fieldset>
      )
      break
    default: {
      const exhaustive: never = stepId
      stepBody = exhaustive
    }
  }

  const stepHint: ReactNode =
    stepId === 'focus' ? (
      'Pick any that apply.'
    ) : stepId === 'timing' ? (
      <>
        {CAPACITY_MESSAGE.nextIntakeLead} <WaitlistIntakeMonth />.
      </>
    ) : stepId === 'links' ? (
      <span id="waitlist-links-hint">
        {answers.no_website
          ? 'No problem, that’s what we build. Add a social profile if you have one.'
          : 'One link is enough.'}
      </span>
    ) : null

  return (
    <form
      ref={formRef}
      id={WAITLIST_FORM_NAME}
      name={WAITLIST_FORM_NAME}
      action={WAITLIST_FORM_ENDPOINT}
      method="POST"
      noValidate
      onSubmit={handleStepSubmit}
      className="flex scroll-mt-24 flex-col"
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

      <p className="text-eyebrow text-subtle">
        Step {stepIndex + 1} of {TOTAL_STEPS}
      </p>
      {/* Slim spectrum progress: each segment carries its own slice of the
          spectrum, so the light fully refracts on the last step. */}
      <ol
        aria-hidden="true"
        data-waitlist-progress=""
        className="mt-3 grid grid-cols-5 gap-1.5"
      >
        {WAITLIST_STEPS.map((item, index) => (
          <li
            key={item.id}
            data-state={index <= stepIndex ? 'complete' : 'upcoming'}
            className="relative h-1 overflow-hidden rounded-full bg-white/[0.08]"
          >
            <span
              className={cn(
                'absolute inset-0 rounded-full transition-opacity duration-500 motion-reduce:transition-none',
                index <= stepIndex ? 'opacity-100' : 'opacity-0',
              )}
              style={{
                backgroundImage: 'var(--spectrum)',
                backgroundSize: `${TOTAL_STEPS * 100}% 100%`,
                backgroundPosition: `${(index / (TOTAL_STEPS - 1)) * 100}% 50%`,
              }}
            />
          </li>
        ))}
      </ol>

      <div
        key={step.id}
        ref={panelRef}
        className={cn('mt-7 sm:mt-8', styles.stepEnter)}
      >
        <h2 className="text-balance text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.03em] text-foreground sm:text-[1.75rem]">
          {step.title}
        </h2>
        {stepHint ? (
          <p className="mt-2 text-pretty text-[15px] leading-6 text-muted-foreground">
            {stepHint}
          </p>
        ) : null}

        <div className="mt-6">{stepBody}</div>
      </div>

      <div className="mt-8 flex items-center gap-3 border-t border-white/[0.08] pt-6">
        {stepIndex > 0 ? (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onMouseDown={keepFieldFocus}
            onClick={() => goToStep(stepIndex - 1)}
            className="h-12 px-5"
          >
            <ArrowLeft aria-hidden="true" />
            Back
          </Button>
        ) : null}
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          onMouseDown={keepFieldFocus}
          className="group/submit ml-auto h-12 flex-1 px-6 sm:flex-none sm:min-w-[11rem]"
        >
          <span>
            {isLastStep
              ? isSubmitting
                ? 'Saving your spot…'
                : 'Join the waitlist'
              : 'Continue'}
          </span>
          {isLastStep ? (
            <Check aria-hidden="true" />
          ) : (
            <ArrowRight
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/submit:translate-x-0.5 motion-reduce:transition-none"
            />
          )}
        </Button>
      </div>

      {submitError ? (
        <p
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-[15px] leading-6 text-foreground"
        >
          <CircleAlert aria-hidden="true" className="mt-1 size-4 shrink-0 text-destructive" />
          {submitError}
        </p>
      ) : null}
    </form>
  )
}
