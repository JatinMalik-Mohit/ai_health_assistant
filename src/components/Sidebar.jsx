import { useState } from 'react'
import { Link } from 'react-router-dom'
import PatientItem from './PatientItem'
import styles from './Sidebar.module.css'

export default function Sidebar({ isOpen, patients, chats, currentId, onAddPatient, onDeletePatient, onSelectPatient }) {
  const [name, setName] = useState('')
  const [age,  setAge]  = useState('')

  const handleAdd = () => {
    const trimmedName = name.trim()
    const ageNum      = parseInt(age.trim(), 10)
    onAddPatient(trimmedName, ageNum, () => {
      setName('')
      setAge('')
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      {/* Brand + Form */}
      <div className={styles.header}>
        <Link to="/" className={styles.brandLink}>
          <div className={styles.brandMark}>
            <i className="fa-solid fa-heart-pulse" />
          </div>
          <span className={styles.brandName}>AI Health Assistant</span>
        </Link>

        <input
          className={styles.input}
          placeholder="Patient name"
          autoComplete="off"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="number"
          className={styles.input}
          placeholder="Age"
          min="1"
          max="120"
          autoComplete="off"
          value={age}
          onChange={e => setAge(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.addBtn} onClick={handleAdd}>
          <i className="fa-solid fa-user-plus" /> Add Patient
        </button>
      </div>

      {/* Patient list */}
      <div className={styles.listSection}>
        <span className={styles.listLabel}>Patients</span>
        <ul className={styles.list}>
          {patients.length === 0 ? (
            <li className={styles.emptyMsg}>
              No patients added yet.<br />Fill in the form above.
            </li>
          ) : (
            patients.map(p => (
              <PatientItem
                key={p.id}
                patient={p}
                isActive={currentId === p.id}
                msgCount={(chats[p.id] || []).length}
                onSelect={onSelectPatient}
                onDelete={onDeletePatient}
              />
            ))
          )}
        </ul>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <Link to="/" className={styles.backLink}>
          <i className="fa-solid fa-arrow-left" /> Back to Home
        </Link>
      </div>
    </aside>
  )
}
