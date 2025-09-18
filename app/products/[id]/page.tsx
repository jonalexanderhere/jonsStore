'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/lib/types'
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  Minus,
  Plus,
  ArrowLeft,
  Check
} from 'lucide-react'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const { addItem } = useCartStore()

  // Fetch product data from Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { createClient } = await import('@/lib/supabase')
        const supabase = createClient()
        
        const { data: productData, error } = await supabase
          .from('products')
          .select(`
            *,
            category:categories(*)
          `)
          .eq('id', params.id)
          .eq('is_active', true)
          .single()

        if (error) {
          console.error('Error fetching product:', error)
          // Fallback to mock data if product not found
          const mockProduct: Product = {
            id: params.id as string,
            name: 'Produk Tidak Ditemukan',
            description: 'Produk yang Anda cari tidak tersedia atau sudah tidak aktif.',
            price: 0,
            original_price: 0,
            images: [],
            category_id: '1',
            category: { 
              id: '1', 
              name: 'Tidak Diketahui', 
              description: '', 
              is_active: true, 
              created_at: '', 
              updated_at: '' 
            },
            stock: 0,
            is_active: false,
            is_featured: false,
            tags: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
          setProduct(mockProduct)
        } else {
          setProduct(productData as Product)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const handleAddToCart = async () => {
    if (!product) return
    
    setIsAddingToCart(true)
    try {
      addItem(product, quantity)
      // You can add a toast notification here
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist)
    // You can add wishlist functionality here
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // You can add a toast notification here
    }
  }

  const discountPercentage = product?.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat produk...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produk Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">Produk yang Anda cari tidak tersedia atau sudah tidak aktif.</p>
          <Button asChild>
            <Link href="/products">
              Kembali ke Daftar Produk
            </Link>
          </Button>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center text-primary-600 hover:text-primary-500 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Produk
          </Link>
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-700">Produk</Link>
            <span>/</span>
            <Link href={`/categories/${product.category.name.toLowerCase()}`} className="hover:text-gray-700">
              {product.category.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary-500' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">{product.category.name}</Badge>
                {product.is_featured && (
                  <Badge className="bg-red-500 text-white">Featured</Badge>
                )}
                {discountPercentage > 0 && (
                  <Badge className="bg-green-500 text-white">-{discountPercentage}%</Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">(4.0) • 124 ulasan</span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-primary-600">
                  {formatPrice(product.price)}
                </span>
                {product.original_price && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.original_price)}
                  </span>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi Produk</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah
                </label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center"
                    min="1"
                    max={product.stock}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Stok tersedia: {product.stock} unit
                </p>
              </div>

              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || product.stock === 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {isAddingToCart ? 'Menambah...' : product.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleAddToWishlist}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current text-red-500' : ''}`} />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Truck className="h-6 w-6 text-primary-600" />
                <div>
                  <p className="font-medium text-gray-900">Gratis Ongkir</p>
                  <p className="text-sm text-gray-600">Min. belanja Rp 500rb</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="h-6 w-6 text-primary-600" />
                <div>
                  <p className="font-medium text-gray-900">Garansi Resmi</p>
                  <p className="text-sm text-gray-600">1 tahun</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <RotateCcw className="h-6 w-6 text-primary-600" />
                <div>
                  <p className="font-medium text-gray-900">Return 30 Hari</p>
                  <p className="text-sm text-gray-600">Syarat berlaku</p>
                </div>
              </div>
            </div>

            {/* Product Tags */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['Deskripsi', 'Spesifikasi', 'Ulasan', 'Pertanyaan'].map((tab) => (
                <button
                  key={tab}
                  className="py-2 px-1 border-b-2 border-primary-500 text-primary-600 font-medium text-sm"
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            <div className="prose max-w-none">
              <h3>Deskripsi Lengkap</h3>
              <p>
                {product.description}
              </p>
              <p>
                Produk ini hadir dengan kualitas terbaik dan telah melalui proses quality control 
                yang ketat untuk memastikan kepuasan pelanggan. Dapatkan produk asli dengan 
                garansi resmi dan layanan purna jual yang terpercaya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

