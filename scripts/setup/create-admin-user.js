const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function createAdminUser() {
  try {
    console.log('🚀 Creating admin user...')

    // Admin credentials
    const adminEmail = 'admin@ecommerce.com'
    const adminPassword = 'Admin123!'
    const adminFullName = 'Administrator'

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        full_name: adminFullName,
        role: 'admin'
      }
    })

    if (authError) {
      console.error('Error creating auth user:', authError)
      return
    }

    console.log('✅ Auth user created successfully')

    // Create user record in users table
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: adminEmail,
        full_name: adminFullName,
        role: 'admin'
      })

    if (userError) {
      console.error('Error creating user record:', userError)
    } else {
      console.log('✅ User record created successfully')
    }

    console.log('🎉 Admin user created successfully!')
    console.log('📧 Email:', adminEmail)
    console.log('🔑 Password:', adminPassword)
    console.log('👤 Role: admin')
    console.log('')
    console.log('You can now login to the admin dashboard at:')
    console.log('http://localhost:3000/auth/login')
    console.log('')
    console.log('Admin Dashboard:')
    console.log('http://localhost:3000/admin')

  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  }
}

createAdminUser()
