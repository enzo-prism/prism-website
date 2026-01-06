import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
    <div className="space-y-10">
      {featured ? (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">featured today</Badge>
            <span className="text-xs font-medium text-muted-foreground">
              rotates daily
            </span>
          </div>
          <Card className="border-border/60 bg-card/95">
            <div className="flex flex-col gap-4 p-6">
              {featured.editorial?.group ? (
                <Badge variant="secondary">{featured.editorial.group}</Badge>
              ) : null}
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
              <Button asChild className="w-fit rounded-full">
                <Link href={`/library/${featured.slug}`}>Open details</Link>
              </Button>
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
                <Link href={`/library/${post.slug}`} className="block h-full">
                  <CardContent className="flex h-full flex-col gap-3 p-4">
                    <div className="text-xs text-muted-foreground">
                      {DATE_FORMATTER.format(new Date(post.publishedAt))}
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
            No posts yet. Check back soon.
          </div>
        )}
      </section>
    </div>
  )
}
