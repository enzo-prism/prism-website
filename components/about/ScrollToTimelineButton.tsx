"use client"

import { ArrowDownRight } from "lucide-react"

export default function ScrollToTimelineButton() {
  const scrollToTimeline = () => {
    const target = document.getElementById("timeline")
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <button
      type="button"
      onClick={scrollToTimeline}
      className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 lowercase"
    >
      view timeline <ArrowDownRight className="ml-2 h-4 w-4" aria-hidden />
    </button>
  )
}
