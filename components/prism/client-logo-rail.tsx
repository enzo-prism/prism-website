import { ClientLogo } from '@/components/prism/client-logo'
import { Marquee } from '@/components/prism/marquee'
import { CLIENT_LOGOS } from '@/lib/client-logos'
import { cn } from '@/lib/utils'

type ClientLogoRailProps = {
  /** Mono caption above the rail. */
  label: string
  id?: string
  className?: string
  /** Seconds per loop. */
  duration?: number
}

/**
 * Every current client's real logo, tinted to one quiet tone and drifting
 * left; hovering a mark brightens it. Reduced motion and the locked
 * screenshots see a static row (the Marquee base frame).
 */
export function ClientLogoRail({
  label,
  id,
  className,
  duration = 70,
}: ClientLogoRailProps) {
  return (
    <div id={id} data-testid="client-logo-rail" className={cn('relative', className)}>
      <p className="prism-container text-center font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
        {label}
      </p>
      <Marquee
        label="Prism clients"
        duration={duration}
        gap="3.5rem"
        className="mt-7 motion-reduce:hidden sm:mt-8"
      >
        {CLIENT_LOGOS.map((logo) => (
          <ClientLogo
            key={logo.slug}
            logo={logo}
            className="text-white/50 transition-colors duration-300 hover:text-foreground"
          />
        ))}
      </Marquee>
      {/* Reduced motion: every logo at once, wrapped and still. */}
      <ul
        aria-label="Prism clients"
        className="prism-container mt-7 hidden flex-wrap items-center justify-center gap-x-10 gap-y-4 motion-reduce:flex sm:mt-8"
      >
        {CLIENT_LOGOS.map((logo) => (
          <li key={logo.slug}>
            <ClientLogo logo={logo} area={2600} className="text-white/55" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ClientLogoRail
