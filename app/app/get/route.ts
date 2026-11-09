import { track } from '@vercel/analytics/server'
import { after, NextResponse, type NextRequest } from 'next/server'

import { PRISM_APP_STORE_URL } from '@/lib/prism-app'

// Every scan is a real request: never prerender or cache this.
export const dynamic = 'force-dynamic'

/**
 * Where the QR code on /app points. A QR that opens the App Store directly
 * leaves no trace, so the code opens this route instead: it counts the scan
 * as a Vercel Web Analytics event ("App QR Scanned") and sends the phone on
 * to the App Store. Nothing links here, and it is never indexed.
 */
export function GET(request: NextRequest) {
  after(async () => {
    try {
      await track('App QR Scanned', {}, { request })
    } catch {
      // Counting must never get in the way of the redirect.
    }
  })

  return NextResponse.redirect(PRISM_APP_STORE_URL, {
    status: 307,
    headers: {
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
