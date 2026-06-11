type HeroVideoPresentationMode = 'inline' | 'picture-in-picture' | 'fullscreen'

type InlineGuardedVideoElement = HTMLVideoElement & {
  webkitDisplayingFullscreen?: boolean
  webkitPresentationMode?: HeroVideoPresentationMode
  webkitExitFullscreen?: () => void
  webkitSetPresentationMode?: (mode: HeroVideoPresentationMode) => void
}

type FullscreenAwareDocument = Document & {
  webkitFullscreenElement?: Element | null
  webkitExitFullscreen?: () => Promise<void> | void
}

export function isHeroVideoPresentationInline(video: HTMLVideoElement): boolean {
  const guarded = video as InlineGuardedVideoElement
  const doc = document as FullscreenAwareDocument

  if (guarded.webkitDisplayingFullscreen) {
    return false
  }

  if (guarded.webkitPresentationMode && guarded.webkitPresentationMode !== 'inline') {
    return false
  }

  const fullscreenElement = doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null
  if (fullscreenElement === video) {
    return false
  }

  if (document.pictureInPictureElement === video) {
    return false
  }

  return true
}

export function forceHeroVideoInline(video: HTMLVideoElement): void {
  const guarded = video as InlineGuardedVideoElement
  const doc = document as FullscreenAwareDocument

  try {
    guarded.webkitSetPresentationMode?.('inline')
  } catch {
    // Best effort; unmounting the element is the caller's final backstop.
  }

  try {
    if (guarded.webkitDisplayingFullscreen) {
      guarded.webkitExitFullscreen?.()
    }
  } catch {
    // Ignore: some webviews throw when exiting a player they own.
  }

  try {
    const fullscreenElement = doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null
    if (fullscreenElement === video) {
      void (doc.exitFullscreen?.() ?? doc.webkitExitFullscreen?.())
    }
  } catch {
    // Ignore failed exits; the caller still pauses and swaps to the poster.
  }

  try {
    if (
      document.pictureInPictureElement === video &&
      typeof document.exitPictureInPicture === 'function'
    ) {
      void document.exitPictureInPicture()
    }
  } catch {
    // Ignore: PiP exit support varies and the element gets unmounted anyway.
  }
}

/**
 * Watches a decorative hero video for any escape from inline presentation
 * (native fullscreen player or picture-in-picture). Some embedded browsers
 * (WKWebViews with inline playback disabled) ignore `playsinline` and hoist
 * any playing video into the system player, so attribute-level defenses are
 * not enough on their own. On violation the video is paused and forced back
 * inline, then `onViolation` lets the caller fall back to the poster.
 */
export function watchHeroVideoInlinePlayback(
  video: HTMLVideoElement,
  onViolation: () => void,
): () => void {
  const reportViolation = () => {
    try {
      video.pause()
    } catch {
      // Pause is best effort; the caller unmounts the element regardless.
    }
    forceHeroVideoInline(video)
    onViolation()
  }

  const handlePresentationChange = () => {
    if (!isHeroVideoPresentationInline(video)) {
      reportViolation()
    }
  }

  video.addEventListener('webkitbeginfullscreen', reportViolation)
  video.addEventListener('webkitpresentationmodechanged', handlePresentationChange)
  video.addEventListener('enterpictureinpicture', reportViolation)
  document.addEventListener('fullscreenchange', handlePresentationChange)
  document.addEventListener('webkitfullscreenchange', handlePresentationChange)

  return () => {
    video.removeEventListener('webkitbeginfullscreen', reportViolation)
    video.removeEventListener('webkitpresentationmodechanged', handlePresentationChange)
    video.removeEventListener('enterpictureinpicture', reportViolation)
    document.removeEventListener('fullscreenchange', handlePresentationChange)
    document.removeEventListener('webkitfullscreenchange', handlePresentationChange)
  }
}
