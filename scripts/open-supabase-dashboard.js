const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

function openSupabaseDashboard() {
  try {
    console.log('🚀 Opening Supabase Dashboard...')
    
    // Extract project ID from URL
    const projectId = supabaseUrl.split('//')[1].split('.')[0]
    const dashboardUrl = `https://supabase.com/dashboard/project/${projectId}/sql`
    
    console.log('🔗 Dashboard URL:', dashboardUrl)
    
    // Open browser
    const start = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open'
    exec(`${start} ${dashboardUrl}`)
    
    console.log('✅ Browser opened!')
    console.log('\n📋 Manual Setup Steps:')
    console.log('1. Copy the SQL content from supabase-setup.sql')
    console.log('2. Paste it in the SQL Editor')
    console.log('3. Click "Run" to execute')
    console.log('4. Create admin user in Authentication → Users')
    console.log('5. Run: node scripts/test-database.js')
    
    // Also show the SQL content
    console.log('\n📝 SQL Content to Copy:')
    console.log('='.repeat(60))
    
    const sqlFile = path.join(__dirname, '..', 'supabase-setup.sql')
    if (fs.existsSync(sqlFile)) {
      const sqlContent = fs.readFileSync(sqlFile, 'utf8')
      console.log(sqlContent)
    } else {
      console.log('❌ supabase-setup.sql not found')
    }
    
    console.log('='.repeat(60))
    
  } catch (error) {
    console.error('❌ Error opening dashboard:', error)
    console.log('\n💡 Manual steps:')
    console.log('1. Go to: https://supabase.com/dashboard')
    console.log('2. Select your project')
    console.log('3. Go to SQL Editor')
    console.log('4. Copy and run the SQL from supabase-setup.sql')
  }
}

openSupabaseDashboard()
