import React, { useState } from 'react'
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

  async function runCode(code: string) {
    console.log('running code', code)
    let tsClient = createTSClient(window.ts)
    console.log(tsClient)
    const result = await tsClient.run({ code })
    console.log(result)
    setOutput(result)
  }

  return (
    <>
      <Navbar current="TypeScript" />
      <div className="max-w-4xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Script
            strategy="beforeInteractive"
            src="https://unpkg.com/typescript@latest/lib/typescriptServices.js"
          />
          <Script src="https://kit.fontawesome.com/137d63e13e.js" />
          <main className="mx-auto my-16 max-w-7xl sm:mt-24">
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
                your website. <br />
                <br />
                This page demonstrates running TypeScript code in the browser.
              </p>
              <GithubButton />
            </div>
          </main>

          <div>
            <label className="block pt-8 text-sm font-medium text-gray-700">
              Insert TypeScript Code Below
            </label>

            <div className="mt-1 ">
              <Editor
                height="20rem"
                defaultLanguage="typescript"
                defaultValue={inputCode}
                onChange={(value) => setInputCode(value ?? '')}
                className="block w-1/2 p-2 text-white bg-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                theme="vs-dark"
                options={{}}
              />
            </div>
          </div>

          <button
            className="px-4 py-2 my-4 text-white transition-colors bg-black border border-transparent rounded hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none"
            onClick={() => runCode(inputCode)}
          >
            Run Code
          </button>

          <div>
            <label className="block pt-8 text-sm font-medium text-gray-700">
              Output
            </label>

            <div className="mt-1">
              <Editor
                value={output?.join('\n') ?? ''}
                height="10rem"
                defaultLanguage="typescript"
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
