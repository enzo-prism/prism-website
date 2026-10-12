import type { ReactNode } from 'react'
import { MessageCircle } from 'lucide-react'

import BrandLogo, { type BrandLogoKey } from '@/components/brand-logo'
import { getCommunityComments } from '@/components/services/community-comments'
import { PROOF_METRICS_VERIFIED_AT, SOCIAL_PROOF } from '@/lib/proof-metrics'
import { cn } from '@/lib/utils'

// Instagram comments on Prism's own videos (community, not clients).
const HERO_COMMENT_IDS = [30, 15, 42, 32] as const

type ChannelCardProps = {
  brand: BrandLogoKey
  platform: string
  primary: { value: string; label: string }
  secondary: { value: string; label: string }
  glowClassName: string
  className?: string
  large?: boolean
  note?: ReactNode
}

function ChannelCard({
  brand,
  platform,
  primary,
  secondary,
  glowClassName,
  className,
  large = false,
  note,
}: ChannelCardProps) {
  return (
    <div
      className={cn(
        'relative isolate flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-background/60 p-5 sm:p-6',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'absolute -right-10 -top-10 -z-10 size-40 rounded-full blur-3xl',
          glowClassName,
        )}
      />
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
          <BrandLogo brand={brand} theme="dark" decorative className="size-4" />
        </span>
        <span className="text-sm font-medium text-foreground">{platform}</span>
      </div>
      {large ? (
        <dl className="mt-auto grid grid-cols-2 gap-4 pt-8">
          {[primary, secondary].map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'flex flex-col-reverse',
                index === 1 && 'border-l border-white/[0.08] pl-4',
              )}
            >
              <dt className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="text-[clamp(2.5rem,1.9rem+2.2vw,3.75rem)] font-semibold leading-none tracking-[-0.05em] text-foreground tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <>
          <p className="mt-auto pt-8 text-[2.5rem] font-semibold leading-none tracking-[-0.05em] text-foreground tabular-nums">
            {primary.value}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{primary.label}</p>
          <div className="mt-5 flex items-baseline gap-2 border-t border-white/[0.08] pt-4">
            <span className="text-lg font-semibold tracking-[-0.03em] text-foreground tabular-nums">
              {secondary.value}
            </span>
            <span className="text-sm text-muted-foreground">
              {secondary.label}
            </span>
          </div>
        </>
      )}
      {note ? (
        <p className="mt-3 text-[11px] leading-5 text-subtle">{note}</p>
      ) : null}
    </div>
  )
}

/**
 * /content hero: Prism's own channel numbers as a creator dashboard, with a
 * few community comments on Prism videos. Every number is SOCIAL_PROOF from
 * lib/proof-metrics.ts with its date and caveats printed under the panel.
 */
export function ContentHeroVisual() {
  const comments = getCommunityComments(HERO_COMMENT_IDS)
  const { youtube, instagram, tiktok } = SOCIAL_PROOF

  return (
    <figure className="relative mx-auto max-w-5xl">
      <div
        aria-hidden="true"
        className="absolute inset-x-[8%] top-[10%] -z-10 h-[80%] rounded-full bg-[radial-gradient(closest-side,oklch(0.66_0.21_29/22%),oklch(0.75_0.17_55/10%)_55%,transparent)] blur-2xl"
      />
      <div className="rounded-[2rem] border border-white/[0.08] bg-card/85 p-2.5 shadow-[0_50px_120px_-40px_oklch(0_0_0/95%),0_1px_0_0_oklch(1_0_0/6%)_inset] backdrop-blur-md sm:p-3">
        <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-3 pt-2 sm:px-4">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
            </span>
            <span className="ml-1 text-sm font-medium text-foreground">
              Prism channels
            </span>
            <span className="hidden font-mono text-[11px] text-subtle sm:inline">
              @the_design_prism
            </span>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-muted-foreground">
            As of {PROOF_METRICS_VERIFIED_AT}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-12">
          <ChannelCard
            brand="youtube"
            platform={youtube.platform}
            primary={{ value: youtube.audience, label: youtube.audienceLabel }}
            secondary={{
              value: youtube.activity,
              label: youtube.activityLabel,
            }}
            glowClassName="bg-spectrum-red/25"
            large
            className="col-span-2 lg:col-span-5"
            note="Lifetime views include legacy gaming content."
          />
          <ChannelCard
            brand="instagram"
            platform={instagram.platform}
            primary={{
              value: instagram.audience,
              label: instagram.audienceLabel,
            }}
            secondary={{
              value: instagram.activity,
              label: instagram.activityLabel,
            }}
            glowClassName="bg-spectrum-violet/25"
            className="col-span-1 lg:col-span-3"
          />
          <ChannelCard
            brand="tiktok"
            platform={tiktok.platform}
            primary={{ value: tiktok.audience, label: tiktok.audienceLabel }}
            secondary={{ value: tiktok.activity, label: tiktok.activityLabel }}
            glowClassName="bg-spectrum-blue/25"
            className="col-span-1 lg:col-span-3 lg:col-start-6 lg:row-start-2"
          />

          <div className="relative isolate col-span-2 flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-background/60 p-5 sm:p-6 lg:col-span-5 lg:col-start-1 lg:row-start-2">
            <div
              aria-hidden="true"
              className="absolute -bottom-16 -left-10 -z-10 size-48 rounded-full bg-spectrum-orange/15 blur-3xl"
            />
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex -space-x-1.5">
                {(['youtube', 'instagram', 'tiktok'] as const).map((brand) => (
                  <span
                    key={brand}
                    className="grid size-8 place-items-center rounded-full border border-white/10 bg-popover"
                  >
                    <BrandLogo
                      brand={brand}
                      theme="dark"
                      decorative
                      className="size-4"
                    />
                  </span>
                ))}
              </span>
              <span className="text-sm font-medium text-foreground">
                Combined audience
              </span>
            </div>
            <p className="mt-auto pt-8 text-[2.5rem] font-semibold leading-none tracking-[-0.05em] text-foreground tabular-nums">
              {SOCIAL_PROOF.combinedAudience}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              followers and subscribers
            </p>
            <p className="mt-3 text-[11px] leading-5 text-subtle">
              {SOCIAL_PROOF.combinedAudienceMethodology}
            </p>
          </div>

          <div className="col-span-2 flex flex-col gap-2.5 rounded-2xl border border-white/[0.08] bg-background/60 p-4 sm:p-5 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1">
            <p className="flex items-center gap-2 text-sm font-medium text-foreground">
              <MessageCircle
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
              Comments on Prism videos
            </p>
            <ul className="flex flex-col gap-2.5">
              {comments.map((comment, index) => (
                <li
                  key={comment.id}
                  className={cn(
                    'rounded-xl border border-white/[0.08] bg-popover/90 p-3.5 text-left shadow-[0_16px_40px_-24px_oklch(0_0_0/90%)]',
                    index % 2 === 1 && 'lg:ml-4',
                  )}
                >
                  <p className="text-[13px] leading-snug text-foreground/90">
                    &ldquo;{comment.text}&rdquo;
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 font-mono text-[10px] text-subtle">
                    <BrandLogo
                      brand="instagram"
                      decorative
                      className="size-3"
                    />
                    {comment.handle} · Instagram
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-1 text-[11px] leading-5 text-subtle">
              Community comments on Prism&apos;s own posts, not client reviews.
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mx-auto mt-5 max-w-3xl text-pretty text-center text-xs leading-5 text-subtle">
        Prism&apos;s own channels, verified {PROOF_METRICS_VERIFIED_AT}. Not
        client campaign results. YouTube totals include legacy gaming content
        and every public, private, unlisted, and deleted video. Followers and
        subscribers are counted per channel, not as unique people.
      </figcaption>
    </figure>
  )
}

export default ContentHeroVisual
