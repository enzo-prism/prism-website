import { Reveal } from '@/components/prism/reveal'
import { PRISM_APP_RELEASES, PRISM_APP_VERSION } from '@/lib/prism-app'

import styles from './app-page.module.css'

const releaseDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

/**
 * Release notes as a timeline. A spectrum rail fills as the list scrolls
 * through view (CSS scroll-driven, where supported; elsewhere it is simply
 * full). The released version's node is solid; one awaiting Apple pulses.
 */
export function AppReleases() {
  return (
    <div className={styles.timeline}>
      <span aria-hidden="true" className={styles.timelineRail}>
        <span className={styles.timelineFill} />
      </span>
      <ol className={styles.timelineList}>
        {PRISM_APP_RELEASES.map((release, index) => {
          const live = release.version === PRISM_APP_VERSION
          return (
            <Reveal
              as="li"
              key={release.version}
              delay={index * 90}
              className={styles.timelineItem}
            >
              <span
                aria-hidden="true"
                className={styles.timelineNode}
                data-state={live ? 'live' : 'pending'}
              />
              <div className={styles.timelineMeta}>
                <p className="font-mono text-[2.75rem] font-medium leading-none tracking-[-0.04em] text-foreground">
                  <span className="sr-only">Version </span>
                  {release.version}
                </p>
                <time
                  dateTime={release.date}
                  className="mt-2 block font-mono text-xs text-muted-foreground"
                >
                  {releaseDate.format(new Date(release.date))}
                </time>
              </div>
              <div className={styles.timelineCard}>
                <p
                  className={styles.timelineStatus}
                  data-state={live ? 'live' : 'pending'}
                >
                  {release.status}
                </p>
                <h3 className="mt-3 text-heading text-balance">
                  {release.title}
                </h3>
                <ul className="mt-4 list-disc space-y-2 pl-4 text-body-md text-muted-foreground marker:text-subtle">
                  {release.changes.map((change) => (
                    <li key={change}>{change}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </ol>
    </div>
  )
}

export default AppReleases
