'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Shield, Truck } from 'lucide-react'
import { createClient, subscribeToCart } from '@/lib/supabase'
import { useAuth } from '@/components/auth/auth-provider'
// import Image from 'next/image'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems, clearCart, syncCartFromDB } = useCartStore()
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [discount, setDiscount] = useState(0)
  const { user } = useAuth()

  // Real-time cart synchronization
  useEffect(() => {
    if (!user) return

    const subscription = subscribeToCart(user.id, (payload) => {
      console.log('Real-time cart update:', payload)
      
      if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
        // Sync cart from database
        syncCartFromDB()
      } else if (payload.eventType === 'DELETE') {
        // Remove item from local cart
        const deletedItem = payload.old
        removeItem(deletedItem.product_id)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [user, syncCartFromDB, removeItem])

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleApplyCoupon = () => {
    // Mock coupon validation
    const validCoupons: { [key: string]: number } = {
      'WELCOME10': 10,
      'SAVE20': 20,
      'NEWUSER': 15
    }

    if (validCoupons[couponCode.toUpperCase()]) {
      setAppliedCoupon(couponCode.toUpperCase())
      setDiscount(validCoupons[couponCode.toUpperCase()])
    } else {
      alert('Kode kupon tidak valid')
    }
  }

  const subtotal = getTotalPrice()
  const discountAmount = (subtotal * discount) / 100
  const shipping = subtotal > 500000 ? 0 : 15000
  const total = subtotal - discountAmount + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-professional py-8">
          <div className="text-center py-12">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Anda Kosong</h2>
            <p className="text-gray-600 mb-8">Mulai berbelanja dan tambahkan produk ke keranjang Anda</p>
            <Link href="/products">
              <Button size="lg">
                Mulai Berbelanja
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-professional py-8">
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center text-primary-600 hover:text-primary-500 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Produk
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Keranjang Belanja</h1>
          <p className="text-gray-600">Review dan lanjutkan pembelian Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Item di Keranjang ({getTotalItems()})</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Hapus Semua
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {item.product.description}
                      </p>
                      <div className="flex items-center mt-2">
                        <Badge variant="outline" className="text-xs">
                          {item.product.category.name}
                        </Badge>
                        <span className="text-sm text-gray-500 ml-2">
                          Stok: {item.product.stock}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatPrice(item.product.price)} per item
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.product_id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coupon Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kode Kupon
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Masukkan kode kupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={!!appliedCoupon}
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={!couponCode || !!appliedCoupon}
                    >
                      Terapkan
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-green-600">Kupon {appliedCoupon} diterapkan</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setAppliedCoupon(null)
                          setDiscount(0)
                        }}
                      >
                        Hapus
                      </Button>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({getTotalItems()} item)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Diskon ({discount}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span>Ongkos Kirim</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Gratis</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  
                  {shipping > 0 && subtotal < 500000 && (
                    <p className="text-xs text-gray-500">
                      Belanja minimal Rp 500.000 untuk gratis ongkir
                    </p>
                  )}
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout" className="block">
                  <Button className="w-full" size="lg">
                    Lanjut ke Checkout
                  </Button>
                </Link>

                {/* Security Badges */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-1" />
                      <span>100% Aman</span>
                    </div>
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 mr-1" />
                      <span>Gratis Ongkir</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
