import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'

export default function Layout() {
  const location = useLocation()
  const isLanding = location.pathname === '/'
  const isAuth = location.pathname === '/auth'

  useKeyboardShortcuts()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-dark">
      {!isAuth && <Navbar />}
      <main className={`flex-1 ${isLanding ? '' : 'pt-16'}`}>
        <Outlet />
      </main>
      {isLanding && <Footer />}
    </div>
  )
}
