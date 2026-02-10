import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"

import PixelishIcon from "@/components/pixelish/PixelishIcon"
import Footer from "@/components/footer"
import ScalingRoadmapForm from "@/components/forms/ScalingRoadmapForm"
import HeroBenefits from "@/components/home/HeroBenefits"
import HeroMonthlyLeadsPill from "@/components/home/HeroMonthlyLeadsPill"
import UnicornHeroScene from "@/components/home/UnicornHeroScene"
import WallOfLoveCarousel from "@/components/home/WallOfLoveCarousel"
import SearchConsoleSnapshotsRail from "@/components/home/SearchConsoleSnapshotsRail"
import Navbar from "@/components/navbar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PRISM_APPS } from "@/lib/software-apps"

const TRAINING_COURSES = [
  {
    title: "Website Development",
    icons: [
      { src: "/pixelish/cloud.svg", alt: "Deploy icon" },
      { src: "/pixelish/command.svg", alt: "Source control icon" },
      { src: "/pixelish/device-mouse.svg", alt: "Cursor icon" },
      { src: "/pixelish/robot.svg", alt: "AI coding icon" },
      { src: "/pixelish/device-laptop.svg", alt: "Builder icon" },
      { src: "/pixelish/emoji-heart.svg", alt: "Heart icon" },
    ],
  },
  {
    title: "Appear in AI Apps",
    icons: [
      { src: "/pixelish/chat-dots.svg", alt: "AI chat icon" },
      { src: "/pixelish/chat-circle-dots.svg", alt: "AI assistant icon" },
      { src: "/pixelish/robot.svg", alt: "AI bot icon" },
    ],
  },
  {
    title: "Ads",
    icons: [
      { src: "/pixelish/lens.svg", alt: "Search icon" },
      { src: "/pixelish/socials-facebook.svg", alt: "Social ads icon" },
      { src: "/pixelish/socials-tiktok.svg", alt: "Short video icon" },
    ],
  },
  {
    title: "Content",
    icons: [
      { src: "/pixelish/socials-youtube.svg", alt: "YouTube icon" },
      { src: "/pixelish/socials-x.svg", alt: "X icon" },
      { src: "/pixelish/socials-instagram.svg", alt: "Instagram icon" },
    ],
  },
]

type FAQBlock =
  | { type: "paragraph"; content: ReactNode }
  | { type: "list"; items: string[] }

type FAQItem = {
  question: string
  answer: FAQBlock[]
}

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
            Prism is <strong>not</strong> a fit if you're pre-offer, still figuring
            out what you sell, or looking for a one-off &quot;quick website&quot; with
            no growth system behind it.
          </>
        ),
      },
    ],
  },
]

const FOUNDER_PARAGRAPHS = [
  "Prism was founded by Enzo Sison to help businesses grow online in a way that actually compounds. Enzo's career in digital marketing started early, building and scaling online audiences during middle school and high school, long before it was fashionable. Through years of experimentation, he learned how attention is earned, how communities are built, and how digital platforms can be turned into real, measurable business growth.",
  "Those early projects reached millions of people and led to partnerships with brands like Sony and FanDuel, where Enzo sharpened his understanding of distribution, monetization, and performance-driven marketing.",
  "Enzo later earned an engineering degree from Cal Poly, San Luis Obispo, studying computer science and user experience design. He also interned at Apple, where his approach was shaped by a deep respect for precision, craft, and the intersection of world-class design, engineering, and storytelling.",
  "Today, Enzo is training for the 2028 Olympics in Los Angeles, competing in track and field for Team Philippines. He competed Division I in college and continues to apply the same discipline, systems thinking, and long-term mindset to building Prism.",
  "At Prism, Enzo focuses entirely on technology-driven marketing, websites, SEO, ads, and systems that remove complexity for founders and operators. By taking ownership of the technical and digital surface area, Prism allows clients to stay focused on their product, service, and customers.",
  "The digital landscape is changing fast, especially with AI reshaping how businesses are discovered and evaluated. Prism exists to stay ahead of that curve, helping clients improve visibility, conversion, and lifetime value month after month, without noise or gimmicks.",
]

const ROADMAP_PHASES = [
  {
    title: "Visibility",
    description: "What to fix first and where to show up.",
  },
  {
    title: "Conversion",
    description: "How to turn attention into customers.",
  },
  {
    title: "Retention",
    description: "How to grow lifetime value over time.",
  },
]

type HeroClientIcon = {
  src: string
  alt: string
  label: string
}

const HERO_CLIENT_ICONS: HeroClientIcon[] = [
  { src: "/pixelish/lens.svg", alt: "Search icon", label: "Google Search" },
  { src: "/pixelish/socials-tiktok.svg", alt: "Short video icon", label: "TikTok" },
  {
    src: "/pixelish/socials-instagram.svg",
    alt: "Instagram icon",
    label: "Instagram",
  },
  { src: "/pixelish/chat-dots.svg", alt: "AI chat icon", label: "ChatGPT" },
  {
    src: "/pixelish/chat-circle-dots.svg",
    alt: "AI assistant icon",
    label: "Google Gemini",
  },
  {
    src: "/pixelish/socials-youtube.svg",
    alt: "YouTube icon",
    label: "YouTube",
  },
  {
    src: "/pixelish/socials-x.svg",
    alt: "X icon",
    label: "X (Twitter)",
  },
]

const HERO_SEARCH_CONSOLE_SLIDES = [
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767370938/Google-search-olympic-bootworks_issxqh.webp",
    alt: "Google Search Console growth for Olympic Bootworks",
    width: 498,
    height: 667,
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767370938/Google-search_lwg9un.webp",
    alt: "Google Search Console growth for a Prism client",
    width: 495,
    height: 666,
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767372191/LV-google-search_pyr1sx.webp",
    alt: "Google Search Console growth for a Prism client in Las Vegas",
    width: 496,
    height: 667,
  },
]

const HERO_SEARCH_ICON = "/pixelish/lens.svg"

const SECTION_SPACING =
  "min-h-screen min-h-[100svh] py-24 sm:py-32 lg:py-40 xl:py-48"
const HERO_SECTION_CLASSES =
  "relative flex min-h-screen min-h-[100svh] items-center overflow-hidden -mt-[calc(var(--prism-header-height)+env(safe-area-inset-top,0px))] pt-[calc(var(--prism-header-height)+env(safe-area-inset-top,0px))] pb-[calc(var(--prism-header-height)+env(safe-area-inset-bottom,0px))] bg-background"

export default function ClientPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar mobileRevealOnFirstTap />
      <main className="flex-1">
        <section className={HERO_SECTION_CLASSES}>
          <UnicornHeroScene className="absolute inset-0 z-0" />
          <div className="container relative z-10 mx-auto flex justify-center px-4 sm:px-6">
            <HeroMonthlyLeadsPill />
          </div>
        </section>

        <section className={`${SECTION_SPACING} bg-background`}>
          <div className="container relative mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-2xl space-y-6 text-center lg:max-w-3xl">
              <div className="space-y-4">
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Looking to elevate your online presence?
                </h1>
                <p className="text-balance text-lg text-muted-foreground">
                  Done-for-you growth from a team that's driven millions of monthly impressions for 20+ businesses.
                </p>
                <HeroBenefits />
              </div>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 sm:w-auto"
                >
                  <Link href="/get-started">Elevate your Online Presence</Link>
                </Button>
              </div>
              <div className="space-y-3">
                <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] font-pixel text-muted-foreground">
                  get more clients from
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {HERO_CLIENT_ICONS.map((icon) => (
                    <Popover key={icon.src}>
                      <PopoverTrigger asChild aria-haspopup={true}>
                        <button
                          type="button"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          aria-label={icon.label}
                        >
                          <PixelishIcon src={icon.src} alt={icon.alt} size={20} className="h-5 w-5 object-contain" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        side="top"
                        align="center"
                        sideOffset={8}
                        role="tooltip"
                        className="inline-flex w-auto items-center gap-0 whitespace-nowrap rounded-md border border-border/60 bg-popover px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] font-pixel text-popover-foreground shadow-md ring-0"
                      >
                        {icon.label}
                      </PopoverContent>
                    </Popover>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`relative ${SECTION_SPACING} bg-background`}>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_10%_0%,rgba(0,0,0,0.06),transparent_60%),radial-gradient(60%_60%_at_90%_20%,rgba(0,0,0,0.04),transparent_65%)]" />
          <div className="container relative mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:items-start">
              <div className="space-y-6 min-w-0">
                <div className="space-y-3">
                  <h2 className="text-balance break-words text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    search visibility that compounds
                  </h2>
                  <p className="text-balance text-base text-muted-foreground sm:text-lg">
                    prism clients show up more where customers are searching
                  </p>
                </div>
                <Link
                  href="/seo"
                  className="inline-flex text-sm font-medium text-muted-foreground underline decoration-border/70 underline-offset-4 transition-colors hover:text-foreground hover:decoration-border"
                >
                  learn more about prism's seo services
                </Link>
              </div>

              <SearchConsoleSnapshotsRail
                slides={HERO_SEARCH_CONSOLE_SLIDES}
                iconSrc={HERO_SEARCH_ICON}
              />
            </div>
          </div>
        </section>

        <section className={`${SECTION_SPACING} bg-background`}>
          <div className="container relative flex flex-col mx-auto gap-10 px-4 sm:px-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <Badge variant="secondary" className="w-fit">
                Apps developed by Prism
              </Badge>
              <div className="space-y-3">
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Tools to Help You Grow
                </h2>
                <p className="text-balance text-base text-muted-foreground">
                  Free software to help you increase leads, conversions, and customer LTV
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {PRISM_APPS.map((app) => (
                <Card
                  key={app.title}
                  className="flex h-full flex-col border-border/60 bg-card/90 transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardHeader className="space-y-3">
                    <PixelishIcon
                      src={app.icon.src}
                      alt={app.icon.alt}
                      size={app.icon.size}
                      aria-hidden="true"
                      className="opacity-95"
                    />
                    <CardTitle className="text-xl">{app.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {app.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                    >
                      <Link href={app.href} target="_blank" rel="noopener noreferrer">
                        {app.hrefLabel}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className={`relative overflow-hidden ${SECTION_SPACING} bg-muted/30`}>
          <div className="container relative flex flex-col mx-auto gap-10 px-4 sm:px-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <Badge variant="secondary" className="w-fit">
                Learn From Prism
              </Badge>
              <div className="space-y-3">
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  2026 Free Advanced Training
                </h2>
                <p className="text-balance text-base text-muted-foreground">
                  Videos, Guides, Templates, Downloads &amp; more to help you succeed:
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {TRAINING_COURSES.map((course) => (
                <Card
                  key={course.title}
                  className="flex h-full flex-col border-border/60 bg-card/90 transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardHeader className="space-y-3">
                    {course.icons?.length ? (
                      <div className="flex flex-wrap items-center gap-2">
                        {course.icons.map((icon) => (
                          <div
                            key={icon.src}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background"
                          >
                            <PixelishIcon src={icon.src} alt={icon.alt} size={20} className="h-5 w-5 object-contain" />
                          </div>
                        ))}
                      </div>
                    ) : null}
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge variant="outline" className="w-fit">
                      Coming soon
                    </Badge>
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    <Button variant="outline" className="w-full" disabled>
                      Take this course (coming soon)
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className={`${SECTION_SPACING} bg-background`}>
          <div className="container flex flex-col mx-auto gap-10 px-4 sm:px-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <Badge variant="secondary" className="w-fit">
                FAQs
              </Badge>
              <div className="space-y-3">
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Frequently asked questions
                </h2>
              </div>
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
          </div>
        </section>

        <section className={`relative overflow-hidden ${SECTION_SPACING} bg-muted/30`}>
          <div className="container relative mx-auto px-4 sm:px-6">
            <Card className="overflow-hidden border-border/60 bg-card/90">
              <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border">
                  <Image
                    src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765426902/Enzo_s_Headshot_xg546f.webp"
                    alt="Enzo Sison headshot"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">
                    About our Founder
                  </Badge>
                  <CardTitle className="text-2xl">Enzo Sison</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                {FOUNDER_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                >
                  <Link href="/about">Learn more about the Founder's Story</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className={`relative overflow-hidden ${SECTION_SPACING} bg-background`}>
          <div className="container mx-auto px-4 sm:px-6">
            <Card className="overflow-hidden rounded-3xl border-border/60 bg-card/95 shadow-lg">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                <div className="space-y-6 px-6 pb-8 pt-8 sm:px-10 sm:pt-10">
                  <Badge variant="secondary" className="w-fit">
                    Custom Framework for 2026
                  </Badge>
                  <div className="space-y-3">
                    <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                      Online Presence Scaling Roadmap
                    </h2>
                    <p className="text-base text-muted-foreground">
                      A clear sequence of the moves Prism makes to grow visibility, conversions, and lifetime value.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {ROADMAP_PHASES.map((phase, index) => (
                      <Card key={phase.title} className="border-border/60 bg-background/80">
                        <CardContent className="p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                            Phase {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-foreground">{phase.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{phase.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border/60 bg-muted/30 px-6 py-8 sm:px-10 lg:border-t-0 lg:border-l">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Badge variant="outline" className="w-fit">
                        Get the roadmap
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        One email with the full framework and the steps to execute it.
                      </p>
                    </div>
                    <ScalingRoadmapForm />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <WallOfLoveCarousel enableMobileArrows />
      </main>
      <Footer />
    </div>
  )
}
