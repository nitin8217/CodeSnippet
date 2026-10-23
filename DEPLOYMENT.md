# Deployment Guide

CodeSnippet is a Next.js application that stores snippets in Supabase PostgreSQL through the Supabase JavaScript client.

## Prerequisites

- A GitHub account
- A Supabase project
- A Vercel account
- Node.js 20+ for local testing

## 1. Configure Supabase

1. Open your Supabase project.
2. Go to **Project Settings → API**.
3. Copy the **Project URL** and **Publishable key**.
4. Open **SQL Editor**.
5. Copy all contents of [`supabase/schema.sql`](./supabase/schema.sql) into a new query.
6. Click **Run**.

The SQL creates the `Snippet` table and its row-level security policies.

## 2. Test locally

Create a local environment file:

```powershell
Copy-Item .env.example .env
```

Edit `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_your-key"
PORT=3000
```

Install and run:

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`, create a test snippet, and confirm it appears in Supabase.

## 3. Push to GitHub

```powershell
git add .
git commit -m "Prepare Supabase deployment"
git push origin main
```

Never commit `.env`. The publishable key is intended for client-side use, but the `.env` file should still remain out of source control.

## 4. Deploy to Vercel

1. Open [Vercel](https://vercel.com).
2. Sign in with GitHub.
3. Select **Add New → Project**.
4. Import the `CodeSnippet` repository.
5. Keep the framework as **Next.js**.
6. Keep the build command as `npm run build`.
7. Add these environment variables:

```text
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your-key
```

Add them for Production, Preview, and Development, then click **Deploy**.

## 5. Verify

Open:

```text
https://your-project.vercel.app
https://your-project.vercel.app/api/health
```

Create, edit, and delete a test snippet. Confirm the changes in Supabase **Table Editor → Snippet**.

## Other hosting providers

The project can also run on Render, Netlify, or another Node.js host. Configure the same two `NEXT_PUBLIC_*` environment variables and use:

```text
Build command: npm run build
Start command: npm start
```

## Docker

Build the image:

```powershell
docker build -t codesnippets .
```

Run it with the Supabase values:

```powershell
docker run -p 3000:3000 `
  -e NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co" `
  -e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_your-key" `
  codesnippets
```

## Security

This application currently has no authentication. The included SQL policies allow anonymous users to read, create, update, and delete snippets. Anyone who can access the deployed site can modify its data.

For private snippets, add Supabase Auth and change the policies so users can access only their own rows.

