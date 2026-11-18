'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { finePointer, motionAllowed } from './motion'

type AppTiltProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Track the pointer over the nearest section, not just this element. */
  scope?: 'self' | 'section'
}

const clamp = (value: number) => Math.max(-1, Math.min(1, value))

/**
 * Writes the pointer's position as `--tx` and `--ty` (-1 to 1, eased) so
 * CSS can turn a phone a few degrees toward the cursor and shift its
 * satellites for depth. Mouse and trackpad only; touch, reduced motion and
 * no-JS keep the flat frame (both properties default to 0).
 */
export function AppTilt({
  children,
  className,
  style,
  scope = 'self',
}: AppTiltProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || !motionAllowed() || !finePointer()) return
    const area: HTMLElement =
      scope === 'section' ? (node.closest('section') ?? node) : node

    let targetX = 0
    let targetY = 0
    let x = 0
    let y = 0
    let frame = 0

    const tick = () => {
      x += (targetX - x) * 0.085
      y += (targetY - y) * 0.085
      node.style.setProperty('--tx', x.toFixed(4))
      node.style.setProperty('--ty', y.toFixed(4))
      const settled =
        Math.abs(targetX - x) < 0.0008 && Math.abs(targetY - y) < 0.0008
      frame = settled ? 0 : requestAnimationFrame(tick)
    }
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const rect = node.getBoundingClientRect()
      targetX = clamp(
        (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2 + 240),
      )
      targetY = clamp(
        (event.clientY - (rect.top + rect.height / 2)) /
          (rect.height / 2 + 160),
      )
      kick()
    }
    const onLeave = () => {
      targetX = 0
      targetY = 0
      kick()
    }

    area.addEventListener('pointermove', onMove)
    area.addEventListener('pointerleave', onLeave)
    return () => {
      area.removeEventListener('pointermove', onMove)
      area.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [scope])

  return (
    <div ref={ref} className={cn(className)} style={style}>
      {children}
    </div>
  )
}

export default AppTilt
