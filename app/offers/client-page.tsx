"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import CoreImage from "@/components/core-image"
import { ArrowRight } from "lucide-react"

interface Offer {
  id: string
  title: string
  description: string
  imageUrl: string
  imageAlt: string
  link: string
  ctaText: string
}

const offersData: Offer[] = [
  {
    id: "summer-website-makeover",
    title: "☀️ summer website makeover",
    description:
      "triple your traffic & conversions in 30 days with our all-inclusive website rebuild package. full-stack site, seo, conversion boosters, and a 30-day 3x guarantee!",
    imageUrl: "/offers/summer-makeover-card-v2.png",
    imageAlt: "Stylized graphic showing website analytics, bounce rate, and a conversion rate funnel.",
    link: "/offers/summer-website-makeover",
    ctaText: "view makeover details",
  },
]

export default function OffersClientPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Updated Hero Section */}
      <section className="container mx-auto px-4 pt-12 pb-8 md:pt-20 md:pb-12 text-center">
        <div className="text-5xl sm:text-6xl md:text-7xl mb-4" role="img" aria-label="Gift emoji">
          🎁
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">current offers</h1>
        <p className="mt-3 sm:mt-4 text-md sm:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto">
          take advantage of these special promotions to elevate your digital presence with prism.
        </p>
      </section>

      {/* Offers Grid Section */}
      <section className="container mx-auto px-4 pb-12 md:pb-20">
        {offersData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-sm mx-auto md:max-w-4xl">
            {/* 
              Adjusted max-w for single column on mobile: max-w-sm. 
              For md and up, it uses the existing max-w-4xl for the grid container.
              If there's only one offer, it will be centered and not overly wide on mobile.
            */}
            {offersData.map((offer) => (
              <Card
                key={offer.id}
                className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full"
              >
                <CardHeader className="p-0">
                  <div className="aspect-[16/9] w-full">
                    <CoreImage
                      src={offer.imageUrl}
                      alt={offer.imageAlt}
                      width={600}
                      height={338} // Adjusted height for 16:9 based on 600 width
                      className="object-cover w-full h-full"
                      fallbackSrc="/placeholder.svg?width=600&height=338"
                      trackingId={`offer_image_${offer.id}`}
                      priority={true} // Consider adding priority for LCP images
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6 flex-grow">
                  <CardTitle className="text-lg md:text-xl font-semibold mb-2">{offer.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground line-clamp-3 md:line-clamp-none">
                    {/* line-clamp-3 for mobile to prevent overly tall cards, remove for md+ */}
                    {offer.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-4 md:p-6 bg-muted/50">
                  <Link href={offer.link} passHref legacyBehavior>
                    <Button variant="default" className="w-full text-base py-2.5 md:py-3">
                      {offer.ctaText}
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">no current offers</h2>
            <p className="text-muted-foreground">please check back soon for exciting new promotions!</p>
          </div>
        )}
      </section>

      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">ready to get started?</h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-xl mx-auto">
            have questions about our offers or want to discuss a custom project? we're here to help.
          </p>
          <Link href="/contact" passHref legacyBehavior>
            <Button size="lg" variant="default" className="text-base md:text-lg">
              contact us today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
