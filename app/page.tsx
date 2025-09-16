import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star, Truck, Shield, Headphones, Zap } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Pengiriman Cepat",
      description: "Pengiriman ke seluruh Indonesia dengan estimasi 1-3 hari kerja"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "100% Aman",
      description: "Transaksi aman dengan sistem keamanan berlapis"
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Customer service siap membantu Anda kapan saja"
    },
    {
      icon: <Zap className="h-6 w-6" />,
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

  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 19999000,
      originalPrice: 22999000,
      image: "/images/iphone.jpg",
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: "MacBook Air M2",
      price: 15999000,
      originalPrice: 17999000,
      image: "/images/macbook.jpg",
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      price: 3999000,
      originalPrice: 4999000,
      image: "/images/headphones.jpg",
      rating: 4.7,
      reviews: 203
    },
    {
      id: 4,
      name: "Samsung Galaxy S24",
      price: 12999000,
      originalPrice: 14999000,
      image: "/images/samsung.jpg",
      rating: 4.6,
      reviews: 156
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Belanja Online
                  <span className="block text-primary-200">Tanpa Batas</span>
                </h1>
                <p className="text-xl text-primary-100 mt-6 leading-relaxed">
                  Temukan jutaan produk berkualitas dengan harga terbaik. 
                  Pengiriman cepat, aman, dan terpercaya ke seluruh Indonesia.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  Mulai Belanja
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Lihat Kategori
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white/20 rounded-lg p-4 text-center">
                      <div className="w-16 h-16 bg-white/30 rounded-full mx-auto mb-2"></div>
                      <p className="text-sm">Produk {i}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-lg text-gray-600">
              Kami berkomitmen memberikan pengalaman berbelanja terbaik
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Kategori Populer
            </h2>
            <p className="text-lg text-gray-600">
              Jelajahi berbagai kategori produk yang tersedia
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={`/categories/${category.name.toLowerCase()}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.count}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Lihat Semua</span>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Produk Unggulan
            </h2>
            <p className="text-lg text-gray-600">
              Produk terbaik dengan harga spesial untuk Anda
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    Sale
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-primary-600">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      Rp {product.originalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/products">
              <Button size="lg">
                Lihat Semua Produk
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Siap Memulai Perjalanan Belanja Anda?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Daftar sekarang dan dapatkan diskon 10% untuk pembelian pertama
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Daftar Sekarang
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                Mulai Belanja
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
