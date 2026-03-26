import styles from './PatientItem.module.css'

export default function PatientItem({ patient, isActive, msgCount, onSelect, onDelete }) {
  const initial = patient.name.charAt(0).toUpperCase()

  return (
    <li
      className={`${styles.item} ${isActive ? styles.active : ''}`}
      onClick={() => onSelect(patient.id)}
    >
      <div className={styles.left}>
        <div className={styles.avatar}>{initial}</div>
        <div className={styles.info}>
          <div className={styles.name}>{patient.name}</div>
          <div className={styles.meta}>
            Age {patient.age}
            {msgCount > 0 && ` • ${msgCount} msg${msgCount > 1 ? 's' : ''}`}
          </div>
        </div>
      </div>
      <button
        className={styles.deleteBtn}
        title="Remove patient"
        onClick={e => { e.stopPropagation(); onDelete(patient.id) }}
      >
        <i className="fa-solid fa-xmark" />
      </button>
    </li>
  )
}
