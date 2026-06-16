import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { Sparkles, Image, TrendingUp, Plus, Clock, Download, Eye } from 'lucide-react'
import Button from '../components/ui/Button'

export default function DashboardPage() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const { user, profile } = useAuth()

  const [stats, setStats] = useState({
    imagesThisMonth: 0,
    favoriteStyle: '-',
    totalProjects: 0,
  })
  const [recentProjects, setRecentProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      // Fetch user's projects
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('id, name, product_category, product_category_ar, original_image_url, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(12)

      if (projectsError) throw projectsError

      // Fetch generated images count this month
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      const { count, error: countError } = await supabase
        .from('generated_images')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', startOfMonth.toISOString())

      if (countError) throw countError

      // Get most used style
      const { data: styleData, error: styleError } = await supabase
        .from('generated_images')
        .select('style')
        .eq('user_id', user.id)
        .limit(100)

      if (styleError) throw styleError

      const styleCounts = {}
      styleData?.forEach((item) => {
        if (item.style) {
          styleCounts[item.style] = (styleCounts[item.style] || 0) + 1
        }
      })

      const favoriteStyle = Object.entries(styleCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-'

      setStats({
        imagesThisMonth: count || 0,
        favoriteStyle: formatStyleName(favoriteStyle),
        totalProjects: projects?.length || 0,
      })

      setRecentProjects(projects || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatStyleName = (styleId) => {
    if (!styleId || styleId === '-') return '-'
    const styleNames = {
      'hero-dramatic': { en: 'Hero Dramatic', ar: 'بطولي درامي' },
      'lifestyle-scene': { en: 'Lifestyle Scene', ar: 'مشهد حياتي' },
      'flat-lay-editorial': { en: 'Flat Lay Editorial', ar: 'فلات لاي إبداعي' },
      'floating-3d': { en: 'Floating 3D', ar: 'عائم ثلاثي الأبعاد' },
      'luxury-gold': { en: 'Luxury Gold', ar: 'فاخر ذهبي' },
      'nature-organic': { en: 'Nature Organic', ar: 'طبيعي أورجانيك' },
      'minimalist-clean': { en: 'Minimalist Clean', ar: 'مينيمال نظيف' },
      'social-media-ready': { en: 'Social Media Ready', ar: 'جاهز للسوشيال' },
      'cinematic-scene': { en: 'Cinematic Scene', ar: 'سينمائي' },
      'seasonal': { en: 'Seasonal', ar: 'موسمي' },
    }
    return styleNames[styleId]?.[language] || styleId
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {t('dashboard.welcome')}, {profile?.full_name || user?.email?.split('@')[0]}!
            </h1>
            <p className="text-white/50">
              {language === 'ar'
                ? 'مرحباً بعودتك إلى لوحة التحكم'
                : 'Welcome back to your dashboard'
              }
            </p>
          </div>

          <Link to="/upload">
            <Button icon={<Plus className="w-5 h-5" />}>
              {t('dashboard.startNewProject')}
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Image className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.imagesThisMonth}</p>
                <p className="text-sm text-white/50">{t('dashboard.imagesThisMonth')}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-mint/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-mint" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.favoriteStyle}</p>
                <p className="text-sm text-white/50">{t('dashboard.favoriteStyle')}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{profile?.credits_remaining ?? 5}</p>
                <p className="text-sm text-white/50">{t('common.creditsRemaining')}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              {t('dashboard.recentProjects')}
            </h2>
            <Link to="/projects" className="text-sm text-primary hover:underline">
              {t('dashboard.viewAll')}
            </Link>
          </div>

          {recentProjects.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {recentProjects.slice(0, 8).map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card overflow-hidden group cursor-pointer"
                >
                  <div className="relative aspect-square">
                    <img
                      src={project.original_image_url || 'https://via.placeholder.com/400'}
                      alt={project.name || 'Project'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        to={`/projects/${project.id}`}
                        className="p-3 rounded-full bg-primary/20 backdrop-blur-sm text-white hover:bg-primary/30 transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-white truncate">
                      {language === 'ar' ? project.product_category_ar : project.product_category}
                    </p>
                    <p className="text-xs text-white/40 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {new Date(project.created_at).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-dark-200 flex items-center justify-center mx-auto mb-4">
                <Image className="w-8 h-8 text-white/20" />
              </div>
              <h3 className="text-lg font-medium text-white/50 mb-2">
                {t('projects.noProjects')}
              </h3>
              <p className="text-sm text-white/30 mb-6">
                {language === 'ar'
                  ? 'ابدأ بإنشاء مشروعك الأول'
                  : 'Start by creating your first project'
                }
              </p>
              <Link to="/upload">
                <Button icon={<Plus className="w-5 h-5" />}>
                  {t('dashboard.startNewProject')}
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Upgrade Prompt for Free Users */}
        {profile?.subscription_plan === 'free' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6 mt-8 bg-gradient-to-r from-primary/20 to-mint/20 border-primary/30"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {language === 'ar' ? 'ترقية للخطة الاحترافية' : 'Upgrade to Pro'}
                </h3>
                <p className="text-white/60">
                  {language === 'ar'
                    ? 'احصل على توليدات غير محدودة وجميع الأساليب'
                    : 'Get unlimited generations and all styles'
                  }
                </p>
              </div>
              <Link to="/settings#billing">
                <Button icon={<Sparkles className="w-5 h-5" />}>
                  {t('common.upgrade')}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
