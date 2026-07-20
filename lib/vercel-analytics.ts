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
