import { type RefObject, useLayoutEffect } from "react"

export function useCaseStudyStickyNavHeight(navRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = document.documentElement
    const nav = navRef.current

    if (!nav) {
      root.style.setProperty("--prism-case-study-nav-height", "0px")
      return
    }

    const updateNavHeight = () => {
      root.style.setProperty("--prism-case-study-nav-height", `${nav.getBoundingClientRect().height}px`)
    }

    updateNavHeight()

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateNavHeight) : null
    resizeObserver?.observe(nav)
    window.addEventListener("resize", updateNavHeight)

    return () => {
      window.removeEventListener("resize", updateNavHeight)
      resizeObserver?.disconnect()
      root.style.setProperty("--prism-case-study-nav-height", "0px")
    }
  }, [navRef])
}

