'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

export interface ToastProps {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  onClose?: () => void
}

const toastVariants = {
  success: {
    icon: CheckCircle,
    bgColor: 'from-emerald-500 to-green-600',
    borderColor: 'border-emerald-400',
    iconColor: 'text-emerald-400',
    glowColor: 'shadow-emerald-500/25'
  },
  error: {
    icon: XCircle,
    bgColor: 'from-red-500 to-rose-600',
    borderColor: 'border-red-400',
    iconColor: 'text-red-400',
    glowColor: 'shadow-red-500/25'
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-400',
    iconColor: 'text-amber-400',
    glowColor: 'shadow-amber-500/25'
  },
  info: {
    icon: Info,
    bgColor: 'from-blue-500 to-cyan-600',
    borderColor: 'border-blue-400',
    iconColor: 'text-blue-400',
    glowColor: 'shadow-blue-500/25'
  }
}

export function ModernToast({ id, type, title, message, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(100)
  
  const variant = toastVariants[type]
  const Icon = variant.icon

  useEffect(() => {
    if (duration > 0) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (duration / 100))
          if (newProgress <= 0) {
            setIsVisible(false)
            return 0
          }
          return newProgress
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [duration])

  useEffect(() => {
    if (!isVisible && onClose) {
      const timer = setTimeout(onClose, 300)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative"
        >
          <div className={`
            relative overflow-hidden rounded-2xl border-2 ${variant.borderColor}
            bg-gradient-to-br ${variant.bgColor} p-6 shadow-2xl ${variant.glowColor}
            backdrop-blur-xl bg-opacity-90
            min-w-[320px] max-w-md
          `}>
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent transform skew-x-12 animate-pulse delay-1000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className={`
                  w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm
                  flex items-center justify-center ${variant.iconColor}
                  border-2 ${variant.borderColor}
                `}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-white mb-1">
                  {title}
                </h4>
                {message && (
                  <p className="text-white/90 text-sm leading-relaxed">
                    {message}
                  </p>
                )}
              </div>

              <button
                onClick={() => setIsVisible(false)}
                className="flex-shrink-0 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress bar */}
            {duration > 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <motion.div
                  className={`h-full bg-gradient-to-r from-white/60 to-white/40`}
                  initial={{ width: "100%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
            )}

            {/* Glow effect */}
            <div className={`
              absolute -inset-1 rounded-2xl bg-gradient-to-r ${variant.bgColor}
              opacity-20 blur-xl -z-10
            `} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Toast container component
export function ToastContainer({ toasts, onRemove }: { toasts: ToastProps[], onRemove: (id: string) => void }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-4">
      {toasts.map((toast) => (
        <ModernToast
          key={toast.id}
          {...toast}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  )
}

// Hook for managing toasts
export function useModernToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = (toast: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { ...toast, id }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const success = (title: string, message?: string, duration?: number) => {
    addToast({ type: 'success', title, message, duration })
  }

  const error = (title: string, message?: string, duration?: number) => {
    addToast({ type: 'error', title, message, duration })
  }

  const warning = (title: string, message?: string, duration?: number) => {
    addToast({ type: 'warning', title, message, duration })
  }

  const info = (title: string, message?: string, duration?: number) => {
    addToast({ type: 'info', title, message, duration })
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  }
}
