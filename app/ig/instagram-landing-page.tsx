"use client"

import dynamic from "next/dynamic"
import Image from "next/image"

import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

const principles = [
  {
    name: "Steve Jobs",
    lesson: "Design every detail",
    description:
      "We obsess over the craft of each page so your website feels intentional, elegant, and unmistakably premium.",
    emoji: "🎨",
  },
  {
    name: "Jeff Bezos",
    lesson: "Think long term",
    description:
      "We build for the roadmap ahead—fast, resilient foundations that evolve with your business instead of holding it back.",
    emoji: "🚀",
  },
  {
    name: "World-class founders",
    lesson: "Share the playbook",
    description:
      "On Instagram we curate clips and insights so every entrepreneur can apply proven growth principles for free.",
    emoji: "📡",
  },
]

const services = [
  {
    title: "Custom website design",
    description: "Minimal, conversion-ready experiences tailored to how your customers actually make decisions.",
  },
  {
    title: "Growth-focused build",
    description: "Modern technology, clear analytics, and content systems that keep momentum long after launch.",
  },
  {
    title: "Ongoing partnership",
    description: "We stay close, monitor performance, and keep refining so your digital presence compounds over time.",
  },
]

export default function InstagramLandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <Navbar />
      <main className="flex-1">
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">to our instagram family</span>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Thanks for supporting Prism on Instagram
            </h1>
            <p className="max-w-2xl text-lg text-neutral-600">
              You found us through the stories, clips, and insights we share every day. This space is dedicated to you—the
              builders, owners, and teams who are ready to turn inspiration into a website that actually grows the business.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-base">
                <a href="/contact">
                  Start a project <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-base">
                <a href="/websites">View our work</a>
              </Button>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-500">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image alt="Prism Instagram" src="/favicon-small.png" fill className="object-cover" sizes="32px" />
              </div>
              <span>@buildwithprism • Daily lessons for modern founders</span>
            </div>
          </div>
        </section>

        <section className="border-y border-neutral-100 bg-neutral-50 px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1.1fr,1fr] md:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Websites built for growth</h2>
              <p className="text-lg text-neutral-600">
                Prism is a studio of designers, strategists, and engineers dedicated to building digital experiences that
                drive measurable growth. Every project blends clarity, aesthetics, and the long-term view your business
                deserves.
              </p>
              <div className="grid gap-6 sm:grid-cols-3">
                {services.map((service) => (
                  <div key={service.title} className="rounded-2xl border border-neutral-200 bg-white p-5 text-left">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-400">{service.title}</h3>
                    <p className="mt-3 text-sm text-neutral-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6 rounded-3xl border border-neutral-200 bg-white/80 p-8 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-neutral-400">why instagram matters</p>
              <h3 className="text-2xl font-semibold tracking-tight">Where insight meets execution</h3>
              <p className="text-neutral-600">
                Instagram is our open notebook. We break down the same frameworks we deploy with clients—so when you decide
                to work with us, we are already aligned on the mindset, the detail, and the pace required to win online.
              </p>
              <p className="text-sm text-neutral-500">
                Follow along for daily micro-lessons and behind-the-scenes looks at how we craft websites that convert.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Principles we amplify on Instagram</h2>
              <p className="text-lg text-neutral-600">
                The clips we share come from the operators we study daily. Their lessons guide our creative process and the
                results we deliver for clients.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {principles.map((principle) => (
                <div
                  key={principle.name}
                  className="flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-6 text-left shadow-sm"
                >
                  <span className="text-3xl">{principle.emoji}</span>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">{principle.name}</p>
                    <h3 className="text-xl font-semibold text-neutral-900">{principle.lesson}</h3>
                  </div>
                  <p className="text-sm text-neutral-600">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-neutral-900 px-8 py-12 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">let's build together</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Ready to go deeper than the feed?</h2>
            <p className="mt-4 text-base text-neutral-200">
              When you become a Prism client, our team turns the philosophies you have seen on Instagram into a complete
              digital presence—strategy, design, development, and growth systems that compound over time.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="rounded-full bg-white px-8 py-6 text-base font-semibold text-neutral-900">
                <a href="/contact">
                  Book a discovery call <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 px-8 py-6 text-base text-white">
                <a href="/services">Explore services</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
