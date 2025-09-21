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
        
        // Get the session from URL hash
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Auth callback error:', error)
          showError('Login Gagal', `Error: ${error.message}`, 5000)
          setTimeout(() => router.push('/auth/login'), 2000)
          return
        }

        if (data.session?.user) {
          console.log('User authenticated:', data.session.user.email)
          
          // Ensure user profile exists in database
          const { error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.session.user.id)
            .single()

          if (userError && userError.code === 'PGRST116') {
            // User doesn't exist, create profile
            const userMetadata = data.session.user.user_metadata || {}
            const { error: profileError } = await supabase
              .from('users')
              .insert({
                id: data.session.user.id,
                email: data.session.user.email!,
                full_name: userMetadata.full_name || userMetadata.name || data.session.user.email!.split('@')[0],
                phone: userMetadata.phone || null,
                avatar_url: userMetadata.avatar_url || userMetadata.picture || null,
                role: userMetadata.role || 'customer'
              })

            if (profileError) {
              console.error('Profile creation error:', profileError)
              showError('Error Profil', 'Gagal membuat profil pengguna', 3000)
            } else {
              console.log('User profile created successfully')
            }
          } else if (userError) {
            console.error('Error checking user:', userError)
            showError('Error Database', 'Gagal memeriksa data pengguna', 3000)
          }

          // Get user role for redirection
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
          console.log('No session found, redirecting to login')
          showError('Sesi Tidak Ditemukan', 'Silakan login kembali', 3000)
          setTimeout(() => router.push('/auth/login'), 2000)
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        showError('Login Gagal', 'Terjadi kesalahan saat memproses login', 5000)
        setTimeout(() => router.push('/auth/login'), 2000)
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
