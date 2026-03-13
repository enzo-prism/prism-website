'use client'

import ElevenLabsWidget from '@/components/elevenlabs/ElevenLabsWidget'
import { isPublicElevenLabsWidgetEnabled } from '@/lib/elevenlabs-widget'
import { cn } from '@/lib/utils'

type HomeHeroAgentProps = {
  className?: string
}

export default function HomeHeroAgent({ className }: HomeHeroAgentProps) {
  const widgetEnabled = isPublicElevenLabsWidgetEnabled()

  if (!widgetEnabled) {
    return null
  }

  return (
    <div
      className={cn(
        'home-hero-agent relative isolate mx-auto flex min-h-[35rem] w-full max-w-[34rem] items-center justify-center overflow-hidden text-left sm:min-h-[36rem]',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-[8%] top-[14%] h-[72%] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.10),rgba(255,255,255,0)_68%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-[16%] top-[22%] h-[56%] rounded-full border border-black/[0.04] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.18))] blur-2xl" />
      <ElevenLabsWidget
        className="mx-auto block w-full"
        dismissible={false}
        style={{
          inset: '0px',
          position: 'absolute',
          zIndex: '20',
        }}
        testId="home-elevenlabs-widget"
        variant="expanded"
      />
    </div>
  )
}
