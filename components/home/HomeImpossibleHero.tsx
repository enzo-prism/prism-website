import styles from '@/components/home/HomeImpossibleHero.module.css'
import { cn } from '@/lib/utils'

/**
 * Purely visual brand hero: a white beam refracting through the Prism into
 * a spectrum, with the "Impossible is temporary." tagline. Server-rendered
 * with CSS-only choreography (see the module for the timeline), so it ships
 * zero client JS. The page's document h1 stays in HomeHeroSection below.
 */

type Point = { x: number; y: number }

const SPECTRUM_COLORS = [
  '#e23b2e',
  '#ee7a22',
  '#f2c230',
  '#5fa345',
  '#3e6db5',
  '#6c4e9e',
] as const

// Scene geometry in the 1440x810 viewBox. The prism is an equilateral-ish
// triangle; the beam meets its left face, the spectrum leaves the right
// face along the EXIT_* segment and fans out to the EDGE_* screen edge.
const PRISM_POINTS = '720,250 545,560 895,560'
const BEAM_START: Point = { x: -60, y: 500 }
const BEAM_END: Point = { x: 629, y: 411 }
const EXIT_TOP: Point = { x: 786, y: 368 }
const EXIT_BOTTOM: Point = { x: 818, y: 424 }
const EDGE_TOP: Point = { x: 1500, y: 430 }
const EDGE_BOTTOM: Point = { x: 1500, y: 740 }

function lerpPoint(a: Point, b: Point, t: number): Point {
  const round = (value: number) => Math.round(value * 10) / 10
  return {
    x: round(a.x + (b.x - a.x) * t),
    y: round(a.y + (b.y - a.y) * t),
  }
}

const SPECTRUM_BANDS = SPECTRUM_COLORS.map((color, index) => {
  const startTop = lerpPoint(EXIT_TOP, EXIT_BOTTOM, index / SPECTRUM_COLORS.length)
  const startBottom = lerpPoint(
    EXIT_TOP,
    EXIT_BOTTOM,
    (index + 1) / SPECTRUM_COLORS.length,
  )
  const endTop = lerpPoint(EDGE_TOP, EDGE_BOTTOM, index / SPECTRUM_COLORS.length)
  const endBottom = lerpPoint(
    EDGE_TOP,
    EDGE_BOTTOM,
    (index + 1) / SPECTRUM_COLORS.length,
  )

  return {
    color,
    points: `${startTop.x},${startTop.y} ${startBottom.x},${startBottom.y} ${endBottom.x},${endBottom.y} ${endTop.x},${endTop.y}`,
  }
})

const SPECTRUM_CLIP_POINTS = `${EXIT_TOP.x},${EXIT_TOP.y} ${EXIT_BOTTOM.x},${EXIT_BOTTOM.y} ${EDGE_BOTTOM.x},${EDGE_BOTTOM.y} ${EDGE_TOP.x},${EDGE_TOP.y}`

export default function HomeImpossibleHero() {
  return (
    <section
      aria-label="Impossible is temporary"
      data-testid="home-impossible-hero"
      className={cn(
        'relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden border-b border-white/12 pb-16 pt-[calc(var(--prism-header-height,4.5rem)+1rem)]',
        styles.scene,
      )}
    >
      <div className="flex w-full flex-col items-center">
        <svg
          viewBox="0 0 1440 810"
          aria-hidden="true"
          focusable="false"
          className="w-[165%] max-w-none flex-none sm:max-h-[82svh] sm:w-full"
        >
          <defs>
            <filter id="impossible-blur-sm" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
            <filter id="impossible-blur-md" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4.5" />
            </filter>
            <filter id="impossible-blur-lg" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="11" />
            </filter>
            <radialGradient id="impossible-bloom-grad">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="impossible-prism-inner" cx="0.5" cy="0.62" r="0.75">
              <stop offset="0" stopColor="#9aa8b4" stopOpacity="0.16" />
              <stop offset="0.55" stopColor="#5a646e" stopOpacity="0.06" />
              <stop offset="1" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="impossible-fan-grad"
              gradientUnits="userSpaceOnUse"
              x1={BEAM_END.x}
              y1={BEAM_END.y}
              x2="806"
              y2="398"
            >
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.04" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="impossible-sheen-grad">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <clipPath id="impossible-spectrum-clip">
              <polygon points={SPECTRUM_CLIP_POINTS} />
            </clipPath>
            {/* Light dissolves into darkness before the scene edge, so the
                beam and spectrum never show a hard cut when the scene is
                letterboxed inside a wider viewport. */}
            <linearGradient
              id="impossible-edge-fade-grad"
              gradientUnits="userSpaceOnUse"
              x1="-80"
              y1="0"
              x2="1440"
              y2="0"
            >
              <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="0.145" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="0.885" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <mask
              id="impossible-edge-fade"
              maskUnits="userSpaceOnUse"
              x="-80"
              y="0"
              width="1600"
              height="810"
            >
              <rect
                x="-80"
                y="0"
                width="1600"
                height="810"
                fill="url(#impossible-edge-fade-grad)"
              />
            </mask>
          </defs>

          {/* Refracted spectrum, extending from the prism's right face. */}
          <g mask="url(#impossible-edge-fade)">
            <g className={styles.spectrum}>
              {SPECTRUM_BANDS.map((band, index) => (
                <polygon
                  key={band.color}
                  points={band.points}
                  fill={band.color}
                  className={styles.band}
                  style={{ '--band-index': index } as React.CSSProperties}
                />
              ))}
            </g>

            {/* Idle light sweep travelling along the spectrum. */}
            <g clipPath="url(#impossible-spectrum-clip)">
              <rect
                x="760"
                y="340"
                width="130"
                height="430"
                fill="url(#impossible-sheen-grad)"
                className={styles.sheen}
              />
            </g>
          </g>

          {/* Hot white core where the spectrum leaves the glass. */}
          <ellipse
            cx="802"
            cy="396"
            rx="30"
            ry="12"
            transform="rotate(60 802 396)"
            fill="#ffffff"
            filter="url(#impossible-blur-md)"
            className={styles.exitHot}
          />

          {/* Incoming white beam. */}
          <g mask="url(#impossible-edge-fade)">
            <line
              x1={BEAM_START.x}
              y1={BEAM_START.y}
              x2={BEAM_END.x}
              y2={BEAM_END.y}
              pathLength={1}
              stroke="#ffffff"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.55"
              filter="url(#impossible-blur-md)"
              className={styles.beamGlow}
            />
            <line
              x1={BEAM_START.x}
              y1={BEAM_START.y}
              x2={BEAM_END.x}
              y2={BEAM_END.y}
              pathLength={1}
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              className={styles.beamCore}
            />
          </g>

          {/* Bloom where the beam meets the glass. */}
          <circle
            cx={BEAM_END.x}
            cy={BEAM_END.y}
            r="30"
            fill="url(#impossible-bloom-grad)"
            className={styles.bloom}
          />

          {/* Refraction fan inside the prism. */}
          <polygon
            points={`${BEAM_END.x},${BEAM_END.y} ${EXIT_TOP.x},${EXIT_TOP.y} ${EXIT_BOTTOM.x},${EXIT_BOTTOM.y}`}
            fill="url(#impossible-fan-grad)"
            filter="url(#impossible-blur-sm)"
            className={styles.innerFan}
          />

          {/* The prism: hazy halo, soft edge, then the crisp glass line. */}
          <polygon
            points={PRISM_POINTS}
            fill="none"
            stroke="#e8eef2"
            strokeWidth="14"
            filter="url(#impossible-blur-lg)"
            className={styles.halo}
          />
          <polygon
            points={PRISM_POINTS}
            fill="none"
            stroke="#e8eef2"
            strokeWidth="5"
            opacity="0.5"
            filter="url(#impossible-blur-md)"
          />
          <polygon
            points={PRISM_POINTS}
            fill="url(#impossible-prism-inner)"
            stroke="#eef3f6"
            strokeWidth="1.6"
            strokeOpacity="0.95"
          />

        </svg>

        <p
          className={cn(
            'relative z-10 mt-[calc(min(clamp(2.5rem,8vw,7.5rem),14svh)*-1)] px-6 text-balance text-center font-sans text-[clamp(2.35rem,5.6vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.05em] text-[#f5f0e8]',
            styles.headline,
          )}
        >
          Impossible is temporary.
        </p>

        <p
          className={cn(
            'relative z-10 mt-6 px-6 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8f877b] sm:mt-7',
            styles.subline,
          )}
        >
          Unlock your potential with Prism
        </p>

        <div
          className={cn(
            'relative z-10 mt-8 flex items-center gap-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8f877b]/80 sm:mt-10',
            styles.cue,
          )}
        >
          <span
            aria-hidden="true"
            className="home-signal-dot h-1.5 w-1.5 rounded-full bg-[#d8bc79]"
          />
          scroll
        </div>
      </div>

      {/* Film grain over the full hero, beneath the text layer. */}
      <svg
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <filter id="impossible-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#impossible-grain)"
          opacity="0.05"
        />
      </svg>
    </section>
  )
}
