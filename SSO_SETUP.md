# SSO Authentication Setup Guide

## Overview

This guide explains how to set up and configure SSO authentication with Google, Microsoft, and Facebook in your Total Keepers frontend application.

## Features Implemented

✅ **NextAuth.js Integration** - Complete OAuth flow handling  
✅ **Google SSO** - Sign in with Google accounts  
✅ **Microsoft SSO** - Sign in with Microsoft/Azure AD accounts  
✅ **Facebook SSO** - Sign in with Facebook accounts  
✅ **Email/Password Authentication** - Traditional login/registration  
✅ **Backend Integration** - Seamless communication with FastAPI backend  
✅ **Redux State Management** - Centralized authentication state  
✅ **Protected Routes** - Authentication guards  
✅ **User Profile Management** - Update user information  
✅ **Responsive UI** - Mobile-friendly authentication components  

## Configuration Steps

### 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in your OAuth credentials:

```bash
cp .env.example .env.local
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth client ID
5. Set authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Add credentials to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

> 📋 **Need detailed help?** See [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) for a complete step-by-step guide with screenshots and troubleshooting.

### 3. Microsoft/Azure AD Setup

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to Azure Active Directory → App registrations
3. Click "New registration"
4. Set redirect URI: `http://localhost:3000/api/auth/callback/azure-ad`
5. Go to Certificates & secrets → New client secret
6. Add credentials to `.env.local`:
   ```
   AZURE_AD_CLIENT_ID=your-azure-ad-client-id
   AZURE_AD_CLIENT_SECRET=your-azure-ad-client-secret
   AZURE_AD_TENANT_ID=your-azure-ad-tenant-id
   ```

### 4. Facebook OAuth Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or select existing
3. Add Facebook Login product
4. Set valid OAuth redirect URIs:
   - `http://localhost:3000/api/auth/callback/facebook`
5. Add credentials to `.env.local`:
   ```
   FACEBOOK_CLIENT_ID=your-facebook-app-id
   FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
   ```

### 5. NextAuth Secret

Generate a secure random string for NextAuth:

```bash
openssl rand -base64 32
```

Add to `.env.local`:
```
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=http://localhost:3000
```

### 6. Backend API URL

Set your FastAPI backend URL:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Usage

### Authentication Flow

1. **SSO Login**: Users click on Google/Microsoft/Facebook buttons
2. **OAuth Flow**: NextAuth.js handles the complete OAuth flow
3. **Backend Sync**: User data is sent to your FastAPI backend
4. **JWT Token**: Backend returns JWT token for API authentication
5. **State Management**: User info stored in Redux store

### Available Routes

- `/auth/signin` - Sign in page with SSO options (works with locale routing: `/en/auth/signin`, `/es/auth/signin`)
- `/auth/signup` - Registration page with SSO options (works with locale routing: `/en/auth/signup`, `/es/auth/signup`)
- `/auth/error` - Authentication error handling
- `/profile` - User profile management (works with locale routing: `/en/profile`, `/es/profile`)

### Using Authentication in Components

```tsx
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please sign in</div>;
  }
  
  return (
    <div>
      Welcome, {user?.first_name}!
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
```

### Protected Routes

```tsx
import { AuthGuard } from '@/components/auth/AuthGuard';

function ProtectedPage() {
  return (
    <AuthGuard requireAuth={true}>
      <div>This content requires authentication</div>
    </AuthGuard>
  );
}
```

## Backend Integration

The frontend automatically communicates with your FastAPI backend using the endpoints documented in `AUTHENTICATION_GUIDE.md`:

- `POST /api/v1/auth/social-login` - SSO authentication
- `POST /api/v1/auth/login` - Email/password login
- `POST /api/v1/auth/register` - User registration
- `GET /api/v1/auth/me` - Get current user
- `PUT /api/v1/auth/me` - Update user profile

## Security Features

- **JWT Tokens**: Secure token-based authentication
- **Token Validation**: Automatic token validation and refresh
- **Secure Storage**: Tokens stored in localStorage with validation
- **Error Handling**: Comprehensive error handling for auth failures
- **CSRF Protection**: NextAuth.js provides CSRF protection
- **Secure Cookies**: Session cookies with secure flags

## Troubleshooting

### Common Issues

1. **OAuth Redirect Mismatch**: Ensure redirect URIs match exactly in OAuth providers
2. **Environment Variables**: Check all required env vars are set
3. **CORS Issues**: Ensure backend allows requests from frontend domain
4. **Token Expiry**: Check if JWT tokens are configured correctly in backend
5. **Redux Provider Error**: Ensure ReduxProvider wraps SessionProvider in layout.tsx:
   ```tsx
   <ReduxProvider>
     <SessionProvider>
       {/* Your app content */}
     </SessionProvider>
   </ReduxProvider>
   ```
6. **Internationalized Routing**: Auth pages are created within the `[locale]` folder structure to support i18n routing (`/en/auth/signin`, `/es/auth/signin`, etc.)
7. **Input Field Visibility**: Fixed text input fields that were difficult to see by:
   - Adding explicit white background and dark text colors
   - Increasing border width for better visibility
   - Forcing light theme for all form inputs regardless of system dark mode
   - Adding proper placeholder text colors

### Debug Mode

Enable debug mode in development:
```bash
NEXTAUTH_DEBUG=true
```

### NextAuth Warnings

You may see these warnings during development (they're safe to ignore if you haven't configured OAuth yet):
- `[next-auth][warn][NEXTAUTH_URL]` - Set NEXTAUTH_URL in .env.local
- `[next-auth][warn][NO_SECRET]` - Set NEXTAUTH_SECRET in .env.local

## Testing the Implementation

### 1. **Quick Test Without OAuth Setup**
Even without configuring OAuth providers, you can test:
- Email/password registration at `http://localhost:3000/en/auth/signup` or `http://localhost:3000/es/auth/signup`
- Email/password login at `http://localhost:3000/en/auth/signin` or `http://localhost:3000/es/auth/signin`
- User profile at `http://localhost:3000/en/profile` or `http://localhost:3000/es/profile` (after login)

### 2. **Test SSO (After OAuth Setup)**
Once you've configured your OAuth providers:
- Click SSO buttons on signin/signup pages
- Test Google, Microsoft, and Facebook authentication flows
- Verify user data sync with backend
- Check profile page shows OAuth user information

### 3. **Backend Integration Test**
Ensure your FastAPI backend is running and:
- Check API calls are reaching backend with JWT tokens
- Verify user data is being created/updated in database
- Test protected endpoints work with authentication

## Production Deployment

1. Update environment variables for production domains
2. Configure OAuth providers with production redirect URIs
3. Use secure NEXTAUTH_SECRET in production
4. Enable HTTPS for all OAuth flows
5. Configure proper CORS settings in backend

## File Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── SSOButton.tsx
│   │   ├── UserProfile.tsx
│   │   └── AuthGuard.tsx
│   └── providers/
│       └── SessionProvider.tsx
├── hooks/
│   └── useAuth.ts
├── lib/
│   ├── api/
│   │   └── auth.ts
│   └── auth.ts
├── store/
│   └── authSlice.ts
├── types/
│   └── auth.ts
└── app/
    ├── api/auth/[...nextauth]/route.ts
    └── [locale]/
        ├── auth/
        │   ├── signin/page.tsx
        │   ├── signup/page.tsx
        │   └── error/page.tsx
        └── profile/page.tsx
```

The SSO authentication system is now fully integrated and ready to use! 🎉

## Quick Start Summary

### ✅ **Ready to Test Now:**
- Visit `http://localhost:3000/en/auth/signin` or `http://localhost:3000/es/auth/signin`
- Try email/password registration and login
- Test the user profile page after login
- See authentication menu in the header

### 🔧 **To Enable SSO:**
1. Copy `.env.example` to `.env.local`
2. Fill in OAuth credentials from Google, Microsoft, and Facebook
3. Set `NEXTAUTH_SECRET` and `NEXTAUTH_URL`
4. Test SSO buttons on signin/signup pages

### 🚀 **Integration Complete:**
- ✅ Internationalized routing support (`/en/auth/*`, `/es/auth/*`)
- ✅ Redux state management
- ✅ NextAuth.js OAuth handling
- ✅ FastAPI backend integration
- ✅ Responsive authentication UI
- ✅ Protected routes and guards

Your authentication system is production-ready! 🎯
