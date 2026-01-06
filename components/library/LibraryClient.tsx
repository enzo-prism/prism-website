import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { LibraryPost, LibraryPlatform } from "@/lib/library/types"

type LibraryClientProps = {
  posts: LibraryPost[]
  featured: LibraryPost | null
}

const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
})

const PLATFORM_LABELS: Record<LibraryPlatform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
}

export default function LibraryClient({ posts, featured }: LibraryClientProps) {
  const featuredTags = featured?.editorial?.tags ?? []

  return (
    <div className="space-y-10">
      {featured ? (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">featured today</Badge>
            <span className="text-xs font-medium text-muted-foreground">
              rotates daily
            </span>
          </div>
          <Card className="overflow-hidden border-border/60 bg-card/95">
            <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/20">
                <img
                  src={featured.thumbnailUrl ?? "/placeholder.svg"}
                  alt={featured.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{PLATFORM_LABELS[featured.platform]}</Badge>
                  {featured.editorial?.group ? (
                    <Badge variant="secondary">{featured.editorial.group}</Badge>
                  ) : null}
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">
                    {featured.editorial?.speaker?.name ?? "Prism Library"}
                  </p>
                  <h2 className="text-2xl font-semibold text-foreground">
                    {featured.title}
                  </h2>
                </div>
                {featured.editorial?.speaker?.subtitle ? (
                  <p className="text-sm text-muted-foreground">
                    {featured.editorial.speaker.subtitle}
                  </p>
                ) : null}
                {featuredTags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {featuredTags.slice(0, 4).map((tagItem) => (
                      <Badge key={tagItem} variant="outline">
                        {tagItem}
                      </Badge>
                    ))}
                  </div>
                ) : null}
                <Button asChild className="w-fit rounded-full">
                  <Link href={`/library/${featured.slug}`}>Open details</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>
      ) : null}

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>{posts.length} posts</span>
        </div>
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card
                key={post.slug}
                className="overflow-hidden border-border/60 bg-card/95 transition-shadow hover:shadow-lg"
              >
                <Link href={`/library/${post.slug}`} className="group block h-full">
                  <div className="relative overflow-hidden bg-muted/40">
                    <img
                      src={post.thumbnailUrl ?? "/placeholder.svg"}
                      alt={post.title}
                      className="h-48 w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="flex h-full flex-col gap-3 p-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <Badge variant="outline">{PLATFORM_LABELS[post.platform]}</Badge>
                      <span>{DATE_FORMATTER.format(new Date(post.publishedAt))}</span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold text-foreground">
                        {post.title}
                      </h3>
                      {post.editorial?.speaker?.name ? (
                        <p className="text-sm text-muted-foreground">
                          {post.editorial.speaker.name}
                        </p>
                      ) : null}
                    </div>
                    {post.editorial?.tags?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {post.editorial.tags.slice(0, 3).map((tagItem) => (
                          <Badge key={tagItem} variant="secondary">
                            {tagItem}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                    {!post.curated ? (
                      <span className="text-xs font-medium text-muted-foreground">
                        Needs curation
                      </span>
                    ) : null}
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border/70 py-12 text-center text-sm text-muted-foreground">
            No posts match those filters yet. Try a broader search.
          </div>
        )}
      </section>
    </div>
  )
}
