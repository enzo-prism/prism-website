'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

import { PRISM_APP_TOUR } from '@/lib/prism-app'

import { AppPhone } from './AppPhone'
import { AppStoreButton } from './AppStoreButton'
import styles from './app-page.module.css'
import { clamp01, easeOutCubic, smoothstep, useFrameLoop } from './use-frame-loop'

/** Mirrors the media query that pins the hero in app-page.module.css. */
const PINNED_QUERY =
  '(prefers-reduced-motion: no-preference) and (min-height: 560px)'

/** Shortened from the app's demo Updates feed, oldest arrival first. */
const NOTIFICATIONS = [
  {
    title: 'New appointment request',
    body: 'A form just came in.',
  },
  {
    title: 'On Google’s first page',
    body: 'Now #7 for “emergency dentist.”',
  },
  {
    title: 'Your site is busy right now',
    body: '64 people now, about 3× usual.',
  },
] as const

/** Room held under the settled phone for the demo note, in px. */
const NOTE_SPACE = 44

const SCENE_SIZES = '(min-width: 768px) 328px, 70vw'

/**
 * Pinned opening scene. The phone lifts out of the fold and flattens as the
 * page scrolls, then two more screens fan out from behind it. With reduced
 * motion, or on very short viewports, it is a normal section in its finished
 * frame.
 */
export function AppHero({ demoNote }: { demoNote: string }) {
  const trackRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const slotRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)

  useEffect(() => {
    const stage = stageRef.current
    const slot = slotRef.current
    if (!stage || !slot || typeof ResizeObserver === 'undefined') return

    const measure = () => {
      const lift =
        slot.getBoundingClientRect().top -
        stage.getBoundingClientRect().top -
        (stage.clientHeight - slot.offsetHeight - NOTE_SPACE) / 2
      stage.style.setProperty('--lift', `${Math.max(0, lift)}px`)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  useFrameLoop(() => {
    const track = trackRef.current
    const stage = stageRef.current
    if (!track || !stage || !window.matchMedia(PINNED_QUERY).matches) {
      return false
    }

    const range = track.offsetHeight - stage.offsetHeight
    const pinnedAt = parseFloat(getComputedStyle(stage).top) || 0
    const target =
      range > 0
        ? clamp01((pinnedAt - track.getBoundingClientRect().top) / range)
        : 0

    let progress = progressRef.current + (target - progressRef.current) * 0.18
    if (Math.abs(target - progress) < 0.0005) progress = target
    progressRef.current = progress

    stage.style.setProperty('--p', progress.toFixed(4))
    stage.style.setProperty('--e', easeOutCubic(progress / 0.72).toFixed(4))
    stage.style.setProperty('--s', smoothstep((progress - 0.4) / 0.6).toFixed(4))

    return progress !== target
  })

  return (
    <section
      ref={trackRef}
      aria-labelledby="prism-app-title"
      className={styles.heroTrack}
    >
      <div ref={stageRef} className={styles.heroStage}>
        <div aria-hidden="true" className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-[34rem] opacity-40" />
        <div aria-hidden="true" className={styles.heroHalo} />

        <div className={`prism-container ${styles.heroCopy}`}>
          <h1
            id="prism-app-title"
            className={`prism-rise text-gradient ${styles.heroTitle}`}
            style={{ '--rise-delay': '70ms' } as React.CSSProperties}
          >
            your website,
            <br />
            at a glance.
          </h1>
          <p
            className={`prism-rise text-pretty text-muted-foreground ${styles.heroLead}`}
            style={{ '--rise-delay': '140ms' } as React.CSSProperties}
          >
            Visits, leads, and searches on your iPhone.
          </p>
          <div
            className={`prism-rise ${styles.heroActions}`}
            style={{ '--rise-delay': '210ms' } as React.CSSProperties}
          >
            <AppStoreButton
              location="prism app hero"
              className="w-full sm:w-auto"
            />
            <p className="text-[13px] text-subtle">
              Free. Built for Prism clients.
            </p>
          </div>
        </div>

        <div ref={slotRef} className={styles.heroSlot}>
          <div className={styles.heroSideLeft} aria-hidden="true">
            <AppPhone src="/prism-app/leads.jpg" sizes={SCENE_SIZES} />
          </div>
          <div className={styles.heroSideRight} aria-hidden="true">
            <AppPhone src="/prism-app/updates.jpg" sizes={SCENE_SIZES} />
          </div>

          <div className={styles.heroCenter}>
            <div className={styles.heroEntrance}>
              <AppPhone
                src="/prism-app/summary.jpg"
                alt={PRISM_APP_TOUR[0].alt}
                sizes={SCENE_SIZES}
                priority
                glare
              />
              <ul aria-hidden="true" className={styles.heroNotifications}>
                {NOTIFICATIONS.map((item) => (
                  <li key={item.title} className={styles.heroNotification}>
                    <Image
                      src="/prism-app/app-icon.png"
                      alt=""
                      width={76}
                      height={76}
                      className="size-[2.375rem] shrink-0 rounded-[0.6rem]"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-baseline justify-between gap-3">
                        <span className="truncate text-[13px] font-semibold text-foreground">
                          {item.title}
                        </span>
                        <span className="shrink-0 text-[11px] text-subtle">
                          now
                        </span>
                      </p>
                      <p className="mt-0.5 truncate text-[12px] leading-[1.32] text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className={styles.heroNote}>{demoNote}</p>
      </div>
    </section>
  )
}

export default AppHero
