"use client"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import VideoWithPoster from "@/components/video-with-poster"
import { useMobile } from "@/hooks/use-mobile"
import { useMobileAnimations } from "@/hooks/use-mobile-animations"
import { trackCTAClick } from "@/utils/analytics"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import {
    ArrowRight,
    BadgeCheck,
    CheckCircle,
    ExternalLink,
    FileBarChart,
    NotebookPen,
    Search,
    Timer,
    Users,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const TYPEFORM_URL = "https://fxuqp40sseh.typeform.com/to/Hg2oLcss"

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
}

const fadeInY = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const STEPS: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "complete the 2 minute form",
    description:
      "share your website, key offers, and priority markets so we know exactly where to analyze and where to email the finished report.",
    icon: NotebookPen,
  },
  {
    title: "prism reviews every surface",
    description:
      "we audit your website, local listings, paid media footprint, and how ai search currently summarizes you to spot visibility and conversion gaps.",
    icon: Search,
  },
  {
    title: "custom report in 48 hours",
    description:
      "you receive a private web page that ranks the most important stats, highlights wins, and outlines the exact moves to improve them.",
    icon: Timer,
  },
]

const INSIDE_REPORT: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "visibility scoring",
    description:
      "map, organic, and ai overview presence with clarity on what’s working—and what’s missing—for each channel.",
    icon: FileBarChart,
  },
  {
    title: "conversion readiness",
    description:
      "hero copy, forms, offers, reviews, and social proof graded with concrete fixes to boost trust and response rates.",
    icon: Users,
  },
  {
    title: "priority actions",
    description:
      "a focused roadmap with the three highest leverage updates for the next 30 days, written so your team or ours can execute.",
    icon: CheckCircle,
  },
]

const EXAMPLE_REPORTS: { title: string; highlights: string[]; href: string }[] = [
  {
    title: "dental practice · coastal smiles",
    highlights: [
      "visibility score lifted from 62 → 91 with schema + listing fixes",
      "ai overview coverage added for “invisalign near me”",
      "3 patient experience proof blocks prioritized for homepage",
    ],
    href: "/report-examples/coastal-smiles",
  },
  {
    title: "med spa · radiant skin studio",
    highlights: [
      "google business profile actions up 38% after photo refresh",
      "landing page message map rewritten around top revenue services",
      "automated review follow-up script included in the report",
    ],
    href: "/report-examples/radiant-skin",
  },
]

export default function ClientGetStartedPage({ heroOnly = false }: { heroOnly?: boolean }) {
  const { getViewportConfig } = useMobileAnimations()
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const isMobile = useMobile()
  const videoRef = useRef<HTMLDivElement | null>(null)
  const formSectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!videoRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadVideo) {
            setShouldLoadVideo(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: "200px",
        threshold: 0.1,
      }
    )

    observer.observe(videoRef.current)
    return () => observer.disconnect()
  }, [shouldLoadVideo])

  const handlePrimaryCTA = () => {
    trackCTAClick("claim report - scroll", "get-started hero")
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const reportBadges = [
    {
      icon: BadgeCheck,
      label: "custom audit for your brand",
    },
    {
      icon: Timer,
      label: "ready within 48 hours",
    },
    {
      icon: Search,
      label: "channels: web, listings, ai, ads",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <section ref={videoRef} className="relative px-4 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col items-center">
              <motion.div
                className="relative mb-8 sm:mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: "transform, opacity" }}
              >
                {shouldLoadVideo ? (
                  <div className="overflow-hidden rounded-lg sm:rounded-xl">
                    <VideoWithPoster
                      videoId="1097023041"
                      posterSrc="/prism%20get%20started.webp"
                      width={isMobile ? 320 : 420}
                      height={isMobile ? 320 : 420}
                      autoplay
                      loop
                      muted
                      controls={false}
                      posterAlt="Looping Prism animation"
                      trackAnalytics
                    />
                  </div>
                ) : (
                  <div className={`${isMobile ? "h-[320px] w-[320px]" : "h-[420px] w-[420px]"} flex items-center justify-center rounded-lg bg-neutral-50 sm:rounded-xl`}>
                    <div className="text-neutral-400 text-sm">Loading...</div>
                  </div>
                )}
              </motion.div>

              <div className="mx-auto max-w-[68ch] space-y-6 text-center">
                <motion.h1
                  className="text-3xl font-extralight tracking-tight text-neutral-900 sm:text-4xl md:text-5xl lg:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: "transform, opacity" }}
                >
                  claim your free online presence report
                </motion.h1>

                <motion.p
                  className="text-base leading-relaxed text-neutral-600 sm:text-lg md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
                  style={{ willChange: "transform, opacity" }}
                >
                  fill out the 2 minute form so we know where to look, what matters most, and where to send the report when it’s ready.
                </motion.p>

                <motion.div
                  className="flex flex-wrap items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                >
                  {reportBadges.map(({ icon: Icon, label }) => (
                    <Badge
                      key={label}
                      variant="outline"
                      className="flex items-center gap-2 rounded-full border-neutral-200 bg-white px-4 py-2 text-sm lowercase text-neutral-900"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                    </Badge>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-8 flex flex-col items-center gap-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                >
                  <Button
                    className="rounded-full px-8 py-3 text-base lowercase hardware-hover touch-feedback"
                    onClick={handlePrimaryCTA}
                  >
                    claim my report <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">
                    report delivered within 48 hours
                  </p>
                  <p className="text-sm text-neutral-500">
                    need answers sooner?{" "}
                    <Link
                      href="/contact"
                      className="font-medium text-neutral-900 underline-offset-4 hover:underline"
                      onClick={() => trackCTAClick("contact from hero", "get-started hero")}
                    >
                      contact us directly
                    </Link>
                    .
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {heroOnly ? null : (
          <>
            <section ref={formSectionRef} className="px-4 py-12 sm:py-16">
              <div className="container mx-auto max-w-4xl space-y-10">
                <motion.div className="space-y-3 text-center" variants={fadeInY} initial="initial" whileInView="animate" viewport={getViewportConfig()}>
                  <h2 className="text-2xl font-light tracking-tight text-neutral-900 sm:text-3xl">
                    the form takes about two minutes
                  </h2>
                  <p className="text-base text-neutral-600">
                    your answers guide our audit. if you prefer, open the typeform in a new tab and we’ll still send the full report within 48 hours.
                  </p>
                </motion.div>

                <motion.div
                  className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={getViewportConfig()}
                >
                  <iframe
                    src={`${TYPEFORM_URL}?typeform-medium=embed-snippet`}
                    title="Prism online presence report form"
                    className="h-[720px] w-full"
                    allow="camera; microphone; autoplay; encrypted-media"
                    loading="lazy"
                  />
                </motion.div>

                <motion.div
                  className="flex flex-col items-center gap-3 text-sm text-neutral-600"
                  variants={fadeInY}
                  initial="initial"
                  whileInView="animate"
                  viewport={getViewportConfig()}
                >
                  <span>
                    having trouble with the embed?{" "}
                    <a
                      href={TYPEFORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-neutral-900 underline-offset-4 hover:underline"
                      onClick={() => trackCTAClick("open typeform new tab", "get-started form")}
                    >
                      open the typeform in a new tab
                    </a>
                    .
                  </span>
                </motion.div>
              </div>
            </section>

            <section className="bg-neutral-50 px-4 py-12 sm:py-16">
              <div className="container mx-auto max-w-6xl">
                <motion.div className="mx-auto mb-10 max-w-3xl text-center" variants={fadeInY} initial="initial" whileInView="animate" viewport={getViewportConfig()}>
                  <h2 className="text-2xl font-light tracking-tight text-neutral-900 sm:text-3xl">
                    how the 48 hour report comes together
                  </h2>
                  <p className="text-base text-neutral-600">
                    each step is handled by the same team that builds, measures, and optimizes client growth programs.
                  </p>
                </motion.div>

                <motion.div
                  className="grid gap-6 md:grid-cols-3"
                  variants={staggerChildren}
                  initial="initial"
                  whileInView="animate"
                  viewport={getViewportConfig()}
                >
                  {STEPS.map(({ title, description, icon: Icon }, index) => (
                    <motion.div key={title} variants={fadeInY}>
                      <Card className="h-full border-neutral-200 bg-white">
                        <CardHeader className="gap-3">
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-neutral-600">
                              step {index + 1}
                            </span>
                            <Icon className="h-5 w-5 text-neutral-900" />
                          </div>
                          <CardTitle className="text-lg font-medium lowercase text-neutral-900">
                            {title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-neutral-600">{description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            <section className="px-4 py-12 sm:py-16">
              <div className="container mx-auto max-w-6xl">
                <motion.div className="mx-auto mb-10 max-w-3xl text-center" variants={fadeInY} initial="initial" whileInView="animate" viewport={getViewportConfig()}>
                  <h2 className="text-2xl font-light tracking-tight text-neutral-900 sm:text-3xl">
                    what’s inside your report
                  </h2>
                  <p className="text-base text-neutral-600">
                    the report is built as a private web page you can share with your leadership team. every section is clickable with the raw data behind it.
                  </p>
                </motion.div>

                <motion.div
                  className="grid gap-6 md:grid-cols-3"
                  variants={staggerChildren}
                  initial="initial"
                  whileInView="animate"
                  viewport={getViewportConfig()}
                >
                  {INSIDE_REPORT.map(({ title, description, icon: Icon }) => (
                    <motion.div key={title} variants={fadeInY}>
                      <Card className="h-full border-neutral-200 bg-white">
                        <CardHeader className="flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <Icon className="h-6 w-6 text-neutral-900" />
                            <Badge variant="outline" className="rounded-full border-neutral-200 bg-white px-3 py-1 text-xs uppercase tracking-[0.24em] text-neutral-500">
                              in the report
                            </Badge>
                          </div>
                          <CardTitle className="text-lg font-medium lowercase text-neutral-900">
                            {title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-neutral-600">{description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            <section className="bg-neutral-50 px-4 py-12 sm:py-16">
              <div className="container mx-auto max-w-6xl">
                <motion.div className="mx-auto mb-10 max-w-3xl text-center" variants={fadeInY} initial="initial" whileInView="animate" viewport={getViewportConfig()}>
                  <h2 className="text-2xl font-light tracking-tight text-neutral-900 sm:text-3xl">
                    see example reports
                  </h2>
                  <p className="text-base text-neutral-600">
                    these walkthroughs show the exact format you’ll receive—live dashboards built in webflow that we update for you.
                  </p>
                </motion.div>

                <motion.div
                  className="grid gap-6 md:grid-cols-2"
                  variants={staggerChildren}
                  initial="initial"
                  whileInView="animate"
                  viewport={getViewportConfig()}
                >
                  {EXAMPLE_REPORTS.map(({ title, highlights, href }) => (
                    <motion.div key={title} variants={fadeInY}>
                      <Card className="h-full border-neutral-200 bg-white">
                        <CardHeader>
                          <CardTitle className="text-xl font-medium lowercase text-neutral-900">
                            {title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3 text-sm text-neutral-600">
                            {highlights.map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <BadgeCheck className="mt-0.5 h-4 w-4 text-neutral-900" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Link
                            href={href}
                            className="inline-flex items-center text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
                            onClick={() => trackCTAClick(`view example report - ${title}`, "get-started example reports")}
                          >
                            view report example <ExternalLink className="ml-1 h-4 w-4" />
                          </Link>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            <section className="px-4 py-16">
              <div className="container mx-auto max-w-3xl">
                <div className="rounded-3xl bg-neutral-900 px-8 py-12 text-center text-white sm:px-12">
                  <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
                    got an immediate question?
                  </h2>
                  <p className="mt-4 text-base text-neutral-200">
                    we’re happy to clarify metrics, talk through growth goals, or point you to the right resources while the report is being built.
                  </p>
                  <div className="mt-8 flex justify-center">
                    <Button
                      asChild
                      className="rounded-full bg-white px-8 py-3 text-base font-medium lowercase text-neutral-900 hover:bg-neutral-200"
                    >
                      <Link
                        href="/contact"
                        onClick={() => trackCTAClick("contact team", "get-started contact cta")}
                      >
                        talk to the team <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      {heroOnly ? null : <Footer />}
    </div>
  )
}
