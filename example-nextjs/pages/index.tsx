import React, { useEffect, useState } from 'react'
import { RunWasm, createRunWasmClient, createPythonClient } from 'run-wasm'
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
  const [output, setOutput] = useState('loading...')
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
          <label
            htmlFor="email"
            className="pt-8 block text-sm font-medium text-gray-700"
          >
            Insert Python Code Below
          </label>
          <div className="mt-1">
            <textarea
              name="Code"
              id="Code"
              className="bg-gray-900 text-white p-2 w-1/2 shadow-sm focus:ring-gray-500 focus:border-gray-500 block  sm:text-sm border-gray-300 rounded-md"
              placeholder="1 + 1"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
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
          {output ?? (
            <p className="my-8 text-xl text-gray-900">Output: {output}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
