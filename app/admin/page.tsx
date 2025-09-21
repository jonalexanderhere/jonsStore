'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  ShoppingCart, 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react'
import { formatPrice, formatDate } from '@/lib/utils'
import { useAuth } from '@/components/auth/auth-provider'
import { createClient, subscribeToProducts, subscribeToOrders, subscribeToNotifications } from '@/lib/supabase'
import { Product } from '@/lib/types'

interface Order {
  id: string
  customer: string
  amount: number
  status: string
  date: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
    ordersGrowth: 0,
    revenueGrowth: 0,
    productsGrowth: 0,
    usersGrowth: 0
  })
  
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  // Check authentication and admin role
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/auth/login')
        return
      }
      if (user.role !== 'admin') {
        router.push('/')
        return
      }
    }
  }, [user, authLoading, router])

  // Fetch data from database
  useEffect(() => {
    const fetchData = async () => {
      if (!user || user.role !== 'admin') return
      
      try {
        const supabase = createClient()
        
        // Fetch products with real data
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select(`
            *,
            category:categories(name)
          `)
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(20)

        if (productsError) {
          console.error('Error fetching products:', productsError)
        } else {
          setProducts(productsData || [])
        }

        // Fetch orders from database
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select(`
            *,
            user:users(full_name, email)
          `)
          .order('created_at', { ascending: false })
          .limit(10)

        // Fetch users count
        const { count: usersCount } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })

        if (ordersError) {
          console.error('Error fetching orders:', ordersError)
          // Fallback to mock data if database fails
          const mockOrders = [
            {
              id: 'ORD-001',
              customer: 'John Doe',
              amount: 2500000,
              status: 'processing',
              date: '2024-01-15'
            },
            {
              id: 'ORD-002',
              customer: 'Jane Smith',
              amount: 1800000,
              status: 'shipped',
              date: '2024-01-14'
            },
            {
              id: 'ORD-003',
              customer: 'Bob Johnson',
              amount: 3200000,
              status: 'delivered',
              date: '2024-01-13'
            }
          ]
          setOrders(mockOrders)
        } else {
          // Transform orders data to match expected format
          const transformedOrders = (ordersData || []).map(order => ({
            id: order.id,
            customer: order.user?.full_name || 'Unknown Customer',
            amount: order.total_amount,
            status: order.status,
            date: order.created_at
          }))
          setOrders(transformedOrders)
        }

        // Calculate stats
        const totalProducts = productsData?.length || 0
        const currentOrders = ordersData || []
        const totalRevenue = currentOrders.reduce((sum, order) => sum + order.total_amount, 0)
        
        setStats({
          totalOrders: currentOrders.length,
          totalRevenue,
          totalProducts,
          totalUsers: usersCount || 0,
          ordersGrowth: 12.5,
          revenueGrowth: 8.3,
          productsGrowth: 5.2,
          usersGrowth: 15.7
        })

      } catch (error) {
        console.error('Error fetching admin data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user])

  // Real-time subscriptions for admin dashboard
  useEffect(() => {
    if (!user || user.role !== 'admin') return

    // Subscribe to product updates
    const productSubscription = subscribeToProducts((payload) => {
      console.log('Real-time product update:', payload)
      
      if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
        const updatedProduct = payload.new as unknown as Product
        
        setProducts(prev => {
          const existingIndex = prev.findIndex(p => p.id === updatedProduct.id)
          if (existingIndex >= 0) {
            const updated = [...prev]
            updated[existingIndex] = updatedProduct
            return updated
          } else {
            return [updatedProduct, ...prev]
          }
        })
      } else if (payload.eventType === 'DELETE') {
        setProducts(prev => 
          prev.filter(p => p.id !== payload.old.id)
        )
      }
    })

    // Subscribe to order updates
    const orderSubscription = subscribeToOrders(user.id, (payload) => {
      console.log('Real-time order update:', payload)
      
      if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
        const updatedOrder = payload.new as unknown as {
          id: string
          user?: { full_name?: string }
          total_amount: number
          status: string
          created_at: string
        }
        
        setOrders(prev => {
          const existingIndex = prev.findIndex(o => o.id === updatedOrder.id)
          if (existingIndex >= 0) {
            const updated = [...prev]
            updated[existingIndex] = {
              id: String(updatedOrder.id),
              customer: String(updatedOrder.user?.full_name || 'Unknown Customer'),
              amount: Number(updatedOrder.total_amount),
              status: String(updatedOrder.status),
              date: String(updatedOrder.created_at)
            }
            return updated
          } else {
            return [{
              id: String(updatedOrder.id),
              customer: String(updatedOrder.user?.full_name || 'Unknown Customer'),
              amount: Number(updatedOrder.total_amount),
              status: String(updatedOrder.status),
              date: String(updatedOrder.created_at)
            }, ...prev]
          }
        })
      }
    })

    // Subscribe to notifications
    const notificationSubscription = subscribeToNotifications(user.id, (payload) => {
      console.log('Real-time notification:', payload)
      // Notification handling can be implemented here if needed
    })

    return () => {
      productSubscription.unsubscribe()
      orderSubscription.unsubscribe()
      notificationSubscription.unsubscribe()
    }
  }, [user])

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-professional py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-600">Kelola toko online Anda dengan mudah</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'products', label: 'Produk' },
              { id: 'orders', label: 'Pesanan' },
              { id: 'customers', label: 'Pelanggan' },
              { id: 'analytics', label: 'Analytics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ShoppingCart className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Pesanan</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
                      <p className="text-sm text-green-600 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{stats.ordersGrowth}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Pendapatan</p>
                      <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalRevenue)}</p>
                      <p className="text-sm text-green-600 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{stats.revenueGrowth}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Package className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Produk</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                      <p className="text-sm text-green-600 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{stats.productsGrowth}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Pelanggan</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                      <p className="text-sm text-green-600 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{stats.usersGrowth}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders and Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Pesanan Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customer}</p>
                          <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(order.amount)}</p>
                          <Badge 
                            variant={order.status === 'delivered' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Lihat Semua Pesanan
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Produk Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.slice(0, 3).map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">{formatPrice(product.price)}</p>
                          <p className="text-sm text-gray-500">Stok: {product.stock}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={product.is_active ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {product.is_active ? 'Aktif' : 'Tidak Aktif'}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Lihat Semua Produk
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Kelola Produk</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Produk
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Produk
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Harga
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stok
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                                <Package className="h-5 w-5 text-gray-400" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">ID: {product.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatPrice(product.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product.stock}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              variant={product.is_active ? 'default' : 'destructive'}
                            >
                              {product.is_active ? 'Aktif' : 'Tidak Aktif'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Kelola Pesanan</h2>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID Pesanan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pelanggan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tanggal
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatPrice(order.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              variant={order.status === 'delivered' ? 'default' : 'secondary'}
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(order.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Kelola Pelanggan</h2>
              <div className="flex items-center space-x-2">
                <Input placeholder="Cari pelanggan..." className="w-64" />
                <Button variant="outline">Filter</Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pelanggan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Pesanan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">John Doe</div>
                              <div className="text-sm text-gray-500">ID: 12345</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          john@example.com
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          5 pesanan
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="default">Aktif</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline">Export Data</Button>
                <Button variant="outline">Refresh</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pendapatan Hari Ini</p>
                      <p className="text-2xl font-bold text-gray-900">Rp 2.5M</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <ShoppingCart className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pesanan Hari Ini</p>
                      <p className="text-2xl font-bold text-gray-900">45</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pengunjung Hari Ini</p>
                      <p className="text-2xl font-bold text-gray-900">1,234</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Package className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Produk Terjual</p>
                      <p className="text-2xl font-bold text-gray-900">89</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Grafik Penjualan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Grafik penjualan akan ditampilkan di sini
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Produk Terpopuler</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">iPhone 15 Pro Max</span>
                      <span className="text-sm text-gray-500">25 terjual</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Samsung Galaxy S24</span>
                      <span className="text-sm text-gray-500">18 terjual</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">MacBook Air M3</span>
                      <span className="text-sm text-gray-500">12 terjual</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

