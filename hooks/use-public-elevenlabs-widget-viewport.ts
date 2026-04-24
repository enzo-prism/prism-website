'use client'

import { useEffect, useState } from 'react'

import {
  PUBLIC_ELEVENLABS_WIDGET_MOBILE_MAX_WIDTH_PX,
  PUBLIC_ELEVENLABS_WIDGET_MOBILE_MEDIA_QUERY,
} from '@/lib/elevenlabs-widget'

function subscribeToViewportEligibility(
  onChange: (isViewportEligible: boolean) => void,
): () => void {
  if (typeof window === 'undefined') {
    return () => {}
  }

  if (typeof window.matchMedia === 'function') {
    const mediaQuery = window.matchMedia(
      PUBLIC_ELEVENLABS_WIDGET_MOBILE_MEDIA_QUERY,
    )
    const syncViewportEligibility = () => onChange(!mediaQuery.matches)

    syncViewportEligibility()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncViewportEligibility)

      return () => {
        mediaQuery.removeEventListener('change', syncViewportEligibility)
      }
    }

    if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(syncViewportEligibility)

      return () => {
        mediaQuery.removeListener(syncViewportEligibility)
      }
    }
  }

  const syncViewportEligibility = () => {
    onChange(window.innerWidth > PUBLIC_ELEVENLABS_WIDGET_MOBILE_MAX_WIDTH_PX)
  }

  syncViewportEligibility()
  window.addEventListener('resize', syncViewportEligibility)

  return () => {
    window.removeEventListener('resize', syncViewportEligibility)
  }
}

export function usePublicElevenLabsWidgetViewportEligibility(): boolean | null {
  const [isViewportEligible, setIsViewportEligible] = useState<boolean | null>(
    null,
  )

  useEffect(() => {
    return subscribeToViewportEligibility(setIsViewportEligible)
  }, [])

  return isViewportEligible
}
