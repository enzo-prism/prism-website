"use client"

import { createElement, type Ref } from "react"

import Script from "next/script"

import {
  getPublicElevenLabsAgentId,
  getPublicElevenLabsMarkdownLinkAllowedHosts,
  isPublicElevenLabsWidgetEnabled,
} from "@/lib/elevenlabs"

const ELEVENLABS_WIDGET_EMBED_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed"

type ElevenLabsWidgetProps = {
  className?: string
  expanded?: boolean
  hostRef?: Ref<HTMLElement>
  testId?: string
}

export function ElevenLabsWidgetScript() {
  if (!isPublicElevenLabsWidgetEnabled()) {
    return null
  }

  return (
    <Script
      id="elevenlabs-convai-widget-embed"
      src={ELEVENLABS_WIDGET_EMBED_SRC}
      strategy="afterInteractive"
      type="text/javascript"
    />
  )
}

export default function ElevenLabsWidget({
  className,
  expanded = false,
  hostRef,
  testId,
}: ElevenLabsWidgetProps) {
  if (!isPublicElevenLabsWidgetEnabled()) {
    return null
  }

  // Keep this wrapper intentionally thin so production stays aligned with the stock ElevenLabs widget.
  const props: Record<string, string | Ref<HTMLElement> | undefined> = {
    "agent-id": getPublicElevenLabsAgentId(),
    "markdown-link-allowed-hosts": getPublicElevenLabsMarkdownLinkAllowedHosts(),
    className,
    "data-testid": testId,
    ref: hostRef,
  }

  if (expanded) {
    props.variant = "expanded"
  }

  return createElement("elevenlabs-convai", props)
}
