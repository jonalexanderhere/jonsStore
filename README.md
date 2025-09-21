# 🛒 JonsStore - Modern E-Commerce Platform

A full-featured, real-time e-commerce application built with Next.js 14, Supabase, and TypeScript. Features include real-time updates, admin dashboard, OAuth authentication, and modern UI components.

## ✨ Features

### 🚀 Core Features
- **Real-time Updates** - Live product updates, cart synchronization, and notifications
- **Admin Dashboard** - Complete admin panel with analytics and management tools
- **OAuth Authentication** - Google OAuth integration with Supabase Auth
- **Shopping Cart** - Persistent cart with real-time synchronization
- **Order Management** - Complete order processing and tracking
- **Product Catalog** - Advanced product browsing and filtering
- **Responsive Design** - Mobile-first, modern UI with Tailwind CSS

### 🔧 Technical Features
- **Next.js 14** - App Router, Server Components, and API Routes
- **Supabase** - Database, Authentication, and Real-time subscriptions
- **TypeScript** - Full type safety and better developer experience
- **Zustand** - State management for cart and user data
- **React Hook Form** - Form handling and validation
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Cloud Console account (for OAuth)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd jonsstore
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # OAuth Configuration
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   npm run setup:realtime
   ```

5. **Create admin user**
   ```bash
   npm run create:admin
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
jonsstore/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── orders/            # Order management
│   ├── products/          # Product catalog
│   └── ...
├── components/            # Reusable UI components
│   ├── auth/              # Authentication components
│   ├── layout/            # Layout components
│   ├── product/           # Product components
│   └── ui/                # Base UI components
├── lib/                   # Utility functions and configurations
│   ├── supabase.ts        # Supabase client and real-time functions
│   ├── store.ts           # Zustand store
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility functions
├── scripts/               # Setup and utility scripts
│   ├── setup/             # Database and admin setup
│   └── testing/           # Test scripts
├── database/              # SQL database schemas
└── docs/                  # Documentation
```

## 🛠️ Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Setup & Configuration
```bash
npm run setup:realtime    # Set up real-time database
npm run setup:oauth       # Set up OAuth configuration
npm run create:admin      # Create admin user
npm run cleanup:push      # Clean up and push to GitHub
```

### Testing
```bash
npm run test:all          # Test all features
npm run test:admin        # Test admin functionality
```

## 🔐 Admin Access

**Admin Login:**
- Email: `admin@jonsstore.com`
- Password: `admin123456`

**Admin Features:**
- Product management (CRUD operations)
- Order management and tracking
- User management
- Analytics dashboard
- Real-time notifications
- System monitoring

## 🌐 OAuth Setup

### Google OAuth Configuration

1. **Google Cloud Console**
   - Create a new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add redirect URIs:
     - `http://localhost:3000/auth/callback` (development)
     - `https://yourdomain.com/auth/callback` (production)

2. **Supabase Dashboard**
   - Go to Authentication → Providers
   - Enable Google provider
   - Add your Google Client ID and Secret
   - Set redirect URL: `https://your-project-ref.supabase.co/auth/v1/callback`

3. **Environment Variables**
   ```env
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

For detailed instructions, see [OAuth Setup Guide](docs/OAUTH-SETUP-GUIDE.md).

## 🗄️ Database Schema

The application uses Supabase PostgreSQL with the following main tables:

- **users** - User profiles and authentication
- **products** - Product catalog
- **categories** - Product categories
- **cart_items** - Shopping cart items
- **orders** - Order information
- **order_items** - Order line items
- **notifications** - Real-time notifications

For complete schema, see [Database Schema](database/supabase-production-realtime.sql).

## 🔄 Real-time Features

### Product Updates
- Live product catalog updates
- Real-time inventory changes
- Featured product rotation

### Cart Synchronization
- Multi-device cart sync
- Real-time quantity updates
- Automatic cart cleanup

### Admin Dashboard
- Live order notifications
- Real-time analytics
- System status monitoring

### Notifications
- Order status updates
- System alerts
- User notifications

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Other Platforms

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set up environment variables**
3. **Deploy the `.next` folder**

## 📚 Documentation

- [Project Organization](docs/PROJECT-ORGANIZATION.md)
- [Real-time Implementation](docs/REALTIME-IMPLEMENTATION.md)
- [OAuth Setup Guide](docs/OAUTH-SETUP-GUIDE.md)
- [Quick Reference](docs/QUICK-REFERENCE.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [documentation](docs/)
2. Review the [troubleshooting guide](docs/OAUTH-SETUP-GUIDE.md#troubleshooting)
3. Create an issue on GitHub

## 🎯 Roadmap

- [ ] Payment integration (Stripe)
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Mobile app
- [ ] Advanced search and filtering
- [ ] Recommendation engine

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Icon library
- [Zustand](https://zustand-demo.pmnd.rs/) - State management

---

**Built with ❤️ by JonsStore Team**