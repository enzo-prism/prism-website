import type { Metadata } from "next"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HOTTEST_CONTENT } from "@/lib/hottest-content"

export const metadata: Metadata = {
  title: "Our Hottest Content | Prism",
  description:
    "See the Instagram reels and social content that drove massive reach for Prism clients. Each card shows real metrics and the strategy behind the results.",
}

function formatMetric(value: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value)
}

export default function HottestContentPage() {
  return (
    <main className="bg-neutral-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center md:mx-auto md:max-w-3xl">
          <Badge variant="outline" className="lowercase">
            our hottest content
          </Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tighter lowercase sm:text-5xl">
            the reels that broke through
          </h1>
          <p className="mt-4 text-neutral-600 lowercase md:text-lg">
            a snapshot of the instagram posts we engineered to go viral. every metric is pulled directly from the
            platform and backed by a repeatable playbook.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
          {HOTTEST_CONTENT.map((item) => (
            <Card key={item.slug} className="flex h-full flex-col justify-between border-neutral-200">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge className="capitalize">{item.platform}</Badge>
                  <span className="text-sm uppercase tracking-[0.24em] text-neutral-400">
                    {formatMetric(item.views)} views
                  </span>
                </div>
                <CardTitle className="text-3xl font-semibold lowercase">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-6 pb-6 text-neutral-600 lowercase">
                <div className="space-y-4">
                  <p>{item.summary}</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <MetricCard label="views" value={item.views} />
                    <MetricCard label="likes" value={item.likes} />
                    <MetricCard label="shares" value={item.shares} />
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
                >
                  <a href={item.instagramUrl} target="_blank" rel="noopener noreferrer">
                    open on instagram
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" className="rounded-full lowercase" asChild>
            <Link href="/get-started">book a strategy call</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

type MetricCardProps = {
  label: string
  value: number
}

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="rounded-lg bg-white px-4 py-5 text-center shadow-sm">
      <div className="text-xs font-medium uppercase text-neutral-500 tracking-[0.2em]">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-neutral-900">{formatMetric(value)}</div>
    </div>
  )
}
