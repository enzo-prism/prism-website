"use client"

import { usePathname } from "next/navigation"

import ElevenLabsWidget from "@/components/elevenlabs/ElevenLabsWidget"

function shouldMountGlobalWidget(pathname: string): boolean {
  return pathname !== "/"
}

export default function GlobalElevenLabsWidget() {
  const pathname = usePathname()
  const shouldMountWidget = shouldMountGlobalWidget(pathname)

  if (!shouldMountWidget) {
    return null
  }

  return <ElevenLabsWidget testId="global-elevenlabs-widget" />
}
