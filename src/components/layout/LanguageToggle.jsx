import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../contexts/LanguageContext'
import { Globe } from 'lucide-react'

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()
  const { t } = useTranslation()

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-200 hover:bg-dark-300 border border-white/10 transition-all duration-300 group"
      title={language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
    >
      <Globe className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
      <span className="text-sm font-medium text-white/80">
        {language === 'ar' ? 'EN' : 'عر'}
      </span>
    </button>
  )
}
