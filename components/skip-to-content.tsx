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
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[10000] focus-visible:rounded-full focus-visible:bg-primary focus-visible:px-5 focus-visible:py-2.5 focus-visible:text-sm focus-visible:font-medium focus-visible:text-primary-foreground focus-visible:shadow-lg focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      Skip to content
    </a>
  )
}

