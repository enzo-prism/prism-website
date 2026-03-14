"use client"

export type AttributionPayload = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  gclid?: string
  fbclid?: string
  msclkid?: string
  landing_path?: string
  first_touch_source?: string
  first_touch_medium?: string
  first_touch_campaign?: string
  first_touch_at?: string
  submission_path?: string
}

const ATTRIBUTION_STORAGE_KEY = "prism_attribution_v1"
const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000
const ATTRIBUTION_FIELDS: Array<keyof AttributionPayload> = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
  "msclkid",
  "landing_path",
  "first_touch_source",
  "first_touch_medium",
  "first_touch_campaign",
  "first_touch_at",
  "submission_path",
]

function parseAttributionFromUrl(): AttributionPayload {
  if (typeof window === "undefined") return {}

  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
    utm_term: params.get("utm_term") ?? undefined,
    gclid: params.get("gclid") ?? undefined,
    fbclid: params.get("fbclid") ?? undefined,
    msclkid: params.get("msclkid") ?? undefined,
  }
}

function readStoredAttribution(): (AttributionPayload & { savedAt?: number }) | null {
  if (typeof window === "undefined") return null

  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as AttributionPayload & { savedAt?: number }
    if (!parsed.savedAt || Date.now() - parsed.savedAt > ATTRIBUTION_TTL_MS) {
      window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY)
      return null
    }

    return parsed
  } catch {
    return null
  }
}

function writeStoredAttribution(payload: AttributionPayload) {
  if (typeof window === "undefined") return

  try {
    const existing = readStoredAttribution() ?? {}
    const merged: AttributionPayload & { savedAt: number } = {
      ...existing,
      ...payload,
      landing_path: existing.landing_path ?? window.location.pathname,
      first_touch_source: existing.first_touch_source ?? payload.utm_source,
      first_touch_medium: existing.first_touch_medium ?? payload.utm_medium,
      first_touch_campaign: existing.first_touch_campaign ?? payload.utm_campaign,
      first_touch_at: existing.first_touch_at ?? new Date().toISOString(),
      savedAt: Date.now(),
    }

    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(merged))
  } catch {
    // no-op
  }
}

export function getAttributionContext(): AttributionPayload {
  if (typeof window === "undefined") return {}

  const fromUrl = parseAttributionFromUrl()
  const hasCampaignParams = Boolean(
    fromUrl.utm_source ||
      fromUrl.utm_medium ||
      fromUrl.utm_campaign ||
      fromUrl.gclid ||
      fromUrl.fbclid ||
      fromUrl.msclkid,
  )

  if (hasCampaignParams) {
    writeStoredAttribution(fromUrl)
  }

  const stored = readStoredAttribution() ?? {}
  return {
    utm_source: fromUrl.utm_source ?? stored.utm_source,
    utm_medium: fromUrl.utm_medium ?? stored.utm_medium,
    utm_campaign: fromUrl.utm_campaign ?? stored.utm_campaign,
    utm_content: fromUrl.utm_content ?? stored.utm_content,
    utm_term: fromUrl.utm_term ?? stored.utm_term,
    gclid: fromUrl.gclid ?? stored.gclid,
    fbclid: fromUrl.fbclid ?? stored.fbclid,
    msclkid: fromUrl.msclkid ?? stored.msclkid,
    landing_path: stored.landing_path,
    first_touch_source: stored.first_touch_source,
    first_touch_medium: stored.first_touch_medium,
    first_touch_campaign: stored.first_touch_campaign,
    first_touch_at: stored.first_touch_at,
  }
}

export function getSubmissionAttribution(): AttributionPayload {
  if (typeof window === "undefined") return {}

  return {
    ...getAttributionContext(),
    submission_path: window.location.pathname,
  }
}

export function appendAttributionToFormData(formData: FormData) {
  const attribution = getSubmissionAttribution()

  for (const field of ATTRIBUTION_FIELDS) {
    const value = attribution[field]
    if (!value) continue
    formData.set(field, value)
  }

  return formData
}

export function syncFormAttributionFields(form: HTMLFormElement) {
  const attribution = getSubmissionAttribution()

  for (const field of ATTRIBUTION_FIELDS) {
    const value = attribution[field]
    const existing = form.querySelector<HTMLInputElement>(`input[type="hidden"][name="${field}"]`)

    if (!value) {
      existing?.remove()
      continue
    }

    if (existing) {
      existing.value = value
      continue
    }

    const input = document.createElement("input")
    input.type = "hidden"
    input.name = field
    input.value = value
    form.appendChild(input)
  }
}
