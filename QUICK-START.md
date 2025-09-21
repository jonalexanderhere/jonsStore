# 🚀 Quick Start - JonsStore E-Commerce

## ⚡ Langkah Cepat Setup

### 1. Install Git (Jika Belum Ada)
```bash
# Download dari: https://git-scm.com/download/win
# Atau via Chocolatey:
choco install git
```

### 2. Setup Supabase
1. Buat akun di https://supabase.com
2. Buat project baru
3. Buka SQL Editor
4. Copy-paste isi file `supabase-schema.sql`
5. Jalankan script

### 3. Setup Environment
```bash
# Copy file environment
copy env.local.example .env.local

# Edit .env.local dengan data Supabase Anda
```

### 4. Push ke GitHub
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/jonalexanderhere/jonsStore.git
git push -u origin main
```

### 5. Create Admin
```bash
# Jalankan script create admin
node scripts/create-admin.js

# Atau buat manual di Supabase Dashboard
```

### 6. Run Application
```bash
npm run dev
```

Buka: http://localhost:3000

## 🔑 Login Admin

- **Email:** admin@jonsstore.com
- **Password:** admin123456

## 📱 Features

### User Features:
- ✅ Homepage dengan hero section
- ✅ Product catalog dengan search & filter
- ✅ Product detail pages
- ✅ Shopping cart
- ✅ Checkout process
- ✅ User authentication
- ✅ Order history
- ✅ Responsive design

### Admin Features:
- ✅ Dashboard overview
- ✅ Product management
- ✅ Order management
- ✅ Customer management
- ✅ Analytics & reports

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Payment:** Stripe
- **State Management:** Zustand
- **UI Components:** Custom components

## 📁 Project Structure

```
jonsStore/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   └── checkout/          # Checkout process
├── components/            # Reusable components
├── lib/                   # Utility functions
├── scripts/               # Setup scripts
└── supabase-schema.sql    # Database schema
```

## 🚀 Deployment

### Vercel (Recommended):
1. Connect GitHub repository
2. Set environment variables
3. Deploy otomatis

### Manual:
1. Build: `npm run build`
2. Start: `npm start`

## 📞 Support

- **Repository:** https://github.com/jonalexanderhere/jonsStore
- **Documentation:** Lihat file README.md
- **Setup Guide:** Lihat file SETUP-COMPLETE.md

---

**JonsStore E-Commerce siap digunakan! 🎉**





