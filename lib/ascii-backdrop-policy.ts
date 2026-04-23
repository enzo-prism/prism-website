type AsciiBackdropQuality = "low" | "medium" | "high"
type AsciiBackdropLoadStrategy = "batch" | "all"

export type AsciiBackdropProfileInput = {
  fps: number
  quality: AsciiBackdropQuality
  loadStrategy: AsciiBackdropLoadStrategy
  batchSize: number
  maxConcurrentFetches: number
  reducedMotion: boolean
  viewportWidth: number
  saveData?: boolean
  effectiveType?: string
  deviceMemory?: number
  hardwareConcurrency?: number
}

export type AsciiBackdropProfile = {
  shouldRender: boolean
  fps: number
  quality: AsciiBackdropQuality
  loadStrategy: AsciiBackdropLoadStrategy
  batchSize: number
  maxConcurrentFetches: number
}

const MOBILE_VIEWPORT_MAX_WIDTH = 768
const TABLET_VIEWPORT_MAX_WIDTH = 1100

export function resolveAsciiBackdropProfile({
  fps,
  quality,
  loadStrategy,
  batchSize,
  maxConcurrentFetches,
  reducedMotion,
  viewportWidth,
  saveData = false,
  effectiveType = "",
  deviceMemory,
  hardwareConcurrency,
}: AsciiBackdropProfileInput): AsciiBackdropProfile {
  const normalizedEffectiveType = effectiveType.toLowerCase()
  const isConstrainedNetwork =
    saveData ||
    normalizedEffectiveType === "slow-2g" ||
    normalizedEffectiveType === "2g"

  const constrainedMemory =
    typeof deviceMemory === "number" && Number.isFinite(deviceMemory)
      ? deviceMemory
      : null
  const constrainedCores =
    typeof hardwareConcurrency === "number" && Number.isFinite(hardwareConcurrency)
      ? hardwareConcurrency
      : null

  if (reducedMotion || isConstrainedNetwork) {
    return {
      shouldRender: false,
      fps,
      quality,
      loadStrategy,
      batchSize,
      maxConcurrentFetches,
    }
  }

  if (
    (constrainedMemory !== null && constrainedMemory <= 2) ||
    (constrainedCores !== null && constrainedCores <= 2)
  ) {
    return {
      shouldRender: false,
      fps,
      quality,
      loadStrategy,
      batchSize,
      maxConcurrentFetches,
    }
  }

  if (viewportWidth < MOBILE_VIEWPORT_MAX_WIDTH) {
    return {
      shouldRender: true,
      fps: Math.min(fps, 10),
      quality: "medium",
      loadStrategy: "batch",
      batchSize: Math.min(batchSize, 12),
      maxConcurrentFetches: Math.min(maxConcurrentFetches, 2),
    }
  }

  if (
    viewportWidth < TABLET_VIEWPORT_MAX_WIDTH ||
    (constrainedMemory !== null && constrainedMemory <= 4) ||
    (constrainedCores !== null && constrainedCores <= 4)
  ) {
    return {
      shouldRender: true,
      fps: Math.min(fps, 14),
      quality: quality === "high" ? "medium" : quality,
      loadStrategy: "batch",
      batchSize: Math.min(batchSize, 16),
      maxConcurrentFetches: Math.min(maxConcurrentFetches, 3),
    }
  }

  return {
    shouldRender: true,
    fps,
    quality,
    loadStrategy,
    batchSize,
    maxConcurrentFetches,
  }
}
