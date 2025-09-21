# Vercel Environment Variables Setup

## Required Environment Variables for Vercel Deployment

Add these environment variables in your Vercel dashboard:

### 1. Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Stripe Configuration (Optional)
```
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### 3. Next.js Configuration
```
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret
```

## How to Get Supabase Keys:

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## How to Add Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add each variable with the appropriate value
5. Make sure to set them for Production, Preview, and Development environments

## Database Setup:

1. Run the SQL script in Supabase SQL Editor:
   - File: `supabase-vercel-setup.sql`
   - Or run: `npm run setup:vercel`

2. This will create:
   - All necessary tables
   - Sample data (categories, products)
   - Admin user
   - RLS policies
   - Indexes for performance

## Admin Access:

After setup, you can login with:
- **Email**: admin@jonsstore.com
- **Password**: admin123456
- **URL**: https://your-app.vercel.app/auth/login

## Testing:

1. Deploy to Vercel
2. Test admin login
3. Check product pages
4. Verify database connection
5. Test all features

## Troubleshooting:

- If you get database connection errors, check your Supabase keys
- If admin login fails, run the database setup script again
- If products don't show, check the database has sample data
- If build fails, check all environment variables are set
