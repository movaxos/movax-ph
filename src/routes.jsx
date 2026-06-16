import { Routes, Route } from 'react-router-dom'
import { useLanguage } from './contexts/LanguageContext'
import { useEffect } from 'react'
import Layout from './components/layout/Layout'
import LandingPage from './pages/LandingPage'
import UploadPage from './pages/UploadPage'
import GenerationPage from './pages/GenerationPage'
import DashboardPage from './pages/DashboardPage'
import ProjectsPage from './pages/ProjectsPage'
import SettingsPage from './pages/SettingsPage'
import AuthPage from './pages/AuthPage'
import ProtectedRoute from './components/auth/ProtectedRoute'

function AppRoutes() {
  const { language, dir } = useLanguage()

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = dir
    document.body.style.fontFamily = language === 'ar'
      ? "'IBM Plex Sans Arabic', 'Cairo', sans-serif"
      : "'Inter', 'DM Sans', sans-serif"
  }, [language, dir])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="upload" element={
          <ProtectedRoute>
            <UploadPage />
          </ProtectedRoute>
        } />
        <Route path="generate/:projectId" element={
          <ProtectedRoute>
            <GenerationPage />
          </ProtectedRoute>
        } />
        <Route path="dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="projects" element={
          <ProtectedRoute>
            <ProjectsPage />
          </ProtectedRoute>
        } />
        <Route path="settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
        <Route path="auth" element={<AuthPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
