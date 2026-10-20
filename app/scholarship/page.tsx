import type { Metadata } from "next"
import Footer from "@/components/footer"
import { LandingHero } from "@/components/landing/landing-hero"
import Navbar from "@/components/navbar"
import { WebPageSchema } from "@/components/schema-markup"
import ScholarshipPageClient from "./ScholarshipPageClient"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const PAGE_TITLE = 'Free community website scholarship'
const PAGE_DESCRIPTION =
  'Each month Prism builds a free website for one community member. Share your story and apply for the scholarship before we choose the next recipient.'
const CANONICAL_URL = "https://www.design-prism.com/scholarship"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/scholarship",
  ogImage: "/prism-opengraph.png",
})

export default function ScholarshipPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <LandingHero
          location="scholarship hero"
          showStatus={false}
          hideCta
          eyebrow="Community website scholarship"
          title="one founder. one free website. every month."
          description="Every month we gift a custom website to one founder with a bold idea. Tell us what you're building and we'll reach out if you're selected for the next build window."
          secondary={{ label: "Apply for the scholarship", href: "#apply", trackingLabel: "scholarship apply anchor" }}
          glow="green"
          className="pb-6 sm:pb-10"
        />
        <noscript>
          <section className="prism-container py-12">
            <div className="max-w-3xl space-y-4 text-muted-foreground">
              <h2 className="text-heading text-foreground">apply without javascript.</h2>
              <p>
                Email <a className="text-foreground underline underline-offset-4" href="mailto:support@design-prism.com">support@design-prism.com</a> with your name, how you heard about Prism, and a short description of the site you need. We will confirm your submission and include it in the next monthly review.
              </p>
              <p>
                You can also explore example builds at <a className="text-foreground underline underline-offset-4" href="https://www.design-prism.com/website-design">design-prism.com/website-design</a>.
              </p>
            </div>
          </section>
        </noscript>
        <ScholarshipPageClient />
      </main>
      <Footer />
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
