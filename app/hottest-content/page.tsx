import type { Metadata } from "next"
import Link from "next/link"

import InstagramEmbed from "@/components/instagram-embed"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HOTTEST_CONTENT } from "@/lib/hottest-content"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Our Hottest Content | Prism",
  description:
    "See Prism’s top-performing Instagram reels exactly as they appeared on the platform. Live embeds with full context from the original posts.",
}

export default function HottestContentPage() {
  const uniqueContent = Array.from(
    new Map(HOTTEST_CONTENT.map((item) => [item.instagramUrl, item])).values()
  )

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Navbar />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center md:mx-auto md:max-w-3xl">
            <Badge variant="outline" className="lowercase">
              our hottest content
            </Badge>
            <h1 className="mt-4 text-4xl font-bold tracking-tighter lowercase sm:text-5xl">
              the reels that broke through
            </h1>
            <div className="mt-6 rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur">
              <div className="space-y-5 text-left text-neutral-700 md:text-xl leading-relaxed lowercase">
                <p className="font-medium text-neutral-900">
                  we obsess over dropping the most valuable playbooks for founders — clips that teach more in 30 seconds
                  than most courses do in hours.
                </p>
                <p>
                  every strategy is vetted against our own results. these are the exact tactics we use to grow prism and help
                  clients level up their online presence.
                </p>
                <p>
                  the mission is simple: give away so much insight that you come back, share it with your team, and build louder
                  than your competition.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button variant="outline" className="rounded-full lowercase" asChild>
                <Link href="/wall-of-love">wall of love</Link>
              </Button>
              <Button variant="secondary" className="rounded-full lowercase" asChild>
                <Link href="/get-started">{FREE_AUDIT_CTA_TEXT}</Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
            {uniqueContent.map((item) => (
              <Card key={item.instagramUrl} className="overflow-hidden border-neutral-200">
                <CardContent className="p-0">
                  <InstagramEmbed url={item.instagramUrl} className="w-full" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button variant="outline" className="rounded-full lowercase" asChild>
              <Link href="/get-started">{FREE_AUDIT_CTA_TEXT}</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
