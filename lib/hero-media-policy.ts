export type HeroPlaybackMode =
  | "video-autoplay"
  | "video-fallback-poster"
  | "poster-only"

export type HeroPlaybackPolicyOverride = "auto" | "forcePoster"

export type HeroPlaybackReason =
  | "policy-force-poster"
  | "reduced-motion"
  | "touch-coarse"
  | "mobile-viewport"
  | "autoplay-rejected"
  | "platform-limited"
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
  }
}

export type HeroPlaybackPolicyInput = {
  playbackPolicy?: HeroPlaybackPolicyOverride
  reducedMotion?: boolean
  isTouchCoarse?: boolean
  viewportWidth?: number
  hasAutoplayError?: boolean
  platform?: HeroPlaybackPlatform
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
}: HeroPlaybackPolicyInput): HeroPlaybackIntent {
  const viewportClass = resolveViewportClass(
    Number.isFinite(viewportWidth) ? viewportWidth : null,
  )

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
      },
    }
  }

  if (isTouchCoarse || viewportClass === "mobile") {
    return {
      mode: "video-fallback-poster",
      reason: "touch-coarse",
      state: {
        modeRequested: playbackPolicy,
        isTouchCoarse,
        reducedMotion,
        viewportClass,
        viewportWidth: Number.isFinite(viewportWidth) ? viewportWidth : -1,
        hasAutoplayError,
        platform,
      },
    }
  }

  if (platform === "ios") {
    return {
      mode: "video-fallback-poster",
      reason: "platform-limited",
      state: {
        modeRequested: playbackPolicy,
        isTouchCoarse,
        reducedMotion,
        viewportClass,
        viewportWidth: Number.isFinite(viewportWidth) ? viewportWidth : -1,
        hasAutoplayError,
        platform,
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
