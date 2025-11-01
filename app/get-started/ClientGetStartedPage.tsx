"use client"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import VideoWithPoster from "@/components/video-with-poster"
import { useMobile } from "@/hooks/use-mobile"
import { useMobileAnimations } from "@/hooks/use-mobile-animations"
import { trackCTAClick } from "@/utils/analytics"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import {
    AlertCircle,
    ArrowRight,
    Globe2,
    MapPin,
    Megaphone,
    NotebookPen,
    Search,
    Share2,
    Sparkles,
    Timer,
    X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwpwbqpw"

const CHECKBOX_OPTIONS = [
  { label: "website", value: "website" },
  { label: "local listings (google maps, apple maps, yelp, etc.)", value: "local listings" },
  { label: "social media (instagram, youtube, linkedin, etc.)", value: "social media" },
  { label: "ads (google ads, meta ads, tiktok ads, etc.)", value: "ads" },
  { label: "online brand design", value: "brand design" }
]

const STEP_CARD_ACCENTS = [
  {
    border: "border-sky-200",
    icon: "bg-sky-100 text-sky-600",
  },
  {
    border: "border-neutral-200",
    icon: "bg-neutral-200 text-neutral-700",
  },
  {
    border: "border-emerald-200",
    icon: "bg-emerald-100 text-emerald-600",
  }
]

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
    title: "custom report in 24 hours",
    description:
      "you receive a private web page that ranks the most important stats, highlights wins, and outlines the exact moves to improve them.",
    icon: Timer,
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

type AnalysisHighlight = {
  label: string
  icon: LucideIcon
  pillClass: string
  iconClass: string
  description: string
  modal: {
    title: string
    why: string[]
    summary: string
  }
}

export default function ClientGetStartedPage({ heroOnly = false }: { heroOnly?: boolean }) {
  const { getViewportConfig } = useMobileAnimations()
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const isMobile = useMobile()
  const videoRef = useRef<HTMLDivElement | null>(null)
  const formSectionRef = useRef<HTMLDivElement | null>(null)
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formError, setFormError] = useState<string | null>(null)
  const [activeHighlight, setActiveHighlight] = useState<AnalysisHighlight | null>(null)

  const ActiveHighlightIcon = activeHighlight?.icon

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
    trackCTAClick("initiate analysis - scroll", "get-started hero")
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleHighlightCTA = () => {
    setActiveHighlight(null)
    setTimeout(() => handlePrimaryCTA(), 0)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)
    setFormStatus("idle")
    const form = event.currentTarget
    const firstInvalid = form.querySelector<HTMLElement>(":invalid")
    if (firstInvalid) {
      firstInvalid.focus()
      setFormStatus("error")
      setFormError("please fill out this field.")
      return
    }

    const formData = new FormData(form)
    const targets = formData.getAll("analysisTargets[]")
    if (!targets.length) {
      setFormError("select at least one part of your online presence")
      setFormStatus("error")
      return
    }
    setFormStatus("submitting")
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
      if (!response.ok) {
        throw new Error("request failed")
      }
      form.reset()
      setFormStatus("success")
      trackCTAClick("submitted formspree form", "get-started form")
    } catch (error) {
      console.error("form submission error", error)
      setFormStatus("error")
      setFormError("we couldn’t send the form. please try again in a moment.")
    }
  }

  const analysisHighlights: AnalysisHighlight[] = [
    {
      icon: Globe2,
      label: "seo",
      pillClass: "border-sky-200 bg-sky-50/80 text-sky-700",
      iconClass: "text-sky-600",
      description: "technical health, content coverage, and schema moves to grow organic reach.",
      modal: {
        title: "seo (search engine optimization)",
        why: [
          "seo helps your business get discovered by people already searching for what you offer.",
          "a well-optimized site means more visibility, more clicks, and more qualified leads without paying for ads.",
        ],
        summary: "in short: seo makes sure people can find you first.",
      },
    },
    {
      icon: Sparkles,
      label: "aeo",
      pillClass: "border-purple-200 bg-purple-50/80 text-purple-700",
      iconClass: "text-purple-600",
      description: "ai overview placements, answer boxes, and signals that secure ai search visibility.",
      modal: {
        title: "aeo (answer engine optimization)",
        why: [
          "voice assistants and ai chat tools are changing how people search.",
          "aeo ensures your business shows up when people ask questions, not just when they type keywords.",
        ],
        summary: "in short: aeo prepares your business for the next generation of search.",
      },
    },
    {
      icon: Share2,
      label: "social media",
      pillClass: "border-pink-200 bg-pink-50/80 text-pink-700",
      iconClass: "text-pink-600",
      description: "profile consistency, content cadence, and engagement paths that drive inquiries.",
      modal: {
        title: "social media",
        why: [
          "your social presence builds trust and keeps your brand top-of-mind.",
          "the right strategy turns followers into fans, and fans into customers.",
        ],
        summary: "in short: social media turns attention into connection.",
      },
    },
    {
      icon: Megaphone,
      label: "ads",
      pillClass: "border-amber-200 bg-amber-50/80 text-amber-700",
      iconClass: "text-amber-600",
      description: "paid search and social diagnostics to surface wasted spend and high-performing angles.",
      modal: {
        title: "ads",
        why: [
          "ads accelerate growth by putting your message in front of the right people instantly.",
          "when done well, they do more than drive clicks; they drive results.",
        ],
        summary: "in short: ads turn visibility into momentum.",
      },
    },
    {
      icon: MapPin,
      label: "local listings",
      pillClass: "border-emerald-200 bg-emerald-50/80 text-emerald-700",
      iconClass: "text-emerald-600",
      description: "google business profile accuracy, reviews, and nap coverage to capture local demand.",
      modal: {
        title: "local listings",
        why: [
          "your google business profile, yelp, and maps listings are often a customer's first impression.",
          "accurate, optimized listings help you appear in local searches and bring more people through your door.",
        ],
        summary: "in short: local listings make sure you show up when it matters most.",
      },
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Dialog
          open={Boolean(activeHighlight)}
          onOpenChange={(open) => {
            if (!open) setActiveHighlight(null)
          }}
        >
          {activeHighlight ? (
            <DialogContent className="px-6 py-7 sm:px-8">
              <DialogClose asChild>
                <button
                  type="button"
                  className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                  aria-label="close highlight details"
                >
                  <X className="h-4 w-4" />
                </button>
              </DialogClose>
              <div className="flex flex-1 flex-col overflow-y-auto">
                <DialogHeader className="gap-4 text-left">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full border ${activeHighlight.pillClass}`}>
                    {ActiveHighlightIcon ? (
                      <ActiveHighlightIcon className={`h-6 w-6 ${activeHighlight.iconClass}`} />
                    ) : null}
                  </div>
                  <DialogTitle>{activeHighlight.modal.title}</DialogTitle>
                  <DialogDescription>
                    why {activeHighlight.label} matters for growing online.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-6 space-y-6">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-400">
                      why it matters
                    </p>
                    <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
                      {activeHighlight.modal.why.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-800">
                    {activeHighlight.modal.summary}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  className="w-full rounded-full px-6 py-3 text-sm sm:w-auto"
                  onClick={handleHighlightCTA}
                >
                  start my analysis <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <DialogClose asChild>
                  <button
                    type="button"
                    className="w-full rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-900 sm:w-auto"
                  >
                    maybe later
                  </button>
                </DialogClose>
              </div>
            </DialogContent>
          ) : null}
        </Dialog>
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
                      videoId="1126507824"
                      posterSrc="/get%20started%20page%20art.webp"
                      width={isMobile ? 320 : 420}
                      height={isMobile ? 320 : 420}
                      autoplay
                      loop
                      muted
                      controls={false}
                      posterAlt="prism get started hero artwork"
                      trackAnalytics
                    />
                </div>
              ) : (
                <div
                  className={`relative overflow-hidden rounded-lg sm:rounded-xl border border-neutral-200 ${isMobile ? "h-[320px] w-[320px]" : "h-[420px] w-[420px]"}`}
                >
                  <Image
                    src="/get%20started%20page%20art.webp"
                    alt="prism get started hero artwork"
                    fill
                    className="object-cover"
                    sizes={isMobile ? "320px" : "420px"}
                    priority
                  />
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
                  online presence analysis
                </motion.h1>

                <motion.p
                  className="text-base leading-relaxed text-neutral-600 sm:text-lg md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
                  style={{ willChange: "transform, opacity" }}
                >
                  we audit your online presence + tell you the fastest way to grow
                </motion.p>

                <motion.div
                  className="flex flex-col items-center gap-4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                >
                  <span className="text-xs font-medium tracking-[0.32em] text-neutral-400">
                    opportunities we'll uncover
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-2.5">
                    {analysisHighlights.map((highlight) => {
                      const { icon: Icon, label, pillClass, iconClass } = highlight
                      return (
                        <Badge
                          key={label}
                          asChild
                          variant="outline"
                          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow md:hover:-translate-y-1 ${pillClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              trackCTAClick(`view ${label.toLowerCase()} insight`, "get-started hero")
                              setActiveHighlight(highlight)
                            }}
                            aria-label={`learn why ${label} matters for growth`}
                            className="flex items-center gap-2"
                          >
                            <Icon className={`h-4 w-4 ${iconClass}`} />
                            {label}
                          </button>
                        </Badge>
                      )
                    })}
                  </div>
                </motion.div>

                <motion.div
                  className="mt-8 flex flex-col items-center gap-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                >
                  <Button
                    className="rounded-full px-8 py-3 text-base hardware-hover touch-feedback"
                    onClick={handlePrimaryCTA}
                  >
                    initiate analysis <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-sm text-neutral-500">
                    report delivered within 24 hours
                  </p>
                  <p className="text-sm text-neutral-500">
                    need answer sooner?{" "}
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
                    share your info so we can start
                  </h2>
                </motion.div>

                <motion.div
                  className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={getViewportConfig()}
                >
                  <form
                    action={FORMSPREE_ENDPOINT}
                    method="POST"
                    onSubmit={handleSubmit}
                    className="grid gap-8 p-6 sm:p-8"
                    aria-live="polite"
                  >
                    <fieldset className="space-y-4">
                      <legend className="text-base font-semibold text-neutral-800">
                        what online parts of your business would you like us to analyze?
                      </legend>
                      <p className="text-sm text-neutral-600">
                        choose all that apply.
                      </p>
                      <div className="grid gap-3">
                        {CHECKBOX_OPTIONS.map((option) => (
                          <label
                            key={option.value}
                            className="flex items-start gap-3 rounded-2xl border border-neutral-200 px-4 py-3 text-left text-sm text-neutral-700 transition hover:border-neutral-300"
                          >
                            <input
                              type="checkbox"
                              name="analysisTargets[]"
                              value={option.value}
                              className="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                            />
                            <span className="leading-6 text-neutral-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="website-url" className="text-sm font-medium text-neutral-700">
                          website url <span className="text-neutral-400">(optional)</span>
                        </label>
                        <Input id="website-url" name="websiteUrl" type="text" inputMode="url" placeholder="https://yourwebsite.com" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="instagram-url" className="text-sm font-medium text-neutral-700">
                          instagram url <span className="text-neutral-400">(optional)</span>
                        </label>
                        <Input id="instagram-url" name="instagramUrl" type="text" inputMode="url" placeholder="https://instagram.com/yourhandle" />
                      </div>
                    </fieldset>

                    <div className="grid gap-4">
                      <label htmlFor="email" className="text-sm font-medium text-neutral-700">
                        email address to receive the report
                      </label>
                      <Input id="email" name="email" type="email" required placeholder="you@business.com" />
                    </div>

                    {formError ? (
                      <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <AlertCircle className="mt-0.5 h-4 w-4" aria-hidden />
                        <span>{formError}</span>
                      </div>
                    ) : null}

                    {formStatus === "success" ? (
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        thank you! our team will get back to you via email within 24 hours.
                      </div>
                    ) : null}

                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-end">
                      <div className="flex flex-col items-start gap-2">
                        <Button
                          type="submit"
                          disabled={formStatus === "submitting"}
                          className="rounded-full px-6 py-3 text-sm font-medium lowercase"
                        >
                          {formStatus === "submitting" ? "sending…" : "begin analysis"}
                        </Button>
                        <p className="text-xs text-neutral-500">ready in 24 hours</p>
                      </div>
                    </div>
                  </form>
                </motion.div>
              </div>
            </section>

            <section className="bg-neutral-50 px-4 py-12 sm:py-16">
              <div className="container mx-auto max-w-6xl">
                <motion.div className="mx-auto mb-12 max-w-3xl text-center" variants={fadeInY} initial="initial" whileInView="animate" viewport={getViewportConfig()}>
                  <h2 className="text-2xl font-light tracking-tight text-neutral-900 sm:text-3xl">
                    how the 24 hour report comes together
                  </h2>
                  <p className="mt-3 text-base text-neutral-600">
                    the same prism builders who ship client growth engines review every touchpoint — we capture, analyze, and deliver inside one day.
                  </p>
                </motion.div>

                <motion.ol
                  className="grid gap-6 md:grid-cols-3"
                  variants={staggerChildren}
                  initial="initial"
                  whileInView="animate"
                  viewport={getViewportConfig()}
                >
                  {STEPS.map(({ title, description, icon: Icon }, index) => {
                    const accent = STEP_CARD_ACCENTS[index % STEP_CARD_ACCENTS.length]
                    return (
                      <motion.li key={title} variants={fadeInY} className="h-full">
                        <Card className={`h-full border ${accent.border} bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}>
                          <CardHeader className="gap-4">
                            <div className="flex items-center gap-3">
                              <span className="inline-flex items-center rounded-full bg-neutral-900/5 px-3 py-1 text-xs font-medium lowercase text-neutral-600">
                                step {index + 1}
                              </span>
                              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${accent.icon}`}>
                                <Icon className="h-4 w-4" aria-hidden />
                              </span>
                            </div>
                            <CardTitle className="text-lg font-medium lowercase text-neutral-900">
                              {title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex flex-col gap-4 pb-6 text-sm leading-relaxed text-neutral-600">
                            <p>{description}</p>
                          </CardContent>
                        </Card>
                      </motion.li>
                    )
                  })}
                </motion.ol>
              </div>
            </section>

            <section className="px-4 py-12 sm:py-16">
              <div className="container mx-auto max-w-6xl">
                <motion.div className="mx-auto mb-10 max-w-3xl text-center" variants={fadeInY} initial="initial" whileInView="animate" viewport={getViewportConfig()}>
                  <h2 className="text-2xl font-light tracking-tight text-neutral-900 sm:text-3xl">
                    where we uncover growth opportunities
                  </h2>
                  <p className="text-base text-neutral-600">
                    every channel shows up in your private report with the data, wins, and next steps we surface.
                  </p>
                </motion.div>

                <motion.div
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  variants={staggerChildren}
                  initial="initial"
                  whileInView="animate"
                  viewport={getViewportConfig()}
                >
                  {analysisHighlights.map((highlight) => {
                    const { label, description, icon: Icon, pillClass, iconClass } = highlight
                    return (
                      <motion.div key={label} variants={fadeInY}>
                        <Card className="h-full border-neutral-200 bg-white">
                          <CardHeader className="flex flex-col gap-4">
                            <Badge
                              variant="outline"
                              className={`w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm ${pillClass}`}
                            >
                              <Icon className={`h-4 w-4 ${iconClass}`} />
                              {label}
                            </Badge>
                            <CardTitle className="text-lg font-medium text-neutral-900">
                              {highlight.modal.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex flex-col gap-4">
                            <p className="text-sm text-neutral-600">{description}</p>
                            <button
                              type="button"
                              onClick={() => {
                                trackCTAClick(`view ${label.toLowerCase()} insight`, "get-started opportunities")
                                setActiveHighlight(highlight)
                              }}
                              aria-label={`learn why ${label} matters for growth`}
                              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 underline-offset-4 transition hover:underline"
                            >
                              Why it matters
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>
            </section>

            <section className="px-4 py-16">
              <div className="container mx-auto max-w-3xl">
                <div className="rounded-3xl border border-neutral-200 bg-white px-8 py-12 shadow-sm sm:px-12">
                  <p className="text-xs uppercase tracking-[0.32em] text-neutral-500">
                    community initiative
                  </p>
                  <h2 className="mt-3 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
                    we build one free website every month
                  </h2>
                  <p className="mt-4 text-base text-neutral-600">
                    the prism scholarship supports community builders, nonprofits, and early founders who need a modern site but don&apos;t have the budget yet. apply in a few minutes and we&apos;ll review before the next pick.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Button
                      asChild
                      className="rounded-full px-8"
                    >
                      <Link
                        href="/scholarship"
                        onClick={() => trackCTAClick("view scholarship", "get-started scholarship block")}
                      >
                        apply to the scholarship <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full px-8"
                    >
                      <Link
                        href="/websites"
                        onClick={() => trackCTAClick("view scholarship examples", "get-started scholarship block")}
                      >
                        see recent sites
                      </Link>
                    </Button>
                  </div>
                </div>
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
