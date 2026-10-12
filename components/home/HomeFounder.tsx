import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

import { HOMEPAGE_FOUNDER } from '@/components/home/homepage-content'
import { PrismMark } from '@/components/prism/prism-logo'
import { Reveal } from '@/components/prism/reveal'
import { Eyebrow, Section } from '@/components/prism/section'
import TrackedLink from '@/components/tracked-link'

export default function HomeFounder() {
  return (
    <Section aria-labelledby="home-founder-title">
      <div className="relative isolate grid items-center gap-10 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card p-5 sm:p-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:p-12">
        <div
          aria-hidden="true"
          className="absolute -left-40 top-1/2 -z-10 size-[520px] -translate-y-1/2 rounded-full bg-[conic-gradient(from_200deg,oklch(0.66_0.21_29/30%),oklch(0.86_0.15_90/22%),oklch(0.76_0.17_145/22%),oklch(0.66_0.16_258/30%),oklch(0.63_0.19_295/28%),oklch(0.66_0.21_29/30%))] blur-[90px]"
        />
        <Reveal>
          <figure className="relative mx-auto w-full max-w-[420px]">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-[0_40px_90px_-40px_oklch(0_0_0/95%)]">
              <Image
                src={HOMEPAGE_FOUNDER.image}
                alt={`${HOMEPAGE_FOUNDER.name}, founder of Prism`}
                width={840}
                height={1000}
                sizes="(min-width: 1024px) 420px, 90vw"
                className="aspect-[4/5] h-auto w-full object-cover grayscale-[35%] transition-[filter] duration-700 hover:grayscale-0"
              />
            </div>
            <figcaption className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full border border-white/12 bg-background/85 px-4 py-2 backdrop-blur-md">
              <PrismMark className="size-4" />
              <span className="text-sm font-medium text-foreground">
                {HOMEPAGE_FOUNDER.name}
              </span>
              <span className="text-[13px] text-subtle">
                {HOMEPAGE_FOUNDER.role}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-6 pt-4 lg:pt-0">
          <Eyebrow>{HOMEPAGE_FOUNDER.eyebrow}</Eyebrow>
          <h2
            id="home-founder-title"
            className="text-title text-gradient max-w-[15ch] text-balance pb-1"
          >
            {HOMEPAGE_FOUNDER.title}
          </h2>
          <p className="text-lead max-w-[46ch] text-pretty text-muted-foreground">
            {HOMEPAGE_FOUNDER.body}
          </p>
          <ul className="flex flex-wrap gap-2">
            {HOMEPAGE_FOUNDER.facts.map((fact) => (
              <li
                key={fact}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-muted-foreground"
              >
                {fact}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/[0.07] pt-6">
            <p className="text-refract text-2xl font-semibold tracking-[-0.04em]">
              {HOMEPAGE_FOUNDER.motto}
            </p>
            <TrackedLink
              href="/about"
              label="read enzo's story"
              location="homepage founder"
              className="group/about inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Read Enzo’s story
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover/about:-translate-y-0.5 group-hover/about:translate-x-0.5"
              />
            </TrackedLink>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
