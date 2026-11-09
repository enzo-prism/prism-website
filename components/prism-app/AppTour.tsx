'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'

import type { PrismAppTourStep } from '@/lib/prism-app'

import { AppInstrument } from './AppInstruments'
import { AppPhone } from './AppPhone'
import styles from './app-page.module.css'
import { clamp01, smoothstep, useFrameLoop } from './use-frame-loop'

type AppTourProps = {
  steps: readonly PrismAppTourStep[]
}

/** The color each section has inside the app. */
const TONES: Record<string, string> = {
  summary: 'var(--spectrum-green)',
  leads: 'var(--spectrum-green)',
  visits: 'var(--spectrum-blue)',
  search: 'var(--spectrum-orange)',
  ai: 'var(--spectrum-violet)',
  updates: 'var(--spectrum-blue)',
}

const DESKTOP_QUERY = '(min-width: 1024px)'
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

/** Share of each step spent changing screens at either end. */
const BLEND = 0.15

function runCount(node: HTMLElement) {
  const target = Number(node.dataset.count)
  const start = performance.now()
  const step = (now: number) => {
    const t = clamp01((now - start) / 900)
    const eased = 1 - (1 - t) ** 3
    node.textContent = Math.round(target * eased).toLocaleString('en-US')
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/**
 * One phone stays pinned while the steps scroll. Scroll position drives the
 * screens directly. On phones the copy rides up as cards that hold at the foot
 * of the screen, and the phone sits left with its satellite beside it; on
 * desktop the copy scrolls next to the phone. Without JS the first screen
 * stays up and every step is still readable.
 */
export function AppTour({ steps }: AppTourProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLLIElement | null>>([])
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const screenRefs = useRef<Array<HTMLDivElement | null>>([])
  const instrumentRefs = useRef<Array<HTMLDivElement | null>>([])
  const glowRefs = useRef<Array<HTMLDivElement | null>>([])
  const segmentRefs = useRef<Array<HTMLSpanElement | null>>([])
  const positionRef = useRef(0)
  const playingRef = useRef(-1)

  useEffect(() => {
    if (!window.matchMedia(REDUCED_QUERY).matches) {
      rootRef.current?.setAttribute('data-armed', '')
    }
  }, [])

  useFrameLoop(() => {
    const items = itemRefs.current
    if (!items[0]) return false

    const viewport = window.innerHeight
    const desktop = window.matchMedia(DESKTOP_QUERY).matches
    const reduced = window.matchMedia(REDUCED_QUERY).matches
    const anchor = viewport * (desktop ? 0.5 : 0.72)

    let index = 0
    const rects = items.map((node) => node!.getBoundingClientRect())
    rects.forEach((rect, i) => {
      if (rect.top <= anchor) index = i
    })

    const t = (anchor - rects[index].top) / rects[index].height
    let target = index
    if (index > 0 && t < BLEND) {
      target = index - 0.5 + 0.5 * smoothstep(t / BLEND)
    } else if (index < items.length - 1 && t > 1 - BLEND) {
      target = index + 0.5 * smoothstep((t - (1 - BLEND)) / BLEND)
    }

    let position = positionRef.current + (target - positionRef.current) * 0.2
    if (reduced || Math.abs(target - position) < 0.001) position = target
    positionRef.current = position

    const nearest = Math.round(position)
    const settled = Math.abs(position - nearest) < 0.35

    steps.forEach((_, k) => {
      const d = position - k
      const away = Math.abs(d)

      const screen = screenRefs.current[k]
      if (screen) {
        if (reduced) {
          screen.style.opacity = (
            d < 0 ? clamp01(1 + d) : clamp01(2 - d * 2)
          ).toFixed(3)
          screen.style.transform = 'none'
        } else {
          // The next screen rises as an opaque sheet over the current one,
          // which recedes behind it, so two screens never show through
          // each other.
          screen.style.opacity = (
            away >= 1 ? 0 : d > 0 ? 1 - d * 0.7 : 1
          ).toFixed(3)
          screen.style.transform =
            d < 0
              ? `translate3d(0, ${(-d * 100).toFixed(2)}%, 0)`
              : `scale(${(1 - d * 0.1).toFixed(4)})`
        }
      }

      const instrument = instrumentRefs.current[k]
      if (instrument) {
        instrument.style.opacity = clamp01(1 - away * 3).toFixed(3)
        instrument.style.transform = reduced
          ? 'none'
          : `translate3d(0, ${(-d * 26).toFixed(1)}px, 0) scale(${(1 - Math.min(away, 1) * 0.14).toFixed(4)})`
        instrument.toggleAttribute('data-on', settled && k === nearest)
      }

      const glow = glowRefs.current[k]
      if (glow) glow.style.opacity = clamp01(1 - away * 1.6).toFixed(3)

      const segment = segmentRefs.current[k]
      if (segment) {
        segment.style.transform = `scaleX(${clamp01(position - k + 1).toFixed(3)})`
      }

      const card = cardRefs.current[k]
      if (card) {
        if (desktop) {
          card.style.opacity = Math.max(0.26, 1 - away * 1.15).toFixed(3)
        } else {
          const released = viewport - 12 - rects[k].bottom
          card.style.opacity = (
            released > 0 ? 1 - clamp01(released / (viewport * 0.2)) : 1
          ).toFixed(3)
        }
      }
    })

    if (settled && playingRef.current !== nearest && !reduced) {
      playingRef.current = nearest
      const counter = instrumentRefs.current[nearest]?.querySelector<HTMLElement>(
        '[data-count]',
      )
      if (counter) runCount(counter)
    }

    return position !== target
  })

  return (
    <div ref={rootRef} className={styles.tour}>
      <div className={styles.tourStage}>
        <div className={styles.tourStageInner}>
          <div aria-hidden="true" className={styles.tourSegments}>
            {steps.map((step, index) => (
              <span key={step.id} className={styles.tourSegment}>
                <span
                  ref={(node) => {
                    segmentRefs.current[index] = node
                  }}
                  className={styles.tourSegmentFill}
                  style={{ transform: `scaleX(${index === 0 ? 1 : 0})` }}
                />
              </span>
            ))}
          </div>

          <div className={styles.tourScene}>
            {steps.map((step, index) => (
              <div
                key={step.id}
                aria-hidden="true"
                ref={(node) => {
                  glowRefs.current[index] = node
                }}
                className={styles.tourGlow}
                style={
                  {
                    '--tone': TONES[step.id],
                    opacity: index === 0 ? 1 : 0,
                  } as CSSProperties
                }
              />
            ))}

            <AppPhone className={styles.tourPhone}>
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  ref={(node) => {
                    screenRefs.current[index] = node
                  }}
                  className={styles.tourScreen}
                  style={{ opacity: index === 0 ? 1 : 0 }}
                >
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(min-width: 1024px) 336px, 56vw"
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </AppPhone>

            {steps.map((step, index) => (
              <div
                key={step.id}
                aria-hidden="true"
                ref={(node) => {
                  instrumentRefs.current[index] = node
                }}
                className={styles.instrument}
                style={
                  {
                    '--tone': TONES[step.id],
                    opacity: index === 0 ? 1 : 0,
                  } as CSSProperties
                }
              >
                <AppInstrument id={step.id} />
              </div>
            ))}
          </div>
        </div>
        <div aria-hidden="true" className={styles.tourFade} />
      </div>

      <ol className={styles.tourSteps}>
        {steps.map((step, index) => (
          <li
            key={step.id}
            ref={(node) => {
              itemRefs.current[index] = node
            }}
            className={styles.tourStep}
          >
            <div
              ref={(node) => {
                cardRefs.current[index] = node
              }}
              className={styles.tourCard}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
                <span className="tabular-nums">0{index + 1}</span>
                <span className="ml-3">{step.label}</span>
              </p>
              <h3 className="mt-3 max-w-[18ch] text-balance text-[clamp(1.625rem,3.5vw,3rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-foreground lg:mt-5">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[46ch] text-pretty text-[15px] leading-6 text-muted-foreground lg:mt-5 lg:text-[1.0625rem] lg:leading-7">
                {step.body}
              </p>
              <ul className="mt-7 hidden max-w-[46ch] flex-col gap-2.5 lg:flex">
                {step.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-[15px] leading-6 text-muted-foreground"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0"
                      style={{ color: TONES[step.id] }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default AppTour
