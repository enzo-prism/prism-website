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
}: HeroPlaybackPolicyInput): HeroPlaybackIntent {
  const viewportClass = resolveViewportClass(
    Number.isFinite(viewportWidth) ? viewportWidth : null,
  )
  const normalizedEffectiveType = effectiveType.toLowerCase()
  const isConstrainedNetwork =
    saveData ||
    normalizedEffectiveType === "slow-2g" ||
    normalizedEffectiveType === "2g"

  if (playbackPolicy === "forcePoster") {
    return {
      mode: "poster-only",
      reason: "policy-force-poster",
      state: {
        modeRequested: playbackPolicy,
        isTouchCoarse,
        reducedMotion,
        viewportClass,
        viewportWidth: Number.isFinite(viewportWidth) ? viewportWidth : -1,
        hasAutoplayError,
        platform,
        saveData,
        effectiveType: normalizedEffectiveType,
      },
    }
  }

  if (hasAutoplayError) {
    return {
      mode: "video-fallback-poster",
      reason: "autoplay-rejected",
      state: {
        modeRequested: playbackPolicy,
        isTouchCoarse,
        reducedMotion,
        viewportClass,
        viewportWidth: Number.isFinite(viewportWidth) ? viewportWidth : -1,
        hasAutoplayError,
        platform,
        saveData,
        effectiveType: normalizedEffectiveType,
      },
    }
  }

  if (reducedMotion) {
    return {
      mode: "video-fallback-poster",
      reason: "reduced-motion",
      state: {
        modeRequested: playbackPolicy,
        isTouchCoarse,
        reducedMotion,
        viewportClass,
        viewportWidth: Number.isFinite(viewportWidth) ? viewportWidth : -1,
        hasAutoplayError,
        platform,
        saveData,
        effectiveType: normalizedEffectiveType,
      },
    }
  }

  if (isConstrainedNetwork) {
    return {
      mode: "video-fallback-poster",
      reason: "network-constrained",
      state: {
        modeRequested: playbackPolicy,
        isTouchCoarse,
        reducedMotion,
        viewportClass,
        viewportWidth: Number.isFinite(viewportWidth) ? viewportWidth : -1,
        hasAutoplayError,
        platform,
        saveData,
        effectiveType: normalizedEffectiveType,
      },
    }
  }

  return {
    mode: "video-autoplay",
    reason: "autoplay-allowed",
    state: {
      modeRequested: playbackPolicy,
      isTouchCoarse,
      reducedMotion,
      viewportClass,
      viewportWidth: Number.isFinite(viewportWidth) ? viewportWidth : -1,
      hasAutoplayError,
      platform,
      saveData,
      effectiveType: normalizedEffectiveType,
    },
  }
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
