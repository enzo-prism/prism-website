"use client"

import Link from "next/link"

import InstagramEmbed from "@/components/instagram-embed"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HOTTEST_CONTENT } from "@/lib/hottest-content"
import { trackCTAClick } from "@/utils/analytics"

const highlightedContent = HOTTEST_CONTENT.filter((item) => item.highlighted)
const fallbackContent = HOTTEST_CONTENT.filter((item) => !item.highlighted)
const featuredContent = [...highlightedContent, ...fallbackContent].slice(0, 3)

export default function HottestContentSection() {
  return (
    <section className="bg-neutral-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-2">
            <Badge variant="outline" className="lowercase">
              our hottest content
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
              social wins that moved the needle
            </h2>
            <p className="text-neutral-600 lowercase md:text-lg">
              embedded reels direct from instagram—see the proof without leaving the page.
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
