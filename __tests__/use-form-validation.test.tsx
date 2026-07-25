import { act, fireEvent, render, screen } from '@testing-library/react'

import { useFormValidation } from '@/hooks/use-form-validation'

function FormHarness({
  onValidSubmit,
}: {
  onValidSubmit: (form: HTMLFormElement) => Promise<void>
}) {
  const { handleSubmit } = useFormValidation({ onValidSubmit })

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" defaultValue="person@example.com" />
      <button type="submit">Submit</button>
    </form>
  )
}

describe('useFormValidation', () => {
  it('blocks a second submit while the first request is pending', async () => {
    let resolveSubmission: (() => void) | undefined
    const onValidSubmit = jest.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveSubmission = resolve
        }),
    )

    render(<FormHarness onValidSubmit={onValidSubmit} />)

    const form = screen.getByRole('button', { name: 'Submit' }).closest('form')
    expect(form).not.toBeNull()

    fireEvent.submit(form as HTMLFormElement)
    fireEvent.submit(form as HTMLFormElement)

    expect(onValidSubmit).toHaveBeenCalledTimes(1)

    await act(async () => {
      resolveSubmission?.()
    })
  })
})
