import type { Metadata } from 'next'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Section } from '@/components/prism/section'
import { WebPageSchema } from '@/components/schema-markup'
import SeoTextSection from '@/components/seo-text-section'
import DesignsPageClient from './DesignsPageClient'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'Graphic design & creative services'
const PAGE_DESCRIPTION =
  'Browse logos, branding, marketing assets, and social graphics from Prism that show how intentional design lifts a brand and earns attention.'
const CANONICAL_URL = 'https://www.design-prism.com/designs'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/designs',
  ogImage: '/prism-opengraph.png',
})

export default function DesignsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <DesignsPageClient />

        <Section aria-labelledby="designs-purpose-title">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="designs-purpose-title"
              className="text-title text-gradient text-balance pb-1"
            >
              design with purpose.
            </h2>
            <p className="text-lead mx-auto mt-6 max-w-[56ch] text-pretty text-muted-foreground">
              Design is the connective tissue for every engagement we take on.
              We pair beauty with performance, aligning every asset to the
              outcomes you care about, so your website, campaigns, and internal
              tools all speak in the same voice.
            </p>
          </div>
        </Section>

        <SeoTextSection title="graphic design & brand systems">
          <p>
            From logos and identity systems to pitch decks and social content,
            we create visual systems that are consistent, legible, and
            conversion-focused. Every asset aligns with your positioning and is
            optimized for mobile, ensuring your brand looks sharp from Instagram
            to investor meetings.
          </p>
        </SeoTextSection>

        <FinalCta
          location="designs final cta"
          title="ready to sharpen your brand?"
          description="Whether you're starting fresh or refining what you already have, we'll help you design a system that works as beautifully as it looks."
          secondary={{ label: 'See the case studies', href: '/case-studies' }}
        />
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
