'use client'

import {
  animate as animateValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'

import type { HomepageClientWinSlide } from '@/components/home/homepage-content'
import { useMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { trackCTAClick } from '@/utils/analytics'

// --- Motion tokens (one easing curve everywhere; transform/opacity only) ----
// A confident takeoff and a long, quiet landing — never bouncy. The deck is
// one physical object: still at rest, input-led, weighty when it does move.
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const T_ENTER = { duration: 0.78, ease: EASE } // one-time deck fan-open
const T_REORDER = { duration: 0.46, ease: EASE } // bring a card to the front
const T_LIFT = { duration: 0.22, ease: EASE } // hover / focus pick-up
const T_SETTLE = { duration: 0.34, ease: EASE } // hover release, gentle settle
const T_PRESS = { duration: 0.1, ease: EASE } // immediate press feedback
const DRAG_RETURN = { type: 'spring' as const, stiffness: 300, damping: 34, mass: 0.85 }
const STAGGER = 0.058 // back-to-front entrance sequencing
const CARD_ASPECT = 3 / 4
const DEPTH_DESKTOP = 3 // visible depth layers each side (fine pointer)
const DEPTH_TOUCH = 2 // fewer cards composite on phones
const SWIPE_THRESHOLD = 44

type CardGeometry = {
  x: number
  y: number
  z: number
  rotateY: number
  rotateZ: number
  scale: number
  opacity: number
  zIndex: number
  brightness: number
  pointer: boolean
}

/** Resting fan: active cover flat & forward, neighbours cascade diagonally. */
function fanGeometry(
  offset: number,
  cardWidth: number,
  maxVisible: number,
  compact: boolean,
): CardGeometry {
  const abs = Math.abs(offset)
  const sign = Math.sign(offset)
  const beyond = abs > maxVisible
  // Tighter fan on phones: neighbours peek rather than fan wide (there is no
  // hover to reveal them on touch, and a wide fan eats the swipe runway).
  const spread = cardWidth * (compact ? 0.34 : 0.46)
  const stepX = cardWidth * (compact ? 0.1 : 0.16)
  const rotMax = compact ? 30 : 42
  const rotPer = compact ? 12 : 15

  return {
    x: offset === 0 ? 0 : sign * (spread + (abs - 1) * stepX),
    y: offset * (cardWidth * (compact ? 0.1 : 0.12)),
    z: -abs * 180,
    rotateY: offset === 0 ? 0 : Math.max(-rotMax, Math.min(rotMax, -offset * rotPer)),
    rotateZ: Math.max(-13, Math.min(13, offset * (compact ? 3 : 4))),
    scale: Math.max(0.56, 1 - abs * 0.13),
    opacity: beyond ? 0 : Math.max(0.45, 1 - abs * 0.11),
    zIndex: 50 - abs,
    brightness: offset === 0 ? 1 : Math.max(0.68, 1 - abs * 0.1),
    pointer: !beyond,
  }
}

/** Compressed starting stack the deck fans open from on first reveal. */
function stackGeometry(
  offset: number,
  cardWidth: number,
  maxVisible: number,
): CardGeometry {
  const abs = Math.abs(offset)
  const sign = Math.sign(offset)
  const beyond = abs > maxVisible

  return {
    x: sign * Math.min(abs, 4) * 9,
    y: abs * 5,
    z: -abs * 46,
    rotateY: 0,
    rotateZ: Math.max(-6, Math.min(6, offset * 1.6)),
    scale: Math.max(0.82, 1 - abs * 0.035),
    opacity: beyond ? 0 : 1,
    zIndex: 50 - abs,
    brightness: offset === 0 ? 1 : Math.max(0.82, 1 - abs * 0.04),
    pointer: false,
  }
}

// Rear cards begin first; the front (focal) cover settles last.
function entranceDelay(offset: number, maxVisible: number) {
  return (maxVisible - Math.min(Math.abs(offset), maxVisible)) * STAGGER
}

function wrapOffset(rawOffset: number, count: number) {
  let offset = rawOffset
  if (offset > count / 2) offset -= count
  else if (offset < -count / 2) offset += count
  return offset
}

type HomeClientCoverFlowProps = {
  slides: readonly HomepageClientWinSlide[]
}

export default function HomeClientCoverFlow({
  slides,
}: HomeClientCoverFlowProps) {
  const reduceMotion = useReducedMotion()
  // Input capability, not viewport width: hover/tilt/parallax are meaningless
  // without a fine pointer. SSR-safe (false until hydrated → matches server).
  const isTouch = useMobile('(hover: none), (pointer: coarse)')
  const count = slides.length
  const maxVisible = isTouch ? DEPTH_TOUCH : DEPTH_DESKTOP

  const sceneRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef<{ x: number; y: number; id: number } | null>(null)
  const draggingRef = useRef(false)
  const draggedRef = useRef(false)
  const lastMoveRef = useRef<{ x: number; t: number } | null>(null)
  const velocityRef = useRef(0) // px / ms, signed (negative = leftward)

  const [activeIndex, setActiveIndex] = useState(0)
  const [cardWidth, setCardWidth] = useState(264)
  const [compact, setCompact] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [pressedIndex, setPressedIndex] = useState<number | null>(null)
  const [entered, setEntered] = useState(true)
  const [settled, setSettled] = useState(true)
  // Defer the reduced-motion branch until after mount so the first client
  // render matches the server (no hydration mismatch).
  const [mounted, setMounted] = useState(false)

  // --- Shared scene camera (damped pointer parallax; fine pointer only) ------
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 90, damping: 18, mass: 0.5 })
  const springY = useSpring(pointerY, { stiffness: 90, damping: 18, mass: 0.5 })
  const deckRotateY = useTransform(springX, [-1, 1], [2, -2])
  const deckRotateX = useTransform(springY, [-1, 1], [-1.6, 1.6])
  const deckTranslateX = useTransform(springX, [-1, 1], [-9, 9])
  const deckTranslateY = useTransform(springY, [-1, 1], [-5, 5])

  // --- Hovered-card tilt toward the pointer (≤1.5°) -------------------------
  const tiltRawX = useMotionValue(0)
  const tiltRawY = useMotionValue(0)
  const tiltX = useSpring(tiltRawX, { stiffness: 150, damping: 18, mass: 0.4 })
  const tiltY = useSpring(tiltRawY, { stiffness: 150, damping: 18, mass: 0.4 })

  // --- Direct-manipulation drag (1:1 while held, inertia on release) --------
  const dragX = useMotionValue(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Measure the stage so card size + spread scale with the viewport. On narrow
  // phones the focal card grows and the fan tightens for real presence.
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || typeof ResizeObserver === 'undefined') return

    const measure = () => {
      const w = scene.clientWidth
      const narrow = w < 480
      const next = Math.round(
        Math.min(Math.max(w * (narrow ? 0.6 : 0.42), narrow ? 200 : 168), 384),
      )
      setCardWidth(next)
      setCompact(narrow)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(scene)
    return () => observer.disconnect()
  }, [])

  // First-reveal choreography: collapse below the fold, fan open on scroll-in.
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || reduceMotion) return
    if (typeof IntersectionObserver === 'undefined') return

    const rect = scene.getBoundingClientRect()
    const viewportH = window.innerHeight || 0
    if (rect.top < viewportH * 0.85) return // already visible — skip entrance

    setEntered(false)
    setSettled(false)
    let settleTimer = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setEntered(true)
          observer.disconnect()
          settleTimer = window.setTimeout(
            () => setSettled(true),
            780 + DEPTH_DESKTOP * STAGGER * 1000 + 140,
          )
        }
      },
      { threshold: 0.22 },
    )
    observer.observe(scene)
    return () => {
      observer.disconnect()
      if (settleTimer) window.clearTimeout(settleTimer)
    }
  }, [reduceMotion])

  const goTo = useCallback(
    (next: number) => {
      setActiveIndex(((next % count) + count) % count)
    },
    [count],
  )

  const step = useCallback(
    (direction: 1 | -1) => {
      goTo(activeIndex + direction)
    },
    [activeIndex, goTo],
  )

  const updateParallax = useCallback(
    (clientX: number, clientY: number) => {
      const scene = sceneRef.current
      if (!scene) return
      const rect = scene.getBoundingClientRect()
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((clientY - rect.top) / rect.height) * 2 - 1
      pointerX.set(Math.max(-1, Math.min(1, nx)))
      pointerY.set(Math.max(-1, Math.min(1, ny)))
    },
    [pointerX, pointerY],
  )

  const resetCamera = useCallback(() => {
    pointerX.set(0)
    pointerY.set(0)
  }, [pointerX, pointerY])

  // --- Scene pointer: parallax (fine pointer) until a horizontal drag wins ---
  const handleScenePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      // Ignore secondary pointers (a second finger or a palm) so they can't
      // hijack an in-flight drag and strand the deck off-centre.
      if (
        draggingRef.current ||
        dragStartRef.current ||
        event.isPrimary === false
      ) {
        return
      }
      dragStartRef.current = {
        x: event.clientX,
        y: event.clientY,
        id: event.pointerId,
      }
      lastMoveRef.current = { x: event.clientX, t: event.timeStamp }
      velocityRef.current = 0
      draggingRef.current = false
      draggedRef.current = false
    },
    [],
  )

  const handleScenePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const start = dragStartRef.current
      if (start && start.id === event.pointerId) {
        const dx = event.clientX - start.x
        const dy = event.clientY - start.y
        // Slightly larger slop + angle bias so a near-vertical scroll never
        // grabs the deck.
        if (
          !draggingRef.current &&
          Math.abs(dx) > 10 &&
          Math.abs(dx) > Math.abs(dy) * 1.2
        ) {
          draggingRef.current = true
          draggedRef.current = true
          // Capture so move/up are delivered even if the finger leaves the
          // scene bounds or crosses the edge feathers.
          try {
            sceneRef.current?.setPointerCapture(event.pointerId)
          } catch {
            /* invalid pointer — ignore */
          }
          // The deck is being handled directly — drop hover/tilt + camera.
          setHoveredIndex(null)
          setPressedIndex(null)
          tiltRawX.set(0)
          tiltRawY.set(0)
          resetCamera()
        }
        if (draggingRef.current) {
          const last = lastMoveRef.current
          if (last) {
            const dt = event.timeStamp - last.t
            if (dt > 0) velocityRef.current = (event.clientX - last.x) / dt
          }
          lastMoveRef.current = { x: event.clientX, t: event.timeStamp }
          dragX.set(dx)
          return
        }
      }
      if (!isTouch) updateParallax(event.clientX, event.clientY)
    },
    [dragX, isTouch, resetCamera, tiltRawX, tiltRawY, updateParallax],
  )

  // `commit` distinguishes a real release (advance the deck) from an aborted
  // gesture (pointercancel / OS takeover) which must snap back without moving.
  const finishDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>, commit: boolean) => {
      const start = dragStartRef.current
      // Only the pointer that owns the active gesture may end it — a stray
      // second-finger up must not disturb the in-flight drag.
      if (!start || start.id !== event.pointerId) return
      dragStartRef.current = null
      if (draggingRef.current) {
        try {
          sceneRef.current?.releasePointerCapture(event.pointerId)
        } catch {
          /* not captured — ignore */
        }
        if (commit) {
          const dx = event.clientX - start.x
          const v = velocityRef.current
          const isFlick = Math.abs(v) > 0.5
          let steps = 0
          if (isFlick) {
            // A genuine flick can travel multiple cards (capped).
            steps =
              Math.sign(-v) *
              Math.min(1 + Math.round(Math.abs(dx) / (cardWidth * 1.1)), 3)
          } else if (Math.abs(dx) > SWIPE_THRESHOLD) {
            // A deliberate drag past threshold = one card per card-width.
            steps =
              Math.sign(-dx) * Math.max(1, Math.round(Math.abs(dx) / cardWidth))
          }
          steps = Math.max(-3, Math.min(3, steps))
          // On touch a casual swipe always moves exactly one card.
          if (isTouch && !isFlick) steps = Math.max(-1, Math.min(1, steps))
          if (steps !== 0) goTo(activeIndex + steps)
        }
        animateValue(dragX, 0, DRAG_RETURN)
      }
      draggingRef.current = false
    },
    [activeIndex, cardWidth, dragX, goTo, isTouch],
  )

  const handleScenePointerLeave = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      resetCamera()
      if (draggingRef.current) finishDrag(event, true)
    },
    [finishDrag, resetCamera],
  )

  const handleStageKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        step(1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        step(-1)
      } else if (event.key === 'Home') {
        event.preventDefault()
        goTo(0)
      } else if (event.key === 'End') {
        event.preventDefault()
        goTo(count - 1)
      }
    },
    [step, goTo, count],
  )

  // --- Per-card pointer: hover lift + tilt + press (fine pointer only) -------
  const handleCardEnter = useCallback(
    (index: number, event: ReactPointerEvent<HTMLElement>) => {
      // Never lift on a touch contact (tap), even on hybrid devices where the
      // matching pointerleave may never fire and would leave a card stuck up.
      if (draggingRef.current || event.pointerType === 'touch') return
      setHoveredIndex(index)
    },
    [],
  )

  const handleCardLeave = useCallback(
    (index: number) => {
      setHoveredIndex((current) => (current === index ? null : current))
      setPressedIndex((current) => (current === index ? null : current))
      tiltRawX.set(0)
      tiltRawY.set(0)
    },
    [tiltRawX, tiltRawY],
  )

  const handleCardTilt = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (draggingRef.current) return
      const rect = event.currentTarget.getBoundingClientRect()
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1
      tiltRawX.set(Math.max(-1, Math.min(1, ny)) * -1.4)
      tiltRawY.set(Math.max(-1, Math.min(1, nx)) * 1.4)
    },
    [tiltRawX, tiltRawY],
  )

  const handleCardFocus = useCallback((index: number) => {
    // Keyboard focus reproduces the lift + separation, without pointer tilt.
    setHoveredIndex(index)
  }, [])

  const handleCardBlur = useCallback(
    (index: number, event: ReactFocusEvent<HTMLElement>) => {
      if (event.currentTarget.contains(event.relatedTarget as Node)) return
      setHoveredIndex((current) => (current === index ? null : current))
    },
    [],
  )

  const handleCardClick = useCallback(
    (
      event: ReactMouseEvent<HTMLAnchorElement>,
      index: number,
      company: string,
    ) => {
      if (draggedRef.current) {
        event.preventDefault()
        draggedRef.current = false
        return
      }
      if (index !== activeIndex) {
        event.preventDefault()
        goTo(index)
        return
      }
      trackCTAClick(`view ${company} case study`, 'homepage client cover flow')
    },
    [activeIndex, goTo],
  )

  const activeSlide = slides[activeIndex]

  if (mounted && reduceMotion) {
    return <CoverFlowStaticFallback slides={slides} />
  }

  const cardHeight = Math.round(cardWidth / CARD_ASPECT)
  const stageHeight = Math.round(cardHeight * (compact ? 1.18 : 1.3))
  const hoveredOffset =
    hoveredIndex === null ? null : wrapOffset(hoveredIndex - activeIndex, count)

  return (
    <div
      className="relative"
      role="group"
      aria-roledescription="carousel"
      aria-label="Client websites built with Prism"
    >
      <div className="sr-only" aria-live="polite">
        {`${activeSlide.company}, ${activeSlide.location}. ${activeIndex + 1} of ${count}.`}
      </div>

      <div
        ref={sceneRef}
        className="relative w-full select-none overflow-hidden [perspective:1700px] [perspective-origin:50%_44%] [touch-action:pan-y_pinch-zoom]"
        style={{ height: stageHeight }}
        onPointerDown={handleScenePointerDown}
        onPointerMove={handleScenePointerMove}
        onPointerUp={(event) => finishDrag(event, true)}
        onPointerCancel={(event) => finishDrag(event, false)}
        onPointerLeave={handleScenePointerLeave}
        onKeyDown={handleStageKeyDown}
      >
        {/* deck — drag translation */}
        <motion.div
          className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
          style={{ x: dragX, width: 0, height: 0 }}
        >
          {/* deck — shared damped camera (one rotation for the whole scene) */}
          <motion.div
            className="[transform-style:preserve-3d]"
            style={{
              rotateX: deckRotateX,
              rotateY: deckRotateY,
              x: deckTranslateX,
              y: deckTranslateY,
            }}
          >
            {slides.map((slide, index) => {
              const offset = wrapOffset(index - activeIndex, count)
              // Mount only the visible window plus a one-card buffer ring (kept
              // at opacity 0 for smooth reorders); far covers are unmounted to
              // cut compositor layers + image decodes — most on phones where
              // maxVisible is 2.
              if (Math.abs(offset) > maxVisible + 1) return null
              const base = entered
                ? fanGeometry(offset, cardWidth, maxVisible, compact)
                : stackGeometry(offset, cardWidth, maxVisible)
              const isActive = index === activeIndex
              const isHovered = hoveredIndex === index
              const isPressed = pressedIndex === index
              const hidden = Math.abs(offset) > maxVisible

              // Neighbours yield away from the lifted card; a hover changes the
              // relationship between objects, not just the hovered one.
              let yieldX = 0
              let brightness = base.brightness
              if (hoveredOffset !== null && !hidden && !isHovered) {
                const dir = Math.sign(offset - hoveredOffset) || 1
                yieldX = dir * 9
                brightness = Math.max(0.4, brightness - 0.14)
              }
              const dimOpacity = Math.min(0.62, Math.max(0, 1 - brightness))

              const posTransition = !settled
                ? { ...T_ENTER, delay: entranceDelay(offset, maxVisible) }
                : hoveredOffset !== null
                  ? T_LIFT
                  : T_REORDER

              return (
                <motion.div
                  key={`${slide.href}-${slide.company}`}
                  className="absolute [backface-visibility:hidden] [transform-style:preserve-3d]"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${count}`}
                  // Only the active slide is exposed to assistive tech; the
                  // decorative neighbour covers reorder on tap (a pointer
                  // enhancement) and would otherwise announce as misleading
                  // "links". Keyboard/AT users navigate via the dots + arrows.
                  aria-hidden={isActive ? undefined : true}
                  animate={{
                    x: base.x + yieldX,
                    y: base.y,
                    z: base.z,
                    rotateY: base.rotateY,
                    rotateZ: base.rotateZ,
                    scale: base.scale,
                    opacity: base.opacity,
                  }}
                  transition={posTransition}
                  style={
                    {
                      width: cardWidth,
                      height: cardHeight,
                      marginLeft: -cardWidth / 2,
                      marginTop: -cardHeight / 2,
                      zIndex: base.zIndex,
                      pointerEvents: base.pointer ? 'auto' : 'none',
                      willChange: isActive || isHovered ? 'transform' : 'auto',
                    } as CSSProperties
                  }
                >
                  {/* tilt — hover/press lift (fine pointer); inert on touch */}
                  <motion.div
                    className="relative h-full w-full [transform-style:preserve-3d]"
                    animate={
                      isPressed
                        ? { y: 0, z: 0, scale: 0.985 }
                        : isHovered
                          ? { y: -10, z: 34, scale: 1.018 }
                          : { y: 0, z: 0, scale: 1 }
                    }
                    transition={
                      isPressed ? T_PRESS : isHovered ? T_LIFT : T_SETTLE
                    }
                    style={isHovered ? { rotateX: tiltX, rotateY: tiltY } : undefined}
                    onPointerEnter={
                      isTouch ? undefined : (event) => handleCardEnter(index, event)
                    }
                    onPointerLeave={isTouch ? undefined : () => handleCardLeave(index)}
                    onPointerMove={
                      !isTouch && isHovered ? handleCardTilt : undefined
                    }
                    onPointerDown={
                      isTouch
                        ? undefined
                        : (event) => {
                            // Mouse only — a pen can hover away without a
                            // pointerup and would otherwise stick "pressed".
                            if (event.pointerType === 'mouse') setPressedIndex(index)
                          }
                    }
                    onPointerUp={
                      isTouch
                        ? undefined
                        : () =>
                            setPressedIndex((current) =>
                              current === index ? null : current,
                            )
                    }
                    onPointerCancel={
                      isTouch
                        ? undefined
                        : () => {
                            setPressedIndex((current) =>
                              current === index ? null : current,
                            )
                            handleCardLeave(index)
                          }
                    }
                  >
                    {/* contact shadow — one fixed light direction. On touch a
                        single static, low-radius shadow (no animated blur). */}
                    {isTouch ? (
                      isActive ? (
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-x-2 -bottom-2 top-6 rounded-[1.6rem] bg-black/55 blur-lg"
                        />
                      ) : null
                    ) : (
                      <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-1 bottom-[-14px] top-4 rounded-[1.7rem] bg-black/80 blur-2xl"
                        style={{ z: -2 }}
                        animate={{
                          opacity: isHovered ? 0.9 : isActive ? 0.62 : 0.34,
                        }}
                        transition={isHovered ? T_LIFT : T_SETTLE}
                      />
                    )}

                    <Link
                      href={slide.href}
                      prefetch={false}
                      tabIndex={isActive ? 0 : -1}
                      aria-hidden={!base.pointer}
                      aria-label={
                        isActive
                          ? `Open the ${slide.company} case study`
                          : `Bring ${slide.company} to the front (${index + 1} of ${count})`
                      }
                      draggable={false}
                      onClick={(event) =>
                        handleCardClick(event, index, slide.company)
                      }
                      onFocus={() => handleCardFocus(index)}
                      onBlur={(event) => handleCardBlur(index, event)}
                      className={cn(
                        'group/cover relative block h-full w-full overflow-hidden rounded-[1.4rem] border bg-[#0c0c0b] outline-none',
                        'transition-[border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                        'focus-visible:ring-2 focus-visible:ring-[#d8bc79]/55 focus-visible:ring-offset-4 focus-visible:ring-offset-black',
                        isActive
                          ? 'border-[#d8bc79]/45'
                          : isHovered
                            ? 'border-white/25'
                            : 'border-white/10',
                      )}
                    >
                      <Image
                        src={slide.image}
                        alt={`${slide.company} website built by Prism`}
                        fill
                        draggable={false}
                        sizes="(max-width: 640px) 62vw, 360px"
                        className="object-cover object-top"
                      />

                      {/* Depth dim — animates OPACITY only (no CSS filter) */}
                      <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-black"
                        animate={{ opacity: dimOpacity }}
                        transition={hoveredOffset !== null ? T_LIFT : T_REORDER}
                      />

                      {/* Top sheen — one fixed light direction */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.14),transparent_28%)]"
                      />

                      {isActive ? (
                        <>
                          {/* Top scrim so the context pill stays legible over
                              text-dense covers (one fixed light direction). */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-[linear-gradient(180deg,rgba(0,0,0,0.6),transparent)]"
                          />
                          <div className="pointer-events-none absolute inset-x-0 top-0 p-3">
                            <span
                              className={cn(
                                'inline-flex items-center rounded-full border border-white/16 px-2.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-[#e7e0d4]',
                                isTouch ? 'bg-black/70' : 'bg-black/50 backdrop-blur-sm',
                              )}
                            >
                              {slide.contextLabel}
                            </span>
                          </div>
                          {/* On touch the on-card CTA is dropped (it wraps in a
                              narrow card and duplicates the caption link). */}
                          {!isTouch ? (
                            <>
                              <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.78))]"
                              />
                              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3.5">
                                <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#d8bc79]/40 bg-black/55 px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#f5f0e8] backdrop-blur-sm">
                                  View case study
                                  <ArrowUpRight
                                    className="h-3 w-3 text-[#d8bc79]"
                                    strokeWidth={2}
                                  />
                                </span>
                              </div>
                            </>
                          ) : (
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.6))]"
                            />
                          )}
                        </>
                      ) : null}
                    </Link>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Feather the deck into the page at both edges. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-[60] w-10 bg-gradient-to-r from-black to-transparent sm:w-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-[60] w-10 bg-gradient-to-l from-black to-transparent sm:w-20"
        />
      </div>

      {/* Active client caption + dedicated case-study link. */}
      <div className="mt-4 flex flex-col gap-5 sm:mt-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-h-[3.5rem]">
          <p className="font-sans text-[1.45rem] font-medium leading-none tracking-[-0.025em] text-[#f5f0e8] sm:text-[1.75rem]">
            {activeSlide.company}
          </p>
          <p className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b8afa2]">
            <span className="text-[#d8d0c5]">{activeSlide.contextLabel}</span>
            <span aria-hidden="true" className="text-white/20">
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin
                aria-hidden="true"
                className="h-3 w-3 text-[#d8bc79]"
                strokeWidth={2}
              />
              {activeSlide.location}
            </span>
            <span aria-hidden="true" className="text-white/20">
              ·
            </span>
            <Link
              href={activeSlide.href}
              prefetch={false}
              onClick={() =>
                trackCTAClick(
                  `view ${activeSlide.company} case study`,
                  'homepage client cover flow caption',
                )
              }
              className="group inline-flex items-center gap-1.5 text-[#b8afa2] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#f5f0e8] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/35 focus-visible:ring-offset-4 focus-visible:ring-offset-black motion-reduce:transition-none"
            >
              View case study
              <ArrowUpRight
                aria-hidden="true"
                className="h-3 w-3 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </Link>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8f877b] tabular-nums">
            <span className="text-[#f5f0e8]">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="mx-1 text-white/25">/</span>
            {String(count).padStart(2, '0')}
          </span>
          <div className="flex gap-2">
            <CoverFlowButton direction="left" onClick={() => step(-1)} />
            <CoverFlowButton direction="right" onClick={() => step(1)} />
          </div>
        </div>
      </div>

      {/* Progress dots double as direct navigation. A plain labelled button
          group (not a tablist) so the semantics match the behaviour, with
          invisible 44px touch targets over the 6px visual dots. */}
      <div
        className="mt-5 flex flex-wrap items-center gap-1.5"
        role="group"
        aria-label="Choose a client"
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex
          return (
            <button
              key={`dot-${slide.href}`}
              type="button"
              aria-label={`Show ${slide.company}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => goTo(index)}
              className={cn(
                // 44px-tall hit area, width matched to the ~12px dot spacing so
                // a neighbour's target never paints over this dot's centre
                // (11 close dots can't each be 44px wide). The well-spaced 44px
                // prev/next arrows are the WCAG-equivalent precise control.
                "relative h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] before:absolute before:left-1/2 before:top-1/2 before:h-11 before:w-5 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                isActive
                  ? 'w-7 bg-gradient-to-r from-[#d8bc79] to-[#f5f0e8]'
                  : 'w-1.5 bg-white/20 hover:bg-white/40',
              )}
            />
          )
        })}
      </div>
    </div>
  )
}

type CoverFlowButtonProps = {
  direction: 'left' | 'right'
  onClick: () => void
}

function CoverFlowButton({ direction, onClick }: CoverFlowButtonProps) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      aria-label={direction === 'left' ? 'Show previous client' : 'Show next client'}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] text-[#c9c1b6] transition-[transform,border-color,background-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#d8bc79]/45 hover:bg-white/[0.07] hover:text-[#f5f0e8] hover:shadow-[0_18px_42px_-28px_rgba(216,188,121,0.55)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/35 focus-visible:ring-offset-4 focus-visible:ring-offset-black active:translate-y-0 motion-reduce:transition-none"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  )
}

function CoverFlowStaticFallback({
  slides,
}: {
  slides: readonly HomepageClientWinSlide[]
}) {
  return (
    <div
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-1 pb-2 scrollbar-hide"
      role="list"
      aria-label="Client websites built with Prism"
    >
      {slides.map((slide) => (
        <Link
          key={`${slide.href}-${slide.company}`}
          href={slide.href}
          prefetch={false}
          role="listitem"
          aria-label={`Open the ${slide.company} case study`}
          className="group/cover relative block w-[62vw] max-w-[15rem] shrink-0 snap-start overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#0c0c0b] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/45 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
        >
          <div className="relative aspect-[3/4]">
            <Image
              src={slide.image}
              alt={`${slide.company} website built by Prism`}
              fill
              sizes="(max-width: 640px) 62vw, 240px"
              className="object-cover object-top"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.82))]"
            />
            <div className="absolute inset-x-0 bottom-0 p-3.5">
              <p className="font-sans text-[0.95rem] font-medium leading-tight text-[#f5f0e8]">
                {slide.company}
              </p>
              <p className="mt-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#b8afa2]">
                {slide.location}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
