"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Link from "next/link"
import { Search, Target, TrendingUp, Mail, Star, Bot, Zap, Users, Clock } from "lucide-react"
import { trackCTAClick } from "@/utils/analytics"

export default function AISEOBoostPage() {
  const CONTACT_CTA_TEXT = "email or text us for next steps"

  const services = [
    {
      icon: Search,
      title: "ai audit",
      description: "find where bots ignore you",
      detail: "Discover exactly how ChatGPT, Gemini & Perplexity currently see your brand"
    },
    {
      icon: Target,
      title: "optimization", 
      description: "make them recommend you",
      detail: "Strategic content & citation optimization for AI search engines"
    },
    {
      icon: TrendingUp,
      title: "results",
      description: "2× ai traffic in 90 days",
      detail: "Guaranteed increase in AI-generated referrals or we work for free"
    }
  ]

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Dental Practice Owner",
      content: "ChatGPT now recommends our practice first when people ask about dentists in our area. We've seen a 300% increase in AI-driven inquiries.",
      rating: 5,
      location: "San Francisco, CA"
    },
    {
      name: "Marcus Rodriguez",
      role: "Tech Startup Founder",
      content: "Perplexity mentions our SaaS tool in 8 out of 10 relevant searches. This has completely transformed our organic acquisition.",
      rating: 5,
      location: "Austin, TX"
    },
    {
      name: "Jennifer Walsh",
      role: "E-commerce Owner",
      content: "Google's AI Overview now features our products prominently. Our click-through rates from AI search have tripled.",
      rating: 5,
      location: "New York, NY"
    }
  ]


  const problemPoints = [
    {
      icon: Bot,
      title: "ai bots ignore your brand",
      description: "chatgpt, gemini, and perplexity recommend your competitors instead of you"
    },
    {
      icon: TrendingUp,
      title: "missing the ai traffic wave",
      description: "40% of searches now go through ai - and you're not getting any of it"
    },
    {
      icon: Users,
      title: "your customers ask ai first",
      description: "they trust ai recommendations more than traditional search results"
    }
  ]

  const resultMetrics = [
    { metric: "2-5x", description: "increase in ai-driven traffic" },
    { metric: "90 days", description: "timeline to see results" },
    { metric: "100%", description: "money-back guarantee" },
    { metric: "24/7", description: "ai bots working for you" }
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl lowercase leading-tight">
              AI SEO Boost™
            </h1>
            <p className="mt-8 text-xl text-neutral-600 lowercase max-w-2xl mx-auto leading-relaxed">
              Make ChatGPT, Gemini & Perplexity name-drop your brand first. Get recommended by AI bots 24/7.
            </p>
            <div className="mt-10">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-8 py-4 text-lg lowercase shadow-sm transition-all duration-200 mr-4"
                  onClick={() => trackCTAClick(CONTACT_CTA_TEXT, "ai-seo-boost hero")}
                >
                  <Mail className="mr-3 h-5 w-5" />
                  {CONTACT_CTA_TEXT}
                </Button>
              </Link>
            </div>
            <p className="text-sm text-neutral-500 mt-6 lowercase">
              90-day results guarantee • No long-term contracts
            </p>
          </div>
        </section>

        {/* The Dream Outcome */}
        <section className="py-20 border-t border-neutral-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl lowercase mb-8 leading-tight">
                Imagine This: AI Bots Recommend You First
              </h2>
              <p className="text-xl text-neutral-600 lowercase max-w-3xl mx-auto leading-relaxed">
                Every time someone asks ChatGPT, Gemini, or Perplexity about your industry, your brand gets mentioned first. 
                It's like having the world's best referral system working 24/7.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {resultMetrics.map((result, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-neutral-900 mb-2">{result.metric}</div>
                  <div className="text-neutral-600 lowercase">{result.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Most Sites Miss the AI Wave */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl lowercase mb-8 leading-tight">
                Why Most Sites Miss the AI Wave
              </h2>
              <p className="text-xl text-neutral-600 lowercase max-w-3xl mx-auto leading-relaxed">
                40% of all searches now go through AI engines. If you're not optimized for AI, you're invisible to nearly half your potential customers.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {problemPoints.map((problem, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <problem.icon className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                    <CardTitle className="text-xl lowercase">{problem.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-neutral-600 lowercase">
                      {problem.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-20 border-t border-neutral-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl lowercase mb-8 leading-tight">
                What You Get
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="text-center border border-neutral-200 shadow-sm">
                  <CardHeader>
                    <service.icon className="h-12 w-12 text-neutral-600 mx-auto mb-4" />
                    <CardTitle className="text-xl lowercase">{service.title}</CardTitle>
                    <CardDescription className="text-lg font-medium lowercase">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 lowercase">
                      {service.detail}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* Client Testimonials */}
        <section className="py-20 border-t border-neutral-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl lowercase mb-8 leading-tight">
                What Our Clients Say
              </h2>
              <p className="text-xl text-neutral-600 lowercase max-w-3xl mx-auto leading-relaxed">
                Real results from real businesses using AI SEO optimization.
              </p>
            </div>
            
            <Carousel className="max-w-4xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <Card className="text-center">
                      <CardHeader>
                        <div className="flex justify-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <CardDescription className="text-lg italic lowercase mb-6">
                          "{testimonial.content}"
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-neutral-600 lowercase">{testimonial.role}</div>
                        <div className="text-sm text-neutral-500">{testimonial.location}</div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* Scarcity & CTA */}
        <section className="py-20 bg-gradient-to-b from-amber-50 to-white border-t border-amber-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-10">
              <Badge className="bg-amber-500 text-white mb-6 px-4 py-2">
                <Clock className="h-4 w-4 mr-2" />
                Limited Availability
              </Badge>
              <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl lowercase mb-8 leading-tight">
                Only 10 Spots Available This Month
              </h2>
              <p className="text-xl text-neutral-600 lowercase max-w-3xl mx-auto mb-10 leading-relaxed">
                We limit our AI optimization clients to ensure quality results. Don't let your competitors get recommended by AI bots while you wait.
              </p>
            </div>
            
            <div className="space-y-6">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-12 py-6 text-xl lowercase shadow-sm transition-all duration-200"
                  onClick={() => trackCTAClick(CONTACT_CTA_TEXT, "ai-seo-boost scarcity")}
                >
                  <Zap className="mr-3 h-6 w-6" />
                  {CONTACT_CTA_TEXT}
                </Button>
              </Link>
              <p className="text-sm text-neutral-500 lowercase">
                90-day money-back guarantee • Results within 30-60 days
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl lowercase mb-8 leading-tight">
              Ready to Dominate AI Search?
            </h2>
            <p className="text-xl text-neutral-600 lowercase max-w-3xl mx-auto mb-10 leading-relaxed">
              Email or text our team and we&apos;ll respond within one business day with a tailored next step—no obligation.
            </p>
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-8 py-4 text-lg lowercase shadow-sm transition-all duration-200"
                onClick={() => trackCTAClick(CONTACT_CTA_TEXT, "ai-seo-boost final cta")}
              >
                <Mail className="mr-3 h-5 w-5" />
                {CONTACT_CTA_TEXT}
              </Button>
            </Link>
            <p className="text-xs text-neutral-400 mt-4 lowercase italic">
              Free consultation to assess your AI visibility and create a custom strategy.
            </p>
          </div>
        </section>

        {/* Back to Offers */}
        <section className="py-8 border-t border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href="/offers"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 lowercase transition-colors"
            >
              ← back to offers
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
