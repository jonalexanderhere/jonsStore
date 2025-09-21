#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function createAdminUser() {
  console.log('👤 Creating Admin User...')
  console.log('')

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.log('❌ Missing Supabase environment variables!')
    console.log('Please ensure you have:')
    console.log('- NEXT_PUBLIC_SUPABASE_URL')
    console.log('- SUPABASE_SERVICE_ROLE_KEY')
    console.log('')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    // Check if admin user already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@jonsstore.com')
      .single()

    if (existingAdmin) {
      console.log('✅ Admin user already exists!')
      console.log('')
      console.log('Admin Details:')
      console.log(`Email: ${existingAdmin.email}`)
      console.log(`Name: ${existingAdmin.full_name}`)
      console.log(`Role: ${existingAdmin.role}`)
      console.log(`ID: ${existingAdmin.id}`)
      console.log('')
      return
    }

    // Create admin user in auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@jonsstore.com',
      password: 'admin123456',
      email_confirm: true,
      user_metadata: {
        full_name: 'Admin JonsStore',
        role: 'admin'
      }
    })

    if (authError) {
      console.log('❌ Error creating auth user:', authError.message)
      return
    }

    console.log('✅ Auth user created successfully!')

    // Create admin user profile
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .insert({
        id: authUser.user.id,
        email: 'admin@jonsstore.com',
        full_name: 'Admin JonsStore',
        role: 'admin',
        phone: '+6281234567890',
        email_verified: true
      })
      .select()
      .single()

    if (profileError) {
      console.log('❌ Error creating user profile:', profileError.message)
      return
    }

    console.log('✅ Admin user profile created successfully!')
    console.log('')
    console.log('🎉 Admin User Created Successfully!')
    console.log('')
    console.log('Admin Login Details:')
    console.log('Email: admin@jonsstore.com')
    console.log('Password: admin123456')
    console.log('')
    console.log('User ID:', userProfile.id)
    console.log('Role:', userProfile.role)
    console.log('')
    console.log('You can now login to the admin dashboard at:')
    console.log('http://localhost:3000/admin')
    console.log('')

  } catch (error) {
    console.log('❌ Error creating admin user:', error.message)
  }
}

// Run the function
createAdminUser()