import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import {
  HOMEPAGE_CASE_STUDIES,
  HOMEPAGE_CLIENT_WINS,
  HOMEPAGE_MORE_WORK,
} from '@/components/home/homepage-content'
import { Marquee } from '@/components/prism/marquee'
import { Reveal } from '@/components/prism/reveal'
import { SectionHeader, SplitTitle } from '@/components/prism/section'
import TrackedLink from '@/components/tracked-link'

type WallShot = {
  company: string
  location: string
  href: string
  image: string
}

/**
 * Every current client beyond the six featured stories, so the wall shows
 * exactly the "<n> more" its title counts. Former clients never appear here
 * (HOMEPAGE_CLIENT_WINS is already current-only).
 */
const WALL_EXCLUDE = new Set(
  HOMEPAGE_CASE_STUDIES.slugs.map((slug) => `/case-studies/${slug}`),
)

const WALL_SHOTS: WallShot[] = HOMEPAGE_CLIENT_WINS.slides
  .filter((slide) => !WALL_EXCLUDE.has(slide.href))
  .map((slide) => ({
    company: slide.company,
    location: slide.location,
    href: slide.href,
    image: slide.image.replace('-home-mobile.jpg', '-home-desktop.jpg'),
  }))

function columnsOf<T>(items: T[], count: number): T[][] {
  const columns: T[][] = Array.from({ length: count }, () => [])
  items.forEach((item, index) => columns[index % count].push(item))
  return columns
}

function WallCard({ shot }: { shot: WallShot }) {
  return (
    <Link
      href={shot.href}
      className="group/shot relative block w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-popover shadow-[0_24px_60px_-28px_oklch(0_0_0/90%)] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-white/25 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <div
        className="flex h-6 items-center gap-1 border-b border-white/[0.06] px-2.5"
        aria-hidden="true"
      >
        <span className="size-1.5 rounded-full bg-white/15" />
        <span className="size-1.5 rounded-full bg-white/15" />
        <span className="size-1.5 rounded-full bg-white/15" />
      </div>
      <Image
        src={shot.image}
        alt={`${shot.company} website built by Prism`}
        width={2880}
        height={1800}
        sizes="(min-width: 1024px) 360px, 260px"
        className="block h-auto w-full"
      />
      <span className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-background/80 px-3 py-2 text-left opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover/shot:opacity-100 group-focus-visible/shot:opacity-100">
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-medium text-foreground">
            {shot.company}
          </span>
          <span className="block truncate text-[11px] text-subtle">
            {shot.location}
          </span>
        </span>
        <ArrowRight
          aria-hidden="true"
          className="size-4 shrink-0 text-foreground"
        />
      </span>
    </Link>
  )
}

export default function HomeWorkWall() {
  const columns = columnsOf(WALL_SHOTS, 4)

  return (
    <section
      id="more-work"
      aria-labelledby="home-more-work-title"
      className="relative scroll-mt-[calc(var(--prism-header-height,64px)+1rem)] py-20 sm:py-24"
    >
      <div className="prism-container">
        <Reveal>
          <SectionHeader
            id="home-more-work-title"
            eyebrow={HOMEPAGE_MORE_WORK.eyebrow}
            title={
              <SplitTitle
                text={`${HOMEPAGE_MORE_WORK.count} more. every one is live.`}
              />
            }
            description={HOMEPAGE_MORE_WORK.description}
            align="center"
          />
        </Reveal>
      </div>

      <div className="relative mt-14 h-[520px] overflow-hidden sm:mt-16 sm:h-[640px] lg:h-[720px]">
        <div
          className="absolute left-1/2 top-1/2 grid w-[1080px] grid-cols-4 gap-4 sm:w-[1320px] sm:gap-5 lg:w-[1560px]"
          style={{
            transform:
              'translate(-50%, -50%) perspective(1800px) rotateX(24deg) rotateY(-6deg) rotateZ(14deg)',
          }}
        >
          {columns.map((column, index) => (
            <Marquee
              key={index}
              vertical
              fade={false}
              reverse={index % 2 === 1}
              duration={62 + index * 9}
              gap="1.25rem"
              className="h-[1500px]"
              label={index === 0 ? 'Client websites built by Prism' : undefined}
            >
              {column.map((shot) => (
                <WallCard key={shot.href} shot={shot} />
              ))}
            </Marquee>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background via-background/80 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent sm:w-48"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent sm:w-48"
        />

        <div className="absolute inset-x-0 bottom-8 flex justify-center">
          <TrackedLink
            href="/case-studies"
            label="see all work"
            location="homepage work wall"
            className="group/all inline-flex h-11 items-center gap-2 rounded-full border border-white/12 bg-background/70 px-5 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:border-white/25 hover:bg-background/90 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            See every case study
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover/all:translate-x-0.5"
            />
          </TrackedLink>
        </div>
      </div>
    </section>
  )
}
