import { notFound } from 'next/navigation'
import { Archive, BadgeCheck, Briefcase, MapPin, Play } from 'lucide-react'

import CaseStudyExplainerVideo from '@/components/case-studies/CaseStudyExplainerVideo'
import CaseStudyMoreWork from '@/components/case-studies/CaseStudyMoreWork'
import CaseStudyOutcomesGrid from '@/components/case-studies/CaseStudyOutcomesGrid'
import CaseStudySnapshotStats, {
  type SnapshotFact,
} from '@/components/case-studies/CaseStudySnapshotStats'
import CaseStudyStory from '@/components/case-studies/CaseStudyStory'
import CaseStudyTwoProblems from '@/components/case-studies/CaseStudyTwoProblems'
import CaseStudyVisualHero, {
  type CaseStudyHeroBadge,
} from '@/components/case-studies/CaseStudyVisualHero'
import CaseStudyVoice from '@/components/case-studies/CaseStudyVoice'
import {
  getCaseStudyQuotes,
  getCaseStudyVideo,
  summarizeServices,
} from '@/components/case-studies/case-study-proof'
import { CaseStudyWorkHighlights } from '@/components/case-studies/CaseStudyWorkHighlights'
import {
  getDesktopShot,
  getHostLabel,
  getMobileShot,
  getVerifiedMetric,
  isFormerClient,
} from '@/components/case-studies/work-index'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { CaseStudySchema } from '@/components/schema-markup'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { getCaseStudyFraming } from '@/lib/case-study-framing'
import {
  getCaseStudyWorkProfile,
  normalizeCaseStudyWorkProfile,
} from '@/lib/case-study-work-highlights'

type MinimalCaseStudyPageProps = {
  slug: string
}

/**
 * Shared case study template (23 pages). A launch page for the client: the
 * live site in the hero, a stats band of verified metrics or delivered-work
 * facts, the client's own voice when a verified video or quote exists, the
 * same two problems every client shares (be found, be chosen), the
 * published story, outcomes, the work highlights, three more current-client
 * stories, and the waitlist close.
 */
export default function MinimalCaseStudyPage({ slug }: MinimalCaseStudyPageProps) {
  const caseStudy = CASE_STUDIES.find((item) => item.slug === slug)

  if (!caseStudy) {
    notFound()
  }

  const canonicalUrl =
    caseStudy.structured?.canonicalUrl ??
    `https://www.design-prism.com/case-studies/${caseStudy.slug}`
  const websiteUrl = caseStudy.websiteUrl
  const websiteHost = getHostLabel(websiteUrl)
  const results = caseStudy.structured?.results ?? []
  const metric = getVerifiedMetric(caseStudy)
  const story = caseStudy.structured?.story
  const outcomes = caseStudy.structured?.outcomes ?? []
  const archived = isFormerClient(caseStudy.slug)
  const workProfile = normalizeCaseStudyWorkProfile(getCaseStudyWorkProfile(slug))
  const video = getCaseStudyVideo(caseStudy)
  const quotes = getCaseStudyQuotes(caseStudy.slug)
  // Former clients keep their archive story but are not framed as proof.
  const framing = archived ? undefined : getCaseStudyFraming(caseStudy.slug)
  // Only a search metric is a receipt for "be found."
  const foundMetric = metric && /search/i.test(metric.label) ? metric : undefined

  const resultsSentence =
    results.length > 0
      ? ` Measured results: ${results
          .map((item) => `${item.value} ${item.label}`)
          .join('; ')}.`
      : ''
  const schemaDescription = `Prism case study for ${caseStudy.client} featuring the live website plus the services and tech stack used for the engagement.${resultsSentence}`
  const schemaOutcome =
    results.length > 0
      ? results
          .map((item) => `${item.value} ${item.label}. Source: ${item.detail}`)
          .join(' ')
      : `Live website, service list, and tech stack overview for ${caseStudy.client}.`

  const desktopShot = getDesktopShot(slug)
  const mobileShot = getMobileShot(slug)
  const trackedLocation = `${slug} case study`

  const badges: CaseStudyHeroBadge[] = [
    { label: caseStudy.industry, icon: <Briefcase aria-hidden="true" /> },
    { label: caseStudy.location, icon: <MapPin aria-hidden="true" /> },
    ...(metric
      ? [{ label: 'Verified result', icon: <BadgeCheck aria-hidden="true" /> }]
      : []),
    ...(video
      ? [
          {
            label: video.kind === 'Interview' ? 'Client interview' : 'Client video',
            icon: <Play aria-hidden="true" />,
          },
        ]
      : []),
    ...(caseStudy.explainerVideo
      ? [{ label: 'Explainer video', icon: <Play aria-hidden="true" /> }]
      : []),
    ...(archived
      ? [{ label: 'Past project', icon: <Archive aria-hidden="true" /> }]
      : []),
  ]

  // Stats band: only facts that already exist in the data, in owner terms
  // (what was delivered and what it was for). Never tool counts.
  const facts: SnapshotFact[] = []
  if (workProfile.services.length > 0) {
    facts.push({
      label: 'Services delivered',
      value: String(workProfile.services.length),
      detail: summarizeServices(workProfile.services),
      numeric: true,
    })
  }
  if (caseStudy.structured?.focus) {
    facts.push({ label: 'Focus', value: caseStudy.structured.focus })
  } else if (caseStudy.founder) {
    facts.push({ label: 'Led by', value: caseStudy.founder })
  }
  if (caseStudy.structured?.scope) {
    facts.push({ label: 'Scope', value: caseStudy.structured.scope })
  }
  if (facts.length < 4) facts.push({ label: 'Industry', value: caseStudy.industry })
  if (facts.length < 4) facts.push({ label: 'Location', value: caseStudy.location })

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <CaseStudyVisualHero
          title={caseStudy.client}
          description={caseStudy.description}
          eyebrow={archived ? 'Case study archive' : 'Case study'}
          badges={badges}
          websiteUrl={websiteUrl}
          websiteHost={websiteHost}
          trackedLocation={`${trackedLocation} hero`}
          homeDesktopSrc={desktopShot}
          homeDesktopAlt={`${caseStudy.client} homepage built by Prism`}
          homeMobileSrc={mobileShot}
          homeMobileAlt={`Mobile view of the ${caseStudy.client} site`}
        />

        <CaseStudySnapshotStats metric={metric} facts={facts} />

        <CaseStudyVoice
          slug={caseStudy.slug}
          clientName={caseStudy.client}
          video={video}
          quotes={quotes}
        />

        {framing ? (
          <CaseStudyTwoProblems
            clientName={caseStudy.client}
            framing={framing}
            metric={foundMetric}
          />
        ) : null}

        {story ? <CaseStudyStory clientName={caseStudy.client} story={story} /> : null}

        {caseStudy.explainerVideo ? (
          <CaseStudyExplainerVideo
            slug={caseStudy.slug}
            clientName={caseStudy.client}
            video={caseStudy.explainerVideo}
          />
        ) : null}

        {outcomes.length > 0 ? (
          <CaseStudyOutcomesGrid
            eyebrow="Outcomes"
            title="what changed."
            outcomes={outcomes}
          />
        ) : null}

        <CaseStudyWorkHighlights caseStudySlug={caseStudy.slug} />

        <CaseStudyMoreWork slug={caseStudy.slug} trackedLocation={`${trackedLocation} more work`} />

        <FinalCta
          location={`${trackedLocation} final cta`}
          title="your business, next."
          secondary={{ label: 'Read what clients say', href: '/wall-of-love' }}
        />
      </main>

      <Footer />

      <CaseStudySchema
        title={`${caseStudy.client} case study`}
        description={schemaDescription}
        url={canonicalUrl}
        imageUrl={
          desktopShot
            ? `https://www.design-prism.com${desktopShot}`
            : (caseStudy.structured?.heroImage ?? caseStudy.clientLogo)
        }
        datePublished={caseStudy.structured?.datePublished}
        dateModified={caseStudy.structured?.dateModified}
        clientName={caseStudy.client}
        clientUrl={websiteUrl}
        industry={caseStudy.industry}
        location={caseStudy.location}
        scope={caseStudy.structured?.scope}
        outcome={schemaOutcome}
        results={results}
        // Give the Article a real author/publisher by referencing the canonical
        // Prism Organization @id (merges with the global org node on the page).
        organization={{ name: 'Prism', url: 'https://www.design-prism.com/' }}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.design-prism.com' },
          {
            name: 'Case Studies',
            url: 'https://www.design-prism.com/case-studies',
          },
          { name: caseStudy.client, url: canonicalUrl },
        ]}
      />
    </div>
  )
}
