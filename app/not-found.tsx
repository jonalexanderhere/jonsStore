'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Halaman Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-8">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. 
            Mungkin halaman tersebut telah dipindah atau dihapus.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/">
            <Button size="lg" className="w-full">
              <Home className="h-5 w-5 mr-2" />
              Kembali ke Home
            </Button>
          </Link>
          
          <Link href="/products">
            <Button variant="outline" size="lg" className="w-full">
              <Search className="h-5 w-5 mr-2" />
              Jelajahi Produk
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="lg" 
            className="w-full"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Kembali ke Halaman Sebelumnya
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Jika Anda yakin ini adalah kesalahan, silakan hubungi customer service kami.</p>
        </div>
      </div>
    </div>
  )
}

