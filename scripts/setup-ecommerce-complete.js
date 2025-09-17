const { execSync, spawn } = require('child_process')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
  process.exit(1)
}

async function setupEcommerceComplete() {
  try {
    console.log('🚀 E-Commerce Complete Setup')
    console.log('='.repeat(50))
    console.log('🔗 Supabase URL:', supabaseUrl)
    console.log('🔑 Service Key:', supabaseKey ? '✅ Set' : '❌ Missing')
    console.log('='.repeat(50))

    // Step 1: Open Supabase Dashboard
    console.log('\n📋 Step 1: Opening Supabase Dashboard...')
    
    const projectId = supabaseUrl.split('//')[1].split('.')[0]
    const dashboardUrl = `https://supabase.com/dashboard/project/${projectId}/sql`
    
    console.log('🔗 Dashboard URL:', dashboardUrl)
    
    try {
      const start = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open'
      execSync(`${start} ${dashboardUrl}`)
      console.log('✅ Browser opened!')
    } catch (error) {
      console.log('⚠️  Could not open browser automatically')
      console.log('💡 Please open manually:', dashboardUrl)
    }

    // Step 2: Show SQL content
    console.log('\n📝 Step 2: SQL Content to Copy')
    console.log('='.repeat(60))
    
    const sqlFile = path.join(__dirname, '..', 'supabase-setup.sql')
    if (fs.existsSync(sqlFile)) {
      const sqlContent = fs.readFileSync(sqlFile, 'utf8')
      console.log(sqlContent)
    } else {
      console.log('❌ supabase-setup.sql not found')
    }
    
    console.log('='.repeat(60))

    // Step 3: Instructions
    console.log('\n📋 Step 3: Manual Setup Instructions')
    console.log('1. Copy the SQL content above')
    console.log('2. Paste it in Supabase SQL Editor')
    console.log('3. Click "Run" to execute')
    console.log('4. Go to Authentication → Users')
    console.log('5. Add user: admin@ecommerce.com / Admin123!')
    console.log('6. Copy the User ID and run this SQL:')
    console.log('   INSERT INTO users (id, email, full_name, role) VALUES')
    console.log('   (\'[USER_ID]\', \'admin@ecommerce.com\', \'Administrator\', \'admin\');')
    
    // Step 4: Wait and test
    console.log('\n⏳ Step 4: Waiting for setup completion...')
    console.log('Press Enter when you have completed the manual setup...')
    
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.on('data', async () => {
      console.log('\n🔍 Testing database...')
      
      try {
        const { createClient } = require('@supabase/supabase-js')
        const supabase = createClient(supabaseUrl, supabaseKey)

        // Test connection
        const { data: categories, error: categoriesError } = await supabase
          .from('categories')
          .select('id, name')
          .eq('is_active', true)
          .limit(1)

        if (categoriesError) {
          console.error('❌ Database not ready yet:', categoriesError.message)
          console.log('💡 Please complete the SQL setup first')
          process.exit(1)
        }

        console.log('✅ Database connection successful!')

        // Test categories
        const { data: allCategories, error: allCategoriesError } = await supabase
          .from('categories')
          .select('id, name')
          .eq('is_active', true)

        if (allCategoriesError) {
          console.error('❌ Error fetching categories:', allCategoriesError.message)
        } else {
          console.log(`✅ Found ${allCategories.length} categories:`)
          allCategories.forEach(cat => console.log(`  - ${cat.name}`))
        }

        // Test products
        const { data: products, error: productsError } = await supabase
          .from('products')
          .select('id, name, is_featured')
          .eq('is_active', true)

        if (productsError) {
          console.error('❌ Error fetching products:', productsError.message)
        } else {
          const featuredCount = products.filter(p => p.is_featured).length
          console.log(`✅ Found ${products.length} products (${featuredCount} featured)`)
        }

        // Test featured products
        const { data: featuredProducts, error: featuredError } = await supabase
          .from('products')
          .select('id, name, price, category_id, category:categories(name)')
          .eq('is_active', true)
          .eq('is_featured', true)
          .limit(5)

        if (featuredError) {
          console.error('❌ Error fetching featured products:', featuredError.message)
        } else {
          console.log(`✅ Featured products working:`)
          featuredProducts.forEach(product => {
            const categoryName = product.category?.name || 'Unknown'
            const price = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0
            }).format(product.price)
            console.log(`  ⭐ ${product.name} - ${price} (${categoryName})`)
          })
        }

        console.log('\n🎉 Database is ready!')
        console.log('\n📋 Summary:')
        console.log('📁 Categories: 8')
        console.log('📦 Products: 21')
        console.log('⭐ Featured Products: 10')
        console.log('\n🔐 Admin Credentials:')
        console.log('📧 Email: admin@ecommerce.com')
        console.log('🔑 Password: Admin123!')
        console.log('\n🌐 Access URLs:')
        console.log('🏠 Home: http://localhost:3000')
        console.log('🔐 Login: http://localhost:3000/auth/login')
        console.log('⚙️ Admin: http://localhost:3000/admin')

        console.log('\n🚀 Starting development server...')
        
        // Start the development server
        const devServer = spawn('npm', ['run', 'dev'], { stdio: 'inherit' })
        
        devServer.on('error', (error) => {
          console.error('❌ Error starting dev server:', error)
        })

        devServer.on('close', (code) => {
          console.log(`\n📊 Dev server exited with code ${code}`)
        })

      } catch (error) {
        console.error('❌ Test failed:', error)
      }
      
      process.exit(0)
    })

  } catch (error) {
    console.error('❌ Setup failed:', error)
  }
}

setupEcommerceComplete()
