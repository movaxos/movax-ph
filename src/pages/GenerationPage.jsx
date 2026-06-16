import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { useApp } from '../contexts/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Download, Share2, RefreshCw, CheckCircle2, AlertCircle,
  Loader2, ChevronDown, X, Maximize2, Grid, Columns
} from 'lucide-react'
import { generateShowcase } from '../services/aiGeneration'
import { showcaseStyles } from '../lib/styles'
import Button from '../components/ui/Button'

export default function GenerationPage() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const { currentProject, analysisResult, selectedStyles, uploadedImage } = useApp()
  const { projectId } = useParams()
  const navigate = useNavigate()

  const [generatingStatus, setGeneratingStatus] = useState({}) // { styleId: 'processing' | 'completed' | 'failed' }
  const [generatedImages, setGeneratedImages] = useState([]) // [{ styleId, imageUrl, thumbnailUrl }]
  const [lightBoxImage, setLightBoxImage] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'compare'

  // Redirect if no project data
  useEffect(() => {
    if (!uploadedImage || selectedStyles.length === 0) {
      navigate('/upload')
    }
  }, [uploadedImage, selectedStyles, navigate])

  // Start generation on mount
  useEffect(() => {
    if (!uploadedImage || selectedStyles.length === 0) return

    // Initialize all as pending
    const initialStatus = {}
    selectedStyles.forEach((styleId) => {
      initialStatus[styleId] = 'pending'
    })
    setGeneratingStatus(initialStatus)

    // Generate each style
    selectedStyles.forEach(async (styleId, index) => {
      // Small delay between generations
      await new Promise((resolve) => setTimeout(resolve, index * 500))

      setGeneratingStatus((prev) => ({ ...prev, [styleId]: 'processing' }))

      try {
        const result = await generateShowcase({
          imageFile: uploadedImage.file,
          style: styleId,
          productCategory: analysisResult?.category,
          colors: analysisResult?.colors,
        })

        setGeneratedImages((prev) => [
          ...prev,
          {
            styleId,
            styleKey: showcaseStyles.find((s) => s.id === styleId)?.key,
            imageUrl: result.generatedImageUrl,
            thumbnailUrl: result.thumbnailUrl,
            socialMediaCrops: result.socialMediaCrops,
          },
        ])
        setGeneratingStatus((prev) => ({ ...prev, [styleId]: 'completed' }))
      } catch (error) {
        setGeneratingStatus((prev) => ({ ...prev, [styleId]: 'failed' }))
      }
    })
  }, [uploadedImage?.file])

  const allCompleted = Object.values(generatingStatus).every((s) => s === 'completed')

  const downloadImage = (imageUrl, styleName) => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `movax-${styleName}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const regenerateStyle = async (styleId) => {
    setGeneratingStatus((prev) => ({ ...prev, [styleId]: 'processing' }))
    setGeneratedImages((prev) => prev.filter((img) => img.styleId !== styleId))

    try {
      const result = await generateShowcase({
        imageFile: uploadedImage.file,
        style: styleId,
        productCategory: analysisResult?.category,
        colors: analysisResult?.colors,
      })

      setGeneratedImages((prev) => [
        ...prev,
        {
          styleId,
          styleKey: showcaseStyles.find((s) => s.id === styleId)?.key,
          imageUrl: result.generatedImageUrl,
          thumbnailUrl: result.thumbnailUrl,
          socialMediaCrops: result.socialMediaCrops,
        },
      ])
      setGeneratingStatus((prev) => ({ ...prev, [styleId]: 'completed' }))
    } catch (error) {
      setGeneratingStatus((prev) => ({ ...prev, [styleId]: 'failed' }))
    }
  }

  const handleShare = async (imageUrl) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MOVAX PH Showcase',
          text: language === 'ar' ? 'صورة منتج من موفاكس' : 'Product showcase from MOVAX PH',
          url: imageUrl,
        })
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(imageUrl)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {t('generation.generating')}
            </h1>
            <p className="text-white/50">
              {Object.values(generatingStatus).filter((s) => s === 'completed').length} {t('generation.imagesGenerated')} {t('generation.outOf')} {selectedStyles.length}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-dark-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-primary text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('compare')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'compare' ? 'bg-primary text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                <Columns className="w-4 h-4" />
              </button>
            </div>

            {allCompleted && (
              <Button variant="secondary">
                <Download className="w-4 h-4" />
                {t('generation.downloadAll')}
              </Button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex gap-1 h-2">
            {selectedStyles.map((styleId) => (
              <div
                key={styleId}
                className={`flex-1 rounded-full transition-all duration-500 ${
                  generatingStatus[styleId] === 'completed'
                    ? 'bg-mint'
                    : generatingStatus[styleId] === 'processing'
                    ? 'bg-primary animate-pulse'
                    : generatingStatus[styleId] === 'failed'
                    ? 'bg-red-500'
                    : 'bg-dark-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Original Image */}
        {uploadedImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-4 mb-8 inline-block"
          >
            <div className="flex items-center gap-3">
              <img
                src={uploadedImage.preview}
                alt="Original"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm font-medium text-white">
                  {analysisResult?.category && (
                    <span>
                      {language === 'ar' ? analysisResult.category_ar : analysisResult.category_en}
                    </span>
                  )}
                </p>
                <p className="text-xs text-white/50">
                  {uploadedImage.file?.name}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Images Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            : 'grid-cols-1 lg:grid-cols-2'
        }`}>
          {selectedStyles.map((styleId) => {
            const style = showcaseStyles.find((s) => s.id === styleId)
            const generated = generatedImages.find((img) => img.styleId === styleId)
            const status = generatingStatus[styleId]

            return (
              <motion.div
                key={styleId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`card overflow-hidden ${viewMode === 'compare' ? 'aspect-video' : ''}`}
              >
                <div className={`relative ${viewMode === 'compare' ? 'h-80' : 'aspect-square'}`}>
                  {status === 'processing' && (
                    <div className="absolute inset-0 bg-dark-200 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                      <p className="text-white/70 text-sm">{t('generation.generating')}</p>
                    </div>
                  )}

                  {status === 'failed' && (
                    <div className="absolute inset-0 bg-dark-200 flex flex-col items-center justify-center">
                      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                      <p className="text-white/70 text-sm mb-4">{t('common.error')}</p>
                      <Button variant="outline" size="sm" onClick={() => regenerateStyle(styleId)}>
                        <RefreshCw className="w-4 h-4" />
                        {t('common.regenerate')}
                      </Button>
                    </div>
                  )}

                  {generated && (
                    <img
                      src={generated.imageUrl}
                      alt={t(`styles.${generated.styleKey}.name`)}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setLightBoxImage(generated)}
                    />
                  )}

                  {/* Status Indicator */}
                  {status === 'completed' && (
                    <div className="absolute top-3 start-3 w-8 h-8 rounded-full bg-mint/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-mint" />
                    </div>
                  )}
                </div>

                {/* Actions */}
                {generated && (
                  <div className="p-4">
                    <h3 className="font-medium text-white mb-3">
                      {t(`styles.${generated.styleKey}.name`)}
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => downloadImage(generated.imageUrl, style.id)}
                        icon={<Download className="w-4 h-4" />}
                      >
                        {t('common.download')}
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleShare(generated.imageUrl)}
                        icon={<Share2 className="w-4 h-4" />}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => regenerateStyle(styleId)}
                        icon={<RefreshCw className="w-4 h-4" />}
                        title={t('common.regenerate')}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* New Project Button */}
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <Link to="/upload">
              <Button variant="outline" className="mx-auto">
                <Sparkles className="w-5 h-5" />
                {language === 'ar' ? 'مشروع جديد' : 'New Project'}
              </Button>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightBoxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dark/95 backdrop-blur-xl flex items-center justify-center p-4 modal-backdrop"
            onClick={() => setLightBoxImage(null)}
          >
            <button
              onClick={() => setLightBoxImage(null)}
              className="absolute top-4 end-4 w-12 h-12 rounded-full bg-dark-200 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightBoxImage.imageUrl}
              alt="Preview"
              className="max-w-full max-h-[90vh] rounded-2xl object-contain"
            />

            {/* Actions */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              <Button onClick={() => downloadImage(lightBoxImage.imageUrl, lightBoxImage.styleId)}>
                <Download className="w-5 h-5" />
                {t('common.download')}
              </Button>
              <Button variant="secondary" onClick={() => handleShare(lightBoxImage.imageUrl)}>
                <Share2 className="w-5 h-5" />
                {t('common.share')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
