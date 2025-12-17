"use client"

type SentryModule = typeof import("@sentry/nextjs")

const DEFAULT_SENTRY_DSN =
  "https://68c104f36835243619e583be41896f33@o4508365743325184.ingest.us.sentry.io/4509559921049600"

let loadedModule: SentryModule | null = null
let loadPromise: Promise<SentryModule | null> | null = null
let initPromise: Promise<SentryModule | null> | null = null
let initialized = false

export function getSentryModule(): SentryModule | null {
  return loadedModule
}

export function isSentryInitialized(): boolean {
  return initialized
}

async function loadSentryModule(): Promise<SentryModule | null> {
  if (loadedModule) return loadedModule
  if (loadPromise) return loadPromise

  loadPromise = import("@sentry/nextjs")
    .then((mod) => {
      loadedModule = mod
      return mod
    })
    .catch(() => null)

  return loadPromise
}

export async function initSentryClient(): Promise<SentryModule | null> {
  if (initialized) return loadedModule
  if (initPromise) return initPromise

  initPromise = loadSentryModule().then((Sentry) => {
    if (!Sentry) return null

    if (!initialized) {
      try {
        Sentry.init({
          dsn: DEFAULT_SENTRY_DSN,
          tracesSampleRate: 1,
          debug: false,
        })
      } catch {
        return null
      }

      initialized = true
    }

    return Sentry
  })

  return initPromise
}

export function scheduleSentryInit() {
  if (typeof window === "undefined") return
  if (initialized || initPromise) return

  const schedule =
    "requestIdleCallback" in window
      ? (cb: () => void) => (window as any).requestIdleCallback(cb, { timeout: 2500 })
      : (cb: () => void) => window.setTimeout(cb, 1500)

  schedule(() => {
    void initSentryClient()
  })
}

