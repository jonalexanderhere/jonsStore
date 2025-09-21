# Modern E-commerce Platform

A full-stack e-commerce application built with Next.js 14, Supabase, and Stripe. This project provides a complete online shopping experience with modern UI/UX, secure authentication, and payment processing.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local
# Edit .env.local with your Supabase and Stripe credentials

# Set up the database
npm run setup:complete

# Start development server
npm run dev
```

## 📁 Project Structure

```
├── app/                    # Next.js 14 App Router pages
│   ├── about/             # About page
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   ├── cart/              # Shopping cart
│   ├── categories/        # Product categories
│   ├── checkout/          # Checkout process
│   ├── orders/            # Order management
│   ├── products/          # Product pages
│   └── privacy/           # Privacy policy
├── components/            # Reusable React components
│   ├── auth/              # Authentication components
│   ├── layout/            # Layout components
│   ├── product/           # Product-related components
│   └── ui/                # UI components
├── database/              # Database setup files
│   ├── supabase-complete-setup-final.sql  # Main database schema
│   ├── supabase-production-ready.sql      # Production setup
│   └── fix-rls-policies.sql              # RLS policy fixes
├── docs/                  # Documentation
│   ├── README.md          # Main documentation
│   ├── QUICK-START.md     # Quick start guide
│   ├── SETUP.md           # Setup instructions
│   ├── FEATURES.md        # Feature list
│   └── DEPLOYMENT.md      # Deployment guide
├── lib/                   # Utility libraries
│   ├── auth.ts            # Authentication utilities
│   ├── supabase.ts        # Supabase client
│   ├── stripe.ts          # Stripe configuration
│   ├── store.ts           # Zustand store
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # General utilities
├── public/                # Static assets
│   └── images/            # Image assets
└── scripts/               # Automation scripts
    ├── setup/             # Database setup scripts
    ├── testing/           # Testing scripts
    └── open-supabase-dashboard.js
```

## 🛠️ Features

- **Modern UI/UX**: Built with Tailwind CSS and Framer Motion
- **Authentication**: Secure user authentication with Supabase Auth
- **Product Management**: Full CRUD operations for products and categories
- **Shopping Cart**: Persistent cart with real-time updates
- **Order Management**: Complete order processing workflow
- **Payment Processing**: Stripe integration for secure payments
- **Admin Dashboard**: Comprehensive admin panel
- **Responsive Design**: Mobile-first responsive design
- **TypeScript**: Full type safety throughout the application

## 🗄️ Database

The application uses Supabase (PostgreSQL) with the following main tables:

- **users**: User accounts and profiles
- **categories**: Product categories
- **products**: Product catalog
- **cart_items**: Shopping cart items
- **orders**: Order management
- **order_items**: Order line items
- **payments**: Payment records
- **reviews**: Product reviews
- **wishlist**: User wishlists
- **coupons**: Discount coupons

## 🚀 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Setup
```bash
npm run setup:complete    # Complete database setup
npm run setup:vercel     # Vercel-specific setup
npm run setup:production # Production database setup
```

### Testing
```bash
npm run test:admin   # Test admin functionality
npm run test:all     # Run all tests
npm run test:advanced # Advanced testing
```

### Admin Management
```bash
npm run create:admin # Create admin user
```

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📚 Documentation

- [Quick Start Guide](docs/QUICK-START.md)
- [Setup Instructions](docs/SETUP.md)
- [Features Overview](docs/FEATURES.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing Guidelines](docs/CONTRIBUTING.md)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
See [Deployment Guide](docs/DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

See [Contributing Guidelines](docs/CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [documentation](docs/)
2. Search existing [issues](https://github.com/your-repo/issues)
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Stripe](https://stripe.com/) - Payment processing
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
