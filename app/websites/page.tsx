import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Smartphone,
  MailPlus,
  CreditCard,
  TrendingUp,
  Handshake,
  BrainCircuit,
  FileSearch,
  BarChartBig,
  Video,
  Star,
  Youtube,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MobileFirstWebsiteGallery from "@/components/mobile-first-website-gallery"
import PageViewTracker from "@/components/page-view-tracker"
import { FAQSchema } from "@/components/schema-markup"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import YouTubeVideoEmbed from "@/components/youtube-video-embed"

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
    url: "https://olympicbootworks.com",
    category: "retail",
    description: "performance solutions for athletes and outdoor enthusiasts",
    highlight: "bold, action-oriented design with clear shopping pathways",
    color: "bg-orange-50",
    showVisitButton: false,
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

const clientTestimonialsWithQuotes = [
  {
    quote: "The site's new design is better than I ever could've imagined.",
    name: "Ludmila",
    business: "Mataria Dental Group (Torrance, CA)",
  },
  {
    quote: "We spent a ton on marketing before and never saw good results. We love working with Prism.",
    name: "Michael",
    business: "Exquisite Dentistry (Beverly Hills, CA)",
  },
  {
    quote: "I love it!! Thank you for helping bring my vision to life.",
    name: "Clare",
    business: "We Are Saplings",
  },
  {
    quote: "The new website looks great!!",
    name: "Buck",
    business: "Olympic Bootworks (Tahoe, CA)",
  },
  {
    quote: "New customers keep mentioning how beautiful our website is!! Thank you!",
    name: "Renata",
    business: "Coast Periodontics (San Luis Obispo, CA)",
  },
  {
    quote: "Prism made everything so simple. We finally have a site we're proud to show patients.",
    name: "Dr. Banaga",
    business: "Town Centre Dental (Brentwood, CA)",
  },
  {
    quote: "This is exactly what I was hoping for—and more. The site feels warm, modern, and uniquely us.",
    name: "Dr. Willes",
    business: "Laguna Beach Dental Arts (Laguna Beach, CA)",
  },
  {
    quote: "We've had more new patient calls in the last month than we've had in years.",
    name: "Dr. Wong",
    business: "Christopher B. Wong DDS (Palo Alto, CA)",
  },
  {
    quote: "The whole process felt seamless. It's such a relief to know our site is in good hands.",
    name: "Dr. Ji",
    business: "Grace Dental (Santa Rosa, CA)",
  },
  {
    quote: "I really appreciate how responsive and thoughtful the Prism team. Every update makes a difference.",
    name: "Clarisa",
    business: "Grace Dental (Santa Rosa, CA)",
  },
  {
    quote: "I've worked with a lot of creatives over the years—and this was one of the best experiences I've had.",
    name: "Suzanne Meinhardt",
    business: "Rebellious Aging (Los Gatos, CA)",
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
  {
    question: "will my website work on mobile?",
    answer:
      "absolutely! all websites are fully responsive and tested across all devices and browsers for seamless mobile experience.",
  },
]

const growthVideos = [
  {
    videoId: "ZnHNjFqS2U4",
    title: "From 0 To $1M: The Ultimate Website Conversion Guide",
    description: "Unlock the secrets to turning website visitors into paying customers and skyrocket your revenue.",
  },
  {
    videoId: "01siuAlmmzs",
    title: "AI SEO Secrets: How We Rank #1 on Google (Faster)",
    description: "Discover cutting-edge AI strategies to dominate search engine rankings and drive organic traffic.",
  },
  {
    videoId: "dJuJCSlQlNY",
    title: "Web Design That Converts: 2025 Trends You Can't Ignore",
    description:
      "Stay ahead of the curve with the latest web design innovations that captivate users and boost conversions.",
  },
  {
    videoId: "R2bl4PdWmLk",
    title: "Add Custom Font in Replit",
    description: "Learn how to easily add custom fonts to your Replit projects for unique website styling.",
  },
  {
    videoId: "_hei2C4164Q",
    title: "Appear in AI Search Results",
    description:
      "Learn how to optimize your online presence to appear in AI-driven search results and connect with more customers.",
  },
  {
    videoId: "3we3n1T3QrI",
    title: "Website Analytics to Explode Sales",
    description:
      "Discover how to leverage website analytics to understand customer behavior and make data-driven decisions that significantly boost sales.",
  },
]

export default function WebsitesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollProgressBar />
      <PageViewTracker title="Websites Portfolio & Services" />
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-5xl mb-4">💻🧠</div>
              <h1 className="text-5xl font-bold tracking-tight lowercase sm:text-6xl md:text-7xl text-neutral-900">
                websites with brains.
              </h1>
              <p className="text-lg text-neutral-600 md:text-xl lowercase max-w-lg mx-auto">
                grow smarter. our websites get you more traffic, more conversions, and happier customers.
              </p>
              <div>
                <Link href="/get-started?service=website-design">
                  <Button
                    size="lg"
                    className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-10 py-7 text-lg lowercase shadow-md"
                  >
                    get started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <p className="text-xs text-neutral-500 mt-2 lowercase">2x sales in 90 days or don't pay</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full pt-8 md:pt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium lowercase text-neutral-700">sites for active clients</h2>
            <p className="text-sm text-neutral-500 lowercase mt-2">swipe to explore our recent work</p>
          </div>
          <MobileFirstWebsiteGallery items={websiteProjects} />
        </section>
        <section className="px-4 py-16 bg-gradient-to-b from-white to-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight lowercase text-neutral-900 sm:text-4xl">
                what our clients say
              </h2>
              <p className="text-neutral-600 lowercase max-w-xl mx-auto text-md mt-3">
                real feedback from businesses we've helped thrive.
              </p>
            </div>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
            >
              <CarouselContent>
                {clientTestimonialsWithQuotes.map((testimonial, index) => (
                  <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="h-full flex flex-col shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
                        <CardContent className="flex flex-col flex-grow items-start justify-between p-6 space-y-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <p className="text-neutral-700 lowercase text-sm leading-relaxed flex-grow">
                            "{testimonial.quote}"
                          </p>
                          <div>
                            <p className="font-semibold text-neutral-900 lowercase text-sm">{testimonial.name}</p>
                            <p className="text-xs text-neutral-500 lowercase">{testimonial.business}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
            <div className="text-center mt-12">
              <p className="text-neutral-600 lowercase mb-6">ready to join our satisfied clients?</p>
              <Link href="/get-started?service=website-design">
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-3 lowercase border-neutral-300 hover:bg-neutral-100"
                >
                  see our process <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="px-4 py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight lowercase text-neutral-900 sm:text-4xl">
                website features that increase conversions
              </h2>
              <p className="text-neutral-600 lowercase max-w-xl mx-auto text-md mt-3">
                smart tools designed to turn visitors into loyal customers.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-neutral-50 p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow text-center md:text-left">
                <Smartphone className="h-8 w-8 text-neutral-700 mb-4 mx-auto md:mx-0" />
                <h3 className="text-xl font-semibold lowercase text-neutral-800 mb-2">mobile appointment scheduling</h3>
                <p className="text-sm text-neutral-600 lowercase">
                  allow customers to book appointments easily from any device, anytime.
                </p>
              </div>
              <div className="bg-neutral-50 p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow text-center md:text-left">
                <MailPlus className="h-8 w-8 text-neutral-700 mb-4 mx-auto md:mx-0" />
                <h3 className="text-xl font-semibold lowercase text-neutral-800 mb-2">newsletter seamless sign up</h3>
                <p className="text-sm text-neutral-600 lowercase">
                  capture leads effortlessly with integrated, user-friendly newsletter forms.
                </p>
              </div>
              <div className="bg-neutral-50 p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow text-center md:text-left">
                <CreditCard className="h-8 w-8 text-neutral-700 mb-4 mx-auto md:mx-0" />
                <h3 className="text-xl font-semibold lowercase text-neutral-800 mb-2">apple pay checkout</h3>
                <p className="text-sm text-neutral-600 lowercase">
                  streamline purchases with fast, secure, one-touch payment options.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="px-4 py-16 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight lowercase text-neutral-900 sm:text-4xl">
                website features that increase traffic
              </h2>
              <p className="text-neutral-600 lowercase max-w-xl mx-auto text-md mt-3">
                attract more visitors and climb search rankings with our advanced strategies.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow text-center md:text-left">
                <TrendingUp className="h-8 w-8 text-neutral-700 mb-4 mx-auto md:mx-0" />
                <h3 className="text-xl font-semibold lowercase text-neutral-800 mb-2">organic traffic from seo</h3>
                <p className="text-sm text-neutral-600 lowercase">
                  climb search rankings with expert seo strategies and content optimization.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow text-center md:text-left">
                <Handshake className="h-8 w-8 text-neutral-700 mb-4 mx-auto md:mx-0" />
                <h3 className="text-xl font-semibold lowercase text-neutral-800 mb-2">google partnership</h3>
                <p className="text-sm text-neutral-600 lowercase">
                  leverage our insights and best practices as a recognized google partner.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow text-center md:text-left">
                <BrainCircuit className="h-8 w-8 text-neutral-700 mb-4 mx-auto md:mx-0" />
                <h3 className="text-xl font-semibold lowercase text-neutral-800 mb-2">ai search optimization</h3>
                <p className="text-sm text-neutral-600 lowercase">
                  stay ahead with cutting-edge ai tools for enhanced search visibility.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow text-center md:text-left">
                <FileSearch className="h-8 w-8 text-neutral-700 mb-4 mx-auto md:mx-0" />
                <h3 className="text-xl font-semibold lowercase text-neutral-800 mb-2">query research</h3>
                <p className="text-sm text-neutral-600 lowercase">
                  understand what your audience is searching for to tailor your content effectively.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow text-center md:text-left">
                <BarChartBig className="h-8 w-8 text-neutral-700 mb-4 mx-auto md:mx-0" />
                <h3 className="text-xl font-semibold lowercase text-neutral-800 mb-2">ai analytics</h3>
                <p className="text-sm text-neutral-600 lowercase">
                  gain deeper insights into user behavior with advanced ai-powered analytics.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow text-center md:text-left">
                <Video className="h-8 w-8 text-neutral-700 mb-4 mx-auto md:mx_0" />
                <h3 className="text-xl font-semibold lowercase text-neutral-800 mb-2">screen recording analysis</h3>
                <p className="text-sm text-neutral-600 lowercase">
                  see exactly how users interact with your site to identify improvement areas.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="px-4 py-12 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold lowercase mb-4">ready to get started?</h2>
            <p className="text-neutral-600 lowercase mb-6 max-w-md mx-auto">
              let's create a website that showcases your business and converts visitors into customers
            </p>
            <Link href="/get-started?service=website-design">
              <Button
                size="lg"
                className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-8 py-6 text-lg lowercase shadow-md"
              >
                get started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
        <section className="px-4 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-2xl font-bold lowercase text-center mb-8">common questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {websiteFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left lowercase font-medium text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-600 lowercase text-sm leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Video Demos Section - Updated */}
        <section className="px-4 py-16 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="mb-4 flex justify-center">
                <Youtube className="h-16 w-16 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight lowercase text-neutral-900 sm:text-4xl">
                demos to grow your site
              </h2>
              <p className="text-neutral-600 lowercase max-w-xl mx-auto text-md mt-3">24.5k+ subscribers on youtube</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-6xl mx-auto">
              {growthVideos.map((video) => (
                <div key={video.videoId} className="flex flex-col">
                  <YouTubeVideoEmbed videoId={video.videoId} title={video.title} />
                  {/* Optional: Add title and description below the video if needed */}
                  {/* <h3 className="text-lg font-semibold lowercase mt-4 mb-1 text-neutral-800">{video.title}</h3> */}
                  {/* <p className="text-sm text-neutral-600 lowercase">{video.description}</p> */}
                </div>
              ))}
            </div>
            <div className="text-center mt-16">
              <Link href="https://www.youtube.com/@the_design_prism" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-10 py-7 text-lg lowercase border-neutral-300 hover:bg-neutral-100 text-neutral-800 shadow-sm"
                >
                  <Youtube className="mr-3 h-6 w-6 text-red-600" />
                  visit our youtube channel <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <FAQSchema questions={websiteFaqs} />
      </main>
      <Footer />
    </div>
  )
}
