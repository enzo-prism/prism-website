"use client"

/**
 * Curated Sentry surface for the browser bundle.
 *
 * `utils/sentry-client.ts` used to lazy-import the entire `@sentry/nextjs`
 * namespace, which retains every SDK export in the client chunk — including
 * Session Replay and Feedback code this site never enables (~532KB
 * uncompressed at last measure). Re-exporting only the APIs the app actually
 * calls lets the bundler tree-shake the rest.
 *
 * If you need another Sentry API, add it here — do not import
 * `@sentry/nextjs` directly in client code.
 */
export {
  addBreadcrumb,
  captureException,
  captureMessage,
  captureRouterTransitionStart,
  flush,
  init,
  setContext,
  setMeasurement,
  setTag,
  setUser,
  startSpan,
  withScope,
} from "@sentry/nextjs"
