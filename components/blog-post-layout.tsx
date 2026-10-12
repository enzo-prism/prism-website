import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import { BlogPostErrorBoundary } from '@/components/blog-error-boundary'
import BlogScrollProgress from '@/components/blog/BlogScrollProgress'
import BlogTableOfContents, { type BlogTocItem } from '@/components/blog/BlogTableOfContents'
import { BlogGridCard, type BlogCardPost } from '@/components/blog/blog-post-cards'
import { getCoverLightStyle, hasCustomCover } from '@/components/blog/blog-utils'
import CopyBlogMarkdownButton from '@/components/blog/copy-blog-markdown-button'
import Footer from '@/components/footer'
import { proseClassName } from '@/components/landing/prose'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { PrismMark } from '@/components/prism/prism-logo'
import { Section, SectionHeader } from '@/components/prism/section'
import { BlogPostSchema, BreadcrumbSchema, HowToSchema } from '@/components/schema-markup'
import { Badge } from '@/components/ui/badge'
import { canonicalUrl } from '@/lib/canonical'
import { toAbsoluteUrl } from '@/lib/url'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  slug: string
  title: string
  h1Title?: string
  author: string
  description: string
  date: string
  publishedDate?: string
  updatedDate?: string
  image?: string
  /** Frontmatter category label, e.g. "Local SEO". */
  category?: string
  readingMinutes?: number
  toc?: BlogTocItem[]
  related?: BlogCardPost[]
  openGraph?: {
    url?: string
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
  }
  canonical?: string
  howTo?: {
    title: string
    description: string
    totalTime?: string
    steps: { title: string; text: string }[]
    supplies?: string[]
    tools?: string[]
  }
}

/** Shared article grid: reading column plus a right rail for the TOC on xl. */
const ARTICLE_GRID =
  'mx-auto grid w-full max-w-[46rem] grid-cols-1 xl:max-w-[67rem] xl:grid-cols-[minmax(0,46rem)_15rem] xl:justify-between xl:gap-x-16'

function AuthorAvatar({ isEnzo, className }: { isEnzo: boolean; className?: string }) {
  if (isEnzo) {
    return (
      <Image
        src="/enzo-avatar.png"
        alt=""
        width={72}
        height={72}
        className={cn('size-9 shrink-0 rounded-full border border-white/10 bg-white object-cover', className)}
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-9 shrink-0 place-items-center rounded-full border border-white/10 bg-black',
        className,
      )}
    >
      <PrismMark className="size-5" />
    </span>
  )
}

export default function BlogPostLayout({
  children,
  slug,
  title,
  h1Title,
  author,
  description,
  date,
  publishedDate,
  updatedDate,
  image,
  category,
  readingMinutes,
  toc = [],
  related = [],
  openGraph,
  canonical,
  howTo,
}: Props) {
  const effectiveImageUrl = image
    ? toAbsoluteUrl(image)
    : toAbsoluteUrl('/prism-opengraph.png')
  const postUrl = canonicalUrl(canonical || `/blog/${slug}`)
  const publishedLabel =
    publishedDate ||
    new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date))
  const updatedLabel = updatedDate || undefined
  const authorName = author?.trim() || 'Prism'
  const isEnzoAuthor = authorName.toLowerCase() === 'enzo sison'
  const publishedIso = (() => {
    const parsed = new Date(date)
    return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString()
  })()
  const showCover = hasCustomCover(image)
  const hasToc = toc.length >= 3

  return (
    <div className="blog-reading-surface flex min-h-screen flex-col bg-background text-foreground">
      <BlogScrollProgress />
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1">
        <article>
          <header className="relative isolate overflow-x-clip pb-10 pt-10 sm:pb-14 sm:pt-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="bg-grid absolute inset-x-0 top-0 h-[520px] opacity-40" />
              <div
                className="absolute inset-x-0 top-0 h-[560px] opacity-70 blur-3xl"
                style={getCoverLightStyle(slug)}
              />
              <div className="absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-transparent via-background/40 to-background" />
            </div>

            <div className="prism-container">
              <div className={ARTICLE_GRID}>
                <div className="min-w-0">
                  <Link
                    href="/blog"
                    className="group/back -ml-1 inline-flex min-h-10 items-center gap-2 rounded-full px-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    <ArrowLeft
                      aria-hidden="true"
                      className="size-4 transition-transform duration-200 group-hover/back:-translate-x-0.5"
                    />
                    All posts
                  </Link>

                  <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mt-10">
                    {category ? (
                      <Badge variant="outline" className="max-w-full truncate">
                        {category}
                      </Badge>
                    ) : null}
                    {readingMinutes ? (
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                        {readingMinutes} min read
                      </span>
                    ) : null}
                  </div>

                  <h1 className="mt-5 text-balance pb-1 text-[clamp(2.15rem,1.55rem+2.6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-gradient">
                    {h1Title || title}
                  </h1>
                  <p className="text-lead mt-6 max-w-[60ch] text-pretty text-muted-foreground">
                    {description}
                  </p>

                  <div className="mt-9 flex flex-col gap-5 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <AuthorAvatar isEnzo={isEnzoAuthor} />
                      <div className="min-w-0 text-sm leading-tight">
                        <p className="font-medium text-foreground">
                          {isEnzoAuthor ? (
                            <Link
                              href="/about"
                              className="rounded-sm underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-white/60 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                            >
                              {authorName}
                            </Link>
                          ) : (
                            authorName
                          )}
                        </p>
                        <p className="mt-1 text-[13px] text-subtle">
                          <time dateTime={publishedIso}>{publishedLabel}</time>
                          {updatedLabel && updatedLabel !== publishedLabel ? (
                            <>
                              <span aria-hidden="true"> · </span>
                              <span>Updated {updatedLabel}</span>
                            </>
                          ) : null}
                        </p>
                      </div>
                    </div>
                    <CopyBlogMarkdownButton slug={slug} className="self-start sm:self-auto" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="prism-container pb-16 sm:pb-24">
            <div className={ARTICLE_GRID}>
              <div className="min-w-0">
                {showCover ? (
                  <figure className="relative mb-12 aspect-[1.91/1] overflow-hidden rounded-2xl border border-white/[0.08] bg-popover sm:mb-14">
                    <Image
                      src={image}
                      alt=""
                      fill
                      priority
                      sizes="(min-width: 768px) 736px, 100vw"
                      unoptimized={/\.svg(?:$|[?#])/i.test(image)}
                      className="object-cover"
                    />
                  </figure>
                ) : null}

                {hasToc ? (
                  <BlogTableOfContents items={toc} variant="disclosure" className="mb-12 xl:hidden" />
                ) : null}

                <BlogPostErrorBoundary>
                  <div className={proseClassName}>{children}</div>
                </BlogPostErrorBoundary>

                <footer className="mt-16 flex flex-col gap-6 rounded-2xl border border-white/[0.08] bg-card p-6 sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                  <div className="flex items-center gap-4">
                    <AuthorAvatar isEnzo={isEnzoAuthor} className="size-12" />
                    <div className="min-w-0">
                      <p className="text-eyebrow text-subtle">Written by</p>
                      <p className="mt-1.5 font-medium text-foreground">
                        {authorName}
                        {isEnzoAuthor ? (
                          <span className="font-normal text-muted-foreground">, founder of Prism</span>
                        ) : null}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={isEnzoAuthor ? '/about' : '/blog'}
                    className="group/more inline-flex min-h-10 items-center gap-1.5 self-start rounded-full text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:self-auto"
                  >
                    {isEnzoAuthor ? "Read Enzo's story" : 'More from Prism'}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-200 group-hover/more:-translate-y-px group-hover/more:translate-x-px"
                    />
                  </Link>
                </footer>
              </div>

              {hasToc ? (
                <aside className="hidden xl:block">
                  <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto pb-6 scrollbar-hide">
                    <BlogTableOfContents items={toc} />
                  </div>
                </aside>
              ) : null}
            </div>
          </div>
        </article>

        {related.length > 0 ? (
          <Section aria-labelledby="blog-related-title" className="border-t border-white/[0.06]">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeader
                id="blog-related-title"
                eyebrow="Keep reading"
                title="more from the journal."
                titleClassName="text-[clamp(1.85rem,1.4rem+1.6vw,2.75rem)] font-semibold leading-[1] tracking-[-0.045em]"
              />
              <Link
                href="/blog"
                className="group/all inline-flex min-h-10 items-center gap-1.5 self-start rounded-full text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:self-auto"
              >
                All posts
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover/all:-translate-y-px group-hover/all:translate-x-px"
                />
              </Link>
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {related.map((post) => (
                <li key={post.slug} className="min-w-0">
                  <BlogGridCard post={post} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <FinalCta
          location="blog final cta"
          secondary={{ label: 'See the work', href: '/case-studies' }}
        />
      </main>

      <Footer />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: canonicalUrl('/') },
          { name: 'Blog', url: canonicalUrl('/blog') },
          { name: title, url: postUrl },
        ]}
      />
      <BlogPostSchema
        title={title}
        description={description}
        url={postUrl}
        imageUrl={effectiveImageUrl}
        datePublished={openGraph?.publishedTime || date}
        dateModified={openGraph?.modifiedTime || date}
        authorName={author || openGraph?.authors?.[0] || 'Prism'}
      />
      {howTo ? (
        <HowToSchema
          name={howTo.title}
          description={howTo.description}
          totalTime={howTo.totalTime}
          supplies={howTo.supplies ?? []}
          tools={howTo.tools ?? []}
          steps={howTo.steps.map((step) => ({ name: step.title, text: step.text }))}
        />
      ) : null}
    </div>
  )
}
