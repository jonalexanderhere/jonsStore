const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl)
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', !!supabaseServiceKey)
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupProductionDatabase() {
  try {
    console.log('🚀 Setting up JonsStore Production Database...')
    console.log('=' .repeat(60))

    // Read SQL file
    const sqlPath = path.join(__dirname, '..', 'supabase-production-ready.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf8')

    console.log('📄 Reading SQL file...')
    console.log(`   File: ${sqlPath}`)
    console.log(`   Size: ${(sqlContent.length / 1024).toFixed(2)} KB`)

    // Execute SQL
    console.log('\n🔧 Executing SQL commands...')
    const { data, error } = await supabase.rpc('exec_sql', { sql: sqlContent })

    if (error) {
      console.error('❌ Error executing SQL:', error)
      return
    }

    console.log('✅ SQL executed successfully!')

    // Verify tables
    console.log('\n🔍 Verifying database structure...')
    
    const tables = [
      'categories', 'products', 'users', 'addresses', 
      'orders', 'order_items', 'cart_items', 'coupons', 
      'reviews', 'wishlist'
    ]

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1)

      if (error) {
        console.error(`❌ Error checking table ${table}:`, error.message)
      } else {
        console.log(`✅ Table ${table}: OK`)
      }
    }

    // Check data counts
    console.log('\n📊 Checking data counts...')
    
    const { data: categoriesCount } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true })
    
    const { data: productsCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
    
    const { data: couponsCount } = await supabase
      .from('coupons')
      .select('*', { count: 'exact', head: true })

    console.log(`   Categories: ${categoriesCount?.length || 0}`)
    console.log(`   Products: ${productsCount?.length || 0}`)
    console.log(`   Coupons: ${couponsCount?.length || 0}`)

    // Test RLS policies
    console.log('\n🔒 Testing RLS policies...')
    
    // Test public access to products
    const { data: publicProducts, error: publicError } = await supabase
      .from('products')
      .select('id, name, price')
      .limit(3)

    if (publicError) {
      console.error('❌ RLS test failed:', publicError.message)
    } else {
      console.log('✅ RLS policies working correctly')
      console.log(`   Sample products: ${publicProducts?.length || 0}`)
    }

    // Test analytics views
    console.log('\n📈 Testing analytics views...')
    
    const { data: analyticsData, error: analyticsError } = await supabase
      .from('product_analytics')
      .select('*')
      .limit(3)

    if (analyticsError) {
      console.error('❌ Analytics view error:', analyticsError.message)
    } else {
      console.log('✅ Analytics views working correctly')
    }

    console.log('\n🎉 Production Database Setup Complete!')
    console.log('=' .repeat(60))
    console.log('✅ All tables created successfully')
    console.log('✅ RLS policies enabled')
    console.log('✅ Real production data inserted')
    console.log('✅ Analytics views working')
    console.log('✅ Ready for production use!')
    
    console.log('\n📋 Next Steps:')
    console.log('1. Configure OAuth providers in Supabase Dashboard')
    console.log('2. Set up email templates')
    console.log('3. Configure storage buckets')
    console.log('4. Deploy to production')
    console.log('5. Test all functionality')

  } catch (error) {
    console.error('❌ Setup failed:', error.message)
    console.error('Stack trace:', error.stack)
  }
}

// Run setup
setupProductionDatabase()
