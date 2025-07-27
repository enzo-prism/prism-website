"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { trackCTAClick } from "@/utils/analytics"
import { fadeInUp, staggerContainer } from "@/utils/animation-variants"
import { AnimatePresence, motion } from "framer-motion"
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
import { useState } from "react"
import VideoWithPoster from "@/components/video-with-poster"

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        className="relative px-4 pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background with prism effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            className="text-center space-y-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold tracking-tight lowercase"
              variants={fadeInUp}
            >
              the prism flywheel: compounding leverage for unstoppable growth
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto lowercase"
              variants={fadeInUp}
            >
              harness frontier ai and cutting-edge tech to build a self-reinforcing system 
              that transforms code and content into revenue. we craft custom flywheels that 
              compound value, delivering maximum leverage for innovative startups, healthcare 
              practices, and ambitious brands.
            </motion.p>

            <motion.p
              className="text-neutral-500 lowercase"
              variants={fadeInUp}
            >
              in a world of endless grind, prism's flywheel turns effort into exponential 
              results—research, create, optimize, monetize, repeat.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Button 
                size="lg"
                className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-8 py-6 text-lg lowercase"
                onClick={() => {
                  trackCTAClick("join waitlist", "hero-flywheel")
                  document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                join the waitlist for your custom flywheel
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Flywheel Video */}
          <motion.div 
            className="mt-16 relative max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-2xl">
              <VideoWithPoster
                videoId="1104840957"
                posterSrc="/prism-flywheel-poster.png"
                fallbackPosterSrc="/placeholder.jpg"
                width={1080}
                height={1920}
                className="w-full h-full"
                autoplay={true}
                loop={true}
                muted={true}
                controls={false}
                posterAlt="Prism Flywheel Visualization"
                trackAnalytics={true}
              />
            </div>
            
            {/* Interactive phase indicators below video */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {flywheelPhases.map((phase) => (
                <motion.div
                  key={phase.number}
                  className={`p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer ${phase.color}`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActivePhase(phase.number)}
                >
                  <phase.icon className="h-6 w-6 mb-2" />
                  <h4 className="font-semibold text-sm lowercase">{phase.title}</h4>
                </motion.div>
              ))}
            </div>

            {/* Phase details */}
            <AnimatePresence>
              {activePhase && (
                <motion.div
                  className="mt-4 bg-white p-6 rounded-lg shadow-xl"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h4 className="font-bold text-lg lowercase mb-2">
                    phase {activePhase}: {flywheelPhases[activePhase - 1].title}
                  </h4>
                  <p className="text-neutral-600 lowercase">
                    {flywheelPhases[activePhase - 1].details}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 lowercase">
                our vision: building leverage through code, content, and ai
              </h2>
              <p className="text-neutral-600 mb-6 lowercase">
                at prism, we believe growth isn't about hustle—it's about intelligent systems. 
                our flywheel starts with deep research, leverages ai for creation, optimizes 
                with data, and scales through monetization. this creates a virtuous cycle where 
                every input compounds, turning your business into a revenue powerhouse.
              </p>
              <p className="text-neutral-600 mb-8 lowercase">
                we use frontier technologies to orchestrate code for automation, content for 
                engagement, and ai for innovation—ensuring thoughtful, data-driven decisions 
                at every turn.
              </p>
              
              <div className="space-y-4">
                <motion.div 
                  className="flex items-start space-x-3"
                  variants={fadeInUp}
                >
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold lowercase">maximum leverage</h3>
                    <p className="text-sm text-neutral-600 lowercase">
                      amplify your efforts with tools like grok and claude for intelligent automation
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-3"
                  variants={fadeInUp}
                >
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold lowercase">compounding flywheel</h3>
                    <p className="text-sm text-neutral-600 lowercase">
                      each phase builds on the last, creating exponential growth without burnout
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-3"
                  variants={fadeInUp}
                >
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold lowercase">custom tech</h3>
                    <p className="text-sm text-neutral-600 lowercase">
                      a bespoke blend tailored to your niche, from startups to healthcare
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              variants={fadeInUp}
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 p-8">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Brain className="h-24 w-24 text-purple-600 mx-auto mb-4" />
                    <p className="text-2xl font-bold text-purple-900 lowercase">
                      code × content × ai = leverage
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
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
              the flywheel in action: a step-by-step engine for growth
            </motion.h2>
            <motion.p 
              className="text-center text-neutral-600 mb-12 lowercase"
              variants={fadeInUp}
            >
              our flywheel is a four-phase system designed to evolve with your business
            </motion.p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {flywheelPhases.map((phase) => (
                <motion.div
                  key={phase.number}
                  className="relative"
                  variants={fadeInUp}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <div className={`inline-flex p-3 rounded-full bg-neutral-100 mb-4 ${phase.color}`}>
                      <phase.icon className="h-6 w-6" />
                    </div>
                    
                    <div className="text-sm text-neutral-500 mb-2 lowercase">
                      phase {phase.number}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 lowercase">
                      {phase.title}
                    </h3>
                    
                    <p className="text-neutral-600 text-sm mb-3 lowercase">
                      {phase.description}
                    </p>
                    
                    <p className="text-xs text-neutral-500 lowercase">
                      {phase.details}
                    </p>
                  </Card>
                  
                  {phase.number < 4 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-neutral-300" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.p 
              className="text-center mt-12 text-neutral-600 lowercase"
              variants={fadeInUp}
            >
              this loop compounds: outputs from one phase fuel the next, creating a growth engine that scales effortlessly
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
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
              our custom tech combination: frontier ai meets practical power
            </motion.h2>
            <motion.p 
              className="text-center text-neutral-600 mb-12 max-w-3xl mx-auto lowercase"
              variants={fadeInUp}
            >
              we thoughtfully curate a stack of best-in-class tools to build your flywheel—integrating 
              ai for intelligence, design for beauty, and platforms for reach
            </motion.p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStackItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  onHoverStart={() => setHoveredTech(index)}
                  onHoverEnd={() => setHoveredTech(null)}
                >
                  <Card className={`p-6 h-full transition-all ${
                    hoveredTech === index ? 'shadow-xl' : 'shadow-md'
                  }`}>
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${item.color} text-white mb-4`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    
                    <div className="text-sm text-neutral-500 mb-2 lowercase">
                      {item.category}
                    </div>
                    
                    <h3 className="text-lg font-bold mb-3 lowercase">
                      {item.title}
                    </h3>
                    
                    <p className="text-neutral-600 text-sm lowercase">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.p 
              className="text-center mt-12 text-neutral-600 lowercase max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              this isn't a generic stack—it's a custom orchestration, deeply thoughtful to 
              maximize leverage for your unique growth needs
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Data-Driven Optimization Section */}
      <section className="py-16 md:py-24">
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
      </section>

      {/* Client Impact Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
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
      </section>

      {/* Learn & Build Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
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
      </section>

      {/* CTA Footer Section */}
      <section id="waitlist-form" className="py-16 md:py-24 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 lowercase"
              variants={fadeInUp}
            >
              ignite your flywheel today
            </motion.h2>
            <motion.p 
              className="text-neutral-200 mb-8 lowercase max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              join visionary leaders building with prism. apply for our selective waitlist 
              and unlock a custom growth engine
            </motion.p>

            {/* Typeform embed placeholder */}
            <motion.div 
              className="bg-white/10 rounded-lg p-8 mb-8"
              variants={fadeInUp}
            >
              <p className="text-neutral-300 mb-4 lowercase">
                [typeform waitlist application will be embedded here]
              </p>
              <Button 
                size="lg"
                className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-full px-8 py-6 text-lg lowercase"
                onClick={() => trackCTAClick("apply now", "footer-flywheel")}
              >
                apply for early access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.p 
              className="text-sm text-neutral-400 lowercase"
              variants={fadeInUp}
            >
              deeply thoughtful tech for exceptional results—let's compound your success
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 