import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { LibraryPost } from "@/lib/library/types"

type LibraryClientProps = {
  posts: LibraryPost[]
  featured: LibraryPost | null
}

const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
})

export default function LibraryClient({ posts, featured }: LibraryClientProps) {
  return (
    <div className="space-y-14">
      {featured ? (
        <section aria-labelledby="library-featured-title">
          <div className="prism-beam relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card p-6 sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_80%_at_100%_0%,oklch(0.63_0.19_295/14%),transparent_70%)]"
            />
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">
                <span className="prism-live-dot" aria-hidden="true" />
                Featured today
              </Badge>
              {featured.editorial?.group ? (
                <Badge variant="outline">{featured.editorial.group}</Badge>
              ) : null}
              <span className="text-xs text-subtle">Rotates daily</span>
            </div>
            <p className="mt-8 text-sm font-medium text-muted-foreground">
              {featured.editorial?.speaker?.name ?? "Prism Library"}
            </p>
            <h2
              id="library-featured-title"
              className="text-heading mt-2 max-w-[28ch] text-balance text-foreground"
            >
              {featured.title}
            </h2>
            {featured.editorial?.speaker?.subtitle ? (
              <p className="mt-3 max-w-[60ch] text-pretty text-[0.95rem] leading-7 text-muted-foreground">
                {featured.editorial.speaker.subtitle}
              </p>
            ) : null}
            <Button asChild className="mt-8 group/cta">
              <Link href={`/library/${featured.slug}`}>
                Open the lesson
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
                />
              </Link>
            </Button>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="library-all-title">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/[0.08] pb-5">
          <h2 id="library-all-title" className="text-heading text-foreground">
            every lesson.
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
            {posts.length} posts
          </span>
        </div>
        {posts.length > 0 ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/library/${post.slug}`}
                  className="group/lesson flex h-full flex-col gap-4 rounded-2xl border border-white/[0.08] bg-card p-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/[0.16] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <span className="flex items-center justify-between gap-3">
                    <time
                      dateTime={post.publishedAt}
                      className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle"
                    >
                      {DATE_FORMATTER.format(new Date(post.publishedAt))}
                    </time>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-subtle transition-[transform,color] duration-200 group-hover/lesson:-translate-y-0.5 group-hover/lesson:translate-x-0.5 group-hover/lesson:text-foreground"
                    />
                  </span>
                  <span className="space-y-1.5">
                    <span className="block text-[1.0625rem] font-medium leading-snug tracking-[-0.015em] text-foreground">
                      {post.title}
                    </span>
                    {post.editorial?.speaker?.name ? (
                      <span className="block text-sm text-muted-foreground">
                        {post.editorial.speaker.name}
                      </span>
                    ) : null}
                  </span>
                  {!post.curated ? (
                    <span className="mt-auto text-xs font-medium text-subtle">
                      Needs curation
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-white/15 py-12 text-center text-sm text-muted-foreground">
            No posts yet. Check back soon.
          </div>
        )}
      </section>
    </div>
  )
}
