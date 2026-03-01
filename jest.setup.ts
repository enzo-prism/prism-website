import '@testing-library/jest-dom'
import { TextDecoder as NodeTextDecoder, TextEncoder as NodeTextEncoder } from "node:util"

// Some modules (e.g. Next's server helpers) import `server-only` which throws in
// client contexts. For tests, we mock it globally so server-only utilities can be imported.
jest.mock("server-only", () => ({}), { virtual: true })

class TestHeaders {
  private readonly map = new Map<string, string>()

  constructor(init?: HeadersInit) {
    if (!init) {
      return
    }

    if (init instanceof TestHeaders) {
      for (const [key, value] of init.entries()) {
        this.set(key, value)
      }
      return
    }

    if (Array.isArray(init)) {
      for (const [key, value] of init) {
        this.set(key, value)
      }
      return
    }

    if (typeof (init as { [Symbol.iterator]?: unknown })[Symbol.iterator] === "function") {
      for (const [key, value] of init as Iterable<[string, string]>) {
        this.set(key, value)
      }
      return
    }

    for (const [key, value] of Object.entries(init)) {
      this.set(key, value)
    }
  }

  append(name: string, value: string): void {
    this.set(name, value)
  }

  delete(name: string): void {
    this.map.delete(name.toLowerCase())
  }

  entries(): IterableIterator<[string, string]> {
    return this.map.entries()
  }

  get(name: string): string | null {
    return this.map.get(name.toLowerCase()) ?? null
  }

  has(name: string): boolean {
    return this.map.has(name.toLowerCase())
  }

  set(name: string, value: string): void {
    this.map.set(name.toLowerCase(), String(value))
  }

  [Symbol.iterator](): IterableIterator<[string, string]> {
    return this.entries()
  }
}

type ReaderResult = { done: boolean; value?: Uint8Array }

function createReader(body: string): { read: () => Promise<ReaderResult> } {
  let emitted = false
  return {
    async read() {
      if (emitted) {
        return { done: true }
      }
      emitted = true
      return {
        done: false,
        value: new NodeTextEncoder().encode(body),
      }
    },
  }
}

class TestResponse {
  status: number
  headers: TestHeaders
  private readonly bodyText: string
  body: { getReader: () => { read: () => Promise<ReaderResult> } } | null

  constructor(body?: BodyInit | null, init?: ResponseInit) {
    this.status = init?.status ?? 200
    this.headers = new TestHeaders(init?.headers)
    this.bodyText = typeof body === "string" ? body : body == null ? "" : String(body)
    this.body = {
      getReader: () => createReader(this.bodyText),
    }
  }

  get ok(): boolean {
    return this.status >= 200 && this.status < 300
  }

  async json(): Promise<unknown> {
    return this.bodyText.length > 0 ? JSON.parse(this.bodyText) : {}
  }

  async text(): Promise<string> {
    return this.bodyText
  }

  static json(body: unknown, init?: ResponseInit): TestResponse {
    const headers = new TestHeaders(init?.headers)
    if (!headers.has("content-type")) {
      headers.set("content-type", "application/json")
    }
    const headerObject = Object.fromEntries(headers.entries())
    return new TestResponse(JSON.stringify(body), {
      ...init,
      headers: headerObject,
    })
  }
}

class TestRequest {
  headers: TestHeaders
  private readonly bodyText: string

  constructor(_input: string, init?: RequestInit) {
    this.headers = new TestHeaders(init?.headers)
    this.bodyText = typeof init?.body === "string" ? init.body : init?.body ? String(init.body) : ""
  }

  async json(): Promise<unknown> {
    return this.bodyText.length > 0 ? JSON.parse(this.bodyText) : {}
  }
}

if (typeof (globalThis as any).TextEncoder === "undefined") {
  ;(globalThis as any).TextEncoder = NodeTextEncoder
}
if (typeof (globalThis as any).TextDecoder === "undefined") {
  ;(globalThis as any).TextDecoder = NodeTextDecoder
}
if (typeof (globalThis as any).Headers === "undefined") {
  ;(globalThis as any).Headers = TestHeaders
}
if (typeof (globalThis as any).Request === "undefined") {
  ;(globalThis as any).Request = TestRequest
}
if (typeof (globalThis as any).Response === "undefined") {
  ;(globalThis as any).Response = TestResponse
}
if (typeof (globalThis as any).fetch === "undefined") {
  ;(globalThis as any).fetch = async () => {
    throw new Error("fetch is not implemented in the Jest environment")
  }
}
