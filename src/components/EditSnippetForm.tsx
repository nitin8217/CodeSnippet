"use client"
import { Editor } from '@monaco-editor/react'
import React, { useState } from 'react'
import type { Snippet } from '@/generated/prisma'
import { Button } from './ui/button'
import * as actions from '@/actions'
import { SaveIcon } from 'lucide-react'

const EditSnippetForm = ({snippet}:{snippet:Snippet}) => {
    const [code,setCode] = useState(snippet.code)
    const changeEventHandler = (value:string = "") => {
        setCode(value)
    }
    const saveSnippetAction = actions.saveSnippet.bind(null,snippet.id,code)

    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
                <form action={saveSnippetAction} className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-1">{snippet.title}</h2>
                        <p className="text-sm text-gray-600">Edit your code snippet</p>
                    </div>
                    <Button type="submit" className="gap-2">
                        <SaveIcon className="w-4 h-4" />
                        Save Changes
                    </Button>
                </form>
            </div>
            <div className="p-6 bg-gray-50">
                <div className="rounded-lg overflow-hidden border shadow-sm">
                    <Editor
                        height="50vh"
                        theme="vs-dark"
                        defaultLanguage="javascript"
                        defaultValue={code}
                        onChange={changeEventHandler}
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                            padding: { top: 16 }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditSnippetForm
