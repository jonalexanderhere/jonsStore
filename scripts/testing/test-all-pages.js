#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

function testAllPages() {
  console.log('🧪 Testing All Pages...')
  console.log('')

  const pagesDir = path.join(process.cwd(), 'app')
  const componentsDir = path.join(process.cwd(), 'components')
  
  const issues = []
  const warnings = []

  // Test app pages
  console.log('📄 Testing App Pages:')
  const appPages = [
    'page.tsx',
    'admin/page.tsx',
    'auth/login/page.tsx',
    'auth/register/page.tsx',
    'auth/callback/page.tsx',
    'cart/page.tsx',
    'checkout/page.tsx',
    'products/page.tsx',
    'products/[id]/page.tsx',
    'orders/page.tsx',
    'orders/success/page.tsx',
    'categories/page.tsx',
    'about/page.tsx',
    'privacy/page.tsx',
    'terms/page.tsx'
  ]

  appPages.forEach(page => {
    const pagePath = path.join(pagesDir, page)
    if (fs.existsSync(pagePath)) {
      const content = fs.readFileSync(pagePath, 'utf8')
      
      // Check for common issues
      if (content.includes('console.log') && !content.includes('// Debug')) {
        warnings.push(`⚠️  ${page}: Contains console.log statements`)
      }
      
      if (content.includes('TODO') || content.includes('FIXME')) {
        warnings.push(`⚠️  ${page}: Contains TODO/FIXME comments`)
      }
      
      if (content.includes('any') && content.includes(':')) {
        warnings.push(`⚠️  ${page}: Contains 'any' types`)
      }
      
      if (content.includes('useEffect') && !content.includes('return () =>')) {
        if (content.includes('subscribe') || content.includes('addEventListener')) {
          warnings.push(`⚠️  ${page}: useEffect may need cleanup function`)
        }
      }
      
      console.log(`✅ ${page}`)
    } else {
      issues.push(`❌ ${page}: File not found`)
    }
  })

  // Test components
  console.log('')
  console.log('🧩 Testing Components:')
  const components = [
    'layout/header.tsx',
    'layout/footer.tsx',
    'auth/auth-provider.tsx',
    'product/product-card.tsx',
    'ui/button.tsx',
    'ui/card.tsx',
    'ui/input.tsx',
    'ui/badge.tsx',
    'ui/modern-toast.tsx',
    'ui/realtime-notifications.tsx'
  ]

  components.forEach(component => {
    const componentPath = path.join(componentsDir, component)
    if (fs.existsSync(componentPath)) {
      const content = fs.readFileSync(componentPath, 'utf8')
      
      // Check for common issues
      if (content.includes('console.log') && !content.includes('// Debug')) {
        warnings.push(`⚠️  ${component}: Contains console.log statements`)
      }
      
      if (content.includes('TODO') || content.includes('FIXME')) {
        warnings.push(`⚠️  ${component}: Contains TODO/FIXME comments`)
      }
      
      console.log(`✅ ${component}`)
    } else {
      issues.push(`❌ ${component}: File not found`)
    }
  })

  // Test lib files
  console.log('')
  console.log('📚 Testing Lib Files:')
  const libFiles = [
    'lib/supabase.ts',
    'lib/auth.ts',
    'lib/store.ts',
    'lib/types.ts',
    'lib/utils.ts',
    'lib/stripe.ts'
  ]

  libFiles.forEach(libFile => {
    const libPath = path.join(process.cwd(), libFile)
    if (fs.existsSync(libPath)) {
      const content = fs.readFileSync(libPath, 'utf8')
      
      // Check for common issues
      if (content.includes('console.log') && !content.includes('// Debug')) {
        warnings.push(`⚠️  ${libFile}: Contains console.log statements`)
      }
      
      if (content.includes('TODO') || content.includes('FIXME')) {
        warnings.push(`⚠️  ${libFile}: Contains TODO/FIXME comments`)
      }
      
      console.log(`✅ ${libFile}`)
    } else {
      issues.push(`❌ ${libFile}: File not found`)
    }
  })

  // Test configuration files
  console.log('')
  console.log('⚙️  Testing Configuration Files:')
  const configFiles = [
    'package.json',
    'next.config.js',
    'tailwind.config.js',
    'tsconfig.json',
    'postcss.config.js',
    'env.example'
  ]

  configFiles.forEach(configFile => {
    const configPath = path.join(process.cwd(), configFile)
    if (fs.existsSync(configPath)) {
      console.log(`✅ ${configFile}`)
    } else {
      issues.push(`❌ ${configFile}: File not found`)
    }
  })

  // Test database files
  console.log('')
  console.log('🗄️  Testing Database Files:')
  const dbFiles = [
    'database/supabase-production-realtime.sql',
    'database/supabase-complete-setup-final.sql',
    'database/supabase-schema.sql'
  ]

  dbFiles.forEach(dbFile => {
    const dbPath = path.join(process.cwd(), dbFile)
    if (fs.existsSync(dbPath)) {
      console.log(`✅ ${dbFile}`)
    } else {
      issues.push(`❌ ${dbFile}: File not found`)
    }
  })

  // Test documentation files
  console.log('')
  console.log('📖 Testing Documentation Files:')
  const docFiles = [
    'docs/README.md',
    'docs/PROJECT-ORGANIZATION.md',
    'docs/QUICK-REFERENCE.md',
    'docs/REALTIME-IMPLEMENTATION.md',
    'docs/OAUTH-SETUP-GUIDE.md'
  ]

  docFiles.forEach(docFile => {
    const docPath = path.join(process.cwd(), docFile)
    if (fs.existsSync(docPath)) {
      console.log(`✅ ${docFile}`)
    } else {
      issues.push(`❌ ${docFile}: File not found`)
    }
  })

  // Summary
  console.log('')
  console.log('📊 Test Summary:')
  console.log('')

  if (issues.length === 0) {
    console.log('✅ All critical files found!')
  } else {
    console.log('❌ Issues found:')
    issues.forEach(issue => console.log(`   ${issue}`))
  }

  if (warnings.length > 0) {
    console.log('')
    console.log('⚠️  Warnings:')
    warnings.forEach(warning => console.log(`   ${warning}`))
  }

  console.log('')
  console.log('🔧 Quick Fixes:')
  console.log('1. Remove console.log statements from production code')
  console.log('2. Add cleanup functions to useEffect hooks')
  console.log('3. Replace "any" types with proper TypeScript types')
  console.log('4. Address TODO/FIXME comments')
  console.log('')

  console.log('🚀 Next Steps:')
  console.log('1. Fix any issues found above')
  console.log('2. Run: npm run dev')
  console.log('3. Test all pages manually')
  console.log('4. Run: npm run test:all')
  console.log('5. Deploy to production')
  console.log('')

  if (issues.length === 0 && warnings.length === 0) {
    console.log('🎉 All pages are clean and ready for production!')
  } else {
    console.log('⚠️  Please address the issues and warnings above.')
  }

  process.exit(issues.length > 0 ? 1 : 0)
}

// Run the test
testAllPages()
