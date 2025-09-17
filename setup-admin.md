# Setup Admin Account - JonsStore

## 🚀 Quick Setup Guide

### 1. Setup Environment Variables
Copy file `env.local.example` menjadi `.env.local` dan isi dengan konfigurasi Supabase Anda:

```bash
cp env.local.example .env.local
```

Edit `.env.local` dengan data Supabase Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Setup Database
1. Buka [Supabase Dashboard](https://supabase.com)
2. Buat project baru
3. Buka SQL Editor
4. Copy dan paste seluruh isi file `supabase-schema.sql`
5. Klik "Run" untuk menjalankan script

### 3. Create Admin User
Jalankan script untuk membuat akun admin:

```bash
node scripts/create-admin.js
```

**Akun Admin:**
- Email: `admin@jonsstore.com`
- Password: `admin123456`
- Role: `admin`

### 4. Run Application
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

### 5. Login as Admin
1. Klik "Login" di header
2. Masukkan email: `admin@jonsstore.com`
3. Masukkan password: `admin123456`
4. Setelah login, Anda akan melihat link "Dashboard Admin"

## 🔧 Manual Admin Creation

Jika script tidak berfungsi, Anda bisa membuat admin secara manual:

### Via Supabase Dashboard:
1. Buka Authentication > Users
2. Klik "Add user"
3. Email: `admin@jonsstore.com`
4. Password: `admin123456`
5. Confirm email: `true`

### Via SQL:
```sql
-- Insert admin user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  raw_app_meta_data
) VALUES (
  gen_random_uuid(),
  'admin@jonsstore.com',
  crypt('admin123456', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"full_name": "Admin JonsStore", "role": "admin"}',
  '{"provider": "email", "providers": ["email"]}'
);

-- Insert user profile
INSERT INTO public.users (
  id,
  email,
  full_name,
  role,
  phone
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@jonsstore.com'),
  'admin@jonsstore.com',
  'Admin JonsStore',
  'admin',
  '+6281234567890'
);
```

## 🎯 Admin Features

Setelah login sebagai admin, Anda dapat:

1. **Dashboard Overview**
   - Statistik penjualan
   - Data pengguna
   - Produk terbaru
   - Pesanan pending

2. **Product Management**
   - Tambah/edit/hapus produk
   - Upload gambar produk
   - Kelola kategori
   - Update stok

3. **Order Management**
   - Lihat semua pesanan
   - Update status pesanan
   - Konfirmasi pembayaran
   - Generate laporan

4. **Customer Management**
   - Lihat data pelanggan
   - Kelola alamat
   - Riwayat transaksi

## 🛠️ Troubleshooting

### Error: "Invalid Supabase URL"
- Pastikan `NEXT_PUBLIC_SUPABASE_URL` sudah diisi dengan benar
- URL harus dalam format: `https://your-project.supabase.co`

### Error: "Invalid API Key"
- Pastikan `NEXT_PUBLIC_SUPABASE_ANON_KEY` sudah diisi
- Key harus dimulai dengan `eyJ`

### Error: "Database connection failed"
- Pastikan database schema sudah dijalankan
- Cek koneksi internet
- Verifikasi project Supabase aktif

### Error: "Admin user already exists"
- Akun admin sudah ada
- Coba login dengan email: `admin@jonsstore.com`
- Password: `admin123456`

## 📞 Support

Jika mengalami masalah:
1. Cek console browser untuk error
2. Cek terminal untuk error server
3. Verifikasi environment variables
4. Pastikan database schema sudah dijalankan

---

**Selamat! JonsStore siap digunakan! 🎉**

