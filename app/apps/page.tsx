import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import { FAQSchema } from "@/components/schema-markup"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import AppsPortfolioGrid from "@/components/apps-portfolio-grid"

export const metadata: Metadata = {
  title: "mobile app development portfolio & services | prism",
  description:
    "view our portfolio of custom mobile apps for restaurants, healthcare, and small businesses. interactive demos showcase native ios and android apps that boost customer engagement and streamline operations.",
  openGraph: {
    title: "mobile app development portfolio & services | prism",
    description:
      "view our portfolio of custom mobile apps for restaurants, healthcare, and small businesses. interactive demos showcase native ios and android apps that boost customer engagement and streamline operations.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://design-prism.com/apps",
  },
}

const appProjects = [
  {
    id: "1",
    title: "prism dashboard",
    icon: "/prism-dashboard-icon.png",
    url: "https://growthprism.app",
    description: "real-time analytics for businesses",
    category: "business",
  },
  {
    id: "2",
    title: "peak surf",
    icon: "/peak-icon.png",
    url: "https://peaksurf.club",
    description: "surf forecasts & community",
    category: "lifestyle",
  },
  {
    id: "3",
    title: "track & field",
    icon: "/track-and-field-icon.png",
    url: "https://pv-schedule.com",
    description: "athletic performance tracking",
    category: "sports",
  },
  {
    id: "4",
    title: "sison yum",
    icon: "/sison-yum-icon.png",
    url: "https://sisonyum.com",
    description: "private restaurant reviews",
    category: "food",
  },
  {
    id: "5",
    title: "grind deck",
    icon: "🃏",
    url: "https://www.grinddeck.com/",
    description: "gamified productivity",
    category: "business",
    isEmoji: true,
  },
]

const appFaqs = [
  {
    question: "timeline",
    answer: "2-3 months for simple apps, 4-8 months for complex",
  },
  {
    question: "platforms",
    answer: "native ios & android, plus cross-platform solutions",
  },
  {
    question: "investment",
    answer: "$15k-75k with milestone-based payments",
  },
]

export default function AppsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollProgressBar />
      <PageViewTracker title="Mobile Apps Portfolio & Services" />
      <Navbar />
      <main className="flex-1">
        {/* Hero - Ultra minimal */}
        <section className="px-4 pt-24 pb-12 sm:pt-32 sm:pb-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-neutral-900 mb-6">
              apps
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-md font-light">
              beautiful interfaces, powerful experiences
            </p>
          </div>
        </section>

        {/* Portfolio Grid - Mobile first */}
        <section className="px-4 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto">
            <AppsPortfolioGrid projects={appProjects} />
          </div>
        </section>

        {/* CTA - Clean and simple */}
        <section className="px-4 py-24 sm:py-32">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 mb-8">
              ready to build?
            </h2>
            <Link href="/get-started?service=app-development">
              <Button
                size="lg"
                className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-8 py-3 text-base font-light transition-all duration-300 hover:scale-105"
              >
                start your app
              </Button>
            </Link>
          </div>
        </section>

        {/* FAQ - Minimal accordion */}
        <section className="px-4 py-16 sm:py-24 border-t border-neutral-100">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 mb-12 text-center">
              frequently asked
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {appFaqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border-b border-neutral-200 pb-4"
                >
                  <AccordionTrigger className="text-left font-light text-lg hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-600 font-light pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <FAQSchema questions={appFaqs} />
      </main>
      <Footer />
    </div>
  )
}
