"use client"

import { createElement, type CSSProperties, useEffect, useRef, useState } from "react"

import Script from "next/script"

import { getPublicElevenLabsAgentId } from "@/lib/elevenlabs"
import { cn } from "@/lib/utils"

const HERO_AGENT_ID = getPublicElevenLabsAgentId()
const ELEVENLABS_WIDGET_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed"
const DESKTOP_FULLSCREEN_BREAKPOINT = 768

type WidgetVariant = "compact" | "expanded" | "fullscreen"

const COMPACT_WIDGET_STYLE: CSSProperties = {
  display: "block",
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  minHeight: "100%",
  position: "absolute",
  inset: "0",
  textAlign: "left",
}

const EXPANDED_WIDGET_STYLE: CSSProperties = {
  display: "block",
  position: "fixed",
  inset: "0",
  width: "100vw",
  height: "100dvh",
  maxWidth: "100vw",
  minHeight: "100dvh",
  zIndex: "200",
  textAlign: "left",
}

type HomeHeroAgentProps = {
  className?: string
}

export default function HomeHeroAgent({ className }: HomeHeroAgentProps) {
  const widgetRef = useRef<HTMLElement | null>(null)
  const [widgetVariant, setWidgetVariant] = useState<WidgetVariant>("compact")

  const isExpanded = widgetVariant !== "compact"

  useEffect(() => {
    const syncResponsiveState = (shadowRoot: ShadowRoot, host: HTMLElement) => {
      const sheet = shadowRoot.querySelector<HTMLElement>(".sheet")
      const rawVariant = (sheet?.getAttribute("data-variant") as WidgetVariant | null) ?? "compact"
      const shouldForceDesktopFullscreen =
        rawVariant === "expanded" && window.innerWidth >= DESKTOP_FULLSCREEN_BREAKPOINT

      if (sheet && shouldForceDesktopFullscreen) {
        sheet.setAttribute("data-variant", "fullscreen")
      }

      const nextVariant = shouldForceDesktopFullscreen ? "fullscreen" : rawVariant

      setWidgetVariant((currentVariant) => (currentVariant === nextVariant ? currentVariant : nextVariant))
      host.toggleAttribute("data-prism-expanded", nextVariant !== "compact")
    }

    const injectWidgetStyles = () => {
      const host = widgetRef.current
      const shadowRoot = host?.shadowRoot

      if (!host || !shadowRoot) {
        return false
      }

      syncResponsiveState(shadowRoot, host)

      if (!shadowRoot.querySelector("style[data-prism-widget-left-align]")) {
        const style = document.createElement("style")
        style.dataset.prismWidgetLeftAlign = "true"
        style.textContent = `
          :host {
            text-align: left !important;
          }

          :host,
          :host * {
            text-align: left !important;
          }

          textarea,
          p,
          span,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          label {
            text-align: left !important;
          }
        `
        shadowRoot.append(style)
      }

      return true
    }

    const setupObservers = (host: HTMLElement, shadowRoot: ShadowRoot) => {
      const resizeObserver = new ResizeObserver(() => {
        const currentHost = widgetRef.current
        const currentShadowRoot = currentHost?.shadowRoot

        if (currentHost && currentShadowRoot) {
          syncResponsiveState(currentShadowRoot, currentHost)
        }
      })
      resizeObserver.observe(host)

      const mutationObserver = new MutationObserver(() => {
        injectWidgetStyles()
      })
      mutationObserver.observe(shadowRoot, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["data-variant", "data-shown", "class", "style"],
      })

      return () => {
        resizeObserver.disconnect()
        mutationObserver.disconnect()
      }
    }

    const host = widgetRef.current

    if (!host) {
      return
    }

    if (injectWidgetStyles() && host.shadowRoot) {
      return setupObservers(host, host.shadowRoot)
    }

    let cleanup: (() => void) | undefined

    const interval = window.setInterval(() => {
      const currentHost = widgetRef.current

      if (injectWidgetStyles() && currentHost?.shadowRoot) {
        window.clearInterval(interval)
        cleanup = setupObservers(currentHost, currentHost.shadowRoot)
      }
    }, 300)

    return () => {
      window.clearInterval(interval)
      cleanup?.()
    }
  }, [])

  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow

    if (isExpanded) {
      document.documentElement.style.overflow = "hidden"
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
    }
  }, [isExpanded])

  useEffect(() => {
    const root = document.documentElement

    if (isExpanded) {
      root.dataset.prismWidgetExpanded = "true"
    } else {
      delete root.dataset.prismWidgetExpanded
    }

    window.dispatchEvent(
      new CustomEvent("prism-widget-expanded-change", {
        detail: { expanded: isExpanded },
      }),
    )

    return () => {
      if (root.dataset.prismWidgetExpanded === "true") {
        delete root.dataset.prismWidgetExpanded
        window.dispatchEvent(
          new CustomEvent("prism-widget-expanded-change", {
            detail: { expanded: false },
          }),
        )
      }
    }
  }, [isExpanded])

  return (
    <div className={cn("home-hero-agent relative isolate mx-auto w-full max-w-[34rem] text-left", className)}>
      <Script src={ELEVENLABS_WIDGET_SRC} strategy="afterInteractive" type="text/javascript" />

      <div className="relative min-h-[35rem] sm:min-h-[33rem] lg:min-h-[31rem]">
        {createElement("elevenlabs-convai", {
          "agent-id": HERO_AGENT_ID,
          ref: widgetRef,
          style: isExpanded ? EXPANDED_WIDGET_STYLE : COMPACT_WIDGET_STYLE,
        })}
      </div>
    </div>
  )
}
