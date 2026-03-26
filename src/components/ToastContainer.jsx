import styles from './ToastContainer.module.css'

export default function ToastContainer({ toasts }) {
  if (!toasts.length) return null
  return (
    <div className={styles.container}>
      {toasts.map(t => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>
          {t.msg}
        </div>
      ))}
    </div>
  )
}
