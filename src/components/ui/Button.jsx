import { motion } from 'framer-motion'

const buttonVariants = {
  primary: 'bg-primary hover:bg-primary-light text-white glow-primary',
  secondary: 'bg-dark-200 hover:bg-dark-300 text-white border border-white/10',
  outline: 'bg-transparent hover:bg-primary/10 text-primary border border-primary',
  ghost: 'bg-transparent hover:bg-white/5 text-white/80',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
}

const sizeVariants = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-6 text-sm',
  lg: 'py-4 px-8 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'start',
  ...props
}) {
  const baseClasses = 'font-medium rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <motion.button
      className={`${baseClasses} ${buttonVariants[variant]} ${sizeVariants[size]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <motion.div
          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />
      ) : (
        <>
          {icon && iconPosition === 'start' && icon}
          {children}
          {icon && iconPosition === 'end' && icon}
        </>
      )}
    </motion.button>
  )
}
