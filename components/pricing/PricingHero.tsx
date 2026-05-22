import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteHeroFrameClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import {
  CANONICAL_PRICING_OFFERS,
  PRICING_PRIMARY_CTA,
  PRICING_SECONDARY_CTA,
} from '@/lib/pricing-model'

const heroSignals = [
  CANONICAL_PRICING_OFFERS.growth_dashboard,
  CANONICAL_PRICING_OFFERS.light_audit,
  CANONICAL_PRICING_OFFERS.deep_growth_audit,
] as const

export default function PricingHero() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <div className={coreRouteHeroFrameClassName}>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.06),transparent_32%),linear-gradient(135deg,rgba(0,0,0,0.14),rgba(0,0,0,0.5))]"
          />

          <div className="relative z-10 grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-end lg:px-12 lg:py-16">
            <CoreSectionHeading
              eyebrow="Pricing"
              title="A clearer way to invest in growth."
              description="Create your free Prism Growth Dashboard. Prism will identify your clearest opportunities, then recommend the right next step: Light Audit, Deep Growth Audit, focused sprint, or ongoing growth partner."
              as="h1"
              variant="hero"
              titleClassName="max-w-[9ch]"
              descriptionClassName="lg:max-w-[37rem]"
            />

            <div className="space-y-4 border-t border-white/12 pt-5 lg:border-t-0 lg:border-l lg:pl-10">
              {heroSignals.map((offer) => (
                <div
                  key={offer.offerId}
                  className="flex items-start justify-between gap-5 border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="font-sans text-[1rem] leading-7 text-[#f5f0e8]">
                      {offer.name}
                    </p>
                    <p className="mt-1 max-w-[24rem] font-sans text-[0.92rem] leading-6 text-[#8f877b]">
                      {offer.description}
                    </p>
                  </div>
                  <p className="shrink-0 pt-1 text-right font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#b8afa2]">
                    {offer.priceLabel}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 border-t border-white/12 px-6 py-6 sm:px-10 lg:px-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-5">
              <CoreActionLink href={PRICING_PRIMARY_CTA.href} variant="heroPrimary">
                {PRICING_PRIMARY_CTA.label}
              </CoreActionLink>
              <CoreActionLink
                href={PRICING_SECONDARY_CTA.href}
                variant="heroSecondary"
              >
                {PRICING_SECONDARY_CTA.label}
              </CoreActionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
