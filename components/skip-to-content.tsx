"use client"

import { useEffect } from "react"

function ensureMainTarget() {
  const main = document.querySelector("main") as HTMLElement | null
  if (!main) return null

  if (!main.id) main.id = "main-content"
  if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1")

  return main
}

export default function SkipToContent() {
  useEffect(() => {
    ensureMainTarget()
  }, [])

  return (
    <a
      href="#main-content"
      onClick={() => {
        const main = ensureMainTarget()
        if (!main) return

        // Let the browser jump to the anchor, then move focus for SR/keyboard users.
        setTimeout(() => {
          main.focus({ preventScroll: true })
          main.scrollIntoView({ block: "start" })
        }, 0)
      }}
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[10000] focus-visible:rounded-md focus-visible:border focus-visible:border-border/60 focus-visible:bg-card focus-visible:px-4 focus-visible:py-3 focus-visible:text-sm focus-visible:font-semibold focus-visible:tracking-[0.12em] focus-visible:text-foreground focus-visible:shadow-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background font-pixel uppercase"
    >
      Skip to content
    </a>
  )
}

