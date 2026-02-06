import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "scale checkout received | prism",
  description: "we received your scale plan submission—book a kickoff call to accelerate next steps.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.design-prism.com/checkout/scale/thank-you",
  },
}

export default function ScaleThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-24 px-6">
        <div className="max-w-lg text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-emerald-100 p-4">
              <CheckCircle2 className="h-12 w-12 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">Ready to Scale! 📈</h1>
          <p className="text-lg text-zinc-600">
            We've received your submission. Our team will get back to you within 48 hours to find a time to meet to discuss the next steps of your project.
          </p>
          
          <div className="rounded-2xl bg-zinc-50 p-6 mt-6 border border-zinc-100">
             <p className="text-sm font-medium text-zinc-900 mb-4">
              Want to accelerate the process?
            </p>
            <div className="flex flex-col items-center gap-3">
              <Button asChild size="lg" className="w-full rounded-full bg-black text-white hover:bg-black/90 shadow-lg shadow-black/5">
                <Link href="https://calendar.notion.so/meet/enzosison/sfux4ogo" target="_blank">
                   <Calendar className="mr-2 h-4 w-4" />
                  Book Meeting Now
                </Link>
              </Button>
              <Button asChild variant="link" className="text-zinc-500 hover:text-black">
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
