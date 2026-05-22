import Footer from '@/components/footer'
import CaseStudyExplainerVideo from '@/components/case-studies/CaseStudyExplainerVideo'
import CaseStudyOutcomesGrid from '@/components/case-studies/CaseStudyOutcomesGrid'
import CaseStudySnapshotStats from '@/components/case-studies/CaseStudySnapshotStats'
import CaseStudyVisualHero from '@/components/case-studies/CaseStudyVisualHero'
import Navbar from '@/components/navbar'
import { CaseStudyWorkHighlights } from '@/components/case-studies/CaseStudyWorkHighlights'
import { CaseStudySchema } from '@/components/schema-markup'
import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { ArrowRight, Sparkles } from 'lucide-react'
import { notFound } from 'next/navigation'
import { existsSync } from 'node:fs'
import path from 'node:path'

type MinimalCaseStudyPageProps = {
  slug: string
}

function hasPublicAsset(publicPath: string) {
  try {
    return existsSync(path.join(process.cwd(), 'public', publicPath.replace(/^\//, '')))
  } catch {
    return false
  }
}

export default function MinimalCaseStudyPage({ slug }: MinimalCaseStudyPageProps) {
  const caseStudy = CASE_STUDIES.find((item) => item.slug === slug)

  if (!caseStudy) {
    notFound()
  }

  const canonicalUrl =
    caseStudy.structured?.canonicalUrl ??
    `https://www.design-prism.com/case-studies/${caseStudy.slug}`
  const websiteUrl = caseStudy.websiteUrl
  const schemaDescription = `Prism case study for ${caseStudy.client} featuring the live website plus the services and tech stack used for the engagement.`

  const desktopShot = `/case-studies/${slug}-home-desktop.jpg`
  const mobileShot = `/case-studies/${slug}-home-mobile.jpg`
  const hasDesktopShot = hasPublicAsset(desktopShot)
  const hasMobileShot = hasPublicAsset(mobileShot)

  const trackedLocation = `${slug} case study`

  const statCards = [
    { label: 'Industry', value: caseStudy.industry },
    { label: 'Location', value: caseStudy.location },
    caseStudy.structured?.focus
      ? { label: 'Focus', value: caseStudy.structured.focus }
      : caseStudy.founder
        ? { label: 'Founder', value: caseStudy.founder }
        : null,
    caseStudy.structured?.scope
      ? { label: 'Scope', value: caseStudy.structured.scope }
      : null,
  ].filter(Boolean) as { label: string; value: string; detail?: string }[]

  const outcomesTitle = `What Prism built for ${caseStudy.client}.`

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {hasDesktopShot ? (
          <CaseStudyVisualHero
            badge="case study"
            eyebrow={`${caseStudy.industry} / ${caseStudy.location}`}
            title={caseStudy.client}
            description={caseStudy.description}
            websiteUrl={websiteUrl}
            trackedLocation={`${trackedLocation} hero`}
            homeDesktopSrc={desktopShot}
            homeDesktopAlt={`${caseStudy.client} homepage built by Prism`}
            homeMobileSrc={hasMobileShot ? mobileShot : undefined}
            homeMobileAlt={`Mobile view of the ${caseStudy.client} site`}
            primaryCta={{
              href: '/get-started',
              label: `Start a free practice audit from ${slug} case study`,
              text: 'Free Practice Audit',
            }}
          />
        ) : (
          <section className="border-b border-border/60 px-4 py-16 md:py-24">
            <div className="container mx-auto max-w-4xl px-4 md:px-6">
              <div className="space-y-6">
                <span className="inline-flex w-fit rounded-full bg-muted/40 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  case study
                </span>
                <div className="space-y-3">
                  <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                    {caseStudy.client}
                  </h1>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground sm:text-sm">
                    {caseStudy.industry} / {caseStudy.location}
                  </p>
                  <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
                    {caseStudy.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        <CaseStudySnapshotStats stats={statCards} />

        {caseStudy.explainerVideo ? (
          <CaseStudyExplainerVideo
            slug={caseStudy.slug}
            clientName={caseStudy.client}
            video={caseStudy.explainerVideo}
          />
        ) : null}

        {caseStudy.structured?.outcomes && caseStudy.structured.outcomes.length > 0 ? (
          <CaseStudyOutcomesGrid
            eyebrow="what changed"
            title={outcomesTitle}
            outcomes={caseStudy.structured.outcomes}
          />
        ) : null}

        <CaseStudyWorkHighlights caseStudySlug={caseStudy.slug} />

        <section className="px-4 py-14 md:py-20">
          <div className="container mx-auto max-w-4xl px-4 text-center md:px-6">
            <div className="mx-auto mb-4 inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-muted/30">
              <Sparkles className="size-5" aria-hidden="true" />
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Want a growth system like {caseStudy.client}&apos;s?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Prism builds modern websites, search visibility, conversion paths,
              analytics, and AI infrastructure as a single connected system.
            </p>
            <div className="mt-7 flex justify-center">
              <Button asChild className="rounded-full px-5">
                <TrackedLink
                  href="/get-started"
                  label={`Start a free practice audit from ${slug} case study footer`}
                  location={`${trackedLocation} footer`}
                >
                  <span className="inline-flex items-center gap-2">
                    <span>Build my growth system</span>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </TrackedLink>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <CaseStudySchema
        title={`${caseStudy.client} case study`}
        description={schemaDescription}
        url={canonicalUrl}
        imageUrl={
          hasDesktopShot
            ? `https://www.design-prism.com${desktopShot}`
            : (caseStudy.structured?.heroImage ?? caseStudy.clientLogo)
        }
        datePublished={caseStudy.structured?.datePublished}
        dateModified={caseStudy.structured?.dateModified}
        clientName={caseStudy.client}
        outcome={`Live website, service list, and tech stack overview for ${caseStudy.client}.`}
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
