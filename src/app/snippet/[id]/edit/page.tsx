import EditSnippetForm from '@/components/EditSnippetForm'
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react'

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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Snippet</h1>
        <p className="text-gray-600">Update your code snippet with our interactive compiler</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <EditSnippetForm snippet={snippet} />
        </div>
      </div>
    </div>
  )
}

export default EditPageSnippet
