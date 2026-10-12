import type { CSSProperties } from 'react'

import { DEFAULT_BLOG_FEATURED_IMAGE } from '@/lib/blog-images'

export type BlogTopic = 'engineering' | 'design' | 'marketing'

export const BLOG_TOPIC_LABELS: Record<BlogTopic, string> = {
  engineering: 'Engineering',
  design: 'Design',
  marketing: 'Marketing',
}

/** Short, stable date label used on cards and post headers. */
export function formatBlogDate(value: string, month: 'short' | 'long' = 'short') {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month,
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function toIsoDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

const GENERIC_COVER_PATTERNS = [DEFAULT_BLOG_FEATURED_IMAGE, 'Prism_rgeypo', '/prism-opengraph.png']

/** True when a post has its own cover art (not the shared Prism placeholder). */
export function hasCustomCover(image?: string | null): image is string {
  if (!image || typeof image !== 'string') return false
  const trimmed = image.trim()
  if (!trimmed) return false
  return !GENERIC_COVER_PATTERNS.some((pattern) => trimmed.includes(pattern))
}

/** Rough reading time from MDX source (strips code, tags, and markdown syntax). */
export function estimateReadingMinutes(source: string) {
  const text = source
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`~\-[\]()!|]/g, ' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 230))
}

const SPECTRUM = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'] as const

function hashString(value: string) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

/**
 * Deterministic two-color spectrum light for a generated cover, so posts
 * without custom art still read as distinct without inventing imagery.
 */
export function getCoverLightStyle(seed: string): CSSProperties {
  const hash = hashString(seed)
  const first = SPECTRUM[hash % SPECTRUM.length]
  const second = SPECTRUM[(hash + 1 + ((hash >> 5) % 2)) % SPECTRUM.length]
  const x1 = 18 + ((hash >> 8) % 30)
  const x2 = 58 + ((hash >> 13) % 28)
  const y1 = 30 + ((hash >> 18) % 40)
  const y2 = 40 + ((hash >> 22) % 40)
  return {
    backgroundImage: [
      `radial-gradient(42% 60% at ${x1}% ${y1}%, color-mix(in oklch, var(--spectrum-${first}) 34%, transparent), transparent 72%)`,
      `radial-gradient(40% 58% at ${x2}% ${y2}%, color-mix(in oklch, var(--spectrum-${second}) 30%, transparent), transparent 72%)`,
    ].join(', '),
  }
}
