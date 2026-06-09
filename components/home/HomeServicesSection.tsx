import {
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteIntroBandClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import {
  HOMEPAGE_SERVICE_ITEMS,
  HOMEPAGE_SERVICES,
} from '@/components/home/homepage-content'
import HomeReveal from '@/components/home/HomeReveal'
import HomeSystemGrid from '@/components/home/HomeSystemGrid'

export default function HomeServicesSection() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <HomeReveal className={coreRouteIntroBandClassName}>
          <CoreSectionHeading
            eyebrow={HOMEPAGE_SERVICES.eyebrow}
            title={HOMEPAGE_SERVICES.title}
            description={HOMEPAGE_SERVICES.description || undefined}
            titleClassName="max-w-[15ch] lg:max-w-[17ch]"
            descriptionClassName="max-w-[44rem]"
          />
        </HomeReveal>

        <HomeReveal delay={120} className="mt-10">
          <HomeSystemGrid items={HOMEPAGE_SERVICE_ITEMS} />
        </HomeReveal>
      </div>
    </section>
  )
}
