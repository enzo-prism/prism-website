'use client'

import { getWaitlistIntakeMonth } from '@/lib/waitlist'

/**
 * The live intake-month token ("October"). It renders from the visitor's own
 * clock so the month is always the true next month, even on statically
 * generated pages whose HTML was built weeks earlier.
 *
 * The server and the client intentionally render from different clocks here,
 * exactly like a timestamp, so hydration is allowed to disagree and the
 * client's value wins. Never replace this with a server-computed string on a
 * static route: the month would freeze at build time.
 */
export default function WaitlistIntakeMonth() {
  return (
    <span suppressHydrationWarning>{getWaitlistIntakeMonth().month}</span>
  )
}
