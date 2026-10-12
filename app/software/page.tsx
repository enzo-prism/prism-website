import type { Metadata } from "next"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { LandingHero } from "@/components/landing/landing-hero"
import { FinalCta } from "@/components/prism/final-cta"
import { Section } from "@/components/prism/section"
import { ItemListSchema } from "@/components/schema-markup"
import SoftwareAppCards from "@/components/software/SoftwareAppCards"
import { PRISM_APPS } from "@/lib/software-apps"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Free growth software tools',
  description: 'Explore free tools from Prism built to increase leads, conversions, and customer lifetime value for small and local businesses.',
  path: "/software",
  ogImage: "/prism-opengraph.png",
})

export default function SoftwarePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <LandingHero
          location="software hero"
          showStatus={false}
          hideCta
          eyebrow="Apps developed by Prism"
          title="tools to help you grow."
          description="Free software to help you increase leads, conversions, and customer LTV."
          glow="green"
          className="pb-10 sm:pb-14"
        />

        <Section aria-label="Prism software tools" className="pt-0 sm:pt-0">
          <SoftwareAppCards apps={PRISM_APPS} />
        </Section>
        <FinalCta location="software final cta" secondary={{ label: "See the work", href: "/case-studies" }} />
      </main>
      <Footer />
      <ItemListSchema
        name="Prism software tools"
        url="https://www.design-prism.com/software"
        items={PRISM_APPS.map((app) => ({
          name: app.title,
          description: app.description,
          url: app.href,
          itemType: "CreativeWork",
        }))}
      />
    </div>
  )
}
