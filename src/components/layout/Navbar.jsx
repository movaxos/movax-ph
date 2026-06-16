import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { Sparkles, Menu, X } from 'lucide-react'
import { useState } from 'react'
import LanguageToggle from './LanguageToggle'
import CreditsDisplay from '../ui/CreditsDisplay'

export default function Navbar() {
  const { t } = useTranslation()
  const { user, signOut } = useAuth()
  const { language, dir } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isLanding = location.pathname === '/'

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isLanding ? 'bg-transparent' : 'bg-dark/80 backdrop-blur-xl border-b border-white/5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center glow-primary">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight text-white group-hover:text-primary transition-colors">
                {language === 'ar' ? 'موفاكس' : 'MOVAX'}
              </span>
              <span className="text-xs text-white/50 leading-tight">
                {language === 'ar' ? 'بي اتش' : 'PH'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/dashboard' ? 'text-primary' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {t('common.dashboard')}
                </Link>
                <Link
                  to="/projects"
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/projects' ? 'text-primary' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {t('common.myProjects')}
                </Link>
                <Link
                  to="/settings"
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/settings' ? 'text-primary' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {t('common.settings')}
                </Link>
              </>
            ) : (
              <>
                <a href="#how-it-works" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                  {t('landing.howItWorks')}
                </a>
                <a href="#styles" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                  {t('landing.stylesTitle')}
                </a>
                <a href="#pricing" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                  {t('landing.pricingTitle')}
                </a>
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            {user ? (
              <>
                <CreditsDisplay />
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  {t('common.signOut')}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/auth"
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  {t('common.signIn')}
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="btn-primary text-sm py-2 px-4"
                >
                  {t('common.getStarted')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col gap-4">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-white/70 hover:text-white transition-colors">
                    {t('common.dashboard')}
                  </Link>
                  <Link to="/projects" onClick={() => setMobileMenuOpen(false)} className="text-white/70 hover:text-white transition-colors">
                    {t('common.myProjects')}
                  </Link>
                  <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="text-white/70 hover:text-white transition-colors">
                    {t('common.settings')}
                  </Link>
                  <div className="pt-4 border-t border-white/5">
                    <CreditsDisplay />
                  </div>
                  <button onClick={handleSignOut} className="text-white/70 hover:text-white transition-colors text-start">
                    {t('common.signOut')}
                  </button>
                </>
              ) : (
                <>
                  <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-white/70 hover:text-white transition-colors">
                    {t('landing.howItWorks')}
                  </a>
                  <a href="#styles" onClick={() => setMobileMenuOpen(false)} className="text-white/70 hover:text-white transition-colors">
                    {t('landing.stylesTitle')}
                  </a>
                  <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-white/70 hover:text-white transition-colors">
                    {t('landing.pricingTitle')}
                  </a>
                  <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="text-white/70 hover:text-white transition-colors">
                      {t('common.signIn')}
                    </Link>
                    <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-center">
                      {t('common.getStarted')}
                    </Link>
                  </div>
                </>
              )}
              <div className="pt-4 border-t border-white/5">
                <LanguageToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
