import {
  formatSocialHandle,
  isClientQuote,
  quotesData,
  type Quote,
} from '@/content/wall-of-love-data'
import { isCuratedComment } from '@/lib/community-comments'

export type CommunityComment = {
  id: number
  text: string
  handle: string
}

/**
 * Instagram comments reacting to Prism's own content, picked by id from
 * content/wall-of-love-data.tsx. These are community comments, never client
 * reviews: named website clients and anything flagged requiresConsent are
 * always dropped, and every pick must pass the shared curation rules in
 * lib/community-comments.ts (the same rules /wall-of-love uses), so an
 * off-brand or low-signal id silently drops out instead of rendering.
 */
export function getCommunityComments(
  ids: readonly number[],
): CommunityComment[] {
  return ids.flatMap((id) => {
    const quote = quotesData.find((item) => item.id === id)
    if (!quote || quote.requiresConsent || isClientQuote(quote)) return []
    const handle = formatSocialHandle(quote.client)
    if (!isCuratedComment(quote.text, handle)) return []
    return [{ id: quote.id, text: quote.text, handle }]
  })
}

/** Named website-client quotes (verbatim), picked by id. */
export function getClientQuotes(ids: readonly number[]): Quote[] {
  return ids.flatMap((id) => {
    const quote = quotesData.find((item) => item.id === id)
    if (!quote || quote.requiresConsent || !isClientQuote(quote)) return []
    return [quote]
  })
}
