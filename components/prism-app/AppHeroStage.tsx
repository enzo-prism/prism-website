'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { AppPhone } from './AppPhone'
import { AppScreen } from './AppScreens'
import { AppTilt } from './AppTilt'
import { motionAllowed, runCounts } from './motion'
import styles from './app-page.module.css'

/** When the phone has landed and its screen starts drawing. */
const SCREEN_ON_MS = 900

/**
 * The hero's stage: Prism Grow's Summary screen in a drawn iPhone over a
 * soft spectrum halo, with the demo's latest alert straddling the phone's
 * edge. On load the phone rises and settles flat, its numbers count up and
 * its sparklines draw, then the alert drops in and holds. With a mouse the
 * phone turns a few degrees toward the cursor. Decorative to assistive tech:
 * the hero copy carries the content.
 */
export function AppHeroStage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [armed, setArmed] = useState(false)
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (!motionAllowed()) return
    const root = rootRef.current
    const arm = requestAnimationFrame(() => setArmed(true))
    const timer = window.setTimeout(() => {
      setOn(true)
      if (root) runCounts(root, 1100)
    }, SCREEN_ON_MS)
    return () => {
      cancelAnimationFrame(arm)
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={styles.heroStage}
      data-armed={armed ? '' : undefined}
    >
      <AppTilt scope="section" className={styles.heroTilt}>
        <div className={styles.heroHalo}>
          <span className={styles.heroHaloSpin} />
        </div>

        <div className={styles.heroScroll}>
          <div className={styles.heroEnter}>
            <div className={styles.heroPhoneTurn}>
              <AppPhone className={styles.heroPhone}>
                <div
                  className={styles.demoScreen}
                  data-current=""
                  data-on={on ? '' : undefined}
                >
                  <AppScreen id="summary" />
                </div>
              </AppPhone>
              <span className={styles.heroSheen} />
            </div>
          </div>
        </div>

        <div className={styles.heroNotice}>
          <div className={styles.heroNoticeCard}>
            <p className={styles.heroNoticeHead}>
              <Image
                src="/prism-app/app-icon.png"
                alt=""
                width={40}
                height={40}
                className={styles.heroNoticeIcon}
              />
              <span className={styles.heroNoticeApp}>Prism</span>
              <span className={styles.heroNoticeTime}>8:06 AM</span>
            </p>
            <p className={styles.heroNoticeTitle}>New form submission</p>
            <p className={styles.heroNoticeBody}>
              bayviewdental.example received a form: Appointment request.
            </p>
          </div>
        </div>
      </AppTilt>
    </div>
  )
}

export default AppHeroStage
