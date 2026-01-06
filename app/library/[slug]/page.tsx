import type { Metadata } from "next"
import Script from "next/script"
import { notFound } from "next/navigation"

import Breadcrumbs from "@/components/breadcrumbs"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import LibraryInstagramEmbed from "@/components/library/LibraryInstagramEmbed"
import { getTikTokEmbedHtml } from "@/lib/library/embeds"
import { getLibraryPosts } from "@/lib/library/getLibraryPosts"
import type { LibraryPost } from "@/lib/library/types"

interface PageProps {
  params: Promise<{ slug: string }>
}

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

        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-10">
              <header className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {post.title}
                </h1>
                {post.editorial?.speaker?.name ? (
                  <p className="text-sm font-semibold text-muted-foreground">
                    {post.editorial.speaker.name}
                  </p>
                ) : null}
                {post.editorial?.speaker?.subtitle ? (
                  <p className="text-sm text-muted-foreground">
                    {post.editorial.speaker.subtitle}
                  </p>
                ) : null}
              </header>

              <div className="rounded-2xl border border-border/60 bg-card/95 p-4">
                {post.platform === "tiktok" ? (
                  embedHtml ? (
                    <div
                      className="flex justify-center"
                      dangerouslySetInnerHTML={{ __html: embedHtml }}
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Embed unavailable.{" "}
                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-foreground underline underline-offset-4"
                      >
                        Watch on TikTok
                      </a>
                    </div>
                  )
                ) : (
                  <LibraryInstagramEmbed
                    permalink={post.permalink}
                    title={post.title}
                  />
                )}
              </div>

              <section className="space-y-6 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Speaker
                  </p>
                  {post.editorial?.speaker ? (
                    <div className="space-y-2">
                      <p className="text-base font-semibold text-foreground">
                        {post.editorial.speaker.name}
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        {post.editorial.speaker.type}
                      </p>
                      {post.editorial.speaker.subtitle ? (
                        <p>{post.editorial.speaker.subtitle}</p>
                      ) : null}
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
                    </div>
                  ) : (
                    <p>Speaker details are being curated.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Key takeaways
                  </p>
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
                </div>

                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-foreground underline underline-offset-4"
                >
                  Watch the original post
                </a>
              </section>
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
