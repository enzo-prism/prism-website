"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { trackFormSubmission } from "@/utils/analytics"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MinimalistVideoPlayer from "@/components/minimalist-video-player"
import BenefitsSwiper from "@/components/benefits-swiper"
import { useMobile } from "@/hooks/use-mobile"
import { trackSkoolEmailSubmission } from "@/utils/skool-pixel"

export default function InstagramLandingPage() {
  const isMobile = useMobile()
  const [email, setEmail] = useState("")
  const [bottomEmail, setBottomEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isBottomSubmitted, setIsBottomSubmitted] = useState(false)

  // Add this scroll function
  const scrollToEmailForm = () => {
    const emailFormSection = document.getElementById("email-form")
    if (emailFormSection) {
      emailFormSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Update the handleSubmit function to NOT automatically open the new tab
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Store the email address using our API route
    const storeEmail = async () => {
      try {
        // Send the email to our API route
        const response = await fetch("/api/store-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })

        if (!response.ok) {
          throw new Error("Failed to store email")
        }

        // Track the form submission
        trackFormSubmission("instagram_landing_email", "/ig")
        trackSkoolEmailSubmission(email, "top_form")

        // Set as submitted to show success message
        setIsSubmitted(true)

        // Remove the automatic tab opening
        // window.open("https://skool.com/prism-5437", "_blank")
      } catch (error) {
        console.error("Error storing email:", error)
        // You might want to show an error message to the user here
      }
    }

    storeEmail()
  }

  // Similarly update the handleBottomSubmit function
  const handleBottomSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Store the email address using our API route
    const storeEmail = async () => {
      try {
        // Send the email to our API route
        const response = await fetch("/api/store-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: bottomEmail }),
        })

        if (!response.ok) {
          throw new Error("Failed to store email")
        }

        // Track the form submission
        trackFormSubmission("instagram_landing_bottom_email", "/ig")
        trackSkoolEmailSubmission(bottomEmail, "bottom_form")

        // Set as submitted to show success message
        setIsBottomSubmitted(true)

        // Remove the automatic tab opening
        // window.open("https://skool.com/prism-5437", "_blank")
      } catch (error) {
        console.error("Error storing email:", error)
        // You might want to show an error message to the user here
      }
    }

    storeEmail()
  }

  const trackCTAClick = (ctaName: string, section: string) => {
    console.log(`Tracking CTA click: ${ctaName} in ${section}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-3 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tighter lowercase sm:text-5xl md:text-6xl">
                  10x your views in 30 days
                </h1>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Button onClick={scrollToEmailForm} className="rounded-full lowercase px-8 py-6 text-lg">
                    10x my views <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full lowercase px-8 py-6 text-lg border-neutral-300 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                    asChild
                  >
                    <a href="/">prism services</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="px-4 py-8 md:py-12 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="flex justify-center">
              <MinimalistVideoPlayer
                videoId="1085493625"
                thumbnailSrc="/video-thumbnail.png"
                className="w-full max-w-[400px]"
              />
            </div>
            <div className="flex justify-center mt-4">
              <div className="text-center">
                {/* Profile Picture - Added here */}
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-neutral-200 bg-white p-1 shadow-sm">
                    <Image src="/enzo-avatar.png" alt="Enzo Sison" width={56} height={56} className="object-contain" />
                  </div>
                </div>
                <p className="text-sm text-neutral-500 italic lowercase tracking-wide">enzo Sison, founder of prism</p>
                <p className="text-sm text-neutral-500 italic lowercase tracking-wide">38.5k+ instagram followers</p>
                <p className="text-sm text-neutral-500 italic lowercase tracking-wide">25k+ youtube subscribers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 text-neutral-300 text-5xl">"</div>
              <p className="text-xl md:text-2xl font-light text-neutral-700 lowercase mb-6 max-w-xl leading-relaxed">
                you don't have to see the whole staircase, just take the first step.
              </p>
              <p className="text-sm text-neutral-500 lowercase">martin luther king jr.</p>
              <div className="mt-12 w-16 h-px bg-neutral-200"></div>
            </div>
          </div>
        </section>

        {/* Email Capture Section */}
        <section className="px-4 py-12 md:py-20" id="email-form">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="bg-white rounded-xl border p-8 md:p-12 shadow-sm">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tighter lowercase mb-4">join our exclusive community</h2>
                <p className="text-neutral-600 lowercase">
                  enter your email to get instant access to our strategies and connect with other entrepreneurs
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8 bg-green-50 rounded-lg">
                  <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 lowercase">you're in!</h3>
                  <p className="text-neutral-600 lowercase mb-6 max-w-md mx-auto">
                    click the button below to join our exclusive community.
                  </p>
                  <a
                    href="https://skool.com/prism-5437"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCTAClick("join community now", "success message")}
                  >
                    <Button className="rounded-full lowercase px-6">
                      join community now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 lowercase mb-1">
                      email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full rounded-full py-6 text-lg lowercase">
                    get instant access <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-xs text-center text-neutral-500 lowercase">
                    we respect your privacy and will never share your information
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Community Benefits Section */}
        <section className="px-4 py-12 md:py-20 bg-neutral-50">
          <div className="container mx-auto px-0 sm:px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tighter lowercase mb-4">explore benefits</h2>
              <p className="text-neutral-600 lowercase max-w-2xl mx-auto px-4">
                join our exclusive community to access these powerful growth tools
              </p>
            </div>

            {isMobile ? (
              <BenefitsSwiper />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
                <div className="bg-white p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl">📝</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 lowercase">step-by-step guide</h3>
                  <p className="text-neutral-600 lowercase">
                    follow our proven process to 10x your views in 30 days with actionable steps you can implement
                    immediately
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl">🧰</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 lowercase">internal tool map</h3>
                  <p className="text-neutral-600 lowercase">
                    access our curated list of the best software and tools to accelerate each step of your growth
                    journey
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl">👥</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 lowercase">seasoned pros community</h3>
                  <p className="text-neutral-600 lowercase">
                    connect with entrepreneurs who've already 10x'd their views and bounce ideas off people who've done
                    it successfully
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl">🎁</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 lowercase">exclusive offers</h3>
                  <p className="text-neutral-600 lowercase">
                    get special member-only rates on our professional website and app development services to accelerate
                    your growth
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Final Simple CTA Section */}
        <section className="px-4 py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tighter lowercase mb-2">take the first step today</h2>
              <p className="text-neutral-600 lowercase mb-4">
                share your email and we'll send you a free access link to our community hub where you can start
                implementing our proven growth strategies
              </p>
            </div>

            {isBottomSubmitted ? (
              <div className="text-center py-6 bg-green-50 rounded-lg">
                <div className="mx-auto w-12 h-12 flex items-center justify-center mb-2">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-lg font-bold mb-2 lowercase">you're in!</h3>
                <p className="text-neutral-600 lowercase mb-4 max-w-md mx-auto">
                  click the button below to join our exclusive community.
                </p>
                <a
                  href="https://skool.com/prism-5437"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTAClick("join community now", "bottom success message")}
                >
                  <Button className="rounded-full lowercase px-5 py-2 text-sm">
                    join community now <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </a>
              </div>
            ) : (
              <form onSubmit={handleBottomSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={bottomEmail}
                  onChange={(e) => setBottomEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  required
                />
                <Button type="submit" className="rounded-full lowercase">
                  get free access <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
