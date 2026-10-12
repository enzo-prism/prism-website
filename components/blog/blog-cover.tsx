import Image from 'next/image'
import { Cpu, Megaphone, PenTool } from 'lucide-react'

import { PrismMark } from '@/components/prism/prism-logo'
import { getCoverLightStyle, hasCustomCover, type BlogTopic } from '@/components/blog/blog-utils'
import { cn } from '@/lib/utils'

const TOPIC_ICONS = {
  engineering: Cpu,
  design: PenTool,
  marketing: Megaphone,
} as const

type BlogCoverProps = {
  slug: string
  title: string
  image?: string
  topic: BlogTopic
  topicLabel: string
  className?: string
  sizes?: string
  priority?: boolean
  /** Larger glyph and label for the featured post. */
  size?: 'default' | 'large'
}

/**
 * Post cover. Real cover art renders through next/image; posts that only
 * carry the shared Prism placeholder get a generated cover instead: grid,
 * two-color spectrum light seeded by the slug, and the topic glyph.
 */
export function BlogCover({
  slug,
  title,
  image,
  topic,
  topicLabel,
  className,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  priority = false,
  size = 'default',
}: BlogCoverProps) {
  const large = size === 'large'

  if (hasCustomCover(image)) {
    return (
      <div className={cn('relative overflow-hidden bg-popover', className)}>
        <Image
          src={image}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={/\.svg(?:$|[?#])/i.test(image)}
          className="object-cover transition-transform duration-500 ease-out group-hover/post:scale-[1.025] motion-reduce:transition-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 shadow-[inset_0_0_0_1px_oklch(1_0_0/6%)]"
        />
        <span className="sr-only">{title}</span>
      </div>
    )
  }

  const Icon = TOPIC_ICONS[topic]

  return (
    <div
      aria-hidden="true"
      className={cn('relative isolate overflow-hidden bg-popover', className)}
    >
      <div className="absolute inset-0 -z-10 blur-xl" style={getCoverLightStyle(slug)} />
      <div className="bg-grid absolute inset-0 -z-10 opacity-80" />
      <div className="bg-noise absolute inset-0 -z-10 opacity-[0.06]" />

      <div className="absolute inset-0 grid place-items-center">
        <div className="relative grid place-items-center">
          <span
            className={cn(
              'absolute rounded-[28px] border border-white/[0.06]',
              large ? 'size-44' : 'size-32',
            )}
          />
          <span
            className={cn(
              'absolute rounded-[22px] border border-white/[0.09]',
              large ? 'size-32' : 'size-24',
            )}
          />
          <span
            className={cn(
              'relative grid place-items-center rounded-2xl border border-white/15 bg-white/[0.05] shadow-[0_1px_0_0_oklch(1_0_0/12%)_inset,0_20px_40px_-20px_oklch(0_0_0/80%)] backdrop-blur-md transition-transform duration-500 ease-out group-hover/post:-translate-y-0.5 motion-reduce:transition-none',
              large ? 'size-20' : 'size-14',
            )}
          >
            <Icon
              className={cn('text-foreground/90', large ? 'size-8' : 'size-6')}
              strokeWidth={1.4}
            />
          </span>
        </div>
      </div>

      <div
        className={cn(
          'absolute flex items-center gap-2 font-mono uppercase tracking-[0.18em] text-foreground/60',
          large ? 'left-6 top-6 text-[11px]' : 'left-4 top-4 text-[10px]',
        )}
      >
        <PrismMark className={large ? 'size-4' : 'size-3.5'} />
        {topicLabel}
      </div>
    </div>
  )
}

export default BlogCover
