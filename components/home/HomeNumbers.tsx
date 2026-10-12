import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import HomeCountUp from '@/components/home/HomeCountUp'
import { HOMEPAGE_NUMBERS } from '@/components/home/homepage-content'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'

/**
 * Verified results band: two client search results, connected client
 * traffic, and the live client roster. Every value resolves from
 * lib/proof-metrics.ts or a verified case-study metric, with the sources
 * printed underneath.
 */
export default function HomeNumbers() {
  return (
    <Section id="numbers" aria-labelledby="home-numbers-title">
      <Reveal>
        <SectionHeader
          id="home-numbers-title"
          eyebrow={HOMEPAGE_NUMBERS.eyebrow}
          title={HOMEPAGE_NUMBERS.title}
          description={HOMEPAGE_NUMBERS.description}
          align="center"
        />
      </Reveal>

      <Reveal delay={120} className="mt-14 sm:mt-16">
        <ul className="spectrum-rule grid grid-cols-2 overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/6%)_inset] lg:grid-cols-4">
          {HOMEPAGE_NUMBERS.stats.map((stat, index) => (
            <li
              key={stat.label}
              className={[
                'border-white/[0.07]',
                index % 2 === 0 ? 'border-r' : '',
                index < 2 ? 'border-b lg:border-b-0' : '',
                index === 1 ? 'lg:border-r' : '',
              ].join(' ')}
            >
              <Link
                data-home-stat=""
                href={stat.href}
                className="group/stat relative flex h-full flex-col gap-4 p-5 transition-colors hover:bg-white/[0.025] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50 sm:p-8"
              >
                <HomeCountUp
                  value={stat.value}
                  className="text-[clamp(2.5rem,1.4rem+3.6vw,5rem)] font-semibold leading-none tracking-[-0.06em] text-foreground tabular-nums"
                />
                <span className="max-w-[24ch] text-pretty text-[13px] leading-snug text-muted-foreground sm:text-[15px]">
                  {stat.label}
                </span>
                <span className="mt-auto pt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
                  {stat.source}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="absolute right-5 top-5 size-4 text-subtle transition-[color,transform] duration-200 group-hover/stat:translate-x-0.5 group-hover/stat:text-foreground sm:right-7 sm:top-8"
                />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-5 max-w-3xl text-pretty text-center text-[12px] leading-relaxed text-subtle">
          {HOMEPAGE_NUMBERS.note}
        </p>
      </Reveal>
    </Section>
  )
}
