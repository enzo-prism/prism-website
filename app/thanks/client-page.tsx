"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, CheckCircle, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackCTAClick, trackPageView } from "@/utils/analytics"
import { useEffect } from "react"
import CoreImage from "@/components/core-image"
import confetti from "@/utils/confetti"
import { LOGO_CONFIG, LOGO_SIZES } from "@/lib/constants"

export default function ThanksPageClient() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Track page view
    trackPageView("/thanks", "Thank You Page")
    setIsLoaded(true)

    // If Rewardful is available, mark conversion
    if (typeof window !== "undefined" && window.rewardful) {
      try {
        // @ts-ignore - Rewardful is added via script
        window.rewardful("conversion")
      } catch (error) {
        console.error("Error tracking Rewardful conversion:", error)
      }
    }
  }, [])

  const handleScheduleClick = () => {
    confetti()
    setTimeout(() => {
      window.open("https://calendly.com/design-prism/kickoff", "_blank")
    }, 500)
  }

  return (
    <main className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12 md:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative h-16 w-16 overflow-hidden rounded-lg">
            <CoreImage
              src={LOGO_CONFIG.src}
              alt={LOGO_CONFIG.alt}
              width={64}
              height={64}
              className={`object-contain ${LOGO_CONFIG.className}`}
              fallbackSrc={LOGO_CONFIG.fallbackSrc}
              trackingId="thanks_page_logo"
            />
          </div>
        </div>

        <div className="mb-4 flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h1 className="mb-3 text-4xl font-bold lowercase tracking-tight md:text-5xl">thank you for your payment</h1>

        <p className="mb-8 text-lg text-gray-600">
          We're excited to start working on your project. The next step is to schedule your kickoff call so we can get
          started right away.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="gap-2" onClick={handleScheduleClick}>
            <Calendar className="h-5 w-5" />
            Book Kickoff Call
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Link href="/" onClick={() => trackCTAClick("Return Home", "thanks_page")}>
            <Button variant="outline" size="lg" className="gap-2">
              <Home className="h-5 w-5" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>

      {isLoaded && (
        <div className="mt-16 text-center text-sm text-gray-500">
          <p>A confirmation email has been sent to your inbox with your receipt and next steps.</p>
          <p className="mt-2">
            If you have any questions, you can reply to the email I just sent you
            or email me directly at{" "}
            <a href="mailto:support@design-prism.com" className="underline hover:text-gray-700">
              support@design-prism.com
            </a>
            .
          </p>
        </div>
      )}
    </main>
  )
}
