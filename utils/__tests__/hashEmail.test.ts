import { describe, it, expect } from 'vitest'
import { hashEmail } from '../analytics'

describe('hashEmail', () => {
  it('produces consistent hexadecimal output', () => {
    const email = 'test@example.com'
    const first = hashEmail(email)
    const second = hashEmail(email)

    expect(first).toBe(second)
    expect(first).toMatch(/^\-?[0-9a-f]+$/i)
  })
})
