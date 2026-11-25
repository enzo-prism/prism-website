import { ArrowRight } from 'lucide-react'

import { HOMEPAGE_CASE_STUDIES } from '@/components/home/homepage-content'
import type { HomepageStory } from '@/components/home/homepage-content'
import { SellsToChip } from '@/components/home/stories/SellsToChip'
import { StoriesDeck } from '@/components/home/stories/StoriesDeck'
import {
  StoryPanel,
  storyAnchorId,
  storyBand,
} from '@/components/home/stories/StoryPanel'

import { InlineWaitlistCta } from '@/components/prism/inline-waitlist-cta'
import { SectionHeader } from '@/components/prism/section'
import TrackedLink from '@/components/tracked-link'

const SELLS_TO_ORDER: HomepageStory['sellsTo'][] = ['consumers', 'businesses']

/**
 * #work: three client stories, each told as the impossible, what we built,
 * and what is live now. On lg+ the panels stack like a deck as you scroll
 * (each one recedes as the next slides over it); below lg they stack as
 * full-width cards, one per screen. Each panel carries one band of the prism
 * behind its live site. Every other live site is one tap away on
 * /case-studies.
 */
export default function HomeStories() {
  const { eyebrow, title, description } = HOMEPAGE_CASE_STUDIES
  const stories: readonly HomepageStory[] = HOMEPAGE_CASE_STUDIES.stories
  const pad = (value: number) => String(value).padStart(2, '0')

  return (
    <section
      id="work"
      aria-labelledby="home-stories-title"
      className="relative scroll-mt-[calc(var(--prism-header-height,64px)+1rem)] py-24 sm:py-32"
    >
      <div className="prism-container">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHeader
            id="home-stories-title"
            eyebrow={eyebrow}
            title={title}
            description={description}
            className="lg:max-w-[44rem]"
          />

          <dl
            aria-label="Who each client sells to"
            className="hidden shrink-0 lg:mb-1 lg:grid lg:grid-cols-[auto_auto] lg:items-center lg:justify-start lg:gap-x-3 lg:gap-y-2"
          >
            {SELLS_TO_ORDER.map((kind) => {
              const matches = stories
                .map((story, index) => ({ story, index }))
                .filter(({ story }) => story.sellsTo === kind)
              if (matches.length === 0) return null
              return (
                <div
                  key={kind}
                  className="col-span-2 grid grid-cols-subgrid items-center"
                >
                  <dt>
                    <SellsToChip sellsTo={kind} />
                  </dt>
                  <dd className="-ml-1 flex items-center">
                    {matches.map(({ story, index }) => (
                      <a
                        key={story.slug}
                        href={`#${storyAnchorId(story.slug)}`}
                        aria-label={`Story ${index + 1}: ${story.company}`}
                        className="group/legend relative inline-flex size-10 flex-col items-center justify-center gap-1.5 rounded-full font-mono text-[11px] tabular-nums tracking-[0.08em] text-subtle outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      >
                        <span className="leading-none">{pad(index + 1)}</span>
                        <span
                          aria-hidden="true"
                          className="h-[2px] w-3.5 rounded-full opacity-70 transition-opacity group-hover/legend:opacity-100"
                          style={{ background: storyBand(index, stories.length) }}
                        />
                      </a>
                    ))}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>

        <StoriesDeck aria-label="Client stories" className="mt-14 sm:mt-20">
          {stories.map((story, index) => (
            <StoryPanel
              key={story.slug}
              story={story}
              index={index}
              total={stories.length}
            />
          ))}
        </StoriesDeck>

        <div className="mt-10 flex justify-center sm:mt-12">
          <TrackedLink
            href={HOMEPAGE_CASE_STUDIES.allWork.href}
            label="see all live sites"
            location="homepage stories"
            className="group/all inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 text-[15px] font-medium text-foreground transition-[background-color,border-color] duration-(--dur-ui) ease-(--ease-out) hover:border-white/25 hover:bg-white/[0.06] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            {HOMEPAGE_CASE_STUDIES.allWork.label}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-(--dur-ui) ease-(--ease-out) group-hover/all:translate-x-0.5"
            />
          </TrackedLink>
        </div>

        <InlineWaitlistCta
          location="homepage stories"
          title={HOMEPAGE_CASE_STUDIES.nextLine}
          className="mt-16 sm:mt-20"
        />
      </div>
    </section>
  )
}
