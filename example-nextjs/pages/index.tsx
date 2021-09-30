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
      <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Script
            src="https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js"
            strategy="beforeInteractive"
          />
          <main className="mx-auto mb-12 max-w-7xl sm:mt-12">
            <div className="text-left">
              <h1 className="text-3xl tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-5xl">
                <span className="block font-mono xl:inline">
                  Embed executable code snippets on your site
                </span>
              </h1>
              <p className="max-w-md mt-4 text-base text-gray-500 dark:text-gray-450 md:mx-auto sm:text-lg md:mt-16 md:text-xl md:max-w-3xl">
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
            <label className="block pb-4 text-sm font-medium text-gray-700 dark:text-gray-450">
              Python
            </label>

            <div className="mt-1 ">
              <div className="relative group">
                <div className="absolute -inset-0.5 dark:bg-gradient-to-r from-indigo-300 to-purple-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
                <Editor
                  height="20rem"
                  defaultLanguage="python"
                  defaultValue={inputCode}
                  onChange={(value) => setInputCode(value ?? '')}
                  className="block w-1/2  text-white bg-gray-900 border-gray-300 rounded-lg   shadow-sm p-0.5 border   dark:border-purple-300 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  theme="vs-dark"
                  options={{ fontSize: 12 }}
                />
              </div>
            </div>
          </div>

          {pyodide && (
            <div className="pt-8 ">
              <div className="grid items-start justify-left">
                <div className="relative group">
                  <button
                    className="relative flex items-center py-4 leading-none bg-black divide-x divide-gray-600 rounded-lg px-7"
                    onClick={() => runCode(inputCode, pyodide)}
                  >
                    <span className="text-gray-100 transition duration-200 group-hover:text-gray-100">
                      Run Code →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block pt-8 text-sm font-medium text-gray-700 dark:text-gray-450">
              Output
            </label>

            <div className="mt-1 dark:text-gray-450">
              <Editor
                value={output?.toString()}
                height="20rem"
                defaultLanguage="python"
                className="block w-1/2  text-white bg-gray-900 border-gray-300 rounded-lg   shadow-sm p-0.5 border   dark:border-purple-300 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                theme="vs-dark"
                options={{ readOnly: true }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
