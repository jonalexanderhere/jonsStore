'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { createClient } from '@/lib/supabase'
import { useModernToast, ToastContainer } from '@/components/ui/modern-toast'
import { Eye, EyeOff, Mail, Lock, Loader2, Sparkles, Shield, Zap } from 'lucide-react'

interface LoginForm {
  email: string
  password: string
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()
  const { success, error: showError, toasts, removeToast } = useModernToast()

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    setIsAnimating(true)
    
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        showError('Login Gagal', error.message, 5000)
        return
      }

      success('Login Berhasil!', 'Selamat datang kembali!', 3000)
      
      // Get user data and check role
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (authUser) {
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', authUser.id)
          .single()

        // Add delay for better UX
        setTimeout(() => {
          if (userData?.role === 'admin') {
            router.push('/admin')
          } else {
            router.push('/')
          }
        }, 1500)
      } else {
        router.push('/')
      }
    } catch {
      showError('Terjadi Kesalahan', 'Silakan coba lagi nanti', 5000)
    } finally {
      setIsLoading(false)
      setTimeout(() => setIsAnimating(false), 2000)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
              Selamat Datang
            </h1>
            <p className="text-purple-200 text-lg">
              Masuk ke akun Anda untuk melanjutkan
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div>
            <Card className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <label htmlFor="email" className="block text-sm font-semibold text-white mb-3">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-purple-300 group-focus-within:text-purple-400 transition-colors" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Masukkan email Anda"
                        className="pl-12 h-14 bg-white/10 border-white/30 text-white placeholder:text-purple-200 focus:border-purple-400 focus:ring-purple-400/50 rounded-xl backdrop-blur-sm"
                        {...register('email', {
                          required: 'Email wajib diisi',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Format email tidak valid'
                          }
                        })}
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-300 flex items-center"
                      >
                        <Zap className="w-4 h-4 mr-1" />
                        {errors.email.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Password Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <label htmlFor="password" className="block text-sm font-semibold text-white mb-3">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-purple-300 group-focus-within:text-purple-400 transition-colors" />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Masukkan password Anda"
                        className="pl-12 pr-12 h-14 bg-white/10 border-white/30 text-white placeholder:text-purple-200 focus:border-purple-400 focus:ring-purple-400/50 rounded-xl backdrop-blur-sm"
                        {...register('password', {
                          required: 'Password wajib diisi',
                          minLength: {
                            value: 6,
                            message: 'Password minimal 6 karakter'
                          }
                        })}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-300 hover:text-purple-400 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-300 flex items-center"
                      >
                        <Zap className="w-4 h-4 mr-1" />
                        {errors.password.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Remember Me & Forgot Password */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-white/30 rounded bg-white/10"
                      />
                      <label htmlFor="remember-me" className="ml-3 block text-sm text-white">
                        Ingat saya
                      </label>
                    </div>
                    <Link href="/auth/forgot-password" className="text-sm text-purple-300 hover:text-purple-200 transition-colors">
                      Lupa password?
                    </Link>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    <Button
                      type="submit"
                      className="w-full h-14 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Memproses...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Zap className="w-5 h-5 mr-2" />
                          Masuk Sekarang
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="mt-8"
                >
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-transparent text-white/60">Atau lanjutkan dengan</span>
                    </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-12 bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-xl backdrop-blur-sm"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-xl backdrop-blur-sm"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </motion.div>

                {/* Register Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="mt-8 text-center"
                >
                  <p className="text-white/70">
                    Belum punya akun?{' '}
                    <Link href="/auth/register" className="font-semibold text-purple-300 hover:text-purple-200 transition-colors">
                      Daftar sekarang
                    </Link>
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}

