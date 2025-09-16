'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Package, Truck, Home, ShoppingBag } from 'lucide-react'

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Pesanan Berhasil!
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Terima kasih atas pembelian Anda. Pesanan Anda sedang diproses.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Nomor Pesanan</span>
                <span className="text-sm font-semibold text-gray-900">#ORD-000001</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Total Pembayaran</span>
                <span className="text-sm font-semibold text-gray-900">Rp 2.500.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Metode Pembayaran</span>
                <span className="text-sm font-semibold text-gray-900">Kartu Kredit</span>
              </div>
            </div>

            {/* Order Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Status Pesanan</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Pesanan Dikonfirmasi</p>
                    <p className="text-xs text-gray-500">Pesanan Anda telah diterima</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Package className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sedang Diproses</p>
                    <p className="text-xs text-gray-500">Pesanan sedang disiapkan</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <Truck className="h-4 w-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Dikirim</p>
                    <p className="text-xs text-gray-500">Pesanan akan dikirim</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">Langkah Selanjutnya</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Anda akan menerima email konfirmasi</li>
                <li>• Kami akan mengirimkan nomor tracking</li>
                <li>• Estimasi pengiriman 1-3 hari kerja</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/orders" className="block">
                <Button className="w-full">
                  <Package className="h-4 w-4 mr-2" />
                  Lihat Detail Pesanan
                </Button>
              </Link>
              
              <div className="grid grid-cols-2 gap-3">
                <Link href="/products">
                  <Button variant="outline" className="w-full">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Lanjut Belanja
                  </Button>
                </Link>
                
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    <Home className="h-4 w-4 mr-2" />
                    Kembali Home
                  </Button>
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center text-sm text-gray-500">
              <p>Ada pertanyaan? Hubungi customer service kami</p>
              <p className="font-medium">📞 +62 123 456 7890</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
