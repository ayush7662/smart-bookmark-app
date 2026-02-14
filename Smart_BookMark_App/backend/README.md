# Backend - Supabase

Database, Auth, and Realtime are handled by Supabase. No separate server to deploy.

## Setup

### 1. Create Supabase project

At [supabase.com](https://supabase.com) → New Project

### 2. Run migration

1. Open Supabase Dashboard → SQL Editor
2. Copy contents of `supabase/migrations/001_create_bookmarks.sql`
3. Run the query

This creates the `bookmarks` table with Row Level Security (RLS) and enables Realtime.

### 3. Configure Auth

**Authentication → Providers → Google**
- Enable Google
- Add Client ID and Client Secret from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

**Authentication → URL Configuration**
- Site URL: `http://localhost:3000` (dev) or `https://your-app.vercel.app` (prod)
- Redirect URLs: Add `http://localhost:3000/auth/callback` and `https://your-app.vercel.app/auth/callback`

### 4. Google Cloud Console

Add this to Authorized redirect URIs in your OAuth client:

```
https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
```

## Folder Structure

```
backend/
└── supabase/
    └── migrations/
        └── 001_create_bookmarks.sql
```
