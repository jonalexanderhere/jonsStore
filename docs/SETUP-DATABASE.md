# Setup Database Supabase

## Langkah-langkah Setup Database

### 1. Buka Supabase Dashboard
- Kunjungi https://supabase.com/dashboard
- Login ke akun Anda
- Pilih project yang sudah dibuat

### 2. Buka SQL Editor
- Di sidebar kiri, klik "SQL Editor"
- Klik "New query"

### 3. Jalankan SQL Setup
Copy dan paste seluruh isi file `supabase-setup.sql` ke SQL Editor, lalu klik "Run"

### 4. Verifikasi Tabel
Setelah menjalankan SQL, pastikan tabel-tabel berikut sudah dibuat:
- `categories` - untuk kategori produk
- `products` - untuk data produk
- `users` - untuk data pengguna
- `orders` - untuk data pesanan
- `order_items` - untuk detail item pesanan

### 5. Verifikasi Data
Pastikan data sudah terisi:
- 4 kategori (Elektronik, Fashion, Rumah & Taman, Olahraga)
- 8 produk dengan gambar dari Unsplash

### 6. Test Aplikasi
- Jalankan `npm run dev`
- Buka http://localhost:3000
- Cek halaman Products dan Categories untuk memastikan data tampil

## Troubleshooting

### Jika tabel tidak muncul:
1. Pastikan SQL berhasil dijalankan tanpa error
2. Refresh halaman Supabase dashboard
3. Cek di bagian "Table Editor" apakah tabel sudah ada

### Jika data tidak tampil di aplikasi:
1. Pastikan environment variables sudah benar di `.env.local`
2. Cek console browser untuk error
3. Pastikan RLS (Row Level Security) sudah diaktifkan

### Jika gambar tidak tampil:
1. Pastikan URL gambar dari Unsplash dapat diakses
2. Cek network tab di browser developer tools
3. Pastikan Next.js config sudah mengizinkan domain Unsplash
