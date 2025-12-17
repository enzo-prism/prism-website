'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { captureErrorWithContext } from '@/utils/sentry-helpers';
import { Button } from '@/components/ui/button';

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
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Something went wrong!
            </h1>
            <p className="text-muted-foreground mb-8">
              We're sorry, but something unexpected happened. The error has been logged and we'll look into it.
            </p>
            <Button onClick={reset} size="lg">
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
