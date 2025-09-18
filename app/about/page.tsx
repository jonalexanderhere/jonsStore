'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Shield, 
  Truck, 
  Headphones, 
  Award, 
  Users, 
  CheckCircle
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 section-padding">
        <div className="container-professional">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tentang <span className="text-blue-600">JonsStore</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Platform e-commerce terpercaya yang berkomitmen memberikan pengalaman berbelanja terbaik 
              dengan produk berkualitas tinggi dan layanan pelanggan yang prima.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-professional">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Misi Kami</h2>
              <p className="text-lg text-gray-600 mb-6">
                Menyediakan akses mudah dan aman untuk mendapatkan produk berkualitas tinggi 
                dengan harga yang kompetitif, sambil memberikan pengalaman berbelanja yang 
                memuaskan dan terpercaya.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Produk berkualitas terjamin</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Harga kompetitif dan transparan</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Layanan pelanggan 24/7</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Visi Kami</h2>
              <p className="text-lg text-gray-600 mb-6">
                Menjadi platform e-commerce terdepan di Indonesia yang dikenal karena 
                kepercayaan, kualitas produk, dan kepuasan pelanggan yang tinggi.
              </p>
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Target 2025</h3>
                <ul className="text-blue-800 space-y-2">
                  <li>• 1 juta pelanggan aktif</li>
                  <li>• 100,000 produk berkualitas</li>
                  <li>• 99% kepuasan pelanggan</li>
                  <li>• Pengiriman ke seluruh Indonesia</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white section-padding">
        <div className="container-professional">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fondasi yang membangun kepercayaan dan kesuksesan JonsStore
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="professional-card p-6 text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Kepedulian</h3>
                <p className="text-gray-600">
                  Kami peduli dengan kebutuhan dan kepuasan setiap pelanggan, 
                  memberikan perhatian personal dalam setiap interaksi.
                </p>
              </CardContent>
            </Card>

            <Card className="professional-card p-6 text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Keamanan</h3>
                <p className="text-gray-600">
                  Data dan transaksi pelanggan dilindungi dengan teknologi keamanan 
                  terdepan dan enkripsi tingkat militer.
                </p>
              </CardContent>
            </Card>

            <Card className="professional-card p-6 text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Kecepatan</h3>
                <p className="text-gray-600">
                  Pengiriman cepat dan efisien ke seluruh Indonesia dengan 
                  jaringan logistik yang terintegrasi.
                </p>
              </CardContent>
            </Card>

            <Card className="professional-card p-6 text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Pelayanan</h3>
                <p className="text-gray-600">
                  Tim customer service profesional siap membantu 24/7 dengan 
                  respons cepat dan solusi terbaik.
                </p>
              </CardContent>
            </Card>

            <Card className="professional-card p-6 text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Kualitas</h3>
                <p className="text-gray-600">
                  Setiap produk melalui proses seleksi ketat untuk memastikan 
                  kualitas terbaik dan sesuai standar internasional.
                </p>
              </CardContent>
            </Card>

            <Card className="professional-card p-6 text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Komunitas</h3>
                <p className="text-gray-600">
                  Membangun komunitas pelanggan yang kuat dengan program loyalitas 
                  dan pengalaman berbelanja yang menyenangkan.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 section-padding">
        <div className="container-professional">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Pencapaian Kami</h2>
            <p className="text-blue-100 text-lg">
              Angka-angka yang membuktikan kepercayaan pelanggan
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500K+</div>
              <div className="text-blue-100">Pelanggan Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-blue-100">Produk Tersedia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-blue-100">Uptime Platform</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">4.8/5</div>
              <div className="text-blue-100">Rating Pelanggan</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-professional">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Bergabunglah dengan JonsStore
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Dapatkan pengalaman berbelanja terbaik dengan akses ke jutaan produk berkualitas 
              dan layanan pelanggan yang prima.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-primary text-lg px-8 py-4">
                Mulai Berbelanja
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary text-lg px-8 py-4">
                Hubungi Kami
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
