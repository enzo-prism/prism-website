import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { BlogCover } from '@/components/blog/blog-cover'
import {
  BLOG_TOPIC_LABELS,
  formatBlogDate,
  toIsoDate,
  type BlogTopic,
} from '@/components/blog/blog-utils'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type BlogCardPost = {
  slug: string
  title: string
  description: string
  date: string
  category: string
  image?: string
  topic: BlogTopic
}

type BlogPostCardProps = {
  post: BlogCardPost
  className?: string
  headingLevel?: 'h2' | 'h3'
  priority?: boolean
  prefetch?: boolean
  /** Adds data-cta-* attributes for click tracking on embedded post rails. */
  trackCta?: boolean
}

/** Grid card: cover, category + date, title, two-line dek. */
export function BlogGridCard({
  post,
  className,
  headingLevel = 'h2',
  priority = false,
  prefetch = false,
  trackCta = false,
}: BlogPostCardProps) {
  const Heading = headingLevel
  const iso = toIsoDate(post.date)

  return (
    <article
      className={cn(
        'group/post relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/[0.16] motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        className,
      )}
    >
      <BlogCover
        slug={post.slug}
        title={post.title}
        image={post.image}
        topic={post.topic}
        topicLabel={BLOG_TOPIC_LABELS[post.topic]}
        priority={priority}
        className="aspect-[1.91/1] border-b border-white/[0.06]"
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Badge variant="outline" className="max-w-full truncate">
            {post.category}
          </Badge>
          {iso ? (
            <time dateTime={iso} className="font-mono text-[11px] tracking-[0.04em] text-subtle">
              {formatBlogDate(post.date)}
            </time>
          ) : null}
        </div>
        <Heading className="mt-4 text-pretty text-[1.15rem] font-semibold leading-[1.3] tracking-[-0.02em] text-foreground">
          <Link
            href={`/blog/${post.slug}`}
            prefetch={prefetch}
            {...(trackCta
              ? { 'data-cta-text': 'view blog post', 'data-cta-location': post.title }
              : {})}
            className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50"
          >
            {post.title}
          </Link>
        </Heading>
        <p className="mt-3 line-clamp-3 text-pretty text-[14.5px] leading-6 text-muted-foreground">
          {post.description}
        </p>
        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13px] font-medium text-subtle transition-colors group-hover/post:text-foreground"
        >
          Read the post
          <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/post:-translate-y-px group-hover/post:translate-x-px" />
        </span>
      </div>
    </article>
  )
}

/** Wide split card for the newest post on the first page. */
export function BlogFeaturedCard({ post }: { post: BlogCardPost }) {
  const iso = toIsoDate(post.date)

  return (
    <article className="group/post relative grid overflow-hidden rounded-3xl border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] transition-colors duration-300 hover:border-white/[0.16] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
      <BlogCover
        slug={post.slug}
        title={post.title}
        image={post.image}
        topic={post.topic}
        topicLabel={BLOG_TOPIC_LABELS[post.topic]}
        size="large"
        priority
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="aspect-[1.91/1] border-b border-white/[0.06] lg:aspect-auto lg:min-h-[400px] lg:border-b-0 lg:border-r"
      />
      <div className="flex flex-col justify-center p-6 sm:p-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Badge variant="outline" className="border-white/15 text-foreground">
            <span className="prism-live-dot size-1.5!" aria-hidden="true" />
            Latest
          </Badge>
          <Badge variant="outline" className="max-w-full truncate">
            {post.category}
          </Badge>
          {iso ? (
            <time dateTime={iso} className="font-mono text-[11px] tracking-[0.04em] text-subtle">
              {formatBlogDate(post.date)}
            </time>
          ) : null}
        </div>
        <h2 className="mt-6 max-w-[22ch] text-balance text-[clamp(1.6rem,1.2rem+1.5vw,2.4rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
          <Link
            href={`/blog/${post.slug}`}
            prefetch={false}
            className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-3xl focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 line-clamp-4 max-w-[52ch] text-pretty text-base leading-7 text-muted-foreground">
          {post.description}
        </p>
        <span
          aria-hidden="true"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground"
        >
          Read the post
          <ArrowRight className="size-4 transition-transform duration-200 group-hover/post:translate-x-0.5" />
        </span>
      </div>
    </article>
  )
}
