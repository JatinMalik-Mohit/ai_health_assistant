import styles from './TypingIndicator.module.css'

export default function TypingIndicator() {
  return (
    <div className={styles.row}>
      <div className={styles.icon}>
        <i className="fa-solid fa-robot" />
      </div>
      <div className={styles.indicator}>
        <span /><span /><span />
      </div>
    </div>
  )
}
