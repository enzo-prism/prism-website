import {
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteIntroBandClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import {
  HOMEPAGE_FIT,
  HOMEPAGE_FIT_AUDIENCES,
} from '@/components/home/homepage-content'
import HomeReveal from '@/components/home/HomeReveal'
import PixelishIcon from '@/components/pixelish/PixelishIcon'

export default function HomeFitSection() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <HomeReveal className={coreRouteIntroBandClassName}>
          <CoreSectionHeading
            eyebrow={HOMEPAGE_FIT.eyebrow}
            title={HOMEPAGE_FIT.title}
            description={HOMEPAGE_FIT.description}
            titleClassName="max-w-[18ch] lg:max-w-[20ch]"
            descriptionClassName="max-w-[38rem]"
          />
        </HomeReveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {HOMEPAGE_FIT_AUDIENCES.map((audience, index) => (
            <HomeReveal key={audience.title} delay={index * 90}>
              <article
                data-home-fit-card={audience.title}
                className="group relative h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-5 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#d8bc79]/35 hover:bg-white/[0.045] hover:shadow-[0_30px_90px_-65px_rgba(216,188,121,0.65)] motion-reduce:transition-none sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#d8bc79]/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
                />

                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/40 transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-[#d8bc79]/40 group-hover:shadow-[0_0_26px_-14px_rgba(216,188,121,0.9)] motion-reduce:transition-none">
                  <PixelishIcon
                    src={audience.iconSrc}
                    alt=""
                    size={18}
                    aria-hidden="true"
                    className="h-4 w-4 opacity-80"
                  />
                </span>

                <h3 className="text-ui-tight mt-5 max-w-[18ch] font-sans text-[1.18rem] font-medium leading-[1.1] tracking-[-0.035em] text-[#f5f0e8]">
                  {audience.title}
                </h3>
                <p className="mt-3 text-pretty font-sans text-[0.94rem] leading-6 text-[#a8a092]">
                  {audience.description}
                </p>
              </article>
            </HomeReveal>
          ))}
        </div>

        <HomeReveal delay={280}>
          <p className="mt-8 border-t border-white/10 pt-5 font-sans text-[0.92rem] leading-6 text-[#8f877b]">
            {HOMEPAGE_FIT.notFitLine}
          </p>
        </HomeReveal>
      </div>
    </section>
  )
}
