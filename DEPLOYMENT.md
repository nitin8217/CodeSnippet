# 🚀 Deployment Guide - CodeSnippets App

This guide covers multiple deployment options for the CodeSnippets application, with Railway being the recommended and currently deployed solution.

## 🌟 **Current Deployment**

**✅ LIVE APPLICATION**: [https://codesnippet-production-0833.up.railway.app](https://codesnippet-production-0833.up.railway.app)

**Health Check**: [https://codesnippet-production-0833.up.railway.app/api/health](https://codesnippet-production-0833.up.railway.app/api/health)

---

## 🚄 **Railway Deployment (Recommended)**

Railway is perfect for this app because it supports SQLite with persistent storage and provides seamless Next.js deployment.

### **Why Railway?**
- ✅ **SQLite Support** - Persistent file system for SQLite database
- ✅ **Auto-Detection** - Automatically detects Next.js applications
- ✅ **Docker Support** - Uses our optimized Dockerfile
- ✅ **Health Checks** - Built-in monitoring and restart policies
- ✅ **Free Tier** - Great for personal projects and demos

### **Deployment Steps**

#### **Prerequisites**
- GitHub account with your repository
- Railway account (sign up at [railway.app](https://railway.app))

#### **Step 1: Prepare Your Repository**
```bash
# Ensure your code is pushed to GitHub
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

#### **Step 2: Deploy to Railway**
1. **Go to** [railway.app](https://railway.app)
2. **Sign in** with your GitHub account
3. **Click** "New Project"
4. **Select** "Deploy from GitHub repo"
5. **Choose** your `CodeSnippet` repository
6. **Railway automatically**:
   - Detects Next.js project
   - Uses the Dockerfile for containerization
   - Sets up environment variables
   - Provides a public URL

#### **Step 3: Monitor Deployment**
- Watch the build logs in Railway dashboard
- Check health status at `/api/health`
- Verify database initialization

#### **Step 4: Configuration Files**

**`railway.json`** (already configured):
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**Environment Variables** (automatically set):
- `PORT=3000`
- `DATABASE_URL="file:/app/data/dev.db"`
- `NODE_ENV=production`

---

## 🐳 **Docker Deployment**

### **Local Docker Build**
```bash
# Build the image
docker build -t codesnippets .

# Run container
docker run -p 3000:3000 codesnippets

# Access at http://localhost:3000
```

### **Docker Compose** (Optional)
Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  codesnippets:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=file:/app/data/dev.db
    volumes:
      - snippets_data:/app/data
volumes:
  snippets_data:
```

Run with:
```bash
docker-compose up -d
```

---

## ☁️ **Alternative Deployment Options**

### **Vercel** (Static Export Only)
⚠️ **Note**: Vercel doesn't support SQLite databases in production. You'd need to switch to a different database.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Note: Requires database migration to PostgreSQL/MySQL
```

### **Netlify** (Static Export Only)
⚠️ **Note**: Similar to Vercel, requires database migration.

### **DigitalOcean App Platform**
✅ **Supports**: Docker containers with persistent storage

1. Connect GitHub repository
2. Choose Docker deployment
3. Configure persistent storage for `/app/data`
4. Deploy

### **Heroku**
⚠️ **Note**: Heroku's ephemeral filesystem doesn't work well with SQLite. Requires database migration.

---

## 🗄️ **Database Considerations**

### **SQLite (Current)**
- ✅ **Perfect for**: Railway, Docker, VPS deployments
- ✅ **Benefits**: No external dependencies, file-based, fast
- ❌ **Limitations**: Not suitable for Vercel/Netlify

### **Production Database Migration** (If Needed)
If deploying to platforms that don't support SQLite:

```bash
# Install PostgreSQL adapter
npm install pg @types/pg

# Update schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

# Migrate
npx prisma migrate dev
```

---

## 🔧 **Environment Configuration**

### **Development**
```bash
# .env.local
DATABASE_URL="file:./prisma/dev.db"
```

### **Production (Railway)**
```bash
# Set automatically by Railway
DATABASE_URL="file:/app/data/dev.db"
PORT=3000
NODE_ENV=production
```

### **Production (Other Platforms)**
```bash
# .env.production
DATABASE_URL="your-database-url"
PORT=3000
NODE_ENV=production
```

---

## 🔍 **Health Monitoring**

### **Health Check Endpoint**
```
GET /api/health
```

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2025-08-01T13:00:00.000Z",
  "app": "CodeSnippets"
}
```

### **Monitoring Tools**
- **Railway**: Built-in metrics and logs
- **Docker**: Container health checks
- **External**: Use services like UptimeRobot for monitoring

---

## 🚨 **Troubleshooting**

### **Common Issues**

#### **Build Fails**
```bash
# Check build logs
# Ensure all dependencies are in package.json
# Verify Prisma schema is correct
```

#### **Database Connection Errors**
```bash
# Check DATABASE_URL environment variable
# Ensure database file permissions
# Verify Prisma client generation
```

#### **Health Check Fails**
```bash
# Check if app is running on correct port
# Verify /api/health endpoint is accessible
# Check startup script execution
```

### **Debug Commands**
```bash
# Check application status
curl https://codesnippet-production-0833.up.railway.app/api/health

# View Railway logs (if using Railway CLI)
railway logs

# Local database inspection
npx prisma studio
```

---

## 📈 **Performance Optimization**

### **Railway Optimization**
- ✅ **Dockerfile** optimized for small image size
- ✅ **Multi-stage build** reduces deployment size
- ✅ **Health checks** ensure reliability
- ✅ **Persistent storage** for SQLite

### **Monitoring**
- Response times via Railway dashboard
- Error tracking via application logs
- Database performance via Prisma metrics

---

## 🔐 **Security Considerations**

### **Production Checklist**
- ✅ Environment variables properly set
- ✅ Database file permissions configured
- ✅ Health check endpoint secured
- ✅ Docker container runs as non-root user
- ✅ HTTPS enabled (automatic with Railway)

---

## 📞 **Support**

### **Railway-Specific Issues**
- [Railway Documentation](https://docs.railway.app/)
- [Railway Community](https://discord.gg/railway)

### **Application Issues**
- [GitHub Issues](https://github.com/nitin8217/CodeSnippet/issues)
- [Project Repository](https://github.com/nitin8217/CodeSnippet)

---

## 🎉 **Success!**

Your CodeSnippets app is now deployed and accessible at:
**[https://codesnippet-production-0833.up.railway.app](https://codesnippet-production-0833.up.railway.app)**

The deployment includes:
- ✅ Automatic database initialization
- ✅ Health monitoring
- ✅ Persistent SQLite storage
- ✅ Optimized Docker container
- ✅ HTTPS enabled
- ✅ Auto-restart on failures

---

**Happy coding! 🚀**
