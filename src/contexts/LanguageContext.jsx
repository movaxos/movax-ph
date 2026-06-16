import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { changeLanguage } from '../i18n'

const LanguageContext = createContext()

export function LanguageProvider({ children, initialLang = 'ar' }) {
  const { i18n } = useTranslation()
  const [language, setLanguageState] = useState(() => {
    // Initialize from i18n's current language
    return i18n.language || initialLang
  })
  const dir = language === 'ar' ? 'rtl' : 'ltr'

  // Sync language state with i18n
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setLanguageState(lng)
    }
    i18n.on('languageChanged', handleLanguageChange)

    // Set initial language state
    setLanguageState(i18n.language)

    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang)
    changeLanguage(lang)
  }, [])

  const toggleLanguage = useCallback(() => {
    const newLang = language === 'ar' ? 'en' : 'ar'
    setLanguage(newLang)
  }, [language, setLanguage])

  return (
    <LanguageContext.Provider value={{ language, dir, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
