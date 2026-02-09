"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, CheckCircle, Home, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackCTAClick, trackPageView } from "@/utils/analytics"
import CoreImage from "@/components/core-image"
import { LOGO_CONFIG, LOGO_SIZES } from "@/lib/constants"
import PixelishImg from "@/components/pixelish/PixelishImg"
import { pixelishForEmoji } from "@/lib/pixelish-emoji"

export default function ThanksCallPageClient() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Track page view
    trackPageView("/thanks-call", "Thank You Call Scheduled Page")
    setIsLoaded(true)
  }, [])

  const handleInstagramClick = () => {
    trackCTAClick("Join Instagram Community", "thanks_call_page")
    window.open("https://www.instagram.com/the_design_prism/", "_blank")
  }

  const handleHomeClick = () => {
    trackCTAClick("Return Home", "thanks_call_page")
  }

  return (
    <main className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12 md:px-6">
      <div className="mx-auto max-w-2xl text-center">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="relative h-16 w-16 overflow-hidden rounded-lg">
            <CoreImage
              src={LOGO_CONFIG.src}
              alt={LOGO_CONFIG.alt}
              width={64}
              height={64}
              className={`object-contain ${LOGO_CONFIG.className}`}
              fallbackSrc={LOGO_CONFIG.fallbackSrc}
              trackingId="thanks_call_page_logo"
            />
          </div>
        </div>

        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        {/* Main Heading */}
        <h1 className="mb-4 text-4xl font-bold lowercase tracking-tight md:text-5xl">your call is scheduled</h1>

        {/* Subheading */}
        <p className="mb-8 text-lg text-gray-600 leading-relaxed">
          we're excited to connect with you! while you wait for our call, join our vibrant community on instagram where
          we share design inspiration, behind-the-scenes content, and tips to grow your business.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-8">
          <Button
            size="lg"
            className="gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            onClick={handleInstagramClick}
          >
            <Instagram className="h-5 w-5" />
            join our community
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Link href="/" onClick={handleHomeClick}>
            <Button variant="outline" size="lg" className="gap-2">
              <Home className="h-5 w-5" />
              return home
            </Button>
          </Link>
        </div>

        {/* Instagram Preview */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-3 lowercase">what you'll find on our instagram:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <PixelishImg src={pixelishForEmoji("🎨").src} alt="" size={18} invert={false} aria-hidden="true" />
              <span>design inspiration & trends</span>
            </div>
            <div className="flex items-center gap-2">
              <PixelishImg src={pixelishForEmoji("📱").src} alt="" size={18} invert={false} aria-hidden="true" />
              <span>behind-the-scenes content</span>
            </div>
            <div className="flex items-center gap-2">
              <PixelishImg src={pixelishForEmoji("💡").src} alt="" size={18} invert={false} aria-hidden="true" />
              <span>business growth tips</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Information */}
      {isLoaded && (
        <div className="mt-16 text-center text-sm text-gray-500 max-w-md">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Calendar className="h-4 w-4" />
            <span>a confirmation email has been sent to your inbox</span>
          </div>
          <p className="mb-2">
            if you need to reschedule or have any questions, please contact us at{" "}
            <a href="mailto:support@design-prism.com" className="underline hover:text-gray-700">
              support@design-prism.com
            </a>
          </p>
          <p className="text-xs">we'll reach out 15 minutes before your scheduled call time</p>
          <p className="mt-4 text-center text-gray-600">
            In the meantime, feel free to email us at{" "}
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
