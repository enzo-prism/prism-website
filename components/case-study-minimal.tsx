"use client"

import Footer from "@/components/footer"
import { CaseStudySchema } from "@/components/schema-markup"
import SocialShare from "@/components/social-share"
import { Button } from "@/components/ui/button"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { trackCTAClick } from "@/utils/analytics"
import dynamic from "next/dynamic"
import Link from "next/link"

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

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
  const ctaHref = cta?.href ?? "/pricing"
  const ctaTrackLabel = cta?.trackLabel ?? `${pageTrackingTitle.toLowerCase()} case study`

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <section className="border-b px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-neutral-100 px-4 py-1 text-sm lowercase">{heroEyebrow}</div>
              <h1 className="text-3xl font-bold tracking-tight lowercase sm:text-4xl">{heroTitle}</h1>
              {heroSubtitle && <p className="text-xl text-neutral-600 lowercase">{heroSubtitle}</p>}
              <p className="text-neutral-600 lowercase">{summary}</p>
              {heroButton && (
                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild variant="outline" className="rounded-full lowercase">
                    <Link
                      href={heroButton.href}
                      target={heroButton.href.startsWith("http") ? "_blank" : undefined}
                      rel={heroButton.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      onClick={() => heroButton.trackLabel && trackCTAClick(heroButton.label, heroButton.trackLabel)}
                    >
                      {heroButton.label}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl space-y-12 px-4 md:px-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="rounded-lg border border-neutral-200 px-5 py-4">
                  <div className="text-xs uppercase tracking-wide text-neutral-400">{fact.label}</div>
                  {fact.href ? (
                    <Link
                      href={fact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-medium text-neutral-900 underline-offset-4 hover:underline lowercase"
                    >
                      {fact.value}
                    </Link>
                  ) : (
                    <div className="mt-2 text-sm text-neutral-700 lowercase">{fact.value}</div>
                  )}
                </div>
              ))}
            </div>

            {showDentalWebsiteSystemLink ? (
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-6 py-4 text-sm text-neutral-700">
                built with prism’s{" "}
                <Link
                  href="/dental-website"
                  className="font-semibold text-neutral-900 underline underline-offset-4"
                >
                  dental practice website system
                </Link>
                .
              </div>
            ) : null}

            {sections?.map((section) => (
              <section key={section.id} className="space-y-4 border-t pt-10" data-section={section.id}>
                <h2 className="text-2xl font-semibold tracking-tight lowercase">{section.title}</h2>
                {section.description && <p className="text-neutral-600 lowercase">{section.description}</p>}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-3 text-neutral-600 lowercase">
                    {section.bullets.map((bullet, index) => (
                      <li key={`${section.id}-${index}`} className="flex gap-3 text-sm">
                        <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-neutral-400" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {comingSoon && (
              <section className="space-y-4 border-t pt-10">
                <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-8">
                  <h3 className="text-lg font-semibold lowercase">
                    {comingSoon.title ? comingSoon.title : "full story coming soon"}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 lowercase">{comingSoon.description}</p>
                  {comingSoon.bullets && comingSoon.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-neutral-600 lowercase">
                      {comingSoon.bullets.map((bullet, index) => (
                        <li key={`coming-soon-${index}`} className="flex gap-2">
                          <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-neutral-300" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            )}

            {cta && (
              <section className="space-y-6 border-t pt-10 text-center">
                {cta.title && <h3 className="text-2xl font-semibold lowercase">{cta.title}</h3>}
                {cta.body && <p className="mx-auto max-w-xl text-sm text-neutral-600 lowercase">{cta.body}</p>}
                <div className="pt-2">
                  <Link href={ctaHref}>
                    <Button
                      className="rounded-full px-6 py-5 text-sm lowercase"
                      onClick={() => trackCTAClick(FREE_AUDIT_CTA_TEXT, ctaTrackLabel)}
                    >
                      {FREE_AUDIT_CTA_TEXT}
                    </Button>
                  </Link>
                </div>
              </section>
            )}

            <section className="border-t pt-10">
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
