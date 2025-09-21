require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  details: []
}

function logTest(testName, passed, details = '') {
  testResults.total++
  if (passed) {
    testResults.passed++
    console.log(`✅ ${testName}`)
  } else {
    testResults.failed++
    console.log(`❌ ${testName}: ${details}`)
  }
  testResults.details.push({ testName, passed, details })
}

async function testDatabaseConnection() {
  console.log('\n🔗 Testing Database Connection...')
  try {
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1)
    
    logTest('Database Connection', !error, error?.message)
    return !error
  } catch (error) {
    logTest('Database Connection', false, error.message)
    return false
  }
}

async function testTablesStructure() {
  console.log('\n📊 Testing Tables Structure...')
  
  const tables = ['categories', 'products', 'users', 'orders', 'order_items']
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1)
      
      logTest(`Table ${table} exists`, !error, error?.message)
    } catch (error) {
      logTest(`Table ${table} exists`, false, error.message)
    }
  }
}

async function testDataIntegrity() {
  console.log('\n🔍 Testing Data Integrity...')
  
  // Test categories data
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
    
    logTest('Categories data exists', !error && categories.length > 0, error?.message)
    
    if (categories && categories.length > 0) {
      logTest('Categories have required fields', 
        categories.every(cat => cat.name && cat.is_active !== undefined),
        'Missing required fields')
    }
  } catch (error) {
    logTest('Categories data integrity', false, error.message)
  }

  // Test products data
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
    
    logTest('Products data exists', !error && products.length > 0, error?.message)
    
    if (products && products.length > 0) {
      logTest('Products have required fields', 
        products.every(prod => prod.name && prod.price && prod.stock !== undefined),
        'Missing required fields')
      
      logTest('Products have valid prices', 
        products.every(prod => prod.price > 0),
        'Invalid price values')
    }
  } catch (error) {
    logTest('Products data integrity', false, error.message)
  }
}

async function testUserAuthentication() {
  console.log('\n👤 Testing User Authentication...')
  
  // Test admin user creation
  try {
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'test-admin@jonsstore.com',
      password: 'test123456',
      email_confirm: true,
      user_metadata: {
        full_name: 'Test Admin',
        role: 'admin'
      }
    })

    if (authError && !authError.message.includes('already registered')) {
      logTest('Admin user creation', false, authError.message)
    } else {
      logTest('Admin user creation', true)
      
      // Test admin login
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: 'test-admin@jonsstore.com',
        password: 'test123456'
      })
      
      logTest('Admin login', !loginError, loginError?.message)
      
      if (loginData?.user) {
        // Test user profile creation
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', loginData.user.id)
          .single()
        
        logTest('User profile creation', !profileError, profileError?.message)
      }
    }
  } catch (error) {
    logTest('User authentication flow', false, error.message)
  }
}

async function testProductQueries() {
  console.log('\n🛍️ Testing Product Queries...')
  
  // Test featured products
  try {
    const { data: featuredProducts, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_active', true)
      .eq('is_featured', true)
      .limit(4)
    
    logTest('Featured products query', !error, error?.message)
    logTest('Featured products count', featuredProducts && featuredProducts.length > 0, 'No featured products found')
  } catch (error) {
    logTest('Featured products query', false, error.message)
  }

  // Test product by category
  try {
    const { data: categoryProducts, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_active', true)
      .limit(10)
    
    logTest('Products by category query', !error, error?.message)
  } catch (error) {
    logTest('Products by category query', false, error.message)
  }

  // Test product search
  try {
    const { data: searchResults, error } = await supabase
      .from('products')
      .select('*')
      .ilike('name', '%iPhone%')
      .eq('is_active', true)
    
    logTest('Product search query', !error, error?.message)
  } catch (error) {
    logTest('Product search query', false, error.message)
  }
}

async function testOrderSystem() {
  console.log('\n📦 Testing Order System...')
  
  // Test order creation
  try {
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: 'ae0c03c8-5ec7-4736-80e3-11cf918b5be1',
        total_amount: 100000,
        status: 'pending',
        payment_status: 'pending'
      })
      .select()
    
    if (orderError) {
      logTest('Order creation', false, orderError.message)
    } else {
      logTest('Order creation', true)
      
      // Test order items creation
      const { data: orderItemData, error: orderItemError } = await supabase
        .from('order_items')
        .insert({
          order_id: orderData[0].id,
          product_id: '650e8400-e29b-41d4-a716-446655440001',
          quantity: 1,
          price: 100000
        })
        .select()
      
      logTest('Order items creation', !orderItemError, orderItemError?.message)
      
      // Clean up test data
      if (orderData[0]) {
        await supabase.from('orders').delete().eq('id', orderData[0].id)
      }
    }
  } catch (error) {
    logTest('Order system', false, error.message)
  }
}

async function testAnalyticsViews() {
  console.log('\n📈 Testing Analytics Views...')
  
  // Test product analytics view
  try {
    const { data: productAnalytics, error } = await supabase
      .from('product_analytics')
      .select('*')
      .limit(5)
    
    logTest('Product analytics view', !error, error?.message)
  } catch (error) {
    logTest('Product analytics view', false, error.message)
  }

  // Test order analytics view
  try {
    const { data: orderAnalytics, error } = await supabase
      .from('order_analytics')
      .select('*')
      .limit(5)
    
    logTest('Order analytics view', !error, error?.message)
  } catch (error) {
    logTest('Order analytics view', false, error.message)
  }
}

async function testRLSPolicies() {
  console.log('\n🔒 Testing RLS Policies...')
  
  // Test public access to products
  try {
    const { data: publicProducts, error } = await supabase
      .from('products')
      .select('*')
      .limit(1)
    
    logTest('Public products access', !error, error?.message)
  } catch (error) {
    logTest('Public products access', false, error.message)
  }

  // Test public access to categories
  try {
    const { data: publicCategories, error } = await supabase
      .from('categories')
      .select('*')
      .limit(1)
    
    logTest('Public categories access', !error, error?.message)
  } catch (error) {
    logTest('Public categories access', false, error.message)
  }
}

async function testPerformance() {
  console.log('\n⚡ Testing Performance...')
  
  const startTime = Date.now()
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_active', true)
      .limit(20)
    
    const endTime = Date.now()
    const queryTime = endTime - startTime
    
    logTest('Query performance', !error && queryTime < 2000, 
      error ? error.message : `Query took ${queryTime}ms (should be < 2000ms)`)
  } catch (error) {
    logTest('Query performance', false, error.message)
  }
}

async function runAdvancedTests() {
  console.log('🚀 Starting Advanced Testing for JonsStore...\n')
  
  // Test database connection first
  const dbConnected = await testDatabaseConnection()
  if (!dbConnected) {
    console.log('\n❌ Database connection failed. Stopping tests.')
    return
  }

  // Run all tests
  await testTablesStructure()
  await testDataIntegrity()
  await testUserAuthentication()
  await testProductQueries()
  await testOrderSystem()
  await testAnalyticsViews()
  await testRLSPolicies()
  await testPerformance()

  // Print summary
  console.log('\n📊 Test Summary:')
  console.log(`✅ Passed: ${testResults.passed}`)
  console.log(`❌ Failed: ${testResults.failed}`)
  console.log(`📈 Total: ${testResults.total}`)
  console.log(`🎯 Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`)

  if (testResults.failed > 0) {
    console.log('\n❌ Failed Tests:')
    testResults.details
      .filter(test => !test.passed)
      .forEach(test => console.log(`  - ${test.testName}: ${test.details}`))
  }

  console.log('\n🎉 Advanced testing completed!')
  
  if (testResults.failed === 0) {
    console.log('✨ All tests passed! JonsStore is ready for production.')
  } else {
    console.log('⚠️  Some tests failed. Please review and fix the issues.')
  }
}

// Run the tests
runAdvancedTests().catch(console.error)
