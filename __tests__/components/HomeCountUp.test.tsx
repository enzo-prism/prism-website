import { render, screen } from '@testing-library/react'

import HomeCountUp from '@/components/home/HomeCountUp'

describe('HomeCountUp', () => {
  it('keeps the final value available to assistive technology', () => {
    render(<HomeCountUp value="$100K" />)

    expect(
      screen.getByText('$100K', { selector: '.sr-only' }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByText('$100K', { selector: '[aria-hidden="true"]' }),
    ).toHaveLength(2)
  })
})
