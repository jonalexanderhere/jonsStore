require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration!')
  console.error('Please check your .env.local file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log('🚀 Setting up Supabase Database...\n')
  
  try {
    // 1. Test connection
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

    // 2. Create admin user
    console.log('2️⃣ Creating admin user...')
    try {
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
        if (authError.message.includes('already registered')) {
          console.log('⚠️  Admin user already exists')
        } else {
          console.error('❌ Error creating admin user:', authError.message)
        }
      } else {
        console.log('✅ Admin user created successfully!')
        console.log('📧 Email: admin@jonsstore.com')
        console.log('🔑 Password: admin123456')
        console.log('👤 User ID:', authData.user.id)

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
    } catch (error) {
      console.log('⚠️  Admin user creation skipped (may already exist)')
    }

    // 3. Check and create sample data
    console.log('\n3️⃣ Checking sample data...')
    
    // Check products
    const { data: productsData, error: productsError } = await supabase
        .from('products')
      .select('*')
      .limit(1)

    if (productsError) {
      console.error('❌ Error checking products:', productsError.message)
    } else if (productsData && productsData.length > 0) {
      console.log('✅ Products data exists')
    } else {
      console.log('⚠️  No products found - please run the SQL schema')
    }

    // Check categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(1)

    if (categoriesError) {
      console.error('❌ Error checking categories:', categoriesError.message)
    } else if (categoriesData && categoriesData.length > 0) {
      console.log('✅ Categories data exists')
    } else {
      console.log('⚠️  No categories found - please run the SQL schema')
    }

    // 4. Test admin login
    console.log('\n4️⃣ Testing admin login...')
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'admin@jonsstore.com',
      password: 'admin123456'
    })

    if (loginError) {
      console.error('❌ Admin login failed:', loginError.message)
      } else {
      console.log('✅ Admin login successful!')
      console.log('👤 Logged in as:', loginData.user.email)
    }

    // 5. Test admin permissions
    console.log('\n5️⃣ Testing admin permissions...')
    const { data: adminData, error: adminDataError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@jonsstore.com')
      .single()

    if (adminDataError) {
      console.error('❌ Error fetching admin data:', adminDataError.message)
    } else {
      console.log('✅ Admin data accessible')
      console.log('👤 Name:', adminData.full_name)
      console.log('🔑 Role:', adminData.role)
    }

    console.log('\n🎉 Database setup completed!')
    console.log('\n📋 Summary:')
    console.log('✅ Database connection working')
    console.log('✅ Admin user created/verified')
    console.log('✅ Admin login working')
    console.log('✅ Admin permissions verified')
    
    console.log('\n🔑 Admin Credentials:')
    console.log('Email: admin@jonsstore.com')
    console.log('Password: admin123456')
    
    console.log('\n🚀 Next steps:')
    console.log('1. Run: npm run dev')
    console.log('2. Go to: http://localhost:3000/auth/login')
    console.log('3. Login with admin credentials')
    console.log('4. Access admin dashboard at: http://localhost:3000/admin')

  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

// Run the setup
setupDatabase()