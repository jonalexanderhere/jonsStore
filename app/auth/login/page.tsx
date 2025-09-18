'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase'
import { useModernToast, ToastContainer } from '@/components/ui/modern-toast'
import { Eye, EyeOff, Mail, Lock, Loader2, Shield, Zap } from 'lucide-react'

interface LoginForm {
  email: string
  password: string
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()
  const { success, error: showError, toasts, removeToast } = useModernToast()

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    
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
      
      // Wait a moment for auth state to update
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Get user data and check role
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (authUser) {
        // Ensure user profile exists in database
        const { data: existingUser } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single()

        if (!existingUser) {
          // Create user profile if it doesn't exist
          const { error: profileError } = await supabase
            .from('users')
            .insert({
              id: authUser.id,
              email: authUser.email!,
              full_name: authUser.user_metadata?.full_name || authUser.email!.split('@')[0],
              role: authUser.user_metadata?.role || 'customer'
            })

          if (profileError) {
            console.log('Profile creation error:', profileError.message)
          }
        }

        // Get user role
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', authUser.id)
          .single()

        // Redirect based on role
        if (userData?.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/')
        }
      } else {
        router.push('/')
      }
    } catch {
      showError('Terjadi Kesalahan', 'Silakan coba lagi nanti', 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Professional background pattern */}
      <div className="absolute inset-0 bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          {/* Professional Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Selamat Datang di JonsStore
            </h1>
            <p className="text-gray-600 text-lg">
              Masuk ke akun Anda untuk melanjutkan
            </p>
          </motion.div>

          {/* Professional Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="professional-card p-8"
          >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Masukkan email Anda"
                        className="pl-10 input-professional w-full"
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
                        className="mt-2 text-sm text-red-600 flex items-center"
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
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Masukkan password Anda"
                        className="pl-10 pr-10 input-professional w-full"
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
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center"
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
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700">
                        Ingat saya
                      </label>
                    </div>
                    <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
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
                      className="w-full btn-primary h-12 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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

                {/* Social Login */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="mt-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Atau lanjutkan dengan</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full btn-secondary"
                      onClick={async () => {
                        try {
                          const supabase = createClient()
                          const { error } = await supabase.auth.signInWithOAuth({
                            provider: 'google',
                            options: {
                              redirectTo: `${window.location.origin}/auth/callback`
                            }
                          })
                          if (error) {
                            showError('Google Login Gagal', error.message, 5000)
                          }
                        } catch {
                          showError('Google Login Gagal', 'Terjadi kesalahan saat login dengan Google', 5000)
                        }
                      }}
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
                      type="button"
                      variant="outline"
                      className="w-full btn-secondary"
                      onClick={async () => {
                        try {
                          const supabase = createClient()
                          const { error } = await supabase.auth.signInWithOAuth({
                            provider: 'facebook',
                            options: {
                              redirectTo: `${window.location.origin}/auth/callback`
                            }
                          })
                          if (error) {
                            showError('Facebook Login Gagal', error.message, 5000)
                          }
                        } catch {
                          showError('Facebook Login Gagal', 'Terjadi kesalahan saat login dengan Facebook', 5000)
                        }
                      }}
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
                  className="mt-6 text-center"
                >
                  <p className="text-gray-600">
                    Belum punya akun?{' '}
                    <Link href="/auth/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                      Daftar sekarang
                    </Link>
                  </p>
                </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}

