import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Check, Sparkles } from 'lucide-react'

export default function StyleCard({ style, selected, recommended, disabled, onClick, language }) {
  const { t } = useTranslation()

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden rounded-xl aspect-square group ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <img
        src={style.preview}
        alt={t(`styles.${style.key}.name`)}
        className={`w-full h-full object-cover transition-all duration-300 ${
          selected ? 'opacity-60' : 'opacity-90'
        } group-hover:opacity-80`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-90" />

      {/* Selection indicator */}
      {selected && (
        <div className="absolute top-2 start-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Recommended badge */}
      {recommended && !selected && (
        <div className="absolute top-2 end-2 px-2 py-1 rounded-full bg-gold/20 backdrop-blur-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-gold" />
          <span className="text-xs font-medium text-gold">
            {t('common.recommended')}
          </span>
        </div>
      )}

      {/* Style name */}
      <div className="absolute bottom-0 inset-x-0 p-3">
        <h4 className="text-sm font-medium text-white mb-0.5">
          {t(`styles.${style.key}.name`)}
        </h4>
        <p className="text-xs text-white/50 line-clamp-1">
          {t(`styles.${style.key}.bestFor`)}
        </p>
      </div>

      {/* Hover overlay */}
      <div className={`absolute inset-0 border-2 rounded-xl transition-colors ${
        selected ? 'border-primary' : 'border-transparent group-hover:border-primary/50'
      }`} />
    </motion.button>
  )
}
