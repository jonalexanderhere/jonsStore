import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { ToastContainer } from '@/components/ui/modern-toast'
import { AuthProvider } from '@/components/auth/auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Commerce - Belanja Online Terpercaya',
  description: 'Platform e-commerce terpercaya untuk semua kebutuhan Anda. Produk berkualitas dengan harga terbaik.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
        <ToastContainer toasts={[]} onRemove={() => {}} />
      </body>
    </html>
  )
}

