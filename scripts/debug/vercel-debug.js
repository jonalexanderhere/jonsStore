#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

function debugVercelIssues() {
  console.log('🔍 Debugging Vercel Deployment Issues...')
  console.log('')

  // 1. Check environment variables
  console.log('1️⃣ Checking Environment Variables:')
  const envExample = fs.existsSync('.env.example') ? fs.readFileSync('.env.example', 'utf8') : 'Not found'
  const envLocal = fs.existsSync('.env.local') ? fs.readFileSync('.env.local', 'utf8') : 'Not found'
  
  console.log('Required Environment Variables:')
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXT_PUBLIC_GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'NEXT_PUBLIC_APP_URL'
  ]

  requiredVars.forEach(varName => {
    const hasVar = envLocal.includes(varName)
    console.log(`  ${hasVar ? '✅' : '❌'} ${varName}`)
  })

  console.log('')
  console.log('2️⃣ Common Vercel Issues & Solutions:')
  console.log('')

  console.log('❌ Issue: Client-side exception')
  console.log('✅ Solutions:')
  console.log('  1. Check environment variables in Vercel dashboard')
  console.log('  2. Ensure all NEXT_PUBLIC_ variables are set')
  console.log('  3. Check Supabase URL and keys are correct')
  console.log('  4. Verify Google OAuth configuration')
  console.log('')

  console.log('❌ Issue: Hydration mismatch')
  console.log('✅ Solutions:')
  console.log('  1. Check for client-only code in server components')
  console.log('  2. Use useEffect for client-side operations')
  console.log('  3. Add suppressHydrationWarning if needed')
  console.log('')

  console.log('❌ Issue: Supabase connection failed')
  console.log('✅ Solutions:')
  console.log('  1. Verify Supabase URL format')
  console.log('  2. Check if Supabase project is active')
  console.log('  3. Verify RLS policies are correct')
  console.log('  4. Check network connectivity')
  console.log('')

  console.log('3️⃣ Vercel Environment Variables Setup:')
  console.log('')
  console.log('Go to Vercel Dashboard → Your Project → Settings → Environment Variables')
  console.log('')
  console.log('Add these variables:')
  console.log('')
  requiredVars.forEach(varName => {
    console.log(`${varName}=your_value_here`)
  })
  console.log('')

  console.log('4️⃣ Quick Fixes to Try:')
  console.log('')
  console.log('1. Redeploy with correct environment variables')
  console.log('2. Check Vercel function logs for detailed errors')
  console.log('3. Test locally with production build: npm run build && npm run start')
  console.log('4. Check browser console for specific error messages')
  console.log('5. Verify Supabase project is not paused')
  console.log('')

  console.log('5️⃣ Debug Steps:')
  console.log('')
  console.log('1. Check Vercel Function Logs:')
  console.log('   - Go to Vercel Dashboard → Functions tab')
  console.log('   - Look for error messages in logs')
  console.log('')
  console.log('2. Check Browser Console:')
  console.log('   - Open browser dev tools')
  console.log('   - Look for JavaScript errors')
  console.log('   - Check network tab for failed requests')
  console.log('')
  console.log('3. Test Environment Variables:')
  console.log('   - Add console.log in your app to check env vars')
  console.log('   - Verify they are available in production')
  console.log('')

  console.log('6️⃣ Emergency Fixes:')
  console.log('')
  console.log('If the app is completely broken:')
  console.log('1. Add error boundaries to catch client errors')
  console.log('2. Add loading states for async operations')
  console.log('3. Add try-catch blocks around Supabase calls')
  console.log('4. Add fallback UI for failed components')
  console.log('')

  // Generate a simple error boundary component
  const errorBoundaryCode = `
// Add this to your app/layout.tsx or create a separate error boundary
'use client'

import { useEffect } from 'react'

export default function ErrorBoundary({ error, reset }: { error: Error, reset: () => void }) {
  useEffect(() => {
    console.error('Client-side error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button 
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
`

  console.log('7️⃣ Error Boundary Code:')
  console.log('Add this error boundary to catch client-side errors:')
  console.log(errorBoundaryCode)
  console.log('')

  console.log('8️⃣ Next Steps:')
  console.log('')
  console.log('1. Check the specific error in Vercel logs')
  console.log('2. Update environment variables if needed')
  console.log('3. Redeploy the application')
  console.log('4. Test the application thoroughly')
  console.log('5. Monitor for any remaining issues')
  console.log('')

  console.log('🔧 Need more help?')
  console.log('1. Check Vercel documentation: https://vercel.com/docs')
  console.log('2. Check Next.js documentation: https://nextjs.org/docs')
  console.log('3. Check Supabase documentation: https://supabase.com/docs')
  console.log('')
}

// Run the debug
debugVercelIssues()
