"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { LibraryPost, LibraryPlatform, SpeakerType } from "@/lib/library/types"

type SortOption = "newest" | "oldest" | "speaker"

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

const platformOptions: Array<{ value: "all" | LibraryPlatform; label: string }> = [
  { value: "all", label: "All platforms" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
]

const speakerOptions: Array<{ value: "all" | SpeakerType; label: string }> = [
  { value: "all", label: "All speaker types" },
  { value: "founder", label: "Founder" },
  { value: "athlete", label: "Athlete" },
]

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "speaker", label: "Speaker A-Z" },
]

const getTopTags = (posts: LibraryPost[], limit = 8) => {
  const tagCounts = new Map<string, number>()
  posts.forEach((post) => {
    if (!post.editorial?.tags?.length) return
    post.editorial.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
    })
  })
  return Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag]) => tag)
}

const getGroups = (posts: LibraryPost[]) =>
  Array.from(
    new Set(
      posts
        .map((post) => post.editorial?.group)
        .filter((group): group is string => Boolean(group))
    )
  ).sort((a, b) => a.localeCompare(b))

const buildSearchBlob = (post: LibraryPost) =>
  [
    post.title,
    post.caption ?? "",
    post.editorial?.speaker?.name ?? "",
    post.editorial?.tags?.join(" ") ?? "",
    post.editorial?.takeaways?.join(" ") ?? "",
    post.editorial?.group ?? "",
  ]
    .join(" ")
    .toLowerCase()

export default function LibraryClient({ posts, featured }: LibraryClientProps) {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortOption>("newest")
  const [platform, setPlatform] = useState<"all" | LibraryPlatform>("all")
  const [speakerType, setSpeakerType] = useState<"all" | SpeakerType>("all")
  const [group, setGroup] = useState("all")
  const [tag, setTag] = useState("all")

  const availableTags = useMemo(() => getTopTags(posts), [posts])
  const availableGroups = useMemo(() => getGroups(posts), [posts])

  const normalizedQuery = query.trim().toLowerCase()

  const filteredPosts = useMemo(() => {
    const results = posts.filter((post) => {
      if (platform !== "all" && post.platform !== platform) return false
      if (speakerType !== "all" && post.editorial?.speaker?.type !== speakerType) return false
      if (group !== "all" && post.editorial?.group !== group) return false
      if (tag !== "all" && !post.editorial?.tags?.includes(tag)) return false
      if (!normalizedQuery) return true
      return buildSearchBlob(post).includes(normalizedQuery)
    })

    const sorted = [...results]
    if (sort === "newest") {
      sorted.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    } else if (sort === "oldest") {
      sorted.sort(
        (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      )
    } else {
      sorted.sort((a, b) => {
        const nameA = a.editorial?.speaker?.name ?? a.title
        const nameB = b.editorial?.speaker?.name ?? b.title
        return nameA.localeCompare(nameB)
      })
    }

    return sorted
  }, [group, normalizedQuery, platform, posts, sort, speakerType, tag])

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

      <section className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.6fr)_minmax(0,0.6fr)_minmax(0,0.6fr)]">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Search
            </p>
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search speakers, takeaways, or themes"
            />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Sort
            </p>
            <Select value={sort} onValueChange={(value) => setSort(value as SortOption)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Platform
            </p>
            <Select
              value={platform}
              onValueChange={(value) => setPlatform(value as "all" | LibraryPlatform)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                {platformOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Speaker
            </p>
            <Select
              value={speakerType}
              onValueChange={(value) => setSpeakerType(value as "all" | SpeakerType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Speaker type" />
              </SelectTrigger>
              <SelectContent>
                {speakerOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {availableGroups.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Browse by group
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant={group === "all" ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setGroup("all")}
              >
                All groups
              </Button>
              {availableGroups.map((groupItem) => (
                <Button
                  key={groupItem}
                  type="button"
                  size="sm"
                  variant={group === groupItem ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setGroup(groupItem)}
                >
                  {groupItem}
                </Button>
              ))}
            </div>
          </div>
        ) : null}

        {availableTags.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Filter by tags
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant={tag === "all" ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setTag("all")}
              >
                All tags
              </Button>
              {availableTags.map((tagItem) => (
                <Button
                  key={tagItem}
                  type="button"
                  size="sm"
                  variant={tag === tagItem ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setTag(tagItem)}
                >
                  {tagItem}
                </Button>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>{filteredPosts.length} posts</span>
          {tag !== "all" ? <span>Tag: {tag}</span> : null}
        </div>
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
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
