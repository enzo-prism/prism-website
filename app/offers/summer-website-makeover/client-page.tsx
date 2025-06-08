"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import CoreImage from "@/components/core-image"
import ScrollProgressBar from "@/components/scroll-progress-bar" // Added ScrollProgressBar import
import { useMobile } from "@/hooks/use-mobile" // Added useMobile hook import
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
} from "lucide-react"

const testimonials = [
  {
    quote: "We spent tons on marketing before and never saw results. Prism rebuilt our site and traffic exploded.",
    name: "Michael, Exquisite Studio — Beverly Hills",
    company: "",
    image: "/placeholder.svg?width=80&height=80",
  },
  {
    quote: "New customers keep mentioning how beautiful our new website is!",
    name: "Buck, Olympic Bootworks — Tahoe",
    company: "",
    image: "/placeholder.svg?width=80&height=80",
  },
  {
    quote: "Prism made the whole process effortless, and our sales calls tripled within weeks.",
    name: "Renata, Coast Wellness — San Luis Obispo",
    company: "",
    image: "/placeholder.svg?width=80&height=80",
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
    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 shrink-0" />
    <span className="text-foreground/80">{text}</span>
  </li>
)

export default function SummerWebsiteMakeoverClientPageMinimalUpdatedCopy() {
  const isMobile = useMobile() // Initialize the hook

  return (
    <>
      <Navbar />
      {isMobile && <ScrollProgressBar />} {/* Conditionally render the progress bar */}
      <main className="bg-background text-foreground font-sans">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6 text-center">
            <Sun className="h-16 w-16 md:h-20 md:w-20 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto">
              Summer Website Makeover
            </h1>
            <p className="text-xl md:text-2xl text-primary font-medium mb-8 max-w-2xl mx-auto">
              Triple Your Traffic & Conversions in 30 Days — Guaranteed
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Your site shouldn’t feel like a ghost town. Let Prism turn it into a 24/7 growth engine while you stay
              focused on running your business.
            </p>
            <a href="https://growthprism.app/summer-makeover" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="text-lg px-8 py-3 group rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                Book a 15-min Fit Call
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </section>

        {/* Exactly What You Get */}
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Exactly What You Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              <div>
                <div className="flex items-center mb-4">
                  <Zap className="h-7 w-7 text-primary mr-3" />
                  <h3 className="text-2xl font-semibold">Full-Stack Site Rebuild</h3>
                </div>
                <ul className="space-y-3">
                  <FeatureListItem text="Lightning-fast pages (90 + PageSpeed)" />
                  <FeatureListItem text="Mobile-first, accessibility-friendly design" />
                  <FeatureListItem text="Crystal-clear copy written for humans + search engines" />
                </ul>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-7 w-7 text-primary mr-3" />
                  <h3 className="text-2xl font-semibold">Traffic Multiplier Engine</h3>
                </div>
                <ul className="space-y-3">
                  <FeatureListItem text="On-page SEO, schema, and technical health fixes" />
                  <FeatureListItem text="Google Business Profile sync (where applicable)" />
                  <FeatureListItem text="Launch-ready blog template + 3 custom content briefs" />
                </ul>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <Sparkles className="h-7 w-7 text-primary mr-3" />
                  <h3 className="text-2xl font-semibold">Conversion Booster Suite</h3>
                </div>
                <ul className="space-y-3">
                  <FeatureListItem text="A/B-tested hero headline + CTA" />
                  <FeatureListItem text="Streamlined inquiry / checkout flow" />
                  <FeatureListItem text="Live chat + AI receptionist widget installed" />
                </ul>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <BarChart className="h-7 w-7 text-primary mr-3" />
                  <h3 className="text-2xl font-semibold">Real-Time Prism Dashboard</h3>
                </div>
                <ul className="space-y-3">
                  <FeatureListItem text="Track visitors, leads, and sales 24/7" />
                  <FeatureListItem text="Compare pre- vs. post-launch KPIs at a glance" />
                </ul>
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20 shadow-none h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <CalendarDays className="h-7 w-7 text-primary mr-3" />
                      <h3 className="text-2xl font-semibold">Bonus “Summer Sizzle” Assets</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">(available until July 31)</p>
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
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 text-center">
            <Rocket className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">30-Day 3× Growth Guarantee 🚀</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              If we don’t hit 300 % of your current traffic or conversions within 30 days of launch, we keep optimizing
              free until we do — or refund you. No fine print.
            </p>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="shadow-sm border border-border/50 bg-background hover:shadow-md transition-shadow duration-300 flex flex-col"
                >
                  <CardContent className="p-6 md:p-8 flex flex-col flex-grow">
                    <p className="text-lg italic text-foreground/90 mb-6 flex-grow">&quot;{testimonial.quote}&quot;</p>
                    <div className="flex items-center mt-auto">
                      <CoreImage
                        src={testimonial.image}
                        alt={`Photo of ${testimonial.name}`}
                        width={60}
                        height={60}
                        className="rounded-full mr-4"
                        fallbackSrc={`/placeholder.svg?width=60&height=60&query=${encodeURIComponent(testimonial.name)}`}
                        trackingId={`testimonial_image_minimal_${testimonial.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`}
                      />
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        {testimonial.company && <p className="text-sm text-muted-foreground">{testimonial.company}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center mt-12 text-muted-foreground">(More live dashboards available on request.)</p>
          </div>
        </section>

        {/* Investment & Availability */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Investment & Availability</h2>
            <p className="text-3xl md:text-4xl font-bold text-primary mb-2">$4,800 all-inclusive</p>
            <p className="text-lg text-muted-foreground mb-8">(or 2 × $2,500)</p>
            <div className="bg-yellow-100/70 dark:bg-yellow-700/30 border border-yellow-400/50 text-yellow-700 dark:text-yellow-300 p-6 rounded-lg max-w-md mx-auto mb-10 shadow-sm">
              <p className="font-semibold text-lg">Only 7 Summer Makeover slots left!</p>
              <p className="text-sm">Next intake opens in October.</p>
            </div>
            <a href="https://growthprism.app/summer-makeover" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="default"
                className="text-xl px-10 py-4 group rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                Book a 15-minute Fit Call
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center mb-12">
              <HelpCircle className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-center">FAQ</h2>
            </div>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index} className="border-b border-border/50">
                  <AccordionTrigger className="text-lg text-left font-medium py-5 hover:no-underline hover:text-primary transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-5 text-base text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl mx-auto">
              Ready to Turn Your Website into a Sales Machine?
            </h2>
            <p className="text-lg text-muted-foreground mb-4">Stop settling for “meh.”</p>
            <p className="text-lg text-muted-foreground mb-4">Get a site that sells while you sleep.</p>
            <p className="text-lg text-muted-foreground mb-10">
              Claim your Summer Website Makeover before the last slots disappear.
            </p>
            <a href="https://growthprism.app/summer-makeover" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="text-xl px-10 py-4 group rounded-lg shadow-sm hover:shadow-md transition-shadow mb-16"
              >
                Book Your Fit Call Now
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </a>

            <div className="border-t border-border/30 pt-10 max-w-xl mx-auto">
              <p className="text-md font-medium text-foreground/90 mb-6">Need a quick answer first?</p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <a
                  href="https://www.instagram.com/the_design_prism/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors group"
                >
                  <MessageSquare className="h-5 w-5 mr-2 group-hover:text-primary transition-colors" />
                  DM @the_design_prism
                </a>
                <a
                  href="mailto:enzo@design-prism.com"
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Mail className="h-5 w-5 mr-2 group-hover:text-primary transition-colors" />
                  enzo@design-prism.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
