export type VercelAnalyticsEvent = {
  type: 'pageview' | 'event'
  url: string
}

type AllowedVercelPropertyValue = string | number | boolean | null | undefined
type VercelCustomEvent = {
  name: string
  properties?: Record<string, AllowedVercelPropertyValue>
}

const FALLBACK_ANALYTICS_ORIGIN = 'https://www.design-prism.com'
const ALLOWED_MARKETING_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const
const WEBSITE_INTAKE_FORM_NAME = 'website_intake'
const WEBSITE_INTAKE_FORM_LOCATIONS = new Set([
  'website_intake_page',
  'success_screen',
])
const WEBSITE_INTAKE_STEP_IDS = new Set([
  'why',
  'timeline',
  'current-site',
  'contact',
])
const WEBSITE_INTAKE_OPTIONS_BY_STEP: Record<string, ReadonlySet<string>> = {
  why: new Set([
    'more_customers',
    'better_design',
    'better_analytics',
    'all_of_the_above',
  ]),
  timeline: new Set(['next_week', 'next_30_days', 'next_3_months']),
  'current-site': new Set(['yes', 'no']),
  contact: new Set(['email', 'text']),
}
const WEBSITE_INTAKE_FIELD_NAMES = new Set([
  'why',
  'timeline',
  'has_website',
  'site_link',
  'contact_method',
  'email',
  'phone',
])
const WEBSITE_INTAKE_SOURCES = new Set([
  'A friend told me',
  'TikTok',
  'Instagram',
  'Google Search',
  'ChatGPT (or another AI Search)',
])
const WEBSITE_INTAKE_ERROR_REASONS = new Set([
  'network_failure',
  'non_ok_response',
  'timeout',
])

function compactProperties(
  properties: Record<string, AllowedVercelPropertyValue>,
): Record<string, AllowedVercelPropertyValue> | undefined {
  const entries = Object.entries(properties).filter(
    ([, value]) => value !== undefined && value !== '',
  )
  return entries.length > 0 ? Object.fromEntries(entries) : undefined
}

function getHostname(url: unknown) {
  if (typeof url !== 'string' || url.length === 0) return undefined

  try {
    return new URL(url).hostname
  } catch {
    return undefined
  }
}

function getDestinationHost(eventParams: Record<string, unknown>) {
  if (typeof eventParams.destination_host === 'string') {
    return eventParams.destination_host
  }

  return getHostname(eventParams.destination_url)
}

function getAllowedString(value: unknown, allowed: ReadonlySet<string>) {
  return typeof value === 'string' && allowed.has(value) ? value : undefined
}

function getWebsiteIntakeFormName(value: unknown) {
  return value === WEBSITE_INTAKE_FORM_NAME
    ? WEBSITE_INTAKE_FORM_NAME
    : undefined
}

function getWebsiteIntakeStep(value: unknown) {
  return typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= 4
    ? value
    : undefined
}

function getWebsiteIntakeOption(eventParams: Record<string, unknown>) {
  const stepId = getAllowedString(eventParams.step_id, WEBSITE_INTAKE_STEP_IDS)
  if (!stepId) return undefined

  return getAllowedString(
    eventParams.option,
    WEBSITE_INTAKE_OPTIONS_BY_STEP[stepId],
  )
}

function getWebsiteIntakeElapsedSeconds(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? Math.round(value)
    : undefined
}

function getWebsiteIntakeStatus(value: unknown) {
  return typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= 100 &&
    value <= 599
    ? value
    : undefined
}

/**
 * Preserve UTM params for campaign filtering while removing everything else.
 */
export function normalizeVercelAnalyticsUrl(
  url: string,
  baseUrl = FALLBACK_ANALYTICS_ORIGIN,
) {
  try {
    const parsed = new URL(url, baseUrl)
    const safeParams = new URLSearchParams()

    for (const key of ALLOWED_MARKETING_PARAMS) {
      const value = parsed.searchParams.get(key)
      if (value) safeParams.set(key, value)
    }

    parsed.search = safeParams.toString()
    parsed.hash = ''
    return parsed.toString()
  } catch {
    const [pathWithoutHash] = url.split('#')
    const [basePath, rawSearch = ''] = pathWithoutHash.split('?')
    const parsedSearch = new URLSearchParams(rawSearch)
    const safeParams = new URLSearchParams()

    for (const key of ALLOWED_MARKETING_PARAMS) {
      const value = parsedSearch.get(key)
      if (value) safeParams.set(key, value)
    }

    const search = safeParams.toString()
    return search ? `${basePath}?${search}` : basePath
  }
}

export function sanitizeVercelAnalyticsEvent(
  event: VercelAnalyticsEvent,
): VercelAnalyticsEvent {
  const normalizedUrl = normalizeVercelAnalyticsUrl(event.url)

  if (normalizedUrl === event.url) {
    return event
  }

  return {
    ...event,
    url: normalizedUrl,
  }
}

export function buildVercelCustomEvent(
  eventName: string,
  params?: Record<string, unknown>,
): VercelCustomEvent | null {
  const eventParams = params ?? {}

  switch (eventName) {
    case 'cta_click':
      return {
        name: 'CTA Clicked',
        properties: compactProperties({
          cta_text:
            typeof eventParams.cta_text === 'string'
              ? eventParams.cta_text
              : undefined,
          cta_location:
            typeof eventParams.cta_location === 'string'
              ? eventParams.cta_location
              : undefined,
        }),
      }
    case 'form_submit':
    case 'form_submit_success':
      return {
        name: 'Form Submitted',
        properties: compactProperties({
          form_name:
            typeof eventParams.form_name === 'string'
              ? eventParams.form_name
              : undefined,
          form_location:
            typeof eventParams.form_location === 'string'
              ? eventParams.form_location
              : undefined,
        }),
      }
    case 'website_intake_form_view':
      return {
        name: 'Website Intake Form Viewed',
        properties: compactProperties({
          form_name: getWebsiteIntakeFormName(eventParams.form_name),
          form_location: getAllowedString(
            eventParams.form_location,
            WEBSITE_INTAKE_FORM_LOCATIONS,
          ),
        }),
      }
    case 'website_intake_form_start':
      return {
        name: 'Website Intake Form Started',
        properties: compactProperties({
          form_name: getWebsiteIntakeFormName(eventParams.form_name),
          form_location: getAllowedString(
            eventParams.form_location,
            WEBSITE_INTAKE_FORM_LOCATIONS,
          ),
          step: getWebsiteIntakeStep(eventParams.step),
          step_id: getAllowedString(
            eventParams.step_id,
            WEBSITE_INTAKE_STEP_IDS,
          ),
          question_count:
            eventParams.question_count === 4
              ? eventParams.question_count
              : undefined,
        }),
      }
    case 'website_intake_step_view':
      return {
        name: 'Website Intake Step Viewed',
        properties: compactProperties({
          form_name: getWebsiteIntakeFormName(eventParams.form_name),
          form_location: getAllowedString(
            eventParams.form_location,
            WEBSITE_INTAKE_FORM_LOCATIONS,
          ),
          step: getWebsiteIntakeStep(eventParams.step),
          step_id: getAllowedString(
            eventParams.step_id,
            WEBSITE_INTAKE_STEP_IDS,
          ),
          question_count:
            eventParams.question_count === 4
              ? eventParams.question_count
              : undefined,
        }),
      }
    case 'website_intake_step_complete':
      return {
        name: 'Website Intake Step Completed',
        properties: compactProperties({
          form_name: getWebsiteIntakeFormName(eventParams.form_name),
          form_location: getAllowedString(
            eventParams.form_location,
            WEBSITE_INTAKE_FORM_LOCATIONS,
          ),
          step: getWebsiteIntakeStep(eventParams.step),
          step_id: getAllowedString(
            eventParams.step_id,
            WEBSITE_INTAKE_STEP_IDS,
          ),
          question_count:
            eventParams.question_count === 4
              ? eventParams.question_count
              : undefined,
        }),
      }
    case 'website_intake_option_select':
      return {
        name: 'Website Intake Option Selected',
        properties: compactProperties({
          form_name: getWebsiteIntakeFormName(eventParams.form_name),
          step_id: getAllowedString(
            eventParams.step_id,
            WEBSITE_INTAKE_STEP_IDS,
          ),
          option: getWebsiteIntakeOption(eventParams),
        }),
      }
    case 'website_intake_validation_error':
      return {
        name: 'Website Intake Validation Error',
        properties: compactProperties({
          form_name: getWebsiteIntakeFormName(eventParams.form_name),
          step: getWebsiteIntakeStep(eventParams.step),
          step_id: getAllowedString(
            eventParams.step_id,
            WEBSITE_INTAKE_STEP_IDS,
          ),
          field_name: getAllowedString(
            eventParams.field_name,
            WEBSITE_INTAKE_FIELD_NAMES,
          ),
        }),
      }
    case 'website_intake_submit_attempt':
      return {
        name: 'Website Intake Submit Attempted',
        properties: compactProperties({
          form_name: getWebsiteIntakeFormName(eventParams.form_name),
          form_location: getAllowedString(
            eventParams.form_location,
            WEBSITE_INTAKE_FORM_LOCATIONS,
          ),
          elapsed_seconds: getWebsiteIntakeElapsedSeconds(
            eventParams.elapsed_seconds,
          ),
        }),
      }
    case 'website_intake_submit_success':
      return {
        name: 'Website Intake Submit Succeeded',
        properties: compactProperties({
          form_name: getWebsiteIntakeFormName(eventParams.form_name),
          form_location: getAllowedString(
            eventParams.form_location,
            WEBSITE_INTAKE_FORM_LOCATIONS,
          ),
          elapsed_seconds: getWebsiteIntakeElapsedSeconds(
            eventParams.elapsed_seconds,
          ),
        }),
      }
    case 'website_intake_submit_error':
      return {
        name: 'Website Intake Submit Error',
        properties: compactProperties({
          form_name: getWebsiteIntakeFormName(eventParams.form_name),
          reason: getAllowedString(
            eventParams.reason,
            WEBSITE_INTAKE_ERROR_REASONS,
          ),
          status: getWebsiteIntakeStatus(eventParams.status),
        }),
      }
    case 'website_intake_source_select':
      return {
        name: 'Website Intake Source Selected',
        properties: compactProperties({
          form_name: getWebsiteIntakeFormName(eventParams.form_name),
          source: getAllowedString(eventParams.source, WEBSITE_INTAKE_SOURCES),
        }),
      }
    case 'website_intake_booking_click':
      return {
        name: 'Website Intake Booking Clicked',
        properties: compactProperties({
          form_name: getWebsiteIntakeFormName(eventParams.form_name),
          form_location: getAllowedString(
            eventParams.form_location,
            WEBSITE_INTAKE_FORM_LOCATIONS,
          ),
        }),
      }
    case 'website_intake_abandon':
      return {
        name: 'Website Intake Abandoned',
        properties: compactProperties({
          form_name: getWebsiteIntakeFormName(eventParams.form_name),
          form_location: getAllowedString(
            eventParams.form_location,
            WEBSITE_INTAKE_FORM_LOCATIONS,
          ),
          funnel_step: getWebsiteIntakeStep(eventParams.funnel_step),
          funnel_step_id: getAllowedString(
            eventParams.funnel_step_id,
            WEBSITE_INTAKE_STEP_IDS,
          ),
        }),
      }
    case 'apply_form_view':
      return {
        name: 'Apply Form Viewed',
        properties: compactProperties({
          form_location:
            typeof eventParams.form_location === 'string'
              ? eventParams.form_location
              : undefined,
        }),
      }
    case 'apply_form_start':
      return {
        name: 'Apply Form Started',
        properties: compactProperties({
          form_name:
            typeof eventParams.form_name === 'string'
              ? eventParams.form_name
              : undefined,
          form_location:
            typeof eventParams.form_location === 'string'
              ? eventParams.form_location
              : undefined,
          step:
            typeof eventParams.step === 'number' ? eventParams.step : undefined,
          step_id:
            typeof eventParams.step_id === 'string'
              ? eventParams.step_id
              : undefined,
        }),
      }
    case 'apply_question_view':
      return {
        name: 'Apply Question Viewed',
        properties: compactProperties({
          step:
            typeof eventParams.step === 'number' ? eventParams.step : undefined,
          step_id:
            typeof eventParams.step_id === 'string'
              ? eventParams.step_id
              : undefined,
          service_count:
            typeof eventParams.service_count === 'number'
              ? eventParams.service_count
              : undefined,
        }),
      }
    case 'apply_question_complete':
      return {
        name: 'Apply Question Completed',
        properties: compactProperties({
          step:
            typeof eventParams.step === 'number' ? eventParams.step : undefined,
          step_id:
            typeof eventParams.step_id === 'string'
              ? eventParams.step_id
              : undefined,
          service_count:
            typeof eventParams.service_count === 'number'
              ? eventParams.service_count
              : undefined,
        }),
      }
    case 'apply_review_view':
      return {
        name: 'Apply Review Viewed',
        properties: compactProperties({
          step:
            typeof eventParams.step === 'number' ? eventParams.step : undefined,
          step_id:
            typeof eventParams.step_id === 'string'
              ? eventParams.step_id
              : undefined,
          service_count:
            typeof eventParams.service_count === 'number'
              ? eventParams.service_count
              : undefined,
        }),
      }
    case 'apply_validation_error':
      return {
        name: 'Apply Validation Error',
        properties: compactProperties({
          step:
            typeof eventParams.step === 'number' ? eventParams.step : undefined,
          step_id:
            typeof eventParams.step_id === 'string'
              ? eventParams.step_id
              : undefined,
          field_name:
            typeof eventParams.field_name === 'string'
              ? eventParams.field_name
              : undefined,
          error_type:
            typeof eventParams.error_type === 'string'
              ? eventParams.error_type
              : undefined,
        }),
      }
    case 'apply_step_1_complete':
    case 'apply_step_2_complete':
      return {
        name: 'Apply Step Completed',
        properties: compactProperties({
          step:
            typeof eventParams.step === 'number' ? eventParams.step : undefined,
          budget:
            typeof eventParams.budget === 'string'
              ? eventParams.budget
              : undefined,
          service_count:
            typeof eventParams.service_count === 'number'
              ? eventParams.service_count
              : undefined,
        }),
      }
    case 'apply_submit_attempt':
      return {
        name: 'Apply Submit Attempted',
        properties: compactProperties({
          budget:
            typeof eventParams.budget === 'string'
              ? eventParams.budget
              : undefined,
          timeline:
            typeof eventParams.timeline === 'string'
              ? eventParams.timeline
              : undefined,
          service_count:
            typeof eventParams.service_count === 'number'
              ? eventParams.service_count
              : undefined,
        }),
      }
    case 'apply_submit':
      return {
        name: 'Apply Submitted',
        properties: compactProperties({
          budget:
            typeof eventParams.budget === 'string'
              ? eventParams.budget
              : undefined,
          timeline:
            typeof eventParams.timeline === 'string'
              ? eventParams.timeline
              : undefined,
          service_count:
            typeof eventParams.service_count === 'number'
              ? eventParams.service_count
              : undefined,
        }),
      }
    case 'apply_submit_success':
      return {
        name: 'Apply Submit Succeeded',
        properties: compactProperties({
          budget:
            typeof eventParams.budget === 'string'
              ? eventParams.budget
              : undefined,
          timeline:
            typeof eventParams.timeline === 'string'
              ? eventParams.timeline
              : undefined,
          service_count:
            typeof eventParams.service_count === 'number'
              ? eventParams.service_count
              : undefined,
        }),
      }
    case 'apply_success':
      return {
        name: 'Apply Success',
        properties: compactProperties({
          source:
            typeof eventParams.source === 'string'
              ? eventParams.source
              : undefined,
          budget:
            typeof eventParams.budget === 'string'
              ? eventParams.budget
              : undefined,
          timeline:
            typeof eventParams.timeline === 'string'
              ? eventParams.timeline
              : undefined,
          has_website:
            typeof eventParams.has_website === 'string'
              ? eventParams.has_website
              : undefined,
          primary_goal:
            typeof eventParams.primary_goal === 'string'
              ? eventParams.primary_goal
              : undefined,
          service_count:
            typeof eventParams.service_count === 'number'
              ? eventParams.service_count
              : undefined,
        }),
      }
    case 'generate_lead':
      return {
        name: 'Lead Generated',
        properties: compactProperties({
          form_name:
            typeof eventParams.form_name === 'string'
              ? eventParams.form_name
              : undefined,
          form_location:
            typeof eventParams.form_location === 'string'
              ? eventParams.form_location
              : undefined,
          lead_type:
            typeof eventParams.lead_type === 'string'
              ? eventParams.lead_type
              : undefined,
          lead_source:
            typeof eventParams.lead_source === 'string'
              ? eventParams.lead_source
              : undefined,
          budget:
            typeof eventParams.budget === 'string'
              ? eventParams.budget
              : undefined,
          timeline:
            typeof eventParams.timeline === 'string'
              ? eventParams.timeline
              : undefined,
          has_website:
            typeof eventParams.has_website === 'string'
              ? eventParams.has_website
              : undefined,
          primary_goal:
            typeof eventParams.primary_goal === 'string'
              ? eventParams.primary_goal
              : undefined,
          service_count:
            typeof eventParams.service_count === 'number'
              ? eventParams.service_count
              : undefined,
        }),
      }
    case 'apply_error':
      return {
        name: 'Apply Error',
        properties: compactProperties({
          reason:
            typeof eventParams.reason === 'string'
              ? eventParams.reason
              : undefined,
          status:
            typeof eventParams.status === 'number'
              ? eventParams.status
              : undefined,
          step_id:
            typeof eventParams.step_id === 'string'
              ? eventParams.step_id
              : undefined,
        }),
      }
    case 'apply_abandon_step_1':
    case 'apply_abandon_step_2':
      return {
        name: 'Apply Abandoned',
        properties: compactProperties({
          step:
            typeof eventParams.step === 'number' ? eventParams.step : undefined,
          funnel_step_id:
            typeof eventParams.funnel_step_id === 'string'
              ? eventParams.funnel_step_id
              : undefined,
        }),
      }
    case 'apply_budget_selected':
      return {
        name: 'Apply Budget Selected',
        properties: compactProperties({
          budget:
            typeof eventParams.budget === 'string'
              ? eventParams.budget
              : undefined,
        }),
      }
    case 'apply_service_selected':
      return {
        name: 'Apply Service Selected',
        properties: compactProperties({
          service:
            typeof eventParams.service === 'string'
              ? eventParams.service
              : undefined,
          selected:
            typeof eventParams.selected === 'boolean'
              ? eventParams.selected
              : undefined,
        }),
      }
    case 'website_order_started':
      return {
        name: 'Website Order Started',
        properties: compactProperties({
          form_name:
            typeof eventParams.form_name === 'string'
              ? eventParams.form_name
              : undefined,
          form_location:
            typeof eventParams.form_location === 'string'
              ? eventParams.form_location
              : undefined,
          entry_point:
            typeof eventParams.entry_point === 'string'
              ? eventParams.entry_point
              : undefined,
        }),
      }
    case 'website_order_step_completed':
      return {
        name: 'Website Order Step Completed',
        properties: compactProperties({
          step:
            typeof eventParams.step === 'number' ? eventParams.step : undefined,
          step_id:
            typeof eventParams.step_id === 'string'
              ? eventParams.step_id
              : undefined,
        }),
      }
    case 'website_order_submitted':
      return {
        name: 'Website Order Submitted',
        properties: compactProperties({
          value:
            typeof eventParams.value === 'number'
              ? eventParams.value
              : undefined,
          currency:
            typeof eventParams.currency === 'string'
              ? eventParams.currency
              : undefined,
          form_name:
            typeof eventParams.form_name === 'string'
              ? eventParams.form_name
              : undefined,
          form_location:
            typeof eventParams.form_location === 'string'
              ? eventParams.form_location
              : undefined,
        }),
      }
    case 'website_order_begin_checkout':
      return {
        name: 'Website Order Checkout Started',
        properties: compactProperties({
          value:
            typeof eventParams.value === 'number'
              ? eventParams.value
              : undefined,
          currency:
            typeof eventParams.currency === 'string'
              ? eventParams.currency
              : undefined,
          form_location:
            typeof eventParams.form_location === 'string'
              ? eventParams.form_location
              : undefined,
        }),
      }
    case 'purchase':
      return {
        name: 'Purchase Completed',
        properties: compactProperties({
          value:
            typeof eventParams.value === 'number'
              ? eventParams.value
              : undefined,
          currency:
            typeof eventParams.currency === 'string'
              ? eventParams.currency
              : undefined,
          item_name:
            typeof eventParams.item_name === 'string'
              ? eventParams.item_name
              : undefined,
        }),
      }
    case 'service_card_click':
      return {
        name: 'Service Card Clicked',
        properties: compactProperties({
          service_name:
            typeof eventParams.service_name === 'string'
              ? eventParams.service_name
              : undefined,
          destination:
            typeof eventParams.destination === 'string'
              ? eventParams.destination
              : undefined,
        }),
      }
    case 'external_link_click':
      return {
        name: 'External Link Clicked',
        properties: compactProperties({
          destination_host: getDestinationHost(eventParams),
          link_text:
            typeof eventParams.link_text === 'string'
              ? eventParams.link_text
              : undefined,
        }),
      }
    case 'book_call_click':
      return {
        name: 'Book Call Clicked',
        properties: compactProperties({
          destination_host: getDestinationHost(eventParams),
          booking_location:
            typeof eventParams.booking_location === 'string'
              ? eventParams.booking_location
              : undefined,
          link_text:
            typeof eventParams.link_text === 'string'
              ? eventParams.link_text
              : undefined,
        }),
      }
    case 'contact_action_click':
      return {
        name: 'Contact Action Clicked',
        properties: compactProperties({
          contact_method:
            typeof eventParams.contact_method === 'string'
              ? eventParams.contact_method
              : undefined,
          contact_location:
            typeof eventParams.contact_location === 'string'
              ? eventParams.contact_location
              : undefined,
        }),
      }
    case 'file_download':
      return {
        name: 'File Downloaded',
        properties: compactProperties({
          file_name:
            typeof eventParams.file_name === 'string'
              ? eventParams.file_name
              : undefined,
          file_type:
            typeof eventParams.file_type === 'string'
              ? eventParams.file_type
              : undefined,
        }),
      }
    case 'video_interaction':
      return {
        name: 'Video Interaction',
        properties: compactProperties({
          action:
            typeof eventParams.action === 'string'
              ? eventParams.action
              : undefined,
          video_id:
            typeof eventParams.video_id === 'string'
              ? eventParams.video_id
              : undefined,
        }),
      }
    default:
      return null
  }
}
