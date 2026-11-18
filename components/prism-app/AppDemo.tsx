'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import {
  Bell,
  FileText,
  LayoutGrid,
  Mail,
  Pause,
  Play,
  Search,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

import type { PrismAppScreenId, PrismAppTourStep } from '@/lib/prism-app'
import { cn } from '@/lib/utils'
import { trackAppDemoScreenSelect } from '@/utils/analytics'

import { AppPhone } from './AppPhone'
import { AppScreen } from './AppScreens'
import { AppTilt } from './AppTilt'
import { motionAllowed, runCount, subscribeToMotion } from './motion'
import styles from './app-page.module.css'

type AppDemoProps = {
  steps: readonly PrismAppTourStep[]
  /** The section heading, set above the tabs so the tour fits one screen. */
  header?: ReactNode
}

/** The color each section has inside the app. */
const TONES: Record<PrismAppScreenId, string> = {
  summary: 'var(--spectrum-green)',
  report: 'var(--spectrum-blue)',
  forms: 'var(--spectrum-green)',
  search: 'var(--spectrum-orange)',
  ai: 'var(--spectrum-violet)',
  updates: 'var(--spectrum-blue)',
}

const ICONS: Record<PrismAppScreenId, LucideIcon> = {
  summary: LayoutGrid,
  report: FileText,
  forms: Mail,
  search: Search,
  ai: Sparkles,
  updates: Bell,
}

/** One glow per tone, crossfaded with opacity as the tour moves. */
const GLOW_TONES = Array.from(new Set(Object.values(TONES)))

/**
 * The tour, as one phone you can use. Six labeled tabs change the screen; the
 * Summary cards and its Latest Monthly Report row open their screens too, as
 * they do in the app. The visitor can play the tour or read a screen at their own pace. Without JS the first screen is
 * up and every step's copy is in the page. With reduced motion nothing moves
 * by itself.
 */
export function AppDemo({ steps, header }: AppDemoProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const screenRefs = useRef<Array<HTMLDivElement | null>>([])
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(false)
  const [inView, setInView] = useState(false)
  const [started, setStarted] = useState(false)
  const armed = useSyncExternalStore(
    subscribeToMotion,
    motionAllowed,
    () => false,
  )

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => {
        setInView(true)
        setStarted(true)
      })
      return () => cancelAnimationFrame(frame)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setStarted(true)
      },
      { threshold: 0.35 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  // Count the screen's total up each time it arrives.
  useEffect(() => {
    if (!armed || !started) return
    const counter =
      screenRefs.current[active]?.querySelector<HTMLElement>('[data-count]')
    if (counter) runCount(counter)
  }, [active, armed, started])

  const select = useCallback(
    (index: number, method: 'tab' | 'keyboard' | 'screen') => {
      setAuto(false)
      setActive(index)
      if (method === 'keyboard') tabRefs.current[index]?.focus()
      const step = steps[index]
      if (step) trackAppDemoScreenSelect(step.id, method)
    },
    [steps],
  )

  const selectById = useCallback(
    (id: PrismAppScreenId) => {
      const index = steps.findIndex((step) => step.id === id)
      if (index >= 0) select(index, 'screen')
    },
    [select, steps],
  )

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = steps.length - 1
    const next =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? active === last
          ? 0
          : active + 1
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? active === 0
            ? last
            : active - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : -1
    if (next < 0) return
    event.preventDefault()
    select(next, 'keyboard')
  }

  const step = steps[active]
  const playing = auto && inView && armed

  return (
    <div
      ref={rootRef}
      className={styles.demo}
      style={{ '--tone': TONES[step.id] } as CSSProperties}
      data-armed={armed ? '' : undefined}
    >
      <div className={styles.demoHead}>
        {header}
        <div className={styles.demoBar}>
          <div
            role="tablist"
            aria-label="App screens"
            aria-orientation="horizontal"
            className={styles.demoTabs}
            onKeyDown={onKeyDown}
          >
            {steps.map((item, index) => {
              const Icon = ICONS[item.id]
              const selected = index === active
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node
                  }}
                  type="button"
                  role="tab"
                  id={`prism-app-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls={`prism-app-panel-${item.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(index, 'tab')}
                  className={styles.demoTab}
                  style={{ '--tone': TONES[item.id] } as CSSProperties}
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {item.label}
                  {selected ? (
                    <span
                      aria-hidden="true"
                      className={styles.demoTabFill}
                      data-run={playing ? '' : undefined}
                      onAnimationEnd={() =>
                        setActive((current) => (current + 1) % steps.length)
                      }
                    />
                  ) : null}
                </button>
              )
            })}
          </div>
          {armed ? (
            <button
              type="button"
              onClick={() => setAuto((value) => !value)}
              aria-label={auto ? 'Pause the tour' : 'Play the tour'}
              className={styles.demoPlay}
            >
              {auto ? (
                <Pause aria-hidden="true" className="size-4" />
              ) : (
                <Play aria-hidden="true" className="size-4" />
              )}
            </button>
          ) : null}
        </div>
      </div>

      <div className={styles.demoPanels}>
        {steps.map((item, index) => (
          <div
            key={item.id}
            role="tabpanel"
            id={`prism-app-panel-${item.id}`}
            aria-labelledby={`prism-app-tab-${item.id}`}
            hidden={index !== active}
            className={styles.demoPanel}
            style={{ '--tone': TONES[item.id] } as CSSProperties}
          >
            <h3 className="text-heading max-w-[20ch] text-balance text-foreground">
              {item.title}
            </h3>
            <p className="mt-3 max-w-[44ch] text-pretty text-[15px] leading-6 text-muted-foreground">
              {item.body}
            </p>
            <p className={styles.demoTakeaway}>
              <span aria-hidden="true" className={styles.demoTakeawayDot} />
              {item.takeaway}
            </p>
          </div>
        ))}
      </div>

      {/* Decorative: each panel's heading, body and takeaway carry it. */}
      <div aria-hidden="true" className={styles.demoStage}>
        {GLOW_TONES.map((tone) => (
          <div
            key={tone}
            className={styles.demoGlow}
            style={{ '--tone': tone } as CSSProperties}
            data-on={tone === TONES[step.id] ? '' : undefined}
          />
        ))}
        <AppTilt scope="section" className={styles.demoTilt}>
          <AppPhone className={cn(styles.demoPhone, styles.tiltPhone)}>
            {steps.map((item, index) => (
              <div
                key={item.id}
                ref={(node) => {
                  screenRefs.current[index] = node
                }}
                className={styles.demoScreen}
                data-current={index === active ? '' : undefined}
                data-on={index === active && started ? '' : undefined}
              >
                <AppScreen
                  id={item.id}
                  onSelect={index === active ? selectById : undefined}
                />
              </div>
            ))}
          </AppPhone>
        </AppTilt>
      </div>
    </div>
  )
}

export default AppDemo
