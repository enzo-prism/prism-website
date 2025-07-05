"use client"

import { useEffect, useRef, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MinimalistVideoPlayer from "@/components/minimalist-video-player"
import ScrollingTimeline from "@/components/scrolling-timeline"
import PageViewTracker from "@/components/page-view-tracker"
import { useMobile } from "@/hooks/use-mobile"
import { trackVideoInteraction } from "@/utils/analytics"
import Link from "next/link"
import { PersonSchema } from "@/components/schema-markup"

export default function AboutClientPage() {
  const isMobile = useMobile()
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLDivElement>(null)

  // Track when video section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !videoLoaded) {
            setVideoLoaded(true)
            trackVideoInteraction("about_video", "visible", "About page video visible")
          }
        })
      },
      { threshold: 0.3 },
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [videoLoaded])

  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="About Prism" />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-3">
                <div className="text-4xl">🌉</div>
                <h1 className="text-4xl font-bold tracking-tighter lowercase sm:text-5xl md:text-6xl">our story</h1>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase md:text-xl"></p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section ref={videoRef} className="px-4 py-8 md:py-12 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="mb-8 text-center"></div>

            <div className="flex justify-center">
              <div className="w-full max-w-[400px]">
                <MinimalistVideoPlayer
                  videoId="1085519114"
                  thumbnailSrc="/about-prism-thumbnail.png"
                  aspectRatio="9/16"
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-neutral-200 bg-white p-1 shadow-sm">
                    <img src="/enzo-avatar.png" alt="Enzo Sison" className="object-contain w-full h-full" />
                  </div>
                </div>
                <p className="text-sm text-neutral-500 italic lowercase tracking-wide">enzo sison, founder of prism</p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">our journey</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase">
                scroll down to explore the key milestones in our story
              </p>
            </div>

            <ScrollingTimeline />

            {/* Add a "View more" button */}
            <div className="mt-12 text-center">
              <a
                href="https://www.instagram.com/the_design_prism/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 lowercase transition-colors"
                onClick={() => trackVideoInteraction("instagram_link", "click", "About page Instagram link")}
              >
                follow our journey on instagram <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-4 py-16 md:py-24 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl mb-6">our mission</h2>
                <div className="space-y-4">
                  <p className="text-neutral-600 lowercase">
                    we believe that digital excellence should be accessible to businesses of all sizes. our mission is
                    to create websites, apps, and designs that not only look beautiful but drive real business results.
                  </p>
                  <p className="text-neutral-600 lowercase">
                    we're committed to helping our clients navigate the ever-changing digital landscape with solutions
                    that are both innovative and effective.
                  </p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-bold mb-3 lowercase">our values</h3>
                <ul className="space-y-3 text-neutral-600 lowercase">
                  <li className="flex items-start">
                    <span className="mr-2 text-xl">🚀</span>
                    <span>excellence in everything we create</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-xl">🤝</span>
                    <span>partnerships, not just projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-xl">📊</span>
                    <span>data-driven decisions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-xl">🔄</span>
                    <span>continuous innovation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 to-transparent"></div>
              <div className="absolute top-4 right-4 text-6xl opacity-10">✨</div>
              <div className="absolute bottom-4 left-4 text-4xl opacity-10">🚀</div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl mb-4">
                  ready to start your project?
                </h2>
                <p className="mx-auto max-w-[600px] text-neutral-300 lowercase mb-8 md:text-lg">
                  let's discuss how we can help bring your digital vision to life. schedule a free consultation to get
                  started.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/get-started"
                    className="inline-flex items-center justify-center rounded-full bg-white text-neutral-900 px-8 py-4 text-sm font-medium hover:bg-neutral-100 lowercase transition-all duration-200 hover:scale-105 shadow-lg"
                    onClick={() => trackVideoInteraction("get_started_cta", "click", "About page CTA to get started")}
                  >
                    schedule free consultation
                    <span className="ml-2">→</span>
                  </Link>

                  <div className="flex items-center gap-2 text-neutral-400 text-sm lowercase">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    no commitment required
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Person Schema for Enzo */}
      <PersonSchema
        personId="enzo-sison"
        name="Enzo Sison"
        jobTitle="Founder & CEO"
        description="Founder of Prism Agency, helping businesses create digital experiences that drive real results"
        image="https://design-prism.com/enzo-avatar.png"
        url="https://design-prism.com/about"
        sameAs={[
          "https://x.com/NosisTheGod",
          "https://www.linkedin.com/in/enzo-sison",
          "https://www.instagram.com/the_design_prism/"
        ]}
      />
    </div>
  )
}
