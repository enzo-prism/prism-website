'use client'

import { useEffect, useState } from 'react'

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
    <div className="border border-[#9EFF2E]/28 bg-[#9EFF2E]/8 px-5 py-5">
      <div>
        <p className="font-sans text-[1.35rem] font-medium tracking-[-0.04em] text-[#F5F5F2]">
          Your private dashboard is ready.
        </p>
        <p className="mt-2 font-mono text-[0.9rem] leading-7 text-[#C6C6C0]">
          Claim it now. The same link is in your inbox.
        </p>
      </div>
      <a
        href={claimUrl}
        className="mt-5 inline-flex min-h-12 items-center justify-center border border-[#9EFF2E]/55 bg-[#9EFF2E]/10 px-5 py-3 font-mono text-[0.82rem] uppercase tracking-[0.2em] text-[#9EFF2E] transition-colors hover:bg-[#9EFF2E]/16 hover:text-[#D4FF94] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#9EFF2E]/35"
      >
        Claim dashboard
      </a>
    </div>
  )
}
