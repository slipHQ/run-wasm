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
  const [
    inputCode,
    setInputCode,
  ] = useState(`# Implementation of the Sieve of Eratosthenes
# https://stackoverflow.com/questions/3939660/sieve-of-eratosthenes-finding-primes-python
  
# Finds all prime numbers up to n
def eratosthenes(n):
    multiples = []
    for i in range(2, n+1):
        if i not in multiples:
            print (i)
            for j in range(i*i, n+1, i):
                multiples.append(j)
  
eratosthenes(100)`)
  const [pyodide, setPyodide] = useState(null)

  async function runCode(code: string, pyodide: any) {
    console.log('running code', code)
    let pythonClient = createPythonClient(pyodide)
    console.log(pythonClient)
    let output = await pythonClient.run({ code })
    setOutput(output)
    console.log('output', output)
  }

  useEffect(() => {
    console.log(inputCode)
  }, [inputCode])

  return (
    <div className="max-w-4xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
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
        <main className="mx-auto my-16 max-w-7xl sm:mt-24">
          <div className="text-left">
            <h1 className="text-3xl tracking-tight text-gray-900 sm:text-5xl md:text-5xl">
              <span className="block font-mono xl:inline">
                Embed executable code snippets on your site
              </span>
            </h1>
            <p className="max-w-md mx-auto mt-4 text-base text-gray-500 sm:text-lg md:mt-16 md:text-xl md:max-w-3xl">
              <b>run-wasm</b> is an api which allows you to easily execute code
              via WebAssembly based programming languages. <br />
              <br /> It allows you to include interactive code examples in your
              website.
            </p>
            <div className="max-w-md mt-5 sm:flex sm:justify-left md:mt-8">
              <div className="">
                <a
                  href="https://github.com/slipHQ/run-wasm"
                  className="flex items-center justify-center w-full px-6 py-2 text-base font-medium text-white bg-gray-900 border border-transparent rounded-md hover:bg-gray-700 md:py-2 md:text-md md:px-6"
                >
                  <svg
                    width="1024"
                    height="1024"
                    className="w-6 h-6 mr-4"
                    viewBox="0 0 1024 1024"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                      transform="scale(64)"
                      fill="#ffffff"
                    />
                  </svg>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg> */}
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* <RunWasm language="Python" code={inputCode} /> */}

        <div>
          <label className="block pt-8 text-sm font-medium text-gray-700">
            Insert Python Code Below
          </label>

          <div className="mt-1">
            <Editor
              height="20rem"
              defaultLanguage="python"
              defaultValue={inputCode}
              onChange={(value) => setInputCode(value ?? '')}
              className="block w-1/2 p-2 text-white bg-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              theme="vs-dark"
            />
          </div>
        </div>

        {pyodide && (
          <button
            className="px-4 py-1 my-4 text-white bg-black rounded "
            onClick={() => runCode(inputCode, pyodide)}
          >
            Run Code
          </button>
        )}

        <div>
          <label className="block pt-8 text-sm font-medium text-gray-700">
            Output
          </label>

          <div className="mt-1">
            <Editor
              value={output?.toString()}
              height="10rem"
              defaultLanguage="python"
              className="block w-1/2 p-2 text-white bg-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              theme="vs-dark"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
