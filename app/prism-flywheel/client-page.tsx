"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { trackCTAClick } from "@/utils/analytics"
import { fadeInUp, staggerContainer } from "@/utils/animation-variants"
import { AnimatePresence, motion, useInView, Variants } from "framer-motion"
import {
    ArrowRight,
    BarChart3,
    Brain,
    CheckCircle,
    Code,
    Database,
    Globe,
    Palette,
    Search,
    TrendingUp,
    Zap
} from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"

  // GPU-accelerated scroll reveal animation
  const gpuScrollReveal: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  }

  // Staggered card animations
  const cardAnimation: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  }

  // Tech stack items with their categories
  const techStackItems = [
  {
    category: "AI Development",
    icon: Brain,
    title: "Claude Code + Cursor",
    description: "AI-assisted coding for rapid, error-free automation",
    color: "from-purple-500 to-indigo-500"
  },
  {
    category: "AI Content",
    icon: Zap,
    title: "ChatGPT + Grok + Google Gemini",
    description: "Frontier LLMs for content ideation and semantic search",
    color: "from-blue-500 to-cyan-500"
  },
  {
    category: "Design & Visual",
    icon: Palette,
    title: "Midjourney + Figma + Loveable",
    description: "Visual AI and design tools for sleek, engaging assets",
    color: "from-pink-500 to-rose-500"
  },
  {
    category: "Development",
    icon: Code,
    title: "Notion + Replit + Vercel",
    description: "Collaborative workspaces and deployment for scalable code",
    color: "from-green-500 to-emerald-500"
  },
  {
    category: "Research",
    icon: Search,
    title: "Perplexity",
    description: "Real-time AI research to fuel data-driven insights",
    color: "from-orange-500 to-amber-500"
  },
  {
    category: "Local Presence",
    icon: Globe,
    title: "Google Business + Apple + Yelp + Zocdoc",
    description: "Local SEO and booking integrations for healthcare/brand visibility",
    color: "from-indigo-500 to-purple-500"
  }
]

// Flywheel phases
const flywheelPhases = [
  {
    number: 1,
    title: "Research & Ideation",
    description: "Watch trends, clip insights, and remix with AI",
    details: "Using Perplexity for real-time data and Grok for semantic analysis",
    icon: Search,
    color: "text-purple-600"
  },
  {
    number: 2,
    title: "Creation & Remixing",
    description: "Build content and code with frontier tools",
    details: "Claude Code and Cursor for rapid development, Midjourney for visuals",
    icon: Palette,
    color: "text-blue-600"
  },
  {
    number: 3,
    title: "Optimization & Analysis",
    description: "Refine with data",
    details: "GA4 for traffic, Hotjar for user heatmaps, GSC for SEO insights",
    icon: BarChart3,
    color: "text-green-600"
  },
  {
    number: 4,
    title: "Monetization & Scaling",
    description: "Bundle value into products and scale",
    details: "Deploy via Vercel/Replit, connect locally with Google Business Profile",
    icon: TrendingUp,
    color: "text-orange-600"
  }
]

export default function PrismFlywheelClient() {
  const [activePhase, setActivePhase] = useState<number | null>(null)
  const [hoveredTech, setHoveredTech] = useState<number | null>(null)
  
  // Refs for scroll animations
  const philosophyRef = useRef(null)
  const howItWorksRef = useRef(null)
  const techStackRef = useRef(null)
  const dataRef = useRef(null)
  const impactRef = useRef(null)
  const learnRef = useRef(null)
  
  // Intersection observers
  const philosophyInView = useInView(philosophyRef, { once: true, margin: "-100px" })
  const howItWorksInView = useInView(howItWorksRef, { once: true, margin: "-100px" })
  const techStackInView = useInView(techStackRef, { once: true, margin: "-100px" })
  const dataInView = useInView(dataRef, { once: true, margin: "-100px" })
  const impactInView = useInView(impactRef, { once: true, margin: "-100px" })
  const learnInView = useInView(learnRef, { once: true, margin: "-100px" })

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero Section - Minimal & Elegant */}
      <motion.section 
        className="relative px-4 pt-24 pb-12 md:pt-40 md:pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            className="space-y-8"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Minimal heading */}
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-900 dark:text-white">
                The Prism Flywheel
              </h1>
              <div className="mt-4 text-sm font-medium tracking-[0.3em] uppercase text-neutral-400">
                Compounding Growth System
              </div>
            </motion.div>
            
            {/* Clean description */}
            <motion.p 
              className="text-base md:text-lg text-center text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Transform code and content into revenue through our AI-powered growth system. 
              Research, create, optimize, and scale—each cycle compounds your success.
            </motion.p>

            {/* Single elegant CTA */}
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <Link href="/get-started" onClick={() => trackCTAClick("get started", "hero-flywheel-minimal")}>
                <Button 
                  className="group px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-sm rounded-full hover:scale-[1.02] transition-all duration-200"
                >
                  Build Your Flywheel
                  <ArrowRight className="inline-block ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Flywheel Video - Elegant Presentation */}
          <motion.div 
            className="mt-20 relative max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Video with subtle border */}
            <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
              <iframe
                src="https://player.vimeo.com/video/1104840957?background=1&autoplay=1&loop=1&muted=1&controls=0&playsinline=1&title=0&byline=0&portrait=0"
                title="Prism Flywheel Visualization"
                className="absolute inset-0"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            {/* Minimalist phase indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8">
              {flywheelPhases.map((phase, index) => (
                <motion.button
                  key={phase.number}
                  className={`group flex flex-col items-center space-y-2 transition-all ${
                    activePhase === phase.number ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  }`}
                  whileHover={{ y: -2 }}
                  onClick={() => setActivePhase(activePhase === phase.number ? null : phase.number)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${
                    activePhase === phase.number 
                      ? 'border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white' 
                      : 'border-neutral-300 dark:border-neutral-700'
                  }`}>
                    <span className={`text-sm font-medium ${
                      activePhase === phase.number 
                        ? 'text-white dark:text-neutral-900' 
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}>
                      {phase.number}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                    {phase.title.split(' ')[0]}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Clean phase details */}
            <AnimatePresence mode="wait">
              {activePhase && (
                <motion.div
                  className="mt-8 text-center max-w-md mx-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                    {flywheelPhases[activePhase - 1].title}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {flywheelPhases[activePhase - 1].details}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* Philosophy Section - Minimal Design */}
      <motion.section 
        ref={philosophyRef}
        className="py-24 md:py-32"
        initial="hidden"
        animate={philosophyInView ? "visible" : "hidden"}
        variants={gpuScrollReveal}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            className="space-y-16"
            variants={staggerContainer}
          >
            {/* Section header */}
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-white">
                Our Philosophy
              </h2>
              <div className="mt-6 w-12 h-px bg-neutral-900 dark:bg-white mx-auto" />
            </motion.div>

            {/* Content grid */}
            <motion.div 
              className="grid md:grid-cols-2 gap-16 items-start"
              variants={fadeInUp}
            >
              {/* Text content */}
              <div className="space-y-6">
                <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Growth isn't about endless hustle—it's about building intelligent systems. 
                  Our flywheel methodology creates a virtuous cycle where every input compounds, 
                  transforming your business into a sustainable revenue engine.
                </p>
                
                <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  We orchestrate frontier AI with thoughtful automation, ensuring every decision 
                  is data-driven and every action creates lasting value.
                </p>

                {/* Key principles */}
                <div className="pt-8 space-y-6">
                  {[
                    { title: "Maximum Leverage", desc: "AI amplifies effort, not replaces it" },
                    { title: "Compound Growth", desc: "Each cycle builds on the last" },
                    { title: "Custom Solutions", desc: "Tailored to your unique needs" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start space-x-4"
                      variants={fadeInUp}
                    >
                      <div className="w-1 h-12 bg-neutral-900 dark:bg-white opacity-20" />
                      <div>
                        <h3 className="font-medium text-neutral-900 dark:text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Visual element - Minimal equation */}
              <motion.div 
                className="flex items-center justify-center md:justify-end"
                variants={fadeInUp}
              >
                <div className="text-center space-y-4">
                  <div className="text-4xl md:text-5xl font-light text-neutral-900 dark:text-white">
                    <span>Code</span>
                    <span className="mx-3 text-neutral-400">×</span>
                    <span>Content</span>
                    <span className="mx-3 text-neutral-400">×</span>
                    <span>AI</span>
                  </div>
                  <div className="text-2xl text-neutral-400">=</div>
                  <div className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-white">
                    Leverage
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section - Minimalist Timeline */}
      <motion.section 
        ref={howItWorksRef}
        className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-900"
        initial="hidden"
        animate={howItWorksInView ? "visible" : "hidden"}
        variants={gpuScrollReveal}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-20"
          >
            {/* Section header */}
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-white">
                How It Works
              </h2>
              <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                Four phases, infinite cycles of growth
              </p>
            </motion.div>

            {/* Vertical timeline */}
            <div className="relative">
              {/* Central line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800 md:-translate-x-1/2" />

              {/* Phase items */}
              <div className="space-y-16">
                {flywheelPhases.map((phase, index) => (
                  <motion.div
                    key={phase.number}
                    className={`relative flex items-start ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-row`}
                    variants={fadeInUp}
                  >
                    {/* Number indicator */}
                    <div className="absolute left-8 md:left-1/2 w-8 h-8 -ml-4 md:-ml-4 rounded-full bg-white dark:bg-neutral-950 border-2 border-neutral-900 dark:border-white flex items-center justify-center">
                      <span className="text-xs font-medium">{phase.number}</span>
                    </div>

                    {/* Content */}
                    <div className={`ml-20 md:ml-0 flex-1 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}>
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                        {phase.description}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-500">
                        {phase.details}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <motion.div 
              className="text-center pt-8"
              variants={fadeInUp}
            >
              <Link href="/get-started">
                <Button 
                  variant="ghost"
                  className="text-neutral-900 dark:text-white hover:bg-transparent border-b-2 border-transparent hover:border-neutral-900 dark:hover:border-white rounded-none px-0 py-2 transition-all"
                  onClick={() => trackCTAClick("start flywheel", "how it works")}
                >
                  Start Your Flywheel →
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Tech Stack Section - Minimal Grid */}
      <motion.section 
        ref={techStackRef}
        className="py-24 md:py-32"
        initial="hidden"
        animate={techStackInView ? "visible" : "hidden"}
        variants={gpuScrollReveal}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-16"
          >
            {/* Section header */}
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-white">
                Technology Stack
              </h2>
              <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Frontier AI meets practical implementation
              </p>
            </motion.div>

            {/* Minimal tech grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {techStackItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group"
                >
                  <div className="space-y-3">
                    {/* Category label */}
                    <div className="text-xs font-medium tracking-wider uppercase text-neutral-400">
                      {item.category}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-normal text-neutral-900 dark:text-white">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Subtle hover indicator */}
                    <div className="h-px bg-neutral-200 dark:bg-neutral-800 transition-all group-hover:bg-neutral-900 dark:group-hover:bg-white" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom note */}
            <motion.p 
              className="text-center text-sm text-neutral-500 dark:text-neutral-500"
              variants={fadeInUp}
            >
              Custom-tailored for your unique growth trajectory
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Mid-page CTA Section - Minimal */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-xl md:text-2xl font-light text-neutral-900 dark:text-white mb-6">
              Ready to compound your growth?
            </h3>
            <Link href="/get-started" onClick={() => trackCTAClick("explore flywheel minimal", "mid-page-flywheel")}>
              <Button 
                variant="outline"
                className="border-neutral-900 dark:border-white text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 rounded-full px-8 py-3 transition-all"
              >
                Start Building
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Data-Driven Optimization Section */}
      <motion.section 
        ref={dataRef}
        className="py-16 md:py-24"
        initial="hidden"
        animate={dataInView ? "visible" : "hidden"}
        variants={gpuScrollReveal}
        style={{
          transform: "translateZ(0)",
          willChange: dataInView ? "transform, opacity, filter" : "auto",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 lowercase"
              variants={fadeInUp}
            >
              data at the core: informed decisions for sustained momentum
            </motion.h2>
            <motion.p 
              className="text-neutral-600 max-w-3xl mx-auto mb-12 lowercase"
              variants={fadeInUp}
            >
              every flywheel iteration is powered by analytics: ga4 tracks user journeys, 
              gsc optimizes search presence, and hotjar reveals behavioral insights. we turn 
              data into actionable leverage, ensuring your growth engine runs on facts, not 
              guesswork—compounding efficiency and roi
            </motion.p>

            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <div className="bg-blue-100 p-6 rounded-lg mb-4">
                  <BarChart3 className="h-12 w-12 text-blue-600 mx-auto" />
                </div>
                <h3 className="font-bold mb-2 lowercase">analytics insights</h3>
                <p className="text-sm text-neutral-600 lowercase">
                  track user journeys and conversions with ga4
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <div className="bg-green-100 p-6 rounded-lg mb-4">
                  <Search className="h-12 w-12 text-green-600 mx-auto" />
                </div>
                <h3 className="font-bold mb-2 lowercase">search optimization</h3>
                <p className="text-sm text-neutral-600 lowercase">
                  maximize visibility with google search console
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <div className="bg-purple-100 p-6 rounded-lg mb-4">
                  <Database className="h-12 w-12 text-purple-600 mx-auto" />
                </div>
                <h3 className="font-bold mb-2 lowercase">behavioral data</h3>
                <p className="text-sm text-neutral-600 lowercase">
                  understand user behavior with hotjar heatmaps
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Client Impact Section */}
      <motion.section 
        ref={impactRef}
        className="py-16 md:py-24 bg-neutral-50"
        initial="hidden"
        animate={impactInView ? "visible" : "hidden"}
        variants={gpuScrollReveal}
        style={{
          transform: "translateZ(0)",
          willChange: impactInView ? "transform, opacity, filter" : "auto",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-4 lowercase"
              variants={fadeInUp}
            >
              transform your business: from grind to growth
            </motion.h2>
            <motion.p 
              className="text-center text-neutral-600 mb-12 max-w-3xl mx-auto lowercase"
              variants={fadeInUp}
            >
              imagine your startup automating workflows with ai code, your healthcare practice 
              filling schedules via optimized local profiles, or your brand creating content 
              that converts. prism's flywheel delivers: 3x faster scaling, deeper client 
              connections, and revenue that compounds
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div variants={fadeInUp}>
                <Card className="p-6 text-center h-full">
                  <div className="text-4xl font-bold text-purple-600 mb-2">3x</div>
                  <h3 className="font-bold mb-2 lowercase">faster scaling</h3>
                  <p className="text-sm text-neutral-600 lowercase">
                    accelerate growth with automated systems
                  </p>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="p-6 text-center h-full">
                  <div className="text-4xl font-bold text-blue-600 mb-2">200%</div>
                  <h3 className="font-bold mb-2 lowercase">lead growth</h3>
                  <p className="text-sm text-neutral-600 lowercase">
                    code + content = exponential results
                  </p>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="p-6 text-center h-full">
                  <div className="text-4xl font-bold text-green-600 mb-2">∞</div>
                  <h3 className="font-bold mb-2 lowercase">compounding roi</h3>
                  <p className="text-sm text-neutral-600 lowercase">
                    every iteration builds lasting value
                  </p>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Learn & Build Section */}
      <motion.section 
        ref={learnRef}
        className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50"
        initial="hidden"
        animate={learnInView ? "visible" : "hidden"}
        variants={gpuScrollReveal}
        style={{
          transform: "translateZ(0)",
          willChange: learnInView ? "transform, opacity, filter" : "auto",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-4 lowercase"
              variants={fadeInUp}
            >
              learn to build your own flywheel
            </motion.h2>
            <motion.p 
              className="text-center text-neutral-600 mb-12 max-w-3xl mx-auto lowercase"
              variants={fadeInUp}
            >
              ready to harness the power of the prism flywheel? dive into our resources 
              and discover how to create your own compounding growth engine
            </motion.p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Blog CTA */}
              <motion.div variants={fadeInUp}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <span className="text-2xl">✍️</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 lowercase text-center">blog insights</h3>
                  <p className="text-neutral-600 mb-6 lowercase text-center">
                    deep dives into flywheel mechanics, case studies, and step-by-step 
                    guides to build your growth engine
                  </p>
                  <Link href="/blog">
                    <Button 
                      variant="outline"
                      className="w-full rounded-full lowercase group-hover:bg-purple-600 group-hover:text-white transition-colors"
                      onClick={() => trackCTAClick("explore blog", "flywheel-learn-section")}
                    >
                      read the guides
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </Card>
              </motion.div>

              {/* YouTube CTA */}
              <motion.div variants={fadeInUp}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🎥</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 lowercase text-center">youtube tutorials</h3>
                  <p className="text-neutral-600 mb-6 lowercase text-center">
                    watch enzo break down the flywheel system with real examples 
                    and live demonstrations
                  </p>
                  <a 
                    href="https://www.youtube.com/@the_design_prism" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="outline"
                      className="w-full rounded-full lowercase group-hover:bg-red-600 group-hover:text-white transition-colors"
                      onClick={() => trackCTAClick("watch youtube", "flywheel-learn-section")}
                    >
                      watch tutorials
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </Card>
              </motion.div>

              {/* Instagram CTA */}
              <motion.div variants={fadeInUp}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <span className="text-2xl text-white">📸</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 lowercase text-center">instagram daily tips</h3>
                  <p className="text-neutral-600 mb-6 lowercase text-center">
                    daily flywheel insights, growth hacks, and behind-the-scenes 
                    of building with prism
                  </p>
                  <a 
                    href="https://www.instagram.com/the_design_prism/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="outline"
                      className="w-full rounded-full lowercase group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-all"
                      onClick={() => trackCTAClick("follow instagram", "flywheel-learn-section")}
                    >
                      get daily tips
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </Card>
              </motion.div>
            </div>

            {/* Social Proof */}
            <motion.div 
              className="mt-12 text-center"
              variants={fadeInUp}
            >
              <p className="text-sm text-neutral-500 lowercase">
                join 24,500+ on youtube and 38,500+ on instagram learning the prism way
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Footer Section - Minimal */}
      <section className="py-32 md:py-40 bg-neutral-950 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-light">
                Ready to Build?
              </h2>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <p className="text-neutral-400 text-lg leading-relaxed">
                Transform your business with a growth system that compounds. 
                Join leaders who choose leverage over hustle.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="pt-4">
              <Link href="/get-started" onClick={() => trackCTAClick("apply now minimal", "footer-flywheel")}>
                <Button 
                  className="bg-white text-neutral-900 hover:bg-neutral-100 font-medium text-sm px-10 py-4 rounded-full transition-all hover:scale-[1.02]"
                >
                  Apply for Your Flywheel
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="pt-8 border-t border-neutral-800"
            >
              <p className="text-xs text-neutral-500">
                Limited spots available for Q1 2025
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 