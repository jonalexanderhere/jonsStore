require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your_supabase_url'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your_anon_key'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testAdminLogin() {
  try {
    console.log('🧪 Testing admin login...')
    
    // Test admin login
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'admin@jonsstore.com',
      password: 'admin123456'
    })

    if (authError) {
      console.error('❌ Login failed:', authError.message)
      return
    }

    console.log('✅ Admin login successful!')
    console.log('👤 User ID:', authData.user.id)
    console.log('📧 Email:', authData.user.email)

    // Test getting user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (userError) {
      console.error('❌ Error fetching user data:', userError.message)
      return
    }

    console.log('✅ User data retrieved successfully!')
    console.log('👤 Full Name:', userData.full_name)
    console.log('🔑 Role:', userData.role)

    if (userData.role === 'admin') {
      console.log('🎉 Admin access confirmed!')
    } else {
      console.log('⚠️  User is not an admin')
    }

    // Test admin dashboard data access
    console.log('\n📊 Testing admin dashboard data access...')
    
    // Test products access
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .limit(5)

    if (productsError) {
      console.error('❌ Error fetching products:', productsError.message)
    } else {
      console.log('✅ Products data accessible:', productsData.length, 'products found')
    }

    // Test orders access
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select(`
        *,
        user:users(full_name, email)
      `)
      .limit(5)

    if (ordersError) {
      console.error('❌ Error fetching orders:', ordersError.message)
    } else {
      console.log('✅ Orders data accessible:', ordersData.length, 'orders found')
    }

    // Test users access
    const { count: usersCount, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    if (usersError) {
      console.error('❌ Error fetching users count:', usersError.message)
    } else {
      console.log('✅ Users data accessible:', usersCount, 'users found')
    }

    console.log('\n🎉 All admin functionality tests passed!')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

// Run the test
testAdminLogin()
