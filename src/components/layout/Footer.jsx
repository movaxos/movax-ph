import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../contexts/LanguageContext'
import { Sparkles, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()
  const { language } = useLanguage()

  return (
    <footer className="bg-dark-100 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">
                {language === 'ar' ? 'موفاكس بي اتش' : 'MOVAX PH'}
              </span>
            </Link>
            <p className="text-sm text-white/50 mb-4">
              {language === 'ar'
                ? 'منصة العرض المرئي للمنتجات بالذكاء الاصطناعي'
                : 'AI-powered product showcase platform'
              }
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-dark-200 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 text-white/70 hover:text-primary" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-dark-200 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4 text-white/70 hover:text-primary" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-dark-200 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4 text-white/70 hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              {language === 'ar' ? 'المنتج' : 'Product'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#how-it-works" className="text-sm text-white/50 hover:text-primary transition-colors">
                  {t('landing.howItWorks')}
                </a>
              </li>
              <li>
                <a href="#styles" className="text-sm text-white/50 hover:text-primary transition-colors">
                  {t('landing.stylesTitle')}
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-sm text-white/50 hover:text-primary transition-colors">
                  {t('landing.pricingTitle')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">
              {language === 'ar' ? 'الشركة' : 'Company'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-white/50 hover:text-primary transition-colors">
                  {language === 'ar' ? 'من نحن' : 'About'}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/50 hover:text-primary transition-colors">
                  {language === 'ar' ? 'تواصل معنا' : 'Contact'}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/50 hover:text-primary transition-colors">
                  {language === 'ar' ? 'الوظائف' : 'Careers'}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">
              {language === 'ar' ? 'الدعم' : 'Support'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-white/50 hover:text-primary transition-colors">
                  {language === 'ar' ? 'مركز المساعدة' : 'Help Center'}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/50 hover:text-primary transition-colors">
                  {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/50 hover:text-primary transition-colors">
                  {language === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} MOVAX PH. {t('common.allRightsReserved')}
          </p>
          <div className="flex items-center gap-4 text-sm text-white/40">
            <span dir="ltr">Made with ❤️ in Egypt</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
