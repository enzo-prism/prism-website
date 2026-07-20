'use client'

import { useEffect } from 'react'

import {
  applyStoredEnhancedConversionUserData,
  clearStoredEnhancedConversionUserData,
  trackPurchase,
} from '@/utils/analytics'

/**
 * Shape of a Stripe Checkout Session id: `cs_live_` / `cs_test_` plus an
 * alphanumeric body.
 *
 * This is a sanity check, NOT proof of payment — only a server-side lookup of
 * the session (or a Stripe webhook) can prove that. It exists because the
 * value is attacker-supplied via the URL: without it, any visitor could load
 * `?session_id=1`, `?session_id=2`, … and mint an unlimited number of $300
 * purchase conversions, since each distinct string defeats the
 * de-duplication guard. See docs/analytics.md for the webhook upgrade path.
 */
const STRIPE_SESSION_ID_PATTERN = /^cs_(live|test)_[A-Za-z0-9]{10,}$/

type PurchaseSuccessTrackerProps = {
  /**
   * Stripe checkout session id from the Payment Link redirect. When absent or
   * malformed the tracker deliberately does nothing: the visitor did not
   * arrive through checkout, and firing here would invent revenue and poison
   * Ads bidding.
   */
  transactionId?: string
  value: number
  currency?: string
  itemId?: string
  itemName?: string
}

export default function PurchaseSuccessTracker({
  transactionId,
  value,
  currency = 'USD',
  itemId,
  itemName,
}: PurchaseSuccessTrackerProps) {
  useEffect(() => {
    if (!transactionId || !STRIPE_SESSION_ID_PATTERN.test(transactionId)) return

    // The buyer arrives here as a fresh document after the cross-origin Stripe
    // redirect, so the page-scoped user_data set at order time is gone.
    // Re-apply the stored hashes before the conversion so enhanced conversions
    // cover the purchase too. `set` applies to subsequent events, so this must
    // run first.
    applyStoredEnhancedConversionUserData()

    // trackPurchase is itself idempotent per transaction id, so a refresh or a
    // second tab cannot double-count.
    const reported = trackPurchase({
      transaction_id: transactionId,
      value,
      currency,
      item_id: itemId,
      item_name: itemName,
    })

    // Consume the hashes so a later, unrelated buyer on this browser cannot
    // inherit them.
    if (reported) clearStoredEnhancedConversionUserData()
  }, [transactionId, value, currency, itemId, itemName])

  return null
}
