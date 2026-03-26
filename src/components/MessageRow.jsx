import styles from './MessageRow.module.css'

export default function MessageRow({ msg }) {
  if (msg.sender === 'user') {
    return (
      <div className={`${styles.row} ${styles.user}`}>
        <div className={styles.userWrapper}>
          <div className={styles.bubbleUser}>{msg.text}</div>
          <div className={styles.time}>{msg.time}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.row} ${styles.bot}`}>
      <div className={styles.botIcon}>
        <i className="fa-solid fa-robot" />
      </div>
      <div className={styles.botWrapper}>
        <div
          className={styles.bubbleBot}
          dangerouslySetInnerHTML={{ __html: msg.text }}
        />
        <div className={`${styles.time} ${styles.timeBot}`}>{msg.time}</div>
      </div>
    </div>
  )
}
