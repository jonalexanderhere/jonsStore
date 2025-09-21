const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testDatabase() {
  try {
    console.log('🧪 Testing database connection...')
    console.log('🔗 Supabase URL:', supabaseUrl)
    console.log('🔑 Service Key:', supabaseKey ? '✅ Set' : '❌ Missing')

    // Test 1: Check if we can connect
    console.log('\n📡 Testing connection...')
    const { data: connectionTest, error: connectionError } = await supabase
      .from('categories')
      .select('count')
      .limit(1)

    if (connectionError) {
      console.error('❌ Connection failed:', connectionError.message)
      console.log('\n💡 Possible solutions:')
      console.log('1. Check if tables exist in Supabase')
      console.log('2. Run the SQL in supabase-setup.sql manually')
      console.log('3. Check environment variables')
      return
    }

    console.log('✅ Connection successful!')

    // Test 2: Check categories
    console.log('\n📁 Checking categories...')
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, is_active')
      .eq('is_active', true)

    if (categoriesError) {
      console.error('❌ Error fetching categories:', categoriesError.message)
    } else {
      console.log(`✅ Found ${categories.length} active categories:`)
      categories.forEach(cat => console.log(`  - ${cat.name} (${cat.id})`))
    }

    // Test 3: Check products
    console.log('\n📦 Checking products...')
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, is_active, is_featured')
      .eq('is_active', true)

    if (productsError) {
      console.error('❌ Error fetching products:', productsError.message)
    } else {
      const featuredCount = products.filter(p => p.is_featured).length
      console.log(`✅ Found ${products.length} active products (${featuredCount} featured):`)
      products.slice(0, 5).forEach(product => {
        const featured = product.is_featured ? '⭐' : '  '
        console.log(`  ${featured} ${product.name} (${product.id})`)
      })
      if (products.length > 5) {
        console.log(`  ... and ${products.length - 5} more products`)
      }
    }

    // Test 4: Check users
    console.log('\n👤 Checking users...')
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, role')

    if (usersError) {
      console.error('❌ Error fetching users:', usersError.message)
    } else {
      console.log(`✅ Found ${users.length} users:`)
      users.forEach(user => {
        const role = user.role === 'admin' ? '👑' : '👤'
        console.log(`  ${role} ${user.email} (${user.role})`)
      })
    }

    // Test 5: Check featured products specifically
    console.log('\n⭐ Checking featured products...')
    const { data: featuredProducts, error: featuredError } = await supabase
      .from('products')
      .select('id, name, price, category_id, category:categories(name)')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })

    if (featuredError) {
      console.error('❌ Error fetching featured products:', featuredError.message)
    } else {
      console.log(`✅ Found ${featuredProducts.length} featured products:`)
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

    console.log('\n🎉 Database test completed!')
    
    if (categories.length === 0 || products.length === 0) {
      console.log('\n⚠️  Database appears to be empty!')
      console.log('📋 Please run the SQL setup manually:')
      console.log('1. Go to Supabase Dashboard → SQL Editor')
      console.log('2. Copy and run the content of supabase-setup.sql')
      console.log('3. Run this test again')
    } else {
      console.log('\n✅ Database is ready! You can now:')
      console.log('1. Start the app: npm run dev')
      console.log('2. Visit: http://localhost:3000')
      console.log('3. Login as admin: admin@ecommerce.com / Admin123!')
    }

  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

testDatabase()
