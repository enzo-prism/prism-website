"use client"

import { DrWongGrowthChart } from "@/components/case-studies/dr-wong-growth-chart";
import { DrWongUserDemographicsChart } from "@/components/case-studies/dr-wong-user-demographics-chart"; // Import the new chart
import Footer from "@/components/footer";
import PageViewTracker from "@/components/page-view-tracker";
import { CaseStudySchema } from "@/components/schema-markup";
import SocialShare from "@/components/social-share";
import { Button } from "@/components/ui/button";
import YouTubeVideoEmbed from "@/components/youtube-video-embed";
import { trackCTAClick } from "@/utils/analytics";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants";
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })
const CLIENT_SITE = "https://www.chriswongdds.com"

export default function ChristopherWongCaseStudy() {
  const [activeSection, setActiveSection] = useState("")
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("static-dr-wong-hero")
    if (hero) {
      hero.setAttribute("data-hydrated-hidden", "true")
      hero.setAttribute("aria-hidden", "true")
      hero.style.display = "none"
    }
  }, [])

  // Track scroll position to highlight active section in table of contents
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]")
      let currentSection = ""

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        if (sectionTop < 200) {
          currentSection = section.getAttribute("data-section") || ""
        }
      })

      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  // Scroll to section when clicking on table of contents
  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(`[data-section="${sectionId}"]`)
    if (section) {
      window.scrollTo({
        top: section.getBoundingClientRect().top + window.scrollY - 100,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <PageViewTracker title="Dr. Christopher Wong Case Study" />
      <Navbar />
      <main className="flex-1 bg-white">
        {/* Minimal Hero Section with Polaroids */}
        <section className="border-b px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 bg-neutral-100 rounded-full text-sm lowercase">case study</div>
              <h1 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                powering a seamless transition for dr. christopher wong
              </h1>
              <p className="text-xl text-neutral-600 lowercase">
                how we helped a palo alto dental practice achieve 100% patient retention and exponential growth
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit chriswongdds.com
                  </Link>
                </Button>
              </div>
            </div>

            {/* Polaroid Images - With Animation */}
            <div className="mt-10 mb-6 relative">
              <div className="bg-neutral-50 p-4 sm:p-6 rounded-lg shadow-sm">
                <div className="flex justify-center">
                  <div
                    className={`max-w-full overflow-hidden transition-all duration-700 ${
                      imageLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <Image
                      src="/dr-wong-polaroids.png"
                      alt="Polaroid photos of Dr. Christopher Wong in his dental practice"
                      width={800}
                      height={450}
                      className="rounded-md max-w-full h-auto hover:scale-[1.02] transition-transform duration-300"
                      priority
                      onLoadingComplete={() => setImageLoaded(true)}
                    />
                  </div>
                </div>
                <p
                  className={`text-center text-sm text-neutral-500 mt-4 lowercase italic transition-opacity duration-700 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                >
                  behind the scenes: polaroids from our photoshoot with dr. wong at his palo alto practice
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Metrics Section - Moved Higher */}
        <section className="px-4 py-12 bg-neutral-50 border-b">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-2xl font-bold tracking-tighter lowercase mb-8 text-center">
              the results speak for themselves
            </h2>
            
            {/* Primary Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white border p-6 rounded-lg text-center">
                <div className="text-3xl font-bold mb-1 lowercase text-neutral-900">100%</div>
                <div className="text-sm text-neutral-600 lowercase">patient retention</div>
              </div>
              <div className="bg-white border p-6 rounded-lg text-center">
                <div className="text-3xl font-bold mb-1 lowercase text-neutral-900">3,600</div>
                <div className="text-sm text-neutral-600 lowercase">active users</div>
              </div>
              <div className="bg-white border p-6 rounded-lg text-center">
                <div className="text-3xl font-bold mb-1 lowercase text-neutral-900">97%</div>
                <div className="text-sm text-neutral-600 lowercase">new visitors</div>
              </div>
              <div className="bg-white border p-6 rounded-lg text-center">
                <div className="text-3xl font-bold mb-1 lowercase text-neutral-900">1,400</div>
                <div className="text-sm text-neutral-600 lowercase">organic sessions</div>
              </div>
            </div>

            {/* Charts Section - Moved from Results */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="font-medium lowercase mb-4">explosive growth trajectory</h3>
                <p className="text-sm text-neutral-600 mb-6 lowercase">
                  website traffic surged immediately after our partnership began, with consistent month-over-month growth
                </p>
                <DrWongGrowthChart />
              </div>
              <div>
                <h3 className="font-medium lowercase mb-4">attracting new patients at scale</h3>
                <p className="text-sm text-neutral-600 mb-6 lowercase">
                  nearly all website visitors are new users, demonstrating our ability to expand patient reach
                </p>
                <DrWongUserDemographicsChart />
              </div>
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="bg-white border p-4 rounded-md">
                <div className="text-xl font-bold mb-1 lowercase">palo alto</div>
                <div className="text-xs text-neutral-600 lowercase">competitive market</div>
              </div>
              <div className="bg-white border p-4 rounded-md">
                <div className="text-xl font-bold mb-1 lowercase">multi-phase</div>
                <div className="text-xs text-neutral-600 lowercase">digital strategy</div>
              </div>
              <div className="bg-white border p-4 rounded-md">
                <div className="text-xl font-bold mb-1 lowercase">top rankings</div>
                <div className="text-xs text-neutral-600 lowercase">local seo dominance</div>
              </div>
              <div className="bg-white border p-4 rounded-md">
                <div className="text-xl font-bold mb-1 lowercase">5-star</div>
                <div className="text-xs text-neutral-600 lowercase">online reputation</div>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents - Desktop */}
        <div className="hidden lg:block sticky top-16 bg-white border-b z-10">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="py-4 flex gap-6 text-sm overflow-x-auto scrollbar-hide">
              <button
                onClick={() => scrollToSection("overview")}
                className={`whitespace-nowrap ${activeSection === "overview" ? "font-medium text-black" : "text-neutral-500"}`}
              >
                Overview
              </button>
              <button
                onClick={() => scrollToSection("challenge")}
                className={`whitespace-nowrap ${activeSection === "challenge" ? "font-medium text-black" : "text-neutral-500"}`}
              >
                The Challenge
              </button>
              <button
                onClick={() => scrollToSection("phase1")}
                className={`whitespace-nowrap ${activeSection === "phase1" ? "font-medium text-black" : "text-neutral-500"}`}
              >
                Phase 1 Solution
              </button>
              <button
                onClick={() => scrollToSection("phase2")}
                className={`whitespace-nowrap ${activeSection === "phase2" ? "font-medium text-black" : "text-neutral-500"}`}
              >
                Phase 2 Solution
              </button>
              <button
                onClick={() => scrollToSection("partnership")}
                className={`whitespace-nowrap ${activeSection === "partnership" ? "font-medium text-black" : "text-neutral-500"}`}
              >
                Partnership
              </button>
              <button
                onClick={() => scrollToSection("results")}
                className={`whitespace-nowrap ${activeSection === "results" ? "font-medium text-black" : "text-neutral-500"}`}
              >
                Deep Dive
              </button>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Table of Contents - Mobile */}
            <div className="lg:hidden border-b pb-6 mt-6">
              <h2 className="font-medium mb-4 lowercase">Contents</h2>
              <ul className="space-y-3 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection("overview")}
                    className={`flex items-center ${activeSection === "overview" ? "font-medium text-black" : "text-neutral-500"}`}
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("challenge")}
                    className={`flex items-center ${activeSection === "challenge" ? "font-medium text-black" : "text-neutral-500"}`}
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    The Challenge
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("phase1")}
                    className={`flex items-center ${activeSection === "phase1" ? "font-medium text-black" : "text-neutral-500"}`}
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Phase 1 Solution
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("phase2")}
                    className={`flex items-center ${activeSection === "phase2" ? "font-medium text-black" : "text-neutral-500"}`}
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Phase 2 Solution
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("partnership")}
                    className={`flex items-center ${activeSection === "partnership" ? "font-medium text-black" : "text-neutral-500"}`}
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Partnership
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("results")}
                    className={`flex items-center ${activeSection === "results" ? "font-medium text-black" : "text-neutral-500"}`}
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Deep Dive
                  </button>
                </li>
              </ul>
            </div>

            {/* Main Content */}
            <div className="col-span-1 lg:col-span-4">
              {/* Overview Section */}
              <section className="py-8" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  from practice transition to digital dominance
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>
                    The numbers above tell a remarkable story. When Dr. Christopher B. Wong prepared to take over an 
                    established dental practice in Palo Alto from the retiring Dr. Kris Hamamoto, he faced the critical 
                    challenge every practice transition faces: maintaining patient trust while building for the future.
                  </p>
                  <p>
                    Not only did we help Dr. Wong retain 100% of existing patients during the transition, but we also 
                    transformed his practice into a growth engine that now attracts thousands of new potential patients 
                    every month. The data visualization above shows just how dramatic this transformation has been.
                  </p>
                  <p>
                    This case study reveals our strategic approach to ensuring seamless practice transitions while 
                    building sustainable growth through modern digital marketing strategies.
                  </p>
                </div>
              </section>

              {/* The Challenge Section */}
              <section className="py-8 border-t" data-section="challenge">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  the challenge: navigating the perils of practice transition
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>When we first met Dr. Wong, the stakes were clear. Practice transitions fail for predictable reasons:</p>

                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">patient attrition risk</h3>
                      <p className="text-neutral-600">
                        Studies show that dental practices can lose 10-30% of patients during ownership transitions. 
                        In Palo Alto's competitive market, where patients have numerous high-quality options, this risk 
                        was even higher.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">digital invisibility</h3>
                      <p className="text-neutral-600">
                        The existing practice had minimal online presence. No modern website, no search visibility, 
                        and no systematic approach to online reviews. In an era where 97% of consumers search online 
                        for local businesses, this was a critical gap.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">trust transfer complexity</h3>
                      <p className="text-neutral-600">
                        Dr. Hamamoto had built relationships over decades. How could Dr. Wong quickly establish 
                        similar trust without years of personal interaction? Traditional methods like mailers and 
                        brief introductions weren't enough.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">growth imperative</h3>
                      <p className="text-neutral-600">
                        Beyond retention, Dr. Wong needed to attract new patients to grow the practice. But how 
                        could he compete with established practices that dominated local search results and had 
                        hundreds of reviews?
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Solution Phase 1 */}
              <section className="py-8 border-t" data-section="phase1">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  phase 1: engineering a flawless transition
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>
                    We began work six months before the transition, implementing a comprehensive strategy to ensure 
                    zero patient loss:
                  </p>

                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">humanizing the transition through video</h3>
                      <p className="text-neutral-600">
                        We produced a warm, professionally-shot video introducing Dr. Wong to existing patients. 
                        This wasn't a corporate announcement—it was a conversation. Patients learned about his 
                        background at UCSF, his gentle approach to dentistry, and even personal touches like his 
                        passion for cars and basketball. The video received over 2,000 views from existing patients 
                        before their first appointment with the new doctor.
                      </p>
                      <div className="mt-4">
                        <YouTubeVideoEmbed
                          videoId="HrksJeYb02Q"
                          title="Dr. Christopher Wong — Patient Introduction"
                          className="rounded-lg overflow-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">building a digital bridge</h3>
                      <p className="text-neutral-600">
                        We created a modern, mobile-first website that served as a transition hub. It featured both 
                        doctors prominently, celebrated Dr. Hamamoto's legacy while introducing Dr. Wong's vision. 
                        The site included detailed FAQs about the transition, insurance continuity, and what patients 
                        could expect. This transparency built confidence during an uncertain time.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">proactive communication strategy</h3>
                      <p className="text-neutral-600">
                        Instead of a single announcement letter, we orchestrated a multi-touch campaign. Email sequences, 
                        website banners, and even QR codes in the office directed patients to learn more about Dr. Wong. 
                        Every touchpoint reinforced continuity of care and excitement for the future.
                      </p>
                    </div>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-md border border-neutral-100">
                    <p className="font-bold lowercase">phase 1 result:</p>
                    <p className="text-neutral-600">
                      100% patient retention achieved. Not a single patient was lost during the transition—an 
                      exceptional outcome that set the foundation for growth.
                    </p>
                  </div>
                </div>
              </section>

              {/* Solution Phase 2 */}
              <section className="py-8 border-t" data-section="phase2">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  phase 2: accelerating growth through digital excellence
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>With the transition secured, we shifted focus to aggressive growth:</p>

                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">search engine domination</h3>
                      <p className="text-neutral-600">
                        We rebuilt the website with advanced SEO architecture, targeting high-intent keywords like 
                        "dentist palo alto" and specific procedures. Within 6 months, the practice achieved first-page 
                        rankings for 47 key search terms. As shown in our metrics above, organic search now drives 
                        1,400 sessions monthly—our #1 traffic source.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">conversion rate optimization</h3>
                      <p className="text-neutral-600">
                        We implemented advanced analytics to track every patient journey from first click to booked 
                        appointment. A/B testing on landing pages, streamlined booking flows, and strategic call-to-actions 
                        increased conversion rates by 240%. The site now converts visitors to appointments at industry-leading rates.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">reputation management system</h3>
                      <p className="text-neutral-600">
                        We built automated systems to capture patient feedback at optimal moments, resulting in a 
                        steady stream of 5-star reviews. Dr. Wong's Google Business Profile grew from 0 to 150+ reviews 
                        with a 4.9-star average, making him one of the highest-rated dentists in Palo Alto.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">precision advertising campaigns</h3>
                      <p className="text-neutral-600">
                        Using the data insights from our analytics, we launched highly targeted Google Ads campaigns. 
                        By focusing on specific demographics, insurance types, and procedure interests, we achieved 
                        a 5:1 return on ad spend. Every dollar invested brought $5 in patient lifetime value.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Partnership Section */}
              <section className="py-8 border-t" data-section="partnership">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  why the partnership thrives: trust, expertise, and results
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>Our success with Dr. Wong goes beyond tactics—it's about aligned values and mutual trust:</p>

                  <div className="grid gap-4 md:grid-cols-2 my-6">
                    <div className="border p-4 rounded-md">
                      <h3 className="font-medium mb-2 lowercase">clinical excellence meets digital innovation</h3>
                      <p className="text-neutral-600 text-sm">
                        Dr. Wong focuses on providing exceptional patient care while we handle the complexities of 
                        digital marketing. This allows him to do what he does best—transform smiles—while we ensure 
                        a steady stream of new patients discover his practice.
                      </p>
                    </div>

                    <div className="border p-4 rounded-md">
                      <h3 className="font-medium mb-2 lowercase">data-driven decision making</h3>
                      <p className="text-neutral-600 text-sm">
                        Every strategy is backed by data. We provide Dr. Wong with clear metrics and ROI calculations, 
                        ensuring complete transparency. Our monthly reports show exactly how marketing investments 
                        translate to new patients and practice growth.
                      </p>
                    </div>

                    <div className="border p-4 rounded-md">
                      <h3 className="font-medium mb-2 lowercase">continuous optimization</h3>
                      <p className="text-neutral-600 text-sm">
                        The dental market evolves rapidly. We constantly test new strategies, from emerging platforms 
                        to AI-powered tools, keeping Dr. Wong ahead of competitors. What worked yesterday might not 
                        work tomorrow—we ensure he's always ahead of the curve.
                      </p>
                    </div>

                    <div className="border p-4 rounded-md">
                      <h3 className="font-medium mb-2 lowercase">long-term vision</h3>
                      <p className="text-neutral-600 text-sm">
                        This isn't about quick wins. We're building a sustainable growth engine that will serve 
                        Dr. Wong's practice for years to come. Every decision considers both immediate impact and 
                        long-term brand building.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Results Deep Dive Section */}
              <section className="py-8 border-t" data-section="results">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  deep dive: understanding the growth engine
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>
                    Let's examine the data more closely to understand how we've transformed Dr. Wong's practice into 
                    a digital powerhouse:
                  </p>

                  <h4 className="font-medium lowercase !mt-6 !mb-2">traffic composition analysis</h4>
                  <p>
                    The practice now attracts visitors through four main channels, creating a diversified and resilient 
                    growth strategy:
                  </p>

                  <div className="grid gap-4 md:grid-cols-2 my-6">
                    <div className="bg-neutral-50 p-4 rounded-md">
                      <h5 className="font-medium text-sm mb-2">organic search (1,400 sessions)</h5>
                      <p className="text-xs text-neutral-600">
                        Our SEO strategy delivers patients actively searching for dental care. These high-intent 
                        visitors convert at 3x the rate of other channels.
                      </p>
                    </div>
                    <div className="bg-neutral-50 p-4 rounded-md">
                      <h5 className="font-medium text-sm mb-2">direct traffic (1,300 sessions)</h5>
                      <p className="text-xs text-neutral-600">
                        Strong brand recognition means patients bypass Google entirely, typing the website directly. 
                        This indicates powerful word-of-mouth and repeat visitors.
                      </p>
                    </div>
                    <div className="bg-neutral-50 p-4 rounded-md">
                      <h5 className="font-medium text-sm mb-2">referral traffic (733 sessions)</h5>
                      <p className="text-xs text-neutral-600">
                        Strategic partnerships with local businesses and healthcare providers drive qualified referrals, 
                        expanding the practice's reach.
                      </p>
                    </div>
                    <div className="bg-neutral-50 p-4 rounded-md">
                      <h5 className="font-medium text-sm mb-2">paid search (694 sessions)</h5>
                      <p className="text-xs text-neutral-600">
                        Targeted ads capture patients at decision moments, with campaigns optimized for specific 
                        procedures and insurance types.
                      </p>
                    </div>
                  </div>

                  <h4 className="font-medium lowercase !mt-6 !mb-2">user behavior insights</h4>
                  <p>
                    The 97% new user rate isn't just a vanity metric—it represents the practice's expanding reach into 
                    previously untapped patient populations. These aren't random visitors; they're qualified prospects 
                    who match Dr. Wong's ideal patient profile.
                  </p>

                  <h4 className="font-medium lowercase !mt-6 !mb-2">conversion optimization results</h4>
                  <p>
                    Through systematic testing and optimization, we've achieved:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                    <li>Average session duration increased by 156%</li>
                    <li>Bounce rate reduced by 67%</li>
                    <li>Mobile conversion rate improved by 312%</li>
                    <li>Online appointment bookings up 425%</li>
                  </ul>

                  <h4 className="font-medium lowercase !mt-6 !mb-2">competitive market position</h4>
                  <p>
                    In Palo Alto's saturated dental market, Dr. Wong has achieved remarkable differentiation:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                    <li>Ranks #1 for "dentist palo alto" (beating practices established for 20+ years)</li>
                    <li>Highest review rating among top 10 competitors</li>
                    <li>Only practice with consistent 5-star reviews in past 6 months</li>
                    <li>Fastest-growing practice by new patient acquisition in zip code 94301</li>
                  </ul>
                </div>
              </section>

              {/* CTA Section */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">
                    ready to transform your practice?
                  </h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">
                    Dr. Wong's success isn't unique—it's repeatable. Whether you're managing a practice transition, 
                    struggling with patient acquisition, or simply ready to modernize your digital presence, we have 
                    the proven strategies to deliver results.
                  </p>
                <div className="pt-6">
                  <Link href="/get-started">
                    <Button
                      className="rounded-full px-8 py-6 text-lg lowercase"
                      onClick={() => trackCTAClick(FREE_AUDIT_CTA_TEXT, "case study bottom")}
                    >
                      {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  </div>
                </div>
              </section>

              {/* Navigation Section */}
              <div className="flex justify-between py-8">
                <Link href="/case-studies">
                  <Button variant="outline" className="rounded-full lowercase">
                    <ArrowLeft className="mr-2 h-4 w-4" /> all case studies
                  </Button>
                </Link>
                <Link href="/get-started">
                  <Button variant="outline" className="rounded-full lowercase">
                    {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CaseStudySchema
        title="powering a seamless transition for dr. christopher wong"
        description="how we helped a palo alto dental practice achieve 100% patient retention and exponential growth through a multi-phase digital strategy."
        url="https://design-prism.com/case-studies/dr-christopher-wong"
        imageUrl="https://design-prism.com/dr-wong-polaroids.png"
        datePublished="2025-01-15T00:00:00.000Z"
        dateModified="2025-01-15T00:00:00.000Z"
        clientName="Dr. Christopher B. Wong"
        outcome="achieved 100% patient retention and sustained growth"
      />
      <div className="mt-12">
        <SocialShare
          url="https://design-prism.com/case-studies/dr-christopher-wong"
          imageUrl="https://design-prism.com/dr-wong-polaroids.png"
          title="Dr. Christopher Wong Case Study"
          description="See how we helped Dr. Wong's dental practice attract more patients."
        />
      </div>
    </div>
  )
}
