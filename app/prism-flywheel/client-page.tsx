import { Button } from "@/components/ui/button"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import FlywheelPhaseSelector from "@/components/prism-flywheel/FlywheelPhaseSelector"
import TrackedAnchor from "@/components/tracked-anchor"
import TrackedLink from "@/components/tracked-link"
import { ArrowRight } from "lucide-react"

// All scroll-in animations removed for stability and simplicity

// Tech stack items with their categories
const techStackItems = [
  {
    category: "AI Development",
    title: "claude code + cursor",
    description: "ai-assisted coding for rapid, error-free automation"
  },
  {
    category: "AI Content",
    title: "chatgpt + grok + google gemini",
    description: "frontier llms for content ideation and semantic search"
  },
  {
    category: "Design & Visual",
    title: "midjourney + figma + loveable",
    description: "visual ai and design tools for sleek, engaging assets"
  },
  {
    category: "Development",
    title: "notion + replit + vercel",
    description: "collaborative workspaces and deployment for scalable code"
  },
  {
    category: "Research",
    title: "perplexity",
    description: "real-time ai research to fuel data-driven insights"
  },
  {
    category: "Local Presence",
    title: "google business + apple + yelp + zocdoc",
    description: "local seo and booking integrations for healthcare/brand visibility"
  }
]

// Flywheel phases
const flywheelPhases = [
  {
    number: 1,
    title: "research & ideation",
    description: "watch trends, clip insights, and remix with ai",
    details: "Using Perplexity for real-time data and Grok for semantic analysis"
  },
  {
    number: 2,
    title: "creation & remixing",
    description: "build content and code with frontier tools",
    details: "Claude Code and Cursor for rapid development, Midjourney for visuals"
  },
  {
    number: 3,
    title: "optimization & analysis",
    description: "refine with data",
    details: "GA4 for traffic, Hotjar for user heatmaps, GSC for SEO insights"
  },
  {
    number: 4,
    title: "monetization & scaling",
    description: "bundle value into products and scale",
    details: "Deploy via Vercel/Replit, connect locally with Google Business Profile"
  }
]

export default function PrismFlywheelClient() {
  // Removed intersection observers and refs – content is rendered fully visible

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero Section - Minimal & Elegant */}
      <section 
        className="relative px-4 pt-24 pb-12 md:pt-40 md:pb-20"
      >
        <div className="container mx-auto max-w-5xl">
          <div 
            className="space-y-8"
          >
            {/* Minimal heading */}
            <div 
              className="text-center"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-900 dark:text-white">
                The Prism Flywheel
              </h1>
              <div className="mt-4 text-sm font-medium tracking-[0.3em] uppercase text-neutral-400">
                Compounding Growth System
              </div>
            </div>
            
            {/* Clean description */}
            <p 
              className="text-base md:text-lg text-center text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
            >
              Transform code and content into revenue through our AI-powered growth system. 
              Research, create, optimize, and scale—each cycle compounds your success.
            </p>

            {/* Single elegant CTA */}
            <div 
              className="text-center"
            >
              <Button
                asChild
                className="group px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-sm rounded-full hover:scale-[1.02] transition-[transform,background-color,color] duration-200"
              >
                <TrackedLink
                  href="/get-started"
                  label={FREE_AUDIT_CTA_TEXT}
                  location="hero-flywheel-minimal"
                >
                  {FREE_AUDIT_CTA_TEXT}
                  <ArrowRight className="inline-block ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </TrackedLink>
              </Button>
            </div>
          </div>

          {/* Flywheel Video - Elegant Presentation */}
          <div 
            className="mt-20 relative max-w-3xl mx-auto"
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
            <FlywheelPhaseSelector phases={flywheelPhases} />
          </div>
        </div>
      </section>

      {/* Philosophy Section - Minimal Design */}
      <section 
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div 
            className="space-y-16"
          >
            {/* Section header */}
            <div 
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-white">
                Our Philosophy
              </h2>
              <div className="mt-6 w-12 h-px bg-neutral-900 dark:bg-white mx-auto" />
            </div>

            {/* Content grid */}
            <div 
              className="grid md:grid-cols-2 gap-16 items-start"
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
                <blockquote 
                  className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800"
                >
                  <p className="text-lg font-light italic text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    "You do not rise to the level of your goals. You fall to the level of your systems."
                  </p>
                  <cite className="block mt-3 text-sm font-normal not-italic text-neutral-500 dark:text-neutral-500">
                    — James Clear, Atomic Habits
                  </cite>
                </blockquote>

                {/* Key principles */}
                <div className="pt-8 space-y-6">
                  {[
                    { 
                      title: "maximum leverage", 
                      desc: "AI amplifies effort, not replaces it",
                      quote: "Leverage is a force multiplier for your judgment.",
                      author: "Naval Ravikant"
                    },
                    { title: "compound growth", desc: "Each cycle builds on the last" },
                    { title: "custom solutions", desc: "Tailored to your unique needs" }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-4"
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
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual element - Minimal equation */}
              <div 
                className="flex items-center justify-center md:justify-end"
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Minimalist Timeline */}
      <section 
        className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-900"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-20">
            {/* Section header */}
            <div 
              className="text-center space-y-6"
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
            </div>

            {/* Vertical timeline */}
            <div className="relative">
              {/* Central line */}
                  <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800 md:-translate-x-1/2" />

              {/* Phase items */}
              <div className="space-y-16">
                {flywheelPhases.map((phase, index) => (
                    <div
                    key={phase.number}
                    className={`relative flex items-start ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-row`}
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
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center pt-8">
              <Button
                asChild
                variant="ghost"
                className="text-neutral-900 dark:text-white hover:bg-transparent border-b-2 border-transparent hover:border-neutral-900 dark:hover:border-white rounded-none px-0 py-2 transition-[border-color,color,background-color] duration-200"
              >
                <TrackedLink
                  href="/get-started"
                  label={FREE_AUDIT_CTA_TEXT}
                  location="how it works"
                >
                  {FREE_AUDIT_CTA_TEXT} →
                </TrackedLink>
              </Button>
              <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                Want a concrete module?{" "}
                <TrackedLink
                  href="/proof"
                  className="underline"
                  label="view proof"
                  location="how it works crosslink"
                >
                  See Prism Proof
                </TrackedLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section - Minimal Grid */}
      <section 
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-16">
            {/* Section header */}
            <div 
              className="text-center space-y-6"
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
            </div>

            {/* Minimal tech grid */}
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-12 md:gap-y-16 flex gap-6 overflow-x-auto snap-x snap-mandatory [-webkit-overflow-scrolling:touch]">
              {techStackItems.map((item, index) => (
                <div
                  key={index}
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
                    <div className="h-px bg-neutral-200 dark:bg-neutral-800 transition-colors duration-200 group-hover:bg-neutral-900 dark:group-hover:bg-white" />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom note */}
            <p 
              className="text-center text-sm text-neutral-500 dark:text-neutral-500"
            >
              Custom-tailored for your unique growth trajectory
            </p>
          </div>
        </div>
      </section>

      {/* Mid-page CTA Section - Minimal */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-xl md:text-2xl font-light text-neutral-900 dark:text-white mb-6">
              Ready to compound your growth?
            </h3>
            <Button
              asChild
              variant="outline"
              className="border-neutral-900 dark:border-white text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 rounded-full px-8 py-3 transition-colors duration-200"
            >
              <TrackedLink
                href="/get-started"
                label={FREE_AUDIT_CTA_TEXT}
                location="mid-page-flywheel"
              >
                {FREE_AUDIT_CTA_TEXT}
              </TrackedLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Data-Driven Optimization Section - Minimal */}
      <section 
        className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-900"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-16">
            {/* Section header */}
            <div 
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-white">
                Data-Driven Decisions
              </h2>
              <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Transform insights into growth with intelligent analytics
              </p>
            </div>

            {/* Data metrics - minimal approach */}
            <div 
              className="grid md:grid-cols-3 gap-x-16 gap-y-12"
            >
              <div 
                className="text-center space-y-3"
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
              </div>

              <div 
                className="text-center space-y-3"
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
              </div>

              <div 
                className="text-center space-y-3"
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
              </div>
            </div>

            {/* Bottom insight */}
            <p 
              className="text-center text-sm text-neutral-500 dark:text-neutral-500"
            >
              Facts drive decisions. Decisions drive growth.
            </p>
          </div>
        </div>
      </section>

      {/* Client Impact Section - Minimal Metrics */}
      <section 
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-20">
            {/* Section header */}
            <div 
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-white mb-6">
                Transform Your Business
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                From endless grind to sustainable growth. Automate workflows, optimize presence, 
                and create content that converts—all through one intelligent system.
              </p>
            </div>

            {/* Elegant metrics display */}
            <div className="grid md:grid-cols-3 gap-12">
              <div 
                className="text-center"
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
              </div>

              <div 
                className="text-center"
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
              </div>

              <div 
                className="text-center"
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
              </div>
            </div>

            {/* Munger quote on compounding */}
            <div 
              className="max-w-2xl mx-auto text-center"
            >
              <blockquote className="space-y-3">
                <p className="text-base font-light italic text-neutral-700 dark:text-neutral-300">
                  "The first rule of compounding: Never interrupt it unnecessarily."
                </p>
                <cite className="block text-sm font-normal not-italic text-neutral-500 dark:text-neutral-500">
                  — Charlie Munger
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Learn & Build Section - Minimal Resources */}
      <section 
        className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-900"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-16">
            {/* Section header */}
            <div 
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-white">
                Learn the System
              </h2>
              <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
                Master the flywheel methodology through our curated resources
              </p>
            </div>

            {/* Resource links - minimal approach */}
            <div className="grid md:grid-cols-3 gap-12 md:gap-16">
              {/* Blog */}
              <div 
                className="space-y-4"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-normal text-neutral-900 dark:text-white">
                    Written Guides
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    In-depth articles on flywheel mechanics and implementation strategies
                  </p>
                </div>
                <TrackedLink
                  href="/blog"
                  className="inline-flex items-center text-sm text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors group"
                  label="read guides minimal"
                  location="flywheel-learn"
                >
                  Read Articles
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </TrackedLink>
              </div>

              {/* YouTube */}
              <div 
                className="space-y-4"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-normal text-neutral-900 dark:text-white">
                    Video Tutorials
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Watch practical demonstrations and real-world flywheel examples
                  </p>
                </div>
                <TrackedAnchor
                  href="https://www.youtube.com/@the_design_prism"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors group"
                  label="watch youtube minimal"
                  location="flywheel-learn"
                >
                  Watch Videos
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </TrackedAnchor>
              </div>

              {/* Instagram */}
              <div 
                className="space-y-4"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-normal text-neutral-900 dark:text-white">
                    Daily Insights
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Quick tips and behind-the-scenes content on flywheel implementation
                  </p>
                </div>
                <TrackedAnchor
                  href="https://www.instagram.com/the_design_prism/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors group"
                  label="follow instagram minimal"
                  location="flywheel-learn"
                >
                  Follow Daily
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </TrackedAnchor>
              </div>
            </div>

            {/* Community note */}
            <div className="text-center pt-8">
              <p className="text-xs text-neutral-500 dark:text-neutral-500">
                Join 24,500+ on YouTube and 40,000+ on Instagram
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section - Minimal */}
      <section className="py-32 md:py-40 bg-neutral-950 text-white">
        <div className="container mx-auto px-4">
          <div
            className="text-center max-w-3xl mx-auto space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-light">
                Ready to Build?
              </h2>
            </div>

            <div>
              <p className="text-neutral-400 text-lg leading-relaxed">
                Transform your business with a growth system that compounds. 
                Join leaders who choose leverage over hustle.
              </p>
            </div>

            {/* Innovation quote */}
            <div className="py-6">
              <p className="text-base font-light italic text-neutral-500 dark:text-neutral-500">
                "Innovation distinguishes between a leader and a follower."
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-600 mt-2">
                — Steve Jobs
              </p>
            </div>

            <div className="pt-4">
              <Button
                asChild
                className="bg-white text-neutral-900 hover:bg-neutral-100 font-medium text-sm px-10 py-4 rounded-full transition-[transform,background-color,color] duration-200 hover:scale-[1.02]"
              >
                <TrackedLink
                  href="/get-started"
                  label={FREE_AUDIT_CTA_TEXT}
                  location="footer-flywheel"
                >
                  {FREE_AUDIT_CTA_TEXT}
                </TrackedLink>
              </Button>
            </div>

            <div 
              className="pt-8 border-t border-neutral-800"
            >
              <p className="text-xs text-neutral-500">
                Limited spots available for Q1 2025
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 
