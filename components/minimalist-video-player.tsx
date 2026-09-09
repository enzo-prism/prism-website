'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { trackVideoInteraction } from '@/utils/analytics'

interface MinimalistVideoPlayerProps {
  videoId: string
  aspectRatio?: string
  thumbnailSrc: string
  className?: string
  forceMuted?: boolean
  showMuteToggle?: boolean
}

export default function MinimalistVideoPlayer({
  videoId,
  aspectRatio = '9/16',
  thumbnailSrc,
  className = '',
  forceMuted = false,
  showMuteToggle = true,
}: MinimalistVideoPlayerProps) {
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isControlsVisible, setIsControlsVisible] = useState(false)
  const [shouldLoadPlayer, setShouldLoadPlayer] = useState(false)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef(false)
  const manualPlayRef = useRef(false)
  const pendingAutoplayRef = useRef<(() => void) | null>(null)
  const mutedRef = useRef(true)
  const forceMutedRef = useRef(forceMuted)
  forceMutedRef.current = forceMuted

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (!('IntersectionObserver' in window)) {
      visibleRef.current = true
      setShouldLoadPlayer(true)
      return
    }
    const proximity = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadPlayer(true)
          proximity.disconnect()
        }
      },
      { rootMargin: '240px 0px' },
    )
    const visibility = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting
      if (entry.isIntersecting) pendingAutoplayRef.current?.()
      if (!entry.isIntersecting) playerRef.current?.pause().catch(() => void 0)
    })
    proximity.observe(container)
    visibility.observe(container)
    return () => {
      proximity.disconnect()
      visibility.disconnect()
    }
  }, [])

  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.hidden) playerRef.current?.pause().catch(() => void 0)
      else pendingAutoplayRef.current?.()
    }
    document.addEventListener('visibilitychange', pauseWhenHidden)
    return () =>
      document.removeEventListener('visibilitychange', pauseWhenHidden)
  }, [])

  useEffect(() => {
    if (!shouldLoadPlayer || !containerRef.current) return
    let disposed = false
    let failed = false
    let player: any = null
    let script: HTMLScriptElement | null = null
    let timeout: ReturnType<typeof setTimeout>
    setIsVideoReady(false)
    setIsPlaying(false)
    setError(false)
    // Each selection owns a separate mount so a late Vimeo response cannot
    // replace the currently selected clip or remove the next player's iframe.
    const mount = document.createElement('div')
    containerRef.current.appendChild(mount)
    const fail = () => {
      if (disposed || failed) return
      failed = true
      pendingAutoplayRef.current = null
      player?.pause().catch(() => void 0)
      clearTimeout(timeout)
      setError(true)
      setIsPlaying(false)
    }
    const initialize = () => {
      if (disposed || failed || player) return
      if (!window.Vimeo) {
        fail()
        return
      }
      try {
        player = new window.Vimeo.Player(mount, {
          id: videoId,
          autopause: true,
          autoplay: false,
          background: false,
          controls: false,
          dnt: true,
          muted: true,
          responsive: true,
          loop: true,
          playsinline: true,
        })
        playerRef.current = player
        const progress = new Set<number>()
        player.on('play', () => {
          if (disposed) return
          if (failed || !visibleRef.current || document.hidden) {
            player.pause().catch(() => void 0)
            return
          }
          setIsPlaying(true)
        })
        player.on('pause', () => {
          if (!disposed) setIsPlaying(false)
        })
        player.on('error', fail)
        player.on('ended', () => {
          if (!disposed) {
            setIsPlaying(false)
            trackVideoInteraction(videoId, 'complete', 'Video completed')
          }
        })
        player.on('volumechange', ({ volume }: { volume: number }) => {
          if (disposed) return
          if (forceMutedRef.current && volume !== 0)
            player.setVolume(0).catch(() => void 0)
          mutedRef.current = forceMutedRef.current || volume === 0
          setIsMuted(mutedRef.current)
        })
        player.on('timeupdate', ({ percent }: { percent: number }) => {
          if (disposed) return
          for (const milestone of [25, 50, 75]) {
            if (percent * 100 >= milestone && !progress.has(milestone)) {
              progress.add(milestone)
              trackVideoInteraction(
                videoId,
                `progress_${milestone}`,
                `Video ${milestone}% complete`,
              )
            }
          }
        })
        player
          .ready()
          .then(async () => {
            if (disposed || failed) return
            clearTimeout(timeout)
            setError(false)
            setIsVideoReady(true)
            await player.setVolume(
              forceMutedRef.current || mutedRef.current ? 0 : 1,
            )
            if (disposed || failed) return
            const reducedMotion = window.matchMedia?.(
              '(prefers-reduced-motion: reduce)',
            ).matches
            const saveData = (
              navigator as Navigator & { connection?: { saveData?: boolean } }
            ).connection?.saveData
            const shouldPlay =
              manualPlayRef.current || (!reducedMotion && !saveData)
            manualPlayRef.current = false
            if (shouldPlay) {
              pendingAutoplayRef.current = () => {
                if (
                  disposed ||
                  failed ||
                  !visibleRef.current ||
                  document.hidden
                )
                  return
                pendingAutoplayRef.current = null
                void player.play().catch(() => {
                  if (!disposed) setIsPlaying(false)
                })
              }
              pendingAutoplayRef.current()
            }
          })
          .catch(fail)
      } catch {
        fail()
      }
    }
    const scriptFailed = () => {
      script?.remove()
      fail()
    }
    timeout = setTimeout(() => {
      if (!window.Vimeo) script?.remove()
      fail()
    }, 20000)
    if (window.Vimeo) initialize()
    else {
      script = document.getElementById(
        'vimeo-player-api',
      ) as HTMLScriptElement | null
      const isNew = !script
      if (!script) {
        script = document.createElement('script')
        script.id = 'vimeo-player-api'
        script.src = 'https://player.vimeo.com/api/player.js'
        script.async = true
      }
      script.addEventListener('load', initialize)
      script.addEventListener('error', scriptFailed)
      if (isNew) document.body.appendChild(script)
    }
    return () => {
      disposed = true
      pendingAutoplayRef.current = null
      clearTimeout(timeout)
      script?.removeEventListener('load', initialize)
      script?.removeEventListener('error', scriptFailed)
      if (playerRef.current === player) playerRef.current = null
      player?.destroy()?.catch?.(() => void 0)
      mount.remove()
    }
  }, [shouldLoadPlayer, videoId, attempt])

  useEffect(() => {
    if (forceMuted) {
      mutedRef.current = true
      setIsMuted(true)
      playerRef.current?.setVolume(0).catch(() => void 0)
    }
  }, [forceMuted])

  const togglePlay = async () => {
    const player = playerRef.current
    if (error || !player || !isVideoReady) {
      manualPlayRef.current = true
      setShouldLoadPlayer(true)
      if (error) setAttempt((value) => value + 1)
      return
    }
    try {
      if (isPlaying) await player.pause()
      else await player.play()
      trackVideoInteraction(
        videoId,
        isPlaying ? 'pause' : 'play',
        isPlaying ? 'Video paused' : 'Video played',
      )
    } catch {
      setIsPlaying(false)
      setError(true)
    }
  }
  const toggleMute = async () => {
    if (forceMuted || !showMuteToggle) return
    try {
      await playerRef.current?.setVolume(isMuted ? 1 : 0)
      mutedRef.current = !isMuted
      setIsMuted(!isMuted)
    } catch {
      /* Leave the current mute state unchanged on failure. */
    }
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-md ${className}`}
      style={{ aspectRatio }}
      onMouseEnter={() => setIsControlsVisible(true)}
      onMouseMove={() => setIsControlsVisible(true)}
      onMouseLeave={() => setIsControlsVisible(false)}
      onTouchStart={() => setIsControlsVisible(true)}
    >
      {!isVideoReady && (
        <div className="pointer-events-none absolute inset-0 z-10 bg-black">
          <Image
            src={thumbnailSrc || '/placeholder.svg'}
            alt="Video thumbnail"
            fill
            sizes="(max-width: 640px) 100vw, 448px"
            className="object-cover"
          />
        </div>
      )}
      <noscript>
        <a
          href={`https://vimeo.com/${videoId}`}
          className="absolute inset-x-0 top-0 z-20 bg-black/70 p-4 text-sm text-white underline"
        >
          Watch video on Vimeo
        </a>
      </noscript>
      <div ref={containerRef} className="h-full w-full" />
      {error && (
        <p
          role="status"
          className="absolute inset-x-0 top-0 z-20 bg-black/70 p-4 text-sm text-white"
        >
          Video could not load. Try again or{' '}
          <a
            href={`https://vimeo.com/${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            watch on Vimeo
          </a>
          .
        </p>
      )}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 flex items-center ${showMuteToggle && !forceMuted ? 'justify-between' : 'justify-start'} p-4 transition-opacity duration-300 focus-within:opacity-100 ${isControlsVisible || !isPlaying || error ? 'opacity-100' : 'opacity-0'}`}
      >
        <button
          type="button"
          onClick={togglePlay}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          aria-label={error ? 'Retry video' : isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </button>
        {showMuteToggle && !forceMuted && isVideoReady && (
          <button
            type="button"
            onClick={toggleMute}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}
