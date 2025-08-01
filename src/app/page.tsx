import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { EyeIcon, PlusIcon } from "lucide-react";

export default async function Home() {
  const snippets = await prisma.snippet.findMany();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Code Snippets</h1>
        <p className="text-gray-600">Manage and share your code snippets easily</p>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Snippets</h2>
        <Link href="/snippet/new">
          <Button className="gap-2">
            <PlusIcon className="w-4 h-4" />
            New Snippet
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {snippets.map((snippet) => (
          <div 
            key={snippet.id} 
            className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">{snippet.title}</h3>
              <Link href={`/snippet/${snippet.id}`}>
                <Button variant="ghost" className="gap-2">
                  <EyeIcon className="w-4 h-4" />
                  View
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
