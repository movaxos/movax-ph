import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthContext'
import { AppProvider } from './contexts/AppContext'
import AppRoutes from './routes'

function App() {
  const savedLang = localStorage.getItem('language') || 'ar'

  return (
    <BrowserRouter>
      <LanguageProvider initialLang={savedLang}>
        <AuthProvider>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App
