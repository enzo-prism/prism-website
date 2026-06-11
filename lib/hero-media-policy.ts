export type HeroPlaybackMode =
  | "video-autoplay"
  | "video-fallback-poster"
  | "poster-only"

export type HeroPlaybackPolicyOverride = "auto" | "forcePoster"

export type HeroPlaybackReason =
  | "policy-force-poster"
  | "reduced-motion"
  | "network-constrained"
  | "autoplay-rejected"
  | "embedded-webview"
  | "pending-evaluation"
  | "unsupported"
  | "autoplay-allowed"

export type HeroViewportClass = "mobile" | "tablet" | "desktop"

export type HeroPlaybackIntent = {
  mode: HeroPlaybackMode
  reason: HeroPlaybackReason
  state: {
    modeRequested: HeroPlaybackPolicyOverride
    isTouchCoarse: boolean
    reducedMotion: boolean
    viewportClass: HeroViewportClass
    viewportWidth: number
    hasAutoplayError: boolean
    platform: HeroPlaybackPlatform
    saveData: boolean
    effectiveType: string
    isEmbeddedWebView: boolean
  }
}

export type HeroPlaybackPolicyInput = {
  playbackPolicy?: HeroPlaybackPolicyOverride
  reducedMotion?: boolean
  isTouchCoarse?: boolean
  viewportWidth?: number
  hasAutoplayError?: boolean
  platform?: HeroPlaybackPlatform
  saveData?: boolean
  effectiveType?: string
  isEmbeddedWebView?: boolean
}

export type HeroPlaybackPlatform = "ios" | "android" | "other" | "unknown"

const MOBILE_VIEWPORT_MAX_WIDTH = 768

export function resolveViewportClass(viewportWidth: number | null | undefined): HeroViewportClass {
  if (viewportWidth == null) return "desktop"
  if (viewportWidth < MOBILE_VIEWPORT_MAX_WIDTH) return "mobile"
  if (viewportWidth < 1100) return "tablet"
  return "desktop"
}

export function resolveHeroPlaybackPolicy({
  playbackPolicy = "auto",
  reducedMotion = false,
  isTouchCoarse = false,
  viewportWidth = Number.NaN,
  hasAutoplayError = false,
  platform = "unknown",
  saveData = false,
  effectiveType = "",
  isEmbeddedWebView = false,
}: HeroPlaybackPolicyInput): HeroPlaybackIntent {
  const viewportClass = resolveViewportClass(
    Number.isFinite(viewportWidth) ? viewportWidth : null,
  )
  const normalizedEffectiveType = effectiveType.toLowerCase()
  const isConstrainedNetwork =
    saveData ||
    normalizedEffectiveType === "slow-2g" ||
    normalizedEffectiveType === "2g"

  const state: HeroPlaybackIntent["state"] = {
    modeRequested: playbackPolicy,
    isTouchCoarse,
    reducedMotion,
    viewportClass,
    viewportWidth: Number.isFinite(viewportWidth) ? viewportWidth : -1,
    hasAutoplayError,
    platform,
    saveData,
    effectiveType: normalizedEffectiveType,
    isEmbeddedWebView,
  }

  if (playbackPolicy === "forcePoster") {
    return { mode: "poster-only", reason: "policy-force-poster", state }
  }

  if (hasAutoplayError) {
    return { mode: "video-fallback-poster", reason: "autoplay-rejected", state }
  }

  // In-app webviews can disallow inline playback entirely (WKWebView default),
  // in which case any playing video is hoisted into the native fullscreen
  // player regardless of `playsinline`. Decorative loops stay posters there.
  if (isEmbeddedWebView) {
    return { mode: "video-fallback-poster", reason: "embedded-webview", state }
  }

  if (reducedMotion) {
    return { mode: "video-fallback-poster", reason: "reduced-motion", state }
  }

  if (isConstrainedNetwork) {
    return { mode: "video-fallback-poster", reason: "network-constrained", state }
  }

  return { mode: "video-autoplay", reason: "autoplay-allowed", state }
}

// Server renders and the first client render must never mount the autoplay
// <video>: pre-hydration playback would start before the inline-presentation
// guards attach, which is exactly when embedded browsers hoist the video into
// the native fullscreen player. Real capabilities are evaluated client-side.
export const INITIAL_HERO_PLAYBACK_INTENT: HeroPlaybackIntent = {
  mode: "video-fallback-poster",
  reason: "pending-evaluation",
  state: {
    modeRequested: "auto",
    isTouchCoarse: false,
    reducedMotion: false,
    viewportClass: "desktop",
    viewportWidth: -1,
    hasAutoplayError: false,
    platform: "unknown",
    saveData: false,
    effectiveType: "",
    isEmbeddedWebView: false,
  },
}

export function resolveHeroPlaybackPlatform(
  userAgent: string | undefined,
): HeroPlaybackPlatform {
  if (!userAgent) return "unknown"

  if (/iPhone|iPad|iPod/.test(userAgent)) {
    return "ios"
  }

  if (/Android/.test(userAgent)) {
    return "android"
  }

  return "other"
}

const IN_APP_BROWSER_TOKEN_REGEX =
  /(FBAN|FBAV|FB_IAB|Instagram|MicroMessenger|Snapchat|TikTok|musical_ly|BytedanceWebview|LinkedInApp|Pinterest\/|Line\/|GSA\/)/i

export function isEmbeddedWebViewUserAgent(
  userAgent: string | undefined,
): boolean {
  if (!userAgent) return false

  // Known in-app browsers, including ones that otherwise mimic Safari UAs.
  if (IN_APP_BROWSER_TOKEN_REGEX.test(userAgent)) {
    return true
  }

  // Android WebView marks itself with the `wv` token.
  if (/Android/.test(userAgent) && /\bwv\b/.test(userAgent)) {
    return true
  }

  // iOS WKWebViews omit the trailing `Safari/` token that Safari,
  // SFSafariViewController, and iOS Chrome/Firefox/Edge all include.
  if (/(iPhone|iPad|iPod)/.test(userAgent) && !/Safari\//.test(userAgent)) {
    return true
  }

  return false
}
