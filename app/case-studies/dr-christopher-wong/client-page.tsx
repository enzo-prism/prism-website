"use client"

import Link from "next/link"
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import { CaseStudySchema } from "@/components/schema-markup"
import { trackCTAClick } from "@/utils/analytics"
import { useState, useEffect } from "react"
import Image from "next/image"
import { DrWongGrowthChart } from "@/components/case-studies/dr-wong-growth-chart"
import { DrWongUserDemographicsChart } from "@/components/case-studies/dr-wong-user-demographics-chart" // Import the new chart
import SocialShare from "@/components/social-share"

export default function ChristopherWongCaseStudy() {
  const [activeSection, setActiveSection] = useState("")
  const [imageLoaded, setImageLoaded] = useState(false)

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
    <div className="flex min-h-screen flex-col">
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
                how we helped a palo alto dental practice achieve 100% patient retention and sustainable growth
              </p>
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
                Results
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
                    Results
                  </button>
                </li>
              </ul>
            </div>

            {/* Main Content */}
            <div className="col-span-1 lg:col-span-4">
              {/* Key Stats - Minimal Design */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 text-center border-t pt-8">
                <div className="border p-4 rounded-md">
                  <div className="text-2xl font-bold mb-1 lowercase">100%</div>
                  <div className="text-sm text-neutral-600 lowercase">patient retention</div>
                </div>
                <div className="border p-4 rounded-md">
                  <div className="text-2xl font-bold mb-1 lowercase">palo alto</div>
                  <div className="text-sm text-neutral-600 lowercase">competitive market</div>
                </div>
                <div className="border p-4 rounded-md">
                  <div className="text-2xl font-bold mb-1 lowercase">multi-phase</div>
                  <div className="text-sm text-neutral-600 lowercase">digital strategy</div>
                </div>
                <div className="border p-4 rounded-md">
                  <div className="text-2xl font-bold mb-1 lowercase">ongoing</div>
                  <div className="text-sm text-neutral-600 lowercase">growth & optimization</div>
                </div>
              </div>

              {/* Overview Section */}
              <section className="py-8 border-t" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  meet dr. wong: a new chapter in palo alto dentistry
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>
                    When Dr. Christopher B. Wong (pictured in the Polaroids above) prepared to take over an established
                    dental practice in Palo Alto from the retiring Dr. Chris Hamamoto, he faced a common yet significant
                    hurdle. In dentistry, the relationship between a patient and their doctor is built on years of
                    trust. How could he ensure a smooth handover, reassure existing patients, and also begin to attract
                    new ones to his vision for the practice?
                  </p>
                  <p>
                    This is where Prism stepped in. Dr. Wong understood the value of a modern approach and was open to
                    innovative strategies – he was ready to let us help him shine.
                  </p>
                </div>
              </section>

              {/* The Challenge Section */}
              <section className="py-8 border-t" data-section="challenge">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  the challenge: more than just new signs on the door
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>Transitioning a business, especially one as personal as a dental practice, is delicate:</p>

                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">the trust factor</h3>
                      <p className="text-neutral-600">
                        Patients build deep loyalty. A new face can be unsettling if not handled with care, often
                        leading to patient attrition (what we call "key man risk").
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">communication gaps</h3>
                      <p className="text-neutral-600">
                        Many businesses fumble the transition announcement – a quickly forgotten letter or a brief email
                        isn't enough to make patients feel secure and informed.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">attracting new patients</h3>
                      <p className="text-neutral-600">
                        Beyond retaining the existing base, growth requires a strategy to reach new community members
                        looking for quality dental care.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">the digital landscape</h3>
                      <p className="text-neutral-600">
                        Patients today find and vet healthcare providers online. A strong, positive, and
                        easy-to-navigate digital presence isn't just nice to have; it's essential.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Solution Phase 1 */}
              <section className="py-8 border-t" data-section="phase1">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  phase 1: ensuring a seamless welcome
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>
                    We partnered with Dr. Wong before the transition was complete, allowing us to build a comprehensive
                    strategy from the ground up.
                  </p>

                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">getting to know dr. wong (digitally)</h3>
                      <p className="text-neutral-600">
                        We produced a warm, engaging "get to know you" video interview with Dr. Wong. This allowed
                        patients to meet him virtually – learn about his dental philosophy, his San Francisco education,
                        and even his hobbies like cars and basketball. This simple step helped build rapport before
                        their first appointment, making him a familiar face rather than a stranger.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">modernizing the digital front door</h3>
                      <p className="text-neutral-600">
                        We overhauled the practice website. It became mobile-friendly, easy to navigate, and a central
                        hub for information. Crucially, it clearly communicated the transition, sharing stories of both
                        Dr. Hamamoto and Dr. Wong, ensuring patients felt part of the journey.
                      </p>
                    </div>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-md border border-neutral-100">
                    <p className="font-bold lowercase">the result?</p>
                    <p className="text-neutral-600">
                      Dr. Wong retained the entire existing patient base – a remarkable achievement in any practice
                      transition.
                    </p>
                  </div>
                </div>
              </section>

              {/* Solution Phase 2 */}
              <section className="py-8 border-t" data-section="phase2">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  phase 2: building momentum and driving growth
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>With the foundation secured, we focused on expansion:</p>

                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">data is king – understanding the patient journey</h3>
                      <p className="text-neutral-600">
                        Many businesses operate without truly understanding how potential customers find them or what
                        makes them choose their services. We implemented detailed analytics and tracking. This allowed
                        us to see the entire "funnel" – from how people found the website to how they booked
                        appointments. We could identify what was working and where potential patients might be dropping
                        off.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">smart, targeted advertising</h3>
                      <p className="text-neutral-600">
                        Armed with data, we launched highly effective online advertising campaigns (like Google Ads). We
                        weren't just casting a wide net; we were targeting Dr. Wong's ideal patient – someone in the
                        local area, looking for the specific services he offers, perhaps even covered by the insurance
                        providers he accepts. This means every advertising dollar works harder, attracting "super hot,
                        warm leads" who are genuinely looking for a dentist like Dr. Wong.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">optimizing the online experience</h3>
                      <p className="text-neutral-600">
                        We continuously refine the website to improve usability and ensure content meets patient needs,
                        increasing conversions from visitor to booked appointment. We also ensure the practice
                        information is accurate and compelling across all major platforms where patients search (Google
                        Search, Google Maps, Apple Maps, and even emerging AI-driven search tools).
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">building a stellar online reputation</h3>
                      <p className="text-neutral-600">
                        Positive reviews are digital gold. We implemented simple, effective systems to encourage happy
                        patients to share their experiences online. This creates a "flywheel effect": more positive
                        reviews lead to higher trust, better visibility in search results, and ultimately, more new
                        patients choosing Dr. Wong.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Partnership Section */}
              <section className="py-8 border-t" data-section="partnership">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  the "prism & dr. wong" partnership: why it works
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>Our success with Dr. Wong isn't just about tools and techniques; it's about partnership:</p>

                  <div className="grid gap-4 md:grid-cols-2 my-6">
                    <div className="border p-4 rounded-md">
                      <h3 className="font-medium mb-2 lowercase">dr. wong focuses on excellence</h3>
                      <p className="text-neutral-600 text-sm">
                        He is an exceptional, detail-oriented dentist who genuinely cares for his patients. Once we get
                        patients in the door, his outstanding service ensures they stay – the lifetime value (LTV) of
                        his patients is incredibly high.
                      </p>
                    </div>

                    <div className="border p-4 rounded-md">
                      <h3 className="font-medium mb-2 lowercase">mutual trust & collaboration</h3>
                      <p className="text-neutral-600 text-sm">
                        Dr. Wong trusts our expertise and is open to new ideas ("he lets us cook," as we like to say!).
                        This allows us to implement cutting-edge strategies. In turn, we ensure he's informed and that
                        our efforts align with his practice goals.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Results Section */}
              <section className="py-8 border-t" data-section="results">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  the impact: a thriving practice, poised for the future
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>
                    Our partnership with Dr. Christopher B. Wong has yielded remarkable results, transforming his online
                    presence and significantly boosting patient acquisition. The data clearly illustrates the impact of
                    the rebuilt website and our strategic digital marketing efforts:
                  </p>

                  <h4 className="font-medium lowercase !mt-6 !mb-2">1. dramatic growth in attracting new patients</h4>
                  <p>
                    The new website immediately began attracting a new stream of potential patients. Recently, the site
                    attracted a strong base of <strong className="font-semibold">3,600 active users</strong>.
                    Critically, a vast majority—
                    <strong className="font-semibold">nearly 97% (3,500 users)—were new</strong>, indicating the rebuilt
                    site is effectively reaching and engaging a fresh audience. The chart below visually represents this
                    significant new user acquisition.
                  </p>
                  <div className="my-8">
                    <DrWongUserDemographicsChart />
                  </div>

                  {/* The DrWongGrowthChart can be moved or kept if desired, for now, this focuses on replacing the traffic sources chart */}
                  <h4 className="font-medium lowercase !mt-8 !mb-4">
                    visualizing overall growth: website traffic over time
                  </h4>
                  <p>
                    The line chart below illustrates the consistent upward trajectory of website sessions, particularly
                    highlighting the significant surge in traffic from April to June, reinforcing the immediate and
                    positive impact of the new website and ongoing optimization efforts.
                  </p>
                  <div className="my-8">
                    <DrWongGrowthChart />
                  </div>

                  <h4 className="font-medium lowercase !mt-6 !mb-2">2. organic search is the #1 driver of traffic</h4>
                  <p>
                    Thanks to a powerful SEO foundation, the new website has secured top visibility on search engines.
                    Organic search is the leading source of traffic, delivering{" "}
                    <strong className="font-semibold">1,400 sessions</strong>. This demonstrates that the website is
                    successfully appearing in front of potential patients who are actively using search engines like
                    Google to look for a dentist in the Palo Alto area. It is effectively connecting with local patients
                    at the exact moment they are seeking dental services, making it the practice's most powerful patient
                    acquisition tool.
                  </p>

                  <h4 className="font-medium lowercase !mt-6 !mb-2">3. a strong, diversified digital presence</h4>
                  <p>
                    The rebuilt website serves as a successful hub for all marketing efforts. Beyond search, it shows a
                    healthy and balanced mix of traffic sources. With{" "}
                    <strong className="font-semibold">1,300 direct sessions</strong>, a significant number of users are
                    navigating directly to the new site, signaling strong brand awareness. The site also attracted{" "}
                    <strong className="font-semibold">733 sessions from referrals</strong> and{" "}
                    <strong className="font-semibold">694 from paid search</strong>, creating a well-rounded strategy
                    that doesn't rely on a single channel for success. This strong performance across multiple key
                    channels proves it is a versatile and effective asset for both attracting new patients and engaging
                    the existing community.
                  </p>

                  <div className="grid gap-4 md:grid-cols-3 my-6">
                    <div className="border p-4 rounded-md text-center">
                      <h3 className="font-medium mb-2 lowercase">sustained growth</h3>
                      <p className="text-neutral-600 text-sm">
                        His practice isn't just stable; it's growing. Key metrics are consistently "up and to the
                        right."
                      </p>
                    </div>
                    <div className="border p-4 rounded-md text-center">
                      <h3 className="font-medium mb-2 lowercase">dominant online presence</h3>
                      <p className="text-neutral-600 text-sm">
                        Increased visibility and a wealth of positive reviews make his practice a top choice in Palo
                        Alto.
                      </p>
                    </div>
                    <div className="border p-4 rounded-md text-center">
                      <h3 className="font-medium mb-2 lowercase">efficient patient acquisition</h3>
                      <p className="text-neutral-600 text-sm">
                        Data-driven strategies mean marketing efforts are targeted and effective, maximizing return on
                        investment.
                      </p>
                    </div>
                  </div>

                  {/* New Key Stats Section for Traffic Data */}
                  <div className="grid gap-4 grid-cols-2 md:grid-cols-4 my-6 pt-6 border-t">
                    <div className="border p-4 rounded-md text-center">
                      <div className="text-2xl font-bold mb-1 lowercase">3,600</div>
                      <div className="text-sm text-neutral-600 lowercase">active users recently</div>
                    </div>
                    <div className="border p-4 rounded-md text-center">
                      <div className="text-2xl font-bold mb-1 lowercase">97%</div>
                      <div className="text-sm text-neutral-600 lowercase">new user acquisition</div>
                    </div>
                    <div className="border p-4 rounded-md text-center">
                      <div className="text-2xl font-bold mb-1 lowercase">1,400</div>
                      <div className="text-sm text-neutral-600 lowercase">organic search sessions</div>
                    </div>
                    <div className="border p-4 rounded-md text-center">
                      <div className="text-2xl font-bold mb-1 lowercase">top driver</div>
                      <div className="text-sm text-neutral-600 lowercase">organic search growth</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">
                    could your business benefit from a prism partnership?
                  </h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">
                    The principles we've applied to Dr. Wong's dental practice – understanding the customer journey,
                    building trust digitally, leveraging data, and creating a seamless online experience – are
                    universal.
                  </p>
                  <div className="pt-6">
                    <Link href="/get-started">
                      <Button
                        className="rounded-full px-8 py-6 text-lg lowercase"
                        onClick={() => trackCTAClick("get started", "case study bottom")}
                      >
                        get started <ArrowRight className="ml-2 h-5 w-5" />
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
                    get started <ArrowRight className="ml-2 h-4 w-4" />
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
        description="how we helped a palo alto dental practice achieve 100% patient retention and sustainable growth through a multi-phase digital strategy."
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
