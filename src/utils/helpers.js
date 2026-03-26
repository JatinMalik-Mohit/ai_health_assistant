export const makeId = () =>
  'p_' + Date.now() + '_' + Math.floor(Math.random() * 10000)

export const getCurrentTime = () => {
  const d = new Date()
  let h = d.getHours()
  const m = d.getMinutes()
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  return `${h}:${m < 10 ? '0' : ''}${m} ${ampm}`
}

export const escHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export const loadState = () => {
  try {
    const raw = localStorage.getItem('medai_v2')
    if (raw) return JSON.parse(raw)
  } catch (_) {}
  return { patients: [], chats: {} }
}

export const saveState = (state) => {
  try {
    localStorage.setItem('medai_v2', JSON.stringify(state))
  } catch (_) {}
}
