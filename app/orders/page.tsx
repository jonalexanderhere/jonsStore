'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { formatPrice, formatDate } from '@/lib/utils'
import { Search, Filter, Eye, Package, Clock, CheckCircle, XCircle } from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  totalAmount: number
  itemCount: number
  createdAt: string
  items: {
    id: string
    name: string
    quantity: number
    price: number
    image: string
  }[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: '1',
        orderNumber: 'ORD-000001',
        status: 'delivered',
        paymentStatus: 'paid',
        totalAmount: 2500000,
        itemCount: 2,
        createdAt: '2024-01-15T10:30:00Z',
        items: [
          {
            id: '1',
            name: 'iPhone 15 Pro Max',
            quantity: 1,
            price: 19999000,
            image: '/images/iphone.jpg'
          },
          {
            id: '2',
            name: 'Sony WH-1000XM5',
            quantity: 1,
            price: 3999000,
            image: '/images/headphones.jpg'
          }
        ]
      },
      {
        id: '2',
        orderNumber: 'ORD-000002',
        status: 'shipped',
        paymentStatus: 'paid',
        totalAmount: 1800000,
        itemCount: 1,
        createdAt: '2024-01-14T14:20:00Z',
        items: [
          {
            id: '3',
            name: 'MacBook Air M2',
            quantity: 1,
            price: 15999000,
            image: '/images/macbook.jpg'
          }
        ]
      },
      {
        id: '3',
        orderNumber: 'ORD-000003',
        status: 'processing',
        paymentStatus: 'paid',
        totalAmount: 3200000,
        itemCount: 3,
        createdAt: '2024-01-13T09:15:00Z',
        items: [
          {
            id: '4',
            name: 'Nike Air Max 270',
            quantity: 2,
            price: 1999000,
            image: '/images/nike.jpg'
          },
          {
            id: '5',
            name: 'Samsung Galaxy S24',
            quantity: 1,
            price: 12999000,
            image: '/images/samsung.jpg'
          }
        ]
      },
      {
        id: '4',
        orderNumber: 'ORD-000004',
        status: 'cancelled',
        paymentStatus: 'failed',
        totalAmount: 1500000,
        itemCount: 1,
        createdAt: '2024-01-12T16:45:00Z',
        items: [
          {
            id: '6',
            name: 'iPad Pro 12.9"',
            quantity: 1,
            price: 12999000,
            image: '/images/ipad.jpg'
          }
        ]
      }
    ]
    
    setOrders(mockOrders)
    setFilteredOrders(mockOrders)
    setIsLoading(false)
  }, [])

  // Filter orders
  useEffect(() => {
    let filtered = orders

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [orders, searchQuery, statusFilter])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'shipped':
        return <Package className="h-4 w-4 text-blue-600" />
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Menunggu Konfirmasi'
      case 'processing':
        return 'Sedang Diproses'
      case 'shipped':
        return 'Dikirim'
      case 'delivered':
        return 'Selesai'
      case 'cancelled':
        return 'Dibatalkan'
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat pesanan...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pesanan Saya</h1>
          <p className="text-gray-600">Kelola dan lacak pesanan Anda</p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Cari berdasarkan nomor pesanan..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="md:w-48">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="all">Semua Status</option>
                    <option value="pending">Menunggu Konfirmasi</option>
                    <option value="processing">Sedang Diproses</option>
                    <option value="shipped">Dikirim</option>
                    <option value="delivered">Selesai</option>
                    <option value="cancelled">Dibatalkan</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchQuery || statusFilter !== 'all' ? 'Tidak ada pesanan yang ditemukan' : 'Belum ada pesanan'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Coba ubah filter pencarian Anda' 
                  : 'Mulai berbelanja dan buat pesanan pertama Anda'
                }
              </p>
              <Link href="/products">
                <Button>Mulai Berbelanja</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {order.orderNumber}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {formatDate(order.createdAt)} • {order.itemCount} item
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1">{getStatusText(order.status)}</span>
                          </Badge>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-2 mb-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-600">
                                {item.quantity}x {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Total */}
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          Total Pembayaran
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          {formatPrice(order.totalAmount)}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <div className="flex flex-col space-y-2">
                        <Link href={`/orders/${order.id}`}>
                          <Button variant="outline" className="w-full">
                            <Eye className="h-4 w-4 mr-2" />
                            Detail Pesanan
                          </Button>
                        </Link>
                        
                        {order.status === 'delivered' && (
                          <Button variant="outline" className="w-full">
                            Beri Ulasan
                          </Button>
                        )}
                        
                        {order.status === 'pending' && (
                          <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                            Batalkan Pesanan
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

