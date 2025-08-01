import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import * as actions from "@/actions";
import { notFound } from "next/navigation";
import { PencilIcon, TrashIcon } from 'lucide-react';

interface SnippetDetailProps {
  params: Promise<{
    id: string
  }>
}

const SnippetDetailPage = async ({ params }: SnippetDetailProps) => {
 
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  
  const snippet = await prisma.snippet.findUnique({
    where: { id }
  });

  if (!snippet) notFound();

  const deleteSnippetActions = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800/50 to-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-100 mb-2">{snippet.title}</h1>
              <p className="text-gray-400">Code snippet details and actions</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/snippet/${snippet.id}/edit`}>
                <Button variant="outline" className="gap-2 group">
                  <PencilIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Edit
                </Button>
              </Link>
              <form action={deleteSnippetActions}>
                <Button variant="destructive" type="submit" className="gap-2 group">
                  <TrashIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Delete
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="bg-gray-900/80 rounded-lg border border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-gray-800/50 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-medium">Code Content</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <pre className="p-6 overflow-x-auto text-sm bg-gray-900">
              <code className="text-gray-100 font-mono leading-relaxed">{snippet.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetDetailPage;

// Disable static generation - make this route fully dynamic
export const dynamic = 'force-dynamic';
