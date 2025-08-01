# 📝 CodeSnippets - Modern Code Snippet Manager

A beautiful, modern web application for managing and sharing your code snippets. Built with Next.js 15, Prisma, SQLite, and TailwindCSS.

![CodeSnippets App](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-6.13.0-2D3748?style=for-the-badge&logo=prisma)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Railway](https://img.shields.io/badge/Railway-Deployed-success?style=for-the-badge&logo=railway&logoColor=white)

## 🌐 Live Demo

**🚀 [Try CodeSnippets Live](https://codesnippet-production-0833.up.railway.app)**

![CodeSnippets Screenshot](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=CodeSnippets+App+Screenshot)

## ✨ Features

- 🎨 **Modern UI** - Beautiful, responsive design with dark theme
- 📝 **Code Editor** - Syntax highlighting with CodeMirror
- 🔍 **Syntax Support** - JavaScript, Python, Java, C++, and more
- 💾 **SQLite Database** - Lightweight, file-based storage
- 🚀 **Fast Performance** - Optimized Next.js 15 with App Router
- 📱 **Mobile Friendly** - Responsive design for all devices
- 🔥 **Hot Reload** - Development with Turbopack
- 🐳 **Docker Ready** - Containerized deployment
- ⚡ **Server Actions** - Modern form handling with Next.js
- 🔒 **Type Safe** - Full TypeScript implementation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.4.5, React 19, TypeScript
- **Styling**: TailwindCSS 4.0, Shadcn/ui components
- **Database**: SQLite with Prisma ORM 6.13.0
- **Code Editor**: CodeMirror with syntax highlighting
- **Deployment**: Railway (Docker)
- **Development**: Turbopack, ESLint, TypeScript

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nitin8217/CodeSnippet.git
   cd CodeSnippet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run postinstall
   
   # Create and migrate database
   npx prisma migrate dev
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
CodeSnippets/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout
│   │   ├── api/               # API routes
│   │   │   └── health/        # Health check endpoint
│   │   └── snippet/           # Snippet routes
│   │       ├── new/           # Create snippet
│   │       └── [id]/          # View/Edit snippet
│   ├── components/            # React components
│   │   ├── ui/               # Shadcn/ui components
│   │   └── EditSnippetForm.tsx
│   ├── lib/                  # Utilities
│   │   ├── prisma.ts         # Database client
│   │   └── utils.ts          # Helper functions
│   ├── actions/              # Server actions
│   └── generated/            # Prisma generated files
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Database migrations
├── Dockerfile               # Docker configuration
├── railway.json            # Railway deployment config
└── package.json            # Dependencies
```

## 🗄️ Database Schema

```prisma
model Snippet {
  id    Int    @id @default(autoincrement())
  title String
  code  String
}
```

## 🎯 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes
- `npm run db:studio` - Open Prisma Studio

## 🌐 Deployment

This app is deployed on Railway and optimized for containerized deployment.

**Live URL**: [https://codesnippet-production-0833.up.railway.app](https://codesnippet-production-0833.up.railway.app)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🔧 Environment Variables

```bash
# .env.local (development)
DATABASE_URL="file:./prisma/dev.db"

# .env.production (production)
DATABASE_URL="file:/app/data/dev.db"
PORT=3000
```

## 🎨 Key Features

### Code Editor
- Syntax highlighting for multiple languages
- Dark theme optimized for coding
- Responsive design

### Snippet Management
- Create, read, update, delete snippets
- Dynamic routing with Next.js App Router
- Server-side rendering for performance

### Modern Architecture
- Next.js 15 with App Router
- React Server Components
- Type-safe with TypeScript
- Styled with TailwindCSS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **🌐 Live Demo**: [CodeSnippets App](https://codesnippet-production-0833.up.railway.app)
- **📱 Health Check**: [API Health](https://codesnippet-production-0833.up.railway.app/api/health)
- **📂 Repository**: https://github.com/nitin8217/CodeSnippet
- **🐛 Issues**: https://github.com/nitin8217/CodeSnippet/issues

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Prisma](https://prisma.io/) for the excellent ORM
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Railway](https://railway.app/) for seamless deployment

---

**Made with ❤️ by [nitin8217](https://github.com/nitin8217)**
