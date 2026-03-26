import { useState, useEffect, useCallback } from 'react'
import Sidebar        from '../components/Sidebar'
import TopBar         from '../components/TopBar'
import ChatWindow     from '../components/ChatWindow'
import InputBar       from '../components/InputBar'
import ToastContainer from '../components/ToastContainer'
import { usePatients } from '../hooks/usePatients'
import { useToast    } from '../hooks/useToast'
import { askGroq     } from '../utils/groqApi'
import { getCurrentTime, escHtml } from '../utils/helpers'
import styles from './Chat.module.css'

export default function Chat() {
  const { patients, chats, restoredId, addPatient, deletePatient, addMessage, getPatientById, saveCurrentId } = usePatients()
  const { toasts, showToast } = useToast()

  const [currentId,   setCurrentId]   = useState(null)
  const [userInput,   setUserInput]   = useState('')
  const [isLoading,   setIsLoading]   = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)

  // Restore last-selected patient once patients are loaded from localStorage
  useEffect(() => {
    if (restoredId && getPatientById(restoredId)) {
      setCurrentId(restoredId)
    }
  }, [restoredId, patients])

  // Persist the selected patient so it survives page reload
  useEffect(() => {
    if (currentId !== null) saveCurrentId(currentId)
  }, [currentId])

  const currentPatient  = getPatientById(currentId)
  const currentMessages = currentId ? (chats[currentId] || []) : []

  // Prepend welcome message if first visit
  const welcomeMsg =
    currentPatient && currentMessages.length === 0
      ? [{
          sender: 'bot',
          text: `Hello <strong>${escHtml(currentPatient.name)}</strong>! I am your AI Health Assistant. Please describe your symptoms or ask a health question and I will provide AI-powered insights.`,
          time: getCurrentTime(),
          id: 'welcome',
        }]
      : []

  const displayMessages = welcomeMsg.length ? welcomeMsg : currentMessages

  // ── Add patient ──────────────────────────────────────────────────────────────
  const handleAddPatient = useCallback((name, age, resetForm) => {
    if (!name) { showToast('Please enter the patient name.', 'warning'); return }
    if (isNaN(age) || age < 1 || age > 120) {
      showToast('Please enter a valid age (1 – 120).', 'warning'); return
    }
    const duplicate = patients.some(
      p => p.name.toLowerCase() === name.toLowerCase() && p.age === age
    )
    if (duplicate) { showToast('This patient already exists.', 'warning'); return }

    const patient = addPatient(name, age)
    setCurrentId(patient.id)
    setSidebarOpen(false)
    resetForm?.()
    showToast(`Patient added: ${patient.name}`)
  }, [patients, addPatient, showToast])

  // ── Delete patient ───────────────────────────────────────────────────────────
  const handleDeletePatient = useCallback((id) => {
    const patient = getPatientById(id)
    if (!patient) return
    if (!window.confirm(`Remove "${patient.name}" and their full chat history?`)) return
    deletePatient(id)
    if (currentId === id) setCurrentId(null)
    showToast('Patient removed.')
  }, [getPatientById, deletePatient, currentId, showToast])

  // ── Send message ─────────────────────────────────────────────────────────────
  const handleSend = useCallback(async () => {
    if (!currentPatient) { showToast('Please select a patient first.', 'warning'); return }
    const msg = userInput.trim()
    if (!msg) return

    const time    = getCurrentTime()
    const userMsg = { sender: 'user', text: msg, time }
    addMessage(currentId, userMsg)
    setUserInput('')
    setIsLoading(true)

    try {
      const history = chats[currentId] || []
      const reply   = await askGroq(currentPatient.name, currentPatient.age, msg, history)
      addMessage(currentId, { sender: 'bot', text: reply, time: getCurrentTime() })
    } catch (err) {
      addMessage(currentId, {
        sender: 'bot',
        text: `<i class="fa-solid fa-triangle-exclamation" style="color:#d97706"></i> ${err.message || 'Could not reach the AI server.'}`,
        time: getCurrentTime(),
      })
    } finally {
      setIsLoading(false)
    }
  }, [currentPatient, currentId, userInput, chats, addMessage, showToast])

  // ── Voice input ──────────────────────────────────────────────────────────────
  const handleVoice = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { showToast('Voice input requires Google Chrome.', 'warning'); return }
    const rec    = new SR()
    rec.lang     = 'en-IN'
    rec.onstart  = () => setIsListening(true)
    rec.onend    = () => setIsListening(false)
    rec.onresult = (e) => setUserInput(e.results[0][0].transcript)
    rec.onerror  = (e) => { setIsListening(false); showToast('Voice error: ' + e.error, 'error') }
    rec.start()
  }, [showToast])

  // ── Hospital locator ─────────────────────────────────────────────────────────
  const handleHospital = useCallback(() => {
    if (!navigator.geolocation) { showToast('Geolocation not supported.', 'warning'); return }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        window.open(
          `https://www.google.com/maps/search/hospital/@${coords.latitude},${coords.longitude},15z`,
          '_blank'
        ),
      () => showToast('Location access denied.', 'warning')
    )
  }, [showToast])

  return (
    <div className={styles.layout}>
      <ToastContainer toasts={toasts} />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        patients={patients}
        chats={chats}
        currentId={currentId}
        onAddPatient={handleAddPatient}
        onDeletePatient={handleDeletePatient}
        onSelectPatient={(id) => { setCurrentId(id); setSidebarOpen(false) }}
      />

      <div className={styles.main}>
        <TopBar
          patient={currentPatient}
          onToggleSidebar={() => setSidebarOpen(o => !o)}
        />

        {!currentPatient && (
          <div className={styles.noPatientBar}>
            <i className="fa-solid fa-circle-exclamation me-2" />
            Please add and select a patient before sending a message.
          </div>
        )}

        <ChatWindow
          patient={currentPatient}
          messages={displayMessages}
          isLoading={isLoading}
        />

        <InputBar
          patient={currentPatient}
          isLoading={isLoading}
          value={userInput}
          onChange={setUserInput}
          onSend={handleSend}
          onVoice={handleVoice}
          onHospital={handleHospital}
          isListening={isListening}
        />
      </div>
    </div>
  )
}
