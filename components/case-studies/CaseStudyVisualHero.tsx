import { Fragment, type ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

import { PhoneFrame } from '@/components/case-studies/PhoneFrame'
import HeroLoopingVideo from '@/components/HeroLoopingVideo'
import { BrowserFrame } from '@/components/prism/browser-frame'
import { Eyebrow } from '@/components/prism/section'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import TrackedLink from '@/components/tracked-link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type CaseStudyHeroBadge = {
  label: string
  icon?: ReactNode
}

type CaseStudyVisualHeroProps = {
  title: string
  description: ReactNode
  eyebrow?: string
  badges?: CaseStudyHeroBadge[]
  websiteUrl?: string
  /** Host shown in the browser chrome and the outline CTA. */
  websiteHost?: string
  /** Analytics location prefix, e.g. "dr-christopher-wong case study hero". */
  trackedLocation: string
  homeDesktopSrc?: string
  homeDesktopAlt?: string
  homeMobileSrc?: string
  homeMobileAlt?: string
  /**
   * A muted, looping screen recording of the live site that plays inside the
   * browser frame (poster: `homeDesktopSrc`). Captured at the same 1440x900
   * viewport as the still, so the crossfade lands on the same frame.
   */
  homeDesktopFilm?: string
}

/**
 * Keeps honorifics and initials on the line of the word they introduce
 * ("Dr. Christopher", "B. Wong"), so a wrapping name never strands "Dr." on
 * its own line. The spans only bind from 336px up, where the pair always
 * fits the column; the accessible name and copied text keep plain spaces.
 */
function BoundName({ name }: { name: string }) {
  const words = name.split(/\s+/)
  const groups: string[] = []
  for (let index = 0; index < words.length; index += 1) {
    const word = words[index]
    const binds = /^(Dr|Mr|Mrs|Ms|St)\.$|^[A-Z]\.$/.test(word)
    if (binds && index < words.length - 1) {
      groups.push(`${word} ${words[index + 1]}`)
      index += 1
    } else {
      groups.push(word)
    }
  }
  return (
    <>
      {groups.map((group, index) => (
        <Fragment key={`${group}-${index}`}>
          {index > 0 ? ' ' : null}
          {group.includes(' ') ? (
            <span className="min-[21rem]:whitespace-nowrap">{group}</span>
          ) : (
            group
          )}
        </Fragment>
      ))}
    </>
  )
}

/**
 * Launch-page hero for a case study: industry and location badges, the
 * client name as a full-width display headline (long names wrap in balanced
 * lines instead of a narrow column), a row with the description, the
 * waitlist CTA and a link to the live site, then the real homepage in window
 * chrome with the phone capture docked over its corner.
 */
export default function CaseStudyVisualHero({
  title,
  description,
  eyebrow = 'Case study',
  badges = [],
  websiteUrl,
  websiteHost,
  trackedLocation,
  homeDesktopSrc,
  homeDesktopAlt,
  homeMobileSrc,
  homeMobileAlt,
  homeDesktopFilm,
}: CaseStudyVisualHeroProps) {
  const longTitle = title.length > 23

  return (
    <section
      aria-labelledby="case-study-title"
      className="relative isolate overflow-x-clip pb-12 pt-10 sm:pb-16 sm:pt-16"
    >
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-x-0 top-0 -z-10 h-[720px] opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-12rem] -z-10 h-[32rem] w-[66rem] max-w-[170vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.66_0.16_258/18%),transparent)] blur-2xl"
      />
      <div aria-hidden="true" className="bg-noise absolute inset-0 -z-10 opacity-[0.05]" />

      <div className="prism-container">
        <div className="prism-rise flex flex-col items-start gap-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          {badges.length > 0 ? (
            <ul className="flex flex-wrap gap-2" aria-label="Project details">
              {badges.map((badge) => (
                <li key={badge.label}>
                  <Badge
                    variant="outline"
                    className="h-7 gap-1.5 px-3 text-[12px] [&>svg]:size-3.5"
                  >
                    {badge.icon}
                    {badge.label}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <h1
          id="case-study-title"
          className={cn(
            'prism-rise text-display text-gradient mt-8 max-w-[22ch] text-balance pb-2 [--rise-delay:80ms]',
            longTitle && 'lg:text-[clamp(3rem,1.6rem+4.2vw,5.25rem)]',
          )}
        >
          <BoundName name={title} />
        </h1>

        <div className="prism-rise mt-7 flex flex-col gap-7 [--rise-delay:160ms] lg:mt-9 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <p className="text-lead min-w-0 max-w-[52ch] text-pretty text-muted-foreground lg:flex-1">
            {description}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:shrink-0 lg:flex-nowrap">
            <WaitlistButton location={trackedLocation} size="lg" />
            {websiteUrl ? (
              <Button asChild variant="outline" size="lg" className="group/site">
                <TrackedLink
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  label={`Open ${title} live site`}
                  location={trackedLocation}
                >
                  <span className="truncate">
                    Visit {websiteHost ?? 'the live site'}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover/site:-translate-y-0.5 group-hover/site:translate-x-0.5"
                  />
                </TrackedLink>
              </Button>
            ) : null}
          </div>
        </div>

        {homeDesktopSrc ? (
          <div className="prism-rise relative mt-14 [--rise-delay:240ms] sm:mt-20">
            <div
              aria-hidden="true"
              className="absolute inset-x-[6%] -bottom-10 top-[20%] -z-10 bg-[radial-gradient(45%_55%_at_25%_70%,oklch(0.66_0.21_29/16%),transparent_70%),radial-gradient(45%_55%_at_70%_70%,oklch(0.66_0.16_258/22%),transparent_70%)] blur-3xl"
            />
            <BrowserFrame
              src={homeDesktopSrc}
              alt={homeDesktopAlt ?? `${title} homepage built by Prism`}
              url={websiteHost}
              priority
              sizes="(min-width: 1280px) 1152px, calc(100vw - 2.5rem)"
              // isolate: the film's layered poster/video stay under the phone.
              className="isolate rounded-2xl"
              media={
                homeDesktopFilm ? (
                  <HeroLoopingVideo
                    videoSrc={homeDesktopFilm}
                    posterSrc={homeDesktopSrc}
                    alt={homeDesktopAlt ?? `${title} homepage built by Prism`}
                    posterSizes="(min-width: 1280px) 1152px, calc(100vw - 2.5rem)"
                    className="rounded-none border-0 bg-transparent shadow-none"
                    aspectClassName="aspect-[16/10] sm:aspect-[16/10]"
                    skeletonClassName="bg-white/[0.04]"
                  />
                ) : undefined
              }
            />
            {homeMobileSrc ? (
              <div className="absolute -bottom-6 right-3 w-[27%] max-w-[248px] sm:-bottom-10 sm:right-8 sm:w-[21%] lg:-right-5 lg:w-[19%]">
                <PhoneFrame
                  src={homeMobileSrc}
                  alt={homeMobileAlt ?? `Mobile view of the ${title} site`}
                  priority
                  sizes="(min-width: 1280px) 248px, 27vw"
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
