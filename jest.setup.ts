import '@testing-library/jest-dom'

// Some modules (e.g. Next's server helpers) import `server-only` which throws in
// client contexts. For tests, we mock it globally so server-only utilities can be imported.
jest.mock("server-only", () => ({}), { virtual: true })

// Jest's JSDOM env doesn't always provide the Fetch API globals that Next's server
// modules expect at import time (NextRequest extends `Request`, etc.).
// We only polyfill the symbols to unblock module evaluation; tests don't rely on full impls.
if (typeof (globalThis as any).Headers === "undefined") {
  ;(globalThis as any).Headers = class Headers {}
}
if (typeof (globalThis as any).Request === "undefined") {
  ;(globalThis as any).Request = class Request {}
}
if (typeof (globalThis as any).Response === "undefined") {
  ;(globalThis as any).Response = class Response {}
}
if (typeof (globalThis as any).fetch === "undefined") {
  ;(globalThis as any).fetch = async () => {
    throw new Error("fetch is not implemented in the Jest environment")
  }
}
