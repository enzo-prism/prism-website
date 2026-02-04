import type { Metadata } from "next"

import Breadcrumbs from "@/components/breadcrumbs"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import LibraryClient from "@/components/library/LibraryClient"
import { CollectionPageSchema, ItemListSchema } from "@/components/schema-markup"
import { getFeaturedPost, getLibraryPosts } from "@/lib/library"

const PAGE_TITLE = "prism library | founder + athlete short lessons"
const PAGE_DESCRIPTION =
  "short lessons from founders and world-class athletes, curated to help you build a stronger company and a stronger competitive mindset."
const CANONICAL_URL = "https://www.design-prism.com/library"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL_URL,
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/prism-opengraph.png"],
  },
}

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
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs items={[{ name: "home", url: "/" }, { name: "library", url: "/library" }]} />
        </div>

        <section className="border-b border-border/60 py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Prism Library
              </h1>
              <p className="text-base text-muted-foreground sm:text-lg">
                Short lessons from great founders and world-class athletes, often pulled from history, on
                building companies and elite careers.
              </p>
              <div className="space-y-3 text-sm text-muted-foreground sm:text-base">
                <p>
                  Athlete lessons sharpen business and engineering decisions. Founder lessons strengthen
                  training, recovery, and competitive mindset. Many founders and athletes follow Prism for
                  this curated signal.
                </p>
                <p>
                  Prism clients work with Prism because we apply these lessons to grow their businesses.
                  The Library is our open archive of what we've learned about being a founder and
                  world-class athlete so others can chase greatness.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-6">
            <LibraryClient posts={posts} featured={featured} />
          </div>
        </section>
      </main>
      <Footer />
      <CollectionPageSchema name="Prism Library" description={PAGE_DESCRIPTION} url={CANONICAL_URL} />
      <ItemListSchema name="Prism Library posts" items={libraryItems} url={CANONICAL_URL} />
    </div>
  )
}
