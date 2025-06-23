"use client"

import { useEffect } from "react"

// List of critical resources to preload
const criticalResources = [
  // Critical images
  { type: "image", url: "/Prism Logo.png" },
  { type: "image", url: "/prism-logo.jpeg" },
  { type: "image", url: "/favicon-large.png" },
  { type: "image", url: "/favicon-small.png" },

  // Critical fonts (if any)
  // { type: 'font', url: '/fonts/your-font.woff2' },
]

export default function ResourcePreloader() {
  useEffect(() => {
    // Skip in server-side rendering
    if (typeof window === "undefined") return

    // Preload critical resources
    criticalResources.forEach((resource) => {
      if (resource.type === "image") {
        const img = new Image()
        img.src = resource.url
      } else if (resource.type === "font") {
        const link = document.createElement("link")
        link.rel = "preload"
        link.href = resource.url
        link.as = "font"
        link.type = "font/woff2"
        link.crossOrigin = "anonymous"
        document.head.appendChild(link)
      }
    })
  }, [])

  return null // This component doesn't render anything
}
