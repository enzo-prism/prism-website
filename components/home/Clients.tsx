import ClientsRail from "@/components/home/ClientsRail"

export default function ClientsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12 space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
            real businesses. real results.
          </h2>
          <p className="text-balance text-sm text-neutral-600 lowercase sm:text-base">
            we work with busy owners who want growth... without becoming a part-time marketer.
          </p>
        </div>

        <ClientsRail />
      </div>
    </section>
  )
}
