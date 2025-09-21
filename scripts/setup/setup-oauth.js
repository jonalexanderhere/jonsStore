#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

function setupOAuth() {
  console.log('🔐 Setting up OAuth Configuration...')
  console.log('')

  // Check if .env.local exists
  const envPath = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local file not found!')
    console.log('Please create .env.local file first with your Supabase credentials.')
    console.log('')
    console.log('Example .env.local:')
    console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
    console.log('SUPABASE_SERVICE_ROLE_KEY=your_service_role_key')
    console.log('')
    process.exit(1)
  }

  // Read current .env.local
  let envContent = fs.readFileSync(envPath, 'utf8')

  // Check if OAuth variables are already set
  const hasGoogleClientId = envContent.includes('NEXT_PUBLIC_GOOGLE_CLIENT_ID')
  const hasGoogleClientSecret = envContent.includes('GOOGLE_CLIENT_SECRET')

  if (hasGoogleClientId && hasGoogleClientSecret) {
    console.log('✅ OAuth environment variables already configured!')
    console.log('')
    console.log('Current OAuth configuration:')
    console.log(`Google Client ID: ${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Not set'}`)
    console.log(`Google Client Secret: ${process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Not set'}`)
    console.log('')
  } else {
    console.log('⚠️  OAuth environment variables not configured!')
    console.log('')
    console.log('Please add the following to your .env.local file:')
    console.log('')
    console.log('# OAuth Configuration (for Google OAuth)')
    console.log('NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id')
    console.log('GOOGLE_CLIENT_SECRET=your_google_client_secret')
    console.log('')
  }

  // Check Supabase configuration
  const hasSupabaseUrl = envContent.includes('NEXT_PUBLIC_SUPABASE_URL')
  const hasSupabaseAnonKey = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY')

  if (!hasSupabaseUrl || !hasSupabaseAnonKey) {
    console.log('❌ Supabase configuration incomplete!')
    console.log('Please ensure you have:')
    console.log('- NEXT_PUBLIC_SUPABASE_URL')
    console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY')
    console.log('')
  } else {
    console.log('✅ Supabase configuration found!')
  }

  console.log('📋 OAuth Setup Checklist:')
  console.log('')
  console.log('1. Google Cloud Console Setup:')
  console.log('   □ Create Google Cloud Project')
  console.log('   □ Enable Google+ API')
  console.log('   □ Create OAuth 2.0 Credentials')
  console.log('   □ Add redirect URIs:')
  console.log('     - http://localhost:3000/auth/callback')
  console.log('     - https://yourdomain.com/auth/callback')
  console.log('')
  console.log('2. Supabase Configuration:')
  console.log('   □ Enable Google OAuth provider')
  console.log('   □ Add Google Client ID and Secret')
  console.log('   □ Set redirect URL: https://your-project-ref.supabase.co/auth/v1/callback')
  console.log('   □ Update Site URL in Authentication settings')
  console.log('')
  console.log('3. Environment Variables:')
  console.log('   □ NEXT_PUBLIC_GOOGLE_CLIENT_ID')
  console.log('   □ GOOGLE_CLIENT_SECRET')
  console.log('   □ NEXT_PUBLIC_SUPABASE_URL')
  console.log('   □ NEXT_PUBLIC_SUPABASE_ANON_KEY')
  console.log('')
  console.log('4. Testing:')
  console.log('   □ Test OAuth flow in development')
  console.log('   □ Test OAuth flow in production')
  console.log('   □ Verify user profile creation')
  console.log('   □ Test admin/customer role assignment')
  console.log('')

  // Generate OAuth setup instructions
  const instructions = `
# OAuth Setup Instructions

## Quick Setup Steps

### 1. Google Cloud Console
1. Go to https://console.cloud.google.com/
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add redirect URIs:
   - http://localhost:3000/auth/callback
   - https://yourdomain.com/auth/callback

### 2. Supabase Dashboard
1. Go to Authentication → Providers
2. Enable Google provider
3. Add your Google Client ID and Secret
4. Set redirect URL: https://your-project-ref.supabase.co/auth/v1/callback
5. Update Site URL in Authentication → URL Configuration

### 3. Environment Variables
Add to your .env.local:
\`\`\`env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
\`\`\`

### 4. Test OAuth
1. Run: npm run dev
2. Go to http://localhost:3000/auth/login
3. Click "Login dengan Google"
4. Complete OAuth flow

## Troubleshooting

### Common Errors:
- "unsupported provider" → Check if Google OAuth is enabled in Supabase
- "missing OAuth secret" → Verify Google Client Secret in Supabase
- "redirect_uri_mismatch" → Check redirect URIs in Google Cloud Console
- "invalid_client" → Verify Client ID is correct

### Debug Steps:
1. Check browser console for errors
2. Verify environment variables
3. Test OAuth in Google Cloud Console
4. Check Supabase logs
5. Verify database triggers

For detailed instructions, see: docs/OAUTH-SETUP-GUIDE.md
`

  // Write instructions to file
  const instructionsPath = path.join(process.cwd(), 'OAUTH-SETUP-INSTRUCTIONS.md')
  fs.writeFileSync(instructionsPath, instructions)

  console.log('📄 OAuth setup instructions saved to: OAUTH-SETUP-INSTRUCTIONS.md')
  console.log('')
  console.log('🚀 Next steps:')
  console.log('1. Follow the checklist above')
  console.log('2. Read the detailed guide: docs/OAUTH-SETUP-GUIDE.md')
  console.log('3. Test OAuth flow: npm run dev')
  console.log('4. Check OAuth status: npm run test:oauth')
  console.log('')

  // Check if we can test OAuth
  if (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.log('✅ Ready to test OAuth! Run: npm run dev')
  } else {
    console.log('⚠️  Complete the setup checklist before testing OAuth')
  }
}

// Run the setup
setupOAuth()
