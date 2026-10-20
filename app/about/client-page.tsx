import { AboutHero } from '@/components/about/about-hero'
import { AboutManifesto } from '@/components/about/about-manifesto'
import { OlympicJourney } from '@/components/about/olympic-journey'
import { WhatPrismBuilds } from '@/components/about/what-prism-builds'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Section, SectionHeader } from '@/components/prism/section'
import { BreadcrumbSchema, PersonSchema } from '@/components/schema-markup'
import ScrollingTimeline from '@/components/scrolling-timeline'

export default function AboutClientPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent font-sans text-foreground">
      <Navbar />

      <main className="flex-1 overflow-x-clip outline-none" id="main-content" tabIndex={-1}>
        <AboutHero />
        <AboutManifesto />
        <OlympicJourney />

        <Section id="timeline" aria-labelledby="timeline-title" className="scroll-mt-20">
          <SectionHeader
            id="timeline-title"
            eyebrow="the timeline"
            title="the long way here."
            description="Fourteen milestones, from a first track meet in 2009 to Prism's first dollar."
            align="center"
          />
          <div className="mt-16 sm:mt-20">
            <ScrollingTimeline />
          </div>
        </Section>

        <WhatPrismBuilds />
        <FinalCta location="about final cta" title="build the next chapter with us." />
      </main>

      <Footer />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.design-prism.com' },
          { name: 'About', url: 'https://www.design-prism.com/about' },
        ]}
      />
      <PersonSchema
        personId="enzo-sison"
        name="Enzo Sison"
        jobTitle="Founder & CEO"
        description="Founder of Prism, designing websites and running content, ads, and AEO for small businesses"
        image="https://www.design-prism.com/enzo-avatar.png"
        url="https://www.design-prism.com/about"
        sameAs={[
          'https://x.com/NosisTheGod',
          'https://www.linkedin.com/in/enzo-sison',
        ]}
      />
    </div>
  )
}
