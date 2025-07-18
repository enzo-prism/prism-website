"use client"

import { useEffect } from "react"
import { initializeReleaseTracking } from "@/utils/release-tracking"

export default function ReleaseTracker() {
  useEffect(() => {
    // Initialize release tracking on mount
    initializeReleaseTracking()
  }, [])
  
  // This component doesn't render anything visible
  return null
}