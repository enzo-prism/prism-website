import type { CSSProperties } from 'react'

import RefractionPointer from '@/components/home/RefractionPointer'
import styles from '@/components/home/HomeRefraction.module.css'
import { cn } from '@/lib/utils'

/**
 * The Prism refraction scene: white light (your business) enters the glass
 * and leaves as a six-band spectrum, one band per channel Prism runs.
 * Server-rendered SVG with CSS-only choreography. The only client JS is
 * RefractionPointer, which swings the light a few degrees with a fine
 * pointer (motion-safe only), like turning a real prism in your hand.
 */

type Point = { x: number; y: number }

const SPECTRUM_COLORS = [
  'var(--spectrum-red)',
  'var(--spectrum-orange)',
  'var(--spectrum-yellow)',
  'var(--spectrum-green)',
  'var(--spectrum-blue)',
  'var(--spectrum-violet)',
] as const

// Geometry in a 1440x560 viewBox.
const PRISM_POINTS = '720,64 556,348 884,348'
const BEAM_START: Point = { x: -60, y: 318 }
const BEAM_END: Point = { x: 646, y: 193 }
const EXIT_TOP: Point = { x: 789, y: 184 }
const EXIT_BOTTOM: Point = { x: 815, y: 229 }
const EDGE_TOP: Point = { x: 1500, y: 236 }
const EDGE_BOTTOM: Point = { x: 1500, y: 560 }
const LABEL_X = 1108

const round = (value: number) => Math.round(value * 10) / 10

function lerpPoint(a: Point, b: Point, t: number): Point {
  return { x: round(a.x + (b.x - a.x) * t), y: round(a.y + (b.y - a.y) * t) }
}

const SPECTRUM_BANDS = SPECTRUM_COLORS.map((color, index) => {
  const count = SPECTRUM_COLORS.length
  const startTop = lerpPoint(EXIT_TOP, EXIT_BOTTOM, index / count)
  const startBottom = lerpPoint(EXIT_TOP, EXIT_BOTTOM, (index + 1) / count)
  const endTop = lerpPoint(EDGE_TOP, EDGE_BOTTOM, index / count)
  const endBottom = lerpPoint(EDGE_TOP, EDGE_BOTTOM, (index + 1) / count)
  const startCenter = lerpPoint(startTop, startBottom, 0.5)
  const endCenter = lerpPoint(endTop, endBottom, 0.5)
  const t = (LABEL_X - startCenter.x) / (endCenter.x - startCenter.x)
  const label = lerpPoint(startCenter, endCenter, t)
  return {
    color,
    points: `${startTop.x},${startTop.y} ${startBottom.x},${startBottom.y} ${endBottom.x},${endBottom.y} ${endTop.x},${endTop.y}`,
    label,
  }
})

const SPECTRUM_CLIP_POINTS = `${EXIT_TOP.x},${EXIT_TOP.y} ${EXIT_BOTTOM.x},${EXIT_BOTTOM.y} ${EDGE_BOTTOM.x},${EDGE_BOTTOM.y} ${EDGE_TOP.x},${EDGE_TOP.y}`
const EXIT_CENTER = lerpPoint(EXIT_TOP, EXIT_BOTTOM, 0.5)

type HomeRefractionProps = {
  labels: readonly string[]
  sourceLabel?: string
  className?: string
}

export default function HomeRefraction({
  labels,
  sourceLabel = 'your business',
  className,
}: HomeRefractionProps) {
  return (
    <div
      aria-hidden="true"
      data-testid="home-refraction"
      className={cn(
        'pointer-events-none relative select-none',
        styles.scene,
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 560"
        focusable="false"
        className="mx-auto block h-auto w-[178%] max-w-none -translate-x-[21.9%] sm:w-[130%] sm:-translate-x-[11.5%] lg:w-full lg:translate-x-0"
      >
        <defs>
          <filter
            id="refraction-blur-sm"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
          <filter
            id="refraction-blur-md"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="4.5" />
          </filter>
          <filter
            id="refraction-blur-lg"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <filter
            id="refraction-blur-xl"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="28" />
          </filter>
          <radialGradient id="refraction-bloom-grad">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="refraction-prism-inner"
            cx="0.5"
            cy="0.62"
            r="0.75"
          >
            <stop offset="0" stopColor="#9aa8b4" stopOpacity="0.16" />
            <stop offset="0.55" stopColor="#5a646e" stopOpacity="0.06" />
            <stop offset="1" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="refraction-fan-grad"
            gradientUnits="userSpaceOnUse"
            x1={BEAM_END.x}
            y1={BEAM_END.y}
            x2={EXIT_CENTER.x}
            y2={EXIT_CENTER.y}
          >
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.42" />
          </linearGradient>
          <linearGradient id="refraction-sheen-grad">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <clipPath id="refraction-spectrum-clip">
            <polygon points={SPECTRUM_CLIP_POINTS} />
          </clipPath>
          <linearGradient
            id="refraction-edge-fade-grad"
            gradientUnits="userSpaceOnUse"
            x1="-80"
            y1="0"
            x2="1500"
            y2="0"
          >
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.16" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="0.86" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="refraction-bottom-fade-grad"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0.55" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <mask
            id="refraction-edge-fade"
            maskUnits="userSpaceOnUse"
            x="-80"
            y="0"
            width="1620"
            height="560"
          >
            <rect
              x="-80"
              y="0"
              width="1620"
              height="560"
              fill="url(#refraction-edge-fade-grad)"
            />
          </mask>
          <mask
            id="refraction-bottom-fade"
            maskUnits="userSpaceOnUse"
            x="-80"
            y="0"
            width="1620"
            height="560"
          >
            <rect
              x="-80"
              y="0"
              width="1620"
              height="560"
              fill="url(#refraction-bottom-fade-grad)"
            />
          </mask>
        </defs>

        <g className={styles.swingOut}>
        {/* Soft colored light pooling under the spectrum. It only appears
            once the beam has reached the glass. */}
        <g mask="url(#refraction-bottom-fade)" opacity="0.45" className={styles.pool}>
          <g
            mask="url(#refraction-edge-fade)"
            filter="url(#refraction-blur-xl)"
          >
            {SPECTRUM_BANDS.map((band) => (
              <polygon
                key={`glow-${band.points}`}
                points={band.points}
                fill={band.color}
              />
            ))}
          </g>
        </g>

        {/* Refracted spectrum. */}
        <g mask="url(#refraction-bottom-fade)">
          <g mask="url(#refraction-edge-fade)">
            <g className={styles.spectrum}>
              {SPECTRUM_BANDS.map((band, index) => (
                <polygon
                  key={band.points}
                  points={band.points}
                  fill={band.color}
                  className={styles.band}
                  style={{ '--band-index': index } as CSSProperties}
                />
              ))}
            </g>
            <g clipPath="url(#refraction-spectrum-clip)">
              <rect
                x="780"
                y="170"
                width="130"
                height="420"
                fill="url(#refraction-sheen-grad)"
                className={styles.sheen}
              />
            </g>
          </g>
        </g>

        {/* Channel labels riding each band. */}
        {SPECTRUM_BANDS.map((band, index) =>
          labels[index] ? (
            <g
              key={`label-${labels[index]}`}
              className={styles.label}
              style={{ '--band-index': index } as CSSProperties}
            >
              <text
                x={band.label.x}
                y={band.label.y + 4}
                fill="#0a0a0b"
                fillOpacity="0.82"
                fontFamily="var(--font-mono)"
                fontSize="12"
                fontWeight="600"
                letterSpacing="2.2"
              >
                {labels[index].toUpperCase()}
              </text>
            </g>
          ) : null,
        )}

        {/* Hot white core where the spectrum leaves the glass. */}
        <ellipse
          cx={EXIT_CENTER.x}
          cy={EXIT_CENTER.y}
          rx="28"
          ry="11"
          transform={`rotate(60 ${EXIT_CENTER.x} ${EXIT_CENTER.y})`}
          fill="#ffffff"
          filter="url(#refraction-blur-md)"
          className={styles.exitHot}
        />

        </g>

        <g className={styles.swingIn}>
        {/* Incoming white beam. */}
        <g mask="url(#refraction-edge-fade)">
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
            filter="url(#refraction-blur-md)"
            className={styles.beamGlow}
          />
          <line
            x1={BEAM_START.x}
            y1={BEAM_START.y}
            x2={BEAM_END.x}
            y2={BEAM_END.y}
            pathLength={1}
            stroke="#ffffff"
            strokeWidth="2.6"
            strokeLinecap="round"
            className={styles.beamCore}
          />
        </g>

        <text
          x="212"
          y="264"
          fill="#ffffff"
          fillOpacity="0.5"
          fontFamily="var(--font-mono)"
          fontSize="12"
          fontWeight="500"
          letterSpacing="2.2"
          transform="rotate(-10.05 212 264)"
          className={styles.label}
        >
          {sourceLabel.toUpperCase()}
        </text>

        </g>

        <circle
          cx={BEAM_END.x}
          cy={BEAM_END.y}
          r="30"
          fill="url(#refraction-bloom-grad)"
          className={styles.bloom}
        />

        <polygon
          points={`${BEAM_END.x},${BEAM_END.y} ${EXIT_TOP.x},${EXIT_TOP.y} ${EXIT_BOTTOM.x},${EXIT_BOTTOM.y}`}
          fill="url(#refraction-fan-grad)"
          filter="url(#refraction-blur-sm)"
          className={styles.innerFan}
        />

        {/* The prism: haze, soft edge, crisp glass line. */}
        <polygon
          points={PRISM_POINTS}
          fill="none"
          stroke="#e8eef2"
          strokeWidth="14"
          filter="url(#refraction-blur-lg)"
          className={styles.halo}
        />
        <polygon
          points={PRISM_POINTS}
          fill="none"
          stroke="#e8eef2"
          strokeWidth="5"
          opacity="0.5"
          filter="url(#refraction-blur-md)"
        />
        <polygon
          points={PRISM_POINTS}
          fill="url(#refraction-prism-inner)"
          stroke="#eef3f6"
          strokeWidth="1.6"
          strokeOpacity="0.95"
        />
      </svg>
      <RefractionPointer />
    </div>
  )
}
