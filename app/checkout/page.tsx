'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { toast } from 'react-hot-toast'
import { ArrowLeft, CreditCard, MapPin, User, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

interface CheckoutForm {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  paymentMethod: 'credit' | 'bank_transfer' | 'e_wallet'
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
}

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutForm>()
  
  const paymentMethod = watch('paymentMethod')
  const subtotal = getTotalPrice()
  const shipping = subtotal > 500000 ? 0 : 15000
  const total = subtotal + shipping

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear cart after successful order
      clearCart()
      
      toast.success('Pesanan berhasil dibuat!')
      router.push('/orders/success')
    } catch {
      toast.error('Terjadi kesalahan saat memproses pesanan')
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Keranjang Kosong</h2>
          <p className="text-gray-600 mb-8">Tidak ada item untuk checkout</p>
          <Link href="/products">
            <Button>Kembali ke Produk</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-primary-600 hover:text-primary-500 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Keranjang
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">Lengkapi informasi untuk menyelesaikan pembelian</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Informasi Pengiriman
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Masukkan nama lengkap"
                        className="pl-10"
                        {...register('fullName', { required: 'Nama lengkap wajib diisi' })}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="email"
                        placeholder="Masukkan email"
                        className="pl-10"
                        {...register('email', {
                          required: 'Email wajib diisi',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Format email tidak valid'
                          }
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="tel"
                      placeholder="Masukkan nomor telepon"
                      className="pl-10"
                      {...register('phone', { required: 'Nomor telepon wajib diisi' })}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap *
                  </label>
                  <Input
                    placeholder="Masukkan alamat lengkap"
                    {...register('address', { required: 'Alamat wajib diisi' })}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kota *
                    </label>
                    <Input
                      placeholder="Masukkan kota"
                      {...register('city', { required: 'Kota wajib diisi' })}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kode Pos *
                    </label>
                    <Input
                      placeholder="Masukkan kode pos"
                      {...register('postalCode', { required: 'Kode pos wajib diisi' })}
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Metode Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Metode Pembayaran *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        value="credit"
                        {...register('paymentMethod', { required: 'Pilih metode pembayaran' })}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-3">Kartu Kredit/Debit</span>
                    </label>
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        value="bank_transfer"
                        {...register('paymentMethod', { required: 'Pilih metode pembayaran' })}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-3">Transfer Bank</span>
                    </label>
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        value="e_wallet"
                        {...register('paymentMethod', { required: 'Pilih metode pembayaran' })}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-3">E-Wallet (GoPay, OVO, DANA)</span>
                    </label>
                  </div>
                  {errors.paymentMethod && (
                    <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>
                  )}
                </div>

                {paymentMethod === 'credit' && (
                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nomor Kartu *
                      </label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        {...register('cardNumber', {
                          required: 'Nomor kartu wajib diisi',
                          pattern: {
                            value: /^[0-9\s]{16,19}$/,
                            message: 'Format nomor kartu tidak valid'
                          }
                        })}
                      />
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tanggal Kadaluarsa *
                        </label>
                        <Input
                          placeholder="MM/YY"
                          {...register('expiryDate', {
                            required: 'Tanggal kadaluarsa wajib diisi',
                            pattern: {
                              value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                              message: 'Format MM/YY'
                            }
                          })}
                        />
                        {errors.expiryDate && (
                          <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <Input
                          placeholder="123"
                          {...register('cvv', {
                            required: 'CVV wajib diisi',
                            pattern: {
                              value: /^[0-9]{3,4}$/,
                              message: 'Format CVV tidak valid'
                            }
                          })}
                        />
                        {errors.cvv && (
                          <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama di Kartu *
                      </label>
                      <Input
                        placeholder="Nama sesuai di kartu"
                        {...register('cardName', { required: 'Nama di kartu wajib diisi' })}
                      />
                      {errors.cardName && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardName.message}</p>
                      )}
                    </div>
                  </div>
                )}
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
                {/* Order Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} x {formatPrice(item.product.price)}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({getTotalItems()} item)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
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
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Memproses...' : 'Buat Pesanan'}
                </Button>

                {/* Security Notice */}
                <div className="text-xs text-gray-500 text-center">
                  <p>Transaksi Anda aman dan terenkripsi</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  )
}

