import { cn } from '@/lib/utils'

import styles from './app-page.module.css'

type AppStepsProps = {
  steps: ReadonlyArray<{ title: string; body: string }>
  className?: string
}

/** Numbered steps joined by a hairline. */
export function AppSteps({ steps, className }: AppStepsProps) {
  return (
    <div className={cn('relative', className)}>
      <span aria-hidden="true" className={styles.stepsLine} />
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <li key={step.title} className="relative flex gap-5">
            <span className={styles.stepsNumber}>{index + 1}</span>
            <div className="pt-0.5">
              <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 max-w-[46ch] text-pretty text-[15px] leading-6 text-muted-foreground">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default AppSteps
