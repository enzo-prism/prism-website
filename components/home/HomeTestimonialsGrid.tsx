import HomeSectionHeading from '@/components/home/HomeSectionHeading'
import { HOMEPAGE_TESTIMONIALS } from '@/components/home/homepage-content'
import TrackedLink from '@/components/tracked-link'

export default function HomeTestimonialsGrid() {
  return (
    <section className="bg-[#f7f7f4] px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-5 text-center">
          <HomeSectionHeading
            eyebrow="wall of love"
            title="Trusted by ambitious founders"
            description="A lighter snapshot of the love Prism keeps getting from clients and the wider community."
            align="center"
            className="items-center"
          />
          <TrackedLink
            href="/wall-of-love"
            label="visit wall of love"
            location="homepage testimonials"
            className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-[#ffffff] px-5 py-3 text-sm font-semibold text-[rgba(15,23,42,0.64)] transition-colors hover:bg-[#f8f6f0] hover:text-[#0a0a0b]"
          >
            View the wall of love
          </TrackedLink>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {HOMEPAGE_TESTIMONIALS.map((quote) => (
            <article
              key={quote.id}
              className="rounded-[1.5rem] border border-black/8 bg-[#ffffff] p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)]"
            >
              <div className="flex gap-1 text-[#d4d4d8]" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={`${quote.id}-${index}`}>★</span>
                ))}
              </div>
              <p className="mt-5 text-pretty text-[1.02rem] leading-8 text-[rgba(15,23,42,0.68)]">
                “{quote.text}”
              </p>
              <div className="mt-6 border-t border-black/8 pt-4">
                <p className="text-sm font-semibold text-[#0a0a0b]">
                  {quote.client}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[rgba(15,23,42,0.36)] font-mono">
                  {quote.company}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
