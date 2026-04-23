import {
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
  coreRouteSplitLayoutClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import {
  HOMEPAGE_DIFFERENTIATORS,
  HOMEPAGE_FIT,
  HOMEPAGE_WHY_PRISM,
} from '@/components/home/homepage-content'
import PixelishIcon from '@/components/pixelish/PixelishIcon'

export default function HomeWhyPrismSection() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <div className={coreRouteSplitLayoutClassName}>
          <CoreSectionHeading
            title={HOMEPAGE_WHY_PRISM.title}
            titleClassName="max-w-[20ch] lg:max-w-[22ch]"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {HOMEPAGE_DIFFERENTIATORS.map((item) => (
              <article
                key={item.title}
                className="border-t border-white/12 pt-5 last:sm:col-span-2"
              >
                <PixelishIcon
                  src={item.iconSrc}
                  alt=""
                  size={18}
                  aria-hidden="true"
                  className="h-[15px] w-[15px] opacity-80"
                />
                <h3 className="mt-4 max-w-[18ch] font-sans text-[1.22rem] font-medium tracking-[-0.04em] text-[#f5f0e8]">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-[0.98rem] leading-7 text-[#b8afa2]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[1.6rem] border border-white/10 bg-white/[0.025] p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <PixelishIcon
                src="/pixelish/circle-checkmark.svg"
                alt=""
                size={20}
                aria-hidden="true"
                className="h-[17px] w-[17px] opacity-80"
              />
              <h3 className="font-sans text-[1.22rem] font-medium tracking-[-0.04em] text-[#f5f0e8]">
                {HOMEPAGE_FIT.fitHeading}
              </h3>
            </div>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {HOMEPAGE_FIT.fitItems.map((item) => (
                <li
                  key={item}
                  className="border-t border-white/10 pt-3 font-sans text-[0.94rem] leading-6 text-[#b8afa2]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[1.6rem] border border-white/10 bg-black/20 p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <PixelishIcon
                src="/pixelish/circle-exclamation.svg"
                alt=""
                size={20}
                aria-hidden="true"
                className="h-[17px] w-[17px] opacity-80"
              />
              <h3 className="font-sans text-[1.22rem] font-medium tracking-[-0.04em] text-[#f5f0e8]">
                {HOMEPAGE_FIT.notFitHeading}
              </h3>
            </div>

            <ul className="mt-5 grid gap-3">
              {HOMEPAGE_FIT.notFitItems.map((item) => (
                <li
                  key={item}
                  className="border-t border-white/10 pt-3 font-sans text-[0.94rem] leading-6 text-[#b8afa2]"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-white/10 pt-4 font-sans text-[0.92rem] leading-6 text-[#948b80]">
              {HOMEPAGE_FIT.notFitClosing}
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
