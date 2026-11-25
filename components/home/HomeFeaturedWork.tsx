import { ArrowUpRight, Play } from 'lucide-react'

import HeroLoopingVideo from '@/components/HeroLoopingVideo'
import { BrowserFrame } from '@/components/prism/browser-frame'
import { Eyebrow, Section } from '@/components/prism/section'
import TrackedLink from '@/components/tracked-link'

export default function HomeFeaturedWork() {
  return (
    <Section
      id="featured-work"
      aria-labelledby="featured-title"
      className="scroll-mt-16 pb-8 pt-6 sm:pt-10"
    >
      <div className="grid items-center gap-8 border-y border-white/[0.08] py-10 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
        <TrackedLink
          href="/case-studies/olympic-bootworks#walkthrough"
          label="watch Olympic Bootworks walkthrough"
          location="homepage featured work"
          className="group relative block rounded-2xl focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <BrowserFrame
            src="/case-studies/olympic-catalog.webp"
            alt="Fantic trail bikes displayed side by side with prices in the Olympic Bootworks catalog"
            url="olympicbootworks.com"
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="isolate rounded-2xl transition-transform duration-500 group-hover:-translate-y-0.5"
            media={
              <HeroLoopingVideo
                videoSrc="/case-studies/olympic-walkthrough.mp4"
                posterSrc="/case-studies/olympic-catalog.webp"
                alt="Fantic trail bikes displayed side by side with prices in the Olympic Bootworks catalog"
                posterSizes="(min-width: 1024px) 60vw, 100vw"
                className="rounded-none border-0 bg-transparent shadow-none"
                aspectClassName="aspect-[16/10] sm:aspect-[16/10]"
                skeletonClassName="bg-white/[0.04]"
              />
            }
          />
          <span className="absolute bottom-4 left-4 z-30 inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/85 px-4 py-2 text-xs font-medium text-foreground backdrop-blur-md transition-colors group-hover:bg-background">
            <Play aria-hidden="true" className="size-3.5 fill-current" />
            Watch 55s walkthrough
          </span>
        </TrackedLink>

        <div>
          <Eyebrow>Olympic Bootworks · Tahoe retail</Eyebrow>
          <h2 id="featured-title" className="text-title text-gradient mt-4 text-balance pb-1">
            from bike research to a test ride.
          </h2>
          <p className="text-lead mt-4 max-w-[30ch] text-pretty text-muted-foreground">
            Compare Fantic models, check pricing, book a Tahoe ride.
          </p>
          <p className="mt-3 font-mono text-[11px] text-subtle">
            Live Fantic catalog · November 2026
          </p>
          <TrackedLink
            href="/case-studies/olympic-bootworks"
            label="Olympic Bootworks case study"
            location="homepage featured work"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 text-sm font-medium text-foreground transition-colors hover:border-white/25 hover:bg-white/[0.07]"
          >
            See what we built
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </TrackedLink>
        </div>
      </div>
    </Section>
  )
}
