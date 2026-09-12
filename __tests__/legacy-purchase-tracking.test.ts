import fs from 'node:fs'
import path from 'node:path'

it('does not turn an unverified legacy redirect into purchase revenue', () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), 'app/checkout/website/thank-you/page.tsx'),
    'utf8',
  )
  expect(source).not.toMatch(/PurchaseSuccessTracker|trackPurchase|ORDER_PRICE/)
})
