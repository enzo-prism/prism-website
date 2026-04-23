import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteHeroFrameClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'

export default function PricingHero() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <div className={coreRouteHeroFrameClassName}>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.06),transparent_32%),linear-gradient(135deg,rgba(0,0,0,0.14),rgba(0,0,0,0.5))]"
          />

          <div className="relative z-10 grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:px-12 lg:py-16">
            <CoreSectionHeading
              eyebrow="pricing"
              title="Simple pricing for teams that want a clearer growth path."
              description="Website Overhaul is $1,000 one-time. Growth Partnership is $2,000/month. If you want guidance before choosing, start with the free expert audit."
              as="h1"
              variant="hero"
              titleClassName="max-w-[9.8ch]"
            />

            <div className="space-y-5 border-t border-white/12 pt-5 lg:border-t-0 lg:border-l lg:pl-10">
              <div className="space-y-2">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8f877b]">
                  Core offers
                </p>
                <p className="font-sans text-[1rem] leading-7 text-[#f5f0e8]">
                  Website Overhaul / $1,000 one-time
                </p>
                <p className="font-sans text-[1rem] leading-7 text-[#f5f0e8]">
                  Growth Partnership / $2,000 per month
                </p>
              </div>

              <div className="space-y-2 border-t border-white/12 pt-5">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8f877b]">
                  Starting point
                </p>
                <p className="font-sans text-[1rem] leading-7 text-[#b8afa2]">
                  Start with the free audit if you want the clearest next move
                  before committing.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 border-t border-white/12 px-6 py-6 sm:px-10 lg:px-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
              <CoreActionLink href="#plans">See plans</CoreActionLink>
              <CoreActionLink href="/get-started#book-call" variant="secondary">
                Book a strategy call
              </CoreActionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
