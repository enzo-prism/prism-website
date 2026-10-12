import { HOMEPAGE_AUDIENCE } from '@/components/home/homepage-content'
import { formatSocialHandle, quotesData } from '@/content/wall-of-love-data'
import { isCuratedComment } from '@/lib/community-comments'

/*
 * Data for the homepage #audience section. Server only.
 *
 * Every number comes from HOMEPAGE_AUDIENCE (lib/proof-metrics.ts). This file
 * only derives presentation data from it: platform marks, the share meters,
 * the phone crops for the Reel insights screenshots, and the community
 * comments, which are read verbatim from content/wall-of-love-data.tsx.
 */

type PlatformMark = { src: string; width: number; height: number }

/** Local brand marks (public/logos/svgl). Missing platforms render no mark. */
const PLATFORM_MARKS: Readonly<Record<string, PlatformMark>> = {
  YouTube: { src: '/logos/svgl/youtube.svg', width: 256, height: 180 },
  Instagram: { src: '/logos/svgl/instagram.svg', width: 264, height: 264 },
  TikTok: { src: '/logos/svgl/tiktok-dark.svg', width: 352, height: 399 },
}

/** "24.7K" -> 24700, "1.6M" -> 1600000. Non-numeric values return 0. */
function parseCompactCount(value: string): number {
  const match = value.replace(/,/g, '').match(/(\d+(?:\.\d+)?)\s*([KkMm])?/)
  if (!match) return 0
  const base = Number(match[1])
  const suffix = match[2]?.toUpperCase()
  if (suffix === 'M') return base * 1_000_000
  if (suffix === 'K') return base * 1_000
  return base
}

/** Ticks in each channel's share meter. */
export const METER_TICKS = 30

const channelTotal = HOMEPAGE_AUDIENCE.channels.reduce(
  (sum, channel) => sum + parseCompactCount(channel.audience),
  0,
)

export type AudienceChannel = (typeof HOMEPAGE_AUDIENCE.channels)[number] & {
  mark: PlatformMark | null
  /** Lit ticks: this channel's share of the summed channel audience. */
  litTicks: number
}

export const AUDIENCE_CHANNELS: AudienceChannel[] =
  HOMEPAGE_AUDIENCE.channels.map((channel) => ({
    ...channel,
    mark: PLATFORM_MARKS[channel.platform] ?? null,
    litTicks:
      channelTotal > 0
        ? Math.max(
            1,
            Math.round(
              (parseCompactCount(channel.audience) / channelTotal) *
                METER_TICKS,
            ),
          )
        : 0,
  }))

/*
 * The Reel insights PNGs carry a phone frame with transparent (or black)
 * padding around it. These boxes are the phone's pixel bounds inside each
 * file, so every phone renders at the same size with clean rounded corners.
 * A screenshot without an entry renders uncropped.
 */
const PHONE_CROPS: Readonly<
  Record<string, { x: number; y: number; w: number; h: number }>
> = {
  '/growth/instagram-hormozi.png': { x: 24, y: 18, w: 438, h: 905 },
  '/growth/instagram-nvidia-stanford.png': { x: 34, y: 31, w: 438, h: 904 },
  '/growth/instagram-stats-6.png': { x: 278, y: 44, w: 437, h: 904 },
}

/*
 * Pixel bounds of the "accounts reached" figure at the foot of a Reel
 * insights screen, for the telestrator mark on the front phone. Only the
 * reel the receipts headline is about carries one.
 */
const REACH_FIGURES: Readonly<
  Record<string, { x0: number; y0: number; x1: number; y1: number }>
> = {
  '/growth/instagram-hormozi.png': { x0: 184, y0: 822, x1: 300, y1: 858 },
}

type Box = { x: number; y: number; w: number; h: number }

export type AudienceReceipt =
  (typeof HOMEPAGE_AUDIENCE.receipts.items)[number] & {
    crop: Box
    /** Rendered image width relative to the phone box (>= 1). */
    scale: number
    /** Reach figure as percentages of the phone box, padded into a pill. */
    reachMark: Box | null
  }

function toReachMark(image: string, crop: Box): Box | null {
  const figure = REACH_FIGURES[image]
  if (!figure) return null
  const padX = 0.045 * crop.w
  const padY = 0.012 * crop.h
  const pct = (value: number, total: number) =>
    Math.round((value / total) * 1000) / 10
  return {
    x: pct(figure.x0 - crop.x - padX, crop.w),
    y: pct(figure.y0 - crop.y - padY, crop.h),
    w: pct(figure.x1 - figure.x0 + padX * 2, crop.w),
    h: pct(figure.y1 - figure.y0 + padY * 2, crop.h),
  }
}

export const AUDIENCE_RECEIPTS: AudienceReceipt[] =
  HOMEPAGE_AUDIENCE.receipts.items.map((item) => {
    const crop = PHONE_CROPS[item.image] ?? {
      x: 0,
      y: 0,
      w: item.width,
      h: item.height,
    }
    return {
      ...item,
      crop,
      scale: item.width / crop.w,
      reachMark: toReachMark(item.image, crop),
    }
  })

/*
 * Real comments left on Prism's own Instagram Reels: one about the craft, one
 * about the reach. Text renders verbatim; a pick that is consent-gated
 * or fails the shared curation policy (lib/community-comments.ts) drops out.
 */
const COMMENT_HANDLES = ['relevique', 'zirbmaa'] as const

export type AudienceComment = {
  key: string
  handle: string
  monogram: string
  text: string
}

export const AUDIENCE_COMMENTS: AudienceComment[] = COMMENT_HANDLES.flatMap(
  (handle) => {
    const quote = quotesData.find(
      (entry) => entry.client === handle && !entry.requiresConsent,
    )
    if (!quote || !isCuratedComment(quote.text, quote.client)) return []
    const display = formatSocialHandle(quote.client)
    return [
      {
        key: `quote-${quote.id}`,
        handle: display,
        monogram: (display.match(/[\p{L}\p{N}]/u)?.[0] ?? '@').toUpperCase(),
        text: quote.text,
      },
    ]
  },
)
