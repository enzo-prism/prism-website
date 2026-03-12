import Link from "next/link"
import type { Metadata } from "next"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import BookDemoEmbed from "@/components/BookDemoEmbed"
import VideoPlayer from "@/components/video-player"
import PixelishIcon from "@/components/pixelish/PixelishIcon"
import { WebPageSchema } from "@/components/schema-markup"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { buildRouteMetadata } from "@/lib/seo/metadata"

type FAQItem = {
  question: string
  answer: string
}

const HERO_PRIMARY_CTA_TEXT = "Book your strategy call"
const HERO_SECONDARY_CTA_TEXT = "Get a free audit"
const PROGRAM_CTA_TEXT = "See how Prism can help"
const FAQ_CTA_TEXT = "Book your strategy call"
const FOOTER_PRIMARY_CTA_TEXT = "Book a 30 minute call"
const FOOTER_SECONDARY_CTA_TEXT = "Get a free audit"

const VSL_SOURCE = {
  src: "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763160814/prism_websites_vsl_2_ojqiku.mp4",
  poster: "https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0/prism_websites_vsl_2_ojqiku.jpg",
  caption:
    "See how Prism audits your current setup, identifies the biggest growth gaps, and turns the plan into focused execution.",
}

const PROGRAM_ROLES = [
  {
    title: "Website Developer",
    description: "Builds and improves your site for speed, clarity, conversion, and growth.",
    icon: "/pixelish/device-laptop.svg",
    iconAlt: "Website developer icon",
  },
  {
    title: "Designer",
    description: "Creates a polished brand experience that builds trust and makes your business stand out.",
    icon: "/pixelish/device-camera.svg",
    iconAlt: "Designer icon",
  },
  {
    title: "Marketer and Storyteller",
    description: "Clarifies your offer, sharpens your messaging, and helps attract the right customers.",
    icon: "/pixelish/chat-dots.svg",
    iconAlt: "Marketer and storyteller icon",
  },
  {
    title: "Project Manager",
    description: "Keeps everything moving so ideas turn into launched assets, campaigns, and measurable progress.",
    icon: "/pixelish/kanban.svg",
    iconAlt: "Project manager icon",
  },
]

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is Prism?",
    answer:
      "Prism is a conversion-focused growth partner that helps businesses improve their website, messaging, visibility, and marketing systems so they can generate more leads and customers.",
  },
  {
    question: "How do I get started?",
    answer:
      "Start by booking a strategy call. We will review your current online presence, learn about your goals, and recommend the best next steps based on where you are today.",
  },
  {
    question: "Who is right for Prism?",
    answer:
      "Prism is a strong fit for businesses that want better results online but do not want to manage the strategy, design, development, and marketing execution themselves.",
  },
]

const PAGE_TITLE = "Book your strategy call | Prism"
const PAGE_DESCRIPTION =
  "Prism audits your website, messaging, ads, and local visibility, then builds and executes a custom growth plan so you can stop managing it all yourself."
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
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-muted/50 via-background to-background" />
          <div className="container relative mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:px-6">
            <p className="max-w-2xl text-sm font-medium leading-6 text-muted-foreground">
              Get more leads without managing all the marketing and tech yourself
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Turn your online presence into a growth engine
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Prism audits your website, brand, ads, and local visibility, then builds a custom growth plan and executes
              it for you so you can stop being the bottleneck.
            </p>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">
              Get one integrated team to improve your website, sharpen your messaging, increase visibility, and turn
              more visitors into booked calls, leads, and customers.
            </p>
            <VideoPlayer
              src={VSL_SOURCE.src}
              poster={VSL_SOURCE.poster}
              className="border-border/60 bg-card/90 shadow-lg"
            />
            <p className="text-base text-muted-foreground">
              {VSL_SOURCE.caption}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 sm:w-auto"
              >
                <Link href="#book-call">{HERO_PRIMARY_CTA_TEXT}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full rounded-full sm:w-auto"
              >
                <Link href="/free-analysis">{HERO_SECONDARY_CTA_TEXT}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <Badge variant="secondary" className="w-fit">
                What you unlock with Prism
              </Badge>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                A complete growth team without hiring one in house
              </h2>
              <p className="max-w-3xl text-base leading-7 text-muted-foreground">
                When you join Prism, you get four specialists working together to improve every part of your online
                presence and move projects forward fast.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROGRAM_ROLES.map((role) => (
                <Card
                  key={role.title}
                  tabIndex={0}
                  role="group"
                  className="group border-border/60 bg-card/90 transition-[border-color,transform] duration-300 ease-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-300/60"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        Specialist
                      </p>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/60 text-muted-foreground">
                        <PixelishIcon
                          src={role.icon}
                          alt={role.iconAlt}
                          size={20}
                          className="h-5 w-5 opacity-75 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 group-active:translate-y-0"
                        />
                      </div>
                    </div>
                    <p className="mt-3 text-lg font-semibold text-foreground">{role.title}</p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{role.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-center gap-4 text-center">
              <p className="max-w-3xl text-base leading-7 text-muted-foreground">
                Your Prism team handles strategy and execution so you can focus on running the business, not chasing
                contractors, fixing tech, or managing marketing tasks every day.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
              >
                <Link href="#book-call">{PROGRAM_CTA_TEXT}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="book-call" className="py-16 sm:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:gap-4">
              <Badge variant="secondary" className="w-fit">
                Book a strategy call
              </Badge>
              <h2 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
                See how Prism would improve your online presence
              </h2>
              <p className="max-w-3xl text-base leading-7 text-muted-foreground">
                In your 30 minute call, we will review your current setup, identify your biggest growth gaps, answer
                your questions, and walk through the fastest path to better results.
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                You will leave the call with clear next steps and a better understanding of what to fix first.
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
                      <AccordionContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                        <p>{item.answer}</p>
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
                <Link href="#book-call">{FAQ_CTA_TEXT}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 py-16 sm:py-24">
          <div className="container mx-auto flex max-w-5xl flex-col gap-10 px-4 sm:px-6">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Prism</p>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Prism builds conversion-focused websites and growth systems for businesses that want measurable results,
                fast execution, and one partner that connects it all.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="border-border/60 bg-card/90">
                <CardContent className="p-6">
                  <p className="text-2xl font-semibold text-foreground">13+</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Launches delivered</p>
                </CardContent>
              </Card>
              <Card className="border-border/60 bg-card/90">
                <CardContent className="p-6">
                  <p className="text-2xl font-semibold text-foreground">Fast</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Weekly execution</p>
                </CardContent>
              </Card>
              <Card className="border-border/60 bg-card/90">
                <CardContent className="p-6">
                  <p className="text-2xl font-semibold text-foreground">One team</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Websites, ads, and local SEO under one roof</p>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
              >
                <Link href="#book-call">{FOOTER_PRIMARY_CTA_TEXT}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full"
              >
                <Link href="/free-analysis">{FOOTER_SECONDARY_CTA_TEXT}</Link>
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
