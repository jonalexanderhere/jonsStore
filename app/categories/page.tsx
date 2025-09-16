'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { ArrowRight, Package } from 'lucide-react'
import { Category, Product } from '@/lib/types'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockCategories: Category[] = [
      {
        id: '1',
        name: 'Elektronik',
        description: 'Produk elektronik dan gadget terbaru dengan teknologi canggih',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Fashion',
        description: 'Pakaian dan aksesoris fashion terkini untuk gaya modern',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Rumah & Taman',
        description: 'Furnitur dan dekorasi rumah untuk hunian yang nyaman',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Olahraga',
        description: 'Perlengkapan olahraga dan fitness untuk gaya hidup sehat',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '5',
        name: 'Kecantikan',
        description: 'Produk kecantikan dan perawatan tubuh untuk penampilan optimal',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '6',
        name: 'Buku',
        description: 'Buku dan literatur berbagai genre untuk menambah wawasan',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]

    const mockFeaturedProducts: Product[] = [
      {
        id: '1',
        name: 'iPhone 15 Pro Max',
        description: 'Smartphone terbaru dengan teknologi canggih',
        price: 19999000,
        original_price: 22999000,
        images: ['/images/iphone.jpg'],
        category_id: '1',
        category: mockCategories[0],
        stock: 50,
        is_active: true,
        is_featured: true,
        tags: ['smartphone', 'apple', 'premium'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'MacBook Air M2',
        description: 'Laptop ringan dengan performa tinggi',
        price: 15999000,
        original_price: 17999000,
        images: ['/images/macbook.jpg'],
        category_id: '1',
        category: mockCategories[0],
        stock: 30,
        is_active: true,
        is_featured: true,
        tags: ['laptop', 'apple', 'work'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Nike Air Max 270',
        description: 'Sepatu olahraga dengan teknologi terbaru',
        price: 1999000,
        original_price: 2499000,
        images: ['/images/nike.jpg'],
        category_id: '4',
        category: mockCategories[3],
        stock: 75,
        is_active: true,
        is_featured: true,
        tags: ['sepatu', 'nike', 'olahraga'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]

    setCategories(mockCategories)
    setFeaturedProducts(mockFeaturedProducts)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat kategori...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kategori Produk</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Jelajahi berbagai kategori produk berkualitas tinggi yang kami tawarkan
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.name.toLowerCase()}`}>
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="relative h-64 bg-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90 mb-3 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center text-sm">
                      <span>Jelajahi Kategori</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Produk Unggulan</h2>
            <p className="text-gray-600">Produk terbaik dari setiap kategori</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category.name}
                    </Badge>
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary-600">
                          {formatPrice(product.price)}
                        </span>
                        {product.original_price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.original_price)}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        Stok: {product.stock}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary-600 rounded-2xl p-8 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Tidak Menemukan Yang Anda Cari?
            </h2>
            <p className="text-xl text-primary-100 mb-6">
              Jelajahi semua produk kami atau hubungi customer service untuk bantuan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Lihat Semua Produk
                </button>
              </Link>
              <Link href="/contact">
                <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Hubungi Kami
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
