'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, User, Search, Menu, X, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/lib/store'
import { useAuth } from '@/components/auth/auth-provider'
import { signOut } from '@/lib/auth'
import { toast } from 'react-hot-toast'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const { getTotalItems } = useCartStore()
  const { user, refreshUser } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      await refreshUser()
      toast.success('Berhasil logout')
      router.push('/')
    } catch {
      toast.error('Gagal logout')
    }
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">JonsStore</span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Cari produk, kategori, atau merek..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/products">
              <Button variant="ghost">Produk</Button>
            </Link>
            <Link href="/categories">
              <Button variant="ghost">Kategori</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost">Tentang</Button>
            </Link>
            
            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <User className="h-5 w-5" />
              </Button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {user ? (
                    <>
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profil Saya
                      </Link>
                      <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Pesanan Saya
                      </Link>
                      {user.role === 'admin' && (
                        <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Dashboard Admin
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="inline h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Login
                      </Link>
                      <Link href="/auth/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Daftar
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link href="/products" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                Produk
              </Link>
              <Link href="/categories" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                Kategori
              </Link>
              <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                Tentang
              </Link>
              <Link href="/cart" className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Keranjang
                {getTotalItems() > 0 && (
                  <Badge className="ml-2">{getTotalItems()}</Badge>
                )}
              </Link>
              {user ? (
                <>
                  <Link href="/profile" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                    Profil Saya
                  </Link>
                  <Link href="/orders" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                    Pesanan Saya
                  </Link>
                  {user.role === 'admin' && (
                    <Link href="/admin" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                      Dashboard Admin
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                    Login
                  </Link>
                  <Link href="/auth/register" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

