"use client"

import { useEffect, useState } from "react"

import { usePathname } from "next/navigation"

import ElevenLabsWidget from "@/components/elevenlabs/ElevenLabsWidget"

function isDedicatedSalesChatLauncherVisible(): boolean {
  return Boolean(document.querySelector('[aria-label="Open sales chat"]'))
}

function shouldMountGlobalWidget(pathname: string): boolean {
  return pathname !== "/"
}

export default function GlobalElevenLabsWidget() {
  const pathname = usePathname()
  const isGetStartedPage = pathname.startsWith("/get-started")
  const shouldMountWidget = shouldMountGlobalWidget(pathname)
  const [hasDedicatedSalesChatLauncher, setHasDedicatedSalesChatLauncher] = useState(false)

  const shouldHideForDedicatedLauncher = isGetStartedPage && hasDedicatedSalesChatLauncher
  const shouldRenderWidget = shouldMountWidget && !shouldHideForDedicatedLauncher

  useEffect(() => {
    if (!isGetStartedPage) {
      setHasDedicatedSalesChatLauncher(false)
      return
    }

    const syncDedicatedChatState = () => {
      setHasDedicatedSalesChatLauncher(isDedicatedSalesChatLauncherVisible())
    }

    syncDedicatedChatState()

    const observer = new MutationObserver(syncDedicatedChatState)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["aria-label", "class", "style"],
    })

    return () => {
      observer.disconnect()
    }
  }, [isGetStartedPage])

  if (!shouldMountWidget) {
    return null
  }

  return shouldRenderWidget ? <ElevenLabsWidget testId="global-elevenlabs-widget" /> : null
}
