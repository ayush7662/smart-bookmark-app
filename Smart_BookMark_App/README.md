# Smart Bookmark App

A bookmark manager with Google OAuth, built with Next.js (App Router), Supabase, and Tailwind CSS.

### Deployed on Vercel Live URL🎉:  https://smart-bookmark-app-1oie.vercel.app/
### Github URL🎉: https://github.com/ayush7662/smart-bookmark-app/tree/main/Smart_BookMark_App


### image url show after sign in:  https://drive.google.com/file/d/1nFCwWAkI9mZXcuMVBgiFAWUrm-8Y0GiQ/view?usp=sharing

## Project Structure

```
Smart_BookMark_App/
├── frontend/          # Next.js application (deploy to Vercel)
├── backend/           # Supabase migrations & config
├── package.json       # Root scripts
└── README.md
```

## Features

- **Google OAuth** – Sign in with Google only
- **Add bookmarks** – Save URL + title
- **Private bookmarks** – Row Level Security (RLS) per user
- **Real-time updates** – Bookmarks sync across tabs
- **Delete bookmarks** – Remove your own bookmarks

## Quick Start

### 1. Install dependencies

```bash
npm run setup
```

### 2. Configure environment

Copy `frontend/.env.example` to `frontend/.env.local` and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Set up Supabase

1. Run the migration: `backend/supabase/migrations/001_create_bookmarks.sql` in Supabase SQL Editor
2. Enable Google OAuth in Supabase Dashboard
3. Add redirect URL: `http://localhost:3000/auth/callback`

### 4. Run locally

```bash
npm run dev
```

Open http://localhost:3000

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repo to Vercel
2. Set **Root Directory** to `frontend`
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your Vercel URL, e.g. `https://your-app.vercel.app`)
4. Deploy

### Backend (Supabase)

Supabase is hosted - no separate deployment needed. Ensure:

- Migration is run
- Google OAuth is configured
- Add production redirect URL: `https://your-app.vercel.app/auth/callback`

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Supabase (Auth, PostgreSQL, Realtime)

## Documentation

- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)
