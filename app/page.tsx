'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star, Truck, Shield, Headphones, Zap } from 'lucide-react'
import { Product } from '@/lib/types'
import ProductCard from '@/components/product/product-card'

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch featured products from Supabase
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { createClient } = await import('@/lib/supabase')
        const supabase = createClient()
        
        const { data: productsData, error } = await supabase
          .from('products')
          .select(`
            *,
            category:categories(*)
          `)
          .eq('is_active', true)
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
          .limit(4)

        if (error) {
          console.error('Error fetching featured products:', error)
        } else {
          setFeaturedProducts(productsData || [])
        }
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "truck":
        return <Truck className="h-6 w-6" />
      case "shield":
        return <Shield className="h-6 w-6" />
      case "headphones":
        return <Headphones className="h-6 w-6" />
      case "zap":
        return <Zap className="h-6 w-6" />
      default:
        return null
    }
  }

  const features = [
    {
      icon: "truck",
      title: "Pengiriman Cepat",
      description: "Pengiriman ke seluruh Indonesia dengan estimasi 1-3 hari kerja"
    },
    {
      icon: "shield",
      title: "100% Aman",
      description: "Transaksi aman dengan sistem keamanan berlapis"
    },
    {
      icon: "headphones",
      title: "24/7 Support",
      description: "Customer service siap membantu Anda kapan saja"
    },
    {
      icon: "zap",
      title: "Kualitas Terjamin",
      description: "Produk berkualitas tinggi dengan garansi resmi"
    }
  ]

  const categories = [
    {
      name: "Elektronik",
      image: "/images/electronics.jpg",
      count: "1,234 produk"
    },
    {
      name: "Fashion",
      image: "/images/fashion.jpg",
      count: "2,567 produk"
    },
    {
      name: "Rumah & Taman",
      image: "/images/home.jpg",
      count: "890 produk"
    },
    {
      name: "Olahraga",
      image: "/images/sports.jpg",
      count: "456 produk"
    }
  ]

  // Featured products are now fetched from Supabase

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Belanja Online
                  <span className="block text-primary-200">Tanpa Batas</span>
                </h1>
                <p className="text-xl text-primary-100 mt-6 leading-relaxed">
                  Temukan jutaan produk berkualitas dengan harga terbaik. 
                  Pengiriman cepat, aman, dan terpercaya ke seluruh Indonesia.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  Mulai Belanja
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Lihat Kategori
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white/20 rounded-lg p-4 text-center">
                      <div className="w-16 h-16 bg-white/30 rounded-full mx-auto mb-2"></div>
                      <p className="text-sm">Produk {i}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-lg text-gray-600">
              Kami berkomitmen memberikan pengalaman berbelanja terbaik
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                    {getIcon(feature.icon)}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Kategori Populer
            </h2>
            <p className="text-lg text-gray-600">
              Jelajahi berbagai kategori produk yang tersedia
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={`/categories/${category.name.toLowerCase()}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.count}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Lihat Semua</span>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Produk Unggulan
            </h2>
            <p className="text-lg text-gray-600">
              Produk terbaik dengan harga spesial untuk Anda
            </p>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onAddToWishlist={(productId) => {
                    console.log('Add to wishlist:', productId)
                  }}
                  onViewProduct={(productId) => {
                    console.log('View product:', productId)
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Tidak ada produk unggulan tersedia</p>
            </div>
          )}
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link href="/products">
                Lihat Semua Produk
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Siap Memulai Perjalanan Belanja Anda?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Daftar sekarang dan dapatkan diskon 10% untuk pembelian pertama
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100" asChild>
              <Link href="/auth/register">
                Daftar Sekarang
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600" asChild>
              <Link href="/products">
                Mulai Belanja
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
