# Code Snippets ✨

A modern web application for managing and sharing code snippets built with Next.js 14, Prisma, and TypeScript.

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
