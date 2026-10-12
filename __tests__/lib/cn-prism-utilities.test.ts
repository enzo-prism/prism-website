import { cn } from '@/lib/utils'
test('cn keeps prism utilities', () => {
  expect(cn('text-title text-gradient', 'max-w-[18ch]')).toBe(
    'text-title text-gradient max-w-[18ch]',
  )
  expect(cn('text-display', 'text-title')).toBe('text-title')
  expect(cn('text-muted-foreground', 'text-subtle')).toBe('text-subtle')
})
