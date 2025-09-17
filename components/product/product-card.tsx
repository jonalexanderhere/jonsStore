'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react'
import { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
  onAddToWishlist?: (productId: string) => void
  onViewProduct?: (productId: string) => void
}

export default function ProductCard({ product, onAddToWishlist, onViewProduct }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { addItem } = useCartStore()

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      addItem(product, 1)
      // You can add a toast notification here
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToWishlist = () => {
    if (onAddToWishlist) {
      onAddToWishlist(product.id)
    }
  }

  const handleViewProduct = () => {
    if (onViewProduct) {
      onViewProduct(product.id)
    }
  }

  const discountPercentage = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <div className="aspect-square bg-gray-200 relative overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.is_featured && (
              <Badge className="bg-red-500 text-white text-xs">
                Featured
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-green-500 text-white text-xs">
                -{discountPercentage}%
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge className="bg-gray-500 text-white text-xs">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
              onClick={handleAddToWishlist}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
              onClick={handleViewProduct}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          {/* Category */}
          <Badge variant="outline" className="text-xs">
            {product.category.name}
          </Badge>

          {/* Product Name */}
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">(4.0)</span>
          </div>

          {/* Price */}
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

          {/* Stock */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Stok: {product.stock}
            </span>
            {product.stock < 10 && product.stock > 0 && (
              <span className="text-orange-500 font-medium">
                Hampir Habis!
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={isLoading || product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isLoading ? 'Menambah...' : product.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

