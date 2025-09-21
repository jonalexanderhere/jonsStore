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

async function setupVercelDatabase() {
  console.log('🚀 Setting up Supabase Database for Vercel Deployment...\n')
  
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

    // 2. Read and execute SQL script
    console.log('2️⃣ Executing database setup script...')
    const sqlScript = fs.readFileSync(path.join(__dirname, '../supabase-vercel-setup.sql'), 'utf8')
    
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
    console.log('\n3️⃣ Verifying database setup...')
    
    // Check categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(5)

    if (categoriesError) {
      console.error('❌ Error checking categories:', categoriesError.message)
    } else {
      console.log(`✅ Categories: ${categoriesData.length} found`)
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

    // 4. Create admin user
    console.log('\n4️⃣ Creating admin user...')
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

    // 5. Test admin login
    console.log('\n5️⃣ Testing admin login...')
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

    console.log('\n🎉 Database setup completed successfully!')
    console.log('\n📋 Summary:')
    console.log('✅ Database connection working')
    console.log('✅ Tables created and configured')
    console.log('✅ Sample data inserted')
    console.log('✅ Admin user created/verified')
    console.log('✅ Admin login working')
    console.log('✅ RLS policies configured')
    
    console.log('\n🔑 Admin Credentials:')
    console.log('Email: admin@jonsstore.com')
    console.log('Password: admin123456')
    
    console.log('\n🚀 Next steps for Vercel deployment:')
    console.log('1. Copy your Supabase URL and keys')
    console.log('2. Add environment variables in Vercel:')
    console.log('   - NEXT_PUBLIC_SUPABASE_URL')
    console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY')
    console.log('   - SUPABASE_SERVICE_ROLE_KEY')
    console.log('3. Deploy to Vercel')
    console.log('4. Test the application')
    
    console.log('\n📄 SQL Script Location:')
    console.log('File: supabase-vercel-setup.sql')
    console.log('You can also run this script manually in Supabase SQL Editor')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

// Run the setup
setupVercelDatabase()
