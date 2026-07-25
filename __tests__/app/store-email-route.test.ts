import { GET, POST } from '@/app/api/store-email/route'

describe('/api/store-email', () => {
  it.each([
    ['GET', GET],
    ['POST', POST],
  ])('returns 410 for retired %s callers', async (_method, handler) => {
    const response = await handler()

    expect(response.status).toBe(410)
    expect(response.headers.get('cache-control')).toBe('no-store')
    await expect(response.json()).resolves.toEqual({
      error: 'This endpoint is retired. Use a supported Prism form.',
    })
  })
})
