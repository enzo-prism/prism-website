'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

import ElevenLabsWidget from '@/components/elevenlabs/ElevenLabsWidget'
import { usePublicElevenLabsWidgetWebGLEligibility } from '@/hooks/use-public-elevenlabs-widget-webgl'
import { usePublicElevenLabsWidgetViewportEligibility } from '@/hooks/use-public-elevenlabs-widget-viewport'
import { publishPrismWidgetExpandedState } from '@/lib/elevenlabs'
import {
  isPublicElevenLabsWidgetEnabled,
  shouldRenderPublicElevenLabsWidget,
} from '@/lib/elevenlabs-widget'

const GLOBAL_ELEVENLABS_WIDGET_Z_INDEX = 2147483000
const PRISM_WIDGET_PREFERENCE_KEY = 'prism-elevenlabs-widget-preference'
const USER_INTERACTION_PERSISTENCE_WINDOW_MS = 1500

type PrismWidgetPreference = 'collapsed' | 'expanded'

function readStorageValue(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key)
  } catch {
    return null
  }
}

function writeStorageValue(storage: Storage, key: string, value: string): void {
  try {
    storage.setItem(key, value)
  } catch {
    // Ignore storage write failures so the widget still mounts normally.
  }
}

function readWidgetPreference(): PrismWidgetPreference | null {
  if (typeof window === 'undefined') {
    return null
  }

  const storedPreference = readStorageValue(
    window.localStorage,
    PRISM_WIDGET_PREFERENCE_KEY,
  )

  if (storedPreference === 'expanded' || storedPreference === 'collapsed') {
    return storedPreference
  }

  return null
}

function writeWidgetPreference(expanded: boolean): void {
  if (typeof window === 'undefined') {
    return
  }

  writeStorageValue(
    window.localStorage,
    PRISM_WIDGET_PREFERENCE_KEY,
    expanded ? 'expanded' : 'collapsed',
  )
}

function resolveDefaultExpandedState(): boolean {
  const storedPreference = readWidgetPreference()

  if (storedPreference) {
    return storedPreference === 'expanded'
  }

  return false
}

export default function GlobalElevenLabsWidget() {
  const pathname = usePathname()
  const [defaultExpanded, setDefaultExpanded] = useState<boolean | null>(null)
  const lastInteractionTimestampRef = useRef<number | null>(null)
  const isPublicWidgetEnabled = isPublicElevenLabsWidgetEnabled()
  const shouldRenderWidgetOnRoute = shouldRenderPublicElevenLabsWidget(pathname)
  const isViewportEligible = usePublicElevenLabsWidgetViewportEligibility()
  const isWebGLEligible = usePublicElevenLabsWidgetWebGLEligibility(
    isPublicWidgetEnabled &&
      shouldRenderWidgetOnRoute &&
      isViewportEligible === true,
  )
  const widgetStyle = useMemo(
    () => ({
      zIndex: String(GLOBAL_ELEVENLABS_WIDGET_Z_INDEX),
    }),
    [],
  )

  useEffect(() => {
    if (
      !isPublicWidgetEnabled ||
      !shouldRenderWidgetOnRoute ||
      isViewportEligible === false ||
      isWebGLEligible === false
    ) {
      setDefaultExpanded(null)
      publishPrismWidgetExpandedState(false)
      return
    }

    if (isViewportEligible === null || isWebGLEligible === null) {
      setDefaultExpanded(null)
      return
    }

    setDefaultExpanded(resolveDefaultExpandedState())
  }, [
    isPublicWidgetEnabled,
    isViewportEligible,
    isWebGLEligible,
    shouldRenderWidgetOnRoute,
  ])

  const handleWidgetInteraction = () => {
    lastInteractionTimestampRef.current = Date.now()
  }

  const handleExpandedChange = (expanded: boolean) => {
    publishPrismWidgetExpandedState(expanded)

    const lastInteractionTimestamp = lastInteractionTimestampRef.current

    if (
      lastInteractionTimestamp !== null &&
      Date.now() - lastInteractionTimestamp <=
        USER_INTERACTION_PERSISTENCE_WINDOW_MS
    ) {
      writeWidgetPreference(expanded)
      lastInteractionTimestampRef.current = null
    }
  }

  if (
    !isPublicWidgetEnabled ||
    !shouldRenderWidgetOnRoute ||
    isViewportEligible !== true ||
    isWebGLEligible !== true ||
    defaultExpanded === null
  ) {
    return null
  }

  return (
    <ElevenLabsWidget
      defaultExpanded={defaultExpanded}
      onExpandedChange={handleExpandedChange}
      onInteraction={handleWidgetInteraction}
      style={widgetStyle}
      testId="global-elevenlabs-widget"
    />
  )
}
