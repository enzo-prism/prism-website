import type { ReactNode } from "react"
import Link from "next/link"
import type { Metadata } from "next"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import BookDemoEmbed from "@/components/BookDemoEmbed"
import VideoPlayer from "@/components/video-player"
import ServiceIllustration from "@/components/animated/ServiceIllustration"
import GetStartedHeroScene from "@/components/get-started/GetStartedHeroScene"
import { WebPageSchema } from "@/components/schema-markup"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { buildRouteMetadata } from "@/lib/seo/metadata"

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
  { title: "Website Developer", variant: "role-developer" as const },
  { title: "Designer", variant: "role-designer" as const },
  { title: "Marketer and Storyteller", variant: "role-marketer" as const },
  { title: "Project Manager", variant: "role-manager" as const },
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
        content: <strong>The first step is simple: book a demo.</strong>,
      },
      {
        type: "paragraph",
        content:
          "You'll meet with our team on Zoom so we can get to know you, understand your business goals, and see if Prism is the right fit. If it is, we'll outline a clear plan for how we'd elevate your online presence and remove you as the bottleneck.",
      },
      {
        type: "paragraph",
        content: "During the demo, we'll review:",
      },
      {
        type: "list",
        items: [
          "your current website + marketing performance",
          "the biggest gaps holding you back",
          "the first 7-30 days of execution",
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

const PAGE_TITLE = "Get started | Prism"
const PAGE_DESCRIPTION =
  "Join Prism's Online Presence Transformation program to remove yourself as the bottleneck for growth."
const CANONICAL_URL = "https://www.design-prism.com/get-started"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/get-started",
  ogImage: "/prism-opengraph.png",
})

export default function GetStartedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="relative min-h-[420px] overflow-hidden bg-black sm:min-h-[520px]">
          <GetStartedHeroScene className="absolute inset-0" />
        </section>
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
              <span className="block sm:inline">remove yourself as the bottleneck for growth</span>
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

        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <Badge variant="secondary" className="w-fit">
                Transformation program
              </Badge>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Joining unlocks 4 powerful partners to grow your business
              </h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROGRAM_ROLES.map((role, index) => (
                <Card
                  key={role.title}
                  tabIndex={0}
                  role="group"
                  className="group border-border/60 bg-card/90 transition-[border-color,transform] duration-300 ease-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-300/60"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        Role {String(index + 1).padStart(2, "0")}
                      </p>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/60 text-muted-foreground">
                        <ServiceIllustration
                          variant={role.variant}
                          className="h-6 w-6 text-neutral-500 group-hover:text-orange-500 group-focus-visible:text-orange-500 group-active:text-orange-600"
                        />
                      </div>
                    </div>
                    <p className="mt-3 text-lg font-semibold text-foreground">{role.title}</p>
                  </CardContent>
                </Card>
              ))}
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
            <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:gap-4">
              <Badge variant="secondary" className="w-fit">
                Book a demo
              </Badge>
              <h2 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
                Learn More about the Online Presence Transformation Program
              </h2>
              <p className="text-base text-muted-foreground">
                Meet the team behind the transformations
              </p>
            </div>
            <div className="mt-8 -mx-4 sm:mx-0">
              <BookDemoEmbed className="sm:mx-auto sm:max-w-4xl" />
            </div>
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
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </div>
  )
}
