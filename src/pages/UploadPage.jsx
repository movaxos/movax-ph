import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { useApp } from '../contexts/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, AlertCircle, CheckCircle2, Loader2, Sparkles, Camera, Palette, Wand2 } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { analyzeProduct } from '../services/aiAnalysis'
import { showcaseStyles } from '../lib/styles'
import StyleCard from '../components/styles/StyleCard'
import Button from '../components/ui/Button'

const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15MB

export default function UploadPage() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const { user, profile } = useAuth()
  const { setUploadedImage, setAnalysisResult, setSelectedStyles, setCurrentProject } = useApp()
  const navigate = useNavigate()

  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisData, setAnalysisData] = useState(null)
  const [error, setError] = useState('')
  const [selectedStyleIds, setSelectedStyleIds] = useState([])

  const maxStyles = profile?.subscription_plan === 'pro' || profile?.subscription_plan === 'business' ? 8 : profile?.subscription_plan === 'starter' ? 4 : 2

  const analysisSteps = [
    { key: 'detecting', icon: Camera, label: t('analysis.detectingProductType') },
    { key: 'colors', icon: Palette, label: t('analysis.analyzingColors') },
    { key: 'styles', icon: Wand2, label: t('analysis.findingBestStyles') },
  ]

  const [currentStep, setCurrentStep] = useState(-1)

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError('')

    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0]
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError(language === 'ar' ? 'حجم الملف كبير جداً. الحد الأقصى 15MB' : 'File too large. Maximum 15MB')
      } else {
        setError(language === 'ar' ? 'نوع الملف غير مدعوم' : 'File type not supported')
      }
      return
    }

    const selectedFile = acceptedFiles[0]
    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile))
    setAnalysisData(null)
    setSelectedStyleIds([])
  }, [language])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/heic': ['.heic'],
    },
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  })

  const handleAnalyze = async () => {
    if (!file) return

    setAnalyzing(true)
    setError('')
    setCurrentStep(0)

    try {
      // Simulate step progression
      const stepInterval = setInterval(() => {
        setCurrentStep((prev) => (prev < analysisSteps.length - 1 ? prev + 1 : prev))
      }, 700)

      const result = await analyzeProduct(file)
      clearInterval(stepInterval)
      setCurrentStep(analysisSteps.length - 1)

      setAnalysisData(result)
      setAnalysisResult(result)

      // Auto-select recommended styles
      const recommended = result.recommendedStyles?.slice(0, 2) || []
      setSelectedStyleIds(recommended)

      setTimeout(() => {
        setCurrentStep(-1)
      }, 500)
    } catch (err) {
      setError(err.message || (language === 'ar' ? 'حدث خطأ في التحليل' : 'Analysis failed'))
    } finally {
      setAnalyzing(false)
    }
  }

  const handleStyleToggle = (styleId) => {
    if (selectedStyleIds.includes(styleId)) {
      setSelectedStyleIds(selectedStyleIds.filter((id) => id !== styleId))
    } else if (selectedStyleIds.length < maxStyles) {
      setSelectedStyleIds([...selectedStyleIds, styleId])
    }
  }

  const handleGenerate = () => {
    if (selectedStyleIds.length === 0) return

    setUploadedImage({ file, preview })
    setSelectedStyles(selectedStyleIds)

    // Create project in Supabase (would be done here)
    // For now, just navigate
    const projectId = Math.random().toString(36).substring(7)
    setCurrentProject({ id: projectId, file, preview })
    navigate(`/generate/${projectId}`)
  }

  const clearFile = () => {
    setFile(null)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setAnalysisData(null)
    setSelectedStyleIds([])
    setError('')
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('common.uploadProduct')}
          </h1>
          <p className="text-white/50">
            {t('common.supportedFormats')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            {!file ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                {...getRootProps()}
                className={`card border-2 border-dashed cursor-pointer transition-all ${
                  isDragActive ? 'border-primary bg-primary/5' : 'border-white/20 hover:border-primary/50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="p-12 text-center">
                  <div className={`w-16 h-16 rounded-2xl ${isDragActive ? 'bg-primary/20' : 'bg-dark-200'} flex items-center justify-center mx-auto mb-4 transition-colors`}>
                    <Upload className={`w-8 h-8 ${isDragActive ? 'text-primary' : 'text-white/50'} transition-colors`} />
                  </div>
                  <p className="text-white font-medium mb-2">
                    {t('common.dragDrop')}
                  </p>
                  <p className="text-sm text-white/40">
                    {t('common.supportedFormats')}
                  </p>
                  <button type="button" className="mt-4 btn-outline text-sm" onClick={(e) => { e.stopPropagation() }}>
                    {language === 'ar' ? 'اختر ملف' : 'Choose file'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card overflow-hidden"
              >
                <div className="relative aspect-square">
                  <img
                    src={preview}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={clearFile}
                    className="absolute top-4 end-4 w-10 h-10 rounded-full bg-dark/80 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-dark transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Analysis Overlay */}
                  <AnimatePresence>
                    {analyzing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-dark/90 backdrop-blur-sm flex flex-col items-center justify-center"
                      >
                        <div className="w-20 h-20 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-6" />
                        <p className="text-white font-medium mb-4">
                          {t('analysis.analyzingProduct')}
                        </p>
                        <div className="space-y-3 w-64">
                          {analysisSteps.map((step, i) => (
                            <div
                              key={step.key}
                              className={`flex items-center gap-3 transition-opacity ${
                                i === currentStep ? 'opacity-100' : i < currentStep ? 'opacity-50' : 'opacity-30'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                i < currentStep ? 'bg-mint/20' : i === currentStep ? 'bg-primary/20' : 'bg-dark-200'
                              }`}>
                                {i < currentStep ? (
                                  <CheckCircle2 className="w-4 h-4 text-mint" />
                                ) : i === currentStep ? (
                                  <step.icon className="w-4 h-4 text-primary animate-pulse" />
                                ) : (
                                  <step.icon className="w-4 h-4 text-white/50" />
                                )}
                              </div>
                              <span className={`text-sm ${i === currentStep ? 'text-white' : 'text-white/50'}`}>
                                {step.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {!analyzing && !analysisData && (
                  <div className="p-4">
                    <Button
                      onClick={handleAnalyze}
                      className="w-full"
                      icon={<Sparkles className="w-4 h-4" />}
                    >
                      {language === 'ar' ? 'تحليل المنتج' : 'Analyze Product'}
                    </Button>
                  </div>
                )}
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mt-4"
              >
                <AlertCircle className="w-5 h-5" />
                {error}
              </motion.div>
            )}

            {/* Analysis Result */}
            {analysisData && !analyzing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-6 mt-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-white">
                    {t('analysis.detecting')}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Camera className="w-4 h-4 text-white/50" />
                      <span className="text-sm text-white/50">{t('analysis.detecting')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">
                        {language === 'ar' ? analysisData.category_ar : analysisData.category_en}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs">
                        {Math.round(analysisData.confidence * 100)}% {language === 'ar' ? 'ثقة' : 'confidence'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Palette className="w-4 h-4 text-white/50" />
                      <span className="text-sm text-white/50">{t('analysis.colors')}</span>
                    </div>
                    <div className="flex gap-2">
                      {analysisData.colors.map((color, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-dark-200 text-white text-sm">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Wand2 className="w-4 h-4 text-white/50" />
                      <span className="text-sm text-white/50">{t('analysis.mood')}</span>
                    </div>
                    <p className="text-white/70">
                      {language === 'ar' ? analysisData.mood.ar : analysisData.mood.en}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Styles Section */}
          <div>
            {analysisData ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    {t('common.chooseStyle')}
                  </h3>
                  <span className="text-sm text-white/50">
                    {selectedStyleIds.length}/{maxStyles} {language === 'ar' ? 'محدد' : 'selected'}
                  </span>
                </div>

                {/* Recommended Styles */}
                <div className="mb-6">
                  <p className="text-sm text-white/50 mb-3">
                    ✨ {t('analysis.recommendedStyles')}
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {analysisData.recommendedStyles?.map((styleId) => {
                      const style = showcaseStyles.find((s) => s.id === styleId)
                      if (!style) return null
                      return (
                        <StyleCard
                          key={style.id}
                          style={style}
                          selected={selectedStyleIds.includes(style.id)}
                          recommended={true}
                          onClick={() => handleStyleToggle(style.id)}
                          language={language}
                        />
                      )
                    })}
                  </div>
                </div>

                {/* All Styles */}
                <div className="mb-6">
                  <p className="text-sm text-white/50 mb-3">
                    {language === 'ar' ? 'جميع الأساليب' : 'All Styles'}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {showcaseStyles.map((style) => (
                      <StyleCard
                        key={style.id}
                        style={style}
                        selected={selectedStyleIds.includes(style.id)}
                        recommended={analysisData.recommendedStyles?.includes(style.id)}
                        disabled={!selectedStyleIds.includes(style.id) && selectedStyleIds.length >= maxStyles}
                        onClick={() => handleStyleToggle(style.id)}
                        language={language}
                      />
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={selectedStyleIds.length === 0}
                  className="w-full"
                  icon={<Sparkles className="w-5 h-5" />}
                >
                  {t('common.generate')} {selectedStyleIds.length} {language === 'ar' ? 'صور' : 'images'}
                </Button>
              </motion.div>
            ) : (
              <div className="card p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-dark-200 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-white/20" />
                </div>
                <h3 className="text-lg font-medium text-white/50 mb-2">
                  {language === 'ar' ? 'ارفع صورة للبدء' : 'Upload an image to start'}
                </h3>
                <p className="text-sm text-white/30">
                  {language === 'ar'
                    ? 'سيحلل الذكاء الاصطناعي منتجك ويقترح أفضل أساليب العرض'
                    : 'AI will analyze your product and suggest the best showcase styles'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
