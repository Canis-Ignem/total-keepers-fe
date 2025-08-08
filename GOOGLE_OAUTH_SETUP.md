# Google OAuth Setup - Detailed Guide

## Step-by-Step Google Client ID Setup

### 1. **Access Google Cloud Console**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account

### 2. **Create or Select a Project**
1. **If you don't have a project:**
   - Click the project dropdown at the top
   - Click "New Project"
   - Enter a project name (e.g., "Total Keepers Auth")
   - Click "Create"

2. **If you have an existing project:**
   - Select it from the project dropdown

### 3. **Enable Required APIs**
1. In the left sidebar, go to **"APIs & Services" > "Library"**
2. Search for **"Google+ API"** (or "Google People API")
3. Click on it and press **"Enable"**
4. Also search for **"Google Identity Services"** and enable it

### 4. **Configure OAuth Consent Screen**
1. Go to **"APIs & Services" > "OAuth consent screen"**
2. Choose **"External"** (unless you have a Google Workspace)
3. Fill in the required fields:
   - **App name**: "Total Keepers"
   - **User support email**: Your email
   - **Developer contact email**: Your email
   - **App domain** (optional): Your website domain
4. Click **"Save and Continue"**

5. **Add Scopes** (next page):
   - Click **"Add or Remove Scopes"**
   - Add these scopes:
     - `../auth/userinfo.email`
     - `../auth/userinfo.profile`
     - `openid`
   - Click **"Update"** then **"Save and Continue"**

6. **Test Users** (if in testing mode):
   - Add your email and any other test users
   - Click **"Save and Continue"**

### 5. **Create OAuth 2.0 Credentials**
1. Go to **"APIs & Services" > "Credentials"**
2. Click **"+ Create Credentials"**
3. Select **"OAuth client ID"**
4. Choose **"Web application"**
5. Fill in the details:
   - **Name**: "Total Keepers Frontend"
   - **Authorized JavaScript origins**:
     - `http://localhost:3000`
     - `http://127.0.0.1:3000`
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google`
     - `http://127.0.0.1:3000/api/auth/callback/google`
6. Click **"Create"**

### 6. **Get Your Credentials**
1. A popup will show your **Client ID** and **Client Secret**
2. **Copy both values** - you'll need them for your `.env.local` file
3. You can also download the JSON file for backup

### 7. **Add to Environment Variables**
Create or update your `.env.local` file:

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 8. **Generate NextAuth Secret**
Run this command in your terminal to generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET`.

### 9. **Test Your Setup**
1. Restart your Next.js development server
2. Go to `http://localhost:3000/en/auth/signin`
3. Click the Google sign-in button
4. You should be redirected to Google's OAuth flow

## Important Notes

### **For Production:**
When you're ready to deploy, you'll need to:

1. **Update redirect URIs** in Google Cloud Console:
   - Add your production domain: `https://yourdomain.com/api/auth/callback/google`

2. **Update environment variables** for production:
   - Use your production domain in `NEXTAUTH_URL`

### **Security Tips:**
- Never commit your `.env.local` file to version control
- Use different OAuth apps for development and production
- Regularly rotate your client secrets

### **Troubleshooting:**
- **"redirect_uri_mismatch"**: Check that your redirect URI exactly matches what's in Google Cloud Console
- **"unauthorized_client"**: Ensure your JavaScript origins are correctly set
- **"access_denied"**: Check if your app is still in testing mode and you're using a test user

## Quick Reference

Your Google OAuth redirect URI for development:
```
http://localhost:3000/api/auth/callback/google
```

Your `.env.local` should look like:
```bash
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-AbCdEfGhIjKlMnOpQrStUvWxYz
NEXTAUTH_SECRET=generated-secret-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Once you have these set up, the Google SSO button in your application will work! 🎉
