"use client"

import Link from "next/link"
import ClientsRail from "@/components/home/ClientsRail"

export default function ClientsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">our clients</h2>
        </div>

        <ClientsRail />

        {/* Social proof under carousel */}
        <div className="mt-8 md:mt-10 flex flex-col items-center space-y-2 text-center">
          <Link
            href="https://www.instagram.com/the_design_prism/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 lowercase hover:text-neutral-800 hover:underline"
          >
            39k+ entrepreneurs follow us on instagram
          </Link>
          <Link
            href="https://www.youtube.com/@the_design_prism"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 lowercase hover:text-neutral-800 hover:underline"
          >
            24.5k+ subscribers on youtube
          </Link>
        </div>
      </div>
    </section>
  )
}
