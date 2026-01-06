import type { Metadata } from "next"
import Script from "next/script"
import { notFound } from "next/navigation"

import Breadcrumbs from "@/components/breadcrumbs"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import LibraryInstagramEmbed from "@/components/library/LibraryInstagramEmbed"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getTikTokEmbedHtml } from "@/lib/library/embeds"
import { getLibraryPosts } from "@/lib/library/getLibraryPosts"
import type { LibraryPost } from "@/lib/library/types"

interface PageProps {
  params: Promise<{ slug: string }>
}

const PLATFORM_LABELS = {
  instagram: "Instagram",
  tiktok: "TikTok",
} as const

const buildMetadata = (post: LibraryPost): Metadata => {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://www.design-prism.com"
  const canonical = `${base}/library/${post.slug}`
  const speakerName = post.editorial?.speaker?.name
  const rawTitle = speakerName ? `${speakerName}: ${post.title}` : post.title
  const description =
    post.editorial?.takeaways?.[0] ?? post.caption ?? "Prism Library short lesson."
  const ogImage =
    post.thumbnailUrl && post.thumbnailUrl.startsWith("http")
      ? post.thumbnailUrl
      : post.thumbnailUrl
      ? `${base}${post.thumbnailUrl}`
      : null

  return {
    title: { absolute: `${rawTitle} | Prism Library` },
    description,
    openGraph: {
      title: rawTitle,
      description,
      url: canonical,
      images: ogImage ? [{ url: ogImage, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: rawTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: { canonical },
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const posts = await getLibraryPosts()
  const post = posts.find((item) => item.slug === slug)
  if (!post) notFound()
  return buildMetadata(post)
}

export default async function LibraryDetailPage({ params }: PageProps) {
  const { slug } = await params
  const posts = await getLibraryPosts()
  const post = posts.find((item) => item.slug === slug)
  if (!post) notFound()

  const embedHtml = post.platform === "tiktok" ? await getTikTokEmbedHtml(post.permalink) : null
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs
            items={[
              { name: "home", url: "/" },
              { name: "library", url: "/library" },
              { name: post.title, url: `/library/${post.slug}` },
            ]}
          />
        </div>

        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline">{PLATFORM_LABELS[post.platform]}</Badge>
                  {post.editorial?.group ? (
                    <Badge variant="secondary">{post.editorial.group}</Badge>
                  ) : null}
                </div>
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    {post.title}
                  </h1>
                  {post.editorial?.speaker?.name ? (
                    <p className="mt-2 text-sm font-semibold text-muted-foreground">
                      {post.editorial.speaker.name}
                    </p>
                  ) : null}
                </div>

                <div className="rounded-2xl border border-border/60 bg-card/95 p-4">
                  {post.platform === "tiktok" ? (
                    embedHtml ? (
                      <div
                        className="flex justify-center"
                        dangerouslySetInnerHTML={{ __html: embedHtml }}
                      />
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Embed unavailable. Watch directly on TikTok.
                      </div>
                    )
                  ) : (
                    <LibraryInstagramEmbed
                      permalink={post.permalink}
                      title={post.title}
                      thumbnailUrl={post.thumbnailUrl}
                    />
                  )}
                </div>

                {post.editorial?.tags?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {post.editorial.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : null}

                <Button asChild className="w-fit rounded-full">
                  <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                    Watch on {PLATFORM_LABELS[post.platform]}
                  </a>
                </Button>
              </div>

              <div className="space-y-6">
                <Card className="border-border/60 bg-card/95">
                  <CardHeader>
                    <CardTitle className="text-lg">Speaker</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    {post.editorial?.speaker ? (
                      <>
                        <div className="space-y-1">
                          <p className="text-base font-semibold text-foreground">
                            {post.editorial.speaker.name}
                          </p>
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                            {post.editorial.speaker.type}
                          </p>
                          {post.editorial.speaker.subtitle ? (
                            <p>{post.editorial.speaker.subtitle}</p>
                          ) : null}
                        </div>
                        {post.editorial.speaker.bioShort ? (
                          <p>{post.editorial.speaker.bioShort}</p>
                        ) : null}
                        {post.editorial.speaker.links?.length ? (
                          <div className="flex flex-col gap-2">
                            {post.editorial.speaker.links.map((link) => (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-semibold text-foreground underline underline-offset-4"
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </>
                    ) : (
                      <p>Speaker details are being curated.</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-border/60 bg-card/95">
                  <CardHeader>
                    <CardTitle className="text-lg">Key takeaways</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {post.editorial?.takeaways?.length ? (
                      <ul className="space-y-3">
                        {post.editorial.takeaways.map((takeaway) => (
                          <li key={takeaway} className="list-disc ml-4">
                            {takeaway}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Key takeaways are being curated.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {post.platform === "tiktok" ? (
        <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
      ) : null}
    </div>
  )
}
