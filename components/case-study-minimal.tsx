import Footer from '@/components/footer'
import CaseStudyExplainerVideo from '@/components/case-studies/CaseStudyExplainerVideo'
import Navbar from '@/components/navbar'
import { CaseStudyWorkHighlights } from '@/components/case-studies/CaseStudyWorkHighlights'
import { CaseStudySchema } from '@/components/schema-markup'
import TrackedLink from '@/components/tracked-link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { ExternalLink } from 'lucide-react'
import { notFound } from 'next/navigation'

type MinimalCaseStudyPageProps = {
  slug: string
}

function getWebsiteHostLabel(websiteUrl: string) {
  try {
    return new URL(websiteUrl).hostname.replace(/^www\./, '')
  } catch {
    return websiteUrl
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/+$/, '')
  }
}

export default function MinimalCaseStudyPage({
  slug,
}: MinimalCaseStudyPageProps) {
  const caseStudy = CASE_STUDIES.find((item) => item.slug === slug)

  if (!caseStudy) {
    notFound()
  }

  const canonicalUrl =
    caseStudy.structured?.canonicalUrl ??
    `https://www.design-prism.com/case-studies/${caseStudy.slug}`
  const websiteUrl = caseStudy.websiteUrl
  const websiteHostLabel = websiteUrl ? getWebsiteHostLabel(websiteUrl) : null
  const schemaDescription = `Prism case study for ${caseStudy.client} featuring the live website plus the services and tech stack used for the engagement.`

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border/60 px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="space-y-6">
              <Badge
                variant="secondary"
                className="w-fit rounded-full px-4 py-2 text-[10px] tracking-[0.22em]"
              >
                case study
              </Badge>

              <div className="space-y-3">
                <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                  {caseStudy.client}
                </h1>
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground sm:text-sm">
                  {caseStudy.industry} / {caseStudy.location}
                </p>
              </div>

              {websiteUrl ? (
                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild className="rounded-full px-5">
                    <TrackedLink
                      href={websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      label={`Open website for ${caseStudy.client}`}
                      location={`${caseStudy.slug} case study`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span>Open website</span>
                        <ExternalLink className="size-4" aria-hidden="true" />
                      </span>
                    </TrackedLink>
                  </Button>
                  {websiteHostLabel ? (
                    <span className="text-sm text-muted-foreground">
                      {websiteHostLabel}
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {caseStudy.explainerVideo ? (
          <CaseStudyExplainerVideo
            slug={caseStudy.slug}
            clientName={caseStudy.client}
            video={caseStudy.explainerVideo}
          />
        ) : null}

        <CaseStudyWorkHighlights caseStudySlug={caseStudy.slug} />
      </main>

      <Footer />

      <CaseStudySchema
        title={`${caseStudy.client} case study`}
        description={schemaDescription}
        url={canonicalUrl}
        imageUrl={caseStudy.structured?.heroImage ?? caseStudy.clientLogo}
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
