'use client'

import { useEffect, useRef } from 'react'

/**
 * Swings the refraction scene a few degrees toward a fine pointer, eased
 * with a small lerp so the light feels heavy, like glass turning in a hand.
 * Writes `--swing` (-1..1) on the scene element; touch devices, reduced
 * motion, and no-JS visitors keep the finished still frame (swing 0).
 */
export default function RefractionPointer() {
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const scene = ref.current?.parentElement
    const hero = scene?.closest('section')
    if (!scene || !hero || typeof window.matchMedia !== 'function') return
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    let target = 0
    let current = 0
    let frame = 0
    // Only the horizontal extent matters, and it only changes on resize.
    let left = 0
    let width = 1
    const measure = () => {
      const rect = hero.getBoundingClientRect()
      left = rect.left
      width = rect.width || 1
    }
    measure()

    const tick = () => {
      current += (target - current) * 0.06
      scene.style.setProperty('--swing', current.toFixed(4))
      frame =
        Math.abs(target - current) > 0.0005 ? requestAnimationFrame(tick) : 0
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onMove = (event: PointerEvent) => {
      const x = ((event.clientX - left) / width) * 2 - 1
      target = Math.max(-1, Math.min(1, x))
      schedule()
    }

    const onLeave = () => {
      target = 0
      schedule()
    }

    hero.addEventListener('pointerenter', measure)
    hero.addEventListener('pointermove', onMove, { passive: true })
    hero.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', measure)
    return () => {
      hero.removeEventListener('pointerenter', measure)
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', measure)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <span ref={ref} hidden />
}
