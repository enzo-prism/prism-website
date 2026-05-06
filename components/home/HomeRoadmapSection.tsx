import TrackedLink from '@/components/tracked-link'
import { HOMEPAGE_ROADMAP_PHASES } from '@/components/home/homepage-content'
import ScalingRoadmapForm from '@/components/forms/ScalingRoadmapForm'

export default function HomeRoadmapSection() {
  return (
    <section className="bg-[#fcfcfb] px-4 pb-24 pt-20 sm:px-6 sm:pb-28 sm:pt-24">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-black/8 bg-[#ffffff] shadow-[0_18px_60px_rgba(15,23,42,0.06)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="border-b border-black/8 px-8 py-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[rgba(15,23,42,0.38)] font-mono">
            custom framework • 2026
          </p>
          <h2 className="mt-5 max-w-[10ch] text-balance text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[#0a0a0b]">
            Online Presence Scaling Roadmap
          </h2>
          <p className="mt-5 max-w-2xl text-balance text-base leading-8 text-[rgba(15,23,42,0.6)]">
            A clear sequence of the moves Prism makes to grow visibility,
            conversions, and lifetime value.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {HOMEPAGE_ROADMAP_PHASES.map((phase, index) => (
              <div
                key={phase.title}
                className="rounded-[1.25rem] border border-black/8 bg-[#fcfcfb] p-4"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[rgba(15,23,42,0.3)] font-mono">
                  Phase {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-[#0a0a0b]">
                  {phase.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[rgba(15,23,42,0.58)]">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 py-8 lg:px-10 lg:py-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[rgba(15,23,42,0.38)] font-mono">
            get the roadmap
          </p>
          <p className="mt-5 max-w-md text-balance text-base leading-8 text-[rgba(15,23,42,0.6)]">
            One email with the full framework and the steps to execute it.
          </p>
          <div className="mt-8">
            <ScalingRoadmapForm />
          </div>
          <div className="mt-8 border-t border-black/8 pt-6">
            <p className="text-sm text-[rgba(15,23,42,0.48)]">
              Or book a 30-minute strategy call:
            </p>
            <TrackedLink
              href="/get-started#book-call"
              label="book a 30-min call"
              location="homepage roadmap"
              className="mt-4 inline-flex items-center justify-center rounded-2xl border border-black/10 bg-[#fcfcfb] px-5 py-3 text-sm font-semibold text-[rgba(15,23,42,0.64)] transition-colors hover:text-[#0a0a0b]"
            >
              Book a 30-min call
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  )
}
