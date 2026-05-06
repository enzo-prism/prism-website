import { HOMEPAGE_STATS } from '@/components/home/homepage-content'

export default function HomeStatsBar() {
  return (
    <section className="border-y border-black/8 bg-[#f7f7f4]">
      <div className="mx-auto grid max-w-7xl gap-px sm:grid-cols-2 lg:grid-cols-4">
        {HOMEPAGE_STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center bg-[#fdfcf9] px-6 py-9 text-center"
          >
            <p className="text-4xl font-semibold tracking-[-0.06em] text-[#0a0a0b]">
              {stat.value}
            </p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[rgba(15,23,42,0.38)] font-mono">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
