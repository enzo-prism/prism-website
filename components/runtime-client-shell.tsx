"use client"

import { Suspense } from "react"

import AnalyticsProvider from "@/components/analytics-provider"
import { ElevenLabsWidgetScript } from "@/components/elevenlabs/ElevenLabsWidget"
import GlobalElevenLabsWidget from "@/components/global-elevenlabs-widget"
import RootClientMonitors from "@/components/root-client-monitors"
import ToasterLazy from "@/components/toaster-lazy"
import SentryContextProvider from "@/components/sentry-context-provider"

export default function RuntimeClientShell() {
  return (
    <>
      <RootClientMonitors />
      <SentryContextProvider>
        <ToasterLazy />
        <Suspense fallback={null}>
          <AnalyticsProvider />
          <ElevenLabsWidgetScript />
          <GlobalElevenLabsWidget />
        </Suspense>
      </SentryContextProvider>
    </>
  )
}
