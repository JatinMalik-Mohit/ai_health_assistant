import styles from './TopBar.module.css'

export default function TopBar({ patient, onToggleSidebar }) {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button className={styles.hamburger} onClick={onToggleSidebar} title="Toggle sidebar">
          <i className="fa-solid fa-bars" />
        </button>

        <div className={`${styles.avatar} ${patient ? styles.hasPatient : ''}`}>
          {patient
            ? patient.name.charAt(0).toUpperCase()
            : <i className="fa-solid fa-robot" />
          }
        </div>

        <div>
          <div className={styles.title}>
            {patient ? `Consulting: ${patient.name}` : 'Select a Patient'}
          </div>
          <div className={styles.sub}>
            {patient
              ? `Age ${patient.age}  –  AI Health Assistant is ready to help`
              : 'Add or select a patient to begin'
            }
          </div>
        </div>
      </div>

      <div className={styles.badge}>
        <span className={styles.dot} />
        AI Online
      </div>
    </header>
  )
}
