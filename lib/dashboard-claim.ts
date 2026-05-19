const APPLY_DASHBOARD_CLAIM_URL_STORAGE_KEY = 'prism_apply_dashboard_claim_url_v1'

export function extractDashboardClaimUrl(payload: unknown) {
  if (!payload || typeof payload !== 'object') {
    return null
  }

  const dashboard = (payload as { dashboard?: unknown }).dashboard

  if (!dashboard || typeof dashboard !== 'object') {
    return null
  }

  const claimUrl = (dashboard as { claimUrl?: unknown }).claimUrl

  return typeof claimUrl === 'string' && isValidDashboardClaimUrl(claimUrl)
    ? claimUrl
    : null
}

export function storeApplyDashboardClaimUrl(claimUrl: string | null | undefined) {
  if (!claimUrl || !isValidDashboardClaimUrl(claimUrl) || !canUseSessionStorage()) {
    return
  }

  try {
    window.sessionStorage.setItem(APPLY_DASHBOARD_CLAIM_URL_STORAGE_KEY, claimUrl)
  } catch {
    // no-op
  }
}

export function readApplyDashboardClaimUrl() {
  if (!canUseSessionStorage()) {
    return null
  }

  try {
    const claimUrl = window.sessionStorage.getItem(APPLY_DASHBOARD_CLAIM_URL_STORAGE_KEY)
    return claimUrl && isValidDashboardClaimUrl(claimUrl) ? claimUrl : null
  } catch {
    return null
  }
}

function canUseSessionStorage() {
  return typeof window !== 'undefined' && Boolean(window.sessionStorage)
}

function isValidDashboardClaimUrl(value: string) {
  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol) && url.pathname.startsWith('/claim/')
  } catch {
    return false
  }
}
