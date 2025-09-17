const { createClient } = require('@supabase/supabase-js')

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your_supabase_url'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your_service_role_key'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createAdminUser() {
  try {
    console.log('🚀 Creating admin user...')
    
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
      console.error('❌ Error creating auth user:', authError.message)
      return
    }

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
        role: 'admin',
        phone: '+6281234567890'
      })

    if (profileError) {
      console.error('❌ Error creating user profile:', profileError.message)
      return
    }

    console.log('✅ Admin profile created successfully!')
    console.log('🎉 Admin account is ready to use!')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

// Run the script
createAdminUser()

