import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { EyeIcon, PlusIcon } from "lucide-react";

// Force this page to be dynamic (rendered at request time)
export const dynamic = 'force-dynamic';

export default async function Home() {
  const snippets = await prisma.snippet.findMany();
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Code Snippets
        </h1>
        <p className="text-gray-400 text-lg">Manage and share your code snippets with modern elegance</p>
      </div>
      
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-200">Your Collection</h2>
        <Link href="/snippet/new">
          <Button size="lg" className="gap-3 group">
            <PlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            Create New Snippet
          </Button>
        </Link>
      </div>

      {snippets.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
            <PlusIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-300 mb-2">No snippets yet</h3>
          <p className="text-gray-500 mb-6">Create your first code snippet to get started</p>
          <Link href="/snippet/new">
            <Button size="lg" className="group">
              <PlusIcon className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Create First Snippet
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {snippets.map((snippet) => (
            <div 
              key={snippet.id} 
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 transform hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-100 group-hover:text-white transition-colors truncate">
                  {snippet.title}
                </h3>
                <div className="flex-shrink-0 ml-3">
                  <Link href={`/snippet/${snippet.id}`}>
                    <Button variant="ghost" size="sm" className="opacity-70 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                      <EyeIcon className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-gray-900/50 rounded-lg p-3 mb-4 border border-gray-700/50 group-hover:border-gray-600/50 transition-colors">
                <pre className="text-xs text-gray-300 font-mono truncate overflow-hidden">
                  <code>{snippet.code.slice(0, 100)}{snippet.code.length > 100 ? '...' : ''}</code>
                </pre>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Code snippet
                </span>
                <Link href={`/snippet/${snippet.id}`}>
                  <Button variant="outline" size="sm" className="gap-2 group/btn">
                    <EyeIcon className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
