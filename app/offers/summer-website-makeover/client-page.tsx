"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import {
  CheckCircle,
  ArrowRight,
  Zap,
  BarChart,
  TrendingUp,
  Sparkles,
  CalendarDays,
  Sun,
  Rocket,
  HelpCircle,
  MessageSquare,
  Mail,
  Star,
} from "lucide-react"

const carouselTestimonialsData = [
  {
    quote: "The site’s new design is better than I ever could’ve imagined.",
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
    quote: "New customers keep mentioning how beautiful our website is!! Thank you!",
    name: "Renata",
    business: "Coast Periodontics (San Luis Obispo, CA)",
  },
]

const faqItems = [
  {
    question: "How fast can we start?",
    answer: "Kickoff survey + fit call can happen this week. Day 1 starts right after the call.",
  },
  {
    question: "What if I don’t have much traffic yet?",
    answer:
      "We use industry benchmarks to set the 3× target or extend the guarantee period — your upside stays protected.",
  },
  {
    question: "Will I own the site?",
    answer: "Yes. 100 % ownership: domain, code, content, and assets.",
  },
  {
    question: "What platforms do you build on?",
    answer: "Webflow or Vercel (custom React/Next) — chosen to match your growth goals.",
  },
]

const FeatureListItem = ({ text }: { text: string }) => (
  <li className="flex items-start">
    <CheckCircle className="h-5 w-5 text-green-600/80 mr-3 mt-1 shrink-0" />
    <span className="text-neutral-700 dark:text-neutral-300">{text}</span>
  </li>
)

export default function SummerWebsiteMakeoverOpenAIStylePage() {
  const isMobile = useMobile()

  return (
    <div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans">
      <Navbar />
      {isMobile && <ScrollProgressBar />}
      <main>
        {/* Hero Section */}
        <section className="py-24 md:py-40">
          <div className="container mx-auto px-6 text-center">
            <Sun className="h-16 w-16 md:h-20 md:w-20 text-neutral-400 dark:text-neutral-500 mx-auto mb-8" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 max-w-3xl mx-auto">
              Summer Website Makeover
            </h1>
            <p className="text-xl md:text-2xl text-neutral-800 dark:text-neutral-200 font-medium mb-10 max-w-2xl mx-auto">
              Triple Your Traffic & Conversions in 30 Days — Guaranteed
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-12">
              Your site shouldn’t feel like a ghost town. Let Prism turn it into a 24/7 growth engine while you stay
              focused on running your business.
            </p>
            <Link href="/get-started" passHref legacyBehavior>
              <Button
                as="a"
                size="lg"
                className="text-base px-8 py-3 group rounded-md bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300 transition-colors"
              >
                Book a 30-min Fit Call
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Exactly What You Get */}
        <section className="py-20 md:py-32 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-20">Exactly What You Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {[
                {
                  icon: Zap,
                  title: "Full-Stack Site Rebuild",
                  items: [
                    "Lightning-fast pages (90+ PageSpeed)",
                    "Mobile-first, accessibility-friendly design",
                    "Crystal-clear copy written for humans + search engines",
                  ],
                },
                {
                  icon: TrendingUp,
                  title: "Traffic Multiplier Engine",
                  items: [
                    "On-page SEO, schema, and technical health fixes",
                    "Google Business Profile sync (where applicable)",
                    "Launch-ready blog template + 3 custom content briefs",
                  ],
                },
                {
                  icon: Sparkles,
                  title: "Conversion Booster Suite",
                  items: [
                    "A/B-tested hero headline + CTA",
                    "Streamlined inquiry / checkout flow",
                    "Live chat + AI receptionist widget installed",
                  ],
                },
                {
                  icon: BarChart,
                  title: "Real-Time Prism Dashboard",
                  items: ["Track visitors, leads, and sales 24/7", "Compare pre- vs. post-launch KPIs at a glance"],
                },
              ].map((feature, idx) => {
                const IconComponent = feature.icon
                return (
                  <div key={idx}>
                    <div className="flex items-center mb-5">
                      <IconComponent className="h-7 w-7 text-neutral-500 dark:text-neutral-400 mr-3" />
                      <h3 className="text-2xl font-medium">{feature.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {feature.items.map((item) => (
                        <FeatureListItem key={item} text={item} />
                      ))}
                    </ul>
                  </div>
                )
              })}
              <div className="md:col-span-2 lg:col-span-1">
                <Card className="bg-white dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 shadow-none h-full">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center mb-4">
                      <CalendarDays className="h-7 w-7 text-neutral-500 dark:text-neutral-400 mr-3" />
                      <h3 className="text-2xl font-medium">Bonus “Summer Sizzle” Assets</h3>
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">(available until July 31)</p>
                    <ul className="space-y-3">
                      <FeatureListItem text="Five social posts announcing your makeover 🌴" />
                      <FeatureListItem text="Branded email blast template to past customers/subscribers" />
                      <FeatureListItem text="One-hour growth-roadmap call with Enzo (recorded)" />
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 30-Day 3× Growth Guarantee */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6 text-center">
            <Rocket className="h-16 w-16 text-neutral-400 dark:text-neutral-500 mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">30-Day 3× Growth Guarantee 🚀</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              If we don’t hit 300% of your current traffic or conversions within 30 days of launch, we keep optimizing
              free until we do — or refund you. No fine print.
            </p>
          </div>
        </section>

        {/* What Our Clients Say */}
        <section className="py-20 md:py-32 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">What Our Clients Say</h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto text-lg mt-4">
                Real feedback from businesses we've helped thrive.
              </p>
            </div>
            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto"
            >
              <CarouselContent>
                {carouselTestimonialsData.map((testimonial, index) => (
                  <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
                    <div className="p-2 h-full">
                      <Card className="h-full flex flex-col bg-white dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 shadow-none hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors">
                        <CardContent className="flex flex-col flex-grow items-start justify-between p-6 space-y-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <p className="text-neutral-700 dark:text-neutral-300 text-base leading-relaxed flex-grow">
                            &quot;{testimonial.quote}&quot;
                          </p>
                          <div>
                            <p className="font-medium text-neutral-800 dark:text-neutral-200 text-sm">
                              {testimonial.name}
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">{testimonial.business}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 left-[-50px]" />
              <CarouselNext className="hidden sm:flex text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 right-[-50px]" />
            </Carousel>
          </div>
        </section>

        {/* Investment & Availability */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">Investment & Availability</h2>
            <p className="text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              $4,800 all-inclusive
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10">(or 2 × $2,500)</p>
            <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300 p-6 rounded-lg max-w-md mx-auto mb-12 shadow-sm">
              <p className="font-medium text-lg">Only 7 Summer Makeover slots left!</p>
              <p className="text-sm">Next intake opens in October.</p>
            </div>
            <Link href="/get-started" passHref legacyBehavior>
              <Button
                as="a"
                size="lg"
                className="text-base px-10 py-4 group rounded-md bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300 transition-colors"
              >
                Book a 30-min Fit Call
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-32 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center mb-16">
              <HelpCircle className="h-8 w-8 text-neutral-500 dark:text-neutral-400 mr-3" />
              <h2 className="text-3xl md:text-4xl font-semibold text-center">FAQ</h2>
            </div>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <AccordionItem
                  value={`item-${index}`}
                  key={index}
                  className="border-b border-neutral-200 dark:border-neutral-700"
                >
                  <AccordionTrigger className="text-lg text-left font-medium py-6 hover:no-underline text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-6 text-base text-neutral-600 dark:text-neutral-400">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 md:py-40">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 max-w-2xl mx-auto">
              Ready to Turn Your Website into a Sales Machine?
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">Stop settling for “meh.”</p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
              Get a site that sells while you sleep.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12">
              Claim your Summer Website Makeover before the last slots disappear.
            </p>
            <Link href="/get-started" passHref legacyBehavior>
              <Button
                as="a"
                size="lg"
                className="text-base px-10 py-4 group rounded-md bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300 transition-colors mb-20"
              >
                Book Your Fit Call Now
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-12 max-w-xl mx-auto">
              <p className="text-base font-medium text-neutral-800 dark:text-neutral-200 mb-6">
                Need a quick answer first?
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <a
                  href="https://www.instagram.com/the_design_prism/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors group"
                >
                  <MessageSquare className="h-5 w-5 mr-2 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors" />
                  DM @the_design_prism
                </a>
                <a
                  href="mailto:enzo@design-prism.com"
                  className="flex items-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors group"
                >
                  <Mail className="h-5 w-5 mr-2 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors" />
                  enzo@design-prism.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
