import type { CSSProperties } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Eye, Heart } from 'lucide-react'

import { AudienceStage } from '@/components/home/audience/AudienceStage'
import {
  AUDIENCE_CHANNELS,
  AUDIENCE_COMMENTS,
  AUDIENCE_RECEIPTS,
  METER_TICKS,
  type AudienceChannel,
  type AudienceComment,
  type AudienceReceipt,
} from '@/components/home/audience/audience-data'
import styles from '@/components/home/audience/audience.module.css'
import HomeCountUp from '@/components/home/HomeCountUp'
import { HOMEPAGE_AUDIENCE } from '@/components/home/homepage-content'
import { Reveal } from '@/components/prism/reveal'
import { Eyebrow, Section, SectionHeader } from '@/components/prism/section'
import TrackedLink from '@/components/tracked-link'
import { cn } from '@/lib/utils'

const TRACKING_LOCATION = 'homepage audience'

/**
 * Fan positions, in receipt order. The first reel sits in front: it is the
 * one the receipts headline is about. Drift timings pair each phone with its
 * chip so they float together. `px` / `vw` feed `sizes` for the cropped shot.
 */
const PHONE_LAYOUT = [
  {
    slot: styles.front,
    chip: styles.chipFront,
    drift: '9s',
    delay: '0s',
    pop: '0.35s',
    px: 250,
    vw: 42,
  },
  {
    slot: styles.left,
    chip: styles.chipLeft,
    drift: '11s',
    delay: '-4s',
    pop: '0.45s',
    px: 205,
    vw: 34,
  },
  {
    slot: styles.right,
    chip: styles.chipRight,
    drift: '10s',
    delay: '-7s',
    pop: '0.55s',
    px: 205,
    vw: 34,
  },
] as const

const COMMENT_LAYOUT = [
  { slot: styles.comment1, drift: '8s', delay: '-2s', pop: '0.6s' },
  { slot: styles.comment2, drift: '10s', delay: '-6s', pop: '0.7s' },
] as const

/**
 * Typographic glue, never a word change: keeps "1.6 million" and dates like
 * "June 27, 2024" from splitting across lines.
 */
function keepFiguresTogether(text: string) {
  return text
    .replace(/(\d) (thousand|million|billion)\b/g, '$1\u00a0$2')
    .replace(/\b([A-Z][a-z]+) (\d{1,2}), (\d{4})\b/g, '$1\u00a0$2,\u00a0$3')
}

function driftStyle(drift: string, delay: string) {
  return { '--drift': drift, '--drift-delay': delay } as CSSProperties
}

function popStyle(pop: string) {
  return { '--pop-delay': pop } as CSSProperties
}

/**
 * "we built our own audience from zero." Prism's own reach as proof: the
 * combined audience, one row per channel with a link out, two lifetime
 * highlights, and "the receipts": three Reel insights screens from Prism's
 * own Instagram with real comments from that account. Every number comes
 * from HOMEPAGE_AUDIENCE (lib/proof-metrics.ts) and the sources print below.
 */
export default function HomeAudience() {
  const { combined, highlights, receipts, note } = HOMEPAGE_AUDIENCE
  const comments = AUDIENCE_COMMENTS.slice(0, COMMENT_LAYOUT.length)

  return (
    <Section
      id="audience"
      aria-labelledby="home-audience-title"
      className="overflow-x-clip pb-16 pt-24 sm:pb-20 sm:pt-32"
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <Reveal className="lg:col-span-7">
          <SectionHeader
            id="home-audience-title"
            eyebrow={HOMEPAGE_AUDIENCE.eyebrow}
            title={HOMEPAGE_AUDIENCE.title}
            titleClassName="max-w-[13ch]"
          />
        </Reveal>
        <Reveal delay={80} className="lg:col-span-5 lg:pb-2">
          <p className="text-lead max-w-[44ch] text-pretty text-muted-foreground">
            {HOMEPAGE_AUDIENCE.description}
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-20 sm:mt-20 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={60} className="lg:col-span-5">
          <div className="md:flex md:items-end md:justify-between md:gap-10 lg:block">
            <p className="m-0">
              {/* Mask, not background-clip: the count-up paints on a child layer. */}
              <span className="inline-block [mask-image:linear-gradient(180deg,oklch(0_0_0)_35%,oklch(0_0_0/55%)_100%)]">
                <HomeCountUp
                  value={combined.value}
                  durationMs={1600}
                  className="text-[clamp(7.5rem,4rem+9vw,11.5rem)] font-semibold leading-[0.8] tracking-[-0.07em] text-foreground"
                />
              </span>
            </p>
            <p className="mt-5 max-w-[30ch] text-pretty text-[15px] leading-relaxed text-muted-foreground md:mb-1 md:max-w-[28ch] lg:mb-0 lg:max-w-[30ch]">
              {combined.label}
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/6%)_inset]">
            <ul className="divide-y divide-white/[0.07]">
              {AUDIENCE_CHANNELS.map((channel) => (
                <ChannelRow key={channel.platform} channel={channel} />
              ))}
            </ul>
            <dl className="grid grid-cols-2 border-t border-white/[0.07]">
              {highlights.map((highlight, index) => (
                <div
                  key={highlight.label}
                  className={cn(
                    'flex flex-col-reverse justify-end gap-2 px-5 py-5 sm:px-7 sm:py-6',
                    index > 0 && 'border-l border-white/[0.07]',
                  )}
                >
                  <dt className="text-pretty text-[13px] leading-snug text-muted-foreground">
                    {highlight.label}
                  </dt>
                  <dd className="m-0">
                    <HomeCountUp
                      value={highlight.value}
                      className="text-[clamp(1.75rem,1.3rem+1.4vw,2.25rem)] font-semibold leading-none tracking-[-0.05em] text-foreground"
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={140} className="lg:col-span-7">
          <div className="flex flex-col gap-3 lg:pl-6">
            <Eyebrow>{receipts.eyebrow}</Eyebrow>
            <h3 className="max-w-[20ch] text-balance text-[clamp(1.5rem,1.1rem+1.3vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
              {keepFiguresTogether(receipts.title)}
            </h3>
          </div>

          <AudienceStage className={cn(styles.rig, 'mt-8 sm:mt-10')}>
            <div className={styles.stage}>
              <div aria-hidden="true" className={cn(styles.grid, 'bg-grid')} />
              <div aria-hidden="true" className={styles.glow} />
              <div aria-hidden="true" className={styles.floor} />
              <ul className={styles.list}>
                {AUDIENCE_RECEIPTS.map((receipt, index) => (
                  <ReceiptPhone
                    key={receipt.id}
                    receipt={receipt}
                    layout={PHONE_LAYOUT[index % PHONE_LAYOUT.length]}
                  />
                ))}
              </ul>
            </div>

            <ul className={cn(styles.list, styles.chips)}>
              {AUDIENCE_RECEIPTS.map((receipt, index) => (
                <ReceiptChip
                  key={receipt.id}
                  receipt={receipt}
                  layout={PHONE_LAYOUT[index % PHONE_LAYOUT.length]}
                />
              ))}
            </ul>

            {comments.length > 0 ? (
              <ul className={cn(styles.list, styles.comments)}>
                {comments.map((comment, index) => (
                  <CommentBubble
                    key={comment.key}
                    comment={comment}
                    layout={COMMENT_LAYOUT[index]}
                  />
                ))}
              </ul>
            ) : null}
          </AudienceStage>
        </Reveal>
      </div>

      <p className="mt-12 max-w-3xl text-pretty text-[12px] leading-relaxed text-subtle sm:mt-14">
        {note}
      </p>
    </Section>
  )
}

function ChannelRow({ channel }: { channel: AudienceChannel }) {
  return (
    <li>
      <TrackedLink
        href={channel.url}
        label={`${channel.platform} profile`}
        location={TRACKING_LOCATION}
        target="_blank"
        rel="noopener noreferrer"
        className="group/channel grid min-h-[5.5rem] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 transition-colors duration-200 hover:bg-white/[0.025] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50 sm:gap-5 sm:px-7"
      >
        <span
          aria-hidden="true"
          className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] shadow-[0_1px_0_0_oklch(1_0_0/6%)_inset]"
        >
          {channel.mark ? (
            <Image
              src={channel.mark.src}
              alt=""
              width={channel.mark.width}
              height={channel.mark.height}
              unoptimized
              className="h-5 w-auto"
            />
          ) : null}
        </span>

        <span className="min-w-0">
          <span className="block text-[15px] font-medium leading-tight text-foreground">
            {channel.platform}
          </span>
          <span
            aria-hidden="true"
            className="mt-2.5 grid max-w-44 grid-flow-col gap-[3px]"
          >
            {Array.from({ length: METER_TICKS }, (_, tick) => (
              <span
                key={tick}
                className={cn(
                  'h-2.5 rounded-full',
                  tick < channel.litTicks ? 'bg-foreground/75' : 'bg-white/10',
                )}
              />
            ))}
          </span>
        </span>

        <span className="flex items-center gap-3 sm:gap-4">
          <span className="text-right">
            <HomeCountUp
              value={channel.audience}
              className="text-[clamp(1.85rem,1.4rem+1.5vw,2.6rem)] font-semibold leading-none tracking-[-0.05em] text-foreground"
            />
            <span className="mt-1.5 block text-[12px] leading-none text-subtle">
              {channel.audienceLabel}
            </span>
          </span>
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1.75}
            className="size-4 shrink-0 text-subtle transition-[color,transform] duration-200 group-hover/channel:-translate-y-0.5 group-hover/channel:translate-x-0.5 group-hover/channel:text-foreground"
          />
        </span>
        <span className="sr-only">(opens in a new tab)</span>
      </TrackedLink>
    </li>
  )
}

function ReceiptPhone({
  receipt,
  layout,
}: {
  receipt: AudienceReceipt
  layout: (typeof PHONE_LAYOUT)[number]
}) {
  const { crop, scale, reachMark } = receipt

  return (
    <li className={cn(styles.slot, layout.slot)}>
      <div className={styles.fan}>
        <div
          className={styles.drift}
          style={driftStyle(layout.drift, layout.delay)}
        >
          <div
            className={styles.phone}
            style={{ aspectRatio: `${crop.w} / ${crop.h}` }}
          >
            <Image
              src={receipt.image}
              alt={`Instagram Reel insights showing ${receipt.views} views`}
              width={receipt.width}
              height={receipt.height}
              quality={90}
              sizes={`(min-width: 640px) ${Math.round(layout.px * scale)}px, ${Math.round(layout.vw * scale)}vw`}
              className={styles.shot}
              style={{
                width: `${scale * 100}%`,
                left: `${(-crop.x / crop.w) * 100}%`,
                top: `${(-crop.y / crop.h) * 100}%`,
              }}
            />
            {reachMark && layout.slot === styles.front ? (
              <span
                aria-hidden="true"
                className={styles.mark}
                style={
                  {
                    '--mark-x': `${reachMark.x}%`,
                    '--mark-y': `${reachMark.y}%`,
                    '--mark-w': `${reachMark.w}%`,
                    '--mark-h': `${reachMark.h}%`,
                  } as CSSProperties
                }
              />
            ) : null}
          </div>
        </div>
      </div>
    </li>
  )
}

function ReceiptChip({
  receipt,
  layout,
}: {
  receipt: AudienceReceipt
  layout: (typeof PHONE_LAYOUT)[number]
}) {
  return (
    <li className={cn(styles.chip, layout.chip)}>
      <div className={styles.fan} style={popStyle(layout.pop)}>
        <div
          className={styles.drift}
          style={driftStyle(layout.drift, layout.delay)}
        >
          <p className={cn(styles.chipCard, 'm-0')}>
            <span className="flex items-center gap-2">
              <Eye
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-4 shrink-0 text-subtle"
              />
              <HomeCountUp
                value={receipt.views}
                className="text-[clamp(1.6rem,1.2rem+2.4cqw,2.15rem)] font-semibold leading-none tracking-[-0.05em] text-foreground"
              />
            </span>
            <span
              className={cn(
                styles.chipLabel,
                'block text-pretty text-[12px] leading-snug text-muted-foreground',
              )}
            >
              {keepFiguresTogether(receipt.label)}
            </span>
          </p>
        </div>
      </div>
    </li>
  )
}

function CommentBubble({
  comment,
  layout,
}: {
  comment: AudienceComment
  layout: (typeof COMMENT_LAYOUT)[number]
}) {
  return (
    <li className={cn(styles.comment, layout.slot)}>
      <div className={styles.fan} style={popStyle(layout.pop)}>
        <div
          className={styles.drift}
          style={driftStyle(layout.drift, layout.delay)}
        >
          <figure
            className={cn(
              styles.glass,
              'm-0 grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-3 gap-y-1 p-3 pr-3.5',
            )}
          >
            <figcaption className="col-start-2 row-start-1 truncate text-[12px] leading-tight">
              <span className="font-semibold text-foreground">
                {comment.handle}
              </span>{' '}
              <span className="text-subtle">on Instagram</span>
            </figcaption>
            <span
              aria-hidden="true"
              className="col-start-1 row-span-2 row-start-1 grid size-8 place-items-center rounded-full bg-white/[0.07] text-[12px] font-semibold text-foreground ring-1 ring-white/10"
            >
              {comment.monogram}
            </span>
            <blockquote className="col-start-2 row-start-2 m-0 text-pretty text-[13.5px] leading-snug text-foreground/90">
              <p className="m-0">{comment.text}</p>
            </blockquote>
            <Heart
              aria-hidden="true"
              strokeWidth={1.75}
              className="col-start-3 row-start-1 mt-px size-3.5 text-subtle"
            />
          </figure>
        </div>
      </div>
    </li>
  )
}
