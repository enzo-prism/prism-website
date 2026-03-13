'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

import ElevenLabsWidget from '@/components/elevenlabs/ElevenLabsWidget'
import { isPublicElevenLabsWidgetEnabled } from '@/lib/elevenlabs-widget'

const GLOBAL_ELEVENLABS_WIDGET_Z_INDEX = 2147483000

function shouldMountGlobalWidget(pathname: string): boolean {
  return pathname !== '/'
}

export default function GlobalElevenLabsWidget() {
  const pathname = usePathname()
  const shouldMountWidget =
    isPublicElevenLabsWidgetEnabled() && shouldMountGlobalWidget(pathname)
  const widgetStyle = useMemo(
    () => ({
      zIndex: String(GLOBAL_ELEVENLABS_WIDGET_Z_INDEX),
    }),
    [],
  )

  if (!shouldMountWidget) {
    return null
  }

  return (
    <ElevenLabsWidget style={widgetStyle} testId="global-elevenlabs-widget" />
  )
}
