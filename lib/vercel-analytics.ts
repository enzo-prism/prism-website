export type VercelAnalyticsEvent = {
  type: "pageview" | "event"
  url: string
}

const FALLBACK_ANALYTICS_ORIGIN = "https://www.design-prism.com"

/**
 * Strip search params and hashes so marketing query params do not fragment page reports.
 */
export function normalizeVercelAnalyticsUrl(url: string, baseUrl = FALLBACK_ANALYTICS_ORIGIN) {
  try {
    const parsed = new URL(url, baseUrl)
    parsed.search = ""
    parsed.hash = ""
    return parsed.toString()
  } catch {
    return url.split("#")[0]?.split("?")[0] ?? url
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
