'use client'

import { useSyncExternalStore } from 'react'

import { getWaitlistIntakeMonth } from '@/lib/waitlist'

const subscribe = () => () => {}

/**
 * The live intake-month token ("October"). It renders from the visitor's own
 * clock so the month is always the true next month, even on statically
 * generated pages whose HTML was built weeks earlier.
 *
 * Hydration keeps the server's text (the build-time month), and React does
 * not patch a text node when only `suppressHydrationWarning` silences the
 * mismatch. So the span is keyed on hydration: the server/hydration pass
 * renders under one key, and the first client pass remounts it under
 * another, writing the visitor's month into a fresh node. Never replace this
 * with a server-computed string on a static route: the month would freeze at
 * build time.
 */
export default function WaitlistIntakeMonth() {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )

  return (
    <span key={hydrated ? 'client' : 'server'} suppressHydrationWarning>
      {getWaitlistIntakeMonth().month}
    </span>
  )
}
