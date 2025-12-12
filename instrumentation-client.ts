import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://68c104f36835243619e583be41896f33@o4508365743325184.ingest.us.sentry.io/4509559921049600",
  
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

// Export the required router transition hook to eliminate build warnings
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
