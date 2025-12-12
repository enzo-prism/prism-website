const dsn =
  process.env.SENTRY_DSN ||
  process.env.NEXT_PUBLIC_SENTRY_DSN ||
  (process.env.VERCEL === "1"
    ? "https://68c104f36835243619e583be41896f33@o4508365743325184.ingest.us.sentry.io/4509559921049600"
    : undefined)

if (dsn) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Sentry = require("@sentry/nextjs")
  Sentry.init({
    dsn,
    tracesSampleRate: 1,
    debug: false,
  })
}

export {}
