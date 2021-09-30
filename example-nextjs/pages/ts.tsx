import React, { useEffect, useState } from 'react'
import { createTSClient } from 'run-wasm'
import Editor from '@monaco-editor/react'
import Script from 'next/script'
import Navbar from '../components/Navbar'
import GithubButton from '../components/GithubButton'

declare global {
  interface Window {
    ts: any
  }
}

function App() {
  const [inputCode, setInputCode] = useState(`// TypeScript code goes here
let a: number;
let b: number;
a = 12;
b = 3;
console.log(a + b);`)
  const [output, setOutput] = useState<Array<string>>([])
  const [errors, setErrors] = useState<Array<string>>([])
  const [tsClient, setTsClient] = useState<any>(null)

  useEffect(() => {
    const tsClient = createTSClient(window.ts)
    // tsClient.fetchLibs(['es5', 'dom']).then(() => setTsClient(tsClient))
    setTsClient(tsClient)
  }, [])

  async function runCode(code: string) {
    const { errors: err, output: result } = await tsClient.run({ code })
    setOutput(result)
    setErrors(err)
  }

  return (
    <>
      <Navbar current="TypeScript" />
      <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Script
            strategy="beforeInteractive"
            src="https://unpkg.com/typescript@latest/lib/typescriptServices.js"
          />
          <Script src="https://kit.fontawesome.com/137d63e13e.js" />
          <main className="mx-auto my-16 max-w-7xl sm:mt-24">
            <div className="text-left">
              <h1 className="text-3xl tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-5xl">
                <span className="block font-mono xl:inline">
                  Embed executable code snippets on your site
                </span>
              </h1>
              <p className="max-w-md mt-4 text-base text-gray-500 md:mx-auto sm:text-lg md:mt-16 md:text-xl md:max-w-3xl">
                <b>run-wasm</b> is an api which allows you to easily execute
                code via WebAssembly based programming languages. <br />
                <br /> It allows you to include interactive code examples in
                your website. <br />
                <br />
                This page demonstrates running TypeScript code in the browser.
              </p>
              <GithubButton />
            </div>
          </main>

          <div>
            <label className="block pb-4 text-sm font-medium text-gray-700 dark:text-gray-450">
              Typescript
            </label>

            <div className="mt-1 ">
              <Editor
                height="20rem"
                defaultLanguage="typescript"
                defaultValue={inputCode}
                onChange={(value) => setInputCode(value ?? '')}
                className="block w-1/2  text-white bg-gray-900 border-gray-300 rounded-lg   shadow-sm p-0.5 border   dark:border-purple-300 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                theme="vs-dark"
                options={{ fontSize: 12 }}
              />
            </div>
          </div>

          {tsClient ? (
            <div className="pt-8 ">
              <div className="grid items-start justify-left">
                <div className="relative group">
                  <button
                    className="relative flex items-center py-4 leading-none bg-black divide-x divide-gray-600 rounded-lg px-7"
                    onClick={() => runCode(inputCode)}
                  >
                    <span className="text-gray-100 transition duration-200 group-hover:text-gray-100">
                      Run Code →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <label className="block pt-8 text-sm font-medium text-gray-700 dark:text-gray-450">
              Loading TypeScript...
            </label>
          )}

          {errors.length > 0 && (
            <div>
              <label className="block pt-8 text-sm font-medium text-gray-700">
                Errors
              </label>
              {errors.map((error, index) => (
                <div key={index} className="mt-1">
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              ))}
            </div>
          )}

          <div>
            <label className="block pt-8 text-sm font-medium text-gray-700 dark:text-gray-450">
              Output
            </label>

            <div className="mt-1 dark:text-gray-450">
              <div className="relative group">
                <div className="absolute -inset-0.5 dark:bg-gradient-to-r from-indigo-300 to-purple-400 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
                <Editor
                  value={output?.toString()}
                  height="20rem"
                  defaultLanguage="typescript"
                  className="block w-1/2  text-white bg-gray-900 border-gray-300 rounded-lg   shadow-sm p-0.5 border   dark:border-purple-300 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  theme="vs-dark"
                  options={{ readOnly: true }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
