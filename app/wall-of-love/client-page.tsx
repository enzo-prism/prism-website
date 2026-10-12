import { FinalCta } from '@/components/prism/final-cta'
import { ClientNotes } from '@/components/wall-of-love/client-notes'
import { CommunityWall } from '@/components/wall-of-love/community-wall'
import { WallOfLoveHero } from '@/components/wall-of-love/wall-of-love-hero'

/**
 * /wall-of-love body. Server-rendered end to end: the only client islands are
 * the waitlist and case study links, the stat count-ups, and the card
 * spotlights.
 *
 * Two clearly separated sources: named website clients, then comments people
 * left on Prism's own Instagram content, curated by lib/community-comments.ts.
 * Items flagged `requiresConsent` never render (see
 * components/wall-of-love/wall-of-love-feed.ts).
 */
export default function WallOfLoveClientPage() {
  return (
    <main id="main-content" tabIndex={-1} className="relative overflow-x-clip outline-none">
      <WallOfLoveHero />
      <ClientNotes />
      <CommunityWall />
      <FinalCta location="wall of love final cta" title="be the next note on this wall." />
    </main>
  )
}
