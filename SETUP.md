# Setup Guide - Modern E-Commerce Website

Panduan lengkap untuk setup dan deployment website e-commerce modern.

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone <repository-url>
cd modern-ecommerce
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp env.example .env.local
```

Edit `.env.local` dengan konfigurasi Anda:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup (Supabase)

### 1. Buat Project Supabase
1. Kunjungi [supabase.com](https://supabase.com)
2. Klik "Start your project"
3. Login dengan GitHub
4. Buat project baru
5. Pilih region terdekat (Singapore untuk Indonesia)

### 2. Setup Database Schema
1. Buka SQL Editor di dashboard Supabase
2. Copy dan paste seluruh isi file `supabase-schema.sql`
3. Klik "Run" untuk menjalankan script
4. Verifikasi tabel telah dibuat di bagian "Table Editor"

### 3. Setup Authentication
1. Buka "Authentication" > "Settings"
2. Enable "Email" provider
3. (Opsional) Setup Google/Facebook provider
4. Configure email templates

### 4. Get API Keys
1. Buka "Settings" > "API"
2. Copy "Project URL" dan "anon public" key
3. Masukkan ke file `.env.local`

## 💳 Payment Setup (Stripe)

### 1. Buat Akun Stripe
1. Kunjungi [stripe.com](https://stripe.com)
2. Daftar akun baru
3. Verifikasi email dan identitas

### 2. Get API Keys
1. Buka Dashboard Stripe
2. Klik "Developers" > "API keys"
3. Copy "Publishable key" dan "Secret key"
4. Masukkan ke file `.env.local`

### 3. Setup Webhooks (Opsional)
1. Klik "Webhooks" > "Add endpoint"
2. URL: `https://yourdomain.com/api/webhooks/stripe`
3. Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy "Signing secret" ke `.env.local`

## 🚀 Deployment (Vercel)

### 1. Push ke GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy ke Vercel
1. Kunjungi [vercel.com](https://vercel.com)
2. Login dengan GitHub
3. Klik "New Project"
4. Import repository
5. Set environment variables
6. Deploy

### 3. Environment Variables di Vercel
Tambahkan semua variabel dari `.env.local` ke Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL`

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Project Structure
```
modern-ecommerce/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   └── orders/            # Order management
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── layout/           # Layout components
│   └── product/          # Product components
├── lib/                  # Utility functions
│   ├── supabase.ts       # Supabase client
│   ├── stripe.ts         # Stripe configuration
│   ├── store.ts          # State management
│   └── types.ts          # TypeScript types
└── supabase-schema.sql   # Database schema
```

## 🛠️ Customization

### 1. Branding
- Edit `app/layout.tsx` untuk title dan meta
- Update logo di `components/layout/header.tsx`
- Customize colors di `tailwind.config.js`

### 2. Features
- Enable/disable features di `lib/config.ts`
- Add new product categories
- Customize payment methods

### 3. Styling
- Modify `app/globals.css` untuk global styles
- Update component styles di `components/`
- Customize Tailwind theme

## 🔐 Security

### 1. Environment Variables
- Jangan commit `.env.local` ke Git
- Gunakan environment variables di production
- Rotate API keys secara berkala

### 2. Database Security
- Row Level Security (RLS) sudah diaktifkan
- Jangan expose service role key di client
- Setup proper user permissions

### 3. Payment Security
- Gunakan HTTPS di production
- Validate webhook signatures
- Implement proper error handling

## 📊 Monitoring

### 1. Analytics
- Setup Google Analytics
- Monitor user behavior
- Track conversion rates

### 2. Error Tracking
- Setup Sentry untuk error tracking
- Monitor API errors
- Log important events

### 3. Performance
- Monitor Core Web Vitals
- Optimize images dan assets
- Use CDN untuk static files

## 🆘 Troubleshooting

### Common Issues

#### 1. Supabase Connection Error
```bash
# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY

# Verify Supabase project is active
# Check network connectivity
```

#### 2. Stripe Payment Error
```bash
# Check Stripe keys
echo $NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
echo $STRIPE_SECRET_KEY

# Verify webhook endpoint
# Check Stripe dashboard for errors
```

#### 3. Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run lint
```

### Getting Help
- Check [Next.js Documentation](https://nextjs.org/docs)
- Check [Supabase Documentation](https://supabase.com/docs)
- Check [Stripe Documentation](https://stripe.com/docs)
- Create issue di GitHub repository

## 📈 Next Steps

### 1. Production Checklist
- [ ] Setup custom domain
- [ ] Configure SSL certificate
- [ ] Setup monitoring dan logging
- [ ] Implement backup strategy
- [ ] Setup CI/CD pipeline

### 2. Feature Enhancements
- [ ] Add product reviews
- [ ] Implement wishlist
- [ ] Add product comparison
- [ ] Setup email notifications
- [ ] Add multi-language support

### 3. Performance Optimization
- [ ] Implement image optimization
- [ ] Setup caching strategy
- [ ] Optimize database queries
- [ ] Add CDN integration
- [ ] Implement lazy loading

---

**Selamat! Website e-commerce Anda siap digunakan! 🎉**

