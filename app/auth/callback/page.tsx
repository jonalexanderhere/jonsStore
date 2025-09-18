'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { useModernToast, ToastContainer } from '@/components/ui/modern-toast'
import { Loader2 } from 'lucide-react'

export default function AuthCallbackPage() {
  const router = useRouter()
  const { success, error: showError } = useModernToast()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Auth callback error:', error)
          showError('Login Gagal', error.message, 5000)
          router.push('/auth/login')
          return
        }

        if (data.session?.user) {
          // Ensure user profile exists in database
          const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.session.user.id)
            .single()

          if (!existingUser) {
            // Create user profile if it doesn't exist
            const { error: profileError } = await supabase
              .from('users')
              .insert({
                id: data.session.user.id,
                email: data.session.user.email!,
                full_name: data.session.user.user_metadata?.full_name || data.session.user.email!.split('@')[0],
                role: data.session.user.user_metadata?.role || 'customer'
              })

            if (profileError) {
              console.log('Profile creation error:', profileError.message)
            }
          }

          // Get user role
          const { data: userData } = await supabase
            .from('users')
            .select('role')
            .eq('id', data.session.user.id)
            .single()

          success('Login Berhasil!', 'Selamat datang di JonsStore!', 3000)

          // Redirect based on role
          setTimeout(() => {
            if (userData?.role === 'admin') {
              router.push('/admin')
            } else {
              router.push('/')
            }
          }, 1500)
        } else {
          router.push('/auth/login')
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        showError('Login Gagal', 'Terjadi kesalahan saat login', 5000)
        router.push('/auth/login')
      }
    }

    handleAuthCallback()
  }, [router, success, showError])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Memproses Login...
        </h2>
        <p className="text-gray-600">
          Mohon tunggu sebentar, kami sedang memproses login Anda.
        </p>
      </div>
      <ToastContainer toasts={[]} onRemove={() => {}} />
    </div>
  )
}
