'use client'

import { ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { readApplyDashboardClaimUrl } from '@/lib/dashboard-claim'

export default function ApplyDashboardClaimCta() {
  const [claimUrl, setClaimUrl] = useState<string | null>(null)

  useEffect(() => {
    setClaimUrl(readApplyDashboardClaimUrl())
  }, [])

  if (!claimUrl) {
    return null
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-white/[0.08] bg-card p-6 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-heading text-foreground">
          Your private dashboard is ready.
        </p>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
          Claim it now. The same link is in your inbox.
        </p>
      </div>
      <Button asChild size="lg" className="self-start sm:self-auto">
        <a href={claimUrl}>
          Claim dashboard
          <ArrowUpRight aria-hidden="true" />
        </a>
      </Button>
    </div>
  )
}
