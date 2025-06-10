import fs from 'fs'
import path from 'path'

describe('blog page canonical', () => {
  test('renders canonical link in built HTML', () => {
    const htmlPath = path.join(process.cwd(), '.next/server/app/blog/page.html')
    const html = fs.readFileSync(htmlPath, 'utf8')
    expect(html).toContain('<link rel="canonical" href="https://design-prism.com/blog"/>')
  })
})
