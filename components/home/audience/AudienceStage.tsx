'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type AudienceStageProps = {
  children: ReactNode
  className?: string
}

/**
 * Pointer parallax for the #audience receipts. Writes --mx / --my (each -1 to
 * 1) on the stage; the CSS module moves each layer by its own depth. Only
 * fine pointers with no reduced-motion preference get it. Without JS the
 * variables stay 0, which is the finished frame.
 */
export function AudienceStage({ children, className }: AudienceStageProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof window.matchMedia !== 'function') return
    const query = window.matchMedia(
      '(prefers-reduced-motion: no-preference) and (pointer: fine)',
    )
    if (!query.matches) return

    let frame = 0
    const write = (x: number, y: number) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        node.style.setProperty('--mx', x.toFixed(3))
        node.style.setProperty('--my', y.toFixed(3))
      })
    }
    const clamp = (value: number) => Math.max(-1, Math.min(1, value))

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect()
      write(
        clamp(((event.clientX - rect.left) / rect.width) * 2 - 1),
        clamp(((event.clientY - rect.top) / rect.height) * 2 - 1),
      )
    }
    const onLeave = () => write(0, 0)

    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export default AudienceStage
