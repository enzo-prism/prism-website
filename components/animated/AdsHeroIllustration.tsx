import { cn } from "@/lib/utils"

type AdsHeroIllustrationProps = {
  className?: string
}

const motionClass =
  "transform-gpu transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"

const ambientClass = cn(
  motionClass,
  "group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100",
)

const coreClass = cn(
  motionClass,
  "group-hover:scale-[1.08] group-hover:rotate-[24deg]",
  "group-focus-visible:scale-[1.08] group-focus-visible:rotate-[24deg]",
  "group-active:scale-100 group-active:rotate-[10deg]",
)

const trailClass = cn(
  motionClass,
  "group-hover:translate-x-2 group-focus-visible:translate-x-2 group-active:translate-x-0",
)

const signalDotClass = cn(
  motionClass,
  "group-hover:translate-x-8 group-focus-visible:translate-x-8 group-active:translate-x-0",
)

const upperSignalDotClass = cn(
  signalDotClass,
  "group-hover:-translate-y-2 group-focus-visible:-translate-y-2 group-active:translate-y-0",
)

const lowerSignalDotClass = cn(
  signalDotClass,
  "group-hover:translate-y-2 group-focus-visible:translate-y-2 group-active:translate-y-0",
)

const topChipClass = cn(
  motionClass,
  "group-hover:-translate-y-6 group-focus-visible:-translate-y-6 group-active:translate-y-0",
)

const middleChipClass = cn(
  motionClass,
  "group-hover:-translate-y-3 group-focus-visible:-translate-y-3 group-active:translate-y-0",
)

const bottomChipClass = cn(
  motionClass,
  "group-hover:-translate-y-2 group-focus-visible:-translate-y-2 group-active:translate-y-0",
)

const sparkClass = cn(
  motionClass,
  "group-hover:scale-110 group-hover:rotate-90",
  "group-focus-visible:scale-110 group-focus-visible:rotate-90",
  "group-active:scale-100 group-active:rotate-45",
)

export default function AdsHeroIllustration({ className }: AdsHeroIllustrationProps) {
      return (
    <div className={cn("h-full w-full", className)} aria-hidden="true">
      <div className={cn(motionClass, "h-full w-full group-hover:scale-[1.04] group-focus-visible:scale-[1.04]")}>
        <svg
          viewBox="0 0 240 170"
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
          focusable="false"
          className="h-full w-full overflow-visible"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g className={ambientClass} style={{ opacity: 0.42 }}>
            <circle cx="64" cy="85" r="42" fill="currentColor" stroke="none" style={{ opacity: 0.06 }} />
            <ellipse cx="181" cy="85" rx="40" ry="48" fill="currentColor" stroke="none" style={{ opacity: 0.04 }} />
          </g>

          <g className={coreClass} style={{ transformOrigin: "64px 85px", transitionDelay: "20ms" }}>
            <circle cx="64" cy="85" r="30" strokeWidth="2.25" style={{ opacity: 0.32 }} />
            <circle cx="64" cy="85" r="18" strokeWidth="2.5" style={{ opacity: 0.88 }} />
            <circle cx="64" cy="85" r="10.5" fill="currentColor" stroke="none" style={{ opacity: 0.12 }} />
            <circle cx="64" cy="85" r="6" fill="currentColor" stroke="none" style={{ opacity: 0.96 }} />
            <path
              d="M64 46v10M64 114v10M25 85h10M93 85h10M38 59l7 7M83 104l7 7"
              strokeWidth="2"
              style={{ opacity: 0.58 }}
            />
          </g>

          <g className={trailClass} style={{ transitionDelay: "60ms" }}>
            <path d="M95 72C112 61 128 56 149 57" strokeWidth="2.5" style={{ opacity: 0.88 }} />
            <path d="M95 85h56" strokeWidth="2.25" style={{ opacity: 0.58 }} />
            <path d="M95 98c17 11 33 16 54 17" strokeWidth="2.5" style={{ opacity: 0.36 }} />
          </g>

          <g className={upperSignalDotClass} style={{ transformOrigin: "111px 67px", transitionDelay: "90ms" }}>
            <circle cx="111" cy="67" r="4.5" fill="currentColor" stroke="none" style={{ opacity: 0.9 }} />
          </g>
          <g className={signalDotClass} style={{ transformOrigin: "121px 85px", transitionDelay: "120ms" }}>
            <circle cx="121" cy="85" r="4" fill="currentColor" stroke="none" style={{ opacity: 0.68 }} />
          </g>
          <g className={lowerSignalDotClass} style={{ transformOrigin: "111px 103px", transitionDelay: "150ms" }}>
            <circle cx="111" cy="103" r="3.5" fill="currentColor" stroke="none" style={{ opacity: 0.48 }} />
          </g>

          <g className={topChipClass} style={{ transitionDelay: "140ms" }}>
            <rect x="149" y="43" width="58" height="26" rx="13" fill="currentColor" style={{ opacity: 0.08 }} />
            <rect x="149" y="43" width="58" height="26" rx="13" strokeWidth="2" style={{ opacity: 0.92 }} />
            <circle cx="166" cy="56" r="4" fill="currentColor" stroke="none" style={{ opacity: 0.76 }} />
            <path d="M176 56h18" strokeWidth="2" style={{ opacity: 0.72 }} />
          </g>

          <g className={middleChipClass} style={{ transitionDelay: "180ms" }}>
            <rect x="157" y="73" width="54" height="24" rx="12" fill="currentColor" style={{ opacity: 0.06 }} />
            <rect x="157" y="73" width="54" height="24" rx="12" strokeWidth="2" style={{ opacity: 0.78 }} />
            <path d="M171 85h14" strokeWidth="2" style={{ opacity: 0.74 }} />
            <path d="M189 89l6-6 5 5" strokeWidth="2" style={{ opacity: 0.56 }} />
          </g>

          <g className={bottomChipClass} style={{ transitionDelay: "220ms" }}>
            <rect x="152" y="104" width="62" height="26" rx="13" fill="currentColor" style={{ opacity: 0.05 }} />
            <rect x="152" y="104" width="62" height="26" rx="13" strokeWidth="2" style={{ opacity: 0.66 }} />
            <circle cx="167" cy="117" r="3.5" fill="currentColor" stroke="none" style={{ opacity: 0.54 }} />
            <path d="M177 117h23M177 123h14" strokeWidth="2" style={{ opacity: 0.5 }} />
          </g>

          <g className={sparkClass} style={{ transformOrigin: "204px 34px", transitionDelay: "240ms" }}>
            <path d="M204 24v5M204 39v5M194 34h5M209 34h5M197 27l3.5 3.5M207.5 37.5l3.5 3.5" strokeWidth="2" style={{ opacity: 0.5 }} />
            <circle cx="204" cy="34" r="3.5" fill="currentColor" stroke="none" style={{ opacity: 0.32 }} />
          </g>
        </svg>
      </div>
    </div>
  )
}
