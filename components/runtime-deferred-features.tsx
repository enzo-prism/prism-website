'use client'

import ErrorTracker from '@/components/error-tracker'
import RootClientMonitors from '@/components/root-client-monitors'
import ScrollTracker from '@/components/scroll-tracker'
import SentryContextProvider from '@/components/sentry-context-provider'
import ToasterLazy from '@/components/toaster-lazy'

export default function RuntimeDeferredFeatures() {
  return (
    <>
      <RootClientMonitors />
      <SentryContextProvider>
        <ToasterLazy />
        <ErrorTracker />
        <ScrollTracker />
      </SentryContextProvider>
    </>
  )
}
