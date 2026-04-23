import {
  CoreSectionHeading,
  coreRouteContainedSectionClassName,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { HOMEPAGE_FIT } from '@/components/home/homepage-content'
import PixelishIcon from '@/components/pixelish/PixelishIcon'

export default function HomeFitSection() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <div className={coreRouteContainedSectionClassName}>
          <CoreSectionHeading
            title={HOMEPAGE_FIT.title}
            titleClassName="max-w-[15ch] lg:max-w-[17ch]"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[1.6rem] border border-white/10 bg-black/20 p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <PixelishIcon
                  src="/pixelish/circle-checkmark.svg"
                  alt=""
                  size={20}
                  aria-hidden="true"
                  className="h-[17px] w-[17px] opacity-80"
                />
                <h3 className="font-sans text-[1.35rem] font-medium tracking-[-0.04em] text-[#f5f0e8]">
                  {HOMEPAGE_FIT.fitHeading}
                </h3>
              </div>

              <ul className="mt-6 space-y-4">
                {HOMEPAGE_FIT.fitItems.map((item) => (
                  <li
                    key={item}
                    className="border-t border-white/12 pt-4 font-sans text-[0.98rem] leading-7 text-[#b8afa2]"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-6 font-sans text-[0.94rem] leading-7 text-[#948b80]">
                {HOMEPAGE_FIT.fitClosing}
              </p>
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
                <h3 className="font-sans text-[1.35rem] font-medium tracking-[-0.04em] text-[#f5f0e8]">
                  {HOMEPAGE_FIT.notFitHeading}
                </h3>
              </div>

              <ul className="mt-6 space-y-4">
                {HOMEPAGE_FIT.notFitItems.map((item) => (
                  <li
                    key={item}
                    className="border-t border-white/12 pt-4 font-sans text-[0.98rem] leading-7 text-[#b8afa2]"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-6 font-sans text-[0.94rem] leading-7 text-[#948b80]">
                {HOMEPAGE_FIT.notFitClosing}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
