'use client'

import { useEffect, useRef } from 'react'

export type PreparedIntake = {
  why: string
  timeline: 'next_week' | 'next_30_days' | 'next_3_months'
  hasWebsite: 'yes' | 'no'
  siteLink: string
  contactMethod: 'email' | 'text'
  email: string
  phone: string
  source: string
}

type IntakeOptions = {
  service: 'website' | 'content' | 'ads'
  goals: readonly string[]
  onPrepare: (values: PreparedIntake) => void | Promise<void>
  enabled?: boolean
}

type Tool = {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  annotations: { readOnlyHint: boolean; consequentialHint: boolean }
  execute: (
    input: unknown,
    options?: { signal?: AbortSignal },
  ) => Promise<unknown>
}

type ModelContext = {
  registerTool: (
    tool: Tool,
    options?: { signal: AbortSignal },
  ) => void | Promise<void>
  unregisterTool?: (name: string) => void
}

const TIMELINES = ['next_week', 'next_30_days', 'next_3_months'] as const
const SOURCES = [
  'A friend told me',
  'TikTok',
  'Instagram',
  'Google Search',
  'ChatGPT (or another AI Search)',
]
const FIELDS = [
  'why',
  'timeline',
  'hasWebsite',
  'siteLink',
  'contactMethod',
  'email',
  'phone',
  'source',
]

function validateInput(
  input: unknown,
  goals: readonly string[],
): PreparedIntake {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new Error('Provide an object containing the intake fields.')
  }
  const value = input as Record<string, unknown>
  if (Object.keys(value).some((key) => !FIELDS.includes(key))) {
    throw new Error('Use only the fields described by this tool.')
  }
  const string = (key: string, limit: number, optional = false) => {
    if (optional && value[key] === undefined) return ''
    if (
      typeof value[key] !== 'string' ||
      (value[key] as string).length > limit
    ) {
      throw new Error(`${key} must be text of at most ${limit} characters.`)
    }
    return (value[key] as string).trim()
  }
  const why = string('why', 100)
  const timeline = string('timeline', 30)
  const hasWebsite = string('hasWebsite', 3)
  const contactMethod = string('contactMethod', 5)
  if (!goals.includes(why))
    throw new Error('Choose a why value from the listed goals.')
  if (!TIMELINES.includes(timeline as PreparedIntake['timeline']))
    throw new Error('Choose a listed timeline.')
  if (hasWebsite !== 'yes' && hasWebsite !== 'no')
    throw new Error('hasWebsite must be yes or no.')
  if (contactMethod !== 'email' && contactMethod !== 'text')
    throw new Error('contactMethod must be email or text.')
  const rawLink = string('siteLink', 500)
  let siteLink: string
  try {
    if (!rawLink || /\s/.test(rawLink)) throw new Error()
    const url = new URL(
      /^[a-z][a-z\d+.-]*:/i.test(rawLink) ? rawLink : `https://${rawLink}`,
    )
    if (
      !['http:', 'https:'].includes(url.protocol) ||
      !/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(url.hostname) ||
      url.username ||
      url.password
    )
      throw new Error()
    siteLink = url.href
    if (siteLink.length > 500) throw new Error()
  } catch {
    throw new Error(
      'siteLink must be a valid HTTP(S) website or social profile link of at most 500 characters.',
    )
  }
  const email = string('email', 254, true)
  const phone = string('phone', 30, true)
  const source = string('source', 100, true)
  if (contactMethod === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error('Provide a valid email for email contact.')
  if (
    contactMethod === 'text' &&
    (!/^[+\d\s().-]+$/.test(phone) ||
      phone.replace(/\D/g, '').length < 10 ||
      phone.replace(/\D/g, '').length > 15)
  )
    throw new Error(
      'Provide a phone number containing 10 to 15 digits for text contact.',
    )
  if (source && !SOURCES.includes(source))
    throw new Error('Choose a listed source or omit source.')
  return {
    why,
    timeline: timeline as PreparedIntake['timeline'],
    hasWebsite,
    siteLink,
    contactMethod,
    email: contactMethod === 'email' ? email : '',
    phone: contactMethod === 'text' ? phone : '',
    source,
  }
}

/** Prepares the entire wizard for visible review. This hook never sends a lead. */
export function useIntakeWebMCP({
  service,
  goals,
  onPrepare,
  enabled = true,
}: IntakeOptions) {
  const prepareRef = useRef(onPrepare)
  useEffect(() => {
    prepareRef.current = onPrepare
  }, [onPrepare])
  const goalsKey = JSON.stringify(goals)

  useEffect(() => {
    if (!enabled) return
    // document.modelContext is current; navigator supports early trial builds.
    const current = (document as Document & { modelContext?: ModelContext })
      .modelContext
    const legacy = (navigator as Navigator & { modelContext?: ModelContext })
      .modelContext
    const context =
      typeof current?.registerTool === 'function' ? current : legacy
    if (typeof context?.registerTool !== 'function') return
    const controller = new AbortController()
    const allowedGoals = JSON.parse(goalsKey) as string[]
    const name = `prepare_${service}_intake`
    const tool: Tool = {
      name,
      description: `Fill Prism's ${service} inquiry with the user's details and open the final review step. Returns ready for review, not submitted. The visible submit button sends the inquiry after review.`,
      annotations: { readOnlyHint: false, consequentialHint: false },
      inputSchema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          why: {
            type: 'string',
            enum: allowedGoals,
            description: `The user's main ${service} goal.`,
          },
          timeline: {
            type: 'string',
            enum: [...TIMELINES],
            description: 'Desired start timeframe.',
          },
          hasWebsite: {
            type: 'string',
            enum: ['yes', 'no'],
            description: 'Whether the business has a current website.',
          },
          siteLink: {
            type: 'string',
            maxLength: 500,
            description:
              'Current website, or social profile if there is no website. Plain domains are accepted.',
          },
          contactMethod: {
            type: 'string',
            enum: ['email', 'text'],
            description:
              'The user-selected way for Prism to respond. Text consent is reviewed in the visible form.',
          },
          email: {
            type: 'string',
            maxLength: 254,
            description: 'Required when contactMethod is email.',
          },
          phone: {
            type: 'string',
            maxLength: 30,
            description:
              'Required when contactMethod is text; 10 to 15 digits with optional formatting.',
          },
          source: {
            type: 'string',
            enum: SOURCES,
            description: 'Optional: how the user heard about Prism.',
          },
        },
        required: [
          'why',
          'timeline',
          'hasWebsite',
          'siteLink',
          'contactMethod',
        ],
      },
      execute: async (input, options) => {
        if (controller.signal.aborted || options?.signal?.aborted)
          return { status: 'cancelled', submitted: false }
        try {
          const values = validateInput(input, allowedGoals)
          await prepareRef.current(values)
          return {
            status: 'ready_for_review',
            submitted: false,
            message:
              'The form is filled and ready for review. Review the details and disclosures, then use the visible submit button to send the inquiry.',
          }
        } catch (error) {
          return {
            status: 'error',
            submitted: false,
            message:
              error instanceof Error
                ? error.message
                : 'Unable to prepare the form. Please use the visible form.',
          }
        }
      },
    }
    try {
      // Failure must leave the ordinary form fully usable; never log input/PII.
      Promise.resolve(
        context.registerTool(tool, { signal: controller.signal }),
      ).catch(() => {})
    } catch {
      // Experimental API unavailable or registration rejected.
    }
    return () => {
      controller.abort()
      if (!current && typeof context.unregisterTool === 'function') {
        try {
          context.unregisterTool(name)
        } catch {
          /* Already unregistered. */
        }
      }
    }
  }, [service, goalsKey, enabled])
}
