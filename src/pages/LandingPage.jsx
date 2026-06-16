import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { motion } from 'framer-motion'
import {
  Upload, Sparkles, Download, Play,
  Sparkles as SparkleIcon, Coffee, Layout, Box, Crown,
  Leaf, Square, Smartphone, Film, Calendar,
  Check, Star, ChevronDown
} from 'lucide-react'
import { showcaseStyles } from '../lib/styles'

export default function LandingPage() {
  const { t } = useTranslation()
  const { language } = useLanguage()

  const styleIcons = {
    heroDramatic: SparkleIcon,
    lifestyleScene: Coffee,
    flatLayEditorial: Layout,
    floating3D: Box,
    luxuryGold: Crown,
    natureOrganic: Leaf,
    minimalistClean: Square,
    socialMediaReady: Smartphone,
    cinematicScene: Film,
    seasonal: Calendar,
  }

  const testimonials = [
    {
      id: 1,
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
      role: language === 'ar' ? 'صاحب متجر إلكتروني' : 'E-commerce Store Owner',
      location: language === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: language === 'ar'
        ? 'موفاكس غيرت طريقة عرض منتجاتي تماماً. صور احترافية في ثواني بدلاً من تكاليف التصوير المكلفة!'
        : 'MOVAX completely changed how I showcase my products. Professional photos in seconds instead of costly photography!',
    },
    {
      id: 2,
      name: language === 'ar' ? 'سارة العلي' : 'Sara Al-Ali',
      role: language === 'ar' ? 'بائعة جملة' : 'Wholesale Seller',
      location: language === 'ar' ? 'دبي، الإمارات' : 'Dubai, UAE',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: language === 'ar'
        ? 'أسلوب الفاخر الذهبي رائع للمجوهرات. عملائي معجبون جداً بالصور النهائية!'
        : 'The Luxury Gold style is amazing for jewelry. My clients love the final images!'
    },
    {
      id: 3,
      name: language === 'ar' ? 'خالد السعيد' : 'Khaled Al-Saeed',
      role: language === 'ar' ? 'مدير تسويق' : 'Marketing Manager',
      location: language === 'ar' ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: language === 'ar'
        ? 'التكامل مع السوشيال ميديا سهل جداً. ٣ أحجام جاهزة للنشر!'
        : 'Social media integration is so easy. 3 sizes ready to post!'
    },
  ]

  const faqs = [
    {
      question: language === 'ar' ? 'ما نوع الصور التي يمكنني رفعها؟' : 'What types of images can I upload?',
      answer: language === 'ar'
        ? 'يمكنك رفع أي صورة منتج، حتى لو كانت بجودة منخفضة أو مأخوذة بالهاتف. الذكاء الاصطناعي سيحسنها تلقائياً.'
        : 'You can upload any product image, even low quality or phone photos. AI will automatically enhance it.',
    },
    {
      question: language === 'ar' ? 'كم من الوقت يستغرق التوليد؟' : 'How long does generation take?',
      answer: language === 'ar'
        ? 'عادة من ٣-١٠ ثواني للحصول على صورة واحدة، حسب الأسلوب المختار.'
        : 'Usually 3-10 seconds for one image, depending on the selected style.',
    },
    {
      question: language === 'ar' ? 'هل يمكنني استخدام الصور تجارياً؟' : 'Can I use the images commercially?',
      answer: language === 'ar'
        ? 'نعم! الصور المولدة ملكك بالكامل ويمكن استخدامها في متجرك أو حملاتك الإعلانية.'
        : 'Yes! The generated images are completely yours to use in your store or ad campaigns.',
    },
    {
      question: language === 'ar' ? 'ما شكل الدفع المدعوم؟' : 'What payment methods are supported?',
      answer: language === 'ar'
        ? 'نقبل بطاقات الائتمان (فيزا، ماستركارد) وبطاقات مدى عبر Stripe.'
        : 'We accept credit cards (Visa, Mastercard) and Mada cards through Stripe.',
    },
  ]

  const productCategories = [
    { name: language === 'ar' ? 'العطور' : 'Perfumes', icon: SparkleIcon },
    { name: language === 'ar' ? 'الساعات' : 'Watches', icon: Play },
    { name: language === 'ar' ? 'العناية بالبشرة' : 'Skincare', icon: Sparkles },
    { name: language === 'ar' ? 'الإلكترونيات' : 'Electronics', icon: Smartphone },
    { name: language === 'ar' ? 'المجوهرات' : 'Jewelry', icon: Crown },
    { name: language === 'ar' ? 'الأطعمة' : 'Food', icon: Coffee },
    { name: language === 'ar' ? 'الملابس' : 'Clothing', icon: Sparkles },
    { name: language === 'ar' ? 'مستحضرات التجميل' : 'Cosmetics', icon: SparkleIcon },
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 end-1/4 w-80 h-80 bg-mint/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              {language === 'ar' ? 'مدعوم بالذكاء الاصطناعي' : 'AI-Powered'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            <span className="text-gradient">{t('landing.heroTitle').split('.')[0]}</span>
            <span className="text-white">{t('landing.heroTitle').includes('.') ? '.' : ''}</span>
            <br />
            {language === 'ar' ? (
              <>
                <span>جودة استوديو.</span>
                <span className="text-primary"> ١٠ ثواني.</span>
              </>
            ) : (
              <>
                <span>Studio quality.</span>
                <span className="text-primary"> 10 seconds.</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 mb-8 max-w-2xl mx-auto"
          >
            {t('landing.heroSubtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/auth?mode=signup"
              className="btn-primary text-lg px-8 py-4 glow-primary"
            >
              {t('common.getStarted')}
            </Link>
            <a
              href="#how-it-works"
              className="btn-secondary text-lg px-8 py-4"
            >
              {t('common.learnMore')}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">10K+</div>
              <div className="text-sm text-white/50">
                {language === 'ar' ? 'صور مولدة' : 'Images Generated'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-mint">500+</div>
              <div className="text-sm text-white/50">
                {language === 'ar' ? 'بائع نشط' : 'Active Sellers'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold">4.9</div>
              <div className="text-sm text-white/50">
                {language === 'ar' ? 'تقييم المستخدمين' : 'User Rating'}
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-white/30" />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('landing.howItWorks')}
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'ثلاث خطوات بسيطة للحصول على صور احترافية'
                : 'Three simple steps to get professional images'
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Upload, title: t('landing.step1Title'), desc: t('landing.step1Desc'), color: 'primary' },
              { icon: Sparkles, title: t('landing.step2Title'), desc: t('landing.step2Desc'), color: 'mint' },
              { icon: Download, title: t('landing.step3Title'), desc: t('landing.step3Desc'), color: 'gold' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="card p-8 text-center h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-${step.color}/20 flex items-center justify-center mx-auto mb-6`}>
                    <step.icon className={`w-8 h-8 text-${step.color}`} />
                  </div>
                  <div className="absolute -top-3 start-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-dark-100 border border-white/10 flex items-center justify-center text-primary font-bold">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-white/60">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Styles Section */}
      <section id="styles" className="py-24 px-4 bg-dark-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('landing.stylesTitle')}
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              {t('landing.stylesSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {showcaseStyles.map((style, i) => {
              const IconComponent = styleIcons[style.key]
              return (
                <motion.div
                  key={style.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-xl aspect-square">
                    <img
                      src={style.preview}
                      alt={t(`styles.${style.key}.name`)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 inset-x-0 p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-semibold text-white">
                          {t(`styles.${style.key}.name`)}
                        </h3>
                      </div>
                      <p className="text-xs text-white/60 line-clamp-1">
                        {t(`styles.${style.key}.bestFor`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Works Best For */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('landing.worksBestFor')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {productCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-dark-100 border border-white/5 hover:border-primary/30 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-white font-medium">{cat.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-dark-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('landing.pricingTitle')}
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              {t('landing.pricingSubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{t('pricing.free')}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">{t('pricing.freePrice')}</span>
              </div>
              <p className="text-sm text-white/50 mb-6">{t('pricing.freeDesc')}</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-white/70">
                  <Check className="w-4 h-4 text-mint" />
                  5 {t('pricing.generations')}
                </li>
                <li className="flex items-center gap-2 text-sm text-white/70">
                  <Check className="w-4 h-4 text-mint" />
                  2 {language === 'ar' ? 'أساليب' : 'styles'}
                </li>
                <li className="flex items-center gap-2 text-sm text-white/50">
                  <Check className="w-4 h-4 text-white/30" />
                  {language === 'ar' ? 'علامة مائية' : 'Watermarked'}
                </li>
              </ul>
              <Link to="/auth?mode=signup" className="btn-outline w-full text-center block">
                {t('common.tryFree')}
              </Link>
            </motion.div>

            {/* Starter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{t('pricing.starter')}</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold text-white">{t('pricing.starterPrice')}</span>
                <span className="text-white/50">{t('pricing.starterPeriod')}</span>
              </div>
              <p className="text-xs text-white/40 mb-4">~{language === 'ar' ? '٩٠٠ جنيه مصري' : '300 EGP'}</p>
              <p className="text-sm text-white/50 mb-6">{t('pricing.starterDesc')}</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-white/70">
                  <Check className="w-4 h-4 text-mint" />
                  50 {t('pricing.generations')}
                </li>
                <li className="flex items-center gap-2 text-sm text-white/70">
                  <Check className="w-4 h-4 text-mint" />
                  {t('pricing.stylesUnlimited')}
                </li>
                <li className="flex items-center gap-2 text-sm text-white/70">
                  <Check className="w-4 h-4 text-mint" />
                  {t('pricing.noWatermark')}
                </li>
              </ul>
              <Link to="/auth?mode=signup" className="btn-secondary w-full text-center block">
                {t('common.getStarted')}
              </Link>
            </motion.div>

            {/* Pro - Highlighted */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card p-6 border-primary/50 relative glow-primary"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary rounded-full text-xs font-semibold text-white">
                {t('pricing.proDesc')}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('pricing.pro')}</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold text-primary">{t('pricing.proPrice')}</span>
                <span className="text-white/50">{t('pricing.proPeriod')}</span>
              </div>
              <p className="text-xs text-white/40 mb-4">~{language === 'ar' ? '١٩٠٠ جنيه مصري' : '750 SAR'}</p>
              <p className="text-sm text-white/50 mb-6">{t('common.mostPopular')} ⭐</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-white/70">
                  <Check className="w-4 h-4 text-mint" />
                  {language === 'ar' ? 'غير محدود' : 'Unlimited'}
                </li>
                <li className="flex items-center gap-2 text-sm text-white/70">
                  <Check className="w-4 h-4 text-mint" />
                  {t('pricing.stylesUnlimited')} + {language === 'ar' ? 'الموسمي' : 'Seasonal'}
                </li>
                <li className="flex items-center gap-2 text-sm text-white/70">
                  <Check className="w-4 h-4 text-mint" />
                  8 {language === 'ar' ? 'صور لكل منتج' : 'images per product'}
                </li>
                <li className="flex items-center gap-2 text-sm text-white/70">
                  <Check className="w-4 h-4 text-mint" />
                  {t('pricing.socialMediaCrop')}
                </li>
              </ul>
              <Link to="/auth?mode=signup" className="btn-primary w-full text-center block glow-primary">
                {t('common.getStarted')}
              </Link>
            </motion.div>

            {/* Business */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{t('pricing.business')}</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold text-white">{t('pricing.businessPrice')}</span>
                <span className="text-white/50">{t('pricing.businessPeriod')}</span>
              </div>
              <p className="text-xs text-white/40 mb-4">~{language === 'ar' ? '٤٩٠٠ جنيه مصري' : '1,800 SAR'}</p>
              <p className="text-sm text-white/50 mb-6">{t('pricing.businessDesc')}</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-white/70">
                  <Check className="w-4 h-4 text-mint" />
                  {t('pricing.apiAccess')}
                </li>
                <li className="flex items-center gap-2 text-sm text-white/70">
                  <Check className="w-4 h-4 text-mint" />
                  5 {t('pricing.teamSeats')}
                </li>
                <li className="flex items-center gap-2 text-sm text-white/70">
                  <Check className="w-4 h-4 text-mint" />
                  {t('pricing.customPresets')}
                </li>
                <li className="flex items-center gap-2 text-sm text-white/70">
                  <Check className="w-4 h-4 text-mint" />
                  {t('pricing.priorityQueue')}
                </li>
              </ul>
              <Link to="/auth?mode=signup" className="btn-secondary w-full text-center block">
                {t('common.getStarted')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('landing.testimonialsTitle')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-white/70 mb-6">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-white">{testimonial.name}</div>
                    <div className="text-xs text-white/50">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-dark-100">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('landing.faqTitle')}
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group card"
              >
                <summary className="p-4 cursor-pointer text-white font-medium flex justify-between items-center">
                  {faq.question}
                  <ChevronDown className="w-5 h-5 text-white/50 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-white/60">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card p-12 text-center glow-primary"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === 'ar'
                ? 'جاهز تحول صور منتجاتك؟'
                : 'Ready to transform your product images?'
              }
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              {language === 'ar'
                ? 'ابدأ مجاناً واحصل على ٥ صور عرض احترافية بدون بطاقة ائتمان'
                : 'Start free and get 5 professional showcase images without a credit card'
              }
            </p>
            <Link to="/auth?mode=signup" className="btn-primary text-lg px-10 py-4 glow-primary">
              {t('common.getStarted')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
