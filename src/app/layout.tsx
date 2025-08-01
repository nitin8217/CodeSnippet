import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeSnippets - Modern Code Management",
  description: "Manage and share your code snippets with style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}
      >  
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
          <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{"</>"}</span>
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    CodeSnippets
                  </h1>
                </div>
                <div className="text-sm text-gray-400">
                  Modern Code Management
                </div>
              </div>
            </div>
          </nav>
          <main className="container mx-auto px-6 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
