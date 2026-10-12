import type { Metadata } from 'next'
import InstagramEmbed from '@/components/instagram-embed'
import Footer from '@/components/footer'
import { LandingHero } from '@/components/landing/landing-hero'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Section } from '@/components/prism/section'
import { WebPageSchema } from '@/components/schema-markup'
import { Card } from '@/components/ui/card'
import { HOTTEST_CONTENT } from '@/lib/hottest-content'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = "Prism's hottest content library"
const PAGE_DESCRIPTION =
  "See Prism's top-performing Instagram reels exactly as they appeared on the platform, with live embeds and full context from the original posts."
const CANONICAL_URL = 'https://www.design-prism.com/hottest-content'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/hottest-content',
  index: false,
  ogImage: '/prism-opengraph.png',
})

export default function HottestContentPage() {
  const uniqueContent = Array.from(
    new Map(HOTTEST_CONTENT.map((item) => [item.instagramUrl, item])).values(),
  )

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Our hottest content"
          title="the reels that broke through."
          description="We obsess over dropping the most valuable playbooks for founders: clips that teach more in 30 seconds than most courses do in hours."
          location="hottest content hero"
          secondary={{ label: 'See the Wall of Love', href: '/wall-of-love' }}
          glow="violet"
        />

        <Section className="pt-0 sm:pt-0" aria-label="Instagram reels">
          <div className="grid gap-6 border-y border-white/[0.08] py-8 text-pretty text-[15px] leading-7 text-muted-foreground sm:grid-cols-2 sm:gap-10">
            <p>
              Every strategy is vetted against our own results. These are the
              exact tactics we use to grow Prism and help clients level up their
              online presence.
            </p>
            <p>
              The mission is simple: give away so much insight that you come
              back, share it with your team, and build louder than your
              competition.
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {uniqueContent.map((item) => (
              <li key={item.instagramUrl} className="min-w-0">
                <Card className="h-full overflow-hidden p-2 sm:p-4">
                  <InstagramEmbed url={item.instagramUrl} className="w-full" />
                </Card>
              </li>
            ))}
          </ul>
        </Section>

        <FinalCta location="hottest content final cta" />
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
