import styles from './chatgpt-ads.module.css'

export default function ChatGptAdsConversation() {
  return (
    <aside className={styles.conversation} aria-hidden="true">
      <div className={styles.conversationBar}>
        <span>ChatGPT</span>
        <span className={styles.dots}>
          <span />
          <span />
          <span />
        </span>
      </div>
      <div className={`${styles.bubble} ${styles.user}`}>
        Who is a great dentist near me that takes new patients?
      </div>
      <div className={`${styles.bubble} ${styles.assistant}`}>
        Here are a few well-reviewed options in your area, with hours and how to
        book.
      </div>
      <div className={styles.sponsored}>
        <div className={styles.sponsoredLabel}>Sponsored</div>
        <p className={styles.sponsoredTitle}>Your business, in the answer.</p>
        <p className={styles.sponsoredBody}>
          A clearly labeled card under the reply. Shown when someone is already
          asking to buy.
        </p>
      </div>
    </aside>
  )
}
