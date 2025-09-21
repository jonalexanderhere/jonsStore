# OAuth Setup Guide

## 🔐 Google OAuth Configuration

This guide will help you set up Google OAuth authentication for your JonsStore application.

### 1. Google Cloud Console Setup

#### Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "JonsStore OAuth"
4. Click "Create"

#### Step 2: Enable Google+ API
1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

#### Step 3: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Set the name: "JonsStore Web Client"
5. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (for development)
   - `https://yourdomain.com/auth/callback` (for production)
6. Click "Create"
7. Copy the **Client ID** and **Client Secret**

### 2. Supabase Configuration

#### Step 1: Configure OAuth Provider
1. Go to your Supabase dashboard
2. Navigate to "Authentication" → "Providers"
3. Find "Google" and toggle it ON
4. Enter your Google OAuth credentials:
   - **Client ID**: Your Google Client ID
   - **Client Secret**: Your Google Client Secret
5. Set the redirect URL: `https://your-project-ref.supabase.co/auth/v1/callback`
6. Click "Save"

#### Step 2: Update Site URL
1. In Supabase dashboard, go to "Authentication" → "URL Configuration"
2. Set **Site URL**: `http://localhost:3000` (development) or `https://yourdomain.com` (production)
3. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback`

### 3. Environment Variables

Update your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Testing OAuth

#### Development Testing
1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/auth/login`
3. Click "Login dengan Google"
4. Complete the OAuth flow
5. You should be redirected back to your app

#### Production Testing
1. Deploy your application
2. Update Google OAuth settings with production URLs
3. Update Supabase settings with production URLs
4. Test the OAuth flow in production

### 5. Troubleshooting

#### Common Issues

**Error: "unsupported provider"**
- Check if Google OAuth is enabled in Supabase
- Verify the provider name is exactly "google"

**Error: "missing OAuth secret"**
- Ensure Google Client Secret is set in Supabase
- Check that the secret is correct and not expired

**Error: "redirect_uri_mismatch"**
- Verify redirect URIs in Google Cloud Console
- Check Supabase redirect URL configuration
- Ensure URLs match exactly (including http/https)

**Error: "invalid_client"**
- Verify Client ID is correct
- Check if the OAuth consent screen is configured
- Ensure the project is not in testing mode (if needed)

#### Debug Steps
1. Check browser console for detailed error messages
2. Verify environment variables are loaded correctly
3. Test OAuth flow in Google Cloud Console
4. Check Supabase logs in the dashboard
5. Verify database triggers are working

### 6. Security Best Practices

#### Environment Variables
- Never commit `.env.local` to version control
- Use different credentials for development and production
- Rotate secrets regularly

#### OAuth Configuration
- Use HTTPS in production
- Set appropriate OAuth scopes
- Configure OAuth consent screen properly
- Monitor OAuth usage and errors

#### Database Security
- Ensure RLS policies are properly configured
- Validate user data on the server side
- Implement proper error handling

### 7. Production Deployment

#### Vercel Deployment
1. Add environment variables in Vercel dashboard
2. Update Google OAuth settings with production domain
3. Update Supabase settings with production domain
4. Test OAuth flow after deployment

#### Other Platforms
1. Set environment variables in your hosting platform
2. Update OAuth redirect URIs
3. Update Supabase configuration
4. Test thoroughly

### 8. Additional OAuth Providers

#### Facebook OAuth
1. Create Facebook App in [Facebook Developers](https://developers.facebook.com/)
2. Configure OAuth settings
3. Add credentials to Supabase
4. Update environment variables

#### GitHub OAuth
1. Create GitHub OAuth App in GitHub Settings
2. Configure OAuth settings
3. Add credentials to Supabase
4. Update environment variables

### 9. Monitoring and Analytics

#### OAuth Metrics
- Track successful logins
- Monitor failed authentication attempts
- Analyze user registration sources
- Monitor OAuth provider performance

#### Error Tracking
- Set up error logging for OAuth failures
- Monitor authentication errors
- Track redirect issues
- Monitor database trigger failures

This guide should help you set up Google OAuth authentication properly. If you encounter any issues, check the troubleshooting section or refer to the official Supabase and Google OAuth documentation.
