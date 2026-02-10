import type { Metadata } from "next"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { ItemListSchema } from "@/components/schema-markup"
import { Badge } from "@/components/ui/badge"
import SoftwareAppCards from "@/components/software/SoftwareAppCards"
import { PRISM_APPS } from "@/lib/software-apps"

export const metadata: Metadata = {
  title: {
    absolute: "prism | software tools to help you grow",
  },
  description:
    "Free software built by Prism to increase leads, conversions, and customer lifetime value. Explore Density and Hot Content.",
  openGraph: {
    title: "prism | software tools to help you grow",
    description:
      "Free software built by Prism to increase leads, conversions, and customer lifetime value. Explore Density and Hot Content.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://www.design-prism.com/software",
  },
}

export default function SoftwarePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden py-16 sm:py-24 bg-background">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-muted/50 via-background to-background" />
          <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="container relative mx-auto px-4 sm:px-6">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
              <Badge variant="secondary" className="w-fit">
                Apps developed by Prism
              </Badge>
              <h1 className="text-balance text-5xl font-semibold text-foreground sm:text-6xl lg:text-7xl">
                Tools to Help You Grow
              </h1>
              <p className="text-balance text-lg text-muted-foreground">
                Free software to help you increase leads, conversions, and customer LTV
              </p>
            </div>
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
