'use client'

import { useEffect, useState } from 'react'

import { canCreatePublicElevenLabsWidgetWebGLContext } from '@/lib/elevenlabs-widget'

export function usePublicElevenLabsWidgetWebGLEligibility(
  enabled = true,
): boolean | null {
  const [isWebGLEligible, setIsWebGLEligible] = useState<boolean | null>(null)

  useEffect(() => {
    if (!enabled) {
      setIsWebGLEligible(null)
      return
    }

    setIsWebGLEligible(canCreatePublicElevenLabsWidgetWebGLContext())
  }, [enabled])

  return isWebGLEligible
}
