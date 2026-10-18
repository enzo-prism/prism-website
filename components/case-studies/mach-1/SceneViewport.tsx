'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

import styles from './scenes.module.css'

/** Matches the stage crossfade in Mach1Stack (duration-700) plus a frame. */
const FADE_MS = 760

type SceneViewportProps = {
  /** Spoken summary of the illustration (the drawing itself is decorative). */
  label: string
  /** Extra gate from the parent, e.g. "this is the active tool". */
  active?: boolean
  className?: string
  children: ReactNode
}

/**
 * Wraps one growth-stack scene. Server HTML is the finished frame
 * (`data-playing="false"`); once hydrated, the scene loops only while it is
 * on screen and active, so off-screen scenes cost nothing.
 */
export function SceneViewport({
  label,
  active = true,
  className,
  children,
}: SceneViewportProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  // An outgoing scene keeps playing through its fade-out, so it never snaps
  // to the finished frame while it is still on screen.
  const [previousActive, setPreviousActive] = useState(active)
  const [lingering, setLingering] = useState(false)
  if (previousActive !== active) {
    setPreviousActive(active)
    setLingering(!active)
  }

  useEffect(() => {
    if (!lingering) return
    const timer = window.setTimeout(() => setLingering(false), FADE_MS)
    return () => window.clearTimeout(timer)
  }, [lingering])

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      data-playing={visible && (active || lingering) ? 'true' : 'false'}
      className={cn(styles.scene, className)}
    >
      {children}
    </div>
  )
}
