# Code Snippets ✨

# 📝 CodeSnippets - Modern Code Snippet Manager

A beautiful, modern web application for managing and sharing your code snippets. Built with Next.js 15, Prisma, SQLite, and TailwindCSS.

![CodeSnippets App](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-6.13.0-2D3748?style=for-the-badge&logo=prisma)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🎨 **Modern UI** - Beautiful, responsive design with dark theme
- 📝 **Code Editor** - Syntax highlighting with CodeMirror
- 🔍 **Syntax Support** - JavaScript, Python, Java, C++, and more
- 💾 **SQLite Database** - Lightweight, file-based storage
- 🚀 **Fast Performance** - Optimized Next.js 15 with App Router
- 📱 **Mobile Friendly** - Responsive design for all devices
- 🔥 **Hot Reload** - Development with Turbopack
- 🐳 **Docker Ready** - Containerized deployment

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.4.5, React 19, TypeScript
- **Styling**: TailwindCSS 4.0, Shadcn/ui components
- **Database**: SQLite with Prisma ORM
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
├── public/                   # Static assets
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

### Railway (Recommended)

This app is optimized for Railway deployment:

1. **Push to GitHub**
2. **Connect to Railway**
3. **Auto-deploy** - Railway detects Next.js and deploys automatically

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Docker

```bash
# Build image
docker build -t codesnippets .

# Run container
docker run -p 3000:3000 codesnippets
```

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
- Server-side rendering for SEO

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

- **Live Demo**: [Your Railway URL]
- **Repository**: https://github.com/nitin8217/CodeSnippet
- **Issues**: https://github.com/nitin8217/CodeSnippet/issues

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Prisma](https://prisma.io/) for the excellent ORM
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Railway](https://railway.app/) for seamless deployment

---

**Made with ❤️ by [nitin8217](https://github.com/nitin8217)**

## Features 🚀

- **Create Snippets**: Easily create and store your code snippets
- **Edit & Delete**: Full CRUD functionality for managing your snippets
- **Modern UI**: Clean and responsive interface with Tailwind CSS
- **Server Actions**: Utilizing Next.js 14 server actions for data mutations
- **Type Safety**: Built with TypeScript for better development experience
- **Database**: SQLite with Prisma ORM for data persistence

## Tech Stack 💻

- [Next.js 14](https://nextjs.org/) - React Framework
- [Prisma](https://www.prisma.io/) - ORM
- [TypeScript](https://www.typescriptlang.org/) - Language
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide Icons](https://lucide.dev/) - Icons
- [SQLite](https://www.sqlite.org/) - Database

## Getting Started 🛠️

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/code-snippets.git
cd code-snippets
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure 📁

```
src/
├── actions/        # Server actions for data mutations
├── app/           # Next.js app router pages
├── components/    # Reusable UI components
└── lib/          # Utility functions and configurations
```

## Features in Detail 🔍

### Creating Snippets
- Click "New Snippet" button
- Enter title and code
- Click "Create Snippet" to save

### Editing Snippets
- Navigate to a snippet
- Click "Edit" button
- Modify code in the editor
- Click "Save Changes"

### Deleting Snippets
- Navigate to a snippet
- Click "Delete" button
- Confirm deletion

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Made with ❤️ by [Nitin]
