import { cn } from '@/lib/utils'

type InitialsAvatarProps = {
  initials: string
  /** Clients get the spectrum ring; community commenters stay neutral. */
  variant?: 'client' | 'community'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'size-7 text-[11px]',
  md: 'size-9 text-xs',
  lg: 'size-11 text-sm',
} as const

/** shadcn-style Avatar fallback built from plain markup (no image, no JS). */
export function InitialsAvatar({
  initials,
  variant = 'community',
  size = 'md',
  className,
}: InitialsAvatarProps) {
  if (variant === 'client') {
    return (
      <span
        aria-hidden="true"
        data-slot="avatar"
        className={cn(
          'relative inline-flex shrink-0 rounded-full bg-spectrum p-px',
          sizeClasses[size],
          className,
        )}
      >
        <span className="flex size-full items-center justify-center rounded-full bg-popover font-semibold tracking-[0.02em] text-foreground">
          {initials}
        </span>
      </span>
    )
  }

  return (
    <span
      aria-hidden="true"
      data-slot="avatar"
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] font-semibold text-muted-foreground',
        sizeClasses[size],
        className,
      )}
    >
      {initials}
    </span>
  )
}

export default InitialsAvatar
