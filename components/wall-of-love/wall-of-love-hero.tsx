import { Heart } from 'lucide-react'

import HomeCountUp from '@/components/home/HomeCountUp'
import { Marquee } from '@/components/prism/marquee'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import { CommentChip } from '@/components/wall-of-love/comment-chip'
import {
  clientNotes,
  communityComments,
  getMarqueeRows,
} from '@/components/wall-of-love/wall-of-love-feed'
import { SOCIAL_PROOF_VERIFIED_AT, SOCIAL_PROOF } from '@/lib/proof-metrics'

const socialStats = [
  SOCIAL_PROOF.instagram,
  SOCIAL_PROOF.tiktok,
  SOCIAL_PROOF.youtube,
] as const

const marqueeRows = getMarqueeRows(3, 12)
const marqueeDurations = [78, 92, 84]

export function WallOfLoveHero() {
  return (
    <section
      id="wall-of-love-hero"
      aria-labelledby="wall-of-love-title"
      className="relative isolate overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-20"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-x-0 top-0 -z-10 h-[56rem] opacity-60" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-12%] -z-10 h-[34rem] w-[64rem] max-w-[160vw] -translate-x-1/2 bg-[radial-gradient(38%_55%_at_30%_40%,color-mix(in_oklch,var(--spectrum-red)_22%,transparent),transparent_70%),radial-gradient(34%_50%_at_52%_30%,color-mix(in_oklch,var(--spectrum-violet)_24%,transparent),transparent_70%),radial-gradient(36%_55%_at_72%_45%,color-mix(in_oklch,var(--spectrum-blue)_22%,transparent),transparent_70%)] blur-2xl"
      />
      <div aria-hidden="true" className="bg-noise mask-fade-b absolute inset-0 -z-10 opacity-[0.05]" />

      <div className="prism-container flex flex-col items-center text-center">
        <p className="prism-rise inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2.5 pr-3.5 text-[13px] font-medium tracking-[-0.01em] text-muted-foreground shadow-[0_1px_0_0_oklch(1_0_0/6%)_inset] backdrop-blur-md">
          <span className="grid size-5 place-items-center rounded-full bg-white/[0.08]">
            <Heart aria-hidden="true" className="size-3 fill-current text-foreground" />
          </span>
          <span>
            <span className="text-foreground">{clientNotes.length}</span> client notes
          </span>
          <span aria-hidden="true" className="h-3.5 w-px bg-white/15" />
          <span>
            <span className="text-foreground">{communityComments.length}</span> community comments
          </span>
        </p>

        <h1
          id="wall-of-love-title"
          className="prism-rise text-display mt-8 max-w-[12ch] text-balance pb-2 [--rise-delay:80ms] max-sm:text-[3.25rem]"
        >
          <span className="text-gradient">wall of </span>
          <span className="text-spectrum prism-spectrum-pan">love.</span>
        </h1>

        <p className="prism-rise text-lead mt-6 max-w-[44ch] text-pretty text-muted-foreground [--rise-delay:160ms]">
          Two kinds of love live here: notes from the clients we build websites
          for, and comments from people who watch Prism&apos;s videos. Every
          word is theirs.
        </p>

        <div className="prism-rise mt-9 [--rise-delay:240ms]">
          <WaitlistButton location="wall of love hero" size="xl" />
        </div>

        <div className="prism-rise mt-14 w-full max-w-2xl [--rise-delay:320ms]">
          <dl
            aria-label="Prism audience by channel"
            className="grid grid-cols-3 divide-x divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.08] bg-card/70 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] backdrop-blur-md"
          >
            {socialStats.map((channel) => (
              <div key={channel.platform} className="flex flex-col items-center px-2 py-5 sm:px-6 sm:py-6">
                <dt className="text-eyebrow text-subtle">{channel.platform}</dt>
                <dd className="mt-3 text-[1.75rem] font-semibold leading-none tracking-[-0.04em] text-foreground sm:text-[2.5rem]">
                  <HomeCountUp value={channel.audience} />
                </dd>
                <dd className="mt-2 text-[13px] text-muted-foreground">
                  {channel.audienceLabel}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-subtle">
            Audience as of {SOCIAL_PROOF_VERIFIED_AT}. Channel totals, not
            deduplicated people.
          </p>
        </div>
      </div>

      <div
        role="region"
        aria-label="Short comments on Prism's Instagram posts"
        className="mt-16 flex flex-col gap-3 sm:mt-20"
      >
        {marqueeRows.map((row, index) => (
          <Marquee
            key={index}
            duration={marqueeDurations[index] ?? 80}
            reverse={index % 2 === 1}
            gap="0.75rem"
          >
            {row.map((comment) => (
              <CommentChip key={comment.key} comment={comment} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  )
}

export default WallOfLoveHero
