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
    const [pyodideReady, setPyodideReady] = useState(false)
    
    const saveSnippetAction = actions.saveSnippet.bind(null, snippet.id, code)

    // Load Pyodide for Python execution
    useEffect(() => {
        if (language === 'python' && !window.pyodide && !pyodideReady) {
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js'
            script.onload = async () => {
                window.pyodide = await (window as any).loadPyodide()
                setPyodideReady(true)
            }
            document.head.appendChild(script)
        }
    }, [language, pyodideReady])

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
            // Capture print statements
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

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">
                        Title
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

                <div className="space-y-2">
                    <Label htmlFor="language" className="text-sm font-medium">
                        Language
                    </Label>
                    <select 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as LanguageKey)}
                        className="w-full p-2 border rounded-md"
                    >
                        {Object.entries(languages).map(([key, { label }]) => (
                            <option key={key} value={key}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Code Editor</h3>
                <div className="flex gap-2">
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
                    <form action={saveSnippetAction}>
                        <input type="hidden" name="title" value={title} />
                        <Button type="submit" className="gap-2">
                            <SaveIcon className="w-4 h-4" />
                            Save Changes
                        </Button>
                    </form>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-sm font-medium">Code</Label>
                    <div className="rounded-lg border overflow-hidden">
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

                <div className="space-y-2">
                    <Label className="text-sm font-medium">Output</Label>
                    <div className="rounded-lg border bg-black h-[400px]">
                        <div className="p-3 border-b border-gray-800 bg-gray-900">
                            <h4 className="text-sm font-medium text-white">Console Output</h4>
                        </div>
                        <pre className="p-4 text-sm font-mono text-white overflow-auto h-[360px] whitespace-pre-wrap">
                            {output || 'Click "Run Code" to see output'}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditSnippetForm