/**
 * Internal traffic opt-out.
 *
 * Prism's own team and its agents browse production all day, and on a site
 * with a few hundred real visitors a month that is enough to distort every
 * rate. IP rules do not follow laptops, phones, or agents, so this is a
 * first-party flag instead: open any page once with `?internal=1` and that
 * browser stops reporting to GA4, Google Ads, Vercel Web Analytics, and
 * Hotjar until `?internal=0` clears it. Nothing is sent, so it works whether
 * or not the GA4 internal-traffic filter is active.
 *
 * Keep the key and the query checks in sync with the inline scripts in
 * app/layout.tsx, which run before this module loads.
 */
export const INTERNAL_TRAFFIC_STORAGE_KEY = 'prism_internal'
export const INTERNAL_TRAFFIC_PARAM = 'internal'

function readParam(search: string): '1' | '0' | null {
  try {
    const value = new URLSearchParams(search).get(INTERNAL_TRAFFIC_PARAM)
    return value === '1' || value === '0' ? value : null
  } catch {
    return null
  }
}

/** True when this browser has opted out as internal traffic. */
export function isInternalTraffic(): boolean {
  if (typeof window === 'undefined') return false

  try {
    const requested = readParam(window.location.search)
    if (requested === '1') {
      window.localStorage.setItem(INTERNAL_TRAFFIC_STORAGE_KEY, '1')
    } else if (requested === '0') {
      window.localStorage.removeItem(INTERNAL_TRAFFIC_STORAGE_KEY)
    }
    return window.localStorage.getItem(INTERNAL_TRAFFIC_STORAGE_KEY) === '1'
  } catch {
    // Storage blocked (private mode, strict settings): fall back to the URL.
    return readParam(window.location.search) === '1'
  }
}
