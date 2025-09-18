'use client'

import { Card, CardContent } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="container-professional">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Syarat & Ketentuan
            </h1>
            <p className="text-lg text-gray-600">
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
            </p>
          </div>

          <Card className="professional-card">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Penerimaan Syarat</h2>
                <p className="text-gray-700 mb-6">
                  Dengan mengakses dan menggunakan platform JonsStore, Anda menyetujui untuk terikat 
                  oleh syarat dan ketentuan ini. Jika Anda tidak menyetujui syarat-syarat ini, 
                  harap tidak menggunakan layanan kami.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Penggunaan Platform</h2>
                <div className="text-gray-700 mb-6 space-y-4">
                  <p>Anda dapat menggunakan platform JonsStore untuk:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Mencari dan membeli produk yang tersedia</li>
                    <li>Membuat akun dan mengelola profil Anda</li>
                    <li>Memberikan ulasan dan rating produk</li>
                    <li>Berinteraksi dengan customer service</li>
                  </ul>
                  <p>Anda tidak diperkenankan untuk:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Menggunakan platform untuk aktivitas ilegal</li>
                    <li>Mengganggu atau merusak sistem platform</li>
                    <li>Menyebarkan konten yang tidak pantas</li>
                    <li>Melakukan transaksi penipuan</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Akun Pengguna</h2>
                <div className="text-gray-700 mb-6 space-y-4">
                  <p>Untuk menggunakan layanan kami, Anda harus:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Menyediakan informasi yang akurat dan lengkap</li>
                    <li>Memelihara keamanan akun Anda</li>
                    <li>Bertanggung jawab atas semua aktivitas di akun Anda</li>
                    <li>Segera melaporkan penggunaan yang tidak sah</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Produk dan Harga</h2>
                <div className="text-gray-700 mb-6 space-y-4">
                  <p>Kami berusaha menyediakan informasi produk yang akurat, namun:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Harga dapat berubah sewaktu-waktu tanpa pemberitahuan</li>
                    <li>Stok produk terbatas dan dapat habis</li>
                    <li>Gambar produk hanya untuk ilustrasi</li>
                    <li>Spesifikasi produk dapat berubah tanpa pemberitahuan</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Pembayaran dan Pengiriman</h2>
                <div className="text-gray-700 mb-6 space-y-4">
                  <p>Ketentuan pembayaran dan pengiriman:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Pembayaran harus dilakukan sesuai metode yang dipilih</li>
                    <li>Pengiriman dilakukan setelah pembayaran dikonfirmasi</li>
                    <li>Estimasi pengiriman dapat berubah karena kondisi tertentu</li>
                    <li>Biaya pengiriman dapat bervariasi sesuai lokasi</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Pengembalian dan Refund</h2>
                <div className="text-gray-700 mb-6 space-y-4">
                  <p>Kebijakan pengembalian:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Produk dapat dikembalikan dalam 7 hari setelah diterima</li>
                    <li>Produk harus dalam kondisi asli dan tidak rusak</li>
                    <li>Refund akan diproses dalam 3-5 hari kerja</li>
                    <li>Biaya pengiriman pengembalian ditanggung pembeli</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privasi dan Data</h2>
                <div className="text-gray-700 mb-6 space-y-4">
                  <p>Kami menghormati privasi Anda:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Data pribadi Anda dilindungi sesuai kebijakan privasi</li>
                    <li>Kami tidak menjual data Anda kepada pihak ketiga</li>
                    <li>Data digunakan untuk meningkatkan layanan kami</li>
                    <li>Anda dapat mengakses dan memperbarui data Anda</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Batasan Tanggung Jawab</h2>
                <div className="text-gray-700 mb-6 space-y-4">
                  <p>JonsStore tidak bertanggung jawab atas:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Kerugian yang timbul dari penggunaan platform</li>
                    <li>Keterlambatan atau kegagalan pengiriman</li>
                    <li>Kerusakan produk yang disebabkan oleh pihak ketiga</li>
                    <li>Kehilangan data akibat faktor eksternal</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Perubahan Syarat</h2>
                <p className="text-gray-700 mb-6">
                  Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu. 
                  Perubahan akan diberitahukan melalui platform atau email. 
                  Penggunaan berkelanjutan setelah perubahan dianggap sebagai persetujuan.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Kontak</h2>
                <div className="text-gray-700 mb-6 space-y-4">
                  <p>Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi:</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p><strong>Email:</strong> legal@jonsstore.com</p>
                    <p><strong>Telepon:</strong> +62 123 456 7890</p>
                    <p><strong>Alamat:</strong> Jl. Teknologi No. 123, Jakarta Selatan, Indonesia</p>
                  </div>
                </div>

                <div className="border-t pt-6 mt-8">
                  <p className="text-sm text-gray-500 text-center">
                    Dengan menggunakan platform JonsStore, Anda menyatakan telah membaca, 
                    memahami, dan menyetujui syarat dan ketentuan ini.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
