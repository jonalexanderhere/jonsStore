# Quick Reference Guide

## 🚀 Quick Commands

### Start Development
```bash
npm run dev
```

### Database Setup
```bash
npm run setup:complete
```

### Create Admin User
```bash
npm run create:admin
```

### Run Tests
```bash
npm run test:all
```

## 📁 Key Files

### Main Database Schema
- `database/supabase-complete-setup-final.sql` ⭐ **RECOMMENDED**

### Environment Setup
- `env.example` → Copy to `.env.local`

### Main Documentation
- `README.md` - Project overview
- `docs/QUICK-START.md` - Quick start guide
- `docs/SETUP.md` - Detailed setup

## 🗂️ Directory Quick Access

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| `app/` | Next.js pages | `page.tsx`, `layout.tsx` |
| `components/` | React components | `ui/`, `auth/`, `product/` |
| `database/` | SQL files | `supabase-complete-setup-final.sql` |
| `docs/` | Documentation | `README.md`, `QUICK-START.md` |
| `lib/` | Utilities | `supabase.ts`, `auth.ts` |
| `scripts/setup/` | Setup scripts | `setup-complete-database.js` |
| `scripts/testing/` | Test scripts | `test-all-features.js` |

## 🔧 Common Tasks

### 1. First Time Setup
```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp env.example .env.local

# 3. Edit .env.local with your credentials

# 4. Setup database
npm run setup:complete

# 5. Start development
npm run dev
```

### 2. Add Sample Data
```bash
node scripts/setup/add-more-products.js
```

### 3. Test Admin Login
```bash
npm run test:admin
```

### 4. Run All Tests
```bash
npm run test:all
```

## 📋 Environment Variables

Required in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
```

## 🎯 Script Categories

### Setup Scripts (`scripts/setup/`)
- Database setup and configuration
- Admin user creation
- Sample data insertion
- Git setup utilities

### Testing Scripts (`scripts/testing/`)
- Feature testing
- Admin functionality testing
- Database testing
- Advanced testing scenarios

## 🚨 Troubleshooting

### Database Issues
1. Check `database/supabase-complete-setup-final.sql`
2. Verify RLS policies with `database/fix-rls-policies.sql`
3. Run `npm run test:all` to test

### Environment Issues
1. Verify `.env.local` exists
2. Check all required variables are set
3. Restart development server

### Script Issues
1. Check script is in correct directory
2. Verify Node.js version compatibility
3. Check script dependencies

## 📞 Support

- **Documentation**: Check `docs/` folder
- **Issues**: Create GitHub issue
- **Quick Help**: See `docs/QUICK-START.md`
