import { ArrowRight } from 'lucide-react'

import { HOMEPAGE_TESTIMONIALS } from '@/components/home/homepage-content'
import { LoveCard, LoveFeaturedNote } from '@/components/home/love/love-cards'
import {
  featuredClientNote,
  loveColumns,
} from '@/components/home/love/love-wall'
import styles from '@/components/home/love/love.module.css'
import { InlineWaitlistCta } from '@/components/prism/inline-waitlist-cta'
import { Marquee } from '@/components/prism/marquee'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import TrackedLink from '@/components/tracked-link'
import { cn } from '@/lib/utils'

/** Column visibility: two columns on phones and tablets, three on desktop. */
const COLUMN_VISIBILITY = ['', '', 'hidden lg:block'] as const

/**
 * #love: the wall of love. A pinned client note, then a dense wall of client
 * notes and Instagram comments drifting in three columns (alternating
 * directions and speeds), then the waitlist invitation and the way to the
 * full wall.
 * Server component; the only motion is the CSS marquee, which is static under
 * reduced motion and pauses on hover.
 */
export default function HomeLove() {
  const { eyebrow, title, description } = HOMEPAGE_TESTIMONIALS

  return (
    <Section
      id="love"
      aria-labelledby="home-love-title"
      className="overflow-hidden py-24 sm:py-32"
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

      <Reveal delay={120} className="mt-10 sm:mt-12">
        <div
          role="region"
          aria-label="Client notes and comments on Prism’s Instagram posts"
          className={cn(styles.window, 'mask-fade-y')}
        >
          <div
            className={cn(
              styles.vignette,
              'grid h-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3',
            )}
          >
            {loveColumns.map((column, index) => (
              <div
                key={index}
                className={cn(styles.column, COLUMN_VISIBILITY[index])}
              >
                <Marquee
                  vertical
                  fade={false}
                  duration={column.duration}
                  reverse={column.reverse}
                  gap="1rem"
                  className="h-full"
                >
                  {column.items.map((item) => (
                    <LoveCard key={item.key} item={item} />
                  ))}
                </Marquee>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-12 flex flex-col items-center gap-4 sm:mt-14">
        <InlineWaitlistCta
          location="homepage wall of love"
          title={HOMEPAGE_TESTIMONIALS.nextLine}
        />
        <TrackedLink
          href="/wall-of-love"
          label="see the wall of love"
          location="homepage wall of love"
          className="group/love inline-flex min-h-10 items-center gap-1.5 rounded-full px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          See the Wall of Love
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover/love:translate-x-0.5"
          />
        </TrackedLink>
      </div>
    </Section>
  )
}
