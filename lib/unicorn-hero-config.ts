export const UNICORN_SDK_URL = "/unicorn/unicornStudio.umd.js"

export type HeroRenderProfile = {
  fps: 30 | 60
  dpi: 1 | 1.5
}

type NavigatorConnectionInfo = Navigator & {
  connection?: {
    saveData?: boolean
    effectiveType?: string
  }
}

const DESKTOP_PROFILE: HeroRenderProfile = {
  fps: 60,
  dpi: 1.5,
}

const MOBILE_OR_REDUCED_DATA_PROFILE: HeroRenderProfile = {
  fps: 30,
  dpi: 1,
}

function prefersReducedData() {
  if (typeof navigator === "undefined") return false

  const nav = navigator as NavigatorConnectionInfo
  const connection = nav.connection
  if (!connection) return false

  if (connection.saveData) return true
  const effectiveType = connection.effectiveType?.toLowerCase() ?? ""
  return effectiveType.includes("2g") || effectiveType === "3g"
}

function prefersMobileRenderProfile() {
  if (typeof window === "undefined") return false
  if (typeof window.matchMedia !== "function") return false

  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(max-width: 768px)").matches
  )
}

export function getHeroRenderProfile(): HeroRenderProfile {
  if (typeof window === "undefined") return DESKTOP_PROFILE
  if (prefersReducedData() || prefersMobileRenderProfile()) {
    return MOBILE_OR_REDUCED_DATA_PROFILE
  }
  return DESKTOP_PROFILE
}
