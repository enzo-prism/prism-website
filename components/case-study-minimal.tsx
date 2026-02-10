import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { CaseStudySchema } from "@/components/schema-markup"
import SocialShare from "@/components/social-share"
import TrackedLink from "@/components/tracked-link"
import { CaseStudyCallout } from "@/components/case-studies/CaseStudyCallout"
import { CaseStudySectionNav } from "@/components/case-studies/CaseStudySectionNav"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import dynamic from "next/dynamic"
import Link from "next/link"

const FounderImpactGraph = dynamic(
  () => import("@/components/case-studies/FounderImpactGraph").then((m) => m.FounderImpactGraph),
  { loading: () => <div className="h-64 w-full animate-pulse rounded-2xl bg-neutral-100" /> }
)

type QuickFact = {
  label: string
  value: string
  href?: string
}

type Section = {
  id: string
  title: string
  description?: string
  bullets?: string[]
}

type ComingSoon = {
  title?: string
  description: string
  bullets?: string[]
}

type ShareConfig = {
  url: string
  title: string
  description: string
}

type SchemaConfig = {
  title: string
  description: string
  url: string
  clientName: string
  outcome: string
  datePublished: string
  dateModified: string
}

type CTAConfig = {
  title?: string
  body?: string
  trackLabel?: string
  href?: string
}

type HeroButtonConfig = {
  label: string
  href: string
  trackLabel?: string
}

interface MinimalCaseStudyProps {
  pageTrackingTitle: string
  heroEyebrow?: string
  heroTitle: string
  heroSubtitle?: string
  summary: string
  heroButton?: HeroButtonConfig
  showDentalWebsiteSystemLink?: boolean
  quickFacts: QuickFact[]
  sections?: Section[]
  comingSoon?: ComingSoon
  share: ShareConfig
  schema: SchemaConfig
  cta?: CTAConfig
}

export default function MinimalCaseStudyPage({
  pageTrackingTitle,
  heroEyebrow = "case study",
  heroTitle,
  heroSubtitle,
  summary,
  heroButton,
  showDentalWebsiteSystemLink = false,
  quickFacts,
  sections,
  comingSoon,
  share,
  schema,
  cta,
}: MinimalCaseStudyProps) {
  const ctaHref = cta?.href ?? "/get-started"
  const ctaTrackLabel = cta?.trackLabel ?? `${pageTrackingTitle.toLowerCase()} case study`
  const websiteFact = quickFacts.find((fact) => fact.label.toLowerCase() === "website" && Boolean(fact.href))
  const resolvedHeroButton = heroButton ?? (websiteFact?.href
    ? {
      label: `visit ${websiteFact.value}`,
      href: websiteFact.href,
      trackLabel: `${pageTrackingTitle.toLowerCase()} client website`,
    }
    : undefined)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border/60 px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit rounded-full px-4 py-2 text-[10px] tracking-[0.22em]">
                {heroEyebrow}
              </Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">{heroTitle}</h1>
              {heroSubtitle && <p className="text-lg text-muted-foreground sm:text-xl">{heroSubtitle}</p>}
              <p className="text-muted-foreground">{summary}</p>
              {resolvedHeroButton && (
                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild variant="outline" className="rounded-full">
                    {resolvedHeroButton.trackLabel ? (
                      <TrackedLink
                        href={resolvedHeroButton.href}
                        target={resolvedHeroButton.href.startsWith("http") ? "_blank" : undefined}
                        rel={resolvedHeroButton.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        label={resolvedHeroButton.label}
                        location={resolvedHeroButton.trackLabel}
                      >
                        {resolvedHeroButton.label}
                      </TrackedLink>
                    ) : (
                      <Link
                        href={resolvedHeroButton.href}
                        target={resolvedHeroButton.href.startsWith("http") ? "_blank" : undefined}
                        rel={resolvedHeroButton.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {resolvedHeroButton.label}
                      </Link>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {sections?.length ? (
          <CaseStudySectionNav
            sections={sections.map((section) => ({ id: section.id, label: section.title }))}
            containerClassName="max-w-3xl"
          />
        ) : null}

        <section className="px-4 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl space-y-12 px-4 md:px-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {quickFacts.map((fact) => (
                <Card key={fact.label} className="rounded-xl border-border/60 bg-card/90 shadow-sm">
                  <CardHeader className="space-y-1 p-5 pb-2">
                    <CardDescription className="text-[10px] font-semibold uppercase tracking-[0.22em] font-pixel text-muted-foreground">
                      {fact.label}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    {fact.href ? (
                      <Link
                        href={fact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm font-semibold text-foreground underline decoration-border/70 underline-offset-4 transition-colors hover:decoration-border"
                      >
                        {fact.value}
                      </Link>
                    ) : (
                      <div className="text-sm text-muted-foreground">{fact.value}</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {showDentalWebsiteSystemLink ? (
              <CaseStudyCallout title="built with">
                built with prism’s{" "}
                <Link
                  href="/dental-website"
                  className="font-semibold text-foreground underline decoration-border/70 underline-offset-4 transition-colors hover:decoration-border"
                >
                  dental practice website system
                </Link>
                .
              </CaseStudyCallout>
            ) : null}

            <section className="border-t border-border/60 pt-10">
              <FounderImpactGraph />
            </section>

            {sections?.map((section) => (
              <section
                key={section.id}
                className="space-y-4 border-t border-border/60 pt-10"
                data-section={section.id}
              >
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{section.title}</h2>
                {section.description && <p className="text-muted-foreground">{section.description}</p>}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-3 text-muted-foreground">
                    {section.bullets.map((bullet, index) => (
                      <li key={`${section.id}-${index}`} className="flex gap-3 text-sm">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-muted-foreground/60" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {comingSoon && (
              <section className="space-y-4 border-t border-border/60 pt-10">
                <CaseStudyCallout title={comingSoon.title ? comingSoon.title : "full story coming soon"}>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{comingSoon.description}</p>
                    {comingSoon.bullets && comingSoon.bullets.length > 0 ? (
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {comingSoon.bullets.map((bullet, index) => (
                          <li key={`coming-soon-${index}`} className="flex gap-2">
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-muted-foreground/50" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </CaseStudyCallout>
              </section>
            )}

            {cta && (
              <section className="space-y-6 border-t border-border/60 pt-10 text-center">
                {cta.title && <h3 className="text-3xl font-semibold">{cta.title}</h3>}
                {cta.body && <p className="mx-auto max-w-xl text-sm text-muted-foreground">{cta.body}</p>}
                <div className="pt-2">
                  <Button asChild className="rounded-full px-6 py-5 text-sm">
                    <TrackedLink href={ctaHref} label={FREE_AUDIT_CTA_TEXT} location={ctaTrackLabel}>
                      {FREE_AUDIT_CTA_TEXT}
                    </TrackedLink>
                  </Button>
                </div>
              </section>
            )}

            <section className="border-t border-border/60 pt-10">
              <SocialShare url={share.url} title={share.title} description={share.description} />
            </section>
          </div>
        </section>
      </main>

      <Footer />

      <CaseStudySchema
        title={schema.title}
        description={schema.description}
        url={schema.url}
        datePublished={schema.datePublished}
        dateModified={schema.dateModified}
        clientName={schema.clientName}
        outcome={schema.outcome}
        breadcrumbs={[
          { name: "Home", url: "https://www.design-prism.com" },
          { name: "Case Studies", url: "https://www.design-prism.com/case-studies" },
          { name: schema.clientName, url: schema.url },
        ]}
      />
    </div>
  )
}
