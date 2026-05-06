import CaseStudyCard from '@/components/case-study-card'
import HomeSectionHeading from '@/components/home/HomeSectionHeading'
import { HOMEPAGE_CASE_STUDY_SLUGS } from '@/components/home/homepage-content'
import TrackedLink from '@/components/tracked-link'
import { CASE_STUDIES } from '@/lib/case-study-data'

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
    hasExplainerVideo: Boolean(study.explainerVideo),
    clientLogo: study.clientLogo,
    description: study.description,
  }))

export default function HomeCaseStudiesSection() {
  return (
    <section className="bg-[#fcfcfb] px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <HomeSectionHeading
            eyebrow="proven results"
            title="20+ businesses, one growth ecosystem"
            description="We've implemented the same Prism system across launches, rebuilds, and long-term growth partnerships."
            className="sm:max-w-3xl"
          />
          <TrackedLink
            href="/case-studies"
            label="view all case studies"
            location="homepage case studies"
            className="inline-flex w-full items-center justify-center rounded-2xl border border-black/10 bg-[#ffffff] px-5 py-3 text-sm font-semibold text-[rgba(15,23,42,0.64)] transition-colors hover:bg-[#f8f6f0] hover:text-[#0a0a0b] sm:w-auto"
          >
            All case studies
          </TrackedLink>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {HOMEPAGE_CASE_STUDIES.map((study) => (
            <CaseStudyCard
              key={study.slug}
              business={study.business}
              category={study.category}
              location={study.location}
              slug={study.slug}
              hasExplainerVideo={study.hasExplainerVideo}
              tone="light"
              clientLogo={study.clientLogo}
              description={study.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
