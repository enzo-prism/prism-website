"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import EnhancedAnalytics from "./enhanced-analytics"
import ErrorTracker from "./error-tracker"
import ScrollTracker from "./scroll-tracker"

interface AnalyticsProviderProps {
  children?: React.ReactNode
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname()

  // Get page title from document or pathname
  const getPageTitle = () => {
    if (typeof document !== "undefined") {
      return document.title || formatPathToTitle(pathname)
    }
    return formatPathToTitle(pathname)
  }

  // Format pathname to a readable title
  const formatPathToTitle = (path: string) => {
    // Remove leading slash and split by remaining slashes
    const parts = path.replace(/^\//, "").split("/")

    // If it's the homepage, return the site name
    if (parts[0] === "") return "Prism Agency"

    // Otherwise, format the path parts into a title
    return parts
      .map((part) => part.replace(/-/g, " "))
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" - ")
  }

  return (
    <>
      <EnhancedAnalytics title={getPageTitle()} />
      <ErrorTracker />
      <ScrollTracker />
      {children}
    </>
  )
}
