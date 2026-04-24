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
        <div className="grid gap-8 border-y border-white/10 py-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,1.42fr)] lg:items-center lg:py-12">
          <CoreSectionHeading
            title={HOMEPAGE_AI_TOOLS.title}
            titleClassName="max-w-[12ch] lg:max-w-[13ch]"
            className="gap-0"
          />

          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
            {HOMEPAGE_AI_TOOLS.tools.map((tool) => (
              <li
                key={tool.name}
                data-testid="home-ai-tool-card"
                className="flex min-h-24 min-w-0 flex-col items-center justify-center gap-3 bg-black px-3 py-5 text-center sm:min-h-28"
              >
                <img
                  src={tool.logoSrc}
                  alt={tool.logoAlt}
                  width={44}
                  height={44}
                  loading="lazy"
                  decoding="async"
                  className="h-9 w-9 object-contain"
                />
                <h3
                  className="max-w-full text-balance font-sans text-[0.88rem] font-medium leading-tight text-[#f5f0e8] sm:text-sm"
                >
                  {tool.name}
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
