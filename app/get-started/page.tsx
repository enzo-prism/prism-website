import type { ReactNode } from "react"
import Link from "next/link"
import type { Metadata } from "next"
import { ClipboardCheck, Code2, Megaphone, PenTool } from "lucide-react"

import GetStartedForm from "@/components/forms/GetStartedForm"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import VideoPlayer from "@/components/video-player"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import WallOfLoveCarousel from "@/components/home/WallOfLoveCarousel"

type FAQBlock =
  | { type: "paragraph"; content: ReactNode }
  | { type: "list"; items: string[] }

type FAQItem = {
  question: string
  answer: FAQBlock[]
}

const HERO_CTA_TEXT = "I'm ready to elevate"

const VSL_SOURCE = {
  src: "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763160814/prism_websites_vsl_2_ojqiku.mp4",
  poster: "https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0/prism_websites_vsl_2_ojqiku.jpg",
  caption:
    "Our team audits your online presence, creates a custom strategy, then handles all the execution for you 7-days a week.",
}

const PROGRAM_ROLES = [
  { title: "Website Developer", icon: Code2 },
  { title: "Designer", icon: PenTool },
  { title: "Marketer and Storyteller", icon: Megaphone },
  { title: "Project Manager", icon: ClipboardCheck },
]

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is Prism?",
    answer: [
      {
        type: "paragraph",
        content:
          "Prism is a done-for-you online growth team for busy founders. We handle the parts that drive discovery and revenue--your website, Google Maps/Google Business Profile SEO, content systems, and ads--so your business gets found, converts more customers, and increases lifetime value.",
      },
      {
        type: "paragraph",
        content:
          "We also set up clean, integrated tracking (analytics, attribution, dashboards) so you can see what's working, what's not, and where to double down--without guessing.",
      },
    ],
  },
  {
    question: "How do I start with Prism?",
    answer: [
      {
        type: "paragraph",
        content: "Submit the request form on our website with a few details about your business and goals.",
      },
      {
        type: "paragraph",
        content: (
          <>
            If you're a fit, we'll reach out within <strong>1 business day</strong> to
            schedule a quick call and walk through:
          </>
        ),
      },
      {
        type: "list",
        items: [
          "where you are today (traffic, leads, conversion, offers)",
          "what's blocking growth",
          "what we'd implement first",
          "timeline + pricing",
        ],
      },
    ],
  },
  {
    question: "Who is right for Prism?",
    answer: [
      {
        type: "paragraph",
        content: (
          <>
            Prism is for founders who already have <strong>product-market fit</strong>
            --customers want what you sell--and you're ready to scale your online
            presence without becoming the in-house marketing/tech team.
          </>
        ),
      },
      {
        type: "paragraph",
        content: "You're a strong fit if:",
      },
      {
        type: "list",
        items: [
          "you want more qualified leads (not vanity metrics)",
          "you're tired of duct-taped tools and inconsistent results",
          "you want one team to own website + SEO + ads + tracking end-to-end",
          "you can move fast and give feedback when needed",
        ],
      },
      {
        type: "paragraph",
        content: (
          <>
            Prism is <strong>not</strong> a fit if you're pre-offer, still figuring out what
            you sell, or looking for a one-off &quot;quick website&quot; with no growth system
            behind it.
          </>
        ),
      },
    ],
  },
]

export const metadata: Metadata = {
  title: "Get started | Prism",
  description:
    "Join Prism's Online Presence Transformation program to remove yourself as the bottleneck for growth.",
  alternates: {
    canonical: "https://www.design-prism.com/get-started",
  },
}

export default function GetStartedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 allow-capitalization">
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-muted/50 via-background to-background" />
          <div className="container relative mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:px-6">
            <Badge variant="secondary" className="w-fit">
              Elevate Your Results
            </Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Tired of handling all the marketing and tech yourself?
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Join our Online Presence Transformation program</span>
              <span className="hidden sm:inline"> - </span>
              <span className="block sm:inline">remove yourself as the bottleneck for growth 📈</span>
            </p>
            <VideoPlayer
              src={VSL_SOURCE.src}
              poster={VSL_SOURCE.poster}
              className="border-border/60 bg-card/90 shadow-lg"
            />
            <p className="text-base text-muted-foreground">
              {VSL_SOURCE.caption}
            </p>
            <Button
              asChild
              size="lg"
              className="w-full rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 sm:w-auto"
            >
              <Link href="#book-call">{HERO_CTA_TEXT}</Link>
            </Button>
          </div>
        </section>

        <WallOfLoveCarousel showCta={false} showEyebrow={false} />

        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <Badge variant="secondary" className="w-fit">
                Transformation program
              </Badge>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                What you'll get in the online presence transformation program
              </h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROGRAM_ROLES.map((role, index) => {
                const Icon = role.icon
                return (
                  <Card key={role.title} className="border-border/60 bg-card/90">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                          Role {String(index + 1).padStart(2, "0")}
                        </p>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/60 text-muted-foreground">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                      </div>
                      <p className="mt-3 text-lg font-semibold text-foreground">{role.title}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <div className="mt-10 flex flex-col items-center gap-4 text-center">
              <p className="text-base text-muted-foreground">
                Your team from Prism works 7 days a week to get you more leads, more customers, and better custom lifetime value.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
              >
                <Link href="#book-call">{HERO_CTA_TEXT}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="book-call" className="py-16 sm:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <Card className="border-border/60 bg-card/95 shadow-lg">
              <CardHeader className="space-y-3">
                <Badge variant="secondary" className="w-fit">
                  Book a call
                </Badge>
                <CardTitle className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
                  Exited to speak with you for our online presence transformation program.
                </CardTitle>
                <p className="text-base text-muted-foreground">
                  Book a call below to see if you are a fit.
                </p>
              </CardHeader>
              <CardContent>
                <GetStartedForm />
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container mx-auto flex flex-col gap-10 px-4 sm:px-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <Badge variant="secondary" className="w-fit">
                FAQs
              </Badge>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>
            <Card className="border-border/60 bg-card/90">
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="px-6">
                  {FAQ_ITEMS.map((item) => (
                    <AccordionItem key={item.question} value={item.question}>
                      <AccordionTrigger className="text-left text-base font-semibold text-foreground">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                        {item.answer.map((block, index) => {
                          if (block.type === "list") {
                            return (
                              <ul key={`list-${index}`} className="space-y-2 pl-4">
                                {block.items.map((itemText) => (
                                  <li key={itemText} className="list-disc">
                                    {itemText}
                                  </li>
                                ))}
                              </ul>
                            )
                          }
                          return <p key={`paragraph-${index}`}>{block.content}</p>
                        })}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
            <div className="flex justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
              >
                <Link href="#book-call">{HERO_CTA_TEXT}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
