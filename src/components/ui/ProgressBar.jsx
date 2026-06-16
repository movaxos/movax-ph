import { motion } from 'framer-motion'

export default function ProgressBar({ progress, className = '' }) {
  return (
    <div className={`w-full h-2 bg-dark-300 rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-mint rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  )
}
