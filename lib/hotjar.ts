// Hotjar receives fixed event names only. Never forward GA parameters, receipt
// IDs, URLs, form values, or user attributes to the session recorder.
import { IS_PRODUCTION_ENV } from './constants'
import { isInternalTraffic } from './internal-traffic'

type HotjarEvent = [command: 'event', name: string]
type Hotjar = ((...args: HotjarEvent) => void) & { q?: HotjarEvent[] }

declare global {
  interface Window {
    hj?: Hotjar
    _hjSettings?: { hjid: number; hjsv: number }
  }
}

const funnelEvents = new Set([
  'waitlist_form_start',
  'waitlist_submit_attempt',
  'waitlist_validation_error',
  'waitlist_submit_error',
  'waitlist_submit_success',
])

function canRecord() {
  return IS_PRODUCTION_ENV && typeof window !== 'undefined' &&
    ['www.design-prism.com', 'design-prism.com'].includes(window.location.hostname) &&
    !isInternalTraffic()
}

// The form may hydrate before the deferred recorder. Preserve early milestones
// using Hotjar's command queue without pulling the recorder into the first tap.
function getHotjar(): Hotjar {
  if (!window.hj) {
    const queue: HotjarEvent[] = []
    window.hj = Object.assign((...args: HotjarEvent) => {
      if (queue.length < 100) queue.push(args)
    }, { q: queue })
  }
  return window.hj
}

export function trackHotjarMilestone(event: string, step?: unknown) {
  let name = event
  if (event === 'waitlist_step_view') {
    if (step !== 'focus' && step !== 'business' && step !== 'contact') return
    name = 'waitlist_step_' + step
  } else if (!funnelEvents.has(event)) {
    return
  }
  if (canRecord()) getHotjar()('event', name)
}

export function scheduleHotjar() {
  if (!canRecord() || window._hjSettings) return
  const triggers = ['pointerdown', 'scroll', 'keydown']
  let delay: number
  let idle: number | undefined
  function load() {
    if (!canRecord() || window._hjSettings) return
    getHotjar()
    window._hjSettings = { hjid: 3698826, hjsv: 6 }
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://static.hotjar.com/c/hotjar-3698826.js?sv=6'
    document.head.appendChild(script)
  }
  function stopListening() {
    window.clearTimeout(fallback)
    triggers.forEach(trigger => window.removeEventListener(trigger, schedule))
  }
  function schedule() {
    stopListening()
    delay = window.setTimeout(() => {
      if (typeof window.requestIdleCallback === 'function') {
        idle = window.requestIdleCallback(load, { timeout: 2500 })
      } else {
        load()
      }
    }, 800)
  }
  const fallback = window.setTimeout(schedule, 12000)
  triggers.forEach(trigger => window.addEventListener(trigger, schedule, { passive: true }))
  return () => {
    stopListening()
    window.clearTimeout(delay)
    if (idle !== undefined) window.cancelIdleCallback(idle)
  }
}
