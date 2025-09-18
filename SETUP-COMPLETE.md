# 🚀 Setup Lengkap JonsStore E-Commerce

## ✅ Yang Sudah Selesai

1. **Project Structure** - ✅ Selesai
2. **Dependencies** - ✅ Terinstall
3. **GitHub Repository** - ✅ Siap (perlu Git)
4. **Database Schema** - ✅ Siap
5. **Admin Script** - ✅ Siap

## 🔧 Yang Perlu Dilakukan

### 1. Install Git (Jika Belum Ada)

**Download Git:**
- Kunjungi: https://git-scm.com/download/win
- Download dan install Git for Windows
- Restart terminal setelah install

**Atau install via Chocolatey:**
```powershell
# Install Chocolatey (jika belum ada)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Git
choco install git
```

### 2. Setup Supabase

1. **Buat Akun Supabase:**
   - Kunjungi: https://supabase.com
   - Daftar akun baru
   - Buat project baru

2. **Setup Database:**
   - Buka SQL Editor di Supabase
   - Copy seluruh isi file `supabase-schema.sql`
   - Paste dan jalankan script

3. **Get API Keys:**
   - Buka Settings > API
   - Copy Project URL dan anon key

### 3. Setup Environment Variables

1. **Copy file environment:**
```bash
copy env.local.example .env.local
```

2. **Edit .env.local dengan data Supabase:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Push ke GitHub

Setelah Git terinstall, jalankan:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/jonalexanderhere/jonsStore.git
git push -u origin main
```

### 5. Create Admin Account

1. **Via Script (Recommended):**
```bash
node scripts/create-admin.js
```

2. **Via Supabase Dashboard:**
   - Buka Authentication > Users
   - Add user: admin@jonsstore.com
   - Password: admin123456
   - Confirm email: true

3. **Via SQL:**
```sql
-- Insert admin user
INSERT INTO auth.users (
  id, email, encrypted_password, email_confirmed_at, created_at, updated_at,
  raw_user_meta_data, raw_app_meta_data
) VALUES (
  gen_random_uuid(),
  'admin@jonsstore.com',
  crypt('admin123456', gen_salt('bf')),
  NOW(), NOW(), NOW(),
  '{"full_name": "Admin JonsStore", "role": "admin"}',
  '{"provider": "email", "providers": ["email"]}'
);

-- Insert user profile
INSERT INTO public.users (
  id, email, full_name, role, phone
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@jonsstore.com'),
  'admin@jonsstore.com',
  'Admin JonsStore',
  'admin',
  '+6281234567890'
);
```

### 6. Run Application

```bash
npm run dev
```

Buka: http://localhost:3000

## 🎯 Login Admin

**Akun Admin:**
- Email: `admin@jonsstore.com`
- Password: `admin123456`

**Fitur Admin:**
- Dashboard overview
- Product management
- Order management
- Customer management
- Analytics

## 📱 Features Website

### Untuk User:
- ✅ Homepage dengan hero section
- ✅ Product catalog dengan filter
- ✅ Product detail pages
- ✅ Shopping cart
- ✅ Checkout process
- ✅ User authentication
- ✅ Order history
- ✅ Responsive design

### Untuk Admin:
- ✅ Admin dashboard
- ✅ Product management
- ✅ Order management
- ✅ Customer management
- ✅ Analytics & reports

## 🛠️ Troubleshooting

### Error: "Git not found"
- Install Git dari https://git-scm.com/download/win
- Restart terminal setelah install

### Error: "Supabase connection failed"
- Cek environment variables
- Pastikan database schema sudah dijalankan
- Verifikasi project Supabase aktif

### Error: "Admin user not found"
- Jalankan script create-admin.js
- Atau buat manual via Supabase dashboard

### Error: "Build failed"
- Cek dependencies: `npm install`
- Cek TypeScript errors
- Cek environment variables

## 🚀 Deployment

### Vercel (Recommended):
1. Connect GitHub repository
2. Set environment variables
3. Deploy otomatis

### Manual:
1. Build: `npm run build`
2. Start: `npm start`
3. Setup reverse proxy

## 📞 Support

Jika mengalami masalah:
1. Cek console browser
2. Cek terminal untuk error
3. Verifikasi setup steps
4. Cek dokumentasi

---

**JonsStore E-Commerce siap digunakan! 🎉**

**Repository:** https://github.com/jonalexanderhere/jonsStore
**Live Demo:** Akan tersedia setelah deployment



