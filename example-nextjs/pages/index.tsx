import React, { useEffect, useState } from 'react'
import { createPythonClient, RunWasm } from 'run-wasm'
import Editor from '@monaco-editor/react'
import Script from 'next/script'
import GithubButton from '../components/GithubButton'
import Navbar from '../components/Navbar'

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

  // Note that window.loadPyodide comes from the beforeInteractive pyodide.js Script
  useEffect(() => {
    window
      .loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/',
      })
      .then((pyodide) => setPyodide(pyodide))
  }, [])

  return (
    <>
      <Navbar current="Home" />
      <div className="max-w-4xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Script
            src="https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js"
            strategy="beforeInteractive"
          />
          <main className="mx-auto mb-12 max-w-7xl sm:mt-12">
            <div className="text-left">
              <h1 className="text-3xl tracking-tight text-gray-900 sm:text-5xl md:text-5xl">
                <span className="block font-mono xl:inline">
                  Embed executable code snippets on your site
                </span>
              </h1>
              <p className="max-w-md mt-4 text-base text-gray-500 md:mx-auto sm:text-lg md:mt-16 md:text-xl md:max-w-3xl">
                <b>run-wasm</b> is an api which allows you to easily execute
                code via WebAssembly based programming languages. <br />
                <br /> It allows you to include interactive code examples in
                your website.
              </p>
              <GithubButton />
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
              className="px-4 py-2 my-4 text-white transition-colors bg-black border border-transparent rounded hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none"
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
    </>
  )
}

export default App
