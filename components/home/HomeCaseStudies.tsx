import HomeCaseStudyTabs, {
  type HomeCaseStudyTab,
} from '@/components/home/HomeCaseStudyTabs'
import { HOMEPAGE_CASE_STUDIES } from '@/components/home/homepage-content'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { CASE_STUDIES } from '@/lib/case-study-data'

const TAB_LABELS: Record<string, string> = {
  'dr-christopher-wong': 'Dr. Wong',
  'belize-kids-foundation': 'Belize Kids',
  'exquisite-dentistry': 'Exquisite Dentistry',
  'olympic-bootworks': 'Olympic Bootworks',
}

const VIDEOS: Record<string, HomeCaseStudyTab['video']> = {
  'dr-christopher-wong': {
    youtubeId: 'HrksJeYb02Q',
    label: 'Watch Dr. Wong’s interview',
    description: 'Dr. Christopher B. Wong in conversation with Prism.',
  },
}

function hostOf(url?: string) {
  if (!url) return undefined
  try {
    return new URL(url).host.replace(/^www\./, '')
  } catch {
    return undefined
  }
}

const TABS: HomeCaseStudyTab[] = HOMEPAGE_CASE_STUDIES.slugs.flatMap((slug) => {
  const study = CASE_STUDIES.find((item) => item.slug === slug)
  if (!study) return []
  const metric = study.structured?.results?.[0]
  return [
    {
      slug,
      tabLabel: TAB_LABELS[slug] ?? study.client,
      client: study.client,
      industry: study.industry,
      location: study.location,
      href: `/case-studies/${slug}`,
      url: hostOf(study.websiteUrl),
      desktopImage: `/case-studies/${slug}-home-desktop.jpg`,
      mobileImage: `/case-studies/${slug}-home-mobile.jpg`,
      focus: study.structured?.focus,
      scope: study.structured?.scope,
      result: study.structured?.story?.result,
      metric:
        metric && metric.sourceName && metric.dateRange
          ? {
              value: metric.value,
              label: metric.label,
              source: metric.sourceName,
              dateRange: metric.dateRange,
            }
          : undefined,
      video: VIDEOS[slug],
    },
  ]
})

export default function HomeCaseStudies() {
  return (
    <Section aria-labelledby="home-case-studies-title">
      <Reveal>
        <SectionHeader
          id="home-case-studies-title"
          eyebrow={HOMEPAGE_CASE_STUDIES.eyebrow}
          title={HOMEPAGE_CASE_STUDIES.title}
          description={HOMEPAGE_CASE_STUDIES.description}
        />
      </Reveal>
      <Reveal delay={100}>
        <HomeCaseStudyTabs tabs={TABS} />
      </Reveal>
    </Section>
  )
}
