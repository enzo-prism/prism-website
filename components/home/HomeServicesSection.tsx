import {
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import {
  HOMEPAGE_SERVICE_ITEMS,
  HOMEPAGE_SERVICES,
} from '@/components/home/homepage-content'
import PixelishIcon from '@/components/pixelish/PixelishIcon'

export default function HomeServicesSection() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <CoreSectionHeading
          eyebrow={HOMEPAGE_SERVICES.eyebrow}
          title={HOMEPAGE_SERVICES.title}
          description={HOMEPAGE_SERVICES.description}
          titleClassName="max-w-[17ch] lg:max-w-[19ch]"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {HOMEPAGE_SERVICE_ITEMS.map((item) => (
            <article
              key={item.title}
              data-home-service-card={item.title}
              className="border-t border-white/12 pt-5"
            >
              <PixelishIcon
                src={item.iconSrc}
                alt=""
                size={20}
                aria-hidden="true"
                className="h-[17px] w-[17px] opacity-80"
              />
              <h3 className="mt-4 max-w-none text-balance font-sans text-[1.25rem] font-medium leading-[1.08] tracking-[-0.04em] text-[#f5f0e8]">
                {item.title}
              </h3>
              <p className="mt-3 font-sans text-[0.98rem] leading-7 text-[#b8afa2]">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-12 border-t border-white/12 pt-6 font-sans text-[1rem] leading-7 text-[#d0c8bc]">
          {HOMEPAGE_SERVICES.closingLine}
        </p>
      </div>
    </section>
  )
}
