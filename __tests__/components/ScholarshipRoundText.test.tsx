import { act, render, screen } from '@testing-library/react'
import ScholarshipRoundText from '@/components/scholarships/ScholarshipRoundText'
import { getScholarshipRound } from '@/lib/scholarships'

describe('visible scholarship dates in a long-lived tab', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('refreshes the quarter and selection date together at Pacific quarter end', () => {
    jest.setSystemTime(new Date('2027-01-01T07:59:30Z'))
    const round = getScholarshipRound()
    render(
      <>
        <ScholarshipRoundText initialRound={round} />
        <ScholarshipRoundText initialRound={round} field="selectionDateLabel" />
      </>,
    )
    expect(screen.getByText('Q4 2026')).toBeInTheDocument()
    act(() => jest.advanceTimersByTime(60_000))
    expect(screen.getByText('Q1 2027')).toBeInTheDocument()
    expect(screen.getByText('March 31, 2027')).toBeInTheDocument()
    expect(screen.queryByText('December 31, 2026')).not.toBeInTheDocument()
  })

  it('refreshes immediately when returning to a previously opened tab', () => {
    jest.setSystemTime(new Date('2027-03-31T23:00:00-07:00'))
    render(<ScholarshipRoundText initialRound={getScholarshipRound()} />)
    jest.setSystemTime(new Date('2027-04-01T00:00:00-07:00'))
    act(() => window.dispatchEvent(new Event('focus')))
    expect(screen.getByText('Q2 2027')).toBeInTheDocument()
  })
})
