import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, SearchXIcon } from 'lucide-react'

const SnippetNotFound = () => {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
          <SearchXIcon className="w-12 h-12 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-200 mb-4">Snippet Not Found</h1>
        <p className="text-gray-400 text-lg">
          The code snippet you're looking for doesn't exist or has been removed.
        </p>
      </div>
      
      <Link href="/">
        <Button size="lg" className="gap-2">
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Snippets
        </Button>
      </Link>
    </div>
  )
}

export default SnippetNotFound
