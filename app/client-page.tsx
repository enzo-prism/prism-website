import Image from "next/image"
import Link from "next/link"

import Footer from "@/components/footer"
import ScalingRoadmapForm from "@/components/forms/ScalingRoadmapForm"
import WallOfLoveCarousel from "@/components/home/WallOfLoveCarousel"
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

const TRAINING_COURSES = [
  {
    title: "2026 Website Development",
    icons: [
      { src: "/icons/vercel-alt.svg", alt: "Vercel logo" },
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1766512908/icone-github-noir_wxleps.webp",
        alt: "GitHub logo",
      },
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1766512907/cursor-logo-png_seeklogo-611587_zh5z4b.webp",
        alt: "Cursor logo",
      },
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1766513146/codex_qt4qbb.webp",
        alt: "Codex logo",
      },
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1766513383/New_Replit_Logo.svg_ekzu9u.webp",
        alt: "Replit logo",
      },
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1766513382/lovable-icon-bg-light_q8fx8w.webp",
        alt: "Lovable logo",
      },
    ],
  },
  {
    title: "Appear in AI Apps",
    icons: [
      { src: "/icons/chatgpt-4.svg", alt: "ChatGPT logo" },
      { src: "/icons/claude-logo.svg", alt: "Claude logo" },
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1766513009/gemini-color_lijrgt.webp",
        alt: "Gemini logo",
      },
    ],
  },
  {
    title: "Ads",
    icons: [
      { src: "/google-logo.png", alt: "Google logo" },
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1766512453/meta-logo_oxceei.webp",
        alt: "Meta logo",
      },
      { src: "/icons/tiktok-icon.svg", alt: "TikTok logo" },
    ],
  },
  {
    title: "Content",
    icons: [
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1766512757/YouTube_full-color_icon__2017.svg_yr4kgz.webp",
        alt: "YouTube logo",
      },
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1766512757/Twitter-X-Logo-vector-svg-cricut_1024x_uztyun.webp",
        alt: "X logo",
      },
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1766512757/Instagram_logo_2016.svg_grfivn.webp",
        alt: "Instagram logo",
      },
    ],
  },
]

const FAQ_ITEMS = [
  {
    question: "What is Prism?",
    answer: [
      "Prism is a software development and marketing company that helps busy founders implement the frontier of the most powerful technology and marketing strategies to grow their business.",
      "Prism drives increased leads, conversions, customer lifetime value, and referrals by overhauling the website, content systems, and ads for our clients, while freeing them from the time and energy spent on tech and marketing so they can focus on other key parts of their business. Additionally, Prism deploys world-class, deeply integrated analytics systems that enhance data-driven decision making inside the businesses we work with.",
    ],
  },
  {
    question: "How Do I Start with Prism?",
    answer: [
      "Submit the request form on our website to share some initial information about your business.",
      "If you are a good fit, our team will reach out with more details within 1 business day of your submission.",
    ],
  },
  {
    question: "Who is right for Prism?",
    answer: [
      "Founders with product-market fit, a product or service proven to be loved by customers, who want to get that product or service out to more people but are overwhelmed by the complexities of the tech and online parts of the business.",
      "If you are spending lots of time, energy, and money here, pulling focus away from your customers and core product or service, and still seeing mediocre results, you are the perfect fit for Prism.",
    ],
  },
]

const FOUNDER_PARAGRAPHS = [
  "Prism was founded by Enzo Sison to help businesses scale online. Enzo started his career early in the 2000s in middle school, when he had a YouTube channel for gaming and quickly fell in love with online business and online marketing. He scaled that up to millions of people, partnered with companies like Sony and FanDuel to help them with their marketing efforts, and ultimately learned how to build a community online and monetize that community. This was all during middle school and high school.",
  "Enzo went on to earn his engineering degree at Cal Poly in San Luis Obispo, where he studied computer science and user experience design. He also interned at Apple, deepening his expertise and passion for the intersection of world-class design, world-class engineering, and world-class storytelling.",
  "Today, Enzo is training for the Olympics in 2028 in Los Angeles for Team Philippines. He has done track and field his entire life and competed Division One in college. He is excited to leverage what he learned from his career in social media and Silicon Valley to help SMBs scale, level up their online presence, and grow their businesses.",
  "By taking the technical and online presence load off founders, they can focus on their core product, service, and customers. Enzo focuses entirely on technology marketing for his clients. It is a dynamic time with AI changing the landscape, and Prism is focused on finding new ways to create value for SMBs while improving impressions, conversions, and lifetime value month over month.",
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

export default function ClientPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 allow-capitalization">
        <section className="relative overflow-hidden py-16 sm:py-24 bg-background">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-muted/50 via-background to-background" />
          <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="container relative grid mx-auto gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit">
                Prism
              </Badge>
              <div className="space-y-4">
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Looking to elevate your online presence?
                </h1>
                <p className="text-balance text-lg text-muted-foreground">
                  Handoff to the team that's grown 20+ businesses from 0 to millions of impressions per month
                </p>
                <Card className="border-border/60 bg-card/80">
                  <CardContent className="p-4 text-sm font-semibold text-foreground">
                    More Exposure + More customers + Higher lifetime value $ per customer
                  </CardContent>
                </Card>
              </div>
              <Button
                asChild
                size="lg"
                className="w-full rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 sm:w-auto"
              >
                <Link href="/pricing">Elevate your Online Presence</Link>
              </Button>
            </div>

            <div>
              <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px]">
                <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-muted/70 blur-2xl" />
                <Card className="relative overflow-hidden border-border/70 bg-card shadow-2xl">
                  <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
                    <Image
                      src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1766510261/Enzo-headshot_p4y1kn.webp"
                      alt="Enzo Sison headshot"
                      fill
                      priority
                      sizes="(min-width: 1024px) 340px, (min-width: 640px) 320px, 280px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/50" />
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                    <Card className="w-fit border-border/30 bg-neutral-950/80 text-white backdrop-blur">
                      <CardContent className="p-3">
                        <Badge variant="secondary" className="w-fit bg-white/20 text-white hover:bg-white/30">
                          Founder
                        </Badge>
                        <p className="mt-2 text-base font-semibold text-white">Enzo Sison</p>
                      </CardContent>
                    </Card>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-16 sm:py-24 bg-muted/30">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-muted/60 via-transparent to-transparent" />
          <div className="container relative flex flex-col mx-auto gap-10 px-4 sm:px-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <Badge variant="secondary" className="w-fit">
                Learn From Prism
              </Badge>
              <div className="space-y-3">
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Free Advanced Training
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
                            <Image
                              src={icon.src}
                              alt={icon.alt}
                              width={20}
                              height={20}
                              className="h-5 w-5 object-contain"
                            />
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

        <section className="py-16 sm:py-24 bg-background">
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
                        {item.answer.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="relative overflow-hidden py-16 sm:py-24 bg-muted/30">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-muted/70 via-transparent to-transparent" />
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
                  <CardDescription className="text-base text-muted-foreground">
                    Founder of Prism
                  </CardDescription>
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

        <section className="relative overflow-hidden py-16 sm:py-24 bg-background">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-muted/50 via-transparent to-transparent" />
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
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

        <WallOfLoveCarousel />
      </main>
      <Footer />
    </div>
  )
}
