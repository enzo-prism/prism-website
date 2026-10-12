import type { Metadata } from 'next'
import Script from 'next/script'
import { ArrowUpRight } from 'lucide-react'
import { notFound } from 'next/navigation'

import Breadcrumbs from '@/components/breadcrumbs'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import LibraryInstagramEmbed from '@/components/library/LibraryInstagramEmbed'
import { WebPageSchema } from '@/components/schema-markup'
import { canonicalUrl } from '@/lib/canonical'
import { getLibraryPosts } from '@/lib/library/getLibraryPosts'
import { getTikTokVideoId } from '@/lib/library/tiktok'
import type { LibraryPost } from '@/lib/library/types'
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  buildAbsoluteTitle,
  buildMinimalDescription,
} from '@/lib/seo/rules'

interface PageProps {
  params: Promise<{ slug: string }>
}

const buildMetadata = (post: LibraryPost): Metadata => {
  const canonical = canonicalUrl(`/library/${post.slug}`)
  const rawTitle = post.title
  const title = buildAbsoluteTitle(rawTitle)
  const description = buildMinimalDescription(
    rawTitle,
    post.editorial?.seoDescription ??
      post.editorial?.takeaways?.[0] ??
      post.caption ??
      `Short lesson from Prism Library: ${post.title}.`,
  )
  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: DEFAULT_OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: { canonical },
    robots: { index: false, follow: false },
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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

  const canonical = canonicalUrl(`/library/${post.slug}`)
  const tikTokVideoId =
    post.platform === 'tiktok' ? getTikTokVideoId(post.permalink) : null
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <div className="prism-container pt-6">
          <Breadcrumbs
            items={[
              { name: 'home', url: '/' },
              { name: 'library', url: '/library' },
              { name: post.title, url: `/library/${post.slug}` },
            ]}
          />
        </div>

        <section className="pb-20 pt-6 sm:pb-24 sm:pt-10">
          <div className="prism-container">
            <div className="mx-auto max-w-3xl space-y-10">
              <header className="space-y-3">
                <p className="text-eyebrow text-subtle">Prism Library</p>
                <h1 className="text-title text-gradient max-w-[20ch] text-balance pb-1">
                  {post.title}
                </h1>
                {post.editorial?.speaker?.name ? (
                  <p className="text-base font-medium text-foreground">
                    {post.editorial.speaker.name}
                  </p>
                ) : null}
                {post.editorial?.speaker?.subtitle ? (
                  <p className="text-sm text-muted-foreground">
                    {post.editorial.speaker.subtitle}
                  </p>
                ) : null}
              </header>

              <div className="rounded-2xl border border-white/[0.08] bg-card p-3 sm:p-4">
                {post.platform === 'tiktok' ? (
                  tikTokVideoId ? (
                    <div className="flex justify-center">
                      <blockquote
                        className="tiktok-embed"
                        cite={post.permalink}
                        data-video-id={tikTokVideoId}
                      >
                        <section>
                          <a
                            href={post.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Watch on TikTok
                          </a>
                        </section>
                      </blockquote>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Embed unavailable.{' '}
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

              <section className="grid gap-8 text-[0.95rem] leading-7 text-muted-foreground sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-eyebrow text-subtle">
                    Speaker
                  </p>
                  {post.editorial?.speaker ? (
                    <div className="space-y-2">
                      <p className="text-base font-semibold text-foreground">
                        {post.editorial.speaker.name}
                      </p>
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
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
                  <p className="text-eyebrow text-subtle">
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
                  className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-foreground underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white/70 sm:col-span-2"
                >
                  Watch the original post
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {tikTokVideoId ? (
        <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
      ) : null}
      <WebPageSchema
        name={post.title}
        description={
          post.editorial?.takeaways?.[0] ??
          post.caption ??
          'Prism Library short lesson.'
        }
        url={canonical}
        image={
          post.thumbnailUrl && post.thumbnailUrl.startsWith('http')
            ? post.thumbnailUrl
            : post.thumbnailUrl
              ? canonicalUrl(post.thumbnailUrl)
              : 'https://www.design-prism.com/prism-opengraph.png'
        }
        isPartOfId="https://www.design-prism.com/#website"
      />
    </div>
  )
}
