"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HOTTEST_CONTENT } from "@/lib/hottest-content"
import { trackCTAClick } from "@/utils/analytics"

const highlightedContent = HOTTEST_CONTENT.filter((item) => item.highlighted)
const fallbackContent = HOTTEST_CONTENT.filter((item) => !item.highlighted)
const featuredContent = [...highlightedContent, ...fallbackContent].slice(0, 3)

function formatMetric(value: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value)
}

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
              real posts, real metrics. these reels earned serious reach for our clients and community.
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
            <Card key={item.slug} className="flex flex-col justify-between border-neutral-200">
              <CardHeader>
                <Badge className="w-fit lowercase">{item.platform}</Badge>
                <CardTitle className="text-2xl font-semibold lowercase">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-6">
                <div className="space-y-4 text-neutral-600 lowercase">
                  <p>{item.summary}</p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-lg bg-neutral-100 px-3 py-4">
                      <div className="text-xs font-medium uppercase text-neutral-500 tracking-[0.2em]">views</div>
                      <div className="text-xl font-semibold text-neutral-900">{formatMetric(item.views)}</div>
                    </div>
                    <div className="rounded-lg bg-neutral-100 px-3 py-4">
                      <div className="text-xs font-medium uppercase text-neutral-500 tracking-[0.2em]">likes</div>
                      <div className="text-xl font-semibold text-neutral-900">{formatMetric(item.likes)}</div>
                    </div>
                    <div className="rounded-lg bg-neutral-100 px-3 py-4">
                      <div className="text-xs font-medium uppercase text-neutral-500 tracking-[0.2em]">shares</div>
                      <div className="text-xl font-semibold text-neutral-900">{formatMetric(item.shares)}</div>
                    </div>
                  </div>
                  {item.insight ? (
                    <div className="rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-600">
                      <p className="font-medium text-neutral-900">how we got these results</p>
                      <p className="mt-2">{item.insight}</p>
                    </div>
                  ) : null}
                </div>
                <Button
                  className="mt-4 w-full rounded-full lowercase"
                  asChild
                  onClick={() => trackCTAClick("open instagram post", `hottest content section | ${item.slug}`)}
                >
                  <a href={item.instagramUrl} target="_blank" rel="noopener noreferrer">
                    open on instagram
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
