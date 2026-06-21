import { useEffect, useState } from 'react'
import './Snackbar.css'

function Snackbar({ message, onClose }) {
  const [closing, setClosing] = useState(false)

  const dismiss = () => setClosing(true)

  useEffect(() => {
    const timer = setTimeout(dismiss, 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!closing) return
    const timer = setTimeout(onClose, 300)
    return () => clearTimeout(timer)
  }, [closing, onClose])

  return (
    <div className={`snackbar${closing ? ' snackbar--closing' : ''}`}>
      <span className="snackbar-message">{message}</span>
      <button className="snackbar-close" onClick={dismiss}>✕</button>
    </div>
  )
}

export default Snackbar
