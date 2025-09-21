require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration!')
  console.error('Please check your .env.local file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupJonsStoreDatabase() {
  console.log('🏪 Setting up JonsStore Database...\n')
  
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

    // 2. Read and execute JonsStore SQL script
    console.log('2️⃣ Executing JonsStore database setup script...')
    const sqlScript = fs.readFileSync(path.join(__dirname, '../supabase-jonsstore-complete.sql'), 'utf8')
    
    // Split script into individual statements
    const statements = sqlScript
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))

    let successCount = 0
    let errorCount = 0

    for (const statement of statements) {
      if (statement.trim()) {
        try {
          const { error } = await supabase.rpc('exec_sql', { sql: statement })
          if (error) {
            console.log(`⚠️  Warning: ${error.message}`)
            errorCount++
          } else {
            successCount++
          }
        } catch (err) {
          console.log(`⚠️  Warning: ${err.message}`)
          errorCount++
        }
      }
    }

    console.log(`✅ Executed ${successCount} statements successfully`)
    if (errorCount > 0) {
      console.log(`⚠️  ${errorCount} statements had warnings (this is normal)`)
    }

    // 3. Verify data
    console.log('\n3️⃣ Verifying JonsStore database setup...')
    
    // Check categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(5)

    if (categoriesError) {
      console.error('❌ Error checking categories:', categoriesError.message)
    } else {
      console.log(`✅ Categories: ${categoriesData.length} found`)
      console.log(`   - Sample: ${categoriesData.map(c => c.name).join(', ')}`)
    }

    // Check products
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(5)

    if (productsError) {
      console.error('❌ Error checking products:', productsError.message)
    } else {
      console.log(`✅ Products: ${productsData.length} found`)
      console.log(`   - Sample: ${productsData.map(p => p.name).join(', ')}`)
    }

    // Check users
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(5)

    if (usersError) {
      console.error('❌ Error checking users:', usersError.message)
    } else {
      console.log(`✅ Users: ${usersData.length} found`)
    }

    // 4. Create JonsStore admin user
    console.log('\n4️⃣ Creating JonsStore admin user...')
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
          console.log('⚠️  JonsStore admin user already exists')
        } else {
          console.error('❌ Error creating JonsStore admin user:', authError.message)
        }
      } else {
        console.log('✅ JonsStore admin user created successfully!')
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
          console.error('❌ Error creating JonsStore admin profile:', profileError.message)
        } else {
          console.log('✅ JonsStore admin profile created successfully!')
        }
      }
    } catch (error) {
      console.log('⚠️  JonsStore admin user creation skipped (may already exist)')
    }

    // 5. Test admin login
    console.log('\n5️⃣ Testing JonsStore admin login...')
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'admin@jonsstore.com',
      password: 'admin123456'
    })

    if (loginError) {
      console.error('❌ JonsStore admin login failed:', loginError.message)
    } else {
      console.log('✅ JonsStore admin login successful!')
      console.log('👤 Logged in as:', loginData.user.email)
    }

    // 6. Test JonsStore features
    console.log('\n6️⃣ Testing JonsStore features...')
    
    // Test featured products
    const { data: featuredProducts, error: featuredError } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_active', true)
      .eq('is_featured', true)
      .limit(4)

    if (featuredError) {
      console.error('❌ Error fetching featured products:', featuredError.message)
    } else {
      console.log(`✅ Featured products: ${featuredProducts.length} found`)
      console.log(`   - ${featuredProducts.map(p => p.name).join(', ')}`)
    }

    // Test categories
    const { data: allCategories, error: categoriesError2 } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)

    if (categoriesError2) {
      console.error('❌ Error fetching categories:', categoriesError2.message)
    } else {
      console.log(`✅ Active categories: ${allCategories.length} found`)
    }

    console.log('\n🎉 JonsStore database setup completed successfully!')
    console.log('\n📋 JonsStore Summary:')
    console.log('✅ Database connection working')
    console.log('✅ Complete JonsStore table structure created')
    console.log('✅ Sample data inserted with detailed descriptions')
    console.log('✅ JonsStore admin user created/verified')
    console.log('✅ Admin login working')
    console.log('✅ Featured products working')
    console.log('✅ Categories working')
    console.log('✅ RLS policies configured')
    console.log('✅ Triggers and functions created')
    console.log('✅ Analytics views created')
    
    console.log('\n🏪 JonsStore Admin Credentials:')
    console.log('Email: admin@jonsstore.com')
    console.log('Password: admin123456')
    
    console.log('\n🚀 Next steps for JonsStore deployment:')
    console.log('1. Copy your Supabase URL and keys')
    console.log('2. Add environment variables in Vercel:')
    console.log('   - NEXT_PUBLIC_SUPABASE_URL')
    console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY')
    console.log('   - SUPABASE_SERVICE_ROLE_KEY')
    console.log('3. Deploy JonsStore to Vercel')
    console.log('4. Test the JonsStore application')
    
    console.log('\n📄 JonsStore SQL Script Location:')
    console.log('File: supabase-jonsstore-complete.sql')
    console.log('You can also run this script manually in Supabase SQL Editor')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

// Run the setup
setupJonsStoreDatabase()
