export type VercelAnalyticsEvent = {
  type: "pageview" | "event"
  url: string
}

type AllowedVercelPropertyValue = string | number | boolean | null | undefined
type VercelCustomEvent = {
  name: string
  properties?: Record<string, AllowedVercelPropertyValue>
}

const FALLBACK_ANALYTICS_ORIGIN = "https://www.design-prism.com"
const ALLOWED_MARKETING_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const

function compactProperties(
  properties: Record<string, AllowedVercelPropertyValue>,
): Record<string, AllowedVercelPropertyValue> | undefined {
  const entries = Object.entries(properties).filter(([, value]) => value !== undefined && value !== "")
  return entries.length > 0 ? Object.fromEntries(entries) : undefined
}

function getHostname(url: unknown) {
  if (typeof url !== "string" || url.length === 0) return undefined

  try {
    return new URL(url).hostname
  } catch {
    return undefined
  }
}

/**
 * Preserve UTM params for campaign filtering while removing everything else.
 */
export function normalizeVercelAnalyticsUrl(url: string, baseUrl = FALLBACK_ANALYTICS_ORIGIN) {
  try {
    const parsed = new URL(url, baseUrl)
    const safeParams = new URLSearchParams()

    for (const key of ALLOWED_MARKETING_PARAMS) {
      const value = parsed.searchParams.get(key)
      if (value) safeParams.set(key, value)
    }

    parsed.search = safeParams.toString()
    parsed.hash = ""
    return parsed.toString()
  } catch {
    const [pathWithoutHash] = url.split("#")
    const [basePath, rawSearch = ""] = pathWithoutHash.split("?")
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

export function sanitizeVercelAnalyticsEvent(event: VercelAnalyticsEvent): VercelAnalyticsEvent {
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
    case "cta_click":
      return {
        name: "CTA Clicked",
        properties: compactProperties({
          cta_text: typeof eventParams.cta_text === "string" ? eventParams.cta_text : undefined,
          cta_location: typeof eventParams.cta_location === "string" ? eventParams.cta_location : undefined,
        }),
      }
    case "form_submit":
      return {
        name: "Form Submitted",
        properties: compactProperties({
          form_name: typeof eventParams.form_name === "string" ? eventParams.form_name : undefined,
          form_location: typeof eventParams.form_location === "string" ? eventParams.form_location : undefined,
        }),
      }
    case "service_card_click":
      return {
        name: "Service Card Clicked",
        properties: compactProperties({
          service_name: typeof eventParams.service_name === "string" ? eventParams.service_name : undefined,
          destination: typeof eventParams.destination === "string" ? eventParams.destination : undefined,
        }),
      }
    case "external_link_click":
      return {
        name: "External Link Clicked",
        properties: compactProperties({
          destination_host: getHostname(eventParams.destination_url),
          link_text: typeof eventParams.link_text === "string" ? eventParams.link_text : undefined,
        }),
      }
    case "file_download":
      return {
        name: "File Downloaded",
        properties: compactProperties({
          file_name: typeof eventParams.file_name === "string" ? eventParams.file_name : undefined,
          file_type: typeof eventParams.file_type === "string" ? eventParams.file_type : undefined,
        }),
      }
    case "video_interaction":
      return {
        name: "Video Interaction",
        properties: compactProperties({
          action: typeof eventParams.action === "string" ? eventParams.action : undefined,
          video_id: typeof eventParams.video_id === "string" ? eventParams.video_id : undefined,
        }),
      }
    default:
      return null
  }
}
