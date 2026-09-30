import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import OfficeHoursBooking from '@/components/scholarships/OfficeHoursBooking'
import ProgramApplicationForm from '@/components/scholarships/ProgramApplicationForm'
import { getOfficeHoursSessions } from '@/lib/office-hours'

jest.mock('@/lib/office-hours', () => ({ getOfficeHoursSessions: jest.fn() }))

const sessions = [
  {
    id: '2026-10-04',
    label: 'Sunday, October 4, 2026',
    startAt: '2026-10-04T17:00:00.000Z',
    endAt: '2026-10-04T18:00:00.000Z',
  },
  {
    id: '2026-10-11',
    label: 'Sunday, October 11, 2026',
    startAt: '2026-10-11T17:00:00.000Z',
    endAt: '2026-10-11T18:00:00.000Z',
  },
]

function response(body: Record<string, unknown>, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response
}

function fillRegistration() {
  fireEvent.change(screen.getByLabelText('First name'), {
    target: { value: 'Alex' },
  })
  fireEvent.change(screen.getByLabelText('Last name'), {
    target: { value: 'Rivera' },
  })
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'alex@example.com' },
  })
}

describe('OfficeHoursBooking', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')
  const nowSpy = jest.spyOn(Date, 'now')

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockReset()
    fetchSpy.mockResolvedValue(response({ ok: true, approved: false }))
    nowSpy.mockReturnValue(new Date('2026-09-30T12:00:00Z').getTime())
    jest.mocked(getOfficeHoursSessions).mockReturnValue(sessions)
  })

  afterAll(() => {
    fetchSpy.mockRestore()
    nowSpy.mockRestore()
  })

  it('restores approval through the server cookie and shows upcoming sessions', async () => {
    fetchSpy.mockResolvedValueOnce(response({ ok: true, approved: true }))
    render(<OfficeHoursBooking sessions={sessions} />)
    expect(screen.getByRole('status')).toHaveTextContent(
      'Checking your approval',
    )
    expect(await screen.findByLabelText('Choose a Sunday')).toHaveValue(
      '2026-10-04',
    )
    expect(screen.queryByLabelText('Approval code')).not.toBeInTheDocument()
    expect(fetchSpy).toHaveBeenCalledWith(
      '/api/office-hours/access',
      expect.objectContaining({
        credentials: 'same-origin',
        cache: 'no-store',
      }),
    )
  })

  it('keeps registration labels attached to their fields beside the application form', async () => {
    fetchSpy.mockResolvedValueOnce(response({ ok: true, approved: true }))
    const { container } = render(
      <>
        <ProgramApplicationForm program="office-hours" />
        <OfficeHoursBooking sessions={sessions} />
      </>,
    )
    await screen.findByLabelText('Choose a Sunday')
    const ids = Array.from(container.querySelectorAll('[id]')).map(
      (element) => element.id,
    )
    expect(new Set(ids).size).toBe(ids.length)
    for (const name of ['firstName', 'lastName', 'email']) {
      const id = `office-hours-registration-${name}`
      const field = container.querySelector(`#${id}`)
      const label = container.querySelector(
        `label[for="${id}"]`,
      ) as HTMLLabelElement
      expect(label.control).toBe(field)
      expect(field?.closest('form')).toContainElement(
        screen.getByLabelText('Choose a Sunday'),
      )
    }
  })

  it('requires a nonblank approval code and keeps an invalid code retryable', async () => {
    render(<OfficeHoursBooking sessions={sessions} />)
    const code = await screen.findByLabelText('Approval code')
    fireEvent.change(code, { target: { value: '   ' } })
    fireEvent.click(
      screen.getByRole('button', { name: 'Unlock session signup' }),
    )
    expect(screen.getByText('Enter your approval code.')).toBeInTheDocument()
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    fetchSpy.mockResolvedValueOnce(
      response({ ok: false, error: 'That approval code is not valid.' }, 403),
    )
    fireEvent.change(code, { target: { value: 'wrong-code' } })
    fireEvent.click(
      screen.getByRole('button', { name: 'Unlock session signup' }),
    )
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'That approval code is not valid.',
    )
    expect(code).toHaveFocus()
    expect(
      screen.getByRole('button', { name: 'Unlock session signup' }),
    ).toBeEnabled()
    expect(
      screen.getByRole('link', { name: 'Apply for office hours' }),
    ).toHaveAttribute('href', '#office-hours-application')
  })

  it('unlocks with a code and sends a chosen-session registration with a receipt', async () => {
    fetchSpy.mockResolvedValueOnce(response({ ok: true, approved: false }))
    fetchSpy.mockResolvedValueOnce(response({ ok: true, approved: true }))
    fetchSpy.mockResolvedValueOnce(response({ ok: true, session: sessions[1] }))
    render(<OfficeHoursBooking sessions={sessions} />)
    fireEvent.change(await screen.findByLabelText('Approval code'), {
      target: { value: 'approved-secret' },
    })
    fireEvent.click(
      screen.getByRole('button', { name: 'Unlock session signup' }),
    )
    const sessionSelect = await screen.findByLabelText('Choose a Sunday')
    fillRegistration()
    fireEvent.change(sessionSelect, { target: { value: sessions[1].id } })
    fireEvent.change(screen.getByLabelText(/anything new you want to cover/i), {
      target: { value: 'Website launch' },
    })
    fireEvent.click(
      screen.getByRole('button', { name: 'Sign up for this Sunday' }),
    )
    const receipt = await screen.findByRole('heading', {
      name: 'Your session signup is received.',
    })
    expect(receipt).toHaveFocus()
    expect(screen.getByText(sessions[1].label)).toBeInTheDocument()
    expect(
      screen.getByText(/Prism will share joining details separately/),
    ).toBeInTheDocument()
    expect(fetchSpy).toHaveBeenLastCalledWith(
      '/api/office-hours/register',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          firstName: 'Alex',
          lastName: 'Rivera',
          email: 'alex@example.com',
          message: 'Website launch',
          sessionId: sessions[1].id,
        }),
      }),
    )
    expect(
      screen.queryByText(/email sent|invitation sent/i),
    ).not.toBeInTheDocument()
  })

  it('focuses missing contact fields without sending a registration', async () => {
    fetchSpy.mockResolvedValueOnce(response({ ok: true, approved: true }))
    render(<OfficeHoursBooking sessions={sessions} />)
    await screen.findByLabelText('Choose a Sunday')
    fireEvent.click(
      screen.getByRole('button', { name: 'Sign up for this Sunday' }),
    )
    expect(screen.getByLabelText('First name')).toHaveFocus()
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })

  it('keeps contact details and allows retry after provider failure', async () => {
    fetchSpy.mockResolvedValueOnce(response({ ok: true, approved: true }))
    fetchSpy.mockResolvedValueOnce(
      response(
        { ok: false, error: 'Your signup could not be saved. Try again.' },
        502,
      ),
    )
    render(<OfficeHoursBooking sessions={sessions} />)
    await screen.findByLabelText('Choose a Sunday')
    fillRegistration()
    fireEvent.click(
      screen.getByRole('button', { name: 'Sign up for this Sunday' }),
    )
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Your signup could not be saved. Try again.',
    )
    expect(screen.getByLabelText('First name')).toHaveValue('Alex')
    expect(
      screen.getByRole('button', { name: 'Sign up for this Sunday' }),
    ).toBeEnabled()
    expect(
      screen.queryByRole('heading', {
        name: 'Your session signup is received.',
      }),
    ).not.toBeInTheDocument()
  })

  it('refreshes an expired selected session before posting', async () => {
    fetchSpy.mockResolvedValueOnce(response({ ok: true, approved: true }))
    render(<OfficeHoursBooking sessions={sessions} />)
    await screen.findByLabelText('Choose a Sunday')
    fillRegistration()
    nowSpy.mockReturnValue(new Date('2026-10-04T17:00:01Z').getTime())
    jest.mocked(getOfficeHoursSessions).mockReturnValue([sessions[1]])
    fireEvent.click(
      screen.getByRole('button', { name: 'Sign up for this Sunday' }),
    )
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'That session has started.',
    )
    expect(screen.getByLabelText('Choose a Sunday')).toHaveValue(sessions[1].id)
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })

  it('makes an unavailable access API recoverable through the application link', async () => {
    fetchSpy.mockResolvedValueOnce(
      response(
        { ok: false, error: 'Approved signup is temporarily unavailable.' },
        503,
      ),
    )
    render(<OfficeHoursBooking sessions={sessions} />)
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Approved signup is temporarily unavailable.',
    )
    expect(
      screen.getByRole('link', { name: 'Apply for office hours' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Approval code')).toBeEnabled()
  })

  it('prevents duplicate registration requests while the provider is pending', async () => {
    fetchSpy.mockResolvedValueOnce(response({ ok: true, approved: true }))
    let resolve!: (value: Response) => void
    fetchSpy.mockImplementationOnce(
      () =>
        new Promise((done) => {
          resolve = done
        }),
    )
    render(<OfficeHoursBooking sessions={sessions} />)
    await screen.findByLabelText('Choose a Sunday')
    fillRegistration()
    const submit = screen.getByRole('button', {
      name: 'Sign up for this Sunday',
    })
    const form = submit.closest('form')!
    fireEvent.submit(form)
    fireEvent.submit(form)
    expect(fetchSpy).toHaveBeenCalledTimes(2)
    await act(async () => resolve(response({ ok: true, session: sessions[0] })))
    await waitFor(() =>
      expect(
        screen.getByRole('heading', {
          name: 'Your session signup is received.',
        }),
      ).toBeInTheDocument(),
    )
  })

  it('clears approval only after the server revokes the cookie', async () => {
    fetchSpy.mockResolvedValueOnce(response({ ok: true, approved: true }))
    fetchSpy.mockResolvedValueOnce(response({ ok: true, approved: false }))
    render(<OfficeHoursBooking sessions={sessions} />)
    await screen.findByLabelText('Choose a Sunday')
    fireEvent.click(
      screen.getByRole('button', { name: 'Use a different approval code' }),
    )
    expect(await screen.findByLabelText('Approval code')).toBeInTheDocument()
    expect(fetchSpy).toHaveBeenLastCalledWith(
      '/api/office-hours/access',
      expect.objectContaining({ method: 'DELETE' }),
    )
  })

  it('explains expired approval and preserves contact details after code renewal', async () => {
    fetchSpy.mockResolvedValueOnce(response({ ok: true, approved: true }))
    fetchSpy.mockResolvedValueOnce(
      response(
        {
          ok: false,
          error: 'Enter your approval code before choosing a session.',
        },
        401,
      ),
    )
    fetchSpy.mockResolvedValueOnce(response({ ok: true, approved: true }))
    render(<OfficeHoursBooking sessions={sessions} />)
    await screen.findByLabelText('Choose a Sunday')
    fillRegistration()
    fireEvent.click(
      screen.getByRole('button', { name: 'Sign up for this Sunday' }),
    )
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Enter your approval code before choosing a session.',
    )
    const code = screen.getByLabelText('Approval code')
    expect(code).toHaveFocus()
    fireEvent.change(code, { target: { value: 'renewed-code' } })
    fireEvent.click(
      screen.getByRole('button', { name: 'Unlock session signup' }),
    )
    await screen.findByLabelText('Choose a Sunday')
    expect(screen.getByLabelText('First name')).toHaveValue('Alex')
    expect(screen.getByLabelText('Last name')).toHaveValue('Rivera')
    expect(screen.getByLabelText('Email')).toHaveValue('alex@example.com')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
