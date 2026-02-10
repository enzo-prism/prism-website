import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTimelineButton from "@/components/about/ScrollToTimelineButton"
import { BreadcrumbSchema, PersonSchema } from "@/components/schema-markup"
import ScrollingTimeline from "@/components/scrolling-timeline"
import PoleVaultCarousel from "@/components/pole-vault-carousel"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { OLYMPIC_LOGO_ASSETS } from "@/lib/logo-assets"

export default function AboutClientPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="relative inline-flex items-center justify-center group hardware-hover touch-feedback">
                <span className="pointer-events-none absolute inset-0 scale-110 rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 opacity-0 blur-md transition duration-300 group-hover:opacity-70" />
                <div className="relative h-28 w-28 overflow-hidden rounded-md border border-border/60 bg-card/20 shadow-none transition">
                  <Image
                    src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765426902/Enzo_s_Headshot_xg546f.webp"
                    alt="Enzo Sison headshot"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">
                enzo sison · founder, prism
              </p>
              <Badge variant="secondary" className="w-fit">founded in 2023</Badge>
              <div className="space-y-3">
                <h1 className="text-5xl font-semibold sm:text-6xl lg:text-7xl">our story</h1>
                <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                  enzo sison built prism to pursue his passions for tech, business, and athletics at the highest level — and to connect with others chasing excellence in their own fields.
                </p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <ScrollToTimelineButton />
                  <Button asChild variant="outline" size="lg" className="rounded-md px-6">
                    <Link href="https://enzosison.com" target="_blank" rel="noopener noreferrer">
                      enzosison.com <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LA 2028 Olympic Journey (moved below the single video section) */}
        <section className="border-t border-border/60 bg-card/15 px-4 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-8 md:mb-10 space-y-3">
              <div className="flex justify-center" aria-hidden>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 120 60"
                  className="h-10 w-20"
                  role="presentation"
                >
                  <circle cx="20" cy="30" r="12" stroke="#0072CE" strokeWidth="4" fill="none" />
                  <circle cx="50" cy="30" r="12" stroke="#FFFFFF" strokeWidth="4" fill="none" />
                  <circle cx="80" cy="30" r="12" stroke="#FECB00" strokeWidth="4" fill="none" />
                  <circle cx="35" cy="42" r="12" stroke="#00A651" strokeWidth="4" fill="none" />
                  <circle cx="65" cy="42" r="12" stroke="#E4262C" strokeWidth="4" fill="none" />
                </svg>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">LA 2028</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">olympic journey</h2>
              <p className="mx-auto mt-3 max-w-[720px] text-muted-foreground md:text-lg">
                enzo is pursuing competing in the la 2028 olympics for the philippines in pole vaulting—a journey that
                started in high school, continued through ncaa d1 at cal poly, and now continues on the international stage.
              </p>
            </div>

            {/* Minimal carousel of training/competition clips */}
            <div className="flex justify-center">
              <PoleVaultCarousel />
            </div>
          </div>
        </section>



        <section className="border-t border-border/60 bg-background px-4 py-12 md:py-16">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <div className="text-center mb-8 space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">official marks</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">logos from Enzo's competition ecosystem</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">We reviewed your Cloudinary collection and integrated the strongest logo assets directly into the About experience for added trust and context.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {OLYMPIC_LOGO_ASSETS.map((logo) => (
                <div
                  key={logo.name}
                  className="flex min-h-28 items-center justify-center rounded-xl border border-border/60 bg-card/40 p-4"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={220}
                    height={160}
                    className="h-auto max-h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">timeline</p>
              <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">our journey</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
                scroll down to explore the key milestones in our story
              </p>
            </div>

            <ScrollingTimeline />

            {/* Add a "View more" button */}
            <div className="mt-12 text-center">
              <Button asChild size="lg" className="rounded-md px-6">
                <Link href="/get-started">
                  get started <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.design-prism.com" },
          { name: "About", url: "https://www.design-prism.com/about" },
        ]}
      />
      {/* Person Schema for Enzo */}
      <PersonSchema
        personId="enzo-sison"
        name="Enzo Sison"
        jobTitle="Founder & CEO"
        description="Founder of Prism Agency, helping businesses create digital experiences that drive real results"
        image="https://www.design-prism.com/enzo-avatar.png"
        url="https://www.design-prism.com/about"
        sameAs={[
          "https://x.com/NosisTheGod",
          "https://www.linkedin.com/in/enzo-sison",
          "https://www.instagram.com/the_design_prism/"
        ]}
      />
    </div>
  )
}
