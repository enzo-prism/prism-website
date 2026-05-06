import { cn } from '@/lib/utils'

type PrismMarkTone = 'gradient' | 'white' | 'dark'

type PrismMarkProps = {
  className?: string
  title?: string
  tone?: PrismMarkTone
}

export default function PrismMark({
  className,
  title = 'Prism mark',
  tone = 'gradient',
}: PrismMarkProps) {
  const gradientId = `prism-mark-gradient-${tone}`
  const shineId = `prism-mark-shine-${tone}`

  return (
    <svg
      viewBox="0 0 120 120"
      className={cn('h-full w-full', className)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <defs>
        <linearGradient
          id={gradientId}
          x1="28"
          y1="94"
          x2="90"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          {tone === 'gradient' ? (
            <>
              <stop offset="0" stopColor="#5EEAD4" />
              <stop offset="0.42" stopColor="#60A5FA" />
              <stop offset="0.76" stopColor="#E879F9" />
              <stop offset="1" stopColor="#F9A8D4" />
            </>
          ) : tone === 'dark' ? (
            <>
              <stop offset="0" stopColor="#0F172A" />
              <stop offset="1" stopColor="#0F172A" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#FFFFFF" />
            </>
          )}
        </linearGradient>
        <linearGradient
          id={shineId}
          x1="58"
          y1="28"
          x2="76"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M60 26L88 94H77L60 52V26Z" fill={`url(#${gradientId})`} />
      <path
        d="M60 26V52L43 94H32L60 26Z"
        fill={`url(#${gradientId})`}
        opacity={tone === 'white' ? 0.88 : 0.92}
      />
      <path
        d="M47 66H73L69 79H51L47 66Z"
        fill={`url(#${gradientId})`}
        opacity={tone === 'white' ? 0.76 : 0.8}
      />
      {tone === 'gradient' ? (
        <path d="M60 26L74 58H67L60 39V26Z" fill={`url(#${shineId})`} />
      ) : null}
    </svg>
  )
}
