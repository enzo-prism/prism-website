import TrackedLink from '@/components/tracked-link'
import {
  CONNECTED_CLIENT_TRAFFIC,
  SOCIAL_PROOF,
} from '@/lib/proof-metrics'
import { cn } from '@/lib/utils'

/**
 * Slim demand proof for the waitlist page: real audience and client-traffic
 * numbers plus the path to the wall of love. Every figure comes from
 * `lib/proof-metrics.ts`, the one shared source, with its measurement window
 * beside it. Never hardcode a proof number here.
 */
export default function WaitlistProofStrip({ className }: { className?: string }) {
  return (
    <div
      data-waitlist-proof="strip"
      className={cn('mt-8 border-t border-white/10 pt-5', className)}
    >
      <p className="font-mono text-[0.68rem] uppercase leading-6 tracking-[0.2em] text-[#8f877b]">
        {SOCIAL_PROOF.combinedAudience} followers{' '}
        <span aria-hidden="true" className="text-[#5c574e]">
          ·
        </span>{' '}
        {CONNECTED_CLIENT_TRAFFIC.newUsers.toLocaleString('en-US')} new users
        across {CONNECTED_CLIENT_TRAFFIC.connectedSites} connected client sites
        in {CONNECTED_CLIENT_TRAFFIC.month}
      </p>
      <TrackedLink
        href="/wall-of-love"
        label="see why clients love prism"
        location="waitlist proof strip"
        className="mt-3 inline-flex min-h-11 items-center font-sans text-[0.95rem] text-[#b8afa2] underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#f5f0e8] focus-visible:rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25"
      >
        See why clients love Prism
      </TrackedLink>
    </div>
  )
}
