'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { ArrowRight, Package } from 'lucide-react'
import { Category, Product } from '@/lib/types'
import ProductCard from '@/components/product/product-card'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { createClient } = await import('@/lib/supabase')
        const supabase = createClient()
        
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .eq('is_active', true)
          .order('name')

        // Fetch featured products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select(`
            *,
            category:categories(*)
          `)
          .eq('is_active', true)
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
          .limit(6)

        if (categoriesError) {
          console.error('Error fetching categories:', categoriesError)
        } else {
          setCategories(categoriesData || [])
        }

        if (productsError) {
          console.error('Error fetching products:', productsError)
        } else {
          setFeaturedProducts(productsData || [])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        // Fallback to mock data
        const mockCategories: Category[] = [
          {
            id: '1',
            name: 'Elektronik',
            description: 'Produk elektronik dan gadget terbaru dengan teknologi canggih',
            image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]
        setCategories(mockCategories)
        setFeaturedProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
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

