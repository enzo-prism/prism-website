import { BlogPostErrorBoundary } from '@/components/blog-error-boundary'
import BlogScrollProgress from '@/components/blog/BlogScrollProgress'
import Navbar from '@/components/navbar'
import { BlogPostSchema, HowToSchema } from '@/components/schema-markup'
import { toAbsoluteUrl } from '@/lib/url'
import Link from 'next/link'

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
  readingTimeMinutes?: number
  category: string
  image?: string
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
  readingTimeMinutes,
  category,
  image,
  openGraph,
  canonical,
  howTo,
}: Props) {
  const effectiveImageUrl = image
    ? toAbsoluteUrl(image)
    : toAbsoluteUrl('/prism-opengraph.png')
  const postUrl =
    openGraph?.url || canonical || `https://www.design-prism.com/blog/${slug}`
  const publishedLabel =
    publishedDate ||
    new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date))
  const updatedLabel = updatedDate || undefined
  const readingTime = `${Math.max(1, readingTimeMinutes ?? 1)} min read`
  const isEnzoAuthor = author.trim().toLowerCase() === 'enzo sison'

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogScrollProgress />
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <article className="mx-auto w-full max-w-[46rem] px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-16">
          <header className="mb-12 border-b border-border/60 pb-10 sm:mb-16 sm:pb-14">
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              ← All writing
            </Link>

            <p className="mt-8 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:mt-10">
              {category}
            </p>
            <h1 className="blog-post-title mt-4 text-balance">
              {h1Title || title}
            </h1>
            <p className="blog-post-lead mt-5">{description}</p>

            <div className="mt-7 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <span>
                By{' '}
                {isEnzoAuthor ? (
                  <Link href="/about" className="underline underline-offset-4 hover:text-foreground">
                    {author}
                  </Link>
                ) : (
                  author
                )}
              </span>
              <span aria-hidden>·</span>
              <time dateTime={new Date(date).toISOString()}>{publishedLabel}</time>
              {updatedLabel && updatedLabel !== publishedLabel ? (
                <>
                  <span aria-hidden>·</span>
                  <span>Updated {updatedLabel}</span>
                </>
              ) : null}
              <span aria-hidden>·</span>
              <span>{readingTime}</span>
            </div>
          </header>

          <BlogPostErrorBoundary>
            <div className="prose-blog">{children}</div>
          </BlogPostErrorBoundary>

          <footer className="mt-16 border-t border-border/60 pt-8 sm:mt-24">
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            >
              Read more from Prism
            </Link>
          </footer>
        </article>
      </main>

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
