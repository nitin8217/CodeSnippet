"use client"
import React, { useState, useEffect } from 'react'
import type { Snippet } from '@/generated/prisma'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import * as actions from '@/actions'
import { SaveIcon, PlayIcon, DownloadIcon } from 'lucide-react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { cpp } from '@codemirror/lang-cpp'
import { java } from '@codemirror/lang-java'
import { oneDark } from '@codemirror/theme-one-dark'

const languages = {
  javascript: { extension: javascript({ jsx: true }), label: "JavaScript" },
  python: { extension: python(), label: "Python" },
  cpp: { extension: cpp(), label: "C++" },
  java: { extension: java(), label: "Java" }
} as const

type LanguageKey = keyof typeof languages

declare global {
  interface Window {
    pyodide: any;
  }
}

const EditSnippetForm = ({snippet}:{snippet:Snippet}) => {
    const [code, setCode] = useState(snippet.code)
    const [title, setTitle] = useState(snippet.title)
    const [language, setLanguage] = useState<LanguageKey>('javascript')
    const [output, setOutput] = useState('')
    const [isRunning, setIsRunning] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [pyodideReady, setPyodideReady] = useState(false)
    const [isClient, setIsClient] = useState(false)
    
    // Enhanced save action with loading state
    const handleSave = async () => {
        setIsSaving(true)
        try {
            await actions.saveSnippet(snippet.id, code, title)
        } finally {
            setIsSaving(false)
        }
    }

    // Ensure we're on the client side
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Load Pyodide for Python execution
    useEffect(() => {
        if (isClient && language === 'python' && !window.pyodide && !pyodideReady) {
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js'
            script.onload = async () => {
                window.pyodide = await (window as any).loadPyodide()
                setPyodideReady(true)
            }
            document.head.appendChild(script)
        }
    }, [isClient, language, pyodideReady])

    const runJavaScript = async () => {
        const originalLog = console.log
        const originalError = console.error
        const logs: string[] = []
        
        console.log = (...args) => {
            logs.push(args.map(arg => String(arg)).join(' '))
        }
        console.error = (...args) => {
            logs.push('ERROR: ' + args.map(arg => String(arg)).join(' '))
        }
        
        try {
            const func = new Function(code)
            const result = func()
            
            if (result !== undefined) {
                logs.push('Return value: ' + String(result))
            }
            
            return logs.join('\n') || 'Code executed successfully'
        } catch (error: any) {
            return `Error: ${error.message}`
        } finally {
            console.log = originalLog
            console.error = originalError
        }
    }

    const runPython = async () => {
        if (!window.pyodide || !pyodideReady) {
            return 'Python runtime is loading... Please wait and try again.'
        }

        try {
            window.pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
            `)
            
            window.pyodide.runPython(code)
            
            const stdout = window.pyodide.runPython("sys.stdout.getvalue()")
            const stderr = window.pyodide.runPython("sys.stderr.getvalue()")
            
            return stdout + (stderr ? '\nErrors:\n' + stderr : '') || 'Code executed successfully'
        } catch (error: any) {
            return `Python Error: ${error.message}`
        }
    }

    const downloadCode = () => {
        if (!isClient) return
        
        const fileExtensions = {
            javascript: '.js',
            python: '.py',
            cpp: '.cpp',
            java: '.java'
        }
        
        const blob = new Blob([code], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${title || 'snippet'}${fileExtensions[language]}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const runCode = async () => {
        if (!isClient) return
        
        setIsRunning(true)
        setOutput('Running...')
        
        try {
            let result = ''
            
            switch (language) {
                case 'javascript':
                    result = await runJavaScript()
                    break
                case 'python':
                    result = await runPython()
                    break
                case 'cpp':
                    result = `C++ execution not available in browser.
                    
To run this code:
1. Install a C++ compiler (g++, clang++)
2. Save code to a .cpp file
3. Compile: g++ -o program filename.cpp
4. Run: ./program

Or use online compilers like:
- https://www.onlinegdb.com/
- https://replit.com/
- https://godbolt.org/`
                    break
                case 'java':
                    result = `Java execution not available in browser.
                    
To run this code:
1. Install Java JDK
2. Save code to a .java file
3. Compile: javac filename.java
4. Run: java ClassName

Or use online compilers like:
- https://www.jdoodle.com/
- https://replit.com/
- https://www.tutorialspoint.com/compile_java_online.php`
                    break
                default:
                    result = 'Language not supported'
            }
            
            setOutput(result)
        } catch (error) {
            setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } finally {
            setIsRunning(false)
        }
    }

    // Show loading state until client is ready
    if (!isClient) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                    <div className="h-11 bg-gray-700 rounded mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                    <div className="h-11 bg-gray-700 rounded mb-4"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-[400px] bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="h-[400px] bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <Label htmlFor="title" className="text-base font-medium text-gray-200">
                        Snippet Title
                    </Label>
                    <Input 
                        type="text" 
                        name="title" 
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter snippet title"
                        className="w-full"
                    />
                </div>

                <div className="space-y-3">
                    <Label htmlFor="language" className="text-base font-medium text-gray-200">
                        Programming Language
                    </Label>
                    <select 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as LanguageKey)}
                        className="w-full h-11 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all duration-200 backdrop-blur-sm"
                    >
                        {Object.entries(languages).map(([key, { label }]) => (
                            <option key={key} value={key} className="bg-gray-800 text-gray-100">
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Interactive Code Editor
                </h3>
                <div className="flex gap-3">
                    <Button
                        type="button"
                        onClick={downloadCode}
                        variant="ghost"
                        className="gap-2"
                    >
                        <DownloadIcon className="w-4 h-4" />
                        Download
                    </Button>
                    <Button
                        type="button"
                        onClick={runCode}
                        disabled={isRunning || (language === 'python' && !pyodideReady)}
                        variant="outline"
                        className="gap-2"
                    >
                        <PlayIcon className="w-4 h-4" />
                        {isRunning ? 'Running...' : language === 'python' && !pyodideReady ? 'Loading...' : 'Run Code'}
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSave}
                        className="gap-2" 
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <SaveIcon className="w-4 h-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <Label className="text-base font-medium text-gray-200">Code Editor</Label>
                    <div className="rounded-lg border border-gray-700 overflow-hidden bg-gray-900/50 backdrop-blur-sm shadow-xl">
                        <CodeMirror
                            value={code}
                            height="400px"
                            theme={oneDark}
                            extensions={[languages[language].extension]}
                            onChange={(value) => setCode(value)}
                            basicSetup={{
                                lineNumbers: true,
                                highlightActiveLineGutter: true,
                                highlightSpecialChars: true,
                                foldGutter: true,
                                dropCursor: true,
                                allowMultipleSelections: true,
                                indentOnInput: true,
                                bracketMatching: true,
                                closeBrackets: true,
                                autocompletion: true,
                                rectangularSelection: true,
                                crosshairCursor: true,
                                highlightActiveLine: true,
                                highlightSelectionMatches: true,
                                closeBracketsKeymap: true,
                                searchKeymap: true,
                                foldKeymap: true,
                                completionKeymap: true,
                                lintKeymap: true,
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="text-base font-medium text-gray-200">Console Output</Label>
                    <div className="rounded-lg border border-gray-700 bg-gray-900/80 h-[400px] overflow-hidden shadow-xl backdrop-blur-sm">
                        <div className="p-4 border-b border-gray-700 bg-gray-800/50 flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-200 flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                Terminal
                            </h4>
                            <div className="flex space-x-1">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                        <pre className="p-4 text-sm font-mono text-gray-100 overflow-auto h-[345px] whitespace-pre-wrap bg-gray-900">
                            {output || '# Ready to execute code\n# Click "Run Code" to see output...'}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditSnippetForm