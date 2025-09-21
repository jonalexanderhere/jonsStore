# Admin Credentials & Setup

## 🔐 Admin Login Information

### Admin User Credentials:
- **Email**: `admin@ecommerce.com`
- **Password**: `Admin123!`
- **Role**: `admin`

### Login URLs:
- **Login Page**: http://localhost:3000/auth/login
- **Admin Dashboard**: http://localhost:3000/admin

## 📊 Database Products Summary

### Total Products: 21
- **Elektronik**: 10 produk
- **Fashion**: 3 produk  
- **Olahraga**: 4 produk
- **Rumah & Taman**: 2 produk
- **Kecantikan**: 1 produk
- **Buku**: 1 produk

### Featured Products: 8
1. iPhone 15 Pro Max
2. MacBook Air M2
3. Samsung Galaxy S24 Ultra
4. iPad Pro 12.9"
5. Canon EOS R5
6. Zara Blazer Premium
7. Nike Air Jordan 1
8. Peloton Bike+
9. Dyson V15 Detect Vacuum
10. SK-II Facial Treatment Essence

## 🛠️ Setup Instructions

### 1. Database Setup
1. Buka Supabase Dashboard
2. Pergi ke SQL Editor
3. Jalankan file `supabase-setup.sql`
4. Verifikasi tabel dan data sudah terisi

### 2. Create Admin User
1. Buka Supabase Dashboard
2. Pergi ke Authentication → Users
3. Klik "Add user"
4. Isi:
   - Email: `admin@ecommerce.com`
   - Password: `Admin123!`
   - Confirm email: ✅
5. Setelah user dibuat, copy User ID
6. Jalankan SQL ini (ganti [USER_ID] dengan ID yang dicopy):
```sql
INSERT INTO users (id, email, full_name, role) VALUES 
('[USER_ID]', 'admin@ecommerce.com', 'Administrator', 'admin');
```

### 3. Test Login
1. Buka http://localhost:3000/auth/login
2. Login dengan credentials di atas
3. Akses admin dashboard di http://localhost:3000/admin

## 🔧 Admin Features

### Dashboard Features:
- **Overview**: Statistik penjualan dan produk
- **Products**: Kelola produk (tambah, edit, hapus)
- **Orders**: Lihat dan kelola pesanan
- **Users**: Kelola pengguna
- **Categories**: Kelola kategori produk

### Product Management:
- Tambah produk baru
- Edit detail produk
- Upload gambar produk
- Kelola stok
- Set featured products

### Order Management:
- Lihat semua pesanan
- Update status pesanan
- Lihat detail pesanan
- Kelola pengiriman

## 🚨 Security Notes

- Ganti password admin setelah setup pertama
- Jangan share credentials ini di production
- Gunakan environment variables untuk production
- Aktifkan 2FA jika memungkinkan

## 📞 Support

Jika ada masalah dengan admin access:
1. Cek Supabase Auth logs
2. Verifikasi user role di database
3. Pastikan RLS policies sudah benar
4. Cek console browser untuk error
