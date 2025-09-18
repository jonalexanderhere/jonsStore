'use client'

import { Card, CardContent } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="container-professional">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Kebijakan Privasi
            </h1>
            <p className="text-lg text-gray-600">
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
            </p>
          </div>

          <Card className="professional-card">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Pengenalan</h2>
                <p className="text-gray-700 mb-6">
                  JonsStore (&quot;kami&quot;, &quot;kita&quot;, &quot;platform&quot;) menghormati privasi Anda dan berkomitmen 
                  melindungi informasi pribadi yang Anda berikan kepada kami. Kebijakan privasi ini 
                  menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Informasi yang Kami Kumpulkan</h2>
                <div className="text-gray-700 mb-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Informasi Pribadi:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Nama lengkap dan alamat email</li>
                    <li>Nomor telepon dan alamat pengiriman</li>
                    <li>Informasi pembayaran (dienkripsi)</li>
                    <li>Riwayat pembelian dan preferensi</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-gray-900">Informasi Teknis:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Alamat IP dan lokasi geografis</li>
                    <li>Jenis browser dan perangkat</li>
                    <li>Data penggunaan platform</li>
                    <li>Cookies dan teknologi serupa</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cara Kami Menggunakan Informasi</h2>
                <div className="text-gray-700 mb-6 space-y-4">
                  <p>Kami menggunakan informasi Anda untuk:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Memproses dan memenuhi pesanan Anda</li>
                    <li>Menyediakan layanan customer support</li>
                    <li>Mengirim notifikasi dan update penting</li>
                    <li>Meningkatkan platform dan pengalaman pengguna</li>
                    <li>Mencegah penipuan dan aktivitas ilegal</li>
                    <li>Mengirim promosi dan penawaran khusus (dengan persetujuan)</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Berbagi Informasi</h2>
                <div className="text-gray-700 mb-6 space-y-4">
                  <p>Kami dapat membagikan informasi Anda dalam situasi berikut:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Penyedia Layanan:</strong> Dengan vendor yang membantu operasi platform</li>
                    <li><strong>Penyedia Logistik:</strong> Untuk pengiriman dan pengembalian produk</li>
                    <li><strong>Penyedia Pembayaran:</strong> Untuk memproses transaksi</li>
                    <li><strong>Kewajiban Hukum:</strong> Jika diwajibkan oleh hukum atau pengadilan</li>
                    <li><strong>Perlindungan Hak:</strong> Untuk melindungi hak dan keamanan kami</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Keamanan Data</h2>
                <div className="text-gray-700 mb-6 space-y-4">
                  <p>Kami menerapkan langkah-langkah keamanan yang ketat:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Enkripsi SSL/TLS untuk transmisi data</li>
                    <li>Enkripsi database untuk data sensitif</li>
                    <li>Akses terbatas hanya untuk personel yang berwenang</li>
                    <li>Pemantauan keamanan 24/7</li>
                    <li>Audit keamanan berkala</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies dan Teknologi Pelacakan</h2>
                <div className="text-gray-700 mb-6 space-y-4">
                  <p>Kami menggunakan cookies untuk:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Mengingat preferensi dan pengaturan Anda</li>
                    <li>Menganalisis penggunaan platform</li>
                    <li>Menyediakan konten yang dipersonalisasi</li>
                    <li>Meningkatkan performa platform</li>
                  </ul>
                  <p>Anda dapat mengatur preferensi cookies di browser Anda.</p>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Hak Anda</h2>
                <div className="text-gray-700 mb-6 space-y-4">
                  <p>Anda memiliki hak untuk:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Mengakses dan memperbarui informasi pribadi Anda</li>
                    <li>Menghapus akun dan data Anda</li>
                    <li>Menolak pemrosesan data untuk pemasaran</li>
                    <li>Meminta portabilitas data</li>
                    <li>Mengajukan keluhan kepada otoritas perlindungan data</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Retensi Data</h2>
                <p className="text-gray-700 mb-6">
                  Kami menyimpan informasi Anda selama diperlukan untuk memenuhi tujuan yang dijelaskan 
                  dalam kebijakan ini, atau sesuai dengan kewajiban hukum. Data akan dihapus secara 
                  aman setelah periode retensi berakhir.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Transfer Data Internasional</h2>
                <p className="text-gray-700 mb-6">
                  Data Anda mungkin ditransfer ke dan diproses di negara lain yang memiliki 
                  undang-undang perlindungan data yang berbeda. Kami memastikan perlindungan 
                  yang memadai melalui perjanjian transfer data yang sesuai.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Perubahan Kebijakan</h2>
                <p className="text-gray-700 mb-6">
                  Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. 
                  Perubahan material akan diberitahukan melalui platform atau email. 
                  Kami mendorong Anda untuk meninjau kebijakan ini secara berkala.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Kontak</h2>
                <div className="text-gray-700 mb-6 space-y-4">
                  <p>Untuk pertanyaan tentang kebijakan privasi ini, silakan hubungi:</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p><strong>Data Protection Officer:</strong> privacy@jonsstore.com</p>
                    <p><strong>Telepon:</strong> +62 123 456 7890</p>
                    <p><strong>Alamat:</strong> Jl. Teknologi No. 123, Jakarta Selatan, Indonesia</p>
                  </div>
                </div>

                <div className="border-t pt-6 mt-8">
                  <p className="text-sm text-gray-500 text-center">
                    Dengan menggunakan platform JonsStore, Anda menyatakan telah membaca, 
                    memahami, dan menyetujui kebijakan privasi ini.
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
