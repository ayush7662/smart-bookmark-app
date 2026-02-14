# Frontend - Smart Bookmark App

Next.js application (App Router) with Supabase Auth and Tailwind CSS.

## Setup

```bash
npm install
```

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Development

```bash
npm run dev
```

Runs at http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Import project, set root to `frontend` (or this directory)
2. Add env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`
3. Deploy

## Folder Structure

```
frontend/
├── src/
│   ├── app/           # App Router pages & routes
│   ├── components/    # React components
│   ├── lib/           # Supabase client, utilities
│   └── types/         # TypeScript types
├── public/
└── ...
```
