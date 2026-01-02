import type { Metadata } from "next"
import Link from "next/link"

import LordIconScript from "@/components/LordIconScript"
import Footer from "@/components/footer"
import LordIcon from "@/components/lord-icon"
import Navbar from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
      <LordIconScript />
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
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
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
            <div className="grid gap-6 md:grid-cols-2">
              {PRISM_APPS.map((app) => (
                <Card
                  key={app.title}
                  className="flex h-full flex-col border-border/60 bg-card/90 transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardHeader className="space-y-3">
                    <LordIcon
                      src={app.icon.src}
                      trigger={app.icon.trigger}
                      delay={app.icon.delay}
                      style={{ width: app.icon.size, height: app.icon.size }}
                      aria-hidden="true"
                    />
                    <CardTitle className="text-xl">{app.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {app.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                    >
                      <Link href={app.href} target="_blank" rel="noopener noreferrer">
                        {app.hrefLabel}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
