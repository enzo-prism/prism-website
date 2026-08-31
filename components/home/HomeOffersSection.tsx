import {
  CoreActionLink,
  coreRouteContainerClassName,
  coreRoutePanelClassName,
  coreRouteSectionClassName,
  CoreSectionHeading,
} from '@/components/core-route/CoreRoutePrimitives'
import HomeReveal from '@/components/home/HomeReveal'
import { WEBSITE_START_CTA } from '@/lib/pricing-model'
import { PRISM_SERVICES } from '@/lib/services'
import { cn } from '@/lib/utils'

export default function HomeOffersSection() {
  return (
    <section id="offers" className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <HomeReveal>
          <CoreSectionHeading
            eyebrow="What Prism does"
            title="Website. Content. Ads."
            description="Three jobs that grow a practice. Start with the website, then keep the content and ads running so the phone stays busy."
            titleClassName="max-w-[18ch]"
          />
        </HomeReveal>

        <div className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {PRISM_SERVICES.map((service, index) => {
            const isLead = service.id === 'website'
            const primaryCta =
              service.id === 'website' ? WEBSITE_START_CTA : service.primaryCta

            return (
              <HomeReveal
                key={service.id}
                delay={80 + index * 60}
                className="h-full"
              >
                <div
                  className={cn(
                    coreRoutePanelClassName,
                    'flex h-full flex-col gap-5 p-6 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#d8bc79]/35 hover:shadow-[0_28px_60px_-40px_rgba(216,188,121,0.5)] motion-reduce:transition-none sm:p-8',
                    isLead && 'border-white/20 bg-black/45',
                  )}
                >
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7d766a]">
                    {`0${index + 1} · ${service.name}`}
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-sans text-[1.6rem] font-medium leading-tight tracking-[-0.02em] text-[#f5f0e8]">
                      {service.homeTitle}
                    </h3>
                    <p className="text-pretty font-sans text-[0.96rem] leading-7 text-[#b8afa2]">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-col gap-3 pt-2">
                    <CoreActionLink
                      href={primaryCta.href}
                      target={
                        primaryCta.href.startsWith('/') ? undefined : '_blank'
                      }
                      rel={
                        primaryCta.href.startsWith('/')
                          ? undefined
                          : 'noopener noreferrer'
                      }
                      label={primaryCta.label.toLowerCase()}
                      location={`homepage offers · ${service.name}`}
                      variant="primary"
                    >
                      {primaryCta.label}
                    </CoreActionLink>
                    <CoreActionLink
                      href={service.href}
                      label={service.homeCta.toLowerCase()}
                      location={`homepage offers · explore ${service.name}`}
                      variant="primary"
                      className="border-transparent text-[#8f877b] hover:border-[#f5f0e8] hover:text-[#f5f0e8]"
                    >
                      {service.homeCta}
                    </CoreActionLink>
                  </div>
                </div>
              </HomeReveal>
            )
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-pretty font-sans text-[0.96rem] leading-7 text-[#b8afa2]">
            Dental OS and Prism Infinity package these services for practices
            that want the whole system running.{' '}
            <CoreActionLink
              href="/pricing"
              label="see packaged offers"
              location="homepage offers · packaged"
              variant="primary"
              className="inline-flex min-h-0 border-transparent pb-0 text-[0.96rem] font-medium normal-case tracking-normal text-[#f5f0e8]"
            >
              See packaged offers
            </CoreActionLink>
            . Not ready to buy? Start free.
          </p>
          <CoreActionLink
            href="/get-started"
            label="get started free"
            location="homepage offers · start free"
            variant="primary"
          >
            Get started free
          </CoreActionLink>
        </div>
      </div>
    </section>
  )
}
