import { useEffect, useRef } from 'react'
import MessageRow from './MessageRow'
import TypingIndicator from './TypingIndicator'
import styles from './ChatWindow.module.css'

export default function ChatWindow({ patient, messages, isLoading }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (!patient) {
    return (
      <div className={styles.window}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <i className="fa-solid fa-comment-medical" />
          </div>
          <h3>How can I help you?</h3>
          <p>Add a patient profile from the sidebar, then describe your symptoms to get started.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.window}>
      {messages.map((msg, i) => (
        <MessageRow key={msg.id || i} msg={msg} />
      ))}
      {isLoading && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  )
}
