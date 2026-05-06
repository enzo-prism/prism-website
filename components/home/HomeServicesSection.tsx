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
import PixelishIcon from '@/components/pixelish/PixelishIcon'

export default function HomeServicesSection() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <div className={coreRouteIntroBandClassName}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <CoreSectionHeading
              title={HOMEPAGE_SERVICES.title}
              description={HOMEPAGE_SERVICES.description || undefined}
              titleClassName="max-w-[17ch] lg:max-w-[19ch]"
            />

            {HOMEPAGE_SERVICES.closingLine ? (
              <p className="max-w-[31rem] font-sans text-[1rem] leading-7 text-[#d0c8bc] sm:justify-self-end">
                {HOMEPAGE_SERVICES.closingLine}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-10">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {HOMEPAGE_SERVICE_ITEMS.map((item) => (
              <article
                key={item.title}
                data-home-service-card={item.title}
                className="rounded-[1.15rem] border border-white/10 bg-black/20 p-4 transition-[background-color,border-color] hover:border-white/18 hover:bg-white/[0.035]"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.03]">
                    <PixelishIcon
                      src={item.iconSrc}
                      alt=""
                      size={18}
                      aria-hidden="true"
                      className="h-4 w-4 opacity-80"
                    />
                  </span>
                  <div className="min-w-0">
                    <h3 className="max-w-none text-balance font-sans text-[1.05rem] font-medium leading-[1.08] tracking-[-0.035em] text-[#f5f0e8]">
                      {item.title}
                    </h3>
                    {item.description ? (
                      <p className="mt-2 font-sans text-[0.9rem] leading-6 text-[#b8afa2]">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
