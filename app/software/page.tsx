import type { Metadata } from "next"
import AsciiHeroCard from "@/components/ascii/AsciiHeroCard"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { ItemListSchema } from "@/components/schema-markup"
import { Badge } from "@/components/ui/badge"
import SoftwareAppCards from "@/components/software/SoftwareAppCards"
import { PRISM_APPS } from "@/lib/software-apps"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "prism | software tools to help you grow",
  description: "Free software built by Prism to increase leads, conversions, and customer lifetime value. Explore Density and Hot Content.",
  path: "/software",
  ogImage: "/prism-opengraph.png",
})

export default function SoftwarePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="px-4 py-10 md:py-14">
          <div className="container mx-auto px-4 sm:px-6">
            <AsciiHeroCard
              animationName="computer"
              frameCount={78}
              fps={18}
              eyebrow="software"
              title="Tools to Help You Grow"
              description="Free software to help you increase leads, conversions, and customer LTV"
              preEyebrow={
                <Badge variant="secondary" className="w-fit">
                  Apps developed by Prism
                </Badge>
              }
              ariaLabel="Computer ASCII animation behind the Software page hero"
            />
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6">
            <SoftwareAppCards
              apps={PRISM_APPS}
              cardClassName="bg-card/35 backdrop-blur-sm"
              buttonClassName="rounded-lg"
            />
          </div>
        </section>
      </main>
      <Footer />
      <ItemListSchema
        name="Prism software tools"
        url="https://www.design-prism.com/software"
        items={PRISM_APPS.map((app) => ({
          name: app.title,
          description: app.description,
          url: app.href,
          itemType: "CreativeWork",
        }))}
      />
    </div>
  )
}
