"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { trackCTAClick } from "@/utils/analytics"

// App data structure
interface AppItem {
  id: string
  title: string
  icon: string
  url: string
  description: string
  category: string
  highlight?: string
  isEmoji?: boolean
}

// App development FAQs
const appFaqs = [
  {
    question: "how much does it cost to develop a mobile app?",
    answer:
      "our mobile app development typically ranges from $15,000 to $75,000 depending on complexity, features, and platforms (ios, android, or both). we offer milestone-based payment schedules to distribute costs throughout the development process. we provide detailed estimates after understanding your specific requirements during our initial consultation.",
  },
  {
    question: "how long does it take to build a mobile app?",
    answer:
      "the timeline for app development varies based on complexity and features. simple apps can be completed in 2-3 months, while more complex applications may take 4-8 months. our process includes discovery, design, development, testing, and deployment phases. we provide a detailed timeline during our kickoff meeting and keep you updated throughout the project.",
  },
  {
    question: "do you build for both ios and android?",
    answer:
      "yes! we develop native apps for both ios and android platforms, as well as cross-platform solutions using technologies like react native or flutter when appropriate. we'll recommend the best approach based on your target audience, feature requirements, and budget considerations to ensure the optimal user experience across all devices.",
  },
  {
    question: "can you update my existing app instead of building a new one?",
    answer:
      "absolutely. we offer app audit, redesign, and enhancement services for existing applications. our team can evaluate your current app, identify improvement opportunities, and implement updates to enhance functionality, user experience, and performance. we can also help migrate outdated codebases to modern frameworks.",
  },
  {
    question: "what happens after my app is launched?",
    answer:
      "we provide comprehensive post-launch support including monitoring, bug fixes, and performance optimization. we offer flexible maintenance packages that include regular updates, feature enhancements, and technical support. we also help with app store optimization, user acquisition strategies, and analytics implementation to track and improve app performance.",
  },
  {
    question: "do you help with app store submission and approval?",
    answer:
      "yes, we handle the entire app store submission process for both apple app store and google play store. this includes preparing all required assets, writing compelling descriptions, setting up developer accounts if needed, addressing any review feedback, and ensuring your app meets all platform guidelines for approval.",
  },
]

// Real app data
const apps: AppItem[] = [
  {
    id: "1",
    title: "prism client dashboard",
    icon: "/prism-dashboard-icon.png",
    url: "https://growthprism.app",
    description: "analytics tool for tracking website performance, leads, and conversions",
    category: "business",
    highlight: "real-time performance metrics",
  },
  {
    id: "2",
    title: "peak",
    icon: "/peak-icon.png",
    url: "https://peaksurf.club",
    description: "surfing app with forecasts, spot conditions, and community features",
    category: "lifestyle",
    highlight: "5,000+ active users",
  },
  {
    id: "3",
    title: "track and field schedule",
    icon: "/track-and-field-icon.png",
    url: "https://pv-schedule.com",
    description: "schedule and performance tracking for athletes and coaches",
    category: "sports",
    highlight: "used by 12+ schools",
  },
  {
    id: "4",
    title: "sison yum",
    icon: "/sison-yum-icon.png",
    url: "https://sisonyum.com",
    description: "restaurant reviews for family and friends only, the reviews that matter most!",
    category: "food & beverage",
    highlight: "private review network",
  },
  {
    id: "5",
    title: "grind deck",
    icon: "🃏",
    url: "https://www.grinddeck.com/",
    description: "gamified time tracking and productivity tool for freelancers and teams",
    category: "business",
    highlight: "increased productivity by 27%",
    isEmoji: true,
  },
]

export default function AppsClientPage() {
  const [activeTab, setActiveTab] = useState("all")

  // Get unique categories for filter tabs
  const categories = ["all", ...new Set(apps.map((app) => app.category))]

  // Filter apps based on active category
  const filteredApps = activeTab === "all" ? apps : apps.filter((app) => app.category.toLowerCase() === activeTab)

  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="Mobile Apps" />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center max-w-3xl mx-auto">
              <div className="space-y-3">
                <div className="text-4xl">📱</div>
                <h1 className="text-4xl font-bold tracking-tighter lowercase sm:text-5xl md:text-6xl">
                  apps that do more.
                </h1>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase md:text-xl">
                  from idea to interface, we build powerful tools your users actually want to use.
                </p>
                <div className="pt-6">
                  <Link href="/get-started?service=app-development">
                    <Button className="rounded-full px-8 py-6 text-lg lowercase">
                      get started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <p className="text-xs text-neutral-500 mt-2 lowercase">2x sales in 90 days or don't pay</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="px-4 py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">our apps</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase">
                powerful tools designed with users in mind
              </p>
            </div>

            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeTab === category ? "default" : "outline"}
                  onClick={() => setActiveTab(category)}
                  className="lowercase rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="p-6">
                    <div className="mb-6 bg-black rounded-2xl p-4 w-20 h-20 flex items-center justify-center">
                      {app.isEmoji ? (
                        <span className="text-4xl">{app.icon}</span>
                      ) : (
                        <Image
                          src={app.icon || "/placeholder.svg"}
                          alt={`${app.title} icon`}
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-medium lowercase mb-2">{app.title}</h3>
                    <p className="text-sm text-neutral-600 lowercase mb-4">{app.description}</p>
                    {app.highlight && <div className="mb-4"></div>}
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackCTAClick(`open app`, app.title)}
                    >
                      <Button variant="outline" className="rounded-full lowercase w-full">
                        view app <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter lowercase text-center mb-12">
                frequently asked questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {appFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left lowercase font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-neutral-600 lowercase">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="mt-12 text-center">
                <p className="text-neutral-600 lowercase mb-6">have more questions? we're here to help.</p>
                <Link href="/get-started">
                  <Button className="rounded-full px-8 py-6 text-lg lowercase">
                    schedule a consultation <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
