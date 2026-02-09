"use client"

import { ArrowDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ScrollToTimelineButton() {
  const scrollToTimeline = () => {
    const target = document.getElementById("timeline")
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <Button
      type="button"
      onClick={scrollToTimeline}
      size="lg"
      className="rounded-md px-6"
    >
      view timeline <ArrowDownRight className="ml-2 h-4 w-4" aria-hidden />
    </Button>
  )
}
