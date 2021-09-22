import React, { useEffect, useState } from 'react'
import { createPythonClient, RunWasm } from 'run-wasm'
import Editor from '@monaco-editor/react'
import Script from 'next/script'

declare global {
  // <- [reference](https://stackoverflow.com/a/56458070/11542903)
  interface Window {
    pyodide: any
    languagePluginLoader: any
    loadPyodide: Function
  }
}

function App() {
  const [output, setOutput] = useState('')
  const [inputCode, setInputCode] = useState('')
  const [pyodide, setPyodide] = useState(null)

  async function runCode(code: string, pyodide: any) {
    console.log('running code', code)
    let pythonClient = createPythonClient(pyodide)
    console.log(pythonClient)
    pythonClient.run({ code })
    let output = await pythonClient.run({ code })
    setOutput(output)
    console.log('output', output)
  }

  useEffect(() => {
    console.log(inputCode)
  }, [inputCode])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        {/* Content goes here */}
        <>
          <Script
            src="https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js"
            onLoad={async () => {
              const pyodide = await window.loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/',
              })
              setPyodide(pyodide)
            }}
          />
        </>

        <RunWasm language="Python" code={inputCode} />

        <div>
          <label className="pt-8 block text-sm font-medium text-gray-700">
            Insert Python Code Below
          </label>

          <div className="mt-1">
            <Editor
              height="20rem"
              defaultLanguage="python"
              defaultValue={inputCode}
              onChange={(value) => setInputCode(value ?? '')}
              className="bg-gray-900 text-white p-2 w-1/2 shadow-sm focus:ring-gray-500 focus:border-gray-500 block  sm:text-sm border-gray-300 rounded-md"
              theme="vs-dark"
            />
          </div>
        </div>

        {pyodide && (
          <button
            className="bg-black text-white my-4 py-1 px-2 rounded-lg "
            onClick={() => runCode(inputCode, pyodide)}

          >
            Run Code
          </button>
        )}

        <div>
          <label className="pt-8 block text-sm font-medium text-gray-700">
            Output
          </label>

          <div className="mt-1">
            <Editor
              value={output.toString()}
              height="10rem"
              defaultLanguage="python"
              className="bg-gray-900 text-white p-2 w-1/2 shadow-sm focus:ring-gray-500 focus:border-gray-500 block  sm:text-sm border-gray-300 rounded-md"
              theme="vs-dark"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
