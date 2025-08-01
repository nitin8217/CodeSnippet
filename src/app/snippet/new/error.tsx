"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangleIcon, ArrowLeftIcon, RefreshCwIcon } from 'lucide-react'

type ErrorPageProps = {
    error: Error
    reset: () => void
}

const ErrorPage : React.FC<ErrorPageProps> = ({error, reset}) => {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
          <AlertTriangleIcon className="w-12 h-12 text-red-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-200 mb-4">Something went wrong</h1>
        <p className="text-gray-400 text-lg mb-4">
          An error occurred while creating your snippet.
        </p>
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6 text-left">
          <p className="text-red-300 text-sm font-mono">
            {error.message || 'An unexpected error occurred'}
          </p>
        </div>
      </div>
      
      <div className="flex gap-4 justify-center">
        <Button onClick={reset} variant="outline" size="lg" className="gap-2">
          <RefreshCwIcon className="w-5 h-5" />
          Try Again
        </Button>
        <Link href="/">
          <Button size="lg" className="gap-2">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage
