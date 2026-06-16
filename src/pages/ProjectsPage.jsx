import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { Search, Filter, Download, Eye, Trash2, Calendar, X, Check, Loader2 } from 'lucide-react'
import Button from '../components/ui/Button'
import { showcaseStyles } from '../lib/styles'

export default function ProjectsPage() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const { user } = useAuth()

  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('all')
  const [selectedDate, setSelectedDate] = useState('all')
  const [selectedProjects, setSelectedProjects] = useState([])
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (user) {
      fetchProjects()
    }
  }, [user])

  useEffect(() => {
    filterProjects()
  }, [projects, searchQuery, selectedStyle, selectedDate])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          id,
          name,
          product_category,
          product_category_ar,
          original_image_url,
          selected_styles,
          created_at,
          generated_images (
            id,
            style,
            style_name_ar,
            generated_image_url,
            thumbnail_url
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterProjects = () => {
    let filtered = [...projects]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((project) =>
        project.product_category?.toLowerCase().includes(query) ||
        project.product_category_ar?.includes(query) ||
        project.name?.toLowerCase().includes(query)
      )
    }

    // Style filter
    if (selectedStyle !== 'all') {
      filtered = filtered.filter((project) =>
        project.selected_styles?.includes(selectedStyle)
      )
    }

    // Date filter
    if (selectedDate !== 'all') {
      const now = new Date()
      let startDate

      switch (selectedDate) {
        case 'today':
          startDate = new Date(now.setHours(0, 0, 0, 0))
          break
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - 7))
          break
        case 'month':
          startDate = new Date(now.setMonth(now.getMonth() - 1))
          break
        default:
          startDate = null
      }

      if (startDate) {
        filtered = filtered.filter(
          (project) => new Date(project.created_at) >= startDate
        )
      }
    }

    setFilteredProjects(filtered)
  }

  const toggleProjectSelection = (projectId) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter((id) => id !== projectId))
    } else {
      setSelectedProjects([...selectedProjects, projectId])
    }
  }

  const selectAll = () => {
    if (selectedProjects.length === filteredProjects.length) {
      setSelectedProjects([])
    } else {
      setSelectedProjects(filteredProjects.map((p) => p.id))
    }
  }

  const deleteSelected = async () => {
    if (!confirm(language === 'ar' ? 'هل أنت متأكد من حذف المشاريع المحددة؟' : 'Are you sure you want to delete selected projects?')) {
      return
    }

    setDeleting(true)
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .in('id', selectedProjects)
        .eq('user_id', user.id)

      if (error) throw error

      setProjects(projects.filter((p) => !selectedProjects.includes(p.id)))
      setSelectedProjects([])
    } catch (error) {
      console.error('Error deleting projects:', error)
    } finally {
      setDeleting(false)
    }
  }

  const downloadSelected = async () => {
    // In real implementation, this would create a ZIP file
    // For now, just download first image from each selected project
    for (const projectId of selectedProjects) {
      const project = projects.find((p) => p.id === projectId)
      if (project?.generated_images?.[0]?.generated_image_url) {
        const link = document.createElement('a')
        link.href = project.generated_images[0].generated_image_url
        link.download = `movax-${project.id}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-white">
            {t('common.myProjects')}
          </h1>

          <Link to="/upload">
            <Button>
              {language === 'ar' ? 'مشروع جديد' : 'New Project'}
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-white/30" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('projects.searchPlaceholder')}
                className="input ps-10"
              />
            </div>

            {/* Style Filter */}
            <div className="relative">
              <Filter className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-white/30" />
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="input ps-10 pe-10 min-w-[180px]"
              >
                <option value="all">{language === 'ar' ? 'جميع الأساليب' : 'All Styles'}</option>
                {showcaseStyles.map((style) => (
                  <option key={style.id} value={style.id}>
                    {language === 'ar' ? style.id : t(`styles.${style.key}.name`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div className="relative">
              <Calendar className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-white/30" />
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input ps-10 pe-10 min-w-[150px]"
              >
                <option value="all">{language === 'ar' ? 'كل الأوقات' : 'All Time'}</option>
                <option value="today">{language === 'ar' ? 'اليوم' : 'Today'}</option>
                <option value="week">{language === 'ar' ? 'هذا الأسبوع' : 'This Week'}</option>
                <option value="month">{language === 'ar' ? 'هذا الشهر' : 'This Month'}</option>
              </select>
            </div>
          </div>

          {/* Selection Actions */}
          {selectedProjects.length > 0 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <span className="text-sm text-white/50">
                {selectedProjects.length} {language === 'ar' ? 'محدد' : 'selected'}
              </span>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={downloadSelected}>
                  <Download className="w-4 h-4" />
                  {t('projects.downloadSelected')}
                </Button>
                <Button variant="danger" size="sm" onClick={deleteSelected} disabled={deleting}>
                  {deleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  {language === 'ar' ? 'حذف' : 'Delete'}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <>
            {/* Select All */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={selectAll}
                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  selectedProjects.length === filteredProjects.length
                    ? 'bg-primary border-primary'
                    : 'border-white/20 hover:border-primary/50'
                }`}
              >
                {selectedProjects.length === filteredProjects.length && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </button>
              <span className="text-sm text-white/50">
                {language === 'ar' ? 'تحديد الكل' : 'Select all'}
              </span>
            </div>

            {/* Masonry-style grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filteredProjects.map((project, i) => {
                const images = project.generated_images || []
                const thumbnail = images[0]?.generated_image_url || project.original_image_url

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="break-inside-avoid"
                  >
                    <div className="card overflow-hidden group">
                      <div className="relative">
                        {/* Selection Checkbox */}
                        <button
                          onClick={() => toggleProjectSelection(project.id)}
                          className={`absolute top-3 start-3 w-6 h-6 rounded border flex items-center justify-center z-10 transition-colors ${
                            selectedProjects.includes(project.id)
                              ? 'bg-primary border-primary'
                              : 'bg-dark/50 border-white/20 hover:border-primary/50'
                          }`}
                        >
                          {selectedProjects.includes(project.id) && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </button>

                        {images.length > 1 ? (
                          <div className="grid grid-cols-2 gap-1">
                            {images.slice(0, 4).map((img, idx) => (
                              <img
                                key={idx}
                                src={img.generated_image_url || img.thumbnail_url}
                                alt=""
                                className="w-full aspect-square object-cover"
                              />
                            ))}
                          </div>
                        ) : (
                          <img
                            src={thumbnail || 'https://via.placeholder.com/400'}
                            alt=""
                            className="w-full aspect-square object-cover"
                          />
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Actions */}
                        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-3 rounded-full bg-primary/20 backdrop-blur-sm text-white hover:bg-primary/30 transition-colors">
                            <Eye className="w-5 h-5" />
                          </button>
                          <button className="p-3 rounded-full bg-dark/50 backdrop-blur-sm text-white hover:bg-dark/70 transition-colors">
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="p-3">
                        <p className="text-sm font-medium text-white truncate">
                          {language === 'ar' ? project.product_category_ar : project.product_category}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-white/40">
                            {formatDate(project.created_at)}
                          </span>
                          <span className="text-xs text-white/40">
                            {images.length} {language === 'ar' ? 'صور' : 'images'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </>
        ) : (
          <div className="card p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-dark-200 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-lg font-medium text-white/50 mb-2">
              {t('projects.noProjects')}
            </h3>
            <p className="text-sm text-white/30">
              {searchQuery || selectedStyle !== 'all' || selectedDate !== 'all'
                ? (language === 'ar' ? 'لا توجد نتائج مطابقة للبحث' : 'No matching results')
                : (language === 'ar' ? 'ابدأ بإنشاء مشروعك الأول' : 'Start by creating your first project')
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
