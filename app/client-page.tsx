import Image from "next/image"
import Link from "next/link"

import PixelishIcon from "@/components/pixelish/PixelishIcon"
import CaseStudyCard from "@/components/case-study-card"
import Footer from "@/components/footer"
import HeroBenefits from "@/components/home/HeroBenefits"
import HeroMonthlyLeadsPill from "@/components/home/HeroMonthlyLeadsPill"
import {
  HomeFAQSection,
  HomeHeroScene,
  HomeScalingRoadmapForm,
  HomeSearchConsoleRail,
  HomeWallOfLoveCarousel,
} from "@/components/home/HomeDynamicSections"
import PrismEcosystemAnimation from "@/components/home/PrismEcosystemAnimation"
import Navbar from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import SoftwareAppCards from "@/components/software/SoftwareAppCards"
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
import { CASE_STUDIES } from "@/lib/case-study-data"

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
  | { type: "paragraph"; content: string }
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
        content: "The first step is simple: **book a demo.**",
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
        content:
          "Prism is for founders who already have **product-market fit** -- customers want what you sell -- and you're ready to scale your online presence without becoming the in-house marketing/tech team.",
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
        content:
          "Prism is **not** a fit if you're pre-offer, still figuring out what you sell, or looking for a one-off quick website with no growth system behind it.",
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
const HOMEPAGE_CASE_STUDY_SLUGS = [
  "exquisite-dentistry",
  "saorsa-growth-partners",
  "olympic-bootworks",
  "rebellious-aging",
  "canary-foundation",
]

const HOMEPAGE_CASE_STUDIES = HOMEPAGE_CASE_STUDY_SLUGS.map((slug) =>
  CASE_STUDIES.find((study) => study.slug === slug),
)
  .filter((study): study is (typeof CASE_STUDIES)[number] => Boolean(study))
  .map((study) => ({
    id: study.id,
    client: study.client,
    category: study.category,
    location: study.location,
    slug: study.slug,
  }))

const SECTION_SPACING_DEFAULT =
  "py-16 sm:py-20 lg:py-24 xl:py-28"
const SECTION_SPACING_COMPACT =
  "py-12 sm:py-16 lg:py-20"
const HERO_SECTION_CLASSES =
  "relative flex min-h-screen min-h-[100svh] items-center overflow-hidden -mt-[calc(var(--prism-header-height)+env(safe-area-inset-top,0px))] pt-[calc(var(--prism-header-height)+env(safe-area-inset-top,0px))] pb-[calc(var(--prism-header-height)+env(safe-area-inset-bottom,0px))] bg-background"

export default function ClientPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar mobileRevealOnFirstTap />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <section className={HERO_SECTION_CLASSES}>
          <HomeHeroScene className="absolute inset-0 z-0" />
          <div className="container relative z-10 mx-auto flex justify-center px-4 sm:px-6">
            <HeroMonthlyLeadsPill />
          </div>
        </section>
        <section className={`${SECTION_SPACING_DEFAULT} bg-background`}>
          <div className="container relative mx-auto px-4 sm:px-6">
            <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:gap-10">
              <div className="mx-auto w-full max-w-[560px]">
                <PrismEcosystemAnimation />
              </div>
              <div className="space-y-4 text-center lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  cohesive growth ecosystem
                </p>
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  every channel compounds the next
                </h2>
                <p className="text-balance text-base text-muted-foreground sm:text-lg">
                  Prism connects your{" "}
                  <Link
                    href="/websites"
                    className="underline decoration-border/60 underline-offset-4 hover:decoration-border"
                  >
                    website
                  </Link>
                  ,{" "}
                  <Link
                    href="/openai"
                    className="underline decoration-border/60 underline-offset-4 hover:decoration-border"
                  >
                    AI visibility
                  </Link>
                  ,{" "}
                  <Link
                    href="/seo"
                    className="underline decoration-border/60 underline-offset-4 hover:decoration-border"
                  >
                    search
                  </Link>
                  , and{" "}
                  <Link
                    href="/ads"
                    className="underline decoration-border/60 underline-offset-4 hover:decoration-border"
                  >
                    social media
                  </Link>{" "}
                  into one coordinated system so every customer touchpoint reinforces the others.
                </p>
                <p className="text-sm text-muted-foreground">
                  strategy + execution + feedback loops, all in one place.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={`${SECTION_SPACING_DEFAULT} bg-background`}>
          <div className="container relative mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-6xl rounded-3xl border border-zinc-800 bg-zinc-950 px-6 py-8 text-zinc-100 sm:px-10 sm:py-10">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-300/90">Features</p>
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Everything your brand needs to grow, in one system
                </h2>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
                <Card className="group border-zinc-800 bg-zinc-900/80 text-zinc-100 lg:row-span-2">
                  <CardHeader className="space-y-4">
                    <svg viewBox="0 0 64 64" className="h-36 w-full" fill="none" aria-hidden>
                      <path d="M32 12L16 22V42L32 52L48 42V22L32 12Z" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500/80 transition-colors duration-300 group-hover:text-zinc-300 group-active:text-zinc-300" />
                      <path d="M16 22L32 32L48 22" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500/80 transition-colors duration-300 group-hover:text-zinc-300 group-active:text-zinc-300" />
                      <path d="M32 52V32" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500/80 transition-colors duration-300 group-hover:text-zinc-300 group-active:text-zinc-300" />
                      <circle cx="32" cy="32" r="2" fill="currentColor" className="text-orange-400 transition-all duration-300 group-hover:scale-125 group-active:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.9)] group-active:drop-shadow-[0_0_8px_rgba(251,146,60,0.9)]" />
                      <circle cx="32" cy="12" r="1.5" fill="currentColor" className="text-zinc-400 transition-all duration-300 group-hover:-translate-y-0.5 group-active:-translate-y-0.5 group-hover:text-orange-300 group-active:text-orange-300" />
                      <circle cx="16" cy="22" r="1.5" fill="currentColor" className="text-zinc-400 transition-all duration-300 group-hover:-translate-x-0.5 group-active:-translate-x-0.5 group-hover:text-orange-300 group-active:text-orange-300" />
                      <circle cx="48" cy="42" r="1.5" fill="currentColor" className="text-zinc-400 transition-all duration-300 group-hover:translate-x-0.5 group-active:translate-x-0.5 group-hover:text-orange-300 group-active:text-orange-300" />
                    </svg>
                    <CardTitle className="text-xl text-zinc-50">High-converting websites</CardTitle>
                    <CardDescription className="text-zinc-300">
                      We build and optimize pages that turn attention into qualified leads, with clean UX, fast load speed, and conversion-focused structure.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="group border-zinc-800 bg-zinc-900/80 text-zinc-100">
                  <CardHeader className="space-y-3">
                    <svg viewBox="0 0 64 64" className="h-24 w-full" fill="none" aria-hidden>
                      <path d="M16 20H48" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500/80" />
                      <path d="M16 32H48" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500/80" />
                      <path d="M16 44H48" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500/80" />
                      <rect x="18" y="17" width="6" height="6" rx="1" fill="currentColor" className="text-zinc-400 transition-transform duration-300 group-hover:translate-x-1.5 group-active:translate-x-1.5" />
                      <rect x="36" y="29" width="10" height="6" rx="1" fill="currentColor" className="text-orange-400 transition-transform duration-300 group-hover:-translate-x-1 group-active:-translate-x-1" />
                      <rect x="22" y="41" width="8" height="6" rx="1" fill="currentColor" className="text-zinc-400 transition-transform duration-300 group-hover:translate-x-2 group-active:translate-x-2" />
                    </svg>
                    <CardTitle className="text-lg text-zinc-50">Search + AI visibility</CardTitle>
                    <CardDescription className="text-zinc-300">
                      Show up in Google and AI-driven discovery with a system that compounds every month.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="group border-zinc-800 bg-zinc-900/80 text-zinc-100">
                  <CardHeader className="space-y-3">
                    <svg viewBox="0 0 64 64" className="h-24 w-full" fill="none" aria-hidden>
                      <path d="M16 48H48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-zinc-500/80" />
                      <path d="M16 16V48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-zinc-500/80" />
                      <polyline points="18,44 26,34 34,40 46,20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200 group-active:text-zinc-200" />
                      <g className="transition-transform duration-500 group-hover:translate-x-7 group-active:translate-x-7 group-hover:-translate-y-6 group-active:-translate-y-6">
                        <circle cx="18" cy="44" r="4" fill="currentColor" className="text-orange-400" />
                      </g>
                    </svg>
                    <CardTitle className="text-lg text-zinc-50">Paid ads that scale</CardTitle>
                    <CardDescription className="text-zinc-300">
                      Launch and optimize campaigns across channels with clear attribution and ROI tracking.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="group border-zinc-800 bg-zinc-900/80 text-zinc-100 lg:row-span-2">
                  <CardHeader className="space-y-4">
                    <svg viewBox="0 0 64 64" className="h-36 w-full" fill="none" aria-hidden>
                      <rect x="14" y="14" width="36" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500/80" />
                      <rect x="20" y="20" width="10" height="10" rx="1" fill="currentColor" className="text-zinc-400 transition-all duration-300 group-hover:scale-105 group-active:scale-105 group-hover:text-zinc-300 group-active:text-zinc-300" />
                      <rect x="34" y="20" width="10" height="18" rx="1" fill="currentColor" className="text-zinc-400 transition-all duration-300 group-hover:scale-105 group-active:scale-105 group-hover:text-zinc-300 group-active:text-zinc-300" />
                      <rect x="20" y="34" width="24" height="10" rx="1" fill="currentColor" className="text-orange-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100" />
                    </svg>
                    <CardTitle className="text-xl text-zinc-50">Analytics that drive decisions</CardTitle>
                    <CardDescription className="text-zinc-300">
                      We connect tracking, attribution, and reporting so you can make decisions from real data instead of guesswork.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className={`${SECTION_SPACING_DEFAULT} bg-background`}>
          <div className="container relative mx-auto px-4 sm:px-6">
            <div className="space-y-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                proven results
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                20+ businesses, one growth ecosystem
              </h2>
              <p className="text-base text-muted-foreground sm:text-lg">
                We&apos;ve implemented this same strategy for 20+ businesses, here are recent examples.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-6 [&>*]:lg:col-span-2 [&>*:nth-child(4)]:lg:col-start-2 [&>*:nth-child(5)]:lg:col-start-4">
              {HOMEPAGE_CASE_STUDIES.map((study) => (
                <CaseStudyCard
                  key={study.id}
                  business={study.client}
                  category={study.category}
                  location={study.location}
                  slug={study.slug}
                />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/case-studies">View all case studies</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className={`${SECTION_SPACING_COMPACT} bg-background`}>
          <div className="container relative mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-2xl space-y-6 text-center lg:max-w-3xl">
              <div className="space-y-4">
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Looking to elevate your online presence?
                </h1>
                <p className="text-balance text-lg text-muted-foreground">
                  Done-for-you growth from a team focused on the KPIs that matter most to you.
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

        <HomeWallOfLoveCarousel enableMobileArrows />

        <section className={`relative ${SECTION_SPACING_COMPACT} bg-background`}>
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

              <HomeSearchConsoleRail
                slides={HERO_SEARCH_CONSOLE_SLIDES}
                iconSrc={HERO_SEARCH_ICON}
              />
            </div>
          </div>
        </section>

        <section className={`${SECTION_SPACING_COMPACT} bg-background`}>
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
            <SoftwareAppCards
              apps={PRISM_APPS}
              cardClassName="bg-card/90"
              buttonClassName="rounded-full"
            />
          </div>
        </section>

        <section className={`relative overflow-hidden ${SECTION_SPACING_DEFAULT} bg-muted/30`}>
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

        <section className={`${SECTION_SPACING_DEFAULT} bg-background`}>
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
            <HomeFAQSection faqItems={FAQ_ITEMS} />
          </div>
        </section>

        <section className={`relative overflow-hidden ${SECTION_SPACING_DEFAULT} bg-muted/30`}>
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

        <section className={`relative overflow-hidden ${SECTION_SPACING_DEFAULT} bg-background`}>
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
                    <HomeScalingRoadmapForm />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
