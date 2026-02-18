import { act, render, screen, waitFor } from "@testing-library/react"

import ASCIIAnimation from "@/components/ascii/AsciiAnimation"

type ResponseController = {
  promise: Promise<Response>
  resolve: (response: Response) => void
  reject: (error: unknown) => void
}

function makeMockResponse(
  body: string,
  options: { ok?: boolean; status?: number } = {},
): Response {
  const status = options.status ?? (options.ok === false ? 500 : 200)
  return {
    ok: options.ok ?? true,
    status,
    text: async () => body,
  } as Response
}

function createResponseController(): ResponseController {
  let resolveFn: (response: Response) => void
  let rejectFn: (reason: unknown) => void

  const promise = new Promise<Response>((resolve, reject) => {
    resolveFn = resolve
    rejectFn = reject
  })

  return {
    promise,
    resolve: (response) => resolveFn(response),
    reject: (error) => rejectFn(error),
  }
}

describe("ASCIIAnimation resilient frame loading", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("loads in batches and updates playback frames before full completion", async () => {
    const probeResponse = jest.fn(() => Promise.resolve(makeMockResponse("FRAME_00001")))
    const previewResponse = jest.fn(() => Promise.resolve(makeMockResponse("FRAME_00001")))
    const frame2 = createResponseController()
    const frame3 = createResponseController()
    const frame4 = createResponseController()
    const frame5 = createResponseController()

    const responses: Array<() => Promise<Response>> = [
      probeResponse,
      previewResponse,
      () => frame2.promise,
      () => frame3.promise,
      () => frame4.promise,
      () => frame5.promise,
    ]

    jest.spyOn(global, "fetch").mockImplementation(() => {
      const next = responses.shift()
      if (!next) {
        throw new Error("Unexpected fetch call")
      }
      return next()
    })

    render(
      <ASCIIAnimation
        frameFolder="hero"
        frameCount={5}
        quality="medium"
        loadStrategy="batch"
        batchSize={2}
        maxConcurrentFetches={2}
        lazy={false}
        showFrameCounter
      />,
    )

    await waitFor(() => expect(screen.getByText("Frame: 1/1")).toBeInTheDocument())
    expect(screen.queryByText(/\/5$/)).not.toBeInTheDocument()

    await act(async () => {
      frame2.resolve(makeMockResponse("FRAME_00002"))
      frame3.resolve(makeMockResponse("FRAME_00003"))
    })

    await waitFor(() => expect(screen.getByText(/\/3$/)).toBeInTheDocument())
    expect(screen.queryByText(/\/5$/)).not.toBeInTheDocument()

    await act(async () => {
      frame4.resolve(makeMockResponse("FRAME_00004"))
      frame5.resolve(makeMockResponse("FRAME_00005"))
    })

    await waitFor(() => expect(screen.getByText(/\/5$/)).toBeInTheDocument())
  })

  it("keeps partial frames and continues animation when some frames fail", async () => {
    const responses: Array<() => Promise<Response>> = [
      () => Promise.resolve(makeMockResponse("FRAME_00001")),
      () => Promise.resolve(makeMockResponse("FRAME_00001")),
      () => Promise.resolve(makeMockResponse("FRAME_00002")),
      () => Promise.resolve(makeMockResponse("FRAME_FAIL", { ok: false, status: 500 })),
      () => Promise.resolve(makeMockResponse("FRAME_00004")),
      () => Promise.resolve(makeMockResponse("FRAME_00005")),
    ]

    jest.spyOn(global, "fetch").mockImplementation(() => {
      const next = responses.shift()
      if (!next) {
        throw new Error("Unexpected fetch call")
      }
      return next()
    })

    render(
      <ASCIIAnimation
        frameFolder="hero"
        frameCount={5}
        loadStrategy="batch"
        batchSize={2}
        maxConcurrentFetches={2}
        lazy={false}
        showFrameCounter
      />,
    )

    await waitFor(() => expect(screen.getByText(/\/4$/)).toBeInTheDocument())
    expect(screen.queryByText("No frames loaded")).not.toBeInTheDocument()
  })

  it("falls back to deterministic placeholder if no frame can be loaded", async () => {
    const responses: Array<() => Promise<Response>> = [
      () => Promise.resolve(makeMockResponse("FRAME_00001")),
      () => Promise.resolve(makeMockResponse("FRAME_00001", { ok: false, status: 500 })),
    ]

    jest.spyOn(global, "fetch").mockImplementation(() => {
      const next = responses.shift()
      if (!next) {
        throw new Error("Unexpected fetch call")
      }
      return next()
    })

    render(
      <ASCIIAnimation
        frameFolder="hero"
        frameCount={1}
        lazy={false}
        showFrameCounter
      />,
    )

    await waitFor(() => expect(screen.getByText("No frames loaded")).toBeInTheDocument())
  })
})
