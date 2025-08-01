"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useActionState, useState } from 'react'
import * as actions from '@/actions'

const CreateSnippetPage = () => {
  const [formStateData, xyz] = useActionState(actions.createSnippet, { message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await xyz(formData);
    } finally {
      setIsSubmitting(false);
    }
  };
    
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Create New Snippet
        </h1>
        <p className="text-gray-400">Add a new code snippet to your collection</p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 shadow-xl">
        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="title" className="text-base font-medium text-gray-200">
              Snippet Title
            </Label>
            <Input 
              type="text" 
              name="title" 
              id="title"
              placeholder="Enter a descriptive title for your snippet"
              className="w-full"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="code" className="text-base font-medium text-gray-200">
              Code Content
            </Label>
            <Textarea 
              name="code" 
              id="code"
              placeholder="Paste your code here..."
              className="min-h-[300px] font-mono text-sm"
              disabled={isSubmitting}
            />
          </div>

          {formStateData.message && (
            <div className='p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300 backdrop-blur-sm'>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                {formStateData.message}
              </div>
            </div>
          )}

          <Button 
            type='submit' 
            size="lg" 
            className='w-full'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating Snippet...
              </>
            ) : (
              'Create Snippet'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateSnippetPage
