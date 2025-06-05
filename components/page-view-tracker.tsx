"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { trackPageView } from "@/utils/analytics"

interface PageViewTrackerProps {
  title: string
}

export default function PageViewTracker({ title }: PageViewTrackerProps) {
  const pathname = usePathname()
  const isTracked = useRef(false)

  useEffect(() => {
    // Only track once per page load to avoid duplicate events
    if (!isTracked.current) {
      trackPageView(pathname, title)
      isTracked.current = true
    }
  }, [pathname, title])

  return null // This component doesn't render anything
}
