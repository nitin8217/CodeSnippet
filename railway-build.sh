#!/bin/bash
# Build script for Railway deployment

echo "🚀 Starting Railway deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma client with explicit schema path
echo "🔧 Generating Prisma client..."
npx prisma generate --schema=./prisma/schema.prisma

# Run database migrations with explicit schema path
echo "🗄️ Running database migrations..."
npx prisma migrate deploy --schema=./prisma/schema.prisma

# Build the Next.js application
echo "🏗️ Building Next.js application..."
npm run build

echo "✅ Build completed successfully!"
