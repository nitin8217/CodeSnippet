import EditSnippetForm from '@/components/EditSnippetForm'
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react'

// Force this page to be dynamic (rendered at request time)
export const dynamic = 'force-dynamic';

interface EditPageProps {
  params: Promise<{
    id: string
  }>
}

const EditPageSnippet = async ({ params }: EditPageProps) => {
  // Await the params before using them
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  
  const snippet = await prisma.snippet.findUnique({
    where: { id }
  });

  if (!snippet) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Edit Snippet
        </h1>
        <p className="text-gray-400">Update your code snippet with our interactive compiler</p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl">
        <div className="p-8">
          <EditSnippetForm snippet={snippet} />
        </div>
      </div>
    </div>
  )
}

export default EditPageSnippet
