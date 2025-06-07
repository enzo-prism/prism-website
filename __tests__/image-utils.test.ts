import { generatePlaceholderURL, validateImageDimensions } from '../utils/image-utils'

describe('image utils', () => {
  test('generatePlaceholderURL creates a properly encoded url', () => {
    const url = generatePlaceholderURL(100, 200, 'test image')
    expect(url).toBe('/placeholder.svg?height=200&width=100&query=test%20image')
  })

  test('validateImageDimensions returns defaults for invalid values', () => {
    const result = validateImageDimensions(0 as any, -5 as any)
    expect(result).toEqual({ width: 100, height: 100 })
  })

  test('validateImageDimensions keeps valid numbers', () => {
    const result = validateImageDimensions(50, 75)
    expect(result).toEqual({ width: 50, height: 75 })
  })
})
