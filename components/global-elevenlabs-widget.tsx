"use client"

import { createElement, useEffect, useRef, useState } from "react"

import { usePathname } from "next/navigation"
import Script from "next/script"

import { getPublicElevenLabsAgentId } from "@/lib/elevenlabs"

const GLOBAL_AGENT_ID = getPublicElevenLabsAgentId()
const ELEVENLABS_WIDGET_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed"

type GlobalWidgetVariant = "tiny" | "expanded" | "fullscreen"

function isDedicatedSalesChatLauncherVisible(): boolean {
  return Boolean(document.querySelector('[aria-label="Open sales chat"]'))
}

function shouldMountGlobalWidget(pathname: string): boolean {
  return pathname !== "/"
}

export default function GlobalElevenLabsWidget() {
  const pathname = usePathname()
  const widgetRef = useRef<HTMLElement | null>(null)
  const isGetStartedPage = pathname.startsWith("/get-started")
  const shouldMountWidget = shouldMountGlobalWidget(pathname)
  const [widgetVariant, setWidgetVariant] = useState<GlobalWidgetVariant>("tiny")
  const [hasDedicatedSalesChatLauncher, setHasDedicatedSalesChatLauncher] = useState(false)

  const shouldHideForDedicatedLauncher = isGetStartedPage && hasDedicatedSalesChatLauncher
  const shouldRenderWidget = shouldMountWidget && !shouldHideForDedicatedLauncher
  const isFullscreen = widgetVariant === "fullscreen"

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

  useEffect(() => {
    if (!shouldRenderWidget) {
      setWidgetVariant("tiny")
      return
    }

    const syncWidgetState = (shadowRoot: ShadowRoot) => {
      const sheet = shadowRoot.querySelector<HTMLElement>(".sheet")
      const nextVariant = (sheet?.getAttribute("data-variant") as GlobalWidgetVariant | null) ?? "tiny"

      setWidgetVariant((currentVariant) => (currentVariant === nextVariant ? currentVariant : nextVariant))
    }

    const injectWidgetStyles = () => {
      const host = widgetRef.current
      const shadowRoot = host?.shadowRoot

      if (!host || !shadowRoot) {
        return false
      }

      syncWidgetState(shadowRoot)

      if (!shadowRoot.querySelector("style[data-prism-global-widget]")) {
        const style = document.createElement("style")
        style.dataset.prismGlobalWidget = "true"
        style.textContent = `
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

          :host {
            z-index: 120 !important;
          }
        `
        shadowRoot.append(style)
      }

      return true
    }

    const host = widgetRef.current

    if (!host) {
      return
    }

    const setupObservers = (shadowRoot: ShadowRoot) => {
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
        mutationObserver.disconnect()
      }
    }

    if (injectWidgetStyles() && host.shadowRoot) {
      return setupObservers(host.shadowRoot)
    }

    let cleanup: (() => void) | undefined

    const interval = window.setInterval(() => {
      const currentHost = widgetRef.current

      if (injectWidgetStyles() && currentHost?.shadowRoot) {
        window.clearInterval(interval)
        cleanup = setupObservers(currentHost.shadowRoot)
      }
    }, 300)

    return () => {
      window.clearInterval(interval)
      cleanup?.()
    }
  }, [shouldRenderWidget])

  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow

    if (isFullscreen) {
      document.documentElement.style.overflow = "hidden"
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
    }
  }, [isFullscreen])

  useEffect(() => {
    const root = document.documentElement

    if (isFullscreen) {
      root.dataset.prismWidgetExpanded = "true"
    } else if (root.dataset.prismWidgetExpanded === "true") {
      delete root.dataset.prismWidgetExpanded
    }

    window.dispatchEvent(
      new CustomEvent("prism-widget-expanded-change", {
        detail: { expanded: isFullscreen },
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
  }, [isFullscreen])

  if (!shouldMountWidget) {
    return null
  }

  return (
    <>
      <Script src={ELEVENLABS_WIDGET_SRC} strategy="afterInteractive" type="text/javascript" />
      {createElement("elevenlabs-convai", {
        "agent-id": GLOBAL_AGENT_ID,
        "aria-hidden": shouldHideForDedicatedLauncher ? "true" : undefined,
        variant: "tiny",
        placement: "bottom-right",
        dismissible: "true",
        "default-expanded": "false",
        ref: widgetRef,
        style: shouldHideForDedicatedLauncher ? { display: "none" } : undefined,
      })}
    </>
  )
}
