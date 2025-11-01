"use client"

import { useEffect } from "react"

const SCRIPT_SRC = "https://ssl.gstatic.com/trends_nrtr/4267_RC01/embed_loader.js"
const WIDGET_CONFIG = {
  comparisonItem: [
    { keyword: "dentist near me", geo: "US", time: "today 1-m" },
    { keyword: "invisalign near me", geo: "US", time: "today 1-m" },
    { keyword: "implants near me", geo: "US", time: "today 1-m" },
  ],
  category: 0,
  property: "",
}
const EXPLORE_CONFIG = {
  exploreQuery: "date=today%201-m&geo=US&q=dentist%20near%20me,invisalign%20near%20me,implants%20near%20me&hl=en-US",
  guestPath: "https://trends.google.com:443/trends/embed/",
}

function loadGoogleTrendsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    if (window.trends?.embed) {
      resolve()
      return
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true })
      existing.addEventListener("error", () => reject(new Error("Failed to load Google Trends")), { once: true })
      return
    }

    const script = document.createElement("script")
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.addEventListener("load", () => resolve(), { once: true })
    script.addEventListener("error", () => reject(new Error("Failed to load Google Trends")), { once: true })
    document.body.appendChild(script)
  })
}

export default function DentalTrendsChart() {
  useEffect(() => {
    const container = document.getElementById("dental-trends-widget")
    if (!container) {
      return
    }

    let isMounted = true

    const renderWidget = () => {
      if (!isMounted) return
      try {
        // @ts-ignore - provided by embed script
        if (window.trends?.embed?.renderExploreWidgetTo) {
          // @ts-ignore
          window.trends.embed.renderExploreWidgetTo(container, "TIMESERIES", WIDGET_CONFIG, EXPLORE_CONFIG)
        } else {
          // @ts-ignore
          window.trends?.embed?.renderExploreWidget("TIMESERIES", WIDGET_CONFIG, EXPLORE_CONFIG)
        }
      } catch (error) {
        console.error("[DentalTrendsChart] failed to render widget", error)
      }
    }

    loadGoogleTrendsScript()
      .then(renderWidget)
      .catch((error) => console.error(error))

    return () => {
      isMounted = false
      const iframe = container.querySelector("iframe")
      if (iframe) {
        iframe.remove()
      }
    }
  }, [])

  return (
    <div
      id="dental-trends-widget"
      className="h-[420px] w-full overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
    />
  )
}
