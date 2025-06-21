import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import WebsitePortfolioGrid from "@/components/website-portfolio-grid"

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
    image: "/exquisite dentistry.png",
    url: "https://exquisiteveneersla.com/",
    category: "healthcare",
    description: "luxury cosmetic dentistry",
  },
  {
    id: "9",
    title: "belize kids",
    image: "/belize kids.png",
    url: "https://belizekids.org",
    category: "nonprofit",
    description: "empowering children",
  },
  {
    id: "7",
    title: "laguna beach dental arts",
    image: "/laguna beach dental arts.png",
    url: "https://lagunabeachdentalarts.com",
    category: "healthcare",
    description: "exceptional dental care",
  },
  {
    id: "3",
    title: "olympic bootworks",
    image: "/olympic bootworks.png",
    url: "https://www.olympicbootworks.com",
    category: "retail",
    description: "performance solutions",
  },
  {
    id: "5",
    title: "dr. christopher wong",
    image: "/dr. christopher wong.png",
    url: "https://www.chriswongdds.com",
    category: "healthcare",
    description: "modern dental care",
  },
  {
    id: "11",
    title: "coast periodontics",
    image: "/coast periodontics.png",
    url: "https://www.coastperiodontics.com",
    category: "healthcare",
    description: "expert gum care",
  },
]


export default function WebsitesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollProgressBar />
      <PageViewTracker title="Websites Portfolio & Services" />
      <Navbar />
      <main className="flex-1">
        {/* Hero - Ultra minimal */}
        <section className="px-4 pt-24 pb-12 sm:pt-32 sm:pb-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-neutral-900 mb-6">
              websites
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-md font-light">
              clean design, powerful results
            </p>
          </div>
        </section>

        {/* Portfolio Grid - Mobile first */}
        <section className="px-4 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto">
            <WebsitePortfolioGrid projects={websiteProjects} />
          </div>
        </section>

        {/* CTA - Clean and simple */}
        <section className="px-4 py-24 sm:py-32">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 mb-8">
              ready to start?
            </h2>
            <Link href="/get-started?service=website-design">
              <Button
                size="lg"
                className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-8 py-3 text-base font-light transition-all duration-300 hover:scale-105"
              >
                begin your project
              </Button>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
