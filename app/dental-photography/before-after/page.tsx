import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import Footer from "@/components/footer"
import { LandingHero } from "@/components/landing/landing-hero"
import Navbar from "@/components/navbar"
import { FinalCta } from "@/components/prism/final-cta"
import { Eyebrow, Section } from "@/components/prism/section"
import { WebPageSchema } from "@/components/schema-markup"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { buildRouteMetadata } from "@/lib/seo/metadata"
import { WAITLIST_FOCUS_HREFS } from "@/lib/waitlist"

import GuideTabs from "./GuideTabs"

const PAGE_TITLE = 'Dental before-and-after photos'
const PAGE_DESCRIPTION =
  'A practical workflow for capturing consistent dental before-and-after photos with simple gear, scripts, and storage.'
const CANONICAL_URL = "https://www.design-prism.com/dental-photography/before-after"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/dental-photography/before-after",
  ogImage: "/prism-opengraph.png",
})

export default function BeforeAfterPhotographyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="In-practice playbook"
          title="build a before + after system your team can run every day."
          description="follow this 0 to 100% guide to set up gear, space, scripts, and file workflows so your practice captures pro-grade before-and-afters that wow patients and fuel every marketing touchpoint."
          location="before after guide hero"
          hideCta
          showStatus={false}
          secondary={{ label: "Jump to the protocol", href: "#guide-tabs" }}
          glow="green"
          titleClassName="max-w-[18ch]"
        >
          <div className="mx-auto flex max-w-xl justify-center">
            <Link
              href="/dental-photography"
              className="group/all inline-flex min-h-10 items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              see all dental photography services
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover/all:translate-x-0.5" />
            </Link>
          </div>
        </LandingHero>

        <GuideTabs />

        <Section aria-labelledby="ba-team-title">
          <Card className="flex flex-col gap-6 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Team coverage</Eyebrow>
              <h2 id="ba-team-title" className="text-heading mt-5 text-foreground sm:text-[2rem]">
                let prism capture the office, team, and candid moments.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
                When you need more than before-and-afters, our on-location crew photographs the lobby, ops, and staff so every touchpoint feels cohesive.
              </p>
            </div>
            <Button asChild size="lg" variant="outline" className="shrink-0">
              <Link href="/dental-photography/office-team">
                Explore office &amp; team shoots
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </Card>
        </Section>

        <FinalCta location="before after guide final cta" href={WAITLIST_FOCUS_HREFS.content} />
      </main>
      <Footer />
      <ScrollToTop />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </div>
  )
}
