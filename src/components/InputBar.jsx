import { useRef } from 'react'
import styles from './InputBar.module.css'

export default function InputBar({ patient, isLoading, value, onChange, onSend, onVoice, onHospital, isListening }) {
  const textareaRef = useRef(null)

  const handleChange = (e) => {
    onChange(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 130) + 'px'
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  const disabled    = !patient || isLoading
  const sendDisabled = disabled || !value.trim()

  return (
    <div className={styles.bar}>
      <textarea
        ref={textareaRef}
        className={styles.input}
        placeholder={patient ? `Describe ${patient.name}'s symptoms…` : 'Select a patient first…'}
        rows={1}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <button
        className={`${styles.btn} ${styles.mic} ${isListening ? styles.listening : ''}`}
        onClick={onVoice}
        disabled={!patient}
        title="Voice input"
      >
        <i className="fa-solid fa-microphone" />
      </button>

      <button
        className={`${styles.btn} ${styles.hospital}`}
        onClick={onHospital}
        title="Find nearby hospitals"
      >
        <i className="fa-solid fa-hospital" />
      </button>

      <button
        className={`${styles.btn} ${styles.send}`}
        onClick={onSend}
        disabled={sendDisabled}
      >
        <i className="fa-solid fa-paper-plane" /> Send
      </button>
    </div>
  )
}
