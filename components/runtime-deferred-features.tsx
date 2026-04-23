'use client'

import { Suspense } from 'react'
import { usePathname } from 'next/navigation'

import { ElevenLabsWidgetScript } from '@/components/elevenlabs/ElevenLabsWidget'
import ErrorTracker from '@/components/error-tracker'
import GlobalElevenLabsWidget from '@/components/global-elevenlabs-widget'
import { shouldRenderPublicElevenLabsWidget } from '@/lib/elevenlabs-widget'
import RootClientMonitors from '@/components/root-client-monitors'
import ScrollTracker from '@/components/scroll-tracker'
import SentryContextProvider from '@/components/sentry-context-provider'
import ToasterLazy from '@/components/toaster-lazy'
import VercelAnalytics from '@/components/vercel-analytics'

export default function RuntimeDeferredFeatures() {
  const pathname = usePathname()
  const shouldMountPublicWidget =
    shouldRenderPublicElevenLabsWidget(pathname)

  return (
    <>
      <RootClientMonitors />
      <SentryContextProvider>
        <ToasterLazy />
        <ErrorTracker />
        <ScrollTracker />
        <Suspense fallback={null}>
          <VercelAnalytics />
          {shouldMountPublicWidget ? (
            <>
              <ElevenLabsWidgetScript />
              <GlobalElevenLabsWidget />
            </>
          ) : null}
        </Suspense>
      </SentryContextProvider>
    </>
  )
}
