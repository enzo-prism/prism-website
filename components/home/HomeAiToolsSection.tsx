import {
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionCompactClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { HOMEPAGE_AI_TOOLS } from '@/components/home/homepage-content'

export default function HomeAiToolsSection() {
  return (
    <section id="ai-tools" className={coreRouteSectionCompactClassName}>
      <div className={coreRouteContainerClassName}>
        <div className="grid gap-10 border-y border-white/10 py-10 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:items-center lg:py-12">
          <CoreSectionHeading
            eyebrow={HOMEPAGE_AI_TOOLS.eyebrow}
            title={HOMEPAGE_AI_TOOLS.title}
            description={HOMEPAGE_AI_TOOLS.description}
            titleClassName="max-w-[13ch] lg:max-w-[15ch]"
            descriptionClassName="max-w-[33rem] text-[1rem] leading-7 sm:text-[1.08rem] sm:leading-8"
          />

          <div className="overflow-hidden rounded-lg border border-white/12 bg-white/10">
            <div className="grid grid-cols-2 gap-px sm:grid-cols-3">
              {HOMEPAGE_AI_TOOLS.tools.map((tool) => (
                <article
                  key={tool.name}
                  data-testid="home-ai-tool-card"
                  aria-label={`${tool.name}: ${tool.description}`}
                  className="flex min-h-[10.5rem] min-w-0 flex-col justify-between bg-[#050505] p-4 sm:min-h-[11.5rem] sm:p-5 lg:p-6"
                >
                  <div className="flex min-h-12 items-center">
                    <img
                      src={tool.logoSrc}
                      alt={tool.logoAlt}
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      className={
                        tool.logoClassName ??
                        'h-9 w-auto max-w-[11rem] object-contain'
                      }
                    />
                  </div>

                  <div className="min-w-0 space-y-2">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d8bc79]/80">
                      {tool.role}
                    </p>
                    <h3 className="truncate font-sans text-[1.12rem] font-medium leading-tight text-[#f5f0e8] sm:text-[1.2rem]">
                      {tool.name}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
