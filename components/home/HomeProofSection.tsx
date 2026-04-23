import Link from 'next/link'

import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import {
  HOMEPAGE_CASE_STUDY_SLUGS,
  HOMEPAGE_CASE_STUDY_SUMMARIES,
  HOMEPAGE_PROOF,
} from '@/components/home/homepage-content'
import PixelishIcon from '@/components/pixelish/PixelishIcon'
import { CASE_STUDIES } from '@/lib/case-study-data'

const CASE_STUDY_ICONS: Record<string, string> = {
  'exquisite-dentistry': '/pixelish/emoji-happy.svg',
  'infobell-it': '/pixelish/device-monitor.svg',
  'sr4-partners': '/pixelish/briefcase.svg',
  'practice-transitions-institute': '/pixelish/document-letter.svg',
}

const HOMEPAGE_CASE_STUDIES = HOMEPAGE_CASE_STUDY_SLUGS.map((slug) =>
  CASE_STUDIES.find((study) => study.slug === slug),
)
  .filter((study): study is (typeof CASE_STUDIES)[number] => Boolean(study))
  .map((study) => ({
    business:
      study.slug === 'practice-transitions-institute' ? 'PTI' : study.client,
    category: study.category,
    location: study.location,
    slug: study.slug,
    description: HOMEPAGE_CASE_STUDY_SUMMARIES[study.slug] ?? study.description,
    hasExplainerVideo: Boolean(study.explainerVideo),
    iconSrc: CASE_STUDY_ICONS[study.slug] ?? '/pixelish/lens-plus.svg',
  }))

export default function HomeProofSection() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <CoreSectionHeading
            eyebrow={HOMEPAGE_PROOF.eyebrow}
            title={HOMEPAGE_PROOF.title}
            description={HOMEPAGE_PROOF.description}
            titleClassName="max-w-[11ch]"
            descriptionClassName="max-w-[40rem]"
          />

          <CoreActionLink
            href="/case-studies"
            label="see client results"
            location="homepage proof"
            variant="secondary"
          >
            {HOMEPAGE_PROOF.ctaLabel}
          </CoreActionLink>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {HOMEPAGE_CASE_STUDIES.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              data-home-proof-card={study.slug}
              className="border-t border-white/12 pt-5 transition-colors hover:text-white"
            >
              <PixelishIcon
                src={study.iconSrc}
                alt=""
                size={20}
                aria-hidden="true"
                className="h-[17px] w-[17px] opacity-80"
              />
              <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8f877b]">
                {study.category}
              </p>
              <h3 className="mt-4 font-sans text-[1.55rem] font-medium leading-[1.02] tracking-[-0.05em] text-[#f5f0e8]">
                {study.business}
              </h3>
              <p className="mt-3 max-w-[32rem] font-sans text-[1rem] leading-7 text-[#b8afa2]">
                {study.description}
              </p>
              <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8f877b]">
                {study.location}
                {study.hasExplainerVideo ? ' / video' : ''}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
