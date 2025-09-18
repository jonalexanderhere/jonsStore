# Deployment Guide - Modern E-Commerce Website

Panduan lengkap untuk deployment website e-commerce ke berbagai platform.

## 🚀 Platform Deployment

### 1. Vercel (Recommended)

#### Setup Vercel
1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login ke Vercel:
```bash
vercel login
```

3. Deploy project:
```bash
vercel
```

4. Setup Environment Variables di Vercel Dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL`

#### Auto Deployment
1. Connect GitHub repository ke Vercel
2. Setup automatic deployment pada setiap push ke main branch
3. Configure custom domain (opsional)

### 2. Netlify

#### Setup Netlify
1. Build project:
```bash
npm run build
```

2. Deploy folder `.next` ke Netlify
3. Setup environment variables di Netlify dashboard
4. Configure redirects untuk SPA routing

#### Netlify Configuration
Buat file `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. Railway

#### Setup Railway
1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login dan deploy:
```bash
railway login
railway init
railway up
```

3. Setup environment variables di Railway dashboard

### 4. DigitalOcean App Platform

#### Setup DigitalOcean
1. Connect GitHub repository
2. Select Node.js buildpack
3. Configure build command: `npm run build`
4. Configure start command: `npm start`
5. Setup environment variables

### 5. AWS Amplify

#### Setup AWS Amplify
1. Connect GitHub repository
2. Configure build settings:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

## 🗄️ Database Setup

### Supabase Production Setup

#### 1. Create Production Project
1. Buat project baru di Supabase
2. Pilih region terdekat dengan server
3. Setup backup dan monitoring

#### 2. Database Migration
1. Export schema dari development:
```sql
pg_dump -h localhost -U postgres -d your_db > schema.sql
```

2. Import ke production:
```sql
psql -h production-host -U postgres -d production_db < schema.sql
```

#### 3. Environment Variables
Update production environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-key
```

## 💳 Payment Setup

### Stripe Production Setup

#### 1. Activate Stripe Account
1. Complete Stripe account verification
2. Enable live mode
3. Get live API keys

#### 2. Webhook Configuration
1. Setup webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
2. Configure events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `checkout.session.completed`

#### 3. Test Payment Flow
1. Use Stripe test cards untuk testing
2. Verify webhook events
3. Test error handling

## 🔐 Security Configuration

### 1. Environment Variables
- Jangan commit sensitive data ke Git
- Gunakan secret management service
- Rotate keys secara berkala

### 2. HTTPS Configuration
- Setup SSL certificate
- Redirect HTTP ke HTTPS
- Configure HSTS headers

### 3. Database Security
- Enable Row Level Security (RLS)
- Setup proper user permissions
- Regular security audits

### 4. API Security
- Rate limiting
- Input validation
- CORS configuration

## 📊 Monitoring & Analytics

### 1. Application Monitoring
- Setup Sentry untuk error tracking
- Monitor performance metrics
- Setup uptime monitoring

### 2. Database Monitoring
- Monitor query performance
- Setup backup alerts
- Track usage metrics

### 3. Business Analytics
- Google Analytics 4
- E-commerce tracking
- Conversion funnel analysis

## 🚀 Performance Optimization

### 1. Next.js Optimization
- Enable compression
- Optimize images
- Setup CDN

### 2. Database Optimization
- Add proper indexes
- Optimize queries
- Setup connection pooling

### 3. Caching Strategy
- Redis untuk session storage
- CDN untuk static assets
- Database query caching

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### GitLab CI
```yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - .next/

deploy:
  stage: deploy
  script:
    - npm run deploy
  only:
    - main
```

## 📱 Mobile Optimization

### 1. PWA Setup
- Add manifest.json
- Setup service worker
- Configure offline support

### 2. Mobile Performance
- Optimize images untuk mobile
- Minimize bundle size
- Lazy loading

### 3. App Store Deployment
- React Native wrapper
- Capacitor integration
- App store optimization

## 🌍 Internationalization

### 1. Multi-language Support
- Setup i18n library
- Translate content
- Configure routing

### 2. Currency Support
- Multi-currency pricing
- Local payment methods
- Tax calculation

### 3. Localization
- Date/time formatting
- Number formatting
- Address formats

## 📈 Scaling Strategy

### 1. Horizontal Scaling
- Load balancer setup
- Multiple server instances
- Database replication

### 2. Vertical Scaling
- Upgrade server resources
- Optimize database
- Cache optimization

### 3. Microservices
- Split monolith
- Service communication
- Independent deployment

## 🔧 Maintenance

### 1. Regular Updates
- Dependencies updates
- Security patches
- Feature updates

### 2. Backup Strategy
- Database backups
- File system backups
- Disaster recovery plan

### 3. Monitoring
- Health checks
- Alert configuration
- Performance monitoring

## 🆘 Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Clear cache
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

#### 2. Database Connection Issues
- Check environment variables
- Verify network connectivity
- Check database status

#### 3. Payment Issues
- Verify Stripe keys
- Check webhook configuration
- Review error logs

### Getting Help
- Check platform documentation
- Review error logs
- Contact support team

---

**Website e-commerce Anda siap untuk production! 🎉**




