'use client'

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'

import { motionAllowed, runCounts } from './motion'

type AppArmProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  as?: ElementType
  /** Count `[data-count]` descendants up when the block arrives. */
  count?: boolean
  'aria-hidden'?: boolean
}

/**
 * Plays a block's data once, when it scrolls into view. After hydration it
 * sets `data-armed` (CSS parks the parts) and on arrival `data-in` (CSS
 * plays them home). It never resets in view. Without JS, or with reduced
 * motion, neither attribute is set and the finished frame shows.
 */
export function AppArm({
  children,
  className,
  style,
  as: Component = 'div',
  count = false,
  ...rest
}: AppArmProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || !motionAllowed() || typeof IntersectionObserver === 'undefined') {
      return
    }
    node.setAttribute('data-armed', '')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        node.setAttribute('data-in', '')
        if (count) runCounts(node)
        observer.disconnect()
      },
      { rootMargin: '0px 0px -14% 0px', threshold: 0.18 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [count])

  return (
    <Component ref={ref} className={className} style={style} {...rest}>
      {children}
    </Component>
  )
}

export default AppArm
