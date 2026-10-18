import type { CSSProperties } from 'react'
import Image from 'next/image'
import { ArrowRight, Lock, MapPin } from 'lucide-react'

import type { HomepageStory } from '@/components/home/homepage-content'
import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { getBrowseDuration, getCaptureSize } from './capture-sizes'
import { SellsToChip } from './SellsToChip'
import styles from './stories.module.css'

/** One band of the prism per story, in spectrum order. */
export const STORY_BANDS = [
  'var(--spectrum-red)',
  'var(--spectrum-orange)',
  'var(--spectrum-yellow)',
  'var(--spectrum-green)',
  'var(--spectrum-blue)',
  'var(--spectrum-violet)',
] as const

export function storyAnchorId(slug: string) {
  return `story-${slug}`
}

const pad = (value: number) => String(value).padStart(2, '0')

type StoryPanelProps = {
  story: HomepageStory
  index: number
  total: number
}

/** iOS-style status bar drawn in one scalable SVG (time, signal, battery). */
function PhoneStatusBar() {
  return (
    <svg
      viewBox="0 0 390 44"
      aria-hidden="true"
      className={cn(styles.phoneStatus, 'text-white')}
    >
      <text
        x="46"
        y="29"
        fill="currentColor"
        fontSize="15"
        fontWeight="600"
        letterSpacing="-0.2"
        className="font-sans"
      >
        9:41
      </text>
      <g fill="currentColor">
        <rect x="297" y="21.5" width="3" height="6" rx="1" />
        <rect x="302" y="19" width="3" height="8.5" rx="1" />
        <rect x="307" y="16.5" width="3" height="11" rx="1" />
        <rect x="312" y="14" width="3" height="13.5" rx="1" />
      </g>
      <rect
        x="322.5"
        y="14.5"
        width="23"
        height="12.5"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.45"
      />
      <rect
        x="324.5"
        y="16.5"
        width="19"
        height="8.5"
        rx="2.4"
        fill="currentColor"
      />
      <rect
        x="347"
        y="18.5"
        width="1.8"
        height="4.5"
        rx="0.9"
        fill="currentColor"
        fillOpacity="0.45"
      />
    </svg>
  )
}

export function StoryPanel({ story, index, total }: StoryPanelProps) {
  const band = STORY_BANDS[index % STORY_BANDS.length]
  const titleId = `${storyAnchorId(story.slug)}-title`
  const desktop = getCaptureSize(story.desktopImage, 'desktop')
  const mobile = getCaptureSize(story.mobileImage, 'mobile')

  return (
    <li
      id={storyAnchorId(story.slug)}
      className={styles.item}
      style={
        {
          '--story-index': index,
          scrollMarginTop: `calc(var(--prism-header-height, 64px) + 1.25rem + ${index} * 0.875rem)`,
        } as CSSProperties
      }
    >
      <article
        aria-labelledby={titleId}
        className={cn(
          styles.panel,
          'overflow-hidden rounded-[1.75rem] border border-white/10 bg-card shadow-[0_1px_0_0_oklch(1_0_0/6%)_inset] sm:rounded-[2rem]',
        )}
        style={{ '--band': band } as CSSProperties}
      >
        <div className="grid h-full lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          {/* Story */}
          <div className="order-2 flex min-w-0 flex-col px-5 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-9 lg:order-1 lg:py-10 lg:pl-10 lg:pr-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="flex items-center gap-2.5 font-mono text-[12px] tabular-nums tracking-[0.14em] text-subtle">
                <span className="text-foreground">{pad(index + 1)}</span>
                <span aria-hidden="true">/</span>
                <span>{pad(total)}</span>
                <span className="sr-only">stories</span>
              </p>
              <span
                aria-hidden="true"
                className="h-px w-5 bg-[var(--band)] opacity-80"
              />
              <SellsToChip sellsTo={story.sellsTo} />
            </div>

            <h3
              id={titleId}
              className="mt-5 text-balance text-[clamp(1.85rem,1.3rem+1.2vw,2.25rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-foreground"
            >
              {story.company}
            </h3>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11px] uppercase leading-none tracking-[0.14em] text-subtle">
              <span>{story.industry}</span>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <MapPin
                  aria-hidden="true"
                  className="size-3 shrink-0 opacity-80"
                  strokeWidth={1.75}
                />
                {story.location}
              </span>
            </p>

            <dl className="mt-8 flex flex-col gap-6 lg:mt-auto lg:gap-5 lg:pt-7">
              <div>
                <dt className="text-eyebrow text-subtle">The impossible</dt>
                <dd className="mt-3 max-w-[32ch] text-balance text-[clamp(1.4rem,1.1rem+0.75vw,1.75rem)] font-medium leading-[1.2] tracking-[-0.03em] text-foreground">
                  {story.impossible}
                </dd>
              </div>
              <div className="hidden sm:block">
                <dt className="sr-only">What Prism built</dt>
                <dd>
                  <ul className="flex flex-wrap gap-1.5">
                    {story.built.map((item) => (
                      <li
                        key={item}
                        className="inline-flex h-7 items-center rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 text-[12px] leading-none text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow text-subtle">Now live</dt>
                <dd className="mt-2.5 max-w-[54ch] text-pretty text-[15px] leading-relaxed text-muted-foreground">
                  {story.now}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 lg:mt-auto lg:pt-7">
              <Button asChild variant="outline" className="group/cta">
                <TrackedLink
                  href={`/case-studies/${story.slug}`}
                  label={`read the ${story.company} case study`}
                  location="homepage stories"
                >
                  Read the case study
                  <span className="sr-only">: {story.company}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5"
                  />
                </TrackedLink>
              </Button>
              <span className="font-mono text-[11.5px] tracking-[0.04em] text-subtle">
                {story.host}
              </span>
            </div>
          </div>

          {/* Live site, browsing itself */}
          <div className="relative order-1 flex min-w-0 items-center px-4 pt-4 sm:px-8 sm:pt-8 lg:order-2 lg:py-10 lg:pl-2 lg:pr-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[-10%] top-[-20%] bottom-[-35%] -z-10 bg-[radial-gradient(closest-side,var(--band),transparent)] opacity-[0.2] lg:inset-x-[-6%] lg:inset-y-[-4%]"
            />

            <div className="relative w-full pb-[15%] pr-[9%]">
              <figure className="relative overflow-hidden rounded-[0.875rem] border border-white/10 bg-popover shadow-[0_40px_120px_-40px_oklch(0_0_0/95%),0_1px_0_0_oklch(1_0_0/6%)_inset]">
                <div
                  aria-hidden="true"
                  className="flex h-7 items-center gap-1.5 border-b border-white/[0.06] px-3 sm:h-8"
                >
                  <span className="size-2 rounded-full bg-white/15" />
                  <span className="size-2 rounded-full bg-white/15" />
                  <span className="size-2 rounded-full bg-white/15" />
                  <span className="mx-auto inline-flex max-w-[64%] items-center gap-1.5 truncate rounded-md bg-white/[0.05] px-2.5 py-[3px] font-mono text-[10px] leading-none text-subtle">
                    <Lock className="size-2.5 shrink-0" strokeWidth={2} />
                    <span className="truncate">{story.host}</span>
                  </span>
                  <span className="w-[42px]" />
                </div>
                <div
                  className={cn(
                    styles.viewport,
                    styles.viewportDesktop,
                    'bg-background',
                  )}
                >
                  <Image
                    src={story.desktopImage}
                    alt={`${story.company} website built by Prism`}
                    width={desktop.width}
                    height={desktop.height}
                    sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 92vw"
                    className={styles.capture}
                    style={
                      {
                        '--browse-duration': `${getBrowseDuration(desktop, 'desktop')}s`,
                      } as CSSProperties
                    }
                  />
                </div>
              </figure>

              <figure className="absolute bottom-0 right-0 w-[29%] min-w-[88px] rounded-[1.35rem] border border-white/[0.12] bg-popover p-[4px] shadow-[0_40px_80px_-24px_oklch(0_0_0/95%),0_1px_0_0_oklch(1_0_0/8%)_inset] sm:rounded-[1.9rem] sm:p-[5px]">
                <div
                  className={cn(
                    styles.phoneScreen,
                    'rounded-[1.05rem] bg-black sm:rounded-[1.55rem]',
                  )}
                >
                  <PhoneStatusBar />
                  <div
                    className={cn(
                      styles.viewport,
                      styles.viewportPhone,
                      'bg-background',
                    )}
                  >
                    <Image
                      src={story.mobileImage}
                      alt={`${story.company} mobile website built by Prism`}
                      width={mobile.width}
                      height={mobile.height}
                      sizes="(min-width: 1024px) 190px, 30vw"
                      className={styles.capture}
                      style={
                        {
                          '--browse-duration': `${getBrowseDuration(mobile, 'mobile')}s`,
                          '--browse-delay': '1.4s',
                        } as CSSProperties
                      }
                    />
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className={styles.shade} />
      </article>
    </li>
  )
}

export default StoryPanel
