"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useActionState } from 'react'
import * as actions from '@/actions'

const CreateSnippetPage = () => {
  const [formStateData, xyz] = useActionState(actions.createSnippet, { message: "" });
    
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Snippet</h1>
        <p className="text-gray-600">Add a new code snippet to your collection</p>
      </div>

      <form action={xyz} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Title
          </Label>
          <Input 
            type="text" 
            name="title" 
            id="title"
            placeholder="Enter snippet title"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="code" className="text-sm font-medium">
            Code
          </Label>
          <Textarea 
            name="code" 
            id="code"
            placeholder="Paste your code here"
            className="min-h-[200px] font-mono"
          />
        </div>

        {formStateData.message && (
          <div className='p-4 bg-red-50 border border-red-200 rounded-lg text-red-600'>
            {formStateData.message}
          </div>
        )}

        <Button type='submit' className='w-full'>
          Create Snippet
        </Button>
      </form>
    </div>
  )
}

export default CreateSnippetPage
