'use client';

import { useEffect } from 'react';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { RotateCcw } from 'lucide-react';

import './globals.css';

import { PrismMark } from '@/components/prism/prism-logo';
import { Button } from '@/components/ui/button';
import { captureErrorWithContext } from '@/utils/sentry-helpers';

/**
 * Root error boundary. It replaces the root layout, so it carries its own
 * <html>/<body>, stylesheet, and fonts, and stays dependency-light (no
 * navbar/footer) in case those are what failed.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Capture with enhanced context for better debugging
    captureErrorWithContext(error, {
      errorType: 'global_react_error',
      component: 'GlobalErrorBoundary',
      additionalData: {
        digest: error.digest,
        name: error.name,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
        url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      },
    });
  }, [error]);

  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="m-0 min-h-screen bg-background font-sans text-foreground antialiased">
        <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-0 opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_45%,oklch(0.66_0.16_258/14%),transparent_70%)] blur-2xl" />
          </div>

          <div className="flex max-w-xl flex-col items-center text-center">
            <a
              href="/"
              aria-label="Prism home"
              className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-black shadow-[0_8px_24px_-10px_oklch(1_0_0/25%)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <PrismMark className="size-7" />
            </a>
            <p className="text-eyebrow mt-8 text-subtle">Something broke</p>
            <h1 className="text-title text-gradient mt-4 max-w-[14ch] text-balance pb-1">
              the light bent the wrong way.
            </h1>
            <p className="text-lead mt-5 max-w-[44ch] text-pretty text-muted-foreground">
              Something unexpected happened on our side. The error has been logged and we will
              look into it. Try again, or head back home.
            </p>
            <div className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Button onClick={reset} size="xl">
                <RotateCcw aria-hidden="true" />
                Try again
              </Button>
              <Button asChild size="xl" variant="outline">
                <a href="/">Back to home</a>
              </Button>
            </div>
            {error.digest ? (
              <p className="mt-8 font-mono text-[11px] text-subtle">Reference: {error.digest}</p>
            ) : null}
          </div>
        </main>
      </body>
    </html>
  );
}
