import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import ProgramApplicationForm from '@/components/scholarships/ProgramApplicationForm'

const trackFormSubmission = jest.fn()
const appendAttribution = jest.fn((body: FormData) => body.set('utm_source', 'test-source'))
const getRound = jest.fn(() => ({ id: '2026-Q4', label: 'Q4 2026', selectionDateLabel: 'December 31, 2026', deadlineLabel: 'December 31, 2026' }))

jest.mock('@/utils/analytics', () => ({
  trackFormSubmission: (...args: unknown[]) => trackFormSubmission(...args),
}))
jest.mock('@/lib/marketing-attribution', () => ({
  appendAttributionToFormData: (body: FormData) => appendAttribution(body),
}))
jest.mock('@/lib/scholarships', () => ({
  SCHOLARSHIP_FORM_ENDPOINT: 'https://formspree.io/f/scholarship-test',
  OFFICE_HOURS_APPLICATION_ENDPOINT: 'https://formspree.io/f/office-test',
  getScholarshipRound: () => getRound(),
}))

function response(ok = true) {
  return { ok, status: ok ? 200 : 500 } as Response
}

function fillContact() {
  fireEvent.change(screen.getByLabelText('First name'), { target: { value: ' Alex ' } })
  fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Rivera' } })
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'alex@example.com' } })
}

function fillOfficeHours() {
  fillContact()
  fireEvent.change(screen.getByLabelText('What would you like to cover?'), { target: { value: 'How should I launch my community project?' } })
}

function fillScholarship() {
  fillContact()
  for (const label of ['Project or business name', 'What are you building?', 'How could Prism help?', 'Why is a scholarship the right next step?']) {
    fireEvent.change(screen.getByLabelText(label), { target: { value: 'My project is at an early stage.' } })
  }
}

describe('ProgramApplicationForm', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockReset()
    getRound.mockReset().mockReturnValue({ id: '2026-Q4', label: 'Q4 2026', selectionDateLabel: 'December 31, 2026', deadlineLabel: 'December 31, 2026' })
  })

  afterEach(() => jest.useRealTimers())

  it('blocks an incomplete application, focuses the first missing answer, and keeps both forms uniquely labeled', () => {
    render(<><ProgramApplicationForm program="scholarship" /><ProgramApplicationForm program="office-hours" /></>)
    const scholarshipForm = screen.getByRole('form', { name: 'Scholarship application' })
    fireEvent.submit(scholarshipForm)
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(document.activeElement).toHaveAttribute('id', 'scholarship-firstName')
    expect(screen.getByRole('form', { name: 'Office hours application' })).toBeInTheDocument()
    expect(document.querySelectorAll('#scholarship-firstName')).toHaveLength(1)
    expect(document.querySelectorAll('#office-hours-firstName')).toHaveLength(1)
  })

  it('submits all scholarship answers and the actual round with ops and attribution metadata', async () => {
    fetchSpy.mockResolvedValue(response())
    getRound.mockReturnValue({ id: '2027-Q1', label: 'Q1 2027', selectionDateLabel: 'March 31, 2027', deadlineLabel: 'March 31, 2027' })
    render(<ProgramApplicationForm program="scholarship" roundId="2027-Q1" roundLabel="Q1 2027" />)
    fillContact()
    fireEvent.change(screen.getByLabelText('Project or business name'), { target: { value: 'Neighborly' } })
    fireEvent.change(screen.getByLabelText(/Project website or social link/), { target: { value: 'https://example.com' } })
    fireEvent.change(screen.getByLabelText('What are you building?'), { target: { value: 'A community marketplace for local makers.' } })
    fireEvent.change(screen.getByLabelText('How could Prism help?'), { target: { value: 'A clear launch website and storytelling.' } })
    fireEvent.change(screen.getByLabelText('Why is a scholarship the right next step?'), { target: { value: 'I am bootstrapping and cannot afford paid support yet.' } })
    fireEvent.click(screen.getByRole('button', { name: 'Apply for a scholarship' }))

    expect(await screen.findByText('Application received')).toBeInTheDocument()
    const body = fetchSpy.mock.calls[0][1]?.body as FormData
    expect(fetchSpy.mock.calls[0][0]).toBe('https://formspree.io/f/scholarship-test')
    expect(Object.fromEntries(body.entries())).toEqual(expect.objectContaining({
      firstName: 'Alex', lastName: 'Rivera', email: 'alex@example.com',
      projectName: 'Neighborly', projectUrl: 'https://example.com',
      projectDescription: 'A community marketplace for local makers.',
      supportNeeded: 'A clear launch website and storytelling.',
      financialNeed: 'I am bootstrapping and cannot afford paid support yet.',
      scholarship_round: '2027-Q1', form_key: 'scholarship',
      _gotcha: '', program: 'scholarship', utm_source: 'test-source',
      first_name: 'Alex', last_name: 'Rivera',
      project_description: 'A community marketplace for local makers.',
      page: 'scholarship', form_name: 'scholarship_application',
    }))
    expect(screen.getByText(/Your application for Q1 2027 has been received/)).toBeInTheDocument()
    expect(trackFormSubmission).toHaveBeenCalledWith('scholarship_application', 'scholarship_form', expect.objectContaining({ conversionMode: 'immediate', sendGoogleAdsConversion: false }))
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Thank you for sharing your project.' }))
  })

  it('allows a scholarship applicant without a project URL', async () => {
    fetchSpy.mockResolvedValue(response())
    render(<ProgramApplicationForm program="scholarship" />)
    fillScholarship()
    fireEvent.click(screen.getByRole('button', { name: 'Apply for a scholarship' }))
    await screen.findByText('Application received')
    const body = fetchSpy.mock.calls[0][1]?.body as FormData
    expect(body.get('projectUrl')).toBe('')
  })

  it('requires a meaningful office hours question and a valid email before posting', () => {
    render(<ProgramApplicationForm program="office-hours" />)
    fillContact()
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } })
    fireEvent.change(screen.getByLabelText('What would you like to cover?'), { target: { value: '   ' } })
    fireEvent.click(screen.getByRole('button', { name: 'Apply for office hours' }))
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(document.activeElement).toBe(screen.getByLabelText('Email'))
    expect(screen.getByLabelText('What would you like to cover?')).toHaveAttribute('aria-invalid', 'true')
  })

  it('retains office hours answers after a failed request and supports a successful retry without promising a reservation', async () => {
    fetchSpy.mockResolvedValueOnce(response(false)).mockResolvedValueOnce(response())
    render(<ProgramApplicationForm program="office-hours" />)
    fillOfficeHours()
    fireEvent.click(screen.getByRole('button', { name: 'Apply for office hours' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Your answers are still here')
    expect(screen.getByLabelText('What would you like to cover?')).toHaveValue('How should I launch my community project?')
    await waitFor(() => expect(screen.getByRole('button', { name: 'Apply for office hours' })).toBeEnabled())
    fireEvent.click(screen.getByRole('button', { name: 'Apply for office hours' }))
    expect(await screen.findByText('Application received')).toBeInTheDocument()
    expect(fetchSpy).toHaveBeenCalledTimes(2)
    expect(fetchSpy.mock.calls[1][0]).toBe('https://formspree.io/f/office-test')
    const body = fetchSpy.mock.calls[1][1]?.body as FormData
    expect(body.get('message')).toBe('How should I launch my community project?')
    expect(body.get('form_key')).toBe('office_hours_application')
    expect(body.get('scholarship_round')).toBeNull()
    expect(screen.getByText(/Your application does not reserve a session/)).toBeInTheDocument()
    expect(trackFormSubmission).toHaveBeenCalledTimes(1)
  })

  it('prevents duplicate requests even if the form is submitted twice before React commits', async () => {
    let finish!: (value: Response) => void
    fetchSpy.mockImplementation(() => new Promise<Response>((resolve) => { finish = resolve }))
    render(<ProgramApplicationForm program="office-hours" />)
    fillOfficeHours()
    const form = screen.getByRole('form', { name: 'Office hours application' })
    act(() => { fireEvent.submit(form); fireEvent.submit(form) })
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: 'Sending application…' })).toBeDisabled()
    await act(async () => { finish(response()) })
    expect(screen.getByText('Application received')).toBeInTheDocument()
  })

  it('refreshes a December-opened tab on January focus and submits the current round even without another focus', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2027-01-01T07:59:00Z'))
    getRound.mockImplementation(() => {
      const { getScholarshipRound } = jest.requireActual<typeof import('@/lib/scholarships')>('@/lib/scholarships')
      return getScholarshipRound(new Date())
    })
    fetchSpy.mockResolvedValue(response())
    render(<ProgramApplicationForm program="scholarship" roundId="2026-Q4" roundLabel="Q4 2026" />)
    fillScholarship()
    expect(screen.getByText('Applying for Q4 2026.')).toBeInTheDocument()

    jest.setSystemTime(new Date('2027-01-01T08:01:00Z'))
    fireEvent(window, new Event('focus'))
    expect(screen.getByText('Applying for Q1 2027.')).toBeInTheDocument()

    // The submit-time check also catches another rollover with no focus event.
    jest.setSystemTime(new Date('2027-04-01T07:01:00Z'))
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Apply for a scholarship' }))
    })
    const body = fetchSpy.mock.calls[0][1]?.body as FormData
    expect(body.get('scholarship_round')).toBe('2027-Q2')
    expect(screen.getByText(/Your application for Q2 2027 has been received/)).toBeInTheDocument()

    // A later focus changes the available round, never the accepted receipt.
    jest.setSystemTime(new Date('2027-07-01T07:01:00Z'))
    fireEvent(window, new Event('focus'))
    expect(screen.getByText(/Your application for Q2 2027 has been received/)).toBeInTheDocument()
  })

  it('aborts a stalled provider request after twenty seconds and keeps answers available for retry', async () => {
    jest.useFakeTimers()
    fetchSpy.mockImplementationOnce((_url, options) => new Promise<Response>((_resolve, reject) => {
      options?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))
    })).mockResolvedValueOnce(response())
    render(<ProgramApplicationForm program="office-hours" />)
    fillOfficeHours()
    fireEvent.click(screen.getByRole('button', { name: 'Apply for office hours' }))
    const signal = fetchSpy.mock.calls[0][1]?.signal
    expect(signal?.aborted).toBe(false)

    await act(async () => { jest.advanceTimersByTime(20_000) })
    expect(signal?.aborted).toBe(true)
    expect(screen.getByRole('alert')).toHaveTextContent('The request took too long. Your answers are still here.')
    expect(screen.getByLabelText('What would you like to cover?')).toHaveValue('How should I launch my community project?')
    expect(screen.getByRole('button', { name: 'Apply for office hours' })).toBeEnabled()
    expect(trackFormSubmission).not.toHaveBeenCalled()

    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Apply for office hours' })) })
    expect(screen.getByText('Application received')).toBeInTheDocument()
    expect(fetchSpy).toHaveBeenCalledTimes(2)
    await act(async () => { jest.advanceTimersByTime(20_000) })
    expect(fetchSpy.mock.calls[1][1]?.signal?.aborted).toBe(false)
  })
})
