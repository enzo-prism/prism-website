"use client"

import Link from "next/link"
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import { trackCTAClick } from "@/utils/analytics"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function ExquisiteDentistryCaseStudy() {
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
      <PageViewTracker title="Exquisite Dentistry Case Study" />
      <Navbar />
      <main className="flex-1 bg-white">
        {/* Minimal Hero Section with Featured Image */}
        <section className="border-b px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 bg-neutral-100 rounded-full text-sm lowercase">case study</div>
              <h1 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                aligning digital excellence with luxury care
              </h1>
              <p className="text-xl text-neutral-600 lowercase">
                how we elevated beverly hills' exquisite dentistry's online presence to match their premium in-person
                experience
              </p>
            </div>

            {/* Featured Image with Luxury Styling */}
            <div className="mt-10 mb-6 relative">
              <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 p-4 sm:p-6 rounded-lg shadow-sm">
                <div className="flex justify-center">
                  <div
                    className={`max-w-full overflow-hidden rounded-lg shadow-md transition-all duration-700 ${
                      imageLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <Image
                      src="/exquisite-dentistry-consultation.png"
                      alt="Exquisite Dentistry consultation with patient in Beverly Hills"
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
                  the personalized care experience that defines exquisite dentistry's approach in beverly hills
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
                onClick={() => scrollToSection("opportunity")}
                className={`whitespace-nowrap ${activeSection === "opportunity" ? "font-medium text-black" : "text-neutral-500"}`}
              >
                The Opportunity
              </button>
              <button
                onClick={() => scrollToSection("approach")}
                className={`whitespace-nowrap ${activeSection === "approach" ? "font-medium text-black" : "text-neutral-500"}`}
              >
                Our Approach
              </button>
              <button
                onClick={() => scrollToSection("transformation")}
                className={`whitespace-nowrap ${activeSection === "transformation" ? "font-medium text-black" : "text-neutral-500"}`}
              >
                Transformation
              </button>
              <button
                onClick={() => scrollToSection("partnership")}
                className={`whitespace-nowrap ${activeSection === "partnership" ? "font-medium text-black" : "text-neutral-500"}`}
              >
                Partnership
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
                    onClick={() => scrollToSection("opportunity")}
                    className={`flex items-center ${activeSection === "opportunity" ? "font-medium text-black" : "text-neutral-500"}`}
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    The Opportunity
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("approach")}
                    className={`flex items-center ${activeSection === "approach" ? "font-medium text-black" : "text-neutral-500"}`}
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Our Approach
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("transformation")}
                    className={`flex items-center ${activeSection === "transformation" ? "font-medium text-black" : "text-neutral-500"}`}
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Transformation
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
              </ul>
            </div>

            {/* Main Content */}
            <div className="col-span-1 lg:col-span-4">
              {/* Key Stats - Minimal Design */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 text-center border-t pt-8">
                <div className="border p-4 rounded-md">
                  <div className="text-2xl font-bold mb-1 lowercase">beverly hills</div>
                  <div className="text-sm text-neutral-600 lowercase">luxury dental market</div>
                </div>
                <div className="border p-4 rounded-md">
                  <div className="text-2xl font-bold mb-1 lowercase">high-end</div>
                  <div className="text-sm text-neutral-600 lowercase">aesthetic dentistry</div>
                </div>
                <div className="border p-4 rounded-md">
                  <div className="text-2xl font-bold mb-1 lowercase">complete</div>
                  <div className="text-sm text-neutral-600 lowercase">digital overhaul</div>
                </div>
                <div className="border p-4 rounded-md">
                  <div className="text-2xl font-bold mb-1 lowercase">ai-ready</div>
                  <div className="text-sm text-neutral-600 lowercase">future-focused</div>
                </div>
              </div>

              {/* Overview Section */}
              <section className="py-8 border-t" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  exquisite dentistry: a benchmark in luxury dental care
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>
                    Nestled in the heart of Beverly Hills, Exquisite Dentistry isn't just a dental practice; it's a
                    destination. Known for its spa-like atmosphere, high-end aesthetic treatments like veneers, and a
                    clientele that includes high-profile personalities and celebrities, they had already mastered the
                    art of exceptional in-person patient experiences (as shown in the image above). They came to Prism
                    with a wealth of "ammunition": stunning professional photography, compelling patient testimonial
                    videos, and a strong base of glowing online reviews.
                  </p>
                  <p>
                    Unlike businesses navigating ownership transitions, Exquisite Dentistry was firmly established.
                    Their challenge was different: ensuring their digital "front door" conveyed the same level of luxury
                    and seamlessness that patients experienced once inside.
                  </p>
                </div>
              </section>

              {/* The Opportunity Section */}
              <section className="py-8 border-t" data-section="opportunity">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  the opportunity: bridging the digital-physical divide
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>Even with a strong reputation, there was a disconnect:</p>

                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">outdated digital first impression</h3>
                      <p className="text-neutral-600">
                        Their existing website, especially on mobile devices, felt outdated. In a world where users are
                        accustomed to the sleek design of apps like Instagram or the seamless functionality of Amazon, a
                        clunky online experience can be jarring and erode trust, no matter how excellent the offline
                        service.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">brand incongruence</h3>
                      <p className="text-neutral-600">
                        The digital touchpoints didn't fully reflect the high-end, meticulously curated experience
                        Exquisite Dentistry is known for. For a luxury brand, every interaction matters.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">optimizing online visibility</h3>
                      <p className="text-neutral-600">
                        While they had good reviews, ensuring their local listing information was consistent and
                        optimized was key for how search engines like Google understood and presented their business to
                        potential patients.
                      </p>
                    </div>
                  </div>

                  <p>
                    Exquisite Dentistry recognized this and was eager to partner with Prism to elevate their online
                    presence to match their established excellence.
                  </p>
                </div>
              </section>

              {/* Prism's Approach Section */}
              <section className="py-8 border-t" data-section="approach">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  prism's approach: crafting a cohesive, high-end digital ecosystem
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>
                    Our strategy focused on creating a digital experience as refined and patient-centric as their
                    in-office care:
                  </p>

                  <div className="pl-4 border-l-2 border-neutral-200 my-6 space-y-6">
                    <div>
                      <h3 className="font-medium lowercase">bespoke website reconstruction</h3>
                      <p className="text-neutral-600">
                        This was more than a facelift. We rebuilt their website from the ground up, using modern design
                        principles that Prism deeply studies.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">user experience (UX) first</h3>
                      <p className="text-neutral-600">
                        We prioritized a seamless, intuitive experience, especially on mobile devices.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">leveraging assets</h3>
                      <p className="text-neutral-600">
                        We beautifully integrated their existing high-quality photos and videos to showcase their work
                        and atmosphere.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">custom development</h3>
                      <p className="text-neutral-600">
                        The site was custom-coded to ensure unique branding and optimal performance.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">polishing the online presence</h3>
                      <p className="text-neutral-600">
                        We conducted a thorough audit of their online listings across various directories, ensuring
                        accuracy and consistency. This foundational work helps Google and other platforms better
                        understand and serve their business to relevant searchers.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">targeted social media campaigns</h3>
                      <p className="text-neutral-600">
                        We designed and launched sophisticated ad campaigns for platforms like Instagram. Using a mix of
                        their provided media (which we often remixed or enhanced with additional design and video
                        editing), we drove highly qualified leads to their new, compelling website, primed for
                        conversion into appointments.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">seamless systems integration</h3>
                      <p className="text-neutral-600">
                        A beautiful website also needs to function flawlessly behind the scenes. We worked on
                        integrating their existing patient management and online scheduling systems with the new website
                        and other online platforms, creating a smooth operational flow.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium lowercase">embracing the future with AI</h3>
                      <p className="text-neutral-600">
                        Technology is always evolving. We've begun leveraging AI to enhance various processes and are
                        actively exploring opportunities with Exquisite Dentistry to use AI strategically for continued
                        growth and an even more personalized patient experience.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Transformation Section */}
              <section className="py-8 border-t" data-section="transformation">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">
                  the transformation: where digital meets distinction
                </h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <p>The collaboration has been incredibly successful:</p>

                  <div className="grid gap-4 md:grid-cols-2 my-6">
                    <div className="border p-4 rounded-md">
                      <h3 className="font-medium mb-2 lowercase">brand cohesion</h3>
                      <p className="text-neutral-600 text-sm">
                        Exquisite Dentistry now boasts an online presence that authentically reflects their luxury brand
                        and the quality of their services. The "jarring" disconnect is gone.
                      </p>
                    </div>

                    <div className="border p-4 rounded-md">
                      <h3 className="font-medium mb-2 lowercase">elevated patient journey</h3>
                      <p className="text-neutral-600 text-sm">
                        From the first click to scheduling an appointment, the online experience is smooth, intuitive,
                        and reassuring.
                      </p>
                    </div>

                    <div className="border p-4 rounded-md">
                      <h3 className="font-medium mb-2 lowercase">increased engagement & lead quality</h3>
                      <p className="text-neutral-600 text-sm">
                        The new website and targeted ads are effectively attracting and converting their ideal,
                        high-value patients.
                      </p>
                    </div>

                    <div className="border p-4 rounded-md">
                      <h3 className="font-medium mb-2 lowercase">future-ready foundation</h3>
                      <p className="text-neutral-600 text-sm">
                        With integrated systems and an eye towards AI, Exquisite Dentistry is well-positioned for
                        continued success in a dynamic digital landscape.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Partnership Section */}
              <section className="py-8 border-t" data-section="partnership">
                <h2 className="text-2xl font-bold tracking-tighter lowercase mb-6">why this partnership shines</h2>
                <div className="prose prose-neutral max-w-none space-y-4 lowercase">
                  <div className="grid gap-4 md:grid-cols-3 my-6">
                    <div className="border p-4 rounded-md text-center">
                      <h3 className="font-medium mb-2 lowercase">client vision</h3>
                      <p className="text-neutral-600 text-sm">
                        Exquisite Dentistry's commitment to excellence extended to their desire for a superior digital
                        presence.
                      </p>
                    </div>

                    <div className="border p-4 rounded-md text-center">
                      <h3 className="font-medium mb-2 lowercase">valuable assets</h3>
                      <p className="text-neutral-600 text-sm">
                        Their existing investment in high-quality media provided a fantastic springboard.
                      </p>
                    </div>

                    <div className="border p-4 rounded-md text-center">
                      <h3 className="font-medium mb-2 lowercase">prism's design & tech acumen</h3>
                      <p className="text-neutral-600 text-sm">
                        Our deep understanding of modern design, user experience, and system integration was crucial.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="py-12 border-t border-b my-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter lowercase">
                    is your established business ready for a digital elevation?
                  </h2>
                  <p className="text-neutral-600 lowercase max-w-2xl mx-auto">
                    Even successful, established businesses can find their digital presence lagging behind their
                    real-world excellence. If your online touchpoints don't truly reflect the quality and value you
                    provide, or if you're looking to leverage the latest technologies (like AI) to connect with your
                    ideal clientele more effectively, Prism can help.
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
    </div>
  )
}
