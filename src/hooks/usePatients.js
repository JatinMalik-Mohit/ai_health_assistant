import { useState, useEffect } from 'react'
import { makeId, loadState, saveState } from '../utils/helpers'

export function usePatients() {
  const [patients, setPatients] = useState([])
  const [chats,    setChats]    = useState({})
  const [restoredId, setRestoredId] = useState(null)

  // Load from localStorage once on mount
  useEffect(() => {
    const saved = loadState()
    setPatients(saved.patients || [])
    setChats(saved.chats     || {})
    setRestoredId(saved.currentId || null)
  }, [])

  // Persist whenever patients or chats change
  // NOTE: currentId is saved from Chat.jsx via saveCurrentId()
  useEffect(() => {
    // Don't overwrite on the very first render (before load effect has run)
    if (patients.length > 0 || Object.keys(chats).length > 0) {
      const existing = loadState()
      saveState({ ...existing, patients, chats })
    }
  }, [patients, chats])

  const addPatient = (name, age) => {
    const patient = { id: makeId(), name, age }
    setPatients(prev => [...prev, patient])
    setChats(prev => ({ ...prev, [patient.id]: [] }))
    return patient
  }

  const deletePatient = (id) => {
    setPatients(prev => prev.filter(p => p.id !== id))
    setChats(prev => {
      const copy = { ...prev }
      delete copy[id]
      return copy
    })
  }

  const addMessage = (patientId, message) => {
    setChats(prev => ({
      ...prev,
      [patientId]: [...(prev[patientId] || []), message],
    }))
  }

  const getPatientById = (id) => patients.find(p => p.id === id) ?? null

  // Called by Chat page whenever selected patient changes
  const saveCurrentId = (id) => {
    const existing = loadState()
    saveState({ ...existing, currentId: id })
  }

  return { patients, chats, restoredId, addPatient, deletePatient, addMessage, getPatientById, saveCurrentId }
}
