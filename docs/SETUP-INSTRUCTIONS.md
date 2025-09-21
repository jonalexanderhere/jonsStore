# 🚀 Setup E-Commerce Database - Instruksi Lengkap

## 📋 Langkah-langkah Setup Database

### 1. Buka Supabase Dashboard
1. Pergi ke [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Login dengan akun Anda
3. Pilih project e-commerce Anda

### 2. Jalankan SQL Setup
1. Klik **SQL Editor** di sidebar kiri
2. Klik **New Query**
3. Copy dan paste seluruh isi file `supabase-setup.sql`
4. Klik **Run** untuk menjalankan SQL

### 3. Verifikasi Data
Setelah SQL berhasil dijalankan, verifikasi data dengan query berikut:

```sql
-- Cek kategori
SELECT COUNT(*) as total_categories FROM categories WHERE is_active = true;

-- Cek produk
SELECT COUNT(*) as total_products FROM products WHERE is_active = true;

-- Cek produk unggulan
SELECT COUNT(*) as featured_products FROM products WHERE is_featured = true;

-- Lihat semua kategori
SELECT id, name, description FROM categories ORDER BY name;

-- Lihat produk unggulan
SELECT id, name, price, is_featured FROM products WHERE is_featured = true ORDER BY name;
```

### 4. Buat Admin User
1. Pergi ke **Authentication** → **Users**
2. Klik **Add user**
3. Isi form:
   - **Email**: `admin@ecommerce.com`
   - **Password**: `Admin123!`
   - **Confirm email**: ✅ (centang)
4. Klik **Create user**
5. Copy **User ID** yang muncul
6. Jalankan SQL ini (ganti `[USER_ID]` dengan ID yang dicopy):

```sql
INSERT INTO users (id, email, full_name, role) VALUES 
('[USER_ID]', 'admin@ecommerce.com', 'Administrator', 'admin');
```

## 🎯 Data yang Akan Dibuat

### 📁 Kategori (8 kategori):
1. **Elektronik** - Produk elektronik dan gadget
2. **Fashion** - Pakaian dan aksesoris
3. **Rumah & Taman** - Furnitur dan dekorasi
4. **Olahraga** - Perlengkapan olahraga
5. **Kecantikan** - Produk kecantikan
6. **Buku** - Buku dan literatur
7. **Makanan & Minuman** - Makanan dan minuman
8. **Mainan & Hobi** - Mainan dan hobi

### 📦 Produk (21 produk):

#### Elektronik (10 produk):
- iPhone 15 Pro Max - Rp 19.999.000 (Featured)
- MacBook Air M2 - Rp 15.999.000 (Featured)
- Sony WH-1000XM5 - Rp 3.999.000
- Samsung Galaxy S24 Ultra - Rp 18.999.000 (Featured)
- Dell XPS 13 - Rp 17.999.000
- AirPods Pro 2 - Rp 2.999.000
- iPad Pro 12.9" - Rp 12.999.000 (Featured)
- Samsung 55" QLED TV - Rp 8.999.000
- Canon EOS R5 - Rp 45.999.000 (Featured)
- PlayStation 5 - Rp 7.999.000

#### Fashion (3 produk):
- Levi's 501 Original Jeans - Rp 899.000
- Zara Blazer Premium - Rp 1.299.000 (Featured)
- Nike Air Jordan 1 - Rp 2.299.000 (Featured)

#### Olahraga (4 produk):
- Nike Air Max 270 - Rp 1.999.000
- Adidas Ultraboost 22 - Rp 2.299.000
- Peloton Bike+ - Rp 24.999.000 (Featured)
- Lululemon Yoga Mat - Rp 899.000

#### Rumah & Taman (2 produk):
- IKEA Hemnes Bed Frame - Rp 2.999.000
- Dyson V15 Detect Vacuum - Rp 5.999.000 (Featured)

#### Kecantikan (1 produk):
- SK-II Facial Treatment Essence - Rp 2.999.000 (Featured)

#### Buku (1 produk):
- Atomic Habits - James Clear - Rp 199.000

## 🔐 Admin Access

### Login Credentials:
- **Email**: `admin@ecommerce.com`
- **Password**: `Admin123!`
- **Role**: `admin`

### URLs:
- **Home**: http://localhost:3000
- **Login**: http://localhost:3000/auth/login
- **Admin Dashboard**: http://localhost:3000/admin

## 🧪 Test Aplikasi

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Halaman
1. **Homepage**: http://localhost:3000
   - Harus menampilkan produk unggulan
   - Harus ada loading state
   - Harus ada fallback jika tidak ada data

2. **Products Page**: http://localhost:3000/products
   - Harus menampilkan semua produk
   - Harus ada filter dan search
   - Harus ada pagination

3. **Categories Page**: http://localhost:3000/categories
   - Harus menampilkan semua kategori
   - Harus menampilkan produk unggulan

4. **Admin Login**: http://localhost:3000/auth/login
   - Login dengan admin credentials
   - Harus redirect ke admin dashboard

5. **Admin Dashboard**: http://localhost:3000/admin
   - Harus menampilkan statistik
   - Harus bisa akses semua fitur admin

## 🔧 Troubleshooting

### Jika produk tidak muncul:
1. Cek console browser untuk error
2. Cek Supabase logs
3. Verifikasi RLS policies
4. Pastikan environment variables benar

### Jika admin tidak bisa login:
1. Cek user di Supabase Auth
2. Cek user record di database
3. Verifikasi role = 'admin'
4. Cek RLS policies

### Jika gambar tidak muncul:
1. Cek Next.js config untuk image domains
2. Cek URL gambar di browser
3. Pastikan Unsplash URL valid

## 📞 Support

Jika ada masalah:
1. Cek file `ADMIN-CREDENTIALS.md` untuk detail admin
2. Cek console browser untuk error JavaScript
3. Cek Supabase logs untuk error database
4. Pastikan semua environment variables sudah benar
