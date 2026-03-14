import { cn } from '@/lib/utils'

import styles from '@/components/home/HomeFeatureIllustration.module.css'

export type HomeFeatureIllustrationVariant =
  | 'websites'
  | 'visibility'
  | 'ads'
  | 'analytics'
  | 'ai-agents'

type HomeFeatureIllustrationProps = {
  variant: HomeFeatureIllustrationVariant
  className?: string
}

function getIllustration(variant: HomeFeatureIllustrationVariant) {
  switch (variant) {
    case 'websites':
      return (
        <>
          <g className={cn(styles.motion, styles.webShell)}>
            <path
              d="M32 12L16 22V42L32 52L48 42V22L32 12Z"
              stroke="currentColor"
              strokeWidth="1.5"
              className={styles.outline}
            />
            <path
              d="M16 22L32 32L48 22"
              stroke="currentColor"
              strokeWidth="1.5"
              className={styles.outline}
            />
            <path
              d="M32 52V32"
              stroke="currentColor"
              strokeWidth="1.5"
              className={styles.outline}
            />
          </g>
          <circle
            cx="32"
            cy="32"
            r="7.5"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            className={cn(styles.motion, styles.webPulse, styles.accentSoft)}
            opacity="0"
          />
          <circle
            cx="32"
            cy="32"
            r="2"
            fill="currentColor"
            className={cn(styles.motion, styles.webCore, styles.accent)}
          />
          <circle
            cx="32"
            cy="12"
            r="1.5"
            fill="currentColor"
            className={cn(
              styles.motion,
              styles.delay1,
              styles.webNodeTop,
              styles.subtle,
            )}
          />
          <circle
            cx="16"
            cy="22"
            r="1.5"
            fill="currentColor"
            className={cn(
              styles.motion,
              styles.delay2,
              styles.webNodeLeft,
              styles.subtle,
            )}
          />
          <circle
            cx="48"
            cy="42"
            r="1.5"
            fill="currentColor"
            className={cn(
              styles.motion,
              styles.delay3,
              styles.webNodeRight,
              styles.subtle,
            )}
          />
        </>
      )
    case 'visibility':
      return (
        <>
          <path
            d="M16 20H48"
            stroke="currentColor"
            strokeWidth="1.5"
            className={styles.outline}
          />
          <path
            d="M16 32H48"
            stroke="currentColor"
            strokeWidth="1.5"
            className={styles.outline}
          />
          <path
            d="M16 44H48"
            stroke="currentColor"
            strokeWidth="1.5"
            className={styles.outline}
          />
          <circle
            cx="41"
            cy="32"
            r="6.5"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            className={cn(
              styles.motion,
              styles.visibilityHalo,
              styles.accentSoft,
            )}
            opacity="0"
          />
          <g
            className={cn(
              styles.motion,
              styles.delay1,
              styles.visibilityChipTop,
            )}
          >
            <rect
              x="18"
              y="17"
              width="6"
              height="6"
              rx="1"
              fill="currentColor"
              className={styles.subtle}
            />
          </g>
          <g className={cn(styles.motion, styles.visibilityChipMid)}>
            <rect
              x="36"
              y="29"
              width="10"
              height="6"
              rx="1"
              fill="currentColor"
              className={styles.accent}
            />
          </g>
          <g
            className={cn(
              styles.motion,
              styles.delay2,
              styles.visibilityChipBottom,
            )}
          >
            <rect
              x="22"
              y="41"
              width="8"
              height="6"
              rx="1"
              fill="currentColor"
              className={styles.subtle}
            />
          </g>
        </>
      )
    case 'ads':
      return (
        <>
          <path
            d="M16 48H48"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className={styles.outline}
          />
          <path
            d="M16 16V48"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className={styles.outline}
          />
          <g className={cn(styles.motion, styles.adsTrend)}>
            <polyline
              points="18,44 26,34 34,40 46,20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.subtle}
              fill="none"
            />
          </g>
          <circle
            cx="18"
            cy="44"
            r="6.5"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            className={cn(styles.motion, styles.adsPulse, styles.accentSoft)}
            opacity="0"
          />
          <g className={cn(styles.motion, styles.adsDotWrap)}>
            <circle
              cx="18"
              cy="44"
              r="4"
              fill="currentColor"
              className={styles.accent}
            />
          </g>
        </>
      )
    case 'analytics':
      return (
        <>
          <g className={cn(styles.motion, styles.analyticsFrame)}>
            <rect
              x="14"
              y="14"
              width="36"
              height="36"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
              className={styles.outline}
              fill="none"
            />
          </g>
          <g
            className={cn(
              styles.motion,
              styles.delay1,
              styles.analyticsTileSmall,
            )}
          >
            <rect
              x="20"
              y="20"
              width="10"
              height="10"
              rx="1"
              fill="currentColor"
              className={styles.subtle}
            />
          </g>
          <g
            className={cn(
              styles.motion,
              styles.delay2,
              styles.analyticsTileTall,
            )}
          >
            <rect
              x="34"
              y="20"
              width="10"
              height="18"
              rx="1"
              fill="currentColor"
              className={styles.subtle}
            />
          </g>
          <g
            className={cn(
              styles.motion,
              styles.originBottom,
              styles.analyticsPanel,
            )}
          >
            <rect
              x="20"
              y="34"
              width="24"
              height="10"
              rx="1"
              fill="currentColor"
              className={styles.accent}
              opacity="0.18"
            />
          </g>
          <path
            d="M22 40H42"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            className={cn(
              styles.motion,
              styles.delay3,
              styles.analyticsSpark,
              styles.accentSoft,
            )}
            opacity="0.55"
          />
        </>
      )
    case 'ai-agents':
      return (
        <>
          <g className={cn(styles.motion, styles.delay1, styles.aiWaveOuter)}>
            <path
              d="M8 21C1 26 1 38 8 43"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={styles.subtle}
              fill="none"
              opacity="0.72"
            />
          </g>
          <g className={cn(styles.motion, styles.aiWaveInner)}>
            <path
              d="M12 25C7 28 7 36 12 39"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={styles.subtle}
              fill="none"
            />
          </g>

          <g className={cn(styles.motion, styles.aiOrbWrap)}>
            <circle
              cx="20"
              cy="32"
              r="7"
              stroke="currentColor"
              strokeWidth="1.5"
              className={styles.outline}
              fill="none"
            />
            <circle
              cx="20"
              cy="32"
              r="12"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
              className={cn(styles.motion, styles.aiRing, styles.accentSoft)}
              opacity="0"
            />
            <circle
              cx="20"
              cy="32"
              r="2.25"
              fill="currentColor"
              className={cn(styles.motion, styles.aiCore, styles.accent)}
            />
          </g>

          <path
            d="M27 32H39"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className={cn(
              styles.motion,
              styles.originLeft,
              styles.aiBeam,
              styles.outline,
            )}
          />

          <g className={cn(styles.motion, styles.delay2, styles.aiBooking)}>
            <rect
              x="30"
              y="30"
              width="6"
              height="4"
              rx="1"
              fill="currentColor"
              className={styles.accent}
            />
          </g>

          <g className={cn(styles.motion, styles.delay1, styles.aiCalendar)}>
            <path
              d="M40 21V18M50 21V18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={styles.outline}
            />
            <rect
              x="38"
              y="21"
              width="16"
              height="21"
              rx="2.5"
              stroke="currentColor"
              strokeWidth="1.5"
              className={styles.outline}
              fill="none"
            />
            <path
              d="M38 27H54"
              stroke="currentColor"
              strokeWidth="1.5"
              className={styles.outline}
            />
            <rect
              x="42"
              y="30"
              width="8"
              height="4"
              rx="1"
              fill="currentColor"
              className={cn(styles.subtle, styles.aiSlotPrimary)}
              opacity="0.6"
            />
            <rect
              x="42"
              y="36"
              width="8"
              height="4"
              rx="1"
              fill="currentColor"
              className={styles.subtle}
              opacity="0.85"
            />
            <rect
              x="42"
              y="30"
              width="8"
              height="4"
              rx="1"
              fill="currentColor"
              className={cn(
                styles.motion,
                styles.originLeft,
                styles.aiConfirm,
                styles.accent,
              )}
            />
          </g>
        </>
      )
    default:
      return null
  }
}

export default function HomeFeatureIllustration({
  variant,
  className,
}: HomeFeatureIllustrationProps) {
  return (
    <div className={cn(styles.root, className)} aria-hidden="true">
      <div className={styles.wrapper}>
        <svg
          viewBox="0 0 64 64"
          className={styles.svg}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
          role="presentation"
          shapeRendering="geometricPrecision"
        >
          {getIllustration(variant)}
        </svg>
      </div>
    </div>
  )
}
