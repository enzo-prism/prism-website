'use client'

import type {
  FocusEvent,
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
  RefObject,
} from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowUpRight, Check, X } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormValidation } from '@/hooks/use-form-validation'
import { paymentLink } from '@/lib/payment-links'
import { cn } from '@/lib/utils'
import {
  setEnhancedConversionUserData,
  trackEvent,
  trackFormSubmission,
} from '@/utils/analytics'
import { FormspreeOpsFields } from './FormspreeOpsFields'

const FORM_ACTION =
  process.env.NEXT_PUBLIC_WEBSITE_BUILD_FORM_ENDPOINT ??
  'https://formspree.io/f/xpqebnbz'
const FORM_NAME = 'website_order'
const FORM_LOCATION = 'website_order_form'
const FORM_KEY = 'website-order'
const ORDER_PRICE = 300
const BRIEF_MAX_LENGTH = 4000
const DRAFT_STORAGE_KEY = 'prism_website_order_draft_v1'

type ValidFieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement

type OrderStatus = 'order' | 'success'

type StepId =
  | 'brand'
  | 'context'
  | 'brief'
  | 'references'
  | 'contact'
  | 'review'

const STEP_ORDER: readonly StepId[] = [
  'brand',
  'context',
  'brief',
  'references',
  'contact',
  'review',
]

const REVIEW_INDEX = STEP_ORDER.indexOf('review')

const STEP_FIELDS: Record<StepId, readonly string[]> = {
  brand: ['brand_name'],
  context: ['audience', 'website_goal'],
  brief: ['project_brief'],
  references: ['reference_links', 'timeline_note'],
  contact: ['full_name', 'email'],
  review: [],
}

const STEP_HEADLINES: Record<StepId, string> = {
  brand: "What's your brand called?",
  context: "Who's it for, and what's the goal?",
  brief: 'Describe the website you want.',
  references: 'Anything we should look at?',
  contact: 'Where do we send it?',
  review: 'Review your order.',
}

const STEP_STRIP_LABELS: Record<Exclude<StepId, 'review'>, string> = {
  brand: 'brand on file',
  context: 'audience + goal',
  brief: 'brief captured',
  references: 'references noted',
  contact: 'contact saved',
}

const FIXED_TERMS = [
  { label: 'Price', value: '$300 flat', gold: true },
  { label: 'Delivery', value: '7 days' },
  { label: 'Iterations', value: 'infinite, until you love it' },
  { label: 'Ownership', value: '100% yours' },
] as const

function isFieldElement(element: Element): element is ValidFieldElement {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement
  )
}

function shouldSkipAutoFocus() {
  return Boolean(
    typeof window !== 'undefined' &&
    window.matchMedia?.('(max-width: 767px)').matches,
  )
}

function countWords(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean)
  return words.length
}

function countLinkTokens(text: string) {
  return text
    .split(/[\s,\n]+/)
    .filter((token) => /(\.|:\/\/)/.test(token) && token.length > 3).length
}

function createOrderReference() {
  const randomId = globalThis.crypto?.randomUUID?.().split('-')[0]
  const fallbackId = Date.now().toString(36)

  return `PRISM-${(randomId ?? fallbackId).toUpperCase()}`
}

/** The flat-$300 order funnel events, now first-class members of `EventType`. */
type OrderEventName =
  | 'website_order_started'
  | 'website_order_step_completed'
  | 'website_order_submitted'
  | 'website_order_begin_checkout'

function trackOrderEvent(
  eventName: OrderEventName,
  params: Record<string, string | number | boolean>,
) {
  trackEvent(eventName, params)
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
const continueButtonClassName =
  'inline-flex min-h-12 items-center justify-center gap-2 border border-[#d8bc79]/60 bg-[#d8bc79]/12 px-7 font-mono text-[0.8rem] uppercase tracking-[0.18em] text-[#f5f0e8] transition-colors duration-200 hover:bg-[#d8bc79]/20 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/40 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none'
const backButtonClassName =
  'inline-flex min-h-12 items-center justify-center gap-2 border border-white/14 bg-white/[0.02] px-5 font-mono text-[0.76rem] uppercase tracking-[0.18em] text-[#b8afa2] transition-colors duration-200 hover:border-white/28 hover:text-[#f5f0e8] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-0 motion-reduce:transition-none'

export default function WebsiteOrderForm() {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)
  const launchButtonRef = useRef<HTMLButtonElement | null>(null)
  const successHeadingRef = useRef<HTMLHeadingElement | null>(null)
  const returnToReviewRef = useRef(false)
  const orderReferenceRef = useRef<string | null>(null)

  const [brandName, setBrandName] = useState('')
  const [audience, setAudience] = useState('')
  const [websiteGoal, setWebsiteGoal] = useState('')
  const [projectBrief, setProjectBrief] = useState('')
  const [referenceLinks, setReferenceLinks] = useState('')
  const [timelineNote, setTimelineNote] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  const [isOpen, setIsOpen] = useState(false)
  // The dialog renders through a portal so `inert` can be applied to the
  // whole page behind it. Kept in state (not a ref) so render can use it.
  const [portalNode, setPortalNode] = useState<HTMLDivElement | null>(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<readonly StepId[]>([])
  const [status, setStatus] = useState<OrderStatus>('order')
  const [submittedBrand, setSubmittedBrand] = useState('')
  const [submittedReference, setSubmittedReference] = useState('')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [hasDraft, setHasDraft] = useState(false)
  const [announcement, setAnnouncement] = useState('')

  const activeStep = STEP_ORDER[stepIndex]

  const { getError, handleBlur, handleSubmit, isSubmitting, validateFields } =
    useFormValidation({
      onValidSubmit: async (form) => {
        setSubmitError(null)

        const orderReference =
          orderReferenceRef.current ?? createOrderReference()
        orderReferenceRef.current = orderReference
        const payload = new FormData(form)
        payload.set('order_reference', orderReference)

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: payload,
          })

          if (!response.ok) {
            setSubmitError("We couldn't place your order right now. Try again?")
            return
          }
        } catch (error) {
          console.error('website order submission failed:', error)
          setSubmitError("We couldn't place your order right now. Try again?")
          return
        }

        trackOrderEvent('website_order_submitted', {
          value: ORDER_PRICE,
          currency: 'USD',
          form_name: FORM_NAME,
          form_location: FORM_LOCATION,
          lead_type: FORM_NAME,
        })

        // The $300 order is the highest-intent lead on the site, so it must
        // register as a real conversion — not just a custom funnel event.
        // `immediate` (not the default `pending`) because this flow shows an
        // in-page success screen and never navigates to a /thank-you route,
        // so the pending-context handoff that other forms rely on would never
        // be consumed. Hash the buyer's email first so Google Ads enhanced
        // conversions can match the click; awaited because gtag's `set` only
        // applies to SUBSEQUENT events. The `.catch` is load-bearing:
        // useFormValidation's onValidSubmit has no catch of its own, so a
        // rejection here would skip everything below — losing the conversion
        // and stranding the buyer on the review step with no error message
        // despite a successful POST.
        await setEnhancedConversionUserData({ email }).catch(() => {})
        trackFormSubmission(FORM_NAME, FORM_LOCATION, {
          conversionMode: 'immediate',
          value: ORDER_PRICE,
          currency: 'USD',
          lead_type: FORM_NAME,
          transaction_id: orderReference,
        })

        setSubmittedBrand(brandName.trim())
        setSubmittedReference(orderReference)
        setStatus('success')
        setAnnouncement(
          `Request received. Reference ${orderReference}. Pay $300 to start the build.`,
        )
        try {
          window.sessionStorage.removeItem(DRAFT_STORAGE_KEY)
        } catch {
          // Ignore storage failures (private mode etc.)
        }
        setHasDraft(false)
      },
    })

  // ------------------------------------------------------------------ portal
  useEffect(() => {
    const node = document.createElement('div')
    node.setAttribute('data-website-order-portal', '')
    document.body.appendChild(node)
    setPortalNode(node)

    return () => {
      node.remove()
    }
  }, [])

  // ------------------------------------------------------------ draft resume
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(DRAFT_STORAGE_KEY)
      if (!raw) return
      const draft = JSON.parse(raw) as {
        values?: Record<string, string>
        stepIndex?: number
        completedSteps?: StepId[]
      }
      const values = draft.values ?? {}
      setBrandName(values.brand_name ?? '')
      setAudience(values.audience ?? '')
      setWebsiteGoal(values.website_goal ?? '')
      setProjectBrief(values.project_brief ?? '')
      setReferenceLinks(values.reference_links ?? '')
      setTimelineNote(values.timeline_note ?? '')
      setFullName(values.full_name ?? '')
      setEmail(values.email ?? '')
      if (
        typeof draft.stepIndex === 'number' &&
        draft.stepIndex >= 0 &&
        draft.stepIndex < STEP_ORDER.length
      ) {
        setStepIndex(draft.stepIndex)
      }
      if (Array.isArray(draft.completedSteps)) {
        setCompletedSteps(
          draft.completedSteps.filter((step) => STEP_ORDER.includes(step)),
        )
      }
      setHasDraft(true)
    } catch {
      // A malformed draft should never block ordering.
    }
  }, [])

  useEffect(() => {
    if (status !== 'order') return
    try {
      window.sessionStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify({
          values: {
            brand_name: brandName,
            audience,
            website_goal: websiteGoal,
            project_brief: projectBrief,
            reference_links: referenceLinks,
            timeline_note: timelineNote,
            full_name: fullName,
            email,
          },
          stepIndex,
          completedSteps,
        }),
      )
    } catch {
      // Ignore storage failures (private mode etc.)
    }
  }, [
    brandName,
    audience,
    websiteGoal,
    projectBrief,
    referenceLinks,
    timelineNote,
    fullName,
    email,
    stepIndex,
    completedSteps,
    status,
  ])

  // ------------------------------------------------------------- open/close
  const openOverlay = useCallback((source: string) => {
    setIsOpen(true)
    trackOrderEvent('website_order_started', {
      form_name: FORM_NAME,
      form_location: FORM_LOCATION,
      source,
    })
  }, [])

  const closeOverlay = useCallback(() => {
    setIsOpen(false)
    if (window.location.hash === '#order') {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search,
      )
    }
    // Restore focus only after the effect cleanup has removed `inert` from
    // the page (focusing an element inside an inert subtree is a no-op).
    requestAnimationFrame(() => {
      launchButtonRef.current?.focus()
    })
  }, [])

  // Deep link: #order opens the flow directly (hero CTA + sticky mobile bar).
  useEffect(() => {
    const maybeOpenFromHash = () => {
      if (window.location.hash === '#order') {
        setIsOpen(true)
        trackOrderEvent('website_order_started', {
          form_name: FORM_NAME,
          form_location: FORM_LOCATION,
          source: 'hash',
        })
      }
    }

    maybeOpenFromHash()
    window.addEventListener('hashchange', maybeOpenFromHash)
    return () => window.removeEventListener('hashchange', maybeOpenFromHash)
  }, [])

  // Scroll lock + make the page behind the dialog inert while open.
  useEffect(() => {
    if (!isOpen) return

    // Lock both scrollers: body overflow alone does not reach the viewport
    // when the root element carries its own overflow styles.
    const { body, documentElement } = document
    const previousBodyOverflow = body.style.overflow
    const previousHtmlOverflow = documentElement.style.overflow
    body.style.overflow = 'hidden'
    documentElement.style.overflow = 'hidden'

    const inertTargets = Array.from(body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement &&
        element !== portalNode &&
        element.tagName !== 'SCRIPT',
    )
    inertTargets.forEach((element) => {
      element.setAttribute('inert', '')
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeOverlay()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      body.style.overflow = previousBodyOverflow
      documentElement.style.overflow = previousHtmlOverflow
      inertTargets.forEach((element) => {
        element.removeAttribute('inert')
      })
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, closeOverlay, portalNode])

  // ------------------------------------------------------- focus management
  useEffect(() => {
    if (!isOpen) return

    if (status === 'success') {
      successHeadingRef.current?.focus()
      return
    }

    const frame = requestAnimationFrame(() => {
      const root = overlayRef.current
      if (!root) return

      if (shouldSkipAutoFocus()) {
        // Never flash the keyboard on phones: land on the headline instead.
        const headline = root.querySelector<HTMLElement>(
          '[data-order-step-active] h2',
        )
        headline?.focus()
        return
      }

      const firstField = root.querySelector<HTMLElement>(
        '[data-order-step-active] input:not([type="hidden"]), [data-order-step-active] textarea',
      )
      if (firstField) {
        firstField.focus()
        return
      }

      // Review step has no inputs: focus its headline.
      root.querySelector<HTMLElement>('[data-order-step-active] h2')?.focus()
    })

    return () => cancelAnimationFrame(frame)
  }, [isOpen, stepIndex, status])

  useEffect(() => {
    if (!isOpen || status !== 'order') return
    setAnnouncement(
      `Step ${stepIndex + 1} of ${STEP_ORDER.length}. ${STEP_HEADLINES[activeStep]}`,
    )
  }, [isOpen, stepIndex, status, activeStep])

  // ------------------------------------------------------------- validation
  const syncFieldValidity = useCallback((field: ValidFieldElement) => {
    const value = field.value.trim()
    let message = ''

    switch (field.name) {
      case 'brand_name':
        if (!value) message = 'Enter your brand or business name'
        break
      case 'project_brief':
        if (!value) message = 'Tell us a little about the website you want'
        break
      case 'full_name':
        if (!value) message = 'Enter your name'
        break
      case 'email':
        if (!value) {
          message = 'Enter your email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = 'Enter a valid email'
        }
        break
    }

    field.setCustomValidity(message)
  }, [])

  const handleValidatedBlur = (event: FocusEvent<ValidFieldElement>) => {
    syncFieldValidity(event.currentTarget)
    handleBlur(event)
  }

  const getStepFieldElements = useCallback((stepId: StepId) => {
    const form = formRef.current
    if (!form) return []
    return STEP_FIELDS[stepId]
      .map((name) => form.elements.namedItem(name))
      .filter((element): element is ValidFieldElement =>
        Boolean(element && isFieldElement(element as Element)),
      )
  }, [])

  const validateStep = useCallback(
    (stepId: StepId) => {
      const fields = getStepFieldElements(stepId)
      fields.forEach(syncFieldValidity)
      return validateFields(fields)
    },
    [getStepFieldElements, syncFieldValidity, validateFields],
  )

  // -------------------------------------------------------------- stepping
  const markStepCompleted = useCallback((stepId: StepId) => {
    setCompletedSteps((current) =>
      current.includes(stepId) ? current : [...current, stepId],
    )
  }, [])

  const handleContinue = useCallback(() => {
    if (activeStep === 'review') {
      formRef.current?.requestSubmit()
      return
    }

    if (!validateStep(activeStep)) return

    markStepCompleted(activeStep)
    trackOrderEvent('website_order_step_completed', {
      form_name: FORM_NAME,
      form_location: FORM_LOCATION,
      step_id: activeStep,
      step_index: stepIndex + 1,
    })

    const nextIndex = returnToReviewRef.current ? REVIEW_INDEX : stepIndex + 1
    returnToReviewRef.current = false
    setStepIndex(Math.min(nextIndex, STEP_ORDER.length - 1))
  }, [activeStep, markStepCompleted, stepIndex, validateStep])

  const handleBack = useCallback(() => {
    returnToReviewRef.current = false
    setStepIndex((index) => Math.max(0, index - 1))
  }, [])

  const handleEditFromReview = useCallback((stepId: StepId) => {
    returnToReviewRef.current = true
    setStepIndex(STEP_ORDER.indexOf(stepId))
  }, [])

  const handleFormKeyDown = (event: ReactKeyboardEvent<HTMLFormElement>) => {
    if (event.key !== 'Enter') return
    const target = event.target as HTMLElement

    if (target instanceof HTMLTextAreaElement) {
      // Enter writes a newline; Cmd/Ctrl+Enter advances.
      if (event.metaKey || event.ctrlKey) {
        event.preventDefault()
        handleContinue()
      }
      return
    }

    if (target instanceof HTMLInputElement && target.type !== 'submit') {
      event.preventDefault()
      // On two-field steps, Enter moves to the next field first; only the
      // last field advances the step, so field two never gets skipped.
      const fields = getStepFieldElements(activeStep)
      const index = fields.indexOf(target as ValidFieldElement)
      const nextField = index >= 0 ? fields[index + 1] : undefined
      if (nextField) {
        nextField.focus()
        return
      }
      handleContinue()
    }
  }

  // Keep keyboard focus inside the dialog.
  const handleTrapKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return
    const root = overlayRef.current
    if (!root) return

    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter(
      (element) =>
        !element.closest('[hidden]') && element.offsetParent !== null,
    )
    if (focusables.length === 0) return

    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const active = document.activeElement

    if (event.shiftKey && (active === first || !root.contains(active))) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const handleOrderSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const fields = Array.from(event.currentTarget.elements).filter(
      isFieldElement,
    )
    fields.forEach(syncFieldValidity)

    const firstInvalid = fields.find((field) => !field.validity.valid)
    if (firstInvalid) {
      event.preventDefault()
      const invalidStep = STEP_ORDER.find((stepId) =>
        STEP_FIELDS[stepId].includes(firstInvalid.name),
      )
      if (invalidStep && invalidStep !== activeStep) {
        returnToReviewRef.current = true
        setStepIndex(STEP_ORDER.indexOf(invalidStep))
      }
      // Populate the inline error (and focus) once the step is visible.
      requestAnimationFrame(() => validateFields([firstInvalid]))
      return
    }

    await handleSubmit(event)
  }

  const handlePayClick = () => {
    trackOrderEvent('website_order_begin_checkout', {
      value: ORDER_PRICE,
      currency: 'USD',
      form_name: FORM_NAME,
      form_location: FORM_LOCATION,
    })
  }

  const getDescribedBy = (name: string) =>
    getError(name) ? `${name}-error` : undefined

  // ---------------------------------------------------------------- manifest
  const briefWordCount = countWords(projectBrief)
  const referenceLinkCount = countLinkTokens(referenceLinks)

  const manifestRows = useMemo(
    () =>
      [
        {
          id: 'brand',
          step: 'brand' as const,
          label: 'Site for',
          value: brandName.trim(),
          emptyCommitted: '—',
        },
        {
          id: 'audience',
          step: 'context' as const,
          label: 'Audience',
          value: audience.trim(),
          emptyCommitted: '—',
        },
        {
          id: 'goal',
          step: 'context' as const,
          label: 'Goal',
          value: websiteGoal.trim(),
          emptyCommitted: '—',
        },
        {
          id: 'brief',
          step: 'brief' as const,
          label: 'Brief',
          value: projectBrief.trim()
            ? `${briefWordCount} ${briefWordCount === 1 ? 'word' : 'words'} on file`
            : '',
          emptyCommitted: '—',
        },
        {
          id: 'references',
          step: 'references' as const,
          label: 'References',
          value: referenceLinks.trim()
            ? `${Math.max(referenceLinkCount, 1)} ${referenceLinkCount === 1 ? 'link' : 'links'}`
            : '',
          emptyCommitted: 'none',
        },
        {
          id: 'timeline',
          step: 'references' as const,
          label: 'Timeline',
          value: timelineNote.trim(),
          emptyCommitted: 'flexible',
        },
        {
          id: 'contact',
          step: 'contact' as const,
          label: 'Contact',
          value:
            fullName.trim() && email.trim()
              ? `${fullName.trim()} · ${email.trim()}`
              : fullName.trim() || email.trim(),
          emptyCommitted: '—',
        },
      ].map((row) => ({
        ...row,
        committed: completedSteps.includes(row.step),
      })),
    [
      audience,
      brandName,
      briefWordCount,
      completedSteps,
      email,
      fullName,
      projectBrief,
      referenceLinkCount,
      referenceLinks,
      timelineNote,
      websiteGoal,
    ],
  )

  const committedRowCount = manifestRows.filter(
    (row) => row.committed && (row.value || row.emptyCommitted),
  ).length

  const latestCompletedStep = completedSteps[completedSteps.length - 1]
  const progressValue = status === 'success' ? STEP_ORDER.length : stepIndex
  const progressPercent = Math.round((progressValue / STEP_ORDER.length) * 100)

  const hasProgress =
    hasDraft ||
    completedSteps.length > 0 ||
    Boolean(brandName.trim() || projectBrief.trim() || email.trim())

  // ------------------------------------------------------------------ render
  const overlay =
    portalNode && isOpen
      ? createPortal(
          <div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={
              status === 'success'
                ? 'website-order-success-title'
                : `website-order-step-${activeStep}-title`
            }
            onKeyDown={handleTrapKeyDown}
            className="fixed inset-0 z-[80] flex h-[100dvh] flex-col bg-black text-[#f5f0e8] motion-safe:animate-[order-overlay-in_300ms_cubic-bezier(0.22,1,0.36,1)_both]"
          >
            <p aria-live="polite" className="sr-only">
              {announcement}
            </p>

            {/* Top bar */}
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-6">
              <p className="font-mono text-[0.78rem] font-semibold uppercase tracking-[0.3em] text-[#f5f0e8]">
                Prism
              </p>
              <p className="hidden font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[#8f877b] md:block">
                $300 flat · 7 days
              </p>
              <div className="flex items-center gap-3">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[#8f877b] tabular-nums">
                  {status === 'success' ? (
                    <span className="text-[#d8bc79]">Done</span>
                  ) : (
                    `${String(stepIndex + 1).padStart(2, '0')} / ${String(STEP_ORDER.length).padStart(2, '0')}`
                  )}
                </p>
                <span
                  aria-hidden="true"
                  className="hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#6e6e68] md:inline"
                >
                  esc
                </span>
                <button
                  type="button"
                  onClick={closeOverlay}
                  aria-label="Close order form"
                  className="inline-flex h-11 w-11 items-center justify-center border border-white/14 bg-white/[0.02] text-[#b8afa2] transition-colors hover:border-white/28 hover:text-[#f5f0e8] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/30 motion-reduce:transition-none"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Progress hairline */}
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={STEP_ORDER.length}
              aria-valuenow={progressValue}
              aria-valuetext={
                status === 'success'
                  ? 'order placed'
                  : `step ${stepIndex + 1} of ${STEP_ORDER.length}`
              }
              className="h-px w-full shrink-0 bg-white/10"
            >
              <div
                className="h-px bg-[#d8bc79] transition-[width] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Mobile manifest strip */}
            {status === 'order' ? (
              <div className="flex shrink-0 items-center gap-2 border-b border-white/10 px-4 py-2 lg:hidden">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#8f877b]">
                  On file {committedRowCount}/{manifestRows.length}
                </span>
                {latestCompletedStep && latestCompletedStep !== 'review' ? (
                  <span
                    key={latestCompletedStep}
                    className="truncate font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#d8bc79] motion-safe:animate-[order-commit-in_350ms_cubic-bezier(0.22,1,0.36,1)_both]"
                  >
                    · {STEP_STRIP_LABELS[latestCompletedStep]}
                  </span>
                ) : null}
              </div>
            ) : null}

            {/* Body */}
            <div className="flex min-h-0 flex-1">
              {/* min-w-0: without it, flexbox's min-width:auto keeps this
                  column at its content's intrinsic width and the review
                  step overflows the viewport on phones. */}
              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                {status === 'success' ? (
                  <SuccessPanel
                    submittedBrand={submittedBrand}
                    orderReference={submittedReference}
                    successHeadingRef={successHeadingRef}
                    onPayClick={handlePayClick}
                  />
                ) : (
                  <form
                    ref={formRef}
                    id={FORM_NAME}
                    name={FORM_NAME}
                    action={FORM_ACTION}
                    method="POST"
                    noValidate
                    onSubmit={handleOrderSubmit}
                    onKeyDown={handleFormKeyDown}
                    className="flex min-h-0 flex-1 flex-col"
                  >
                    <input
                      type="hidden"
                      name="_subject"
                      value="New website order — $300"
                    />
                    <input type="hidden" name="form_name" value={FORM_NAME} />
                    <input
                      type="hidden"
                      name="order_value"
                      value={ORDER_PRICE}
                    />
                    <FormspreeOpsFields formKey={FORM_KEY} />
                    <input
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      style={{ display: 'none' }}
                      aria-hidden="true"
                    />

                    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 py-8 sm:px-10 sm:py-10">
                      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center">
                        {/* Step: brand */}
                        <StepSection
                          stepId="brand"
                          activeStep={activeStep}
                          stepIndex={STEP_ORDER.indexOf('brand')}
                          support="The name we put on the build."
                        >
                          <div className="space-y-3">
                            <Label
                              htmlFor="website-order-brand"
                              className={labelClassName}
                            >
                              Brand or business name
                            </Label>
                            <Input
                              id="website-order-brand"
                              name="brand_name"
                              required
                              autoComplete="organization"
                              value={brandName}
                              placeholder="Business or project name"
                              className={fieldClassName}
                              aria-invalid={Boolean(getError('brand_name'))}
                              aria-describedby={getDescribedBy('brand_name')}
                              onChange={(event) =>
                                setBrandName(event.currentTarget.value)
                              }
                              onBlur={handleValidatedBlur}
                            />
                            <FieldError
                              error={getError('brand_name')}
                              id="brand_name-error"
                            />
                          </div>
                        </StepSection>

                        {/* Step: context */}
                        <StepSection
                          stepId="context"
                          activeStep={activeStep}
                          stepIndex={STEP_ORDER.indexOf('context')}
                          support="Both optional. Skip anything you're not sure about."
                        >
                          <div className="grid gap-6">
                            <div className="space-y-3">
                              <Label
                                htmlFor="website-order-audience"
                                className={labelClassName}
                              >
                                What you do{' '}
                                <span className={optionalClassName}>
                                  (optional)
                                </span>
                              </Label>
                              <Input
                                id="website-order-audience"
                                name="audience"
                                value={audience}
                                placeholder="e.g. Family dentistry in Austin"
                                className={fieldClassName}
                                onChange={(event) =>
                                  setAudience(event.currentTarget.value)
                                }
                              />
                            </div>

                            <div className="space-y-3">
                              <Label
                                htmlFor="website-order-goal"
                                className={labelClassName}
                              >
                                What the site is for{' '}
                                <span className={optionalClassName}>
                                  (optional)
                                </span>
                              </Label>
                              <Input
                                id="website-order-goal"
                                name="website_goal"
                                value={websiteGoal}
                                placeholder="e.g. Book more new patients"
                                className={fieldClassName}
                                onChange={(event) =>
                                  setWebsiteGoal(event.currentTarget.value)
                                }
                              />
                            </div>
                          </div>
                        </StepSection>

                        {/* Step: brief */}
                        <StepSection
                          stepId="brief"
                          activeStep={activeStep}
                          stepIndex={STEP_ORDER.indexOf('brief')}
                          support="Pages, style, inspiration, content you already have. The more detail, the better."
                        >
                          <div className="space-y-3">
                            <Label
                              htmlFor="website-order-brief"
                              className={labelClassName}
                            >
                              Describe your website
                            </Label>
                            <Textarea
                              id="website-order-brief"
                              name="project_brief"
                              required
                              maxLength={BRIEF_MAX_LENGTH}
                              value={projectBrief}
                              placeholder="Pages you want, style / vibe, inspiration sites, content you already have, anything that helps us match your vision. The more detail, the better."
                              className="min-h-[180px] border-white/12 bg-black/40 px-4 py-3 text-[1rem] leading-7 text-[#f5f0e8] placeholder:text-[#6e6e68] focus-visible:border-[#d8bc79]/65 focus-visible:ring-[#d8bc79]/30 focus-visible:ring-offset-0 sm:min-h-[240px]"
                              aria-invalid={Boolean(getError('project_brief'))}
                              aria-describedby={
                                getError('project_brief')
                                  ? 'project_brief-error'
                                  : 'project_brief-encouragement'
                              }
                              onChange={(event) =>
                                setProjectBrief(event.currentTarget.value)
                              }
                              onBlur={handleValidatedBlur}
                            />
                            <FieldError
                              error={getError('project_brief')}
                              id="project_brief-error"
                            />
                            <p
                              id="project_brief-encouragement"
                              className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[#8f877b]"
                            >
                              <span
                                aria-hidden="true"
                                className={cn(
                                  'inline-block h-1.5 w-1.5 rounded-full',
                                  projectBrief.length >= 240
                                    ? 'bg-[#d8bc79]'
                                    : 'bg-white/25',
                                )}
                              />
                              {projectBrief.length < 80
                                ? 'A sentence or two is enough to start.'
                                : projectBrief.length < 240
                                  ? 'Good. Detail helps us match your vision.'
                                  : 'Great brief. This is what we build from.'}
                            </p>
                          </div>
                        </StepSection>

                        {/* Step: references */}
                        <StepSection
                          stepId="references"
                          activeStep={activeStep}
                          stepIndex={STEP_ORDER.indexOf('references')}
                          support="Links help us match your taste. A date helps us plan. Both optional."
                        >
                          <div className="grid gap-6">
                            <div className="space-y-3">
                              <Label
                                htmlFor="website-order-links"
                                className={labelClassName}
                              >
                                Links{' '}
                                <span className={optionalClassName}>
                                  (optional)
                                </span>
                              </Label>
                              <Textarea
                                id="website-order-links"
                                name="reference_links"
                                maxLength={800}
                                value={referenceLinks}
                                placeholder="yourcurrentsite.com, sites you love, social profiles…"
                                className="min-h-[96px] border-white/12 bg-black/40 px-4 py-3 text-[1rem] leading-7 text-[#f5f0e8] placeholder:text-[#6e6e68] focus-visible:border-[#d8bc79]/65 focus-visible:ring-[#d8bc79]/30 focus-visible:ring-offset-0"
                                onChange={(event) =>
                                  setReferenceLinks(event.currentTarget.value)
                                }
                              />
                            </div>

                            <div className="space-y-3">
                              <Label
                                htmlFor="website-order-timeline"
                                className={labelClassName}
                              >
                                Timeline note{' '}
                                <span className={optionalClassName}>
                                  (optional)
                                </span>
                              </Label>
                              <Input
                                id="website-order-timeline"
                                name="timeline_note"
                                value={timelineNote}
                                placeholder="e.g. Hoping to launch before next month"
                                className={fieldClassName}
                                onChange={(event) =>
                                  setTimelineNote(event.currentTarget.value)
                                }
                              />
                            </div>
                          </div>
                        </StepSection>

                        {/* Step: contact */}
                        <StepSection
                          stepId="contact"
                          activeStep={activeStep}
                          stepIndex={STEP_ORDER.indexOf('contact')}
                          support="Build updates and your finished site go here."
                        >
                          <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-3">
                              <Label
                                htmlFor="website-order-name"
                                className={labelClassName}
                              >
                                Your name
                              </Label>
                              <Input
                                id="website-order-name"
                                name="full_name"
                                required
                                autoComplete="name"
                                value={fullName}
                                placeholder="Your name"
                                className={fieldClassName}
                                aria-invalid={Boolean(getError('full_name'))}
                                aria-describedby={getDescribedBy('full_name')}
                                onChange={(event) =>
                                  setFullName(event.currentTarget.value)
                                }
                                onBlur={handleValidatedBlur}
                              />
                              <FieldError
                                error={getError('full_name')}
                                id="full_name-error"
                              />
                            </div>

                            <div className="space-y-3">
                              <Label
                                htmlFor="website-order-email"
                                className={labelClassName}
                              >
                                Email
                              </Label>
                              <Input
                                id="website-order-email"
                                name="email"
                                type="email"
                                inputMode="email"
                                required
                                autoComplete="email"
                                spellCheck={false}
                                value={email}
                                placeholder="you@company.com"
                                className={fieldClassName}
                                aria-invalid={Boolean(getError('email'))}
                                aria-describedby={getDescribedBy('email')}
                                onChange={(event) =>
                                  setEmail(event.currentTarget.value)
                                }
                                onBlur={handleValidatedBlur}
                              />
                              <FieldError
                                error={getError('email')}
                                id="email-error"
                              />
                            </div>
                          </div>
                        </StepSection>

                        {/* Step: review */}
                        <StepSection
                          stepId="review"
                          activeStep={activeStep}
                          stepIndex={REVIEW_INDEX}
                          support="Check everything. Edit anything. $300 flat, nothing else to decide."
                        >
                          <div className="border border-white/10 bg-[#070707]">
                            <ul className="divide-y divide-white/10">
                              {manifestRows.map((row, index) => (
                                <li
                                  key={row.id}
                                  className="flex items-center gap-4 px-4 py-3.5 motion-safe:animate-[order-rise_300ms_cubic-bezier(0.22,1,0.36,1)_both] sm:px-5"
                                  style={{ animationDelay: `${index * 50}ms` }}
                                >
                                  <span className="w-24 shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#8f877b] sm:w-28">
                                    {row.label}
                                  </span>
                                  <span className="min-w-0 flex-1 truncate text-[0.95rem] text-[#f5f0e8]">
                                    {row.value || (
                                      <span className="text-[#8f877b]">
                                        {row.emptyCommitted}
                                      </span>
                                    )}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleEditFromReview(row.step)
                                    }
                                    className="shrink-0 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[#8f877b] underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#f5f0e8] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/30 motion-reduce:transition-none"
                                    aria-label={`Edit ${row.label.toLowerCase()}`}
                                  >
                                    Edit
                                  </button>
                                </li>
                              ))}
                            </ul>
                            <div className="grid gap-2 border-t border-white/10 bg-black/40 px-4 py-4 sm:grid-cols-2 sm:px-5">
                              {FIXED_TERMS.map((term, index) => (
                                <p
                                  key={term.label}
                                  className="flex items-baseline gap-3 motion-safe:animate-[order-rise_300ms_cubic-bezier(0.22,1,0.36,1)_both]"
                                  style={{
                                    animationDelay: `${manifestRows.length * 50 + index * 50}ms`,
                                  }}
                                >
                                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#8f877b]">
                                    {term.label}
                                  </span>
                                  <span
                                    className={cn(
                                      'text-[0.9rem]',
                                      'gold' in term && term.gold
                                        ? 'font-medium text-[#d8bc79]'
                                        : 'text-[#f5f0e8]',
                                    )}
                                  >
                                    {term.value}
                                  </span>
                                </p>
                              ))}
                            </div>
                          </div>

                          {submitError ? (
                            <p
                              role="alert"
                              className="mt-5 border border-[#d8bc79]/30 bg-[#d8bc79]/8 px-4 py-3 text-[0.95rem] text-[#f5f0e8]"
                            >
                              {submitError}
                            </p>
                          ) : null}
                        </StepSection>
                      </div>
                    </div>

                    {/* Action bar */}
                    <div className="shrink-0 border-t border-white/10 bg-black px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-10">
                      <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4">
                        {stepIndex > 0 ? (
                          <button
                            type="button"
                            onClick={handleBack}
                            className={backButtonClassName}
                          >
                            <ArrowLeft
                              aria-hidden="true"
                              className="h-3.5 w-3.5"
                            />
                            Back
                          </button>
                        ) : (
                          <span aria-hidden="true" />
                        )}

                        <div className="flex items-center gap-4">
                          <span
                            aria-hidden="true"
                            className="hidden font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#6e6e68] md:inline"
                          >
                            {activeStep === 'review'
                              ? ''
                              : activeStep === 'brief'
                                ? 'cmd/ctrl + enter to continue'
                                : 'press Enter ↵'}
                          </span>
                          {activeStep === 'review' ? (
                            // Distinct keys: without them React reuses the
                            // same DOM node when Continue becomes the submit
                            // button, and the type morph mid-click submits
                            // the form while advancing to review.
                            <button
                              key="place-order"
                              type="submit"
                              disabled={isSubmitting}
                              className={cn(
                                continueButtonClassName,
                                'min-h-14',
                              )}
                            >
                              {isSubmitting
                                ? 'Placing order…'
                                : 'Place my order'}
                              {!isSubmitting ? (
                                <Check aria-hidden="true" className="h-4 w-4" />
                              ) : null}
                            </button>
                          ) : (
                            <button
                              key="continue"
                              type="button"
                              onClick={handleContinue}
                              className={continueButtonClassName}
                            >
                              Continue
                              <ArrowUpRight
                                aria-hidden="true"
                                className="h-4 w-4"
                              />
                            </button>
                          )}
                        </div>
                      </div>
                      {activeStep === 'review' ? (
                        <p className="mx-auto mt-3 w-full max-w-2xl text-center font-mono text-[0.68rem] leading-6 text-[#8f877b]">
                          Flat $300, one time. You pay on the next step to start
                          the build.
                        </p>
                      ) : null}
                    </div>
                  </form>
                )}
              </div>

              {/* Desktop manifest rail */}
              {status === 'order' ? (
                <aside
                  aria-hidden="true"
                  className="hidden w-[340px] shrink-0 flex-col border-l border-white/10 bg-[#070707] lg:flex motion-safe:animate-[order-panel-in_450ms_cubic-bezier(0.22,1,0.36,1)_200ms_both]"
                >
                  <div className="border-b border-white/10 px-6 py-5">
                    <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-[#8f877b]">
                      Order manifest
                    </p>
                    <p className="mt-2 truncate text-[0.95rem] text-[#f5f0e8]">
                      {brandName.trim() || (
                        <span className="text-[#6e6e68]">awaiting input</span>
                      )}
                    </p>
                  </div>
                  <ul className="flex-1 divide-y divide-white/[0.06] overflow-y-auto px-6 py-2">
                    {manifestRows.map((row) => (
                      <li key={row.id} className="py-3.5">
                        <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[#8f877b]">
                          {row.label}
                        </p>
                        <div className="relative mt-1.5">
                          {row.committed ? (
                            <p
                              key={`${row.id}-committed`}
                              className="truncate text-[0.92rem] leading-6 text-[#f5f0e8] motion-safe:animate-[order-commit-in_350ms_cubic-bezier(0.22,1,0.36,1)_both]"
                            >
                              {row.value || (
                                <span className="text-[#8f877b]">
                                  {row.emptyCommitted}
                                </span>
                              )}
                              <span
                                aria-hidden="true"
                                className="absolute -bottom-1 left-0 h-px w-full origin-left motion-safe:animate-[order-commit-underline_1s_cubic-bezier(0.22,1,0.36,1)_both]"
                              />
                            </p>
                          ) : (
                            <p className="text-[0.92rem] leading-6 text-[#6e6e68]">
                              ·
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-white/10 px-6 py-5">
                    <div className="grid gap-2.5">
                      {FIXED_TERMS.map((term) => (
                        <p
                          key={term.label}
                          className="flex items-baseline justify-between gap-3"
                        >
                          <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[#8f877b]">
                            {term.label}
                          </span>
                          <span
                            className={cn(
                              'text-right text-[0.85rem]',
                              'gold' in term && term.gold
                                ? 'font-medium text-[#d8bc79]'
                                : 'text-[#f5f0e8]',
                            )}
                          >
                            {term.value}
                          </span>
                        </p>
                      ))}
                    </div>
                    <p className="mt-5 border-t border-white/10 pt-4 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#8f877b] tabular-nums">
                      {committedRowCount} of {manifestRows.length} on file
                    </p>
                  </div>
                </aside>
              ) : null}
            </div>
          </div>,
          portalNode,
        )
      : null

  return (
    <div id="order" className="scroll-mt-24">
      <div className="relative border border-white/10 bg-[#070707] p-6 shadow-[0_30px_90px_-60px_rgba(216,188,121,0.65)] sm:p-9">
        {status === 'success' ? (
          <>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[#d8bc79]">
              Order received
            </p>
            <h3 className="mt-4 max-w-[16ch] text-balance font-sans text-[clamp(1.8rem,5vw,2.6rem)] font-medium leading-[1.02] tracking-[-0.045em] text-[#f5f0e8]">
              {submittedBrand
                ? `${submittedBrand}'s brief is saved.`
                : 'Your website brief is saved.'}
            </h3>
            <p className="mt-4 max-w-xl text-[1rem] leading-7 text-[#b8afa2]">
              Complete your $300 payment to start the build. We deliver in about
              7 days, then iterate until you love it.
            </p>
            {submittedReference ? (
              <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#8f877b]">
                Reference {submittedReference}
              </p>
            ) : null}
            <a
              href={paymentLink('website')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handlePayClick}
              className={cn(continueButtonClassName, 'mt-7 min-h-14 w-full')}
            >
              Pay $300 to start building
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[#d8bc79]">
                  Website by Prism
                </p>
                <h3 className="mt-4 max-w-[16ch] text-balance font-sans text-[clamp(1.9rem,5.5vw,3rem)] font-medium leading-[0.98] tracking-[-0.05em] text-[#f5f0e8]">
                  Describe it. We build it.
                </h3>
              </div>
              <div className="shrink-0 border border-[#d8bc79]/30 bg-[#d8bc79]/10 px-4 py-3 text-right">
                <p className="font-sans text-[2rem] font-medium leading-none tracking-[-0.05em] text-[#f5f0e8] tabular-nums">
                  $300
                </p>
                <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-[#d8bc79]">
                  Flat · one-time
                </p>
              </div>
            </div>

            <ul className="mt-7 grid gap-2.5 border-t border-white/10 pt-6">
              {FIXED_TERMS.slice(1).map((term) => (
                <li
                  key={term.label}
                  className="flex items-baseline gap-3 text-[0.95rem] leading-7"
                >
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#8f877b]">
                    {term.label}
                  </span>
                  <span className="text-[#d6d0c6]">{term.value}</span>
                </li>
              ))}
            </ul>

            <button
              ref={launchButtonRef}
              type="button"
              onClick={() => openOverlay('launcher')}
              className={cn(continueButtonClassName, 'mt-8 min-h-14 w-full')}
            >
              {hasProgress ? 'Resume your order' : 'Start your website'}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </button>
            <p className="mt-4 text-center font-mono text-[0.68rem] leading-6 text-[#8f877b]">
              {hasProgress
                ? 'Your progress is saved.'
                : 'Takes about 2 minutes. You pay after you submit.'}
            </p>
          </>
        )}
      </div>

      {overlay}
    </div>
  )
}

function StepSection({
  stepId,
  activeStep,
  stepIndex,
  support,
  children,
}: {
  stepId: StepId
  activeStep: StepId
  stepIndex: number
  support: string
  children: ReactNode
}) {
  const isActive = stepId === activeStep

  return (
    <section
      hidden={!isActive}
      data-order-step={stepId}
      data-order-step-active={isActive ? '' : undefined}
      aria-hidden={isActive ? undefined : true}
    >
      <div className="motion-safe:animate-[order-step-in_400ms_cubic-bezier(0.22,1,0.36,1)_both]">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.26em] text-[#8f877b] tabular-nums">
          {String(stepIndex + 1).padStart(2, '0')} —{' '}
          {stepId === 'review' ? 'Review' : 'Question'}
        </p>
        <h2
          id={`website-order-step-${stepId}-title`}
          tabIndex={-1}
          className="mt-4 max-w-[16ch] text-balance font-sans text-[clamp(2rem,6vw,3.6rem)] font-medium leading-[0.98] tracking-[-0.05em] text-[#f5f0e8] focus-visible:outline-hidden"
        >
          {STEP_HEADLINES[stepId]}
        </h2>
        <p className="mt-4 max-w-md font-mono text-[0.8rem] leading-6 text-[#8f877b]">
          {support}
        </p>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}

function SuccessPanel({
  submittedBrand,
  orderReference,
  successHeadingRef,
  onPayClick,
}: {
  submittedBrand: string
  orderReference: string
  successHeadingRef: RefObject<HTMLHeadingElement | null>
  onPayClick: () => void
}) {
  const checklist = [
    { label: 'Brief received', delay: 300 },
    { label: 'Request saved', delay: 900 },
    { label: 'Pay to start the build', delay: 1500 },
  ]

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 py-10 sm:px-10">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[#d8bc79]">
          Order received
        </p>

        <h2
          id="website-order-success-title"
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-4 max-w-[14ch] text-balance font-sans text-[clamp(2.2rem,7vw,4rem)] font-medium leading-[0.98] tracking-[-0.05em] text-[#f5f0e8] focus-visible:outline-hidden"
        >
          Request received.
        </h2>

        <p className="mt-4 max-w-xl text-[1.05rem] leading-7 text-[#b8afa2]">
          {submittedBrand
            ? `We've got your vision for ${submittedBrand}'s website.`
            : "We've got your vision for your new website."}
        </p>

        {orderReference ? (
          <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#8f877b]">
            Reference {orderReference}
          </p>
        ) : null}

        <ul className="mt-9 grid gap-3">
          {checklist.map((item, index) => (
            <li
              key={item.label}
              className="flex items-center gap-3 border border-white/10 bg-[#070707] px-4 py-3.5 motion-safe:animate-[order-rise_400ms_cubic-bezier(0.22,1,0.36,1)_both]"
              style={{ animationDelay: `${item.delay}ms` }}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'inline-flex h-6 w-6 shrink-0 items-center justify-center border',
                  index < 2
                    ? 'border-[#d8bc79]/50 bg-[#d8bc79]/12 text-[#d8bc79]'
                    : 'border-white/14 bg-white/[0.03] text-[#8f877b]',
                )}
              >
                {index < 2 ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                )}
              </span>
              <span className="text-[0.98rem] text-[#f5f0e8]">
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        <a
          href={paymentLink('website')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onPayClick}
          className={cn(
            continueButtonClassName,
            'mt-8 min-h-14 w-full motion-safe:animate-[order-rise_400ms_cubic-bezier(0.22,1,0.36,1)_1500ms_both]',
          )}
        >
          Pay $300 to start building
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>

        <p className="mt-6 max-w-xl text-[0.92rem] leading-7 text-[#8f877b]">
          Live in 7 days. Infinite iterations until you love it. The finished
          site is 100% yours. After launch, add a $100/month care plan or host
          it yourself.
        </p>
      </div>
    </div>
  )
}
