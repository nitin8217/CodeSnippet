#!/bin/bash

echo "🔍 Pre-deployment checks..."

# Check if required files exist
echo "📁 Checking required files..."
required_files=("package.json" "prisma/schema.prisma" "next.config.ts")

for file in "${required_files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

# Check if all dependencies are installed
echo "📦 Checking dependencies..."
if [[ -d "node_modules" ]]; then
    echo "✅ Dependencies installed"
else
    echo "⚠️ Installing dependencies..."
    npm install
fi

# Check if Prisma client is generated
echo "🔧 Checking Prisma client..."
if [[ -d "src/generated/prisma" ]]; then
    echo "✅ Prisma client generated"
else
    echo "⚠️ Generating Prisma client..."
    npx prisma generate
fi

# Check if database exists and run migrations
echo "🗄️ Checking database..."
if [[ -f "prisma/dev.db" ]]; then
    echo "✅ Database exists"
else
    echo "⚠️ Creating database and running migrations..."
    npx prisma migrate dev --name init
fi

# Test build
echo "🏗️ Testing build..."
npm run build

if [[ $? -eq 0 ]]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Your app is ready for deployment!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Push to GitHub: git add . && git commit -m 'Ready for deployment' && git push"
    echo "2. Deploy on Railway: https://railway.app"
    echo "3. Or use Docker: docker build -t codesnippets ."
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi
