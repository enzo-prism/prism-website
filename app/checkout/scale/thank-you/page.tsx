import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar } from "lucide-react"
import PixelishIcon from "@/components/pixelish/PixelishIcon"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "scale checkout received | prism",
  description: "we received your scale plan submission—book a kickoff call to accelerate next steps.",
  path: "/checkout/scale/thank-you",
  index: false,
})

export default function ScaleThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-24 px-6">
        <div className="max-w-lg text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-md border border-emerald-400/30 bg-emerald-500/10 p-4">
              <CheckCircle2 className="h-12 w-12 text-emerald-200" />
            </div>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Ready to Scale!
            <PixelishIcon
              src="/pixelish/graph-chart-high.svg"
              alt=""
              size={20}
              aria-hidden="true"
              className="ml-2 inline-block align-middle"
            />
          </h1>
          <p className="text-lg text-muted-foreground">
            We've received your submission. Our team will get back to you within 48 hours to find a time to meet to discuss the next steps of your project.
          </p>
          
          <div className="mt-6 rounded-md border border-border/60 bg-card/30 p-6 shadow-none backdrop-blur-sm">
             <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground font-pixel">
              Want to accelerate the process?
            </p>
            <div className="flex flex-col items-center gap-3">
              <Button asChild size="lg" className="w-full rounded-md">
                <Link href="https://calendar.notion.so/meet/enzosison/sfux4ogo" target="_blank">
                   <Calendar className="mr-2 h-4 w-4" />
                  Book Meeting Now
                </Link>
              </Button>
              <Button asChild variant="link" className="text-muted-foreground hover:text-foreground">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
