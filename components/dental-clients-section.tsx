import DentalClientCarousel from "./dental-client-carousel"

export default function DentalClientsSection() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="container mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">
            real practices live on prism
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            explore the dental brands we partner with
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            every site is tuned for patient journeys, local search, and measurable conversions. tap through a few of the
            practices we support to see their live experience.
          </p>
        </div>
        <div className="mt-10">
          <DentalClientCarousel />
        </div>
      </div>
    </section>
  )
}
