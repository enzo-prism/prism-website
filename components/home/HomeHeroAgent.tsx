"use client"

import { useEffect, useRef } from "react"

import ElevenLabsWidget from "@/components/elevenlabs/ElevenLabsWidget"
import { isPublicElevenLabsWidgetEnabled } from "@/lib/elevenlabs"
import { cn } from "@/lib/utils"

type HomeHeroAgentProps = {
  className?: string
}

const HOME_WIDGET_STYLE_SELECTOR = "style[data-prism-home-widget-centering]"

export default function HomeHeroAgent({ className }: HomeHeroAgentProps) {
  const widgetRef = useRef<HTMLElement | null>(null)
  const widgetEnabled = isPublicElevenLabsWidgetEnabled()

  useEffect(() => {
    if (!widgetEnabled) {
      return
    }

    let intervalId: number | undefined

    const injectHomepageWidgetStyles = () => {
      const shadowRoot = widgetRef.current?.shadowRoot

      if (!shadowRoot) {
        return false
      }

      if (!shadowRoot.querySelector(HOME_WIDGET_STYLE_SELECTOR)) {
        const style = document.createElement("style")
        style.setAttribute("data-prism-home-widget-centering", "true")
        // Keep the stock widget untouched except for desktop centering in the homepage hero.
        style.textContent = `
          @media (min-width: 768px) {
            .sheet {
              left: 50% !important;
              right: auto !important;
              top: calc(50% + 4.75rem) !important;
              bottom: auto !important;
              transform: translate(-50%, -50%) !important;
            }
          }
        `

        shadowRoot.append(style)
      }

      return true
    }

    if (!injectHomepageWidgetStyles()) {
      intervalId = window.setInterval(() => {
        if (injectHomepageWidgetStyles() && intervalId) {
          window.clearInterval(intervalId)
        }
      }, 250)
    }

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [widgetEnabled])

  if (!widgetEnabled) {
    return null
  }

  return (
    <div
      className={cn(
        "home-hero-agent relative isolate mx-auto flex min-h-[31rem] w-full max-w-[34rem] items-center justify-center text-left sm:min-h-[33rem]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-[8%] top-[14%] h-[72%] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.10),rgba(255,255,255,0)_68%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-[16%] top-[22%] h-[56%] rounded-full border border-black/[0.04] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.18))] blur-2xl" />
      <ElevenLabsWidget
        expanded
        className="mx-auto block w-full"
        hostRef={widgetRef}
        testId="home-elevenlabs-widget"
      />
    </div>
  )
}
