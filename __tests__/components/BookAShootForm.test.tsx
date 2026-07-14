import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import BookAShootForm from '@/app/book-a-shoot/BookAShootForm'

const pushMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}))

const trackFormSubmission = jest.fn()

jest.mock('@/utils/analytics', () => ({
  trackFormSubmission: (...args: Array<unknown>) =>
    trackFormSubmission(...args),
}))

function createMockResponse(): Response {
  return {
    ok: true,
    status: 200,
    headers: new Headers({ 'content-type': 'application/json' }),
    json: jest.fn().mockResolvedValue({}),
    text: jest.fn().mockResolvedValue(''),
  } as unknown as Response
}

function dateFromToday(days: number) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getWindowField(label: 'date' | 'one-hour window', id: string) {
  return screen.getByLabelText(label, { selector: `#${id}` })
}

function fillContactAndWindows({ duplicate = false } = {}) {
  fireEvent.change(screen.getByLabelText(/your email/i), {
    target: { value: 'doctor@example.com' },
  })
  fireEvent.change(getWindowField('date', 'book-shoot-day-one-date'), {
    target: { value: dateFromToday(7) },
  })
  fireEvent.change(
    getWindowField('one-hour window', 'book-shoot-day-one-time'),
    { target: { value: '09:00' } },
  )
  fireEvent.change(getWindowField('date', 'book-shoot-day-two-date'), {
    target: { value: duplicate ? dateFromToday(7) : dateFromToday(8) },
  })
  fireEvent.change(
    getWindowField('one-hour window', 'book-shoot-day-two-time'),
    { target: { value: duplicate ? '09:00' : '10:00' } },
  )
}

describe('BookAShootForm', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockReset()
  })

  it('labels both booking windows and publishes the timezone contract', async () => {
    const { container } = render(<BookAShootForm />)

    await waitFor(() => {
      expect(screen.getAllByLabelText('date')).toHaveLength(2)
    })
    expect(screen.getAllByLabelText('one-hour window')).toHaveLength(2)
    expect(
      screen.getByText(/all one-hour windows are in Pacific Time/i),
    ).toBeInTheDocument()
    expect(
      container.querySelector('input[name="booking_timezone"]'),
    ).toHaveValue('America/Los_Angeles')
    expect(screen.getAllByLabelText('date')[0]).toHaveAttribute(
      'min',
      dateFromToday(1),
    )
  })

  it('rejects dates that are not in the future', () => {
    render(<BookAShootForm />)

    fillContactAndWindows()
    fireEvent.change(screen.getAllByLabelText('date')[0], {
      target: { value: dateFromToday(0) },
    })
    fireEvent.click(screen.getByRole('button', { name: /send request/i }))

    expect(screen.getByText(/choose a future date/i)).toBeInTheDocument()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('rejects duplicate date and time choices', () => {
    render(<BookAShootForm />)

    fillContactAndWindows({ duplicate: true })
    fireEvent.click(screen.getByRole('button', { name: /send request/i }))

    expect(
      screen.getByText(/choose a different second date or time/i),
    ).toBeInTheDocument()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('submits distinct future windows with timezone metadata', async () => {
    fetchSpy.mockResolvedValue(createMockResponse())
    render(<BookAShootForm />)

    fillContactAndWindows()
    fireEvent.click(screen.getByRole('button', { name: /send request/i }))

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1))
    const body = fetchSpy.mock.calls[0]?.[1]?.body as FormData
    expect(body.get('booking_timezone')).toBe('America/Los_Angeles')
    expect(pushMock).toHaveBeenCalledWith('/book-a-shoot/thank-you')
  })
})
