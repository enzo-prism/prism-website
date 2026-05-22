type StatCard = {
  label: string
  value: string
  detail?: string
}

type CaseStudySnapshotStatsProps = {
  stats: StatCard[]
}

export default function CaseStudySnapshotStats({ stats }: CaseStudySnapshotStatsProps) {
  if (!stats || stats.length === 0) {
    return null
  }

  const gridClass =
    stats.length >= 4
      ? 'sm:grid-cols-2 md:grid-cols-4'
      : stats.length === 3
        ? 'sm:grid-cols-3'
        : 'sm:grid-cols-2'

  return (
    <section className="border-b border-border/60 px-4 py-10">
      <div className={`container mx-auto grid max-w-6xl gap-3 px-4 md:px-6 ${gridClass}`}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border/60 bg-muted/30 p-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-3 text-xl font-semibold tracking-tight">{stat.value}</p>
            {stat.detail ? (
              <p className="mt-2 text-sm leading-5 text-muted-foreground">{stat.detail}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
