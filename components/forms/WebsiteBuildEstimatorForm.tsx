'use client'

import type { FocusEvent, FormEvent } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Blocks,
  Building2,
  CalendarClock,
  CalendarDays,
  Check,
  ClipboardCheck,
  ClipboardList,
  Compass,
  Files,
  HelpCircle,
  Layers,
  Leaf,
  Link as LinkIcon,
  Mail,
  MessageSquareText,
  Minus,
  Newspaper,
  Palette,
  PanelTop,
  PenLine,
  Plus,
  Rocket,
  Search,
  UserRound,
  Wand2,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormValidation } from '@/hooks/use-form-validation'
import { cn } from '@/lib/utils'
import {
  trackCTAClick,
  trackEvent,
  trackFormSubmission,
} from '@/utils/analytics'
import { FormspreeOpsFields } from './FormspreeOpsFields'

const FORM_ACTION =
  process.env.NEXT_PUBLIC_WEBSITE_BUILD_FORM_ENDPOINT ||
  'https://formspree.io/f/xpqebnbz'
const FORM_NAME = 'website_build_request'
const FORM_LOCATION = 'websites_estimator'
const DEFAULT_REDIRECT =
  'https://www.design-prism.com/thank-you?source=website-build'
const BASE_PRICE = 300
const EXTRA_PAGE_PRICE = 150
const RUSH_REVIEW_PRICE = 250
const PRICE_FORMULA_VERSION = 'website_build_v1'

const STEPS = [
  'type',
  'pages',
  'addons',
  'notes',
  'link',
  'timeline',
  'contact',
  'review',
] as const

const WEBSITE_TYPES = [
  { label: 'Tiny landing page', icon: PanelTop },
  { label: 'Business website', icon: Building2 },
  { label: 'Portfolio or personal site', icon: UserRound },
  { label: 'Launch or event page', icon: Rocket },
  { label: 'Not sure yet', icon: Compass },
] as const

const ADD_ONS = [
  {
    id: 'copywriting',
    label: 'Prism copywriting',
    description: 'We shape concise launch copy from your notes.',
    price: 200,
    icon: PenLine,
  },
  {
    id: 'brand-direction',
    label: 'Light brand direction',
    description: 'A simple type, color, and visual direction pass.',
    price: 150,
    icon: Palette,
  },
  {
    id: 'seo-basics',
    label: 'SEO launch basics',
    description: 'Titles, descriptions, headings, and share image basics.',
    price: 200,
    icon: Search,
  },
  {
    id: 'custom-form',
    label: 'Custom form or intake',
    description: 'One polished request, lead, or booking form.',
    price: 150,
    icon: ClipboardList,
  },
  {
    id: 'cms-blog',
    label: 'CMS or blog editing',
    description: 'A simple editing path for posts or pages.',
    price: 400,
    icon: Newspaper,
  },
  {
    id: 'motion-art-direction',
    label: 'Expressive motion',
    description: 'Subtle motion or art direction beyond the base build.',
    price: 250,
    icon: Wand2,
  },
] as const

const TIMELINE_OPTIONS = [
  {
    value: 'flexible',
    label: 'Flexible',
    detail: 'Best fit for thoughtful small builds.',
    rush: false,
    icon: Leaf,
  },
  {
    value: 'within-30-days',
    label: 'Within 30 days',
    detail: 'Good when assets are ready.',
    rush: false,
    icon: CalendarDays,
  },
  {
    value: 'rush-review',
    label: 'ASAP / rush review',
    detail: `Adds ${formatCurrency(RUSH_REVIEW_PRICE)} if accepted.`,
    rush: true,
    icon: Zap,
  },
  {
    value: 'not-sure',
    label: 'Not sure yet',
    detail: 'We will recommend the calmest path.',
    rush: false,
    icon: HelpCircle,
  },
] as const

type StepId = (typeof STEPS)[number]
type ErrorMap = Record<string, string>

const STEP_ICONS: Record<StepId, LucideIcon> = {
  type: Layers,
  pages: Files,
  addons: Blocks,
  notes: MessageSquareText,
  link: LinkIcon,
  timeline: CalendarClock,
  contact: Mail,
  review: ClipboardCheck,
}

const OPTIONAL_STEPS = new Set<StepId>(['notes', 'link'])
type ValidFieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement

function formatCurrency(value: number) {
  return `$${value.toLocaleString('en-US')}`
}

function isFieldElement(element: Element): element is ValidFieldElement {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement
  )
}

function normalizeUrl(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (/^[a-zA-Z][a-zA-Z\d+.-]*:\/\//.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

function isValidUrl(value: string) {
  try {
    const parsed = new URL(value)
    return Boolean(parsed.hostname)
  } catch {
    return false
  }
}

function getStepFields(stepId: StepId): readonly string[] {
  switch (stepId) {
    case 'notes':
      return ['project_notes']
    case 'link':
      return ['existing_link']
    case 'contact':
      return ['business_name', 'full_name', 'email']
    default:
      return []
  }
}

function getValidationErrorType(field?: ValidFieldElement) {
  if (!field) return 'required'
  if (field.validity.valueMissing) return 'required'
  if (field.validity.typeMismatch || field.validity.patternMismatch) {
    return 'invalid_format'
  }
  if (field.validity.customError) return 'custom'
  return 'invalid'
}

function FieldError({ error, id }: { error: string; id: string }) {
  if (!error) return null

  return (
    <p
      id={id}
      className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[#ff92d5]"
      aria-live="polite"
    >
      {error}
    </p>
  )
}

function OptionIcon({ icon: Icon, active }: { icon: LucideIcon; active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-[border-color,background-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
        active
          ? 'border-[#d8bc79]/45 bg-[#d8bc79]/15 text-[#d8bc79] shadow-[0_0_22px_-12px_rgba(216,188,121,0.9)]'
          : 'border-white/12 bg-white/[0.03] text-[#b8afa2]',
      )}
    >
      <Icon className="h-4 w-4" />
    </span>
  )
}

export default function WebsiteBuildEstimatorForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const hasTrackedStartRef = useRef(false)
  const previousEstimateRef = useRef<number | null>(null)

  const [stepIndex, setStepIndex] = useState(0)
  const [websiteType, setWebsiteType] = useState('')
  const [pageCount, setPageCount] = useState(1)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [projectNotes, setProjectNotes] = useState('')
  const [existingLink, setExistingLink] = useState('')
  const [timeline, setTimeline] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [redirectUrl, setRedirectUrl] = useState(DEFAULT_REDIRECT)
  const [manualErrors, setManualErrors] = useState<ErrorMap>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  const currentStep = STEPS[stepIndex]
  const isReviewStep = currentStep === 'review'
  const progress = Math.round(((stepIndex + 1) / STEPS.length) * 100)

  const addOnTotal = useMemo(
    () =>
      ADD_ONS.filter((addOn) => selectedAddOns.includes(addOn.id)).reduce(
        (sum, addOn) => sum + addOn.price,
        0,
      ),
    [selectedAddOns],
  )
  const selectedAddOnLabels = useMemo(
    () =>
      ADD_ONS.filter((addOn) => selectedAddOns.includes(addOn.id)).map(
        (addOn) => addOn.label,
      ),
    [selectedAddOns],
  )
  const selectedTimeline = TIMELINE_OPTIONS.find(
    (option) => option.value === timeline,
  )
  const extraPageTotal = Math.max(0, pageCount - 1) * EXTRA_PAGE_PRICE
  const rushTotal = selectedTimeline?.rush ? RUSH_REVIEW_PRICE : 0
  const estimatedTotal = BASE_PRICE + extraPageTotal + addOnTotal + rushTotal
  const estimateHigh = estimatedTotal + 300
  const estimateRange = `${formatCurrency(estimatedTotal)}-${formatCurrency(
    estimateHigh,
  )}`

  const { getError, handleBlur, handleSubmit, isSubmitting, validateFields } =
    useFormValidation({
      onValidSubmit: async (form) => {
        setSubmitError(null)
        trackEvent('website_build_submit_attempt', {
          form_name: FORM_NAME,
          form_location: FORM_LOCATION,
          estimated_total: estimatedTotal,
          page_count: pageCount,
          add_on_count: selectedAddOns.length,
          rush_review: selectedTimeline?.rush === true,
        })

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: new FormData(form),
          })

          if (!response.ok) {
            trackEvent('website_build_submit_error', {
              form_name: FORM_NAME,
              form_location: FORM_LOCATION,
              reason: 'non_ok_response',
              status: response.status,
            })
            setSubmitError("We couldn't submit right now. Try again?")
            return
          }
        } catch (error) {
          console.error('website build form submission failed:', error)
          trackEvent('website_build_submit_error', {
            form_name: FORM_NAME,
            form_location: FORM_LOCATION,
            reason: 'network_failure',
          })
          setSubmitError("We couldn't submit right now. Try again?")
          return
        }

        trackEvent('website_build_submit_success', {
          form_name: FORM_NAME,
          form_location: FORM_LOCATION,
          estimated_total: estimatedTotal,
          page_count: pageCount,
          add_on_count: selectedAddOns.length,
          rush_review: selectedTimeline?.rush === true,
        })
        trackFormSubmission(FORM_NAME, FORM_LOCATION, {
          lead_type: FORM_NAME,
          value: estimatedTotal,
          currency: 'USD',
          conversionMode: 'pending',
        })
        router.push('/thank-you?source=website-build')
      },
    })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRedirectUrl(`${window.location.origin}/thank-you?source=website-build`)
    }
  }, [])

  useEffect(() => {
    if (!hasTrackedStartRef.current) return
    if (previousEstimateRef.current === estimatedTotal) return

    previousEstimateRef.current = estimatedTotal
    trackEvent('website_build_estimate_update', {
      form_name: FORM_NAME,
      form_location: FORM_LOCATION,
      estimated_total: estimatedTotal,
      page_count: pageCount,
      add_on_count: selectedAddOns.length,
      rush_review: selectedTimeline?.rush === true,
      step_id: currentStep,
    })
  }, [
    currentStep,
    estimatedTotal,
    pageCount,
    selectedAddOns.length,
    selectedTimeline?.rush,
  ])

  const markStarted = useCallback(() => {
    if (hasTrackedStartRef.current) return

    hasTrackedStartRef.current = true
    previousEstimateRef.current = estimatedTotal
    trackEvent('website_build_estimator_start', {
      form_name: FORM_NAME,
      form_location: FORM_LOCATION,
      step_id: currentStep,
      estimated_total: estimatedTotal,
    })
  }, [currentStep, estimatedTotal])

  const clearManualErrors = (names: readonly string[]) => {
    setManualErrors((current) => {
      const next = { ...current }
      names.forEach((name) => {
        delete next[name]
      })
      return next
    })
  }

  const getFieldError = (name: string) => manualErrors[name] || getError(name)
  const renderError = (name: string) => (
    <FieldError error={getFieldError(name)} id={`${name}-error`} />
  )
  const getDescribedBy = (name: string) =>
    getFieldError(name) ? `${name}-error` : undefined

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

  const syncTextFieldValidity = useCallback((field: ValidFieldElement) => {
    const value = field.value.trim()
    let message = ''

    if (field.name === 'existing_link' && value) {
      const normalized = normalizeUrl(value)
      if (normalized !== field.value) field.value = normalized
      if (!isValidUrl(field.value)) message = 'Add a valid URL or leave blank'
    }

    if (field.name === 'business_name' && !value) {
      message = 'Enter your business name'
    }

    if (field.name === 'full_name' && !value) {
      message = 'Enter your name'
    }

    if (field.name === 'email') {
      if (!value) {
        message = 'Enter your email'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = 'Enter a valid email'
      }
    }

    field.setCustomValidity(message)

    if (field.name === 'existing_link') setExistingLink(field.value)
    if (field.name === 'project_notes') setProjectNotes(field.value)
    if (field.name === 'business_name') setBusinessName(field.value)
    if (field.name === 'full_name') setFullName(field.value)
    if (field.name === 'email') setEmail(field.value)
  }, [])

  const handleValidatedBlur = (event: FocusEvent<ValidFieldElement>) => {
    markStarted()
    syncTextFieldValidity(event.currentTarget)
    handleBlur(event)
  }

  const getManualStepError = () => {
    if (currentStep === 'type' && !websiteType) {
      return {
        name: 'website_type',
        message: 'Choose a website type',
      }
    }

    if (currentStep === 'timeline' && !timeline) {
      return {
        name: 'timeline',
        message: 'Choose a timeline',
      }
    }

    return null
  }

  const goToStep = (nextIndex: number) => {
    setSubmitError(null)
    setStepIndex(Math.max(0, Math.min(nextIndex, STEPS.length - 1)))
    formRef.current?.scrollIntoView?.({ block: 'start', behavior: 'smooth' })
  }

  const handleNext = () => {
    markStarted()
    setSubmitError(null)

    const manualError = getManualStepError()
    if (manualError) {
      setManualErrors((current) => ({
        ...current,
        [manualError.name]: manualError.message,
      }))
      trackEvent('website_build_validation_error', {
        form_name: FORM_NAME,
        form_location: FORM_LOCATION,
        step_id: currentStep,
        field_name: manualError.name,
        error_type: 'required',
      })
      return
    }

    clearManualErrors(getStepFields(currentStep))
    const fields = getNamedFields(getStepFields(currentStep))
    fields.forEach(syncTextFieldValidity)

    if (!validateFields(fields)) {
      const invalidField = fields.find((field) => !field.validity.valid)
      trackEvent('website_build_validation_error', {
        form_name: FORM_NAME,
        form_location: FORM_LOCATION,
        step_id: currentStep,
        field_name:
          invalidField?.name || getStepFields(currentStep)[0] || 'unknown',
        error_type: getValidationErrorType(invalidField),
      })
      return
    }

    goToStep(stepIndex + 1)
  }

  const handleBack = () => {
    goToStep(stepIndex - 1)
  }

  const handleFinalSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (!isReviewStep) {
      event.preventDefault()
      handleNext()
      return
    }

    await handleSubmit(event)
  }

  const toggleAddOn = (id: string) => {
    markStarted()
    setSelectedAddOns((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  const selectWebsiteType = (value: string) => {
    markStarted()
    setWebsiteType(value)
    clearManualErrors(['website_type'])
  }

  const selectTimeline = (value: string) => {
    markStarted()
    setTimeline(value)
    clearManualErrors(['timeline'])
  }

  const fieldClassName =
    'min-h-14 border-white/12 bg-black/40 px-4 text-[1rem] text-[#f5f0e8] placeholder:text-[#6e6e68] focus-visible:border-[#d8bc79]/65 focus-visible:ring-[#d8bc79]/30 focus-visible:ring-offset-0'
  const choiceClassName =
    'flex min-h-[64px] w-full justify-between gap-4 border border-white/10 bg-black/30 px-4 py-4 text-left transition-[border-color,background-color,color,box-shadow] duration-200 hover:border-white/22 hover:text-[#f5f0e8] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/35 focus-visible:ring-offset-0'

  const renderStepBody = () => {
    switch (currentStep) {
      case 'type':
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            {WEBSITE_TYPES.map((type) => {
              const isSelected = websiteType === type.label
              return (
                <button
                  key={type.label}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => selectWebsiteType(type.label)}
                  className={cn(
                    choiceClassName,
                    'items-center',
                    isSelected
                      ? 'border-[#d8bc79]/70 bg-[#d8bc79]/10 text-[#f5f0e8] shadow-[0_0_0_1px_rgba(216,188,121,0.16)]'
                      : 'text-[#d6d0c6]',
                  )}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <OptionIcon icon={type.icon} active={isSelected} />
                    <span className="font-mono text-[0.82rem] uppercase tracking-[0.13em]">
                      {type.label}
                    </span>
                  </span>
                  {isSelected ? (
                    <Check
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-[#d8bc79]"
                    />
                  ) : null}
                </button>
              )
            })}
            {renderError('website_type')}
          </div>
        )

      case 'pages':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between border border-white/10 bg-black/30 p-4">
              <div>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#8f877b]">
                  Page count
                </p>
                <p className="mt-2 text-[2.7rem] font-medium leading-none tracking-[-0.06em] text-[#f5f0e8]">
                  {pageCount}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Decrease pages"
                  onClick={() => {
                    markStarted()
                    setPageCount((current) => Math.max(1, current - 1))
                  }}
                >
                  <Minus aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Increase pages"
                  onClick={() => {
                    markStarted()
                    setPageCount((current) => Math.min(8, current + 1))
                  }}
                >
                  <Plus aria-hidden="true" />
                </Button>
              </div>
            </div>
            <p className="font-mono text-[0.86rem] leading-6 text-[#8f877b]">
              The first page is included. Each extra page adds{' '}
              {formatCurrency(EXTRA_PAGE_PRICE)}.
            </p>
          </div>
        )

      case 'addons':
        return (
          <div className="grid gap-3">
            {ADD_ONS.map((addOn) => {
              const isSelected = selectedAddOns.includes(addOn.id)
              return (
                <button
                  key={addOn.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleAddOn(addOn.id)}
                  className={cn(
                    choiceClassName,
                    'items-start',
                    isSelected
                      ? 'border-[#d8bc79]/70 bg-[#d8bc79]/10 text-[#f5f0e8]'
                      : 'text-[#d6d0c6]',
                  )}
                >
                  <span className="flex min-w-0 items-start gap-3">
                    <OptionIcon icon={addOn.icon} active={isSelected} />
                    <span className="min-w-0">
                      <span className="block font-mono text-[0.82rem] uppercase tracking-[0.13em]">
                        {addOn.label}
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-[#8f877b]">
                        {addOn.description}
                      </span>
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[0.82rem] text-[#d8bc79]">
                    +{formatCurrency(addOn.price)}
                  </span>
                </button>
              )
            })}
          </div>
        )

      case 'notes':
        return (
          <div className="space-y-3">
            <Label htmlFor="website-build-notes" className="sr-only">
              Style or reference notes
            </Label>
            <Textarea
              id="website-build-notes"
              name="project_notes"
              value={projectNotes}
              maxLength={800}
              placeholder="A few words about the vibe, references, audience, or what would make this website exciting."
              className="min-h-[190px] border-white/12 bg-black/40 px-4 py-3 text-[1rem] leading-7 text-[#f5f0e8] placeholder:text-[#6e6e68] focus-visible:border-[#d8bc79]/65 focus-visible:ring-[#d8bc79]/30 focus-visible:ring-offset-0"
              onChange={(event) => {
                markStarted()
                setProjectNotes(event.currentTarget.value)
              }}
              onBlur={handleValidatedBlur}
            />
          </div>
        )

      case 'link':
        return (
          <div className="space-y-3">
            <Label htmlFor="website-build-link" className="sr-only">
              Existing site or profile URL
            </Label>
            <Input
              id="website-build-link"
              name="existing_link"
              type="url"
              inputMode="url"
              autoComplete="url"
              value={existingLink}
              placeholder="yourcompany.com or instagram.com/yourname"
              className={fieldClassName}
              aria-invalid={Boolean(getFieldError('existing_link'))}
              aria-describedby={getDescribedBy('existing_link')}
              onChange={(event) => {
                markStarted()
                setExistingLink(event.currentTarget.value)
              }}
              onBlur={handleValidatedBlur}
            />
            {renderError('existing_link')}
            <p className="font-mono text-[0.78rem] leading-6 text-[#8f877b]">
              Optional. A profile, old website, product page, or Google listing
              is enough.
            </p>
          </div>
        )

      case 'timeline':
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            {TIMELINE_OPTIONS.map((option) => {
              const isSelected = timeline === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => selectTimeline(option.value)}
                  className={cn(
                    choiceClassName,
                    'items-start',
                    isSelected
                      ? 'border-[#d8bc79]/70 bg-[#d8bc79]/10 text-[#f5f0e8]'
                      : 'text-[#d6d0c6]',
                  )}
                >
                  <span className="flex min-w-0 items-start gap-3">
                    <OptionIcon icon={option.icon} active={isSelected} />
                    <span className="min-w-0">
                      <span className="block font-mono text-[0.82rem] uppercase tracking-[0.13em]">
                        {option.label}
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-[#8f877b]">
                        {option.detail}
                      </span>
                    </span>
                  </span>
                  {option.rush ? (
                    <span className="shrink-0 font-mono text-[0.78rem] text-[#d8bc79]">
                      +{formatCurrency(RUSH_REVIEW_PRICE)}
                    </span>
                  ) : null}
                </button>
              )
            })}
            {renderError('timeline')}
          </div>
        )

      case 'contact':
        return (
          <div className="grid gap-4">
            <div className="space-y-3">
              <Label htmlFor="website-build-business" className="sr-only">
                Business name
              </Label>
              <Input
                id="website-build-business"
                name="business_name"
                required
                autoComplete="organization"
                value={businessName}
                placeholder="Business or project name"
                className={fieldClassName}
                aria-invalid={Boolean(getFieldError('business_name'))}
                aria-describedby={getDescribedBy('business_name')}
                onChange={(event) => {
                  markStarted()
                  setBusinessName(event.currentTarget.value)
                }}
                onBlur={handleValidatedBlur}
              />
              {renderError('business_name')}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <Label htmlFor="website-build-full-name" className="sr-only">
                  Full name
                </Label>
                <Input
                  id="website-build-full-name"
                  name="full_name"
                  required
                  autoComplete="name"
                  value={fullName}
                  placeholder="Your name"
                  className={fieldClassName}
                  aria-invalid={Boolean(getFieldError('full_name'))}
                  aria-describedby={getDescribedBy('full_name')}
                  onChange={(event) => {
                    markStarted()
                    setFullName(event.currentTarget.value)
                  }}
                  onBlur={handleValidatedBlur}
                />
                {renderError('full_name')}
              </div>
              <div className="space-y-3">
                <Label htmlFor="website-build-email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="website-build-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  spellCheck={false}
                  value={email}
                  placeholder="you@company.com"
                  className={fieldClassName}
                  aria-invalid={Boolean(getFieldError('email'))}
                  aria-describedby={getDescribedBy('email')}
                  onChange={(event) => {
                    markStarted()
                    setEmail(event.currentTarget.value)
                  }}
                  onBlur={handleValidatedBlur}
                />
                {renderError('email')}
              </div>
            </div>
          </div>
        )

      case 'review':
        return (
          <div className="grid gap-3">
            <ReviewRow label="Type" value={websiteType} />
            <ReviewRow label="Pages" value={`${pageCount}`} />
            <ReviewRow
              label="Add-ons"
              value={selectedAddOnLabels.join(', ') || 'None'}
            />
            <ReviewRow
              label="Timeline"
              value={selectedTimeline?.label || 'Not selected'}
            />
            <ReviewRow label="Business" value={businessName} />
            <ReviewRow label="Contact" value={`${fullName} / ${email}`} />
            <div className="border border-[#d8bc79]/20 bg-[#d8bc79]/8 p-4">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[#d8bc79]">
                Estimated review range
              </p>
              <p className="mt-2 text-3xl font-medium tracking-[-0.05em] text-[#f5f0e8]">
                {estimateRange}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#b8afa2]">
                This is not an automatic checkout. Prism reviews the request and
                sends next steps or a payment link only if the project is a fit.
              </p>
            </div>
          </div>
        )
    }
  }

  const heading =
    currentStep === 'type'
      ? 'What are we building?'
      : currentStep === 'pages'
        ? 'How many pages?'
        : currentStep === 'addons'
          ? 'What should we add?'
          : currentStep === 'notes'
            ? 'What should it feel like?'
            : currentStep === 'link'
              ? 'Where can we look?'
              : currentStep === 'timeline'
                ? 'How urgent is it?'
                : currentStep === 'contact'
                  ? 'Where should we reply?'
                  : 'Review your request.'

  const isOptionalStep = OPTIONAL_STEPS.has(currentStep)
  const stepSubtext = isOptionalStep
    ? 'Optional — add detail if it helps, or just continue to skip it.'
    : 'Build an estimate, send the request, and Prism will review it for fit before any payment link is sent.'
  const StepIcon = STEP_ICONS[currentStep]

  return (
    <form
      ref={formRef}
      id={FORM_NAME}
      name={FORM_NAME}
      action={FORM_ACTION}
      method="POST"
      noValidate
      onSubmit={handleFinalSubmit}
      className="relative border border-white/10 bg-[#070707] p-5 shadow-[0_30px_90px_-60px_rgba(216,188,121,0.65)] sm:p-7"
    >
      <input
        type="hidden"
        name="_subject"
        value="New Prism one-time website build request"
      />
      <input type="hidden" name="_redirect" value={redirectUrl} />
      <input type="hidden" name="form_name" value={FORM_NAME} />
      <FormspreeOpsFields formKey="website_build" />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      <input type="hidden" name="website_type" value={websiteType} />
      <input type="hidden" name="page_count" value={pageCount} />
      <input
        type="hidden"
        name="selected_add_ons"
        value={selectedAddOnLabels.join(', ')}
      />
      {selectedAddOnLabels.map((label) => (
        <input key={label} type="hidden" name="add_ons[]" value={label} />
      ))}
      <input type="hidden" name="project_notes" value={projectNotes} />
      <input type="hidden" name="existing_link" value={existingLink} />
      <input
        type="hidden"
        name="timeline"
        value={selectedTimeline?.label || ''}
      />
      <input type="hidden" name="business_name" value={businessName} />
      <input type="hidden" name="full_name" value={fullName} />
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="base_price" value={BASE_PRICE} />
      <input type="hidden" name="extra_page_total" value={extraPageTotal} />
      <input type="hidden" name="add_on_total" value={addOnTotal} />
      <input type="hidden" name="rush_review_total" value={rushTotal} />
      <input type="hidden" name="estimated_total" value={estimatedTotal} />
      <input type="hidden" name="estimated_range_low" value={estimatedTotal} />
      <input type="hidden" name="estimated_range_high" value={estimateHigh} />
      <input type="hidden" name="estimated_range" value={estimateRange} />
      <input
        type="hidden"
        name="price_formula_version"
        value={PRICE_FORMULA_VERSION}
      />

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
        <div className="min-w-0">
          <div className="border-b border-white/10 pb-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#d8bc79]/30 bg-[#d8bc79]/10 text-[#d8bc79]"
                >
                  <StepIcon className="h-4 w-4" />
                </span>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[#d8bc79]">
                  {isReviewStep ? 'Review' : `${stepIndex + 1} of ${STEPS.length}`}
                </p>
              </div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#767068]">
                Starting at {formatCurrency(BASE_PRICE)}
              </p>
            </div>
            <div className="mt-4 h-px w-full overflow-hidden bg-white/10">
              <div
                className="h-full bg-[#d8bc79] transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Mobile-only live estimate: the sidebar is pushed below the fold on small screens. */}
          <div className="mt-5 flex items-center justify-between gap-4 border border-[#d8bc79]/20 bg-[#d8bc79]/[0.06] px-4 py-3 lg:hidden">
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#8f877b]">
              Estimated range
            </span>
            <span
              key={estimateRange}
              className="estimate-flash font-mono text-[1.05rem] font-medium tracking-[-0.02em] text-[#f5f0e8] tabular-nums"
              aria-live="polite"
            >
              {estimateRange}
            </span>
          </div>

          <div className="py-9 sm:py-12">
            <div className="space-y-7">
              <div className="space-y-3">
                {isOptionalStep ? (
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/14 bg-white/[0.03] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#8f877b]">
                    Optional step
                  </span>
                ) : null}
                <h2 className="max-w-[13ch] text-balance font-sans text-[clamp(2rem,7vw,4.1rem)] font-medium leading-[0.96] tracking-[-0.055em] text-[#f5f0e8]">
                  {heading}
                </h2>
                <p className="max-w-xl font-mono text-[0.86rem] leading-6 text-[#8f877b]">
                  {stepSubtext}
                </p>
              </div>

              {renderStepBody()}
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-white/10 pt-5">
            {stepIndex > 0 ? (
              <Button
                type="button"
                variant="outline"
                className="min-h-12 border-white/14 bg-transparent px-4 font-mono text-[0.76rem] uppercase tracking-[0.16em] text-[#d0c8bd] hover:border-white/28 hover:bg-white/5 hover:text-[#f5f0e8]"
                onClick={handleBack}
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                Back
              </Button>
            ) : null}

            {isReviewStep ? (
              <Button
                type="submit"
                className="min-h-12 flex-1 border-[#d8bc79]/60 bg-[#d8bc79]/12 px-5 font-mono text-[0.76rem] uppercase tracking-[0.16em] text-[#f5f0e8] hover:bg-[#d8bc79]/20 focus-visible:ring-[#d8bc79]/40"
                disabled={isSubmitting}
                onClick={() =>
                  trackCTAClick(
                    'submit website build request',
                    'websites estimator',
                  )
                }
              >
                {isSubmitting ? 'Submitting...' : 'Send request'}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                className="min-h-12 flex-1 border-[#d8bc79]/60 bg-[#d8bc79]/12 px-5 font-mono text-[0.76rem] uppercase tracking-[0.16em] text-[#f5f0e8] hover:bg-[#d8bc79]/20 focus-visible:ring-[#d8bc79]/40"
                onClick={handleNext}
              >
                Continue
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
            )}
          </div>

          {submitError ? (
            <Alert className="mt-4 border-[#ff2bea]/30 bg-[#ff2bea]/10 text-[#f5f0e8]">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          ) : null}
        </div>

        <aside className="border border-white/10 bg-black/30 p-4 lg:sticky lg:top-28">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[#8f877b]">
            Estimated review range
          </p>
          <p
            key={estimateRange}
            className="estimate-flash mt-3 text-[2rem] font-medium leading-none tracking-[-0.055em] text-[#f5f0e8] tabular-nums"
            aria-live="polite"
          >
            {estimateRange}
          </p>
          <dl className="mt-5 space-y-2 border-t border-white/10 pt-4 font-mono text-[0.76rem] text-[#a8a096]">
            <div className="flex justify-between gap-4">
              <dt>Base</dt>
              <dd>{formatCurrency(BASE_PRICE)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Extra pages</dt>
              <dd>{formatCurrency(extraPageTotal)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Add-ons</dt>
              <dd>{formatCurrency(addOnTotal)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Rush</dt>
              <dd>{formatCurrency(rushTotal)}</dd>
            </div>
          </dl>
          <p className="mt-5 text-sm leading-6 text-[#8f877b]">
            Final scope is confirmed only after Prism reviews the request.
          </p>
        </aside>
      </div>
    </form>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border border-white/10 bg-black/30 p-3">
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#8f877b]">
        {label}
      </span>
      <span className="max-w-[65%] text-right text-sm leading-6 text-[#f5f0e8]">
        {value || 'Not shared'}
      </span>
    </div>
  )
}
