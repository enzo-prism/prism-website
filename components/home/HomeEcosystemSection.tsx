import { CoreSectionHeading } from '@/components/core-route/CoreRoutePrimitives'
import PixelishIcon from '@/components/pixelish/PixelishIcon'
import {
  HOMEPAGE_CAPABILITIES,
  HOMEPAGE_SYSTEM_STEPS,
} from '@/components/home/homepage-content'

const CAPABILITY_ICONS: Record<string, string> = {
  Websites: '/pixelish/browser.svg',
  'Search visibility': '/pixelish/lens.svg',
  Content: '/pixelish/document-letter.svg',
  'Paid acquisition': '/pixelish/device-radio.svg',
  Analytics: '/pixelish/bar-chart-average.svg',
  'AI workflows': '/pixelish/robot.svg',
}

export default function HomeEcosystemSection() {
  return (
    <section className="border-b border-white/12 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:items-end">
          <CoreSectionHeading
            eyebrow="growth ecosystem"
            title="Everything you need to grow. One system."
            description="Strategy. Execution. Feedback loops."
          />

          <p className="max-w-[36rem] font-sans text-[1rem] leading-7 text-[#9e958a] sm:leading-8">
            Website, content, SEO, ads, AI. All connected.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="space-y-8">
            {HOMEPAGE_SYSTEM_STEPS.map((step, index) => (
              <article
                key={step.title}
                className="border-t border-white/12 pt-5 first:pt-0 first:border-t-0"
              >
                <p
                  aria-hidden="true"
                  className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8f877b]"
                >
                  0{index + 1}
                </p>
                <h3 className="mt-4 max-w-[18ch] font-sans text-[1.65rem] font-medium leading-[1.02] tracking-[-0.05em] text-[#f5f0e8]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[34rem] font-sans text-[1rem] leading-7 text-[#b8afa2]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {HOMEPAGE_CAPABILITIES.map((capability) => (
              <article
                key={capability.title}
                data-home-capability-card={capability.title}
                className="border-t border-white/12 pt-4"
              >
                <PixelishIcon
                  src={
                    CAPABILITY_ICONS[capability.title] ??
                    '/pixelish/lens-plus.svg'
                  }
                  alt=""
                  size={20}
                  aria-hidden="true"
                  className="h-[17px] w-[17px] opacity-80"
                />
                <h3 className="mt-3 font-sans text-[1.2rem] font-medium tracking-[-0.04em] text-[#f5f0e8]">
                  {capability.title}
                </h3>
                <p className="mt-3 font-sans text-[0.97rem] leading-7 text-[#b8afa2]">
                  {capability.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
