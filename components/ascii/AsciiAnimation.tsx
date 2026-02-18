"use client"

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"

class AnimationManager {
  private _animation: number | null = null
  private callback: () => void
  private lastFrame = -1
  private frameTime = 1000 / 30

  constructor(callback: () => void, fps = 30) {
    this.callback = callback
    this.frameTime = 1000 / fps
  }

  updateFPS(fps: number) {
    this.frameTime = 1000 / fps
  }

  start() {
    if (this._animation != null) return
    this._animation = requestAnimationFrame(this.update)
  }

  pause() {
    if (this._animation == null) return
    this.lastFrame = -1
    cancelAnimationFrame(this._animation)
    this._animation = null
  }

  private update = (time: number) => {
    const { lastFrame } = this
    let delta = time - lastFrame
    if (this.lastFrame === -1) {
      this.lastFrame = time
    } else {
      while (delta >= this.frameTime) {
        this.callback()
        delta -= this.frameTime
        this.lastFrame += this.frameTime
      }
    }
    this._animation = requestAnimationFrame(this.update)
  }
}

type Quality = "low" | "medium" | "high"
type ScaleMode = "contain" | "cover"
type FrameBounds = {
  minRow: number
  maxRow: number
  minCol: number
  maxCol: number
}
type AsciiLoadStrategy = "batch" | "all"

const FALLBACK_ORDER: Record<Quality, Quality[]> = {
  low: ["low", "high", "medium"],
  medium: ["medium", "high", "low"],
  high: ["high", "low", "medium"],
}

const DEFAULT_BATCH_SIZE = 24
const DEFAULT_MAX_CONCURRENT_FETCHES = 6

function splitFrameLines(frame: string): string[] {
  const lines = frame.replace(/\r/g, "").split("\n")
  while (lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop()
  }
  return lines
}

function getFrameBounds(lines: string[]): FrameBounds | null {
  let minRow = Number.POSITIVE_INFINITY
  let maxRow = Number.NEGATIVE_INFINITY
  let minCol = Number.POSITIVE_INFINITY
  let maxCol = Number.NEGATIVE_INFINITY

  for (let row = 0; row < lines.length; row += 1) {
    const line = lines[row]
    const firstNonSpace = line.search(/\S/)
    if (firstNonSpace === -1) continue

    let lastNonSpace = line.length - 1
    while (lastNonSpace >= 0 && /\s/.test(line[lastNonSpace])) {
      lastNonSpace -= 1
    }

    minRow = Math.min(minRow, row)
    maxRow = Math.max(maxRow, row)
    minCol = Math.min(minCol, firstNonSpace)
    maxCol = Math.max(maxCol, lastNonSpace)
  }

  if (
    minRow === Number.POSITIVE_INFINITY ||
    maxRow === Number.NEGATIVE_INFINITY ||
    minCol === Number.POSITIVE_INFINITY ||
    maxCol === Number.NEGATIVE_INFINITY
  ) {
    return null
  }

  return { minRow, maxRow, minCol, maxCol }
}

function mergeFrameBounds(a: FrameBounds | null, b: FrameBounds | null): FrameBounds | null {
  if (!a) return b
  if (!b) return a

  return {
    minRow: Math.min(a.minRow, b.minRow),
    maxRow: Math.max(a.maxRow, b.maxRow),
    minCol: Math.min(a.minCol, b.minCol),
    maxCol: Math.max(a.maxCol, b.maxCol),
  }
}

function cropFrameToBounds(lines: string[], bounds: FrameBounds): string {
  const width = bounds.maxCol - bounds.minCol + 1
  const clipped: string[] = []

  for (let row = bounds.minRow; row <= bounds.maxRow; row += 1) {
    const line = lines[row] ?? ""
    const sliced = line.slice(bounds.minCol, bounds.maxCol + 1)
    clipped.push(sliced.padEnd(width, " "))
  }

  return clipped.join("\n")
}

function normalizeSingleFrame(frame: string): string {
  const lines = splitFrameLines(frame)
  const bounds = getFrameBounds(lines)
  if (!bounds) return frame
  return cropFrameToBounds(lines, bounds)
}

/**
 * Resolves the base URL for frame files by probing quality subfolders
 * and falling back to a flat folder structure.
 * Returns { baseUrl, isFlat } or null if nothing was found.
 */
async function resolveFrameSource(
  frameFolder: string,
  quality: Quality,
  firstFrameFile: string,
): Promise<{ baseUrl: string; isFlat: boolean } | null> {
  const fallbackQualities = FALLBACK_ORDER[quality]

  for (const candidate of fallbackQualities) {
    try {
      const probeUrl = `/${frameFolder}/${candidate}/${firstFrameFile}`
      const probeResponse = await fetch(probeUrl)
      if (probeResponse.ok) {
        if (candidate !== quality) {
          console.warn(
            `ASCIIAnimation: quality "${quality}" not found in "${frameFolder}", falling back to "${candidate}"`,
          )
        }
        return { baseUrl: `/${frameFolder}/${candidate}`, isFlat: false }
      }
    } catch {
      // continue to next candidate
    }
  }

  // Try flat folder structure (legacy)
  try {
    const legacyProbe = await fetch(`/${frameFolder}/${firstFrameFile}`)
    if (legacyProbe.ok) {
      console.warn(
        `ASCIIAnimation: no quality subfolders found in "${frameFolder}", using flat folder structure`,
      )
      return { baseUrl: `/${frameFolder}`, isFlat: true }
    }
  } catch {
    // no legacy frames either
  }

  return null
}

export interface ASCIIAnimationProps {
  frames?: string[]
  className?: string
  fps?: number
  colorOverlay?: boolean
  frameCount?: number
  frameFolder?: string
  textSize?: string
  showFrameCounter?: boolean
  quality?: Quality
  ariaLabel?: string
  lazy?: boolean
  color?: string
  gradient?: string
  fit?: ScaleMode
  zoom?: number
  offsetY?: number
  loadStrategy?: AsciiLoadStrategy
  batchSize?: number
  maxConcurrentFetches?: number
  continueOnFrameError?: boolean
}

type LoadedFramesStore = Array<string[] | null>

export default function ASCIIAnimation({
  frames: providedFrames,
  className = "",
  fps = 24,
  frameCount = 60,
  frameFolder = "frames",
  textSize = "text-xs",
  showFrameCounter = false,
  ariaLabel,
  quality = "medium",
  lazy = true,
  color,
  gradient,
  fit = "contain",
  zoom = 1,
  offsetY = 0,
  loadStrategy = "batch",
  batchSize = DEFAULT_BATCH_SIZE,
  maxConcurrentFetches = DEFAULT_MAX_CONCURRENT_FETCHES,
  continueOnFrameError = true,
}: ASCIIAnimationProps) {
  const [frames, setFrames] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const preRef = useRef<HTMLPreElement>(null)
  const frameCounterRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [scaled, setScaled] = useState(false)

  // Direct DOM refs for animation — bypasses React re-renders.
  const currentFrameRef = useRef(0)
  const framesRef = useRef<string[]>([])
  const loadedFrameLines = useRef<LoadedFramesStore>([])
  const fullLoadTriggered = useRef(false)
  const resolvedSource = useRef<{ baseUrl: string; isFlat: boolean } | null>(null)

  // Keep framesRef synced with React state.
  useEffect(() => {
    framesRef.current = frames
  }, [frames])

  const animationManager = useMemo(
    () =>
      new AnimationManager(() => {
        const allFrames = framesRef.current
        if (allFrames.length < 2) return

        const nextFrame = (currentFrameRef.current + 1) % allFrames.length
        currentFrameRef.current = nextFrame

        if (preRef.current) {
          preRef.current.textContent = allFrames[nextFrame]
        }
        if (frameCounterRef.current) {
          frameCounterRef.current.textContent = `Frame: ${nextFrame + 1}/${allFrames.length}`
        }
      }, fps),
    [fps],
  )

  const frameFiles = useMemo(
    () =>
      Array.from(
        { length: frameCount },
        (_, i) => `frame_${String(i + 1).padStart(5, "0")}.txt`,
      ),
    [frameCount],
  )

  const rebuildRenderableFrames = useCallback(() => {
    const rawFrames = loadedFrameLines.current
    if (rawFrames.length === 0) {
      setFrames([])
      return
    }

    let mergedBounds: FrameBounds | null = null
    for (const lines of rawFrames) {
      if (!lines) continue
      mergedBounds = mergeFrameBounds(mergedBounds, getFrameBounds(lines))
    }

    const nextFrames = rawFrames
      .map((lines) => {
        if (!lines) return null
        if (!mergedBounds) {
          return lines.join("\n")
        }
        return cropFrameToBounds(lines, mergedBounds)
      })
      .filter((frame): frame is string => frame !== null)

    setFrames((previous) => {
      if (previous.length === nextFrames.length) {
        return previous
      }
      return nextFrames
    })

    if (nextFrames.length > 0 && currentFrameRef.current >= nextFrames.length) {
      currentFrameRef.current = 0
    }
  }, [])

  const fetchFrameLines = useCallback(
    async (baseUrl: string, filename: string): Promise<string[]> => {
      const response = await fetch(`${baseUrl}/${filename}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch ${filename}: ${response.status}`)
      }
      const text = await response.text()
      return splitFrameLines(text)
    },
    [],
  )

  // Load remaining frames (phase 2)
  const loadRemainingFrames = useCallback(async () => {
    if (fullLoadTriggered.current) return
    fullLoadTriggered.current = true

    const source = resolvedSource.current
    if (!source) {
      setIsLoading(false)
      return
    }

    const totalFrames = frameFiles.length
    const candidateIndices = Array.from(
      { length: Math.max(0, totalFrames - 1) },
      (_, i) => i + 1,
    )

    if (candidateIndices.length === 0) {
      setIsLoading(false)
      return
    }

    const normalizedBatchSize =
      loadStrategy === "all" ? candidateIndices.length : Math.max(1, batchSize)
    const normalizedConcurrency = Math.max(1, maxConcurrentFetches)
    let encounteredError = false

    const runBatch = async (indices: number[]) => {
      for (let offset = 0; offset < indices.length; offset += normalizedConcurrency) {
        const batch = indices.slice(offset, offset + normalizedConcurrency)

        const batchResults = await Promise.allSettled(
          batch.map((frameIndex) => {
            if (loadedFrameLines.current[frameIndex]) {
              const cachedFrame = loadedFrameLines.current[frameIndex]
              if (!cachedFrame) {
                return Promise.reject(new Error(`Missing cached frame ${frameIndex}`))
              }

              return Promise.resolve({
                index: frameIndex,
                lines: cachedFrame,
              })
            }

            return fetchFrameLines(source.baseUrl, frameFiles[frameIndex]).then((lines) => ({
              index: frameIndex,
              lines,
            }))
          }),
        )

        const chunkLoaded: Array<{ index: number; lines: string[] }> = []
        batchResults.forEach((result, batchIdx) => {
          const index = batch[batchIdx]
          if (result.status === "rejected") {
            encounteredError = true
            if (!continueOnFrameError) {
              console.error(
                `ASCIIAnimation: failed to load frame index ${index}: ${result.reason}`,
              )
            }
            return
          }

          const loaded = result.value
          chunkLoaded.push(loaded)
        })

        if (chunkLoaded.length === 0) {
          continue
        }

        chunkLoaded.forEach(({ index, lines }) => {
          loadedFrameLines.current[index] = lines
        })
        rebuildRenderableFrames()
      }
    }

    try {
      for (
        let segmentStart = 0;
        segmentStart < candidateIndices.length;
        segmentStart += normalizedBatchSize
      ) {
        const segment = candidateIndices.slice(
          segmentStart,
          segmentStart + normalizedBatchSize,
        )
        await runBatch(segment)
      }

      if (!continueOnFrameError && encounteredError) {
        throw new Error("ASCIIAnimation: partial frame load failure")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [
    continueOnFrameError,
    frameFiles,
    fetchFrameLines,
    loadStrategy,
    maxConcurrentFetches,
    rebuildRenderableFrames,
    batchSize,
  ])

  // Phase 1: load first frame immediately, then stream the rest progressively.
  useEffect(() => {
    fullLoadTriggered.current = false
    resolvedSource.current = null
    loadedFrameLines.current = []
    setScaled(false)
    setIsLoading(true)
    currentFrameRef.current = 0

    const loadPreview = async () => {
      if (providedFrames) {
        loadedFrameLines.current = providedFrames.map((frame) => splitFrameLines(frame))
        setFrames(providedFrames)
        fullLoadTriggered.current = true
        setIsLoading(false)
        return
      }

      const source = await resolveFrameSource(frameFolder, quality, frameFiles[0])
      if (!source) {
        console.error(
          `ASCIIAnimation: could not find frames in any quality folder or flat structure for "${frameFolder}"`,
        )
        setIsLoading(false)
        return
      }

      resolvedSource.current = source
      loadedFrameLines.current = Array(frameCount).fill(null)

      try {
        const response = await fetch(`${source.baseUrl}/${frameFiles[0]}`)
        if (!response.ok) throw new Error("Failed to fetch preview frame")
        const firstFrame = await response.text()
        const parsedFirst = splitFrameLines(firstFrame)
        loadedFrameLines.current[0] = parsedFirst
        const normalized = normalizeSingleFrame(firstFrame)
        setFrames([normalized])
        currentFrameRef.current = 0
      } catch (error) {
        console.error("Failed to load preview frame:", error)
      }

      if (!lazy) {
        await loadRemainingFrames()
      } else {
        setIsLoading(false)
      }
    }

    loadPreview()
  }, [frameCount, frameFiles, frameFolder, lazy, loadRemainingFrames, providedFrames, quality])

  // IntersectionObserver: triggers lazy load + controls playback
  useEffect(() => {
    if (
      frames.length === 0 ||
      !containerRef.current ||
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined"
    ) {
      return
    }

    const reducedMotionQuery =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (lazy && !fullLoadTriggered.current) {
              loadRemainingFrames()
            }

            if (!reducedMotionQuery?.matches) {
              animationManager.start()
            }
          } else {
            animationManager.pause()
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
      animationManager.pause()
    }
  }, [animationManager, frames.length, lazy, loadRemainingFrames])

  // Handle resize and scaling.
  useLayoutEffect(() => {
    if (
      !containerRef.current ||
      !preRef.current ||
      frames.length === 0 ||
      typeof ResizeObserver === "undefined"
    ) {
      return
    }

    const updateScale = () => {
      const container = containerRef.current
      const content = preRef.current
      if (!container || !content) return

      const availableWidth = container.clientWidth
      const availableHeight = container.clientHeight
      const naturalWidth = content.scrollWidth
      const naturalHeight = content.scrollHeight

      if (naturalWidth === 0 || naturalHeight === 0) return

      const baseScale =
        fit === "cover"
          ? Math.max(availableWidth / naturalWidth, availableHeight / naturalHeight)
          : Math.min(availableWidth / naturalWidth, availableHeight / naturalHeight)

      const fitAdjustment = fit === "cover" ? 1 : 0.95
      setScale(baseScale * fitAdjustment * zoom)

      if (!scaled) {
        setScaled(true)
      }
    }

    updateScale()

    const resizeObserver = new ResizeObserver(updateScale)
    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [frames, fit, zoom, scaled])

  if (isLoading && frames.length === 0) {
    return (
      <div className={`flex items-center justify-center w-full h-full ${className}`}>
        <svg
          className="animate-spin h-8 w-8 text-muted-foreground"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    )
  }

  if (!frames.length) {
    return (
      <div className={`overflow-hidden whitespace-pre font-mono ${className}`}>
        No frames loaded
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden w-full h-full flex items-center justify-center text-foreground ${className}`}
      {...(ariaLabel ? { role: 'img', 'aria-label': ariaLabel } : {})}
    >
      {showFrameCounter && (
        <div
          ref={frameCounterRef}
          className="absolute top-2 left-2 z-10 text-primary-foreground bg-primary/50 px-2 py-1 rounded text-xs"
        >
          Frame: {currentFrameRef.current + 1}/{frames.length}
        </div>
      )}
      <pre
        ref={preRef}
        className={`leading-none origin-center ${textSize}`}
        style={{
          transform: `translateY(${offsetY}%) scale(${scale})`,
          willChange: "transform, opacity",
          opacity: scaled ? 1 : 0,
          transition: "opacity 0.5s ease-in",
          ...(gradient
            ? {
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }
            : color
              ? { color }
              : {}),
        }}
      >
        {frames[currentFrameRef.current]}
      </pre>
    </div>
  )
}
