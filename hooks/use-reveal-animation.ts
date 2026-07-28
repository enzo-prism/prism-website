"use client"

import { useEffect, useRef, useState } from "react"

interface UseRevealAnimationOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
  delay?: number
  triggerOnce?: boolean
}

export function useRevealAnimation(
  options: UseRevealAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    once = true,
    delay = 0,
    triggerOnce = true
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentElement = elementRef.current
    if (!currentElement) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    let delayTimer: ReturnType<typeof setTimeout> | null = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            delayTimer = setTimeout(() => {
              setIsVisible(true)
              if (triggerOnce) {
                setHasTriggered(true)
              }
            }, delay)
          } else {
            setIsVisible(true)
            if (triggerOnce) {
              setHasTriggered(true)
            }
          }
        } else if (!once && !hasTriggered) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(currentElement)

    return () => {
      if (delayTimer) clearTimeout(delayTimer)
      observer.disconnect()
    }
  }, [threshold, rootMargin, once, delay, triggerOnce, hasTriggered])

  return { elementRef, isVisible }
}

// Hook for staggered animations
export function useStaggeredReveal(
  count: number,
  options: UseRevealAnimationOptions = {}
) {
  const { delay = 100, ...restOptions } = options
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(count).fill(false))
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentElement = containerRef.current
    if (!currentElement) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setVisibleItems(new Array(count).fill(true))
      return
    }

    const staggerTimers: Array<ReturnType<typeof setTimeout>> = []

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reveal once; stop observing so re-entering doesn't restart the stagger
          observer.disconnect()
          for (let i = 0; i < count; i++) {
            staggerTimers.push(
              setTimeout(() => {
                setVisibleItems(prev => {
                  const newState = [...prev]
                  newState[i] = true
                  return newState
                })
              }, i * delay)
            )
          }
        }
      },
      {
        threshold: restOptions.threshold || 0.1,
        rootMargin: restOptions.rootMargin || "0px 0px -50px 0px",
      }
    )

    observer.observe(currentElement)

    return () => {
      staggerTimers.forEach(clearTimeout)
      observer.disconnect()
    }
  }, [count, delay, restOptions.threshold, restOptions.rootMargin])

  return { containerRef, visibleItems }
}

// Hook for parallax effects
export function useParallaxEffect(intensity: number = 0.5) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const currentElement = elementRef.current
    if (!currentElement) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handleScroll = () => {
      const rect = currentElement.getBoundingClientRect()
      const scrolled = window.pageYOffset
      const rate = scrolled * intensity
      setOffset(rate)
    }

    // Use throttled scroll handler for better performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [intensity])

  return { elementRef, offset }
}

// Hook for GPU-accelerated hover effects
export function useGPUHover() {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const currentElement = elementRef.current
    if (!currentElement) return

    const handleMouseEnter = () => {
      setIsHovered(true)
      // Add GPU acceleration
      currentElement.style.willChange = 'transform'
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      // Remove GPU acceleration when not needed
      setTimeout(() => {
        currentElement.style.willChange = 'auto'
      }, 300)
    }

    currentElement.addEventListener('mouseenter', handleMouseEnter)
    currentElement.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      currentElement.removeEventListener('mouseenter', handleMouseEnter)
      currentElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return { elementRef, isHovered }
}