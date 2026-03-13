'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

import Script from 'next/script'

import {
  getPublicElevenLabsAgentId,
  getPublicElevenLabsMarkdownLinkAllowedHosts,
  isPublicElevenLabsWidgetEnabled,
} from '@/lib/elevenlabs-widget'

const ELEVENLABS_WIDGET_EMBED_SRC =
  'https://unpkg.com/@elevenlabs/convai-widget-embed'
const ELEVENLABS_WIDGET_TAG = 'elevenlabs-convai'

type ElevenLabsWidgetProps = {
  className?: string
  dismissible?: boolean
  style?: CSSProperties
  testId?: string
  variant?: 'expanded'
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
  dismissible,
  style,
  testId,
  variant,
}: ElevenLabsWidgetProps) {
  const widgetRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const widget = widgetRef.current

    if (!widget || !style) {
      return
    }

    let isActive = true
    let rafId: number | null = null

    const styleEntries = Object.entries(style).filter(
      ([, value]) => value !== undefined && value !== null,
    )

    const applyHostStyles = () => {
      if (!isActive || !widgetRef.current) {
        return
      }

      for (const [property, value] of styleEntries) {
        const cssProperty = property.startsWith('--')
          ? property
          : property.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
        const nextValue = String(value)

        if (
          widgetRef.current.style.getPropertyValue(cssProperty) === nextValue
        ) {
          continue
        }

        widgetRef.current.style.setProperty(cssProperty, nextValue)
      }
    }

    const queueApplyHostStyles = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        rafId = null
        applyHostStyles()
      })
    }

    applyHostStyles()
    queueApplyHostStyles()

    customElements.whenDefined(ELEVENLABS_WIDGET_TAG).then(() => {
      if (!isActive) {
        return
      }

      queueApplyHostStyles()
    })

    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.attributeName === 'style')) {
        queueApplyHostStyles()
      }
    })

    observer.observe(widget, {
      attributes: true,
      attributeFilter: ['style'],
    })

    return () => {
      isActive = false

      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }

      observer.disconnect()
    }
  }, [style])

  if (!isPublicElevenLabsWidgetEnabled()) {
    return null
  }

  // Keep this wrapper intentionally thin so production stays aligned with the stock ElevenLabs widget.
  const props: Record<string, string | undefined> = {
    'agent-id': getPublicElevenLabsAgentId(),
    'markdown-link-allow-http': 'false',
    'markdown-link-allowed-hosts':
      getPublicElevenLabsMarkdownLinkAllowedHosts(),
    'markdown-link-include-www': 'true',
    className,
    'data-testid': testId,
  }

  if (variant) {
    props.variant = variant
  }

  if (typeof dismissible === 'boolean') {
    props.dismissible = dismissible ? 'true' : 'false'
  }

  return <elevenlabs-convai ref={widgetRef} {...props} />
}
