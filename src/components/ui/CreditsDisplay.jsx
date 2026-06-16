import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext'
import { Zap } from 'lucide-react'

export default function CreditsDisplay() {
  const { t } = useTranslation()
  const { profile } = useAuth()

  const credits = profile?.credits_remaining || 0
  const plan = profile?.subscription_plan || 'free'
  const maxCredits = plan === 'pro' ? Infinity : plan === 'starter' ? 50 : plan === 'business' ? Infinity : 5

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-200 border border-white/5">
      <Zap className="w-4 h-4 text-gold" />
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-semibold text-white">{credits}</span>
        <span className="text-xs text-white/50">{t('common.creditsRemaining')}</span>
      </div>
      {credits < 3 && (
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      )}
    </div>
  )
}
