'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from 'react'
import styles from './scholarships.module.css'

const MotionContext = createContext({
  paused: true,
  userPaused: false,
  ready: false,
  reduced: true,
  toggle: () => {},
})

const subscribeHydration = () => () => {}
const clientReady = () => true
const serverNotReady = () => false
const serverReduced = () => true
const motionPreference = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
const tabHidden = () => document.hidden
function subscribePreference(callback: () => void) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  preference.addEventListener('change', callback)
  return () => preference.removeEventListener('change', callback)
}
function subscribeVisibility(callback: () => void) {
  document.addEventListener('visibilitychange', callback)
  return () => document.removeEventListener('visibilitychange', callback)
}

/** Static before hydration; respects live OS preference and background tabs. */
export function ScholarshipsMotionShell({ children }: { children: ReactNode }) {
  const ready = useSyncExternalStore(
    subscribeHydration,
    clientReady,
    serverNotReady,
  )
  const reduced = useSyncExternalStore(
    subscribePreference,
    motionPreference,
    serverReduced,
  )
  const hidden = useSyncExternalStore(
    subscribeVisibility,
    tabHidden,
    serverNotReady,
  )
  const [userPaused, setUserPaused] = useState(false)
  const paused = !ready || reduced || hidden || userPaused
  return (
    <MotionContext.Provider
      value={{
        paused,
        userPaused,
        ready,
        reduced,
        toggle: () => setUserPaused((value) => !value),
      }}
    >
      <div className={styles.motionRoot} data-motion-paused={paused}>
        {children}
      </div>
    </MotionContext.Provider>
  )
}

export function MotionToggle() {
  const { userPaused, ready, reduced, toggle } = useContext(MotionContext)
  return (
    <button
      type="button"
      hidden={!ready || reduced}
      onClick={toggle}
      aria-pressed={userPaused}
      className={styles.motionToggle}
    >
      <span aria-hidden="true" className={styles.toggleSymbol}>
        {userPaused ? '▶' : 'Ⅱ'}
      </span>
      {userPaused ? 'Resume motion' : 'Pause motion'}
    </button>
  )
}

/** Pause each scene offscreen; never hide functional content or its static artwork. */
export function MotionScene({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { paused } = useContext(MotionContext)
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      data-scholarship-scene=""
      style={
        {
          '--scholarship-play-state': !paused && visible ? 'running' : 'paused',
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}
