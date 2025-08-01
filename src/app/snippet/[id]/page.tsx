import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import * as actions from "@/actions";
import { notFound } from "next/navigation";
import { Plus as PlusIcon, Eye as EyeIcon, Pencil as PencilIcon, Trash as TrashIcon } from 'lucide-react';

interface SnippetDetailProps {
  params: {
    id: string
  }
}

const SnippetDetailPage = async ({ params }: SnippetDetailProps) => {
  const id = parseInt(params.id);
  const snippet = await prisma.snippet.findUnique({ where: { id } });

  if (!snippet) notFound();

  const deleteSnippetActions = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{snippet.title}</h1>
            <div className="flex items-center gap-3">
              <Link href={`/snippet/${snippet.id}/edit`}>
                <Button variant="outline" className="gap-2">
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </Button>
              </Link>
              <form action={deleteSnippetActions}>
                <Button variant="destructive" type="submit" className="gap-2">
                  <TrashIcon className="w-4 h-4" />
                  Delete
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-gray-50">
          <pre className="p-4 bg-white rounded-lg border overflow-x-auto">
            <code className="text-sm font-mono">{snippet.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SnippetDetailPage;


export const generateStaticParams = async () => {
  const snippets = await prisma.snippet.findMany();

  return snippets.map((snippet)=> {
    return {id:snippet.id.toString()}
  })
}
