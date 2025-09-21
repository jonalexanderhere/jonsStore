const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function waitAndTest() {
  console.log('⏳ Waiting for database setup...')
  console.log('📋 Please complete the manual setup in Supabase Dashboard:')
  console.log('1. Copy the SQL from the terminal output above')
  console.log('2. Paste it in Supabase SQL Editor')
  console.log('3. Click "Run" to execute')
  console.log('4. Create admin user in Authentication → Users')
  console.log('5. Press Enter when done...')
  
  // Wait for user input
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.on('data', async () => {
    console.log('\n🔍 Testing database...')
    
    try {
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
      console.log('\n🚀 Starting development server...')
      
      // Start the development server
      const { spawn } = require('child_process')
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
}

waitAndTest()
