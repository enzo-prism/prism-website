import { ArrowUpRight, Quote as QuoteIcon } from 'lucide-react'

import { HOMEPAGE_TESTIMONIALS } from '@/components/home/homepage-content'
import { Marquee } from '@/components/prism/marquee'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import TrackedLink from '@/components/tracked-link'

function initialsOf(name: string) {
  const parts = name
    .replace(/^Dr\.\s+/, '')
    .split(/\s+/)
    .filter(Boolean)
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

/** Named client quotes up front, community comments on Prism content below. */
export default function HomeTestimonials() {
  const { clientQuotes, communityQuotes } = HOMEPAGE_TESTIMONIALS

  return (
    <Section
      aria-labelledby="home-testimonials-title"
      bleed
      className="overflow-hidden"
    >
      <div className="prism-container">
        <Reveal>
          <SectionHeader
            id="home-testimonials-title"
            eyebrow={HOMEPAGE_TESTIMONIALS.eyebrow}
            title={HOMEPAGE_TESTIMONIALS.title}
            description={HOMEPAGE_TESTIMONIALS.description}
            align="center"
          />
        </Reveal>

        <ul className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-4">
          {clientQuotes.map((quote, index) => (
            <li
              key={quote.id}
              className={
                index > 3
                  ? 'mb-4 hidden break-inside-avoid sm:block'
                  : 'mb-4 break-inside-avoid'
              }
            >
              <Reveal delay={(index % 4) * 70}>
                <figure className="relative rounded-2xl border border-white/[0.08] bg-card p-6 transition-colors duration-300 hover:border-white/[0.16]">
                  <QuoteIcon
                    aria-hidden="true"
                    className="size-5 text-subtle"
                  />
                  <blockquote className="mt-4 text-pretty text-[17px] leading-relaxed tracking-[-0.01em] text-foreground">
                    “{quote.text}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full border border-white/10 bg-gradient-to-br from-white/15 to-white/[0.03] text-[12px] font-semibold text-foreground">
                      {initialsOf(quote.client)}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {quote.client}
                      </span>
                      <span className="text-[12px] text-subtle">
                        Website client
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <p className="prism-container text-center text-[13px] text-subtle">
          And from the community, in the comments on Prism’s own posts:
        </p>
        <Marquee
          duration={70}
          gap="1rem"
          className="mt-6"
          label="Community comments on Prism content"
        >
          {communityQuotes.map((quote) => (
            <figure
              key={quote.id}
              className="w-[300px] shrink-0 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:w-[360px]"
            >
              <blockquote className="text-pretty text-[15px] leading-relaxed text-foreground/90">
                “{quote.text}”
              </blockquote>
              <figcaption className="mt-3 font-mono text-[11px] text-subtle">
                @{quote.client} on Instagram
              </figcaption>
            </figure>
          ))}
        </Marquee>
        <div className="mt-10 flex justify-center">
          <TrackedLink
            href="/wall-of-love"
            label="see the wall of love"
            location="homepage testimonials"
            className="group/love inline-flex h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 text-sm font-medium text-foreground transition-colors hover:border-white/25 hover:bg-white/[0.06] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            See the Wall of Love
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover/love:-translate-y-0.5 group-hover/love:translate-x-0.5"
            />
          </TrackedLink>
        </div>
      </div>
    </Section>
  )
}
