# JonsStore - Modern E-commerce Platform

## 🚀 Overview

JonsStore adalah platform e-commerce modern yang dibangun dengan Next.js 14, TypeScript, Supabase, dan Tailwind CSS. Platform ini menawarkan pengalaman berbelanja yang cepat, aman, dan user-friendly dengan fitur-fitur lengkap untuk toko online.

## ✨ Features

### 🛍️ E-commerce Core Features
- **Produk Management**: Kelola produk dengan kategori, gambar, dan detail lengkap
- **Shopping Cart**: Keranjang belanja dengan real-time updates
- **Order Management**: Sistem pesanan lengkap dengan status tracking
- **User Authentication**: Login/register dengan Supabase Auth
- **Payment Integration**: Siap untuk integrasi Stripe
- **Admin Dashboard**: Panel admin untuk mengelola toko

### 🎨 UI/UX Features
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean dan professional design
- **Dark/Light Mode**: Tema yang dapat disesuaikan
- **Animations**: Smooth transitions dan micro-interactions
- **Loading States**: Skeleton loading dan spinners
- **Toast Notifications**: Real-time feedback

### 🔧 Technical Features
- **TypeScript**: Type-safe development
- **Server Components**: Next.js 14 App Router
- **Database**: Supabase PostgreSQL dengan RLS
- **Real-time**: Live updates dengan Supabase
- **SEO Optimized**: Meta tags dan structured data
- **Performance**: Optimized images dan lazy loading

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework dengan App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Hook Form** - Form management
- **Zustand** - State management

### Backend
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Database dengan RLS
- **Supabase Auth** - Authentication
- **Row Level Security** - Database security

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

## 📁 Project Structure

```
jonsstore/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   │   ├── login/         # Login page
│   │   └── register/      # Register page
│   ├── admin/             # Admin dashboard
│   ├── cart/              # Shopping cart
│   ├── categories/        # Product categories
│   ├── checkout/          # Checkout process
│   ├── orders/            # Order management
│   ├── products/          # Product listings
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── auth/              # Auth components
│   ├── layout/            # Layout components
│   ├── product/           # Product components
│   └── ui/                # UI components
├── lib/                   # Utility libraries
│   ├── supabase.ts        # Supabase client
│   ├── auth.ts            # Auth utilities
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Helper functions
├── public/                # Static assets
└── scripts/               # Database scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Supabase account

### Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd jonsstore
```

2. **Install dependencies**
```bash
npm install
# atau
yarn install
```

3. **Setup environment variables**
```bash
cp env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. **Setup database**
```bash
# Jalankan script SQL di Supabase Dashboard
# File: supabase-complete-setup-final.sql
```

5. **Run development server**
```bash
npm run dev
# atau
yarn dev
```

6. **Open browser**
```
http://localhost:3000
```

## 🗄️ Database Setup

### 1. Create Supabase Project
- Buat project baru di [Supabase](https://supabase.com)
- Copy URL dan API keys ke environment variables

### 2. Run SQL Script
```sql
-- Jalankan file: supabase-complete-setup-final.sql
-- Script ini akan membuat:
-- - Semua tabel yang diperlukan
-- - Row Level Security policies
-- - Sample data untuk testing
-- - Indexes untuk performance
-- - Triggers dan functions
```

### 3. Enable Authentication
- Aktifkan Email authentication di Supabase
- Setup OAuth providers (Google, Facebook) jika diperlukan
- Configure email templates

## 👥 User Roles

### Customer
- Browse dan search produk
- Add to cart dan wishlist
- Place orders
- Manage profile
- View order history

### Admin
- Manage products dan categories
- View orders dan customers
- Update order status
- Manage coupons
- View analytics

## 🔐 Security Features

- **Row Level Security (RLS)**: Database-level security
- **Authentication**: Supabase Auth dengan JWT
- **Authorization**: Role-based access control
- **Input Validation**: Form validation dengan React Hook Form
- **XSS Protection**: Sanitized inputs
- **CSRF Protection**: Built-in Next.js protection

## 📱 Responsive Design

- **Mobile First**: Optimized untuk mobile devices
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Touch Friendly**: Large tap targets
- **Performance**: Optimized images dan lazy loading

## 🎨 Design System

### Colors
- Primary: Blue (#3b82f6)
- Secondary: Gray (#6b7280)
- Success: Green (#10b981)
- Warning: Yellow (#f59e0b)
- Error: Red (#ef4444)

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold weights
- Body: Regular weights
- Sizes: Responsive scaling

### Components
- **Cards**: Rounded corners dengan shadows
- **Buttons**: Multiple variants dan sizes
- **Forms**: Consistent styling
- **Navigation**: Clean dan accessible

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables di Vercel dashboard
```

### Other Platforms
- **Netlify**: Compatible dengan Next.js
- **Railway**: Easy deployment
- **DigitalOcean**: App Platform

## 📊 Performance

### Optimizations
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic dengan App Router
- **Lazy Loading**: Components dan images
- **Caching**: Supabase caching
- **CDN**: Vercel Edge Network

### Metrics
- **Lighthouse Score**: 90+ untuk semua metrics
- **Core Web Vitals**: Excellent ratings
- **Bundle Size**: Optimized dengan tree shaking

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

### Code Style
- **ESLint**: Airbnb config
- **Prettier**: Consistent formatting
- **TypeScript**: Strict mode
- **Conventional Commits**: Git commit messages

## 📝 API Documentation

### Supabase Tables
- `users` - User profiles
- `categories` - Product categories
- `products` - Product catalog
- `cart_items` - Shopping cart
- `orders` - Customer orders
- `order_items` - Order line items
- `addresses` - User addresses
- `payments` - Payment records
- `reviews` - Product reviews
- `wishlist` - User wishlists
- `coupons` - Discount coupons

### Key Functions
- `calculate_cart_total(user_id)` - Calculate cart total
- `get_product_recommendations(product_id)` - Get related products

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

### Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Documentation**: README files
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: support@jonsstore.com

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic e-commerce functionality
- ✅ User authentication
- ✅ Admin dashboard
- ✅ Responsive design

### Phase 2 (Next)
- 🔄 Payment integration (Stripe)
- 🔄 Email notifications
- 🔄 Product reviews
- 🔄 Advanced search

### Phase 3 (Future)
- 📋 Mobile app (React Native)
- 📋 Multi-vendor support
- 📋 Advanced analytics
- 📋 AI recommendations

---

**Made with ❤️ by JonsStore Team**
