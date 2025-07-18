"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { initializePerformanceMonitoring, trackPageLoadPerformance } from "@/utils/performance-monitoring"

export default function PerformanceMonitor() {
  const pathname = usePathname()
  
  useEffect(() => {
    // Initialize performance monitoring on mount
    initializePerformanceMonitoring()
  }, [])
  
  useEffect(() => {
    // Track page load performance for each route change
    if (pathname) {
      trackPageLoadPerformance(pathname)
    }
  }, [pathname])
  
  // This component doesn't render anything visible
  return null
}