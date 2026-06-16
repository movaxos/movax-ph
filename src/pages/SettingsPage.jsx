import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import {
  User, Globe, CreditCard, Download, Bell, Shield, Loader2, Check, AlertCircle, FileText
} from 'lucide-react'
import Button from '../components/ui/Button'
import { formatBytes } from '../lib/utils'

export default function SettingsPage() {
  const { t } = useTranslation()
  const { language, setLanguage } = useLanguage()
  const { user, profile, updateProfile } = useAuth()

  const [activeTab, setActiveTab] = useState('account')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    language: 'ar',
  })
  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        email: profile.email || user?.email || '',
        language: profile.language_preference || language,
      })
    }
  }, [profile, user, language])

  useEffect(() => {
    if (user) {
      fetchInvoices()
    }
  }, [user])

  const fetchInvoices = async () => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setInvoices(data)
      }
    } catch (error) {
      console.error('Error fetching invoices:', error)
    }
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      await updateProfile({
        full_name: formData.full_name,
        language_preference: formData.language,
      })

      if (formData.language !== language) {
        setLanguage(formData.language)
      }

      setMessage({ type: 'success', text: language === 'ar' ? 'تم الحفظ بنجاح' : 'Saved successfully' })
    } catch (error) {
      setMessage({ type: 'error', text: error.message || (language === 'ar' ? 'حدث خطأ' : 'An error occurred') })
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'account', label: language === 'ar' ? 'الحساب' : 'Account', icon: User },
    { id: 'billing', label: language === 'ar' ? 'الفواتير' : 'Billing', icon: CreditCard },
    { id: 'preferences', label: language === 'ar' ? 'التفضيلات' : 'Preferences', icon: Bell },
  ]

  const plans = {
    free: { name: language === 'ar' ? 'مجاني' : 'Free', credits: 5 },
    starter: { name: language === 'ar' ? 'المبتدئ' : 'Starter', credits: 50 },
    pro: { name: language === 'ar' ? 'الاحترافي' : 'Pro', credits: language === 'ar' ? 'غير محدود' : 'Unlimited' },
    business: { name: language === 'ar' ? 'الأعمال' : 'Business', credits: language === 'ar' ? 'غير محدود' : 'Unlimited' },
  }

  const currentPlan = profile?.subscription_plan || 'free'

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          {t('common.settings')}
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-48 flex-shrink-0">
            <nav className="flex md:flex-col gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-start transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary/20 text-primary'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-2 p-4 rounded-lg mb-6 ${
                  message.type === 'success'
                    ? 'bg-mint/10 border border-mint/20 text-mint'
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                }`}
              >
                {message.type === 'success' ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                {message.text}
              </motion.div>
            )}

            {activeTab === 'account' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6">
                  {t('settings.accountInfo')}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="label">
                      {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="input"
                      placeholder={language === 'ar' ? 'الاسم الكامل' : 'Full name'}
                    />
                  </div>

                  <div>
                    <label className="label">
                      {t('auth.email')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="input opacity-60 cursor-not-allowed"
                    />
                    <p className="text-xs text-white/40 mt-1">
                      {language === 'ar' ? 'لا يمكن تغيير البريد الإلكتروني' : 'Email cannot be changed'}
                    </p>
                  </div>

                  <div>
                    <label className="label">
                      {t('settings.language')}
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="input"
                    >
                      <option value="ar">{t('settings.arabic')}</option>
                      <option value="en">{t('settings.english')}</option>
                    </select>
                  </div>

                  <Button onClick={handleSaveProfile} disabled={saving} className="mt-4">
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t('common.loading')}
                      </>
                    ) : (
                      t('common.save')
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {activeTab === 'billing' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Current Plan */}
                <div className="card p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    {t('settings.planDetails')}
                  </h2>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                    <div>
                      <p className="text-sm text-white/50">
                        {language === 'ar' ? 'الخطة الحالية' : 'Current Plan'}
                      </p>
                      <p className="text-2xl font-bold text-white">
                        {plans[currentPlan]?.name}
                      </p>
                    </div>
                    <div className="text-end">
                      <p className="text-sm text-white/50">
                        {t('common.creditsRemaining')}
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {profile?.credits_remaining ?? plans[currentPlan]?.credits}
                      </p>
                    </div>
                  </div>

                  {/* Usage Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-white/50 mb-2">
                      <span>{t('settings.usage')}</span>
                      <span>{profile?.credits_used_this_month || 0} {language === 'ar' ? 'مستخدم' : 'used'}</span>
                    </div>
                    <div className="w-full h-2 bg-dark-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-mint rounded-full"
                        style={{ width: `${Math.min(((profile?.credits_used_this_month || 0) / (plans[currentPlan]?.credits || 100)) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {currentPlan !== 'pro' && currentPlan !== 'business' && (
                    <Button variant="primary" className="w-full">
                      <CreditCard className="w-5 h-5" />
                      {t('common.upgrade')}
                    </Button>
                  )}
                </div>

                {/* Buy Credits */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {t('common.buyCredits')}
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { credits: 10, price: '$4.99' },
                      { credits: 25, price: '$9.99' },
                      { credits: 50, price: '$17.99' },
                    ].map((option) => (
                      <button
                        key={option.credits}
                        className="p-4 rounded-xl bg-dark-200 border border-white/10 hover:border-primary/50 transition-all text-center"
                      >
                        <p className="text-2xl font-bold text-white">{option.credits}</p>
                        <p className="text-sm text-white/50 mb-2">
                          {language === 'ar' ? 'توليدات' : 'generations'}
                        </p>
                        <p className="text-primary font-semibold">{option.price}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Invoices */}
                {invoices.length > 0 && (
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {t('settings.invoices')}
                    </h3>
                    <div className="space-y-2">
                      {invoices.map((invoice) => (
                        <div
                          key={invoice.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-dark-200"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-white/50" />
                            <div>
                              <p className="text-white font-medium">{invoice.plan_name}</p>
                              <p className="text-sm text-white/50">
                                {new Date(invoice.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-white">
                              ${(invoice.amount / 100).toFixed(2)}
                            </span>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'preferences' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6">
                  {language === 'ar' ? 'التفضيلات' : 'Preferences'}
                </h2>

                <div className="space-y-6">
                  {/* Language Preferences */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-dark-200">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-white/50" />
                      <div>
                        <p className="text-white font-medium">
                          {t('settings.language')}
                        </p>
                        <p className="text-sm text-white/50">
                          {language === 'ar' ? 'اختر لغة الواجهة' : 'Choose interface language'}
                        </p>
                      </div>
                    </div>
                    <select
                      value={formData.language}
                      onChange={(e) => {
                        setFormData({ ...formData, language: e.target.value })
                        setLanguage(e.target.value)
                      }}
                      className="input w-32"
                    >
                      <option value="ar">{t('settings.arabic')}</option>
                      <option value="en">{t('settings.english')}</option>
                    </select>
                  </div>

                  {/* Notifications */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-dark-200">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-white/50" />
                      <div>
                        <p className="text-white font-medium">
                          {language === 'ar' ? 'الإشعارات' : 'Notifications'}
                        </p>
                        <p className="text-sm text-white/50">
                          {language === 'ar' ? 'إشعارات البريد الإلكتروني' : 'Email notifications'}
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-dark-300 rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
