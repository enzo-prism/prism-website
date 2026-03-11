"use client"

import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function BlogBackToTopButton() {
  const [visible, setVisible] = useState(false)
  const [isWidgetExpanded, setIsWidgetExpanded] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const syncWidgetState = () => {
      setIsWidgetExpanded(document.documentElement.dataset.prismWidgetExpanded === "true")
    }

    const handleWidgetExpandedChange = (event: Event) => {
      const detail = (event as CustomEvent<{ expanded?: boolean }>).detail
      setIsWidgetExpanded(Boolean(detail?.expanded))
    }

    syncWidgetState()

    const observer = new MutationObserver(syncWidgetState)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-prism-widget-expanded"],
    })

    window.addEventListener("prism-widget-expanded-change", handleWidgetExpandedChange)

    return () => {
      observer.disconnect()
      window.removeEventListener("prism-widget-expanded-change", handleWidgetExpandedChange)
    }
  }, [])

  const scrollToTop = () => {
    if (typeof window === "undefined") return
    const prefersReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: prefersReduceMotion ? "auto" : "smooth" })
  }

  if (!visible || isWidgetExpanded) {
    return null
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="back to top"
      className="fixed right-4 bottom-24 z-40 inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground shadow-lg transition hover:border-border hover:text-foreground hover:bg-card/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:bottom-28"
    >
      <ArrowUp className="h-4 w-4" aria-hidden />
      back to top
    </button>
  )
}
