"use client"

import Link from "next/link"

import InstagramEmbed from "@/components/instagram-embed"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HOTTEST_CONTENT } from "@/lib/hottest-content"
import { trackCTAClick } from "@/utils/analytics"

const FEATURED_URLS = [
  "https://www.instagram.com/reel/C483wd1SFB6/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/C8ulpLrvSCl/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/C7CD7TArrBt/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
]

const featuredContent = [
  ...FEATURED_URLS.map((url) => HOTTEST_CONTENT.find((item) => item.instagramUrl === url)).filter(
    (item): item is (typeof HOTTEST_CONTENT)[number] => Boolean(item)
  ),
  ...HOTTEST_CONTENT.filter((item) => !FEATURED_URLS.includes(item.instagramUrl)),
].slice(0, 3)

export default function HottestContentSection() {
  return (
    <section className="bg-neutral-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-2">
            <Badge variant="outline" className="lowercase">
              free business content
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
              masters of the attention economy
            </h2>
            <p className="text-neutral-600 lowercase md:text-lg">
              prism makes content loved by millions
            </p>
          </div>
          <Button
            className="rounded-full lowercase"
            asChild
            onClick={() => trackCTAClick("see all hottest content", "hottest content section")}
          >
            <Link href="/hottest-content">see all results</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredContent.map((item) => (
            <Card key={item.slug} className="overflow-hidden border-neutral-200">
              <CardContent className="p-0">
                <InstagramEmbed url={item.instagramUrl} className="w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
