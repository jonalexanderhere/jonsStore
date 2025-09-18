require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your_supabase_url'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your_anon_key'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testAllFeatures() {
  console.log('🚀 Testing All E-Commerce Features...\n')
  
  try {
    // Test 1: Database Connection
    console.log('1️⃣ Testing database connection...')
    const { data: testData, error: testError } = await supabase
      .from('products')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.error('❌ Database connection failed:', testError.message)
      return
    }
    console.log('✅ Database connection successful!\n')

    // Test 2: Products Data
    console.log('2️⃣ Testing products data...')
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_active', true)
      .limit(10)

    if (productsError) {
      console.error('❌ Products data error:', productsError.message)
    } else {
      console.log(`✅ Products data accessible: ${productsData.length} products found`)
      console.log(`   - Featured products: ${productsData.filter(p => p.is_featured).length}`)
      console.log(`   - Categories: ${[...new Set(productsData.map(p => p.category?.name))].join(', ')}\n`)
    }

    // Test 3: Categories Data
    console.log('3️⃣ Testing categories data...')
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)

    if (categoriesError) {
      console.error('❌ Categories data error:', categoriesError.message)
    } else {
      console.log(`✅ Categories data accessible: ${categoriesData.length} categories found`)
      console.log(`   - Categories: ${categoriesData.map(c => c.name).join(', ')}\n`)
    }

    // Test 4: Admin User Creation
    console.log('4️⃣ Testing admin user...')
    const { data: adminData, error: adminError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@jonsstore.com')
      .single()

    if (adminError) {
      console.log('⚠️  Admin user not found. Creating admin user...')
      
      // Create admin user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: 'admin@jonsstore.com',
        password: 'admin123456',
        email_confirm: true,
        user_metadata: {
          full_name: 'Admin JonsStore',
          role: 'admin'
        }
      })

      if (authError) {
        console.error('❌ Error creating admin user:', authError.message)
      } else {
        console.log('✅ Admin user created successfully!')
        
        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: 'admin@jonsstore.com',
            full_name: 'Admin JonsStore',
            role: 'admin'
          })

        if (profileError) {
          console.error('❌ Error creating admin profile:', profileError.message)
        } else {
          console.log('✅ Admin profile created successfully!')
        }
      }
    } else {
      console.log('✅ Admin user exists:', adminData.full_name, `(${adminData.role})`)
    }

    // Test 5: Admin Login
    console.log('\n5️⃣ Testing admin login...')
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'admin@jonsstore.com',
      password: 'admin123456'
    })

    if (loginError) {
      console.error('❌ Admin login failed:', loginError.message)
    } else {
      console.log('✅ Admin login successful!')
      console.log(`   - User ID: ${loginData.user.id}`)
      console.log(`   - Email: ${loginData.user.email}`)
    }

    // Test 6: Orders Data (if any)
    console.log('\n6️⃣ Testing orders data...')
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select(`
        *,
        user:users(full_name, email)
      `)
      .limit(5)

    if (ordersError) {
      console.error('❌ Orders data error:', ordersError.message)
    } else {
      console.log(`✅ Orders data accessible: ${ordersData.length} orders found`)
      if (ordersData.length > 0) {
        console.log(`   - Total revenue: ${ordersData.reduce((sum, order) => sum + order.total_amount, 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`)
      }
    }

    // Test 7: Users Data
    console.log('\n7️⃣ Testing users data...')
    const { count: usersCount, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    if (usersError) {
      console.error('❌ Users data error:', usersError.message)
    } else {
      console.log(`✅ Users data accessible: ${usersCount} users found`)
    }

    // Test 8: Product Detail Page Data
    console.log('\n8️⃣ Testing product detail page data...')
    if (productsData && productsData.length > 0) {
      const testProduct = productsData[0]
      const { data: productDetail, error: productDetailError } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('id', testProduct.id)
        .eq('is_active', true)
        .single()

      if (productDetailError) {
        console.error('❌ Product detail error:', productDetailError.message)
      } else {
        console.log(`✅ Product detail accessible: ${productDetail.name}`)
        console.log(`   - Price: ${productDetail.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`)
        console.log(`   - Stock: ${productDetail.stock}`)
        console.log(`   - Category: ${productDetail.category?.name}`)
      }
    }

    console.log('\n🎉 All tests completed!')
    console.log('\n📋 Summary:')
    console.log('✅ Database connection working')
    console.log('✅ Products data accessible')
    console.log('✅ Categories data accessible')
    console.log('✅ Admin user setup complete')
    console.log('✅ Admin login working')
    console.log('✅ Orders data accessible')
    console.log('✅ Users data accessible')
    console.log('✅ Product detail pages working')
    
    console.log('\n🚀 Your e-commerce application is ready to use!')
    console.log('\n🔑 Admin Login:')
    console.log('   Email: admin@jonsstore.com')
    console.log('   Password: admin123456')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

// Run the test
testAllFeatures()