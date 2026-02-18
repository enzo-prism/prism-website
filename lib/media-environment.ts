export const TOUCH_MEDIA_QUERY = '(hover: none), (pointer: coarse)'

const hasTouchPointAccess = () => {
  if (typeof navigator === 'undefined') {
    return false
  }

  const maxTouchPoints = Number((navigator as Navigator).maxTouchPoints ?? 0)
  return Number.isFinite(maxTouchPoints) && maxTouchPoints > 0
}

export const isTouchCoarseEnvironment = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false
  }

  let matchesTouchMedia = false

  if ('matchMedia' in window) {
    matchesTouchMedia = window.matchMedia(TOUCH_MEDIA_QUERY).matches
  }

  const isLikelyiOS =
    /iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 0)

  return matchesTouchMedia || isLikelyiOS || hasTouchPointAccess()
}
