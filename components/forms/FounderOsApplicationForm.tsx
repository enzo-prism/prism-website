'use client'

import type { FormEvent, ReactNode } from 'react'
import { useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Search,
  ShieldAlert,
} from 'lucide-react'

import { FormspreeOpsFields } from './FormspreeOpsFields'
import {
  trackCTAClick,
  trackEvent,
  trackFormSubmission,
} from '@/utils/analytics'

const FORM_ACTION =
  process.env.NEXT_PUBLIC_FOUNDER_OS_FORM_ENDPOINT ||
  'https://formspree.io/f/xkoalapv'
const FORM_NAME = 'founder_os_application'
const FORM_LOCATION = 'founder_os_apply'

/* ------------------------------------------------------------------ */
/* Options                                                            */
/* ------------------------------------------------------------------ */

const BUSINESS_MODELS = [
  'B2B services or consulting',
  'Local or multi-location service business',
  'Healthcare or dental',
  'SaaS or software',
  'E-commerce or consumer brand',
  'Media, community, or education',
  'Other',
] as const

const DECISION_ROLES = [
  'I am the founder or owner and final decision-maker',
  'I am an executive with approval authority',
  'I am leading the evaluation, but others will approve',
  'I am researching this for someone else',
  'I am an advisor, investor, or external partner',
] as const

const OTHER_DECIDERS = [
  'Founder or CEO',
  'COO or operations leader',
  'CTO, IT, or security',
  'Finance',
  'Legal or procurement',
  'Board or investors',
  'Other',
] as const

const TEAM_SIZES = ['1–4', '5–9', '10–24', '25–49', '50–99', '100–249', '250+'] as const

const REVENUES = [
  'Under $1M',
  '$1M–$3M',
  '$3M–$5M',
  '$5M–$10M',
  '$10M–$25M',
  '$25M–$100M',
  'More than $100M',
  'Prefer not to say',
] as const

const INVESTMENT_FIT = [
  'Yes. The investment is already within our range.',
  'Likely. We could approve it with a strong scope and business case.',
  'Possibly. I would need to build the case internally.',
  'No. It is not currently within our range.',
] as const

const BOTTLENECKS = [
  'Finding and reconciling company numbers',
  'Executive reporting and decision prep',
  'Sales pipeline management and follow-up',
  'Marketing and content production',
  'Advertising analysis and optimization',
  'Website updates and conversion work',
  'Customer communication or support',
  'Internal operations and handoffs',
  'Project or account management',
  'Finance and forecasting',
  'Hiring and people operations',
  'Moving information between systems',
  'Other',
] as const

const FREQUENCIES = [
  'Many times per day',
  'Daily',
  'Several times per week',
  'Weekly',
  'Monthly',
  'Irregularly',
] as const

const WEEKLY_HOURS = [
  'Fewer than 5 hours',
  '5–15 hours',
  '16–30 hours',
  '31–60 hours',
  'More than 60 hours',
  'Unknown',
] as const

const CONSEQUENCES = [
  'Slow decisions',
  'Missed or delayed revenue',
  'Expensive labor',
  'Errors and rework',
  'Poor customer experience',
  'Inconsistent brand execution',
  'Founder distraction',
  'Compliance or security exposure',
  'Inability to scale',
  'Other',
] as const

const SYSTEM_GROUPS = [
  { group: 'CRM & sales', items: ['HubSpot', 'Salesforce', 'Pipedrive', 'GoHighLevel'] },
  { group: 'Advertising', items: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'TikTok Ads'] },
  { group: 'Analytics', items: ['GA4', 'Search Console', 'Looker', 'Power BI', 'Tableau'] },
  { group: 'Data', items: ['Spreadsheets', 'BigQuery', 'Snowflake', 'Proprietary database'] },
  { group: 'Communication', items: ['Gmail', 'Outlook', 'Slack', 'Teams', 'WhatsApp', 'Intercom'] },
  { group: 'Knowledge', items: ['Google Drive', 'SharePoint', 'Notion'] },
  { group: 'Project management', items: ['Asana', 'ClickUp', 'Monday', 'Linear'] },
  { group: 'Website & commerce', items: ['Webflow', 'WordPress', 'Shopify', 'Custom CMS'] },
  { group: 'Customer support', items: ['Zendesk', 'Help Scout'] },
  { group: 'Finance', items: ['QuickBooks', 'Xero', 'Stripe'] },
  { group: 'Industry systems', items: ['Dental practice management', 'EHR', 'ERP', 'POS'] },
  { group: 'Other', items: ['Custom or proprietary software'] },
] as const

const SOURCE_EXTRAS = [
  'Several systems must be reconciled',
  'In a spreadsheet',
  'In someone’s head',
  'There is no trusted source yet',
  'Not sure',
] as const

const NUMBER_RELIABILITY = [
  'One trusted system usually provides the answer',
  'Reliable info exists, but spread across several systems',
  'Someone manually assembles the answer',
  'Different systems regularly disagree',
  'Important information is missing or not tracked',
  'Not sure',
] as const

const ACCESS_PATHS = [
  'Yes. We control the relevant systems.',
  'Mostly. Some internal approvals would be required.',
  'Some systems are controlled by external vendors.',
  'We do not know yet.',
  'No.',
] as const

const YES_PROBABLY = ['Yes', 'Probably', 'Not sure', 'No'] as const

const DATA_SENSITIVITY = [
  'Public website and marketing information only',
  'CRM and customer contact information',
  'Private customer communications',
  'Financial or accounting information',
  'Employee or HR information',
  'Healthcare or patient information',
  'Legal or privileged information',
  'Payment-card information',
  'Proprietary intellectual property',
  'Information concerning minors',
  'Not sure',
  'Other',
] as const

const SENSITIVE_FLAGS = new Set<string>([
  'Private customer communications',
  'Financial or accounting information',
  'Employee or HR information',
  'Healthcare or patient information',
  'Legal or privileged information',
  'Payment-card information',
  'Information concerning minors',
])

const COMPLIANCE = [
  'HIPAA or a BAA',
  'SOC 2 vendor requirements',
  'GDPR',
  'CCPA or CPRA',
  'PCI DSS',
  'Internal security review',
  'Industry-specific regulation',
  'Not sure',
] as const

const WORST_CONSEQUENCES = [
  'Minor internal inconvenience',
  'Employee rework or wasted time',
  'Poor customer experience',
  'Lost revenue',
  'Public brand damage',
  'Legal or regulatory exposure',
  'An incorrect financial transaction or commitment',
  'A health or safety consequence',
  'Other',
] as const

const ALLOWED_ACTIONS = [
  'Read information and answer questions',
  'Surface alerts and recommendations',
  'Prepare drafts for human review',
  'Execute only after explicit approval',
  'Perform narrowly defined actions within agreed limits',
  'I am not sure; Prism should advise us',
] as const

const INTERNAL_OWNERS = [
  'Founder or CEO',
  'COO or operations leader',
  'CTO, IT, or security leader',
  'Revenue operations or growth leader',
  'Product or engineering leader',
  'Another named operator',
  'No owner has been assigned',
] as const

const START_TIMING = [
  'Within 30 days',
  'Within 31–90 days',
  'Within three to six months',
  'More than six months from now',
  'We are only researching',
] as const

const COMMERCIAL_READINESS = [
  'The budget and executive support are already present',
  'We can approve the investment if the scope and case are compelling',
  'We need Prism’s findings to build an internal business case',
  'We are interested but not financially ready',
] as const

const PROCUREMENT_FLAGS = [
  'Procurement process required',
  'Vendor-security review required',
  'Legal review of data terms required',
  'NDA required before detailed scoping',
] as const

const CHANNELS = [
  'Slack',
  'Microsoft Teams',
  'WhatsApp',
  'Telegram',
  'Email',
  'Mobile web command center',
  'Other',
  'Unsure',
] as const

const EXISTING_AI = [
  'Individual use of ChatGPT or Claude',
  'Zapier, Make, or n8n',
  'Custom scripts or integrations',
  'Internal chatbots or copilots',
  'Agents already operating in production',
  'Formal AI policy or governance',
  'Nothing meaningful yet',
] as const

/* ------------------------------------------------------------------ */
/* Step model                                                         */
/* ------------------------------------------------------------------ */

type StepId =
  | 'company'
  | 'authority'
  | 'scale'
  | 'investment'
  | 'contact'
  | 'bottlenecks'
  | 'first_question'
  | 'first_workflow'
  | 'current_workflow'
  | 'frequency'
  | 'success'
  | 'systems'
  | 'data_access'
  | 'sensitivity'
  | 'permissions'
  | 'owner'
  | 'timing'
  | 'decision'
  | 'optional'
  | 'review'

const ORDER: StepId[] = [
  'company',
  'authority',
  'scale',
  'investment',
  'contact',
  'bottlenecks',
  'first_question',
  'first_workflow',
  'current_workflow',
  'frequency',
  'success',
  'systems',
  'data_access',
  'sensitivity',
  'permissions',
  'owner',
  'timing',
  'decision',
  'optional',
  'review',
]

const SECTIONS = ['Fit', 'Leverage', 'Workflow', 'Systems', 'Control', 'Readiness'] as const
type Section = (typeof SECTIONS)[number]

const STEP_SECTION: Record<StepId, Section> = {
  company: 'Fit',
  authority: 'Fit',
  scale: 'Fit',
  investment: 'Fit',
  contact: 'Fit',
  bottlenecks: 'Leverage',
  first_question: 'Leverage',
  first_workflow: 'Workflow',
  current_workflow: 'Workflow',
  frequency: 'Workflow',
  success: 'Workflow',
  systems: 'Systems',
  data_access: 'Systems',
  sensitivity: 'Control',
  permissions: 'Control',
  owner: 'Readiness',
  timing: 'Readiness',
  decision: 'Readiness',
  optional: 'Readiness',
  review: 'Readiness',
}

type Answers = {
  company_website: string
  business_model: string
  operating_country: string
  decision_role: string
  other_deciders: string[]
  team_size: string
  annual_revenue: string
  locations: string
  investment_fit: string
  full_name: string
  work_email: string
  job_title: string
  linkedin: string
  bottlenecks: string[]
  most_expensive_bottleneck: string
  first_question: string
  first_workflow: string
  current_workflow: string
  frequency: string
  weekly_hours: string
  consequences: string[]
  success_metric: string
  systems: string[]
  source_of_truth: string
  number_reliability: string
  access_path: string
  proprietary_has_api: string
  proprietary_owner: string
  proprietary_owner_participate: string
  data_sensitivity: string[]
  compliance: string[]
  worst_consequence: string
  allowed_actions: string
  internal_owner: string
  owner_participate: string
  start_timing: string
  why_now: string
  commercial_readiness: string
  procurement_flags: string[]
  preferred_channel: string
  existing_ai: string[]
  loom_link: string
  how_heard: string
}

const EMPTY: Answers = {
  company_website: '',
  business_model: '',
  operating_country: '',
  decision_role: '',
  other_deciders: [],
  team_size: '',
  annual_revenue: '',
  locations: '',
  investment_fit: '',
  full_name: '',
  work_email: '',
  job_title: '',
  linkedin: '',
  bottlenecks: [],
  most_expensive_bottleneck: '',
  first_question: '',
  first_workflow: '',
  current_workflow: '',
  frequency: '',
  weekly_hours: '',
  consequences: [],
  success_metric: '',
  systems: [],
  source_of_truth: '',
  number_reliability: '',
  access_path: '',
  proprietary_has_api: '',
  proprietary_owner: '',
  proprietary_owner_participate: '',
  data_sensitivity: [],
  compliance: [],
  worst_consequence: '',
  allowed_actions: '',
  internal_owner: '',
  owner_participate: '',
  start_timing: '',
  why_now: '',
  commercial_readiness: '',
  procurement_flags: [],
  preferred_channel: '',
  existing_ai: [],
  loom_link: '',
  how_heard: '',
}

const HEADINGS: Record<StepId, string> = {
  company: 'Which company are we evaluating?',
  authority: 'What is your role in this decision?',
  scale: 'How large is the operation today?',
  investment: 'Is the investment range realistic?',
  contact: 'Where should we save your application?',
  bottlenecks: 'Where is leadership still the human glue?',
  first_question: 'What is the first trustworthy answer you need?',
  first_workflow: 'If Prism built one workflow first, what should it do?',
  current_workflow: 'How does that workflow happen today?',
  frequency: 'How often, how costly, and what breaks?',
  success: 'What would make the first 90 days an undeniable win?',
  systems: 'Which systems would the first workflow touch?',
  data_access: 'How reliable and accessible is the data?',
  sensitivity: 'What kinds of information could be involved?',
  permissions: 'Consequences and permissions.',
  owner: 'Who would own this inside your company?',
  timing: 'Timing and trigger.',
  decision: 'Commercial readiness.',
  optional: 'Optional context.',
  review: 'Review your application.',
}

function isUrlish(value: string) {
  const v = value.trim()
  if (!v) return false
  try {
    const u = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`)
    return Boolean(u.hostname && u.hostname.includes('.'))
  } catch {
    return false
  }
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

// Fields that render their own inline error inside the Field component.
const INLINE_ERROR_FIELDS = new Set<string>([
  'company_website',
  'operating_country',
  'full_name',
  'work_email',
  'job_title',
  'first_question',
  'first_workflow',
  'current_workflow',
  'success_metric',
])

/* ------------------------------------------------------------------ */
/* Primitives                                                         */
/* ------------------------------------------------------------------ */

function Field({
  label,
  required,
  hint,
  error,
  errorId,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  error?: string
  errorId?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[0.95rem] font-medium text-[#0a0a0a]">{label}</p>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#6e6e6e]">
          {required ? 'Required' : 'Optional'}
        </span>
      </div>
      {hint ? <p className="text-[0.85rem] leading-6 text-[#6e6e6e]">{hint}</p> : null}
      {children}
      {error ? (
        <p
          id={errorId}
          role="alert"
          aria-live="assertive"
          className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[#cc2e2e]"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

function Choice({
  selected,
  onClick,
  children,
  multi,
}: {
  selected: boolean
  onClick: () => void
  children: ReactNode
  multi?: boolean
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-[0.92rem] leading-6 transition-[border-color,background-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0063d1] focus-visible:ring-offset-2 ${
        selected
          ? 'border-[#0a0a0a] bg-[#f5f5f5] text-[#0a0a0a]'
          : 'border-[#e2e2e2] bg-[#ffffff] text-[#404040] hover:border-[#b5b5b5]'
      }`}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`grid h-5 w-5 shrink-0 place-items-center border ${
          multi ? 'rounded-[5px]' : 'rounded-full'
        } ${selected ? 'border-[#0a0a0a] bg-[#0a0a0a] text-[#ffffff]' : 'border-[#cfcfcf]'}`}
      >
        {selected ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : null}
      </span>
    </button>
  )
}

function inputClass(error?: boolean) {
  return `min-h-12 w-full rounded-lg border bg-[#ffffff] px-4 text-[0.95rem] text-[#0a0a0a] placeholder:text-[#a0a0a0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0063d1] focus-visible:ring-offset-2 ${
    error ? 'border-[#cc2e2e]' : 'border-[#d4d4d4]'
  }`
}

function CharCount({ value, max }: { value: string; max: number }) {
  const over = value.length > max
  return (
    <span
      className={`font-mono text-[0.68rem] ${over ? 'text-[#cc2e2e]' : 'text-[#6e6e6e]'}`}
    >
      {value.length}/{max}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function FounderOsApplicationForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const startedRef = useRef(false)
  const errorRef = useRef<HTMLParagraphElement>(null)
  const [stepId, setStepId] = useState<StepId | 'offramp'>('company')
  const [continueAnyway, setContinueAnyway] = useState(false)
  const [a, setA] = useState<Answers>(EMPTY)
  const [error, setError] = useState('')
  const [systemQuery, setSystemQuery] = useState('')
  const [ackConfidential, setAckConfidential] = useState(false)
  const [ackContact, setAckContact] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const activeStep = stepId === 'offramp' ? 'investment' : stepId
  const currentSection = STEP_SECTION[activeStep]
  const stepNumber = ORDER.indexOf(activeStep) + 1

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    if (!startedRef.current) {
      startedRef.current = true
      trackEvent('founder_os_application_start', {
        form_name: FORM_NAME,
        form_location: FORM_LOCATION,
      })
    }
    setError('')
    setA((prev) => ({ ...prev, [key]: value }))
  }

  const toggle = (key: keyof Answers, value: string, cap?: number) => {
    setError('')
    setA((prev) => {
      const list = prev[key] as string[]
      const has = list.includes(value)
      if (!has && cap && list.length >= cap) return prev
      return { ...prev, [key]: has ? list.filter((v) => v !== value) : [...list, value] }
    })
  }

  const hasProprietary = a.systems.includes('Custom or proprietary software')
  const showCompliance = a.data_sensitivity.some((d) => SENSITIVE_FLAGS.has(d))
  const showLocations =
    a.business_model === 'Local or multi-location service business' ||
    a.business_model === 'Healthcare or dental'

  // When a step error is showing, work out which field caused it so we can
  // wire aria-invalid/aria-describedby and move focus to the right control.
  const invalidField = useMemo<string | null>(() => {
    if (!error || stepId === 'offramp') return null
    switch (stepId) {
      case 'company':
        if (!isUrlish(a.company_website)) return 'company_website'
        if (!a.business_model) return 'business_model'
        if (!a.operating_country.trim()) return 'operating_country'
        return null
      case 'contact':
        if (!a.full_name.trim()) return 'full_name'
        if (!isEmail(a.work_email)) return 'work_email'
        if (!a.job_title.trim()) return 'job_title'
        return null
      case 'first_question':
        return 'first_question'
      case 'first_workflow':
        return 'first_workflow'
      case 'current_workflow':
        return 'current_workflow'
      case 'success':
        return 'success_metric'
      default:
        return null
    }
  }, [error, stepId, a])

  const fieldProps = (name: string) => {
    const invalid = invalidField === name
    return {
      'aria-invalid': invalid || undefined,
      'aria-describedby': invalid ? `${name}-error` : undefined,
      'data-fos-focus': invalid ? 'true' : undefined,
    }
  }

  // Fields in INLINE_ERROR_FIELDS render their own inline error inside the Field
  // component, so we suppress the duplicate step-level banner for them.
  const showStepError = Boolean(
    error && !(invalidField && INLINE_ERROR_FIELDS.has(invalidField)),
  )

  // Light pacing cue so the long application feels finite near the end.
  const pacingCue =
    stepId === 'optional'
      ? 'Almost done. This is the last section before review.'
      : stepId === 'review'
        ? 'Last step. Review your answers and submit.'
        : ''

  const validateStep = (id: StepId): string => {
    switch (id) {
      case 'company':
        if (!isUrlish(a.company_website)) return 'Enter a valid company website.'
        if (!a.business_model) return 'Select a business model.'
        if (!a.operating_country.trim()) return 'Enter your primary operating country.'
        return ''
      case 'authority':
        if (!a.decision_role) return 'Select the role that fits best.'
        return ''
      case 'scale':
        if (!a.team_size) return 'Select a team size.'
        if (!a.annual_revenue) return 'Select a revenue range.'
        return ''
      case 'investment':
        if (!a.investment_fit) return 'Select an option.'
        return ''
      case 'contact':
        if (!a.full_name.trim()) return 'Enter your full name.'
        if (!isEmail(a.work_email)) return 'Enter a valid work email.'
        if (!a.job_title.trim()) return 'Enter your job title.'
        return ''
      case 'bottlenecks':
        if (a.bottlenecks.length === 0) return 'Pick at least one bottleneck.'
        if (!a.most_expensive_bottleneck) return 'Choose the most expensive one.'
        return ''
      case 'first_question':
        if (a.first_question.trim().length < 15)
          return 'Add a sentence or two (15+ characters).'
        return ''
      case 'first_workflow':
        if (a.first_workflow.trim().length < 30)
          return 'Describe the workflow outcome (30+ characters).'
        return ''
      case 'current_workflow':
        if (a.current_workflow.trim().length < 150)
          return 'A few bullets, please (150+ characters).'
        return ''
      case 'frequency':
        if (!a.frequency) return 'Select how often it occurs.'
        if (!a.weekly_hours) return 'Select the weekly time cost.'
        if (a.consequences.length === 0) return 'Pick at least one consequence.'
        return ''
      case 'success':
        if (a.success_metric.trim().length < 15)
          return 'Define an observable result (15+ characters).'
        return ''
      case 'systems':
        if (a.systems.length === 0) return 'Select at least one system.'
        if (!a.source_of_truth) return 'Tell us where the truth lives today.'
        return ''
      case 'data_access':
        if (!a.number_reliability) return 'Select the closest statement.'
        if (!a.access_path) return 'Select an access answer.'
        return ''
      case 'sensitivity':
        if (a.data_sensitivity.length === 0) return 'Select at least one option.'
        return ''
      case 'permissions':
        if (!a.worst_consequence) return 'Select the worst realistic consequence.'
        if (!a.allowed_actions) return 'Select what the first release may do.'
        return ''
      case 'owner':
        if (!a.internal_owner) return 'Select an owner.'
        if (!a.owner_participate) return 'Select an answer.'
        return ''
      case 'timing':
        if (!a.start_timing) return 'Select a timeline.'
        return ''
      case 'decision':
        if (!a.commercial_readiness) return 'Select the closest statement.'
        return ''
      case 'optional':
        return ''
      case 'review':
        if (!ackConfidential || !ackContact)
          return 'Please confirm both acknowledgments to submit.'
        return ''
      default:
        return ''
    }
  }

  const scrollTop = () =>
    formRef.current?.scrollIntoView?.({ block: 'start', behavior: 'smooth' })

  const focusFirstInvalid = () => {
    if (typeof window === 'undefined') return
    const isMobile = window.matchMedia?.('(max-width: 767px)').matches ?? false

    window.requestAnimationFrame(() => {
      const form = formRef.current
      const marked = form?.querySelector<HTMLElement>('[data-fos-focus="true"]')
      // If the marked element isn't focusable (e.g. a choice-group wrapper),
      // fall back to the first interactive control inside it.
      const focusable =
        marked &&
        (marked.matches('input, textarea, select, button, [tabindex]')
          ? marked
          : marked.querySelector<HTMLElement>(
              'input, textarea, select, button, [tabindex]',
            ))
      const target = focusable || errorRef.current
      // Focus without scrolling so the on-screen keyboard doesn't yank the
      // viewport, then explicitly bring the field (or error banner) into view.
      target?.focus({ preventScroll: true })
      if (isMobile) {
        // On mobile the inline/banner error can render far above the viewport,
        // so smooth-scroll it into view; otherwise the page looks unresponsive.
        const scrollTarget = focusable || errorRef.current
        scrollTarget?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }
    })
  }

  const goNext = () => {
    if (stepId === 'offramp') return
    const err = validateStep(stepId)
    if (err) {
      setError(err)
      focusFirstInvalid()
      trackEvent('founder_os_application_validation_error', {
        form_name: FORM_NAME,
        form_location: FORM_LOCATION,
        step_id: stepId,
      })
      return
    }
    if (stepId === 'investment') {
      const declined = a.investment_fit.startsWith('No') && !continueAnyway
      setStepId(declined ? 'offramp' : 'contact')
      scrollTop()
      return
    }
    const idx = ORDER.indexOf(stepId)
    setStepId(ORDER[Math.min(idx + 1, ORDER.length - 1)])
    scrollTop()
  }

  const goBack = () => {
    setError('')
    if (stepId === 'offramp') {
      setStepId('investment')
      return
    }
    if (stepId === 'contact') {
      setStepId('investment')
      scrollTop()
      return
    }
    const idx = ORDER.indexOf(stepId)
    setStepId(ORDER[Math.max(idx - 1, 0)])
    scrollTop()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (stepId !== 'review') {
      goNext()
      return
    }
    const err = validateStep('review')
    if (err) {
      setError(err)
      focusFirstInvalid()
      return
    }
    setSubmitError('')
    setSubmitting(true)
    trackEvent('founder_os_application_submit_attempt', {
      form_name: FORM_NAME,
      form_location: FORM_LOCATION,
    })
    try {
      const form = event.currentTarget
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!response.ok) {
        setSubmitError("We couldn't submit your application. Please try again.")
        trackEvent('founder_os_application_submit_error', {
          form_name: FORM_NAME,
          form_location: FORM_LOCATION,
          status: response.status,
        })
        return
      }
    } catch {
      setSubmitError("We couldn't submit your application. Please try again.")
      trackEvent('founder_os_application_submit_error', {
        form_name: FORM_NAME,
        form_location: FORM_LOCATION,
        reason: 'network',
      })
      return
    } finally {
      setSubmitting(false)
    }
    trackEvent('founder_os_application_submit_success', {
      form_name: FORM_NAME,
      form_location: FORM_LOCATION,
    })
    trackFormSubmission(FORM_NAME, FORM_LOCATION, {
      lead_type: FORM_NAME,
      conversionMode: 'pending',
    })
    setDone(true)
    scrollTop()
  }

  const hidden = useMemo(() => {
    const fields: Array<[string, string]> = [
      ['company_website', a.company_website],
      ['business_model', a.business_model],
      ['operating_country', a.operating_country],
      ['decision_role', a.decision_role],
      ['other_deciders', a.other_deciders.join(', ')],
      ['team_size', a.team_size],
      ['annual_revenue', a.annual_revenue],
      ['active_locations', a.locations],
      ['investment_fit', a.investment_fit],
      ['continued_anyway', continueAnyway ? 'yes' : 'no'],
      ['full_name', a.full_name],
      ['work_email', a.work_email],
      ['job_title', a.job_title],
      ['linkedin', a.linkedin],
      ['bottlenecks', a.bottlenecks.join(', ')],
      ['most_expensive_bottleneck', a.most_expensive_bottleneck],
      ['first_trustworthy_question', a.first_question],
      ['first_workflow', a.first_workflow],
      ['current_workflow', a.current_workflow],
      ['frequency', a.frequency],
      ['weekly_hours', a.weekly_hours],
      ['consequences', a.consequences.join(', ')],
      ['success_metric', a.success_metric],
      ['systems', a.systems.join(', ')],
      ['source_of_truth', a.source_of_truth],
      ['number_reliability', a.number_reliability],
      ['access_path', a.access_path],
      ['proprietary_has_api', a.proprietary_has_api],
      ['proprietary_owner', a.proprietary_owner],
      ['proprietary_owner_participate', a.proprietary_owner_participate],
      ['data_sensitivity', a.data_sensitivity.join(', ')],
      ['compliance', a.compliance.join(', ')],
      ['worst_consequence', a.worst_consequence],
      ['allowed_actions', a.allowed_actions],
      ['internal_owner', a.internal_owner],
      ['owner_can_participate', a.owner_participate],
      ['start_timing', a.start_timing],
      ['why_now', a.why_now],
      ['commercial_readiness', a.commercial_readiness],
      ['procurement_flags', a.procurement_flags.join(', ')],
      ['preferred_channel', a.preferred_channel],
      ['existing_ai', a.existing_ai.join(', ')],
      ['loom_link', a.loom_link],
      ['how_heard', a.how_heard],
      ['acknowledged_no_confidential', ackConfidential ? 'yes' : 'no'],
      ['acknowledged_contact', ackContact ? 'yes' : 'no'],
      ['marketing_consent', marketing ? 'yes' : 'no'],
    ]
    return fields
  }, [a, continueAnyway, marketing, ackConfidential, ackContact])

  if (done) {
    return (
      <div className="rounded-2xl border border-[#ededed] bg-[#ffffff] p-8 sm:p-10">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#15803d]/10 text-[#15803d]">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.03em] text-[#0a0a0a]">
          Your application is with Prism.
        </h2>
        <p className="mt-4 max-w-xl text-[1rem] leading-7 text-[#525252]">
          We&apos;ll review the potential business leverage, your proposed first
          workflow, system and data feasibility, permission and security
          requirements, and commercial readiness. Strong-fit companies receive a
          private invitation to a 45-minute Founder OS Engineering Session.
        </p>
        <dl className="mt-6 grid gap-3 border-t border-[#ededed] pt-6 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[#6e6e6e]">
              First workflow
            </dt>
            <dd className="mt-1 text-[0.92rem] leading-6 text-[#0a0a0a]">
              {a.first_workflow || 'Not provided'}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[#6e6e6e]">
              90-day target
            </dt>
            <dd className="mt-1 text-[0.92rem] leading-6 text-[#0a0a0a]">
              {a.success_metric || 'Not provided'}
            </dd>
          </div>
        </dl>
        <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[#6e6e6e]">
          Expected review: within two business days
        </p>
        <p className="mt-4 text-[0.82rem] leading-6 text-[#6e6e6e]">
          Please don&apos;t email passwords, API keys, customer records, or
          patient information. Prism will set up a secure process if detailed
          technical material is needed later.
        </p>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      id={FORM_NAME}
      name={FORM_NAME}
      action={FORM_ACTION}
      method="POST"
      noValidate
      onSubmit={handleSubmit}
      className="scroll-mt-24"
    >
      <input
        type="hidden"
        name="_subject"
        value="New Founder OS application"
      />
      <input type="hidden" name="form_name" value={FORM_NAME} />
      <FormspreeOpsFields formKey="founder_os_application" />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: 'none' }}
        defaultValue=""
      />
      {hidden.map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      {/* Progress */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {SECTIONS.map((section, i) => {
          const active = section === currentSection
          const complete = SECTIONS.indexOf(currentSection) > i
          return (
            <span key={section} className="flex items-center gap-2">
              <span
                className={`font-mono text-[0.66rem] uppercase tracking-[0.14em] ${
                  active
                    ? 'font-semibold text-[#0a0a0a]'
                    : complete
                      ? 'text-[#404040]'
                      : 'text-[#6e6e6e]'
                }`}
              >
                {section}
              </span>
              {i < SECTIONS.length - 1 ? (
                <span aria-hidden="true" className="text-[#d4d4d4]">
                  ›
                </span>
              ) : null}
            </span>
          )
        })}
      </div>
      <div className="mt-4 h-px w-full bg-[#ededed]">
        <div
          className="h-full bg-[#0a0a0a] transition-[width] duration-300"
          style={{ width: `${(stepNumber / ORDER.length) * 100}%` }}
        />
      </div>

      <div className="py-8 sm:py-10">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#6e6e6e]">
          {stepId === 'offramp'
            ? 'A quick note'
            : `Step ${stepNumber} of ${ORDER.length} · ${currentSection}`}
        </p>
        <h2 className="mt-3 max-w-[20ch] text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#0a0a0a]">
          {stepId === 'offramp'
            ? 'Founder OS may be more than you need right now.'
            : HEADINGS[stepId]}
        </h2>
        {pacingCue ? (
          <p className="mt-3 inline-flex items-center gap-2 text-[0.85rem] leading-6 text-[#15803d]">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            {pacingCue}
          </p>
        ) : null}

        <div className="mt-7 space-y-7">{renderStep()}</div>

        {showStepError ? (
          <p
            ref={errorRef}
            role="alert"
            aria-live="assertive"
            tabIndex={-1}
            className="mt-5 flex items-center gap-2 font-mono text-[0.74rem] uppercase tracking-[0.08em] text-[#cc2e2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cc2e2e]/40 focus-visible:ring-offset-2"
          >
            <ShieldAlert className="h-4 w-4" aria-hidden="true" />
            {error}
          </p>
        ) : null}
      </div>

      {/* Nav */}
      <div className="flex items-center gap-3 border-t border-[#ededed] pt-6">
        {stepId !== 'company' ? (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#d4d4d4] bg-[#ffffff] px-4 text-[0.85rem] font-medium text-[#0a0a0a] transition-colors hover:bg-[#f5f5f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0063d1] focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>
        ) : null}

        {stepId === 'offramp' ? (
          <button
            type="button"
            onClick={() => {
              setContinueAnyway(true)
              setStepId('contact')
              scrollTop()
            }}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-[#d4d4d4] bg-[#ffffff] px-5 text-[0.9rem] font-medium text-[#0a0a0a] transition-colors hover:bg-[#f5f5f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0063d1] focus-visible:ring-offset-2"
          >
            Our complexity is unusual, continue anyway
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : stepId === 'review' ? (
          <button
            type="submit"
            disabled={submitting}
            onClick={() => trackCTAClick('send founder os application', FORM_LOCATION)}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#0a0a0a] px-5 text-[0.9rem] font-medium text-[#ffffff] transition-colors hover:bg-[#262626] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0063d1] focus-visible:ring-offset-2"
          >
            {submitting ? 'Sending…' : 'Send to Prism for review'}
            {!submitting ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#0a0a0a] px-5 text-[0.9rem] font-medium text-[#ffffff] transition-colors hover:bg-[#262626] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0063d1] focus-visible:ring-offset-2"
          >
            {stepId === 'optional' ? 'Skip or continue to review' : 'Continue'}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {submitError ? (
        <p className="mt-4 rounded-lg border border-[#cc2e2e]/30 bg-[#cc2e2e]/[0.06] px-4 py-3 text-[0.85rem] text-[#a51f1f]">
          {submitError}
        </p>
      ) : null}
    </form>
  )

  function renderStep(): ReactNode {
    switch (stepId) {
      case 'company':
        return (
          <>
            <Field
              label="Company website"
              required
              error={invalidField === 'company_website' ? error : undefined}
              errorId="company_website-error"
            >
              <input
                type="url"
                inputMode="url"
                autoComplete="url"
                value={a.company_website}
                onChange={(e) => set('company_website', e.target.value)}
                placeholder="yourcompany.com"
                className={inputClass(invalidField === 'company_website')}
                {...fieldProps('company_website')}
              />
            </Field>
            <Field label="Business model" required>
              <div
                className="grid gap-2 sm:grid-cols-2"
                {...fieldProps('business_model')}
              >
                {BUSINESS_MODELS.map((m) => (
                  <Choice
                    key={m}
                    selected={a.business_model === m}
                    onClick={() => set('business_model', m)}
                  >
                    {m}
                  </Choice>
                ))}
              </div>
            </Field>
            <Field
              label="Primary operating country"
              required
              error={invalidField === 'operating_country' ? error : undefined}
              errorId="operating_country-error"
            >
              <input
                value={a.operating_country}
                onChange={(e) => set('operating_country', e.target.value)}
                placeholder="United States"
                className={inputClass(invalidField === 'operating_country')}
                {...fieldProps('operating_country')}
              />
            </Field>
            <p className="text-[0.8rem] leading-6 text-[#6e6e6e]">
              The URL lets Prism research public context like positioning,
              industry, team, and platform, so we don&apos;t ask you to retype it.
            </p>
          </>
        )

      case 'authority':
        return (
          <>
            <Field label="Your role in deciding whether Prism builds this" required>
              <div className="grid gap-2">
                {DECISION_ROLES.map((r) => (
                  <Choice
                    key={r}
                    selected={a.decision_role === r}
                    onClick={() => set('decision_role', r)}
                  >
                    {r}
                  </Choice>
                ))}
              </div>
            </Field>
            <Field label="Who else would need to participate in a decision?">
              <div className="grid gap-2 sm:grid-cols-2">
                {OTHER_DECIDERS.map((d) => (
                  <Choice
                    key={d}
                    multi
                    selected={a.other_deciders.includes(d)}
                    onClick={() => toggle('other_deciders', d)}
                  >
                    {d}
                  </Choice>
                ))}
              </div>
            </Field>
          </>
        )

      case 'scale':
        return (
          <>
            <Field label="Team size" required>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {TEAM_SIZES.map((t) => (
                  <Choice key={t} selected={a.team_size === t} onClick={() => set('team_size', t)}>
                    {t}
                  </Choice>
                ))}
              </div>
            </Field>
            <Field
              label="Approximate annual revenue"
              required
              hint="We use this only to gauge whether a custom operating layer can create enough economic leverage."
            >
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {REVENUES.map((r) => (
                  <Choice
                    key={r}
                    selected={a.annual_revenue === r}
                    onClick={() => set('annual_revenue', r)}
                  >
                    {r}
                  </Choice>
                ))}
              </div>
            </Field>
            {showLocations ? (
              <Field label="How many active locations or business units?">
                <input
                  inputMode="numeric"
                  value={a.locations}
                  onChange={(e) => set('locations', e.target.value)}
                  placeholder="e.g. 6"
                  className={inputClass()}
                />
              </Field>
            ) : null}
          </>
        )

      case 'investment':
        return (
          <>
            <div className="rounded-xl border border-[#ededed] bg-[#fafafa] p-5">
              <p className="text-[0.92rem] leading-7 text-[#404040]">
                Founder OS is Prism&apos;s highest-touch custom engineering
                engagement. Initial implementations generally begin around{' '}
                <span className="font-medium text-[#0a0a0a]">$50,000</span>,
                followed by managed operation from approximately{' '}
                <span className="font-medium text-[#0a0a0a]">$10,000 / month</span>.
                Selected companies may first complete a paid Founder Systems
                Blueprint.
              </p>
            </div>
            <Field
              label="If Prism identifies a compelling business case, is that range realistic for your company?"
              required
            >
              <div className="grid gap-2">
                {INVESTMENT_FIT.map((o) => (
                  <Choice
                    key={o}
                    selected={a.investment_fit === o}
                    onClick={() => set('investment_fit', o)}
                  >
                    {o}
                  </Choice>
                ))}
              </div>
            </Field>
          </>
        )

      case 'contact':
        return (
          <>
            <p className="text-[0.92rem] leading-7 text-[#525252]">
              You appear potentially aligned. Where should we save your
              application?
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Full name"
                required
                error={invalidField === 'full_name' ? error : undefined}
                errorId="full_name-error"
              >
                <input
                  autoComplete="name"
                  value={a.full_name}
                  onChange={(e) => set('full_name', e.target.value)}
                  placeholder="Your name"
                  className={inputClass(invalidField === 'full_name')}
                  {...fieldProps('full_name')}
                />
              </Field>
              <Field
                label="Work email"
                required
                error={invalidField === 'work_email' ? error : undefined}
                errorId="work_email-error"
              >
                <input
                  type="email"
                  autoComplete="email"
                  value={a.work_email}
                  onChange={(e) => set('work_email', e.target.value)}
                  placeholder="you@company.com"
                  className={inputClass(invalidField === 'work_email')}
                  {...fieldProps('work_email')}
                />
              </Field>
              <Field
                label="Job title"
                required
                error={invalidField === 'job_title' ? error : undefined}
                errorId="job_title-error"
              >
                <input
                  autoComplete="organization-title"
                  value={a.job_title}
                  onChange={(e) => set('job_title', e.target.value)}
                  placeholder="Founder, COO, Head of Ops…"
                  className={inputClass(invalidField === 'job_title')}
                  {...fieldProps('job_title')}
                />
              </Field>
              <Field label="LinkedIn profile">
                <input
                  type="url"
                  value={a.linkedin}
                  onChange={(e) => set('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/…"
                  className={inputClass()}
                />
              </Field>
            </div>
          </>
        )

      case 'bottlenecks':
        return (
          <>
            <Field label="Pick up to three areas where leadership is still the glue" required>
              <div className="grid gap-2 sm:grid-cols-2">
                {BOTTLENECKS.map((b) => (
                  <Choice
                    key={b}
                    multi
                    selected={a.bottlenecks.includes(b)}
                    onClick={() => toggle('bottlenecks', b, 3)}
                  >
                    {b}
                  </Choice>
                ))}
              </div>
            </Field>
            {a.bottlenecks.length > 0 ? (
              <Field label="Which one creates the most expensive bottleneck?" required>
                <div className="grid gap-2">
                  {a.bottlenecks.map((b) => (
                    <Choice
                      key={b}
                      selected={a.most_expensive_bottleneck === b}
                      onClick={() => set('most_expensive_bottleneck', b)}
                    >
                      {b}
                    </Choice>
                  ))}
                </div>
              </Field>
            ) : null}
          </>
        )

      case 'first_question':
        return (
          <Field
            label="The first question you wish you could ask and get a trustworthy, source-linked answer to"
            required
            hint="e.g. “Why did qualified leads fall this month?” · “Which client accounts need me today?” · “Which campaigns produce actual revenue?”"
            error={invalidField === 'first_question' ? error : undefined}
            errorId="first_question-error"
          >
            <textarea
              value={a.first_question}
              maxLength={500}
              onChange={(e) => set('first_question', e.target.value)}
              placeholder="Ask the question you can't reliably answer today."
              className={`${inputClass(invalidField === 'first_question')} min-h-32 py-3 leading-7`}
              {...fieldProps('first_question')}
            />
            <div className="flex justify-end">
              <CharCount value={a.first_question} max={500} />
            </div>
          </Field>
        )

      case 'first_workflow':
        return (
          <Field
            label="If Prism built only one workflow first, what should it handle from trigger to outcome?"
            required
            hint="Describe the business outcome, not the technology. e.g. “Detect stalled high-value leads, gather context, draft a personalized follow-up, and ask me to approve it in Slack.”"
            error={invalidField === 'first_workflow' ? error : undefined}
            errorId="first_workflow-error"
          >
            <textarea
              value={a.first_workflow}
              maxLength={700}
              onChange={(e) => set('first_workflow', e.target.value)}
              placeholder="From the trigger to the result you want."
              className={`${inputClass(invalidField === 'first_workflow')} min-h-36 py-3 leading-7`}
              {...fieldProps('first_workflow')}
            />
            <div className="flex justify-end">
              <CharCount value={a.first_workflow} max={700} />
            </div>
          </Field>
        )

      case 'current_workflow':
        return (
          <Field
            label="How does this workflow happen today?"
            required
            hint="What triggers it? Who touches it? Which systems? Where does it slow down or need you? Three to six bullets is plenty."
            error={invalidField === 'current_workflow' ? error : undefined}
            errorId="current_workflow-error"
          >
            <textarea
              value={a.current_workflow}
              maxLength={1000}
              onChange={(e) => set('current_workflow', e.target.value)}
              placeholder={'• New leads enter HubSpot from three forms\n• An assistant checks ad source and company size\n• Nothing alerts me when a high-value lead goes untouched'}
              className={`${inputClass(invalidField === 'current_workflow')} min-h-44 py-3 leading-7`}
              {...fieldProps('current_workflow')}
            />
            <div className="flex justify-end">
              <CharCount value={a.current_workflow} max={1000} />
            </div>
          </Field>
        )

      case 'frequency':
        return (
          <>
            <Field label="How often does this workflow occur?" required>
              <div className="grid gap-2 sm:grid-cols-2">
                {FREQUENCIES.map((f) => (
                  <Choice key={f} selected={a.frequency === f} onClick={() => set('frequency', f)}>
                    {f}
                  </Choice>
                ))}
              </div>
            </Field>
            <Field label="Across the company, how much time does it consume each week?" required>
              <div className="grid gap-2 sm:grid-cols-2">
                {WEEKLY_HOURS.map((w) => (
                  <Choice
                    key={w}
                    selected={a.weekly_hours === w}
                    onClick={() => set('weekly_hours', w)}
                  >
                    {w}
                  </Choice>
                ))}
              </div>
            </Field>
            <Field label="Largest consequence of the current process (pick up to two)" required>
              <div className="grid gap-2 sm:grid-cols-2">
                {CONSEQUENCES.map((c) => (
                  <Choice
                    key={c}
                    multi
                    selected={a.consequences.includes(c)}
                    onClick={() => toggle('consequences', c, 2)}
                  >
                    {c}
                  </Choice>
                ))}
              </div>
            </Field>
          </>
        )

      case 'success':
        return (
          <Field
            label="What measurable result would make the first 90 days an undeniable win?"
            required
            hint="Use a number when you can: “save 20 team-hours a week,” “cut lead response from 6 hours to 15 minutes,” “reduce weekly reporting from two days to one hour.”"
            error={invalidField === 'success_metric' ? error : undefined}
            errorId="success_metric-error"
          >
            <textarea
              value={a.success_metric}
              maxLength={400}
              onChange={(e) => set('success_metric', e.target.value)}
              placeholder="Name the observable improvement."
              className={`${inputClass(invalidField === 'success_metric')} min-h-32 py-3 leading-7`}
              {...fieldProps('success_metric')}
            />
            <div className="flex justify-end">
              <CharCount value={a.success_metric} max={400} />
            </div>
          </Field>
        )

      case 'systems':
        return (
          <>
            <Field
              label="Which systems would the first workflow read from or act in?"
              required
            >
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e6e6e]"
                  aria-hidden="true"
                />
                <input
                  value={systemQuery}
                  onChange={(e) => setSystemQuery(e.target.value)}
                  placeholder="Search tools…"
                  className={`${inputClass()} pl-9`}
                />
              </div>
              <div className="mt-4 space-y-4">
                {SYSTEM_GROUPS.map((g) => {
                  const items = g.items.filter((i) =>
                    i.toLowerCase().includes(systemQuery.toLowerCase()),
                  )
                  if (items.length === 0) return null
                  return (
                    <div key={g.group}>
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#6e6e6e]">
                        {g.group}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {items.map((i) => {
                          const on = a.systems.includes(i)
                          return (
                            <button
                              key={i}
                              type="button"
                              aria-pressed={on}
                              onClick={() => toggle('systems', i)}
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.82rem] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0063d1] focus-visible:ring-offset-2 ${
                                on
                                  ? 'border-[#0a0a0a] bg-[#0a0a0a] text-[#ffffff]'
                                  : 'border-[#d4d4d4] bg-[#ffffff] text-[#404040] hover:border-[#9a9a9a]'
                              }`}
                            >
                              {on ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : null}
                              {i}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </Field>
            <Field label="Where does the most trustworthy version of the information live today?" required>
              <div className="grid gap-2">
                {[...a.systems, ...SOURCE_EXTRAS].map((o) => (
                  <Choice
                    key={o}
                    selected={a.source_of_truth === o}
                    onClick={() => set('source_of_truth', o)}
                  >
                    {o}
                  </Choice>
                ))}
              </div>
            </Field>
          </>
        )

      case 'data_access':
        return (
          <>
            <Field label="When leadership asks for an important number today…" required>
              <div className="grid gap-2">
                {NUMBER_RELIABILITY.map((o) => (
                  <Choice
                    key={o}
                    selected={a.number_reliability === o}
                    onClick={() => set('number_reliability', o)}
                  >
                    {o}
                  </Choice>
                ))}
              </div>
            </Field>
            <Field label="Could Prism receive appropriate admin or API access after an agreement is signed?" required>
              <div className="grid gap-2">
                {ACCESS_PATHS.map((o) => (
                  <Choice key={o} selected={a.access_path === o} onClick={() => set('access_path', o)}>
                    {o}
                  </Choice>
                ))}
              </div>
            </Field>
            {hasProprietary ? (
              <div className="space-y-5 rounded-xl border border-[#ededed] bg-[#fafafa] p-5">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[#6e6e6e]">
                  Your custom / proprietary system
                </p>
                <Field label="Does it have an API?">
                  <div className="grid gap-2 sm:grid-cols-4">
                    {YES_PROBABLY.map((o) => (
                      <Choice
                        key={o}
                        selected={a.proprietary_has_api === o}
                        onClick={() => set('proprietary_has_api', o)}
                      >
                        {o}
                      </Choice>
                    ))}
                  </div>
                </Field>
                <Field label="Is there an internal or external technical owner?">
                  <input
                    value={a.proprietary_owner}
                    onChange={(e) => set('proprietary_owner', e.target.value)}
                    placeholder="Name / role, or “none yet”"
                    className={inputClass()}
                  />
                </Field>
                <Field label="Could that owner participate in scoping?">
                  <div className="grid gap-2 sm:grid-cols-4">
                    {YES_PROBABLY.map((o) => (
                      <Choice
                        key={o}
                        selected={a.proprietary_owner_participate === o}
                        onClick={() => set('proprietary_owner_participate', o)}
                      >
                        {o}
                      </Choice>
                    ))}
                  </div>
                </Field>
              </div>
            ) : null}
          </>
        )

      case 'sensitivity':
        return (
          <>
            <Field label="What kinds of information could be involved? Select all that apply." required>
              <div className="grid gap-2 sm:grid-cols-2">
                {DATA_SENSITIVITY.map((d) => (
                  <Choice
                    key={d}
                    multi
                    selected={a.data_sensitivity.includes(d)}
                    onClick={() => toggle('data_sensitivity', d)}
                  >
                    {d}
                  </Choice>
                ))}
              </div>
            </Field>
            {showCompliance ? (
              <>
                <div className="flex gap-3 rounded-xl border border-[#d8a200]/30 bg-[#fff8e6] p-4">
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#9a6b00]" aria-hidden="true" />
                  <p className="text-[0.86rem] leading-6 text-[#6b4e00]">
                    Don&apos;t enter or upload the underlying data here. Prism will
                    discuss security, retention, access, and vendor requirements in a
                    separate review.
                  </p>
                </div>
                <Field label="Which requirements may apply?">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {COMPLIANCE.map((c) => (
                      <Choice
                        key={c}
                        multi
                        selected={a.compliance.includes(c)}
                        onClick={() => toggle('compliance', c)}
                      >
                        {c}
                      </Choice>
                    ))}
                  </div>
                </Field>
              </>
            ) : null}
          </>
        )

      case 'permissions':
        return (
          <>
            <Field label="Worst realistic consequence if the system makes a mistake in the first workflow?" required>
              <div className="grid gap-2">
                {WORST_CONSEQUENCES.map((o) => (
                  <Choice
                    key={o}
                    selected={a.worst_consequence === o}
                    onClick={() => set('worst_consequence', o)}
                  >
                    {o}
                  </Choice>
                ))}
              </div>
            </Field>
            <Field
              label="What should the first release be allowed to do?"
              required
              hint="Read-only first is often the wiser starting point. We don't score caution negatively."
            >
              <div className="grid gap-2">
                {ALLOWED_ACTIONS.map((o) => (
                  <Choice
                    key={o}
                    selected={a.allowed_actions === o}
                    onClick={() => set('allowed_actions', o)}
                  >
                    {o}
                  </Choice>
                ))}
              </div>
            </Field>
          </>
        )

      case 'owner':
        return (
          <>
            <Field label="Who would own the Founder OS initiative inside your company?" required>
              <div className="grid gap-2">
                {INTERNAL_OWNERS.map((o) => (
                  <Choice
                    key={o}
                    selected={a.internal_owner === o}
                    onClick={() => set('internal_owner', o)}
                  >
                    {o}
                  </Choice>
                ))}
              </div>
            </Field>
            <Field label="Could this person participate consistently in discovery, testing, and approval design?" required>
              <div className="grid gap-2 sm:grid-cols-4">
                {YES_PROBABLY.map((o) => (
                  <Choice
                    key={o}
                    selected={a.owner_participate === o}
                    onClick={() => set('owner_participate', o)}
                  >
                    {o}
                  </Choice>
                ))}
              </div>
            </Field>
          </>
        )

      case 'timing':
        return (
          <>
            <Field label="When would you realistically want work to begin?" required>
              <div className="grid gap-2 sm:grid-cols-2">
                {START_TIMING.map((o) => (
                  <Choice key={o} selected={a.start_timing === o} onClick={() => set('start_timing', o)}>
                    {o}
                  </Choice>
                ))}
              </div>
            </Field>
            <Field
              label="Why is this worth addressing now rather than next year?"
              hint="A real trigger (growth outpacing process, an approaching launch, a founder bottleneck) beats “AI seems important.”"
            >
              <textarea
                value={a.why_now}
                maxLength={350}
                onChange={(e) => set('why_now', e.target.value)}
                placeholder="The trigger that makes this urgent."
                className={`${inputClass()} min-h-28 py-3 leading-7`}
              />
              <div className="flex justify-end">
                <CharCount value={a.why_now} max={350} />
              </div>
            </Field>
          </>
        )

      case 'decision':
        return (
          <>
            <Field label="Which statement best describes your commercial readiness?" required>
              <div className="grid gap-2">
                {COMMERCIAL_READINESS.map((o) => (
                  <Choice
                    key={o}
                    selected={a.commercial_readiness === o}
                    onClick={() => set('commercial_readiness', o)}
                  >
                    {o}
                  </Choice>
                ))}
              </div>
            </Field>
            <Field label="Any of these apply to your buying process?">
              <div className="grid gap-2 sm:grid-cols-2">
                {PROCUREMENT_FLAGS.map((o) => (
                  <Choice
                    key={o}
                    multi
                    selected={a.procurement_flags.includes(o)}
                    onClick={() => toggle('procurement_flags', o)}
                  >
                    {o}
                  </Choice>
                ))}
              </div>
            </Field>
          </>
        )

      case 'optional':
        return (
          <>
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[#ededed] bg-[#fafafa] px-4 py-3">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#15803d]">
                Optional
              </span>
              <p className="text-[0.88rem] leading-6 text-[#525252]">
                You can skip this. Every field here is optional, helps us prepare,
                and does not affect your score.
              </p>
            </div>
            <Field label="Where would you prefer to interact with Founder OS?">
              <div className="grid gap-2 sm:grid-cols-2">
                {CHANNELS.map((o) => (
                  <Choice
                    key={o}
                    selected={a.preferred_channel === o}
                    onClick={() => set('preferred_channel', o)}
                  >
                    {o}
                  </Choice>
                ))}
              </div>
            </Field>
            <Field label="What AI or automation is already in use?">
              <div className="grid gap-2 sm:grid-cols-2">
                {EXISTING_AI.map((o) => (
                  <Choice
                    key={o}
                    multi
                    selected={a.existing_ai.includes(o)}
                    onClick={() => toggle('existing_ai', o)}
                  >
                    {o}
                  </Choice>
                ))}
              </div>
            </Field>
            <Field label="Share a two-minute Loom explaining the bottleneck" hint="Paste a link, no file uploads.">
              <input
                type="url"
                value={a.loom_link}
                onChange={(e) => set('loom_link', e.target.value)}
                placeholder="loom.com/share/…"
                className={inputClass()}
              />
            </Field>
            <Field label="How did you hear about Prism?">
              <input
                value={a.how_heard}
                onChange={(e) => set('how_heard', e.target.value)}
                placeholder="Referral name, search, social…"
                className={inputClass()}
              />
            </Field>
          </>
        )

      case 'review':
        return (
          <>
            <div className="divide-y divide-[#ededed] rounded-xl border border-[#ededed]">
              {[
                ['Company', `${a.company_website || 'Not provided'} · ${a.business_model || 'Not provided'}`],
                ['First workflow', a.first_workflow || 'Not provided'],
                ['Systems', a.systems.join(', ') || 'Not provided'],
                [
                  'Control',
                  `${a.allowed_actions || 'Not provided'}${
                    a.worst_consequence ? ` · worst case: ${a.worst_consequence}` : ''
                  }`,
                ],
                [
                  'Readiness',
                  `${a.commercial_readiness || 'Not provided'}${
                    a.start_timing ? ` · ${a.start_timing}` : ''
                  }`,
                ],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-4">
                  <span className="w-32 shrink-0 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-[#6e6e6e]">
                    {label}
                  </span>
                  <span className="text-[0.9rem] leading-6 text-[#0a0a0a]">{value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={ackConfidential}
                  onChange={(e) => {
                    setError('')
                    setAckConfidential(e.target.checked)
                  }}
                  className="mt-1 h-4 w-4 accent-[#0a0a0a]"
                />
                <span className="text-[0.88rem] leading-6 text-[#404040]">
                  I confirm I have not included credentials, private customer
                  records, patient information, or other confidential source data.
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={ackContact}
                  onChange={(e) => {
                    setError('')
                    setAckContact(e.target.checked)
                  }}
                  className="mt-1 h-4 w-4 accent-[#0a0a0a]"
                />
                <span className="text-[0.88rem] leading-6 text-[#404040]">
                  I agree that Prism may contact me regarding this application.
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#0a0a0a]"
                />
                <span className="text-[0.88rem] leading-6 text-[#6e6e6e]">
                  Optional: send me occasional Founder OS updates.
                </span>
              </label>
            </div>
          </>
        )

      case 'offramp':
        return (
          <>
            <p className="text-[1rem] leading-7 text-[#525252]">
              Based on your answers, Founder OS is probably more infrastructure
              than your company should buy right now. That&apos;s a good thing to
              know early. A few paths that tend to fit better first:
            </p>
            <div className="grid gap-3">
              {[
                ['Prism Growth Dashboard', 'Start with the free Growth Dashboard and systems work.', '/get-started'],
                ['A systems foundation', 'Tracking, CRM cleanup, and data consolidation first.', '/services'],
                ['Founder OS waitlist', 'We’ll reach out when the timing fits.', '/contact?topic=founder-os-waitlist'],
              ].map(([title, body, href]) => (
                <a
                  key={title}
                  href={href}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[#e2e2e2] bg-[#ffffff] px-4 py-3 transition-colors hover:border-[#9a9a9a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0063d1] focus-visible:ring-offset-2"
                >
                  <span>
                    <span className="block text-[0.95rem] font-medium text-[#0a0a0a]">
                      {title}
                    </span>
                    <span className="block text-[0.85rem] leading-6 text-[#6e6e6e]">
                      {body}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#0063d1]" aria-hidden="true" />
                </a>
              ))}
            </div>
          </>
        )

      default:
        return null
    }
  }
}
