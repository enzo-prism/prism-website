'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

import ErrorTracker from '@/components/error-tracker'
import { usePublicElevenLabsWidgetWebGLEligibility } from '@/hooks/use-public-elevenlabs-widget-webgl'
import { usePublicElevenLabsWidgetViewportEligibility } from '@/hooks/use-public-elevenlabs-widget-viewport'
import { shouldRenderPublicElevenLabsWidget } from '@/lib/elevenlabs-widget'
import RootClientMonitors from '@/components/root-client-monitors'
import ScrollTracker from '@/components/scroll-tracker'
import SentryContextProvider from '@/components/sentry-context-provider'
import ToasterLazy from '@/components/toaster-lazy'

// The public ElevenLabs widget only renders on a couple of routes
// (lib/elevenlabs-widget.ts allowlist). Static imports here would bundle its
// code into the deferred-features chunk shipped on EVERY route, so both
// pieces are code-split and only fetched once a page actually mounts them.
const ElevenLabsWidgetScriptLazy = dynamic(
  () =>
    import('@/components/elevenlabs/ElevenLabsWidget').then(
      (mod) => mod.ElevenLabsWidgetScript,
    ),
  { ssr: false },
)
const GlobalElevenLabsWidgetLazy = dynamic(
  () => import('@/components/global-elevenlabs-widget'),
  { ssr: false },
)

export default function RuntimeDeferredFeatures() {
  const pathname = usePathname()
  const isWidgetViewportEligible =
    usePublicElevenLabsWidgetViewportEligibility()
  const shouldCheckPublicWidgetWebGL =
    shouldRenderPublicElevenLabsWidget(pathname) &&
    isWidgetViewportEligible === true
  const isWidgetWebGLEligible = usePublicElevenLabsWidgetWebGLEligibility(
    shouldCheckPublicWidgetWebGL,
  )
  const shouldMountPublicWidget =
    shouldCheckPublicWidgetWebGL && isWidgetWebGLEligible === true

  return (
    <>
      <RootClientMonitors />
      <SentryContextProvider>
        <ToasterLazy />
        <ErrorTracker />
        <ScrollTracker />
        <Suspense fallback={null}>
          {shouldMountPublicWidget ? (
            <>
              <ElevenLabsWidgetScriptLazy />
              <GlobalElevenLabsWidgetLazy />
            </>
          ) : null}
        </Suspense>
      </SentryContextProvider>
    </>
  )
}
