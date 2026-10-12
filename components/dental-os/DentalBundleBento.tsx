import type { JSX } from 'react'
import {
  Check,
  Globe,
  MapPin,
  Megaphone,
  MessageSquareHeart,
  Navigation,
  Phone,
  Search,
  Sparkles,
  Star,
  type LucideIcon,
} from 'lucide-react'

import { OfferIconTile } from '@/components/pricing/offer-kit'
import BrowserFrame from '@/components/prism/browser-frame'
import { Reveal } from '@/components/prism/reveal'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { cn } from '@/lib/utils'

export type DentalBundleItem = {
  key: 'website' | 'search' | 'maps' | 'reviews' | 'ads'
  name: string
  /** Card title (lowercase, sentence style). Falls back to `name`. */
  title?: string
  outcome: string
}

const ICONS: Record<DentalBundleItem['key'], LucideIcon> = {
  website: Globe,
  search: Search,
  maps: MapPin,
  reviews: MessageSquareHeart,
  ads: Megaphone,
}

const LAYOUT: Record<DentalBundleItem['key'], string> = {
  website: 'lg:col-span-4',
  search: 'lg:col-span-2',
  maps: 'lg:col-span-2',
  reviews: 'lg:col-span-2',
  ads: 'lg:col-span-2',
}

/* Illustrative UI vignettes. Decorative only (aria-hidden), no metrics. */

function WebsiteVisual() {
  return (
    <div className="relative h-52 overflow-hidden sm:h-64">
      <BrowserFrame
        src="/case-studies/wine-country-root-canal-home-desktop.jpg"
        alt=""
        url="winecountryrootcanal.com"
        sizes="(min-width: 1024px) 34rem, 90vw"
        className="absolute left-6 right-[-12%] top-6 transition-transform duration-500 group-hover/bento:-translate-y-1.5 sm:left-10"
      />
    </div>
  )
}

function SearchVisual() {
  return (
    <div className="flex h-52 flex-col justify-center gap-3 px-6 sm:h-64">
      <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-muted-foreground">
        <Search className="size-4 shrink-0" />
        <span className="truncate">dentist open saturday near me</span>
      </div>
      <div className="rounded-xl border border-white/[0.08] bg-popover p-4">
        <p className="flex items-center gap-2 text-xs font-medium text-foreground">
          <Sparkles className="size-3.5" />
          AI answer
        </p>
        <div className="mt-3 space-y-2">
          <span className="block h-1.5 w-full rounded-full bg-white/10" />
          <span className="block h-1.5 w-4/5 rounded-full bg-white/10" />
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] text-foreground">
          <span className="size-1.5 rounded-full bg-spectrum-blue" />
          Your practice
        </span>
      </div>
    </div>
  )
}

function MapsVisual() {
  return (
    <div className="relative flex h-52 items-end overflow-hidden px-6 pb-6 sm:h-64">
      <div className="bg-dots mask-fade-y absolute inset-0 opacity-30" />
      <span className="absolute left-1/2 top-10 grid size-11 -translate-x-1/2 place-items-center rounded-full border border-white/15 bg-popover shadow-[0_0_40px_-6px_oklch(0.66_0.16_258/60%)]">
        <MapPin className="size-5 text-foreground" />
      </span>
      <div className="relative w-full rounded-xl border border-white/[0.08] bg-popover p-4">
        <p className="text-sm font-medium text-foreground">Your practice</p>
        <div className="mt-1.5 flex items-center gap-0.5 text-foreground/80">
          {[0, 1, 2, 3, 4].map((star) => (
            <Star key={star} className="size-3 fill-current" />
          ))}
          <span className="ml-2 text-[11px] text-subtle">Open today</span>
        </div>
        <div className="mt-3 flex gap-1.5">
          {[
            { label: 'Call', icon: Phone },
            { label: 'Directions', icon: Navigation },
            { label: 'Website', icon: Globe },
          ].map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-[10px] text-muted-foreground"
            >
              <Icon className="size-2.5" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ReviewsVisual() {
  return (
    <div className="flex h-52 flex-col justify-center gap-2.5 px-6 sm:h-64">
      <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-white/[0.08] bg-popover px-4 py-3 text-[13px] leading-5 text-muted-foreground">
        Thanks for visiting today. Would you share a quick review of your visit?
      </div>
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-foreground">
        <Check className="size-3" />
        Review request sent
      </span>
      <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md border border-white/15 bg-white/[0.06] px-4 py-3 text-[13px] leading-5 text-foreground/90">
        Response ready for your team to approve.
      </div>
    </div>
  )
}

const AD_BARS = [38, 62, 46, 74, 54, 82, 66] as const

function AdsVisual() {
  return (
    <div className="flex h-52 flex-col justify-end gap-4 px-6 pb-6 sm:h-64">
      <div className="flex gap-1.5">
        {['Google', 'Meta'].map((channel) => (
          <span
            key={channel}
            className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-muted-foreground"
          >
            {channel}
          </span>
        ))}
      </div>
      <div className="flex h-24 items-end gap-2 border-b border-white/10">
        {AD_BARS.map((height, index) => (
          <span
            key={index}
            className={cn(
              'flex-1 rounded-t-md',
              index % 2 === 0 ? 'bg-spectrum-blue/55' : 'bg-white/15',
            )}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="flex gap-4 text-[11px] text-subtle">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-spectrum-blue" />
          Calls tracked
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-white/40" />
          Inquiries tracked
        </span>
      </div>
    </div>
  )
}

const VISUALS: Record<DentalBundleItem['key'], () => JSX.Element> = {
  website: WebsiteVisual,
  search: SearchVisual,
  maps: MapsVisual,
  reviews: ReviewsVisual,
  ads: AdsVisual,
}

export function DentalBundleBento({ items }: { items: readonly DentalBundleItem[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      {items.map((item, index) => {
        const Icon = ICONS[item.key]
        const Visual = VISUALS[item.key]
        return (
          <li
            key={item.key}
            className={cn(
              'min-w-0',
              LAYOUT[item.key],
              item.key === 'website' && 'md:col-span-2',
            )}
          >
            <Reveal delay={(index % 3) * 80} className="h-full">
              <SpotlightCard className="group/bento flex h-full flex-col">
                <div aria-hidden="true" className="border-b border-white/[0.06]">
                  <Visual />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <OfferIconTile className="size-9 rounded-lg">
                      <Icon aria-hidden="true" className="size-4" />
                    </OfferIconTile>
                    <h3 className="text-[1.2rem] font-semibold tracking-[-0.025em] text-foreground">
                      {item.title ?? item.name}
                    </h3>
                  </div>
                  <p className="max-w-[52ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                    {item.outcome}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          </li>
        )
      })}
    </ul>
  )
}

export default DentalBundleBento
