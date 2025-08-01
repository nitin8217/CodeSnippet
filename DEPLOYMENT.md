# 🚀 Deployment Guide - CodeSnippets App

Your CodeSnippets application is ready for deployment! Here are the best options for deploying with SQLite:

## 🌟 **Recommended: Railway** (Easiest & Best for SQLite)

Railway is perfect for your app because it supports SQLite with persistent storage.

### Steps to Deploy on Railway:

1. **Push to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Sign up for Railway**:
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account

3. **Deploy**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will automatically detect it's a Next.js app
   - Click "Deploy"

4. **Environment Variables** (Railway will set these automatically):
   - `DATABASE_URL` will be set to use SQLite
   - `PORT` will be configured

5. **Domain**:
   - Railway provides a free `.railway.app` domain
   - You can add a custom domain later

---

## 🐳 **Alternative: Docker + Any VPS**

Use the included Dockerfile to deploy anywhere:

```bash
# Build the image
docker build -t codesnippets .

# Run the container
docker run -p 3000:3000 -v $(pwd)/data:/app/data codesnippets
```

---

## 🎯 **Alternative: Render**

Render also supports SQLite with persistent disks:

1. Connect your GitHub repo to Render
2. Create a new Web Service
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Add a persistent disk at `/app/data`

---

## 🔧 **Database Considerations**

### For Production, Consider Upgrading to PostgreSQL:

If you want to scale later, you can easily switch to PostgreSQL:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Install PostgreSQL adapter:
   ```bash
   npm install pg @types/pg
   ```

3. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

### Current SQLite Setup:
- ✅ Perfect for small to medium apps
- ✅ No external database required
- ✅ Data persists with Railway/Render
- ✅ Easy to backup (single file)

---

## 🚀 **Quick Deploy Commands**

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Build the app
npm run build

# Start production server
npm start
```

---

## 📊 **Recommended Platform Comparison**

| Platform | SQLite Support | Free Tier | Ease of Use | Custom Domain |
|----------|---------------|-----------|-------------|---------------|
| **Railway** | ✅ Excellent | ✅ Yes | ⭐⭐⭐⭐⭐ | ✅ Yes |
| **Render** | ✅ Good | ✅ Yes | ⭐⭐⭐⭐ | ✅ Yes |
| **Vercel** | ❌ No SQLite | ✅ Yes | ⭐⭐⭐⭐⭐ | ✅ Yes |
| **Netlify** | ❌ No SQLite | ✅ Yes | ⭐⭐⭐⭐ | ✅ Yes |

**Winner: Railway** - Best for your current SQLite setup!

---

## 🎉 **Ready to Deploy!**

Your app is configured with:
- ✅ Dark theme UI
- ✅ Interactive code editor with syntax highlighting
- ✅ Code execution for JavaScript & Python
- ✅ SQLite database with Prisma
- ✅ Responsive design
- ✅ Loading states and animations
- ✅ Modern button interactions

Choose Railway for the easiest deployment experience!
