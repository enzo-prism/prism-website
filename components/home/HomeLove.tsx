import { ArrowRight } from 'lucide-react'

import { HOMEPAGE_TESTIMONIALS } from '@/components/home/homepage-content'
import {
  LoveClientCard,
  LoveFeaturedNote,
} from '@/components/home/love/love-cards'
import {
  featuredClientNote,
  railClientNotes,
} from '@/components/home/love/love-wall'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import TrackedLink from '@/components/tracked-link'

/**
 * #love: in their words. One pinned client note, then three more from three
 * different clients, each attributed. Phones swipe the three as a snap rail
 * (one note per screen); desktop shows them side by side. Still on purpose:
 * a quote you have to chase is a quote nobody reads. The full wall, with the
 * Instagram comments, lives on /wall-of-love.
 */
export default function HomeLove() {
  const { eyebrow, title, description } = HOMEPAGE_TESTIMONIALS

  return (
    <Section
      id="love"
      aria-labelledby="home-love-title"
      className="overflow-x-clip py-24 sm:py-32"
    >
      <Reveal>
        <SectionHeader
          id="home-love-title"
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
        />
      </Reveal>

      {featuredClientNote ? (
        <Reveal delay={80} className="mt-14 sm:mt-16">
          <LoveFeaturedNote note={featuredClientNote} />
        </Reveal>
      ) : null}

      <Reveal delay={120} className="mt-14 sm:mt-16">
        <ul
          aria-label="Client notes"
          className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {railClientNotes.map((note) => (
            <li
              key={note.key}
              className="w-[82%] shrink-0 snap-center sm:w-[46%] lg:w-auto"
            >
              <LoveClientCard note={note} />
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-10 flex justify-center sm:mt-12">
        <TrackedLink
          href="/wall-of-love"
          label="see the wall of love"
          location="homepage wall of love"
          className="group/love inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors duration-(--dur-ui) hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          See the Wall of Love
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-(--dur-ui) ease-(--ease-out) group-hover/love:translate-x-0.5"
          />
        </TrackedLink>
      </div>
    </Section>
  )
}
