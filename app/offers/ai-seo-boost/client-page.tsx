"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import {
  CheckCircle,
  ArrowRight,
  Bot,
  Zap,
  TrendingUp,
  Clock,
  Shield,
  Star,
  Calendar,
  ExternalLink,
} from "lucide-react"
import { trackCTAClick } from "@/utils/analytics"

const carouselTestimonialsData = [
  {
    quote: "We spent a ton on marketing before and never saw good results. We love working with Prism.",
    name: "Michael",
    business: "Exquisite Dentistry (Beverly Hills, CA)",
  },
  {
    quote: "New customers keep mentioning how beautiful our website is!! Thank you!",
    name: "Renata",
    business: "Coast Periodontics (San Luis Obispo, CA)",
  },
  {
    quote: "The site's new design is better than I ever could've imagined.",
    name: "Ludmila",
    business: "Mataria Dental Group (Torrance, CA)",
  },
  {
    quote: "We've had more new patient calls in the last month than we've had in years.",
    name: "Dr. Wong",
    business: "Christopher B. Wong DDS (Palo Alto, CA)",
  },
]

const valueStackComponents = [
  {
    component: "AI Discovery Audit",
    outcome: "Pinpoints where bots already mention—or ignore—you.",
  },
  {
    component: "Schema & Citation Overhaul",
    outcome: "Injects rich structured data so models trust your expertise.",
  },
  {
    component: "Vector-Ready Knowledge Hub",
    outcome: "Converts top FAQs into embedding-friendly snippets that bots love to quote.",
  },
  {
    component: "Realtime AI Visibility Dashboard",
    outcome: "See every mention across ChatGPT, Gemini, Perplexity, Claude & more.",
  },
  {
    component: "Ongoing Rapid-Retrain Pings",
    outcome: "We notify models when you publish, forcing fresh crawls in hours, not weeks.",
  },
  {
    component: "90-Day Double-Traffic Guarantee",
    outcome: "If AI impressions don't 2× inside 90 days, we work free until they do.",
  },
]

const seoComparison = [
  {
    oldSchool: "Optimizes keywords",
    aiSeo: "Optimizes answers",
  },
  {
    oldSchool: "Battles 10+ competitors per page",
    aiSeo: "Wins a single \"featured\" response",
  },
  {
    oldSchool: "Waits months for ranking shifts",
    aiSeo: "Updates hourly as the model retrains",
  },
]

const FeatureListItem = ({ text }: { text: string }) => (
  <li className="flex items-start">
    <CheckCircle className="h-5 w-5 text-green-600/80 mr-3 mt-1 shrink-0" />
    <span className="text-neutral-700 dark:text-neutral-300">{text}</span>
  </li>
)

export default function AISEOBoostPage() {
  const isMobile = useMobile()

  return (
    <div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans">
      <Navbar />
      {isMobile && <ScrollProgressBar />}
      <main>
        {/* Hero Section */}
        <section className="py-24 md:py-40">
          <div className="container mx-auto px-6 text-center">
            <Bot className="h-16 w-16 md:h-20 md:w-20 text-neutral-400 dark:text-neutral-500 mx-auto mb-8" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 max-w-4xl mx-auto">
              AI SEO Boost™ by Prism
            </h1>
            <p className="text-xl md:text-2xl text-neutral-800 dark:text-neutral-200 font-medium mb-10 max-w-3xl mx-auto">
              Make ChatGPT, Gemini & Perplexity name-drop <strong>your</strong> brand first.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-12">
              An evergreen stream of high-intent traffic from every major AI search engine, 24/7, without you lifting a finger.
            </p>
            <Link href="/get-started" passHref legacyBehavior>
              <Button 
                size="lg" 
                className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-6 text-lg font-medium rounded-full shadow-lg"
                onClick={() => trackCTAClick("book discovery call", "ai-seo-boost hero")}
              >
                <Calendar className="mr-3 h-5 w-5" />
                Book 15-Min Discovery Call
              </Button>
            </Link>
          </div>
        </section>

        {/* The Dream Outcome */}
        <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-semibold mb-8 lowercase">the dream outcome</h2>
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-8 md:p-12 shadow-sm">
                <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed lowercase">
                  picture prospects opening chatgpt and asking, "who should i call for ______?"—and the bot instantly recommends <em>you</em>. that's the ai seo boost dream: an evergreen stream of high-intent traffic from every major ai search engine, 24/7, without you lifting a finger.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Most Sites Miss the AI Wave */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 lowercase">why most sites miss the ai wave</h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto lowercase">
                  search-first seo was built for google's 10 blue links.<br />
                  large-language-model-first seo is different:
                </p>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-6">
                {seoComparison.map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-red-50 dark:bg-red-900/20">
                      <CardTitle className="text-lg font-medium text-red-700 dark:text-red-300 lowercase">
                        old-school seo
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-neutral-700 dark:text-neutral-300 mb-4 lowercase">{item.oldSchool}</p>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-medium text-green-700 dark:text-green-300 mb-2 lowercase">ai seo</h4>
                        <p className="text-neutral-700 dark:text-neutral-300 lowercase">{item.aiSeo}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block">
                <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-200 dark:border-neutral-700">
                        <th className="text-left p-6 font-semibold text-red-700 dark:text-red-300 lowercase">old-school seo</th>
                        <th className="text-left p-6 font-semibold text-green-700 dark:text-green-300 lowercase">ai seo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seoComparison.map((item, index) => (
                        <tr key={index} className="border-b border-neutral-100 dark:border-neutral-700 last:border-b-0">
                          <td className="p-6 text-neutral-700 dark:text-neutral-300 lowercase">{item.oldSchool}</td>
                          <td className="p-6 text-neutral-700 dark:text-neutral-300 lowercase font-medium">{item.aiSeo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-lg text-neutral-600 dark:text-neutral-400 lowercase">
                  if your site isn't formatted, cited, and fed in the way chatgpt & friends consume data, you're invisible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Value Stack */}
        <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 lowercase">the offer</h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 lowercase">
                  you get everything below, delivered in <strong>14 days</strong>:
                </p>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {valueStackComponents.map((item, index) => (
                  <Card key={index} className="shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3 lowercase">
                        {item.component}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 lowercase">{item.outcome}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block">
                <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-200 dark:border-neutral-700">
                        <th className="text-left p-6 font-semibold lowercase">component</th>
                        <th className="text-left p-6 font-semibold lowercase">outcome</th>
                      </tr>
                    </thead>
                    <tbody>
                      {valueStackComponents.map((item, index) => (
                        <tr key={index} className="border-b border-neutral-100 dark:border-neutral-700 last:border-b-0">
                          <td className="p-6 font-medium text-neutral-800 dark:text-neutral-200 lowercase">{item.component}</td>
                          <td className="p-6 text-neutral-700 dark:text-neutral-300 lowercase">{item.outcome}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200 lowercase">
                  total effort for you: <strong>&lt; 1 hour</strong> (one kickoff call + content approvals).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Proof & Examples */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-semibold mb-8 lowercase">proof & examples</h2>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-2">3.4×</div>
                    <p className="text-lg text-neutral-700 dark:text-neutral-300 lowercase">uptick in ai-generated visits</p>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-2">41%</div>
                    <p className="text-lg text-neutral-700 dark:text-neutral-300 lowercase">lift in qualified leads</p>
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mt-6 lowercase">
                  dentists, saas founders, and e-commerce brands using ai seo boost™ saw these results within 60 days. case studies available on request.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 lowercase">what our clients say</h2>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {carouselTestimonialsData.map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/2">
                      <div className="p-1 h-full">
                        <Card className="h-full flex flex-col shadow-sm">
                          <CardContent className="flex flex-col flex-grow justify-between p-6">
                            <div className="flex mb-4">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                            <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed flex-grow mb-4 lowercase">
                              "{testimonial.quote}"
                            </p>
                            <div>
                              <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm lowercase">
                                {testimonial.name}
                              </p>
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
            </div>
          </div>
        </section>

        {/* Scarcity & CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-900 rounded-xl p-8 md:p-12 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 text-6xl opacity-10">🚀</div>
                <div className="absolute bottom-4 left-4 text-4xl opacity-10">🤖</div>
                
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-semibold mb-6 lowercase">ready to own the answer box?</h2>
                  
                  <div className="bg-yellow-500/20 rounded-lg p-4 mb-8">
                    <p className="text-yellow-100 text-lg font-medium lowercase">
                      ⚡ we onboard <strong>only 5 clients per month</strong> so our team can manually vet every prompt, source, and citation. spots fill fast as ai adoption explodes—lock yours now.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <Link href="/get-started" passHref legacyBehavior>
                      <Button 
                        size="lg" 
                        className="bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-6 text-lg font-medium rounded-full shadow-lg mr-4"
                        onClick={() => trackCTAClick("book discovery call", "ai-seo-boost cta")}
                      >
                        <Calendar className="mr-3 h-5 w-5" />
                        Book a 15-min Zoom with Enzo
                      </Button>
                    </Link>
                    
                    <div className="text-neutral-300">
                      <p className="mb-4 lowercase">still researching?</p>
                      <div className="flex flex-wrap justify-center gap-6">
                        <a
                          href="https://www.youtube.com/@the_design_prism"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-300 hover:text-white transition-colors lowercase"
                          onClick={() => trackCTAClick("youtube tips", "ai-seo-boost")}
                        >
                          grab free ai seo tips on youtube <ExternalLink className="ml-1 h-4 w-4 inline" />
                        </a>
                        <a
                          href="https://www.instagram.com/the_design_prism/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-300 hover:text-white transition-colors lowercase"
                          onClick={() => trackCTAClick("instagram follow", "ai-seo-boost")}
                        >
                          follow us on instagram <ExternalLink className="ml-1 h-4 w-4 inline" />
                        </a>
                      </div>
                    </div>

                    <p className="text-sm text-neutral-400 italic lowercase">
                      (no pricing on the page—quoted after audit to match your traffic goals.)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 lowercase">
              see if your site qualifies
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto lowercase">
              book a 15-minute zoom call with enzo to discuss your ai seo potential and see real examples of what this looks like.
            </p>
            <Link href="/get-started" passHref legacyBehavior>
              <Button 
                size="lg" 
                className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-6 text-lg font-medium rounded-full shadow-lg"
                onClick={() => trackCTAClick("book discovery call", "ai-seo-boost secondary")}
              >
                <Calendar className="mr-3 h-5 w-5" />
                Book Discovery Call
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}