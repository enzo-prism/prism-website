"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"

const services = [
  {
    title: "Websites that convert",
    description: "Launch a responsive site with story, proof, and CTAs tuned for high-intent traffic."
  },
  {
    title: "SEO that compounds",
    description: "Own the keywords your clips spark. We build technical foundations and content engines that rank."
  },
  {
    title: "Paid ads that scale",
    description: "Deploy TikTok-to-site retargeting and multi-channel campaigns that protect CAC."
  },
  {
    title: "Analytics that guide moves",
    description: "Dashboards, attribution, and experiments that show which ideas drive pipeline."
  }
]

const testimonials = [
  {
    quote: "Prism turned our viral moments into reliable revenue. The speed and clarity beat every agency we tried.",
    name: "Sasha R., Founder"
  },
  {
    quote: "They bridge creative ideas and performance. Within 45 days we had a new funnel, tracking, and 3x leads.",
    name: "Marco D., Growth Lead"
  }
]

const tiktokClips = [
  "https://www.tiktok.com/embed/v2/7315356331853198606",
  "https://www.tiktok.com/embed/v2/7305248729557310766",
  "https://www.tiktok.com/embed/v2/7289975386049350917"
]

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export default function TikTokLandingPage() {
  return (
    <div className="bg-white text-neutral-900">
      <Navbar />
      <ScrollToTop />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white" aria-hidden />
          <div className="absolute inset-x-0 top-24 mx-auto hidden max-w-5xl px-4 md:block" aria-hidden>
            <div className="relative rounded-3xl border border-white/40 bg-white/40 p-6 shadow-[0_40px_100px_-40px_rgba(15,23,42,0.35)] backdrop-blur">
              <div className="grid grid-cols-3 gap-4">
                {tiktokClips.map((clip, index) => (
                  <div
                    key={clip}
                    className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/50 bg-neutral-900/40 shadow-lg"
                  >
                    <iframe
                      src={`${clip}?is_copy_url=1&is_from_webapp=v1`}
                      title={`TikTok clip ${index + 1}`}
                      loading="lazy"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-neutral-900/20" />
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#6366f1]/30 via-transparent to-[#ec4899]/30" />
            </div>
          </div>
          <div className="container relative mx-auto flex min-h-[60vh] flex-col justify-center px-4 pb-24 pt-32 md:pb-32">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mx-auto flex max-w-2xl flex-col items-center text-center"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
                prism for tiktok
              </span>
              <div className="mt-6 w-full md:hidden">
                <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-neutral-900/80 p-4 shadow-lg">
                  <div className="flex items-stretch gap-3">
                    {tiktokClips.slice(0, 2).map((clip, index) => (
                      <div
                        key={`mobile-clip-${clip}`}
                        className="relative w-1/2 overflow-hidden rounded-2xl border border-white/30"
                      >
                        <iframe
                          src={`${clip}?is_copy_url=1&is_from_webapp=v1`}
                          title={`TikTok clip mobile ${index + 1}`}
                          loading="lazy"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          allowFullScreen
                          className="aspect-[9/16] h-full w-full"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#6366f1]/40 via-transparent to-[#ec4899]/40" />
                </div>
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                You’ve seen the clips. Now build what they talk about.
              </h1>
              <p className="mt-6 text-base text-neutral-600 md:text-lg">
                Prism turns TikTok inspiration into measurable growth. We connect creative sparks to full-funnel systems that
                convert attention into revenue.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="rounded-full px-8 py-3 text-base">
                  <Link href="/get-started">Work With Prism</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-neutral-200 px-8 py-3 text-base text-neutral-900 hover:bg-neutral-100"
                >
                  <Link href="/refer">Refer &amp; Earn</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Prism Exists */}
        <section className="border-y border-neutral-100 bg-neutral-50/50 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              className="mx-auto max-w-3xl text-center"
            >
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Why Prism exists</h2>
              <p className="mt-5 text-base text-neutral-600 md:text-lg">
                TikTok teaches speed, authenticity, and relentless iteration. Most brands can’t translate that energy into their
                marketing stack. Prism exists to bridge the gap — taking the playbook you binge and building the systems that keep
                growth compounding long after the clip ends.
              </p>
            </motion.div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">What we do</h2>
              <p className="mt-4 text-base text-neutral-600 md:text-lg">
                We turn viral momentum into owned marketing assets that keep your calendar and pipeline full.
              </p>
            </motion.div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeInUp}
                  className="group relative overflow-hidden rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm transition-shadow duration-500 hover:shadow-xl"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#6366f1]/0 via-transparent to-[#ec4899]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <h3 className="text-xl font-semibold text-neutral-900">{service.title}</h3>
                  <p className="mt-4 text-sm text-neutral-600 md:text-base">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Principles Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100" aria-hidden />
          <div className="container relative mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center"
            >
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Built on the principles we share</h2>
                <p className="mt-5 text-base text-neutral-600 md:text-lg">
                  Every TikTok breakdown we publish becomes a deliverable. Speed of iteration. Clear data loops. Experiences that
                  look as good as they convert. We build your stack with the same systems, tools, and creative discipline you’ve
                  seen in our clips.
                </p>
                <div className="mt-8 flex flex-col gap-4 text-sm text-neutral-600 md:text-base">
                  <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
                    <p className="font-semibold text-neutral-900">Clip insight → Live experiment</p>
                    <p className="mt-2 text-neutral-600">
                      We capture the experiment from TikTok and deploy it on your site, CRM, and ad stack in days — not months.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
                    <p className="font-semibold text-neutral-900">Project library to reference</p>
                    <p className="mt-2 text-neutral-600">
                      Access annotated Looms, dashboards, and screenshots of real Prism builds so your team can learn by example.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-3xl border border-white/40 bg-white/60 p-4 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.45)] backdrop-blur">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900/80">
                      <iframe
                        src={`${tiktokClips[0]}?is_copy_url=1&is_from_webapp=v1`}
                        title="Featured TikTok clip"
                        loading="lazy"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                        className="h-full w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="aspect-video overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900/90">
                        <img
                          src="https://images.prismic.io/design-prism/30b8a5c2-portfolio-dashboard.png?auto=compress,format"
                          alt="Prism analytics dashboard"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="aspect-video overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900/90">
                        <img
                          src="https://images.prismic.io/design-prism/4a0b7e9f-case-study-screenshot.png?auto=compress,format"
                          alt="Prism project showcase"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#6366f1]/20 blur-3xl" />
                <div className="pointer-events-none absolute -right-6 bottom-0 h-36 w-36 rounded-full bg-[#ec4899]/20 blur-3xl" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Ready */}
        <section className="border-y border-neutral-100 bg-neutral-50/70 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              className="mx-auto flex max-w-3xl flex-col items-center text-center"
            >
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Ready to take the next step?</h2>
              <p className="mt-4 text-base text-neutral-600 md:text-lg">
                Let’s turn fast-moving content into the systems that win clients, partners, and advocates.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="rounded-full px-8 py-3 text-base">
                  <Link href="/get-started">Work With Prism</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="rounded-full bg-white px-8 py-3 text-base text-neutral-900 shadow-sm hover:bg-neutral-100"
                >
                  <Link href="/refer">Refer &amp; Earn</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Social proof</h2>
              <p className="mt-4 text-base text-neutral-600 md:text-lg">
                Founders, operators, and creators trust Prism to translate ideas into high-performance marketing ecosystems.
              </p>
            </motion.div>
            <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div className="grid gap-6 sm:grid-cols-2">
                {testimonials.map((testimonial) => (
                  <motion.blockquote
                    key={testimonial.quote}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={fadeInUp}
                    className="relative flex h-full flex-col justify-between rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm"
                  >
                    <p className="text-base font-medium text-neutral-800 md:text-lg">“{testimonial.quote}”</p>
                    <cite className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
                      {testimonial.name}
                    </cite>
                  </motion.blockquote>
                ))}
              </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeInUp}
                className="space-y-4"
              >
                {tiktokClips.slice(0, 2).map((clip, index) => (
                  <div
                    key={`social-${clip}`}
                    className="aspect-[9/16] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-900/80 shadow-lg"
                  >
                    <iframe
                      src={`${clip}?is_copy_url=1&is_from_webapp=v1`}
                      title={`TikTok testimonial ${index + 1}`}
                      loading="lazy"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
