'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Truck, Shield, Headphones, Zap } from 'lucide-react'
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
      {/* Professional Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container-professional section-padding">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Selamat Datang di
              <span className="block text-blue-600">JonsStore</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Temukan jutaan produk berkualitas dengan harga terbaik. 
              Pengiriman cepat, aman, dan terpercaya ke seluruh Indonesia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-primary text-lg px-8 py-4">
                Mulai Belanja
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary text-lg px-8 py-4">
                Lihat Kategori
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Features Section */}
      <section className="section-padding bg-white">
        <div className="container-professional">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kami berkomitmen memberikan pengalaman berbelanja terbaik dengan layanan berkualitas tinggi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="professional-card text-center p-8 group">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Categories Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-professional">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Kategori Populer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Jelajahi berbagai kategori produk yang tersedia dengan kualitas terbaik
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link key={index} href={`/categories/${category.name.toLowerCase()}`}>
                <div className="professional-card group cursor-pointer overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">{category.name.charAt(0)}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.count}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Lihat Semua</span>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Featured Products Section */}
      <section className="section-padding bg-white">
        <div className="container-professional">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Produk Unggulan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Produk terbaik dengan harga spesial untuk Anda
            </p>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
          <div className="text-center mt-12">
            <Button size="lg" className="btn-primary text-lg px-8 py-4" asChild>
              <Link href="/products">
                Lihat Semua Produk
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Professional CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container-professional text-center">
          <h2 className="text-3xl font-bold mb-4">
            Siap Memulai Perjalanan Belanja Anda?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Daftar sekarang dan dapatkan diskon 10% untuk pembelian pertama
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4" asChild>
              <Link href="/auth/register">
                Daftar Sekarang
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4" asChild>
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
