'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

import ElevenLabsWidget from '@/components/elevenlabs/ElevenLabsWidget'
import { publishPrismWidgetExpandedState } from '@/lib/elevenlabs'
import { isPublicElevenLabsWidgetEnabled } from '@/lib/elevenlabs-widget'

const GLOBAL_ELEVENLABS_WIDGET_Z_INDEX = 2147483000
const PRISM_WIDGET_ENTRY_ROUTE_KEY = 'prism-elevenlabs-entry-route'
const PRISM_WIDGET_PREFERENCE_KEY = 'prism-elevenlabs-widget-preference'
const USER_INTERACTION_PERSISTENCE_WINDOW_MS = 1500

type PrismWidgetEntryRoute = 'home' | 'inner'
type PrismWidgetPreference = 'collapsed' | 'expanded'

function shouldMountGlobalWidget(pathname: string): boolean {
  return pathname !== '/'
}

function getEntryRouteFromPathname(pathname: string): PrismWidgetEntryRoute {
  return pathname === '/' ? 'home' : 'inner'
}

function readStorageValue(
  storage: Storage,
  key: string,
): string | null {
  try {
    return storage.getItem(key)
  } catch {
    return null
  }
}

function writeStorageValue(
  storage: Storage,
  key: string,
  value: string,
): void {
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

function ensureSessionEntryRoute(pathname: string): PrismWidgetEntryRoute | null {
  if (typeof window === 'undefined') {
    return null
  }

  const storedEntryRoute = readStorageValue(
    window.sessionStorage,
    PRISM_WIDGET_ENTRY_ROUTE_KEY,
  )

  if (storedEntryRoute === 'home' || storedEntryRoute === 'inner') {
    return storedEntryRoute
  }

  const nextEntryRoute = getEntryRouteFromPathname(pathname)

  writeStorageValue(
    window.sessionStorage,
    PRISM_WIDGET_ENTRY_ROUTE_KEY,
    nextEntryRoute,
  )

  return nextEntryRoute
}

function resolveDefaultExpandedState(pathname: string): boolean {
  const storedPreference = readWidgetPreference()

  if (storedPreference) {
    return storedPreference === 'expanded'
  }

  return ensureSessionEntryRoute(pathname) === 'home'
}

export default function GlobalElevenLabsWidget() {
  const pathname = usePathname()
  const [defaultExpanded, setDefaultExpanded] = useState<boolean | null>(null)
  const lastInteractionTimestampRef = useRef<number | null>(null)
  const shouldMountWidget =
    isPublicElevenLabsWidgetEnabled() && shouldMountGlobalWidget(pathname)
  const widgetStyle = useMemo(
    () => ({
      zIndex: String(GLOBAL_ELEVENLABS_WIDGET_Z_INDEX),
    }),
    [],
  )

  useEffect(() => {
    if (!isPublicElevenLabsWidgetEnabled()) {
      setDefaultExpanded(null)
      publishPrismWidgetExpandedState(false)
      return
    }

    ensureSessionEntryRoute(pathname)

    if (!shouldMountGlobalWidget(pathname)) {
      setDefaultExpanded(null)
      publishPrismWidgetExpandedState(false)
      return
    }

    setDefaultExpanded(resolveDefaultExpandedState(pathname))
  }, [pathname])

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

  if (!shouldMountWidget || defaultExpanded === null) {
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
