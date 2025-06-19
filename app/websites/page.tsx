import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MobileFirstWebsiteGallery from "@/components/mobile-first-website-gallery"
import PageViewTracker from "@/components/page-view-tracker"
import { FAQSchema } from "@/components/schema-markup"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ScrollProgressBar from "@/components/scroll-progress-bar"

export const metadata: Metadata = {
  title: "custom website design portfolio & services | prism",
  description:
    "explore our portfolio of high-converting websites for healthcare practices and small businesses. see real examples of mobile-responsive, seo-optimized sites that attract traffic and convert visitors into customers.",
  openGraph: {
    title: "custom website design portfolio & services | prism",
    description:
      "explore our portfolio of high-converting websites for healthcare practices and small businesses. see real examples of mobile-responsive, seo-optimized sites that attract traffic and convert visitors into customers.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://design-prism.com/websites",
  },
}

const websiteProjects = [
  {
    id: "4",
    title: "exquisite dentistry",
    image: "/exquisite-dentistry-mobile.png",
    url: "https://exquisiteveneersla.com/",
    category: "healthcare",
    description: "luxury cosmetic dentistry in los angeles",
    highlight: "interactive before/after sliders showcase transformations",
    color: "bg-purple-50",
    showVisitButton: true,
  },
  {
    id: "9",
    title: "belize kids",
    image: "/belize-kids-mobile.png",
    url: "https://belizekids.org",
    category: "nonprofit",
    description: "empowering belizean children to build a brighter future",
    highlight: "vibrant colors and clear donation pathways",
    color: "bg-yellow-50",
    showVisitButton: true,
  },
  {
    id: "7",
    title: "laguna beach dental arts",
    image: "/laguna-beach-dental-arts-mobile.png",
    url: "https://lagunabeachdentalarts.com",
    category: "healthcare",
    description: "experience exceptional dental care",
    highlight: "stunning ocean views reflect the practice location",
    color: "bg-cyan-50",
    showVisitButton: true,
  },
  {
    id: "3",
    title: "olympic bootworks",
    image: "/olympic-bootworks-mobile.png",
    url: "https://www.olympicbootworks.com",
    category: "retail",
    description: "performance solutions for athletes and outdoor enthusiasts",
    highlight: "bold, action-oriented design with clear shopping pathways",
    color: "bg-orange-50",
    showVisitButton: true,
  },
  {
    id: "2",
    title: "practice transitions institute",
    image: "/practice-transitions-institute-mobile.png",
    url: "https://pti.loveable.app",
    category: "healthcare",
    description: "expert guidance for healthcare practice transitions",
    highlight: "event-driven platform with webinar registration",
    color: "bg-blue-50",
    showVisitButton: false,
  },
  {
    id: "1",
    title: "we are saplings",
    image: "/we-are-saplings-mobile.png",
    url: "https://wearesaplings.com",
    category: "education",
    description: "nurturing resilient kids who bend, not break",
    highlight: "warm, inviting design with earth tones",
    color: "bg-green-50",
    showVisitButton: false,
  },
  {
    id: "5",
    title: "dr. christopher b. wong",
    image: "/dr-christopher-wong-mobile.png",
    url: "https://www.chriswongdds.com",
    category: "healthcare",
    description: "modern dental care with a gentle touch",
    highlight: "minimalist design with clear call-to-actions",
    color: "bg-teal-50",
    showVisitButton: true,
  },
  {
    id: "6",
    title: "town centre dental",
    image: "/town-centre-dental-mobile.png",
    url: "https://www.towncentredental.net",
    category: "healthcare",
    description: "enhance your smile at town centre dental",
    highlight: "warm, inviting design for family dentistry",
    color: "bg-rose-50",
    showVisitButton: true,
  },
  {
    id: "8",
    title: "coast periodontics",
    image: "/coast-periodontics-mobile.png",
    url: "http://coastperiodontics.com",
    category: "healthcare",
    description: "periodontal & implant therapy in san luis obispo",
    highlight: "coastal imagery reinforces the brand name",
    color: "bg-indigo-50",
    showVisitButton: true,
  },
]


const websiteFaqs = [
  {
    question: "how long does it take to build a website?",
    answer:
      "most websites are completed within 4-6 weeks from kickoff to launch. we'll provide a specific timeline during our consultation.",
  },
  {
    question: "what's included in your website design?",
    answer:
      "custom design, mobile optimization, seo setup, analytics, training, and post-launch support. unlimited revisions during design phase.",
  },
  {
    question: "how much does a custom website cost?",
    answer:
      "websites typically range from $5,000 to $15,000 depending on features. flexible payment plans available with 50% due at start.",
  },
]


export default function WebsitesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollProgressBar />
      <PageViewTracker title="Websites Portfolio & Services" />
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-24 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h1 className="text-6xl font-bold tracking-tight lowercase sm:text-7xl md:text-8xl text-neutral-900">
                websites.
              </h1>
              <p className="text-xl text-neutral-600 md:text-2xl lowercase max-w-xl mx-auto leading-relaxed">
                beautiful design meets business results.
              </p>
              <div className="pt-4">
                <Link href="/get-started?service=website-design">
                  <Button
                    size="lg"
                    className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-12 py-8 text-lg lowercase"
                  >
                    get started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium lowercase text-neutral-900 md:text-4xl">our work</h2>
          </div>
          <MobileFirstWebsiteGallery items={websiteProjects} />
        </section>
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl font-bold lowercase text-neutral-900 md:text-5xl">ready?</h2>
              <Link href="/get-started?service=website-design">
                <Button
                  size="lg"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-12 py-8 text-lg lowercase"
                >
                  get started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold lowercase text-center mb-12 text-neutral-900 md:text-4xl">questions</h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {websiteFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6 py-2 border-0">
                    <AccordionTrigger className="text-left lowercase font-medium text-lg hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-600 lowercase text-base leading-relaxed pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>


        <FAQSchema questions={websiteFaqs} />
      </main>
      <Footer />
    </div>
  )
}
