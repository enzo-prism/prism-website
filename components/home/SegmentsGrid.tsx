"use client"

type Segment = { emoji: string; title: string; subtitle?: string }

const segments: Segment[] = [
  { emoji: "🦷", title: "dental", subtitle: "cosmetic, restorative, general, family" },
  { emoji: "🥗", title: "online nutrition studies community" },
  { emoji: "🎿", title: "ski shop" },
  { emoji: "🤝", title: "nonprofit" },
  { emoji: "🎓", title: "alumni association" },
  { emoji: "🧭", title: "leadership consulting company" },
]

export default function SegmentsGrid() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">market segments we support</h2>
          <p className="mt-2 text-neutral-600 lowercase">we drive results across many industries</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {segments.map((s, idx) => (
            <div key={idx} className="group flex flex-col items-center text-center bg-white border border-neutral-200 rounded-xl p-4 hover:shadow-sm transition-all">
              <div className="text-3xl md:text-4xl mb-2">{s.emoji}</div>
              <div className="text-sm font-medium lowercase text-neutral-900">{s.title}</div>
              {s.subtitle ? (
                <div className="text-xs text-neutral-500 lowercase mt-1">{s.subtitle}</div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

