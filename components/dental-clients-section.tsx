import { Reveal } from "@/components/prism/reveal"
import { Section, SectionHeader } from "@/components/prism/section"

import DentalClientCarousel from "./dental-client-carousel"

export default function DentalClientsSection() {
  return (
    <Section aria-labelledby="dental-clients-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal>
          <SectionHeader
            id="dental-clients-title"
            eyebrow="Real practices live on Prism"
            title="explore the dental brands we partner with."
            description="Every site is built around the patient journey, local search, and measurable inquiries. Open a few of the practices we support to see their live sites."
          />
        </Reveal>
        <Reveal delay={100}>
          <DentalClientCarousel />
        </Reveal>
      </div>
    </Section>
  )
}
