import {
  BarChart3,
  LayoutTemplate,
  Megaphone,
  PhoneCall,
  type LucideIcon,
} from 'lucide-react'

import {
  TechStackIcon,
  type TechStackIconSpec,
} from '@/components/tech-stack-icons'
import { cn } from '@/lib/utils'

type ManifestChannel = {
  icon: TechStackIconSpec
  role: string
  status: 'Active' | 'Queued' | 'Invite only'
}

// Real platforms, illustrative statuses (the panel carries an "Example" tag).
// No numbers anywhere in the hero: the ads page makes zero metric claims
// above the fold.
const CHANNELS: readonly ManifestChannel[] = [
  {
    icon: { label: 'Google', brand: 'google' },
    role: 'Search intent',
    status: 'Active',
  },
  {
    icon: { label: 'Meta', brand: 'meta' },
    role: 'Facebook and Instagram',
    status: 'Active',
  },
  {
    icon: { label: 'TikTok', brand: 'tiktok', theme: 'dark' },
    role: 'Short-form video',
    status: 'Active',
  },
  {
    icon: { label: 'Yelp', brand: 'yelp' },
    role: 'Local discovery',
    status: 'Queued',
  },
  {
    icon: { label: 'ChatGPT Ads', brand: 'openai', theme: 'dark' },
    role: 'Inside the conversation',
    status: 'Invite only',
  },
]

const FLIGHT_PATH: readonly {
  icon: LucideIcon
  title: string
  body: string
}[] = [
  { icon: Megaphone, title: 'Ad creative', body: 'Images, video, and copy' },
  { icon: LayoutTemplate, title: 'Landing page', body: 'One clear next step' },
  {
    icon: PhoneCall,
    title: 'Call or inquiry',
    body: 'Tracked as a conversion',
  },
  { icon: BarChart3, title: 'Report', body: 'Reviewed in plain English' },
]

const STATUS_STYLES: Record<ManifestChannel['status'], string> = {
  Active: 'border-white/15 bg-white/[0.06] text-foreground',
  Queued: 'border-white/10 bg-transparent text-muted-foreground',
  'Invite only': 'border-white/10 bg-transparent text-subtle',
}

/**
 * /ads hero: an example campaign "launch manifest" console built from the
 * real platforms Prism runs on, plus the path from ad to reported inquiry.
 */
export function AdsHeroVisual() {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div
        aria-hidden="true"
        className="absolute inset-x-[6%] top-[8%] -z-10 h-[84%] rounded-full bg-[radial-gradient(closest-side,oklch(0.76_0.17_145/16%),oklch(0.66_0.16_258/16%)_55%,transparent)] blur-2xl"
      />
      <div className="prism-beam rounded-[2rem] border border-white/[0.08] bg-card/90 p-2.5 shadow-[0_50px_120px_-40px_oklch(0_0_0/95%),0_1px_0_0_oklch(1_0_0/6%)_inset] backdrop-blur-md sm:p-3">
        <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-3 pt-2 sm:px-4">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
            </span>
            <span className="ml-1 text-sm font-medium text-foreground">
              Launch manifest
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-xs text-muted-foreground">
              Example
            </span>
          </div>
          <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-muted-foreground sm:inline-flex">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-foreground"
            />
            Ready for launch
          </span>
        </div>

        <div className="grid gap-2.5 sm:gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="rounded-2xl border border-white/[0.08] bg-background/60 p-4 text-left sm:p-5">
            <p className="text-eyebrow text-subtle">Channels</p>
            <ul
              aria-label="Ad platforms"
              className="mt-3 divide-y divide-white/[0.06]"
            >
              {CHANNELS.map((channel) => (
                <li
                  key={channel.icon.label}
                  className="flex min-h-14 items-center gap-3.5 py-3"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
                    <TechStackIcon
                      spec={channel.icon}
                      className="size-[18px]"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-medium leading-tight text-foreground">
                      {channel.icon.label}
                    </span>
                    <span className="block truncate text-[13px] text-muted-foreground">
                      {channel.role}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[11px]',
                      STATUS_STYLES[channel.status],
                    )}
                  >
                    {channel.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col rounded-2xl border border-white/[0.08] bg-background/60 p-4 text-left sm:p-5">
            <p className="text-eyebrow text-subtle">Flight path</p>
            <ol className="relative mt-4 flex flex-col gap-3">
              <span
                aria-hidden="true"
                className="absolute bottom-5 left-[17px] top-5 w-px bg-gradient-to-b from-spectrum-green via-spectrum-blue to-spectrum-violet opacity-70"
              />
              {FLIGHT_PATH.map((stop) => {
                const Icon = stop.icon
                return (
                  <li
                    key={stop.title}
                    className="relative flex items-center gap-3.5"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-popover text-foreground">
                      <Icon
                        aria-hidden="true"
                        className="size-4"
                        strokeWidth={1.7}
                      />
                    </span>
                    <span>
                      <span className="block text-[15px] font-medium leading-tight text-foreground">
                        {stop.title}
                      </span>
                      <span className="block text-[13px] text-muted-foreground">
                        {stop.body}
                      </span>
                    </span>
                  </li>
                )
              })}
            </ol>
            <dl className="mt-auto grid gap-2 border-t border-white/[0.06] pt-4 text-[13px] sm:mt-6">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-subtle">Guidance</dt>
                <dd className="text-foreground">Weekly optimization</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-subtle">Tracking</dt>
                <dd className="text-foreground">Calls and inquiries</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdsHeroVisual
