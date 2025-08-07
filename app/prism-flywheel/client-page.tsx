"use client"

import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/utils/analytics"
import {
    fadeInUp,
    getAnimationVariant,
    mobileFadeIn,
    mobileScrollReveal,
    mobileStaggerContainer,
    mobileTap,
    staggerContainer
} from "@/utils/animation-variants"
import { AnimatePresence, motion, useInView, Variants } from "framer-motion"
import {
    ArrowRight,
    BarChart3,
    Brain,
    Code,
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
            variants={getAnimationVariant(staggerContainer, mobileStaggerContainer)}
          >
            {/* Minimal heading */}
            <motion.div 
              className="text-center"
              variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
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
              variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
            >
              Transform code and content into revenue through our AI-powered growth system. 
              Research, create, optimize, and scale—each cycle compounds your success.
            </motion.p>

            {/* Single elegant CTA */}
            <motion.div 
              className="text-center"
              variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
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
                loading="lazy"
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
                  whileTap="tap"
                  variants={mobileTap}
                  aria-pressed={activePhase === phase.number}
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
                  <span className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
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
        variants={getAnimationVariant(gpuScrollReveal, mobileScrollReveal)}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            className="space-y-16"
            variants={getAnimationVariant(staggerContainer, mobileStaggerContainer)}
          >
            {/* Section header */}
            <motion.div 
              className="text-center"
              variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
            >
              <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-white">
                Our Philosophy
              </h2>
              <div className="mt-6 w-12 h-px bg-neutral-900 dark:bg-white mx-auto" />
            </motion.div>

            {/* Content grid */}
            <motion.div 
              className="grid md:grid-cols-2 gap-16 items-start"
              variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
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

                {/* Elegant quote */}
                <motion.blockquote 
                  className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800"
                  variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
                >
                  <p className="text-lg font-light italic text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    "You do not rise to the level of your goals. You fall to the level of your systems."
                  </p>
                  <cite className="block mt-3 text-sm font-normal not-italic text-neutral-500 dark:text-neutral-500">
                    — James Clear, Atomic Habits
                  </cite>
                </motion.blockquote>

                {/* Key principles */}
                <div className="pt-8 space-y-6">
                  {[
                    { 
                      title: "Maximum Leverage", 
                      desc: "AI amplifies effort, not replaces it",
                      quote: "Leverage is a force multiplier for your judgment.",
                      author: "Naval Ravikant"
                    },
                    { title: "Compound Growth", desc: "Each cycle builds on the last" },
                    { title: "Custom Solutions", desc: "Tailored to your unique needs" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start space-x-4"
                      variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
                    >
                      <div className="w-1 h-12 bg-neutral-900 dark:bg-white opacity-20" />
                      <div className="flex-1">
                        <h3 className="font-medium text-neutral-900 dark:text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {item.desc}
                        </p>
                        {item.quote && (
                          <div className="mt-3 pl-4 border-l-2 border-neutral-200 dark:border-neutral-800">
                            <p className="text-xs font-light italic text-neutral-600 dark:text-neutral-400">
                              "{item.quote}"
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                              — {item.author}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Visual element - Minimal equation */}
              <motion.div 
                className="flex items-center justify-center md:justify-end"
                variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
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
        variants={getAnimationVariant(gpuScrollReveal, mobileScrollReveal)}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={getAnimationVariant(staggerContainer, mobileStaggerContainer)}
            className="space-y-20"
          >
            {/* Section header */}
            <motion.div 
              className="text-center space-y-6"
              variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-white">
                  How It Works
                </h2>
                <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                  Four phases, infinite cycles of growth
                </p>
              </div>
              
              {/* Subtle quote integration */}
              <p className="text-sm font-light italic text-neutral-500 dark:text-neutral-500 max-w-lg mx-auto">
                "Goals are good for setting a direction, but systems are best for making progress"
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
                      variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
                  >
                    {/* Number indicator */}
                      <div className="absolute left-8 md:left-1/2 w-7 h-7 md:w-8 md:h-8 -ml-4 md:-ml-4 rounded-full bg-white dark:bg-neutral-950 border-2 border-neutral-900 dark:border-white flex items-center justify-center">
                      <span className="text-xs font-medium">{phase.number}</span>
                    </div>

                    {/* Content */}
                      <div className={`ml-24 md:ml-0 flex-1 ${
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
              variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
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
        variants={getAnimationVariant(gpuScrollReveal, mobileScrollReveal)}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={getAnimationVariant(staggerContainer, mobileStaggerContainer)}
            className="space-y-16"
          >
            {/* Section header */}
            <motion.div 
              className="text-center space-y-6"
              variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-white">
                  Technology Stack
                </h2>
                <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Frontier AI meets practical implementation
                </p>
              </div>
              
              {/* Jobs quote on design */}
              <blockquote className="max-w-xl mx-auto">
                <p className="text-sm font-light italic text-neutral-600 dark:text-neutral-400">
                  "Design is not just what it looks like and feels like. Design is how it works."
                </p>
                <cite className="block text-xs font-normal not-italic text-neutral-500 dark:text-neutral-500 mt-2">
                  — Steve Jobs
                </cite>
              </blockquote>
            </motion.div>

            {/* Minimal tech grid */}
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-12 md:gap-y-16 flex gap-6 overflow-x-auto snap-x snap-mandatory [-webkit-overflow-scrolling:touch]">
              {techStackItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
                  className="group min-w-[82%] snap-start md:min-w-0"
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
              variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
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
            variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
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

      {/* Data-Driven Optimization Section - Minimal */}
      <motion.section 
        ref={dataRef}
        className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-900"
        initial="hidden"
        animate={dataInView ? "visible" : "hidden"}
        variants={getAnimationVariant(gpuScrollReveal, mobileScrollReveal)}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={getAnimationVariant(staggerContainer, mobileStaggerContainer)}
            className="space-y-16"
          >
            {/* Section header */}
            <motion.div 
              className="text-center"
              variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
            >
              <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-white">
                Data-Driven Decisions
              </h2>
              <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Transform insights into growth with intelligent analytics
              </p>
            </motion.div>

            {/* Data metrics - minimal approach */}
            <motion.div 
              className="grid md:grid-cols-3 gap-x-16 gap-y-12"
              variants={getAnimationVariant(staggerContainer, mobileStaggerContainer)}
            >
              <motion.div 
                className="text-center space-y-3"
                variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
              >
                <div className="text-xs font-medium tracking-wider uppercase text-neutral-400">
                  Analytics
                </div>
                <h3 className="text-lg font-normal text-neutral-900 dark:text-white">
                  User Journey Tracking
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  GA4 insights for conversion optimization
                </p>
                <div className="w-16 h-px bg-neutral-200 dark:bg-neutral-800 mx-auto" />
              </motion.div>

              <motion.div 
                className="text-center space-y-3"
                variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
              >
                <div className="text-xs font-medium tracking-wider uppercase text-neutral-400">
                  Visibility
                </div>
                <h3 className="text-lg font-normal text-neutral-900 dark:text-white">
                  Search Optimization
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Google Search Console for maximum reach
                </p>
                <div className="w-16 h-px bg-neutral-200 dark:bg-neutral-800 mx-auto" />
              </motion.div>

              <motion.div 
                className="text-center space-y-3"
                variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
              >
                <div className="text-xs font-medium tracking-wider uppercase text-neutral-400">
                  Behavior
                </div>
                <h3 className="text-lg font-normal text-neutral-900 dark:text-white">
                  User Understanding
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Hotjar heatmaps reveal engagement patterns
                </p>
                <div className="w-16 h-px bg-neutral-200 dark:bg-neutral-800 mx-auto" />
              </motion.div>
            </motion.div>

            {/* Bottom insight */}
            <motion.p 
              className="text-center text-sm text-neutral-500 dark:text-neutral-500"
              variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
            >
              Facts drive decisions. Decisions drive growth.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Client Impact Section - Minimal Metrics */}
      <motion.section 
        ref={impactRef}
        className="py-24 md:py-32"
        initial="hidden"
        animate={impactInView ? "visible" : "hidden"}
        variants={getAnimationVariant(gpuScrollReveal, mobileScrollReveal)}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={getAnimationVariant(staggerContainer, mobileStaggerContainer)}
            className="space-y-20"
          >
            {/* Section header */}
            <motion.div 
              className="text-center max-w-3xl mx-auto"
              variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
            >
              <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-white mb-6">
                Transform Your Business
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                From endless grind to sustainable growth. Automate workflows, optimize presence, 
                and create content that converts—all through one intelligent system.
              </p>
            </motion.div>

            {/* Elegant metrics display */}
            <div className="grid md:grid-cols-3 gap-12">
              <motion.div 
                className="text-center"
                variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
              >
                <div className="mb-4">
                  <span className="text-5xl md:text-6xl font-extralight text-neutral-900 dark:text-white">
                    3×
                  </span>
                </div>
                <h3 className="text-base font-medium text-neutral-900 dark:text-white mb-2">
                  Faster Scaling
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Accelerate with automation
                </p>
              </motion.div>

              <motion.div 
                className="text-center"
                variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
              >
                <div className="mb-4">
                  <span className="text-5xl md:text-6xl font-extralight text-neutral-900 dark:text-white">
                    2×
                  </span>
                </div>
                <h3 className="text-base font-medium text-neutral-900 dark:text-white mb-2">
                  Lead Growth
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Code meets content
                </p>
              </motion.div>

              <motion.div 
                className="text-center"
                variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
              >
                <div className="mb-4">
                  <span className="text-5xl md:text-6xl font-extralight text-neutral-900 dark:text-white">
                    ∞
                  </span>
                </div>
                <h3 className="text-base font-medium text-neutral-900 dark:text-white mb-2">
                  Compound Returns
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Value that multiplies
                </p>
              </motion.div>
            </div>

            {/* Munger quote on compounding */}
            <motion.div 
              className="max-w-2xl mx-auto text-center"
              variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
            >
              <blockquote className="space-y-3">
                <p className="text-base font-light italic text-neutral-700 dark:text-neutral-300">
                  "The first rule of compounding: Never interrupt it unnecessarily."
                </p>
                <cite className="block text-sm font-normal not-italic text-neutral-500 dark:text-neutral-500">
                  — Charlie Munger
                </cite>
              </blockquote>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Learn & Build Section - Minimal Resources */}
      <motion.section 
        ref={learnRef}
        className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-900"
        initial="hidden"
        animate={learnInView ? "visible" : "hidden"}
        variants={getAnimationVariant(gpuScrollReveal, mobileScrollReveal)}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={getAnimationVariant(staggerContainer, mobileStaggerContainer)}
            className="space-y-16"
          >
            {/* Section header */}
            <motion.div 
              className="text-center"
              variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
            >
              <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-white">
                Learn the System
              </h2>
              <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
                Master the flywheel methodology through our curated resources
              </p>
            </motion.div>

            {/* Resource links - minimal approach */}
            <div className="grid md:grid-cols-3 gap-12 md:gap-16">
              {/* Blog */}
              <motion.div 
                className="space-y-4"
                variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-normal text-neutral-900 dark:text-white">
                    Written Guides
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    In-depth articles on flywheel mechanics and implementation strategies
                  </p>
                </div>
                <Link 
                  href="/blog"
                  className="inline-flex items-center text-sm text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors group"
                  onClick={() => trackCTAClick("read guides minimal", "flywheel-learn")}
                >
                  Read Articles
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* YouTube */}
              <motion.div 
                className="space-y-4"
                variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-normal text-neutral-900 dark:text-white">
                    Video Tutorials
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Watch practical demonstrations and real-world flywheel examples
                  </p>
                </div>
                <a 
                  href="https://www.youtube.com/@the_design_prism" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors group"
                  onClick={() => trackCTAClick("watch youtube minimal", "flywheel-learn")}
                >
                  Watch Videos
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>

              {/* Instagram */}
              <motion.div 
                className="space-y-4"
                variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-normal text-neutral-900 dark:text-white">
                    Daily Insights
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Quick tips and behind-the-scenes content on flywheel implementation
                  </p>
                </div>
                <a 
                  href="https://www.instagram.com/the_design_prism/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors group"
                  onClick={() => trackCTAClick("follow instagram minimal", "flywheel-learn")}
                >
                  Follow Daily
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            </div>

            {/* Community note */}
            <motion.div 
              className="text-center pt-8"
              variants={getAnimationVariant(fadeInUp, mobileFadeIn)}
            >
              <p className="text-xs text-neutral-500 dark:text-neutral-500">
                Join 24,500+ on YouTube and 38,500+ on Instagram
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

            {/* Innovation quote */}
            <motion.div 
              variants={fadeInUp}
              className="py-6"
            >
              <p className="text-base font-light italic text-neutral-500 dark:text-neutral-500">
                "Innovation distinguishes between a leader and a follower."
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-600 mt-2">
                — Steve Jobs
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