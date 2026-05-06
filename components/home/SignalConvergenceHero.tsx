'use client'

import { useReducedMotion } from 'framer-motion'
import { useId } from 'react'

import { cn } from '@/lib/utils'

import styles from './SignalConvergenceHero.module.css'

export const PRISM_SYSTEM_MODULE_COUNT = 6

type HeroLayout = 'compact' | 'stacked' | 'split'
type HeroNodeId =
  | 'openai'
  | 'anthropic'
  | 'analytics'
  | 'vercel'
  | 'framer'
  | 'webflow'

type SatelliteNode = {
  accentA: string
  accentB: string
  iconScale: number
  id: HeroNodeId
  src: string
  title: string
}

type VisibleNode = {
  angle: number
  id: HeroNodeId
}

type HeroModeConfig = {
  boardRadius: number
  centerX: number
  centerY: number
  coreSize: number
  height: number
  orbitX: number
  orbitY: number
  rings: number[]
  satelliteSize: number
  visibleNodes: VisibleNode[]
  width: number
}

type NodeGeometry = {
  size: number
  x: number
  y: number
}

const SATELLITES: Record<HeroNodeId, SatelliteNode> = {
  openai: {
    id: 'openai',
    title: 'OpenAI',
    src: '/home-hero/logos/openai.svg',
    iconScale: 0.4,
    accentA: 'rgba(45, 212, 191, 0.34)',
    accentB: 'rgba(96, 165, 250, 0.22)',
  },
  anthropic: {
    id: 'anthropic',
    title: 'Anthropic',
    src: '/home-hero/logos/anthropic.svg',
    iconScale: 0.38,
    accentA: 'rgba(251, 191, 36, 0.2)',
    accentB: 'rgba(251, 146, 60, 0.2)',
  },
  analytics: {
    id: 'analytics',
    title: 'Google Analytics',
    src: '/home-hero/logos/google-analytics.svg',
    iconScale: 0.38,
    accentA: 'rgba(249, 115, 22, 0.32)',
    accentB: 'rgba(250, 204, 21, 0.22)',
  },
  vercel: {
    id: 'vercel',
    title: 'Vercel',
    src: '/home-hero/logos/vercel.svg',
    iconScale: 0.34,
    accentA: 'rgba(255, 255, 255, 0.18)',
    accentB: 'rgba(96, 165, 250, 0.16)',
  },
  framer: {
    id: 'framer',
    title: 'Framer',
    src: '/home-hero/logos/framer.svg',
    iconScale: 0.34,
    accentA: 'rgba(244, 114, 182, 0.22)',
    accentB: 'rgba(192, 132, 252, 0.22)',
  },
  webflow: {
    id: 'webflow',
    title: 'Webflow',
    src: '/home-hero/logos/webflow.svg',
    iconScale: 0.38,
    accentA: 'rgba(59, 130, 246, 0.28)',
    accentB: 'rgba(96, 165, 250, 0.22)',
  },
}

const MODE_CONFIGS: Record<HeroLayout, HeroModeConfig> = {
  compact: {
    width: 420,
    height: 336,
    centerX: 208,
    centerY: 176,
    coreSize: 132,
    satelliteSize: 80,
    orbitX: 132,
    orbitY: 106,
    boardRadius: 34,
    rings: [88, 124, 168],
    visibleNodes: [
      { id: 'openai', angle: -132 },
      { id: 'anthropic', angle: -48 },
      { id: 'analytics', angle: 8 },
      { id: 'vercel', angle: 132 },
    ],
  },
  stacked: {
    width: 720,
    height: 556,
    centerX: 360,
    centerY: 288,
    coreSize: 184,
    satelliteSize: 108,
    orbitX: 220,
    orbitY: 166,
    boardRadius: 46,
    rings: [110, 156, 226],
    visibleNodes: [
      { id: 'openai', angle: -134 },
      { id: 'anthropic', angle: -46 },
      { id: 'analytics', angle: 6 },
      { id: 'webflow', angle: 58 },
      { id: 'vercel', angle: 134 },
    ],
  },
  split: {
    width: 1000,
    height: 760,
    centerX: 540,
    centerY: 388,
    coreSize: 214,
    satelliteSize: 134,
    orbitX: 290,
    orbitY: 236,
    boardRadius: 60,
    rings: [140, 202, 284, 360],
    visibleNodes: [
      { id: 'openai', angle: -132 },
      { id: 'anthropic', angle: -48 },
      { id: 'analytics', angle: 4 },
      { id: 'webflow', angle: 54 },
      { id: 'framer', angle: 90 },
      { id: 'vercel', angle: 132 },
    ],
  },
}

function buildNodeGeometry(
  config: HeroModeConfig,
  node: VisibleNode,
): NodeGeometry {
  const angle = (node.angle * Math.PI) / 180

  return {
    size: config.satelliteSize,
    x: config.centerX + config.orbitX * Math.cos(angle),
    y: config.centerY + config.orbitY * Math.sin(angle),
  }
}

function buildConnectorPath(
  config: HeroModeConfig,
  geometry: NodeGeometry,
): string {
  const deltaX = geometry.x - config.centerX
  const deltaY = geometry.y - config.centerY
  const distance = Math.hypot(deltaX, deltaY)

  if (!distance) {
    return ''
  }

  const unitX = deltaX / distance
  const unitY = deltaY / distance
  const perpendicularX = -unitY
  const perpendicularY = unitX
  const startInset = config.coreSize * 0.34
  const endInset = geometry.size * 0.42
  const bendAmount =
    Math.min(42, distance * 0.12) * (geometry.x >= config.centerX ? 1 : -1)

  const startX = config.centerX + unitX * startInset
  const startY = config.centerY + unitY * startInset
  const endX = geometry.x - unitX * endInset
  const endY = geometry.y - unitY * endInset
  const midpointX = (startX + endX) / 2 + perpendicularX * bendAmount
  const midpointY = (startY + endY) / 2 + perpendicularY * bendAmount

  return `M ${startX} ${startY} Q ${midpointX} ${midpointY} ${endX} ${endY}`
}

function PrismGlyph({ gradientId }: { gradientId: string }) {
  return (
    <>
      <path d="M60 26L88 94H77L60 52V26Z" fill={`url(#${gradientId})`} />
      <path
        d="M60 26V52L43 94H32L60 26Z"
        fill={`url(#${gradientId})`}
        opacity="0.92"
      />
      <path
        d="M47 66H73L69 79H51L47 66Z"
        fill={`url(#${gradientId})`}
        opacity="0.8"
      />
    </>
  )
}

function SatelliteTile({
  geometry,
  iconFilterId,
  node,
  surfaceGradientId,
  tileGlowId,
}: {
  geometry: NodeGeometry
  iconFilterId: string
  node: SatelliteNode
  surfaceGradientId: string
  tileGlowId: string
}) {
  const inset = geometry.size * 0.12
  const iconSize = geometry.size * node.iconScale

  return (
    <g
      transform={`translate(${geometry.x - geometry.size / 2} ${geometry.y - geometry.size / 2})`}
    >
      <rect
        x="0"
        y="0"
        width={geometry.size}
        height={geometry.size}
        rx={geometry.size * 0.24}
        fill="rgba(4, 7, 14, 0.92)"
        stroke="rgba(148, 163, 184, 0.14)"
        filter={`url(#${tileGlowId})`}
      />
      <rect
        x={inset}
        y={inset}
        width={geometry.size - inset * 2}
        height={geometry.size - inset * 2}
        rx={geometry.size * 0.18}
        fill={`url(#${surfaceGradientId})`}
        stroke="rgba(255, 255, 255, 0.05)"
      />
      <rect
        x={geometry.size * 0.14}
        y={geometry.size * 0.14}
        width={geometry.size * 0.72}
        height={geometry.size * 0.26}
        rx={geometry.size * 0.14}
        fill="rgba(255, 255, 255, 0.045)"
        opacity="0.45"
      />
      <image
        href={node.src}
        x={(geometry.size - iconSize) / 2}
        y={(geometry.size - iconSize) / 2}
        width={iconSize}
        height={iconSize}
        preserveAspectRatio="xMidYMid meet"
        filter={`url(#${iconFilterId})`}
      />
    </g>
  )
}

function PrismCore({
  config,
  prismGradientId,
  surfaceGradientId,
  tileGlowId,
}: {
  config: HeroModeConfig
  prismGradientId: string
  surfaceGradientId: string
  tileGlowId: string
}) {
  const size = config.coreSize
  const inset = size * 0.1

  return (
    <g
      transform={`translate(${config.centerX - size / 2} ${config.centerY - size / 2})`}
    >
      <rect
        x="0"
        y="0"
        width={size}
        height={size}
        rx={size * 0.22}
        fill="rgba(4, 7, 14, 0.96)"
        stroke="rgba(96, 165, 250, 0.24)"
        filter={`url(#${tileGlowId})`}
      />
      <rect
        x={inset}
        y={inset}
        width={size - inset * 2}
        height={size - inset * 2}
        rx={size * 0.16}
        fill={`url(#${surfaceGradientId})`}
        stroke="rgba(255, 255, 255, 0.05)"
      />
      <g transform={`translate(${size / 2 - 56} ${size / 2 - 56}) scale(0.94)`}>
        <PrismGlyph gradientId={prismGradientId} />
      </g>
    </g>
  )
}

export default function SignalConvergenceHero({
  className,
  layout = 'split',
}: {
  className?: string
  layout?: HeroLayout
}) {
  const prefersReducedMotion = useReducedMotion()
  const motionMode = prefersReducedMotion ? 'static' : 'loop'
  const config = MODE_CONFIGS[layout]
  const idPrefix = useId().replace(/:/g, '')

  const boardGradientId = `${idPrefix}-board`
  const connectorGradientId = `${idPrefix}-connector`
  const coreSurfaceGradientId = `${idPrefix}-core-surface`
  const prismGradientId = `${idPrefix}-prism`
  const ringGlowId = `${idPrefix}-ring-glow`
  const tileGlowId = `${idPrefix}-tile-glow`
  const iconFilterId = `${idPrefix}-icon-glow`
  const coreHaloId = `${idPrefix}-core-halo`

  const nodes = config.visibleNodes.map((node) => ({
    ...node,
    geometry: buildNodeGeometry(config, node),
    details: SATELLITES[node.id],
  }))

  return (
    <div
      aria-hidden="true"
      className={cn(styles.root, className)}
      data-motion-mode={motionMode}
      data-hero-layout={layout}
      data-testid={`signal-convergence-hero-${layout}`}
      style={{ aspectRatio: `${config.width} / ${config.height}` }}
    >
      <svg
        className={styles.canvas}
        viewBox={`0 0 ${config.width} ${config.height}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id={boardGradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#08111d" />
            <stop offset="38%" stopColor="#050911" />
            <stop offset="72%" stopColor="#0a1020" />
            <stop offset="100%" stopColor="#130913" />
          </linearGradient>
          <linearGradient
            id={connectorGradientId}
            x1="10%"
            y1="0%"
            x2="90%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(125, 211, 252, 0.16)" />
            <stop offset="34%" stopColor="rgba(96, 165, 250, 1)" />
            <stop offset="72%" stopColor="rgba(167, 139, 250, 1)" />
            <stop offset="100%" stopColor="rgba(244, 114, 182, 0.56)" />
          </linearGradient>
          <linearGradient
            id={coreSurfaceGradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(19, 30, 54, 0.94)" />
            <stop offset="48%" stopColor="rgba(5, 9, 17, 0.98)" />
            <stop offset="100%" stopColor="rgba(3, 7, 14, 0.96)" />
          </linearGradient>
          <linearGradient
            id={prismGradientId}
            x1="28"
            y1="94"
            x2="90"
            y2="24"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#5EEAD4" />
            <stop offset="0.42" stopColor="#60A5FA" />
            <stop offset="0.76" stopColor="#A78BFA" />
            <stop offset="1" stopColor="#E879F9" />
          </linearGradient>
          <filter id={ringGlowId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <filter id={tileGlowId} x="-35%" y="-35%" width="170%" height="180%">
            <feDropShadow
              dx="0"
              dy="18"
              stdDeviation="24"
              floodColor="rgba(2,6,23,0.44)"
            />
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="12"
              floodColor="rgba(96,165,250,0.1)"
            />
          </filter>
          <filter
            id={iconFilterId}
            x="-35%"
            y="-35%"
            width="170%"
            height="170%"
          >
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="8"
              floodColor="rgba(96,165,250,0.18)"
            />
          </filter>
          <filter id={coreHaloId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="38" />
          </filter>
        </defs>

        <rect
          x="0"
          y="0"
          width={config.width}
          height={config.height}
          rx={config.boardRadius}
          fill={`url(#${boardGradientId})`}
        />

        <g opacity="0.7" filter={`url(#${ringGlowId})`}>
          <ellipse
            cx={config.centerX * 0.52}
            cy={config.centerY * 1.34}
            rx={config.width * 0.22}
            ry={config.height * 0.24}
            fill="rgba(37, 99, 235, 0.18)"
          />
          <ellipse
            cx={config.width * 0.86}
            cy={config.height * 0.16}
            rx={config.width * 0.24}
            ry={config.height * 0.22}
            fill="rgba(244, 114, 182, 0.12)"
          />
          <ellipse
            cx={config.centerX}
            cy={config.centerY}
            rx={config.width * 0.16}
            ry={config.height * 0.18}
            className={cn(
              styles.coreHalo,
              motionMode === 'loop' && styles.coreHaloAnimated,
            )}
            fill="rgba(59, 130, 246, 0.18)"
            filter={`url(#${coreHaloId})`}
          />
        </g>

        {config.rings.map((ring, index) => (
          <circle
            key={`${layout}-ring-${ring}`}
            cx={config.centerX}
            cy={config.centerY}
            r={ring}
            className={cn(
              styles.ring,
              motionMode === 'loop' && styles.ringAnimated,
            )}
            data-ring-index={index}
            style={{ animationDelay: `${index * 120}ms` }}
          />
        ))}

        {nodes.map((node) => (
          <g key={`${layout}-connector-${node.id}`}>
            <path
              className={styles.connectorBase}
              d={buildConnectorPath(config, node.geometry)}
            />
            <path
              className={cn(
                styles.connectorGlow,
                motionMode === 'loop' && styles.connectorAnimated,
              )}
              d={buildConnectorPath(config, node.geometry)}
              stroke={`url(#${connectorGradientId})`}
              pathLength={1}
              style={{ animationDelay: `${node.geometry.x / 90}ms` }}
            />
          </g>
        ))}

        {nodes.map((node) => (
          <SatelliteTile
            key={`${layout}-${node.id}`}
            geometry={node.geometry}
            iconFilterId={iconFilterId}
            node={node.details}
            surfaceGradientId={coreSurfaceGradientId}
            tileGlowId={tileGlowId}
          />
        ))}

        <PrismCore
          config={config}
          prismGradientId={prismGradientId}
          surfaceGradientId={coreSurfaceGradientId}
          tileGlowId={tileGlowId}
        />
      </svg>
    </div>
  )
}
