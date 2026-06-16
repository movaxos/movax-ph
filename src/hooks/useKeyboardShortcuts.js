import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function useKeyboardShortcuts() {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+U - Upload
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault()
        if (user) navigate('/upload')
      }

      // Escape - Go back or close modals
      if (e.key === 'Escape') {
        // This could be expanded to handle closing modals
        const modalBackdrop = document.querySelector('.modal-backdrop')
        if (modalBackdrop) {
          modalBackdrop.click()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [user, navigate])
}
