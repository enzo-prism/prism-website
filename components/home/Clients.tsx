import ClientsRail from "@/components/home/ClientsRail"
import Link from "next/link"

export default function ClientsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">our clients</h2>
        </div>

        <ClientsRail />
      </div>
    </section>
  )
}
