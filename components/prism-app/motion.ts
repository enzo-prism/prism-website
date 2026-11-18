/**
 * Small motion helpers shared by the /app islands. Everything here is a
 * progressive enhancement: callers check `motionAllowed()` first, so
 * reduced-motion, no-JS and screenshot runs keep the finished frame.
 */

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'

const canMatchMedia = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'

/** True in the browser unless the visitor asked for reduced motion. */
export const motionAllowed = () =>
  canMatchMedia() && !window.matchMedia(REDUCED_QUERY).matches

/** True for a mouse or trackpad, where pointer-driven depth makes sense. */
export const finePointer = () =>
  canMatchMedia() && window.matchMedia(FINE_POINTER_QUERY).matches

export function subscribeToMotion(onChange: () => void) {
  if (!canMatchMedia()) return () => {}
  const query = window.matchMedia(REDUCED_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

/**
 * Counts a `[data-count]` node up from zero to its value. The server HTML
 * already holds the final number, so the count only ever replays a value
 * that is true.
 */
export function runCount(node: HTMLElement, duration = 900) {
  const target = Number(node.dataset.count)
  if (!Number.isFinite(target)) return
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - (1 - t) ** 3
    node.textContent = Math.round(target * eased).toLocaleString('en-US')
    if (t < 1) requestAnimationFrame(step)
  }
  node.textContent = '0'
  requestAnimationFrame(step)
}

export function runCounts(root: ParentNode, duration?: number) {
  root
    .querySelectorAll<HTMLElement>('[data-count]')
    .forEach((node) => runCount(node, duration))
}
