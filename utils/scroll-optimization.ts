/**
 * Enhanced utility functions to optimize scrolling performance on mobile devices
 */

// Check if the device is a touch device with improved detection
export const isTouchDevice = (): boolean => {
  if (typeof window === "undefined") return false

  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore - for older browsers
    navigator.msMaxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  )
}

// Enhanced debounce function with immediate execution option
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }

    const callNow = immediate && !timeout

    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, wait)

    if (callNow) func(...args)
  }
}

// Enhanced throttle function with leading and trailing options
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
  options: { leading?: boolean; trailing?: boolean } = { leading: true, trailing: true },
): (...args: Parameters<T>) => void {
  let inThrottle = false
  let lastFunc: ReturnType<typeof setTimeout> | null = null
  let lastRan: number

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      if (options.leading !== false) {
        func(...args)
      }
      lastRan = Date.now()
      inThrottle = true
    } else {
      if (lastFunc) clearTimeout(lastFunc)
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            if (options.trailing !== false) {
              func(...args)
            }
            lastRan = Date.now()
            inThrottle = false
          }
        },
        limit - (Date.now() - lastRan),
      )
    }
  }
}

// Add passive event listener with better browser support
export function addPassiveEventListener(
  element: HTMLElement | Window | Document,
  eventName: string,
  handler: EventListenerOrEventListenerObject,
  options: AddEventListenerOptions = {},
): void {
  const passiveSupported = supportsPassive()
  const listenerOptions = passiveSupported ? { passive: true, ...options } : false

  element.addEventListener(eventName, handler, listenerOptions)
}

// Remove passive event listener
export function removePassiveEventListener(
  element: HTMLElement | Window | Document,
  eventName: string,
  handler: EventListenerOrEventListenerObject,
): void {
  element.removeEventListener(eventName, handler)
}

// Check if passive events are supported
function supportsPassive(): boolean {
  if (typeof window === "undefined") return false

  let passiveSupported = false
  try {
    const options = {
      get passive() {
        passiveSupported = true
        return false
      },
    }
    window.addEventListener("test" as any, () => {}, options as any)
    window.removeEventListener("test" as any, () => {}, options as any)
  } catch (err) {
    passiveSupported = false
  }
  return passiveSupported
}

// Enhanced scroll performance optimization
export function optimizeScrollPerformance(): void {
  if (typeof window === "undefined") return

  const body = document.body
  const html = document.documentElement

  // Set CSS properties for better scrolling
  html.style.setProperty("-webkit-overflow-scrolling", "touch")
  html.style.setProperty("overscroll-behavior", "none")

  // Add touch device class
  if (isTouchDevice()) {
    body.classList.add("touch-device")
  }

  // Optimize viewport height for mobile
  const setVH = () => {
    const vh = window.innerHeight * 0.01
    html.style.setProperty("--vh", `${vh}px`)
  }

  setVH()
  addPassiveEventListener(window, "resize", debounce(setVH, 100))
  addPassiveEventListener(window, "orientationchange", debounce(setVH, 100))

  // Pause animations during scroll for better performance
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null

  const handleScroll = throttle(() => {
    if (!body.classList.contains("is-scrolling")) {
      body.classList.add("is-scrolling")
    }

    if (scrollTimeout !== null) {
      clearTimeout(scrollTimeout)
    }

    scrollTimeout = setTimeout(() => {
      body.classList.remove("is-scrolling")
    }, 150)
  }, 16) // 60fps

  addPassiveEventListener(window, "scroll", handleScroll)
}

// Optimize touch scrolling for specific elements
export function optimizeTouchScrolling(element: HTMLElement): void {
  if (!element || typeof window === "undefined") return

  // Set touch-action for better scroll performance
  element.style.touchAction = "pan-y"
  ;(element.style as any).webkitOverflowScrolling = "touch"
  element.style.overscrollBehavior = "contain"

  // Add momentum scrolling for iOS
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    ;(element.style as any).webkitOverflowScrolling = "touch"
  }
}

// Prevent scroll bounce on iOS
export function preventScrollBounce(): void {
  if (typeof window === "undefined") return

  const preventDefault = (e: Event) => {
    if ((e as TouchEvent).touches.length > 1) return

    const target = e.target as HTMLElement
    const scrollable = target.closest("[data-scrollable]") || target.closest(".scroll-container") || document.body

    if (scrollable === document.body) {
      e.preventDefault()
    }
  }

  // Only prevent default on document level, allow on scrollable containers
  addPassiveEventListener(document, "touchmove", preventDefault)
}

// Smooth scroll to element with mobile optimization
export function smoothScrollTo(element: HTMLElement | string, options: ScrollIntoViewOptions = {}): void {
  if (typeof window === "undefined") return

  const target = typeof element === "string" ? (document.querySelector(element) as HTMLElement) : element

  if (!target) return

  const defaultOptions: ScrollIntoViewOptions = {
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  }

  // Use native smooth scrolling if supported, otherwise fallback
  if ("scrollBehavior" in document.documentElement.style) {
    target.scrollIntoView({ ...defaultOptions, ...options })
  } else {
    // Fallback for older browsers
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const duration = 500
    let start: number | null = null

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      const percentage = Math.min(progress / duration, 1)

      // Easing function
      const ease = percentage < 0.5 ? 2 * percentage * percentage : -1 + (4 - 2 * percentage) * percentage

      window.scrollTo(0, startPosition + distance * ease)

      if (progress < duration) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }
}

// Initialize all scroll optimizations
export function initializeScrollOptimizations(): void {
  if (typeof window === "undefined") return

  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      optimizeScrollPerformance()
      if (isTouchDevice()) {
        preventScrollBounce()
      }
    })
  } else {
    optimizeScrollPerformance()
    if (isTouchDevice()) {
      preventScrollBounce()
    }
  }
}
