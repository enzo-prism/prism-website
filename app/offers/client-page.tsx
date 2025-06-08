"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import CoreImage from "@/components/core-image" // Using your CoreImage component
import { ArrowRight } from "lucide-react"

interface Offer {
  id: string
  title: string
  description: string
  imageUrl: string
  imageAlt: string
  link: string // This will be the link to the individual offer page
  ctaText: string
}

const offersData: Offer[] = [
  {
    id: "summer-website-makeover",
    title: "☀️ Summer Website Makeover",
    description:
      "Triple your traffic & conversions in 30 days with our all-inclusive website rebuild package. Full-stack site, SEO, conversion boosters, and a 30-day 3x guarantee!",
    imageUrl: "/offers/summer-makeover-card-v2.png", // Updated image path
    imageAlt: "Stylized graphic showing website analytics, bounce rate, and a conversion rate funnel.",
    link: "/offers/summer-website-makeover",
    ctaText: "View Makeover Details",
  },
]

export default function OffersClientPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our Current <span className="text-primary">Offers</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Take advantage of these special promotions to elevate your digital presence with Prism.
          </p>
        </div>

        {offersData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offersData.map((offer) => (
              <Card
                key={offer.id}
                className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader className="p-0">
                  <div className="aspect-[16/9] w-full">
                    <CoreImage
                      src={offer.imageUrl}
                      alt={offer.imageAlt}
                      width={600}
                      height={350}
                      className="object-cover w-full h-full"
                      fallbackSrc="/placeholder.svg?width=600&height=350"
                      trackingId={`offer_image_${offer.id}`}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="text-2xl font-semibold mb-2">{offer.title}</CardTitle>
                  <CardDescription className="text-muted-foreground text-base">{offer.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-6 bg-muted/50">
                  <Link href={offer.link} passHref legacyBehavior>
                    <Button variant="default" className="w-full text-lg py-3">
                      {offer.ctaText}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No Current Offers</h2>
            <p className="text-muted-foreground">Please check back soon for exciting new promotions!</p>
          </div>
        )}
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Have questions about our offers or want to discuss a custom project? We&apos;re here to help.
          </p>
          <Link href="/contact" passHref legacyBehavior>
            <Button size="lg" variant="default">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
