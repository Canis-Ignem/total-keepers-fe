# 🔐 Complete Google OAuth Setup Guide

> **Goal**: Get your Google Client ID and Secret for SSO authentication in Total Keepers

---

## 📋 **Prerequisites**
- A Google account
- 10-15 minutes of your time
- Your Total Keepers app running locally

---

## 🚀 **Step-by-Step Setup**

### **Step 1: Access Google Cloud Console**

1. 🌐 Navigate to [**Google Cloud Console**](https://console.cloud.google.com/)
2. 🔑 **Sign in** with your Google account

---

### **Step 2: Create/Select Project**

#### **Option A: Create New Project**
1. 📊 Click the **project dropdown** at the top of the page
2. ➕ Click **"New Project"**
3. 📝 Enter project details:
   ```
   Project name: Total Keepers Auth
   Organization: (leave default or select your org)
   ```
4. ✅ Click **"Create"**

#### **Option B: Use Existing Project**
1. 📊 Click the **project dropdown**
2. 🎯 **Select** your existing project

---

### **Step 3: Enable Required APIs**

> ⚠️ **Important**: You must enable these APIs for OAuth to work

1. 🔧 In the left sidebar, navigate to:
   ```
   APIs & Services → Library
   ```

2. 🔍 **Search and Enable** these APIs:
   - **Google+ API** (or "Google People API")
   - **Google Identity Services API**

3. For each API:
   - Click on the API name
   - Press **"Enable"** button
   - Wait for confirmation

---

### **Step 4: Configure OAuth Consent Screen**

> 🛡️ This tells users what your app does when they sign in

1. 🎛️ Go to: `APIs & Services → OAuth consent screen`

2. 🌍 Choose **"External"** user type
   > Unless you have Google Workspace, choose External

3. 📝 **Fill in App Information**:
   ```
   App name: Total Keepers
   User support email: your-email@example.com
   App logo: (optional)
   App domain: (optional - your website)
   Authorized domains: (optional)
   Developer contact information: your-email@example.com
   ```

4. ✅ Click **"Save and Continue"**

#### **Add Scopes (Step 4 continued)**
1. 🔒 Click **"Add or Remove Scopes"**
2. ✅ **Select these scopes**:
   ```
   ../auth/userinfo.email
   ../auth/userinfo.profile  
   openid
   ```
3. 🔄 Click **"Update"** then **"Save and Continue"**

#### **Test Users (Development Only)**
1. 👥 Add test users (including yourself):
   ```
   your-email@example.com
   teammate1@example.com
   teammate2@example.com
   ```
2. ✅ Click **"Save and Continue"**

---

### **Step 5: Create OAuth Credentials**

> 🔑 This generates your Client ID and Secret

1. 🛠️ Go to: `APIs & Services → Credentials`

2. ➕ Click **"+ Create Credentials"**

3. 🎯 Select **"OAuth client ID"**

4. 🌐 Choose **"Web application"**

5. 📝 **Configure your OAuth client**:

   **Name:**
   ```
   Total Keepers Frontend
   ```

   **Authorized JavaScript origins:**
   ```
   http://localhost:3000
   http://127.0.0.1:3000
   ```

   **Authorized redirect URIs:**
   ```
   http://localhost:3000/api/auth/callback/google
   http://127.0.0.1:3000/api/auth/callback/google
   ```

6. ✅ Click **"Create"**

---

### **Step 6: Get Your Credentials**

🎉 **Success!** A popup will show your credentials:

```
Client ID: 123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
Client Secret: GOCSPX-AbCdEfGhIjKlMnOpQrStUvWxYz
```

> 💾 **Important**: Copy both values immediately! You can also download the JSON file.

---

## 🔧 **Configuration**

### **Step 7: Update Your Environment File**

1. 📁 In your Total Keepers frontend project, create/edit `.env.local`:

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-AbCdEfGhIjKlMnOpQrStUvWxYz

# NextAuth Configuration
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=http://localhost:3000

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### **Step 8: Generate NextAuth Secret**

🔐 **Run this command** in your terminal:

```bash
openssl rand -base64 32
```

📋 **Copy the output** and use it as your `NEXTAUTH_SECRET`

---

## 🧪 **Testing Your Setup**

### **Step 9: Test Google SSO**

1. 🖥️ **Start your development server** (if not already running):
   ```bash
   npm run dev
   ```

2. 🌐 **Navigate to sign-in page**:
   ```
   http://localhost:3000/en/auth/signin
   ```

3. 🔘 **Click the Google sign-in button**

4. ✅ **Expected flow**:
   - Redirected to Google OAuth
   - Asked to authorize "Total Keepers"
   - Redirected back to your app
   - Signed in successfully!

---

## 🚨 **Troubleshooting**

### **Common Errors & Solutions**

| Error | Cause | Solution |
|-------|-------|----------|
| `redirect_uri_mismatch` | Redirect URI doesn't match Google Console | Double-check your redirect URI is exactly: `http://localhost:3000/api/auth/callback/google` |
| `unauthorized_client` | JavaScript origins not set | Add `http://localhost:3000` to Authorized JavaScript origins |
| `access_denied` | App in testing mode | Add your email to test users in OAuth consent screen |
| `invalid_client` | Wrong Client ID/Secret | Verify your `.env.local` has correct credentials |

### **Debug Mode**

🐛 **Enable NextAuth debug mode** by adding to `.env.local`:
```bash
NEXTAUTH_DEBUG=true
```

---

## 🌍 **Production Setup**

When you're ready to deploy:

### **Update Google Cloud Console:**
1. ✏️ **Edit your OAuth client**
2. ➕ **Add production URLs**:
   ```
   Authorized JavaScript origins:
   - https://yourdomain.com
   
   Authorized redirect URIs:
   - https://yourdomain.com/api/auth/callback/google
   ```

### **Update Environment Variables:**
```bash
NEXTAUTH_URL=https://yourdomain.com
```

---

## 🔒 **Security Best Practices**

- 🚫 **Never commit** `.env.local` to version control
- 🔄 **Use different OAuth apps** for development and production  
- 🔐 **Regularly rotate** your client secrets
- 👥 **Remove test users** before going to production

---

## 📞 **Need Help?**

If you're stuck:
1. 📖 Check the [Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2)
2. 🔍 Search for your specific error message
3. 💬 Ask in the NextAuth.js community

---

## ✅ **Success Checklist**

- [ ] Google Cloud project created
- [ ] APIs enabled (Google+ API, Google Identity Services)
- [ ] OAuth consent screen configured
- [ ] OAuth client created with correct redirect URIs
- [ ] Client ID and Secret copied
- [ ] `.env.local` file updated
- [ ] NextAuth secret generated
- [ ] Google sign-in button working
- [ ] User can authenticate and access protected pages

---

🎉 **Congratulations!** You now have Google SSO working in your Total Keepers application!
