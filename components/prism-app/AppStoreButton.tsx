import { ArrowUpRight } from 'lucide-react'

import TrackedLink from '@/components/tracked-link'
import { Button, type ButtonProps } from '@/components/ui/button'
import { PRISM_APP_STORE_URL } from '@/lib/prism-app'
import { cn } from '@/lib/utils'

const LABEL = 'Download on the App Store'

/** simple-icons 24x24 Apple glyph, drawn with `currentColor`. */
const APPLE_GLYPH =
  'M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701'

type AppStoreButtonProps = {
  /** Analytics location, e.g. "prism app hero". */
  location: string
  size?: ButtonProps['size']
  variant?: ButtonProps['variant']
  className?: string
}

/** The install action on /app. It leaves the site, so it carries ArrowUpRight. */
export function AppStoreButton({
  location,
  size = 'xl',
  variant = 'default',
  className,
}: AppStoreButtonProps) {
  return (
    <Button
      asChild
      size={size}
      variant={variant}
      className={cn('group/cta', className)}
    >
      <TrackedLink
        href={PRISM_APP_STORE_URL}
        label={LABEL}
        location={location}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-[18px]"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d={APPLE_GLYPH} />
        </svg>
        {LABEL}
        <ArrowUpRight
          aria-hidden="true"
          className="transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
        />
      </TrackedLink>
    </Button>
  )
}

export default AppStoreButton
