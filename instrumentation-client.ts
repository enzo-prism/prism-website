import { initSentryClient, scheduleSentryInit } from "@/utils/sentry-client"

scheduleSentryInit()

export function onRouterTransitionStart(...args: any[]) {
  void initSentryClient().then((Sentry) => {
    if (!Sentry?.captureRouterTransitionStart) return
    ;(Sentry.captureRouterTransitionStart as any)(...args)
  })
}
