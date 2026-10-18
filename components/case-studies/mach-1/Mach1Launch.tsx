import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

import HeroLoopingVideo from '@/components/HeroLoopingVideo'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import TrackedLink from '@/components/tracked-link'

import { MACH1_LAUNCH } from './content'

const MOBILE_FILM = '/case-studies/mach-1/site-film-mobile.mp4'
const MOBILE_POSTER = '/case-studies/mach-1/site-film-mobile-poster.jpg'

/**
 * "a launch led by customers." The launch in numbers (counted on the live
 * site), the phone film of the homepage, and four pages of the new site,
 * each linking out to the live page.
 */
export function Mach1Launch({ trackedLocation }: { trackedLocation: string }) {
  return (
    <Section id="launch" aria-labelledby="mach1-launch-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
        <Reveal className="lg:col-span-7">
          <SectionHeader
            id="mach1-launch-title"
            eyebrow={MACH1_LAUNCH.eyebrow}
            title={MACH1_LAUNCH.title}
            description={MACH1_LAUNCH.description}
          />
        </Reveal>
        <Reveal className="lg:col-span-5" delay={120}>
          <dl className="divide-y divide-white/[0.06] rounded-2xl border border-white/[0.08] bg-card/70 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset]">
            {MACH1_LAUNCH.facts.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-[4.5rem_1fr] items-baseline gap-4 px-5 py-4 sm:px-6"
              >
                <dt className="order-2 text-[14px] leading-6 text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="order-1 text-4xl font-semibold tabular-nums tracking-[-0.045em] text-foreground">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs leading-5 text-subtle">{MACH1_LAUNCH.factsNote}</p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        <Reveal className="md:row-span-2 lg:col-span-4 lg:row-span-2">
          <figure className="relative isolate flex h-full flex-col items-center justify-center gap-8 overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-card px-6 pb-7 pt-10 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] sm:px-8">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 -z-10 h-3/4 bg-[radial-gradient(55%_60%_at_50%_35%,oklch(0.63_0.19_295/22%),transparent_70%)]"
            />
            <span aria-hidden="true" className="bg-grid absolute inset-0 -z-20 opacity-50" />
            <div className="w-[62%] max-w-[15rem] rounded-[2.1rem] border border-white/[0.12] bg-popover p-[7px] shadow-[0_40px_80px_-24px_oklch(0_0_0/95%),0_1px_0_0_oklch(1_0_0/8%)_inset] md:w-[70%] lg:w-[78%]">
              <div className="relative overflow-hidden rounded-[1.65rem] bg-background">
                <HeroLoopingVideo
                  videoSrc={MOBILE_FILM}
                  posterSrc={MOBILE_POSTER}
                  alt="The Mach 1 homepage on a phone, scrolling from the hero through customer stories"
                  priority={false}
                  posterSizes="(min-width: 1024px) 240px, 60vw"
                  className="rounded-none border-0 bg-transparent shadow-none"
                  aspectClassName="aspect-[300/649] sm:aspect-[300/649]"
                  skeletonClassName="bg-white/[0.04]"
                />
              </div>
            </div>
            <figcaption className="max-w-[30ch] text-center">
              <span className="block text-[15px] font-medium tracking-[-0.01em] text-foreground">
                the same story, one thumb away.
              </span>
              <span className="mt-1.5 block text-[13px] leading-5 text-muted-foreground">
                Every section reflows for the phone, with the films and results
                still up front.
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {MACH1_LAUNCH.pages.map((page, index) => (
          <Reveal key={page.key} className="lg:col-span-4" delay={80 * (index % 2)}>
            <TrackedLink
              href={`https://${page.path}`}
              target="_blank"
              rel="noopener noreferrer"
              label={`Open ${page.path}`}
              location={trackedLocation}
              className="group/page flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/[0.16] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <span className="relative block overflow-hidden border-b border-white/[0.06]">
                <span
                  aria-hidden="true"
                  className="flex h-6 items-center gap-1 border-b border-white/[0.06] bg-popover px-3"
                >
                  <span className="size-1.5 rounded-full bg-white/15" />
                  <span className="size-1.5 rounded-full bg-white/15" />
                  <span className="size-1.5 rounded-full bg-white/15" />
                  <span className="mx-auto truncate font-mono text-[9px] text-subtle">
                    {page.path}
                  </span>
                </span>
                <Image
                  src={page.src}
                  alt={`${page.path} on the new Mach 1 site`}
                  width={2880}
                  height={1800}
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 46vw, calc(100vw - 2.5rem)"
                  className="block aspect-[16/9] h-auto w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/page:scale-[1.025] motion-reduce:transition-none"
                />
              </span>
              <span className="flex flex-1 flex-col p-5 sm:p-6">
                <span className="flex items-start justify-between gap-3">
                  <span className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">
                    {page.title}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-subtle transition-[transform,color] duration-300 group-hover/page:-translate-y-0.5 group-hover/page:translate-x-0.5 group-hover/page:text-foreground"
                  />
                </span>
                <span className="mt-2 text-[14px] leading-6 text-muted-foreground">
                  {page.body}
                </span>
              </span>
            </TrackedLink>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
