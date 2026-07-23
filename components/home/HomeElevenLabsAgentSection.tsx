'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import dynamic from 'next/dynamic'

import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
  coreSecondaryActionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import ElevenLabsOrbMark from '@/components/elevenlabs/ElevenLabsOrbMark'

// The widget internals only render after the visitor clicks "Agree & open
// guide", so they are code-split instead of statically bundled. A static
// import here would drag ~40KB of widget code into the shared home client
// chunk — which every route importing any components/home/* module (e.g.
// HomeReveal) would then download.
const ElevenLabsWidgetScript = dynamic(
  () =>
    import('@/components/elevenlabs/ElevenLabsWidget').then(
      (mod) => mod.ElevenLabsWidgetScript,
    ),
  { ssr: false },
)
const ElevenLabsWidget = dynamic(
  () => import('@/components/elevenlabs/ElevenLabsWidget'),
  { ssr: false },
)
import { usePublicElevenLabsWidgetViewportEligibility } from '@/hooks/use-public-elevenlabs-widget-viewport'
import { usePublicElevenLabsWidgetWebGLEligibility } from '@/hooks/use-public-elevenlabs-widget-webgl'
import {
  isHomeElevenLabsEmbedEnabled,
  isPublicElevenLabsWidgetEnabled,
} from '@/lib/elevenlabs-widget'

const INLINE_WIDGET_STYLE = {
  display: 'block',
  height: '100%',
  inset: 'auto',
  maxWidth: '100%',
  position: 'relative',
  width: '100%',
  zIndex: '1',
} satisfies CSSProperties

export default function HomeElevenLabsAgentSection() {
  const loadBoundaryRef = useRef<HTMLDivElement | null>(null)
  const [isNearViewport, setIsNearViewport] = useState(false)
  const [hasAcceptedConversationTerms, setHasAcceptedConversationTerms] =
    useState(false)
  const isHomeEmbedEnabled = isHomeElevenLabsEmbedEnabled()
  const isPublicWidgetEnabled = isPublicElevenLabsWidgetEnabled()
  const isViewportEligible = usePublicElevenLabsWidgetViewportEligibility()
  const shouldCheckWebGL =
    isHomeEmbedEnabled &&
    isPublicWidgetEnabled &&
    isNearViewport &&
    isViewportEligible === true
  const isWebGLEligible =
    usePublicElevenLabsWidgetWebGLEligibility(shouldCheckWebGL)
  const canOfferWidget = shouldCheckWebGL && isWebGLEligible === true
  const shouldMountWidget = canOfferWidget && hasAcceptedConversationTerms

  useEffect(() => {
    const boundary = loadBoundaryRef.current

    if (
      !boundary ||
      !isHomeEmbedEnabled ||
      !isPublicWidgetEnabled ||
      isViewportEligible !== true
    ) {
      setIsNearViewport(false)
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsNearViewport(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNearViewport(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px 0px', threshold: 0 },
    )

    observer.observe(boundary)

    return () => observer.disconnect()
  }, [isHomeEmbedEnabled, isPublicWidgetEnabled, isViewportEligible])

  return (
    <section
      id="prism-guide"
      aria-label="Prism guide"
      className={coreRouteSectionClassName}
    >
      <div className={coreRouteContainerClassName}>
        <div className="grid gap-10 rounded-[2rem] border border-white/12 bg-white/[0.03] p-6 sm:p-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-stretch lg:gap-12 lg:p-10">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <CoreSectionHeading
                eyebrow="Prism guide"
                title="Not sure where to start?"
                description="Tell Prism what you want to grow. Our AI guide can explain the options, answer questions, and point you to the clearest next step."
                titleClassName="max-w-[12ch]"
                descriptionClassName="max-w-[31rem]"
              />
              <p className="mt-6 max-w-[30rem] font-sans text-[0.94rem] leading-7 text-[#8f877b]">
                Ask about websites, search, content, dental growth, or which
                Prism offer fits.
              </p>
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="font-sans text-[0.9rem] leading-6 text-[#b8afa2]">
                The guide helps you choose. Every Growth Audit is still reviewed
                by a real person.
              </p>
            </div>
          </div>

          <div
            ref={loadBoundaryRef}
            data-home-elevenlabs-boundary
            className="flex min-h-[34rem] flex-col overflow-hidden rounded-[1.5rem] border border-white/12 bg-black/45 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-5"
          >
            <div className="flex min-h-0 flex-1">
              {shouldMountWidget ? (
                <div
                  data-home-elevenlabs-widget
                  className="min-h-0 min-w-0 flex-1 overflow-hidden rounded-xl"
                >
                  <ElevenLabsWidgetScript />
                  <ElevenLabsWidget
                    dismissible={false}
                    style={INLINE_WIDGET_STYLE}
                    testId="home-elevenlabs-widget"
                    variant="expanded"
                  />
                </div>
              ) : canOfferWidget ? (
                <div
                  data-home-elevenlabs-consent
                  className="flex flex-1 flex-col items-start justify-center px-2 py-8 sm:px-8"
                >
                  <ElevenLabsOrbMark className="h-12 w-12" />
                  <p className="mt-6 max-w-[24rem] font-sans text-[1.35rem] font-medium leading-tight tracking-[-0.035em] text-[#f5f0e8]">
                    Open the Prism Guide.
                  </p>
                  <p className="mt-3 max-w-[29rem] font-sans text-[0.9rem] leading-6 text-[#a8a092]">
                    The Prism Guide is an AI assistant. Voice and text
                    conversations may be recorded, transcribed, and processed by
                    Prism, ElevenLabs, and their model and service providers.
                  </p>
                  <p className="mt-4 max-w-[29rem] font-sans text-[0.78rem] leading-5 text-[#797165]">
                    By selecting Agree &amp; open guide and each time you
                    interact with Prism Guide, you consent to this processing
                    and agree to Prism&apos;s{' '}
                    <a
                      href="/privacy-policy"
                      className="text-[#b8afa2] underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#f5f0e8]"
                    >
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a
                      href="/terms-of-service"
                      className="text-[#b8afa2] underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#f5f0e8]"
                    >
                      Terms
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setHasAcceptedConversationTerms(true)}
                    className={`${coreSecondaryActionClassName} mt-7`}
                  >
                    Agree &amp; open guide
                  </button>
                </div>
              ) : (
                <div
                  data-home-elevenlabs-fallback
                  className="flex flex-1 flex-col items-start justify-center px-2 py-8 sm:px-8"
                >
                  <ElevenLabsOrbMark className="h-12 w-12" />
                  <p className="mt-6 max-w-[24rem] font-sans text-[1.35rem] font-medium leading-tight tracking-[-0.035em] text-[#f5f0e8]">
                    Start with a free Growth Audit.
                  </p>
                  <p className="mt-3 max-w-[27rem] font-sans text-[0.95rem] leading-7 text-[#a8a092]">
                    Share what you want to improve and Prism will point you to
                    the clearest next step.
                  </p>
                  <CoreActionLink
                    href="/get-started"
                    label="get a free growth audit"
                    location="homepage prism guide fallback"
                    variant="secondary"
                    className="mt-7"
                  >
                    Get started
                  </CoreActionLink>
                </div>
              )}
            </div>

            {shouldMountWidget ? (
              <p className="border-t border-white/10 px-1 pt-4 font-sans text-[0.72rem] leading-5 text-[#797165]">
                AI-powered by ElevenLabs. Voice and text conversations may be
                recorded, transcribed, and processed by Prism, ElevenLabs, and
                their model and service providers.{' '}
                <a
                  href="/privacy-policy"
                  className="text-[#b8afa2] underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#f5f0e8]"
                >
                  Privacy
                </a>{' '}
                ·{' '}
                <a
                  href="/terms-of-service"
                  className="text-[#b8afa2] underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#f5f0e8]"
                >
                  Terms
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
