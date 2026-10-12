import type { Metadata } from "next"

import Breadcrumbs from "@/components/breadcrumbs"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import LibraryClient from "@/components/library/LibraryClient"
import { LandingHero } from "@/components/landing/landing-hero"
import { FinalCta } from "@/components/prism/final-cta"
import { Section } from "@/components/prism/section"
import { CollectionPageSchema, ItemListSchema } from "@/components/schema-markup"
import { getFeaturedPost, getLibraryPosts } from "@/lib/library"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const PAGE_TITLE = 'Prism library: founder & athlete lessons'
const PAGE_DESCRIPTION =
  'Short lessons from founders and world-class athletes, curated by Prism to help you build a stronger company and a stronger competitive mindset.'
const CANONICAL_URL = "https://www.design-prism.com/library"

// The featured post rotates by day-of-year; without a revalidate window the
// page is fully static when no social-feed tokens are set and the rotation
// freezes at build time.
export const revalidate = 3600

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/library",
  ogImage: "/prism-opengraph.png",
})

export default async function LibraryPage() {
  const posts = await getLibraryPosts()
  const featured = getFeaturedPost(posts, new Date())
  const libraryItems = posts.slice(0, 12).map((post) => ({
    name: post.title,
    url: `https://www.design-prism.com/library/${post.slug}`,
    description: post.editorial?.takeaways?.[0] ?? post.caption ?? undefined,
    image: post.thumbnailUrl ?? undefined,
  }))

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <LandingHero
          location="library hero"
          showStatus={false}
          hideCta
          align="left"
          glow="violet"
          eyebrow="Library"
          title="the Prism library."
          description="Short lessons from great founders and world-class athletes, often pulled from history, on building companies and elite careers."
          topSlot={
            <Breadcrumbs
              className="mb-0 py-0"
              items={[{ name: "home", url: "/" }, { name: "library", url: "/library" }]}
            />
          }
        >
          <div className="grid max-w-4xl gap-4 text-pretty text-[0.95rem] leading-7 text-muted-foreground sm:grid-cols-2 sm:gap-8">
            <p>
              Athlete lessons sharpen business and engineering decisions. Founder lessons strengthen
              training, recovery, and competitive mindset. Many founders and athletes follow Prism for
              this curated signal.
            </p>
            <p>
              Prism clients work with Prism because we apply these lessons to grow their businesses.
              The Library is our open archive of what we&apos;ve learned about being a founder and
              world-class athlete so others can chase greatness.
            </p>
          </div>
        </LandingHero>

        <Section aria-label="Library posts" className="pt-0 sm:pt-0">
          <LibraryClient posts={posts} featured={featured} />
        </Section>
        <FinalCta location="library final cta" secondary={{ label: "See the work", href: "/case-studies" }} />
      </main>
      <Footer />
      <CollectionPageSchema name="Prism Library" description={PAGE_DESCRIPTION} url={CANONICAL_URL} />
      <ItemListSchema name="Prism Library posts" items={libraryItems} url={CANONICAL_URL} />
    </div>
  )
}
