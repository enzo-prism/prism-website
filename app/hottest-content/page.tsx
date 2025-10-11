import type { Metadata } from "next"
import Link from "next/link"

import InstagramEmbed from "@/components/instagram-embed"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HOTTEST_CONTENT } from "@/lib/hottest-content"

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
            <p className="mt-4 text-neutral-600 lowercase md:text-lg">
              experience the posts exactly how we shipped them—fully embedded from instagram so you get every caption,
              comment, and social signal.
            </p>
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
              <Link href="/get-started">book a strategy call</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
